import type { Clinic } from '../types';
import { CONTENT_TO_BE_VERIFIED_MARKER } from './_placeholders';

export const CLINICS_DATA: Clinic[] = [
  {
    id: 'clinic-salt-lake',
    name: {
      en: `${CONTENT_TO_BE_VERIFIED_MARKER} Salt Lake Diabetes Consultation Chamber`,
      hi: `${CONTENT_TO_BE_VERIFIED_MARKER} साल्ट लेक डायबिटीज़ परामर्श केंद्र`,
    },
    facilityType: {
      en: 'Primary Consultation Chamber',
      hi: 'मुख्य परामर्श केंद्र',
    },
    address: {
      line1: {
        en: `${CONTENT_TO_BE_VERIFIED_MARKER} Sector 1, Salt Lake City`,
        hi: `${CONTENT_TO_BE_VERIFIED_MARKER} सेक्टर 1, साल्ट लेक`,
      },
      line2: {
        en: 'Near Central Park Metro Station',
        hi: 'सेंट्रल पार्क मेट्रो के पास',
      },
      city: { en: 'Kolkata', hi: 'कोलकाता' },
      pincode: '700064',
      landmark: { en: `${CONTENT_TO_BE_VERIFIED_MARKER} BD Market`, hi: `${CONTENT_TO_BE_VERIFIED_MARKER} बीडी मार्केट` },
    },
    phone: `${CONTENT_TO_BE_VERIFIED_MARKER} +91 98300 00000`,
    whatsapp: `${CONTENT_TO_BE_VERIFIED_MARKER} +91 98300 00000`,
    email: `${CONTENT_TO_BE_VERIFIED_MARKER} care@drsoumyasengupta.com`,
    timings: [
      {
        dayOfWeek: { en: 'Monday – Saturday', hi: 'सोमवार – शनिवार' },
        timeSlot: { en: '5:00 PM – 8:00 PM', hi: 'शाम 5:00 – 8:00' },
        isAvailable: true,
      },
      {
        dayOfWeek: { en: 'Sunday', hi: 'रविवार' },
        timeSlot: { en: 'Closed / Emergency Only', hi: 'बंद / केवल आपातकाल' },
        isAvailable: false,
      },
    ],
    consultationFee: `${CONTENT_TO_BE_VERIFIED_MARKER} ₹1,000`,
    facilities: [
      {
        id: 'fac-1',
        name: { en: 'Continuous Glucose Sensor Application & Calibration', hi: 'सीजीएम सेंसर लगाना एवं जांच' },
        description: { en: 'Same-day application of 14-day CGM sensors with mobile pairing', hi: '14 दिवसीय सेंसर तुरंत लगाना' },
        status: 'verified',
      },
      {
        id: 'fac-2',
        name: { en: 'Point-of-Care Instant HbA1c & Microalbuminuria', hi: 'त्वरित HbA1c एवं यूरिन टेस्ट' },
        description: { en: 'Rapid testing available on-site during consultation hours', hi: 'परामर्श के दौरान तुरंत जांच सुविधा' },
        status: 'verified',
      },
      {
        id: 'fac-3',
        name: { en: 'Biothesiometry & Diabetic Foot Sensory Assessment', hi: 'पैरों के संवेदनशीलता की जांच' },
        description: { en: 'Screening for early peripheral neuropathy', hi: 'नसों की संवेदनशीलता का परीक्षण' },
        status: 'verified',
      },
    ],
    status: 'placeholder',
  },
];
