import type { PatientGuide } from '../types';

export const GUIDES_DATA: PatientGuide[] = [
  {
    id: 'guide-fasting-test',
    slug: 'preparing-for-fasting-blood-test',
    title: {
      en: 'Patient Guide: Preparing for Fasting Blood Sugar & Lipid Tests',
      hi: 'मरीज मार्गदर्शिका: फास्टिंग ब्लड शुगर एवं लिपिड टेस्ट की तैयारी',
    },
    summary: {
      en: 'Simple pre-test protocol to avoid false spikes and ensure accurate laboratory results.',
      hi: 'सटीक जांच रिपोर्ट प्राप्त करने के लिए टेस्ट से पूर्व के नियम।',
    },
    steps: [
      { en: 'Maintain an overnight fast of 8 to 10 hours', hi: 'रात में 8 से 10 घंटे का उपवास रखें' },
      { en: 'Drink plain water freely; avoid tea, milk, coffee, or snacks', hi: 'सादा पानी पी सकते हैं; चाय, कॉफी या नाश्ता न लें' },
      { en: 'Take morning diabetes medications only AFTER the blood draw unless directed otherwise', hi: 'सुबह की शुगर की दवा खून देने के बाद ही लें' },
    ],
    emergencyWarning: {
      en: 'If you feel trembling, cold sweats, or dizziness, immediately take sugar and do not continue fasting.',
      hi: 'यदि चक्कर आए या पसीना आए तो तुरंत चीनी लें और उपवास जारी न रखें।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'guide-foot-inspection',
    slug: 'daily-diabetic-foot-inspection',
    title: {
      en: 'Patient Guide: 3-Minute Daily Foot Self-Inspection',
      hi: 'मरीज मार्गदर्शिका: 3 मिनट की दैनिक पैरों की स्व-जांच',
    },
    summary: {
      en: 'A protective routine for individuals with peripheral neuropathy to prevent foot ulcers.',
      hi: 'पैरों के घाव और छालों से बचने के लिए दैनिक जांच का तरीका।',
    },
    steps: [
      { en: 'Inspect the soles of both feet in good lighting using a handheld mirror', hi: 'दर्पण की सहायता से पैरों के तलवों की जांच करें' },
      { en: 'Check between each toe for peeling skin, cracks, or redness', hi: 'उंगलियों के बीच दरार या लाली देखें' },
      { en: 'Never walk barefoot indoors or outdoors; inspect shoe insides for small pebbles before wearing', hi: 'कभी भी नंगे पैर न चलें; जूते पहनने से पहले अंदर हाथ फेरें' },
    ],
    reviewStatus: 'draft',
    status: 'verified',
  },
];
