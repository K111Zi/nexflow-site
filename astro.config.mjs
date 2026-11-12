// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Адрес сайта — для SEO-ссылок и sitemap. Поменяйте, когда купите домен.
  site: 'https://nexflow.ee',
  i18n: {
    defaultLocale: 'et',
    locales: ['et', 'ru', 'en'],
    routing: {
      prefixDefaultLocale: false, // эстонский — на "/", русский — на "/ru/", английский — на "/en/"
    },
  },
});
