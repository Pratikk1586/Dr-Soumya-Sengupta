import type { NavigationItem } from '../types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'nav-home',
    name: { en: 'Home', hi: 'होम' },
    href: '/',
  },
  {
    id: 'nav-about',
    name: { en: 'About Doctor', hi: 'डॉक्टर परिचय' },
    href: '/about',
    children: [
      {
        name: { en: 'Biography & Philosophy', hi: 'जीवन परिचय एवं दर्शन' },
        href: '/about#overview',
        description: { en: 'Academic background & holistic clinical perspective', hi: 'शैक्षणिक पृष्ठभूमि एवं समग्र दृष्टिकोण' },
      },
      {
        name: { en: 'Medical Qualifications', hi: 'चिकित्सीय योग्यताएं' },
        href: '/about#qualifications',
        description: { en: 'Verified MBBS, MD, and Diabetology credentials', hi: 'एमबीबीएस, एमडी एवं डायबेटोलॉजी डिग्रियां' },
      },
      {
        name: { en: 'Clinical Experience', hi: 'क्लिनिकल अनुभव' },
        href: '/about#experience',
        description: { en: 'Over 15 years of dedicated hospital and chamber practice', hi: '15 से अधिक वर्षों का गहन चिकित्सकीय अनुभव' },
      },
      {
        name: { en: 'Areas of Expertise', hi: 'विशेषज्ञता के क्षेत्र' },
        href: '/about#expertise',
        description: { en: 'Type 1, Type 2, CGM, and organ preservation', hi: 'टाइप 1, टाइप 2, सीजीएम एवं अंग सुरक्षा' },
      },
      {
        name: { en: 'Memberships & Societies', hi: 'व्यावसायिक सदस्यताएं' },
        href: '/about#memberships',
        description: { en: 'Life member of RSSDI, API, and Endocrine Society', hi: 'आरएसएसडीआई एवं एपीआई के आजीवन सदस्य' },
      },
    ],
  },
  {
    id: 'nav-diabetes-care',
    name: { en: 'Diabetes Care', hi: 'डायबिटीज़ केयर' },
    href: '/diabetes-care',
    children: [
      {
        name: { en: 'Comprehensive Care', hi: 'व्यापक डायबिटीज़ प्रबंधन' },
        href: '/diabetes-care/management',
        description: { en: 'Individualized glycemic balance & organ health', hi: 'व्यक्तिगत ग्लूकोज नियंत्रण एवं अंग स्वास्थ्य' },
      },
      {
        name: { en: 'Prediabetes & Remission', hi: 'प्री-डायबिटीज एवं रेमिशन' },
        href: '/diabetes-care/prediabetes',
        description: { en: 'Halting disease progression and restoring beta-cell rest', hi: 'रोग प्रगति रोकना और बीटा-सेल संरक्षण' },
      },
      {
        name: { en: 'CGM & Sensor Training', hi: 'सीजीएम (CGM) सेंसर प्रशिक्षण' },
        href: '/diabetes-care/education',
        description: { en: 'Real-time glucose dynamics and Time in Range (TIR)', hi: 'निरंतर ग्लूकोज रीडिंग एवं टाइम इन रेंज' },
      },
      {
        name: { en: 'Cardiometabolic Balance', hi: 'हृदय एवं जीवनशैली संतुलन' },
        href: '/diabetes-care/lifestyle',
        description: { en: 'Nutritional harmony, blood pressure, and lipids', hi: 'पोषण, रक्तचाप एवं लिपिड का संतुलन' },
      },
      {
        name: { en: 'Complication Screening', hi: 'अंग जटिलता जांच एवं रोकथाम' },
        href: '/diabetes-care/complications',
        description: { en: 'Kidney, nerve, and cardiovascular preservation', hi: 'गुर्दे, नसों एवं हृदय की सुरक्षा' },
      },
    ],
  },
  {
    id: 'nav-conditions',
    name: { en: 'Conditions', hi: 'रोग एवं समस्याएं' },
    href: '/conditions',
    children: [
      {
        name: { en: 'All Conditions Overview', hi: 'सभी विकार' },
        href: '/conditions',
        description: { en: 'Clinical conditions managed at the chamber', hi: 'चेंबर में प्रबंधित प्रमुख विकार' },
      },
      {
        name: { en: 'Type 1 & Type 2 Diabetes', hi: 'टाइप 1 एवं टाइप 2 मधुमेह' },
        href: '/conditions/diabetes',
        description: { en: 'Acute and chronic glycemic management', hi: 'तीव्र एवं दीर्घकालिक ग्लूकोज नियंत्रण' },
      },
      {
        name: { en: 'Thyroid Disorders (TSH)', hi: 'थायरॉयड विकार' },
        href: '/conditions/thyroid',
        description: { en: 'Hypothyroidism, hyperthyroidism, and nodule care', hi: 'थायरॉयड ग्रंथि का हार्मोनल संतुलन' },
      },
      {
        name: { en: 'Weight & Obesity Management', hi: 'वजन एवं मोटापा प्रबंधन' },
        href: '/conditions/weight-management',
        description: { en: 'Targeted visceral fat reduction and metabolic medicine', hi: 'आंतरिक चर्बी घटाने की वैज्ञानिक चिकित्सा' },
      },
      {
        name: { en: 'Metabolic Syndrome & Lipids', hi: 'मेटाबोलिक सिंड्रोम एवं लिपिड' },
        href: '/conditions/metabolic-health',
        description: { en: 'Triglycerides, HDL, and vascular protection', hi: 'ट्राइग्लिसराइड्स, एचडीएल एवं संवहनी सुरक्षा' },
      },
      {
        name: { en: 'Other Endocrine Conditions', hi: 'अन्य एंडोक्राइन विकार' },
        href: '/conditions/other',
        description: { en: 'Bone metabolism, pregnancy shifts, and adrenal review', hi: 'हड्डियों की कमजोरी एवं अन्य हार्मोनल समस्याएं' },
      },
    ],
  },
  {
    id: 'nav-patient-resources',
    name: { en: 'Patient Resources', hi: 'रोगी संसाधन' },
    href: '/patient-resources',
    children: [
      {
        name: { en: 'Knowledge Hub', hi: 'संसाधन केंद्र' },
        href: '/patient-resources/knowledge-hub',
        description: { en: 'Central library for diabetes self-education', hi: 'मरीजों के लिए स्वास्थ्य शिक्षा केंद्र' },
      },
      {
        name: { en: 'Clinical Articles', hi: 'चिकित्सीय लेख' },
        href: '/patient-resources/articles',
        description: { en: 'Physician-reviewed articles on glucose science', hi: 'डॉक्टर द्वारा लिखित एवं परीक्षित लेख' },
      },
      {
        name: { en: 'Frequently Asked Questions', hi: 'अक्सर पूछे जाने वाले प्रश्न' },
        href: '/patient-resources/faqs',
        description: { en: 'Answers to common patient inquiries and doubts', hi: 'रोगियों की सामान्य शंकाओं के समाधान' },
      },
      {
        name: { en: 'Educational Videos', hi: 'शैक्षणिक वीडियो' },
        href: '/patient-resources/videos',
        description: { en: 'Video demonstrations of insulin and sensor usage', hi: 'इंसुलिन एवं तकनीक उपयोग के वीडियो' },
      },
      {
        name: { en: 'Understanding Lab Reports', hi: 'लैब रिपोर्ट समझें' },
        href: '/patient-resources/reports',
        description: { en: 'Clear interpretation of HbA1c, uACR, and lipid profiles', hi: 'HbA1c, यूरिन प्रोटीन एवं लिपिड की व्याख्या' },
      },
      {
        name: { en: 'Patient Guides', hi: 'रोगी मार्गदर्शिका' },
        href: '/patient-resources/guides',
        description: { en: 'Actionable step-by-step guides for daily self-care', hi: 'दैनिक स्व-देखभाल के चरणबद्ध नियम' },
      },
    ],
  },
  {
    id: 'nav-clinic',
    name: { en: 'Chamber & Clinic', hi: 'क्लिनिक एवं चेंबर' },
    href: '/clinic',
    children: [
      {
        name: { en: 'Chamber Facilities', hi: 'जांच एवं परीक्षण सुविधाएं' },
        href: '/clinic/facilities',
        description: { en: 'On-site CGM setup, neuropathy, and POC testing', hi: 'ऑन-साइट सीजीएम, न्यूरोपैथी जांच सुविधा' },
      },
      {
        name: { en: 'Chamber Photos', hi: 'चेंबर छायाचित्र' },
        href: '/clinic/photos',
        description: { en: 'Calm, hygienic clinical environment photos', hi: 'स्वच्छ एवं शांत परामर्श वातावरण' },
      },
      {
        name: { en: 'OPD Timings', hi: 'ओपीडी परामर्श समय' },
        href: '/clinic/timings',
        description: { en: 'Daily consultation schedule and slot details', hi: 'दैनिक परामर्श समय एवं दिन' },
      },
      {
        name: { en: 'Location & Map', hi: 'स्थान एवं दिशा-निर्देश' },
        href: '/clinic/location',
        description: { en: 'Address, landmarks, and navigation directions', hi: 'पता, लैंडमार्क एवं गूगल मैप्स लिंक' },
      },
    ],
  },
  {
    id: 'nav-contact',
    name: { en: 'Contact', hi: 'संपर्क' },
    href: '/contact',
  },
];
