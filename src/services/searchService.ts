import type {
  SearchService,
  SearchResultItem,
  SearchResultCategory,
  ConditionService,
  ServiceCatalogService,
  ArticleService,
  FaqService,
  VideoService,
  ReportService,
  GuideService,
  NoticeService,
  ClinicService,
} from './types';
import type { Language } from '../types';
import { getLocalizedText } from '../utils/localization';
import {
  LocalConditionService,
  LocalServiceCatalogService,
  LocalArticleService,
  LocalFaqService,
  LocalVideoService,
  LocalReportService,
  LocalGuideService,
  LocalNoticeService,
  LocalClinicService,
} from './localServices';

const CATEGORY_LABELS: Record<SearchResultCategory, { en: string; hi: string }> = {
  condition: { en: 'Conditions & Care', hi: 'रोग एवं देखभाल' },
  service: { en: 'Clinical Services', hi: 'चिकित्सीय सेवाएं' },
  article: { en: 'Knowledge Hub Articles', hi: 'चिकित्सीय लेख' },
  faq: { en: 'Patient FAQs', hi: 'अक्सर पूछे जाने वाले प्रश्न' },
  video: { en: 'Educational Videos', hi: 'शैक्षणिक वीडियो' },
  report: { en: 'Understanding Lab Reports', hi: 'लैब रिपोर्ट समझें' },
  guide: { en: 'Patient Self-Care Guides', hi: 'रोगी स्व-देखभाल गाइड' },
  notice: { en: 'Clinic Notices', hi: 'क्लिनिक सूचनाएं' },
  clinic: { en: 'Chamber & Logistics', hi: 'चेंबर एवं समय' },
};

interface IndexableDoc {
  id: string;
  category: SearchResultCategory;
  titleEn: string;
  titleHi?: string;
  descriptionEn: string;
  descriptionHi?: string;
  bodyEn?: string;
  bodyHi?: string;
  tagsEn?: string[];
  tagsHi?: string[];
  url: string;
}

export class LocalSearchService implements SearchService {
  private conditionService: ConditionService;
  private serviceCatalogService: ServiceCatalogService;
  private articleService: ArticleService;
  private faqService: FaqService;
  private videoService: VideoService;
  private reportService: ReportService;
  private guideService: GuideService;
  private noticeService: NoticeService;
  private clinicService: ClinicService;

  constructor(
    conditionService?: ConditionService,
    serviceCatalogService?: ServiceCatalogService,
    articleService?: ArticleService,
    faqService?: FaqService,
    videoService?: VideoService,
    reportService?: ReportService,
    guideService?: GuideService,
    noticeService?: NoticeService,
    clinicService?: ClinicService
  ) {
    this.conditionService = conditionService || new LocalConditionService();
    this.serviceCatalogService = serviceCatalogService || new LocalServiceCatalogService();
    this.articleService = articleService || new LocalArticleService();
    this.faqService = faqService || new LocalFaqService();
    this.videoService = videoService || new LocalVideoService();
    this.reportService = reportService || new LocalReportService();
    this.guideService = guideService || new LocalGuideService();
    this.noticeService = noticeService || new LocalNoticeService();
    this.clinicService = clinicService || new LocalClinicService();
    this.warmupIndex();
  }

  private cachedDocs: IndexableDoc[] | null = null;
  private compilingPromise: Promise<IndexableDoc[]> | null = null;

