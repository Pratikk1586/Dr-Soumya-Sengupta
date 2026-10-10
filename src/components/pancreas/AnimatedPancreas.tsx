import React, { useState, useCallback } from 'react';
import { Sparkles, Activity } from 'lucide-react';
import {
  PANCREAS_DATA,
  HOTSPOT_LIST,
  CATEGORY_TABS,
  type PancreasPartId,
  type PancreasPartCategory,
} from './pancreasData';

export interface AnimatedPancreasProps {
  className?: string;
  style?: React.CSSProperties;
  showDetailsCard?: boolean;
  showMedicalBadges?: boolean;
  showHotspots?: boolean;
  showCategoryTabs?: boolean;
  enableParallax?: boolean;
  initialPart?: PancreasPartId | null;
  onPartHover?: (part: PancreasPartId | null) => void;
  onPartClick?: (part: PancreasPartId) => void;
}

// ----------------------------------------------------------------------------
// 1. EMBEDDED STYLES FOR FLUID ENZYME FLOW & GLOW
// ----------------------------------------------------------------------------
const EMBEDDED_STYLES = `
@keyframes ap-duct-flow-anim {
  from { stroke-dashoffset: 36; }
  to { stroke-dashoffset: 0; }
}
.ap-duct-fluid-flow {
  stroke-dasharray: 6 12;
  animation: ap-duct-flow-anim 2.5s linear infinite;
}
.ap-glow-blend {
  mix-blend-mode: screen;
  pointer-events: none;
}
.ap-glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 10px 25px -5px rgba(15, 61, 74, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04);
}
`;

