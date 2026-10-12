/**
 * Centralized Cloudflare R2 Image Assets for Dr. Soumya Sengupta — Cardio Diabetic Clinic.
 *
 * Source of truth image URLs hosted on Cloudflare R2 bucket.
 */
export const CLINIC_IMAGES = {
  /**
   * Primary Clinic Logo (2:1 landscape PNG)
   * Used in Navbar, Footer, Mobile Drawer, and Clinic Branding areas.
   */
  logo: 'https://pub-7db5b1cd8b0147abb4dc0bbc590bac39.r2.dev/logo.png',

  /**
   * Doctor Profile Photograph (Dr. Soumya Sengupta, 3:4 portrait JPEG)
   * Used in Homepage Hero, About Doctor section, and Physician Profile.
   */
  doctorProfile: 'https://pub-7db5b1cd8b0147abb4dc0bbc590bac39.r2.dev/doctor/DrSoumya.jpeg',

  /**
   * CCDSI Conference Photograph (Speaker on Stage PNG)
   * Used in Doctor's Professional Media & Event Gallery.
   */
  ccdsiConference: 'https://pub-7db5b1cd8b0147abb4dc0bbc590bac39.r2.dev/doctor/CCDSI%20Conference%20Speaker%20on%20Stage.png',

  /**
   * RSSDI JHCON 2026 Award Presentation Photograph (Stage Presentation PNG)
   * Used in Professional Gallery and Achievements & Recognitions section.
   */
  rssdiJhconAward: 'https://pub-7db5b1cd8b0147abb4dc0bbc590bac39.r2.dev/doctor/RSSDI%20JHCON%202026%20Award%20Presentation.png',
} as const;

export type ClinicImages = typeof CLINIC_IMAGES;
