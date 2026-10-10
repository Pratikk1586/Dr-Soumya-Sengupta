import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
  Heart,
  Activity,
  Sparkles,
  BookOpen,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';

interface DiabetesTopicContent {
  slug: string;
  titleEn: string;
  titleHi: string;
  introEn: string;
  introHi: string;
  whatItInvolvesTitleEn: string;
  whatItInvolvesTitleHi: string;
  whatItInvolvesEn: string[];
  whatItInvolvesHi: string[];
  whyFollowUpMattersTitleEn: string;
  whyFollowUpMattersTitleHi: string;
  whyFollowUpMattersEn: string;
  whyFollowUpMattersHi: string;
  questionsForDoctorEn: string[];
  questionsForDoctorHi: string[];
  ctaTextEn: string;
  ctaTextHi: string;
  relatedLinks: { titleEn: string; titleHi: string; url: string }[];
}

const DIABETES_PAGES_CONTENT: Record<string, DiabetesTopicContent> = {
  management: {
    slug: 'management',
    titleEn: 'Diabetes Management',
    titleHi: 'डायबिटीज प्रबंधन',
    introEn: 'Managing diabetes is all about building simple, realistic daily habits that keep your blood sugar in a safe, steady range while protecting your long-term health.',
    introHi: 'डायबिटीज प्रबंधन का अर्थ है ऐसी सरल और व्यावहारिक दैनिक आदतें अपनाना जो आपके ब्लड शुगर को सुरक्षित सीमा में रखें और अंगों को स्वस्थ बनाए रखें।',
    whatItInvolvesTitleEn: 'What does diabetes management involve?',
    whatItInvolvesTitleHi: 'डायबिटीज प्रबंधन में क्या शामिल है?',
    whatItInvolvesEn: [
      'Checking your blood sugar at home as recommended by your doctor to understand how meals, activity, and medicines affect your body.',
      'Understanding your HbA1c (a blood test that shows your average blood sugar over the last 2–3 months) to see the bigger picture.',
      'Enjoying regular, balanced meals with plenty of vegetables, whole grains, and protein, rather than following harsh crash diets.',
      'Staying active with comfortable daily movement like walking 20–30 minutes most days.',
      'Taking your prescribed medicines or insulin at the right times without skipping doses or changing amounts on your own.',
      'Visiting your doctor for periodic check-ups so your care plan can be fine-tuned to your personal health needs.',
    ],
    whatItInvolvesHi: [
      'घर पर डॉक्टर की सलाह अनुसार ब्लड शुगर की जांच करना ताकि भोजन और दवाओं का असर समझा जा सके।',
      'HbA1c टेस्ट को समझना जो पिछले 2-3 महीनों के औसत शुगर स्तर को दर्शाता है।',
      'संतुलित भोजन का आनंद लेना जिसमें हरी सब्जियां और साबुत अनाज शामिल हों, बिना किसी कड़े उपवास के।',
      'रोजाना 20-30 मिनट टहलने जैसा हल्का और नियमित व्यायाम करना।',
      'डॉक्टर द्वारा बताई गई दवाएं या इंसुलिन सही समय पर लेना।',
      'नियमित अंतराल पर डॉक्टर से मिलकर अपनी प्रगति की समीक्षा कराना।',
    ],
    whyFollowUpMattersTitleEn: 'Why regular follow-up matters',
    whyFollowUpMattersTitleHi: 'नियमित फॉलो-अप क्यों जरूरी है?',
    whyFollowUpMattersEn: 'Diabetes naturally shifts over time. What worked well two years ago may need a small adjustment today. Regular clinic visits let your doctor check on your kidneys, heart, and eyes early, ensuring your treatment stays safe, gentle, and effective.',
    whyFollowUpMattersHi: 'उम्र और समय के साथ शरीर की जरूरतें बदलती हैं। नियमित फॉलो-अप से डॉक्टर आपकी दवाओं को समायोजित कर सकते हैं और समय रहते अंगों की सुरक्षा सुनिश्चित कर सकते हैं।',
    questionsForDoctorEn: [
      'What is the safest target range for my morning fasting and after-meal blood sugar?',
      'How often do you recommend I check my blood sugar at home?',
      'What should I do if my sugar ever drops below 70 mg/dL?',
      'When should we schedule my next HbA1c, kidney, or eye screening?',
    ],
    questionsForDoctorHi: [
      'मेरी सुबह की फास्टिंग और खाने के बाद की शुगर का सुरक्षित लक्ष्य क्या होना चाहिए?',
      'मुझे घर पर कितनी बार शुगर जांचनी चाहिए?',
      'अगर शुगर कभी 70 से कम हो जाए तो मुझे तुरंत क्या करना चाहिए?',
      'मेरी अगली HbA1c या गुर्दे की जांच कब करानी चाहिए?',
    ],
    ctaTextEn: 'Ready to personalize your diabetes management plan with Dr. Sengupta?',
    ctaTextHi: 'क्या आप डॉ. सेनगुप्ता के साथ अपनी व्यक्तिगत प्रबंधन योजना बनाना चाहते हैं?',
    relatedLinks: [
      { titleEn: 'Understand Your Reports', titleHi: 'अपनी रिपोर्ट समझें', url: '/patient-resources/understand-your-reports' },
      { titleEn: 'Diabetes & Lifestyle', titleHi: 'डायबिटीज एवं जीवनशैली', url: '/diabetes-care/lifestyle' },
      { titleEn: 'Common Diabetes FAQs', titleHi: 'अक्सर पूछे जाने वाले सवाल', url: '/patient-resources/faqs' },
    ],
  },
  prediabetes: {
    slug: 'prediabetes',
    titleEn: 'Prediabetes',
    titleHi: 'प्री-डायबिटीज',
    introEn: 'Prediabetes means your blood sugar is slightly higher than normal, but not yet high enough to be called diabetes. It is a valuable early warning sign that gives you time to take positive action.',
    introHi: 'प्री-डायबिटीज का अर्थ है कि आपकी ब्लड शुगर सामान्य से थोड़ी अधिक है, लेकिन अभी डायबिटीज नहीं है। यह एक अवसर है जब सही आदतों से सेहत को फिर से संभाला जा सकता है।',
    whatItInvolvesTitleEn: 'Why early attention can help',
    whatItInvolvesTitleHi: 'शुरुआती ध्यान क्यों मददगार है?',
    whatItInvolvesEn: [
      'Prediabetes does not mean you will definitely develop diabetes. In fact, many people successfully keep their blood sugar stable for years.',
      'Your pancreas is still making insulin, but the cells in your muscles and liver are resisting it slightly (known as insulin resistance).',
      'Small, realistic lifestyle steps like brisk walking and eating fewer sugary treats help your cells respond to insulin again.',
      'Checking your fasting blood sugar and HbA1c once or twice a year lets you track your progress easily.',
    ],
    whatItInvolvesHi: [
      'प्री-डायबिटीज का मतलब यह नहीं है कि आपको निश्चित रूप से डायबिटीज हो जाएगी। कई लोग इसे सफलतापूर्वक रोक लेते हैं।',
      'आपका अग्न्याशय अभी भी इंसुलिन बना रहा है, बस शरीर की कोशिकाएं थोड़ी धीमी प्रतिक्रिया दे रही हैं।',
      'हल्का व्यायाम और मीठे पदार्थों में थोड़ी कमी करने से कोशिकाएं फिर से बेहतर काम करने लगती हैं।',
      'साल में एक-दो बार फास्टिंग शुगर और HbA1c जांचने से आपकी प्रगति का पता चलता रहता है।',
    ],
    whyFollowUpMattersTitleEn: 'Commonly discussed risk factors',
    whyFollowUpMattersTitleHi: 'पहचानने योग्य मुख्य जोखिम कारक',
    whyFollowUpMattersEn: 'Having a family member with diabetes, being over 35, carrying extra weight around the belly, or being physically inactive can increase the chances of prediabetes. Catching it early gives you the best opportunity to protect your future health.',
    whyFollowUpMattersHi: 'परिवार में किसी को डायबिटीज होना, 35 से अधिक उम्र, पेट के आसपास अतिरिक्त वजन या दिनभर बैठे रहने की आदत इसके मुख्य कारण हो सकते हैं। समय पर जांच आपको सुरक्षित रखती है।',
    questionsForDoctorEn: [
      'What were my exact fasting glucose and HbA1c test numbers?',
      'What small lifestyle changes do you recommend I begin with this month?',
      'When should we re-test my blood sugar to see if it has improved?',
    ],
    questionsForDoctorHi: [
      'मेरी फास्टिंग शुगर और HbA1c का सटीक नंबर क्या है?',
      'मुझे इस महीने किन छोटे बदलावों से शुरुआत करनी चाहिए?',
      'सुधार देखने के लिए अगली जांच कब करानी चाहिए?',
    ],
    ctaTextEn: 'Concerned about your blood sugar numbers? Book a consultation.',
    ctaTextHi: 'क्या आप अपनी बॉर्डरलाइन शुगर को लेकर चिंतित हैं? परामर्श बुक करें।',
    relatedLinks: [
      { titleEn: 'Know Your Problem Guide', titleHi: 'अपनी समस्या समझें', url: '/patient-resources/know-your-problem' },
      { titleEn: 'Healthy Eating & Lifestyle', titleHi: 'स्वस्थ भोजन एवं जीवनशैली', url: '/diabetes-care/lifestyle' },
      { titleEn: 'Book Appointment', titleHi: 'अपॉइंटमेंट बुक करें', url: '/book-appointment' },
    ],
  },
  education: {
    slug: 'education',
    titleEn: 'Diabetes Education',
    titleHi: 'डायबिटीज शिक्षा',
    introEn: 'Clear knowledge takes the fear out of diabetes. Learn what is happening inside your body, what common medical words mean, and how everyday care keeps you feeling your best.',
    introHi: 'सही जानकारी से डर खत्म होता है। जानें कि शरीर में क्या हो रहा है, आम मेडिकल शब्दों का क्या अर्थ है और रोजमर्रा की देखभाल आपको कैसे स्वस्थ रखती है।',
    whatItInvolvesTitleEn: 'What is diabetes & what are the types?',
    whatItInvolvesTitleHi: 'डायबिटीज क्या है और इसके प्रकार क्या हैं?',
    whatItInvolvesEn: [
      'What is blood sugar? Glucose (sugar) is the primary fuel your body gets from digesting food. A hormone called insulin, made by the pancreas, acts like a key that lets sugar enter your cells for energy.',
      'Type 2 Diabetes: The most common type. The body still makes insulin, but the cells do not respond to it effectively, so sugar builds up in the bloodstream.',
      'Type 1 Diabetes: The immune system mistakenly damages the insulin-making cells in the pancreas. People with Type 1 need daily insulin replacement.',
      'HbA1c Test: A simple blood test showing your average blood sugar level over the past 2 to 3 months.',
      'Continuous Glucose Monitoring (CGM): A small coin-sized sensor on the arm that lets you see your sugar trends throughout the day and night without frequent finger-pricks.',
    ],
    whatItInvolvesHi: [
      'ब्लड शुगर क्या है? ग्लूकोज वह ईंधन है जो भोजन से मिलता है। इंसुलिन एक चाबी की तरह काम करता है जो ग्लूकोज को कोशिकाओं में पहुंचाता है।',
      'टाइप 2 डायबिटीज: सबसे आम प्रकार। शरीर इंसुलिन बनाता है लेकिन कोशिकाएं सही उपयोग नहीं कर पातीं।',
      'टाइप 1 डायबिटीज: शरीर में इंसुलिन बनना बंद हो जाता है, इसलिए बाहर से इंसुलिन लेना आवश्यक होता है।',
      'HbA1c टेस्ट: पिछले 2-3 महीनों के औसत शुगर स्तर को दर्शाने वाला टेस्ट।',
      'सीजीएम सेंसर (CGM): बाजू पर लगने वाला छोटा सेंसर जो बिना बार-बार सुई चुभाए दिन-रात का शुगर स्तर दिखाता है।',
    ],
    whyFollowUpMattersTitleEn: 'Everyday diabetes care basics',
    whyFollowUpMattersTitleHi: 'दैनिक देखभाल के आसान नियम',
    whyFollowUpMattersEn: 'Taking care of diabetes is not about perfection. It is about consistency. Eating meals at roughly the same times, keeping yourself well-hydrated, staying active, and taking your medicines as prescribed make a profound positive difference.',
    whyFollowUpMattersHi: 'डायबिटीज की देखभाल में नियमितता सबसे अहम है। समय पर भोजन, पर्याप्त पानी, हल्का व्यायाम और सही समय पर दवाएं लेने से बहुत बड़ा सकारात्मक बदलाव आता है।',
    questionsForDoctorEn: [
      'Can you explain my recent test results in simple words?',
      'Would a continuous glucose sensor (CGM) be helpful for my situation?',
      'How does physical activity affect my blood sugar levels?',
    ],
    questionsForDoctorHi: [
      'क्या आप मेरी हालिया रिपोर्ट को सरल शब्दों में समझा सकते हैं?',
      'क्या मेरी स्थिति में सीजीएम सेंसर उपयोगी होगा?',
      'व्यायाम मेरी शुगर को कैसे प्रभावित करता है?',
    ],
    ctaTextEn: 'Have questions about your diagnosis? Discuss them during your visit.',
    ctaTextHi: 'अपनी रिपोर्ट या बीमारी से जुड़े सवालों पर डॉक्टर से चर्चा करें।',
    relatedLinks: [
      { titleEn: 'Diabetes Knowledge Hub', titleHi: 'डायबिटीज नॉलेज हब', url: '/patient-resources/diabetes-knowledge-hub' },
      { titleEn: 'Educational Videos', titleHi: 'शैक्षणिक वीडियो', url: '/patient-resources/videos' },
      { titleEn: 'Articles Library', titleHi: 'चिकित्सीय लेख', url: '/patient-resources/articles' },
    ],
  },
  lifestyle: {
    slug: 'lifestyle',
    titleEn: 'Diabetes & Lifestyle',
    titleHi: 'डायबिटीज एवं जीवनशैली',
    introEn: 'Healthy living with diabetes does not require extreme starvation or completely giving up your favorite foods. Small, positive, sustainable daily choices make the biggest difference.',
    introHi: 'डायबिटीज के साथ स्वस्थ रहने के लिए किसी कड़े परहेज या भूखे रहने की जरूरत नहीं है। छोटे, सकारात्मक और व्यावहारिक सुधार ही सबसे टिकाऊ होते हैं।',
    whatItInvolvesTitleEn: 'Food and healthy eating',
    whatItInvolvesTitleHi: 'भोजन और स्वस्थ खान-पान',
    whatItInvolvesEn: [
      'Enjoy balanced plates: Fill half your plate with colorful vegetables or salads, one quarter with protein (dal, paneer, eggs, or fish), and one quarter with whole grains (roti or brown rice).',
      'Avoid extreme food bans: Instead of thinking “I can never eat rice or potatoes again,” focus on portion size and pairing carbohydrates with fiber and protein.',
      'Be mindful of hidden sugars: Packaged fruit juices, sweet biscuits, sweetened tea, and bakery snacks often cause sharp sugar spikes.',
      'Stay well-hydrated: Drinking plenty of plain water throughout the day helps your body flush excess sugar naturally.',
      'Your doctor or dietitian can help you decide how different traditional foods fit comfortably into your individual care plan.',
    ],
    whatItInvolvesHi: [
      'संतुलित थाली: आधी थाली हरी सब्जियों या सलाद से भरें, एक चौथाई प्रोटीन (दाल, पनीर, अंडा) और एक चौथाई साबुत अनाज (रोटी, चावल)।',
      'कड़े परहेज से बचें: यह सोचने के बजाय कि "चावल कभी नहीं खा सकता", मात्रा पर ध्यान दें और साथ में सलाद व दाल जरूर लें।',
      'छिपी हुई चीनी से सावधान रहें: डिब्बाबंद जूस, मीठे बिस्कुट और ज्यादा मीठी चाय अचानक शुगर बढ़ा देते हैं।',
      'खूब पानी पिएं: दिनभर पर्याप्त सादा पानी पीने से शरीर अतिरिक्त शुगर को बाहर निकाल पाता है।',
      'आपके डॉक्टर यह तय करने में मदद कर सकते हैं कि आपके पसंदीदा भोजन को सुरक्षित रूप से कैसे शामिल किया जाए।',
    ],
    whyFollowUpMattersTitleEn: 'Physical activity, sleep & stress',
    whyFollowUpMattersTitleHi: 'व्यायाम, नींद और तनाव प्रबंधन',
    whyFollowUpMattersEn: 'Just 15–20 minutes of relaxed walking after lunch or dinner helps your muscle cells use up glucose without needing extra insulin. Aim for 7 hours of quiet sleep each night, as poor rest and chronic stress release hormones that raise blood sugar.',
    whyFollowUpMattersHi: 'दोपहर या रात के भोजन के बाद 15-20 मिनट टहलने से कोशिकाएं सीधे शुगर का उपयोग कर लेती हैं। रात में 7 घंटे की अच्छी नींद लें, क्योंकि तनाव और नींद की कमी से शुगर बढ़ सकती है।',
    questionsForDoctorEn: [
      'What type of exercise is safest for my joints and heart?',
      'How can I handle traditional festive meals without spiking my sugar?',
      'Can we review my daily meal timings to match my medicine schedule?',
    ],
    questionsForDoctorHi: [
      'मेरे जोड़ों और दिल के लिए कौन सा व्यायाम सबसे सुरक्षित है?',
      'त्योहारों में भोजन को संतुलित कैसे रखूं?',
      'मेरी दवाओं के अनुसार भोजन का सही समय क्या होना चाहिए?',
    ],
    ctaTextEn: 'Want practical lifestyle guidance tailored to your routine? Schedule a consultation.',
    ctaTextHi: 'अपनी दिनचर्या के अनुसार जीवनशैली सलाह पाने के लिए परामर्श बुक करें।',
    relatedLinks: [
      { titleEn: 'Weight Management Guide', titleHi: 'वजन प्रबंधन गाइड', url: '/conditions/weight-management' },
      { titleEn: 'Patient Self-Care Guides', titleHi: 'मरीज स्व-देखभाल गाइड', url: '/patient-resources/guides' },
      { titleEn: 'Book Appointment', titleHi: 'अपॉइंटमेंट बुक करें', url: '/book-appointment' },
    ],
  },
  complications: {
    slug: 'complications',
    titleEn: 'Diabetes Complications',
    titleHi: 'जटिलताओं से बचाव',
    introEn: 'When blood sugar remains high over many years, it can place extra stress on delicate blood vessels. The good news is that regular, gentle preventive check-ups can detect changes early and keep your organs safe.',
    introHi: 'जब लंबे समय तक शुगर अनियंत्रित रहे, तो यह रक्त वाहिकाओं पर दबाव डाल सकती है। अच्छी बात यह है कि नियमित जांच से अंगों को पूरी तरह सुरक्षित रखा जा सकता है।',
    whatItInvolvesTitleEn: 'Key areas of the body to protect',
    whatItInvolvesTitleHi: 'शरीर के मुख्य अंग जिनकी सुरक्षा जरूरी है',
    whatItInvolvesEn: [
      'Eyes (Retina): Delicate blood vessels in the eyes can become weak. An annual dilated eye check by an eye specialist detects subtle changes before your vision is affected.',
      'Kidneys: High sugar and blood pressure can strain kidney filters. A simple urine test called uACR checks for microscopic protein leakage years before standard blood tests show changes.',
      'Nerves: Excess sugar can affect nerve endings in your hands and feet, causing tingling, numbness, or reduced sensation.',
      'Heart & Blood Vessels: Keeping your blood pressure and cholesterol well-controlled protects your heart and circulation.',
      'Feet: Because nerve sensation can be reduced, daily mirror checks of your feet and wearing comfortable, protective shoes prevent minor blisters from escalating.',
    ],
    whatItInvolvesHi: [
      'आंखें (रेटिना): साल में एक बार आंखों के डॉक्टर से जांच कराएं ताकि दृष्टि पूरी तरह सुरक्षित रहे।',
      'गुर्दे (Kidneys): एक साधारण यूरिन टेस्ट (uACR) से गुर्दों की सेहत का बहुत पहले ही पता चल जाता है।',
      'नसें (Nerves): पैरों में सुन्नपन, झनझनाहट या जलन से बचाव के लिए ब्लड शुगर का सुरक्षित स्तर आवश्यक है।',
      'दिल और धमनियां: शुगर के साथ-साथ ब्लड प्रेशर और कोलेस्ट्रॉल नियंत्रित रखने से दिल सुरक्षित रहता है।',
      'पैर (Feet): रोज पैरों की जांच करें और आरामदायक जूते पहनें ताकि कोई छोटा छाला या चोट बड़ी न बने।',
    ],
    whyFollowUpMattersTitleEn: 'Prevention is your best defense',
    whyFollowUpMattersTitleHi: 'नियमित रोकथाम ही सबसे बड़ा बचाव है',
    whyFollowUpMattersEn: 'Organ complications do not happen overnight. They develop slowly over years, which means you have plenty of time to intervene. Simple tests and gentle medications can protect your organs for decades.',
    whyFollowUpMattersHi: 'अंगों को नुकसान अचानक नहीं होता, यह कई वर्षों में धीरे-धीरे होता है। इसका मतलब है कि आपके पास बचाव का पर्याप्त समय है। नियमित जांच से आप पूरी तरह निश्चिंत रह सकते हैं।',
    questionsForDoctorEn: [
      'When was my last urine test for kidney protection (uACR)?',
      'Do I need an eye specialist referral for a routine retinal check?',
      'Can you check the sensation in my feet during today’s consultation?',
    ],
    questionsForDoctorHi: [
      'मेरी गुर्दे की यूरिन जांच (uACR) पिछली बार कब हुई थी?',
      'क्या मुझे आंखों की वार्षिक जांच के लिए जाना चाहिए?',
      'क्या आप आज मेरे पैरों की संवेदनशीलता की जांच कर सकते हैं?',
    ],
    ctaTextEn: 'Due for an annual organ protection screening? Book your consultation.',
    ctaTextHi: 'क्या आपकी वार्षिक जांच का समय हो गया है? परामर्श बुक करें।',
    relatedLinks: [
      { titleEn: 'Understand Kidney & Heart Reports', titleHi: 'गुर्दे एवं हृदय रिपोर्ट समझें', url: '/patient-resources/understand-your-reports' },
      { titleEn: 'Daily Diabetes Management', titleHi: 'दैनिक डायबिटीज प्रबंधन', url: '/diabetes-care/management' },
      { titleEn: 'Book Appointment', titleHi: 'अपॉइंटमेंट बुक करें', url: '/book-appointment' },
    ],
  },
};

