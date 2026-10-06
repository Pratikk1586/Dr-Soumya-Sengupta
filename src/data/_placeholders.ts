/**
 * Content Safety and Verification Registry
 * Every unverified field (credentials, clinic address, timings, contact info, statistics)
 * MUST be tracked here with the explicit visible marker.
 */

export const CONTENT_TO_BE_VERIFIED_MARKER = '[CONTENT TO BE VERIFIED]';

export interface PlaceholderEntry {
  id: string;
  field: string;
  category: 'credentials' | 'contact' | 'timings' | 'clinic_location' | 'fees' | 'statistics';
  currentPlaceholderValue: string;
  actionRequired: string;
  isVerified: boolean;
}

export const PLACEHOLDER_REGISTRY: PlaceholderEntry[] = [
  {
    id: 'doc-qualifications-subspecialty',
    field: 'Doctor Advanced Qualifications / Fellowship',
    category: 'credentials',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} MBBS, MD (General Medicine), Post Graduate Diploma in Diabetology`,
    actionRequired: 'Provide official degree certificates and university names for Dr. Soumya Sengupta',
    isVerified: false,
  },
  {
    id: 'doc-reg-number',
    field: 'Medical Council Registration Number',
    category: 'credentials',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} WBMC-XXXXX`,
    actionRequired: 'Provide state medical council registration number',
    isVerified: false,
  },
  {
    id: 'doc-experience-years',
    field: 'Total Clinical Practice Experience',
    category: 'credentials',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} 15+ Years`,
    actionRequired: 'Confirm exact clinical years of practice',
    isVerified: false,
  },
  {
    id: 'clinic-primary-address',
    field: 'Primary Clinic Physical Address',
    category: 'clinic_location',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} Salt Lake / Kolkata Clinic OPD, Sector 1, Bidhannagar, Kolkata 700064`,
    actionRequired: 'Provide exact chamber address, room number, and landmark',
    isVerified: false,
  },
  {
    id: 'clinic-primary-timings',
    field: 'OPD Schedule & Consulting Hours',
    category: 'timings',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} Mon - Sat: 5:00 PM - 8:00 PM`,
    actionRequired: 'Verify daily consultation hours and weekly off days',
    isVerified: false,
  },
  {
    id: 'contact-phone-reception',
    field: 'Appointment Desk Phone',
    category: 'contact',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} +91 98300 00000`,
    actionRequired: 'Provide official clinic appointment phone number',
    isVerified: false,
  },
  {
    id: 'contact-whatsapp',
    field: 'Official WhatsApp Helpline',
    category: 'contact',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} +91 98300 00000`,
    actionRequired: 'Provide official WhatsApp consultation/booking line',
    isVerified: false,
  },
  {
    id: 'consultation-fee',
    field: 'Consultation Fee Structure',
    category: 'fees',
    currentPlaceholderValue: `${CONTENT_TO_BE_VERIFIED_MARKER} ₹800 - ₹1200`,
    actionRequired: 'Specify consultation fee and follow-up validity policy',
    isVerified: false,
  },
];

/**
 * Helper to ensure string carries the visible marker if unverified
 */
export function formatUnverifiedText(text: string, isVerified = false): string {
  if (isVerified) return text;
  if (text.includes(CONTENT_TO_BE_VERIFIED_MARKER)) return text;
  return `${CONTENT_TO_BE_VERIFIED_MARKER} ${text}`;
}
