import type { IDoctorService } from './IDoctorService';
import type { DoctorProfile, Qualification, Affiliation } from '../types/doctor';
import { DOCTOR_DATA } from '../data/doctor';

export class LocalDoctorService implements IDoctorService {
  async getProfile(): Promise<DoctorProfile> {
    return Promise.resolve(DOCTOR_DATA);
  }

  async getQualifications(): Promise<Qualification[]> {
    return Promise.resolve(DOCTOR_DATA.qualifications);
  }

  async getAffiliations(): Promise<Affiliation[]> {
    return Promise.resolve(DOCTOR_DATA.affiliations);
  }
}
