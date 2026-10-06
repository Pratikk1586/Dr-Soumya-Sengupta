import type { ReportTopic } from '../types';

export const REPORTS_DATA: ReportTopic[] = [
  {
    id: 'rep-hba1c',
    title: { en: 'Understanding Your HbA1c Lab Report', hi: 'अपनी HbA1c लैब रिपोर्ट को समझें' },
    testName: { en: 'Glycated Hemoglobin (HbA1c)', hi: 'ग्लाइकेटेड हीमोग्लोबिन (HbA1c)' },
    whatItMeasures: {
      en: 'Percentage of red blood cell hemoglobin coated with glucose over past 3 months.',
      hi: 'पिछले 3 महीनों में लाल रक्त कोशिकाओं पर चिपके ग्लूकोज का प्रतिशत।',
    },
    clinicalSignificance: {
      en: 'Every 1% reduction lowers microvascular organ risk by up to 37%.',
      hi: '1% की कमी से सूक्ष्म जटिलताओं का खतरा 37% तक घटता है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'rep-uacr',
    title: { en: 'Urine Albumin-to-Creatinine Ratio (uACR)', hi: 'यूरिन एल्ब्यूमिन-क्रिएटिनिन अनुपात (uACR)' },
    testName: { en: 'Spot Urinary Albumin / Creatinine', hi: 'स्पॉट यूरिन एल्ब्यूमिन' },
    whatItMeasures: {
      en: 'Microscopic leaks of protein through renal glomeruli filters.',
      hi: 'गुर्दे के फिल्टर से प्रोटीन के सूक्ष्म रिसाव की माप।',
    },
    clinicalSignificance: {
      en: 'Primary early indicator of diabetic nephropathy, detectable years before blood creatinine rises.',
      hi: 'डायबिटिक किडनी रोग का सबसे पहला संकेत, जो सालों पहले पता चल जाता है।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
  {
    id: 'rep-lipid',
    title: { en: 'Atherogenic Lipid Subfractions & Apolipoproteins', hi: 'लिपिड प्रोफाइल एवं कोलेस्ट्रॉल' },
    testName: { en: 'Complete Lipid Panel (LDL, HDL, Triglycerides, Non-HDL)', hi: 'लिपिड पैनल' },
    whatItMeasures: {
      en: 'Circulating cholesterol and triglyceride carrying particles.',
      hi: 'रक्त में कोलेस्ट्रॉल और ट्राइग्लिसराइड्स के कण।',
    },
    clinicalSignificance: {
      en: 'High triglycerides and low HDL indicate visceral insulin resistance.',
      hi: 'उच्च ट्राइग्लिसराइड्स और कम HDL इंसुलिन प्रतिरोध का संकेत हैं।',
    },
    reviewStatus: 'draft',
    status: 'verified',
  },
];
