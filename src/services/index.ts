import { LocalDoctorService } from './LocalDoctorService';
import { LocalClinicService } from './LocalClinicService';
import { LocalMedicalContentService } from './LocalMedicalContentService';
import { LocalAppointmentService } from './LocalAppointmentService';
import type { IDoctorService } from './IDoctorService';
import type { IClinicService } from './IClinicService';
import type { IMedicalContentService } from './IMedicalContentService';
import type { IAppointmentService } from './IAppointmentService';

export const doctorService: IDoctorService = new LocalDoctorService();
export const clinicService: IClinicService = new LocalClinicService();
export const medicalContentService: IMedicalContentService = new LocalMedicalContentService();
export const appointmentService: IAppointmentService = new LocalAppointmentService();

export type {
  IDoctorService,
  IClinicService,
  IMedicalContentService,
  IAppointmentService,
};
