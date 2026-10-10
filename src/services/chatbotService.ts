import type {
  ChatbotService,
  ChatbotMessage,
  ChatActionOption,
  ClinicService,
  DoctorService,
  ServiceCatalogService,
  ConditionService,
  ReportService,
  FaqService,
  NoticeService,
  ReviewService,
} from './types';
import type { Language } from '../types';
import { getLocalizedText } from '../utils/localization';
import {
  LocalClinicService,
  LocalDoctorService,
  LocalServiceCatalogService,
  LocalConditionService,
  LocalReportService,
  LocalFaqService,
  LocalNoticeService,
  LocalReviewService,
} from './localServices';
import { VERIFIED_GOOGLE_MAPS_URL } from '../lib/maps';

const EMERGENCY_REGEX =
  /(chest\s*pain|heart\s*attack|unconscious|faint|loss\s*of\s*consciousness|difficulty\s*breathing|breathless|severe\s*hypoglycemia|seizure|coma|heavy\s*bleeding|dka|ketoacidosis|सीने\s*में\s*दर्द|बेहोश|बेहोशी|सांस\s*लेने\s*में\s*तकलीफ|दौरा|खून\s*बहना|अत्यधिक\s*कम\s*शुगर)/i;

const MEDICAL_ADVICE_REGEX =
  /(diagnose|diagnosis|prescribe|prescription|dose|dosage|increase\s*medicine|stop\s*medicine|which\s*tablet|can\s*i\s*take|is\s*my\s*report\s*normal|calculate\s*dose|my\s*sugar\s*is\s*\d+|dawai|dawaii|tablet|khurak|दवा|खुराक|डोज़|दवाई|कौन\s*सी\s*दवा|गोली|रिपोर्ट\s*सामान्य\s*है|इंसुलिन\s*बढ़ाएं|दवा\s*बदलें)/i;

