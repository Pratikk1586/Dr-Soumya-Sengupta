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
}

export const CallButton: React.FC<CallButtonProps> = ({
  phone,
  className = '',
  children,
  size = 'md',
  hideIfUnavailable = false,
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

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold bg-sky-700 hover:bg-sky-800 text-white shadow-xs hover:shadow-md transition-all active:scale-98 ${
        size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2.5 text-sm'
      } ${className}`}
    >
      <Phone className="w-4 h-4 shrink-0" />
      <span>{children || (isHindi ? 'क्लिनिक को कॉल करें' : 'Call Clinic')}</span>
    </a>
  );
};
