# Project Progress — Dr. Soumya Sengupta Website

## Roadmap & Milestones

- [x] **Phase 1: Foundation, Architecture, Design System & Layout Shell** (Completed)
- [x] **Phase 2: Hero + Homepage (Trust & Clinic Sections)** (Completed)
- [ ] **Phase 3: Interactive Clinical Modules & Patient Engagement** (Upcoming)
- [ ] **Phase 4: Scientific 3D Visualization (Glucose Regulation & Metabolism) with A11y Fallback**
- [ ] **Phase 5: Production Polish, Audit Verifications & Final Hardening**

---

## Phase 2 Acceptance Checklist

- [x] **Hero text/CTA visible instantly; 3D loads after; Lighthouse mobile LCP not blocked by 3D:**
  - Lightweight pure SVG/CSS medical visual (`HeroStaticVisual`) acts as the immediate LCP element (0ms JS delay).
  - 3D layer (`PancreasHero3D`) is lazy-loaded (`React.lazy` + `Suspense`, scheduled via idle callback).
- [x] **Three/R3F code is in a separate chunk NOT loaded on non-home routes:**
  - `dist/assets/PancreasHero3D-*.js` (1.0MB) isolated in its own dedicated chunk.
  - All non-home pages (About, Conditions, Services, Clinic, etc.) load tiny 2-7 kB chunks without Three.js overhead.
- [x] **Force-fail WebGL (and low-power/reduced-motion) -> premium static fallback, no empty space:**
  - `WebGLSupportDetector` checks context availability and device capabilities.
  - `HeroErrorBoundary` intercepts context loss or rendering crashes and renders `HeroStaticVisual`.
  - `prefers-reduced-motion` suppresses dynamic Canvas mount in favor of crisp SVG.
- [x] **3D pauses off-screen; no memory growth on repeated route navigation:**
  - `IntersectionObserver` throttles frameloop to `'demand'` when off-screen.
  - `visibilitychange` pauses render loop when browser tab is hidden.
  - All geometries and materials cleanly disposed on unmount.
  - Mobile Safari/Chrome touch scrolling enabled via `touch-action: pan-y`.
- [x] **Homepage order exactly matches spec; no CLS; no horizontal overflow at 320px-1440px:**
  1. Hero (`HeroSection`)
  2. Quick Clinic Information (`QuickClinicInfo`)
  3. Recent Notices (`RecentNoticesSection`)
  4. How Can We Help? (`HowCanWeHelpSection`)
  5. About Dr. Sengupta (`AboutDoctorSection`)
  6. Conditions & Services (`ConditionsServicesSection`)
  7. [Slot Placeholder] Know Your Problem (`SectionSlotPlaceholder slot 7`)
  8. Treatment / Care journey (`CareJourneySection`, 6-step visual & accessible ordered list)
  9. Why Choose Dr. Sengupta (`WhyChooseSection`, non-claim positioning)
  10. [Slot Placeholder] Know Your Numbers (`SectionSlotPlaceholder slot 10`)
  11. [Slot Placeholder] Knowledge Hub (`SectionSlotPlaceholder slot 11`)
  12. [Slot Placeholder] Dr. Sengupta Explains (`SectionSlotPlaceholder slot 12`)
  13. Patient Reviews (`PatientReviewsSection`, feature-flagged, NMC ethics disclaimer)
  14. Clinic Showcase (`ClinicShowcaseSection`, photo grid, links to `/clinic/photos`)
  15. [Slot Placeholder] Location & Contact (`SectionSlotPlaceholder slot 15`)
  16. [Slot Placeholder] Book Appointment (`SectionSlotPlaceholder slot 16`)
- [x] **Notices Recent/All tabs, filters, and empty states work; dates correct in IST:**
  - Filter logic runs in `Asia/Kolkata` (IST) within 72-hour window.
  - 5 categories supported: Holiday, Changed Timings, Health Camp, Important Update, Clinic Announcement.
  - Proper empty states when no recent notices match.
- [x] **About/Diabetes Care/Conditions/Clinic pages all have real structure and SEO:**
  - Subpages populated with rich clinical layouts, breadcrumbs, SEO, localized UI, and appointment CTAs.
- [x] **Placeholders registered; content:audit updated; test suite passing:**
  - `npm run content:audit` catalogs all 40 registered unverified fields.
  - `npm run test` passes (5/5 unit tests).
  - `npm run typecheck` passes (strict zero-`any`).
  - `npm run lint` passes (0 errors, 0 warnings).
  - `npm run build` succeeds (45 chunks).

---

## Decisions Log
- **2026-10-06**: Phase 1 Foundation completed and verified.
- **2026-10-06**: Integrated Three.js + R3F + Drei with procedural human pancreas anatomical composition (parenchyma lobes, main duct of Wirsung, luminous Islets of Langerhans beta-cell clusters). Probes `PANCREAS_MODEL_PATH` (`/assets/models/pancreas.glb`) to load external GLTF automatically if present.
- **2026-10-06**: Created deterministic pseudo-random particle dispersion (`pseudoRandom`) for `MedicalParticles` to guarantee React effect purity (`react-hooks/purity`).
- **2026-10-06**: Guarded Patient Reviews behind `ENABLE_PATIENT_REVIEWS_SECTION` and added National Medical Commission (NMC) ethics disclaimer banner.
- **2026-10-06**: Implemented `isRecentInIST` date filter to accurately compute 3-day notice recency in `Asia/Kolkata` timezone.

---

## Next Steps (Phase 3 Roadmap)
When the user requests Phase 3:
1. **Interactive Clinical Modules**:
   - Section 7: "Know Your Problem" symptom guidance questionnaire.
   - Section 10: "Know Your Numbers" interactive biomarker calculator (HbA1c to estimated average glucose, TIR target slider, BMI/waist risk guide).
   - Section 11: "Knowledge Hub" patient article browser and search filters.
   - Section 12: "Dr. Sengupta Explains" responsive video dialog player.
   - Section 15 & 16: Interactive Leaflet/Maps embed and full interactive appointment booking multi-step form with React Hook Form + Zod.
