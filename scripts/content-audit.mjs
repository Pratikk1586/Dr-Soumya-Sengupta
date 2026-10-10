import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.resolve(projectRoot, 'src');
const docsDir = path.resolve(projectRoot, 'docs');

const CONTENT_MARKER = '[CONTENT TO BE VERIFIED]';
const HINDI_MARKER = '[HINDI TO BE REVIEWED]';

console.log('\n================================================================');
console.log('   LAUNCH-BLOCKER CONTENT & READINESS AUDIT');
console.log('   Dr. Soumya Sengupta Diabetology Practice');
console.log('================================================================\n');

const items = [];

function scanFile(filePath) {
  const relativePath = path.relative(projectRoot, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip import/export declarations of marker constants
    if (
      line.includes('export const CONTENT_TO_BE_VERIFIED_MARKER') ||
      line.includes('import { CONTENT_TO_BE_VERIFIED_MARKER') ||
      line.includes('export { CONTENT_TO_BE_VERIFIED_MARKER')
    ) {
      return;
    }

    // 1. Content to be verified
    if (line.includes(CONTENT_MARKER) || line.includes('CONTENT_TO_BE_VERIFIED_MARKER')) {
      let owner = 'Doctor';
      let action = 'Verify clinical qualification or medical target';

      if (
        relativePath.includes('clinic') ||
        relativePath.includes('timings') ||
        relativePath.includes('reviews') ||
        line.toLowerCase().includes('phone') ||
        line.toLowerCase().includes('whatsapp') ||
        line.toLowerCase().includes('chamber') ||
        line.toLowerCase().includes('fee') ||
        line.toLowerCase().includes('timing')
      ) {
        owner = 'Clinic Staff';
        action = 'Confirm chamber logistics, timing, or contact details';
      } else if (
        relativePath.includes('models') ||
        relativePath.includes('env') ||
        line.toLowerCase().includes('url')
      ) {
        owner = 'Developer';
        action = 'Supply production asset or environment variable';
      }

      items.push({
        type: 'Clinical / Logistic Placeholder',
        file: relativePath,
        line: index + 1,
        snippet: line.trim().slice(0, 85),
        owner,
        action,
      });
    }

    // 2. Hindi terminology review
    if (line.includes(HINDI_MARKER)) {
      items.push({
        type: 'Hindi Translation Review',
        file: relativePath,
        line: index + 1,
        snippet: line.trim().slice(0, 85),
        owner: 'Doctor',
        action: 'Review clinical accuracy of Hindi translated term',
      });
    }

    // 3. Draft articles
    if (line.includes("reviewStatus: 'draft'") || line.includes('reviewStatus: "draft"')) {
      items.push({
        type: 'Draft Educational Article',
        file: relativePath,
        line: index + 1,
        snippet: line.trim().slice(0, 85),
        owner: 'Doctor',
        action: 'Perform medical review and approve article for publication',
      });
    }

    // 4. Placeholder images
    if (
      (line.includes('/placeholder') || line.includes('placeholder.svg')) &&
      !line.includes('SmartImage') &&
      !line.includes('fallback')
    ) {
      items.push({
        type: 'Placeholder Graphic Asset',
        file: relativePath,
        line: index + 1,
        snippet: line.trim().slice(0, 85),
        owner: 'Developer',
        action: 'Replace temporary SVG placeholder with high-resolution clinical photograph',
      });
    }
  });
}

function traverseDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
        traverseDir(fullPath);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      scanFile(fullPath);
    }
  }
}

traverseDir(srcDir);

// 5. Check Environment Variables
const envExamplePath = path.resolve(projectRoot, '.env.example');
if (fs.existsSync(envExamplePath)) {
  const envContent = fs.readFileSync(envExamplePath, 'utf-8');
  const envLines = envContent.split('\n');
  envLines.forEach((l, idx) => {
    const trimmed = l.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, val] = trimmed.split('=');
      if (!val || val.includes('placeholder') || val.includes('example')) {
        items.push({
          type: 'Environment Configuration',
          file: '.env.example',
          line: idx + 1,
          snippet: `${key}=${val || '(empty)'}`,
          owner: 'Developer',
          action: `Set production value for ${key} in deployment dashboard`,
        });
      }
    }
  });
}

// Group findings by Owner
const grouped = {
  Doctor: items.filter((i) => i.owner === 'Doctor'),
  'Clinic Staff': items.filter((i) => i.owner === 'Clinic Staff'),
  Developer: items.filter((i) => i.owner === 'Developer'),
};

console.log(`📊 TOTAL LAUNCH-BLOCKER ITEMS: ${items.length}\n`);

console.log(`👨‍⚕️  1. DOCTOR CLINICAL SIGN-OFF (${grouped.Doctor.length} items):`);
console.log('   - Review medical council registration, fellowship credentials, and degrees.');
console.log('   - Verify clinical reference ranges (HbA1c, eGFR, lipid targets) in data/reports.ts.');
console.log('   - Sign off on 8 patient education articles (switch reviewStatus to "approved").');
console.log('   - Confirm medical advice refusal & emergency phrasing in Clinic Assistant.');
console.log(`   Detailed entries: ${grouped.Doctor.length} items identified.\n`);

