import type { NavigationItem } from '../types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'nav-home',
    name: { en: 'Home', hi: 'होम' },
    href: '/',
  },
  {
    id: 'nav-about',
    name: { en: 'Know Your Doctor', hi: 'डॉक्टर परिचय' },
    href: '/about',
    children: [
      {
        name: { en: 'Biography & Philosophy', hi: 'जीवन परिचय एवं दर्शन' },
        href: '/about#overview',
        description: { en: 'Academic background & patient-centered clinical care', hi: 'शैक्षणिक पृष्ठभूमि एवं समग्र दृष्टिकोण' },
      },
      {
        name: { en: 'Medical Qualifications', hi: 'चिकित्सीय योग्यताएं' },
        href: '/about#qualifications',
        description: { en: 'Verified MBBS, MD, and Diabetology credentials', hi: 'एमबीबीएस, एमडी एवं डायबेटोलॉजी डिग्रियां' },
      },
      {
        name: { en: 'Clinical Experience', hi: 'क्लिनिकल अनुभव' },
        href: '/about#experience',
        description: { en: 'Practicing for 19 years in hospital and chamber practice', hi: '19 वर्षों का गहन चिकित्सकीय अनुभव' },
      },
      {
        name: { en: 'Doctor Videos & Masterclasses', hi: 'शैक्षणिक वीडियो' },
        href: '/media/videos',
        description: { en: 'Educational video explanations by Dr. Sengupta', hi: 'डॉक्टर द्वारा समझाए गए स्वास्थ्य वीडियो' },
      },
      {
        name: { en: 'Achievements & Conferences', hi: 'उपलब्धियां एवं सम्मेलन' },
        href: '/media/events',
        description: { en: 'Community screenings, keynotes, and clinical recognitions', hi: 'स्वास्थ्य शिविर एवं शैक्षणिक उपलब्धियां' },
      },
      {
        name: { en: 'Certifications', hi: 'प्रमाणपत्र' },
        href: '/about#certifications',
        description: { en: 'Postgraduate diplomas and verified credentials', hi: 'विशेषज्ञता डिप्लोमा एवं प्रमाणपत्र' },
      },
      {
        name: { en: 'Social Media & Channels', hi: 'सोशल मीडिया एवं चैनल' },
        href: '/about#social-media',
        description: { en: 'YouTube, Facebook, Instagram, and WhatsApp', hi: 'यूट्यूब, फेसबुक, इंस्टाग्राम एवं व्हाट्सएप' },
      },
    ],
  },
  {
    id: 'nav-diabetes-care',
    name: { en: 'Diabetes Care', hi: 'डायबिटीज केयर' },
    href: '/diabetes-care',
    children: [
      {
        name: { en: 'Diabetes Management', hi: 'डायबिटीज प्रबंधन' },
        href: '/diabetes-care/management',
        description: { en: 'What management involves, monitoring, and regular doctor visits', hi: 'नियमित निगरानी एवं व्यक्तिगत देखभाल' },
      },
      {
        name: { en: 'Prediabetes', hi: 'प्री-डायबिटीज' },
        href: '/diabetes-care/prediabetes',
        description: { en: 'Understanding borderline sugar and early lifestyle steps', hi: 'शुरुआती पहचान और सुरक्षित जीवनशैली' },
      },
      {
        name: { en: 'Diabetes Education', hi: 'डायबिटीज शिक्षा' },
        href: '/diabetes-care/education',
        description: { en: 'Learn about blood sugar, HbA1c, and everyday care in simple terms', hi: 'ब्लड शुगर और HbA1c को सरल शब्दों में समझें' },
      },
      {
        name: { en: 'Diabetes & Lifestyle', hi: 'डायबिटीज एवं जीवनशैली' },
        href: '/diabetes-care/lifestyle',
        description: { en: 'Practical everyday guidance on food, activity, and sleep', hi: 'भोजन, व्यायाम और नींद की आसान सलाह' },
      },
      {
        name: { en: 'Diabetes Complications', hi: 'जटिलताओं से बचाव' },
        href: '/diabetes-care/complications',
        description: { en: 'Protecting your eyes, kidneys, heart, and feet through routine checks', hi: 'आंखों, गुर्दों, दिल और पैरों की नियमित सुरक्षा' },
      },
    ],
  },
  {
    id: 'nav-conditions',
    name: { en: 'Conditions', hi: 'रोग एवं समस्याएं' },
    href: '/conditions',
    children: [
      {
        name: { en: 'Diabetes', hi: 'डायबिटीज' },
        href: '/conditions/diabetes',
        description: { en: 'Clear information on blood sugar, common signs, and monitoring', hi: 'डायबिटीज के लक्षण और सामान्य देखभाल' },
      },
      {
        name: { en: 'Thyroid Disorders', hi: 'थायरॉयड विकार' },
        href: '/conditions/thyroid',
        description: { en: 'How the thyroid gland works and when to have levels checked', hi: 'थायरॉयड ग्रंथि और हार्मोनल संतुलन' },
      },
      {
        name: { en: 'Obesity / Weight Management', hi: 'वजन एवं मोटापा प्रबंधन' },
        href: '/conditions/weight-management',
        description: { en: 'Respectful, supportive guidance for sustainable metabolic health', hi: 'स्वस्थ और टिकाऊ वजन प्रबंधन' },
      },
      {
        name: { en: 'Metabolic Health', hi: 'मेटाबोलिक स्वास्थ्य' },
        href: '/conditions/metabolic-health',
        description: { en: 'Connecting blood sugar, blood pressure, cholesterol, and lifestyle', hi: 'ब्लड शुगर, बीपी और कोलेस्ट्रॉल का संबंध' },
      },
      {
        name: { en: 'Other Conditions', hi: 'अन्य एंडोक्राइन विकार' },
        href: '/conditions/other',
        description: { en: 'Additional health topics evaluated at the clinic', hi: 'क्लिनिक में जांची जाने वाली अन्य समस्याएं' },
      },
    ],
  },
  {
    id: 'nav-patient-resources',
    name: { en: 'Patient Resources', hi: 'रोगी संसाधन' },
    href: '/patient-resources',
    children: [
      {
        name: { en: 'Diabetes Knowledge Hub', hi: 'डायबिटीज नॉलेज हब' },
        href: '/patient-resources/diabetes-knowledge-hub',
        description: { en: 'Easy-to-browse learning cards on diabetes and health', hi: 'डायबिटीज पर सरल और सुलभ जानकारी' },
      },
      {
        name: { en: 'Know Your Problem', hi: 'अपनी समस्या समझें' },
        href: '/patient-resources/know-your-problem',
        description: { en: 'Educational guides for common symptoms like thirst and fatigue', hi: 'प्यास, थकान और वजन में बदलाव को समझें' },
      },
      {
        name: { en: 'Understand Your Reports', hi: 'अपनी रिपोर्ट समझें' },
        href: '/patient-resources/understand-your-reports',
        description: { en: 'Plain-English guide to HbA1c, glucose, cholesterol, BP, and BMI', hi: 'HbA1c, शुगर, कोलेस्ट्रॉल और बीपी का अर्थ' },
      },
      {
        name: { en: 'FAQs', hi: 'अक्सर पूछे जाने वाले सवाल' },
        href: '/patient-resources/faqs',
        description: { en: 'Quick, friendly answers to common patient questions', hi: 'रोगियों के आम सवालों के स्पष्ट उत्तर' },
      },
      {
        name: { en: 'Articles', hi: 'चिकित्सीय लेख' },
        href: '/patient-resources/articles',
        description: { en: 'Helpful educational articles written in simple language', hi: 'सरल भाषा में लिखे गए उपयोगी लेख' },
      },
      {
        name: { en: 'Videos', hi: 'शैक्षणिक वीडियो' },
        href: '/patient-resources/videos',
        description: { en: 'Helpful video explanations by the doctor', hi: 'डॉक्टर द्वारा समझाए गए स्वास्थ्य वीडियो' },
      },
      {
        name: { en: 'Patient Guides', hi: 'रोगी मार्गदर्शिका' },
        href: '/patient-resources/guides',
        description: { en: 'Step-by-step everyday self-care guides', hi: 'दैनिक स्व-देखभाल के चरणबद्ध नियम' },
      },
    ],
  },
  {
    id: 'nav-clinic',
    name: { en: 'Our Clinic', hi: 'क्लिनिक' },
    href: '/clinic',
    children: [
      {
        name: { en: 'Clinic Overview', hi: 'क्लिनिक परिचय' },
        href: '/clinic',
        description: { en: 'Chamber details, doctor lead, and patient experience', hi: 'कार्डियो डायबिटिक क्लिनिक का संपूर्ण परिचय' },
      },
      {
        name: { en: 'Consultation Timings', hi: 'परामर्श समय' },
        href: '/clinic/timings',
        description: { en: 'Open all 7 days with verified daily consultation hours', hi: 'सातों दिन खुला — दैनिक ओपीडी समय सारणी' },
      },
      {
        name: { en: 'Location & Directions', hi: 'स्थान एवं दिशा-निर्देश' },
        href: '/clinic/location',
        description: { en: 'Google Maps navigation, postal address, and landmarks', hi: 'गूगल मैप्स लिंक, डाक पता एवं लैंडमार्क' },
      },
      {
        name: { en: 'Clinic Facilities', hi: 'जांच सुविधाएं' },
        href: '/clinic/facilities',
        description: { en: 'On-site glycemic evaluation and diagnostic equipment', hi: 'ऑन-साइट ग्लूकोज एवं कार्डियो जांच' },
      },
      {
        name: { en: 'Clinic Photos & Gallery', hi: 'क्लिनिक तस्वीरें' },
        href: '/media/photos',
        description: { en: 'Consultation rooms, waiting lounge, and chamber photos', hi: 'चेंबर, प्रतीक्षालय एवं क्लिनिक की तस्वीरें' },
      },
      {
        name: { en: 'Health Camps & Events', hi: 'शिविर एवं आयोजन' },
        href: '/media/events',
        description: { en: 'Community health camps and awareness initiatives', hi: 'सामुदायिक स्वास्थ्य शिविर एवं जागरूकता' },
      },
    ],
  },
  {
    id: 'nav-contact',
    name: { en: 'Contact', hi: 'संपर्क' },
    href: '/contact',
  },
];
