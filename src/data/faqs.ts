import type { FAQ } from '../types';
import { CONTENT_TO_BE_VERIFIED_MARKER } from './_placeholders';

export const FAQS_DATA: FAQ[] = [
  // Core Educational Questions
  {
    id: 'faq-what-is-diabetes',
    slug: 'what-is-diabetes',
    category: 'diabetes',
    question: {
      en: 'What is diabetes?',
      hi: 'डायबिटीज (मधुमेह) क्या है?',
    },
    answer: {
      en: 'Diabetes is a condition where the body either does not make enough insulin or cannot use insulin effectively. This causes blood sugar (glucose) levels to rise above normal.',
      hi: 'डायबिटीज एक ऐसी स्थिति है जिसमें शरीर पर्याप्त इंसुलिन नहीं बना पाता या उसका सही उपयोग नहीं कर पाता, जिससे रक्त में शुगर (ग्लूकोज) का स्तर बढ़ जाता है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'faq-what-is-prediabetes',
    slug: 'what-is-prediabetes',
    category: 'diabetes',
    question: {
      en: 'What is prediabetes?',
      hi: 'प्रीडायबिटीज क्या होता है?',
    },
    answer: {
      en: 'Prediabetes means your blood sugar levels are higher than normal, but not yet high enough to be diagnosed as type 2 diabetes. It is an early signal that gives you an opportunity to make positive lifestyle changes.',
      hi: 'प्रीडायबिटीज का मतलब है कि ब्लड शुगर सामान्य से अधिक है, लेकिन अभी टाइप 2 डायबिटीज के स्तर तक नहीं पहुंची है। यह शुरुआती संकेत जीवनशैली सुधारने का एक महत्वपूर्ण अवसर देता है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'faq-what-does-blood-sugar-mean',
    slug: 'what-does-blood-sugar-mean',
    category: 'reports',
    question: {
      en: 'What does blood sugar mean?',
      hi: 'ब्लड शुगर (रक्त शर्करा) का क्या मतलब है?',
    },
    answer: {
      en: 'Blood sugar (glucose) is the main type of sugar in your blood and your body\'s primary source of energy. It comes from the food you eat and is guided into your cells with the help of insulin.',
      hi: 'ब्लड शुगर (ग्लूकोज) आपके रक्त में पाई जाने वाली मुख्य शर्करा है और शरीर के लिए ऊर्जा का मुख्य स्रोत है। यह भोजन से मिलती है और इंसुलिन की मदद से कोशिकाओं तक पहुँचती है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'faq-what-is-hba1c',
    slug: 'what-is-hba1c',
    category: 'reports',
    question: {
      en: 'What is HbA1c?',
      hi: 'HbA1c क्या है?',
    },
    answer: {
      en: 'HbA1c is a simple blood test that measures your average blood sugar levels over the past 2 to 3 months. Unlike a daily finger-prick test that shows a single moment, HbA1c gives your doctor the broader picture.',
      hi: 'HbA1c एक साधारण रक्त परीक्षण है जो पिछले 2 से 3 महीनों में आपके औसत ब्लड शुगर स्तर को दर्शाता है। यह एक समय की जांच के बजाय 3 महीने का समग्र चित्र प्रस्तुत करता है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'faq-why-is-regular-follow-up-important',
    slug: 'why-is-regular-follow-up-important',
    category: 'appointments',
    question: {
      en: 'Why is regular follow-up important?',
      hi: 'डॉक्टर से नियमित फॉलो-अप क्यों जरूरी है?',
    },
    answer: {
      en: 'Diabetes and metabolic conditions change over time. Regular follow-ups allow your doctor to review your lab reports, adjust your care plan safely, check for early signs of complications, and answer any questions you have.',
      hi: 'डायबिटीज और मेटाबॉलिक स्वास्थ्य समय के साथ बदल सकते हैं। नियमित परामर्श से डॉक्टर आपकी रिपोर्ट की समीक्षा कर सकते हैं, देखभाल योजना में सुरक्षित बदलाव कर सकते हैं और जटिलताओं की शुरुआती जांच कर सकते हैं।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'faq-what-should-i-discuss-during-consultation',
    slug: 'what-should-i-discuss-during-my-consultation',
    category: 'appointments',
    question: {
      en: 'What should I discuss during my consultation?',
      hi: 'परामर्श के दौरान डॉक्टर से क्या चर्चा करनी चाहिए?',
    },
    answer: {
      en: 'You can discuss any unusual symptoms, your daily food and activity routines, questions about your medications or side effects, your home blood sugar readings, and your personal health goals.',
      hi: 'आप किसी भी नए लक्षण, अपने दैनिक खान-पान व व्यायाम, दवाओं से जुड़े सवाल, घर पर ली गई शुगर रीडिंग्स और अपने व्यक्तिगत स्वास्थ्य लक्ष्यों पर खुलकर चर्चा कर सकते हैं।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },

  // 1. Diabetes
  {
    id: 'faq-type2-remission',
    slug: 'can-diabetes-be-reversed',
    category: 'diabetes',
    question: {
      en: 'Can Type 2 Diabetes be put into remission without medication?',
      hi: 'क्या टाइप 2 डायबिटीज को बिना दवा के रेमिशन (नियंत्रण) में लाया जा सकता है?',
    },
    answer: {
      en: 'In newly diagnosed individuals or those with early-stage disease, significant visceral weight reduction (typically 10-15% of body weight) combined with continuous lifestyle balance can restore fasting and post-meal glucose into non-diabetic ranges. However, ongoing metabolic vigilance is essential because beta-cell sensitivity remains vulnerable to future weight regain.',
      hi: 'शुरुआती समय में यदि पेट की अंदरूनी चर्बी कम की जाए और आहार संतुलित रखा जाए, तो कई मरीज बिना दवाओं के सामान्य स्तर प्राप्त कर सकते हैं। हालांकि दीर्घकालिक सावधानी आवश्यक है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'faq-insulin-addiction',
    slug: 'does-insulin-cause-dependency',
    category: 'diabetes',
    question: {
      en: 'Does starting insulin therapy mean permanent dependency or addiction?',
      hi: 'क्या इंसुलिन शुरू करने पर इसकी आदत पड़ जाती है?',
    },
    answer: {
      en: 'No. Insulin is a natural vital hormone, not a habit-forming substance. In many acute situations, temporary insulin is initiated to relieve severe glucotoxicity and allow stressed beta-cells to recover, after which oral medications may often be resumed safely.',
      hi: 'नहीं, इंसुलिन शरीर का स्वाभाविक हार्मोन है। कई बार पैंक्रियाज को आराम देने और ग्लूकोज को नियंत्रित करने के लिए अस्थायी रूप से इंसुलिन दिया जाता है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'faq-cgm-sensor',
    slug: 'how-does-continuous-glucose-monitoring-help',
    category: 'diabetes',
    question: {
      en: 'How does Continuous Glucose Monitoring (CGM) differ from finger-prick tests?',
      hi: 'कंटीन्यूअस ग्लूकोज मॉनिटरिंग (CGM) उंगली से जांच करने से कैसे अलग है?',
    },
    answer: {
      en: 'A finger-prick test gives a single isolated reading. A CGM sensor measures interstitial fluid glucose every few minutes for 14 days, revealing nocturnal drops (hypoglycemia), post-meal spikes, and glycemic trends that finger-pricks easily miss.',
      hi: 'उंगली से जांच केवल एक समय का मान बताती है। CGM सेंसर 14 दिनों तक दिन-रात हर 5 मिनट में शुगर मापता है, जिससे रात में शुगर गिरने या भोजन के बाद उछाल का सही पता चलता है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },

  // 2. Thyroid
  {
    id: 'faq-thyroid-fasting',
    slug: 'how-to-take-thyroid-medicine-correctly',
    category: 'thyroid',
    question: {
      en: 'What is the correct way to take daily thyroid medication (Levothyroxine)?',
      hi: 'थायरॉयड की दवा (लेवोथायरोक्सिन) लेने का सही तरीका क्या है?',
    },
    answer: {
      en: 'Thyroid medication should always be taken first thing in the morning with plain water, at least 45 to 60 minutes before tea, coffee, breakfast, or calcium/iron supplements. Food and caffeine severely hinder intestinal hormone absorption.',
      hi: 'थायरॉयड की दवा सुबह खाली पेट सादे पानी के साथ लेनी चाहिए। चाय, कॉफी या नाश्ते से कम से कम 45 मिनट पहले लें ताकि दवा पूरी तरह अवशोषित हो सके।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'faq-thyroid-pregnancy',
    slug: 'is-thyroid-medication-safe-during-pregnancy',
    category: 'thyroid',
    question: {
      en: 'Is thyroid medication safe to continue during pregnancy?',
      hi: 'क्या गर्भावस्था के दौरान थायरॉयड की दवा जारी रखना सुरक्षित है?',
    },
    answer: {
      en: 'Yes, it is not only safe but crucial. Fetal brain and physical development in early pregnancy depend entirely on maternal thyroid hormone supply. TSH targets are stricter during pregnancy, requiring frequent monitoring and dosage adjustment by your doctor.',
      hi: 'हाँ, यह सुरक्षित और बहुत महत्वपूर्ण है। गर्भस्थ शिशु के मानसिक विकास के लिए मां का थायरॉयड स्तर सामान्य रहना अनिवार्य है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },

  // 3. Weight Management
  {
    id: 'faq-insulin-resistance-weight',
    slug: 'why-is-losing-weight-hard-with-diabetes',
    category: 'weight_management',
    question: {
      en: 'Why is it difficult to lose abdominal weight when managing diabetes?',
      hi: 'डायबिटीज में पेट की चर्बी कम करना इतना मुश्किल क्यों होता है?',
    },
    answer: {
      en: 'High circulating levels of insulin (hyperinsulinemia) signal fat cells to store energy and lock away fat breakdown pathways. Addressing cellular insulin resistance through structured clinical nutrition and medical guidance is required to unlock metabolic fat burning.',
      hi: 'इंसुलिन का उच्च स्तर शरीर में चर्बी को जमा करने का संदेश देता है। जब तक इंसुलिन प्रतिरोध कम नहीं होता, वजन घटाना कठिन रहता है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },

  // 4. Clinic
  {
    id: 'faq-clinic-facilities',
    slug: 'what-diagnostic-tests-are-available-at-the-chamber',
    category: 'clinic',
    question: {
      en: 'What on-site diagnostic screening is performed at the chamber?',
      hi: 'क्लिनिक में कौन से परीक्षण मौके पर उपलब्ध हैं?',
    },
    answer: {
      en: 'The consultation chamber provides point-of-care rapid HbA1c testing, CGM sensor calibration and application, monofilament diabetic foot neuropathy screening, and blood pressure monitoring.',
      hi: 'क्लिनिक में तत्काल HbA1c जांच, सीजीएम सेंसर लगाने की सुविधा, पैरों की संवेदनशीलता की न्यूरोपैथी जांच और रक्तचाप परीक्षण उपलब्ध हैं।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },

  // 5. Appointments
  {
    id: 'faq-appointment-booking',
    slug: 'is-prior-appointment-mandatory',
    category: 'appointments',
    question: {
      en: 'Is advance appointment booking mandatory before visiting the chamber?',
      hi: 'क्या क्लिनिक आने से पहले पूर्व अपॉइंटमेंट लेना अनिवार्य है?',
    },
    answer: {
      en: `Prior appointment slot booking is strongly recommended to minimize waiting times and ensure dedicated consultation time for lab report analysis. ${CONTENT_TO_BE_VERIFIED_MARKER} Emergency slot availability should be confirmed via reception or clinic WhatsApp.`,
      hi: `मरीजों के समय की बचत और विस्तृत परामर्श के लिए पूर्व स्लॉट बुक करना अनिवार्य है। ${CONTENT_TO_BE_VERIFIED_MARKER} आपातकालीन उपलब्धता की पुष्टि रिसेप्शन या व्हाट्सएप पर करें।`,
    },
    reviewStatus: 'draft',
    status: 'placeholder',
  },
  {
    id: 'faq-records-to-bring',
    slug: 'what-reports-should-i-bring-for-my-consultation',
    category: 'appointments',
    question: {
      en: 'What previous medical records should I bring for my consultation?',
      hi: 'परामर्श के लिए आते समय मुझे कौन सी पुरानी रिपोर्ट्स लानी चाहिए?',
    },
    answer: {
      en: 'Please bring previous 6 months of lab reports (HbA1c, fasting/PP blood sugar logs, lipid profiles, renal uACR and creatinine), current prescription sheets, and all active medication packages or insulin pens.',
      hi: 'कृपया पिछले 6 महीने की सभी लैब रिपोर्ट (HbA1c, शुगर, किडनी, कोलेस्ट्रॉल), पुरानी पर्चियां और चल रही दवाइयों के रैपर साथ लाएं।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },

  // 6. Reports
  {
    id: 'faq-reports-hba1c-vs-glucose',
    slug: 'difference-between-fasting-sugar-and-hba1c',
    category: 'reports',
    question: {
      en: 'My fasting blood sugar is normal, but why is my HbA1c high?',
      hi: 'मेरी फास्टिंग शुगर सामान्य है, फिर भी HbA1c अधिक क्यों है?',
    },
    answer: {
      en: 'Fasting glucose only measures blood sugar right upon waking after a night without food. HbA1c captures post-lunch spikes, post-dinner peaks, and evening glycemic excursions that occur throughout the entire 90 days. Both markers must be interpreted together.',
      hi: 'फास्टिंग केवल सुबह की शुगर दिखाती है, जबकि HbA1c दोपहर और रात के खाने के बाद बढ़ने वाली शुगर को भी जोड़कर 3 महीने का समग्र औसत बताता है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
];
