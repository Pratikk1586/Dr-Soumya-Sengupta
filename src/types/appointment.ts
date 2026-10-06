import type { LocalizedString } from './content';

export type PreferredSlot = 'morning' | 'afternoon' | 'evening';
export type ConsultationMode = 'in_clinic' | 'telemedicine';

export interface AppointmentInquiryPayload {
  patientName: string;
  phone: string;
  email?: string;
  age?: number;
  consultationType: ConsultationMode;
  preferredClinicId: string;
  preferredDate: string;
  preferredSlot: PreferredSlot;
  notes?: string;
}

export interface AppointmentSubmissionResult {
  success: boolean;
  message: LocalizedString;
  inquiryReferenceId?: string;
}
