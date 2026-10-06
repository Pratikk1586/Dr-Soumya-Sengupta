import type { Review } from '../types';
import { CONTENT_TO_BE_VERIFIED_MARKER } from './_placeholders';

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    patientInitials: `${CONTENT_TO_BE_VERIFIED_MARKER} Patient S.B.`,
    conditionManaged: {
      en: 'Type 2 Diabetes Glycemic Remission',
      hi: 'टाइप 2 मधुमेह नियंत्रण',
    },
    comment: {
      en: `${CONTENT_TO_BE_VERIFIED_MARKER} The CGM sensor approach completely changed how I manage food. Dr. Sengupta explains the science clearly without unnecessary fear.`,
      hi: `${CONTENT_TO_BE_VERIFIED_MARKER} सीजीएम सेंसर तकनीक से मुझे बहुत लाभ हुआ। डॉक्टर बहुत विस्तार से समझाते हैं।`,
    },
    year: '2025',
    status: 'placeholder',
  },
  {
    id: 'rev-2',
    patientInitials: `${CONTENT_TO_BE_VERIFIED_MARKER} Patient R.M.`,
    conditionManaged: {
      en: 'Gestational Diabetes Safe Delivery',
      hi: 'गर्भावस्था में मधुमेह प्रबंधन',
    },
    comment: {
      en: `${CONTENT_TO_BE_VERIFIED_MARKER} Clear weekly titration targets helped me deliver my baby safely without panic or excessive medication.`,
      hi: `${CONTENT_TO_BE_VERIFIED_MARKER} साप्ताहिक मार्गदर्शन से बिना किसी डर के सुरक्षित प्रसव हुआ।`,
    },
    year: '2025',
    status: 'placeholder',
  },
];
