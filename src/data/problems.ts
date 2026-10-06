import type { ProblemTopic } from '../types';

export const PROBLEMS_DATA: ProblemTopic[] = [
  {
    id: 'prob-high-blood-sugar',
    slug: 'high-blood-sugar',
    title: {
      en: 'High Blood Sugar (Hyperglycemia)',
      hi: 'उच्च रक्त शर्करा (हाई ब्लड शुगर)',
    },
    shortDesc: {
      en: 'Elevated fasting or post-meal glucose readings detected on home glucometer or lab tests.',
      hi: 'ग्लूकोमीटर या लैब जांच में खाली पेट या भोजन के बाद बढ़ी हुई शुगर का आना।',
    },
    generalInfo: {
      en: 'Elevated blood glucose occurs when pancreatic beta-cells produce insufficient insulin or when body cells resist insulin. Occasional spikes may result from dietary carbohydrates, illness, or stress, but persistent highs require clinical evaluation to prevent microvascular strain.',
      hi: 'जब अग्न्याशय पर्याप्त इंसुलिन नहीं बनाता या कोशिकाएं इंसुलिन का सही उपयोग नहीं कर पातीं, तो रक्त शर्करा बढ़ जाती है। लगातार उच्च स्तर अंगों पर दबाव डाल सकता है।',
    },
    keyConsiderations: [
      {
        en: 'Notice whether highs occur primarily fasting (morning) or 2 hours after meals',
        hi: 'ध्यान दें कि शुगर सुबह खाली पेट अधिक है या भोजन के 2 घंटे बाद',
      },
      {
        en: 'Monitor for accompanying signs such as increased thirst, fatigue, or dry mouth',
        hi: 'अत्यधिक प्यास, थकान या बार-बार पेशाब आने जैसे संकेतों पर ध्यान दें',
      },
      {
        en: 'Check whether medication timing and carbohydrate portions are aligned',
        hi: 'दवाइयों के समय और आहार में कार्बोहाइड्रेट की मात्रा की समीक्षा करें',
      },
    ],
    relatedPageLink: '/conditions/diabetes',
    relatedPageLabel: {
      en: 'Type 1 & 2 Diabetes Overview',
      hi: 'डायबिटीज विस्तृत जानकारी',
    },
    relatedResourceLink: '/patient-resources/reports',
    relatedResourceLabel: {
      en: 'Understanding Glucose Biomarkers',
      hi: 'ग्लूकोज रिपोर्ट कैसे समझें',
    },
    status: 'verified',
  },
  {
    id: 'prob-high-hba1c',
    slug: 'high-hba1c',
    title: {
      en: 'High HbA1c Level',
      hi: 'उच्च HbA1c स्तर',
    },
    shortDesc: {
      en: 'Glycated hemoglobin reading above personalized clinical targets representing a 3-month average.',
      hi: 'पिछले 3 महीनों के औसत ग्लूकोज को दर्शाने वाला HbA1c स्तर लक्ष्य से अधिक आना।',
    },
    generalInfo: {
      en: 'HbA1c reflects the percentage of hemoglobin bound to glucose over the 90–120 day lifespan of red blood cells. A high HbA1c indicates sustained glycemic exposure over preceding months, highlighting the need for therapeutic fine-tuning and lifestyle optimization.',
      hi: 'HbA1c पिछले 3 महीनों के औसत शुगर स्तर को दर्शाता है। बढ़ा हुआ HbA1c लंबे समय तक रक्त में ग्लूकोज की अधिकता का संकेत है।',
    },
    keyConsiderations: [
      {
        en: 'A single high finger-prick test differs from HbA1c, which captures cumulative 90-day exposure',
        hi: 'एक समय की फिंगर-प्रिक जांच और 3 महीने के समग्र HbA1c में अंतर होता है',
      },
      {
        en: 'Target HbA1c varies by age, duration of diabetes, and cardiovascular history',
        hi: 'आयु और शारीरिक स्थिति के अनुसार प्रत्येक व्यक्ति का सुरक्षित HbA1c लक्ष्य अलग हो सकता है',
      },
      {
        en: 'Continuous glucose monitoring (CGM) helps identify whether highs stem from post-meal spikes or overnight surges',
        hi: 'सेंसर तकनीक से पता चलता है कि शुगर दिन में बढ़ रही है या रात में',
      },
    ],
    relatedPageLink: '/diabetes-care/management',
    relatedPageLabel: {
      en: 'Comprehensive Diabetes Management',
      hi: 'व्यापक डायबिटीज प्रबंधन',
    },
    relatedResourceLink: '/patient-resources/reports',
    relatedResourceLabel: {
      en: 'Guide to HbA1c Reference Ranges',
      hi: 'HbA1c संदर्भ सीमा गाइड',
    },
    status: 'verified',
  },
  {
    id: 'prob-weight-gain',
    slug: 'weight-gain',
    title: {
      en: 'Weight Gain & Metabolic Resistance',
      hi: 'वजन में वृद्धि एवं मेटाबोलिक प्रतिरोध',
    },
    shortDesc: {
      en: 'Progressive accumulation of visceral midsection fat and difficulty shedding weight despite calorie restriction.',
      hi: 'कम खाने के बावजूद पेट के आसपास चर्बी का बढ़ना और वजन कम न हो पाना।',
    },
    generalInfo: {
      en: 'Metabolic weight gain is frequently driven by hyperinsulinemia and cellular insulin resistance rather than mere willpower. Elevated circulating insulin acts as an energy-storage hormone, inhibiting fat breakdown and triggering post-meal energy slumps.',
      hi: 'इंसुलिन प्रतिरोध शरीर में वसा को जमा करने के लिए प्रेरित करता है। यह केवल खानपान नहीं बल्कि हार्मोनल संतुलन का विषय है।',
    },
    keyConsiderations: [
      {
        en: 'Measure waist circumference in addition to total body weight to assess visceral fat',
        hi: 'कुल वजन के साथ-साथ कमर के घेरे की भी माप लें',
      },
      {
        en: 'Evaluate thyroid status (TSH) and fasting lipid ratios in tandem',
        hi: 'थायरॉयड (TSH) और लिपिड प्रोफाइल की भी साथ में जांच कराएं',
      },
      {
        en: 'Avoid unscientific crash dieting, which lowers basal metabolic rate',
        hi: 'अवैज्ञानिक क्रैश डाइटिंग से बचें जो मेटाबॉलिज्म को धीमा कर देती है',
      },
    ],
    relatedPageLink: '/conditions/weight-management',
    relatedPageLabel: {
      en: 'Metabolic Weight Program',
      hi: 'मेटाबोलिक वजन प्रबंधन',
    },
    relatedResourceLink: '/diabetes-care/lifestyle',
    relatedResourceLabel: {
      en: 'Dietary & Lifestyle Guidance',
      hi: 'जीवनशैली व आहार परामर्श',
    },
    status: 'verified',
  },
  {
    id: 'prob-thyroid-report',
    slug: 'thyroid-report',
    title: {
      en: 'Abnormal Thyroid Report (TSH / T3 / T4)',
      hi: 'थायरॉयड रिपोर्ट में असंतुलन (TSH / T3 / T4)',
    },
    shortDesc: {
      en: 'TSH elevated above or suppressed below lab reference range on routine endocrine screening.',
      hi: 'रूटीन जांच में TSH स्तर का सामान्य सीमा से कम या अधिक आना।',
    },
    generalInfo: {
      en: 'The thyroid gland regulates basal metabolic rate and cellular energy production. In diabetes, autoimmune thyroid disorders (Hashimoto thyroiditis) occur with increased frequency. Correct timing and consistent fasting administration of hormone replacement are critical for stability.',
      hi: 'थायरॉयड ग्रंथि शरीर की ऊर्जा और मेटाबॉलिज्म को नियंत्रित करती है। मधुमेह के मरीजों में थायरॉयड असंतुलन आम है।',
    },
    keyConsiderations: [
      {
        en: 'TSH should be evaluated alongside Free T4 and clinical energy levels',
        hi: 'TSH के साथ फ्री T4 और शारीरिक ऊर्जा के स्तर को देखना आवश्यक है',
      },
      {
        en: 'Thyroid medication must be taken on an empty stomach with plain water at least 45 minutes before tea or breakfast',
        hi: 'थायरॉयड की दवा सुबह खाली पेट पानी के साथ लेनी चाहिए, चाय या नाश्ते से 45 मिनट पहले',
      },
      {
        en: 'Pregnancy requires stricter trimester-specific TSH surveillance',
        hi: 'गर्भावस्था में थायरॉयड की विशेष निगरानी आवश्यक होती है',
      },
    ],
    relatedPageLink: '/conditions/thyroid',
    relatedPageLabel: {
      en: 'Thyroid Care & Endocrinology',
      hi: 'थायरॉयड विकार एवं उपचार',
    },
    relatedResourceLink: '/patient-resources/reports',
    relatedResourceLabel: {
      en: 'Thyroid Lab Report Guide',
      hi: 'थायरॉयड टेस्ट रिपोर्ट गाइड',
    },
    status: 'verified',
  },
  {
    id: 'prob-frequent-thirst',
    slug: 'frequent-thirst',
    title: {
      en: 'Frequent Thirst & Urination (Polydipsia / Polyuria)',
      hi: 'अत्यधिक प्यास और बार-बार पेशाब आना',
    },
    shortDesc: {
      en: 'Waking up multiple times at night to drink water or urinate, accompanied by persistent dry mouth.',
      hi: 'रात में बार-बार पानी पीने या पेशाब जाने के लिए नींद खुलना और मुंह सूखना।',
    },
    generalInfo: {
      en: 'When blood glucose exceeds the renal threshold (typically ~180 mg/dL), kidneys spill excess sugar into the urine. Osmotic diuresis pulls body water along with it, leading to systemic dehydration and intense compensatory thirst.',
      hi: 'जब रक्त में शुगर बहुत बढ़ जाती है, तो गुर्दे अतिरिक्त ग्लूकोज को पेशाब के जरिए बाहर निकालते हैं, जिससे शरीर में पानी की कमी और अत्यधिक प्यास लगती है।',
    },
    keyConsiderations: [
      {
        en: 'Distinguish between nighttime urination from high sugar versus prostate or bladder symptoms',
        hi: 'उच्च शुगर से होने वाले पेशाब और अन्य मूत्राशय समस्याओं में अंतर समझें',
      },
      {
        en: 'Drink plain water and avoid fruit juices or sweetened electrolyte drinks that exacerbate spikes',
        hi: 'सादा पानी पिएं, मीठे पेय पदार्थों या फलों के जूस से बचें',
      },
      {
        en: 'Schedule prompt clinical assessment if paired with unexplained weight loss or nausea',
        hi: 'यदि अचानक वजन कम हो रहा हो या उल्टी जैसा लगे तो तुरंत डॉक्टर से संपर्क करें',
      },
    ],
    relatedPageLink: '/diabetes-care/prediabetes',
    relatedPageLabel: {
      en: 'Early Glycemic Screening',
      hi: 'प्रारंभिक शुगर जांच',
    },
    relatedResourceLink: '/patient-resources/guides',
    relatedResourceLabel: {
      en: 'Self-Monitoring Patient Guide',
      hi: 'स्वयं जांच मरीज गाइड',
    },
    status: 'verified',
  },
  {
    id: 'prob-diabetes-management',
    slug: 'diabetes-management',
    title: {
      en: 'Ongoing Diabetes Management & Medication Review',
      hi: 'नियमित डायबिटीज प्रबंधन एवं दवा समीक्षा',
    },
    shortDesc: {
      en: 'Navigating medication adjustments, diet routines, CGM readings, and long-term organ safety.',
      hi: 'दवाइयों के समायोजन, आहार योजना और दीर्घकालिक अंग सुरक्षा की नियमित समीक्षा।',
    },
    generalInfo: {
      en: 'Modern diabetology emphasizes individualized glycemic targets (Time in Range > 70%) rather than rigid fasting numbers alone. Regular surveillance of kidneys (uACR), cardiovascular risk markers, and peripheral sensation preserves quality of life over decades.',
      hi: 'आधुनिक चिकित्सा केवल शुगर घटाने पर नहीं, बल्कि हृदय, गुर्दे, आंखों और पैरों की दीर्घकालिक सुरक्षा पर केंद्रित है।',
    },
    keyConsiderations: [
      {
        en: 'Review prescriptions every 3–6 months to assess effectiveness and prevent unnecessary polypharmacy',
        hi: 'हर 3-6 महीने में दवाओं की समीक्षा करें ताकि अनावश्यक दवाओं से बचा जा सके',
      },
      {
        en: 'Complete annual urine microalbumin (uACR) and dilated eye exams',
        hi: 'वार्षिक गुर्दा (uACR) और आंखों की जांच समय पर कराएं',
      },
      {
        en: 'Discuss continuous glucose monitoring (CGM) if experiencing unexplained hypoglycemic drops',
        hi: 'यदि शुगर अचानक गिरती हो (हाइपो) तो सीजीएम सेंसर पर विचार करें',
      },
    ],
    relatedPageLink: '/diabetes-care/management',
    relatedPageLabel: {
      en: 'Structured Care Programs',
      hi: 'संरचित देखभाल कार्यक्रम',
    },
    relatedResourceLink: '/patient-resources/faqs',
    relatedResourceLabel: {
      en: 'Frequently Asked Questions',
      hi: 'अक्सर पूछे जाने वाले प्रश्न',
    },
    status: 'verified',
  },
];