// ----------------------------------------------------------------------------
// 2. HIGH-FIDELITY ANATOMICAL SVG PATHS (540x500 Canvas)
// ----------------------------------------------------------------------------
const SYSTEM_PATHS = {
  // --- 1. STOMACH (Translucent retroperitoneal backdrop) ---
  stomachBackdrop:
    'M 205,80 C 235,50 310,50 365,75 C 415,100 425,145 405,185 C 385,220 335,215 285,210 C 240,205 205,185 180,165 C 165,152 175,120 185,105 Z',
  stomachRugaeFolds: [
    'M 240,85 C 275,100 315,95 345,115',
    'M 260,115 C 295,125 335,120 365,140',
    'M 280,145 C 315,150 345,145 375,160',
  ],

  // --- 2. SPLEEN (Abutting pancreatic tail at splenorenal hilum) ---
  spleen:
    'M 452,105 C 488,125 506,170 492,218 C 476,256 450,268 434,248 C 440,225 442,192 436,158 C 433,140 440,118 452,105 Z',
  spleenHilumNotch:
    'M 436,165 C 442,185 442,210 436,230',

  // --- 3. GALLBLADDER & BILIARY TREE (Above duodenum) ---
  gallbladder:
    'M 134,74 C 120,86 120,112 136,128 C 150,142 168,138 172,124 C 174,108 162,78 144,70 C 140,70 137,71 134,74 Z',
  cysticDuct:
    'M 166,128 C 164,142 172,150 170,165',
  commonHepaticDuct:
    'M 182,142 C 178,154 174,160 170,165',
  commonBileDuct:
    'M 170,165 C 166,192 160,230 154,268',

  // --- 4. DUODENUM (Tubular C-Loop: D1 bulb, D2 descending, D3 horizontal, D4 ascending) ---
  duodenumOuter:
    'M 175,148 C 118,148 78,188 78,248 C 78,312 116,366 175,372 C 218,376 250,355 260,328 L 238,312 C 228,332 205,346 175,344 C 130,338 106,298 106,248 C 106,198 132,175 175,175 Z',
  duodenumInnerLumen:
    'M 172,175 C 134,182 108,210 108,248 C 108,292 128,332 172,344',
  duodenalFolds: [
    'M 118,198 Q 134,208 150,202',
    'M 104,228 Q 122,238 140,230',
    'M 102,260 Q 122,268 142,260',
    'M 108,294 Q 128,302 148,292',
    'M 124,324 Q 146,334 168,322',
    'M 152,348 Q 174,354 196,340',
  ],

  // --- 5. PANCREAS HEAD & UNCINATE PROCESS ---
  headParenchyma:
    'M 168,186 C 140,202 132,250 142,284 C 152,314 176,338 210,338 C 228,338 234,324 230,305 C 226,285 230,264 238,250 C 222,234 210,216 202,195 C 192,184 180,182 168,186 Z',
  uncinateProcess:
    'M 188,315 C 195,338 222,342 234,324 C 230,308 215,304 200,304 Z',
  headLobuleContours: [
    'M 158,228 Q 174,238 188,232',
    'M 154,265 Q 172,274 190,266',
    'M 170,298 Q 188,306 206,295',
  ],

  // --- 6. PANCREAS NECK & BODY (Corpus with acinar cobblestone lobules) ---
  pancreaticNeck:
    'M 228,250 C 236,232 248,224 260,220 L 260,268 C 248,268 236,262 228,250 Z',
  bodyParenchyma:
    'M 258,220 C 290,212 332,202 374,188 L 370,230 C 330,244 292,256 258,268 Z',
  bodyLobuleContours: [
    'M 270,232 Q 288,244 306,236',
    'M 308,220 Q 326,232 344,224',
    'M 338,212 Q 356,222 372,214',
  ],

  // Glandular acinar cobblestone micro-lobules
  acinarCobblestones: [
    { cx: 282, cy: 232, r: 9 },
    { cx: 298, cy: 242, r: 8.5 },
    { cx: 318, cy: 226, r: 9.5 },
    { cx: 334, cy: 238, r: 8 },
    { cx: 352, cy: 218, r: 9 },
    { cx: 366, cy: 226, r: 8.5 },
    { cx: 172, cy: 220, r: 9 },
    { cx: 185, cy: 240, r: 8 },
    { cx: 168, cy: 255, r: 8.5 },
    { cx: 184, cy: 275, r: 9 },
    { cx: 202, cy: 295, r: 8.5 },
    { cx: 212, cy: 318, r: 7.5 },
  ],

  // --- 7. PANCREAS TAIL (Cauda - Reaching into splenic hilum) ---
  tailParenchyma:
    'M 374,188 C 404,178 428,166 444,160 C 450,158 454,164 450,172 C 436,190 408,214 370,230 Z',
  tailLobuleContours: [
    'M 385,198 Q 402,204 418,194',
    'M 412,184 Q 426,186 438,176',
  ],

  // --- 8. MAIN PANCREATIC DUCT (Wirsung & Santorini) ---
  mainDuct:
    'M 440,166 C 408,182 368,202 328,218 C 288,234 250,248 220,256 C 196,262 176,266 154,268',
  accessoryDuct:
    'M 205,258 C 188,250 172,240 162,232',
  ductBranches: [
    'M 416,176 Q 410,166 404,164',
    'M 382,196 Q 376,184 372,180',
    'M 386,204 Q 394,216 400,220',
    'M 346,212 Q 340,200 334,196',
    'M 352,220 Q 360,232 366,236',
    'M 306,228 Q 300,214 296,210',
    'M 314,236 Q 322,248 328,252',
    'M 268,242 Q 262,230 258,226',
    'M 272,250 Q 280,264 288,268',
    'M 188,266 Q 182,280 178,290',
  ],

  // --- 9. VASCULAR SYSTEM (Aorta, Celiac, Splenic & Mesenteric Vessels) ---
  celiacTrunk:
    'M 238,155 L 244,155 L 244,178 L 238,178 Z',
  splenicArtery:
    'M 242,175 C 262,158 282,182 306,164 C 328,148 348,174 372,154 C 396,138 418,162 442,144 C 452,136 462,144 470,140',
  pancreaticArteryBranches: [
    'M 285,178 Q 286,198 288,218',
    'M 335,168 Q 336,188 338,206',
    'M 388,158 Q 390,178 392,194',
  ],
  splenicVein:
    'M 448,154 C 424,170 388,186 348,200 C 308,214 268,228 232,242',
  portalVein:
    'M 232,242 C 228,215 220,185 214,155 L 224,152 C 230,182 238,212 242,242 Z',
  mesentericArtery:
    'M 234,245 C 238,275 244,315 248,360',
  mesentericVein:
    'M 226,245 C 230,275 234,315 238,360',
};

