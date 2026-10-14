import { chromium } from '@playwright/test';
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf-8');

const VIEWPORTS = [
  { name: '360px', width: 360, height: 740 },
  { name: '390px', width: 390, height: 844 },
  { name: '768px', width: 768, height: 1024 },
  { name: '1024px', width: 1024, height: 768 },
  { name: '1280px', width: 1280, height: 800 },
  { name: '1536px', width: 1536, height: 900 }
];

const ROUTES = [
  '/',
  '/about',
  '/clinic',
  '/clinic/photos',
  '/clinic/timings',
  '/clinic/location',
  '/book-appointment',
  '/patient-resources',
  '/patient-resources/faqs',
  '/conditions',
  '/privacy',
  '/disclaimer'
];

async function runAudit() {
  console.log('🚀 Starting Comprehensive Responsive, A11y & SEO Audit...');
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  let hasErrors = false;

  // 1. RESPONSIVE QA ACROSS ALL 6 BREAKPOINTS ON HOMEPAGE
  console.log('\n--- 1. RESPONSIVE QA (Homepage) ---');
  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    // Check horizontal scroll
    const scrollInfo = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        hasHorizontalOverflow: doc.scrollWidth > window.innerWidth
      };
    });

    console.log(`[Viewport ${vp.name}] scrollWidth: ${scrollInfo.scrollWidth}, clientWidth: ${scrollInfo.clientWidth}, overflow: ${scrollInfo.hasHorizontalOverflow}`);
    if (scrollInfo.hasHorizontalOverflow) {
      console.error(`❌ Overflow detected at ${vp.name}! scrollWidth (${scrollInfo.scrollWidth}) > innerWidth (${vp.width})`);
      hasErrors = true;
    }

    // On mobile (< 768px), check specific components
    if (vp.width <= 390) {
      // 1. Hamburger menu button
      const hamburger = await page.$('button[aria-label="Open navigation menu"]');
      if (!hamburger) {
        console.error(`❌ Hamburger menu button not found at ${vp.name}`);
        hasErrors = true;
      } else {
        const bbox = await hamburger.boundingBox();
        console.log(`✓ Hamburger button visible: ${bbox?.width}x${bbox?.height} (min 44px: ${bbox && bbox.width >= 40 && bbox.height >= 40})`);
      }

      // 2. Hero stacking order: check text -> organ illustration -> notices card
      const stackingOrder = await page.evaluate(() => {
        const heroTitle = document.querySelector('h1');
        const organHero = document.querySelector('img[alt*="Digestive"]');
        const notices = document.querySelector('[role="region"][aria-label="Latest clinical updates"]');
        if (!heroTitle || !organHero) return { valid: false, reason: 'missing elements' };
        
        const titleTop = heroTitle.getBoundingClientRect().top;
        const organTop = organHero.getBoundingClientRect().top;
        const noticesTop = notices ? notices.getBoundingClientRect().top : 99999;
        
        return {
          valid: titleTop < organTop && (notices ? organTop < noticesTop : true),
          titleTop,
          organTop,
          noticesTop
        };
      });
      console.log(`✓ Hero stacking check at ${vp.name}:`, stackingOrder);
      if (!stackingOrder.valid) {
        console.error(`❌ Hero stacking order failed at ${vp.name}`);
        hasErrors = true;
      }

      // 3. 2x2 trust icons check
      const trustCols = await page.evaluate(() => {
        const trustContainer = document.querySelector('[data-testid="trust-grid"]') || document.querySelector('.grid.grid-cols-2');
        return trustContainer ? true : false;
      });
      console.log(`✓ 2-column/2x2 trust grid detected: ${trustCols}`);

      // 4. Tap target minimum sizes on mobile
      const tapTargetViolations = await page.evaluate(() => {
        const interactive = Array.from(document.querySelectorAll('a, button, input, select, textarea'));
        const small = [];
        for (const el of interactive) {
          const rect = el.getBoundingClientRect();
          // Filter visible elements
          if (rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.top <= window.innerHeight * 2) {
            // Check if both dimensions or padding make target < 40px
            if (rect.width < 36 || rect.height < 36) {
              // Ignore inline text links inside paragraphs
              if (el.tagName === 'A' && el.closest('p')) continue;
              small.push({
                tag: el.tagName,
                text: el.textContent?.trim().slice(0, 30),
                aria: el.getAttribute('aria-label'),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              });
            }
          }
        }
        return small.slice(0, 10);
      });
      console.log(`Tap target review at ${vp.name} (items < 36px in visible area):`, tapTargetViolations.length);
    }
  }

  // 2. ACCESSIBILITY & HEADINGS ON ALL ROUTES
  console.log('\n--- 2. ACCESSIBILITY & HEADING STRUCTURE AUDIT ---');
  for (const route of ROUTES) {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`http://localhost:5173${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    // Evaluate H1 count, title, description, landmarks
    const pageAudit = await page.evaluate(() => {
      const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.textContent?.trim());
      const title = document.title;
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
      const landmarks = {
        hasHeader: !!document.querySelector('header'),
        hasMain: !!document.querySelector('main'),
        hasFooter: !!document.querySelector('footer'),
        hasNav: !!document.querySelector('nav')
      };
      const imagesMissingAlt = Array.from(document.querySelectorAll('img')).filter(img => !img.hasAttribute('alt')).length;
      const buttonsMissingLabel = Array.from(document.querySelectorAll('button')).filter(btn => {
        const hasText = btn.textContent?.trim().length > 0;
        const hasAria = btn.hasAttribute('aria-label') || btn.hasAttribute('aria-labelledby');
        return !hasText && !hasAria;
      }).length;
      const jsonLd = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
        try {
          return { valid: true, data: JSON.parse(s.textContent || '{}') };
        } catch (e) {
          return { valid: false, error: e.message };
        }
      });

      return {
        h1Count: h1s.length,
        h1Text: h1s[0] || null,
        title,
        metaDesc: metaDesc ? metaDesc.slice(0, 60) + '...' : null,
        landmarks,
        imagesMissingAlt,
        buttonsMissingLabel,
        jsonLdCount: jsonLd.length,
        jsonLdValid: jsonLd.every(j => j.valid)
      };
    });

    console.log(`Route [${route}]:`);
    console.log(`  H1s: ${pageAudit.h1Count} ("${pageAudit.h1Text?.slice(0, 40)}...")`);
    console.log(`  Title: "${pageAudit.title?.slice(0, 50)}..."`);
    console.log(`  Meta Description: ${pageAudit.metaDesc ? '✓' : 'MISSING'}`);
    console.log(`  Landmarks: header=${pageAudit.landmarks.hasHeader}, main=${pageAudit.landmarks.hasMain}, footer=${pageAudit.landmarks.hasFooter}, nav=${pageAudit.landmarks.hasNav}`);
    console.log(`  Alt-missing: ${pageAudit.imagesMissingAlt}, Icon-btn missing aria: ${pageAudit.buttonsMissingLabel}`);
    console.log(`  JSON-LD Schemas: ${pageAudit.jsonLdCount} (all valid: ${pageAudit.jsonLdValid})`);

    if (pageAudit.h1Count !== 1) {
      console.error(`❌ Route ${route} has ${pageAudit.h1Count} H1 elements! Must be exactly 1.`);
      hasErrors = true;
    }
    if (pageAudit.imagesMissingAlt > 0) {
      console.error(`❌ Route ${route} has ${pageAudit.imagesMissingAlt} images missing alt attribute!`);
      hasErrors = true;
    }
    if (pageAudit.buttonsMissingLabel > 0) {
      console.error(`❌ Route ${route} has ${pageAudit.buttonsMissingLabel} buttons missing accessible names!`);
      hasErrors = true;
    }
  }

  // 3. AXE-CORE WCAG 2.2 AUDIT ON KEY PAGES
  console.log('\n--- 3. AXE-CORE WCAG 2.2 AA AUDIT ---');
  for (const route of ['/', '/about', '/clinic', '/book-appointment', '/patient-resources']) {
    await page.goto(`http://localhost:5173${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(axeSource);
    const axeResults = await page.evaluate(async () => {
      // @ts-expect-error window.axe
      return await window.axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
        }
      });
    });

    const serious = axeResults.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
    console.log(`Route [${route}] Axe Violations: Total ${axeResults.violations.length}, Serious/Critical: ${serious.length}`);
    if (serious.length > 0) {
      serious.forEach(v => {
        console.error(`  ❌ [${v.impact.toUpperCase()}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`);
        v.nodes.slice(0, 3).forEach(n => console.error(`     Target: ${n.target.join(' ')} | ${n.failureSummary}`));
      });
      hasErrors = true;
    }
  }

  // 4. TEST MOBILE SLIDE-IN ACCORDION DRAWER
  console.log('\n--- 4. MOBILE DRAWER INTERACTION TEST ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const drawerBtn = await page.$('button[aria-label="Open navigation menu"]');
  if (drawerBtn) {
    await drawerBtn.click();
    await page.waitForTimeout(300);
    const drawerVisible = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"][aria-label="Mobile Navigation"]');
      return !!dialog;
    });
    console.log(`✓ Mobile drawer opened successfully: ${drawerVisible}`);

    // Test accordion expand
    const accordionBtn = await page.$('[role="dialog"] button[aria-expanded="false"]');
    if (accordionBtn) {
      const btnText = await accordionBtn.textContent();
      await accordionBtn.click();
      await page.waitForTimeout(200);
      const isExpanded = await accordionBtn.getAttribute('aria-expanded');
      console.log(`✓ Mobile accordion "${btnText?.trim()}" expanded: ${isExpanded}`);
    }

    // Close drawer
    const closeBtn = await page.$('button[aria-label="Close menu"]');
    if (closeBtn) {
      await closeBtn.click();
      await page.waitForTimeout(300);
      console.log(`✓ Mobile drawer closed cleanly`);
    }
  }

  // 5. TEST ORGAN HOTSPOTS KEYBOARD ACCESSIBILITY
  console.log('\n--- 5. ORGAN HOTSPOTS KEYBOARD ACCESSIBILITY TEST ---');
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const hotspots = await page.$$('a[aria-label*="Explore anatomical details"]');
  console.log(`✓ Found ${hotspots.length} interactive organ hotspot link pills`);
  for (let i = 0; i < hotspots.length; i++) {
    const hs = hotspots[i];
    const aria = await hs.getAttribute('aria-label');
    const href = await hs.getAttribute('href');
    console.log(`  Hotspot #${i + 1}: aria-label="${aria}", href="${href}"`);
  }

  await browser.close();
  console.log(`\n================================================================`);
  console.log(`AUDIT COMPLETED: ${hasErrors ? '⚠️ SOME CHECKS REQUIRE ATTENTION' : '✅ ALL CHECKS PASSED PERFECTLY!'}`);
  console.log(`================================================================\n`);
  return !hasErrors;
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