export const ServiceDetailPage: React.FC<{ explicitSlug?: string }> = ({ explicitSlug }) => {
  const params = useParams<{ slug: string }>();
  const slug = explicitSlug || params.slug || 'management';
  const { isHindi, t } = useLanguage();

  const content = DIABETES_PAGES_CONTENT[slug] || DIABETES_PAGES_CONTENT['management'];

  if (!content) {
    return (
      <Container size="xl" className="py-20">
        <EmptyState
          title="Topic Not Found"
          description="The requested diabetes information could not be located."
          action={
            <Link to="/diabetes-care">
              <Button variant="outline" size="sm">
                Return to Diabetes Care
              </Button>
            </Link>
          }
        />
      </Container>
    );
  }

  const getTopicIcon = () => {
    switch (slug) {
      case 'prediabetes':
        return <Sparkles className="w-5 h-5 text-[#0f3d4a]" />;
      case 'education':
        return <BookOpen className="w-5 h-5 text-[#0f3d4a]" />;
      case 'lifestyle':
        return <Heart className="w-5 h-5 text-[#0f3d4a]" />;
      case 'complications':
        return <AlertTriangle className="w-5 h-5 text-[#0f3d4a]" />;
      case 'management':
      default:
        return <Activity className="w-5 h-5 text-[#0f3d4a]" />;
    }
  };

  return (
    <>
      <SEO
        title={`${isHindi ? content.titleHi : content.titleEn} — Diabetes Care | Dr. Soumya Sengupta`}
        description={isHindi ? content.introHi : content.introEn}
        canonicalPath={`/diabetes-care/${content.slug}`}
      />

      {/* Header */}
      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: isHindi ? 'डायबिटीज केयर' : 'Diabetes Care', href: '/diabetes-care' },
              { label: isHindi ? content.titleHi : content.titleEn },
            ]}
          />
          <div className="py-8 sm:py-12 max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#dff0f4] flex items-center justify-center">
                {getTopicIcon()}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0f3d4a]">
                {isHindi ? 'मरीज मार्गदर्शिका' : 'Patient Guide'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06181f] tracking-tight leading-tight">
              {isHindi ? content.titleHi : content.titleEn}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {isHindi ? content.introHi : content.introEn}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1: What It Involves */}
            <Card padding="lg" className="bg-white border-slate-200 shadow-2xs space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>{isHindi ? content.whatItInvolvesTitleHi : content.whatItInvolvesTitleEn}</span>
              </h2>

              <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {(isHindi ? content.whatItInvolvesHi : content.whatItInvolvesEn).map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-[#0f3d4a]/10 text-[#0f3d4a] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Section 2: Why Follow-up Matters */}
            <Card padding="lg" className="bg-white border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0f3d4a] shrink-0" />
                <span>{isHindi ? content.whyFollowUpMattersTitleHi : content.whyFollowUpMattersTitleEn}</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {isHindi ? content.whyFollowUpMattersHi : content.whyFollowUpMattersEn}
              </p>
            </Card>

            {/* Section 3: Questions to Ask Doctor */}
            <Card padding="lg" className="bg-gradient-to-br from-teal-50/60 to-white border-teal-100 shadow-2xs space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  {isHindi ? 'परामर्श की तैयारी' : 'PREPARE FOR YOUR VISIT'}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {isHindi ? 'डॉक्टर से पूछने योग्य महत्वपूर्ण सवाल' : 'Helpful Questions to Discuss With Your Doctor'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isHindi
                    ? 'आप इन सवालों को लिखकर अपने अगले क्लिनिक परामर्श में डॉक्टर से पूछ सकते हैं:'
                    : 'You can note these down or bring them with you to your next clinic visit:'}
                </p>
              </div>

              <div className="space-y-2.5">
                {(isHindi ? content.questionsForDoctorHi : content.questionsForDoctorEn).map((q, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-teal-200/80 text-xs sm:text-sm text-slate-800">
                    <HelpCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{q}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Booking Box */}
            <Card padding="lg" className="bg-gradient-to-b from-[#0f3d4a] to-[#09252d] text-white shadow-md space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#dff0f4]">
                {isHindi ? 'डॉक्टर परामर्श' : 'CLINICAL APPOINTMENT'}
              </span>
              <h3 className="text-lg font-bold text-white leading-snug">
                {isHindi ? content.ctaTextHi : content.ctaTextEn}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isHindi
                  ? 'चाईबासा स्थित कार्डियो डायबिटिक क्लिनिक में डॉ. सौम्य सेनगुप्ता के साथ व्यक्तिगत परामर्श स्लॉट आरक्षित करें।'
                  : 'Schedule an in-person consultation with Dr. Soumya Sengupta at Cardio Diabetic Clinic in Chaibasa.'}
              </p>
              <Link to="/book-appointment" className="block w-full">
                <Button variant="primary" size="md" className="w-full bg-white text-[#0f3d4a] hover:bg-[#dff0f4]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{t('cta.bookAppointment')}</span>
                </Button>
              </Link>
            </Card>

            {/* Related Patient Links */}
            <Card padding="md" className="bg-white border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {isHindi ? 'संबंधित विषय एवं मार्गदर्शिकाएं' : 'Related Resources'}
              </h4>
              <div className="space-y-2 text-xs">
                {content.relatedLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.url}
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-[#dff0f4]/50 border border-slate-100 hover:border-[#0f3d4a]/20 transition-all flex items-center justify-between group"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-[#0f3d4a]">
                      {isHindi ? link.titleHi : link.titleEn}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0f3d4a]" />
                  </Link>
                ))}
              </div>
            </Card>

            {/* Quick Link back to all Diabetes Care */}
            <div className="text-center">
              <Link
                to="/diabetes-care"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f3d4a] hover:underline"
              >
                <span>{isHindi ? '← सभी डायबिटीज केयर विषय देखें' : '← Back to All Diabetes Care Topics'}</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
