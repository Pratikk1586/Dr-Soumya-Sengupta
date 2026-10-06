import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Flame, Scale, HeartPulse, ArrowRight } from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { useLanguage } from '../../context/useLanguage';

interface ClinicalFocusArea {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  icon: React.FC<{ className?: string }>;
  link: string;
  badge: { en: string; hi: string };
}

const FOCUS_AREAS: ClinicalFocusArea[] = [
  {
    id: 'diabetes',
    title: {
      en: 'Type 1 & Type 2 Diabetes',
      hi: 'टाइप 1 और टाइप 2 डायबिटीज',
    },
    description: {
      en: 'Comprehensive glycemic stabilization, Continuous Glucose Monitoring (CGM/AGP), insulin titration, and prevention of microvascular complications.',
      hi: 'ग्लूकोज नियंत्रण, निरंतर ग्लूकोज मॉनिटरिंग (CGM), इंसुलिन समायोजन और दीर्घकालिक जटिलताओं की रोकथाम।',
    },
    icon: Activity,
    link: '/conditions/diabetes',
    badge: { en: 'Primary Focus', hi: 'मुख्य विशेषज्ञता' },
  },
  {
    id: 'thyroid',
    title: {
      en: 'Thyroid Disorders',
      hi: 'थायरॉयड विकार',
    },
    description: {
      en: 'Diagnostic workup and clinical management of hypothyroidism, hyperthyroidism, Hashimoto thyroiditis, and thyroid autoimmunity in diabetes.',
      hi: 'हाइपोथायरायडिज्म, हाइपरथायरायडिज्म और ऑटोइम्यून थायरॉयड विकारों का सटीक निदान एवं चिकित्सा प्रबंधन।',
    },
    icon: Flame,
    link: '/conditions/thyroid',
    badge: { en: 'Endocrine Care', hi: 'एंडोक्राइन केयर' },
  },
  {
    id: 'weight-management',
    title: {
      en: 'Weight & Metabolic Obesity',
      hi: 'वजन एवं मेटाबोलिक मोटापा',
    },
    description: {
      en: 'Medical management of insulin resistance, visceral adiposity, and metabolic slowing without unscientific crash dieting.',
      hi: 'इंसुलिन प्रतिरोध और मेटाबॉलिक वजन वृद्धि का चिकित्सकीय प्रबंधन, बिना हानिकारक क्रैश डाइट के।',
    },
    icon: Scale,
    link: '/conditions/weight-management',
    badge: { en: 'Lifestyle & Medicine', hi: 'जीवनशैली व चिकित्सा' },
  },
  {
    id: 'metabolic-health',
    title: {
      en: 'Cardiometabolic & Lipid Health',
      hi: 'हृदय-मेटाबोलिक एवं लिपिड स्वास्थ्य',
    },
    description: {
      en: 'Cardiovascular risk evaluation, dyslipidemia (high triglycerides/cholesterol), fatty liver (MASLD), and early metabolic syndrome reversal.',
      hi: 'कोलेस्ट्रॉल असंतुलन, फैटी लिवर (MASLD) और प्रारंभिक मेटाबोलिक सिंड्रोम का समय पर सुधार।',
    },
    icon: HeartPulse,
    link: '/conditions/metabolic-health',
    badge: { en: 'Organ Protection', hi: 'अंग सुरक्षा' },
  },
];

export const HowCanWeHelpSection: React.FC = () => {
  const { language } = useLanguage();
  const langKey = language === 'hi' ? 'hi' : 'en';

  return (
    <Section
      eyebrow="Clinical Areas of Focus"
      heading="How Can We Help?"
      lede="Specialized endocrine care aimed at metabolic balance, cellular preservation, and sustainable daily vitality."
      containerSize="xl"
      className="bg-white border-b border-slate-200/80"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FOCUS_AREAS.map((area) => {
          const IconComponent = area.icon;
          return (
            <Card
              key={area.id}
              hoverable
              padding="lg"
              className="flex flex-col justify-between border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0f3d4a] flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-[#0f3d4a]" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold text-teal-800 bg-teal-50/80 px-2 py-0.5 rounded-md border border-teal-200/60">
                    {area.badge[langKey]}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {area.title[langKey]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {area.description[langKey]}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <Link
                  to={area.link}
                  className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center gap-1 group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};
