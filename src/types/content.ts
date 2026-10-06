export type Language = 'en' | 'hi';

export interface LocalizedString {
  en: string;
  hi?: string;
}

export type ContentVerificationStatus = 'verified' | 'unverified_placeholder';

export type ReviewStatus = 'draft' | 'doctor_approved';

export interface VerifiedField<T> {
  value: T;
  verificationStatus: ContentVerificationStatus;
  notes?: string;
}

export interface MedicalDisclaimer {
  standard: LocalizedString;
  prescriptionNotice: LocalizedString;
  emergencyNotice: LocalizedString;
}
