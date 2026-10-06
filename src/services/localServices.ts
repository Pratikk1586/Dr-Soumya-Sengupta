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
  AppointmentService,
  ProblemService,
} from './types';
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
import { DOCTOR_DATA } from '../data/doctor';
import { SERVICES_DATA } from '../data/services';
import { CONDITIONS_DATA } from '../data/conditions';
import { NOTICES_DATA } from '../data/notices';
import { ARTICLES_DATA } from '../data/articles';
import { FAQS_DATA } from '../data/faqs';
import { VIDEOS_DATA } from '../data/videos';
import { REVIEWS_DATA } from '../data/reviews';
import { CLINICS_DATA } from '../data/clinic';
import { REPORTS_DATA } from '../data/reports';
import { GUIDES_DATA } from '../data/guides';
import { PROBLEMS_DATA } from '../data/problems';
import { isRecentInIST } from '../utils/date';

export class LocalDoctorService implements DoctorService {
  async getProfile(): Promise<Doctor> {
    return Promise.resolve(DOCTOR_DATA);
  }
  async getQualifications(): Promise<Qualification[]> {
    return Promise.resolve(DOCTOR_DATA.qualifications);
  }
  async getExperiences(): Promise<Experience[]> {
    return Promise.resolve(DOCTOR_DATA.experiences);
  }
}

export class LocalServiceCatalogService implements ServiceCatalogService {
  async getServices(): Promise<Service[]> {
    return Promise.resolve(SERVICES_DATA);
  }
  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Promise.resolve(SERVICES_DATA.find((s) => s.slug === slug));
  }
}

export class LocalConditionService implements ConditionService {
  async getConditions(): Promise<Condition[]> {
    return Promise.resolve(CONDITIONS_DATA);
  }
  async getConditionBySlug(slug: string): Promise<Condition | undefined> {
    return Promise.resolve(CONDITIONS_DATA.find((c) => c.slug === slug));
  }
}

export class LocalNoticeService implements NoticeService {
  async getNotices(category?: string): Promise<Notice[]> {
    if (!category || category === 'all') {
      return Promise.resolve(NOTICES_DATA);
    }
    return Promise.resolve(NOTICES_DATA.filter((n) => n.category === category));
  }
  async getRecentNotices(): Promise<Notice[]> {
    const recent = NOTICES_DATA.filter((n) => {
      const dateToCheck = n.publishedAt || n.effectiveDate;
      return isRecentInIST(dateToCheck, 3);
    });
    return Promise.resolve(recent);
  }
  async getActiveNotice(): Promise<Notice | undefined> {
    return Promise.resolve(NOTICES_DATA.find((n) => n.isImportant) || NOTICES_DATA[0]);
  }
}

export class LocalArticleService implements ArticleService {
  async getArticles(): Promise<Article[]> {
    return Promise.resolve(ARTICLES_DATA);
  }
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Promise.resolve(ARTICLES_DATA.find((a) => a.slug === slug));
  }
}

export class LocalFaqService implements FaqService {
  async getFaqs(category?: string): Promise<FAQ[]> {
    if (!category || category === 'all') return Promise.resolve(FAQS_DATA);
    return Promise.resolve(FAQS_DATA.filter((f) => f.category === category));
  }
}

export class LocalVideoService implements VideoService {
  async getVideos(): Promise<Video[]> {
    return Promise.resolve(VIDEOS_DATA);
  }
}

export class LocalReviewService implements ReviewService {
  async getReviews(): Promise<Review[]> {
    return Promise.resolve(REVIEWS_DATA);
  }
}

export class LocalClinicService implements ClinicService {
  async getClinics(): Promise<Clinic[]> {
    return Promise.resolve(CLINICS_DATA);
  }
  async getPrimaryClinic(): Promise<Clinic> {
    return Promise.resolve(CLINICS_DATA[0]);
  }
}

export class LocalReportService implements ReportService {
  async getReportTopics(): Promise<ReportTopic[]> {
    return Promise.resolve(REPORTS_DATA);
  }
  async getReports(): Promise<ReportTopic[]> {
    return Promise.resolve(REPORTS_DATA);
  }
}

export class LocalGuideService implements GuideService {
  async getGuides(): Promise<PatientGuide[]> {
    return Promise.resolve(GUIDES_DATA);
  }
  async getGuideBySlug(slug: string): Promise<PatientGuide | undefined> {
    return Promise.resolve(GUIDES_DATA.find((g) => g.slug === slug));
  }
}

export class LocalProblemService implements ProblemService {
  async getProblems(): Promise<ProblemTopic[]> {
    return Promise.resolve(PROBLEMS_DATA);
  }
  async getProblemTopics(): Promise<ProblemTopic[]> {
    return Promise.resolve(PROBLEMS_DATA);
  }
  async getProblemBySlug(slug: string): Promise<ProblemTopic | undefined> {
    return Promise.resolve(PROBLEMS_DATA.find((p) => p.slug === slug));
  }
}

export class LocalAppointmentService implements AppointmentService {
  async submitInquiry(request: AppointmentRequest): Promise<{
    success: boolean;
    referenceId?: string;
    message: LocalizedString;
  }> {
    // Simulated network delay
    await new Promise((res) => setTimeout(res, 400));

    if (!request.patientName?.trim() || !request.phone?.trim()) {
      return {
        success: false,
        message: {
          en: 'Please provide patient name and contact telephone number.',
          hi: 'कृपया मरीज का नाम और संपर्क फोन नंबर दर्ज करें।',
        },
      };
    }

    const ref = `SS-INQ-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      referenceId: ref,
      message: {
        en: `Consultation request recorded (Ref: ${ref}). The chamber reception will call to confirm your appointment time.`,
        hi: `परामर्श अनुरोध दर्ज कर लिया गया है (संदर्भ: ${ref})। क्लिनिक डेस्क आपको समय की पुष्टि के लिए फोन करेगा।`,
      },
    };
  }
}

import { GALLERY_ITEMS } from '../data/gallery';
import type { GalleryService, GalleryItem, GalleryCategory } from './types';

export class LocalGalleryService implements GalleryService {
  async getGalleryItems(category?: GalleryCategory): Promise<GalleryItem[]> {
    if (!category || category === 'all') {
      return Promise.resolve(GALLERY_ITEMS);
    }
    return Promise.resolve(GALLERY_ITEMS.filter((item) => item.category === category));
  }
}
