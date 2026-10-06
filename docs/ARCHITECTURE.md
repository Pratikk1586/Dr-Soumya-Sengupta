# Dr. Soumya Sengupta — Diabetology Practice Web Architecture

## 1. System Vision & Clinical Mission
The web platform for **Dr. Soumya Sengupta, Diabetologist** is an authoritative, patient-centric, and bilingual (English / हिन्दी) digital presence. Designed with medical rigor, calm aesthetics, and high accessibility, it guides patients and families along an intentional clinical journey:
**SEE** (authoritative credentials & calm presentation) $\rightarrow$ **UNDERSTAND** (scientific clarity, metabolic education, bilingual accessibility) $\rightarrow$ **TRUST** (transparent clinic logistics, verified information, ethical guidelines) $\rightarrow$ **TAKE ACTION** (frictionless appointment inquiry, clinic navigation, and helpline contact).

---

## 2. Architectural Principles & Layering

### 2.1 Pure Frontend Architecture
- **Zero Backend / Zero Database / Zero Auth**: No server-side runtime, database connections, admin portals, or sensitive storage.
- **Privacy First**: No patient medical history, lab records, or identifiable health information (PHI) are stored in localStorage, sessionStorage, cookies, or cloud storage.
- **Client-Side Service Abstraction**: Every domain is decoupled via explicit TypeScript interfaces. UI components **never** directly access `src/data/*`.

```
┌─────────────────────────────────────────────────────────────────┐
│                    UI Layer (React 19 + TS)                     │
│    Pages, Shell (Navbar/Footer/BottomNav), Primitives, A11y     │
└────────────────────────────────▲────────────────────────────────┘
                                 │ (uses hooks: useService/useAsync)
┌────────────────────────────────┴────────────────────────────────┐
│                     Service Interface Layer                     │
│    DoctorService, ServiceCatalogService, ConditionService,      │
│    NoticeService, ArticleService, FaqService, VideoService,     │
│    ReviewService, ClinicService, ReportService, GuideService... │
└───────────────▲─────────────────────────────────▲───────────────┘
                │                                 │
┌───────────────┴───────────────┐ ┌───────────────┴───────────────┐
│     Local Implementations     │ │      Future API Adaptor       │
│     (src/services/local*)     │ │     (src/services/api*)       │
└───────────────▲───────────────┘ └───────────────────────────────┘
                │
┌───────────────┴───────────────┐
│      Local Seed Datasets      │
│    (doctor, services, etc.)   │
│    (src/data/_placeholders)   │
└───────────────────────────────┘
```

### 2.2 ESLint Architectural Enforcement
Direct imports from `src/data` are strictly forbidden for components, pages, hooks, and contexts via ESLint `no-restricted-imports`:
```js
{
  files: ['src/components/**/*', 'src/pages/**/*', 'src/hooks/**/*', 'src/context/**/*'],
  rules: {
    'no-restricted-imports': ['error', { patterns: [{ group: ['*data/*', '**/data/*', '../data/*', '../../data/*'] }] }]
  }
}
```

---

## 3. Complete Folder Structure

