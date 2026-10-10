import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * ============================================================================
 * STANDALONE ANIMATED KIDNEY & URINARY SYSTEM COMPONENT
 * ============================================================================
 * A fully self-contained, interactive 3D-tilt animated human urinary system
 * with organ hover effects, bioluminescent glowing gradients, fluid flow
 * animations, ripple waves, floating ambient particles, and medical badges.
 *
 * Requirements:
 *   - React 18+
 *   - framer-motion (npm install framer-motion)
 *
 * Usage:
 *   import AnimatedKidney from './AnimatedKidney';
 *
 *   <div style={{ width: 480, height: 480 }}>
 *     <AnimatedKidney />
 *   </div>
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. ANATOMICAL SVG PATH DEFINITIONS
// ----------------------------------------------------------------------------
const ORGAN_PATHS = {
  leftKidney: "M 195,140 C 160,110 120,150 120,200 C 120,250 155,280 190,265 C 180,240 180,180 195,140 Z",
  rightKidney: "M 305,140 C 340,110 380,150 380,200 C 380,250 345,280 310,265 C 320,240 320,180 305,140 Z",
  leftKidneyHighlight: "M 125,180 C 122,210 135,245 160,260",
  rightKidneyHighlight: "M 375,180 C 378,210 365,245 340,260",
  leftKidneyShadow: "M 175,160 C 170,180 170,220 178,245",
  rightKidneyShadow: "M 325,160 C 330,180 330,220 322,245",
  aorta: "M 240,80 L 240,360 L 248,360 L 248,80 Z",
  leftRenalArtery: "M 240,180 C 210,180 195,185 178,192 L 178,198 C 195,191 210,186 240,186 Z",
  rightRenalArtery: "M 248,185 C 280,185 295,190 322,192 L 322,198 C 295,196 280,191 248,191 Z",
  venaCava: "M 252,80 L 252,360 L 260,360 L 260,80 Z",
  leftRenalVein: "M 252,195 C 215,195 195,200 178,202 L 178,208 C 195,206 215,201 252,201 Z",
  rightRenalVein: "M 260,192 C 290,192 305,200 322,202 L 322,208 C 305,206 290,198 260,198 Z",
  bladder: "M 210,370 C 210,335 290,335 290,370 C 290,410 272,430 250,430 C 228,430 210,410 210,370 Z",
  bladderHighlight: "M 220,365 C 220,350 280,350 280,365",
  bladderShadow: "M 215,385 C 225,415 275,415 285,385",
  leftUreter: "M 180,225 C 180,280 215,315 224,372",
  rightUreter: "M 320,225 C 320,280 285,315 276,372",
  urethra: "M 247,430 L 247,465 L 253,465 L 253,430 Z"
};

// ----------------------------------------------------------------------------
// 2. ORGAN DETAILS DATA
// ----------------------------------------------------------------------------
const ORGAN_DATA = {
  "kidney-left": {
    title: "Left Kidney",
    desc: "Filters metabolic waste products and excess fluid from blood to maintain electrolyte balance.",
    stat: "120ml/min Filtration"
  },
  "kidney-right": {
    title: "Right Kidney",
    desc: "Works in tandem with the left kidney to filter blood, manage blood pressure, and produce critical hormones.",
    stat: "Healthy Renal Function"
  },
  "arteries": {
    title: "Renal Artery",
    desc: "Branches off the abdominal aorta to supply oxygen-rich, unfiltered blood to the kidneys.",
    stat: "High-Pressure Inflow"
  },
  "veins": {
    title: "Renal Vein",
    desc: "Carries filtered, purified deoxygenated blood back to the inferior vena cava and heart.",
    stat: "Clean Blood Outflow"
  },
  "ureters": {
    title: "Ureters",
    desc: "Thick muscular tubes that use peristaltic contractions to propel urine from renal pelvis to the bladder.",
    stat: "Active Peristalsis"
  },
  "bladder": {
    title: "Urinary Bladder",
    desc: "A hollow, distensible muscular sac that safely stores urine until excretion is initiated.",
    stat: "400-600mL Storage Capacity"
  }
};

// ----------------------------------------------------------------------------
// 3. EMBEDDED CSS STYLES (Self-contained, works with or without Tailwind)
// ----------------------------------------------------------------------------
const EMBEDDED_STYLES = `
@keyframes kidney-flow-animation {
  from { stroke-dashoffset: 24; }
  to { stroke-dashoffset: 0; }
}
.ak-ureter-flow {
  stroke-dasharray: 8 16;
  animation: kidney-flow-animation 3s linear infinite;
}
.ak-glow-highlight {
  mix-blend-mode: screen;
  pointer-events: none;
}
.ak-light-ray {
  transform-origin: 250px 0px;
  mix-blend-mode: screen;
}
.ak-glass-card {
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 10px 25px -5px rgba(29, 95, 214, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
}
`;

