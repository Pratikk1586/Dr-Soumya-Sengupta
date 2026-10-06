import React, { useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'Continuous Glucose Monitoring (CGM / AGP)', href: '/diabetes-care/education' },
    { title: 'Type 2 Diabetes Remission Assessment', href: '/diabetes-care/prediabetes' },
    { title: 'Understanding Your HbA1c Lab Report', href: '/patient-resources/reports' },
    { title: 'Diabetic Foot Neuropathy Screening', href: '/diabetes-care/complications' },
    { title: 'Chamber Timings & OPD Schedule', href: '/clinic/timings' },
  ];

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            placeholder={t('cta.search')}
            className="flex-1 px-3 py-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none font-sans"
            aria-label="Search clinical topics"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto space-y-4">
          <div>
            <h4 id="search-modal-title" className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Frequently Consulted Clinical Topics
            </h4>
            <div className="space-y-1">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:bg-[#dff0f4]/40 hover:text-[#0f3d4a] transition-colors group"
                >
                  <span>{link.title}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0f3d4a] transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press ESC to dismiss</span>
          <span>Phase 1 Search Preview</span>
        </div>
      </div>
    </div>
  );
};
