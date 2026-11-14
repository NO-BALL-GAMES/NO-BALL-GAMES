// Source-level reciprocal links contract, no network calls required.
// Run via npm run audit:reciprocal or the PR validate workflow.
import { readFileSync } from 'node:fs';

const origin = 'https://graffitikings.com';
const expected = {
  "src/pages/index.astro": [
    "/pages/crypto-moonboys-gkniftyheads-network.html",
    "/pages/charlie-buster-source-network.html"
  ],
  "src/pages/about/index.astro": [
    "/pages/charlie-buster-grime-art-history.html",
    "/pages/darren-cullen-ser-history.html"
  ],
  "src/pages/crypto-moonboys/index.astro": [
    "/pages/crypto-moonboys-gkniftyheads-network.html",
    "/pages/graffiti-kings-wax-nft-collections.html",
    "/pages/graffiti-kings-web-network.html"
  ],
  "src/pages/charlie-buster-online-archive/index.astro": [
    "/pages/charlie-buster-grime-art-history.html",
    "/pages/charlie-buster-no-ball-games-nbg.html",
    "/pages/charlie-buster-treef-project.html",
    "/pages/charlie-buster-source-network.html",
    "/pages/graffiti-kings-web-network.html"
  ],
  "src/pages/charlie-buster-biography/index.md": [
    "/pages/charlie-buster-grime-art-history.html",
    "/pages/charlie-buster-source-network.html"
  ],
  "src/pages/projects/index.astro": [
    "/pages/crypto-moonboys-gkniftyheads-network.html",
    "/pages/charlie-buster-no-ball-games-nbg.html"
  ],
  "src/pages/collections/index.astro": [
    "/pages/graffiti-kings-wax-nft-collections.html",
    "/pages/charlie-buster-no-ball-games-nbg.html"
  ],
  "src/pages/research/index.astro": [
    "/pages/charlie-buster-source-network.html",
    "/pages/charlie-buster-treef-project.html"
  ],
  "src/pages/press/index.astro": [
    "/pages/charlie-buster-source-network.html",
    "/pages/charlie-buster-grime-art-history.html"
  ]
};
const errors = [];
let total = 0;
for (const [file, paths] of Object.entries(expected)) {
  const html = readFileSync(file, 'utf8');
  // Match exact source destinations, not arbitrary GitHub/GK mentions in prose.
  const found = [...html.matchAll(/https:\/\/graffitikings\.com\/(?:[a-zA-Z0-9_\/-]+\.html)?/g)]
    .map(match => new URL(match[0], origin).pathname);
  if (found.length !== paths.length) {
    errors.push(file + ': expected ' + paths.length + ' links, found ' + found.length);
  }
  if (new Set(found).size !== found.length) {
    errors.push(file + ': repeated destination in the same page');
  }
  for (const pathname of paths) {
    if (!found.includes(pathname)) errors.push(file + ': missing expected link ' + pathname);
  }
  for (const pathname of found) {
    if (!paths.includes(pathname)) errors.push(file + ': unexpected destination ' + pathname);
  }
  // Literal external-window anchors must protect new-tab navigation.
  if (file.endsWith('.astro') && !file.endsWith('/crypto-moonboys/index.astro') &&
      !file.endsWith('/charlie-buster-online-archive/index.astro')) {
    const anchors = [...html.matchAll(/<a\b[^>]*href="(https:\/\/graffitikings\.com\/[^"]+)"[^>]*>/g)];
    if (anchors.length !== paths.length) errors.push(file + ': expected literal external anchors');
    for (const [tag] of anchors) {
      if (!/target="_blank"/.test(tag) ||
          !/rel="[^"]*\bnoopener\b[^"]*\bnoreferrer\b[^"]*"/.test(tag)) {
        errors.push(file + ': external anchor missing safe new-tab attributes');
      }
    }
  }
  total += found.length;
}
for (const file of [
  'src/pages/crypto-moonboys/index.astro',
  'src/pages/charlie-buster-online-archive/index.astro',
]) {
  const source = readFileSync(file, 'utf8');
  if (!/href=\{source\.(?:href|url)\} target="_blank" rel="noopener noreferrer"/.test(source)) {
    errors.push(file + ': dynamic source links must retain safe external-link attributes');
  }
}
if (errors.length) {
  errors.forEach(e => console.error('ERROR:', e));
  process.exitCode = 1;
} else {
  console.log('Graffiti Kings reciprocal links passed:', Object.keys(expected).length,
    'pages,', total, 'known source destinations, no duplicates.');
}
