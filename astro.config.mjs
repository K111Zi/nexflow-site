// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'et',
    locales: ['et', 'ru', 'en'],
    routing: {
      prefixDefaultLocale: false, // эстонский — на "/", русский — на "/ru/", английский — на "/en/"
    },
  },
});
