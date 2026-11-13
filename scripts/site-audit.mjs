// Post-build website audit: no dependencies beyond Node.js.
// Checks rendered pages, local links/assets and basic SEO; emits sitemap.xml.
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';

const dist = resolve('dist');
const origin = 'https://nbg1618.com';
const errors = [];

const escapeXml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
}[char]));

async function walk(directory) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await walk(path));
    else if (entry.isFile()) found.push(path);
  }
  return found;
}

const files = await walk(dist);
const htmlFiles = files.filter((path) => path.endsWith('.html'));
if (htmlFiles.length < 15) {
  errors.push(`Only ${htmlFiles.length} rendered HTML pages found; expected at least 15.`);
}

const publicPath = (file) => {
  const name = relative(dist, file).split(sep).join('/');
  if (name === 'index.html') return '/';
  if (name.endsWith('/index.html')) return '/' + name.slice(0, -'index.html'.length);
  return '/' + name;
};

const renderedRoutes = new Set(htmlFiles.map(publicPath));
const seenTitles = new Map();
const urlPatterns = /\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi;
const skippedSchemes = /^(?:mailto:|tel:|sms:|data:|blob:|about:)/i;

async function exists(path) {
  try {
    const info = await stat(path);
    return info.isFile();
  } catch {
    return false;
  }
}

async function targetExists(pathname) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); }
  catch { return false; }
  // Do not allow malformed paths or platform-specific separators.
  if (decoded.includes('\\') || decoded.includes('\0')) return false;
  const target = resolve(dist, '.' + decoded);
  if (target !== dist && !target.startsWith(dist + sep)) return false;
  const candidates = [
    target,
    join(target, 'index.html'),
    target + '.html',
  ];
  for (const candidate of candidates) {
    if (await exists(candidate)) return true;
  }
  return false;
}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const pagePath = publicPath(file);
  const pageURL = new URL(pagePath, origin);

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) errors.push(`${pagePath}: expected exactly 1 H1; got ${h1Count}`);

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push(`${pagePath}: missing title`);
  } else if (pagePath !== '/404.html') {
    const title = titleMatch[1].trim();
    if (seenTitles.has(title)) errors.push(`${pagePath}: duplicate title with ${seenTitles.get(title)}`);
    seenTitles.set(title, pagePath);
  }

  if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html)) {
    errors.push(`${pagePath}: missing meta description`);
  }
  if (!/<link\s+rel="canonical"\s+href="[^"]+"/i.test(html)) {
    errors.push(`${pagePath}: missing canonical URL`);
  }

  // Visual section highlighting must never create false current-page announcements.
  // Check the exact destination within the main navigation, including More.
  const navMarkup = html.match(/<nav\b[^>]*aria-label="Main navigation"[^>]*>([\s\S]*?)<\/nav>/i)?.[1];
  if (!navMarkup) {
    errors.push(`${pagePath}: missing main navigation landmark`);
  } else {
    const normalize = (href) => {
      const pathname = new URL(href, pageURL).pathname;
      return pathname.replace(/\/+$/, '') || '/';
    };
    const pageKey = normalize(pagePath);
    const anchors = [...navMarkup.matchAll(/<a\b[^>]*>/gi)].map((match) => match[0]);
    let exactMatches = 0;
    let currentCount = 0;
    for (const anchor of anchors) {
      const href = anchor.match(/\bhref="([^"]+)"/i)?.[1];
      if (!href) continue;
      const exact = normalize(href) === pageKey;
      if (exact) exactMatches++;
      if (/\baria-current="page"/i.test(anchor)) {
        currentCount++;
        if (!exact) errors.push(`${pagePath}: main navigation marks ${href} current, but it is not the current page`);
      }
    }
    if (currentCount > 1) errors.push(`${pagePath}: ${currentCount} main navigation links claim aria-current=page`);
    if (exactMatches && currentCount !== 1) errors.push(`${pagePath}: current navigation page is missing aria-current=page`);
  }

  for (const [, , value] of html.matchAll(urlPatterns)) {
    const href = value.trim();
    if (!href || skippedSchemes.test(href)) continue;
    if (/^javascript:/i.test(href)) {
      errors.push(`${pagePath}: unsafe javascript URL`);
      continue;
    }
    let target;
    try { target = new URL(href, pageURL); }
    catch {
      errors.push(`${pagePath}: malformed URL ${href}`);
      continue;
    }
    if (!['http:', 'https:'].includes(target.protocol) || target.origin !== origin) continue;
    if (!await targetExists(target.pathname)) {
      errors.push(`${pagePath}: missing local link/asset ${href}`);
    }
  }
}

if (errors.length) {
  console.error(`Site audit FAILED with ${errors.length} issue(s):\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  const routes = [...renderedRoutes].filter((route) => route !== '/404.html').sort();
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((route) => `  <url><loc>${escapeXml(new URL(route, origin).href)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');
  await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`Site audit PASS: ${htmlFiles.length} pages, ${routes.length} sitemap entries, checked local links and basic SEO.`);
}