// Checks if input is in Devanagari Hindi script
function containsDevanagari(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

export class LocalChatbotService implements ChatbotService {
  private clinicService: ClinicService;
  private doctorService: DoctorService;
  private serviceCatalogService: ServiceCatalogService;
  private conditionService: ConditionService;
  private reportService: ReportService;
  private faqService: FaqService;
  private noticeService: NoticeService;
  private reviewService: ReviewService;

  constructor(
    clinicService?: ClinicService,
    doctorService?: DoctorService,
    serviceCatalogService?: ServiceCatalogService,
    conditionService?: ConditionService,
    reportService?: ReportService,
    faqService?: FaqService,
    noticeService?: NoticeService,
    reviewService?: ReviewService
  ) {
    this.clinicService = clinicService || new LocalClinicService();
    this.doctorService = doctorService || new LocalDoctorService();
    this.serviceCatalogService = serviceCatalogService || new LocalServiceCatalogService();
    this.conditionService = conditionService || new LocalConditionService();
    this.reportService = reportService || new LocalReportService();
    this.faqService = faqService || new LocalFaqService();
    this.noticeService = noticeService || new LocalNoticeService();
    this.reviewService = reviewService || new LocalReviewService();
  }

  getInitialMessage(language: Language): ChatbotMessage {
    const isHi = language === 'hi';
    return {
      id: 'msg-initial',
      sender: 'assistant',
      text: isHi
        ? 'नमस्ते! मैं डॉ. सौम्य सेनगुप्ता क्लिनिक सहायक हूँ। मैं अपॉइंटमेंट, समय, पता, गूगल समीक्षाएं, सोशल मीडिया या ताज़ा समाचार में आपकी सहायता कर सकता हूँ।'
        : "Hi! I'm the Dr. Sengupta Clinic Assistant. I can assist with appointments, clinic address, timings, verified Google reviews, social media channels, or latest news.",
      timestamp: new Date().toISOString(),
      actions: this.getQuickActions(language),
    };
  }

  getQuickActions(language: Language): ChatActionOption[] {
    const isHi = language === 'hi';
    return [
      {
        label: isHi ? '📅 अपॉइंटमेंट बुक करें' : '📅 Book Appointment',
        url: '/book-appointment',
      },
      {
        label: isHi ? '⭐ मरीजों की समीक्षाएं (Google)' : '⭐ Patient Reviews (Google)',
        url: '/#reviews',
      },
      {
        label: isHi ? '🗺️ गूगल मैप्स पर रास्ता देखें' : '🗺️ Direct Map (Google)',
        url: VERIFIED_GOOGLE_MAPS_URL,
        isExternal: true,
      },
      {
        label: isHi ? '📢 क्लिनिक समाचार व सूचनाएं' : '📢 Latest Clinic Notices',
        url: '/clinic',
      },
      {
        label: isHi ? '🌐 सोशल मीडिया हैंडल्स' : '🌐 Social Media Channels',
        url: '/about#social-media',
      },
      {
        label: isHi ? '👨‍⚕️ डॉक्टर परिचय' : '👨‍⚕️ Know Your Doctor',
        url: '/about',
      },
      {
        label: isHi ? '🕒 ओपीडी समय एवं पता' : '🕒 Timings & Address',
        url: '/clinic/timings',
      },
      {
        label: isHi ? '❓ डायबिटीज सामान्य प्रश्न' : '❓ Diabetes FAQs',
        url: '/patient-resources/faqs',
      },
    ];
  }

  async respond(userInput: string, language: Language): Promise<ChatbotMessage> {
    const trimmedInput = userInput.trim();
    // Bilingual / Duo-lingo awareness: auto-detect Devanagari Hindi or Hinglish query
    const isDevanagari = containsDevanagari(trimmedInput);
    const isHi = language === 'hi' || isDevanagari;
    const text = trimmedInput.toLowerCase();
    const id = `msg-${Date.now()}`;
    const timestamp = new Date().toISOString();

    // 1. SAFETY: Emergency Detection
    if (EMERGENCY_REGEX.test(text)) {
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? '⚠️ EMERGENCY / आपातकालीन सूचना: यदि आपको या मरीज को सीने में तेज दर्द, बेहोशी, अत्यधिक कम शुगर या सांस लेने में गंभीर तकलीफ है, तो कृपया तुरंत नजदीकी अस्पताल के आपातकालीन विभाग में जाएं या स्थानीय आपातकालीन सेवाओं से संपर्क करें। यह स्वचालित सहायक आपातकालीन चिकित्सा सेवा नहीं दे सकता।'
          : '⚠️ EMERGENCY ADVISORY: If you or the patient are experiencing acute chest pain, loss of consciousness, severe hypoglycemia, or acute respiratory distress, please contact local emergency services immediately or visit the nearest hospital emergency department. This automated assistant cannot provide emergency medical care.',
        timestamp,
        isWarning: true,
        actions: [
          {
            label: isHi ? '🚨 आपातकालीन अस्पताल खोजें' : '🚨 Nearest Hospital Emergency',
            url: '/clinic/location',
          },
          {
            label: isHi ? '📞 क्लिनिक फोन' : '📞 Clinic Phone',
            url: '/contact',
          },
        ],
      };
    }

    // 2. SAFETY: Medical Advice / Dose / Prescription / Diagnosis Refusal
    if (MEDICAL_ADVICE_REGEX.test(text)) {
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? '⚠️ चिकित्सीय अस्वीकरण: चिकित्सीय निदान, दवा की खुराक में बदलाव या व्यक्तिगत रिपोर्ट की व्याख्या के लिए कृपया सीधे डॉक्टर से परामर्श करें। "For medical diagnosis or treatment, please consult a qualified doctor." यह सहायक दवाएं बदलने या लिखने के लिए अधिकृत नहीं है। आप डॉ. सेनगुप्ता के साथ परामर्श अपॉइंटमेंट बुक कर सकते हैं।'
          : '⚠️ CLINICAL NOTICE: For medical diagnosis, medication prescriptions, or dosage changes, please consult a qualified doctor directly. "For medical diagnosis or treatment, please consult a qualified doctor." This assistant cannot diagnose conditions, recommend medication, or interpret individual test values. Please book a clinical consultation with Dr. Sengupta.',
        timestamp,
        isWarning: true,
        actions: [
          {
            label: isHi ? '📅 डॉक्टर परामर्श बुक करें' : '📅 Book Clinical Consultation',
            url: '/book-appointment',
          },
          {
            label: isHi ? '🧪 लैब रिपोर्ट गाइड देखें' : '🧪 Understand Lab Reports',
            url: '/patient-resources/reports',
          },
        ],
      };
    }

    // 3. INTENT MATCHING (Drawing live facts from service layers)
    const primaryClinic = await this.clinicService.getPrimaryClinic();
    const doctor = await this.doctorService.getProfile();

    // Intent: Social Media Handles / YouTube / Facebook / Instagram / WhatsApp
    if (
      /(social|socials|media|youtube|facebook|instagram|channel|video|videos|handle|handles|links|यूट्यूब|फेसबुक|इंस्टाग्राम|सोशल\s*मीडिया|चैनल|वीडियो)/i.test(
        text
      )
    ) {
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `डॉ. सौम्य सेनगुप्ता के आधिकारिक सोशल मीडिया हैंडल्स:\n• यूट्यूब (YouTube): @DrSoumyaSengupta (रोगी शिक्षा एवं डायबिटीज मास्टरक्लास)\n• इंस्टाग्राम (Instagram): @drsoumyasengupta (दैनिक ब्लड शुगर टिप्स व पोषण)\n• फेसबुक (Facebook): DrSoumyaSenguptaClinic (स्वास्थ्य शिविर एवं क्लिनिक सूचनाएं)\n• व्हाट्सएप (WhatsApp): +91 94311 14510 (परामर्श सहायता)`
          : `Dr. Soumya Sengupta's official social media channels:\n• YouTube: @DrSoumyaSengupta (Patient education masterclasses & videos)\n• Instagram: @drsoumyasengupta (Daily blood sugar tips & metabolic wellness)\n• Facebook: DrSoumyaSenguptaClinic (Community health drives & announcements)\n• WhatsApp: +91 94311 14510 (Consultation desk & inquiries)`,
        timestamp,
        actions: [
          {
            label: '▶️ YouTube Channel',
            url: 'https://youtube.com/@drsoumyasengupta',
            isExternal: true,
          },
          {
            label: '📸 Instagram',
            url: 'https://instagram.com/drsoumyasengupta',
            isExternal: true,
          },
          {
            label: '📘 Facebook',
            url: 'https://facebook.com/drsoumyasengupta',
            isExternal: true,
          },
          {
            label: isHi ? '💬 व्हाट्सएप सहायता' : '💬 WhatsApp Helpdesk',
            url: 'https://wa.me/919431114510?text=Hello%20Dr.%20Soumya%20Sengupta%20clinic%2C%20I%20would%20like%20to%20connect.',
            isExternal: true,
          },
        ],
      };
    }

    // Intent: Patient Reviews & Google Ratings
    if (
      /(review|reviews|rating|ratings|feedback|patient\s*review|google\s*review|patient\s*experience|patients\s*experience|kaisa\s*hai|kaisa\s*doctor|समीक्षा|रिव्यू|रेटिंग|मरीजों\s*का\s*अनुभव|मरीजों\s*की\s*राय)/i.test(
        text
      )
    ) {
      const reviews = await this.reviewService.getReviews();
      const reviewSample = reviews
        .slice(0, 3)
        .map((r) => `"${getLocalizedText(r.comment, isHi ? 'hi' : 'en')}" — ${r.patientInitials}`)
        .join('\n\n');

      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `गूगल मैप्स पर डॉ. सौम्य सेनगुप्ता क्लिनिक को मरीजों से 5.0 स्टार रेटिंग प्राप्त है। कुछ प्रमुख समीक्षाएं:\n\n${reviewSample}\n\n(एनएमसी दिशानिर्देशों के अनुसार यह मरीजों का व्यक्तिगत अनुभव है, परिणाम व्यक्ति-विशिष्ट हो सकते हैं।)`
          : `Dr. Soumya Sengupta Diabetic Clinic holds a 5.0-Star rating on Google Maps based on verified patient feedback:\n\n${reviewSample}\n\n(NMC compliant — Individual patient experiences; clinical outcomes vary per individual.)`,
        timestamp,
        actions: [
          {
            label: isHi ? '⭐ गूगल मैप्स पर सभी समीक्षाएं देखें' : '⭐ Read Reviews on Google Maps',
            url: VERIFIED_GOOGLE_MAPS_URL,
            isExternal: true,
          },
          {
            label: isHi ? '💬 रोगी अनुभव अनुभाग' : '💬 Patient Reviews Section',
            url: '/#reviews',
          },
          {
            label: isHi ? '📅 परामर्श बुक करें' : '📅 Book Consultation',
            url: '/book-appointment',
          },
        ],
      };
    }

    // Intent: Clinic Notices / News / Announcements (Latest news & All news)
    if (
      /(notice|notices|news|announcement|announcements|update|updates|latest\s*news|all\s*news|holiday|camp|सूचना|समाचार|खबर|नोटिस|ताज़ा|अपडेट)/i.test(
        text
      )
    ) {
      const allNotices = await this.noticeService.getNotices();
      const recentNotices = await this.noticeService.getRecentNotices();
      const countLatest = recentNotices.length > 0 ? recentNotices.length : 2;

      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `क्लिनिक सूचना अनुभाग में दो विकल्प उपलब्ध हैं:\n1. ताज़ा समाचार (Latest news): पिछले 3 दिनों में अद्यतन सूचनाएं (${countLatest} सक्रिय)\n2. सभी समाचार (All news): कुल ${allNotices.length} सूचनाएं।\n\nहालिया सूचना: ${getLocalizedText(
              allNotices[0]?.title,
              'hi'
            )} - ${getLocalizedText(allNotices[0]?.content, 'hi')}`
          : `Our Clinic Notice Board provides two straightforward options:\n1. Latest news: Notices updated within the last 3 days (${countLatest} active)\n2. All news: All ${allNotices.length} clinic announcements.\n\nLatest update: ${allNotices[0]?.title.en} - ${allNotices[0]?.content.en}`,
        timestamp,
        actions: [
          {
            label: isHi ? '📢 सभी क्लिनिक समाचार देखें' : '📢 View Clinic Notices',
            url: '/clinic',
          },
          {
            label: isHi ? '📅 अपॉइंटमेंट बुक करें' : '📅 Book Appointment',
            url: '/book-appointment',
          },
        ],
      };
    }

    // Intent: Appointment / Booking / Slot
    if (
      /(appointment|book|slot|consult|visit|मिलना|अपॉइंटमेंट|बुक|स्लॉट|दिखाना|dikha|milna)/i.test(
        text
      )
    ) {
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `डॉ. सौम्य सेनगुप्ता के साथ परामर्श के लिए आप वेबसाइट पर सीधा ऑनलाइन अपॉइंटमेंट अनुरोध फॉर्म भर सकते हैं या व्हाट्सएप (+91 94311 14510) के माध्यम से आसानी से स्लॉट बुक कर सकते हैं। इन-पर्सन परामर्श कार्डियो डायबिटिक क्लिनिक (सदर अस्पताल के निकट, अमलाटोला, चाईबासा, झारखंड - 833201) में उपलब्ध हैं।`
          : `To schedule an OPD consultation with Dr. Soumya Sengupta, you can submit our quick online appointment request form or book directly via WhatsApp (+91 94311 14510). In-person consultations take place at Cardio Diabetic Clinic, Near Sadar Hospital, Amlatola, Chaibasa, West Singhbhum, Jharkhand - 833201.`,
        timestamp,
        actions: [
          {
            label: isHi ? '📅 ऑनलाइन अपॉइंटमेंट भरें' : '📅 Request Appointment Slot',
            url: '/book-appointment',
          },
          {
            label: isHi ? '💬 व्हाट्सएप से बुक करें' : '💬 Book via WhatsApp',
            url: 'https://wa.me/919431114510?text=Hello%20Dr.%20Soumya%20Sengupta%20clinic%2C%20I%20would%20like%20to%20book%20an%20appointment.',
            isExternal: true,
          },
          {
            label: isHi ? '🕒 ओपीडी समय सारणी' : '🕒 Check Consulting Timings',
            url: '/clinic/timings',
          },
        ],
      };
    }

    // Intent: Timings / Schedule / Hours
    if (
      /\b(timing|timings|time|hours|schedule|open|when)\b|(समय|घंटे|कब|खुला|सारणी|samay)/i.test(
        text
      )
    ) {
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `डॉ. सेनगुप्ता के चेंबर में परामर्श समय (सप्ताह के सातों दिन खुला):\n• सोमवार – शुक्रवार: सुबह 9:30 – दोपहर 3:00\n• शनिवार – रविवार: सुबह 9:30 – दोपहर 3:30\n\nस्थान: सदर अस्पताल के निकट, अमलाटोला, चाईबासा, झारखंड। विस्तृत परामर्श के लिए पूर्व अपॉइंटमेंट लेना अनुशंसित है।`
          : `Consultation hours at Cardio Diabetic Clinic, Chaibasa (Open all 7 days):\n• Monday – Friday: 9:30 AM – 3:00 PM\n• Saturday – Sunday: 9:30 AM – 3:30 PM\n\nAddress: Near Sadar Hospital, Amlatola, Chaibasa, West Singhbhum, Jharkhand - 833201. Prior appointment booking is strongly recommended.`,
        timestamp,
        actions: [
          {
            label: isHi ? '🕒 विस्तृत समय सारणी' : '🕒 View Full OPD Schedule',
            url: '/clinic/timings',
          },
          {
            label: isHi ? '🗺️ चेंबर स्थान' : '🗺️ Chamber Location',
            url: '/clinic/location',
          },
          {
            label: isHi ? '📅 स्लॉट बुक करें' : '📅 Book a Slot',
            url: '/book-appointment',
          },
        ],
      };
    }

    // Intent: Location / Address / Directions / Maps / Where / How to reach
    if (
      /\b(location|address|where|directions|map|maps|chamber|reach|rasta|kahan|kaise\s*jaun|kaise\s*pahunche)\b|(पता|कहाँ|स्थान|रास्ता|चेंबर|दिशा|kahan|jagah|नक्शा|गूगल\s*मैप्स)/i.test(
        text
      )
    ) {
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `कार्डियो डायबिटिक क्लिनिक का पता:\nसदर अस्पताल के निकट, अमलाटोला, चाईबासा, पश्चिमी सिंहभूम, झारखंड - 833201।\nआप सीधे गूगल मैप्स पर नेविगेट करके क्लिनिक तक पहुँच सकते हैं।`
          : `Cardio Diabetic Clinic Location:\nNear Sadar Hospital, Amlatola, Chaibasa, West Singhbhum, Jharkhand - 833201.\nYou can use our direct Google Maps navigation button for turn-by-turn driving or walking directions.`,
        timestamp,
        actions: [
          {
            label: isHi ? '🗺️ गूगल मैप्स पर रास्ता देखें' : '🗺️ Direct Google Maps Route',
            url: VERIFIED_GOOGLE_MAPS_URL,
            isExternal: true,
          },
          {
            label: isHi ? '📍 चेंबर विवरण एवं नक्शा' : '📍 Chamber Location Details',
            url: '/clinic/location',
          },
          {
            label: isHi ? '📷 क्लिनिक तस्वीरें देखें' : '📷 Clinic Environment Photos',
            url: '/clinic/photos',
          },
        ],
      };
    }

    // Intent: Doctor Profile / Credentials / Qualifications (Know Your Doctor)
    if (
      /\b(doctor|soumya|sengupta|qualification|qualifications|experience|degree|dr|bio|profile|tenure|practicing|practice)\b|(डॉक्टर|योग्यता|अनुभव|डिग्री|परिचय|प्रैक्टिस|साल)/i.test(
        text
      )
    ) {
      const qualificationsList = doctor.qualifications.map((q) => q.degree.en).join(', ');
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `डॉ. सौम्य सेनगुप्ता कार्डियो डायबिटिक क्लिनिक, चाईबासा (झारखंड) में वरिष्ठ कंसल्टेंट डायबेटोलॉजिस्ट एवं मेटाबोलिक फिजिशियन हैं (${qualificationsList})। वे 2007 से अभ्यास कर रहे हैं (डायबिटीज केयर में 19+ वर्षों का अनुभव) और टाइप 1 व 2 डायबिटीज, उच्च रक्तचाप (Hypertension), डिस्लिपिडेमिया, थायरॉयड और महत्वपूर्ण अंगों (किडनी, आंख, तंत्रिकाएं, हृदय, मस्तिष्क) की सुरक्षा में विशेष नैदानिक विशेषज्ञता रखते हैं।`
          : `Dr. Soumya Sengupta is a Senior Consultant Diabetologist & Metabolic Physician practicing since 2007 (19+ Years in Diabetes Care) at Cardio Diabetic Clinic, Chaibasa, Jharkhand (${qualificationsList}). His dedicated expertise includes Type 1 & Type 2 Diabetes, Hypertension, Dyslipidemia, Hypothyroidism, and multi-organ protection (Kidneys, Eyes, Nerves, Heart, and Brain).`,
        timestamp,
        actions: [
          {
            label: isHi ? '👨‍⚕️ डॉक्टर का पूरा परिचय' : '👨‍⚕️ Know Your Doctor',
            url: '/about',
          },
          {
            label: isHi ? '📜 उपलब्धियां व सम्मेलन' : '📜 Achievements & Conferences',
            url: '/media/events',
          },
          {
            label: isHi ? '🌐 सोशल मीडिया लिंक्स' : '🌐 Official Social Links',
            url: '/about#social-media',
          },
        ],
      };
    }

    // Intent: Fees / Charges / Cost
    if (/(fee|fees|cost|charge|price|rate|फीस|शुल्क|खर्च|दाम|kitna)/i.test(text)) {
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `परामर्श शुल्क: ${primaryClinic.consultationFee} (प्रथम एवं विस्तृत समीक्षा)। इसमें विस्तृत ग्लूकोज पैटर्न मूल्यांकन और अंगों की सुरक्षा रणनीति शामिल है।`
          : `The standard clinical consultation fee is ${primaryClinic.consultationFee}. This includes comprehensive glycemic pattern assessment and metabolic review.`,
        timestamp,
        actions: [
          {
            label: isHi ? '📅 अपॉइंटमेंट बुक करें' : '📅 Book Consultation',
            url: '/book-appointment',
          },
          {
            label: isHi ? '📞 क्लिनिक रिसेप्शन से पूछें' : '📞 Inquire via Call',
            url: '/contact',
          },
        ],
      };
    }

    // Intent: Conditions / Diseases / Diabetes / Thyroid / Hypertension / Dyslipidemia
    if (
      /(diabetes|sugar|thyroid|hypertension|blood\s*pressure|bp|cholesterol|lipid|dyslipidemia|weight|obesity|prediabetes|डायबिटीज|शुगर|थायरॉयड|बीपी|रक्तचाप|कोलेस्ट्रॉल|मोटापा|वजन)/i.test(
        text
      )
    ) {
      const conditions = await this.conditionService.getConditions();
      const conditionNames = conditions
        .map((c) => getLocalizedText(c.name, isHi ? 'hi' : 'en'))
        .slice(0, 4)
        .join(', ');

      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `क्लिनिक में मुख्य रूप से इन 4 प्रमुख स्तंभों और स्थितियों का प्रमाण-आधारित उपचार किया जाता है: ${conditionNames}, उच्च रक्तचाप एवं लिपिड असंतुलन। उद्देश्य प्रारंभिक ग्लूकोज नियंत्रण और महत्वपूर्ण अंगों की दीर्घकालिक सुरक्षा है।`
          : `The clinic specializes in evidence-based management of 4 core pillars: ${conditionNames}, Hypertension, Dyslipidemia, and complex metabolic disorders with a focus on multi-organ protection.`,
        timestamp,
        actions: [
          {
            label: isHi ? '🩺 सभी रोग एवं उपचार' : '🩺 All Conditions Managed',
            url: '/conditions',
          },
          {
            label: isHi ? '💡 अपनी समस्या समझें' : '💡 Know Your Problem Navigator',
            url: '/#know-your-problem',
          },
        ],
      };
    }

    // Intent: Services / Care Pathways / CGM Sensors
    if (
      /\b(service|services|treatment|therapy|cgm|sensor|care)\b|(सेवाएं|उपचार|इलाज|केयर|सेंसर)/i.test(
        text
      )
    ) {
      const services = await this.serviceCatalogService.getServices();
      const serviceTitles = services
        .map((s) => getLocalizedText(s.title, isHi ? 'hi' : 'en'))
        .slice(0, 3)
        .join(', ');

      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `क्लिनिक में उपलब्ध प्रमुख नैदानिक सेवाएं: ${serviceTitles}, निरंतर ग्लूकोज मॉनिटरिंग (CGM) और जटिलता रोकथाम।`
          : `Key clinical services available at the chamber include: ${serviceTitles}, Continuous Glucose Monitoring (CGM) analytics, and multi-organ preservation.`,
        timestamp,
        actions: [
          {
            label: isHi ? '🩺 सभी सेवाएं देखें' : '🩺 View All Services',
            url: '/diabetes-care',
          },
        ],
      };
    }

    // Intent: FAQs / Questions
    if (/\b(faq|faqs|question|questions|doubt|doubts|query)\b|(प्रश्न|सवाल|पूछें|doubt)/i.test(text)) {
      const faqs = await this.faqService.getFaqs();
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `हमारे एफएक्यू अनुभाग में मरीजों द्वारा पूछे जाने वाले प्रमुख ${faqs.length} सवालों के विस्तृत उत्तर दिए गए हैं।`
          : `Our clinical FAQ repository answers ${faqs.length} common patient questions on insulin titration, sensor wear, and diet.`,
        timestamp,
        actions: [
          {
            label: isHi ? '❓ सभी एफएक्यू पढ़ें' : '❓ Browse Patient FAQs',
            url: '/patient-resources/faqs',
          },
        ],
      };
    }

    // Intent: Reports / HbA1c / Tests
    if (
      /\b(report|reports|test|tests|hba1c|glucose|fasting|lipid|uacr)\b|(रिपोर्ट|जांच|टेस्ट|एचबीए1सी)/i.test(
        text
      )
    ) {
      const reports = await this.reportService.getReports();
      const reportNames = reports
        .map((r) => getLocalizedText(r.title, isHi ? 'hi' : 'en'))
        .slice(0, 3)
        .join(', ');

      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `हमारी वेबसाइट पर प्रमुख लैब टेस्ट (${reportNames}) के सामान्य शैक्षणिक अर्थ उपलब्ध हैं। कृपया ध्यान दें कि किसी भी रिपोर्ट की व्यक्तिगत पुष्टि केवल डॉक्टर ही कर सकते हैं।`
          : `Our diagnostic resource center explains key metabolic tests (${reportNames}) for patient education. Note that individual normal ranges vary by laboratory and must be reviewed by Dr. Sengupta.`,
        timestamp,
        actions: [
          {
            label: isHi ? '🧪 लैब रिपोर्ट गाइड पढ़ें' : '🧪 Understand Your Reports',
            url: '/patient-resources/reports',
          },
        ],
      };
    }

    // Intent: Contact / Phone / Email
    if (/(contact|phone|call|email|number|helpdesk|संपर्क|फोन|नंबर|ईमेल|कॉल)/i.test(text)) {
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `क्लिनिक संपर्क विवरण:\nफोन: ${primaryClinic.phone}\nव्हाट्सएप: ${primaryClinic.whatsapp}\nईमेल: ${primaryClinic.email}\nपता: ${getLocalizedText(
              primaryClinic.address.line1,
              'hi'
            )}, चाईबासा (झारखंड)।`
          : `Clinic Contact Details:\nPhone: ${primaryClinic.phone}\nWhatsApp: ${primaryClinic.whatsapp}\nEmail: ${primaryClinic.email}\nLocation: ${primaryClinic.address.line1.en}, Chaibasa, Jharkhand.`,
        timestamp,
        actions: [
          {
            label: isHi ? '💬 व्हाट्सएप सहायता' : '💬 WhatsApp Helpdesk',
            url: 'https://wa.me/919431114510?text=Hello%20Dr.%20Soumya%20Sengupta%20clinic%2C%20I%20would%20like%20to%20connect.',
            isExternal: true,
          },
          {
            label: isHi ? '📞 संपर्क पृष्ठ पर जाएं' : '📞 Contact Clinic Desk',
            url: '/contact',
          },
          {
            label: isHi ? '📅 अपॉइंटमेंट बुक करें' : '📅 Book Appointment',
            url: '/book-appointment',
          },
        ],
      };
    }

    // 4. FALLBACK: Bilingual friendly general orientation
    return {
      id,
      sender: 'assistant',
      text: isHi
        ? 'मैं क्लिनिक की जानकारी, डॉक्टर परामर्श समय, चेंबर का पता (Google Maps), अपॉइंटमेंट प्रक्रिया, मरीजों की वास्तविक समीक्षाएं, सोशल मीडिया हैंडल्स और ताज़ा क्लिनिक सूचनाओं में आपकी सहायता कर सकता हूँ। कृपया नीचे दिए गए विकल्पों में से चुनें या अपना प्रश्न लिखें।'
        : "I can help with appointment booking, consulting hours, chamber address & Google Maps route, verified patient reviews, official social media links, and latest clinic notices. How can I assist you today? Please choose an option below or type your question.",
      timestamp,
      actions: this.getQuickActions(isHi ? 'hi' : 'en'),
    };
  }
}
