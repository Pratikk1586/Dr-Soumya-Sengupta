import type { LocalizedString, VerifiedField } from './content';

export interface Qualification {
  degree: LocalizedString;
  institution: LocalizedString;
  year?: string;
  isVerified: boolean;
}

export interface Affiliation {
  organization: LocalizedString;
  role: LocalizedString;
  isVerified: boolean;
}

export interface DoctorProfile {
  name: LocalizedString;
  title: LocalizedString;
  shortBio: LocalizedString;
  fullBio: LocalizedString[];
  qualifications: Qualification[];
  affiliations: Affiliation[];
  experienceYears: VerifiedField<number>;
  specialties: LocalizedString[];
  clinicalPhilosophy: LocalizedString;
  languagesSpoken: LocalizedString[];
  registrationNumber?: VerifiedField<string>;
}
