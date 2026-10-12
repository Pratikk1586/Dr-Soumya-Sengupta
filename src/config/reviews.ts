/**
 * Patient Reviews Configuration
 *
 * NOTE: Do not invent any ratings or review counts.
 * The placeholders below will be filled by the doctor / clinic owner with real Google Reviews metrics.
 */

export interface ReviewsConfig {
  /** Numeric rating out of 5 (e.g. 4.9) or null if pending verification */
  rating: number | null;
  /** Total verified review count (e.g. 48) or null if pending verification */
  reviewCount: number | null;
  /** Platform source name */
  platform: string;
  /** Direct link to Google Maps / Reviews page */
  mapsUrl: string;
}

export const REVIEWS_CONFIG: ReviewsConfig = {
  // PLACEHOLDER: Real numbers to be provided by user/doctor
  rating: null,
  reviewCount: null,
  platform: 'Google Reviews',
  mapsUrl: 'https://maps.app.goo.gl/59pyGSNwQ8x2ruQ26',
};
