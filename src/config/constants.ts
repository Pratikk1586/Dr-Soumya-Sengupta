export const CONTENT_TO_BE_VERIFIED_MARKER = '[CONTENT TO BE VERIFIED]';

/**
 * Dev flag to toggle display of "[CONTENT TO BE VERIFIED]" placeholder badges in UI.
 * Default is false in production/preview so clinical badges are hidden.
 */
export const SHOW_VERIFY_BADGES = false;

export const STANDARD_DISCLAIMER_TEXT = 'For medical diagnosis or treatment, please consult a qualified doctor.';

export const UNIVERSAL_DISCLAIMER_TEXT = {
  en: 'For medical diagnosis or treatment, please consult a qualified doctor. Educational content provided on this website is for general health literacy and must never replace an in-person clinical consultation or individual medical advice.',
  hi: 'चिकित्सीय निदान या उपचार के लिए कृपया किसी योग्य चिकित्सक से परामर्श लें। इस वेबसाइट पर दी गई जानकारी केवल सामान्य स्वास्थ्य जागरूकता के लिए है और यह किसी डॉक्टर की सलाह का विकल्प नहीं है।',
};

/**
 * 3D Hero Model Path.
 * If this asset is present on disk, useGLTF will load it; otherwise procedural fallback will render.
 */
export const PANCREAS_MODEL_PATH = '/assets/models/pancreas.glb';

/**
 * Feature flag for patient reviews section.
 * Note: Under Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations
 * and National Medical Commission guidelines, clinical testimonials are strictly regulated.
 * This flag allows toggling off patient reviews or showing only verified general satisfaction data.
 */
export const ENABLE_PATIENT_REVIEWS_SECTION = true;
