import type { FAQ } from '../types';

export const FAQS_DATA: FAQ[] = [
  {
    id: 'faq-1',
    category: 'treatment',
    question: {
      en: 'Can Type 2 Diabetes be put into remission?',
      hi: 'क्या टाइप 2 मधुमेह को रेमिशन (नियंत्रण) में लाया जा सकता है?',
    },
    answer: {
      en: 'Yes, in many early or newly diagnosed individuals, achieving significant visceral weight reduction and metabolic resting can return HbA1c to normal levels without medication, although ongoing healthy habits are required.',
      hi: 'हाँ, शुरुआती मामलों में सही आहार और वजन घटाने से कई मरीज बिना दवाओं के सामान्य स्तर प्राप्त कर सकते हैं।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'faq-2',
    category: 'treatment',
    question: {
      en: 'Does starting insulin therapy cause permanent dependency?',
      hi: 'क्या इंसुलिन शुरू करने पर इसकी आदत पड़ जाती है?',
    },
    answer: {
      en: 'No. Insulin is an essential human hormone. Often temporary insulin is used to overcome glucose toxicity and rest the pancreas, after which oral medications may be resumed.',
      hi: 'नहीं, इंसुलिन स्वाभाविक हार्मोन है। कई बार पैंक्रियाज को आराम देने के लिए अस्थायी रूप से इंसुलिन दिया जाता है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'faq-3',
    category: 'general',
    question: {
      en: 'What clinical records should I bring for my first consultation?',
      hi: 'पहली मुलाकात में मुझे कौन सी मेडिकल रिपोर्ट्स लानी चाहिए?',
    },
    answer: {
      en: 'Please bring recent HbA1c, fasting/post-meal glucose readings, lipid profile, kidney panel (creatinine and urine microalbumin), and all current prescription containers.',
      hi: 'कृपया हाल की HbA1c, शुगर रिकॉर्ड, लिपिड प्रोफाइल, किडनी टेस्ट और सभी दवाओं की पर्ची साथ लाएं।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
];
