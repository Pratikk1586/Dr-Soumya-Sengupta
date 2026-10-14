import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight, Activity, X } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';

interface OrganHotspot {
  id: string;
  name: { en: string; hi: string };
  x: number; // percentage from left
  y: number; // percentage from top
  isFocal?: boolean;
  link: string;
  badge?: { en: string; hi: string };
  description: { en: string; hi: string };
  tooltipPlacement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const ORGAN_HOTSPOTS: OrganHotspot[] = [
  {
    id: 'liver',
    name: { en: 'Liver', hi: 'यकृत (Liver)' },
    x: 53.5,
    y: 22.8,
    link: '/conditions/metabolic-health',
    badge: { en: 'Metabolic Hub', hi: 'चयापचय केंद्र' },
    tooltipPlacement: 'bottom-right',
    description: {
      en: 'Primary metabolic filter: stores glycogen and regulates fasting hepatic glucose release into circulation.',
      hi: 'ग्लूकोज उत्पादन एवं चयापचय को नियंत्रित करने वाला मुख्य अंग।',
    },
  },
  {
    id: 'gallbladder',
    name: { en: 'Gall Bladder', hi: 'पित्ताशय (Gall Bladder)' },
    x: 42.0,
    y: 33.0,
    link: '/diabetes-care/management',
    badge: { en: 'Bile Storage', hi: 'पित्त भंडारण' },
    tooltipPlacement: 'bottom-right',
    description: {
      en: 'Stores and concentrates digestive bile; diabetic autonomic neuropathy can reduce motility and gallbladder emptying.',
      hi: 'पित्त रस का भंडारण एवं पाचन में सहायक अंग।',
    },
  },
  {
    id: 'stomach',
    name: { en: 'Stomach', hi: 'आमाशय (Stomach)' },
    x: 65.5,
    y: 29.0,
    link: '/conditions/diabetes',
    badge: { en: 'Digestive Reservoir', hi: 'पाचन आगार' },
    tooltipPlacement: 'bottom-left',
    description: {
      en: 'Initial reservoir; diabetic gastroparesis delays gastric emptying, leading to erratic postprandial glucose swings.',
      hi: 'भोजन पाचन एवं भोजनोपरांत रक्त शर्करा वृद्धि से जुड़ा महत्वपूर्ण अंग।',
    },
  },
  {
    id: 'pancreas',
    name: { en: 'Pancreas', hi: 'अग्न्याशय (Pancreas)' },
    x: 56.5,
    y: 48.5,
    isFocal: true,
    link: '/conditions/diabetes',
    badge: { en: 'Endocrine Epicenter', hi: 'एंडोक्राइन केंद्र' },
    tooltipPlacement: 'top-left',
    description: {
      en: 'Endocrine epicenter: contains microscopic Islets of Langerhans where Beta cells synthesize insulin and Alpha cells produce glucagon.',
      hi: 'इंसुलिन एवं ग्लूकागन का उत्पादन करने वाला प्रमुख एंडोक्राइन अंग, जो शर्करा नियंत्रण की धुरी है।',
    },
  },
  {
    id: 'spleen',
    name: { en: 'Spleen', hi: 'प्लीहा (Spleen)' },
    x: 72.0,
    y: 53.0,
    link: '/conditions/metabolic-health',
    badge: { en: 'Immune & Vascular Filter', hi: 'रक्त शुद्धि अंग' },
    tooltipPlacement: 'bottom-left',
    description: {
      en: 'Immune and vascular filter bordering the splenic artery and the pancreatic tail; essential for blood filtration.',
      hi: 'रक्त शुद्धि एवं प्रतिरक्षा प्रणाली से जुड़ा अंग, जो अग्न्याशय की पूंछ से सटा है।',
    },
  },
  {
    id: 'small-intestine',
    name: { en: 'Small Intestine', hi: 'छोटी आंत (Small Intestine)' },
    x: 57.5,
    y: 66.5,
    link: '/diabetes-care/prediabetes',
    badge: { en: 'Incretin Release', hi: 'इनक्रेटिन मार्ग' },
    tooltipPlacement: 'top-center',
    description: {
      en: 'Primary glucose and nutrient absorption corridor triggering critical incretin hormones (GLP-1) for insulin stimulation.',
      hi: 'ग्लूकोज अवशोषण एवं इनक्रेटिन (GLP-1) हार्मोन सक्रिय करने वाला मार्ग।',
    },
  },
];

export const OrganHeroInteractive: React.FC = () => {
  const { localize, isHindi } = useLanguage();
  const [hoveredOrganId, setHoveredOrganId] = useState<string | null>(null);
  const [selectedOrganId, setSelectedOrganId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeOrganId = selectedOrganId || hoveredOrganId;

  const handlePointerEnter = useCallback((id: string) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setHoveredOrganId(id);
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setHoveredOrganId(null);
    }, 140);
  }, []);

  const toggleOrgan = useCallback((id: string) => {
    setSelectedOrganId((prev) => (prev === id ? null : id));
  }, []);

  const dismissOrgan = useCallback(() => {
    setSelectedOrganId(null);
    setHoveredOrganId(null);
  }, []);

  // Handle outside click to dismiss active tooltip on touch devices
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedOrganId(null);
        setHoveredOrganId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const isPancreasActive = activeOrganId === 'pancreas';

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[1213/1297] max-w-[480px] lg:max-w-[500px] xl:max-w-[530px] mx-auto select-none group"
      onPointerLeave={handlePointerLeave}
      role="region"
      aria-label={isHindi ? 'इंटरैक्टिव मानव अंग शारीरिक रचना' : 'Interactive Endocrine & Digestive Anatomy'}
    >
      {/* Soft teal-green and gold luminous radial glow behind organ illustration */}
      <div
        className="absolute inset-0 -z-10 rounded-full pointer-events-none blur-3xl opacity-85 transition-opacity duration-300"
        style={{
          background: isPancreasActive
            ? 'radial-gradient(ellipse at 58% 52%, rgba(242, 163, 58, 0.45) 0%, rgba(15, 92, 74, 0.35) 40%, transparent 75%)'
            : 'radial-gradient(ellipse at 58% 52%, rgba(242, 163, 58, 0.28) 0%, rgba(15, 92, 74, 0.32) 35%, rgba(82, 183, 136, 0.20) 55%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Cloudflare R2 Transparent Pancreas & Digestive System Illustration */}
      <img
        src="https://pub-7db5b1cd8b0147abb4dc0bbc590bac39.r2.dev/gallery/pancreasbgremoved.png"
        alt="Interactive anatomical illustration of the pancreas and digestive organs"
        className="w-full h-full object-contain pointer-events-none drop-shadow-xl transition-all duration-300 select-none"
        style={{
          maskImage: 'linear-gradient(to bottom, black 82%, transparent 97%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 97%)',
        }}
        loading="eager"
        fetchPriority="high"
      />

      {/* SVG Interactive Shaders & Anatomical Hover Hit Areas */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1000 1070"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Pancreas Golden Luminous Glow */}
          <radialGradient id="pancreas-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F2A33A" stopOpacity="0.65" />
            <stop offset="45%" stopColor="#F2A33A" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#F2A33A" stopOpacity="0" />
          </radialGradient>

          {/* Liver Deep Teal Glow */}
          <radialGradient id="liver-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0F5C4A" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#0F5C4A" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#0F5C4A" stopOpacity="0" />
          </radialGradient>

          {/* Gallbladder Emerald Glow */}
          <radialGradient id="gallbladder-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.60" />
            <stop offset="60%" stopColor="#10B981" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>

          {/* Stomach Warm Coral Glow */}
          <radialGradient id="stomach-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#EA580C" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
          </radialGradient>

          {/* Spleen Purple Glow */}
          <radialGradient id="spleen-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>

          {/* Small Intestine Glow */}
          <radialGradient id="intestine-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0E5A6B" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#0E5A6B" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0E5A6B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. PANCREAS HOVER GLOW */}
        {isPancreasActive && (
          <g className="transition-opacity duration-300">
            <ellipse
              cx="565"
              cy="519"
              rx="160"
              ry="75"
              transform="rotate(-5 565 519)"
              fill="url(#pancreas-glow)"
              className="animate-pulse"
            />
          </g>
        )}

        {/* 2. LIVER GLOW */}
        {activeOrganId === 'liver' && (
          <ellipse
            cx="535"
            cy="244"
            rx="130"
            ry="80"
            fill="url(#liver-glow)"
            className="animate-pulse transition-opacity duration-200"
          />
        )}

        {/* 3. GALLBLADDER GLOW */}
        {activeOrganId === 'gallbladder' && (
          <ellipse
            cx="420"
            cy="353"
            rx="55"
            ry="70"
            fill="url(#gallbladder-glow)"
            className="animate-pulse transition-opacity duration-200"
          />
        )}

        {/* 4. STOMACH GLOW */}
        {activeOrganId === 'stomach' && (
          <ellipse
            cx="655"
            cy="310"
            rx="125"
            ry="90"
            transform="rotate(-8 655 310)"
            fill="url(#stomach-glow)"
            className="animate-pulse transition-opacity duration-200"
          />
        )}

        {/* 5. SMALL INTESTINE GLOW */}
        {activeOrganId === 'small-intestine' && (
          <ellipse
            cx="575"
            cy="711"
            rx="150"
            ry="105"
            fill="url(#intestine-glow)"
            className="animate-pulse transition-opacity duration-200"
          />
        )}

        {/* 6. SPLEEN GLOW */}
        {activeOrganId === 'spleen' && (
          <ellipse
            cx="720"
            cy="567"
            rx="75"
            ry="85"
            fill="url(#spleen-glow)"
            className="animate-pulse transition-opacity duration-200"
          />
        )}

        {/* INVISIBLE INTERACTIVE SVG HITBOXES */}
        <g className="pointer-events-auto cursor-pointer">
          <ellipse
            cx="565"
            cy="519"
            rx="150"
            ry="65"
            transform="rotate(-5 565 519)"
            fill="transparent"
            onMouseEnter={() => handlePointerEnter('pancreas')}
            onClick={() => toggleOrgan('pancreas')}
            aria-label="Pancreas: Central Endocrine Gland"
          />
          <ellipse
            cx="535"
            cy="244"
            rx="120"
            ry="75"
            fill="transparent"
            onMouseEnter={() => handlePointerEnter('liver')}
            onClick={() => toggleOrgan('liver')}
            aria-label="Liver: Metabolic Hub"
          />
          <ellipse
            cx="420"
            cy="353"
            rx="55"
            ry="70"
            fill="transparent"
            onMouseEnter={() => handlePointerEnter('gallbladder')}
            onClick={() => toggleOrgan('gallbladder')}
            aria-label="Gall Bladder: Bile Storage"
          />
          <ellipse
            cx="655"
            cy="310"
            rx="115"
            ry="80"
            fill="transparent"
            onMouseEnter={() => handlePointerEnter('stomach')}
            onClick={() => toggleOrgan('stomach')}
            aria-label="Stomach: Digestive Reservoir"
          />
          <ellipse
            cx="575"
            cy="711"
            rx="135"
            ry="90"
            fill="transparent"
            onMouseEnter={() => handlePointerEnter('small-intestine')}
            onClick={() => toggleOrgan('small-intestine')}
            aria-label="Small Intestine: Incretin Secretion"
          />
          <ellipse
            cx="720"
            cy="567"
            rx="70"
            ry="80"
            fill="transparent"
            onMouseEnter={() => handlePointerEnter('spleen')}
            onClick={() => toggleOrgan('spleen')}
            aria-label="Spleen: Vascular and Immune Filter"
          />
        </g>
      </svg>

      {/* Interactive Hotspot Pills Matching Reference Design */}
      {ORGAN_HOTSPOTS.map((organ) => {
        const isHovered = activeOrganId === organ.id;
        const isPancreas = organ.isFocal;

        const tooltipPositionClass =
          organ.tooltipPlacement === 'top-left'
            ? 'right-0 bottom-full mb-2.5'
            : organ.tooltipPlacement === 'top-right'
            ? 'left-0 bottom-full mb-2.5'
            : organ.tooltipPlacement === 'top-center'
            ? 'left-1/2 -translate-x-1/2 bottom-full mb-2.5'
            : organ.tooltipPlacement === 'bottom-left'
            ? 'right-0 top-full mt-2.5'
            : organ.tooltipPlacement === 'bottom-right'
            ? 'left-0 top-full mt-2.5'
            : 'left-1/2 -translate-x-1/2 top-full mt-2.5';

        return (
          <div
            key={organ.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${
              isHovered ? 'z-50' : 'z-20'
            }`}
            style={{
              left: `${organ.x}%`,
              top: `${organ.y}%`,
            }}
          >
            <button
              type="button"
              onClick={() => toggleOrgan(organ.id)}
              onMouseEnter={() => handlePointerEnter(organ.id)}
              onMouseLeave={handlePointerLeave}
              onFocus={() => handlePointerEnter(organ.id)}
              onBlur={handlePointerLeave}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleOrgan(organ.id);
                } else if (e.key === 'Escape') {
                  dismissOrgan();
                }
              }}
              aria-expanded={isHovered}
              aria-controls={`organ-info-${organ.id}`}
              aria-label={`${localize(organ.name)}: ${localize(organ.badge || { en: 'Organ Information', hi: 'अंग विवरण' })}`}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5C4A] ${
                isPancreas
                  ? isHovered
                    ? 'bg-[#0B4636] text-white ring-4 ring-[#0F5C4A]/40 shadow-[0_0_20px_rgba(15,92,74,0.5)] scale-105'
                    : 'bg-[#007A58] text-white ring-2 ring-[#007A58]/30 shadow-[0_4px_14px_rgba(0,122,88,0.35)] hover:scale-105'
                  : isHovered
                  ? 'bg-[#0F5C4A] text-white border border-[#0F5C4A] shadow-md scale-105 ring-2 ring-[#0F5C4A]/30'
                  : 'bg-white/90 backdrop-blur-xs text-[#1B2A26] border border-[#E8E2D5] shadow-xs hover:border-[#0F5C4A] hover:bg-white'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isPancreas
                    ? 'bg-white text-[#007A58]'
                    : isHovered
                    ? 'bg-white text-[#0F5C4A]'
                    : 'bg-[#F5EFE6] text-[#B8862B] border border-[#E8E2D5]'
                }`}
              >
                <Plus className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span>{localize(organ.name)}</span>
            </button>

            {/* Hover & Touch Tooltip Card */}
            {isHovered && (
              <div
                id={`organ-info-${organ.id}`}
                role="dialog"
                aria-label={localize(organ.name)}
                className={`absolute ${tooltipPositionClass} w-64 p-3.5 rounded-2xl bg-white border border-[#E8E2D5] shadow-[0_16px_36px_rgba(27,42,38,0.18)] z-40 animate-in fade-in zoom-in-95 duration-150 text-left pointer-events-auto`}
                onMouseEnter={() => handlePointerEnter(organ.id)}
                onMouseLeave={handlePointerLeave}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="font-serif font-bold text-sm text-[#1B2A26] flex items-center gap-1.5">
                    {isPancreas && <Activity className="w-3.5 h-3.5 text-[#B8862B]" />}
                    <span>{localize(organ.name)}</span>
                  </h4>
                  <div className="flex items-center gap-1">
                    {organ.badge && (
                      <span className="text-[9.5px] uppercase font-bold text-[#875D14] bg-[#F5EFE6] px-2 py-0.5 rounded-full border border-[#E8E2D5] whitespace-nowrap">
                        {localize(organ.badge)}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        dismissOrgan();
                      }}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[#4A5753] hover:text-[#1B2A26] hover:bg-[#F5EFE6] transition-colors ml-0.5"
                      aria-label={isHindi ? 'विवरण बंद करें' : 'Close details'}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#4A5753] leading-relaxed line-clamp-3 mb-2.5">
                  {localize(organ.description)}
                </p>
                <Link
                  to={organ.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0F5C4A] hover:underline"
                >
                  <span>{isHindi ? 'विस्तार से जानें' : 'Learn more'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        );
      })}

      {/* Hand-drawn Interactive Prompt with Curved Arrow matching reference design */}
      <div
        className="absolute right-[0.5%] sm:right-[1.5%] bottom-[17%] sm:bottom-[19%] flex flex-col items-center pointer-events-none select-none z-20 opacity-95 transition-opacity duration-300"
        aria-hidden="true"
      >
        {/* Curved arrow arching up-left towards organs */}
        <svg
          className="w-8 h-6 sm:w-9 sm:h-7 text-[#C6EFE2] -mb-0.5 ml-2"
          viewBox="0 0 40 28"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M 32 23 C 27 11, 17 6, 7 8"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 13 4 L 6 8 L 12 13"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="font-serif italic text-xs sm:text-[12.5px] text-[#C6EFE2] tracking-wide leading-tight text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] whitespace-nowrap">
          <span>{isHindi ? 'प्रत्येक अंग पर' : 'Click on each part'}</span>
          <br />
          <span>{isHindi ? 'क्लिक करके जानें' : 'to learn more'}</span>
        </div>
      </div>
    </div>
  );
};

export default OrganHeroInteractive;
