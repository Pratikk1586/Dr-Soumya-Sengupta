import {
  LocalDoctorService,
  LocalServiceCatalogService,
  LocalConditionService,
  LocalNoticeService,
  LocalArticleService,
  LocalFaqService,
  LocalVideoService,
  LocalReviewService,
  LocalClinicService,
  LocalReportService,
  LocalGuideService,
  LocalProblemService,
  LocalAppointmentService,
} from './localServices';
import { LocalSearchService } from './searchService';
import type {
  DoctorService,
  ServiceCatalogService,
  ConditionService,
  NoticeService,
  ArticleService,
  FaqService,
  VideoService,
  ReviewService,
  ClinicService,
  ReportService,
  GuideService,
  ProblemService,
  AppointmentService,
  SearchService,
} from './types';

// Central Service Registry / IoC Container
// Future Api* implementations can replace Local* instances here without touching any UI component.
export const doctorService: DoctorService = new LocalDoctorService();
export const serviceCatalogService: ServiceCatalogService = new LocalServiceCatalogService();
export const conditionService: ConditionService = new LocalConditionService();
export const noticeService: NoticeService = new LocalNoticeService();
export const articleService: ArticleService = new LocalArticleService();
export const faqService: FaqService = new LocalFaqService();
export const videoService: VideoService = new LocalVideoService();
export const reviewService: ReviewService = new LocalReviewService();
export const clinicService: ClinicService = new LocalClinicService();
export const reportService: ReportService = new LocalReportService();
export const guideService: GuideService = new LocalGuideService();
export const problemService: ProblemService = new LocalProblemService();
export const appointmentService: AppointmentService = new LocalAppointmentService();
export const searchService: SearchService = new LocalSearchService();

export * from './types';
export { LocalSearchService };
