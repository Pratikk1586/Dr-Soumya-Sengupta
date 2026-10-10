# Dr. Soumya Sengupta — Consultant Diabetologist Practice Web Platform

A high-performance, accessible, bilingual (English & Hindi) clinical web application designed for the practice of **Dr. Soumya Sengupta**, Consultant Diabetologist and Metabolic Physician (Salt Lake & Kolkata).

Built with modern web standards, strict non-diagnostic patient education guidelines, resilient 3D anatomical visualization, and WCAG 2.2 AA accessibility.

---

## 1. Architecture & Technology Stack

- **Core UI & Framework**: React 19, TypeScript (Strict mode `tsc -b`), Vite 8
- **Styling**: Vanilla Tailwind CSS v4 design tokens, custom clinical color palette (`#0f3d4a`, `#0a252f`, `#dff0f4`, `#faf9f6`), subtle micro-animations
- **3D Visualization**: Three.js, `@react-three/fiber`, `@react-three/drei` (Isolated into a lazy-loaded chunk `PancreasHero3D`)
- **Routing**: React Router 7 (`react-router-dom`), route-level code splitting (`React.lazy`)
- **Forms & Validation**: React Hook Form, Zod schema validation
- **Icons**: Lucide React
- **SEO & Social**: `react-helmet-async`, Open Graph, dynamic `sitemap.xml`, verified JSON-LD schema (`MedicalBusiness`, `FAQPage`, `MedicalWebPage`)
- **Testing**:
  - **Unit & Integration**: Vitest (38 tests)
  - **End-to-End**: Playwright (69 tests across Desktop Chrome, Mobile Pixel, Mobile iPhone SE)
  - **Accessibility**: `axe-core` (15 route audits, 0 serious/critical violations)

---

## 2. Quick Start

### Prerequisites
- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation & Local Development

```bash
# Clone the repository
git clone <repository-url>
cd Website

# Install dependencies
npm install

# Start development server
npm run dev
# Server will start on http://localhost:5173
```

### Production Build & Preview

```bash
# Typecheck and build optimized bundle to dist/
npm run build

# Preview production build locally
npm run preview
# Preview server will run on http://localhost:4173
```

---

## 3. Test Suites & Verification

| Command | Purpose | Coverage |
| :--- | :--- | :--- |
| `npm run test` | Vitest Unit & Integration suite | 38 tests (`libHelpers`, services, schemas, validation) |
| `npm run test:e2e` | Playwright E2E smoke suite | 69 tests across Desktop, Mobile Pixel, Mobile iPhone SE |
| `npx playwright test e2e/a11y.spec.ts` | Automated WCAG 2.2 AA audit | 15 audited routes with `axe-core` (zero serious/critical) |
| `npm run typecheck` | TypeScript compiler check | Strict type analysis with 0 errors |
| `npm run lint` | ESLint linting | Zero errors and zero warnings |
| `npm run content:audit` | Content verification audit | Detects unverified items and generates `docs/LAUNCH_CHECKLIST.md` |
| `npm run sitemap` | Dynamic sitemap generator | Compiles 38 active routes to `public/sitemap.xml` |

---

## 4. Environment Variables (`.env`)

Copy `.env.example` to `.env` for local customization:

```bash
cp .env.example .env
```

| Variable | Description | Example Default |
| :--- | :--- | :--- |
| `VITE_NAME` | Clinical identity title | `Dr. Soumya Sengupta` |
| `VITE_SITE_URL` | Production canonical site URL | `https://drsoumyasengupta.com` |
| `VITE_CLINIC_PHONE` | Primary chamber landline / mobile | `+91 98300 00000` |
| `VITE_WHATSAPP_NUMBER` | Practice WhatsApp for appointments | `+91 98300 00000` |
| `VITE_EMAIL` | Official patient inquiry email | `care@drsoumyasengupta.com` |
| `VITE_ADDRESS` | Chamber physical postal address | `Salt Lake Sector 1 Chamber, Kolkata 700064` |
| `VITE_GOOGLE_MAPS_URL` | Google Maps location or directions URL | `https://maps.google.com/?q=Salt+Lake+Kolkata` |
| `VITE_TELEMEDICINE_ENABLED` | Enable or disable online consult mode | `true` |

