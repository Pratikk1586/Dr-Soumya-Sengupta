import type { Doctor } from '../types';
import { CONTENT_TO_BE_VERIFIED_MARKER } from './_placeholders';

export const DOCTOR_DATA: Doctor = {
  id: 'dr-soumya-sengupta',
  name: {
    en: 'Dr. Soumya Sengupta',
    hi: 'डॉ. सौम्य सेनगुप्ता',
  },
  title: {
    en: 'Consultant Diabetologist & Metabolic Physician',
    hi: 'वरिष्ठ मधुमेह रोग विशेषज्ञ एवं मेटाबोलिक फिजिशियन',
  },
  tagline: {
    en: 'Precision Diabetology • Continuous Glucose Monitoring • Organ Protection',
    hi: 'सटीक मधुमेह विज्ञान • निरंतर ग्लूकोज मॉनिटरिंग • अंग सुरक्षा',
  },
  shortBio: {
    en: 'Specialist physician providing evidence-based glycemic control, personalized diabetes reversal pathways, and cardiovascular-renal protection.',
    hi: 'प्रमाण-आधारित ग्लूकोज नियंत्रण, व्यक्तिगत मधुमेह प्रबंधन और हृदय-गुर्दे की सुरक्षा प्रदान करने वाले विशेषज्ञ चिकित्सक।',
  },
  fullBio: [
    {
      en: 'Dr. Soumya Sengupta is a senior consultant diabetologist dedicated to evidence-based, compassionate metabolic medicine.',
      hi: 'डॉ. सौम्य सेनगुप्ता एक वरिष्ठ परामर्शदाता डायबेटोलॉजिस्ट हैं जो प्रमाण-आधारित और समग्र मधुमेह चिकित्सा के प्रति समर्पित हैं।',
    },
    {
      en: 'His practice integrates modern technology—including Continuous Glucose Monitoring (CGM) and Ambulatory Glucose Profile (AGP) analytics—with sustainable lifestyle interventions.',
      hi: 'उनकी चिकित्सा पद्धति आधुनिक तकनीक—जिसमें निरंतर ग्लूकोज मॉनिटरिंग (CGM) शामिल है—को स्वस्थ जीवनशैली से जोड़ती है।',
    },
  ],
  qualifications: [
    {
      id: 'q-1',
      degree: { en: `${CONTENT_TO_BE_VERIFIED_MARKER} MBBS`, hi: `${CONTENT_TO_BE_VERIFIED_MARKER} एमबीबीएस` },
      institution: { en: `${CONTENT_TO_BE_VERIFIED_MARKER} Medical College, Kolkata`, hi: `${CONTENT_TO_BE_VERIFIED_MARKER} मेडिकल कॉलेज, कोलकाता` },
      year: '2008',
      status: 'placeholder',
    },
    {
      id: 'q-2',
      degree: { en: `${CONTENT_TO_BE_VERIFIED_MARKER} MD (General Medicine)`, hi: `${CONTENT_TO_BE_VERIFIED_MARKER} एमडी (जनरल मेडिसिन)` },
      institution: { en: `${CONTENT_TO_BE_VERIFIED_MARKER} IPGMER, Kolkata`, hi: `${CONTENT_TO_BE_VERIFIED_MARKER} आईपीजीएमईएंडआर, कोलकाता` },
      year: '2012',
      status: 'placeholder',
    },
    {
      id: 'q-3',
      degree: { en: `${CONTENT_TO_BE_VERIFIED_MARKER} PG Diploma / Fellowship in Diabetology`, hi: `${CONTENT_TO_BE_VERIFIED_MARKER} पीजी डिप्लोमा इन डायबेटोलॉजी` },
      institution: { en: `${CONTENT_TO_BE_VERIFIED_MARKER} Recognized Medical Board`, hi: `${CONTENT_TO_BE_VERIFIED_MARKER} मेडिकल बोर्ड` },
      year: '2014',
      status: 'placeholder',
    },
  ],
  experiences: [
    {
      id: 'exp-1',
      role: { en: 'Consultant Diabetologist', hi: 'वरिष्ठ डायबेटोलॉजिस्ट' },
      organization: { en: `${CONTENT_TO_BE_VERIFIED_MARKER} Salt Lake Diabetes Chamber`, hi: `${CONTENT_TO_BE_VERIFIED_MARKER} साल्ट लेक डायबिटीज़ चेंबर` },
      period: { en: '2014 – Present', hi: '2014 – वर्तमान' },
      status: 'placeholder',
    },
    {
      id: 'exp-2',
      role: { en: 'Visiting Consultant Physician', hi: 'विजिटिंग कंसल्टेंट' },
      organization: { en: `${CONTENT_TO_BE_VERIFIED_MARKER} Kolkata Specialty Hospitals`, hi: `${CONTENT_TO_BE_VERIFIED_MARKER} कोलकाता स्पेशलिटी हॉस्पिटल्स` },
      period: { en: '2016 – Present', hi: '2016 – वर्तमान' },
      status: 'placeholder',
    },
  ],
  memberships: [
    { en: 'Research Society for the Study of Diabetes in India (RSSDI)', hi: 'आरएसएसडीआई (RSSDI)' },
    { en: 'Association of Physicians of India (API)', hi: 'एसोसिएशन ऑफ फिजिशियंस ऑफ इंडिया (API)' },
    { en: 'Endocrine Society of India (ESI)', hi: 'एंडोक्राइन सोसाइटी ऑफ इंडिया' },
  ],
  specialties: [
    { en: 'Type 2 Diabetes Remission Protocols', hi: 'टाइप 2 मधुमेह रेमिशन प्रोटोकॉल' },
    { en: 'Continuous Glucose Monitoring (CGM / AGP)', hi: 'निरंतर ग्लूकोज मॉनिटरिंग (CGM)' },
    { en: 'Insulin Optimization & Type 1 Care', hi: 'इंसुलिन अनुकूलन और टाइप 1 देखभाल' },
    { en: 'Gestational Diabetes Mellitus (GDM)', hi: 'गर्भावस्था में मधुमेह' },
    { en: 'Diabetic Nephropathy & Cardio-Protection', hi: 'गुर्दे एवं हृदय संबंधी सुरक्षा' },
    { en: 'Diabetic Neuropathy & Foot Screening', hi: 'डायबिटिक फुट केयर एवं न्यूरोपैथी जांच' },
  ],
  clinicalPhilosophy: {
    en: 'Diabetes management is about restoring confidence and protecting long-term organ health through personalized, compassionate guidance.',
    hi: 'मधुमेह प्रबंधन का उद्देश्य व्यक्तिगत और सहानुभूतिपूर्ण मार्गदर्शन द्वारा आत्मविश्वास जगाना और अंगों के दीर्घकालिक स्वास्थ्य की रक्षा करना है।',
  },
  languagesSpoken: [
    { en: 'English', hi: 'अंग्रेजी' },
    { en: 'Hindi', hi: 'हिन्दी' },
    { en: 'Bengali', hi: 'বাংলা' },
  ],
  registrationNumber: `${CONTENT_TO_BE_VERIFIED_MARKER} WBMC-XXXXX`,
  registrationStatus: 'placeholder',
};
