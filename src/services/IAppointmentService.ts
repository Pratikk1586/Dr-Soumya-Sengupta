import type { AppointmentInquiryPayload, AppointmentSubmissionResult } from '../types/appointment';

export interface IAppointmentService {
  submitInquiry(payload: AppointmentInquiryPayload): Promise<AppointmentSubmissionResult>;
}
