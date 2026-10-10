import type { DoctorAchievement } from '../types';

export const ACHIEVEMENTS_DATA: DoctorAchievement[] = [
  {
    id: 'ach-1',
    title: {
      en: '19+ Years of Community Diabetic Screening Leadership',
      hi: '19+ वर्षों से सामुदायिक मधुमेह जांच शिविरों का नेतृत्व',
    },
    organization: {
      en: 'West Singhbhum & Jharkhand Community Outreach',
      hi: 'पश्चिमी सिंहभूम एवं झारखंड जन-स्वास्थ्य पहल',
    },
    year: '2007 – Present',
    description: {
      en: 'Organized and led multi-specialty screening camps across Chaibasa and surrounding regions, enabling early detection of asymptomatic diabetes to protect vital organs.',
      hi: 'चाईबासा और आसपास के क्षेत्रों में नियमित रूप से मधुमेह जांच शिविर आयोजित कर शुरुआती चरण में बीमारी की पहचान और अंग सुरक्षा में मार्गदर्शन किया।',
    },
    category: 'screening',
  },
  {
    id: 'ach-2',
    title: {
      en: 'Founder of Cardio Diabetic Clinic, Chaibasa',
      hi: 'कार्डियो डायबिटिक क्लिनिक, चाईबासा के संस्थापक',
    },
    organization: {
      en: 'Cardio Diabetic Clinic, Amlatola, Chaibasa',
      hi: 'कार्डियो डायबिटिक क्लिनिक, अमलाटोला, चाईबासा',
    },
    year: 'Est. 2007',
    description: {
      en: 'Established a dedicated regional center for chronic metabolic care, balancing tight glycemic targets with continuous risk reduction for heart, kidney, and nerve health.',
      hi: 'चाईबासा में समर्पित मेटाबोलिक स्वास्थ्य केंद्र की स्थापना की, जो ग्लूकोज संतुलन के साथ-साथ हृदय, गुर्दे और नसों की दीर्घकालिक सुरक्षा पर केंद्रित है।',
    },
    category: 'clinical',
  },
  {
    id: 'ach-3',
    title: {
      en: 'Continuous Organ Preservation & Patient Education Advocacy',
      hi: 'अंग सुरक्षा एवं रोगी शिक्षा अभियान',
    },
    organization: {
      en: 'Clinical Diabetology & Preventive Medicine',
      hi: 'क्लिनिकल डायबेटोलॉजी एवं प्रिवेंटिव मेडिसिन',
    },
    year: '2007 – Present',
    description: {
      en: 'Advocating the core clinical principle that early glycemic control enables patients to lead a normal, healthy life forever without end-organ damage.',
      hi: 'इस मूल सिद्धांत का प्रचार कि समय पर नियंत्रण से मरीज बिना किसी अंग क्षति के सदैव एक स्वस्थ और सामान्य जीवन जी सकते हैं।',
    },
    category: 'community',
  },
];
