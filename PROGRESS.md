# Project Progress — Dr. Soumya Sengupta Website

## Roadmap & Milestones

- [x] **Phase 1: Architecture, Type System, Service Abstractions & Core Configuration** (Completed)
- [ ] **Phase 2: Design Tokens, Accessible Shell, Navigation & Bilingual Engine** (Upcoming)
- [ ] **Phase 3: Core Medical Pages & Service Catalogs**
- [ ] **Phase 4: Scientific 3D Visualization (Glucose Regulation & Metabolism) with A11y Fallback**
- [ ] **Phase 5: Interactive Appointment Request Flow, Content Verification Audit & Final Hardening**

---

## Phase 1 Acceptance Checklist

- [x] Strict TypeScript setup with `noImplicitAny: true` and zero `any` usage.
- [x] Architecture document created at `docs/ARCHITECTURE.md`.
- [x] Type definitions established:
  - `LocalizedString` with fallback support (`src/types/content.ts`).
  - Doctor profile, clinic schedules, and contact structures (`src/types/doctor.ts`, `src/types/clinic.ts`).
  - Clinical services, conditions, and treatment approaches (`src/types/services.ts`).
  - Educational articles, FAQs, and metabolic metrics (`src/types/education.ts`).
  - Appointment inquiry schemas and types (`src/types/appointment.ts`).
- [x] Placeholder system created (`src/data/_placeholders.ts`) with visible marker `[CONTENT TO BE VERIFIED]` and catalog registry.
- [x] Domain data models created in `src/data/` (`doctor.ts`, `clinics.ts`, `clinicalServices.ts`, `education.ts`, `faq.ts`).
- [x] Service abstraction layer created (`src/services/`):
  - Interfaces: `IDoctorService`, `IClinicService`, `IMedicalContentService`, `IAppointmentService`.
  - Local implementations: `LocalDoctorService`, `LocalClinicService`, `LocalMedicalContentService`, `LocalAppointmentService`.
  - IoC service container exporting singleton service instances (`src/services/index.ts`).
  - Layering rule enforced: Components access data strictly through the service layer.
- [x] Language Context (`LanguageContext.tsx`, `languageContextDef.ts`, `useLanguage.ts`) with English and Hindi support, local storage persistence, and document lang/class sync.
- [x] Environment variable configuration (`src/config/env.ts`) with graceful degradation handlers for phone, WhatsApp, and Google Maps.
- [x] Verification Badge (`VerificationBadge.tsx`) and Universal Medical Disclaimer Banner (`MedicalDisclaimerBanner.tsx`).
- [x] Clean build and lint check: `npm run typecheck`, `npm run lint`, and `npm run build` all pass with 0 warnings and 0 errors.

---

## Decisions Log
- **2026-10-06**: Scaffolded modern Vite 8 + React 19 + TypeScript (strict mode enabled with `noImplicitAny: true` and `strictNullChecks: true`).
- **2026-10-06**: Integrated Tailwind CSS v4 using `@tailwindcss/vite` with medical color palette (`slate-teal`, `sage`, `linen`, `notice-amber`) and typography tokens (`Inter`, `Newsreader`, `Noto Sans Devanagari`).
- **2026-10-06**: Pinned Three.js v0.186, `@react-three/fiber` v9.8, and `@react-three/drei` v10.7 with verified React 19 compatibility.
- **2026-10-06**: Implemented strict layer isolation: components are barred from importing `src/data/*` directly; all reads route through interfaces and service instances (`doctorService`, `clinicService`, `medicalContentService`, `appointmentService`).
- **2026-10-06**: Enforced Content Safety Protocol: unverified data contains the mandatory `[CONTENT TO BE VERIFIED]` marker and is cataloged in `src/data/_placeholders.ts`; educational content carries `reviewStatus: 'draft'` and the universal disclaimer.
- **2026-10-06**: Extracted `LanguageContext` definitions and `useLanguage` hook into single-responsibility modules to maintain 100% React Fast Refresh compliance and zero linter warnings.

---

## Known Issues / Blockers
- None. Zero errors, zero warnings.

---

## Next-Phase Notes (Phase 2 Preview)
- Build the persistent clinical Shell: sticky clinical header with emergency contact notice, high-contrast navbar, mobile drawer with touch target $\ge 44$px, language toggle button, and footer.
- Configure client-side routing (`/`, `/about`, `/services`, `/education`, `/clinics`, `/contact`, `/appointment`) using React Router 7.
- Implement reusable clinical UI primitives: `ClinicalCard`, `PageHeader`, `SectionWrapper`, `CallToActionStrip`, and `A11ySkipLink`.
