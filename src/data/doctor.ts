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
    en: 'Practicing since 2007 (19+ Years in Diabetes Care) • Cardio Diabetic Clinic • Comprehensive Metabolic Health',
    hi: '2007 से अभ्यास (डायबिटीज केयर में 19+ वर्षों का अनुभव) • कार्डियो डायबिटिक क्लिनिक • समग्र मेटाबोलिक स्वास्थ्य',
  },
  shortBio: {
    en: 'Practicing physician since 2007 (19+ years in diabetes care) with dedicated clinical expertise in Diabetes, Hypertension, Dyslipidemia, and Hypothyroidism, focusing on early glycemic control and multi-organ protection.',
    hi: '2007 से कार्यरत विशेषज्ञ चिकित्सक (डायबिटीज केयर में 19+ वर्षों का अनुभव), जो मधुमेह, उच्च रक्तचाप, डिस्लिपिडेमिया और हाइपोथायरायडिज्म के शुरुआती नियंत्रण और अंगों की सुरक्षा के लिए समर्पित हैं।',
  },
  fullBio: [
    {
      en: 'Dr. Soumya Sengupta has been practicing since 2007 (19+ years in diabetes care) with a clear mission: to help people detect and manage diabetes at an early stage so they can lead a normal, healthy life forever.',
      hi: 'डॉ. सौम्य सेनगुप्ता 2007 से (डायबिटीज केयर में 19+ वर्षों का अनुभव) एक स्पष्ट मिशन के साथ चिकित्सा सेवा दे रहे हैं: लोगों को शुरुआती चरण में ही मधुमेह की पहचान और नियंत्रण में मदद करना ताकि वे सदैव एक सामान्य और स्वस्थ जीवन जी सकें।',
    },
    {
      en: 'His clinical practice at Cardio Diabetic Clinic addresses the metabolic core—understanding that when glucose passes unutilized through the blood, it risks organ damage to the kidneys, eyes, nerves, heart, and brain.',
      hi: 'कार्डियो डायबिटिक क्लिनिक में उनका क्लिनिकल अभ्यास मेटाबोलिक स्वास्थ्य पर केंद्रित है—यह सुनिश्चित करते हुए कि ग्लूकोज शरीर के अंगों जैसे गुर्दे, आंखें, नसें, हृदय और मस्तिष्क को नुकसान न पहुंचाए।',
    },
    {
      en: 'Under his leadership, regular multi-specialty diabetic screening camps are organized across Chaibasa and surrounding regions of West Singhbhum, Jharkhand to detect diabetes early and guide patients toward comprehensive wellness.',
      hi: 'उनके नेतृत्व में चाईबासा और पश्चिमी सिंहभूम (झारखंड) के आसपास नियमित रूप से बहु-विशेषज्ञता मधुमेह जांच शिविर आयोजित किए जाते हैं ताकि बीमारी की समय पर पहचान कर मरीजों को स्वास्थ्य की ओर लाया जा सके।',
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
    en: 'If diabetes is brought under control at an early stage, one can lead a normal, healthy life forever. Early detection through regular screening protects vital organs and restores metabolic health.',
    hi: 'यदि मधुमेह को शुरुआती चरण में ही नियंत्रित कर लिया जाए, तो व्यक्ति सदैव एक सामान्य और स्वस्थ जीवन जी सकता है। नियमित जांच द्वारा शुरुआती पहचान अंगों की रक्षा करती है।',
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
