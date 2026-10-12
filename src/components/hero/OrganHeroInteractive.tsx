import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';

interface OrganHotspot {
  id: string;
  name: { en: string; hi: string };
  x: number; // percentage from left
  y: number; // percentage from top
  isFocal?: boolean;
  link: string;
  description: { en: string; hi: string };
}

const ORGAN_HOTSPOTS: OrganHotspot[] = [
  {
    id: 'liver',
    name: { en: 'Liver', hi: 'यकृत (Liver)' },
    x: 52,
    y: 11,
    link: '/conditions/metabolic-health',
    description: {
      en: 'Essential metabolic hub processing carbohydrates and regulating hepatic glucose output.',
      hi: 'ग्लूकोज उत्पादन एवं चयापचय को नियंत्रित करने वाला मुख्य अंग।',
    },
  },
  {
    id: 'gallbladder',
    name: { en: 'Gall Bladder', hi: 'पित्ताशय (Gall Bladder)' },
    x: 46,
    y: 15,
    link: '/diabetes-care/management',
    description: {
      en: 'Stores digestive bile; autonomic neuropathy often impacts gallbladder motility.',
      hi: 'पित्त रस का भंडारण एवं पाचन में सहायक अंग।',
    },
  },
  {
    id: 'stomach',
    name: { en: 'Stomach', hi: 'आमाशय (Stomach)' },
    x: 68,
    y: 13,
    link: '/conditions/diabetes',
    description: {
      en: 'Initial digestive reservoir; gastric emptying rate dictates postprandial glucose surges.',
      hi: 'भोजन पाचन एवं भोजनोपरांत रक्त शर्करा वृद्धि से जुड़ा महत्वपूर्ण अंग।',
    },
  },
  {
    id: 'pancreas',
    name: { en: 'Pancreas', hi: 'अग्न्याशय (Pancreas)' },
    x: 60,
    y: 23,
    isFocal: true,
    link: '/conditions/diabetes',
    description: {
      en: 'Endocrine epicenter containing Islets with Beta cells that produce vital insulin and glucagon.',
      hi: 'इंसुलिन एवं ग्लूकागन का उत्पादन करने वाला प्रमुख एंडोक्राइन अंग।',
    },
  },
  {
    id: 'spleen',
    name: { en: 'Spleen', hi: 'प्लीहा (Spleen)' },
    x: 71,
    y: 22,
    link: '/conditions/metabolic-health',
    description: {
      en: 'Immune and vascular filter bordering the splenic artery and tail of the pancreas.',
      hi: 'रक्त शुद्धि एवं प्रतिरक्षा प्रणाली से जुड़ा अंग।',
    },
  },
  {
    id: 'small-intestine',
    name: { en: 'Small Intestine', hi: 'छोटी आंत (Small Intestine)' },
    x: 60,
    y: 36,
    link: '/diabetes-care/prediabetes',
    description: {
      en: 'Primary glucose and nutrient absorption corridor triggering critical incretin (GLP-1) release.',
      hi: 'ग्लूकोज अवशोषण एवं इनक्रेटिन (GLP-1) हार्मोन सक्रिय करने वाला मार्ग।',
    },
  },
];

export const OrganHeroInteractive: React.FC = () => {
  const { localize } = useLanguage();
  const [activeOrganId, setActiveOrganId] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-w-[720px] mx-auto select-none">
      {/* Soft teal-green radial glow behind organ illustration */}
      <div
        className="absolute inset-0 -z-10 rounded-full pointer-events-none blur-3xl opacity-75"
        style={{
          background: 'radial-gradient(ellipse at 55% 45%, rgba(15, 92, 74, 0.28) 0%, rgba(232, 242, 238, 0.6) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* 3D Digestive System Illustration */}
      <img
        src="/images/organs-hero.png"
        alt="3D Translucent Anatomical Illustration of the Digestive & Endocrine System"
        className="w-full h-full object-contain pointer-events-none drop-shadow-md"
        style={{ mixBlendMode: 'multiply' }}
        width={720}
        height={495}
        loading="eager"
        fetchPriority="high"
      />

      {/* Interactive Hotspot Pills */}
      {ORGAN_HOTSPOTS.map((organ) => {
        const isHovered = activeOrganId === organ.id;
        const isPancreas = organ.isFocal;

        return (
          <div
            key={organ.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: `${organ.x}%`,
              top: `${organ.y}%`,
            }}
          >
            <Link
              to={organ.link}
              onMouseEnter={() => setActiveOrganId(organ.id)}
              onMouseLeave={() => setActiveOrganId(null)}
              onFocus={() => setActiveOrganId(organ.id)}
              onBlur={() => setActiveOrganId(null)}
              className={`group flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                isPancreas
                  ? 'bg-gradient-to-r from-[#B8862B] to-[#D99B35] text-white ring-2 ring-[#B8862B]/40 shadow-[0_0_20px_rgba(184,134,43,0.45)] hover:scale-105'
                  : isHovered
                  ? 'bg-[#0F5C4A] text-white border border-[#0F5C4A] shadow-md scale-105'
                  : 'bg-white/95 text-[#1B2A26] border border-[#E8E2D5] hover:border-[#0F5C4A] hover:bg-[#E8F2EE]'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isPancreas
                    ? 'bg-white text-[#B8862B]'
                    : isHovered
                    ? 'bg-white text-[#0F5C4A]'
                    : 'bg-[#F5EFE6] text-[#B8862B] border border-[#E8E2D5]'
                }`}
              >
                <Plus className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span>{localize(organ.name)}</span>
            </Link>

            {/* Hover Tooltip Card */}
            {isHovered && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 p-3 rounded-2xl bg-white border border-[#E8E2D5] shadow-[0_12px_32px_rgba(27,42,38,0.14)] z-30 animate-in fade-in zoom-in-95 duration-150 text-left pointer-events-auto"
                onMouseEnter={() => setActiveOrganId(organ.id)}
                onMouseLeave={() => setActiveOrganId(null)}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-serif font-bold text-sm text-[#1B2A26]">
                    {localize(organ.name)}
                  </h4>
                  <span className="text-[10px] uppercase font-bold text-[#B8862B] bg-[#F5EFE6] px-2 py-0.5 rounded-full border border-[#E8E2D5]">
                    Clinical Info
                  </span>
                </div>
                <p className="text-xs text-[#4A5753] leading-relaxed line-clamp-2 mb-2">
                  {localize(organ.description)}
                </p>
                <Link
                  to={organ.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0F5C4A] hover:underline"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        );
      })}

      {/* Handwritten Hint in Caveat with Curved Arrow */}
      <div className="absolute right-3 sm:right-6 bottom-4 sm:bottom-6 pointer-events-none flex flex-col items-end z-10">
        <div className="flex items-center gap-1 text-[#0F5C4A]">
          <span className="font-caveat text-lg sm:text-xl font-bold -rotate-6 tracking-wide drop-shadow-xs">
            Click on each part to learn more
          </span>
          <svg
            className="w-8 h-8 text-[#0F5C4A] -rotate-12 transform"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8 C16 4 28 14 26 26"
              stroke="#0F5C4A"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M20 25 L26 27 L28 20"
              stroke="#0F5C4A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
