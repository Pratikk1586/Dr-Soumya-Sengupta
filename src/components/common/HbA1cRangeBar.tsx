import React from 'react';
import { useLanguage } from '../../context/useLanguage';

interface HbA1cRangeBarProps {
  className?: string;
}

export const HbA1cRangeBar: React.FC<HbA1cRangeBarProps> = ({ className = '' }) => {
  const { isHindi } = useLanguage();

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-xl bg-white border border-[#D7E5E6] shadow-xs space-y-2.5 ${className}`}
      aria-label="HbA1c Clinical Range Visualizer"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-[#1B2B34] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#0E5A6B]" />
          <span>{isHindi ? 'HbA1c मानक संदर्भ श्रेणियां' : 'HbA1c Target Range Reference'}</span>
        </span>
        <span className="text-[10px] font-semibold text-[#0E5A6B] bg-[#E8F5F4] px-2 py-0.5 rounded-full border border-[#D7E5E6]">
          {isHindi ? 'सामान्य शिक्षा' : 'General Education'}
        </span>
      </div>

      {/* Responsive SVG Graphic */}
      <div className="w-full">
        <svg
          viewBox="0 0 540 54"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Segment 1: Normal (< 5.7%) */}
          <rect
            x="0"
            y="6"
            width="170"
            height="18"
            rx="4"
            fill="#0E5A6B"
            fillOpacity="0.85"
          />
          <text x="85" y="19" fill="#FFFFFF" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="0.02em">
            {isHindi ? 'सामान्य (< 5.7%)' : 'NORMAL (< 5.7%)'}
          </text>

          {/* Segment 2: Pre-diabetes (5.7 - 6.4%) */}
          <rect
            x="175"
            y="6"
            width="170"
            height="18"
            rx="4"
            fill="#F2A33A"
            fillOpacity="0.9"
          />
          <text x="260" y="19" fill="#1B2B34" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="0.02em">
            {isHindi ? 'प्रीडायबिटीज (5.7–6.4%)' : 'PRE-DIABETES (5.7–6.4%)'}
          </text>

          {/* Segment 3: Diabetes (>= 6.5%) */}
          <rect
            x="350"
            y="6"
            width="190"
            height="18"
            rx="4"
            fill="#C0392B"
            fillOpacity="0.85"
          />
          <text x="445" y="19" fill="#FFFFFF" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="0.02em">
            {isHindi ? 'डायबिटीज (≥ 6.5%)' : 'DIABETES (≥ 6.5%)'}
          </text>

          {/* Scale Axis Lines & Pointer Markings */}
          <line x1="0" y1="32" x2="540" y2="32" stroke="#D7E5E6" strokeWidth="1" />
          <line x1="172.5" y1="28" x2="172.5" y2="36" stroke="#4F6470" strokeWidth="1.5" />
          <line x1="347.5" y1="28" x2="347.5" y2="36" stroke="#4F6470" strokeWidth="1.5" />

          {/* Bottom labels */}
          <text x="0" y="47" fill="#4F6470" fontSize="9" fontWeight="600" textAnchor="start">
            4.0%
          </text>
          <text x="172.5" y="47" fill="#1B2B34" fontSize="9.5" fontWeight="700" textAnchor="middle">
            5.7%
          </text>
          <text x="347.5" y="47" fill="#1B2B34" fontSize="9.5" fontWeight="700" textAnchor="middle">
            6.5%
          </text>
          <text x="540" y="47" fill="#4F6470" fontSize="9" fontWeight="600" textAnchor="end">
            10.0%+
          </text>
        </svg>
      </div>

      <p className="text-[10px] text-[#4F6470] leading-tight">
        {isHindi
          ? 'सूचना: यह चार्ट केवल बुनियादी जानकारी के लिए है। व्यक्तिगत लक्ष्य आयु व स्वास्थ्य स्थिति अनुसार भिन्न हो सकते हैं।'
          : 'Note: Standards based on ADA/ICMR clinical guidelines. Target goals are individualized by the treating physician.'}
      </p>
    </div>
  );
};