// ----------------------------------------------------------------------------
// 3. SVG DEFINITIONS (GRADIENTS & ANATOMICAL LIGHTING)
// ----------------------------------------------------------------------------
function PancreasSVGDefs() {
  return (
    <defs>
      {/* Soft Glow Filter */}
      <filter id="ap-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="7" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Realistic Drop Shadow */}
      <filter id="ap-organ-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f3d4a" floodOpacity="0.16" />
      </filter>

      {/* Stomach Backdrop Gradient (Ghostly Translucent Anatomical Depth) */}
      <linearGradient id="ap-stomach-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.45" />
        <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.15" />
      </linearGradient>

      {/* Spleen Gradient (Deep Plum / Crimson) */}
      <linearGradient id="ap-spleen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9f1239" />
        <stop offset="50%" stopColor="#831843" />
        <stop offset="100%" stopColor="#4c0519" />
      </linearGradient>

      {/* Gallbladder Gradient (Jade / Forest Green) */}
      <linearGradient id="ap-gallbladder-grad" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="#6ee7b7" />
        <stop offset="40%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#065f46" />
      </linearGradient>

      {/* Bile Duct Gradient */}
      <linearGradient id="ap-bile-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>

      {/* Duodenum Mucosa Gradient (Anatomical Coral / Rose) */}
      <linearGradient id="ap-duodenum-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fda4af" />
        <stop offset="45%" stopColor="#fb7185" />
        <stop offset="100%" stopColor="#e11d48" />
      </linearGradient>

      {/* Golden-Amber Pancreas Parenchyma Gradient */}
      <linearGradient id="ap-pancreas-grad" x1="0%" y1="0%" x2="100%" y2="70%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="30%" stopColor="#f59e0b" />
        <stop offset="75%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>

      {/* Crest Specular Highlight */}
      <linearGradient id="ap-pancreas-crest" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#fef08a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
      </linearGradient>

      {/* Acinar Cobblestone Gradient */}
      <radialGradient id="ap-acinar-grad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
        <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.1" />
      </radialGradient>

      {/* Luminescent Pancreatic Duct Gradient */}
      <linearGradient id="ap-duct-grad" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a7f3d0" />
        <stop offset="50%" stopColor="#2dd4bf" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>

      {/* Splenic Artery Gradient (Crimson) */}
      <linearGradient id="ap-artery-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="60%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>

      {/* Splenic / Portal Vein Gradient (Royal Azure) */}
      <linearGradient id="ap-vein-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="60%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>

      {/* Bioluminescent Islet Gradient */}
      <radialGradient id="ap-islet-grad" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#fde047" />
        <stop offset="80%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </radialGradient>
    </defs>
  );
}

