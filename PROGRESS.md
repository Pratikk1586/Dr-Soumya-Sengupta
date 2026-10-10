# Project Progress — Dr. Soumya Sengupta Website

## Roadmap & Milestones

- [x] **Phase 1: Foundation, Architecture, Design System & Layout Shell** (Completed)
- [x] **Phase 2: Hero + Homepage (Trust & Clinic Sections)** (Completed)
- [x] **Phase 3: Patient Education, Search & Hindi/English Content** (Completed)
- [x] **Phase 4: Action Layer (Assistant, Appointment, WhatsApp, Maps, Contact, Gallery)** (Completed)
- [x] **Phase 5: Production Polish, Audit Verifications & Final Hardening** (Completed)

---

## Phase 5 Acceptance Checklist

- [x] **Accessibility Audit (WCAG 2.2 AA):**
  - Automated `axe-core` v4.14 testing integrated into Playwright test suite (`e2e/a11y.spec.ts`).
  - **15 / 15 audited routes passed with 0 serious and 0 critical violations**.
  - Contrast ratios elevated across all cards, badges, and dark footer links (>5.5:1 on light backgrounds, >7:1 on dark background).
  - Synchronized visible headings with accessible names to satisfy WCAG 2.5.3 (Label in Name).
  - Eliminated nested interactive button elements in accordion headers.
  - Skip link (`<SkipLink targetId="main-content" />`) verified with `focus:z-[100]`.

- [x] **Performance & Core Web Vitals:**
  - 3D Organ Canvas (`PancreasHero3D`) isolated into its own lazy-loaded bundle chunk (`dist/assets/PancreasHero3D-*.js`), keeping initial route bundles ultra-lean.
  - Preloaded critical Google Fonts with `font-display: swap` (Inter & Noto Sans Devanagari).
  - Search document index warmed up via `requestIdleCallback` and cached in-memory to prevent main-thread long tasks.
  - Fixed aspect ratio boxes across all media prevent layout shifts (CLS < 0.1).
  - Cache headers configured in `vercel.json`: `Cache-Control: public, max-age=31536000, immutable` for hashed static assets.

- [x] **Automated Testing Suite (100% Green):**
  - **Unit & Integration Suite (Vitest)**: 38 / 38 passing across 5 test suites.
  - **Playwright E2E Smoke & Critical Flow Matrix**: 69 / 69 passing across Desktop Chrome, Mobile Pixel, and Mobile iPhone SE.
  - **Playwright WCAG 2.2 AA A11y Suite**: 15 / 15 passing with zero violations.
  - Total automated tests: 122 tests executed and passing.

- [x] **SEO, Metadata & Structured Data:**
  - Dynamic `sitemap.xml` generated via `scripts/generate-sitemap.mjs` covering all 38 verified routes (static pages + all articles and conditions).
  - Verified `robots.txt` pointing to sitemap.
  - Unique titles, meta descriptions, and absolute canonical links across all routes via `SEO.tsx`.
  - `NotFoundPage.tsx` automatically emits `<meta name="robots" content="noindex, nofollow" />`.
  - Schema.org JSON-LD verified: `MedicalBusiness` / `Physician`, `FAQPage`, `MedicalWebPage`.

- [x] **Error & Edge Case Resilience:**
  - Global `ErrorBoundary.tsx` catches runtime exceptions and dynamically imported chunk loading failures (`vite:preloadError`) with auto-reload recovery.
  - Comprehensive `<noscript>` fallback banner in `index.html` with direct offline practice telephone numbers.
  - WebGL failure fallback automatically switches to static high-resolution anatomical visual.

- [x] **Content Readiness & Documentation:**
  - `npm run content:audit` audits and groups all launch-blockers by owner into `docs/LAUNCH_CHECKLIST.md` (Doctor / Clinic Staff / Developer).
  - Comprehensive `docs/QUALITY_REPORT.md` generated documenting all quality gate verifications.
  - Complete `README.md` with architecture, dev/build/test instructions, content guides, API integration examples (`ApiNoticeService`), and troubleshooting.
  - Clean non-sensitive `.env.example` verified with `.env*` excluded in `.gitignore`.

---

## Decisions Log
- **2026-10-06**: Phase 1 Foundation completed and verified.
- **2026-10-06**: Phase 2 Hero + 16-section homepage architecture completed and verified.
- **2026-10-07**: Phase 3 Patient Education & Global Search completed.
- **2026-10-07**: Phase 4 Action Layer (Assistant, Appointments, WhatsApp, Maps) completed.
- **2026-10-07**: Phase 5 Hardening & Launch Readiness completed:
  - Configured Playwright matrix for Desktop Chrome, Mobile Pixel, and Mobile iPhone SE (69/69 passing).
  - Integrated `axe-core` with 15/15 routes passing WCAG 2.2 AA (zero critical/serious violations).
  - Upgraded color contrast and label-in-name semantics across all pages and components.
  - Generated `docs/QUALITY_REPORT.md`, `docs/LAUNCH_CHECKLIST.md`, and complete `README.md`.
  - Zero TypeScript errors (`tsc -b`), zero ESLint warnings, 100% build and test pass rate.

---

## Phase 4 Acceptance Checklist

