# Project Progress — Dr. Soumya Sengupta Website

## Roadmap & Milestones

- [x] **Phase 1: Foundation, Architecture, Design System & Layout Shell** (Completed)
- [x] **Phase 2: Hero + Homepage (Trust & Clinic Sections)** (Completed)
- [x] **Phase 3: Patient Education, Search & Hindi/English Content** (Completed)
- [x] **Phase 4: Action Layer (Assistant, Appointment, WhatsApp, Maps, Contact, Gallery)** (Completed)
- [ ] **Phase 5: Production Polish, Audit Verifications & Final Hardening**

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
