import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jakubbialas.pages.dev',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
