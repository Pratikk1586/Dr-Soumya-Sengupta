/**
 * Google Maps & Directions Link Helpers
 * Handles safe embed validation and directions URL synthesis.
 */

/**
 * Validates whether an embed URL points to a legitimate Google Maps embed endpoint.
 * Prevents arbitrary iframe injection or protocol violations.
 */
export function isValidGoogleMapsEmbedUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;

  try {
    const parsed = new URL(url.trim());
    if (parsed.protocol !== 'https:') return false;

    // Check known Google Maps embed hosts and paths
    const validHosts = ['www.google.com', 'google.com', 'maps.google.com'];
    if (!validHosts.includes(parsed.hostname.toLowerCase())) return false;

    // Validate embed path / query param
    const isEmbedPath = parsed.pathname.startsWith('/maps/embed');
    const hasEmbedOutput = parsed.searchParams.get('output') === 'embed';

    return isEmbedPath || hasEmbedOutput;
  } catch {
    return false;
  }
}

export const VERIFIED_GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/59pyGSNwQ8x2ruQ26';

/**
 * Retrieves the configured Google Maps URL from environment or custom clinic data.
 */
export function getGoogleMapsUrl(overrideUrl?: string | null): string | null {
  if (overrideUrl === null) return null;

  const envUrl =
    overrideUrl !== undefined
      ? overrideUrl
      : (import.meta.env.VITE_GOOGLE_MAPS_URL ||
         import.meta.env.VITE_CLINIC_MAPS_URL ||
         VERIFIED_GOOGLE_MAPS_URL);

  const trimmed = envUrl?.trim() || '';
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? trimmed : null;
  } catch {
    return null;
  }
}

/**
 * Synthesizes a Google Maps driving / walking directions URL.
 * If a custom destination string is provided, encodes it into the directions endpoint.
 * Otherwise, defaults to the verified clinic location URL.
 */
export function getDirectionsUrl(destination?: string): string {
  const target = destination?.trim();
  if (target) {
    if (target.startsWith('http://') || target.startsWith('https://')) {
      return target;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(target)}`;
  }

  return getGoogleMapsUrl() || VERIFIED_GOOGLE_MAPS_URL;
}

/**
 * Returns a validated embed URL or null if absent/invalid.
 */
export function getSafeMapEmbedUrl(url?: string): string | null {
  if (!url) return null;
  return isValidGoogleMapsEmbedUrl(url) ? url.trim() : null;
}
