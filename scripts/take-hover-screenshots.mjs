import { chromium } from '@playwright/test';
import path from 'path';

const outDir = '/Users/pratik/.gemini/antigravity-ide/brain/ffa8c5c8-c262-49be-a404-ba4aae8e6512';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Locate the Pancreas Viewer container
  const viewer = page.locator('[role="region"][aria-label*="Pancreas"]');
  await viewer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // 1. Hover on Head of Pancreas
  console.log('Hovering on Head of Pancreas...');
  const headButton = page.locator('button, g[role="button"]').filter({ hasText: 'Head of Pancreas' }).first();
  await headButton.hover();
  await page.waitForTimeout(600);
  const headPath = path.join(outDir, 'hover_head_of_pancreas.png');
  await viewer.screenshot({ path: headPath });
  console.log('Saved:', headPath);

  // 2. Hover on Duct of Wirsung
  console.log('Hovering on Duct of Wirsung...');
  const ductButton = page.locator('button, g[role="button"]').filter({ hasText: 'Duct of Wirsung' }).first();
  await ductButton.hover();
  await page.waitForTimeout(600);
  const ductPath = path.join(outDir, 'hover_duct_of_wirsung.png');
  await viewer.screenshot({ path: ductPath });
  console.log('Saved:', ductPath);

  // 3. Hover on Beta Cells & Islets
  console.log('Hovering on Beta Cells & Islets...');
  const isletsButton = page.locator('button, g[role="button"]').filter({ hasText: 'Beta Cells & Islets' }).first();
  await isletsButton.hover();
  await page.waitForTimeout(600);
  const isletsPath = path.join(outDir, 'hover_beta_cells_and_islets.png');
  await viewer.screenshot({ path: isletsPath });
  console.log('Saved:', isletsPath);

  await browser.close();
  console.log('All screenshots captured successfully!');
}

main().catch((err) => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
