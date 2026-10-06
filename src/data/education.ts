import type { EducationalArticle, BloodSugarTargetRange } from '../types/education';

export const UNIVERSAL_DISCLAIMER_TEXT = {
  en: 'For medical diagnosis or treatment, please consult a qualified doctor. Educational content provided on this website is for general health literacy and must never replace an in-person clinical consultation or individual medical advice.',
  hi: 'चिकित्सीय निदान या उपचार के लिए कृपया किसी योग्य चिकित्सक से परामर्श लें। इस वेबसाइट पर दी गई जानकारी केवल सामान्य स्वास्थ्य जागरूकता के लिए है और यह किसी डॉक्टर की सलाह का विकल्प नहीं है।',
};

export const BLOOD_SUGAR_TARGETS: BloodSugarTargetRange[] = [
  {
    label: { en: 'Fasting Plasma Glucose (Before Meals)', hi: 'फास्टिंग ब्लड शुगर (भोजन से पहले)' },
    fastingMgDl: '80 – 130 mg/dL',
    postPrandialMgDl: '—',
    notes: {
      en: 'Standard adult target according to international guidelines (ADA/RSSDI). Targets may be adjusted higher for elderly patients.',
      hi: 'अंतरराष्ट्रीय दिशानिर्देशों के अनुसार वयस्कों का सामान्य लक्ष्य। वरिष्ठ नागरिकों के लिए यह भिन्न हो सकता है।',
    },
  },
  {
    label: { en: 'Post-Prandial Glucose (1-2 Hours After Meal)', hi: 'पोस्ट-प्रांडियल (भोजन के 2 घंटे बाद)' },
    fastingMgDl: '—',
    postPrandialMgDl: '< 180 mg/dL',
    notes: {
      en: 'Measured 2 hours from the first bite of the meal. Helps identify carbohydrate sensitivity.',
      hi: 'भोजन शुरू करने के 2 घंटे बाद मापा जाता है।',
    },
  },
  {
    label: { en: 'HbA1c (3-Month Glycemic Average)', hi: 'एचबीए1सी (3 महीने का औसत)' },
    fastingMgDl: 'General Target: < 7.0%',
    postPrandialMgDl: 'Strict Target (Early T2D): < 6.5%',
    notes: {
      en: 'Reflects glycated hemoglobin. Individualized based on age, duration of diabetes, and comorbidities.',
      hi: 'पिछले 90 दिनों के शुगर का औसत। डॉक्टर उम्र और स्थिति के अनुसार व्यक्तिगत लक्ष्य निर्धारित करते हैं।',
    },
  },
];

