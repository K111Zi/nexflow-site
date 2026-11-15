// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  // Адрес сайта — для SEO-ссылок и sitemap. Пока адрес Netlify; поменяйте, когда купите домен.
  site: 'https://creative-sunshine-6d5e20.netlify.app',
  // Страницы сайта остаются статичными; сервер нужен только админке (/keystatic).
  // Эмуляция Edge Functions в локальном запуске выключена: в проекте их нет,
  // а Deno 2.9+ не принимает флаг --allow-scripts, с которым её запускает @netlify/edge-functions-dev.
  adapter: netlify({
    devFeatures: { images: true, environmentVariables: false, edgeFunctions: false },
  }),
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
