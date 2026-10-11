import React, { useState, useCallback, useContext } from 'react';
import { Sparkles } from 'lucide-react';
import { LanguageContext } from '../../context/languageContextDef';
import {
  PANCREAS_DATA,
  HOTSPOT_LIST,
  CATEGORY_TABS,
  type PancreasPartId,
  type PancreasPartCategory,
} from './pancreasData';
import { REALISTIC_PATHS } from './PancreasAnatomicalPaths';
import { PancreasShaders } from './PancreasShaders';
import { IsletLoupeInset } from './IsletLoupeInset';

export interface PancreasViewerProps {
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

const EMBEDDED_STYLES = `
@keyframes wirsung-fluid-pulse {
  0% { stroke-dashoffset: 40; }
  100% { stroke-dashoffset: 0; }
}
.ap-wirsung-flow {
  stroke-dasharray: 4 8;
  animation: wirsung-fluid-pulse 2.8s linear infinite;
}
@keyframes ap-insulin-pulse {
  0% { r: 18px; opacity: 0.85; }
  50% { r: 34px; opacity: 0.35; }
  100% { r: 48px; opacity: 0; }
}
.ap-islet-pulse-ring {
  animation: ap-insulin-pulse 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  transform-origin: center;
}
.ap-organ-layer {
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  transform-box: fill-box;
}
.ap-glass-card {
  background: rgba(252, 254, 255, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(101, 217, 208, 0.32);
  box-shadow: 0 14px 32px -6px rgba(16, 63, 74, 0.12), 0 4px 12px -2px rgba(101, 217, 208, 0.08);
}
@media (prefers-reduced-motion: reduce) {
  .ap-wirsung-flow, .ap-islet-pulse-ring {
    animation: none !important;
  }
}
`;

/**
 * Realistic Medical-Grade Anatomical Pancreas Viewer
 * Uses procedural SVG shaders (feTurbulence, feSpecularLighting/feDiffuseLighting),
 * multi-stop organic tissue gradients, individual hoverable layers,
 * and an interactive histological loupe for Beta Cells & Islets of Langerhans.
 */
export const PancreasViewer: React.FC<PancreasViewerProps> = ({
  className = '',
  style,
  showDetailsCard = true,
  showHotspots = true,
  showCategoryTabs = false,
  initialPart = null,
  onPartHover,
  onPartClick,
}) => {
  const langContext = useContext(LanguageContext);
  const isHindi = langContext?.isHindi ?? false;
  const [hoveredPart, setHoveredPart] = useState<PancreasPartId | null>(null);
  const [selectedPart, setSelectedPart] = useState<PancreasPartId | null>(initialPart ?? 'islets');
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
      setSelectedPart(part);
      if (onPartClick) onPartClick(part);
    },
    [onPartClick]
  );

  const displayedPart = hoveredPart || selectedPart || 'islets';
  const activeDetails = PANCREAS_DATA[displayedPart] || PANCREAS_DATA.islets;

  const isLayerActive = (partId: PancreasPartId) => displayedPart === partId;

  const getLayerOpacity = (partId: PancreasPartId) => {
    if (activeCategory !== 'all') {
      const info = PANCREAS_DATA[partId];
      if (info && info.category !== activeCategory) return 0.22;
    }
    if (hoveredPart) {
      return hoveredPart === partId ? 1 : 0.55;
    }
    return 1;
  };

  return (
    <div
      className={`relative select-none flex flex-col items-center justify-center overflow-hidden max-w-full ${className}`}
      style={{ width: '100%', height: '100%', ...style }}
      role="region"
      aria-label="3D Interactive Pancreas & Endocrine Visualization"
    >
      <style>{EMBEDDED_STYLES}</style>

      {/* Atmospheric Clinical Aura (Teal #65D9D0 & Deep Navy #103F4A) */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 440,
          height: 440,
          background:
            'radial-gradient(circle, rgba(101, 217, 208, 0.24) 0%, rgba(16, 63, 74, 0.1) 45%, rgba(234, 247, 250, 0.2) 65%, transparent 80%)',
          filter: 'blur(55px)',
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 280,
          height: 280,
          background:
            'radial-gradient(circle, rgba(231, 248, 242, 0.38) 0%, rgba(101, 217, 208, 0.14) 50%, transparent 75%)',
          filter: 'blur(35px)',
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
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-[#103F4A] text-white font-bold shadow-2xs'
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

      {/* SVG Canvas Container */}
      <div className="relative w-full max-w-[520px] aspect-[540/480] shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 540 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xl"
          style={{ maxWidth: 520, maxHeight: 480, zIndex: 10 }}
        >
          {/* Procedural Shaders, Filters & Organic Gradients */}
          <PancreasShaders />

          {/* Calibrated Scientific Radial Guides */}
          <g opacity="0.22" pointerEvents="none">
            <circle cx="270" cy="245" r="215" stroke="#65D9D0" strokeWidth="0.8" strokeDasharray="4 8" />
            <circle cx="270" cy="245" r="150" stroke="#103F4A" strokeWidth="0.7" strokeDasharray="2 5" />
            <circle cx="270" cy="245" r="85" stroke="#65D9D0" strokeWidth="0.5" strokeOpacity="0.6" />
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 0. STOMACH SILHOUETTE (Soft Retroperitoneal Context)         */}
          {/* ------------------------------------------------------------ */}
          <g id="stomach-backdrop" pointerEvents="none" opacity="0.28">
            <path
              d={REALISTIC_PATHS.stomachSilhouette}
              fill="url(#stomach-bed-grad)"
              stroke="#94a3b8"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
            {REALISTIC_PATHS.stomachRugae.map((rugae, idx) => (
              <path
                key={idx}
                d={rugae}
                stroke="#94a3b8"
                strokeWidth="1.1"
                fill="none"
                opacity="0.45"
                strokeLinecap="round"
              />
            ))}
            <text
              x="290"
              y="110"
              fill="#475569"
              fontSize="7.5"
              fontWeight="600"
              opacity="0.75"
              letterSpacing="0.08em"
            >
              STOMACH (ANTERIOR BED)
            </text>
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 1. SPLEEN (Organ layer abutting the tail at hilum)           */}
          {/* ------------------------------------------------------------ */}
          <g
            id="spleen"
            role="button"
            tabIndex={0}
            aria-label="Spleen (Splen)"
            aria-pressed={isLayerActive('spleen')}
            className="cursor-pointer ap-organ-layer focus-visible:outline-none"
            opacity={getLayerOpacity('spleen')}
            style={{
              transform: isLayerActive('spleen') ? 'scale(1.02)' : 'scale(1)',
              transformOrigin: '480px 200px',
            }}
            onMouseEnter={() => handlePartHover('spleen')}
            onMouseLeave={() => handlePartHover(null)}
            onFocus={() => handlePartHover('spleen')}
            onBlur={() => handlePartHover(null)}
            onClick={() => handlePartClick('spleen')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePartClick('spleen');
              }
            }}
          >
            {/* Teal Glow halo when active */}
            {isLayerActive('spleen') && (
              <path
                d={REALISTIC_PATHS.spleenOrgan}
                fill="#65D9D0"
                opacity="0.35"
                filter="url(#hover-glow-teal)"
                pointerEvents="none"
              />
            )}
            {/* Realistic Glossy Organ Body */}
            <path
              d={REALISTIC_PATHS.spleenOrgan}
              fill="url(#spleen-maroon-grad)"
              filter="url(#spleen-smooth-gloss)"
            />
            {/* Splenic Hilum Notch */}
            <path
              d={REALISTIC_PATHS.spleenHilumNotch}
              stroke="#fbcfe8"
              strokeWidth="2.2"
              strokeOpacity="0.55"
              fill="none"
              strokeLinecap="round"
              pointerEvents="none"
            />
            {/* Gastrosplenic fold ridge */}
            <path
              d={REALISTIC_PATHS.spleenGastrosplenicFold}
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeOpacity="0.25"
              fill="none"
              strokeLinecap="round"
              pointerEvents="none"
            />
            {/* Subtle Label */}
            <text
              x="475"
              y="180"
              fill="#ffffff"
              fontSize="7.5"
              fontWeight="700"
              opacity="0.9"
              textAnchor="middle"
              pointerEvents="none"
              letterSpacing="0.05em"
            >
              SPLEEN
            </text>
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 2. VASCULAR AXIS (Splenic Artery & Vein, SMV, Portal Confl)  */}
          {/* ------------------------------------------------------------ */}
          <g
            id="vasculature"
            role="button"
            tabIndex={0}
            aria-label="Vascular Axis (Splenic vein and artery)"
            aria-pressed={isLayerActive('vasculature')}
            className="cursor-pointer ap-organ-layer focus-visible:outline-none"
            opacity={getLayerOpacity('vasculature')}
            style={{
              transform: isLayerActive('vasculature') ? 'scale(1.02)' : 'scale(1)',
              transformOrigin: '320px 220px',
            }}
            onMouseEnter={() => handlePartHover('vasculature')}
            onMouseLeave={() => handlePartHover(null)}
            onFocus={() => handlePartHover('vasculature')}
            onBlur={() => handlePartHover(null)}
            onClick={() => handlePartClick('vasculature')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePartClick('vasculature');
              }
            }}
          >
            {/* Portal Confluence & Splenic Vein (Royal Blue) */}
            <path
              d={REALISTIC_PATHS.portalVeinConfluence}
              fill="url(#splenic-vein-grad)"
              filter={isLayerActive('vasculature') ? 'url(#hover-glow-teal)' : 'url(#vessel-3d-sheen)'}
            />
            <path
              d={REALISTIC_PATHS.splenicVein}
              stroke="url(#splenic-vein-grad)"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              filter={isLayerActive('vasculature') ? 'url(#hover-glow-teal)' : 'url(#vessel-3d-sheen)'}
            />

            {/* Splenic Artery (Crimson Red, Undulating along superior border) */}
            <path
              d={REALISTIC_PATHS.splenicArtery}
              stroke="url(#splenic-artery-grad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
              filter={isLayerActive('vasculature') ? 'url(#hover-glow-teal)' : 'url(#vessel-3d-sheen)'}
            />
            {/* Splenic Artery Branchlets */}
            {REALISTIC_PATHS.splenicArteryBranches.map((branch, i) => (
              <path
                key={i}
                d={branch}
                stroke="url(#splenic-artery-grad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
                pointerEvents="none"
              />
            ))}
            {/* Superior Mesenteric Artery */}
            <path
              d={REALISTIC_PATHS.superiorMesentericArtery}
              stroke="url(#splenic-artery-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              pointerEvents="none"
            />
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 3. DUODENAL C-LOOP (Salmon-pink muscular wall & folds)        */}
          {/* ------------------------------------------------------------ */}
          <g
            id="duodenum"
            role="button"
            tabIndex={0}
            aria-label="Duodenal C-Loop (Duodenum)"
            aria-pressed={isLayerActive('duodenum')}
            className="cursor-pointer ap-organ-layer focus-visible:outline-none"
            opacity={getLayerOpacity('duodenum')}
            style={{
              transform: isLayerActive('duodenum') ? 'scale(1.02)' : 'scale(1)',
              transformOrigin: '170px 300px',
            }}
            onMouseEnter={() => handlePartHover('duodenum')}
            onMouseLeave={() => handlePartHover(null)}
            onFocus={() => handlePartHover('duodenum')}
            onBlur={() => handlePartHover(null)}
            onClick={() => handlePartClick('duodenum')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePartClick('duodenum');
              }
            }}
          >
            {/* Teal Glow when hovered */}
            {isLayerActive('duodenum') && (
              <path
                d={REALISTIC_PATHS.duodenumMain}
                fill="#65D9D0"
                opacity="0.32"
                filter="url(#hover-glow-teal)"
                pointerEvents="none"
              />
            )}
            {/* Organic Fleshy Duodenal C-Loop */}
            <path
              d={REALISTIC_PATHS.duodenumMain}
              fill="url(#duodenum-salmon-grad)"
              filter="url(#duodenum-fleshy-realistic)"
            />
            {/* Inner Mucosal Lumen Highlight */}
            <path
              d={REALISTIC_PATHS.duodenumLumenHighlight}
              stroke="#ffffff"
              strokeWidth="2.4"
              strokeOpacity="0.4"
              fill="none"
              strokeLinecap="round"
              pointerEvents="none"
            />
            {/* Plicae Circulares (Circular mucosal folds) */}
            {REALISTIC_PATHS.duodenalFolds.map((fold, idx) => (
              <path
                key={idx}
                d={fold}
                stroke="#ffe4e6"
                strokeWidth="1.8"
                strokeOpacity="0.65"
                fill="none"
                strokeLinecap="round"
                pointerEvents="none"
              />
            ))}
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 4. HEAD OF PANCREAS & UNCINATE PROCESS                       */}
          {/* ------------------------------------------------------------ */}
          <g
            id="head"
            role="button"
            tabIndex={0}
            aria-label="Head of Pancreas (Caput pancreatis)"
            aria-pressed={isLayerActive('head')}
            className="cursor-pointer ap-organ-layer focus-visible:outline-none"
            opacity={getLayerOpacity('head')}
            style={{
              transform: isLayerActive('head') ? 'scale(1.02)' : 'scale(1)',
              transformOrigin: '200px 290px',
            }}
            onMouseEnter={() => handlePartHover('head')}
            onMouseLeave={() => handlePartHover(null)}
            onFocus={() => handlePartHover('head')}
            onBlur={() => handlePartHover(null)}
            onClick={() => handlePartClick('head')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePartClick('head');
              }
            }}
          >
            {isLayerActive('head') && (
              <path
                d={REALISTIC_PATHS.headParenchyma}
                fill="#65D9D0"
                opacity="0.35"
                filter="url(#hover-glow-teal)"
                pointerEvents="none"
              />
            )}
            {/* Uncinate process posterior hook */}
            <path
              d={REALISTIC_PATHS.uncinateProcess}
              fill="url(#pancreas-head-grad)"
              filter="url(#pancreas-lobular-realistic)"
              opacity="0.95"
            />
            {/* Head Lobulated Parenchyma */}
            <path
              d={REALISTIC_PATHS.headParenchyma}
              fill="url(#pancreas-head-grad)"
              filter="url(#pancreas-lobular-realistic)"
            />
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 5. PANCREATIC BODY (Corpus pancreatis)                       */}
          {/* ------------------------------------------------------------ */}
          <g
            id="body"
            role="button"
            tabIndex={0}
            aria-label="Pancreatic Body (Corpus pancreatis)"
            aria-pressed={isLayerActive('body')}
            className="cursor-pointer ap-organ-layer focus-visible:outline-none"
            opacity={getLayerOpacity('body')}
            style={{
              transform: isLayerActive('body') ? 'scale(1.02)' : 'scale(1)',
              transformOrigin: '315px 245px',
            }}
            onMouseEnter={() => handlePartHover('body')}
            onMouseLeave={() => handlePartHover(null)}
            onFocus={() => handlePartHover('body')}
            onBlur={() => handlePartHover(null)}
            onClick={() => handlePartClick('body')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePartClick('body');
              }
            }}
          >
            {isLayerActive('body') && (
              <path
                d={REALISTIC_PATHS.bodyParenchyma}
                fill="#65D9D0"
                opacity="0.35"
                filter="url(#hover-glow-teal)"
                pointerEvents="none"
              />
            )}
            {/* Glandular Body Tissue with Shaded Acinar Texture */}
            <path
              d={REALISTIC_PATHS.bodyParenchyma}
              fill="url(#pancreas-body-grad)"
              filter="url(#pancreas-lobular-realistic)"
            />
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 6. PANCREATIC TAIL (Cauda pancreatis)                        */}
          {/* ------------------------------------------------------------ */}
          <g
            id="tail"
            role="button"
            tabIndex={0}
            aria-label="Pancreatic Tail (Cauda pancreatis)"
            aria-pressed={isLayerActive('tail')}
            className="cursor-pointer ap-organ-layer focus-visible:outline-none"
            opacity={getLayerOpacity('tail')}
            style={{
              transform: isLayerActive('tail') ? 'scale(1.02)' : 'scale(1)',
              transformOrigin: '415px 215px',
            }}
            onMouseEnter={() => handlePartHover('tail')}
            onMouseLeave={() => handlePartHover(null)}
            onFocus={() => handlePartHover('tail')}
            onBlur={() => handlePartHover(null)}
            onClick={() => handlePartClick('tail')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePartClick('tail');
              }
            }}
          >
            {isLayerActive('tail') && (
              <path
                d={REALISTIC_PATHS.tailParenchyma}
                fill="#65D9D0"
                opacity="0.35"
                filter="url(#hover-glow-teal)"
                pointerEvents="none"
              />
            )}
            {/* Tapering Tail Lobules */}
            <path
              d={REALISTIC_PATHS.tailParenchyma}
              fill="url(#pancreas-tail-grad)"
              filter="url(#pancreas-lobular-realistic)"
            />
          </g>

          {/* Lobular Surface Contours (Acinar nodularity on all parenchyma) */}
          <g pointerEvents="none" opacity="0.55">
            {REALISTIC_PATHS.parenchymalLobules.map((lobule, idx) => (
              <path
                key={idx}
                d={lobule}
                fill="#fde68a"
                opacity="0.32"
                stroke="#d97706"
                strokeWidth="0.6"
              />
            ))}
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 7. DUCT OF WIRSUNG (Translucent Amber Channel & Tributaries)  */}
          {/* ------------------------------------------------------------ */}
          <g
            id="duct"
            role="button"
            tabIndex={0}
            aria-label="Duct of Wirsung (Main pancreatic duct)"
            aria-pressed={isLayerActive('duct')}
            className="cursor-pointer ap-organ-layer focus-visible:outline-none"
            opacity={getLayerOpacity('duct')}
            style={{
              transform: isLayerActive('duct') ? 'scale(1.02)' : 'scale(1)',
              transformOrigin: '300px 240px',
            }}
            onMouseEnter={() => handlePartHover('duct')}
            onMouseLeave={() => handlePartHover(null)}
            onFocus={() => handlePartHover('duct')}
            onBlur={() => handlePartHover(null)}
            onClick={() => handlePartClick('duct')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePartClick('duct');
              }
            }}
          >
            {/* Tributary branches */}
            {REALISTIC_PATHS.ductSideBranches.map((br, idx) => (
              <path
                key={idx}
                d={br}
                stroke="url(#wirsung-duct-grad)"
                strokeWidth="1.6"
                strokeOpacity="0.85"
                fill="none"
                strokeLinecap="round"
                pointerEvents="none"
              />
            ))}
            {/* Main Duct Spine */}
            <path
              d={REALISTIC_PATHS.ductOfWirsung}
              stroke="url(#wirsung-duct-grad)"
              strokeWidth="4.2"
              strokeLinecap="round"
              fill="none"
              filter={isLayerActive('duct') ? 'url(#hover-glow-teal)' : 'none'}
            />
            {/* Delicate Enzyme Flow Animation */}
            <path
              d={REALISTIC_PATHS.ductOfWirsung}
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              className="ap-wirsung-flow"
              opacity="0.8"
              pointerEvents="none"
            />
            {/* Ampulla of Vater Papilla sphincter */}
            <circle cx="162" cy="308" r="4.5" fill="#fde047" stroke="#ca8a04" strokeWidth="1" pointerEvents="none" />
            <circle cx="162" cy="308" r="2" fill="#ffffff" pointerEvents="none" />
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 8. BETA CELLS & ISLETS (Islets of Langerhans)                */}
          {/* ------------------------------------------------------------ */}
          <g
            id="islets"
            role="button"
            tabIndex={0}
            aria-label="Beta Cells & Islets (Islets of Langerhans)"
            aria-pressed={isLayerActive('islets')}
            className="cursor-pointer ap-organ-layer focus-visible:outline-none"
            opacity={getLayerOpacity('islets')}
            onMouseEnter={() => handlePartHover('islets')}
            onMouseLeave={() => handlePartHover(null)}
            onFocus={() => handlePartHover('islets')}
            onBlur={() => handlePartHover(null)}
            onClick={() => handlePartClick('islets')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePartClick('islets');
              }
            }}
          >
            {/* Micro-Islet Golden/Amber Spheres across parenchyma */}
            {[
              { cx: 428, cy: 198, r: 6.2 },
              { cx: 405, cy: 215, r: 6.5 },
              { cx: 388, cy: 216, r: 7.2 },
              { cx: 355, cy: 228, r: 6.0 },
              { cx: 325, cy: 235, r: 6.8 },
              { cx: 285, cy: 245, r: 5.8 },
              { cx: 230, cy: 260, r: 5.5 },
              { cx: 185, cy: 290, r: 6.5 },
            ].map((islet, idx) => (
              <g key={idx}>
                {/* Bioluminescent halo */}
                <circle
                  cx={islet.cx}
                  cy={islet.cy}
                  r={islet.r * 1.6}
                  fill="none"
                  stroke="#65D9D0"
                  strokeWidth="1.2"
                  opacity={isLayerActive('islets') ? 0.95 : 0.45}
                  filter={isLayerActive('islets') ? 'url(#hover-glow-teal)' : 'none'}
                  pointerEvents="none"
                />
                {/* Islet core */}
                <circle
                  cx={islet.cx}
                  cy={islet.cy}
                  r={islet.r}
                  fill="#fef08a"
                  stroke="#d97706"
                  strokeWidth="1"
                />
                {/* Glare dot */}
                <circle
                  cx={islet.cx - islet.r * 0.3}
                  cy={islet.cy - islet.r * 0.3}
                  r={islet.r * 0.35}
                  fill="#ffffff"
                  pointerEvents="none"
                />
              </g>
            ))}
          </g>

          {/* ------------------------------------------------------------ */}
          {/* 9. INSET LOUPE MAGNIFIER FOR BETA CELLS & ISLETS             */}
          {/* ------------------------------------------------------------ */}
          <IsletLoupeInset isVisible={isLayerActive('islets')} isHindi={isHindi} />

          {/* ------------------------------------------------------------ */}
          {/* 10. HOTSPOT PINS & LEADER CALLOUTS                           */}
          {/* ------------------------------------------------------------ */}
          {showHotspots && (
            <g id="hotspots-layer">
              {HOTSPOT_LIST.map((partId) => {
                const part = PANCREAS_DATA[partId];
                if (!part) return null;
                const isCurrent = displayedPart === partId;

                return (
                  <g key={partId}>
                    {/* Leader Line */}
                    <line
                      x1={part.hotspot.cx}
                      y1={part.hotspot.cy}
                      x2={part.hotspot.calloutX}
                      y2={part.hotspot.calloutY}
                      stroke={isCurrent ? '#103F4A' : 'rgba(16, 63, 74, 0.3)'}
                      strokeWidth={isCurrent ? 1.6 : 1}
                      strokeDasharray="2 2"
                      pointerEvents="none"
                    />

                    {/* Radar Target Dot */}
                    {isCurrent && (
                      <circle
                        cx={part.hotspot.cx}
                        cy={part.hotspot.cy}
                        r={7.5}
                        fill="none"
                        stroke="#65D9D0"
                        strokeWidth="1.5"
                        opacity="0.9"
                        pointerEvents="none"
                      />
                    )}
                    <circle
                      cx={part.hotspot.cx}
                      cy={part.hotspot.cy}
                      r={3.5}
                      fill={isCurrent ? '#103F4A' : '#f59e0b'}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      pointerEvents="none"
                    />

                    {/* Interactive Callout Button */}
                    <g
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect ${part.hotspot.title}`}
                      aria-pressed={isCurrent}
                      className="cursor-pointer focus-visible:outline-none"
                      transform={`translate(${part.hotspot.calloutX}, ${part.hotspot.calloutY})`}
                      onClick={() => handlePartClick(partId)}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        handlePartClick(partId);
                      }}
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
                        x="-44"
                        y="-11"
                        width="88"
                        height="22"
                        rx="11"
                        pointerEvents="all"
                        fill={isCurrent ? '#103F4A' : 'rgba(255, 255, 255, 0.96)'}
                        stroke={isCurrent ? '#65D9D0' : 'rgba(16, 63, 74, 0.22)'}
                        strokeWidth={isCurrent ? 1.5 : 1}
                        filter="url(#anatomical-depth-shadow)"
                      />
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="700"
                        fontFamily="sans-serif"
                        fill={isCurrent ? '#ffffff' : '#103F4A'}
                        letterSpacing="0.01em"
                        pointerEvents="none"
                      >
                        {isHindi && part.hotspot.titleHi ? part.hotspot.titleHi : part.hotspot.title}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          )}
        </svg>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 11. DOCKED FIXED-HEIGHT CLINICAL INFO CARD (ZERO LAYOUT SHIFT)         */}
      {/* ---------------------------------------------------------------------- */}
      {showDetailsCard && (
        <div className="w-full max-w-lg h-[150px] sm:h-[142px] px-2 sm:px-4 mt-2 sm:mt-3 z-30 shrink-0 relative">
          <div
            key={activeDetails.id}
            className="ap-glass-card rounded-2xl p-3 sm:p-3.5 h-full flex flex-col justify-between border border-slate-200/90 shadow-sm text-left transition-opacity duration-150 animate-in fade-in"
          >
            {/* Header: Title + Latin Scientific Name + Stat Badge */}
            <div className="flex items-start justify-between gap-2.5">
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                  <span className="font-extrabold text-sm sm:text-base text-[#103F4A] tracking-tight leading-snug">
                    {isHindi && activeDetails.nameHi ? activeDetails.nameHi : activeDetails.name}
                  </span>
                  <span className="text-[11px] text-slate-500 italic font-medium">
                    ({activeDetails.scientificName})
                  </span>
                </div>
              </div>

              <span className="shrink-0 text-[10px] sm:text-[11px] font-bold text-[#103F4A] bg-[#EAF7FA] px-2.5 py-0.5 rounded-full border border-[#103F4A]/20">
                {activeDetails.stat}
              </span>
            </div>

            {/* Scientific Explanation */}
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed m-0 line-clamp-2">
              {isHindi && activeDetails.descriptionHi ? activeDetails.descriptionHi : activeDetails.description}
            </p>

            {/* Clinical Marker & Interaction Tip */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-800 font-semibold">
                <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Clinical Marker: {activeDetails.clinicalMarker}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                {isHindi ? 'विवरण देखने के लिए टैप करें' : 'Hover / Tap to inspect'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PancreasViewer;
