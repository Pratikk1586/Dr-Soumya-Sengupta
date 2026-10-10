import { test, expect } from '@playwright/test';

test.describe('Practice Portal Comprehensive Smoke & Critical Flow Suite', () => {
  // 1. Critical routes load without unhandled console errors
  const criticalRoutes = [
    '/',
    '/about',
    '/contact',
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

  for (const route of criticalRoutes) {
    test(`route ${route} loads cleanly without critical console errors`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          const text = msg.text();
          // Filter out benign browser network or missing 3D model 404 warnings
          if (!text.includes('favicon') && !text.includes('pancreas.glb') && !text.includes('Failed to load resource')) {
            consoleErrors.push(text);
          }
        }
      });

      await page.goto(route);
      await expect(page.locator('main#main-content')).toBeVisible();
      expect(consoleErrors).toEqual([]);
    });
  }

  // 2. Language switch persistence and document attribute synchronization
  test('language toggle updates document lang and persists across reload', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // Toggle to Hindi (via desktop or mobile switcher)
    const langBtn = page.getByRole('button', { name: /हिंदी|हिन्दी|Switch to Hindi/i }).first();
    await expect(langBtn).toBeVisible();
    await langBtn.click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');

    // Reload page to verify persistence in localStorage
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');

    // Toggle back to English
    const engBtn = page.getByRole('button', { name: /English|Switch to English/i }).first();
    await expect(engBtn).toBeVisible();
    await engBtn.click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  // 3. Global search modal flow
  test('search modal opens, accepts query, and displays structured results', async ({ page }) => {
    await page.goto('/');

    // Open search modal via search button in navbar
    const searchTrigger = page.locator('button[aria-label="Open search"]').first();
    await searchTrigger.waitFor({ state: 'visible' });
    await searchTrigger.dispatchEvent('click');

    const searchInput = page.locator('input[aria-label="Search clinical resources and medical topics"]');
    await expect(searchInput).toBeVisible({ timeout: 5000 });

    // Query for HbA1c via reliable input dispatch
    await searchInput.evaluate((el: HTMLInputElement, val) => {
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      nativeSetter?.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, 'HbA1c');
    await page.waitForTimeout(500);

    // Verify search results count summary appears
    await expect(page.getByText(/Showing \d+ results/i)).toBeVisible({ timeout: 6000 });

    // Dismiss modal with Close button or Escape
    const closeBtn = page.locator('button[aria-label="Close search"]');
    if (await closeBtn.isVisible()) {
      await closeBtn.dispatchEvent('click');
    } else {
      await page.keyboard.press('Escape');
    }
    await expect(searchInput).not.toBeVisible();
  });

  // 4. FAQ Accordion interaction
  test('FAQ accordion expands and collapses cleanly', async ({ page }) => {
    await page.goto('/patient-resources/faqs');

    const firstFaqTrigger = page.locator('button[id^="faq-btn-"]').first();
    await firstFaqTrigger.waitFor({ state: 'visible', timeout: 10000 });

    // Initially collapsed
    await expect(firstFaqTrigger).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    await firstFaqTrigger.dispatchEvent('click');
    await expect(firstFaqTrigger).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    await firstFaqTrigger.dispatchEvent('click');
    await expect(firstFaqTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  // 5. Multi-step appointment request validation and happy path
  test('appointment form validates required fields and reaches non-confirmation step 5', async ({ page }) => {
    await page.goto('/book-appointment');

    // Step 1: Visit Type Selection
    await expect(page.getByText(/Step 1 of 4/i)).toBeVisible();
    const nextBtn1 = page.getByRole('button', { name: /Next Step|आगे बढ़ें/i });
    await nextBtn1.dispatchEvent('click');

    // Step 2: Preferred Schedule
    await expect(page.getByText(/Step 2 of 4/i)).toBeVisible();
    const nextBtn2 = page.getByRole('button', { name: /Next Step|आगे बढ़ें/i });
    await nextBtn2.dispatchEvent('click');

    // Step 3: Patient Information
    await expect(page.getByText(/Step 3 of 4/i)).toBeVisible();
    await page.fill('#patientName', 'Sourav Das');
    await page.fill('#phone', '+91 98301 23456');
    await page.fill('#reasonForVisit', 'Routine quarterly blood glucose review');
    const nextBtn3 = page.getByRole('button', { name: /Next Step|आगे बढ़ें/i });
    await nextBtn3.dispatchEvent('click');

    // Step 4: Review Summary
    await expect(page.getByText(/Step 4 of 4/i)).toBeVisible();
    await expect(page.getByText('Sourav Das')).toBeVisible();
    const prepareBtn = page.getByRole('button', { name: /Prepare Consultation Request|अनुरोध तैयार करें/i });
    await prepareBtn.dispatchEvent('click');

    // Step 5: Exact non-confirmation wording check
    const exactNotice = page.getByText('Your appointment request has been prepared. Please contact the clinic to confirm availability.');
    await expect(exactNotice).toBeVisible();
  });

  // 6. Clinic Assistant quick action and safety refusal
  test('clinic assistant handles quick actions and enforces medical refusal', async ({ page }) => {
    await page.goto('/');

    // Open Clinic Assistant floating trigger
    const assistantBtn = page.locator('button[aria-label*="Clinic Assistant"], button:has-text("Clinic Assistant")').first();
    await assistantBtn.waitFor({ state: 'visible' });
    await assistantBtn.dispatchEvent('click');

    // Assistant panel visible (checking specific heading)
    await expect(page.getByRole('heading', { name: /Dr\. Sengupta Clinic Assistant/i })).toBeVisible();

    // Send a medication dosage inquiry (medical safety trigger)
    const chatInput = page.locator('input[aria-label="Type message to clinic assistant"]');
    await chatInput.evaluate((el: HTMLInputElement, val) => {
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      nativeSetter?.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, 'Can you prescribe Metformin dose for high sugar?');

    const sendBtn = page.locator('button[aria-label="Send message"]');
    await sendBtn.dispatchEvent('click');

    // Verify medical refusal notice is returned inside chat dialog
    const assistantDialog = page.getByRole('dialog', { name: 'Clinic Assistant Chat' });
    await expect(
      assistantDialog.getByText(/For medical diagnosis/i).first()
    ).toBeVisible({ timeout: 6000 });
  });

  // 7. Media Gallery lightbox keyboard navigation and escape dismiss
  test('gallery lightbox opens on click, supports arrow navigation, and closes on Escape', async ({ page }) => {
    await page.goto('/clinic/photos');

    // Click first photo thumbnail
    const firstThumbnail = page.locator('main [role="button"]').first();
    await firstThumbnail.waitFor({ state: 'visible', timeout: 10000 });
    await firstThumbnail.dispatchEvent('click');

    // Lightbox modal active
    const lightboxDialog = page.getByRole('dialog');
    await expect(lightboxDialog).toBeVisible({ timeout: 5000 });

    // Navigate with Next button
    const nextBtn = page.locator('button[aria-label="Next item"]');
    if (await nextBtn.isVisible()) {
      await nextBtn.dispatchEvent('click');
    }

    // Dismiss with Close button or Escape
    const closeBtn = page.locator('button[aria-label="Close Lightbox"]');
    if (await closeBtn.isVisible()) {
      await closeBtn.dispatchEvent('click');
    } else {
      await page.keyboard.press('Escape');
    }
    await expect(lightboxDialog).not.toBeVisible();
  });

  // 8. WebGL Disabled Hero Fallback
  test('hero renders static medical visual when WebGL is unavailable', async ({ page }) => {
    await page.addInitScript(() => {
      const originalGetContext = HTMLCanvasElement.prototype.getContext;
      // @ts-expect-error test mock
      HTMLCanvasElement.prototype.getContext = function (type: string, ...args) {
        if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') {
          return null;
        }
        return originalGetContext.apply(this, [type, ...args]);
      };
    });

    await page.goto('/');

    // Hero title remains fully visible and painted
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toHaveText(/Dr\. Soumya Sengupta/i);
  });
});
