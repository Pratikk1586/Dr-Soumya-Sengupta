/**
 * Doctor Qualifications & Professional Registrations Configuration
 * User placeholders can be filled or customized directly in this config file.
 */

export interface DoctorCredentialsConfig {
  degrees: string;
  registrationNumber: string;
  memberships: string[];
}

export const DOCTOR_CREDENTIALS: DoctorCredentialsConfig = {
  degrees: 'MBBS, PGD in Diabetology', // Placeholders to be customized
  registrationNumber: 'Reg. No. [Medical Council Reg. No. - to be filled]',
  memberships: [
    'Research Society for the Study of Diabetes in India (RSSDI)',
    'Association of Physicians of India (API)',
    '[Professional Association Membership - to be filled]',
  ],
};
