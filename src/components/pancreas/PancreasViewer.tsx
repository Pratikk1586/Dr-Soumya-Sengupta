import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Activity, X, Compass } from 'lucide-react';
import { LanguageContext } from '../../context/languageContextDef';
import {
  PANCREAS_DATA,
  HOTSPOT_LIST,
  CATEGORY_TABS,
  type PancreasPartId,
  type PancreasPartInfo,
  type PancreasPartCategory,
} from './pancreasData';

// Optimized WebP & PNG fallback assets
import pancreas1536Webp from '../../assets/pancreas/pancreas-1536.webp';
import pancreas768Webp from '../../assets/pancreas/pancreas-768.webp';
import pancreasFallbackPng from '../../assets/pancreas/pancreas-fallback.png';

export interface PancreasViewerProps {
  className?: string;
  style?: React.CSSProperties;
  showDetailsCard?: boolean;
  showCategoryTabs?: boolean;
  showHotspots?: boolean;
  showMedicalBadges?: boolean;
  enableParallax?: boolean;
  initialPart?: PancreasPartId | null;
  onPartHover?: (part: PancreasPartId | null) => void;
  onPartClick?: (part: PancreasPartId) => void;
}

export const PancreasViewer: React.FC<PancreasViewerProps> = ({
  className = '',
  style,
  showDetailsCard = true,
  showCategoryTabs = false,
  showHotspots = true,
  initialPart = null,
  onPartHover,
  onPartClick,
}) => {
  const langContext = useContext(LanguageContext);
  const isHindi = langContext?.isHindi ?? false;

  // Single activePart state for hover & selection
  const [activePart, setActivePart] = useState<PancreasPartId | null>(initialPart);
  const [selectedPart, setSelectedPart] = useState<PancreasPartId | null>(initialPart);
  const [activeCategory, setActiveCategory] = useState<PancreasPartCategory>('all');
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isDebugMode, setIsDebugMode] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check URL query param ?debug=1
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('debug') === '1') {
        setIsDebugMode(true);
      }
    }
  }, []);

  // Cleanup leave timer on unmount
  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
      }
    };
  }, []);

  const isPartFilteredOut = (partId: PancreasPartId) => {
    if (activeCategory === 'all') return false;
    return PANCREAS_DATA[partId]?.category !== activeCategory;
  };

  const activePartInfo: PancreasPartInfo | null = activePart ? PANCREAS_DATA[activePart] : null;

  // Hotspot pointer enter: cancel any pending leave timer and set activePart immediately
  const handleHotspotPointerEnter = useCallback(
    (id: PancreasPartId) => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
      setActivePart(id);
      setHasInteracted(true);
      if (onPartHover) onPartHover(id);
    },
    [onPartHover]
  );

  // Wrapper pointer leave: clear activePart with 100ms debounce
  const handleWrapperPointerLeave = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      // Revert to selectedPart if one is locked, otherwise clear
      setActivePart(selectedPart);
      if (onPartHover) onPartHover(selectedPart);
    }, 100);
  }, [selectedPart, onPartHover]);

  const handlePartSelect = useCallback(
    (id: PancreasPartId) => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
      setSelectedPart((prev) => {
        const next = prev === id ? null : id;
        setActivePart(next);
        return next;
      });
      setHasInteracted(true);
      if (onPartClick) onPartClick(id);
    },
    [onPartClick]
  );

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent, id: PancreasPartId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePartSelect(id);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | SVGElement | null;
      if (!target) return;
      if (target.closest && target.closest('[data-pancreas-viewer]')) {
        return;
      }
      if (containerRef.current && !containerRef.current.contains(target as Node)) {
        setSelectedPart(null);
        setActivePart(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Distinct debug colors for ?debug=1 inspection
  const debugColors: Record<PancreasPartId, string> = {
    gallbladder: '#10B981',
    'bile-duct': '#059669',
    stomach: '#F43F5E',
    duodenum: '#EA580C',
    head: '#F59E0B',
    body: '#EAB308',
    tail: '#CA8A04',
    duct: '#FACC15',
    spleen: '#A855F7',
    vasculature: '#3B82F6',
    islets: '#8B5CF6',
  };

  const isIsletsActive = activePart === 'islets';

  return (
    <div
      ref={containerRef}
      data-pancreas-viewer="true"
      onPointerLeave={handleWrapperPointerLeave}
      className={`relative flex flex-col items-center w-full select-none ${className}`}
      style={style}
      role="region"
      aria-label={
        isHindi
          ? 'अग्न्याशय एवं संबंधित अंगों की त्रि-आयामी शारीरिक रचना'
          : '3D Interactive Pancreas & Endocrine Visualization'
      }
    >
      {/* Category Tabs Bar (when enabled) */}
      {showCategoryTabs && (
        <div
          className="w-full flex items-center justify-center gap-1.5 flex-wrap mb-3 px-2"
          role="tablist"
          aria-label="Anatomical axis categories"
        >
          {CATEGORY_TABS.map((tab) => {
            const isSelected = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="button"
                aria-pressed={isSelected}
                onClick={() => setActiveCategory(tab.id as PancreasPartCategory)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-[#0E5A6B] text-white border-[#0E5A6B] shadow-xs'
                    : 'bg-white text-[#1B2B34] border-[#D7E5E6] hover:border-[#0E5A6B]/50'
                }`}
              >
                {isHindi ? tab.label.hi : tab.label.en}
              </button>
            );
          })}
        </div>
      )}

      {/* Visual Canvas Wrapper with soft teal boundary blend */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#0B2E3A]/5 shadow-[0_16px_40px_rgba(11,46,58,0.12)] border border-[#D7E5E6]/70 group">
        {/* Soft edge masking for seamless background integration */}
        <div
          className="relative w-full aspect-[1536/1024] overflow-hidden"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse 98% 96% at 50% 50%, black 85%, transparent 100%)',
            maskImage:
              'radial-gradient(ellipse 98% 96% at 50% 50%, black 85%, transparent 100%)',
          }}
        >
          {/* Base Clean Anatomy Image (High Priority LCP) */}
          <picture className="absolute inset-0 w-full h-full pointer-events-none">
            <source
              type="image/webp"
              srcSet={`${pancreas768Webp} 768w, ${pancreas1536Webp} 1536w`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
            />
            <img
              src={pancreasFallbackPng}
              alt="Detailed anatomical illustration of human pancreas, duodenum, gallbladder, stomach, spleen, and microscopic endocrine islets"
              width={1536}
              height={1024}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
          </picture>

          {/* SVG Overlay: Responsive 1536x1024 Hotspots & Shaders */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1536 1024"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* 1. Dark Teal Dimming Overlay on Unfocused Organs (40% opacity when active, 0% at rest) */}
            <rect
              x="0"
              y="0"
              width="1536"
              height="1024"
              fill="#0B2E3A"
              className="pointer-events-none transition-opacity duration-250 ease-out"
              style={{
                opacity: activePart ? 0.40 : 0,
                willChange: 'opacity',
              }}
            />

            {/* 2. Highlight Path on Top of Dim Layer (cheap opacity/stroke transition, no filters) */}
            {activePartInfo && !isIsletsActive && (
              <path
                d={activePartInfo.svgPath}
                fill="rgba(14, 90, 107, 0.20)"
                stroke="#65D9D0"
                strokeWidth={activePart === 'duct' ? 5 : 3.5}
                strokeLinejoin="round"
                className="pointer-events-none transition-all duration-200 ease-out"
                style={{ willChange: 'opacity, stroke' }}
              />
            )}

            {/* 3. Islets Inset Ring on Top of Dim Layer */}
            {isIsletsActive && (
              <circle
                cx="1208"
                cy="734"
                r={162}
                fill="rgba(14, 90, 107, 0.12)"
                stroke="#65D9D0"
                strokeWidth={4}
                className="pointer-events-none transition-all duration-200 ease-out"
                style={{ willChange: 'opacity, stroke' }}
              />
            )}

            {/* 4. Interactive SVG Hotspot Hit Areas (with transparent hit slop of 12-16px) */}
            {HOTSPOT_LIST.map((id) => {
              if (isPartFilteredOut(id)) return null;
              const part = PANCREAS_DATA[id];
              const isDebug = isDebugMode;
              const isThin = id === 'duct' || id === 'vasculature' || id === 'bile-duct';

              return (
                <path
                  key={id}
                  d={part.svgPath}
                  fill={isDebug ? debugColors[id] + '55' : 'transparent'}
                  stroke={isDebug ? debugColors[id] : 'transparent'}
                  strokeWidth={isDebug ? (id === 'duct' ? 5 : 3.5) : (isThin ? 16 : 8)}
                  strokeLinejoin="round"
                  pointerEvents="all"
                  className="cursor-pointer outline-none focus-visible:stroke-[#F2A33A] focus-visible:stroke-[4]"
                  tabIndex={0}
                  role="button"
                  aria-label={`${part.name} (${part.scientificName})`}
                  onPointerEnter={() => handleHotspotPointerEnter(id)}
                  onFocus={() => handleHotspotPointerEnter(id)}
                  onClick={() => handlePartSelect(id)}
                  onKeyDown={(e) => handleKeyDown(e, id)}
                />
              );
            })}

            {/* 5. Small White Dot on Pancreatic Duct linked to Islets */}
            <g
              className="cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label="Islets of Langerhans Biopsy Site on Pancreatic Duct"
              onPointerEnter={() => handleHotspotPointerEnter('islets')}
              onFocus={() => handleHotspotPointerEnter('islets')}
              onClick={() => handlePartSelect('islets')}
              onKeyDown={(e) => handleKeyDown(e, 'islets')}
            >
              {/* Hit testing halo with expanded radius */}
              <circle cx="1043" cy="461" r="26" fill="transparent" pointerEvents="all" />

              {/* Pulsing ring in idle state */}
              {!hasInteracted && !activePart && (
                <circle
                  cx="1043"
                  cy="461"
                  r="18"
                  fill="none"
                  stroke="#F2A33A"
                  strokeWidth="2"
                  pointerEvents="none"
                  className="pointer-events-none animate-ping origin-center"
                />
              )}

              {/* Active selection ring */}
              {isIsletsActive && (
                <circle
                  cx="1043"
                  cy="461"
                  r="22"
                  fill="none"
                  stroke="#65D9D0"
                  strokeWidth="3.5"
                  pointerEvents="none"
                  className="pointer-events-none transition-all"
                />
              )}
            </g>

            {/* 6. Islets Circular Inset Hotspot Lens */}
            <circle
              cx="1208"
              cy="734"
              r={158}
              fill="transparent"
              stroke={isDebugMode ? '#8B5CF6' : 'transparent'}
              strokeWidth={isDebugMode ? 3 : 0}
              pointerEvents="all"
              className="cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label="Islets of Langerhans 1000x Cellular Loupe Lens"
              onPointerEnter={() => handleHotspotPointerEnter('islets')}
              onFocus={() => handleHotspotPointerEnter('islets')}
              onClick={() => handlePartSelect('islets')}
              onKeyDown={(e) => handleKeyDown(e, 'islets')}
            />

            {/* 7. SVG Leader Line to Active Part */}
            {activePartInfo && !isIsletsActive && !showHotspots && (
              <g className="pointer-events-none transition-opacity duration-200">
                <line
                  x1={activePartInfo.hotspot.cx}
                  y1={activePartInfo.hotspot.cy}
                  x2={activePartInfo.hotspot.calloutX}
                  y2={activePartInfo.hotspot.calloutY}
                  stroke="#65D9D0"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  pointerEvents="none"
                />
                <circle
                  cx={activePartInfo.hotspot.cx}
                  cy={activePartInfo.hotspot.cy}
                  r="4.5"
                  fill="#65D9D0"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  pointerEvents="none"
                />
              </g>
            )}

            {/* 8. Interactive Hotspot Callout Pins (when showHotspots is true) */}
            {showHotspots && (
              <g id="hotspots-layer" className="pointer-events-none">
                {HOTSPOT_LIST.map((id) => {
                  if (isPartFilteredOut(id)) return null;
                  const part = PANCREAS_DATA[id];
                  const isCurrent = activePart === id;

                  return (
                    <g key={`hotspot-pin-${id}`} className="pointer-events-none">
                      {/* Leader Line */}
                      <line
                        x1={part.hotspot.cx}
                        y1={part.hotspot.cy}
                        x2={part.hotspot.calloutX}
                        y2={part.hotspot.calloutY}
                        stroke={isCurrent ? '#65D9D0' : 'rgba(14, 90, 107, 0.45)'}
                        strokeWidth={isCurrent ? 1.5 : 1}
                        strokeDasharray="2 3"
                        pointerEvents="none"
                      />

                      {/* Hotspot Target Radar Dot */}
                      <circle
                        cx={part.hotspot.cx}
                        cy={part.hotspot.cy}
                        r={4}
                        fill={isCurrent ? '#65D9D0' : '#F2A33A'}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        pointerEvents="none"
                      />

                      {/* Interactive Callout Button */}
                      <g
                        role="button"
                        tabIndex={0}
                        aria-label={`Inspect ${part.hotspot.title}`}
                        className="cursor-pointer focus-visible:outline-none pointer-events-auto"
                        transform={`translate(${part.hotspot.calloutX}, ${part.hotspot.calloutY})`}
                        onClick={() => handlePartSelect(id)}
                        onPointerEnter={() => handleHotspotPointerEnter(id)}
                        onKeyDown={(e) => handleKeyDown(e, id)}
                      >
                        <rect
                          x="-62"
                          y="-13"
                          width="124"
                          height="26"
                          rx="13"
                          pointerEvents="all"
                          fill={isCurrent ? '#0B2E3A' : 'rgba(255, 255, 255, 0.95)'}
                          stroke={isCurrent ? '#65D9D0' : 'rgba(14, 90, 107, 0.3)'}
                          strokeWidth="1.2"
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fontSize="9"
                          fontWeight="700"
                          fontFamily="sans-serif"
                          fill={isCurrent ? '#ffffff' : '#0B2E3A'}
                          letterSpacing="0.01em"
                          pointerEvents="none"
                        >
                          {isHindi ? part.hotspot.titleHi : part.hotspot.title}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>
            )}

            {/* Debug Mode Labels */}
            {isDebugMode && (
              <g className="pointer-events-none font-bold text-[14px]">
                {HOTSPOT_LIST.map((id) => {
                  const part = PANCREAS_DATA[id];
                  return (
                    <text
                      key={`debug-lbl-${id}`}
                      x={part.hotspot.cx}
                      y={part.hotspot.cy}
                      fill={debugColors[id]}
                      stroke="#0B2E3A"
                      strokeWidth="3"
                      paintOrder="stroke"
                      textAnchor="middle"
                    >
                      {part.name}
                    </text>
                  );
                })}
              </g>
            )}
          </svg>

          {/* Floating HTML Label Pill for Active Organ (Non-Islets) */}
          {activePartInfo && !isIsletsActive && !showHotspots && (
            <div
              className="absolute pointer-events-none transition-all duration-200 -translate-x-1/2 -translate-y-1/2 z-20 hidden sm:flex"
              style={{
                left: `${(activePartInfo.hotspot.calloutX / 1536) * 100}%`,
                top: `${(activePartInfo.hotspot.calloutY / 1024) * 100}%`,
              }}
            >
              <div className="px-3 py-1.5 rounded-full bg-[#0B2E3A]/95 text-white border border-[#65D9D0] text-xs font-bold shadow-[0_4px_16px_rgba(11,46,58,0.25)] flex items-center gap-1.5 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
                <span className="w-2 h-2 rounded-full bg-[#65D9D0] animate-pulse" />
                <span>{isHindi ? activePartInfo.nameHi : activePartInfo.name}</span>
              </div>
            </div>
          )}

          {/* Zoomed Islets Lens & HTML Cellular Labels (Alpha, Beta, Delta) */}
          {isIsletsActive && (
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Zoomed Magnified Lens Indicator (1.6x zoom feel) */}
              <div
                className="absolute w-[316px] h-[316px] rounded-full border-2 border-[#65D9D0] pointer-events-none shadow-[0_0_30px_rgba(101,217,208,0.4)] transition-transform duration-300 ease-out"
                style={{
                  left: 'calc(78.6% - 158px)',
                  top: 'calc(71.7% - 158px)',
                  transform: 'scale(1.15)',
                }}
              >
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0B2E3A]/95 text-white text-[10px] font-bold border border-[#65D9D0]/70 tracking-wider uppercase shadow-md whitespace-nowrap">
                  HISTOLOGY (1000x)
                </div>
              </div>

              {/* Cellular Callout Pills */}
              {/* 1. Alpha Cell (Glucagon) */}
              <div
                className="absolute flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B2E3A]/95 text-white border border-amber-400 text-[11px] font-bold shadow-md -translate-x-full animate-in fade-in duration-200 whitespace-nowrap"
                style={{ left: '96%', top: '59%' }}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{isHindi ? 'अल्फा कोशिका (ग्लूकागन)' : 'Alpha Cell (glucagon)'}</span>
              </div>

              {/* 2. Beta Cell (Insulin) */}
              <div
                className="absolute flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B2E3A]/95 text-white border border-fuchsia-400 text-[11px] font-bold shadow-md -translate-x-full animate-in fade-in duration-200 whitespace-nowrap"
                style={{ left: '96%', top: '70%' }}
              >
                <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
                <span>{isHindi ? 'बीटा कोशिका (इंसुलिन)' : 'Beta Cell (insulin)'}</span>
              </div>

              {/* 3. Delta Cell (Somatostatin) */}
              <div
                className="absolute flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B2E3A]/95 text-white border border-cyan-400 text-[11px] font-bold shadow-md -translate-x-full animate-in fade-in duration-200 whitespace-nowrap"
                style={{ left: '96%', top: '81%' }}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{isHindi ? 'डेल्टा कोशिका (सोमाटोस्टैटिन)' : 'Delta Cell (somatostatin)'}</span>
              </div>
            </div>
          )}

          {/* Idle Hint Badge */}
          {!hasInteracted && !activePart && (
            <div className="absolute top-4 left-4 z-10 pointer-events-none animate-pulse">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B2E3A]/90 text-white text-xs font-semibold border border-[#65D9D0]/60 shadow-md backdrop-blur-sm">
                <Compass className="w-3.5 h-3.5 text-[#65D9D0]" />
                <span>
                  {isHindi
                    ? 'अंगों को समझने के लिए कर्सर ले जाएं या टैप करें'
                    : 'Hover or tap a part to explore'}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Small Bottom Caption: "Illustrative anatomy, for patient education." */}
        <div className="px-4 py-2 bg-slate-50/90 border-t border-[#D7E5E6] flex items-center justify-between text-xs text-[#4F6470] w-full pointer-events-none select-none">
          <span>
            {isHindi
              ? 'मरीज स्वास्थ्य शिक्षा हेतु दृष्टांत शारीरिक रचना।'
              : 'Illustrative anatomy, for patient education.'}
          </span>
          <span className="text-xs text-[#0E5A6B] font-normal">
            {isHindi ? 'विर्सुंग वाहिनी एवं लैंगरहेंस द्वीप' : 'Duct of Wirsung & Islets'}
          </span>
        </div>
      </div>

      {/* Mobile Scrollable Chip Row for Under-768px Screens */}
      <div className="w-full mt-3 flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:hidden no-scrollbar">
        {HOTSPOT_LIST.map((id) => {
          const part = PANCREAS_DATA[id];
          const isSelected = activePart === id;
          const chipLabel =
            id === 'duct'
              ? isHindi
                ? 'पैन्क्रियाटिक डक्ट'
                : 'Pancreatic Duct'
              : id === 'islets'
              ? isHindi
                ? 'लैंगरहेंस द्वीप'
                : 'Islets Inset'
              : isHindi
              ? part.nameHi
              : part.name;
          return (
            <button
              key={`mob-chip-${id}`}
              type="button"
              onClick={() => handlePartSelect(id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isSelected
                  ? 'bg-[#0E5A6B] text-white border-[#0E5A6B] shadow-xs'
                  : 'bg-white text-[#1B2B34] border-[#D7E5E6] hover:border-[#0E5A6B]/50'
              }`}
            >
              {chipLabel}
            </button>
          );
        })}
      </div>

      {/* Anatomical Details Card (Reserved fixed-height container so zero layout shift occurs on hover) */}
      {showDetailsCard && (
        <div className="w-full mt-4 sm:mt-3.5 h-[176px] sm:h-[164px] relative shrink-0">
          {activePartInfo ? (
            <div className="w-full h-full p-4 sm:p-5 rounded-2xl bg-white border border-[#D7E5E6] shadow-[0_8px_24px_rgba(11,46,58,0.08)] relative flex flex-col justify-between animate-in fade-in duration-150">
              <button
                type="button"
                onClick={() => {
                  setSelectedPart(null);
                  setActivePart(null);
                }}
                className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#D7E5E6]/70">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-[#1B2B34]">
                      {isHindi ? activePartInfo.nameHi : activePartInfo.name}
                    </h3>
                    <span className="text-xs italic text-[#4F6470] font-serif">
                      ({activePartInfo.scientificName})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-[#0E5A6B] bg-[#E8F5F4] px-2.5 py-0.5 rounded-full border border-[#D7E5E6] w-fit">
                    {activePartInfo.badge}
                  </span>
                  <span className="text-[11px] font-bold text-[#0B2E3A] bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 w-fit">
                    {activePartInfo.stat}
                  </span>
                </div>
              </div>

              <div className="mt-2 space-y-1.5 text-xs sm:text-sm">
                {/* One-Line Physiological Function */}
                <div>
                  <strong className="text-[#1B2B34] font-semibold block text-xs">
                    {isHindi ? 'शारीरिक कार्य:' : 'Physiological Function:'}
                  </strong>
                  <p className="text-[#4F6470] leading-snug line-clamp-2">
                    {isHindi ? activePartInfo.oneLineFunctionHi : activePartInfo.oneLineFunction}
                  </p>
                </div>

                {/* Clinical Diabetology Note */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-[#E8F5F4]/60 border border-[#D7E5E6] text-xs">
                  <strong className="text-[#0E5A6B] font-bold flex items-center justify-between flex-wrap gap-1 mb-0.5">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#0E5A6B]" />
                      <span>{isHindi ? 'क्लिनिकल महत्व:' : 'Clinical Importance:'}</span>
                    </span>
                    <span className="text-[10.5px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Marker: {activePartInfo.clinicalMarker}
                    </span>
                  </strong>
                  <p className="text-[#1B2B34] leading-snug line-clamp-2">
                    {isHindi ? activePartInfo.clinicalNoteHi : activePartInfo.clinicalNote}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full p-4 sm:p-5 rounded-2xl bg-[#F7FAFA]/90 border border-dashed border-[#D7E5E6] flex flex-col items-center justify-center text-center transition-opacity duration-200">
              <div className="flex flex-col items-center gap-1 text-[#4F6470]">
                <Compass className="w-5 h-5 text-[#0E5A6B] stroke-[1.5]" />
                <p className="text-xs sm:text-sm font-medium text-[#1B2B34]">
                  {isHindi
                    ? 'अंगों के क्लिनिकल विवरण एवं मार्कर देखने हेतु कर्सर ले जाएं'
                    : 'Hover or tap any anatomical structure to view clinical markers'}
                </p>
                <p className="text-[11px] text-[#4F6470]">
                  {isHindi
                    ? 'अग्न्याशय वाहिनी, रक्त संवहनी अक्ष, लैंगरहेंस द्वीप आदि'
                    : 'Duct of Wirsung, Islets of Langerhans, Vasculature, Duodenum'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PancreasViewer;
