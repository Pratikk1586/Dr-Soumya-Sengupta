import React from 'react';

interface DuotoneIconProps {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withAccentDot?: boolean;
}

export const DuotoneIcon: React.FC<DuotoneIconProps> = ({
  icon: IconComponent,
  size = 'md',
  className = '',
  withAccentDot = true,
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 rounded-lg text-xs',
    md: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-sm',
    lg: 'w-12 h-12 rounded-2xl text-base',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4 sm:w-5 sm:h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 bg-[#E8F5F4] border border-[#D7E5E6] text-[#0E5A6B] shadow-[0_2px_6px_rgba(14,90,107,0.08)] group-hover:bg-[#0E5A6B] group-hover:text-white group-hover:border-[#0E5A6B] transition-all duration-200 ${sizeClasses[size]} ${className}`}
    >
      <IconComponent className={`${iconSizes[size]} transition-colors duration-200`} aria-hidden="true" />
      {withAccentDot && (
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#F2A33A] ring-2 ring-white group-hover:ring-[#0E5A6B] transition-colors"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
