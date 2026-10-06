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
} from './localServices';

const EMERGENCY_REGEX =
  /(chest\s*pain|heart\s*attack|unconscious|faint|loss\s*of\s*consciousness|difficulty\s*breathing|breathless|severe\s*hypoglycemia|seizure|coma|heavy\s*bleeding|dka|ketoacidosis|सीने\s*में\s*दर्द|बेहोश|बेहोशी|सांस\s*लेने\s*में\s*तकलीफ|दौरा|खून\s*बहना|अत्यधिक\s*कम\s*शुगर)/i;

const MEDICAL_ADVICE_REGEX =
  /(diagnose|diagnosis|prescribe|prescription|dose|dosage|increase\s*medicine|stop\s*medicine|which\s*tablet|can\s*i\s*take|is\s*my\s*report\s*normal|calculate\s*dose|my\s*sugar\s*is\s*\d+|dawai|dawaii|tablet|khurak|दवा|खुराक|डोज़|दवाई|कौन\s*सी\s*दवा|गोली|रिपोर्ट\s*सामान्य\s*है|इंसुलिन\s*बढ़ाएं|दवा\s*बदलें)/i;

export class LocalChatbotService implements ChatbotService {
  private clinicService: ClinicService;
  private doctorService: DoctorService;
  private serviceCatalogService: ServiceCatalogService;
  private conditionService: ConditionService;
  private reportService: ReportService;
  private faqService: FaqService;

  constructor(
    clinicService?: ClinicService,
    doctorService?: DoctorService,
    serviceCatalogService?: ServiceCatalogService,
    conditionService?: ConditionService,
    reportService?: ReportService,
    faqService?: FaqService
  ) {
    this.clinicService = clinicService || new LocalClinicService();
    this.doctorService = doctorService || new LocalDoctorService();
    this.serviceCatalogService = serviceCatalogService || new LocalServiceCatalogService();
    this.conditionService = conditionService || new LocalConditionService();
    this.reportService = reportService || new LocalReportService();
    this.faqService = faqService || new LocalFaqService();
  }

