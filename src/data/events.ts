import type { LocalizedString } from '../types';
import { CLINIC_IMAGES } from '../config/images';

export interface ClinicEvent {
  id: string;
  title: LocalizedString;
  date: string;
  location: LocalizedString;
  category: 'health_camp' | 'conference' | 'awareness' | 'workshop';
  description: LocalizedString;
  keyHighlights: LocalizedString[];
  image: string;
  galleryImages?: string[];
}

export const EVENTS_DATA: ClinicEvent[] = [
  {
    id: 'event-health-camp-chaibasa',
    title: {
      en: 'Community Prediabetes & Glycemic Screening Camp',
      hi: 'सामुदायिक प्रीडायबिटीज एवं ग्लूकोज जांच शिविर',
    },
    date: '2025-11-14',
    location: {
      en: 'Cardio Diabetic Clinic, Amlatola, Chaibasa',
      hi: 'कार्डियो डायबिटिक क्लिनिक, अमलाटोला, चाईबासा',
    },
    category: 'health_camp',
    description: {
      en: 'A free community initiative dedicated to early diabetes detection. Senior citizens and families received point-of-care blood sugar checks, biothesiometry foot sensory tests, and simple nutritional counseling.',
      hi: 'मधुमेह की शुरुआती पहचान के लिए आयोजित निःशुल्क शिविर। वरिष्ठ नागरिकों एवं परिवारों की ब्लड शुगर जांच, पैरों की संवेदनशीलता परीक्षण और पोषण संबंधी सलाह प्रदान की गई।',
    },
    keyHighlights: [
      { en: 'Free random and fasting blood glucose screenings', hi: 'निःशुल्क फास्टिंग एवं रैंडम ब्लड शुगर जांच' },
      { en: 'Non-invasive sensory monofilament foot assessments', hi: 'पैरों की नसों की सुरक्षित एवं सरल जांच' },
      { en: 'Individual educational guidance on daily diet and hydration', hi: 'दैनिक आहार और पानी के महत्व पर परामर्श' },
    ],
    image: '/assets/achievements/newspaper-3.webp',
    galleryImages: [
      '/assets/achievements/newspaper-3.webp',
      '/assets/achievements/cert-cgm.webp',
    ],
  },
  {
    id: 'event-ccdsi-speaker',
    title: {
      en: 'CCDSI Conference — Speaker on Stage',
      hi: 'सीसीडीएसआई सम्मेलन — मंच पर मुख्य वक्ता',
    },
    date: '2026-02-20',
    location: {
      en: 'CCDSI National Diabetology Forum',
      hi: 'सीसीडीएसआई राष्ट्रीय मंच',
    },
    category: 'conference',
    description: {
      en: 'Dr. Soumya Sengupta addressing clinicians and delegates as an invited conference speaker on stage at CCDSI.',
      hi: 'सीसीडीएसआई सम्मेलन में आमंत्रित वक्ता के रूप में मंच से विशेषज्ञ व्याख्यान देते हुए डॉ. सौम्य सेनगुप्ता।',
    },
    keyHighlights: [
      { en: 'Clinical address on advances in cardiometabolic medicine', hi: 'कार्डियोमेटाबोलिक चिकित्सा में नवीन प्रगति पर व्याख्यान' },
      { en: 'Early diagnosis protocols for microvascular complications', hi: 'माइक्रोवैस्कुलर जटिलताओं की शुरुआती पहचान' },
      { en: 'Interactive academic session with regional physicians', hi: 'चिकित्सकों के साथ शैक्षणिक संवाद' },
    ],
    image: CLINIC_IMAGES.ccdsiConference,
    galleryImages: [
      CLINIC_IMAGES.ccdsiConference,
    ],
  },
  {
    id: 'event-rssdi-keynote',
    title: {
      en: 'RSSDI JHCON 2026 Presentation & Academic Lecture',
      hi: 'आरएसएसडीआई झारखण्ड 2026 प्रस्तुति एवं व्याख्यान',
    },
    date: '2026-01-18',
    location: {
      en: 'State Medical Diabetology Conference',
      hi: 'राज्य स्तरीय डायबिटोलॉजी सम्मेलन',
    },
    category: 'conference',
    description: {
      en: 'Dr. Soumya Sengupta presented clinical insights on protecting vital organs (heart and kidneys) in individuals living with long-standing Type 2 diabetes.',
      hi: 'डॉ. सौम्य सेनगुप्ता ने दीर्घकालिक टाइप 2 मधुमेह में महत्वपूर्ण अंगों (हृदय एवं गुर्दे) की सुरक्षा पर आधुनिक चिकित्सकीय अनुभव साझा किए।',
    },
    keyHighlights: [
      { en: 'Discussion on early kidney protection protocols', hi: 'गुर्दे की शुरुआती सुरक्षा प्रोटोकॉल पर चर्चा' },
      { en: 'Review of Time in Range (TIR) from continuous glucose monitoring', hi: 'कंटीन्यूअस ग्लूकोज मॉनिटरिंग के लाभ' },
      { en: 'Stage presentation and academic felicitation ceremony', hi: 'मंच प्रस्तुति एवं अकादमिक सम्मान' },
    ],
    image: CLINIC_IMAGES.rssdiJhconAward,
    galleryImages: [
      CLINIC_IMAGES.rssdiJhconAward,
      CLINIC_IMAGES.ccdsiConference,
    ],
  },
  {
    id: 'event-foot-screening-workshop',
    title: {
      en: 'Diabetic Foot Care & Sensory Awareness Workshop',
      hi: 'डायबिटिक फुट केयर एवं संवेदना जागरूकता कार्यशाला',
    },
    date: '2025-12-05',
    location: {
      en: 'Cardio Diabetic Clinic, Chaibasa',
      hi: 'कार्डियो डायबिटिक क्लिनिक, चाईबासा',
    },
    category: 'workshop',
    description: {
      en: 'A practical educational session for patients and caregivers on daily foot inspection, comfortable footwear choices, and preventing minor cuts from escalating.',
      hi: 'मरीजों और उनके परिजनों के लिए व्यावहारिक कार्यशाला, जिसमें पैरों की दैनिक देखभाल, सही जूते के चयन और घावों से बचाव के सरल तरीके सिखाए गए।',
    },
    keyHighlights: [
      { en: 'Step-by-step guidance on daily mirror foot checks at home', hi: 'घर पर पैरों की दैनिक जांच के आसान तरीके' },
      { en: 'Tips on gentle skin moisturizing and safe nail trimming', hi: 'त्वचा की देखभाल और सुरक्षित नाखून काटने की सलाह' },
      { en: 'Understanding when to show minor sores to the clinic immediately', hi: 'घाव या छाले होने पर तुरंत डॉक्टर से मिलने के संकेत' },
    ],
    image: '/assets/achievements/cert-advance-diabetes.webp',
    galleryImages: [
      '/assets/achievements/cert-advance-diabetes.webp',
    ],
  },
];
