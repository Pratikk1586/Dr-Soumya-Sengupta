import React from 'react';
import { Activity, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroStaticVisualProps {
  className?: string;
  isFallback?: boolean;
}

/**
 * HeroStaticVisual: Immediate LCP rendering element.
 * Zero JavaScript animation overhead, pure CSS/SVG geometry.
 * Paints instantly on the initial HTML render and acts as the graceful fallback
 * when WebGL is unavailable, reduced-motion is preferred, or an error occurs.
 */
export const HeroStaticVisual: React.FC<HeroStaticVisualProps> = ({
  className = '',
  isFallback = false,
}) => {
  return (
    <div
      className={`relative w-full aspect-square max-w-[480px] lg:max-w-[540px] mx-auto flex items-center justify-center rounded-3xl bg-gradient-to-br from-[#0a252f] via-[#103F4A] to-[#081e26] p-6 sm:p-8 shadow-2xl border border-teal-500/20 overflow-hidden select-none ${className}`}
      aria-label="Scientific anatomical visualization of pancreatic islet beta-cell endocrine signaling"
      role="img"
    >
      {/* Background medical grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient anatomical glow */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* SVG Anatomical & Endocrine Composition */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full relative z-10 drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pancreasGrad" x1="80" y1="200" x2="420" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#2ba3b6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#103F4A" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="ductGrad" x1="100" y1="240" x2="380" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5eead4" stopOpacity="0.6" />
          </linearGradient>

          <radialGradient id="isletGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Homeostasis orbital rings */}
        <circle cx="250" cy="250" r="210" stroke="#2ba3b6" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.25" />
        <circle cx="250" cy="250" r="170" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.2" />
        <circle cx="250" cy="250" r="130" stroke="#14b8a6" strokeWidth="1.2" strokeOpacity="0.3" />

        {/* Anatomical Pancreas Silhouette */}
        <path
          d="M 120 220 
             C 90 240, 85 290, 130 310
             C 170 325, 230 295, 280 280
             C 330 265, 390 250, 420 220
             C 430 210, 420 190, 390 195
             C 340 205, 290 215, 240 220
             C 190 225, 140 205, 120 220 Z"
          fill="url(#pancreasGrad)"
          stroke="#5eead4"
          strokeWidth="2.5"
          filter="url(#glowFilter)"
        />

        {/* Pancreatic Main Duct (Wirsung) */}
        <path
          d="M 115 270 
             C 160 280, 220 260, 270 250
             C 320 240, 365 228, 410 212"
          fill="none"
          stroke="url(#ductGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Interlobular side branches */}
        <path d="M 160 275 Q 170 250 185 240" stroke="#fef08a" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
        <path d="M 210 265 Q 220 285 235 292" stroke="#fef08a" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
        <path d="M 260 252 Q 275 235 290 230" stroke="#fef08a" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
        <path d="M 315 242 Q 330 260 345 262" stroke="#fef08a" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
        <path d="M 360 232 Q 375 218 390 215" stroke="#fef08a" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />

        {/* Islets of Langerhans (Beta & Alpha Cell Clusters) */}
        <g filter="url(#glowFilter)">
          <circle cx="150" cy="285" r="9" fill="url(#isletGlow)" />
          <circle cx="150" cy="285" r="3.5" fill="#ffffff" />

          <circle cx="200" cy="245" r="11" fill="url(#isletGlow)" />
          <circle cx="200" cy="245" r="4" fill="#ffffff" />

          <circle cx="250" cy="275" r="13" fill="url(#isletGlow)" />
          <circle cx="250" cy="275" r="5" fill="#ffffff" />

          <circle cx="305" cy="235" r="10" fill="url(#isletGlow)" />
          <circle cx="305" cy="235" r="4" fill="#ffffff" />

          <circle cx="355" cy="248" r="8" fill="url(#isletGlow)" />
          <circle cx="355" cy="248" r="3" fill="#ffffff" />

          <circle cx="395" cy="210" r="7" fill="url(#isletGlow)" />
          <circle cx="395" cy="210" r="2.5" fill="#ffffff" />
        </g>

        {/* Micro-vascular glycemic capillaries */}
        <g stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3">
          <line x1="150" y1="285" x2="130" y2="350" />
          <line x1="250" y1="275" x2="270" y2="370" />
          <line x1="305" y1="235" x2="330" y2="150" />
          <line x1="200" y1="245" x2="180" y2="160" />
        </g>

        {/* Floating glucose and insulin ions */}
        <circle cx="110" cy="170" r="4" fill="#f59e0b" fillOpacity="0.85" />
        <circle cx="380" cy="140" r="3" fill="#38bdf8" fillOpacity="0.75" />
        <circle cx="410" cy="310" r="4.5" fill="#5eead4" fillOpacity="0.8" />
        <circle cx="140" cy="380" r="3.5" fill="#f59e0b" fillOpacity="0.7" />
        <circle cx="290" cy="400" r="4" fill="#38bdf8" fillOpacity="0.8" />
      </svg>

      {/* Floating Scientific Data Badges */}
      <div className="absolute top-5 left-5 bg-slate-900/80 backdrop-blur-md border border-teal-500/30 rounded-xl px-3 py-2 flex items-center gap-2 text-white shadow-lg z-20">
        <Activity className="w-4 h-4 text-teal-400" />
        <div>
          <span className="text-[10px] tracking-wider text-teal-300 font-semibold uppercase block">
            Endocrine Balance
          </span>
          <span className="text-xs font-medium text-slate-200">
            Beta-Cell & Islet Preservation
          </span>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 bg-slate-900/80 backdrop-blur-md border border-amber-500/30 rounded-xl px-3 py-2 flex items-center gap-2 text-white shadow-lg z-20">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <div>
          <span className="text-[10px] tracking-wider text-amber-300 font-semibold uppercase block">
            Glycemic Target
          </span>
          <span className="text-xs font-medium text-slate-200">
            Time In Range (TIR &gt; 70%)
          </span>
        </div>
      </div>

      {isFallback && (
        <div className="absolute bottom-5 left-5 bg-teal-950/90 border border-teal-700/50 rounded-lg px-2.5 py-1 text-[11px] text-teal-200 z-20 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>High-Fidelity Medical Diagram</span>
        </div>
      )}
    </div>
  );
};
