import React from 'react';
import { MessageSquare } from 'lucide-react';
import {
  buildWhatsAppUrl,
  type WhatsAppMessageType,
  type AppointmentWhatsAppDetails,
} from '../../lib/whatsapp';
import { useLanguage } from '../../context/useLanguage';

interface WhatsAppButtonProps {
  variant?: WhatsAppMessageType;
  details?: AppointmentWhatsAppDetails;
  customNumber?: string;
  className?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  hideIfUnavailable?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  variant = 'enquiry',
  details,
  customNumber,
  className = '',
  children,
  size = 'md',
  hideIfUnavailable = false,
}) => {
  const { isHindi } = useLanguage();
  const url = buildWhatsAppUrl(variant, details, customNumber);

  if (!url) {
    if (hideIfUnavailable) return null;
    return (
      <button
        type="button"
        disabled
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium bg-slate-100 text-slate-400 cursor-not-allowed ${
          size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
        } ${className}`}
        title={isHindi ? 'व्हाट्सएप नंबर उपलब्ध नहीं है' : 'WhatsApp number not configured'}
      >
        <MessageSquare className="w-4 h-4" />
        <span>{children || (isHindi ? 'व्हाट्सएप (अनुपलब्ध)' : 'WhatsApp Unavailable')}</span>
      </button>
    );
  }

  const defaultText =
    variant === 'appointment'
      ? isHindi
        ? 'व्हाट्सएप पर अपॉइंटमेंट भेजें'
        : 'Request via WhatsApp'
      : variant === 'location'
      ? isHindi
        ? 'व्हाट्सएप पर दिशा-निर्देश पाएं'
        : 'Get Directions on WhatsApp'
      : isHindi
      ? 'व्हाट्सएप पर संपर्क करें'
      : 'Connect on WhatsApp';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-md transition-all active:scale-98 ${
        size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2.5 text-sm'
      } ${className}`}
    >
      <MessageSquare className="w-4 h-4 shrink-0" />
      <span>{children || defaultText}</span>
    </a>
  );
};
