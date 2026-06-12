# NO BALL GAMES

A street-culture brand website built with [Astro](https://astro.build), deployed to GitHub Pages.

> *Built from the places where creativity was told to keep quiet.*

---

## Prerequisites

- [Node.js](https://nodejs.org/) **v18 or later**
- npm (bundled with Node.js)

---

## Local development

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:4321/NO-BALL-GAMES/)
npm run dev
```

The `base` path (`/NO-BALL-GAMES/`) is applied automatically via `astro.config.mjs`.  
All internal links and asset URLs use `import.meta.env.BASE_URL` so they resolve correctly in both dev and production.

---

## Build

```bash
# Validate Astro content and TypeScript usage
npm run check

# Production build → outputs to dist/
npm run build

# Preview the production build locally
npm run preview
```

---

## Project structure

```
src/
  layouts/
    BaseLayout.astro      # Shared HTML shell, nav and footer
  pages/
    index.astro           # Homepage
    about/                # Brand story
    collections/          # Physical and digital collectibles
    community/            # Community hub
    contact/              # Enquiry and collaboration
    lore/                 # Story archive and characters
    projects/             # Active and planned projects
    research/             # Brand notes and source material
  styles/
    site.css              # Global design tokens and component styles
public/
  favicon.svg
  og/                     # Open Graph images
  textures/               # Noise and texture assets
  robots.txt
  site.webmanifest
```

---

## Deployment (GitHub Pages)

The site deploys automatically via the GitHub Actions workflow in `.github/workflows/`.

- **Live URL:** `https://nbg1618.com/`
- The `site` and `base` values in `astro.config.mjs` must match the repository name exactly.
- Do **not** commit `node_modules/`, `dist/`, or `.astro/` — they are in `.gitignore`.
- To trigger a manual redeploy, push any commit to the default branch.

---

## Environment notes

No secret environment variables are required. `import.meta.env.BASE_URL` is resolved at build time by Astro from the `base` field in `astro.config.mjs`.