> **Graceful Degradation**: If phone or WhatsApp numbers are omitted in `.env`, the respective buttons and links in the header, footer, and assistant safely hide or disable with a fallback message.

---

## 5. Content Management Guide

All practice content is strictly typed and decoupled in `src/data/`.

### 5.1 Adding a Clinic Notice
Edit `src/data/notices.ts`:
```ts
{
  id: 'notice-puja-schedule-2026',
  title: {
    en: 'Durga Puja Consulting Hours & Chamber Notice',
    hi: 'दुर्गा पूजा परामर्श समय एवं चेंबर सूचना',
  },
  content: {
    en: 'The Salt Lake chamber will remain open for emergency morning appointments from Oct 19 to Oct 22.',
    hi: 'सॉल्ट लेक चेंबर 19 से 22 अक्टूबर तक केवल सुबह आपातकालीन अपॉइंटमेंट के लिए खुला रहेगा।',
  },
  date: '2026-10-15',
  category: 'timings', // 'timings' | 'general' | 'emergency' | 'academic'
  isImportant: true,
  status: 'verified', // 'verified' | 'placeholder'
}
```

### 5.2 Adding a Patient Education Article
Edit `src/data/articles.ts`:
```ts
{
  id: 'art-cgm-sensor-guide',
  slug: 'cgm-sensor-guide-beginners',
  title: {
    en: 'A Patient Guide to Continuous Glucose Monitoring (CGM)',
    hi: 'कंटीन्यूअस ग्लूकोज मॉनिटरिंग (CGM) सेंसर: रोगी मार्गदर्शिका',
  },
  excerpt: {
    en: 'Understand time-in-range, sensor lag, and how 24/7 glucose graphs guide treatment adjustments.',
    hi: 'टाइम-इन-रेंज, सेंसर रीडिंग और उपचार समायोजन के लिए ग्लूकोज ग्राफ को समझें।',
  },
  category: {
    en: 'Technology & Sensors',
    hi: 'तकनीक एवं सेंसर',
  },
  readTimeMinutes: 6,
  publishedAt: '2026-10-01',
  author: {
    name: 'Dr. Soumya Sengupta',
    role: 'Consultant Diabetologist',
  },
  contentParagraphs: [
    {
      en: 'Continuous Glucose Monitors provide round-the-clock insights into glycemic patterns...',
      hi: 'कंटीन्यूअस ग्लूकोज मॉनिटर (CGM) दिन-रात रक्त शर्करा के उतार-चढ़ाव की सटीक जानकारी देते हैं...',
    },
  ],
  keyTakeaways: [
    {
      en: 'Sensors measure interstitial fluid glucose, which carries a 5-10 minute physiological delay.',
      hi: 'सेंसर ऊतक द्रव (इंटेरस्टिशियल फ्लुइड) की जांच करते हैं, जिसमें 5-10 मिनट का अंतर हो सकता है।',
    },
  ],
  reviewStatus: 'approved', // 'draft' | 'pending_review' | 'approved'
  reviewedBy: 'Dr. Soumya Sengupta, MD',
  reviewedAt: '2026-10-02',
}
```

### 5.3 Adding a Frequently Asked Question (FAQ)
Edit `src/data/faqs.ts`:
```ts
{
  id: 'faq-fasting-blood-test',
  slug: 'fasting-blood-test-hours',
  question: {
    en: 'How many hours of fasting are required before my morning diabetes blood test?',
    hi: 'सुबह की डायबिटीज जांच से पहले कितने घंटे का उपवास (फास्टिंग) जरूरी है?',
  },
  answer: {
    en: 'A standard fasting plasma glucose test requires an overnight fast of 8 to 10 hours. Plain water is permitted, but morning tea, coffee, and medications should follow your physician\'s explicit instructions.',
    hi: 'फास्टिंग प्लाज्मा ग्लूकोज जांच के लिए रात में 8 से 10 घंटे का उपवास आवश्यक है। सादा पानी पिया जा सकता है।',
  },
  category: 'testing',
  status: 'verified',
}
```

