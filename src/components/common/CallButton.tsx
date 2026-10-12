import React from 'react';
import { Phone } from 'lucide-react';
import { getTelHref } from '../../lib/contact';
import { useLanguage } from '../../context/useLanguage';

interface CallButtonProps {
  phone?: string;
  className?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  hideIfUnavailable?: boolean;
  variant?: 'primary' | 'outline';
}

export const CallButton: React.FC<CallButtonProps> = ({
  phone,
  className = '',
  children,
  size = 'md',
  hideIfUnavailable = false,
  variant = 'primary',
}) => {
  const { isHindi } = useLanguage();
  const href = getTelHref(phone);

  if (!href) {
    if (hideIfUnavailable) return null;
    return (
      <button
        type="button"
        disabled
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium bg-slate-100 text-slate-400 cursor-not-allowed ${
          size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
        } ${className}`}
        title={isHindi ? 'फोन नंबर उपलब्ध नहीं है' : 'Phone number not available'}
      >
        <Phone className="w-4 h-4" />
        <span>{children || (isHindi ? 'कॉल (अनुपलब्ध)' : 'Call Unavailable')}</span>
      </button>
    );
  }

  const baseClasses = variant === 'outline'
    ? 'border border-[#103F4A]/40 text-[#103F4A] hover:bg-[#103F4A] hover:text-white bg-white'
    : 'bg-sky-700 hover:bg-sky-800 text-white shadow-xs hover:shadow-md';

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-98 ${baseClasses} ${
        size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2.5 text-sm'
      } ${className}`}
    >
      <Phone className="w-4 h-4 shrink-0" />
      <span>{children || (isHindi ? 'क्लिनिक को कॉल करें' : 'Call Clinic')}</span>
    </a>
  );
};
