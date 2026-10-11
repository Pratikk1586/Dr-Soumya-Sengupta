import React from 'react';

interface IsletLoupeInsetProps {
  isVisible: boolean;
  isHindi?: boolean;
}

/**
 * High-Magnification Histological Inset Loupe for Beta Cells & Islets of Langerhans.
 * Displays high-power microscopy (1000×) with Beta cells (pink-magenta/insulin),
 * Alpha cells (orange/glucagon), Delta cells (emerald/somatostatin),
 * micro-capillaries, and active insulin release pulsation.
 */
export const IsletLoupeInset: React.FC<IsletLoupeInsetProps> = ({ isVisible, isHindi = false }) => {
  if (!isVisible) return null;

  // Loupe Center & Radius
  const cx = 398;
  const cy = 372;
  const r = 70;

  // Origin point in the pancreas tail where islets cluster
  const originX = 388;
  const originY = 216;

  return (
    <g id="islet-loupe-inset" className="transition-opacity duration-300" opacity={isVisible ? 1 : 0}>
      {/* ----------------------------------------------------------------- */}
      {/* 1. OPTICAL PROJECTION CONE (From Pancreatic Tail to Loupe Lens)  */}
      {/* ----------------------------------------------------------------- */}
      <polygon
        points={`${originX},${originY} ${cx - r + 12},${cy - r + 14} ${cx + r - 12},${cy - r + 14}`}
        fill="url(#lens-cone-grad)"
        opacity="0.25"
        pointerEvents="none"
      />
      <line
        x1={originX}
        y1={originY}
        x2={cx - r + 16}
        y2={cy - r + 18}
        stroke="#65D9D0"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        opacity="0.75"
        pointerEvents="none"
      />
      <line
        x1={originX}
        y1={originY}
        x2={cx + r - 16}
        y2={cy - r + 18}
        stroke="#65D9D0"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        opacity="0.75"
        pointerEvents="none"
      />
      {/* Focal target pip at the tail */}
      <circle cx={originX} cy={originY} r="4.5" fill="none" stroke="#65D9D0" strokeWidth="1.5" />
      <circle cx={originX} cy={originY} r="2" fill="#f59e0b" />

      {/* ----------------------------------------------------------------- */}
      {/* 2. LOUPE LENS HOUSING & DROP SHADOW                              */}
      {/* ----------------------------------------------------------------- */}
      {/* Outer shadow */}
      <circle cx={cx} cy={cy} r={r + 3} fill="none" filter="url(#lens-shadow)" opacity="0.6" />

      {/* Chrome Bezel Rim */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 2}
        fill="none"
        stroke="url(#lens-bezel-grad)"
        strokeWidth="4.5"
      />

      {/* Inner Dark Microscopic Field Background */}
      <clipPath id="loupe-lens-clip">
        <circle cx={cx} cy={cy} r={r} />
      </clipPath>

      <g clipPath="url(#loupe-lens-clip)">
        {/* Dark microscope illuminator field */}
        <rect
          x={cx - r}
          y={cy - r}
          width={r * 2}
          height={r * 2}
          fill="#0c1824"
        />

        {/* Ambient Dark Cyan Microscopy Base Glow */}
        <radialGradient id="microscope-lamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e3a47" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#0e2430" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#061219" stopOpacity="1" />
        </radialGradient>
        <circle cx={cx} cy={cy} r={r} fill="url(#microscope-lamp)" />

        {/* Reticle grid marks (Subtle scientific calibrated crosshairs) */}
        <g opacity="0.18" stroke="#65D9D0" strokeWidth="0.6">
          <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} strokeDasharray="3 4" />
          <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} strokeDasharray="3 4" />
          <circle cx={cx} cy={cy} r={r * 0.45} fill="none" strokeDasharray="2 3" />
        </g>

        {/* Exocrine Acinar Tissue around Islet border (Tan-pink parenchyma background) */}
        <g opacity="0.45">
          <circle cx={cx - 52} cy={cy - 40} r="16" fill="#e09880" />
          <circle cx={cx - 58} cy={cy - 10} r="18" fill="#cc7e67" />
          <circle cx={cx - 48} cy={cy + 36} r="17" fill="#ebb099" />
          <circle cx={cx + 52} cy={cy - 35} r="16" fill="#e09880" />
          <circle cx={cx + 56} cy={cy + 15} r="18" fill="#cc7e67" />
          <circle cx={cx + 42} cy={cy + 46} r="17" fill="#ebb099" />
          <circle cx={cx} cy={cy - 56} r="16" fill="#db8e76" />
          <circle cx={cx} cy={cy + 58} r="16" fill="#db8e76" />
        </g>

        {/* Fenestrated Micro-Capillaries (Delivering oxygen & carrying insulin) */}
        <g fill="none" strokeLinecap="round">
          {/* Main Capillary Channel */}
          <path
            d={`M ${cx - 45} ${cy - 20} Q ${cx - 15} ${cy - 8} ${cx} ${cy + 5} T ${cx + 40} ${cy - 12}`}
            stroke="#ef4444"
            strokeWidth="2.8"
            opacity="0.75"
          />
          {/* Tributary Capillary Loop */}
          <path
            d={`M ${cx - 20} ${cy + 38} Q ${cx - 5} ${cy + 18} ${cx + 12} ${cy + 12} T ${cx + 38} ${cy + 28}`}
            stroke="#dc2626"
            strokeWidth="2.2"
            opacity="0.65"
          />
          {/* Micro-erythrocyte blood cells inside capillary */}
          <circle cx={cx - 30} cy={cy - 16} r="1.5" fill="#fca5a5" />
          <circle cx={cx - 10} cy={cy - 3} r="1.5" fill="#fca5a5" />
          <circle cx={cx + 18} cy={cy + 2} r="1.5" fill="#fca5a5" />
          <circle cx={cx + 32} cy={cy - 8} r="1.5" fill="#fca5a5" />
        </g>

        {/* Dynamic Insulin Secretion Pulse Wave radiating from Beta Core */}
        <g pointerEvents="none">
          <circle
            cx={cx - 2}
            cy={cy - 2}
            r="28"
            fill="none"
            stroke="#65D9D0"
            strokeWidth="1.2"
            className="ap-islet-pulse-ring"
            opacity="0.8"
          />
          <circle
            cx={cx - 2}
            cy={cy - 2}
            r="42"
            fill="none"
            stroke="#d946ef"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            opacity="0.55"
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* 3. HISTOLOGICAL ENDOCRINE CELLS                              */}
        {/* ------------------------------------------------------------- */}
        {/* ALPHA CELLS (Glucagon-producing, Mantle/Periphery - Amber/Orange) */}
        <g id="alpha-cells">
          {[
            { x: cx - 35, y: cy - 28, r: 6.2 },
            { x: cx - 22, y: cy - 38, r: 5.8 },
            { x: cx + 24, y: cy - 34, r: 6.0 },
            { x: cx + 36, y: cy - 22, r: 6.2 },
            { x: cx + 38, y: cy + 12, r: 6.0 },
            { x: cx - 36, y: cy + 22, r: 5.8 },
            { x: cx - 24, y: cy + 34, r: 6.0 },
            { x: cx + 22, y: cy + 36, r: 5.8 },
          ].map((cell, idx) => (
            <g key={`alpha-${idx}`}>
              <circle
                cx={cell.x}
                cy={cell.y}
                r={cell.r}
                fill="url(#alpha-cell-grad)"
                stroke="#ea580c"
                strokeWidth="0.8"
              />
              {/* Alpha cell nucleus */}
              <circle cx={cell.x - 1} cy={cell.y - 1} r={cell.r * 0.4} fill="#7c2d12" opacity="0.9" />
              <circle cx={cell.x - 1.8} cy={cell.y - 1.8} r="0.9" fill="#fed7aa" />
            </g>
          ))}
        </g>

        {/* DELTA CELLS (Somatostatin-producing - Emerald Green) */}
        <g id="delta-cells">
          {[
            { x: cx - 32, y: cy - 2, r: 5.2 },
            { x: cx + 28, y: cy + 22, r: 5.4 },
            { x: cx + 5, y: cy - 36, r: 5.0 },
          ].map((cell, idx) => (
            <g key={`delta-${idx}`}>
              <circle
                cx={cell.x}
                cy={cell.y}
                r={cell.r}
                fill="url(#delta-cell-grad)"
                stroke="#059669"
                strokeWidth="0.8"
              />
              <circle cx={cell.x - 0.8} cy={cell.y - 0.8} r={cell.r * 0.4} fill="#064e3b" opacity="0.9" />
            </g>
          ))}
        </g>

        {/* BETA CELLS (Insulin-producing - 70% Core Mass - Pink/Magenta) */}
        <g id="beta-cells">
          {[
            { x: cx - 18, y: cy - 16, r: 7.2 },
            { x: cx, y: cy - 20, r: 7.0 },
            { x: cx + 16, y: cy - 14, r: 7.4 },
            { x: cx - 22, y: cy + 4, r: 7.2 },
            { x: cx - 6, y: cy - 2, r: 8.0 },
            { x: cx + 12, y: cy + 2, r: 7.8 },
            { x: cx + 24, y: cy - 2, r: 6.8 },
            { x: cx - 12, y: cy + 18, r: 7.4 },
            { x: cx + 6, y: cy + 18, r: 7.6 },
            { x: cx + 20, y: cy + 16, r: 6.8 },
            { x: cx - 4, y: cy + 30, r: 6.6 },
          ].map((cell, idx) => (
            <g key={`beta-${idx}`}>
              <circle
                cx={cell.x}
                cy={cell.y}
                r={cell.r}
                fill="url(#beta-cell-grad)"
                stroke="#c026d3"
                strokeWidth="0.9"
              />
              {/* Beta Cell Prominent Nucleus */}
              <circle cx={cell.x - 1} cy={cell.y - 1} r={cell.r * 0.42} fill="#701a75" opacity="0.95" />
              {/* Nucleolus / Chromatin glare */}
              <circle cx={cell.x - 2} cy={cell.y - 2} r="1.1" fill="#fdf4ff" />

              {/* Insulin secretory granules (Luminescent cyan micro-vesicles) */}
              <circle cx={cell.x + cell.r * 0.45} cy={cell.y - cell.r * 0.3} r="1.0" fill="#65D9D0" />
              <circle cx={cell.x + cell.r * 0.3} cy={cell.y + cell.r * 0.45} r="0.9" fill="#a7f3d0" />
              <circle cx={cell.x - cell.r * 0.4} cy={cell.y + cell.r * 0.4} r="1.0" fill="#65D9D0" />
            </g>
          ))}
        </g>

        {/* ------------------------------------------------------------- */}
        {/* 4. CURVED GLASS GLARE & SPECULAR LENS REFLECTION              */}
        {/* ------------------------------------------------------------- */}
        <path
          d={`M ${cx - r + 10} ${cy - 15} A ${r} ${r} 0 0 1 ${cx + 15} ${cy - r + 10} A ${r - 18} ${r - 18} 0 0 0 ${cx - r + 10} ${cy - 15} Z`}
          fill="url(#lens-glass-glare)"
          pointerEvents="none"
        />

        {/* Bottom edge reflection arc */}
        <path
          d={`M ${cx - 20} ${cy + r - 8} A ${r} ${r} 0 0 0 ${cx + r - 12} ${cy + 10} A ${r - 15} ${r - 15} 0 0 1 ${cx - 20} ${cy + r - 8} Z`}
          fill="#ffffff"
          opacity="0.12"
          pointerEvents="none"
        />
      </g>

      {/* ----------------------------------------------------------------- */}
      {/* 5. HISTOLOGICAL LABELS & CALIBRATION SCALE                        */}
      {/* ----------------------------------------------------------------- */}
      {/* Top magnification badge */}
      <g transform={`translate(${cx}, ${cy - r + 14})`}>
        <rect
          x="-50"
          y="-8"
          width="100"
          height="16"
          rx="8"
          fill="rgba(16, 63, 74, 0.92)"
          stroke="#65D9D0"
          strokeWidth="1"
        />
        <text
          x="0"
          y="3.5"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill="#65D9D0"
          letterSpacing="0.08em"
        >
          {isHindi ? 'सूक्ष्मदर्शी दृश्य (1000×)' : 'HISTOLOGY LOUPE (1000×)'}
        </text>
      </g>

      {/* Bottom Cellular Legend Badge */}
      <g transform={`translate(${cx}, ${cy + r - 13})`}>
        <rect
          x="-62"
          y="-8"
          width="124"
          height="16"
          rx="8"
          fill="rgba(6, 24, 31, 0.94)"
          stroke="rgba(101, 217, 208, 0.4)"
          strokeWidth="0.8"
        />
        {/* Beta legend */}
        <circle cx="-48" cy="0" r="2.8" fill="#d946ef" />
        <text
          x="-42"
          y="2.8"
          fontSize="6.5"
          fontWeight="700"
          fill="#fdf4ff"
          fontFamily="sans-serif"
        >
          {isHindi ? 'बीटा (इंसुलिन)' : 'Beta (Insulin)'}
        </text>

        {/* Alpha legend */}
        <circle cx="8" cy="0" r="2.8" fill="#f97316" />
        <text
          x="14"
          y="2.8"
          fontSize="6.5"
          fontWeight="700"
          fill="#fed7aa"
          fontFamily="sans-serif"
        >
          {isHindi ? 'अल्फा' : 'Alpha'}
        </text>
      </g>
    </g>
  );
};
