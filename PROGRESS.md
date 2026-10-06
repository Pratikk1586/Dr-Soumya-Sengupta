# Project Progress — Dr. Soumya Sengupta Website

## Roadmap & Milestones

- [x] **Phase 1: Foundation, Architecture, Design System & Layout Shell** (Completed)
- [ ] **Phase 2: Comprehensive Content & Specialty Pages** (Upcoming)
- [ ] **Phase 3: Interactive Clinical Modules & Patient Engagement**
- [ ] **Phase 4: Scientific 3D Visualization (Glucose Regulation & Metabolism) with A11y Fallback**
- [ ] **Phase 5: Production Polish, Audit Verifications & Final Hardening**

---

## Phase 1 Acceptance Checklist

- [x] **Typecheck, lint, build, test, and preview all pass with zero errors:**
  - `npm run typecheck` passes (strict mode, zero `any`).
  - `npm run lint` passes (ESLint with `no-restricted-imports`).
  - `npm run test` passes (Vitest smoke testing).
  - `npm run build` succeeds with route-level lazy loading (418ms).
  - `npm run preview` verified with HTTP 200 on all deep links.
- [x] **Every route in the map renders and survives refresh:**
  - `/`, `/about` (#overview #qualifications #experience #expertise #memberships).
  - `/diabetes-care`, `/diabetes-care/:slug` (management, prediabetes, education, lifestyle, complications).
  - `/conditions`, `/conditions/:slug` (diabetes, thyroid, weight-management, metabolic-health, other).
  - `/patient-resources`, `/patient-resources/knowledge-hub`, `/patient-resources/articles`, `/patient-resources/articles/:slug`, `/patient-resources/faqs`, `/patient-resources/videos`, `/patient-resources/reports`, `/patient-resources/guides`.
  - `/clinic`, `/clinic/facilities`, `/clinic/photos`, `/clinic/timings`, `/clinic/location`.
  - `/contact`, `/book-appointment`, `/privacy`, `/disclaimer`, `*` (NotFound).
- [x] **Navbar dropdowns & Layout Shell:**
  - Sticky navbar with hover-intent and full keyboard support (Enter/Space opens, Esc closes, arrow and Tab navigation, aria-expanded).
  - Mobile accessible drawer with focus trap, Esc to dismiss, body scroll lock, and nested accordions.
  - Persistent bottom nav on mobile (Home, Services, Book, WhatsApp) with safe area insets and `100dvh` handling.
  - Reserved padding on main content so future chatbot float never overlaps bottom navigation.
  - Production-grade footer with dynamic clinic contact and medical emergency notice.
- [x] **i18n Infrastructure:**
  - Bilingual switcher (EN | हिंदी) with localStorage persistence via `useLocalStorage`.
  - Dynamically sets `<html lang>` ("en" / "hi") and activates Devanagari typography tuning.
  - Typed translation dictionaries (`src/i18n/en.ts` and `src/i18n/hi.ts`).
  - Preserved standard clinical terms (HbA1c, TSH, CGM, uACR) with Hindi explanations.
  - Polymorphic `t()` and `localize(LocalizedString)` helpers.
- [x] **Data & Service Layer Decoupling:**
  - UI components strictly forbidden from importing `src/data` (enforced via ESLint `no-restricted-imports`).
  - 12 domain services defined via interfaces (`src/services/types.ts`) and local implementations (`src/services/localServices.ts`).
  - Central singleton factory (`src/services/index.ts`).
  - Reusable `useAsync` and `useService` hooks with automatic loading and error state management.
- [x] **Content Safety & Verification:**
  - Created `src/data/_placeholders.ts` with `[CONTENT TO BE VERIFIED]` marker.
  - Educational content defaults to `reviewStatus: 'draft'`.
  - `npm run content:audit` script scans and reports all 36 registered unverified fields.
  - Universal medical disclaimer: *"For medical diagnosis or treatment, please consult a qualified doctor."*
- [x] **Graceful Degradation:**
  - Typed helper `src/config/env.ts` handles empty `.env` variables gracefully without broken links or crashes.
  - Call, WhatsApp, and Google Maps actions degrade to informative messages or fallbacks when unset.
- [x] **SEO & Deployment:**
  - Reusable `SEO` component with title template, canonical URL, and OpenGraph/Twitter tags.
  - `public/robots.txt`, `public/sitemap.xml` generator script (`npm run sitemap`), and `public/site.webmanifest`.
  - SPA rewrites configured for Vercel (`vercel.json`) and Netlify (`public/_redirects`).
- [x] **Documentation:**
  - [ARCHITECTURE.md](file:///Users/pratik/Desktop/Work/Dr%20Soumya/Website/docs/ARCHITECTURE.md) and [PROGRESS.md](file:///Users/pratik/Desktop/Work/Dr%20Soumya/Website/PROGRESS.md) fully written.

---

## Decisions Log
- **2026-10-06**: Adopted React 19 + Vite 8 + Tailwind CSS v4 (`@tailwindcss/vite`) with custom calm clinical palette tokens and `Noto Sans Devanagari` typography rules.
- **2026-10-06**: Enforced ESLint `no-restricted-imports` prohibiting UI components from directly touching `src/data/*`. All UI operations must route through the service abstraction layer (`src/services/index.ts`).
- **2026-10-06**: Implemented route-level lazy loading (`React.lazy` + `Suspense`) across all 30 routes to ensure optimal Core Web Vitals and zero render blocking.
- **2026-10-06**: Built `useAsync` and `useService` with React hooks effect purity rules, eliminating cascading renders and render-time ref mutations.
- **2026-10-06**: Integrated `useLocalStorage` with SSR/sandbox fallback safety for user language preference persistence.

---

## Known Issues / Blockers
- None. Clean build, lint, typecheck, tests, and audit all pass.

---

## Next-Phase Notes (Phase 2 Preview)
- Expand rich clinical content, interactive symptom checkers, and in-depth articles for each of the 5 diabetes care programs and metabolic condition pages.
- Enrich clinic photographs and interactive facilities showcase.
- Add search indexing and filtering to the search palette.
