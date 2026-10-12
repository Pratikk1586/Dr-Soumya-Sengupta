import { chromium } from '@playwright/test';
import path from 'path';

const ARTIFACTS_DIR = '/Users/pratik/.gemini/antigravity-ide/brain/ffa8c5c8-c262-49be-a404-ba4aae8e6512';

async function triggerHover(page, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      el.focus();
    }
  }, selector);
  await page.waitForTimeout(400);
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440px states
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    
    const viewer = page.locator('[data-pancreas-viewer="true"]');
    await viewer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Initial 1440px
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'pancreas_viewer_1440px.png'),
    });
    console.log('Saved pancreas_viewer_1440px.png');

    // Hover Head of Pancreas
    await triggerHover(page, 'path[aria-label*="Head of Pancreas"]');
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'hover_head_of_pancreas.png'),
    });
    console.log('Saved hover_head_of_pancreas.png');

    // Hover Pancreatic Duct
    await triggerHover(page, 'path[aria-label*="Main Pancreatic Duct"]');
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'hover_pancreatic_duct.png'),
    });
    console.log('Saved hover_pancreatic_duct.png');

    // Hover Spleen
    await triggerHover(page, 'path[aria-label*="Spleen"]');
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'hover_spleen.png'),
    });
    console.log('Saved hover_spleen.png');

    // Hover Islets Lens
    await triggerHover(page, 'circle[aria-label*="Islets of Langerhans 1000x Cellular Loupe Lens"]');
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'hover_islets_lens.png'),
    });
    console.log('Saved hover_islets_lens.png');

    await page.close();
  }

  // 2. Debug mode (?debug=1) at 1440px
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:5173/?debug=1', { waitUntil: 'domcontentloaded' });
    const viewer = page.locator('[data-pancreas-viewer="true"]');
    await viewer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'pancreas_debug_mode.png'),
    });
    console.log('Saved pancreas_debug_mode.png');
    await page.close();
  }

  // 3. Tablet landscape 1024px
  {
    const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    const viewer = page.locator('[data-pancreas-viewer="true"]');
    await viewer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'pancreas_viewer_1024px.png'),
    });
    console.log('Saved pancreas_viewer_1024px.png');
    await page.close();
  }

  // 4. Tablet portrait 768px
  {
    const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    const viewer = page.locator('[data-pancreas-viewer="true"]');
    await viewer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'pancreas_viewer_768px.png'),
    });
    console.log('Saved pancreas_viewer_768px.png');
    await page.close();
  }

  // 5. Mobile 390px
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    const viewer = page.locator('[data-pancreas-viewer="true"]');
    await viewer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Scroll viewer into clear view and click Head of Pancreas chip
    await page.evaluate(() => {
      const viewer = document.querySelector('[data-pancreas-viewer="true"]');
      if (viewer) {
        viewer.scrollIntoView({ behavior: 'instant', block: 'start' });
        window.scrollBy(0, -60);
      }
      const btns = Array.from(document.querySelectorAll('button'));
      const headBtn = btns.find(b => b.textContent?.includes('Head of Pancreas'));
      if (headBtn) headBtn.click();
    });
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'pancreas_viewer_390px.png'),
    });
    console.log('Saved pancreas_viewer_390px.png');
    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

main().catch(console.error);
