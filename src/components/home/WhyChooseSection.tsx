import React from 'react';
import { UserCheck, Sliders, BookOpen, ShieldCheck, Microscope } from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { useLanguage } from '../../context/useLanguage';

interface ClinicalPillar {
  title: { en: string; hi: string };
  approach: { en: string; hi: string };
  icon: React.FC<{ className?: string }>;
}

const APPROACH_PILLARS: ClinicalPillar[] = [
  {
    title: { en: 'Patient-Centred Consultation', hi: 'मरीज-केंद्रित दृष्टिकोण' },
    approach: {
      en: 'Medical recommendations that respect your daily work routine, culinary traditions, and personal constraints, avoiding rigid unrealistic regimens.',
      hi: 'आपकी जीवनशैली, भोजन की आदतों और कार्यशैली को ध्यान में रखकर तैयार की गई व्यावहारिक परामर्श योजना।',
    },
    icon: UserCheck,
  },
  {
    title: { en: 'Individualised Glycemic Strategy', hi: 'व्यक्तिगत ग्लूकोज रणनीति' },
    approach: {
      en: 'Therapy calibrated to unique biomarker readings, insulin sensitivity curves, and organ status rather than one-size-fits-all prescription templates.',
      hi: 'प्रत्येक व्यक्ति की विशिष्ट शारीरिक स्थिति और रिपोर्ट के अनुसार अनुकूलित उपचार, बिना किसी सामान्य रटे-रटाए नुस्खे के।',
    },
    icon: Sliders,
  },
  {
    title: { en: 'Education & Health Literacy', hi: 'स्वास्थ्य साक्षरता एवं शिक्षा' },
    approach: {
      en: 'Transparent explanations of HbA1c metrics, sensor analytics, and physiological causes so you feel confident and in control of your daily health.',
      hi: 'रोग की शारीरिक प्रक्रिया और रिपोर्ट की आसान व्याख्या, ताकि आप अपने दैनिक स्वास्थ्य के प्रति जागरूक रह सकें।',
    },
    icon: BookOpen,
  },
  {
    title: { en: 'Long-Term Organ Preservation', hi: 'दीर्घकालिक अंग सुरक्षा' },
    approach: {
      en: 'A focus on protecting the heart, kidneys, retina, and peripheral nerves from silent microvascular damage, prioritizing sustainable lifelong vitality.',
      hi: 'हृदय, गुर्दे, आंखों और नसों को नुकसान से बचाने पर मुख्य ध्यान, ताकि भविष्य में जटिलताओं का जोखिम न रहे।',
    },
    icon: ShieldCheck,
  },
  {
    title: { en: 'Evidence-Based Diabetology', hi: 'प्रमाण-आधारित चिकित्सा' },
    approach: {
      en: 'Protocols aligned with contemporary peer-reviewed clinical guidelines, continuous glucose analytics, and validated pharmacological science.',
      hi: 'आधुनिक वैज्ञानिक शोध, प्रामाणिक चिकित्सा दिशानिर्देशों और सटीक तकनीकों पर आधारित चिकित्सकीय देखभाल।',
    },
    icon: Microscope,
  },
];

export const WhyChooseSection: React.FC = () => {
  const { language } = useLanguage();
  const langKey = language === 'hi' ? 'hi' : 'en';

  return (
    <Section
      eyebrow="Clinical Philosophy"
      heading="Our Clinical Approach"
      lede="Positioned around medical integrity, patient empowerment, and proactive chronic disease prevention."
      containerSize="xl"
      className="bg-[#FCFEFF] border-b border-slate-200/80"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {APPROACH_PILLARS.map((pillar, idx) => {
          const PillarIcon = pillar.icon;
          return (
            <Card
              key={idx}
              hoverable
              padding="lg"
              className="border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/30 flex items-center justify-center">
                  <PillarIcon className="w-5 h-5 text-[#103F4A]" aria-hidden="true" />
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {pillar.title[langKey]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {pillar.approach[langKey]}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
                Non-Promotional Care Ethics
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};