console.log(`🏥  2. CLINIC STAFF ADMINISTRATIVE ITEMS (${grouped['Clinic Staff'].length} items):`);
console.log('   - Confirm exact consulting days and hours for Salt Lake and Kolkata chambers.');
console.log('   - Confirm reception phone number, official WhatsApp, and clinic postal address.');
console.log('   - Verify written consent for patient testimonials / CGM success stories.');
console.log('   - Confirm consultation fee schedules for first visit and follow-up.');
console.log(`   Detailed entries: ${grouped['Clinic Staff'].length} items identified.\n`);

console.log(`💻  3. DEVELOPER INFRASTRUCTURE ITEMS (${grouped.Developer.length} items):`);
console.log('   - Configure Vercel production environment variables (.env.production).');
console.log('   - Supply real pancreas.glb model to /public/assets/models/ if available.');
console.log('   - Replace placeholder photography with real clinic and doctor photos.');
console.log('   - Verify Google Maps embed URL and test WhatsApp deep links.');
console.log(`   Detailed entries: ${grouped.Developer.length} items identified.\n`);

// Generate docs/LAUNCH_CHECKLIST.md
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const markdownContent = `# Practice Launch Readiness Checklist — Dr. Soumya Sengupta Website

> Generated automatically by \`npm run content:audit\` on ${new Date().toISOString().split('T')[0]}.
> Total registered items requiring formal review: **${items.length}**

---

## 1. Doctor Medical Sign-Off (Owner: Dr. Soumya Sengupta)

- [ ] **Medical Registration & Credentials**:
  - [ ] Verify West Bengal Medical Council / National Medical Commission Registration Number.
  - [ ] Confirm post-graduate degrees, fellowships (FRCP / RSSDI / FICP / ADA memberships).
  - [ ] Verify hospital affiliations and academic designations.
- [ ] **Clinical Reference Ranges & Target Guidelines** (\`src/data/reports.ts\`):
  - [ ] Confirm standard fasting glucose and postprandial glucose targets.
  - [ ] Confirm individualized HbA1c target boundaries (ADA 2026 Standards of Care).
  - [ ] Confirm urinary albumin-to-creatinine ratio (uACR) and eGFR staging.
  - [ ] Confirm blood pressure and lipid profile targets for diabetic patients.
- [ ] **Educational Articles Clinical Approval** (\`src/data/articles.ts\`):
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

- [ ] **Consulting Hours & Scheduling** (\`src/data/clinic.ts\` & \`src/data/notices.ts\`):
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
  - [ ] Confirm informed written patient consent on file for all anonymized reviews (\`src/data/reviews.ts\`).
- [ ] **Consultation Logistics**:
  - [ ] Confirm first-time patient consultation fee and follow-up consultation duration/fee.
  - [ ] Provide prep list for new patients (past prescriptions, recent HbA1c report, fasting instructions).

---

## 3. Developer & Technical Deployment (Owner: Development Team)

- [ ] **Environment Configuration**:
  - [ ] \`VITE_SITE_URL\`: Production domain (e.g. \`https://drsoumyasengupta.com\`).
  - [ ] \`VITE_CLINIC_PHONE\`: Verified telephone in digits-only or standard tel format.
  - [ ] \`VITE_CLINIC_WHATSAPP_NUMBER\`: E.164 normalized WhatsApp number (e.g. \`919830000000\`).
  - [ ] \`VITE_GOOGLE_MAPS_URL\`: Valid Google Maps directions/place URL.
  - [ ] \`VITE_GOOGLE_MAPS_EMBED_URL\`: Verified HTTPS iframe embed URL or safe fallback card.
- [ ] **Media Assets & 3D Model**:
  - [ ] If custom anatomical 3D asset is available, place compressed Draco model at \`/public/assets/models/pancreas.glb\`.
  - [ ] Replace placeholder SVGs with real doctor photographs and clinic facility images.
  - [ ] Verify WebP/AVIF format and responsive image dimensions.
- [ ] **Production Infrastructure**:
  - [ ] Vercel routing (\`vercel.json\`) with immutable 1-year cache headers on \`/assets/*\`.
  - [ ] Security headers active (\`X-Content-Type-Options\`, \`X-Frame-Options\`, \`Referrer-Policy\`).
  - [ ] Verify \`sitemap.xml\` includes all 38 routes and \`robots.txt\` allows indexing.
- [ ] **Quality & Verification Gates**:
  - [ ] \`npm run typecheck\` (0 errors).
  - [ ] \`npm run lint\` (0 warnings).
  - [ ] \`npm run test\` (100% unit tests passing).
  - [ ] \`npm run build\` (Clean chunk splitting with <1MB isolated 3D bundle).
`;

fs.writeFileSync(path.join(docsDir, 'LAUNCH_CHECKLIST.md'), markdownContent, 'utf-8');
console.log('✓ Successfully generated docs/LAUNCH_CHECKLIST.md with grouped actionable tasks.\n');
