# Project Progress — Dr. Soumya Sengupta Website

## Roadmap & Milestones

- [x] **Phase 1: Foundation, Architecture, Design System & Layout Shell** (Completed)
- [x] **Phase 2: Hero + Homepage (Trust & Clinic Sections)** (Completed)
- [x] **Phase 3: Patient Education, Search & Hindi/English Content** (Completed)
- [ ] **Phase 4: Scientific 3D Visualization (Glucose Regulation & Metabolism) with A11y Fallback** (Upcoming)
- [ ] **Phase 5: Production Polish, Audit Verifications & Final Hardening**

---

## Phase 3 Acceptance Checklist

- [x] **Know Your Problem (Homepage Section 7 + data/problems.ts):**
  - Interactive selector across 6 clinical topics (High Blood Sugar, High HbA1c, Weight Gain, Thyroid Report, Frequent Thirst, Diabetes Management).
  - Accessible tablist / radio pattern with keyboard navigation (`ArrowLeft`/`ArrowRight`/`Home`/`End`) and animated transitions respecting `prefers-reduced-motion`.
  - Visible prominent non-diagnostic notice: *"This guide provides general educational information and is NOT a medical diagnosis. For personal advice, please consult Dr. Sengupta."*
  - Direct links to related clinic pages, patient guides, and appointment booking CTA.

- [x] **Reports (Single source: data/reports.ts) — Two presentations:**
  - Single source of truth in `src/data/reports.ts` powering both:
    1. Homepage Section 10 ("Know Your Numbers"): Glycemic & metabolic biomarker cards (Glucose, HbA1c, BP, Cholesterol, BMI).
    2. Subpage `/patient-resources/reports` ("Understand Your Reports"): 7 clinical biomarkers (including uACR and TSH) with structured 3-panel breakdown (What it is, Why it is measured, General educational meaning).
  - No diagnostic calculator or personal interpretation inputs.
  - Sourced guidelines with citation (`ADA 2026 Standards of Care`, `KDIGO 2024`, `ATA 2024`, `ACC/AHA 2024`, `WHO Asia-Pacific`). Unverified targets marked `[CONTENT TO BE VERIFIED] ranges to be confirmed by Dr. Sengupta`.
  - Standing notice on all presentations: *"Normal ranges vary by lab and individual. Consult Dr. Sengupta for personal clinical interpretation."*

- [x] **Articles & Knowledge Hub (Homepage Section 11 + /patient-resources/knowledge-hub):**
  - Curated clinical articles across required categories (Type 2 Diabetes, CGM & Tech, Prediabetes & Remission, Hypoglycemia, Diabetic Foot Care, Diet & Nutrition, Thyroid Health, Complications).
  - Homepage Knowledge Hub features the highlighted guide plus recent articles list.
  - `/patient-resources/knowledge-hub` includes URL query param category filtering (`?category=...`), reading time estimates, and friendly empty states.
  - Article detail page (`/patient-resources/knowledge-hub/:slug`) includes `MedicalWebPage` JSON-LD schema, copyable share link, related articles, breadcrumbs, and medical disclaimer banner.

- [x] **FAQs (/patient-resources/faqs + data/faqs.ts):**
  - 10 comprehensive FAQs across 6 categories (Diabetes, Thyroid, Weight Management, Clinic Logistics, Appointments, Reports).
  - Fully accessible accordion with `aria-expanded` and `aria-controls`.
  - Instant live filter search by question keyword + category filter pills.
  - Direct URL hash deep-linking (`#slug` opens the target accordion item smoothly).
  - Valid `FAQPage` JSON-LD structured data embedded.

- [x] **Patient Self-Care Guides (/patient-resources/guides + data/guides.ts):**
  - 4 actionable guides (Lifestyle & Meals, Blood Sugar Monitoring, Appointment Prep, Diabetic Foot Care).
  - Interactive step-by-step checklists with emergency safety callout warnings.
  - PDF download handler with graceful "PDF coming soon" toast when local assets are pending.

- [x] **Doctor Explains Videos (Homepage Section 12 + /patient-resources/videos):**
  - Lightweight `VideoFacade` component: zero YouTube scripts or iframes loaded until patient clicks play (`youtube-nocookie.com`).
  - Full transcripts in both English and Hindi with collapsible transcript toggle.
  - Category filtering, duration badges, and direct links between homepage and library.

- [x] **Global Smart Search (Cmd/Ctrl+K, '/', navbar trigger):**
  - Accessible modal dialog (`SearchModal`) with focus trap, Esc/backdrop dismiss, and keyboard shortcuts (`↑`/`↓` navigate, `Enter` select).
  - Real-time client-side search across 9 categories (Conditions, Services, Articles, FAQs, Videos, Reports, Guides, Notices, Clinic pages).
  - Weighted ranking: exact title match (150) > prefix title (100) > keyword/tag (30-40) > body/transcript (10-20).
  - Bilingual indexing: searches against active language content with Hindi and English queries.
  - Category grouping with hit counts and query match highlighting (`<mark>`).
  - Recent searches persisted in `localStorage` under `sg_recent_searches` (max 5, clearable, re-runnable).
  - Empty state with popular suggested searches; zero-results state with suggestions.
  - Screen reader `aria-live="polite"` result count announcements.

- [x] **Verification & Architectural Integrity:**
  - Zero direct data imports in UI components (`no-restricted-imports` enforced via `src/services/`).
  - Zero TypeScript errors (`tsc -b`), zero ESLint warnings, 16/16 Vitest unit tests passing.
  - `content:audit` confirms 49 tracked placeholder/unverified items.
  - Vite production build generates 46 clean code-split chunks in <1s.

---

## Decisions Log
- **2026-10-06**: Phase 1 Foundation completed and verified.
- **2026-10-06**: Phase 2 Hero + 16-section homepage architecture completed and verified.
- **2026-10-07**: Phase 3 Patient Education & Search completed:
  - Single-sourced biomarker definitions into `src/data/reports.ts` to power both Homepage Section 10 and `/patient-resources/reports`.
  - Implemented YouTube nocookie facade with transcript support to maintain 0ms third-party script penalty.
  - Built pure TypeScript weighted fuzzy search service (`LocalSearchService`) indexing 9 clinical domains with active language weighting.
  - Maintained strict non-diagnostic positioning across all symptom guidance tools and report explainers.

---

## Next Steps (Phase 4 Roadmap)
When instructed to proceed with Phase 4:
1. **Scientific 3D Visualization: Glucose Regulation & Metabolism**:
   - Interactive 3D visual demonstrating insulin receptor docking, glucose cellular uptake, and pancreatic beta-cell insulin secretion.
   - Accessible 2D fallback with step-by-step diagrammatic text for low-power devices and screen readers.
   - Integration into the educational sections with smooth camera movements and interactive speed controls.