// ----------------------------------------------------------------------------
// 4. SUB-COMPONENTS
// ----------------------------------------------------------------------------

function SVGDefs() {
  return (
    <defs>
      {/* Bioluminescent Glow Filter */}
      <filter id="ak-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Realistic Organ Drop Shadow */}
      <filter id="ak-organ-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0A1B3D" floodOpacity="0.18" />
      </filter>

      {/* Kidney Gradients */}
      <linearGradient id="ak-kidney-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F66A73" />
        <stop offset="60%" stopColor="#C63D4A" />
        <stop offset="100%" stopColor="#8E232F" />
      </linearGradient>

      {/* Renal Veins Gradient (Vivid Royal Blue) */}
      <linearGradient id="ak-veins-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="40%" stopColor="#2D7FF9" />
        <stop offset="100%" stopColor="#0F3E9E" />
      </linearGradient>

      {/* Renal Arteries Gradient (Crimson Red) */}
      <linearGradient id="ak-arteries-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="40%" stopColor="#D53947" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>

      {/* Bladder Gradient */}
      <linearGradient id="ak-bladder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FDA4AF" />
        <stop offset="50%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#BE123C" />
      </linearGradient>

      {/* Ureters Gradient */}
      <linearGradient id="ak-ureter-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FED7AA" />
        <stop offset="50%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>

      {/* Animated Urine Flow Gradient */}
      <linearGradient id="ak-flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
        <stop offset="50%" stopColor="#60A5FA" stopOpacity="1" />
        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
      </linearGradient>

      {/* Glass Ring Halo Gradient */}
      <linearGradient id="ak-glass-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EAF2FC" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#1D5FD6" stopOpacity="0.25" />
      </linearGradient>

      {/* Radial Blue Glow */}
      <radialGradient id="ak-bg-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#42B8FF" stopOpacity="0.4" />
        <stop offset="40%" stopColor="#1D5FD6" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#1D5FD6" stopOpacity="0" />
      </radialGradient>

      {/* Radial Glossy Specular Highlight */}
      <radialGradient id="ak-organ-highlight" cx="30%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function GlassRing() {
  return (
    <g id="glass-ring-group" pointerEvents="none">
      {/* Soft background blue glow inside the ring */}
      <circle cx="250" cy="250" r="190" fill="url(#ak-bg-glow)" />

      {/* Main Glass Circle plate */}
      <circle
        cx="250"
        cy="250"
        r="210"
        fill="rgba(255, 255, 255, 0.03)"
        stroke="url(#ak-glass-ring-grad)"
        strokeWidth="2"
        filter="url(#ak-organ-shadow)"
      />

      {/* Outer rim highlight reflection */}
      <circle
        cx="250"
        cy="250"
        r="210.5"
        fill="none"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="1"
      />

      {/* Top crescent glass glare */}
      <path
        d="M 101.5,140 A 210,210 0 0,1 398.5,140 A 206,206 0 0,0 101.5,140 Z"
        fill="url(#ak-organ-highlight)"
        opacity="0.6"
      />

      {/* Light rays shining from upper-left */}
      <g opacity="0.25" className="ak-light-ray">
        <polygon points="250,250 80,0 180,0" fill="url(#ak-organ-highlight)" />
        <polygon points="250,250 220,0 340,0" fill="url(#ak-organ-highlight)" />
      </g>
    </g>
  );
}

function WaterRipples() {
  const rippleConfigs = [
    { delay: 0, stroke: "#42B8FF", strokeWidth: 1.5 },
    { delay: 2.5, stroke: "#60A5FA", strokeWidth: 1.5 },
    { delay: 5.0, stroke: "#1D5FD6", strokeWidth: 1 }
  ];

  return (
    <g id="water-ripples" pointerEvents="none">
      {rippleConfigs.map((cfg, i) => (
        <motion.circle
          key={i}
          cx="250"
          cy="395"
          r="110"
          fill="none"
          stroke={cfg.stroke}
          strokeWidth={cfg.strokeWidth}
          style={{ transformOrigin: "250px 395px" }}
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: [0.1, 1.2], opacity: [0.75, 0] }}
          transition={{
            duration: 7.5,
            ease: "easeOut",
            repeat: Infinity,
            delay: cfg.delay
          }}
        />
      ))}
    </g>
  );
}

