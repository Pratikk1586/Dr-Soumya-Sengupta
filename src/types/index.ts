export type Language = 'en' | 'hi';

export interface LocalizedString {
  en: string;
  hi?: string;
}

export type ContentStatus = 'verified' | 'placeholder';

export type ReviewStatus = 'draft' | 'doctor-reviewed';

export interface Qualification {
  id: string;
  degree: LocalizedString;
  institution: LocalizedString;
  year?: string;
  status: ContentStatus;
}

export interface Experience {
  id: string;
  role: LocalizedString;
  organization: LocalizedString;
  period: LocalizedString;
  status: ContentStatus;
}

export interface DoctorAchievement {
  id: string;
  title: LocalizedString;
  organization: LocalizedString;
  year?: string;
  description?: LocalizedString;
  category?: 'screening' | 'clinical' | 'community' | 'academic';
  image?: string;
}

export interface DoctorCertification {
  id: string;
  title: LocalizedString;
  organization: LocalizedString;
  year?: string;
  description?: LocalizedString;
  credentialId?: string;
  image?: string;
  isPlaceholder?: boolean;
}

export interface DoctorSocialLink {
  platform: 'youtube' | 'facebook' | 'instagram' | 'linkedin' | 'whatsapp';
  label: LocalizedString;
  url: string;
  handle?: string;
  description?: LocalizedString;
}

export interface Doctor {
  id: string;
  name: LocalizedString;
  title: LocalizedString;
  tagline: LocalizedString;
  shortBio: LocalizedString;
  fullBio: LocalizedString[];
  qualifications: Qualification[];
  experiences: Experience[];
  memberships: LocalizedString[];
  specialties: LocalizedString[];
  clinicalPhilosophy: LocalizedString;
  languagesSpoken: LocalizedString[];
  registrationNumber: string;
  registrationStatus: ContentStatus;
  photoUrl?: string;
  achievements?: DoctorAchievement[];
  certifications?: DoctorCertification[];
  socialLinks?: DoctorSocialLink[];
}

export interface Service {
  id: string;
  slug: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  category: 'clinical' | 'monitoring' | 'lifestyle' | 'preventive';
  indications: LocalizedString[];
  clinicalApproach: LocalizedString[];
  status: ContentStatus;
}

export interface Condition {
  id: string;
  slug: string;
  name: LocalizedString;
  category: 'diabetes' | 'thyroid' | 'weight-management' | 'metabolic-health' | 'other';
  summary: LocalizedString;
  symptoms: LocalizedString[];
  managementApproach: LocalizedString[];
  status: ContentStatus;
}

export type NoticeCategory =
  | 'holiday'
  | 'changed_timings'
  | 'health_camp'
  | 'important_update'
  | 'clinic_announcement'
  | 'clinic_schedule'
  | 'general'
  | 'emergency_advisory';

export interface Notice {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  category: NoticeCategory;
  effectiveDate: string;
  publishedAt?: string;
  expiryDate?: string;
  isImportant: boolean;
  status: ContentStatus;
}

export interface Article {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  category: LocalizedString;
  readTimeMinutes: number;
  contentParagraphs: LocalizedString[];
  keyTakeaways: LocalizedString[];
  reviewStatus: ReviewStatus;
  publishedAt: string;
  status: ContentStatus;
}

export type FAQCategory =
  | 'diabetes'
  | 'thyroid'
  | 'weight_management'
  | 'clinic'
  | 'appointments'
  | 'reports'
  | 'general'
  | 'treatment';

export interface FAQ {
  id: string;
  slug?: string;
  category: FAQCategory;
  question: LocalizedString;
  answer: LocalizedString;
  reviewStatus: ReviewStatus;
  status: ContentStatus;
}

export interface Video {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  transcript?: LocalizedString;
  durationMinutes: number;
  youtubeId?: string;
  category: LocalizedString;
  status: ContentStatus;
}

export interface Review {
  id: string;
  patientInitials: string;
  conditionManaged: LocalizedString;
  comment: LocalizedString;
  year: string;
  status: ContentStatus;
  rating?: number;
  url?: string;
  source?: string;
}

export interface Facility {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  status: ContentStatus;
}

export interface ClinicTiming {
  dayOfWeek: LocalizedString;
  timeSlot: LocalizedString;
  isAvailable: boolean;
  day?: string;
  openingTime?: string;
  closingTime?: string;
}

export interface Clinic {
  id: string;
  name: LocalizedString;
  facilityType: LocalizedString;
  logo?: string;
  address: {
    line1: LocalizedString;
    line2?: LocalizedString;
    city: LocalizedString;
    pincode: string;
    landmark?: LocalizedString;
  };
  phone: string;
  whatsapp: string;
  email: string;
  mapsUrl?: string;
  embedUrl?: string;
  timings: ClinicTiming[];
  consultationFee: string;
  facilities: Facility[];
  status: ContentStatus;
}

export interface ReportRangeGuideline {
  standardRange: string;
  source: string;
  guidelineNote: LocalizedString;
  reviewStatus: ReviewStatus;
}

export interface ReportTopic {
  id: string;
  key: 'glucose' | 'hba1c' | 'blood_pressure' | 'cholesterol' | 'bmi' | 'kidney_uacr' | 'thyroid_tsh';
  title: LocalizedString;
  testName: LocalizedString;
  whatItIs: LocalizedString;
  whyItIsMeasured: LocalizedString;
  generalEducationalMeaning: LocalizedString;
  referenceRangeGuideline?: ReportRangeGuideline;
  reviewStatus: ReviewStatus;
  status: ContentStatus;
}

export interface PatientGuide {
  id: string;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  steps: LocalizedString[];
  emergencyWarning?: LocalizedString;
  downloadUrl?: string;
  reviewStatus: ReviewStatus;
  status: ContentStatus;
}

export interface ProblemTopic {
  id: string;
  slug: string;
  title: LocalizedString;
  shortDesc: LocalizedString;
  generalInfo: LocalizedString;
  keyConsiderations: LocalizedString[];
  relatedPageLink: string;
  relatedPageLabel: LocalizedString;
  relatedResourceLink: string;
  relatedResourceLabel: LocalizedString;
  status: ContentStatus;
}

export interface AppointmentRequest {
  patientName: string;
  phone: string;
  email?: string;
  age?: number | string;
  patientType?: 'new' | 'followup';
  consultationType?: 'in_clinic' | 'telemedicine';
  preferredClinicId?: string;
  preferredDate: string;
  preferredSlot?: 'morning' | 'afternoon' | 'evening';
  preferredTime?: string;
  reasonForVisit?: string;
  consent?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
}

export interface SearchResult {
  id: string;
  title: LocalizedString;
  snippet: LocalizedString;
  url: string;
  category: 'service' | 'condition' | 'article' | 'faq' | 'clinic';
}

export interface NavigationSubItem {
  name: LocalizedString;
  href: string;
  description?: LocalizedString;
}

export interface NavigationItem {
  id: string;
  name: LocalizedString;
  href: string;
  children?: NavigationSubItem[];
}
