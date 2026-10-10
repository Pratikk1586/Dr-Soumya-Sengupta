import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.resolve(projectRoot, 'public');

const SITE_URL = process.env.VITE_SITE_URL || 'https://drsoumyasengupta.com';

const baseRoutes = [
  '/',
  '/about',
  '/diabetes-care',
  '/diabetes-care/management',
  '/diabetes-care/prediabetes',
  '/diabetes-care/education',
  '/diabetes-care/lifestyle',
  '/diabetes-care/complications',
  '/conditions',
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

// Extract dynamic article slugs from src/data/articles.ts
const articleSlugs = [];
try {
  const articlesFile = fs.readFileSync(path.resolve(projectRoot, 'src/data/articles.ts'), 'utf-8');
  const matches = articlesFile.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
  for (const match of matches) {
    if (match[1]) articleSlugs.push(match[1]);
  }
} catch (err) {
  console.warn('Could not read articles file for sitemap generation:', err);
}

// Extract dynamic condition slugs from src/data/conditions.ts
const conditionSlugs = [];
try {
  const conditionsFile = fs.readFileSync(path.resolve(projectRoot, 'src/data/conditions.ts'), 'utf-8');
  const matches = conditionsFile.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
  for (const match of matches) {
    if (match[1]) conditionSlugs.push(match[1]);
  }
} catch (err) {
  console.warn('Could not read conditions file for sitemap generation:', err);
}

const allRoutes = [...baseRoutes];

for (const slug of articleSlugs) {
  allRoutes.push(`/patient-resources/articles/${slug}`);
}

for (const slug of conditionSlugs) {
  allRoutes.push(`/conditions/${slug}`);
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>${route === '/' ? 'daily' : route.includes('articles') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('book') ? '0.9' : route.includes('articles') ? '0.8' : '0.7'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`✓ Generated sitemap with ${allRoutes.length} real routes at public/sitemap.xml`);
