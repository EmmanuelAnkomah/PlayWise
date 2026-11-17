import { readFileSync, writeFileSync } from 'node:fs';

const baseUrl = 'https://playwise.tech';
const gamesSource = readFileSync(new URL('../src/data/games.ts', import.meta.url), 'utf8');
const gameIds = [...gamesSource.matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1]);
const paths = ['/', '/explore', '/genres', '/low-end', '/high-end', '/request-installation', '/contact', ...gameIds.map((id) => `/games/${id}`)];
const urls = paths.map((path) => `  <url><loc>${baseUrl}${path}</loc></url>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), sitemap);
