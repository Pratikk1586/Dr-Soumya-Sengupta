# Dr. Soumya Sengupta — Diabetology Practice Web Architecture

## 1. System Vision & Clinical Mission
The web platform for **Dr. Soumya Sengupta, Diabetologist** is an authoritative, patient-centric, and bilingual (English / हिन्दी) digital presence. Designed with medical rigor, calm aesthetics, and high accessibility, it guides patients and families along an intentional clinical journey:
**SEE** (authoritative credentials & calm presentation) $\rightarrow$ **UNDERSTAND** (scientific clarity, metabolic education, bilingual accessibility) $\rightarrow$ **TRUST** (transparent clinic logistics, verified information, ethical guidelines) $\rightarrow$ **TAKE ACTION** (frictionless appointment inquiry, clinic navigation, and helpline contact).

---

## 2. Architectural Principles & Non-Negotiables

### 2.1 Pure Frontend Architecture
- **Zero Backend / Zero Database / Zero Auth**: No server-side runtime, database connections, admin portals, or sensitive storage.
- **Privacy First**: No patient medical history, lab records, or identifiable health information (PHI) are stored in localStorage, sessionStorage, cookies, or cloud storage.
- **Client-Side Service Abstraction**: Every domain is decoupled via explicit TypeScript interfaces. UI components **never** directly access `src/data/*`.

```
┌────────────────────────────────────────────────────────┐
│                   UI Layer (React 19)                  │
│       Pages, Clinical Components, 3D Canvas, A11y      │
└───────────────────────────▲────────────────────────────┘
                            │ (uses hooks / services)
┌───────────────────────────┴────────────────────────────┐
│                    Service Interface Layer             │
│    IDoctorService, IClinicService, IMedicalContent...   │
└─────────────▲──────────────────────────────▲───────────┘
              │                              │
┌─────────────┴─────────────┐  ┌─────────────┴───────────┐
│   Local Implementations   │  │   Future API Adaptor    │
│    (LocalDoctorService)   │  │   (ApiDoctorService)    │
└─────────────▲─────────────┘  └─────────────────────────┘
              │
┌─────────────┴─────────────┐
│    Local Seed Datasets    │
│   (src/data/_placeholders)│
└───────────────────────────┘
```

---

## 3. Localization Architecture (Bilingual EN / हिन्दी)

### 3.1 Data Model
Every user-facing piece of text is typed via `LocalizedString`:
```ts
export type Language = 'en' | 'hi';

export interface LocalizedString {
  en: string;
  hi?: string;
}
```
- **Fallback Rule**: If `hi` is undefined or blank, the resolver fallback mechanism immediately displays `en`.
- **Devanagari Font System**: Hindi text automatically renders using `Noto Sans Devanagari` alongside `Inter` for Latin scripts.
- **Language Switcher**: Global toggle synced with `<html>` `lang="hi"` / `lang="en"` attributes, ensuring screen readers (VoiceOver, TalkBack, NVDA) read phonetics accurately.

---

## 4. Content Safety Protocol & Placeholder Management

Medical websites operate under strict regulatory and ethical constraints. Inventing qualifications, timings, numbers, or hospital privileges is unacceptable.

### 4.1 The Marker Protocol
- Any unverified field must carry the visible indicator:
  `"[CONTENT TO BE VERIFIED]"`
- Every placeholder must be cataloged in `src/data/_placeholders.ts`.
- The UI exposes a subtle yet unmistakable badge or note when placeholder content is rendered, enabling the doctor and clinic staff to audit and verify exact details prior to public release.

### 4.2 Medical Disclaimer & Educational Bounds
- Educational articles and guides are strictly informational and non-prescriptive.
- All educational material carries `reviewStatus: 'draft'` until signed off.
- Mandatory universal disclaimer:
  > *"For medical diagnosis or treatment, please consult a qualified doctor."*

---

## 5. Graceful Degradation & Environment Configuration

Configuration values (`VITE_CLINIC_PHONE`, `VITE_WHATSAPP_NUMBER`, `VITE_MAPS_URL`, etc.) are processed through `src/config/env.ts`.

| Environment Variable | If Available | If Missing / Empty |
|---|---|---|
| `VITE_CLINIC_PHONE` | Interactive `tel:` call button | Disabled state with "Contact details being updated" tooltip |
| `VITE_WHATSAPP_NUMBER` | Direct WhatsApp messaging link | Button hidden or inactive with status notice |
| `VITE_CLINIC_MAP_URL` | External Google Maps navigation | Fallback address text with direction instructions |
| `VITE_TELEMEDICINE_ENABLED` | Online consultation inquiry form | Shows in-clinic consultation only |

No broken links, blank `href=""`, or console runtime errors will ever occur.

---

## 6. Visual Design System & Aesthetics

### 6.1 Clinical Color Palette
- **Deep Slate Teal** (`#0C3E4A` / `#0F4C5C`): Deep, calm, medical authority.
- **Soft Surgical Teal** (`#1E6B7B` / `#E6F4F6`): Precision and clinical clarity.
- **Clinical Warm Linen** (`#FAF9F5` / `#F3F4F1`): Non-clinical warmth, relieving medical anxiety.
- **Endocrine Renewal Sage** (`#427A5B` / `#EBF5F0`): Vitality, metabolic restoration, and lifestyle balance.
- **Notice Amber** (`#D97706`): Dignified, visible status for unverified fields without alarming users.

### 6.2 Typography Hierarchy
- Primary Sans: `Inter` (neutral, legible, optimized for medical interfaces).
- Devanagari Sans: `Noto Sans Devanagari` (harmonious baseline and weight matching Inter).
- Editorial Serif Accents: `Newsreader` / `Georgia` for doctor's introductory philosophy and quotes.

---

## 7. Performance & Accessibility (WCAG 2.2 AA)

1. **Accessibility**:
   - Contrast ratio $\ge 4.5:1$ for normal text and $\ge 3:1$ for large headings.
   - Visible keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-teal-700`).
   - Screen-reader landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
   - `aria-expanded`, `aria-controls`, `aria-label` on all interactive toggles.
2. **Motion & 3D (Three.js)**:
   - Full support for `prefers-reduced-motion: reduce`.
   - The Three.js 3D metabolic/glucose visualizer dynamically checks device capability and user motion preference. If reduced motion is requested or WebGL is unsupported, it presents an accessible SVG/canvas static anatomical diagram.
3. **Core Web Vitals**:
   - Zero Cumulative Layout Shift (CLS) via explicit aspect ratios and skeleton placeholders.
   - Sub-second LCP with font preloading and optimized hero imagery.
