import React from 'react';
import { Container } from '../common/Container';
import { AnimatedPancreas } from '../pancreas';
import { Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';

export const PancreasInteractiveSection: React.FC = () => {
  const { isHindi } = useLanguage();

  return (
    <section
      id="pancreas-anatomy"
      aria-labelledby="pancreas-section-heading"
      className="py-14 sm:py-20 bg-gradient-to-b from-[#faf9f6] via-white to-[#faf9f6] border-y border-slate-200/80 relative overflow-hidden"
    >
      {/* Background ambient medical glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(101, 217, 208, 0.15) 0%, rgba(16, 63, 74, 0.05) 50%, transparent 70%)',
        }}
      />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7FA] text-[#103F4A] text-xs font-bold border border-[#65D9D0]/40">
            <Activity className="w-3.5 h-3.5 text-[#103F4A]" />
            <span>{isHindi ? '3D इंटरएक्टिव अग्न्याशय मॉडल' : 'Interactive 3D Anatomy'}</span>
          </div>

          <h2
            id="pancreas-section-heading"
            className="text-2xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight leading-tight"
          >
            {isHindi
              ? 'अग्न्याशय और इंसुलिन प्रणाली को समझें'
              : 'The Glycemic Engine: Inside the Human Pancreas'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {isHindi
              ? 'अग्न्याशय के अंगों, बीटा कोशिकाओं और डक्ट प्रणाली का 3D में अन्वेषण करें। अंगों पर होवर करें और उनके नैदानिक महत्व को जानें।'
              : 'Interactive 3D exploration of the pancreatic parenchyma, Islets of Langerhans, duodenal incretin interface, and ductal architecture that govern blood sugar regulation and metabolic balance.'}
          </p>

          {/* Quick Guidance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/70">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Islets & Beta-Cell Reserves</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/70">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Duct of Wirsung Enzyme Flow</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/70">
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              <span>Duodenal Incretin Axis</span>
            </span>
          </div>
        </div>

        {/* 3D Interactive Pancreas Canvas Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 shadow-xl max-w-4xl mx-auto">
          <AnimatedPancreas
            className="w-full"
            showCategoryTabs={true}
            showDetailsCard={true}
            showHotspots={true}
            showMedicalBadges={false}
            enableParallax={false}
          />
        </div>
      </Container>
    </section>
  );
};
