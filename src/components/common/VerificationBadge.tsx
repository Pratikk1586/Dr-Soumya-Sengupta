import React from 'react';
import { AlertCircle } from 'lucide-react';
import { CONTENT_TO_BE_VERIFIED_MARKER, SHOW_VERIFY_BADGES } from '../../config/constants';

interface VerificationBadgeProps {
  note?: string;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  note = 'Pending confirmation with clinical records',
  className = '',
}) => {
  if (!SHOW_VERIFY_BADGES) {
    return null;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs select-none ${className}`}
      title={note}
      role="status"
      aria-label="Content placeholder pending clinical verification"
    >
      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" aria-hidden="true" />
      <span className="font-semibold tracking-wide uppercase text-[10px]">
        {CONTENT_TO_BE_VERIFIED_MARKER}
      </span>
    </span>
  );
};
