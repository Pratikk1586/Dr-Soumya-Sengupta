# Practice Launch Readiness Checklist — Dr. Soumya Sengupta Website

> Generated automatically by `npm run content:audit` on 2026-10-07.
> Total registered items requiring formal review: **91**

---

## 1. Doctor Medical Sign-Off (Owner: Dr. Soumya Sengupta)

- [ ] **Medical Registration & Credentials**:
  - [ ] Verify West Bengal Medical Council / National Medical Commission Registration Number.
  - [ ] Confirm post-graduate degrees, fellowships (FRCP / RSSDI / FICP / ADA memberships).
  - [ ] Verify hospital affiliations and academic designations.
- [ ] **Clinical Reference Ranges & Target Guidelines** (`src/data/reports.ts`):
  - [ ] Confirm standard fasting glucose and postprandial glucose targets.
  - [ ] Confirm individualized HbA1c target boundaries (ADA 2026 Standards of Care).
  - [ ] Confirm urinary albumin-to-creatinine ratio (uACR) and eGFR staging.
  - [ ] Confirm blood pressure and lipid profile targets for diabetic patients.
- [ ] **Educational Articles Clinical Approval** (`src/data/articles.ts`):
  - [ ] "Demystifying HbA1c: Why Your 3-Month Average Matters"
  - [ ] "Recognising and Managing Hypoglycemia Safely"
  - [ ] "Understanding the Differences Between Type 1 and Type 2 Diabetes"
  - [ ] "The Plate Method: Balancing Carbohydrates Without Extreme Restriction"
  - [ ] "Sleep Quality, Circadian Rhythms, and Morning Insulin Resistance"
  - [ ] "Protecting Kidney Function: Early Diabetic Nephropathy Detection"
  - [ ] "Prediabetes: The Reversible Window of Opportunity"
  - [ ] "Debunking Common Diabetes Myths and Unverified Remedies"
- [ ] **Symptom Guidance & Non-Diagnostic Positioning**:
  - [ ] Verify prominent non-diagnostic notices on Know Your Problem interactive tool.
  - [ ] Verify refusal phrasing for diagnostic queries in rule-based Clinic Assistant.
  - [ ] Verify immediate escalation notice for chest pain, severe low sugar, and breathlessness.
- [ ] **Bilingual Clinical Content**:
  - [ ] Review Hindi clinical terms for key patient-facing guidance and report cards.

---

## 2. Clinic Staff Administrative Checklist (Owner: Clinic Operations & Reception)

- [ ] **Consulting Hours & Scheduling** (`src/data/clinic.ts` & `src/data/notices.ts`):
  - [ ] Confirm active days and appointment slots for Salt Lake chamber.
  - [ ] Confirm active days and appointment slots for Central Kolkata chamber.
  - [ ] Establish standard procedure for emergency holiday notices and leave advisories.
- [ ] **Patient Contact Channels**:
  - [ ] Confirm reception desk landline/mobile number for call buttons.
  - [ ] Confirm official clinic WhatsApp Business number for prefilled appointment requests.
  - [ ] Confirm official clinic email address for general patient enquiries.
- [ ] **Chamber Location & Directions**:
  - [ ] Confirm room/floor number, building name, landmark, and postal pincode.
  - [ ] Confirm parking availability and nearest metro/transit stations.
- [ ] **Patient Testimonials & Reviews Consent**:
  - [ ] Confirm informed written patient consent on file for all anonymized reviews (`src/data/reviews.ts`).
- [ ] **Consultation Logistics**:
  - [ ] Confirm first-time patient consultation fee and follow-up consultation duration/fee.
  - [ ] Provide prep list for new patients (past prescriptions, recent HbA1c report, fasting instructions).

---

## 3. Developer & Technical Deployment (Owner: Development Team)

- [ ] **Environment Configuration**:
  - [ ] `VITE_SITE_URL`: Production domain (e.g. `https://drsoumyasengupta.com`).
  - [ ] `VITE_CLINIC_PHONE`: Verified telephone in digits-only or standard tel format.
  - [ ] `VITE_CLINIC_WHATSAPP_NUMBER`: E.164 normalized WhatsApp number (e.g. `919830000000`).
  - [ ] `VITE_GOOGLE_MAPS_URL`: Valid Google Maps directions/place URL.
  - [ ] `VITE_GOOGLE_MAPS_EMBED_URL`: Verified HTTPS iframe embed URL or safe fallback card.
- [ ] **Media Assets & 3D Model**:
  - [ ] If custom anatomical 3D asset is available, place compressed Draco model at `/public/assets/models/pancreas.glb`.
  - [ ] Replace placeholder SVGs with real doctor photographs and clinic facility images.
  - [ ] Verify WebP/AVIF format and responsive image dimensions.
- [ ] **Production Infrastructure**:
  - [ ] Vercel routing (`vercel.json`) with immutable 1-year cache headers on `/assets/*`.
  - [ ] Security headers active (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).
  - [ ] Verify `sitemap.xml` includes all 38 routes and `robots.txt` allows indexing.
- [ ] **Quality & Verification Gates**:
  - [ ] `npm run typecheck` (0 errors).
  - [ ] `npm run lint` (0 warnings).
  - [ ] `npm run test` (100% unit tests passing).
  - [ ] `npm run build` (Clean chunk splitting with <1MB isolated 3D bundle).