function FloatingParticles() {
  const particles = useMemo(
    () => [
      { id: 1, cx: 160, cy: 120, r: 2.5, duration: 8, delay: 0 },
      { id: 2, cx: 340, cy: 110, r: 3.5, duration: 10, delay: 0.5 },
      { id: 3, cx: 120, cy: 260, r: 2.0, duration: 7, delay: 1.2 },
      { id: 4, cx: 380, cy: 250, r: 3.0, duration: 9, delay: 0.8 },
      { id: 5, cx: 200, cy: 380, r: 4.0, duration: 11, delay: 0.2 },
      { id: 6, cx: 300, cy: 370, r: 2.5, duration: 8.5, delay: 1.5 },
      { id: 7, cx: 140, cy: 190, r: 3.0, duration: 9.5, delay: 2.1 },
      { id: 8, cx: 360, cy: 180, r: 2.0, duration: 6.5, delay: 0.7 },
      { id: 9, cx: 250, cy: 140, r: 3.5, duration: 10.5, delay: 1.0 },
      { id: 10, cx: 220, cy: 320, r: 2.5, duration: 7.5, delay: 1.8 },
      { id: 11, cx: 280, cy: 320, r: 2.0, duration: 8.0, delay: 2.3 },
      { id: 12, cx: 180, cy: 430, r: 3.0, duration: 9.0, delay: 0.4 },
      { id: 13, cx: 320, cy: 430, r: 2.5, duration: 11.0, delay: 1.1 },
      { id: 14, cx: 100, cy: 210, r: 3.5, duration: 8.2, delay: 2.6 },
      { id: 15, cx: 400, cy: 210, r: 2.0, duration: 7.1, delay: 0.3 }
    ],
    []
  );

  return (
    <g id="particles" pointerEvents="none">
      {particles.map((p) => (
        <motion.circle
          key={p.id}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill="#42B8FF"
          opacity="0.65"
          filter="url(#ak-glow)"
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            opacity: [0.35, 0.8, 0.35]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
        />
      ))}
    </g>
  );
}

