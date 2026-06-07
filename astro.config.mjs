import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://NO-BALL-GAMES.github.io',
  // If deploying as a project site instead of organization site, uncomment and update:
  // base: '/NO-BALL-GAMES',
  
  integrations: [
    // Add additional integrations here as needed
  ],

  vite: {
    ssr: {
      external: ['svgo']
    }
  }
});
