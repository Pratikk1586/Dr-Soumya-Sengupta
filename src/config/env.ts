/**
 * Typed client-side environment configuration and graceful degradation helper.
 * Normalizes and validates VITE_* environment variables.
 * If variables are empty, provides safe fallbacks and status flags to prevent broken UI.
 */

export interface AppEnvConfig {
  clinicPhone: string;
  hasPhone: boolean;
  whatsappNumber: string;
  hasWhatsapp: boolean;
  clinicEmail: string;
  hasEmail: boolean;
  clinicAddress: string;
  hasAddress: boolean;
  googleMapsUrl: string;
  hasGoogleMaps: boolean;
  doctorName: string;
  siteUrl: string;
  telemedicineEnabled: boolean;
}

function cleanString(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val.trim();
}

function sanitizePhone(raw: string): string {
  return raw.replace(/[^+\d]/g, '');
}

const rawPhone = cleanString(import.meta.env.VITE_CLINIC_PHONE);
const rawWhatsapp = cleanString(import.meta.env.VITE_WHATSAPP_NUMBER);
const rawEmail = cleanString(import.meta.env.VITE_EMAIL || import.meta.env.VITE_CLINIC_EMAIL);
const rawAddress = cleanString(import.meta.env.VITE_ADDRESS);
const rawMapsUrl = cleanString(import.meta.env.VITE_GOOGLE_MAPS_URL || import.meta.env.VITE_CLINIC_MAPS_URL);
const rawName = cleanString(import.meta.env.VITE_NAME) || 'Dr. Soumya Sengupta';
const rawSiteUrl = cleanString(import.meta.env.VITE_SITE_URL) || 'https://drsoumyasengupta.com';
const rawTelemedicine = cleanString(import.meta.env.VITE_TELEMEDICINE_ENABLED);

export const ENV: AppEnvConfig = {
  clinicPhone: rawPhone,
  hasPhone: rawPhone.length > 0,
  whatsappNumber: rawWhatsapp,
  hasWhatsapp: rawWhatsapp.length > 0,
  clinicEmail: rawEmail,
  hasEmail: rawEmail.length > 0,
  clinicAddress: rawAddress,
  hasAddress: rawAddress.length > 0,
  googleMapsUrl: rawMapsUrl,
  hasGoogleMaps: rawMapsUrl.length > 0,
  doctorName: rawName,
  siteUrl: rawSiteUrl,
  telemedicineEnabled: rawTelemedicine === 'false' ? false : true,
};

export function getSafePhoneHref(): string | undefined {
  if (!ENV.hasPhone) return undefined;
  const digits = sanitizePhone(ENV.clinicPhone);
  return digits ? `tel:${digits}` : undefined;
}

export function getSafeWhatsAppHref(defaultMessage?: string): string | undefined {
  if (!ENV.hasWhatsapp) return undefined;
  const digits = sanitizePhone(ENV.whatsappNumber);
  if (!digits) return undefined;
  const msgParam = defaultMessage ? `?text=${encodeURIComponent(defaultMessage)}` : '';
  return `https://wa.me/${digits.replace(/^\+/, '')}${msgParam}`;
}

export function getSafeEmailHref(): string | undefined {
  if (!ENV.hasEmail) return undefined;
  return `mailto:${ENV.clinicEmail}`;
}
