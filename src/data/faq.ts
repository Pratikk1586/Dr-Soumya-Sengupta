import type { PatientFaq } from '../types/services';

export const PATIENT_FAQS_DATA: PatientFaq[] = [
  {
    id: 'faq-reversal',
    category: 'treatment',
    question: {
      en: 'Is Type 2 Diabetes completely reversible, or is it managed permanently?',
      hi: 'क्या टाइप 2 मधुमेह पूरी तरह ठीक हो सकता है या यह हमेशा रहता है?',
    },
    answer: {
      en: 'In newly diagnosed or early Type 2 diabetes, sustained remission (normal HbA1c off glucose-lowering drugs) can often be achieved through significant visceral fat reduction and beta-cell resting. However, long-term healthy dietary and physical habits must be maintained, as genetic predisposition remains.',
      hi: 'शुरुआती टाइप 2 मधुमेह में सही आहार, वजन घटाने और जीवनशैली सुधार से कई मरीज बिना दवाओं के सामान्य स्तर प्राप्त कर सकते हैं। हालांकि, पुनः बीमारी से बचने के लिए स्वस्थ आदतें हमेशा बनाए रखनी होती हैं।',
    },
  },
  {
    id: 'faq-insulin-addictive',
    category: 'treatment',
    question: {
      en: 'Is starting insulin therapy permanent or addictive?',
      hi: 'क्या एक बार इंसुलिन शुरू करने पर इसकी आदत पड़ जाती है?',
    },
    answer: {
      en: 'No. Insulin is a natural human hormone, not an addictive substance. In many cases of acute illness, high glucose stress, or gestational diabetes, temporary insulin is used to rest the pancreas. Once stability returns, many patients can transition back to oral therapies under medical guidance.',
      hi: 'नहीं, इंसुलिन शरीर का एक स्वाभाविक हार्मोन है, कोई लत लगाने वाली दवा नहीं। कई बार पैंक्रियाज को आराम देने के लिए अस्थायी रूप से इंसुलिन दिया जाता है और बाद में गोलियों पर वापस लाया जा सकता है।',
    },
  },
  {
    id: 'faq-first-visit-prep',
    category: 'general',
    question: {
      en: 'What clinical records should I bring for my first consultation with Dr. Sengupta?',
      hi: 'डॉ. सेनगुप्ता से पहली बार मिलने के लिए मुझे क्या रिपोर्ट लानी चाहिए?',
    },
    answer: {
      en: 'Please bring your most recent HbA1c report, fasting/post-meal glucose log, lipid profile, kidney function (serum creatinine and urine microalbumin), current prescription list with exact dosages, and your glucometer if you maintain a home log.',
      hi: 'कृपया हाल ही की HbA1c रिपोर्ट, फास्टिंग/पीपी शुगर, लिपिड प्रोफाइल, किडनी फंक्शन टेस्ट (क्रिएटिनिन/यूरिन टेस्ट) और अपनी वर्तमान दवाओं की पूरी सूची साथ लाएं।',
    },
  },
  {
    id: 'faq-fasting-blood-test',
    category: 'general',
    question: {
      en: 'How many hours of overnight fasting are required for accurate glucose testing?',
      hi: 'सटीक फास्टिंग शुगर टेस्ट के लिए कितने घंटे भूखा रहना जरूरी है?',
    },
    answer: {
      en: 'An overnight fast of 8 to 10 hours is standard. Plain water is permitted, but avoid tea, coffee, milk, and early morning medications unless specifically directed by the doctor.',
      hi: 'रात में 8 से 10 घंटे का उपवास पर्याप्त होता है। आप सादा पानी पी सकते हैं, लेकिन चाय, कॉफी या नाश्ता न लें।',
    },
  },
  {
    id: 'faq-sweet-fruits',
    category: 'diet_lifestyle',
    question: {
      en: 'Can people with diabetes eat fruits like mangoes, bananas, or apples?',
      hi: 'क्या शुगर के मरीज सेब, आम या केला जैसे फल खा सकते हैं?',
    },
    answer: {
      en: 'Whole fruits in controlled portions (e.g. one small apple, guava, or papaya slice) provide essential micronutrients and dietary fiber. However, fruit juices and excessive high-glycemic fruits can cause sudden glucose spikes. Dr. Sengupta personalizes fruit intake based on your continuous glucose profile.',
      hi: 'पूरे फल जैसे सेब, अमरूद, पपीता सीमित मात्रा में फाइबर और पोषण देते हैं। लेकिन फलों का जूस शुगर को तुरंत बढ़ा देता है। डॉक्टर आपकी स्थिति के अनुसार सही मात्रा तय करते हैं।',
    },
  },
  {
    id: 'faq-emergency-hypo',
    category: 'emergency',
    question: {
      en: 'What should family members do if a patient becomes unconscious due to low blood sugar?',
      hi: 'यदि शुगर बहुत कम होने से मरीज बेहोश हो जाए तो क्या करें?',
    },
    answer: {
      en: 'Never force liquids or food into the mouth of an unconscious person due to choking hazards. Turn the patient on their side into the recovery position, administer emergency glucagon if prescribed and trained, and seek urgent hospital emergency medical assistance immediately.',
      hi: 'बेहोश व्यक्ति को मुंह से पानी या कुछ खिलाने की कोशिश बिल्कुल न करें। मरीज को करवट दिलाकर लिटाएं और तुरंत नजदीकी अस्पताल के आपातकालीन विभाग में ले जाएं।',
    },
  },
];
