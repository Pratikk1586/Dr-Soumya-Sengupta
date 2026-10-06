import React from 'react';
import { Mail } from 'lucide-react';
import { getMailtoHref } from '../../lib/contact';
import { useLanguage } from '../../context/useLanguage';

interface EmailButtonProps {
  email?: string;
  subject?: string;
  body?: string;
  className?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  hideIfUnavailable?: boolean;
}

export const EmailButton: React.FC<EmailButtonProps> = ({
  email,
  subject,
  body,
  className = '',
  children,
  size = 'md',
  hideIfUnavailable = false,
}) => {
  const { isHindi } = useLanguage();
  const href = getMailtoHref(email, subject, body);

  if (!href) {
    if (hideIfUnavailable) return null;
    return (
      <button
        type="button"
        disabled
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium bg-slate-100 text-slate-400 cursor-not-allowed ${
          size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
        } ${className}`}
        title={isHindi ? 'ईमेल पता उपलब्ध नहीं है' : 'Email not available'}
      >
        <Mail className="w-4 h-4" />
        <span>{children || (isHindi ? 'ईमेल (अनुपलब्ध)' : 'Email Unavailable')}</span>
      </button>
    );
  }

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold bg-slate-800 hover:bg-slate-900 text-white shadow-xs hover:shadow-md transition-all active:scale-98 ${
        size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2.5 text-sm'
      } ${className}`}
    >
      <Mail className="w-4 h-4 shrink-0" />
      <span>{children || (isHindi ? 'ईमेल भेजें' : 'Send Email')}</span>
    </a>
  );
};
