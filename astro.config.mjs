import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://no-ball-games.github.io',
  base: '/NO-BALL-GAMES/',

  integrations: [],

  vite: {
    ssr: {
      external: ['svgo']
    }
  }
});