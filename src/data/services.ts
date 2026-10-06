import type { Service } from '../types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'srv-management',
    slug: 'management',
    title: { en: 'Comprehensive Diabetes Management', hi: 'व्यापक मधुमेह प्रबंधन' },
    shortDescription: {
      en: 'Structured clinical protocols for Type 1 and Type 2 diabetes prioritizing glycemic balance and organ protection.',
      hi: 'टाइप 1 और टाइप 2 मधुमेह के लिए व्यवस्थित चिकित्सीय प्रोटोकॉल।',
    },
    fullDescription: {
      en: 'A personalized care model that integrates baseline metabolic screening, individualized pharmacotherapy, and lifestyle harmonization to achieve sustainable glucose control.',
      hi: 'एक व्यक्तिगत देखभाल प्रणाली जो चयापचय जांच, उपयुक्त दवाओं और जीवनशैली समन्वय को जोड़ती है।',
    },
    category: 'clinical',
    indications: [
      { en: 'HbA1c consistently elevated above target range', hi: 'HbA1c लगातार लक्ष्य सीमा से ऊपर' },
      { en: 'Recurrent morning fasting hyperglycemia', hi: 'सुबह की फास्टिंग में बार-बार उच्च शुगर' },
      { en: 'Transitioning between oral medications and insulin therapy', hi: 'दवाओं और इंसुलिन थेरेपी के बीच बदलाव' },
    ],
    clinicalApproach: [
      { en: 'Detailed review of glucose logs and metabolic laboratory profiles', hi: 'ग्लूकोज लॉग और लैब प्रोफाइल की विस्तृत समीक्षा' },
      { en: 'Organ-protective modern pharmacological regimen planning', hi: 'अंग-सुरक्षात्मक आधुनिक दवाओं का निर्धारण' },
      { en: 'Hypoglycemia risk mitigation counseling', hi: 'कम शुगर के खतरे से बचाव की सलाह' },
    ],
    status: 'verified',
  },
  {
    id: 'srv-prediabetes',
    slug: 'prediabetes',
    title: { en: 'Prediabetes & Remission Assessment', hi: 'प्री-डायबिटीज एवं रेमिशन मूल्यांकन' },
    shortDescription: {
      en: 'Early intervention programs to prevent progression to overt diabetes through targeted metabolic restoration.',
      hi: 'प्रारंभिक हस्तक्षेप द्वारा प्रीडायबिटीज को पूर्ण मधुमेह में बदलने से रोकने का कार्यक्रम।',
    },
    fullDescription: {
      en: 'Early intervention during the prediabetic phase can prevent long-term pancreatic beta-cell fatigue and reverse insulin resistance.',
      hi: 'प्रीडायबिटीज चरण में सही समय पर हस्तक्षेप से इंसुलिन संवेदनशीलता को सुधारा जा सकता है।',
    },
    category: 'preventive',
    indications: [
      { en: 'Fasting glucose between 100-125 mg/dL or HbA1c 5.7-6.4%', hi: 'फास्टिंग शुगर 100-125 mg/dL या HbA1c 5.7-6.4%' },
      { en: 'Strong family history of early Type 2 diabetes', hi: 'परिवार में मधुमेह का इतिहास' },
      { en: 'High visceral fat, metabolic syndrome, or fatty liver', hi: 'फैटी लिवर या मेटाबोलिक सिंड्रोम' },
    ],
    clinicalApproach: [
      { en: 'Insulin resistance scoring and lipid assessment', hi: 'इंसुलिन प्रतिरोध जांच और लिपिड मूल्यांकन' },
      { en: 'Gradual nutritional restructuring without crash diets', hi: 'संतुलित और व्यावहारिक पोषण योजना' },
      { en: 'Quarterly glycemic surveillance', hi: 'हर तीन महीने में निगरानी' },
    ],
    status: 'verified',
  },
  {
    id: 'srv-education',
    slug: 'education',
    title: { en: 'Patient Education & CGM Training', hi: 'रोगी शिक्षा एवं निरंतर ग्लूकोज मॉनिटरिंग' },
    shortDescription: {
      en: 'Empowering patients with sensor-based glucose analytics (AGP), carbohydrate counting, and self-care skills.',
      hi: 'सेंसर-आधारित तकनीक (CGM) और कार्ब-काउंटिंग के जरिए रोगियों को सशक्त बनाना।',
    },
    fullDescription: {
      en: 'Modern continuous glucose sensors reveal hidden daytime spikes and silent nocturnal hypoglycemia, giving actionable clarity.',
      hi: 'आधुनिक सेंसर तकनीक छिपे हुए शुगर स्पाइक्स और रात के उतार-चढ़ाव की सटीक पहचान कराती है।',
    },
    category: 'monitoring',
    indications: [
      { en: 'Unexplained glucose swings despite strict diet', hi: 'कड़े आहार के बावजूद शुगर का अचानक बदलना' },
      { en: 'Fear of nighttime low blood sugars (hypoglycemia)', hi: 'रात में शुगर कम होने का भय' },
      { en: 'Active lifestyle professionals needing flexible control', hi: 'सक्रिय जीवनशैली वाले पेशेवर' },
    ],
    clinicalApproach: [
      { en: 'Ambulatory Glucose Profile (AGP) sensor application guidance', hi: 'सेंसर लगाने और ऐप से कनेक्ट करने की सहायता' },
      { en: 'Detailed physician interpretation of Time in Range (TIR)', hi: 'टाइम इन रेंज (TIR) रिपोर्ट की समीक्षा' },
      { en: 'Carb-to-insulin ratio personalization', hi: 'भोजन और इंसुलिन का अनुपात निर्धारित करना' },
    ],
    status: 'verified',
  },
  {
    id: 'srv-lifestyle',
    slug: 'lifestyle',
    title: { en: 'Cardiometabolic & Lifestyle Guidance', hi: 'हृदय-चयापचय एवं जीवनशैली मार्गदर्शन' },
    shortDescription: {
      en: 'Coordinated lifestyle and medical management reducing cardiovascular, renal, and microvascular risks.',
      hi: 'हृदय, गुर्दे और रक्त वाहिकाओं की सुरक्षा के लिए जीवनशैली सुधार।',
    },
    fullDescription: {
      en: 'Evidence shows diabetes outcomes depend on blood pressure, lipids, and renal integrity as much as blood sugar numbers.',
      hi: 'मधुमेह के सफल उपचार में ब्लड शुगर के साथ-साथ रक्तचाप और लिपिड का संतुलन भी आवश्यक है।',
    },
    category: 'lifestyle',
    indications: [
      { en: 'Co-existing hypertension or dyslipidemia', hi: 'उच्च रक्तचाप या कोलेस्ट्रॉल की समस्या' },
      { en: 'Sedentary occupation and chronic stress', hi: 'तनाव और शारीरिक निष्क्रियता' },
    ],
    clinicalApproach: [
      { en: 'Tailored physical activity prescriptions (aerobic + resistance)', hi: 'उचित व्यायाम की व्यक्तिगत सलाह' },
      { en: 'Cardiovascular risk factor profiling', hi: 'हृदय स्वास्थ्य की संपूर्ण जांच' },
    ],
    status: 'verified',
  },
  {
    id: 'srv-complications',
    slug: 'complications',
    title: { en: 'Complication Screening & Organ Preservation', hi: 'जटिलताओं की जांच एवं अंग संरक्षण' },
    shortDescription: {
      en: 'Early detection of diabetic nephropathy, peripheral neuropathy, and retinopathy risks before symptoms emerge.',
      hi: 'गुर्दे, नसों और आंखों की सूक्ष्म जांच ताकि समय रहते जटिलताओं से बचा जा सके।',
    },
    fullDescription: {
      en: 'Preventive screening through annual urine albumin-to-creatinine ratio (uACR), sensory foot testing, and specialist referrals.',
      hi: 'यूरिन प्रोटीन, न्यूरोपैथी जांच और विशेषज्ञ परामर्श से अंगों को सुरक्षित रखा जाता है।',
    },
    category: 'clinical',
    indications: [
      { en: 'Diabetes history greater than 5 years', hi: '5 वर्ष से अधिक समय से मधुमेह' },
      { en: 'Tingling, burning sensation, or numbness in feet', hi: 'पैरों में जलन, झनझनाहट या सुन्नपन' },
      { en: 'Trace protein or foaming in urine', hi: 'पेशाब में झाग या प्रोटीन' },
    ],
    clinicalApproach: [
      { en: 'Semmes-Weinstein monofilament test and biothesiometry', hi: 'मोनोफिलामेंट और वाइब्रेशन सेंसिटिविटी टेस्ट' },
      { en: 'Spot urine albumin-creatinine ratio screening', hi: 'स्पॉट यूरिन एल्ब्यूमिन जांच' },
      { en: 'Kidney-protective medication optimization', hi: 'गुर्दे की रक्षा करने वाली दवाएं' },
    ],
    status: 'verified',
  },
];
