import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { UNIVERSAL_DISCLAIMER_TEXT } from '../../data/education';

export const MedicalDisclaimerBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t } = useLanguage();

  return (
    <aside
      className={`border-l-4 border-teal-700 bg-teal-50/80 px-4 py-3 rounded-r-md text-xs leading-relaxed text-slate-800 ${className}`}
      aria-label="Medical consultation disclaimer"
      role="note"
    >
      <div className="flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <strong className="font-semibold text-teal-950 block mb-0.5">
            {t({
              en: 'Important Clinical Disclaimer',
              hi: 'महत्वपूर्ण चिकित्सीय सूचना',
            })}
          </strong>
          <p className="text-slate-700">{t(UNIVERSAL_DISCLAIMER_TEXT)}</p>
        </div>
      </div>
    </aside>
  );
};