export const EDUCATIONAL_ARTICLES_DATA: EducationalArticle[] = [
  {
    id: 'understanding-hba1c',
    slug: 'understanding-hba1c-three-month-average',
    title: {
      en: 'Demystifying HbA1c: Why Your 3-Month Average Matters More Than Daily Fluctuations',
      hi: 'HbA1c को समझें: दैनिक उतार-चढ़ाव की तुलना में 3 महीने का औसत क्यों महत्वपूर्ण है?',
    },
    excerpt: {
      en: 'Learn how glucose molecules attach to hemoglobin and why this single blood test is considered the gold standard for long-term complication prevention.',
      hi: 'जानें कि ग्लूकोज लाल रक्त कोशिकाओं से कैसे जुड़ता है और यह जांच दीर्घकालिक जटिलताओं से बचाव के लिए क्यों जरूरी है।',
    },
    category: { en: 'Clinical Diagnostics', hi: 'नैदानिक परीक्षण' },
    readTimeMinutes: 4,
    contentParagraphs: [
      {
        en: 'A standard fingerprick reading is a snapshot: it tells you what your blood sugar is at 8:00 AM on a single Tuesday. A glass of fruit juice or stress from traffic can spike it temporarily. In contrast, the Glycated Hemoglobin (HbA1c) test captures the entire movie.',
        hi: 'ग्लूकोमीटर की जांच केवल उस समय का हाल बताती है। तनाव या थोड़ा सा भोजन भी इसे बदल सकता है। लेकिन HbA1c पिछले 3 महीनों की पूरी तस्वीर प्रस्तुत करता है।',
      },
      {
        en: 'Red blood cells survive in your circulation for approximately 120 days. When glucose circulates in the blood, it naturally adheres to hemoglobin proteins inside these cells. The higher your blood glucose has been over the past three months, the higher the percentage of glycated hemoglobin.',
        hi: 'लाल रक्त कोशिकाएं शरीर में लगभग 120 दिनों तक जीवित रहती हैं। रक्त में मौजूद ग्लूकोज इन कोशिकाओं से जुड़ता रहता है। रक्त में जितना अधिक ग्लूकोज होगा, HbA1c उतना ही अधिक होगा।',
      },
      {
        en: 'Clinical trials demonstrate that every 1% reduction in HbA1c significantly reduces the risk of microvascular complications such as diabetic retinopathy (eye damage), neuropathy (nerve pain), and nephropathy (kidney strain).',
        hi: 'शोध दर्शाते हैं कि HbA1c में प्रत्येक 1% की कमी से आंखों, गुर्दों और नसों को होने वाले नुकसान के खतरे में भारी कमी आती है।',
      },
    ],
    keyTakeaways: [
      { en: 'HbA1c reflects 8-12 weeks of ambient glycemic control', hi: 'HbA1c 8-12 सप्ताह के औसत नियंत्रण को दर्शाता है' },
      { en: 'Normal non-diabetic range is below 5.7%; pre-diabetes is 5.7% to 6.4%', hi: 'सामान्य स्तर 5.7% से कम; प्रीडायबिटीज 5.7% से 6.4% है' },
      { en: 'Targets are always personalized by your diabetologist to prevent dangerous lows', hi: 'सुरक्षित सीमा डॉक्टर द्वारा रोगी की उम्र अनुसार तय की जाती है' },
    ],
    clinicalDisclaimer: UNIVERSAL_DISCLAIMER_TEXT,
    reviewStatus: 'draft',
  },
  {
    id: 'hypoglycemia-rule-of-15',
    slug: 'managing-low-blood-sugar-rule-of-15',
    title: {
      en: 'Low Blood Sugar Emergencies: The "Rule of 15" for Safe Hypoglycemia Recovery',
      hi: 'हाइपोग्लाइसीमिया से बचाव: ब्लड शुगर अचानक कम होने पर "15 का नियम"',
    },
    excerpt: {
      en: 'Recognizing cold sweats, tremors, and sudden heart palpitations, and treating low glucose immediately without causing rebound spikes.',
      hi: 'पसीना आना, कंपकंपी और घबराहट के लक्षणों को पहचानें और बिना रीबाउंड स्पाइक के शुगर को तुरंत सामान्य करें।',
    },
    category: { en: 'Patient Safety & First Aid', hi: 'सुरक्षा एवं प्राथमिक उपचार' },
    readTimeMinutes: 5,
    contentParagraphs: [
      {
        en: 'Hypoglycemia is clinically defined as blood glucose falling below 70 mg/dL. While high blood sugar causes damage over years, very low blood sugar can trigger dangerous disorientation within minutes.',
        hi: 'जब ब्लड शुगर 70 mg/dL से नीचे चला जाता है, तो इसे हाइपोग्लाइसीमिया कहते हैं। यह स्थिति कुछ ही मिनटों में चक्कर और बेहोशी ला सकती है।',
      },
      {
        en: 'Early autonomic warning signals include sudden cold sweating, trembling hands, palpitations, hunger pangs, irritability, and lightheadedness. If you use insulin or sulfonylurea medications, never ignore these signals.',
        hi: 'हाथों में कंपन, अचानक ठंडा पसीना, तेज धड़कन और अत्यधिक भूख इसके शुरुआती लक्षण हैं। इंसुलिन लेने वाले मरीजों को इसे कभी नजरअंदाज नहीं करना चाहिए।',
      },
      {
        en: 'The "Rule of 15" is the international standard: Consume exactly 15 grams of fast-acting simple carbohydrates (e.g. 3 glucose tablets, 1/2 cup fruit juice, or 3 teaspoons of sugar in water). Rest for 15 minutes, then re-check blood sugar. Repeat if still under 70 mg/dL.',
        hi: '"15 का नियम" कहता है: तुरंत 15 ग्राम सरल कार्बोहाइड्रेट लें (जैसे 3 चम्मच चीनी पानी में या आधा कप फलों का जूस)। 15 मिनट आराम करें और दोबारा जांचें।',
      },
    ],
    keyTakeaways: [
      { en: 'Always carry glucose tablets or candy if taking insulin', hi: 'इंसुलिन लेने वाले मरीज हमेशा पास में ग्लूकोज रखें' },
      { en: 'Avoid chocolates or pastries for emergency recovery—fats delay sugar absorption', hi: 'चॉकलेट या पेस्ट्री न लें, वसा से शुगर धीरे बढ़ती है' },
      { en: 'Inform family members and colleagues about hypoglycemia symptoms', hi: 'परिवार और सहकर्मियों को इन लक्षणों की जानकारी दें' },
    ],
    clinicalDisclaimer: UNIVERSAL_DISCLAIMER_TEXT,
    reviewStatus: 'draft',
  },
  {
    id: 'continuous-glucose-monitoring-tips',
    slug: 'continuous-glucose-monitoring-tips-for-success',
    title: {
      en: 'Decoding CGM Trends: Understanding Trend Arrows and Time in Range (TIR)',
      hi: 'सीजीएम सेंसर को समझें: ट्रेंड तीर और टाइम इन रेंज (TIR) का सही उपयोग',
    },
    excerpt: {
      en: 'How modern interstitial fluid sensors help you see which meals, sleep disruptions, and stresses cause hidden glucose excursions.',
      hi: 'जानें कि आधुनिक सेंसर कैसे दिखाते हैं कि कौन सा भोजन, तनाव या नींद आपके ग्लूकोज को प्रभावित करती है।',
    },
    category: { en: 'Advanced Technology', hi: 'आधुनिक तकनीक' },
    readTimeMinutes: 4,
    contentParagraphs: [
      {
        en: 'Continuous glucose sensors read glucose from interstitial fluid just beneath the skin rather than whole blood. Because of this physiological delay (lag time of 5-10 minutes), understanding trend arrows is vital.',
        hi: 'कंटीन्यूअस ग्लूकोज सेंसर त्वचा के नीचे के तरल से शुगर मापते हैं। इसलिए 5-10 मिनट का स्वाभाविक अंतर हो सकता है, और ट्रेंड तीर को समझना जरूरी है।',
      },
      {
        en: 'A horizontal arrow indicates stable glucose levels. An arrow pointing straight up warns that glucose is rising rapidly (>2 mg/dL per minute). Knowing this allows proactive corrections before a spike exceeds 250 mg/dL.',
        hi: 'सीधा तीर स्थिर शुगर दर्शाता है, जबकि ऊपर की ओर इशारा करता तीर तेजी से बढ़ती शुगर की चेतावनी देता है।',
      },
      {
        en: 'The modern clinical goal is achieving a Time in Range (TIR between 70 and 180 mg/dL) of greater than 70% of the day, while keeping Time Below Range (<70 mg/dL) under 4%.',
        hi: 'लक्ष्य यह होता है कि दिन का 70% से अधिक समय सुरक्षित सीमा (70-180 mg/dL) में रहे और कम शुगर का समय 4% से कम हो।',
      },
    ],
    keyTakeaways: [
      { en: 'Aim for >70% Time in Range (70-180 mg/dL)', hi: '70% से अधिक समय 70-180 mg/dL के बीच रखने का प्रयास करें' },
      { en: 'Verify with fingerprick if symptoms do not match sensor reading', hi: 'यदि लक्षण सेंसर से मेल न खाएं तो ग्लूकोमीटर से जांचें' },
      { en: 'Review ambulatory glucose reports with Dr. Sengupta during consultation', hi: 'परामर्श के दौरान डॉक्टर के साथ एजीपी रिपोर्ट की समीक्षा करें' },
    ],
    clinicalDisclaimer: UNIVERSAL_DISCLAIMER_TEXT,
    reviewStatus: 'draft',
  },
];
