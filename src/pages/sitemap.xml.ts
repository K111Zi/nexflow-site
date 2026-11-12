import type { APIRoute } from 'astro';
import { langs, pageKeys, pageAlternates } from '../i18n/ui';

// Каждая страница — с адресами её языковых версий (hreflang), чтобы Google их связал.
export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;

  const urls = pageKeys.flatMap((page) => {
    const alt = pageAlternates(page);
    const links = langs
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(alt[l])}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(alt.et)}"/>`)
      .join('\n');
    return langs.map((lang) => `  <url>\n    <loc>${abs(alt[lang])}</loc>\n${links}\n  </url>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
