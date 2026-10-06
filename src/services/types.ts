import type {
  Doctor,
  Qualification,
  Experience,
  Service,
  Condition,
  Notice,
  Article,
  FAQ,
  Video,
  Review,
  Clinic,
  ReportTopic,
  PatientGuide,
  AppointmentRequest,
  LocalizedString,
} from '../types';
import type { ProblemTopic } from '../data/problems';

export interface DoctorService {
  getProfile(): Promise<Doctor>;
  getQualifications(): Promise<Qualification[]>;
  getExperiences(): Promise<Experience[]>;
}

export interface ServiceCatalogService {
  getServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
}

export interface ConditionService {
  getConditions(): Promise<Condition[]>;
  getConditionBySlug(slug: string): Promise<Condition | undefined>;
}

export interface NoticeService {
  getNotices(category?: string): Promise<Notice[]>;
  getRecentNotices(): Promise<Notice[]>;
  getActiveNotice(): Promise<Notice | undefined>;
}

export interface ArticleService {
  getArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
}

export interface FaqService {
  getFaqs(category?: string): Promise<FAQ[]>;
}

export interface VideoService {
  getVideos(): Promise<Video[]>;
}

export interface ReviewService {
  getReviews(): Promise<Review[]>;
}

export interface ClinicService {
  getClinics(): Promise<Clinic[]>;
  getPrimaryClinic(): Promise<Clinic>;
}

export interface ReportService {
  getReportTopics(): Promise<ReportTopic[]>;
}

export interface GuideService {
  getGuides(): Promise<PatientGuide[]>;
  getGuideBySlug(slug: string): Promise<PatientGuide | undefined>;
}

export interface AppointmentService {
  submitInquiry(request: AppointmentRequest): Promise<{
    success: boolean;
    referenceId?: string;
    message: LocalizedString;
  }>;
}

export interface ProblemService {
  getProblems(): Promise<ProblemTopic[]>;
  getProblemBySlug(slug: string): Promise<ProblemTopic | undefined>;
}
