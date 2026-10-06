import type { Notice } from '../types';
import { CONTENT_TO_BE_VERIFIED_MARKER } from './_placeholders';

export const NOTICES_DATA: Notice[] = [
  {
    id: 'notice-holiday',
    title: {
      en: `${CONTENT_TO_BE_VERIFIED_MARKER} Upcoming Clinic OPD Timings Update`,
      hi: `${CONTENT_TO_BE_VERIFIED_MARKER} क्लिनिक ओपीडी समय में बदलाव सूचना`,
    },
    content: {
      en: 'Please verify holiday OPD chamber availability through WhatsApp before visiting.',
      hi: 'आने से पहले कृपया व्हाट्सएप पर क्लिनिक समय की पुष्टि करें।',
    },
    category: 'clinic_schedule',
    effectiveDate: '2026-10-01',
    isImportant: true,
    status: 'placeholder',
  },
  {
    id: 'notice-camp',
    title: {
      en: 'Quarterly Free HbA1c & Diabetic Neuropathy Screening Camp',
      hi: 'त्रैमासिक निःशुल्क HbA1c एवं डायबिटिक न्यूरोपैथी जांच शिविर',
    },
    content: {
      en: 'Organized for registered patients and family members with advance slot registration.',
      hi: 'पंजीकृत मरीजों एवं परिजनों के लिए पूर्व पंजीकरण पर आयोजित।',
    },
    category: 'health_camp',
    effectiveDate: '2026-11-15',
    isImportant: false,
    status: 'verified',
  },
];