### 5.4 Adding a Media Gallery Item
Edit `src/data/gallery.ts`:
```ts
{
  id: 'gal-patient-seminar',
  title: {
    en: 'World Diabetes Day Patient Workshop',
    hi: 'विश्व मधुमेह दिवस रोगी कार्यशाला',
  },
  caption: {
    en: 'Demonstration of carbohydrate counting and foot care practices.',
    hi: 'कार्बोहाइड्रेट गणना और पैरों की देखभाल पर व्यावहारिक मार्गदर्शन।',
  },
  altText: {
    en: 'Dr. Soumya Sengupta demonstrating foot inspection techniques at community workshop',
    hi: 'डॉ. सौम्य सेनगुप्ता कार्यशाला में पैरों की जांच का प्रदर्शन करते हुए',
  },
  category: 'health_camps',
  thumbnailUrl: '/assets/gallery/seminar-thumb.webp',
  fullUrl: '/assets/gallery/seminar.webp',
  aspectRatio: '16/9',
  date: '2026-11-14',
}
```

---

## 6. Backend Integration Guide (Swapping Mock Services with REST APIs)

The application utilizes an interface-driven service layer pattern (`src/services/types.ts`). Currently, `LocalNoticeService`, `LocalArticleService`, etc., read from local files in `src/services/localServices.ts`.

To switch to a live REST API (e.g. Strapi, Supabase, Node/Express):

1. Create a class implementing the interface, e.g. `src/services/api/ApiNoticeService.ts`:

```typescript
import type { NoticeService, NoticeItem } from '../types';

export class ApiNoticeService implements NoticeService {
  private baseUrl: string;

  constructor(baseUrl: string = import.meta.env.VITE_API_URL || 'https://api.drsoumyasengupta.com') {
    this.baseUrl = baseUrl;
  }

  async getNotices(): Promise<NoticeItem[]> {
    const res = await fetch(`${this.baseUrl}/api/notices`);
    if (!res.ok) throw new Error(`Failed to load notices: ${res.statusText}`);
    return await res.json();
  }

  async getActiveNotices(): Promise<NoticeItem[]> {
    const notices = await this.getNotices();
    return notices.filter((n) => n.status !== 'archived');
  }

  async getNoticeById(id: string): Promise<NoticeItem | null> {
    const res = await fetch(`${this.baseUrl}/api/notices/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Notice error: ${res.statusText}`);
    return await res.json();
  }
}
```

2. In `src/services/index.ts`, replace the instantiated export:
```typescript
// Replace:
// export const noticeService: NoticeService = new LocalNoticeService();
// With:
export const noticeService: NoticeService = new ApiNoticeService();
```
*No UI components or pages need to be changed.*

---

## 7. 3D Model Replacement (`pancreas.glb`)

The hero section dynamically loads a 3D medical visual of the pancreas and islet microenvironment:
- **Default Fallback**: When no GLB model is present, the app renders a Three.js procedural organ model with beta-cell pulse lighting.
- **Dropping in a Real GLB**:
  1. Optimize your GLTF/GLB model using `gltf-pipeline` or Draco compression (`< 1.5 MB` recommended).
  2. Place the file at:
     ```
     public/assets/models/pancreas.glb
     ```
  3. `PancreasModel.tsx` will automatically detect and stream the real mesh.

---

## 8. Deployment Guide

### Vercel Deployment
The repository includes `vercel.json` configured with:
- SPA rewrites (`"source": "/(.*)", "destination": "/index.html"`).
- Immutable cache headers for `/assets/*` (`max-age=31536000, immutable`).
- Security headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

Deploy via Vercel CLI:
```bash
vercel --prod
```

### Netlify Deployment
Ensure build command is `npm run build` and publish directory is `dist`. Add a `_redirects` file in `public/`:
```
/*    /index.html   200
```

---

## 9. Non-Negotiable Medical Ethics Constraints

1. **Non-Diagnostic Educational Boundaries**:
   All explanations of biomarkers (HbA1c, fasting glucose, urine microalbumin, lipids) and educational modules are strictly informational. They never provide report interpretation or prescription dosages.
2. **Consultation Non-Confirmation Standard**:
   The appointment booking request wizard is frontend-only. Upon completion, it strictly presents:
   > *"Your appointment request has been prepared. Please contact the clinic to confirm availability."*
3. **No Fabricated Data**:
   All doctor qualifications, credentials, registration numbers, and testimonials must be confirmed by the physician prior to removing placeholder badges. Run `npm run content:audit` to verify launch readiness.
