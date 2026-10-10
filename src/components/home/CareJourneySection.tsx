import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Stethoscope,
  FileSpreadsheet,
  FileCheck2,
  Salad,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/useLanguage';

interface JourneyStep {
  step: number;
  title: { en: string; hi: string };
  desc: { en: string; hi: string };
  icon: React.FC<{ className?: string }>;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: 1,
    title: { en: 'Listen & Understand', hi: 'सहानुभूतिपूर्ण चर्चा' },
    desc: { en: 'Discuss daily symptoms, sugar logs & lifestyle', hi: 'दैनिक लक्षण, शुगर पैटर्न व दिनचर्या पर चर्चा' },
    icon: MessageSquare,
  },
  {
    step: 2,
    title: { en: 'Clinical Exam', hi: 'शारीरिक परीक्षण' },
    desc: { en: 'Blood pressure, vitals & neuropathy check', hi: 'ब्लड प्रेशर, नाड़ी एवं पैरों की संवेदनशीलता जांच' },
    icon: Stethoscope,
  },
  {
    step: 3,
    title: { en: 'Report Analysis', hi: 'रिपोर्ट्स का विश्लेषण' },
    desc: { en: 'HbA1c, kidneys (uACR) & cholesterol review', hi: 'HbA1c, गुर्दे व कोलेस्ट्रॉल का सटीक मूल्यांकन' },
    icon: FileSpreadsheet,
  },
  {
    step: 4,
    title: { en: 'Tailored Care Plan', hi: 'अनुकूलित चिकित्सा' },
    desc: { en: 'Personalized medications or insulin dosage', hi: 'मरीज अनुसार दवाइयों या इंसुलिन की सुरक्षित खुराक' },
    icon: FileCheck2,
  },
  {
    step: 5,
    title: { en: 'Daily Guidance', hi: 'आहार व जीवनशैली' },
    desc: { en: 'Simple food choices & activity habits', hi: 'संतुलित आहार, व्यायाम व लो-शुगर से बचाव' },
    icon: Salad,
  },
  {
    step: 6,
    title: { en: 'Regular Follow-up', hi: 'नियमित फॉलो-अप' },
    desc: { en: 'Scheduled reviews & organ protection', hi: 'समय पर समीक्षा एवं जटिलताओं से दीर्घकालिक सुरक्षा' },
    icon: RotateCcw,
  },
];

export const CareJourneySection: React.FC = () => {
  const { language, isHindi } = useLanguage();
  const langKey = language === 'hi' ? 'hi' : 'en';

  return (
    <Section
      eyebrow={isHindi ? 'परामर्श प्रक्रिया' : 'Consultation Roadmap'}
      heading={isHindi ? 'मरीज परामर्श एवं उपचार प्रक्रिया' : 'Patient Care & Consultation Journey'}
      lede={
        isHindi
          ? 'परामर्श से लेकर दीर्घकालिक निगरानी तक एक पारदर्शी 6-चरणीय प्रक्रिया।'
          : 'A transparent, collaborative 6-step medical roadmap for confident, continuous diabetes care.'
      }
      containerSize="xl"
      className="bg-white border-b border-slate-200/80 py-10 sm:py-14"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {JOURNEY_STEPS.map((step) => {
          const StepIcon = step.icon;
          return (
            <Card
              key={step.step}
              padding="sm"
              hoverable
              className="p-3.5 sm:p-4 border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex items-start gap-3 bg-white"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0f3d4a] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                <StepIcon className="w-4 h-4 text-[#0f3d4a]" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50/80 px-1.5 py-0.5 rounded">
                    Step {step.step}
                  </span>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {step.title[langKey]}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  {step.desc[langKey]}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 text-center flex flex-wrap items-center justify-center gap-3">
        <Link to="/diabetes-care/management">
          <Button
            variant="outline"
            size="sm"
            className="border-[#0f3d4a]/30 hover:bg-[#0f3d4a] hover:text-white transition-all text-xs"
          >
            <span>{isHindi ? 'डायबिटीज प्रबंधन गाइड पढ़ें' : 'Read Full Diabetes Management Guide'}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
        <Link to="/book-appointment">
          <Button variant="primary" size="sm" className="text-xs">
            <span>{isHindi ? 'अपॉइंटमेंट बुक करें' : 'Schedule Consultation'}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </Section>
  );
};