```
website/
├── docs/
│   └── ARCHITECTURE.md          # Architecture specification & route mappings
├── public/
│   ├── _redirects               # Netlify SPA rewrite rule
│   ├── robots.txt               # Web crawler guidance
│   ├── sitemap.xml              # Generated search engine sitemap
│   └── site.webmanifest         # PWA / web application manifest
├── scripts/
│   ├── content-audit.mjs        # Scans for unresolved placeholders (npm run content:audit)
│   └── generate-sitemap.mjs     # Generates public/sitemap.xml
├── src/
│   ├── components/
│   │   ├── common/              # Base primitives: Button, Card, Badge, SmartImage, etc.
│   │   └── layout/              # AppLayout, Navbar, MobileDrawer, BottomNav, Footer
│   ├── config/
│   │   ├── constants.ts         # Safety markers, standard disclaimer constants
│   │   ├── env.ts               # Safe, typed environment variables
│   │   └── navigation.ts        # Unified navigation item mapping
│   ├── context/
│   │   ├── LanguageContext.tsx  # Bilingual context provider
│   │   ├── languageContextDef.ts# Context interface definitions
│   │   └── useLanguage.ts       # Hook accessing language state
│   ├── data/
│   │   ├── _placeholders.ts     # Content verification registry
│   │   ├── articles.ts          # Clinical articles
│   │   ├── clinic.ts            # Chamber schedule and locations
│   │   ├── conditions.ts        # Endocrine and metabolic conditions
│   │   ├── doctor.ts            # Doctor qualifications and experience
│   │   ├── faqs.ts              # Patient frequently asked questions
│   │   ├── guides.ts            # Patient self-care guides
│   │   ├── notices.ts           # Chamber schedule announcements
│   │   ├── problems.ts          # Clinical problem navigator
│   │   ├── reports.ts           # Biomarker and lab report guides
│   │   ├── reviews.ts           # Patient experience feedback
│   │   ├── services.ts          # Structured diabetes programs
│   │   └── videos.ts            # Educational video metadata
│   ├── hooks/
│   │   ├── useAsync.ts          # Async state handler (loading/error)
│   │   ├── useLocalStorage.ts   # Guarded SSR-safe storage persistence
│   │   └── useService.ts        # Service consumption hook
│   ├── i18n/
│   │   ├── en.ts                # English dictionary
│   │   ├── hi.ts                # Hindi dictionary (preserves standard medical terms)
│   │   └── index.ts             # Dot-notation translation resolver
│   ├── pages/
│   │   ├── clinic/              # Chamber overview, facilities, photos, timings, location
│   │   ├── conditions/          # Condition list and detail pages (:slug)
│   │   ├── diabetes/            # Care overview and sub-program pages (:slug)
│   │   ├── resources/           # Hub, articles, FAQs, videos, reports, guides
│   │   ├── AboutPage.tsx        # Doctor credentials with anchor sections
│   │   ├── BookAppointmentPage.tsx # Consultation inquiry flow
│   │   ├── ContactPage.tsx      # Multi-channel chamber contact
│   │   ├── DisclaimerPage.tsx   # Universal medical disclaimer
│   │   ├── HomePage.tsx         # Practice homepage
│   │   ├── NotFoundPage.tsx     # 404 handler
│   │   └── PrivacyPage.tsx      # Privacy statement
│   ├── routes/
│   │   └── index.tsx            # Route-level lazy loading and Suspense configuration
│   ├── services/
│   │   ├── index.ts             # IoC container exporting singleton service instances
│   │   ├── localServices.ts     # Local data implementations
│   │   └── types.ts             # Service interface declarations
│   ├── styles/
│   │   └── globals.css          # Tailwind CSS v4 design tokens and a11y rules
│   ├── tests/
│   │   └── smoke.test.ts        # Vitest smoke tests
│   ├── types/
│   │   └── index.ts             # TypeScript domain types
│   ├── utils/
│   │   └── cn.ts                # Class merging utility
│   ├── App.tsx                  # Root application wrapper
│   ├── index.css                # Style import entry
│   └── main.tsx                 # Client bootstrap
├── .env.example                 # Environment template
├── eslint.config.js             # ESLint configuration with architecture rules
├── package.json                 # Pinned dependencies and execution scripts
├── tsconfig.json                # TypeScript project configuration
├── vercel.json                  # SPA rewrite configuration
└── vitest.config.ts             # Unit test runner configuration
```

---

## 4. Route-to-Navbar Exact Mapping