// ----------------------------------------------------------------------------
// 4. MAIN ANIMATED PANCREAS SYSTEM COMPONENT
// ----------------------------------------------------------------------------
export const AnimatedPancreas: React.FC<AnimatedPancreasProps> = ({
  className = '',
  style,
  showDetailsCard = true,
  showMedicalBadges: _showMedicalBadges = false,
  showHotspots = true,
  showCategoryTabs = false,
  enableParallax: _enableParallax = false,
  initialPart = null,
  onPartHover,
  onPartClick,
}) => {
  const [hoveredPart, setHoveredPart] = useState<PancreasPartId | null>(null);
  const [selectedPart, setSelectedPart] = useState<PancreasPartId | null>(initialPart);
  const [activeCategory, setActiveCategory] = useState<PancreasPartCategory>('all');

  const handlePartHover = useCallback(
    (part: PancreasPartId | null) => {
      setHoveredPart(part);
      if (onPartHover) onPartHover(part);
    },
    [onPartHover]
  );

  const handlePartClick = useCallback(
    (part: PancreasPartId) => {
      setSelectedPart((prev) => (prev === part ? null : part));
      if (onPartClick) onPartClick(part);
    },
    [onPartClick]
  );

  const displayedPart = hoveredPart || selectedPart;
  const activeDetails = displayedPart ? PANCREAS_DATA[displayedPart] : null;

  const isPartDimmed = useCallback(
    (partId: PancreasPartId): boolean => {
      if (activeCategory === 'all') return false;
      const partInfo = PANCREAS_DATA[partId];
      if (!partInfo) return false;
      return partInfo.category !== activeCategory;
    },
    [activeCategory]
  );

  return (
    <div
      className={`relative select-none flex flex-col items-center justify-center overflow-hidden max-w-full ${className}`}
      style={{ width: '100%', height: '100%', ...style }}
      role="region"
      aria-label="3D Interactive Pancreas & Endocrine Visualization"
    >
      <style>{EMBEDDED_STYLES}</style>

      {/* Ambient Background Aura */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 380,
          height: 380,
          background:
            'radial-gradient(circle, rgba(245, 158, 11, 0.14) 0%, rgba(20, 184, 166, 0.08) 50%, transparent 70%)',
          filter: 'blur(65px)',
          zIndex: 0,
        }}
      />

      {/* Optional Category Filter Switcher */}
      {showCategoryTabs && (
        <div className="w-full max-w-md px-3 mb-2 z-20 flex items-center justify-center">
          <div className="inline-flex items-center gap-1 p-1 bg-white/90 backdrop-blur-md rounded-xl border border-slate-200 shadow-2xs text-[11px] font-semibold text-slate-700 overflow-x-auto max-w-full">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${activeCategory === tab.id
                    ? 'bg-[#0f3d4a] text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                aria-pressed={activeCategory === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Medical Diagram SVG Container (Stationary & Fixed Aspect) */}
      <div className="relative w-full max-w-[520px] aspect-[540/480] shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 540 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xl"
          style={{
            maxWidth: 520,
            maxHeight: 480,
            zIndex: 10,
          }}
        >
        <PancreasSVGDefs />

        {/* Stable Stage (No scaling/jitter on hover) */}
        <g id="pancreas-system-stage">
          {/* Anatomical Grid / Orientation Rings */}
          <g opacity="0.1" pointerEvents="none">
            <circle cx="270" cy="245" r="200" stroke="#0f3d4a" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="270" cy="245" r="140" stroke="#0f3d4a" strokeWidth="0.8" />
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 0. STOMACH BACKDROP (Translucent retroperitoneal context)    */}
          {/* ------------------------------------------------------------ */}
          <g id="stomach-backdrop" pointerEvents="none" opacity="0.22">
            <path
              d={SYSTEM_PATHS.stomachBackdrop}
              fill="url(#ap-stomach-grad)"
              stroke="#94a3b8"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
            {SYSTEM_PATHS.stomachRugaeFolds.map((fold, idx) => (
              <path
                key={idx}
                d={fold}
                stroke="#94a3b8"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
                strokeLinecap="round"
              />
            ))}
            <text
              x="290"
              y="115"
              fill="#64748b"
              fontSize="7.5"
              fontWeight="600"
              opacity="0.75"
              letterSpacing="0.08em"
            >
              STOMACH (ANTERIOR BED)
            </text>
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 1. THE SPLEEN (Abutting the pancreatic tail at upper-right)  */}
          {/* ------------------------------------------------------------ */}
          <g
            id="spleen"
            className="cursor-pointer"
            opacity={isPartDimmed('tail') ? 0.25 : 1}
            onMouseEnter={() => handlePartHover('tail')}
            onMouseLeave={() => handlePartHover(null)}
            onClick={() => handlePartClick('tail')}
          >
            {displayedPart === 'tail' && (
              <path
                d={SYSTEM_PATHS.spleen}
                fill="#9f1239"
                opacity="0.3"
                filter="url(#ap-glow)"
                pointerEvents="none"
              />
            )}
            <path
              d={SYSTEM_PATHS.spleen}
              fill="url(#ap-spleen-grad)"
              filter="url(#ap-organ-shadow)"
              style={{
                filter: displayedPart === 'tail' ? 'brightness(1.2) drop-shadow(0 0 10px rgba(159,18,57,0.7))' : 'none',
                transition: 'filter 0.2s ease',
              }}
            />
            {/* Splenic Hilum Notch */}
            <path
              d={SYSTEM_PATHS.spleenHilumNotch}
              stroke="#fbcfe8"
              strokeWidth="2"
              strokeOpacity="0.5"
              fill="none"
              strokeLinecap="round"
              pointerEvents="none"
            />
            {/* Spleen Anatomical Label */}
            <text
              x="475"
              y="185"
              fill="#ffffff"
              fontSize="8"
              fontWeight="700"
              opacity="0.8"
              textAnchor="middle"
              pointerEvents="none"
              letterSpacing="0.05em"
            >
              SPLEEN
            </text>
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 2. GREAT VESSELS (Aorta, Portal Vein, Mesenteric Axis)       */}
          {/* ------------------------------------------------------------ */}
          <g
            id="vasculature-veins"
            className="cursor-pointer"
            opacity={isPartDimmed('vasculature') ? 0.25 : 1}
            onMouseEnter={() => handlePartHover('vasculature')}
            onMouseLeave={() => handlePartHover(null)}
            onClick={() => handlePartClick('vasculature')}
          >
            {/* Portal Vein Confluence heading superolaterally */}
            <path
              d={SYSTEM_PATHS.portalVein}
              fill="url(#ap-vein-grad)"
              style={{
                filter: displayedPart === 'vasculature' ? 'brightness(1.25) drop-shadow(0 0 8px rgba(37,99,235,0.8))' : 'none',
                transition: 'filter 0.2s ease',
              }}
            />
            {/* Splenic Vein passing behind pancreas body */}
            <path
              d={SYSTEM_PATHS.splenicVein}
              stroke="url(#ap-vein-grad)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              style={{
                filter: displayedPart === 'vasculature' ? 'brightness(1.25) drop-shadow(0 0 8px rgba(37,99,235,0.8))' : 'none',
                transition: 'filter 0.2s ease',
              }}
            />
            {/* Superior Mesenteric Vein (SMV) */}
            <path
              d={SYSTEM_PATHS.mesentericVein}
              stroke="url(#ap-vein-grad)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              pointerEvents="none"
            />
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 3. GALLBLADDER & BILIARY TREE (Upper Left)                   */}
          {/* ------------------------------------------------------------ */}
          <g
            id="gallbladder-and-biliary"
            className="cursor-pointer"
            opacity={isPartDimmed('bile-duct') ? 0.25 : 1}
            onMouseEnter={() => handlePartHover('bile-duct')}
            onMouseLeave={() => handlePartHover(null)}
            onClick={() => handlePartClick('bile-duct')}
          >
            {/* Gallbladder Fundus & Body */}
            {displayedPart === 'bile-duct' && (
              <path
                d={SYSTEM_PATHS.gallbladder}
                fill="#10b981"
                opacity="0.35"
                filter="url(#ap-glow)"
                pointerEvents="none"
              />
            )}
            <path
              d={SYSTEM_PATHS.gallbladder}
              fill="url(#ap-gallbladder-grad)"
              filter="url(#ap-organ-shadow)"
              style={{
                filter: displayedPart === 'bile-duct' ? 'brightness(1.2) drop-shadow(0 0 10px rgba(16,185,129,0.7))' : 'none',
                transition: 'filter 0.2s ease',
              }}
            />
            {/* Cystic Duct with spiral valve of Heister */}
            <path
              d={SYSTEM_PATHS.cysticDuct}
              stroke="url(#ap-bile-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              pointerEvents="none"
            />
            {/* Common Hepatic Duct */}
            <path
              d={SYSTEM_PATHS.commonHepaticDuct}
              stroke="url(#ap-bile-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              pointerEvents="none"
            />
            {/* Common Bile Duct (Choledochus descending to papilla) */}
            <path
              d={SYSTEM_PATHS.commonBileDuct}
              stroke="url(#ap-bile-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              style={{
                filter: displayedPart === 'bile-duct' ? 'brightness(1.25) drop-shadow(0 0 8px rgba(16,185,129,0.8))' : 'none',
                transition: 'filter 0.2s ease',
              }}
            />
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 4. DUODENUM (Tubular C-Loop: D1 Bulb, D2, D3, D4)            */}
          {/* ------------------------------------------------------------ */}
          <g
            id="duodenum"
            className="cursor-pointer"
            opacity={isPartDimmed('duodenum') ? 0.25 : 1}
            onMouseEnter={() => handlePartHover('duodenum')}
            onMouseLeave={() => handlePartHover(null)}
            onClick={() => handlePartClick('duodenum')}
          >
            {displayedPart === 'duodenum' && (
              <path
                d={SYSTEM_PATHS.duodenumOuter}
                fill="#fb7185"
                opacity="0.3"
                filter="url(#ap-glow)"
                pointerEvents="none"
              />
            )}
            {/* Duodenal outer muscular tube */}
            <path
              d={SYSTEM_PATHS.duodenumOuter}
              fill="url(#ap-duodenum-grad)"
              filter="url(#ap-organ-shadow)"
              style={{
                filter: displayedPart === 'duodenum' ? 'brightness(1.15) drop-shadow(0 0 10px rgba(251,113,133,0.7))' : 'none',
                transition: 'filter 0.2s ease',
              }}
            />
            {/* Inner mucosal lumen wall */}
            <path
              d={SYSTEM_PATHS.duodenumInnerLumen}
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeOpacity="0.45"
              fill="none"
              strokeLinecap="round"
              pointerEvents="none"
            />
            {/* Circular mucosal folds (Plicae Circulares) */}
            {SYSTEM_PATHS.duodenalFolds.map((fold, idx) => (
              <path
                key={idx}
                d={fold}
                stroke="#ffe4e6"
                strokeWidth="1.6"
                strokeOpacity="0.55"
                fill="none"
                strokeLinecap="round"
                pointerEvents="none"
              />
            ))}
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 5. PANCREAS HEAD & UNCINATE PROCESS                          */}
          {/* ------------------------------------------------------------ */}
          <g
            id="head"
            className="cursor-pointer"
            opacity={isPartDimmed('head') ? 0.25 : 1}
            onMouseEnter={() => handlePartHover('head')}
            onMouseLeave={() => handlePartHover(null)}
            onClick={() => handlePartClick('head')}
          >
            {displayedPart === 'head' && (
              <path
                d={SYSTEM_PATHS.headParenchyma}
                fill="#f59e0b"
                opacity="0.35"
                filter="url(#ap-glow)"
                pointerEvents="none"
              />
            )}
            <path
              d={SYSTEM_PATHS.headParenchyma}
              fill="url(#ap-pancreas-grad)"
              filter="url(#ap-organ-shadow)"
              style={{
                filter: displayedPart === 'head' ? 'brightness(1.15) drop-shadow(0 0 10px rgba(245,158,11,0.7))' : 'none',
                transition: 'filter 0.2s ease',
              }}
            />
            {/* Uncinate process hooking medially under mesenteric vessels */}
            <path
              d={SYSTEM_PATHS.uncinateProcess}
              fill="url(#ap-pancreas-grad)"
              opacity="0.92"
              pointerEvents="none"
            />
            {/* Acinar glandular lobule contours */}
            {SYSTEM_PATHS.headLobuleContours.map((contour, i) => (
              <path
                key={i}
                d={contour}
                stroke="#fde68a"
                strokeWidth="1.4"
                strokeOpacity="0.45"
                fill="none"
                strokeLinecap="round"
                pointerEvents="none"
              />
            ))}
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 6. PANCREAS NECK & BODY (Corpus with acinar lobulation)      */}
          {/* ------------------------------------------------------------ */}
          <g
            id="body"
            className="cursor-pointer"
            opacity={isPartDimmed('body') ? 0.25 : 1}
            onMouseEnter={() => handlePartHover('body')}
            onMouseLeave={() => handlePartHover(null)}
            onClick={() => handlePartClick('body')}
          >
            {displayedPart === 'body' && (
              <path
                d={SYSTEM_PATHS.bodyParenchyma}
                fill="#f59e0b"
                opacity="0.35"
                filter="url(#ap-glow)"
                pointerEvents="none"
              />
            )}
            {/* Pancreatic Neck */}
            <path
              d={SYSTEM_PATHS.pancreaticNeck}
              fill="url(#ap-pancreas-grad)"
              opacity="0.95"
              pointerEvents="none"
            />
            {/* Pancreatic Body */}
            <path
              d={SYSTEM_PATHS.bodyParenchyma}
              fill="url(#ap-pancreas-grad)"
              filter="url(#ap-organ-shadow)"
              style={{
                filter: displayedPart === 'body' ? 'brightness(1.15) drop-shadow(0 0 10px rgba(245,158,11,0.7))' : 'none',
                transition: 'filter 0.2s ease',
              }}
            />
            {/* Anterior crest highlight */}
            <path
              d={SYSTEM_PATHS.bodyParenchyma}
              fill="url(#ap-pancreas-crest)"
              className="ap-glow-blend"
              pointerEvents="none"
            />
            {/* Cobblestone acinar lobule markings */}
            {SYSTEM_PATHS.bodyLobuleContours.map((contour, i) => (
              <path
                key={i}
                d={contour}
                stroke="#fde68a"
                strokeWidth="1.4"
                strokeOpacity="0.45"
                fill="none"
                strokeLinecap="round"
                pointerEvents="none"
              />
            ))}

            {/* Glandular Acinar Cobblestone Micro-Lobules */}
            <g pointerEvents="none" opacity="0.65">
              {SYSTEM_PATHS.acinarCobblestones.map((cobble, idx) => (
                <circle
                  key={idx}
                  cx={cobble.cx}
                  cy={cobble.cy}
                  r={cobble.r}
                  fill="url(#ap-acinar-grad)"
                  stroke="#fef08a"
                  strokeWidth="0.8"
                  strokeOpacity="0.35"
                />
              ))}
            </g>
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 7. PANCREAS TAIL (Cauda - Tapered into splenic hilum)        */}
          {/* ------------------------------------------------------------ */}
          <g
            id="tail"
            className="cursor-pointer"
            opacity={isPartDimmed('tail') ? 0.25 : 1}
            onMouseEnter={() => handlePartHover('tail')}
            onMouseLeave={() => handlePartHover(null)}
            onClick={() => handlePartClick('tail')}
          >
            {displayedPart === 'tail' && (
              <path
                d={SYSTEM_PATHS.tailParenchyma}
                fill="#f59e0b"
                opacity="0.35"
                filter="url(#ap-glow)"
                pointerEvents="none"
              />
            )}
            <path
              d={SYSTEM_PATHS.tailParenchyma}
              fill="url(#ap-pancreas-grad)"
              filter="url(#ap-organ-shadow)"
              style={{
                filter: displayedPart === 'tail' ? 'brightness(1.15) drop-shadow(0 0 10px rgba(245,158,11,0.7))' : 'none',
                transition: 'filter 0.2s ease',
              }}
            />
            <path
              d={SYSTEM_PATHS.tailParenchyma}
              fill="url(#ap-pancreas-crest)"
              className="ap-glow-blend"
              pointerEvents="none"
            />
            {SYSTEM_PATHS.tailLobuleContours.map((contour, i) => (
              <path
                key={i}
                d={contour}
                stroke="#fde68a"
                strokeWidth="1.4"
                strokeOpacity="0.45"
                fill="none"
                strokeLinecap="round"
                pointerEvents="none"
              />
            ))}
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 8. MAIN PANCREATIC DUCT (Duct of Wirsung, Santorini, Ampulla)*/}
          {/* ------------------------------------------------------------ */}
          <g
            id="duct"
            className="cursor-pointer"
            opacity={isPartDimmed('duct') ? 0.25 : 1}
            onMouseEnter={() => handlePartHover('duct')}
            onMouseLeave={() => handlePartHover(null)}
            onClick={() => handlePartClick('duct')}
          >
            {/* Herringbone Tributary Branchlets */}
            {SYSTEM_PATHS.ductBranches.map((branch, i) => (
              <path
                key={i}
                d={branch}
                stroke="url(#ap-duct-grad)"
                strokeWidth="1.6"
                strokeOpacity="0.8"
                fill="none"
                strokeLinecap="round"
                pointerEvents="none"
              />
            ))}

            {/* Accessory Pancreatic Duct (Santorini) */}
            <path
              d={SYSTEM_PATHS.accessoryDuct}
              stroke="url(#ap-duct-grad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              pointerEvents="none"
            />

            {/* Main Pancreatic Duct Spine */}
            <path
              d={SYSTEM_PATHS.mainDuct}
              stroke="url(#ap-duct-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              style={{
                filter: displayedPart === 'duct' ? 'brightness(1.3) drop-shadow(0 0 8px rgba(45,212,191,0.9))' : 'none',
                transition: 'filter 0.2s ease',
              }}
            />

            {/* Animated Enzyme Fluid Wave Overlay */}
            <path
              d={SYSTEM_PATHS.mainDuct}
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              className="ap-duct-fluid-flow"
              opacity="0.9"
              pointerEvents="none"
            />

            {/* Major Duodenal Papilla (Ampulla of Vater) Sphincter */}
            <circle cx="154" cy="268" r="5" fill="#2dd4bf" filter="url(#ap-glow)" pointerEvents="none" />
            <circle cx="154" cy="268" r="2.5" fill="#ffffff" pointerEvents="none" />
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 9. ISLETS OF LANGERHANS (Endocrine Micro-Clusters)           */}
          {/* ------------------------------------------------------------ */}
          <g
            id="islets"
            className="cursor-pointer"
            opacity={isPartDimmed('islets') ? 0.25 : 1}
            onMouseEnter={() => handlePartHover('islets')}
            onMouseLeave={() => handlePartHover(null)}
            onClick={() => handlePartClick('islets')}
          >
            {[
              { cx: 420, cy: 172, r: 6.5 },
              { cx: 395, cy: 198, r: 7.0 },
              { cx: 368, cy: 185, r: 6.0 },
              { cx: 335, cy: 220, r: 7.5 },
              { cx: 288, cy: 236, r: 6.5 },
              { cx: 250, cy: 248, r: 6.0 },
              { cx: 195, cy: 285, r: 7.0 },
            ].map((islet, i) => (
              <g key={i} pointerEvents="all">
                {/* Bioluminescent Outer Pulse Ring */}
                <circle
                  cx={islet.cx}
                  cy={islet.cy}
                  r={islet.r * 1.6}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.2"
                  opacity={displayedPart === 'islets' ? 0.95 : 0.4}
                  style={{
                    filter: displayedPart === 'islets' ? 'drop-shadow(0 0 6px #f59e0b)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                  pointerEvents="none"
                />
                {/* Islet Body */}
                <circle
                  cx={islet.cx}
                  cy={islet.cy}
                  r={islet.r}
                  fill="url(#ap-islet-grad)"
                  style={{
                    filter: displayedPart === 'islets' ? 'brightness(1.2)' : 'none',
                  }}
                />
                {/* Beta Cell Core Glare */}
                <circle
                  cx={islet.cx - islet.r * 0.3}
                  cy={islet.cy - islet.r * 0.3}
                  r={islet.r * 0.35}
                  fill="#ffffff"
                  opacity="0.9"
                  pointerEvents="none"
                />
              </g>
            ))}
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 10. ANTERIOR ARTERIAL VASCULATURE (Splenic & SMA)            */}
          {/* ------------------------------------------------------------ */}
          <g
            id="vasculature-arteries"
            className="cursor-pointer"
            opacity={isPartDimmed('vasculature') ? 0.25 : 1}
            onMouseEnter={() => handlePartHover('vasculature')}
            onMouseLeave={() => handlePartHover(null)}
            onClick={() => handlePartClick('vasculature')}
          >
            {/* Celiac trunk root */}
            <path d={SYSTEM_PATHS.celiacTrunk} fill="#dc2626" pointerEvents="none" />
            {/* Splenic Artery undulating along superior crest */}
            <path
              d={SYSTEM_PATHS.splenicArtery}
              stroke="url(#ap-artery-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              style={{
                filter: displayedPart === 'vasculature' ? 'brightness(1.25) drop-shadow(0 0 8px rgba(220,38,38,0.8))' : 'none',
                transition: 'filter 0.2s ease',
              }}
            />
            {/* Intrinsic pancreatic artery branches (a. pancreatica magna) */}
            {SYSTEM_PATHS.pancreaticArteryBranches.map((br, idx) => (
              <path
                key={idx}
                d={br}
                stroke="url(#ap-artery-grad)"
                strokeWidth="1.6"
                strokeOpacity="0.75"
                fill="none"
                strokeLinecap="round"
                pointerEvents="none"
              />
            ))}
            {/* Superior Mesenteric Artery (SMA) crossing over uncinate process */}
            <path
              d={SYSTEM_PATHS.mesentericArtery}
              stroke="url(#ap-artery-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              pointerEvents="none"
            />
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 11. CLEAR, NON-OVERLAPPING HOTSPOT PINS                      */}
          {/* ------------------------------------------------------------ */}
          {showHotspots && (
            <g id="hotspots-layer">
              {HOTSPOT_LIST.map((partId) => {
                const part = PANCREAS_DATA[partId];
                if (!part || isPartDimmed(partId)) return null;
                const isCurrent = displayedPart === partId;

                return (
                  <g key={partId}>
                    {/* Clear Leader Line */}
                    <line
                      x1={part.hotspot.cx}
                      y1={part.hotspot.cy}
                      x2={part.hotspot.calloutX}
                      y2={part.hotspot.calloutY}
                      stroke={isCurrent ? '#0f3d4a' : 'rgba(15, 61, 74, 0.3)'}
                      strokeWidth={isCurrent ? 1.5 : 1}
                      strokeDasharray="2 3"
                      pointerEvents="none"
                    />

                    {/* Anatomical Target Radar Dot */}
                    <circle
                      cx={part.hotspot.cx}
                      cy={part.hotspot.cy}
                      r={4}
                      fill={isCurrent ? '#0f3d4a' : '#f59e0b'}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      pointerEvents="none"
                    />

                    {/* Interactive Hotspot Callout Button (Accessible & Non-glitchy) */}
                    <g
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect ${part.hotspot.title}`}
                      className="cursor-pointer focus-visible:outline-none"
                      transform={`translate(${part.hotspot.calloutX}, ${part.hotspot.calloutY})`}
                      onClick={() => handlePartClick(partId)}
                      onMouseEnter={() => handlePartHover(partId)}
                      onMouseLeave={() => handlePartHover(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handlePartClick(partId);
                        }
                      }}
                    >
                      <rect
                        x="-50"
                        y="-12"
                        width="100"
                        height="24"
                        rx="12"
                        pointerEvents="all"
                        fill={isCurrent ? '#0f3d4a' : 'rgba(255, 255, 255, 0.95)'}
                        stroke={isCurrent ? '#14b8a6' : 'rgba(15, 61, 74, 0.25)'}
                        strokeWidth="1.2"
                        filter="url(#ap-organ-shadow)"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="700"
                        fontFamily="sans-serif"
                        fill={isCurrent ? '#ffffff' : '#0f3d4a'}
                        letterSpacing="0.02em"
                        pointerEvents="none"
                      >
                        {part.hotspot.title}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          )}
        </g>
      </svg>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 5. PREDEFINED FIXED-HEIGHT INFO CARD AREA (ZERO LAYOUT SHIFT)           */}
      {/* ---------------------------------------------------------------------- */}
      {showDetailsCard && (
        <div className="w-full max-w-lg h-[152px] sm:h-[138px] px-2 sm:px-4 mt-3 z-30 shrink-0 relative">
          {activeDetails ? (
            <div
              key={activeDetails.id}
              className="ap-glass-card rounded-2xl p-3 sm:p-3.5 h-full flex flex-col justify-between border border-slate-200/90 shadow-md text-left transition-opacity duration-150 animate-in fade-in"
            >
              {/* Header row: Title + Scientific Name + Metric Badge (No truncation) */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                    <span className="font-extrabold text-sm sm:text-base text-[#0f3d4a] tracking-tight leading-snug">
                      {activeDetails.name}
                    </span>
                    <span className="text-[11px] text-slate-500 italic font-medium">
                      ({activeDetails.scientificName})
                    </span>
                  </div>
                </div>

                <span className="shrink-0 text-[10px] sm:text-[11px] font-bold text-[#0f3d4a] bg-[#dff0f4] px-2.5 py-0.5 rounded-full border border-[#0f3d4a]/20">
                  {activeDetails.stat}
                </span>
              </div>

              {/* Minimal, 1-Sentence Short Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed m-0 line-clamp-2">
                {activeDetails.description}
              </p>

              {/* Clinical Marker tag */}
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold pt-0.5">
                <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Marker: {activeDetails.clinicalMarker}</span>
              </div>
            </div>
          ) : (
            /* Idle guidance note: Occupies the exact same fixed area so nothing shifts */
            <div className="w-full h-full rounded-2xl border border-dashed border-slate-200/80 bg-white/60 backdrop-blur-xs flex items-center justify-center p-3 text-center text-slate-400 text-xs shadow-2xs">
              <Activity className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <span>Hover over any anatomical structure to inspect its glycemic role</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnimatedPancreas;
