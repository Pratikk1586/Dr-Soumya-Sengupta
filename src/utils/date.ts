/**
 * Date and time utilities tuned to Asia/Kolkata (Indian Standard Time - IST).
 */

export const IST_TIMEZONE = 'Asia/Kolkata';

/**
 * Checks whether a given ISO date string or YYYY-MM-DD was published within the last 3 days (72 hours) in IST.
 */
export function isRecentInIST(dateString: string, maxDays = 3): boolean {
  try {
    const targetDate = new Date(dateString);
    if (isNaN(targetDate.getTime())) return false;

    // Current time
    const now = new Date();

    // Milliseconds difference
    const diffMs = now.getTime() - targetDate.getTime();

    // If future or older than maxDays in ms
    const maxMs = maxDays * 24 * 60 * 60 * 1000;
    return diffMs >= 0 && diffMs <= maxMs;
  } catch {
    return false;
  }
}

/**
 * Formats a date string in IST format, e.g. "04 Oct 2026"
 */
export function formatDateInIST(dateString: string, locale: 'en' | 'hi' = 'en'): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat(locale === 'hi' ? 'hi-IN' : 'en-IN', {
      timeZone: IST_TIMEZONE,
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}
