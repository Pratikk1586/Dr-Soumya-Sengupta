import type { Condition } from '../types';

export const CONDITIONS_DATA: Condition[] = [
  {
    id: 'cond-diabetes',
    slug: 'diabetes',
    name: { en: 'Type 1 & Type 2 Diabetes', hi: 'टाइप 1 एवं टाइप 2 मधुमेह' },
    category: 'diabetes',
    summary: {
      en: 'Chronic endocrine conditions affecting how the body regulates blood glucose via insulin secretion or cellular sensitivity.',
      hi: 'दीर्घकालिक हार्मोनल स्थिति जिसमें शरीर में इंसुलिन की कमी या प्रतिरोध के कारण ग्लूकोज असंतुलित होता है।',
    },
    symptoms: [
      { en: 'Increased thirst (polydipsia) and frequent urination (polyuria)', hi: 'अत्यधिक प्यास लगना और बार-बार पेशाब आना' },
      { en: 'Unexplained fatigue and weight loss', hi: 'अकारण कमजोरी और वजन कम होना' },
      { en: 'Slow healing of minor skin abrasions', hi: 'घाव या चोट का धीरे भरना' },
    ],
    managementApproach: [
      { en: 'Basal-bolus or oral antidiabetic therapy matched to beta-cell function', hi: 'बीटा-सेल क्षमता अनुसार दवा या इंसुलिन' },
      { en: 'Regular HbA1c surveillance aiming for individualized safe targets', hi: 'नियमित HbA1c निगरानी' },
      { en: 'Annual microvascular complication screening', hi: 'वार्षिक सूक्ष्म जटिलताओं की जांच' },
    ],
    status: 'verified',
  },
  {
    id: 'cond-thyroid',
    slug: 'thyroid',
    name: { en: 'Thyroid Disorders (Hypo & Hyperthyroidism)', hi: 'थायरॉयड विकार (हाइपो एवं हाइपरथायरायडिज्म)' },
    category: 'thyroid',
    summary: {
      en: 'Endocrine imbalances impacting metabolic rate, energy expenditure, lipid profiles, and cardiovascular rhythm.',
      hi: 'थायरॉयड ग्रंथि के असंतुलन से चयापचय दर, ऊर्जा और वजन पर असर पड़ता है।',
    },
    symptoms: [
      { en: 'Unexplained weight changes, fatigue, cold or heat intolerance', hi: 'वजन में बदलाव, अत्यधिक थकान, सर्दी या गर्मी न सह पाना' },
      { en: 'Dry skin, hair thinning, or mood fluctuations', hi: 'त्वचा का रूखापन, बाल झड़ना या मानसिक तनाव' },
      { en: 'Menstrual irregularities or cardiac palpitations', hi: 'माहवारी में अनियमितता या धड़कन तेज होना' },
    ],
    managementApproach: [
      { en: 'Precise TSH, Free T3, and Free T4 hormone calibration', hi: 'टीशएच एवं फ्री थायरॉयड हार्मोन की सटीक जांच' },
      { en: 'Physiological levothyroxine dosage titration taken fasting', hi: 'सही समय पर दवा की उपयुक्त खुराक' },
      { en: 'Periodic surveillance during pregnancy or preconception', hi: 'गर्भावस्था में विशेष निगरानी' },
    ],
    status: 'verified',
  },
  {
    id: 'cond-weight-management',
    slug: 'weight-management',
    name: { en: 'Metabolic Weight Management & Obesity', hi: 'मेटाबोलिक वजन प्रबंधन एवं मोटापा' },
    category: 'weight-management',
    summary: {
      en: 'Medical weight regulation targeting visceral fat reduction to alleviate insulin resistance and cardiovascular stress.',
      hi: 'शरीर की आंतरिक चर्बी कम करने का वैज्ञानिक तरीका ताकि इंसुलिन प्रतिरोध घटे।',
    },
    symptoms: [
      { en: 'Central abdominal adiposity (waist circumference >90cm in men, >80cm in women)', hi: 'कमर के घेरे में वृद्धि' },
      { en: 'Daytime somnolence or snoring (obstructive sleep apnea)', hi: 'दिन में नींद आना या खर्राटे' },
      { en: 'Acanthosis nigricans (dark velvety skin folds on neck and underarms)', hi: 'गर्दन पर गहरे रंग की त्वचा' },
    ],
    managementApproach: [
      { en: 'Evaluation of endocrine drivers (insulin resistance, thyroid, cortisol)', hi: 'हार्मोनल कारणों की पहचान' },
      { en: 'Evidence-based GLP-1 receptor agonist evaluation where clinically indicated', hi: 'आधुनिक सुरक्षित दवाओं की समीक्षा' },
      { en: 'Sustainable nutritional calorie balance without extreme starvation', hi: 'संतुलित आहार' },
    ],
    status: 'verified',
  },
  {
    id: 'cond-metabolic-health',
    slug: 'metabolic-health',
    name: { en: 'Metabolic Syndrome & Dyslipidemia', hi: 'मेटाबोलिक सिंड्रोम एवं डिस्लिपिडेमिया' },
    category: 'metabolic-health',
    summary: {
      en: 'A cluster of conditions including high blood pressure, high triglycerides, low HDL, and abdominal fat multiplying vascular risks.',
      hi: 'उच्च रक्तचाप, बढ़ा हुआ ट्राइग्लिसराइड्स और रक्त शर्करा का समूह।',
    },
    symptoms: [
      { en: 'Elevated fasting triglycerides (>150 mg/dL) and low HDL cholesterol', hi: 'ट्राइग्लिसराइड्स की अधिकता' },
      { en: 'Elevated blood pressure (>130/85 mmHg)', hi: 'रक्तचाप में वृद्धि' },
      { en: 'Borderline fasting glucose spikes', hi: 'बॉर्डरलाइन शुगर' },
    ],
    managementApproach: [
      { en: 'Comprehensive atherogenic dyslipidemia management', hi: 'लिपिड प्रोफाइल का सुधार' },
      { en: 'Vascular endothelium protection and blood pressure harmonization', hi: 'रक्तचाप संतुलन' },
      { en: 'Cardiometabolic risk reduction protocols', hi: 'हृदय जोखिम निवारण' },
    ],
    status: 'verified',
  },
  {
    id: 'cond-other',
    slug: 'other',
    name: { en: 'Other Endocrine & Metabolic Concerns', hi: 'अन्य एंडोक्राइन एवं चयापचय संबंधी समस्याएं' },
    category: 'other',
    summary: {
      en: 'Clinical evaluation of specialized endocrine topics including gestational glycemic shifts, osteoporosis, and adrenal screening.',
      hi: 'हड्डियों की कमजोरी, गर्भावस्था के दौरान हार्मोनल बदलाव आदि।',
    },
    symptoms: [
      { en: 'Unexplained bone aches or recurrent muscle cramps', hi: 'हड्डियों या मांसपेशियों में दर्द' },
      { en: 'Sudden blood pressure spikes resistant to standard medications', hi: 'अनियंत्रित रक्तचाप' },
    ],
    managementApproach: [
      { en: 'Targeted biochemical assays and specialized hormonal profiling', hi: 'विशेष हार्मोनल जांच' },
      { en: 'Multidisciplinary referral coordination when necessary', hi: 'समन्वित विशेषज्ञ सलाह' },
    ],
    status: 'verified',
  },
];
