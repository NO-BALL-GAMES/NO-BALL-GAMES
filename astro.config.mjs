import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nbg1618.com',
  base: '/',

  integrations: [],

  vite: {
    ssr: {
      external: ['svgo']
    }
  }
});