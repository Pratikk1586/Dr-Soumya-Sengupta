import React from 'react';

interface SectionDividerProps {
  variant?: 'ecg' | 'wave';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'ecg',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden flex items-center justify-center py-2 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {variant === 'ecg' ? (
        <svg
          className="w-full max-w-4xl h-8 px-4 text-[#D7E5E6] transition-opacity duration-300"
          viewBox="0 0 1000 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D7E5E6" stopOpacity="0" />
              <stop offset="25%" stopColor="#D7E5E6" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#0E5A6B" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#0E5A6B" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#0E5A6B" stopOpacity="0.4" />
              <stop offset="75%" stopColor="#D7E5E6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D7E5E6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Baseline track */}
          <line x1="0" y1="16" x2="1000" y2="16" stroke="#D7E5E6" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />

          {/* Continuous ECG trace with medical P-Q-R-S-T pulse at the center */}
          <path
            d="M 0 16 L 380 16 Q 395 16 405 13 Q 415 10 425 16 L 460 16 L 470 17 L 480 3 L 490 28 L 500 16 L 515 16 Q 530 11 545 16 L 620 16 L 1000 16"
            stroke="url(#ecgGrad)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Subtle amber accent node at the R-peak for clinical elegance */}
          <circle cx="480" cy="3" r="2" fill="#F2A33A" opacity="0.85" />
        </svg>
      ) : (
        <svg
          className="w-full max-w-4xl h-6 px-4 text-[#D7E5E6]"
          viewBox="0 0 1000 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 12 C 150 4, 250 20, 400 12 C 550 4, 650 20, 800 12 C 900 6, 950 18, 1000 12"
            stroke="#D7E5E6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
};
