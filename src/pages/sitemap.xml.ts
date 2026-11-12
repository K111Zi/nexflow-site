import type { APIRoute } from 'astro';
import { langPath, privacyPath, type Lang } from '../i18n/ui';

// Каждая страница — с адресами её языковых версий (hreflang), чтобы Google их связал.
const pages: Record<Lang, string>[] = [langPath, privacyPath];

export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const langs = Object.keys(langPath) as Lang[];

  const urls = pages.flatMap((page) =>
    langs.map((lang) => {
      const links = langs
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(page[l])}"/>`)
        .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(page.et)}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${abs(page[lang])}</loc>\n${links}\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
