import type { Doctor } from '../types';
import { ACHIEVEMENTS_DATA } from './achievements';
import { CERTIFICATIONS_DATA } from './certifications';
import { CLINIC_IMAGES } from '../config/images';

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
    en: 'Dedicated Diabetology & Multi-Organ Protection Since 2007',
    hi: '2007 से समर्पित मधुमेह विज्ञान एवं बहु-अंग सुरक्षा',
  },
  shortBio: {
    en: 'Practicing physician with 19+ years of experience in diabetes care, hypertension, dyslipidemia, thyroid disorders and comprehensive metabolic health, with a focus on early detection, personalised treatment and long-term well-being.',
    hi: 'मधुमेह देखभाल, उच्च रक्तचाप, डिस्लिपिडेमिया, थायराइड विकारों और समग्र मेटाबोलिक स्वास्थ्य में 19+ वर्षों के अनुभव के साथ समर्पित चिकित्सक, जिनका मुख्य ध्यान शीघ्र पहचान, व्यक्तिगत उपचार और दीर्घकालिक स्वास्थ्य पर है।',
  },
  fullBio: [
    {
      en: 'Dr. Soumya Sengupta is a Consultant Diabetologist and Metabolic Physician with over 19 years of experience in diabetes care. Since 2007, he has been dedicated to helping people detect and manage diabetes at an early stage, with a focus on personalised treatment, evidence-based medicine, and long-term health.',
      hi: 'डॉ. सौम्य सेनगुप्ता मधुमेह देखभाल में 19 से अधिक वर्षों के अनुभव के साथ वरिष्ठ डायबेटोलॉजिस्ट और मेटाबोलिक फिजिशियन हैं। 2007 से, वे व्यक्तिगत उपचार, साक्ष्य-आधारित चिकित्सा और दीर्घकालिक स्वास्थ्य पर ध्यान केंद्रित करते हुए, शुरुआती चरण में मधुमेह का पता लगाने और प्रबंधन करने में लोगों की मदद करने के लिए समर्पित हैं।',
    },
    {
      en: 'His clinical practice at Cardio Diabetic Clinic focuses on comprehensive metabolic care — understanding how glucose control, blood pressure, lipid profile, thyroid function and organ health are interconnected to prevent complications and improve quality of life.',
      hi: 'कार्डियो डायबिटिक क्लिनिक में उनका क्लिनिकल अभ्यास समग्र मेटाबोलिक देखभाल पर केंद्रित है—यह समझना कि ग्लूकोज नियंत्रण, रक्तचाप, लिपिड प्रोफाइल, थायराइड कार्यप्रणाली और अंगों का स्वास्थ्य कैसे परस्पर जुड़े हैं ताकि जटिलताओं को रोका जा सके और जीवन की गुणवत्ता में सुधार हो सके।',
    },
    {
      en: 'Under his leadership, regular multi-specialty diabetic screening camps are organized across Chaibasa and surrounding regions of West Singhbhum, Jharkhand to promote early detection and community health.',
      hi: 'उनके नेतृत्व में, पश्चिमी सिंहभूम, झारखंड के चाईबासा और आसपास के क्षेत्रों में शीघ्र पहचान और सामुदायिक स्वास्थ्य को बढ़ावा देने के लिए नियमित बहु-विशेषज्ञता मधुमेह जांच शिविर आयोजित किए जाते हैं।',
    },
  ],
  qualifications: [
    {
      id: 'q-1',
      degree: { en: 'Medical Graduate & Diabetology Training', hi: 'चिकित्सा स्नातक एवं मधुमेह विज्ञान प्रशिक्षण' },
      institution: { en: 'Recognized Medical Institution', hi: 'मान्यता प्राप्त मेडिकल संस्थान' },
      year: '2007',
      status: 'verified',
    },
    {
      id: 'q-2',
      degree: { en: 'Specialist Training in Cardio-Diabetic Medicine', hi: 'कार्डियो-डायबिटिक मेडिसिन में विशेष प्रशिक्षण' },
      institution: { en: 'Clinical Diabetology & Metabolic Care', hi: 'क्लिनिकल डायबेटोलॉजी' },
      year: '2007',
      status: 'verified',
    },
  ],
  experiences: [
    {
      id: 'exp-1',
      role: { en: 'Founder & Consultant Diabetologist', hi: 'संस्थापक एवं वरिष्ठ डायबेटोलॉजिस्ट' },
      organization: { en: 'Cardio Diabetic Clinic, Chaibasa, West Singhbhum, Jharkhand', hi: 'कार्डियो डायबिटिक क्लिनिक, चाईबासा, पश्चिमी सिंहभूम, झारखंड' },
      period: { en: 'Practicing since 2007 (19+ Years in Diabetes Care)', hi: '2007 – वर्तमान (डायबिटीज केयर में 19+ वर्षों का अनुभव)' },
      status: 'verified',
    },
    {
      id: 'exp-2',
      role: { en: 'Director / Lead Physician', hi: 'मुख्य चिकित्सक' },
      organization: { en: 'Community Diabetic Screening & Prevention Initiative, Jharkhand', hi: 'सामुदायिक मधुमेह जांच एवं रोकथाम पहल, झारखंड' },
      period: { en: '2007 – Present', hi: '2007 – वर्तमान' },
      status: 'verified',
    },
  ],
  memberships: [
    { en: 'Research Society for the Study of Diabetes in India (RSSDI)', hi: 'आरएसएसडीआई (RSSDI)' },
    { en: 'Association of Physicians of India (API)', hi: 'एसोसिएशन ऑफ फिजिशियंस ऑफ इंडिया (API)' },
    { en: 'Cardio-Diabetic Clinical Practice Group', hi: 'कार्डियो-डायबिटिक क्लिनिकल प्रैक्टिस ग्रुप' },
  ],
  specialties: [
    { en: 'Diabetes Management (Type 1 & Type 2)', hi: 'मधुमेह प्रबंधन (टाइप 1 एवं टाइप 2)' },
    { en: 'Hypertension & Cardiovascular Risk Reduction', hi: 'उच्च रक्तचाप एवं हृदय जोखिम नियंत्रण' },
    { en: 'Dyslipidemia & Lipid Profile Optimization', hi: 'डिस्लिपिडेमिया एवं कोलेस्ट्रॉल संतुलन' },
    { en: 'Hypothyroidism & Metabolic Endocrine Disorders', hi: 'हाइपोथायरायडिज्म एवं थायराइड विकार' },
    { en: 'Multi-Organ Protection (Kidneys, Eyes, Nerves, Heart)', hi: 'अंग सुरक्षा (गुर्दे, आंखें, नसें, हृदय)' },
    { en: 'Community Diabetic Screening Camps', hi: 'सामुदायिक मधुमेह जांच शिविर' },
  ],
  clinicalPhilosophy: {
    en: '“My goal is to help each patient achieve better health through early detection, individualised care and continuous support.”',
    hi: '“मेरा लक्ष्य शीघ्र पहचान, व्यक्तिगत देखभाल और निरंतर सहयोग के माध्यम से प्रत्येक रोगी को बेहतर स्वास्थ्य प्राप्त करने में मदद करना है।”',
  },
  languagesSpoken: [
    { en: 'English', hi: 'अंग्रेजी' },
    { en: 'Hindi', hi: 'हिन्दी' },
    { en: 'Bengali', hi: 'বাংলা' },
  ],
  registrationNumber: 'Practicing Physician (Reg. since 2007)',
  registrationStatus: 'verified',
  photoUrl: CLINIC_IMAGES.doctorProfile,
  achievements: ACHIEVEMENTS_DATA,
  certifications: CERTIFICATIONS_DATA,
  socialLinks: [
    {
      platform: 'youtube',
      label: { en: 'YouTube', hi: 'यूट्यूब' },
      handle: '@DrSoumyaSengupta',
      url: 'https://youtube.com/@drsoumyasengupta',
      description: { en: 'Patient education videos & diabetes masterclasses', hi: 'स्वास्थ्य मार्गदर्शन एवं शैक्षणिक वीडियो' },
    },
    {
      platform: 'facebook',
      label: { en: 'Facebook', hi: 'फेसबुक' },
      handle: 'DrSoumyaSenguptaClinic',
      url: 'https://facebook.com/drsoumyasengupta',
      description: { en: 'Community health camps, screening drives & clinic notices', hi: 'स्वास्थ्य शिविर एवं क्लिनिक सूचनाएं' },
    },
    {
      platform: 'instagram',
      label: { en: 'Instagram', hi: 'इंस्टाग्राम' },
      handle: '@drsoumyasengupta',
      url: 'https://instagram.com/drsoumyasengupta',
      description: { en: 'Daily blood sugar tips, nutrition & metabolic wellness', hi: 'दैनिक स्वास्थ्य टिप्स और जीवनशैली सलाह' },
    },
    {
      platform: 'whatsapp',
      label: { en: 'WhatsApp', hi: 'व्हाट्सएप' },
      handle: '+91 94311 14510',
      url: 'https://wa.me/919431114510?text=Hello%20Dr.%20Soumya%20Sengupta%2C%20I%20would%20like%20to%20connect%20regarding%20a%20consultation.',
      description: { en: 'Chamber appointment assistance & patient inquiries', hi: 'परामर्श सहायता एवं क्लिनिक पूछताछ' },
    },
  ],
};
