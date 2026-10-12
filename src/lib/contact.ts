/**
 * Telephone and Email Safe Link Helpers
 * Normalizes phone numbers for tel: schemes and sanitizes mailto: links.
 */

/**
 * Normalizes a phone string for use in tel: URLs.
 * Retains leading plus and digits only.
 */
export function getTelHref(rawPhone?: string | null): string | null {
  if (rawPhone === null) return null;

  const phone =
    rawPhone !== undefined
      ? rawPhone
      : (import.meta.env.VITE_CLINIC_PHONE || '+91 6582 256446');

  if (!phone || typeof phone !== 'string') return null;

  const trimmed = phone.trim();
  if (!trimmed) return null;

  // Extract leading + and all digits
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length < 7) return null;

  return `tel:${hasPlus ? '+' : ''}${digits}`;
}

/**
 * Validates and formats a mailto: URL with optional subject and body parameters.
 */
export function getMailtoHref(
  email?: string | null,
  subject?: string,
  body?: string
): string | null {
  if (email === null) return null;

  const targetEmail =
    email !== undefined
      ? email
      : (import.meta.env.VITE_EMAIL || import.meta.env.VITE_CLINIC_EMAIL || '');

  if (!targetEmail || typeof targetEmail !== 'string') return null;

  const trimmed = targetEmail.trim();
  // Standard permissive RFC5322 regex check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return null;

  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);

  const query = params.toString();
  return `mailto:${trimmed}${query ? `?${query}` : ''}`;
}
