import type { LocalizedString } from '../types';

export interface ProblemTopic {
  id: string;
  slug: string;
  title: LocalizedString;
  symptoms: LocalizedString[];
  recommendedAction: LocalizedString;
  relatedServiceSlug: string;
}

export const PROBLEMS_DATA: ProblemTopic[] = [
  {
    id: 'prob-morning-high',
    slug: 'morning-fasting-spikes',
    title: {
      en: 'High Morning Blood Sugar Despite Not Eating Overnight',
      hi: 'रात भर न खाने के बावजूद सुबह की शुगर बहुत अधिक आना',
    },
    symptoms: [
      { en: 'Fasting glucose above 150 mg/dL upon waking', hi: 'जागने पर फास्टिंग शुगर 150 से अधिक' },
      { en: 'Morning headaches, fatigue, or dry mouth', hi: 'सुबह सिरदर्द, थकान या सूखा मुंह' },
    ],
    recommendedAction: {
      en: 'Requires distinction between Dawn Phenomenon (hormonal surge) and Somogyi Effect (rebound from silent night lows). Continuous glucose monitoring (CGM) provides definitive diagnosis.',
      hi: 'यह डाउन फेनोमेनन या सोमोजी इफेक्ट हो सकता है। 14 दिन का सीजीएम सेंसर सटीक कारण बताता है।',
    },
    relatedServiceSlug: 'education',
  },
  {
    id: 'prob-burning-feet',
    slug: 'burning-feet-at-night',
    title: {
      en: 'Burning, Stabbing, or Pins-and-Needles in Feet at Bedtime',
      hi: 'रात में पैरों में जलन, सुई चुभना या दर्द होना',
    },
    symptoms: [
      { en: 'Restless feet sensations worsening when covered by bedsheets', hi: 'चादर छूने पर भी पैरों में अजीब अहसास या जलन' },
      { en: 'Numbness or reduced sensitivity to hot bath water', hi: 'तापमान का अहसास कम होना' },
    ],
    recommendedAction: {
      en: 'Indicates diabetic peripheral neuropathy. Immediate biothesiometry sensory screening and neuroprotective glycemic stabilization advised.',
      hi: 'यह डायबिटिक न्यूरोपैथी का लक्षण है। नसों की संवेदनशीलता की जांच कराएं।',
    },
    relatedServiceSlug: 'complications',
  },
  {
    id: 'prob-weight-plateau',
    slug: 'unresponsive-weight-struggle',
    title: {
      en: 'Inability to Lose Abdominal Weight Despite Reduced Diet',
      hi: 'कम खाने के बाद भी पेट की चर्बी और वजन कम न होना',
    },
    symptoms: [
      { en: 'High waist-to-hip ratio and midsection fatigue', hi: 'कमर के घेरे में लगातार वृद्धि' },
      { en: 'Frequent post-meal energy crashes and sugar cravings', hi: 'खाना खाने के बाद सुस्ती और मीठा खाने की तलब' },
    ],
    recommendedAction: {
      en: 'Underlying hyperinsulinemia traps energy in fat cells. Comprehensive fasting insulin and metabolic review recommended.',
      hi: 'इंसुलिन प्रतिरोध चर्बी को जलने नहीं देता। मेटाबोलिक जांच और व्यक्तिगत योजना आवश्यक है।',
    },
    relatedServiceSlug: 'prediabetes',
  },
];
