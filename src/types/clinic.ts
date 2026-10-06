import type { LocalizedString, VerifiedField } from './content';

export interface DaySchedule {
  dayOfWeek: LocalizedString;
  timings: LocalizedString;
  isAvailable: boolean;
}

export interface ContactInfo {
  phone: VerifiedField<string>;
  whatsapp: VerifiedField<string>;
  email: VerifiedField<string>;
  emergencyNote: LocalizedString;
}

export interface ClinicLocation {
  id: string;
  name: LocalizedString;
  facilityType: LocalizedString; // e.g. "Hospital OPD", "Private Clinic"
  address: {
    line1: LocalizedString;
    line2?: LocalizedString;
    city: LocalizedString;
    state: LocalizedString;
    pincode: string;
    landmark?: LocalizedString;
  };
  schedule: DaySchedule[];
  consultationFee?: VerifiedField<string>;
  mapsUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isVerified: boolean;
}
