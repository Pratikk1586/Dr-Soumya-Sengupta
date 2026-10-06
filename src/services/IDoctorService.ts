import type { DoctorProfile, Qualification, Affiliation } from '../types/doctor';

export interface IDoctorService {
  getProfile(): Promise<DoctorProfile>;
  getQualifications(): Promise<Qualification[]>;
  getAffiliations(): Promise<Affiliation[]>;
}
