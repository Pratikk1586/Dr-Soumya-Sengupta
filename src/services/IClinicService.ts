import type { ClinicLocation } from '../types/clinic';

export interface IClinicService {
  getClinics(): Promise<ClinicLocation[]>;
  getClinicById(id: string): Promise<ClinicLocation | undefined>;
}
