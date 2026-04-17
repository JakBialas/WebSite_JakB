import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://jakubbialas.pages.dev',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  output: "hybrid",
  adapter: cloudflare()
});