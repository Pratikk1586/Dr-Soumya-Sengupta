import type { Video } from '../types';

export const VIDEOS_DATA: Video[] = [
  {
    id: 'vid-understanding-hba1c',
    title: {
      en: 'Understanding HbA1c: Why Average Glycemia Protects Your Organs',
      hi: 'HbA1c को समझें: 3 महीने का औसत अंगों की सुरक्षा क्यों करता है',
    },
    description: {
      en: 'Dr. Sengupta breaks down how glucose attaches to red blood cell hemoglobin and what target numbers mean for long-term complications.',
      hi: 'डॉ. सेनगुप्ता समझाते हैं कि हीमोग्लोबिन से ग्लूकोज कैसे जुड़ता है और इसका सुरक्षित स्तर क्या होना चाहिए।',
    },
    transcript: {
      en: 'In this session, we discuss the physiological mechanism of protein glycation. While day-to-day finger-pricks reflect recent meals, HbA1c reveals whether your microvascular circulation has experienced sustained stress over 90 days...',
      hi: 'इस वीडियो में हम प्रोटीन ग्लाइकेशन की प्रक्रिया और 90 दिनों के सुरक्षित औसत की महत्ता पर चर्चा करते हैं...',
    },
    durationMinutes: 8,
    youtubeId: '', // Empty = triggers facade placeholder state until Dr. Sengupta uploads URL
    category: { en: 'Understanding HbA1c', hi: 'HbA1c की समझ' },
    status: 'verified',
  },
  {
    id: 'vid-diabetes-lifestyle',
    title: {
      en: 'Diabetes & Lifestyle: Realistic Nutrition Without Extreme Deprivation',
      hi: 'डायबिटीज एवं जीवनशैली: बिना अत्यधिक परहेज के संतुलित पोषण',
    },
    description: {
      en: 'Practical culinary guidance on sequencing meals, balancing traditional carbohydrates, and integrating simple post-meal physical movement.',
      hi: 'भोजन की सही तरकीब, कार्बोहाइड्रेट की संतुलित मात्रा और खाने के बाद टहलने के वैज्ञानिक लाभ।',
    },
    transcript: {
      en: 'Extreme starvation or crash dieting invariably leads to muscle wasting and metabolic slowing. The clinical objective is sustainable satiety through high-fiber leafy vegetables and lean proteins...',
      hi: 'अत्यधिक भूखे रहना नुकसानदेह हो सकता है। लक्ष्य संतुलित और टिकाऊ जीवनशैली अपनाना है...',
    },
    durationMinutes: 10,
    youtubeId: '',
    category: { en: 'Diabetes & Lifestyle', hi: 'डायबिटीज व जीवनशैली' },
    status: 'verified',
  },
  {
    id: 'vid-common-questions',
    title: {
      en: 'Common Diabetes Questions: Dispelling Everyday Fears and Misconceptions',
      hi: 'डायबिटीज के आम सवाल: रोजमर्रा के डर और भ्रमों का वैज्ञानिक समाधान',
    },
    description: {
      en: 'Addressing widespread clinical questions regarding insulin initiation, natural sweeteners (jaggery/honey), and long-term medication safety.',
      hi: 'इंसुलिन, गुड़, शहद और दवाओं से जुड़े आम मरीजों के सवालों के स्पष्ट उत्तर।',
    },
    transcript: {
      en: 'Patients frequently ask whether starting insulin marks a permanent point of failure. On the contrary, timely insulin rests exhausted beta-cells and halts glucotoxic organ damage...',
      hi: 'मरीज अक्सर पूछते हैं कि क्या इंसुलिन एक बार शुरू होने पर कभी बंद नहीं होता। इस मिथक का वैज्ञानिक विश्लेषण...',
    },
    durationMinutes: 9,
    youtubeId: '',
    category: { en: 'Common Diabetes Questions', hi: 'आम सवाल व उत्तर' },
    status: 'verified',
  },
  {
    id: 'vid-understanding-blood-sugar',
    title: {
      en: 'Understanding Blood Sugar: Decoding Spikes, Valleys, and Nighttime Lows',
      hi: 'ब्लड शुगर की समझ: उतार-चढ़ाव और रात में शुगर गिरने के कारण',
    },
    description: {
      en: 'Clinical overview of glycemic variability, the Dawn Phenomenon, and how continuous glucose sensors uncover hidden hypoglycemia.',
      hi: 'ग्लूकोज उतार-चढ़ाव, सुबह की बढ़ी हुई शुगर और रात की लो-शुगर को पहचानने का तरीका।',
    },
    transcript: {
      en: 'Two patients with identical 7.5% HbA1c readings may experience completely different daily volatility. Understanding your glucose swings is the key to preventing daytime fatigue...',
      hi: 'एक ही HbA1c वाले दो मरीजों के दैनिक ग्राफ में जमीन-आसमान का अंतर हो सकता है...',
    },
    durationMinutes: 11,
    youtubeId: '',
    category: { en: 'Understanding Blood Sugar', hi: 'ब्लड शुगर की समझ' },
    status: 'verified',
  },
  {
    id: 'vid-health-awareness',
    title: {
      en: 'Cardiometabolic Health Awareness: Protecting the Kidneys, Heart, and Retina',
      hi: 'स्वास्थ्य जागरूकता: गुर्दों, दिल और आंखों की दीर्घकालिक सुरक्षा',
    },
    description: {
      en: 'Why annual screening for microalbuminuria (uACR) and dilated eye examination must never be delayed in chronic metabolic care.',
      hi: 'वार्षिक किडनी uACR और आंखों के पर्दे की जांच समय पर कराना क्यों अनिवार्य है।',
    },
    transcript: {
      en: 'Chronic microvascular damage occurs quietly without overt pain. Proactive annual screening catches capillary stress years before permanent damage ensues...',
      hi: 'सूक्ष्म नसों की क्षति बिना किसी दर्द के धीरे-धीरे होती है। समय पर जांच ही सबसे बड़ा बचाव है...',
    },
    durationMinutes: 7,
    youtubeId: '',
    category: { en: 'Health Awareness', hi: 'स्वास्थ्य जागरूकता' },
    status: 'verified',
  },
];
