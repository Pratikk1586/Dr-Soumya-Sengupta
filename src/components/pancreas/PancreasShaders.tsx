import React from 'react';

/**
 * Realistic Medical Anatomical SVG Shaders, Filters & Gradients.
 * Uses procedural turbulence, specular lighting, and organic gradients
 * to render authentic glandular acinar textures, glossy organs, and vessels.
 */
export const PancreasShaders: React.FC = () => {
  return (
    <defs>
      {/* ------------------------------------------------------------- */}
      {/* 1. PROCEDURAL GLANDULAR TEXTURE (Acinar Lobulation)           */}
      {/* ------------------------------------------------------------- */}
      {/* ------------------------------------------------------------- */}
      {/* 1. PROCEDURAL GLANDULAR TEXTURE (Acinar Lobulation)           */}
      {/* ------------------------------------------------------------- */}
      <filter
        id="pancreas-lobular-realistic"
        x="-15%"
        y="-15%"
        width="130%"
        height="130%"
        colorInterpolationFilters="sRGB"
      >
        {/* Fractal cellular noise for micro-lobules */}
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.045 0.045"
          numOctaves="4"
          seed="31"
          result="fineNoise"
        />
        {/* Organic edge displacement for nodular bumps */}
        <feDisplacementMap
          in="SourceGraphic"
          in2="fineNoise"
          scale="3.5"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedOrgan"
        />
        {/* Strong directional key light specular highlight from upper-left (azimuth 225, elevation 54) */}
        <feSpecularLighting
          in="fineNoise"
          surfaceScale="2.8"
          specularConstant="0.95"
          specularExponent="16"
          lightingColor="#fff8f0"
          result="specularHighlight"
        >
          <feDistantLight azimuth="225" elevation="54" />
        </feSpecularLighting>
        {/* Clip specular light strictly to organ shape */}
        <feComposite
          in="specularHighlight"
          in2="displacedOrgan"
          operator="in"
          result="clippedSpec"
        />
        {/* Blend specular shine with organic colored tissue */}
        <feBlend
          in="displacedOrgan"
          in2="clippedSpec"
          mode="screen"
          result="shadedTissue"
        />
      </filter>

      {/* ------------------------------------------------------------- */}
      {/* 2. DUODENAL FLESHY TEXTURE (Soft mucosal wall with folds)     */}
      {/* ------------------------------------------------------------- */}
      <filter
        id="duodenum-fleshy-realistic"
        x="-15%"
        y="-15%"
        width="130%"
        height="130%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="turbulence"
          baseFrequency="0.025 0.025"
          numOctaves="3"
          seed="12"
          result="mucosalNoise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="mucosalNoise"
          scale="2.5"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedDuodenum"
        />
        {/* Upper-left key light on duodenum */}
        <feSpecularLighting
          in="mucosalNoise"
          surfaceScale="2.4"
          specularConstant="0.82"
          specularExponent="14"
          lightingColor="#fff1f2"
          result="specHighlight"
        >
          <feDistantLight azimuth="225" elevation="50" />
        </feSpecularLighting>
        <feComposite in="specHighlight" in2="displacedDuodenum" operator="in" result="clippedSpec" />
        <feBlend in="displacedDuodenum" in2="clippedSpec" mode="screen" />
      </filter>

      {/* ------------------------------------------------------------- */}
      {/* 3. SPLEEN GLOSS TEXTURE (Capsular smooth surface with sheen)  */}
      {/* ------------------------------------------------------------- */}
      <filter
        id="spleen-smooth-gloss"
        x="-15%"
        y="-15%"
        width="130%"
        height="130%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.015 0.015"
          numOctaves="2"
          seed="8"
          result="capsuleNoise"
        />
        <feSpecularLighting
          in="capsuleNoise"
          surfaceScale="3.6"
          specularConstant="1.25"
          specularExponent="26"
          lightingColor="#ffe4e6"
          result="capsularGloss"
        >
          <feDistantLight azimuth="225" elevation="58" />
        </feSpecularLighting>
        <feComposite in="capsularGloss" in2="SourceGraphic" operator="in" result="clippedGloss" />
        <feBlend in="SourceGraphic" in2="clippedGloss" mode="screen" />
      </filter>

      {/* ------------------------------------------------------------- */}
      {/* 4. VOLUMETRIC BLOOD VESSEL TUBE SHADING                       */}
      {/* ------------------------------------------------------------- */}
      <filter id="vessel-3d-sheen" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#06181f" floodOpacity="0.25" />
      </filter>

      {/* ------------------------------------------------------------- */}
      {/* 5. HOVER HIGHLIGHT: TEAL GLOW OUTLINE (#65D9D0 / #103F4A)     */}
      {/* ------------------------------------------------------------- */}
      <filter
        id="hover-glow-teal"
        x="-25%"
        y="-25%"
        width="150%"
        height="150%"
        colorInterpolationFilters="sRGB"
      >
        <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#65D9D0" floodOpacity="0.9" />
        <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#103F4A" floodOpacity="0.45" />
      </filter>

      {/* ------------------------------------------------------------- */}
      {/* 6. REALISTIC ANATOMICAL SHADOWS & LIGHTING                    */}
      {/* ------------------------------------------------------------- */}
      {/* Contact shadow blur filter */}
      <filter id="contact-shadow-blur" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.8" />
      </filter>

      {/* Soft drop shadow under the whole organ group */}
      <filter id="whole-group-drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#06181f" floodOpacity="0.22" />
        <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#103F4A" floodOpacity="0.16" />
      </filter>

      <filter id="anatomical-depth-shadow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#103F4A" floodOpacity="0.18" />
      </filter>

      <filter id="lens-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#06181f" floodOpacity="0.3" />
      </filter>

      {/* ------------------------------------------------------------- */}
      {/* 7. REALISTIC COLOR GRADIENTS                                  */}
      {/* ------------------------------------------------------------- */}
      {/* Pancreas Parenchyma (Tan-Pink Glandular Tissue) */}
      <linearGradient id="pancreas-body-grad" x1="0%" y1="0%" x2="100%" y2="70%">
        <stop offset="0%" stopColor="#f7c8b2" />
        <stop offset="25%" stopColor="#ebb099" />
        <stop offset="55%" stopColor="#e09880" />
        <stop offset="85%" stopColor="#cc7e67" />
        <stop offset="100%" stopColor="#b86953" />
      </linearGradient>

      {/* Pancreas Head (Warm fleshy lobulated core) */}
      <radialGradient id="pancreas-head-grad" cx="45%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#fbd3be" />
        <stop offset="35%" stopColor="#efad96" />
        <stop offset="70%" stopColor="#db8e76" />
        <stop offset="100%" stopColor="#bd6f57" />
      </radialGradient>

      {/* Pancreas Tail (Tapering towards spleen) */}
      <linearGradient id="pancreas-tail-grad" x1="0%" y1="30%" x2="100%" y2="80%">
        <stop offset="0%" stopColor="#f3b49f" />
        <stop offset="50%" stopColor="#e3957d" />
        <stop offset="85%" stopColor="#cf7f67" />
        <stop offset="100%" stopColor="#b4644d" />
      </linearGradient>

      {/* Duodenal C-Loop (Salmon-Pink Muscular Wall) */}
      <linearGradient id="duodenum-salmon-grad" x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0%" stopColor="#fcaaa3" />
        <stop offset="30%" stopColor="#f5857c" />
        <stop offset="65%" stopColor="#e36359" />
        <stop offset="100%" stopColor="#c5473e" />
      </linearGradient>

      {/* Spleen (Deep Maroon / Glossy Plum Tissue with Oval Volume) */}
      <radialGradient id="spleen-maroon-grad" cx="38%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#b0314f" />
        <stop offset="30%" stopColor="#8d1c37" />
        <stop offset="65%" stopColor="#671027" />
        <stop offset="100%" stopColor="#430818" />
      </radialGradient>

      {/* Duct of Wirsung (Continuous Thin Pale-Yellow Secretory Tube) */}
      <linearGradient id="wirsung-duct-grad" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.95" />
        <stop offset="45%" stopColor="#fef08a" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#fde047" stopOpacity="0.9" />
      </linearGradient>

      {/* Splenic & Mesenteric Artery (Oxygenated Crimson Arterial Blood) */}
      <linearGradient id="splenic-artery-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="35%" stopColor="#dc2626" />
        <stop offset="75%" stopColor="#b91c1c" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>

      {/* Splenic & Portal Vein (Deoxygenated Royal Blue Return Flow) */}
      <linearGradient id="splenic-vein-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="35%" stopColor="#2563eb" />
        <stop offset="75%" stopColor="#1d4ed8" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>

      {/* Stomach Bed (Translucent Anatomical Context) */}
      <linearGradient id="stomach-bed-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0.38" />
        <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.12" />
      </linearGradient>

      {/* Inset Loupe Magnifier Glass Reflection */}
      <linearGradient id="lens-glass-glare" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
        <stop offset="35%" stopColor="#ffffff" stopOpacity="0.08" />
        <stop offset="65%" stopColor="#65D9D0" stopOpacity="0.04" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
      </linearGradient>

      {/* Thin Glass Rim for Inset Loupe */}
      <linearGradient id="lens-glass-rim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="25%" stopColor="#65D9D0" stopOpacity="0.5" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
        <stop offset="75%" stopColor="#65D9D0" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
      </linearGradient>

      {/* Projection Cone Gradient */}
      <linearGradient id="lens-cone-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#65D9D0" stopOpacity="0.35" />
        <stop offset="60%" stopColor="#65D9D0" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#103F4A" stopOpacity="0.04" />
      </linearGradient>

      {/* Beta Cell Cytoplasm & Membrane Gradient (Pink/Magenta) */}
      <radialGradient id="beta-cell-grad" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#f5d0fe" />
        <stop offset="40%" stopColor="#e879f9" />
        <stop offset="80%" stopColor="#c026d3" />
        <stop offset="100%" stopColor="#86198f" />
      </radialGradient>

      {/* Alpha Cell Cytoplasm & Membrane Gradient (Warm Orange/Amber) */}
      <radialGradient id="alpha-cell-grad" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="45%" stopColor="#fb923c" />
        <stop offset="85%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#9a3412" />
      </radialGradient>

      {/* Delta Cell Cytoplasm Gradient (Emerald Somatostatin) */}
      <radialGradient id="delta-cell-grad" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#a7f3d0" />
        <stop offset="45%" stopColor="#34d399" />
        <stop offset="85%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064e3b" />
      </radialGradient>
    </defs>
  );
};
