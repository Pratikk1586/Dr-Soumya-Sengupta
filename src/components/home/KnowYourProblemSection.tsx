import React from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  LineChart,
  ArrowRight,
  Droplet,
  Heart,
  Scale,
  Zap,
  ShieldAlert,
} from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/useLanguage';

export const KnowYourProblemSection: React.FC = () => {
  const { isHindi } = useLanguage();

  const symptomsList = [
    {
      title: isHindi ? 'अधिक प्यास व बार-बार पेशाब' : 'Frequent Thirst & Urination',
      hint: isHindi ? 'शरीर से अतिरिक्त शुगर बाहर निकलने का संकेत' : 'Body flushing excess circulating glucose',
      icon: Droplet,
    },
    {
      title: isHindi ? 'अत्यधिक थकान व कमजोरी' : 'Unexplained Fatigue & Low Energy',
      hint: isHindi ? 'कोशिकाओं तक सही ऊर्जा न पहुँच पाना' : 'Cells struggling to absorb glucose for energy',
      icon: Zap,
    },
    {
      title: isHindi ? 'वजन में अचानक बदलाव' : 'Sudden Weight Changes',
      hint: isHindi ? 'इंसुलिन व चयापचय में असंतुलन' : 'Shift in metabolic fat storage or breakdown',
      icon: Scale,
    },
    {
      title: isHindi ? 'बढ़ी हुई ब्लड शुगर' : 'Elevated Glucose Readings',
      hint: isHindi ? 'इंसुलिन प्रतिरोध का प्रारंभिक संकेत' : 'Early sign of cellular insulin resistance',
      icon: LineChart,
    },
  ];

  const numbersList = [
    {
      title: 'HbA1c',
      hint: isHindi ? 'पिछले 2–3 महीनों का औसत ब्लड शुगर' : '3-month average blood glucose level',
      icon: LineChart,
    },
    {
      title: isHindi ? 'फास्टिंग ब्लड शुगर' : 'Fasting Blood Glucose',
      hint: isHindi ? 'सुबह खाली पेट आधारभूत शुगर स्तर' : 'Morning baseline sugar before food',
      icon: Droplet,
    },
    {
      title: isHindi ? 'ब्लड प्रेशर (रक्तचाप)' : 'Blood Pressure',
      hint: isHindi ? 'हृदय और धमनियों पर दबाव की माप' : 'Circulatory and arterial vessel health',
      icon: Heart,
    },
    {
      title: isHindi ? 'लिपिड प्रोफाइल (कोलेस्ट्रॉल)' : 'Cholesterol & Lipids',
      hint: isHindi ? 'रक्त में वसा व हृदय सुरक्षा का संतुलन' : 'Circulating fats for cardiovascular balance',
      icon: Scale,
    },
  ];

  return (
    <Section
      eyebrow={isHindi ? 'मरीज स्वास्थ्य साक्षरता' : 'Health Literacy'}
      heading={isHindi ? 'अपनी समस्या व रिपोर्ट्स को समझें' : 'Know Your Problem & Understand Your Numbers'}
      lede={
        isHindi
          ? 'लक्षणों को पहचानें और अपनी लैब रिपोर्ट्स का अर्थ सरल शब्दों में जानें।'
          : 'Simple, educational guides to help you understand your symptoms and routine lab measurements.'
      }
      containerSize="xl"
      className="bg-gradient-to-b from-[#FCFEFF] via-[#F8FCFD] to-[#F3F9FA] border-b border-slate-200/80 py-10 sm:py-14 relative"
    >
      <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
        {/* Card 1: Know Your Problem (Symptoms) */}
        <Card
          padding="md"
          className="p-5 sm:p-6 flex flex-col justify-between bg-white/95 border-slate-200/85 hover:border-[#65D9D0]/60 shadow-2xs hover:shadow-xs transition-all backdrop-blur-xs"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#103F4A] bg-[#E7F8F2] px-2 py-0.5 rounded border border-[#65D9D0]/50 inline-flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-[#103F4A]" />
                <span>{isHindi ? 'लक्षण मार्गदर्शिका' : 'Symptoms Guide'}</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Part 1</span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {isHindi ? 'अपनी समस्या समझें (लक्षण)' : 'Know Your Problem'}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {isHindi
                  ? 'सामान्य शारीरिक लक्षणों का अर्थ समझें और डॉक्टर से परामर्श हेतु तैयार रहें।'
                  : 'Understand what common body signals might indicate before your consultation.'}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {symptomsList.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-[#EAF7FA] text-[#103F4A] flex items-center justify-center shrink-0 border border-[#65D9D0]/30">
                        <ItemIcon className="w-3.5 h-3.5 text-[#103F4A]" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-xs text-slate-900 block truncate">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate">
                          {item.hint}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link to="/patient-resources/know-your-problem">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between border-[#103F4A]/30 text-[#103F4A] hover:bg-[#103F4A] hover:text-white transition-all text-xs"
              >
                <span>{isHindi ? 'सभी लक्षण व समस्याएं विस्तार से देखें' : 'Explore All Symptoms & Concerns'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Card 2: Understand Your Numbers (Reports) */}
        <Card
          padding="md"
          className="p-5 sm:p-6 flex flex-col justify-between bg-white/95 border-slate-200/85 hover:border-[#65D9D0]/60 shadow-2xs hover:shadow-xs transition-all backdrop-blur-xs"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#103F4A] bg-[#E7F8F2] px-2 py-0.5 rounded border border-[#65D9D0]/50 inline-flex items-center gap-1">
                <LineChart className="w-3 h-3 text-[#103F4A]" />
                <span>{isHindi ? 'लैब रिपोर्ट्स' : 'Lab Biomarkers'}</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Part 2</span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {isHindi ? 'अपनी रिपोर्ट्स समझें (नंबर्स)' : 'Understand Your Numbers'}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {isHindi
                  ? 'HbA1c, शुगर, बीपी और कोलेस्ट्रॉल रिपोर्ट का अर्थ सरल भाषा में जानें।'
                  : 'Clear, plain-English explanations of what routine test results mean.'}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {numbersList.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-[#EAF7FA] text-[#103F4A] flex items-center justify-center shrink-0 border border-[#65D9D0]/30">
                        <ItemIcon className="w-3.5 h-3.5 text-[#103F4A]" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-xs text-slate-900 block truncate">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate">
                          {item.hint}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link to="/patient-resources/understand-your-reports">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between border-[#103F4A]/30 text-[#103F4A] hover:bg-[#103F4A] hover:text-white transition-all text-xs"
              >
                <span>{isHindi ? 'सभी लैब रिपोर्ट्स विस्तार से समझें' : 'Understand All Lab Reports in Detail'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Subtle safety disclaimer */}
      <div className="mt-5 text-center flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>
          {isHindi
            ? 'केवल सामान्य स्वास्थ्य शिक्षा हेतु — व्यक्तिगत निदान या उपचार के लिए डॉक्टर से परामर्श लें।'
            : 'For general health education only — not a clinical diagnosis. Always consult a qualified doctor.'}
        </span>
      </div>
    </Section>
  );
};
