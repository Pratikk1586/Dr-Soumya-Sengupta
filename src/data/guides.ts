import type { PatientGuide } from '../types';

export const GUIDES_DATA: PatientGuide[] = [
  {
    id: 'guide-lifestyle',
    slug: 'diabetes-lifestyle-guide',
    title: {
      en: 'Patient Guide: Practical Diabetes Lifestyle & Meal Balance',
      hi: 'मरीज मार्गदर्शिका: व्यावहारिक डायबिटीज जीवनशैली एवं भोजन संतुलन',
    },
    summary: {
      en: 'A foundational everyday guide on structuring meals, managing glycemic excursions, and integrating physical activity safely.',
      hi: 'दैनिक भोजन को संतुलित करने, शुगर स्पाइक्स रोकने और सुरक्षित व्यायाम के व्यावहारिक नियम।',
    },
    steps: [
      {
        en: 'Adopt the Plate Method: 50% non-starchy vegetables, 25% lean protein, 25% complex whole grains',
        hi: 'प्लेट विधि अपनाएं: 50% हरी सब्जियां, 25% प्रोटीन, 25% साबुत अनाज',
      },
      {
        en: 'Incorporate 20–30 minutes of brisk post-meal walking to enhance muscle glucose uptake',
        hi: 'भोजन के बाद 20-30 मिनट टहलें ताकि मांसपेशियां सीधे ग्लूकोज का उपयोग कर सकें',
      },
      {
        en: 'Maintain regular meal intervals to avoid extreme glucose dips and subsequent rebound eating',
        hi: 'नियमित समय पर भोजन करें ताकि शुगर में अत्यधिक गिरावट न आए',
      },
      {
        en: 'Hydrate adequately throughout the day with plain water; avoid sugar-sweetened beverages and commercial fruit juices',
        hi: 'दिन भर पर्याप्त सादा पानी पिएं; मीठे पेय और डिब्बाबंद जूस से बचें',
      },
    ],
    emergencyWarning: {
      en: 'Never skip meals when taking insulin or sulfonylurea secretagogues without medical guidance.',
      hi: 'इंसुलिन या दवा लेने पर कभी भी भोजन न छोड़ें।',
    },
    downloadUrl: '/guides/diabetes-lifestyle-guide.pdf',
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'guide-monitoring',
    slug: 'blood-sugar-monitoring-guide',
    title: {
      en: 'Patient Guide: Structured Blood Sugar & CGM Monitoring',
      hi: 'मरीज मार्गदर्शिका: ग्लूकोज एवं सीजीएम की सही निगरानी',
    },
    summary: {
      en: 'Best practices for recording fasting and post-prandial readings, sensor care, and preventing finger prick errors.',
      hi: 'फास्टिंग और भोजन के बाद शुगर की सही जांच, ग्लूकोमीटर के नियम और सेंसर की देखभाल।',
    },
    steps: [
      {
        en: 'Wash hands thoroughly with warm water and soap; dry completely before pricking (avoid fruit-scented lotions)',
        hi: 'जांच से पहले हाथ अच्छी तरह साबुन से धोएं और सुखाएं',
      },
      {
        en: 'Test exactly 2 hours after the start of meals for consistent post-prandial records',
        hi: 'भोजन शुरू करने के ठीक 2 घंटे बाद पीपी शुगर की जांच करें',
      },
      {
        en: 'Keep a structured log of glucose values paired with meal notes for clinical review',
        hi: 'शुगर के मान के साथ भोजन का संक्षिप्त विवरण डायरी में दर्ज करें',
      },
      {
        en: 'Calibrate or cross-verify CGM trend arrows during sudden shifts before taking rapid insulin corrective doses',
        hi: 'तेजी से बदलते शुगर स्तर पर सुधारात्मक इंसुलिन लेने से पहले रक्त जांच से पुष्टि करें',
      },
    ],
    emergencyWarning: {
      en: 'If glucose drops below 70 mg/dL, initiate the Rule of 15 immediately.',
      hi: 'यदि शुगर 70 से कम आए तो तुरंत 15 ग्राम चीनी लेकर आराम करें।',
    },
    downloadUrl: '/guides/blood-sugar-monitoring-guide.pdf',
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'guide-appointment-prep',
    slug: 'appointment-preparation-guide',
    title: {
      en: 'Patient Guide: Preparing for Your Diabetology Consultation',
      hi: 'मरीज मार्गदर्शिका: डॉक्टर परामर्श से पूर्व तैयारी',
    },
    summary: {
      en: 'Checklist of clinical records, prescription history, and personal questions to maximize your time with Dr. Sengupta.',
      hi: 'परामर्श को सार्थक बनाने के लिए आवश्यक रिपोर्ट्स, दवाओं की सूची और प्रश्नों की चेकलिस्ट।',
    },
    steps: [
      {
        en: 'Assemble all previous 6 months of lab reports: HbA1c, fasting/PP glucose, lipid profile, and urine uACR',
        hi: 'पिछले 6 महीनों की सभी लैब टेस्ट रिपोर्ट्स एक फाइल में व्यवस्थित करें',
      },
      {
        en: 'Bring actual medication boxes or strips (including vitamins and Ayurvedic products) to prevent dosage confusion',
        hi: 'सभी चालू दवाओं के मूल पत्ते या डिब्बे साथ लाएं',
      },
      {
        en: 'Write down your 3 most pressing clinical questions or symptoms experienced over the past month',
        hi: 'अपने 3 सबसे मुख्य प्रश्न या समस्याएं पहले से लिखकर रखें',
      },
      {
        en: 'Note down your daily sleep patterns and recent stress levels as these significantly influence glycemic variability',
        hi: 'नींद और तनाव के स्तर को भी दर्ज करें क्योंकि ये शुगर पर सीधा असर डालते हैं',
      },
    ],
    downloadUrl: '/guides/appointment-preparation-guide.pdf',
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'guide-general-foot-care',
    slug: 'daily-diabetic-foot-inspection-guide',
    title: {
      en: 'Patient Guide: General Foot Care & Neuropathy Protection',
      hi: 'मरीज मार्गदर्शिका: सामान्य पैरों की देखभाल एवं न्यूरोपैथी सुरक्षा',
    },
    summary: {
      en: 'A protective 3-minute daily inspection protocol for individuals with diabetes to prevent unnoticed microvascular blisters.',
      hi: 'पैरों के घाव और छालों से बचने के लिए दैनिक जांच का 3 मिनट का सरल तरीका।',
    },
    steps: [
      {
        en: 'Inspect soles and heels daily using a handheld mirror under good illumination',
        hi: 'दर्पण की सहायता से पैरों के तलवों और एड़ियों की रोज जांच करें',
      },
      {
        en: 'Never walk barefoot indoors or outdoors; inspect shoe insides for small debris before slipping on',
        hi: 'कभी भी नंगे पैर न चलें; जूते पहनने से पहले अंदर हाथ फेरकर देखें',
      },
      {
        en: 'Moisturize dry heels daily, but keep the skin between toes dry to avoid fungal fissures',
        hi: 'एड़ियों पर मॉइस्चराइजर लगाएं, पर उंगलियों के बीच की जगह सूखी रखें',
      },
      {
        en: 'Wear seamless, moisture-wicking cotton socks without tight elastic bands that compromise peripheral blood flow',
        hi: 'बिना सख्त इलास्टिक वाले सूती मोज़े पहनें ताकि रक्त संचार बाधित न हो',
      },
    ],
    emergencyWarning: {
      en: 'Any non-healing blister, black discoloration, or persistent numbness requires prompt clinical attention.',
      hi: 'किसी भी न भरने वाले छाले या कालेपन पर तुरंत डॉक्टर को दिखाएं।',
    },
    downloadUrl: '/guides/diabetic-foot-care-guide.pdf',
    reviewStatus: 'draft',
    status: 'verified',
  },
];
