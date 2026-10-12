import { chromium } from '@playwright/test';
import path from 'path';

const outDir = '/Users/pratik/.gemini/antigravity-ide/brain/ffa8c5c8-c262-49be-a404-ba4aae8e6512';

const viewports = [
  { name: 'phase3_after_1440px.png', width: 1440, height: 900 },
  { name: 'phase3_after_1024px.png', width: 1024, height: 768 },
  { name: 'phase3_after_768px.png', width: 768, height: 1024 },
  { name: 'phase3_after_390px.png', width: 390, height: 844 },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Viewport captures
  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    
    // Screenshot above-fold / hero
    await page.screenshot({
      path: path.join(outDir, vp.name),
      fullPage: false,
    });

    // Also full page screenshot
    await page.screenshot({
      path: path.join(outDir, `phase3_full_${vp.name}`),
      fullPage: true,
    });
    
    console.log(`Captured ${vp.name} and phase3_full_${vp.name}`);
    await page.close();
  }

  // 2. Specific Section captures at 1440px
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll down slightly to trigger glass effect on navbar
  await page.evaluate(() => window.scrollTo(0, 180));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(outDir, 'phase3_after_navbar_glass.png'),
    clip: { x: 0, y: 0, width: 1440, height: 120 },
  });

  // Section: Know Your Numbers & HbA1c Bar
  const numbersSection = await page.$('text=HbA1c Target Range Reference');
  if (numbersSection) {
    await numbersSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outDir, 'phase3_after_hba1c_graphic.png'),
      fullPage: false,
    });
  }

  // Section: Care Journey Dotted Line & Numerals
  const journeySection = await page.$('text=Patient Care & Consultation Journey');
  if (journeySection) {
    await journeySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outDir, 'phase3_after_care_journey.png'),
      fullPage: false,
    });
  }

  // Section: Clinic Info & Photo Gallery Slot
  const clinicSection = await page.$('text=Chamber Facilities & Patient Gallery');
  if (clinicSection) {
    await clinicSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outDir, 'phase3_after_clinic_gallery.png'),
      fullPage: false,
    });
  }

  // Section: Footer Gradient & Red Emergency banner
  const footerSection = await page.$('footer');
  if (footerSection) {
    await footerSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outDir, 'phase3_after_footer.png'),
      fullPage: false,
    });
  }

  // Pancreas Viewer Hover Logic Verification
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const headButton = await page.$('button:has-text("Pancreatic Head")') || await page.$('button:has-text("Head of Pancreas")');
  if (headButton) {
    await headButton.hover();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outDir, 'phase3_after_pancreas_hover.png'),
      clip: { x: 700, y: 80, width: 700, height: 500 },
    });
  }

  // Language toggle test (EN -> Hindi)
  const langToggle = await page.$('button:has-text("हिंदी")');
  if (langToggle) {
    await langToggle.click();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(outDir, 'phase3_after_hindi_toggle.png'),
      clip: { x: 0, y: 0, width: 1440, height: 550 },
    });
  }

  await page.close();
  await browser.close();
  console.log('All detailed Phase 3 captures completed successfully.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
