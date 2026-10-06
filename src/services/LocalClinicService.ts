import type { IClinicService } from './IClinicService';
import type { ClinicLocation } from '../types/clinic';
import { CLINIC_LOCATIONS_DATA } from '../data/clinics';

export class LocalClinicService implements IClinicService {
  async getClinics(): Promise<ClinicLocation[]> {
    return Promise.resolve(CLINIC_LOCATIONS_DATA);
  }

  async getClinicById(id: string): Promise<ClinicLocation | undefined> {
    const clinic = CLINIC_LOCATIONS_DATA.find((item) => item.id === id);
    return Promise.resolve(clinic);
  }
}