  getInitialMessage(language: Language): ChatbotMessage {
    const isHi = language === 'hi';
    return {
      id: 'msg-initial',
      sender: 'assistant',
      text: isHi
        ? 'नमस्ते! मैं डॉ. सौम्य सेनगुप्ता क्लिनिक सहायक हूँ। मैं आपकी क्या मदद कर सकता हूँ?'
        : "Hi! I'm the Dr. Sengupta Clinic Assistant. How can I help?",
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
        label: isHi ? '👨‍⚕️ डॉक्टर परिचय' : '👨‍⚕️ About the Doctor',
        url: '/about',
      },
      {
        label: isHi ? '🩺 रोग एवं सेवाएं' : '🩺 Conditions & Services',
        url: '/conditions',
      },
      {
        label: isHi ? '🏥 क्लिनिक जानकारी' : '🏥 Clinic Information',
        url: '/clinic',
      },
      {
        label: isHi ? '🕒 समय एवं स्थान' : '🕒 Timings & Location',
        url: '/clinic/timings',
      },
      {
        label: isHi ? '❓ सामान्य प्रश्न (FAQs)' : '❓ Diabetes FAQs',
        url: '/patient-resources/faqs',
      },
      {
        label: isHi ? '📞 क्लिनिक से संपर्क करें' : '📞 Contact Clinic',
        url: '/contact',
      },
    ];
  }

  async respond(userInput: string, language: Language): Promise<ChatbotMessage> {
    const isHi = language === 'hi';
    const text = userInput.trim().toLowerCase();
    const id = `msg-${Date.now()}`;
    const timestamp = new Date().toISOString();

    // 1. SAFETY: Emergency Detection
    if (EMERGENCY_REGEX.test(text)) {
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? '⚠️ आपातकालीन सूचना: यदि आपको या मरीज को सीने में तेज दर्द, बेहोशी, अत्यधिक कम शुगर या सांस लेने में गंभीर तकलीफ है, तो कृपया तुरंत नजदीकी अस्पताल के आपातकालीन विभाग में जाएं या स्थानीय आपातकालीन सेवाओं से संपर्क करें। यह स्वचालित सहायक आपातकालीन चिकित्सा सेवा नहीं दे सकता।'
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

    // 3. INTENT MATCHING (Drawing dynamic facts from services)
    const primaryClinic = await this.clinicService.getPrimaryClinic();
    const doctor = await this.doctorService.getProfile();

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
          ? `डॉ. सौम्य सेनगुप्ता के साथ परामर्श के लिए आप हमारा ऑनलाइन अपॉइंटमेंट फॉर्म भर सकते हैं या व्हाट्सएप के माध्यम से समय आरक्षित कर सकते हैं। ओपीडी परामर्श ${getLocalizedText(
              primaryClinic.address.city,
              'hi'
            )} चेंबर में उपलब्ध हैं।`
          : `To schedule an OPD consultation with Dr. Soumya Sengupta, you can submit our 3-step appointment request form or request a slot via WhatsApp. In-person consultations take place at the ${primaryClinic.address.line1.en}, ${primaryClinic.address.city.en} chamber.`,
        timestamp,
        actions: [
          {
            label: isHi ? '📅 ऑनलाइन अपॉइंटमेंट भरें' : '📅 Request Appointment Slot',
            url: '/book-appointment',
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
          ? `डॉ. सेनगुप्ता के चेंबर में परामर्श समय: ${primaryClinic.timings
              .map(
                (t) =>
                  `${getLocalizedText(t.dayOfWeek, 'hi')}: ${getLocalizedText(t.timeSlot, 'hi')}`
              )
              .join('; ')}। विस्तृत परामर्श के लिए पूर्व अपॉइंटमेंट लेना अनुशंसित है।`
          : `Consultation hours at ${primaryClinic.name.en}: ${primaryClinic.timings
              .map((t) => `${t.dayOfWeek.en}: ${t.timeSlot.en}`)
              .join('; ')}. Prior appointment booking is strongly recommended.`,
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

    // Intent: Location / Address / Directions / Where
    if (
      /\b(location|address|where|directions|map|chamber)\b|(पता|कहाँ|स्थान|रास्ता|चेंबर|दिशा|kahan|jagah)/i.test(
        text
      )
    ) {
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `चेंबर का पता: ${getLocalizedText(
              primaryClinic.address.line1,
              'hi'
            )}, ${getLocalizedText(primaryClinic.address.city, 'hi')} - ${
              primaryClinic.address.pincode
            } (${getLocalizedText(primaryClinic.address.landmark, 'hi') || 'साल्ट लेक'})।`
          : `The consultation chamber is located at: ${primaryClinic.address.line1.en}, ${primaryClinic.address.city.en} - ${primaryClinic.address.pincode} (${primaryClinic.address.landmark?.en || 'Salt Lake'}).`,
        timestamp,
        actions: [
          {
            label: isHi ? '🗺️ दिशा-निर्देश एवं मैप्स' : '🗺️ Directions & Map',
            url: '/clinic/location',
          },
          {
            label: isHi ? '📷 चेंबर फोटो देखें' : '📷 Chamber Environment Photos',
            url: '/clinic/photos',
          },
        ],
      };
    }

    // Intent: Doctor Profile / Credentials / Qualifications
    if (
      /\b(doctor|soumya|sengupta|qualification|qualifications|experience|degree|dr|bio|profile)\b|(डॉक्टर|योग्यता|अनुभव|डिग्री)/i.test(
        text
      )
    ) {
      const qualificationsList = doctor.qualifications.map((q) => q.degree.en).join(', ');
      return {
        id,
        sender: 'assistant',
        text: isHi
          ? `डॉ. सौम्य सेनगुप्ता कोलकाता में वरिष्ठ कंसल्टेंट डायबेटोलॉजिस्ट हैं (${qualificationsList})। वे टाइप 1 एवं टाइप 2 मधुमेह, सीजीएम (CGM) सेंसर प्रशिक्षण और हृदय-गुर्दा सुरक्षा में विशेषज्ञता रखते हैं।`
          : `Dr. Soumya Sengupta is a Senior Consultant Diabetologist with qualifications including ${qualificationsList}. He has extensive clinical experience in evidence-based glycemic management, Continuous Glucose Monitoring (CGM), and cardiometabolic organ protection.`,
        timestamp,
        actions: [
          {
            label: isHi ? '👨‍⚕️ डॉक्टर का पूरा परिचय' : '👨‍⚕️ Full Biography & Philosophy',
            url: '/about',
          },
          {
            label: isHi ? '📜 चिकित्सा योग्यताएं' : '📜 View Qualifications',
            url: '/about/qualifications',
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
          ? `परामर्श शुल्क: ${primaryClinic.consultationFee} (प्रथम एवं विस्तृत समीक्षा)। इसमें विस्तृत ग्लूकोज पैटर्न मूल्यांकन शामिल है।`
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

    // Intent: Conditions / Diseases / Diabetes / Thyroid / Weight
    if (
      /(diabetes|sugar|thyroid|weight|obesity|prediabetes|डायबिटीज|शुगर|थायरॉयड|मोटापा|वजन)/i.test(
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
          ? `क्लिनिक में मुख्य रूप से इन स्थितियों का उपचार किया जाता है: ${conditionNames} एवं मेटाबोलिक विकार। क्या आप किसी विशेष समस्या के बारे में सामान्य जानकारी चाहते हैं?`
          : `The clinic specializes in evidence-based management of: ${conditionNames}, and complex metabolic disorders. You can explore our condition guides below.`,
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

    // Intent: Services / Care Pathways
    if (
      /\b(service|services|treatment|therapy|cgm|sensor|care)\b|(सेवाएं|उपचार|इलाज|केयर)/i.test(
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
          ? `क्लिनिक में उपलब्ध मुख्य नैदानिक सेवाएं: ${serviceTitles} आदि। अधिक जानकारी के लिए नीचे दिए गए लिंक देखें।`
          : `Key clinical services available at the chamber include: ${serviceTitles}, and comprehensive glycemic management.`,
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
    if (/\b(faq|faqs|question|questions|doubt|doubts|query)\b|(प्रश्न|सवाल|पूछें)/i.test(text)) {
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
            )}, कोलकाता।`
          : `Clinic Contact Details:\nPhone: ${primaryClinic.phone}\nWhatsApp: ${primaryClinic.whatsapp}\nEmail: ${primaryClinic.email}\nLocation: ${primaryClinic.address.line1.en}, Kolkata.`,
        timestamp,
        actions: [
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

    // 4. FALLBACK: Polite general clinic orientation
    return {
      id,
      sender: 'assistant',
      text: isHi
        ? 'मैं क्लिनिक की जानकारी, डॉक्टर परामर्श समय, चेंबर का पता, अपॉइंटमेंट प्रक्रिया और डायबिटीज से जुड़े सामान्य सवालों में आपकी सहायता कर सकता हूँ। कृपया नीचे दिए गए मुख्य विकल्पों में से चुनें या अपना प्रश्न लिखें।'
        : "I can help with clinic information, consulting hours, chamber location, appointment guidance, and diabetes educational resources. How can I assist you today? Please choose an option below or type your question.",
      timestamp,
      actions: this.getQuickActions(language),
    };
  }
}
