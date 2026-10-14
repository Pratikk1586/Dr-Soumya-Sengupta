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
  ProblemTopic,
  AppointmentRequest,
  LocalizedString,
} from '../types';

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
  getReports(): Promise<ReportTopic[]>;
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
  getProblemTopics(): Promise<ProblemTopic[]>;
  getProblemBySlug(slug: string): Promise<ProblemTopic | undefined>;
}

export type SearchResultCategory =
  | 'condition'
  | 'service'
  | 'article'
  | 'faq'
  | 'video'
  | 'report'
  | 'guide'
  | 'notice'
  | 'clinic';

export interface SearchResultItem {
  id: string;
  title: string;
  category: SearchResultCategory;
  categoryLabel: string;
  snippet: string;
  url: string;
  score: number;
}

export interface SearchService {
  search(query: string, language: 'en' | 'hi'): Promise<SearchResultItem[]>;
  getPopularSuggestions(language: 'en' | 'hi'): string[];
}

export interface ChatActionOption {
  label: string;
  url?: string;
  action?: string;
  isExternal?: boolean;
}

export interface ChatbotMessage {
  id: string;
  sender: 'assistant' | 'user' | 'system';
  text: string;
  timestamp: string;
  actions?: ChatActionOption[];
  isWarning?: boolean;
}

export interface ChatbotService {
  getInitialMessage(language: 'en' | 'hi'): ChatbotMessage;
  getQuickActions(language: 'en' | 'hi'): ChatActionOption[];
  respond(userInput: string, language: 'en' | 'hi'): Promise<ChatbotMessage>;
}

export type GalleryCategory =
  | 'all'
  | 'clinic_photos'
  | 'doctor_photos'
  | 'events'
  | 'videos'
  | 'health_camps'
  | 'activities';

export interface GalleryItem {
  id: string;
  title: LocalizedString;
  caption: LocalizedString;
  altText: LocalizedString;
  category: Exclude<GalleryCategory, 'all'>;
  thumbnailUrl: string;
  fullUrl: string;
  aspectRatio: '4/3' | '16/9' | '1/1';
  youtubeId?: string;
  date?: string;
}

export interface GalleryService {
  getGalleryItems(category?: GalleryCategory): Promise<GalleryItem[]>;
}

export interface EventItem {
  id: string;
  title: LocalizedString;
  date: string;
  location: LocalizedString;
  description: LocalizedString;
  category: string;
  image: string;
  keyHighlights: LocalizedString[];
  galleryImages?: string[];
}

export interface EventService {
  getEvents(): Promise<EventItem[]>;
}