  public warmupIndex(): void {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
        void this.compileIndex();
      });
    } else if (typeof window !== 'undefined') {
      setTimeout(() => {
        void this.compileIndex();
      }, 500);
    }
  }

  private async compileIndex(): Promise<IndexableDoc[]> {
    if (this.cachedDocs) return this.cachedDocs;
    if (this.compilingPromise) return this.compilingPromise;

    this.compilingPromise = (async () => {
      const docs: IndexableDoc[] = [];

    // 1. Conditions
    const conditions = await this.conditionService.getConditions();
    for (const c of conditions) {
      docs.push({
        id: `cond-${c.id}`,
        category: 'condition',
        titleEn: c.name.en,
        titleHi: c.name.hi,
        descriptionEn: c.summary.en,
        descriptionHi: c.summary.hi,
        bodyEn: `${c.symptoms.map((s) => s.en).join(' ')} ${c.managementApproach.map((m) => m.en).join(' ')}`,
        bodyHi: `${c.symptoms.map((s) => s.hi || '').join(' ')} ${c.managementApproach.map((m) => m.hi || '').join(' ')}`,
        tagsEn: [c.category],
        tagsHi: [],
        url: `/conditions/${c.slug}`,
      });
    }

    // 2. Services
    const services = await this.serviceCatalogService.getServices();
    for (const s of services) {
      docs.push({
        id: `serv-${s.id}`,
        category: 'service',
        titleEn: s.title.en,
        titleHi: s.title.hi,
        descriptionEn: s.shortDescription.en,
        descriptionHi: s.shortDescription.hi,
        bodyEn: `${s.fullDescription.en} ${s.indications.map((i) => i.en).join(' ')}`,
        bodyHi: `${s.fullDescription.hi || ''} ${s.indications.map((i) => i.hi || '').join(' ')}`,
        tagsEn: [s.category],
        tagsHi: [],
        url: `/diabetes-care/${s.slug}`,
      });
    }

    // 3. Articles
    const articles = await this.articleService.getArticles();
    for (const a of articles) {
      docs.push({
        id: `art-${a.id}`,
        category: 'article',
        titleEn: a.title.en,
        titleHi: a.title.hi,
        descriptionEn: a.excerpt.en,
        descriptionHi: a.excerpt.hi,
        bodyEn: `${a.contentParagraphs.map((p) => p.en).join(' ')} ${a.keyTakeaways.map((k) => k.en).join(' ')}`,
        bodyHi: `${a.contentParagraphs.map((p) => p.hi || '').join(' ')} ${a.keyTakeaways.map((k) => k.hi || '').join(' ')}`,
        tagsEn: [a.category.en],
        tagsHi: [a.category.hi || ''],
        url: `/patient-resources/articles/${a.slug}`,
      });
    }

    // 4. FAQs
    const faqs = await this.faqService.getFaqs();
    for (const f of faqs) {
      docs.push({
        id: `faq-${f.id}`,
        category: 'faq',
        titleEn: f.question.en,
        titleHi: f.question.hi,
        descriptionEn: f.answer.en,
        descriptionHi: f.answer.hi,
        tagsEn: [f.category],
        tagsHi: [],
        url: `/patient-resources/faqs#${f.slug || f.id}`,
      });
    }

    // 5. Videos
    const videos = await this.videoService.getVideos();
    for (const v of videos) {
      docs.push({
        id: `vid-${v.id}`,
        category: 'video',
        titleEn: v.title.en,
        titleHi: v.title.hi,
        descriptionEn: v.description.en,
        descriptionHi: v.description.hi,
        bodyEn: v.transcript?.en,
        bodyHi: v.transcript?.hi,
        tagsEn: [v.category.en],
        tagsHi: [v.category.hi || ''],
        url: `/patient-resources/videos`,
      });
    }

    // 6. Reports
    const reports = await this.reportService.getReports();
    for (const r of reports) {
      docs.push({
        id: `rep-${r.id}`,
        category: 'report',
        titleEn: `${r.title.en} (${r.testName.en})`,
        titleHi: `${r.title.hi || r.title.en} (${r.testName.hi || r.testName.en})`,
        descriptionEn: r.whatItIs.en,
        descriptionHi: r.whatItIs.hi,
        bodyEn: `${r.whyItIsMeasured.en} ${r.generalEducationalMeaning.en}`,
        bodyHi: `${r.whyItIsMeasured.hi || ''} ${r.generalEducationalMeaning.hi || ''}`,
        tagsEn: [r.key, 'blood test', 'lab report'],
        tagsHi: ['जांच', 'रिपोर्ट'],
        url: `/patient-resources/understand-your-reports#${r.key}`,
      });
    }

    // 7. Guides
    const guides = await this.guideService.getGuides();
    for (const g of guides) {
      docs.push({
        id: `guide-${g.id}`,
        category: 'guide',
        titleEn: g.title.en,
        titleHi: g.title.hi,
        descriptionEn: g.summary.en,
        descriptionHi: g.summary.hi,
        bodyEn: g.steps.map((s) => s.en).join(' '),
        bodyHi: g.steps.map((s) => s.hi || '').join(' '),
        tagsEn: ['guide', 'self-care', 'patient resources'],
        tagsHi: ['गाइड', 'देखभाल'],
        url: `/patient-resources/guides`,
      });
    }

    // 8. Notices
    const notices = await this.noticeService.getNotices();
    for (const n of notices) {
      docs.push({
        id: `not-${n.id}`,
        category: 'notice',
        titleEn: n.title.en,
        titleHi: n.title.hi,
        descriptionEn: n.content.en,
        descriptionHi: n.content.hi,
        tagsEn: [n.category, n.isImportant ? 'important' : 'update'],
        tagsHi: ['सूचना'],
        url: `/clinic/timings`,
      });
    }

    // 9. Clinic Pages & Details
    const clinics = await this.clinicService.getClinics();
    for (const cl of clinics) {
      docs.push({
        id: `cl-${cl.id}`,
        category: 'clinic',
        titleEn: cl.name.en,
        titleHi: cl.name.hi,
        descriptionEn: `${cl.address.line1.en}, ${cl.address.city.en} - ${cl.address.pincode} (${cl.facilityType.en})`,
        descriptionHi: `${cl.address.line1.hi || cl.address.line1.en}, ${cl.address.city.hi || cl.address.city.en} - ${cl.address.pincode}`,
        tagsEn: ['clinic', 'chamber', 'address', 'chaibasa', 'jharkhand'],
        tagsHi: ['क्लिनिक', 'चेंबर', 'चाईबासा', 'झारखंड'],
        url: `/clinic/location`,
      });
    }

    // Static clinic section pages
    docs.push(
      {
        id: 'clinic-timings',
        category: 'clinic',
        titleEn: 'OPD Chamber Timings & Consulting Hours',
        titleHi: 'ओपीडी परामर्श समय एवं चेंबर सारणी',
        descriptionEn: 'Weekly consulting schedule for Cardio Diabetic Clinic in Chaibasa.',
        descriptionHi: 'कार्डियो डायबिटिक क्लिनिक चाईबासा के लिए साप्ताहिक परामर्श समय।',
        tagsEn: ['timings', 'schedule', 'opd', 'appointment'],
        tagsHi: ['समय', 'शेड्यूल', 'ओपीडी'],
        url: '/clinic/timings',
      },
      {
        id: 'clinic-facilities',
        category: 'clinic',
        titleEn: 'Diagnostic Facilities & Point-of-Care Testing',
        titleHi: 'जांच एवं परीक्षण सुविधाएं',
        descriptionEn: 'In-chamber HbA1c testing, biothesiometry foot screening, and ECG monitoring.',
        descriptionHi: 'चेंबर में त्वरित एचबीए1सी जांच, न्यूरोपैथी फुट स्क्रीनिंग एवं ईसीजी।',
        tagsEn: ['facilities', 'tests', 'screening', 'biothesiometry', 'hba1c'],
        tagsHi: ['सुविधाएं', 'जांच', 'परीक्षण'],
        url: '/clinic/facilities',
      },
      {
        id: 'clinic-photos',
        category: 'clinic',
        titleEn: 'Chamber Photographs & Ambience',
        titleHi: 'चेंबर छायाचित्र एवं वातावरण',
        descriptionEn: 'Hygienic consulting environment, comfortable patient lounge, and consultation suite.',
        descriptionHi: 'स्वच्छ परामर्श कक्ष और आरामदायक प्रतीक्षा लाउंज।',
        tagsEn: ['photos', 'gallery', 'ambience'],
        tagsHi: ['फोटो', 'गैलरी'],
        url: '/clinic/photos',
      },
      // 10. Diabetes Knowledge Hub
      {
        id: 'res-diabetes-knowledge-hub',
        category: 'guide',
        titleEn: 'Diabetes Knowledge Hub',
        titleHi: 'डायबिटीज नॉलेज हब',
        descriptionEn: 'Organized patient learning cards covering blood sugar, HbA1c, food, lifestyle, and complications.',
        descriptionHi: 'डायबिटीज, ब्लड शुगर, खान-पान और जीवनशैली पर सरल और स्पष्ट शिक्षा केंद्र।',
        bodyEn: 'understanding diabetes blood sugar hba1c food lifestyle care complications common questions',
        bodyHi: 'डायबिटीज ब्लड शुगर एचबीए1सी खानपान जीवनशैली जटिलताएं सवाल',
        tagsEn: ['knowledge hub', 'diabetes', 'education', 'hba1c', 'lifestyle', 'complications'],
        tagsHi: ['नॉलेज हब', 'शिक्षा', 'डायबिटीज'],
        url: '/patient-resources/diabetes-knowledge-hub',
      },
      // 11. Know Your Problem
      {
        id: 'res-know-your-problem',
        category: 'guide',
        titleEn: 'Know Your Problem (Symptom & Concern Guide)',
        titleHi: 'अपनी समस्या समझें (लक्षण मार्गदर्शिका)',
        descriptionEn: 'Educational guidance for common symptoms: frequent thirst, frequent urination, fatigue, weight changes, and high blood sugar.',
        descriptionHi: 'प्यास, बार-बार पेशाब, थकान, वजन में बदलाव और बढ़ी हुई शुगर जैसे आम लक्षणों की सरल समझ।',
        bodyEn: 'thirst urination fatigue weight high blood sugar hba1c thyroid symptoms concerns',
        bodyHi: 'प्यास पेशाब थकान वजन शुगर थायरॉयड लक्षण',
        tagsEn: ['symptoms', 'concerns', 'thirst', 'fatigue', 'weight', 'sugar'],
        tagsHi: ['लक्षण', 'प्यास', 'थकान'],
        url: '/patient-resources/know-your-problem',
      },
      // 12. Media Hub & Events
      {
        id: 'media-events-camps',
        category: 'clinic',
        titleEn: 'Media Events, Health Camps & Conferences',
        titleHi: 'आयोजन, स्वास्थ्य शिविर एवं सम्मेलन',
        descriptionEn: 'Community diabetes screenings in Chaibasa, RSSDI academic medical conferences, and foot care workshops.',
        descriptionHi: 'चाईबासा में निःशुल्क जांच शिविर, डायबिटोलॉजी सम्मेलन एवं मरीज कार्यशालाएं।',
        bodyEn: 'health camps screening workshops conferences rssdi chaibasa events',
        bodyHi: 'शिविर कार्यशाला सम्मेलन कार्यक्रम',
        tagsEn: ['events', 'camps', 'health camp', 'conferences', 'media'],
        tagsHi: ['शिविर', 'कार्यक्रम', 'मीडिया'],
        url: '/media/events',
      }
    );

      this.cachedDocs = docs;
      return docs;
    })();

    return this.compilingPromise;
  }

  async search(query: string, language: Language): Promise<SearchResultItem[]> {
    const rawQuery = query.trim().toLowerCase();
    if (!rawQuery || rawQuery.length < 2) {
      return [];
    }

    const docs = await this.compileIndex();
    const queryTokens = rawQuery.split(/\s+/).filter((t) => t.length > 0);
    const results: SearchResultItem[] = [];

    for (const doc of docs) {
      // Primary text for active language
      const isHindi = language === 'hi';
      const title = isHindi && doc.titleHi ? doc.titleHi : doc.titleEn;
      const description = isHindi && doc.descriptionHi ? doc.descriptionHi : doc.descriptionEn;
      const body = (isHindi && doc.bodyHi ? doc.bodyHi : doc.bodyEn) || '';
      const tags = [...(doc.tagsEn || []), ...(doc.tagsHi || [])];

      const searchHaystackTitle = `${doc.titleEn} ${doc.titleHi || ''}`.toLowerCase();
      const searchHaystackDesc = `${doc.descriptionEn} ${doc.descriptionHi || ''}`.toLowerCase();
      const searchHaystackBody = `${doc.bodyEn || ''} ${doc.bodyHi || ''}`.toLowerCase();
      const searchHaystackTags = tags.join(' ').toLowerCase();

      let score = 0;

      // Title matching (highest weight)
      if (searchHaystackTitle === rawQuery) {
        score += 150;
      } else if (searchHaystackTitle.startsWith(rawQuery)) {
        score += 100;
      } else if (searchHaystackTitle.includes(rawQuery)) {
        score += 80;
      }

      for (const token of queryTokens) {
        if (searchHaystackTitle.includes(token)) {
          score += 40;
        }
        if (searchHaystackTags.includes(token)) {
          score += 30;
        }
        if (searchHaystackDesc.includes(token)) {
          score += 20;
        }
        if (searchHaystackBody.includes(token)) {
          score += 10;
        }
      }

      if (score > 0) {
        // Snippet resolution
        let snippet = description;
        const matchIndex = body.toLowerCase().indexOf(rawQuery);
        if (matchIndex > -1 && (!description || description.length < 20)) {
          const start = Math.max(0, matchIndex - 30);
          const end = Math.min(body.length, matchIndex + 90);
          snippet = `${start > 0 ? '...' : ''}${body.slice(start, end).trim()}${end < body.length ? '...' : ''}`;
        }

        const categoryMeta = CATEGORY_LABELS[doc.category];
        const categoryLabel = getLocalizedText(categoryMeta, language);

        results.push({
          id: doc.id,
          title,
          category: doc.category,
          categoryLabel,
          snippet,
          url: doc.url,
          score,
        });
      }
    }

    // Sort descending by score
    results.sort((a, b) => b.score - a.score);

    return results;
  }

  getPopularSuggestions(language: Language): string[] {
    if (language === 'hi') {
      return [
        'एचबीए1सी (HbA1c)',
        'सीजीएम सेंसर (CGM)',
        'थायरॉयड जांच (TSH)',
        'प्री-डायबिटीज',
        'हाइपोग्लाइसीमिया (कम शुगर)',
        'डायबिटिक फुट केयर',
      ];
    }
    return [
      'HbA1c Targets',
      'CGM & Sensor Training',
      'Prediabetes & Remission',
      'Thyroid TSH',
      'Hypoglycemia Symptoms',
      'Diabetic Foot Care',
    ];
  }
}
