import type { Notice } from '../types';
import { CONTENT_TO_BE_VERIFIED_MARKER } from './_placeholders';

export const NOTICES_DATA: Notice[] = [
  {
    id: 'notice-puja-holiday',
    title: {
      en: `${CONTENT_TO_BE_VERIFIED_MARKER} Durga Puja Chamber Schedule Notice`,
      hi: `${CONTENT_TO_BE_VERIFIED_MARKER} दुर्गा पूजा क्लिनिक समय सारणी सूचना`,
    },
    content: {
      en: 'OPD chamber will remain closed from Saptami to Dashami. For urgent glycemic concerns, please visit the emergency wing or message on clinic WhatsApp.',
      hi: 'सप्तमी से दशमी तक ओपीडी क्लिनिक बंद रहेगा। गंभीर रक्त शर्करा समस्याओं के लिए आपातकालीन विभाग जाएं या क्लिनिक व्हाट्सएप पर संदेश भेजें।',
    },
    category: 'holiday',
    effectiveDate: '2026-10-08',
    publishedAt: '2026-10-05T09:00:00+05:30', // Recent in IST (within 3 days of 2026-10-06)
    isImportant: true,
    status: 'placeholder',
  },
  {
    id: 'notice-changed-timings',
    title: {
      en: `${CONTENT_TO_BE_VERIFIED_MARKER} Revised Evening OPD Consultation Slot`,
      hi: `${CONTENT_TO_BE_VERIFIED_MARKER} संशोधित संध्या ओपीडी परामर्श समय`,
    },
    content: {
      en: 'Evening consultations will commence from 5:30 PM instead of 5:00 PM on Wednesdays to accommodate specialized diabetic foot assessments.',
      hi: 'विशिष्ट डायबिटिक फुट परीक्षणों के चलते बुधवार को संध्या परामर्श शाम 5:00 के स्थान पर 5:30 बजे से शुरू होगा।',
    },
    category: 'changed_timings',
    effectiveDate: '2026-10-06',
    publishedAt: '2026-10-06T08:30:00+05:30', // Recent in IST
    isImportant: false,
    status: 'placeholder',
  },
  {
    id: 'notice-health-camp',
    title: {
      en: 'Quarterly Free HbA1c & Diabetic Neuropathy Screening Camp',
      hi: 'त्रैमासिक निःशुल्क HbA1c एवं डायबिटिक न्यूरोपैथी जांच शिविर',
    },
    content: {
      en: 'Organized for registered patients and family members with advance slot registration. Prior slot booking required via reception.',
      hi: 'पंजीकृत मरीजों एवं परिजनों के लिए पूर्व पंजीकरण पर आयोजित। रिसेप्शन के माध्यम से पूर्व स्लॉट बुकिंग अनिवार्य है।',
    },
    category: 'health_camp',
    effectiveDate: '2026-11-15',
    publishedAt: '2026-09-25T10:00:00+05:30', // Older than 3 days
    isImportant: false,
    status: 'verified',
  },
  {
    id: 'notice-important-cgm',
    title: {
      en: 'Ambulatory Glucose Profile (AGP) Sensor Application Available',
      hi: 'एम्बुलेटरी ग्लूकोज प्रोफाइल (AGP) सेंसर क्लिनिक में उपलब्ध',
    },
    content: {
      en: '14-day continuous glucose monitoring sensors are available for patients experiencing unexplained nocturnal hypoglycemia or high glycemic variability.',
      hi: 'अस्पष्ट रात्रि हाइपोग्लाइसीमिया या अत्यधिक ग्लूकोज उतार-चढ़ाव वाले मरीजों के लिए 14-दिवसीय निरंतर ग्लूकोज मॉनिटरिंग सेंसर उपलब्ध है।',
    },
    category: 'important_update',
    effectiveDate: '2026-09-20',
    publishedAt: '2026-09-20T11:00:00+05:30',
    isImportant: false,
    status: 'verified',
  },
  {
    id: 'notice-clinic-announcement',
    title: {
      en: `${CONTENT_TO_BE_VERIFIED_MARKER} Prior Appointment Requirement for Detailed First Consultations`,
      hi: `${CONTENT_TO_BE_VERIFIED_MARKER} प्रथम परामर्श हेतु पूर्व अपॉइंटमेंट अनिवार्य`,
    },
    content: {
      en: 'New patients are requested to book prior slots and bring previous 6-month lab reports and current prescriptions for comprehensive assessment.',
      hi: 'नए मरीजों से अनुरोध है कि वे पूर्व स्लॉट बुक करें और पिछले 6 माह की लैब रिपोर्ट एवं दवाइयों की पर्ची साथ लाएं।',
    },
    category: 'clinic_announcement',
    effectiveDate: '2026-09-01',
    publishedAt: '2026-09-01T09:00:00+05:30',
    isImportant: false,
    status: 'placeholder',
  },
];
