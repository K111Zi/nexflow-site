// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  // Адрес сайта — для SEO-ссылок и sitemap. Поменяйте, когда купите домен.
  site: 'https://nexflow.ee',
  // Страницы сайта остаются статичными; сервер нужен только админке (/keystatic).
  adapter: netlify(),
  integrations: [react(), keystatic()],
  i18n: {
    defaultLocale: 'et',
    locales: ['et', 'ru', 'en'],
    routing: {
      prefixDefaultLocale: true, // все языки с приставкой: /et/, /ru/, /en/
    },
  },
  // Главный адрес ведёт на эстонскую версию (на Netlify — настоящий редирект 301).
  redirects: {
    '/': '/et/',
  },
});
