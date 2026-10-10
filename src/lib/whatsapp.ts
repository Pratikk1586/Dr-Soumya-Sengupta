/**
 * WhatsApp Helper & Link Builder
 * Normalizes digits and validates against E.164 standard.
 * Builds secure wa.me URLs for appointment requests, general enquiries, and chamber directions.
 */

export interface AppointmentWhatsAppDetails {
  patientName?: string;
  phone?: string;
  patientType?: 'new' | 'followup';
  preferredDate?: string;
  preferredSlot?: string;
  preferredTime?: string;
  age?: number | string;
  reason?: string;
  referenceId?: string;
}

export type WhatsAppMessageType = 'appointment' | 'enquiry' | 'location';

/**
 * Normalizes a raw phone string to an E.164 digit string without '+' or spaces.
 * Returns null if the number is invalid or empty.
 */
export function normalizeE164Phone(rawPhone?: string | null): string | null {
  if (!rawPhone || typeof rawPhone !== 'string') return null;

  const trimmed = rawPhone.trim();
  if (!trimmed) return null;

  // Strip all non-digit characters except leading plus
  let digits = trimmed.replace(/\D/g, '');

  // If standard 10-digit Indian mobile, prefix with country code 91
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    digits = `91${digits}`;
  }

  // E.164 requires between 10 and 15 digits
  if (digits.length < 10 || digits.length > 15) {
    return null;
  }

  return digits;
}

/**
 * Gets the configured clinic WhatsApp number from environment variables.
 */
export function getClinicWhatsAppNumber(): string | null {
  const envNumber =
    import.meta.env.VITE_CLINIC_WHATSAPP_NUMBER ||
    import.meta.env.VITE_WHATSAPP_NUMBER ||
    '919431114510';

  return normalizeE164Phone(envNumber);
}

/**
 * Formats a specific pre-filled message for patient interactions.
 */
export function formatWhatsAppMessage(
  type: WhatsAppMessageType,
  details?: AppointmentWhatsAppDetails
): string {
  switch (type) {
    case 'appointment': {
      const parts: string[] = [
        'Hello Dr. Sengupta Clinic,',
        'I would like to book an appointment slot:',
      ];

      if (details?.referenceId) {
        parts.push(`• Reference ID: ${details.referenceId}`);
      }
      if (details?.patientName) {
        parts.push(`• Patient Name: ${details.patientName}`);
      }
      if (details?.phone) {
        parts.push(`• Contact Phone: ${details.phone}`);
      }
      if (details?.age) {
        parts.push(`• Age: ${details.age}`);
      }
      if (details?.patientType) {
        parts.push(
          `• Consultation Type: ${
            details.patientType === 'followup' ? 'Follow-up Visit' : 'First Consultation'
          }`
        );
      }
      if (details?.preferredDate) {
        parts.push(`• Preferred Date: ${details.preferredDate}`);
      }
      if (details?.preferredTime) {
        parts.push(`• Preferred Time: ${details.preferredTime}`);
      } else if (details?.preferredSlot) {
        parts.push(`• Preferred Slot: ${details.preferredSlot}`);
      }
      if (details?.reason) {
        parts.push(`• Reason for Visit: ${details.reason}`);
      }

      parts.push(
        '\nPlease confirm the appointment slot availability. I look forward to your confirmation call/message. Thank you!'
      );
      return parts.join('\n');
    }

    case 'location':
      return (
        'Hello Dr. Sengupta Clinic,\n' +
        'Could you please share the exact chamber address, landmark, and directions for my upcoming consultation?'
      );

    case 'enquiry':
    default:
      return (
        'Hello Dr. Sengupta Clinic,\n' +
        'I would like to make an enquiry regarding diabetology consultations, OPD schedule, and clinical services.'
      );
  }
}

/**
 * Builds a complete wa.me link. Returns null if no valid clinic WhatsApp number is configured.
 */
export function buildWhatsAppUrl(
  type: WhatsAppMessageType = 'enquiry',
  details?: AppointmentWhatsAppDetails,
  customNumber?: string | null
): string | null {
  const targetNumber = customNumber
    ? normalizeE164Phone(customNumber)
    : getClinicWhatsAppNumber();

  if (!targetNumber) return null;

  const message = formatWhatsAppMessage(type, details);
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
}
