import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.resolve(projectRoot, 'public');

const SITE_URL = process.env.VITE_SITE_URL || 'https://drsoumyasengupta.com';

const routes = [
  '/',
  '/about',
  '/diabetes-care',
  '/diabetes-care/management',
  '/diabetes-care/prediabetes',
  '/diabetes-care/education',
  '/diabetes-care/lifestyle',
  '/diabetes-care/complications',
  '/conditions',
  '/conditions/diabetes',
  '/conditions/thyroid',
  '/conditions/weight-management',
  '/conditions/metabolic-health',
  '/conditions/other',
  '/patient-resources',
  '/patient-resources/knowledge-hub',
  '/patient-resources/articles',
  '/patient-resources/faqs',
  '/patient-resources/videos',
  '/patient-resources/reports',
  '/patient-resources/guides',
  '/clinic',
  '/clinic/facilities',
  '/clinic/photos',
  '/clinic/timings',
  '/clinic/location',
  '/contact',
  '/book-appointment',
  '/privacy',
  '/disclaimer',
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('book') ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`✓ Generated sitemap with ${routes.length} routes at public/sitemap.xml`);
