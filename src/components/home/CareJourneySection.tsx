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
      className="bg-[#F7FAFA] border-b border-[#D7E5E6] py-10 sm:py-14 relative"
    >
      <div className="relative">
        {/* Desktop horizontal dotted connecting progress line */}
        <div
          className="hidden lg:block absolute top-7 left-12 right-12 h-0 border-t-2 border-dotted border-[#0E5A6B]/40 z-0"
          aria-hidden="true"
        />

        {/* Mobile vertical dotted connecting progress line */}
        <div
          className="lg:hidden absolute top-7 bottom-10 left-7 w-0 border-l-2 border-dotted border-[#0E5A6B]/40 z-0"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-4 relative z-10">
          {JOURNEY_STEPS.map((step) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.step}
                className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center group"
              >
                {/* Large Step Numeral Badge */}
                <div className="w-14 h-14 rounded-full bg-[#0E5A6B] text-white flex items-center justify-center font-extrabold text-lg sm:text-xl shadow-[0_4px_12px_rgba(14,90,107,0.2)] ring-4 ring-[#E8F5F4] border-2 border-white group-hover:scale-105 group-hover:bg-[#0B2E3A] transition-all duration-200 shrink-0 z-10">
                  {step.step}
                </div>

                {/* Step Card Content */}
                <Card
                  padding="sm"
                  hoverable
                  className="flex-1 p-3.5 sm:p-4 border-[#D7E5E6] hover:border-[#0E5A6B]/60 shadow-xs hover:shadow-md transition-all bg-white w-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 lg:justify-center">
                      <div className="w-7 h-7 rounded-lg bg-[#E8F5F4] border border-[#D7E5E6] flex items-center justify-center text-[#0E5A6B] shrink-0 group-hover:bg-[#0E5A6B] group-hover:text-white transition-colors">
                        <StepIcon className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <h3 className="font-bold text-[#1B2B34] text-xs sm:text-sm">
                        {step.title[langKey]}
                      </h3>
                    </div>
                    <p className="text-xs text-[#4F6470] mt-1 leading-snug">
                      {step.desc[langKey]}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 text-center flex flex-wrap items-center justify-center gap-3">
        <Link to="/diabetes-care/management">
          <Button
            variant="outline"
            size="sm"
            className="border-[#0E5A6B]/40 text-[#0E5A6B] hover:bg-[#0E5A6B] hover:text-white transition-all text-xs"
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
