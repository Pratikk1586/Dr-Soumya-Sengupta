import type { ReportTopic } from '../types';
import { CONTENT_TO_BE_VERIFIED_MARKER } from './_placeholders';

export const REPORTS_DATA: ReportTopic[] = [
  {
    id: 'rep-glucose',
    key: 'glucose',
    title: {
      en: 'Fasting & Post-Prandial Blood Glucose',
      hi: 'फास्टिंग एवं भोजन पश्चात रक्त शर्करा',
    },
    testName: {
      en: 'Plasma Blood Glucose (Fasting & PP)',
      hi: 'ब्लड ग्लूकोज (फास्टिंग व पीपी)',
    },
    whatItIs: {
      en: 'Measurement of the direct concentration of glucose (sugar) circulating in the bloodstream at specific intervals — either after an 8–10 hour overnight fast or 2 hours following a meal.',
      hi: 'रक्त में प्रवाहित ग्लूकोज की तात्कालिक मात्रा की जांच — 8-10 घंटे खाली पेट (फास्टिंग) या भोजन के ठीक 2 घंटे बाद।',
    },
    whyItIsMeasured: {
      en: 'Identifies acute glycemic spikes, detects impaired fasting glucose (prediabetes), and evaluates immediate mealtime insulin response.',
      hi: 'तुरंत की शुगर स्थिति, भोजन के प्रभाव और प्रीडायबिटीज की पहचान के लिए मापा जाता है।',
    },
    generalEducationalMeaning: {
      en: 'Fasting glucose reflects liver glucose output during sleep, whereas post-meal readings measure how effectively peripheral tissues and beta-cell insulin clear dietary carbohydrates.',
      hi: 'खाली पेट की शुगर रात में लिवर द्वारा बनाए गए ग्लूकोज को दर्शाती है, जबकि भोजन के बाद की शुगर शरीर द्वारा खाने के निपटान को दिखाती है।',
    },
    referenceRangeGuideline: {
      standardRange: `${CONTENT_TO_BE_VERIFIED_MARKER} ranges to be confirmed by Dr. Sengupta`,
      source: 'ADA / RSSDI Clinical Practice Recommendations',
      guidelineNote: {
        en: 'General non-pregnant adult guideline. Target ranges vary by lab methodology and personal health status.',
        hi: 'सामान्य वयस्क दिशानिर्देश। लैब और व्यक्तिगत स्थिति अनुसार लक्ष्य भिन्न हो सकते हैं।',
      },
      reviewStatus: 'draft',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'rep-hba1c',
    key: 'hba1c',
    title: {
      en: 'Glycated Hemoglobin (HbA1c)',
      hi: 'ग्लाइकेटेड हीमोग्लोबिन (HbA1c)',
    },
    testName: {
      en: 'HbA1c / Glycohemoglobin',
      hi: 'HbA1c टेस्ट',
    },
    whatItIs: {
      en: 'Biochemical assessment showing the percentage of hemoglobin in red blood cells that has chemically bound with glucose over their 90–120 day lifespan.',
      hi: 'लाल रक्त कोशिकाओं पर चिपके ग्लूकोज का प्रतिशत, जो पिछले 90-120 दिनों के औसत को दर्शाता है।',
    },
    whyItIsMeasured: {
      en: 'Gold standard biomarker for chronic glycemic control, unaffected by temporary day-to-day stress, fasting duration, or recent single meals.',
      hi: 'दीर्घकालिक शुगर नियंत्रण का प्रामाणिक पैमाना, जो एक दिन के उतार-चढ़ाव से प्रभावित नहीं होता।',
    },
    generalEducationalMeaning: {
      en: 'A stable HbA1c near individualized targets correlates with significantly reduced microvascular risks in the retina, kidneys, and peripheral nerve pathways.',
      hi: 'लक्ष्य के करीब सुरक्षित HbA1c स्तर आंखों, गुर्दों और नसों की दीर्घकालिक सुरक्षा सुनिश्चित करता है।',
    },
    referenceRangeGuideline: {
      standardRange: `${CONTENT_TO_BE_VERIFIED_MARKER} ranges to be confirmed by Dr. Sengupta`,
      source: 'ADA Standards of Care in Diabetes',
      guidelineNote: {
        en: 'Diagnostic categories: Normal, Prediabetes, Diabetes. Personal targets vary based on age and clinical history.',
        hi: 'सामान्य, प्रीडायबिटीज और डायबिटीज श्रेणियां। व्यक्तिगत लक्ष्य डॉक्टर तय करते हैं।',
      },
      reviewStatus: 'draft',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'rep-blood-pressure',
    key: 'blood_pressure',
    title: {
      en: 'Blood Pressure (Cardiovascular Strain)',
      hi: 'रक्तचाप (ब्लड प्रेशर)',
    },
    testName: {
      en: 'Systolic & Diastolic Blood Pressure',
      hi: 'सिस्टोलिक एवं डायस्टोलिक रक्तचाप',
    },
    whatItIs: {
      en: 'Measurement of the pressure exerted by circulating blood against arterial walls during cardiac contraction (systolic) and cardiac rest (diastolic).',
      hi: 'हृदय के धड़कने (सिस्टोलिक) और आराम करने (डायस्टोलिक) के दौरान धमनियों पर पड़ने वाले दबाव का माप।',
    },
    whyItIsMeasured: {
      en: 'Hypertension accelerates diabetic vascular complications by doubling the mechanical workload on delicate renal and ocular capillary networks.',
      hi: 'उच्च रक्तचाप मधुमेह के मरीजों में गुर्दे और आंखों की सूक्ष्म नसों पर दबाव दोगुना कर देता है।',
    },
    generalEducationalMeaning: {
      en: 'Keeping blood pressure well-controlled protects the heart, brain, and kidneys from premature micro- and macrovascular arterial stiffness.',
      hi: 'रक्तचाप नियंत्रित रखने से हृदय, मस्तिष्क और गुर्दों की धमनियां स्वस्थ रहती हैं।',
    },
    referenceRangeGuideline: {
      standardRange: `${CONTENT_TO_BE_VERIFIED_MARKER} ranges to be confirmed by Dr. Sengupta`,
      source: 'AHA / ACC / ADA Consensus Guidelines',
      guidelineNote: {
        en: 'Evaluated across multiple resting clinical readings. Normal ranges vary by age and cardiovascular profile.',
        hi: 'आराम की स्थिति में कई बार मापा जाना चाहिए। आयु और हृदय स्वास्थ्य अनुसार लक्ष्य तय होते हैं।',
      },
      reviewStatus: 'draft',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'rep-cholesterol',
    key: 'cholesterol',
    title: {
      en: 'Lipid Profile & Cholesterol Fractions',
      hi: 'लिपिड प्रोफाइल एवं कोलेस्ट्रॉल अंश',
    },
    testName: {
      en: 'Complete Lipid Panel (LDL, HDL, Triglycerides, Non-HDL)',
      hi: 'लिपिड पैनल (LDL, HDL, ट्राइग्लिसराइड्स)',
    },
    whatItIs: {
      en: 'Laboratory analysis of lipid carrier proteins circulating in blood plasma, including low-density lipoproteins (LDL), high-density lipoproteins (HDL), and triglycerides.',
      hi: 'रक्त में प्रवाहित विभिन्न प्रकार के वसा कणों (कोलेस्ट्रॉल और ट्राइग्लिसराइड्स) की प्रयोगशाला जांच।',
    },
    whyItIsMeasured: {
      en: 'Diabetic dyslipidemia typically features elevated triglycerides and reduced protective HDL, a lipid pattern that promotes arterial plaque formation.',
      hi: 'मधुमेह में ट्राइग्लिसराइड्स बढ़ना और अच्छा कोलेस्ट्रॉल (HDL) घटना धमनियों में रुकावट का कारण बनता है।',
    },
    generalEducationalMeaning: {
      en: 'Maintaining healthy lipid ratios alongside glycemic balance prevents coronary artery disease and preserves vascular elasticity.',
      hi: 'ग्लूकोज के साथ कोलेस्ट्रॉल का संतुलन दिल के दौरे और स्ट्रोक के जोखिम को कम करता है।',
    },
    referenceRangeGuideline: {
      standardRange: `${CONTENT_TO_BE_VERIFIED_MARKER} ranges to be confirmed by Dr. Sengupta`,
      source: 'National Lipid Association / ADA Guidelines',
      guidelineNote: {
        en: 'Atherosclerotic cardiovascular risk category determines individual target levels.',
        hi: 'हृदय रोग के जोखिम अनुसार डॉक्टर व्यक्तिगत लक्ष्य तय करते हैं।',
      },
      reviewStatus: 'draft',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'rep-bmi',
    key: 'bmi',
    title: {
      en: 'Body Mass Index (BMI) & Visceral Adiposity',
      hi: 'बॉडी मास इंडेक्स (BMI) एवं विसरल फैट',
    },
    testName: {
      en: 'Anthropometric Ratio (Weight / Height²)',
      hi: 'बीएमआई एवं कमर का घेरा',
    },
    whatItIs: {
      en: 'Anthropometric calculation derived from body weight divided by square of height, evaluated in Asian populations alongside waist circumference.',
      hi: 'वजन और लंबाई का अनुपात, जिसे दक्षिण एशियाई आबादी में कमर के घेरे के साथ देखा जाता है।',
    },
    whyItIsMeasured: {
      en: 'Identifies metabolic obesity and excess intra-abdominal visceral adipose tissue, the primary driver of hepatic and peripheral insulin resistance.',
      hi: 'पेट की अंदरूनी चर्बी और इंसुलिन प्रतिरोध का अनुमान लगाने के लिए मापा जाता है।',
    },
    generalEducationalMeaning: {
      en: 'In South Asian populations, metabolic insulin resistance occurs at lower BMI cutoffs (>= 23 kg/m²), emphasizing waist-to-height ratio.',
      hi: 'भारतीय आबादी में कम बीएमआई पर भी मेटाबोलिक जोखिम बढ़ सकता है, इसलिए कमर की माप महत्वपूर्ण है।',
    },
    referenceRangeGuideline: {
      standardRange: `${CONTENT_TO_BE_VERIFIED_MARKER} ranges to be confirmed by Dr. Sengupta`,
      source: 'WHO Asian BMI Criteria / Consensus Guidelines for Asian Indians',
      guidelineNote: {
        en: 'Asian cutoffs differ from Caucasian classifications. Waist circumference (>90cm in men, >80cm in women) serves as key co-marker.',
        hi: 'भारतीय आबादी के लिए बीएमआई मानक भिन्न हैं। कमर का घेरा भी मुख्य संकेत है।',
      },
      reviewStatus: 'draft',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'rep-uacr',
    key: 'kidney_uacr',
    title: {
      en: 'Urine Albumin-to-Creatinine Ratio (uACR)',
      hi: 'यूरिन एल्ब्यूमिन-क्रिएटिनिन अनुपात (uACR)',
    },
    testName: {
      en: 'Spot Urinary Albumin / Creatinine',
      hi: 'स्पॉट यूरिन एल्ब्यूमिन / क्रिएटिनिन',
    },
    whatItIs: {
      en: 'Sensitive urinalysis assessing microscopic leakage of albumin protein through damaged renal glomeruli filtration barriers.',
      hi: 'गुर्दे के फिल्टर से प्रोटीन (एल्ब्यूमिन) के सूक्ष्म रिसाव की सबसे संवेदनशील जांच।',
    },
    whyItIsMeasured: {
      en: 'Detects early diabetic kidney disease (nephropathy) years before standard blood serum creatinine begins to climb.',
      hi: 'किडनी की क्षति को कई साल पहले पकड़ने में सक्षम, जब तक सामान्य ब्लड टेस्ट सामान्य रहते हैं।',
    },
    generalEducationalMeaning: {
      en: 'Early detection of microalbuminuria allows for kidney-protective medication (SGLT2 inhibitors or ACEi/ARBs) to halt progression.',
      hi: 'समय पर पहचान होने से आधुनिक दवाइयों द्वारा गुर्दे की सुरक्षा की जा सकती है।',
    },
    referenceRangeGuideline: {
      standardRange: `${CONTENT_TO_BE_VERIFIED_MARKER} ranges to be confirmed by Dr. Sengupta`,
      source: 'KDIGO / ADA Guidelines on Diabetic Kidney Disease',
      guidelineNote: {
        en: 'Requires confirmation across two early-morning spot urine tests due to exercise and transient infection variability.',
        hi: 'व्यायाम या हल्के बुखार से प्रभाव संभव है, इसलिए पुष्टि के लिए दोबारा जांच जरूरी होती है।',
      },
      reviewStatus: 'draft',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'rep-tsh',
    key: 'thyroid_tsh',
    title: {
      en: 'Thyroid Stimulating Hormone (TSH)',
      hi: 'थायरॉयड स्टिम्युलेटिंग हार्मोन (TSH)',
    },
    testName: {
      en: 'Serum Ultra-Sensitive TSH',
      hi: 'सीरम TSH टेस्ट',
    },
    whatItIs: {
      en: 'Pituitary gland hormone that directs the thyroid gland to synthesize and release thyroxine (T4) and triiodothyronine (T3).',
      hi: 'पिट्यूटरी ग्रंथि द्वारा स्रावित हार्मोन जो थायरॉयड ग्रंथि को कार्य करने का निर्देश देता है।',
    },
    whyItIsMeasured: {
      en: 'Identifies overt and subclinical hypothyroidism or hyperthyroidism, both of which destabilize blood sugar and lipid clearance.',
      hi: 'सुस्त या अतिसक्रिय थायरॉयड की पहचान के लिए, जो शुगर और कोलेस्ट्रॉल दोनों को बिगाड़ सकता है।',
    },
    generalEducationalMeaning: {
      en: 'In hypothyroidism, elevated TSH signals a sluggish metabolic rate, while suppressed TSH signals excess thyroid activity.',
      hi: 'बढ़ा हुआ TSH सुस्त मेटाबॉलिज्म का और घटा हुआ TSH अति-सक्रियता का संकेत देता है।',
    },
    referenceRangeGuideline: {
      standardRange: `${CONTENT_TO_BE_VERIFIED_MARKER} ranges to be confirmed by Dr. Sengupta`,
      source: 'American Thyroid Association / Endocrine Society',
      guidelineNote: {
        en: 'Normal ranges vary by lab assay and gestational trimester.',
        hi: 'गर्भावस्था और लैब परीक्षण अनुसार सीमाएं बदलती हैं।',
      },
      reviewStatus: 'draft',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
];