| Navbar Item | Route / Anchor | Component / Shell | Purpose |
|---|---|---|---|
| **Home** | `/` | `HomePage` | Practice overview, doctor bio summary, clinical specializations |
| **About Doctor** | `/about` | `AboutPage` | Full clinical biography and philosophy |
| └ *Overview* | `/about#overview` | `AboutPage` | Practice background & philosophy |
| └ *Qualifications* | `/about#qualifications` | `AboutPage` | MBBS, MD, and Diabetology credentials |
| └ *Experience* | `/about#experience` | `AboutPage` | Hospital & chamber practice tenure |
| └ *Expertise* | `/about#expertise` | `AboutPage` | Type 1, Type 2, CGM, and organ preservation |
| └ *Memberships* | `/about#memberships` | `AboutPage` | RSSDI, API, and Endocrine Society affiliations |
| **Diabetes Care** | `/diabetes-care` | `DiabetesCarePage` | Specialized care program catalog |
| └ *Comprehensive Care* | `/diabetes-care/management` | `ServiceDetailPage` | Glycemic optimization protocols |
| └ *Prediabetes & Remission*| `/diabetes-care/prediabetes` | `ServiceDetailPage` | Halting disease progression |
| └ *CGM & Sensor Training* | `/diabetes-care/education` | `ServiceDetailPage` | Sensor application and Time in Range |
| └ *Cardiometabolic Balance*| `/diabetes-care/lifestyle` | `ServiceDetailPage` | Heart, lipid, and blood pressure coordination |
| └ *Complication Screening* | `/diabetes-care/complications`| `ServiceDetailPage` | Kidney, neuropathy, and retinopathy screening |
| **Conditions** | `/conditions` | `ConditionsListPage` | Metabolic conditions index |
| └ *Type 1 & 2 Diabetes* | `/conditions/diabetes` | `ConditionDetailPage` | Diabetes symptom & management profiles |
| └ *Thyroid Disorders* | `/conditions/thyroid` | `ConditionDetailPage` | TSH, Hypo/Hyperthyroidism care |
| └ *Weight Management* | `/conditions/weight-management`| `ConditionDetailPage` | Visceral fat & metabolic obesity |
| └ *Metabolic Syndrome* | `/conditions/metabolic-health`| `ConditionDetailPage` | Triglycerides, HDL, and vascular health |
| └ *Other Endocrine* | `/conditions/other` | `ConditionDetailPage` | Gestational shifts, bone and adrenal health |
| **Patient Resources** | `/patient-resources` | `ResourcesHubPage` | Central educational library |
| └ *Knowledge Hub* | `/patient-resources/knowledge-hub` | `ResourcesHubPage` | Knowledge library overview |
| └ *Clinical Articles* | `/patient-resources/articles` | `ArticlesListPage` | Physician-reviewed articles |
| └ *Article Detail* | `/patient-resources/articles/:slug` | `ArticleDetailPage` | In-depth medical explainer |
| └ *FAQs* | `/patient-resources/faqs` | `FaqsPage` | Categorized patient questions |
| └ *Educational Videos* | `/patient-resources/videos` | `VideosPage` | Demonstration videos |
| └ *Lab Reports* | `/patient-resources/reports` | `ReportsPage` | HbA1c, uACR, and lipid biomarker guides |
| └ *Patient Guides* | `/patient-resources/guides` | `GuidesPage` | Fasting prep and foot self-care |
| **Chamber & Clinic** | `/clinic` | `ClinicOverviewPage` | Chamber logistics overview |
| └ *Facilities* | `/clinic/facilities` | `FacilitiesPage` | Diagnostic equipment on-site |
| └ *Photos* | `/clinic/photos` | `PhotosPage` | Consultation environment gallery |
| └ *OPD Timings* | `/clinic/timings` | `TimingsPage` | Consultation schedule & slots |
| └ *Location & Map* | `/clinic/location` | `LocationPage` | Address, landmarks, and transit |
| **Contact** | `/contact` | `ContactPage` | Direct phone, WhatsApp, and email |
| **Book Appointment** | `/book-appointment` | `BookAppointmentPage` | Consultation slot request flow |
| **Privacy Policy** | `/privacy` | `PrivacyPage` | Patient confidentiality & data terms |
| **Medical Disclaimer** | `/disclaimer` | `DisclaimerPage` | Non-prescriptive informational terms |
| **Fallback** | `*` | `NotFoundPage` | 404 error page |

---

## 5. Localization & Translation Architecture

- Typed dictionary: `src/i18n/en.ts` and `src/i18n/hi.ts`.
- Dot-notation resolver: `getTranslation(path, lang)` with fallback to English.
- Helper `localize(LocalizedString, lang)` for bilingual content objects.
- Devanagari rules: line-height increased to `1.75`, strictly `letter-spacing: normal !important` for clean script rendering.
- Standard medical terms (HbA1c, TSH, CGM, uACR) are kept intact with Hindi explanations.

---

## 6. Content Safety Protocol & Auditing

- Placeholder indicator: `[CONTENT TO BE VERIFIED]`.
- Registered items cataloged in `src/data/_placeholders.ts`.
- Content verification script:
  ```bash
  npm run content:audit
  ```
  Audits all data files and outputs line-by-line unresolved items requiring doctor approval.
- Educational materials default to `reviewStatus: 'draft'`.
- Universal disclaimer: *"For medical diagnosis or treatment, please consult a qualified doctor."*