- [x] **Lib Helpers (`src/lib`):**
  - `whatsapp.ts`: E.164 normalization, validation, and dynamic message formatting for appointments, enquiries, and location links; returns `null` when env variable is missing.
  - `maps.ts`: Safe Google Maps URL and Directions generator; strict embed URL validator rejecting non-standard/untrusted domains.
  - `contact.ts`: Standardized `tel:` and `mailto:` link generators with graceful `null` handling for missing configurations.
  - Unit tests in `src/tests/libHelpers.test.ts` (12 tests) covering all edge cases.

- [x] **Action Components (`src/components/common`):**
  - `WhatsAppButton`: Supports `appointment`, `enquiry`, and `location` variants; hides or disables gracefully when env config is absent.
  - `MapSection`: Safely renders verified embed iframe or an interactive static map card with one-click directions.
  - `DirectionsButton`, `CallButton`, `EmailButton`: Hide/disable gracefully with fallback feedback.

- [x] **Rule-Based Clinic Assistant (`src/components/assistant/ClinicAssistant.tsx`):**
  - Floating trigger button positioned above mobile bottom navigation bar (`bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:bottom-6 right-4 md:right-6`) to prevent overlap.
  - Desktop floating panel with clean animations; mobile full bottom sheet with focus trap, `Escape` key dismiss, and body scroll lock.
  - Dynamic initial greeting and quick actions in English and Hindi drawn from clinic services (never hardcoded).
  - Intent matching for quick actions, clinic timings, fees, appointments, doctor credentials, and common FAQs.
  - Strict Medical Safety refusal: triggers on diagnostic, medication/dosage, or report clearance prompts with guidance to consult a qualified physician.
  - Strict Emergency Safety response: triggers on chest pain, severe hypoglycemia, or breathing distress with immediate emergency service instructions.
  - Session-only state with zero server persistence or third-party API dependencies.

- [x] **Multi-Step Appointment Request (`/book-appointment` & Homepage Section 16):**
  - Step 1 (Visit Type: New / Follow-up), Step 2 (Preferred Date & Time Window), Step 3 (Patient Contact & Reason), Step 4 (Review/Edit Summary), Step 5 (Submission Result).
  - React Hook Form + Zod schema with Indian mobile validation (+91 standard) and tolerant international format.
  - Reason field includes visible patient notice: *"Do not include detailed medical history or reports."*
  - Data minimisation with explicit patient consent checkbox; zero server persistence.
  - Submission output displays **EXACTLY**: *"Your appointment request has been prepared. Please contact the clinic to confirm availability."* (never claims booked/confirmed).
  - Post-submission actions: Prefilled WhatsApp message generation, direct phone call, and copy-to-clipboard summary.
  - Homepage Section 16 upgraded to `AppointmentTeaserSection`.

- [x] **Contact & Location Pages (`/contact`, `/clinic/location`, & Homepage Section 15):**
  - Homepage Section 15 upgraded to `LocationContactSection` with live consultation hours and direct transit guidance.
  - `/contact` and `/clinic/location` provide complete clinic details with phone, WhatsApp, email, directions, and consulting hours.
  - Structured data: Injected `MedicalClinic` Schema.org JSON-LD with verified fields only.

- [x] **Media Gallery (`/clinic/photos`):**
  - Responsive media grid with fixed aspect ratios (`aspect-4/3`, `aspect-16/9`) preventing layout shifts (CLS).
  - Category filters: Clinic Photos, Doctor Photos, Events, Videos, Health Camps, Clinic Activities.
  - Full accessible Lightbox: focus trap, `Escape` key dismiss, `ArrowLeft`/`ArrowRight` keyboard navigation, mobile touch swipe gestures, alt text, and captions.
  - Native lazy loading with blur/skeleton placeholders; video integration via lightweight `VideoFacade`.
  - Empty category state handling.

- [x] **Verification & Architectural Integrity:**
  - Zero TypeScript errors (`tsc -b`), zero ESLint warnings, 38/38 Vitest unit tests passing across 5 suites.
  - `content:audit` confirms 49 tracked placeholder/unverified items.
  - Clean production build: Vite bundle compiles in <800ms with code-splitting intact.

---

## Decisions Log
- **2026-10-06**: Phase 1 Foundation completed and verified.
- **2026-10-06**: Phase 2 Hero + 16-section homepage architecture completed and verified.
- **2026-10-07**: Phase 3 Patient Education & Search completed.
- **2026-10-07**: Phase 4 Action Layer completed:
  - Validated E.164 phone normalization and secure Google Maps embed URL checking.
  - Built pure client-side rule-based Clinic Assistant with medical advice refusal and emergency detection.
  - Positioned mobile assistant floating trigger above bottom navigation safe areas to guarantee zero overlap.
  - Implemented 5-step client-only appointment request flow with exact non-confirmation wording and WhatsApp/Call actions.
  - Upgraded media gallery with touch-swipe accessible lightbox and zero-CLS image aspect ratios.

---

## Next Steps (Phase 5 Roadmap)
When instructed to proceed with Phase 5:
1. **Production Polish, Audit Verifications & Final Hardening**:
   - Comprehensive cross-browser and mobile viewport testing (iOS Safari, Android Chrome, desktop).
   - Core Web Vitals optimization (LCP, CLS, INP) across all pages.
   - Accessibility audit (WCAG 2.1 AA compliance, full screen-reader walkthrough, color contrast validation).
   - Final review of all 49 `[CONTENT TO BE VERIFIED]` tokens before deployment.
