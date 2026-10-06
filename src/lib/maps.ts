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

/**
 * Retrieves the configured Google Maps URL from environment or custom clinic data.
 */
export function getGoogleMapsUrl(overrideUrl?: string): string | null {
  const envUrl =
    overrideUrl ||
    import.meta.env.VITE_GOOGLE_MAPS_URL ||
    import.meta.env.VITE_CLINIC_MAPS_URL ||
    '';

  const trimmed = envUrl.trim();
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
 * Falls back to standard destination search if no current location is specified.
 */
export function getDirectionsUrl(destination?: string): string | null {
  const target = destination?.trim() || 'Dr Soumya Sengupta Diabetology Chamber Salt Lake Kolkata';
  if (!target) return null;

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(target)}`;
}

/**
 * Returns a validated embed URL or null if absent/invalid.
 */
export function getSafeMapEmbedUrl(url?: string): string | null {
  if (!url) return null;
  return isValidGoogleMapsEmbedUrl(url) ? url.trim() : null;
}
