import type { Notice } from '../types';
import { CONTENT_TO_BE_VERIFIED_MARKER } from './_placeholders';

export const NOTICES_DATA: Notice[] = [
  {
    id: 'notice-puja-holiday',
    title: {
      en: 'Durga Puja Chamber Schedule Notice',
      hi: 'दुर्गा पूजा क्लिनिक समय सारणी सूचना',
    },
    content: {
      en: 'OPD chamber will remain closed from Saptami to Dashami. For urgent glycemic concerns, please visit the emergency wing or message on clinic WhatsApp.',
      hi: 'सप्तमी से दशमी तक ओपीडी क्लिनिक बंद रहेगा। गंभीर रक्त शर्करा समस्याओं के लिए आपातकालीन विभाग जाएं या क्लिनिक व्हाट्सएप पर संदेश भेजें।',
    },
    category: 'holiday',
    effectiveDate: '2026-10-12',
    publishedAt: '2026-10-12T09:00:00+05:30',
    isImportant: true,
    status: 'verified',
  },
  {
    id: 'notice-changed-timings',
    title: {
      en: 'New OPD Timings effective from 20th October 2026',
      hi: '20 अक्टूबर 2026 से नए ओपीडी समय प्रभावी',
    },
    content: {
      en: 'Consultation slots will commence from 5:30 PM with expanded dedicated evaluation time for continuous glucose monitoring and foot assessments.',
      hi: 'विस्तारित ग्लूकोज मॉनिटरिंग और फुट असेसमेंट के लिए परामर्श स्लॉट शाम 5:30 बजे से शुरू होंगे।',
    },
    category: 'changed_timings',
    effectiveDate: '2026-10-09',
    publishedAt: '2026-10-09T17:30:00+05:30',
    isImportant: false,
    status: 'verified',
  },
  {
    id: 'notice-education-session',
    title: {
      en: 'Diabetes Education Session this Saturday',
      hi: 'इस शनिवार मधुमेह जागरूकता एवं शिक्षा सत्र',
    },
    content: {
      en: 'Interactive guidance on carbohydrate counting, insulin technique, and hypoglycemia prevention for registered patients and caregivers.',
      hi: 'पंजीकृत मरीजों एवं देखभालकर्ताओं के लिए कार्बोहाइड्रेट गणना, इंसुलिन तकनीक एवं हाइपोग्लाइसीमिया रोकथाम पर सत्र।',
    },
    category: 'health_camp',
    effectiveDate: '2026-10-07',
    publishedAt: '2026-10-07T10:00:00+05:30',
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
