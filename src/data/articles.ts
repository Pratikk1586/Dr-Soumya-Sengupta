import type { Article } from '../types';

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-hba1c',
    slug: 'understanding-hba1c',
    title: {
      en: 'Demystifying HbA1c: Why Your 3-Month Average Matters More Than Daily Fluctuations',
      hi: 'HbA1c को समझें: दैनिक उतार-चढ़ाव की तुलना में 3 महीने का औसत क्यों महत्वपूर्ण है?',
    },
    excerpt: {
      en: 'Learn how glucose binds to hemoglobin proteins and why keeping this value stable protects kidneys, nerves, and vision.',
      hi: 'जानें कि ग्लूकोज लाल रक्त कोशिकाओं से कैसे जुड़ता है और यह जांच अंगों की सुरक्षा के लिए क्यों जरूरी है।',
    },
    category: { en: 'Diagnostics & Testing', hi: 'जांच एवं निदान' },
    readTimeMinutes: 4,
    contentParagraphs: [
      {
        en: 'A standard capillary fingerprick test is a snapshot of a single point in time, affected by recent stress or food. In contrast, the Glycated Hemoglobin (HbA1c) test captures the full ambient glucose history over 90 to 120 days.',
        hi: 'ग्लूकोमीटर की जांच केवल उस समय का हाल बताती है। लेकिन HbA1c पिछले 3 महीनों की पूरी तस्वीर प्रस्तुत करता है।',
      },
      {
        en: 'When excess glucose circulates in the bloodstream, it permanently attaches to hemoglobin inside red blood cells. The higher your blood glucose, the greater the percentage of glycated hemoglobin.',
        hi: 'रक्त में जितना अधिक ग्लूकोज होगा, HbA1c उतना ही अधिक होगा।',
      },
      {
        en: 'Clinical trials demonstrate that every 1% drop in HbA1c substantially decreases microvascular complication risks in kidneys, eyes, and peripheral nerves.',
        hi: 'HbA1c में प्रत्येक 1% की कमी से आंखों, गुर्दों और नसों के नुकसान का खतरा बहुत कम हो जाता है।',
      },
    ],
    keyTakeaways: [
      { en: 'HbA1c reflects 2-3 months of ambient glucose', hi: 'HbA1c 2-3 महीने के औसत नियंत्रण को दर्शाता है' },
      { en: 'Normal target is below 5.7%; prediabetes is 5.7-6.4%', hi: 'सामान्य 5.7% से कम; प्रीडायबिटीज 5.7-6.4% है' },
      { en: 'Targets are always personalized to avoid hypoglycemia', hi: 'सुरक्षित सीमा डॉक्टर द्वारा रोगी अनुसार तय की जाती है' },
    ],
    reviewStatus: 'draft',
    publishedAt: '2026-09-15',
    status: 'verified',
  },
  {
    id: 'art-hypoglycemia',
    slug: 'managing-low-blood-sugar',
    title: {
      en: 'Recognizing Hypoglycemia: Safe Emergency Recovery with the Rule of 15',
      hi: 'हाइपोग्लाइसीमिया को पहचानें: "15 के नियम" से सुरक्षित प्राथमिक उपचार',
    },
    excerpt: {
      en: 'Immediate steps for treating blood glucose drops below 70 mg/dL without causing severe rebound hyperglycemia.',
      hi: 'शुगर 70 mg/dL से नीचे जाने पर तत्काल प्राथमिक उपचार के सरल और सुरक्षित उपाय।',
    },
    category: { en: 'Patient Safety', hi: 'मरीज सुरक्षा' },
    readTimeMinutes: 5,
    contentParagraphs: [
      {
        en: 'Hypoglycemia is defined as blood glucose dropping below 70 mg/dL. While chronic high blood sugar damages organs over years, acute low blood sugar requires immediate intervention.',
        hi: 'जब ब्लड शुगर 70 mg/dL से नीचे चली जाए तो यह स्थिति तत्काल ध्यान देने योग्य होती है।',
      },
      {
        en: 'The internationally recognized "Rule of 15" recommends: consume exactly 15 grams of fast-acting carbohydrate (e.g. 3 teaspoons of sugar dissolved in water or half cup of fruit juice), rest for 15 minutes, then recheck glucose.',
        hi: '15 का नियम: 15 ग्राम सरल चीनी लें (जैसे 3 चम्मच चीनी पानी में), 15 मिनट आराम करें और फिर जांचें।',
      },
    ],
    keyTakeaways: [
      { en: 'Always carry glucose tablets if taking insulin', hi: 'इंसुलिन लेने वाले मरीज हमेशा पास में ग्लूकोज रखें' },
      { en: 'Avoid oily sweets or chocolates for rescue—fats delay sugar absorption', hi: 'चॉकलेट या तली हुई मिठाई न लें, वसा से अवशोषण धीमा होता है' },
    ],
    reviewStatus: 'draft',
    publishedAt: '2026-09-20',
    status: 'verified',
  },
];