function FloatingBadge({ cx, cy, delay, duration, children }) {
  return (
    <motion.g
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      animate={{
        y: [-6, 6, -6],
        rotate: [-3, 3, -3]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    >
      <circle cx={cx} cy={cy} r={22} fill="#1D5FD6" opacity="0.08" filter="url(#ak-glow)" />
      <circle
        cx={cx}
        cy={cy}
        r={20}
        fill="rgba(255, 255, 255, 0.85)"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="1.5"
        filter="url(#ak-organ-shadow)"
      />
      <path
        d={`M ${cx - 17},${cy - 8} A 20,20 0 0,1 ${cx + 17},${cy - 8} A 18,18 0 0,0 ${cx - 17},${cy - 8} Z`}
        fill="url(#ak-organ-highlight)"
        opacity="0.5"
        pointerEvents="none"
      />
      <g transform={`translate(${cx - 10}, ${cy - 10})`} stroke="#1D5FD6" fill="#1D5FD6">
        {children}
      </g>
    </motion.g>
  );
}

function MedicalBadges() {
  return (
    <g id="medical-badges" pointerEvents="none">
      {/* 1. Activity / Pulse Icon */}
      <FloatingBadge cx={50} cy={95} delay={0} duration={6}>
        <path
          d="M 3,10 L 6,10 L 8,17 L 12,3 L 15,13 L 17,10 L 20,10"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </FloatingBadge>

      {/* 2. Shield Icon */}
      <FloatingBadge cx={450} cy={95} delay={1.2} duration={7}>
        <path
          d="M 10,2 S 17,4 17,8 C 17,13 14,17 10,18.5 C 6,17 3,13 3,8 C 3,4 10,2 10,2 Z"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </FloatingBadge>

      {/* 3. Laser / Energy Bolt */}
      <FloatingBadge cx={25} cy={235} delay={0.6} duration={6.5}>
        <polygon
          points="11,1 2,11 10,11 9,19 18,9 10,9 11,1"
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </FloatingBadge>

      {/* 4. Doctor Silhouette */}
      <FloatingBadge cx={475} cy={235} delay={1.8} duration={5.5}>
        <circle cx="10" cy="6" r="3" fill="none" strokeWidth="2" />
        <path d="M 3,17 A 7,7 0 0,1 17,17" fill="none" strokeWidth="2" strokeLinecap="round" />
        <path d="M 10,9 L 10,12" strokeWidth="1.5" />
      </FloatingBadge>

      {/* 5. Heart Icon */}
      <FloatingBadge cx={75} cy={385} delay={0.9} duration={7.5}>
        <path
          d="M 10,17 L 9,16 C 4.5,12 1.5,9.5 1.5,6 C 1.5,3.2 3.7,1 6.5,1 C 8.1,1 9.6,1.8 10,3 C 10.4,1.8 11.9,1 13.5,1 C 16.3,1 18.5,3.2 18.5,6 C 18.5,9.5 15.5,12 11,16 Z"
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </FloatingBadge>

      {/* 6. Medical Cross */}
      <FloatingBadge cx={425} cy={385} delay={2.1} duration={6.8}>
        <path d="M 10,3 L 10,17 M 3,10 L 17,10" fill="none" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="10" cy="10" r="8" fill="none" strokeWidth="1" strokeDasharray="2 3" />
      </FloatingBadge>
    </g>
  );
}

// ----------------------------------------------------------------------------
// 5. MAIN ANIMATED KIDNEY COMPONENT
// ----------------------------------------------------------------------------
export default function AnimatedKidney({
  className = "",
  style = {},
  showDetailsCard = true,
  showMedicalBadges = true,
  enableParallax = true,
  onOrganHover,
  onOrganClick
}) {
  const [hoveredOrgan, setHoveredOrgan] = useState(null);

  // Smooth mouse tilt parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120, mass: 0.8 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120, mass: 0.8 });

  const rotateY = useTransform(smoothX, [-1, 1], [-5, 5]);
  const rotateX = useTransform(smoothY, [-1, 1], [5, -5]);
  const translateX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const translateY = useTransform(smoothY, [-1, 1], [-12, 12]);

  useEffect(() => {
    if (!enableParallax) return;
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth) * 2 - 1;
      const y = (event.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableParallax, mouseX, mouseY]);

  const handleOrganHover = (organ) => {
    setHoveredOrgan(organ);
    if (onOrganHover) onOrganHover(organ);
  };

  const handleOrganClick = (organ) => {
    if (onOrganClick) onOrganClick(organ);
  };

  const activeDetails = hoveredOrgan ? ORGAN_DATA[hoveredOrgan] : null;

  return (
    <div
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
      style={{ width: "100%", height: "100%", ...style }}
    >
      {/* Embedded CSS for animations and glass styling */}
      <style>{EMBEDDED_STYLES}</style>

      {/* Deep Background Bioluminescent Glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 350,
          height: 350,
          background: "radial-gradient(circle, rgba(29, 95, 214, 0.18) 0%, rgba(66, 184, 255, 0.08) 50%, transparent 70%)",
          filter: "blur(70px)",
          zIndex: 0
        }}
      />

      {/* Main Interactive SVG */}
      <motion.svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
        style={{
          maxWidth: 460,
          maxHeight: 460,
          perspective: 1000,
          zIndex: 10
        }}
      >
        <SVGDefs />

        {/* 3D Tilt & Idle Floating Rig */}
        <motion.g
          style={{
            rotateX: enableParallax ? rotateX : 0,
            rotateY: enableParallax ? rotateY : 0,
            x: enableParallax ? translateX : 0,
            y: enableParallax ? translateY : 0,
            transformStyle: "preserve-3d"
          }}
          animate={{
            y: [-4, 4, -4],
            rotate: [-0.6, 0.6, -0.6]
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror"
          }}
        >
          {/* Layer 1: Glass Backdrop Circle & Light Rays */}
          <GlassRing />

          {/* Layer 2: Floating Organic Particles */}
          <FloatingParticles />

          {/* Layer 3: Concentric Fluid Ripples */}
          <WaterRipples />

          {/* Layer 4: Renal Veins (Inferior Vena Cava & branches) */}
          <motion.g
            id="veins"
            className="cursor-pointer"
            onHoverStart={() => handleOrganHover("veins")}
            onHoverEnd={() => handleOrganHover(null)}
            onClick={() => handleOrganClick("veins")}
            whileHover={{ filter: "brightness(1.15)" }}
            transition={{ duration: 0.2 }}
          >
            {hoveredOrgan === "veins" && (
              <g opacity="0.5" filter="url(#ak-glow)">
                <path d={ORGAN_PATHS.venaCava} fill="#2D7FF9" />
                <path d={ORGAN_PATHS.leftRenalVein} fill="#2D7FF9" />
                <path d={ORGAN_PATHS.rightRenalVein} fill="#2D7FF9" />
              </g>
            )}
            <path d={ORGAN_PATHS.venaCava} fill="url(#ak-veins-grad)" filter="url(#ak-organ-shadow)" />
            <path d={ORGAN_PATHS.leftRenalVein} fill="url(#ak-veins-grad)" />
            <path d={ORGAN_PATHS.rightRenalVein} fill="url(#ak-veins-grad)" />
            <motion.path
              d={ORGAN_PATHS.venaCava}
              fill="#FFFFFF"
              opacity="0.08"
              animate={{ opacity: [0.03, 0.12, 0.03] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>

          {/* Layer 5: Renal Arteries (Aorta & branches) */}
          <motion.g
            id="arteries"
            className="cursor-pointer"
            onHoverStart={() => handleOrganHover("arteries")}
            onHoverEnd={() => handleOrganHover(null)}
            onClick={() => handleOrganClick("arteries")}
            whileHover={{ filter: "brightness(1.15)" }}
            transition={{ duration: 0.2 }}
          >
            {hoveredOrgan === "arteries" && (
              <g opacity="0.5" filter="url(#ak-glow)">
                <path d={ORGAN_PATHS.aorta} fill="#D53947" />
                <path d={ORGAN_PATHS.leftRenalArtery} fill="#D53947" />
                <path d={ORGAN_PATHS.rightRenalArtery} fill="#D53947" />
              </g>
            )}
            <path d={ORGAN_PATHS.aorta} fill="url(#ak-arteries-grad)" filter="url(#ak-organ-shadow)" />
            <path d={ORGAN_PATHS.leftRenalArtery} fill="url(#ak-arteries-grad)" />
            <path d={ORGAN_PATHS.rightRenalArtery} fill="url(#ak-arteries-grad)" />
            <motion.path
              d={ORGAN_PATHS.aorta}
              fill="#FFFFFF"
              opacity="0.08"
              animate={{ opacity: [0.03, 0.15, 0.03] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>

          {/* Layer 6: Ureters (With animated urine fluid flow) */}
          <motion.g
            id="ureters"
            className="cursor-pointer"
            onHoverStart={() => handleOrganHover("ureters")}
            onHoverEnd={() => handleOrganHover(null)}
            onClick={() => handleOrganClick("ureters")}
            whileHover={{ filter: "brightness(1.15)" }}
            transition={{ duration: 0.2 }}
          >
            {hoveredOrgan === "ureters" && (
              <g opacity="0.45" filter="url(#ak-glow)">
                <path d={ORGAN_PATHS.leftUreter} fill="none" stroke="#F472B6" strokeWidth="8" strokeLinecap="round" />
                <path d={ORGAN_PATHS.rightUreter} fill="none" stroke="#F472B6" strokeWidth="8" strokeLinecap="round" />
              </g>
            )}
            <path d={ORGAN_PATHS.leftUreter} fill="none" stroke="url(#ak-ureter-grad)" strokeWidth="4.5" strokeLinecap="round" />
            <path d={ORGAN_PATHS.rightUreter} fill="none" stroke="url(#ak-ureter-grad)" strokeWidth="4.5" strokeLinecap="round" />
            <path d={ORGAN_PATHS.leftUreter} fill="none" stroke="url(#ak-flow-grad)" strokeWidth="2" strokeLinecap="round" className="ak-ureter-flow" />
            <path d={ORGAN_PATHS.rightUreter} fill="none" stroke="url(#ak-flow-grad)" strokeWidth="2" strokeLinecap="round" className="ak-ureter-flow" />
          </motion.g>

          {/* Layer 7: Urinary Bladder & Urethra */}
          <motion.g
            id="bladder"
            className="cursor-pointer"
            onHoverStart={() => handleOrganHover("bladder")}
            onHoverEnd={() => handleOrganHover(null)}
            onClick={() => handleOrganClick("bladder")}
            style={{ transformOrigin: "250px 395px" }}
            whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            {hoveredOrgan === "bladder" && (
              <path d={ORGAN_PATHS.bladder} fill="#F43F5E" opacity="0.45" filter="url(#ak-glow)" />
            )}
            <path d={ORGAN_PATHS.urethra} fill="url(#ak-bladder-grad)" filter="url(#ak-organ-shadow)" />
            <path d={ORGAN_PATHS.bladder} fill="url(#ak-bladder-grad)" filter="url(#ak-organ-shadow)" />
            <path d={ORGAN_PATHS.bladderShadow} stroke="#4C0519" strokeWidth="3.5" fill="none" opacity="0.3" strokeLinecap="round" />
            <path d={ORGAN_PATHS.bladderHighlight} stroke="url(#ak-organ-highlight)" strokeWidth="4" fill="none" strokeLinecap="round" className="ak-glow-highlight" />
            <circle cx="250" cy="390" r="5" fill="#FDA4AF" opacity="0.75" filter="url(#ak-glow)" />
          </motion.g>

          {/* Layer 8: Left Kidney */}
          <motion.g
            id="left-kidney"
            className="cursor-pointer"
            onHoverStart={() => handleOrganHover("kidney-left")}
            onHoverEnd={() => handleOrganHover(null)}
            onClick={() => handleOrganClick("kidney-left")}
            style={{ transformOrigin: "155px 200px" }}
            whileHover={{ scale: 1.06, filter: "brightness(1.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            {hoveredOrgan === "kidney-left" && (
              <path d={ORGAN_PATHS.leftKidney} fill="#F66A73" opacity="0.4" filter="url(#ak-glow)" />
            )}
            <path d={ORGAN_PATHS.leftKidney} fill="url(#ak-kidney-grad)" filter="url(#ak-organ-shadow)" />
            <path d={ORGAN_PATHS.leftKidneyShadow} stroke="#4A0E17" strokeWidth="3.5" fill="none" opacity="0.35" strokeLinecap="round" />
            <path d={ORGAN_PATHS.leftKidneyHighlight} stroke="url(#ak-organ-highlight)" strokeWidth="4" fill="none" strokeLinecap="round" className="ak-glow-highlight" />
            <circle cx="180" cy="200" r="6" fill="#F87171" opacity="0.8" filter="url(#ak-glow)" />
          </motion.g>

          {/* Layer 9: Right Kidney */}
          <motion.g
            id="right-kidney"
            className="cursor-pointer"
            onHoverStart={() => handleOrganHover("kidney-right")}
            onHoverEnd={() => handleOrganHover(null)}
            onClick={() => handleOrganClick("kidney-right")}
            style={{ transformOrigin: "345px 200px" }}
            whileHover={{ scale: 1.06, filter: "brightness(1.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            {hoveredOrgan === "kidney-right" && (
              <path d={ORGAN_PATHS.rightKidney} fill="#F66A73" opacity="0.4" filter="url(#ak-glow)" />
            )}
            <path d={ORGAN_PATHS.rightKidney} fill="url(#ak-kidney-grad)" filter="url(#ak-organ-shadow)" />
            <path d={ORGAN_PATHS.rightKidneyShadow} stroke="#4A0E17" strokeWidth="3.5" fill="none" opacity="0.35" strokeLinecap="round" />
            <path d={ORGAN_PATHS.rightKidneyHighlight} stroke="url(#ak-organ-highlight)" strokeWidth="4" fill="none" strokeLinecap="round" className="ak-glow-highlight" />
            <circle cx="320" cy="200" r="6" fill="#F87171" opacity="0.8" filter="url(#ak-glow)" />
          </motion.g>
        </motion.g>

        {/* Layer 10: Floating Medical Icons (Rendered on flat depth plane) */}
        {showMedicalBadges && <MedicalBadges />}
      </motion.svg>

      {/* Floating Info Card (Glassmorphic details card on hover) */}
      {showDetailsCard && (
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: -16,
            left: "50%",
            transform: "translateX(-50%)",
            width: "85%",
            maxWidth: 280,
            height: 72,
            zIndex: 20
          }}
        >
          <AnimatePresence mode="wait">
            {activeDetails ? (
              <motion.div
                key={hoveredOrgan}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="ak-glass-card rounded-2xl p-3 flex flex-col justify-center text-center"
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "#1D5FD6",
                      lineHeight: 1
                    }}
                  >
                    {activeDetails.title}
                  </span>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 9,
                      color: "#1D5FD6",
                      backgroundColor: "#E0F2FE",
                      padding: "2px 6px",
                      borderRadius: 9999,
                      lineHeight: 1
                    }}
                  >
                    {activeDetails.stat}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 10,
                    color: "#475569",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {activeDetails.desc}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: "rgba(100, 116, 139, 0.6)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}
                >
                  Hover organs to inspect
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export { AnimatedKidney, ORGAN_DATA, ORGAN_PATHS };
