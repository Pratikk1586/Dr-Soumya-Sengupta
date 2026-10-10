import { test, expect } from '@playwright/test';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const axeSource = require.resolve('axe-core/axe.min.js');

test.describe('WCAG 2.2 AA Automated Accessibility Audit', () => {
  const auditRoutes = [
    '/',
    '/about',
    '/clinic',
    '/clinic/photos',
    '/clinic/timings',
    '/clinic/location',
    '/book-appointment',
    '/patient-resources',
    '/patient-resources/faqs',
    '/patient-resources/reports',
    '/patient-resources/guides',
    '/patient-resources/articles',
    '/conditions',
    '/privacy',
    '/disclaimer',
  ];

  for (const route of auditRoutes) {
    test(`route ${route} passes WCAG 2.2 AA with zero serious or critical violations`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);

      // Inject axe-core engine
      await page.addScriptTag({ path: axeSource });

      // Run axe on full DOM
      const results = await page.evaluate(async () => {
        // @ts-expect-error axe global injection
        return await window.axe.run(document, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
          },
        });
      });

      const seriousOrCritical = results.violations.filter(
        // @ts-expect-error violation impact type
        (v) => v.impact === 'serious' || v.impact === 'critical'
      );

      if (seriousOrCritical.length > 0) {
        // @ts-expect-error violation map
        const summary = seriousOrCritical.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.length,
        }));
        console.error(`Accessibility issues on ${route}:`, summary);
      }

      expect(seriousOrCritical).toEqual([]);
    });
  }
});
