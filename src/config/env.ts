/**
 * Safe client-side environment variable configuration.
 * Adheres strictly to the graceful degradation protocol:
 * If an environment variable is unset or empty, the system marks the channel as unavailable
 * preventing broken links, empty tel:/mailto: hrefs, or invalid maps navigation.
 */

interface EnvConfig {
  clinicPhone: string;
  hasPhone: boolean;
  whatsappNumber: string;
  hasWhatsapp: boolean;
  clinicEmail: string;
  hasEmail: boolean;
  googleMapsUrl: string;
  hasGoogleMaps: boolean;
  telemedicineEnabled: boolean;
  appTitle: string;
}

const rawPhone = (import.meta.env.VITE_CLINIC_PHONE ?? '').trim();
const rawWhatsapp = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').trim();
const rawEmail = (import.meta.env.VITE_CLINIC_EMAIL ?? '').trim();
const rawMaps = (import.meta.env.VITE_CLINIC_MAPS_URL ?? '').trim();
const rawTelemedicine = (import.meta.env.VITE_TELEMEDICINE_ENABLED ?? 'true').trim();

export const ENV: EnvConfig = {
  clinicPhone: rawPhone,
  hasPhone: rawPhone.length > 0,
  whatsappNumber: rawWhatsapp,
  hasWhatsapp: rawWhatsapp.length > 0,
  clinicEmail: rawEmail,
  hasEmail: rawEmail.length > 0,
  googleMapsUrl: rawMaps,
  hasGoogleMaps: rawMaps.length > 0,
  telemedicineEnabled: rawTelemedicine === 'true' || rawTelemedicine === '1',
  appTitle: (import.meta.env.VITE_APP_TITLE ?? 'Dr. Soumya Sengupta — Diabetologist').trim(),
};

/**
 * Returns formatted tel: URI or undefined if phone is unavailable
 */
export function getSafePhoneHref(): string | undefined {
  if (!ENV.hasPhone) return undefined;
  const sanitized = ENV.clinicPhone.replace(/[^+\d]/g, '');
  return sanitized ? `tel:${sanitized}` : undefined;
}

/**
 * Returns formatted WhatsApp web URI or undefined if WhatsApp is unavailable
 */
export function getSafeWhatsAppHref(defaultMessage?: string): string | undefined {
  if (!ENV.hasWhatsapp) return undefined;
  const sanitized = ENV.whatsappNumber.replace(/[^\d]/g, '');
  if (!sanitized) return undefined;
  const msgParam = defaultMessage ? `?text=${encodeURIComponent(defaultMessage)}` : '';
  return `https://wa.me/${sanitized}${msgParam}`;
}
