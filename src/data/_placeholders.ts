/**
 * Content Safety and Verification Registry
 * Every unverified field (credentials, clinic address, timings, contact info, statistics, medical reviews)
 * MUST carry the explicit visible marker: [CONTENT TO BE VERIFIED]
 */

import { CONTENT_TO_BE_VERIFIED_MARKER } from '../config/constants';
export { CONTENT_TO_BE_VERIFIED_MARKER };

export interface PlaceholderEntry {
  id: string;
  field: string;
  category: 'credentials' | 'contact' | 'timings' | 'clinic_location' | 'fees' | 'reviews' | 'legal';
  currentPlaceholderValue: string;
  actionRequired: string;
  isVerified: boolean;
}

export const PLACEHOLDER_REGISTRY: PlaceholderEntry[] = [
  {
    id: 'doc-qualifications',
    field: 'Doctor Degrees and Affiliated Universities',
    category: 'credentials',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} MBBS, MD (General Medicine), PG Diploma in Diabetology`,
    actionRequired: 'Verify official degree names and conferring institutions with Dr. Soumya Sengupta',
    isVerified: false,
  },
  {
    id: 'doc-reg-number',
    field: 'Medical Council Registration Number',
    category: 'credentials',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} WBMC-XXXXX`,
    actionRequired: 'Provide official State Medical Council registration certificate',
    isVerified: false,
  },
  {
    id: 'doc-experience-tenure',
    field: 'Clinical Practice Experience (Years)',
    category: 'credentials',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} 15+ Years`,
    actionRequired: 'Verify exact years of clinical practice',
    isVerified: false,
  },
  {
    id: 'clinic-address-salt-lake',
    field: 'Chamber Physical Address',
    category: 'clinic_location',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} Salt Lake Sector 1 Chamber, Kolkata 700064`,
    actionRequired: 'Provide exact address, room number, landmark, and pin code',
    isVerified: false,
  },
  {
    id: 'clinic-timings-opd',
    field: 'OPD Schedule & Consulting Hours',
    category: 'timings',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} Mon - Sat: 5:00 PM - 8:00 PM`,
    actionRequired: 'Verify chamber consultation hours and weekly off days',
    isVerified: false,
  },
  {
    id: 'contact-phone',
    field: 'Appointment Desk Phone Number',
    category: 'contact',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} +91 98300 00000`,
    actionRequired: 'Provide official clinic appointment phone number',
    isVerified: false,
  },
  {
    id: 'contact-whatsapp',
    field: 'WhatsApp Helpline',
    category: 'contact',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} +91 98300 00000`,
    actionRequired: 'Provide official WhatsApp communication line',
    isVerified: false,
  },
  {
    id: 'consultation-fee',
    field: 'Consultation Fee Structure',
    category: 'fees',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} ₹1,000`,
    actionRequired: 'Confirm initial and follow-up consultation fees',
    isVerified: false,
  },
  {
    id: 'reviews-disclaimer',
    field: 'Patient Experiences / Testimonials',
    category: 'reviews',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} Clinical feedback anonymized for patient confidentiality`,
    actionRequired: 'Doctor sign-off for compliant patient educational feedback',
    isVerified: false,
  },
  {
    id: 'privacy-policy-legal',
    field: 'Privacy Policy & Terms',
    category: 'legal',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} Standard Medical Web Disclaimer & Privacy Guidelines`,
    actionRequired: 'Legal / medical counsel sign-off before production release',
    isVerified: false,
  },
];
