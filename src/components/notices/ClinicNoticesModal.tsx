import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Bell,
  Calendar,
  Clock,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { noticeService } from '../../services';
import type { Notice } from '../../types';
import { formatDateInIST, isRecentInIST } from '../../utils/date';
import { getSafeWhatsAppHref } from '../../config/env';
import { cn } from '../../utils/cn';

interface ClinicNoticesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilter?: 'latest' | 'all';
}

export const ClinicNoticesModal: React.FC<ClinicNoticesModalProps> = ({
  isOpen,
  onClose,
  initialFilter = 'latest',
}) => {
  const { localize, isHindi } = useLanguage();
  const { data: allNotices, isLoading } = useService(() => noticeService.getNotices(), []);
  const [filterType, setFilterType] = useState<'latest' | 'all'>(initialFilter);
  // Dedicated state for displaying the whole info in popup style
  const [popupNotice, setPopupNotice] = useState<Notice | null>(null);

  const notices = useMemo(() => allNotices ?? [], [allNotices]);

  const [prevFilter, setPrevFilter] = useState(initialFilter);
  if (initialFilter !== prevFilter) {
    setPrevFilter(initialFilter);
    setFilterType(initialFilter);
  }

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setPopupNotice(null);
    }
  }

  // Two options filtering:
  // 1. "Latest news": updated within 3 days
  // 2. "All news": all notices
  const filteredNotices = useMemo(() => {
    if (filterType === 'latest') {
      const recent = notices.filter((n) => isRecentInIST(n.publishedAt || n.effectiveDate, 3));
      return recent.length > 0 ? recent : notices.slice(0, 2);
    }
    return notices;
  }, [filterType, notices]);

  // Handle ESC key: close popup detail first if open, else close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (popupNotice) {
          setPopupNotice(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, popupNotice, onClose]);

  const whatsappHref = getSafeWhatsAppHref(
    'Hello Cardio Diabetic Clinic desk, I would like to inquire about the latest clinic notice.'
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notices-modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[88vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#103F4A] text-white flex items-center justify-center shadow-xs shrink-0">
              <Bell className="w-5 h-5 text-[#65D9D0]" />
            </div>
            <div>
              <h2 id="notices-modal-title" className="text-lg sm:text-xl font-extrabold text-[#103F4A]">
                {isHindi ? 'क्लिनिक सूचनाएं एवं समाचार' : 'Clinic Notices & News'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isHindi
                  ? 'क्लिनिक से संबंधित आधिकारिक सूचनाएं'
                  : 'Official announcements and updates from Cardio Diabetic Clinic'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two Options Bar: Latest news & All news (No category tags) */}
        <div className="px-5 sm:px-7 py-3 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl">
            <button
              type="button"
              onClick={() => setFilterType('latest')}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                filterType === 'latest'
                  ? 'bg-[#103F4A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#103F4A] hover:bg-[#EAF7FA]/50'
              )}
            >
              {isHindi ? 'ताज़ा समाचार (3 दिन)' : 'Latest news'}
            </button>

            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                filterType === 'all'
                  ? 'bg-[#103F4A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#103F4A] hover:bg-[#EAF7FA]/50'
              )}
            >
              {isHindi ? 'सभी समाचार' : 'All news'}
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            {filteredNotices.length} {isHindi ? 'सूचनाएं' : 'notices'}
          </span>
        </div>

        {/* Modal Body: Displays Title and little description of each notice */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 bg-slate-50/50">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-slate-400">
              {isHindi ? 'सूचनाएं लोड हो रही हैं...' : 'Loading notices...'}
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200 p-6">
              {isHindi
                ? 'पिछले 3 दिनों में कोई नई सूचना नहीं है।'
                : 'No notices updated within the last 3 days.'}
            </div>
          ) : (
            filteredNotices.map((n) => {
              const isRecent = isRecentInIST(n.publishedAt || n.effectiveDate, 3);

              return (
                <div
                  key={n.id}
                  onClick={() => setPopupNotice(n)}
                  className="group p-4 sm:p-5 rounded-2xl bg-white hover:bg-white border border-slate-200/90 hover:border-[#65D9D0]/60 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer text-left relative overflow-hidden"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setPopupNotice(n);
                    }
                  }}
                  aria-label={`Open details for notice: ${localize(n.title)}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#103F4A] shrink-0" />
                      <span>{formatDateInIST(n.effectiveDate)}</span>
                    </div>

                    {isRecent && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/50">
                        <Sparkles className="w-2.5 h-2.5 text-[#103F4A]" />
                        <span>{isHindi ? 'नया' : 'Recent'}</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#103F4A] transition-colors leading-snug">
                    {localize(n.title)}
                  </h3>

                  {/* Little description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {localize(n.content)}
                  </p>

                  {/* Click affordance */}
                  <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#103F4A] group-hover:text-[#103F4A]">
                    <span className="inline-flex items-center gap-1">
                      <span>{isHindi ? 'पूरी सूचना देखें' : 'View full notice'}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal group-hover:text-slate-600">
                      {isHindi ? 'पॉपअप में देखने के लिए क्लिक करें' : 'Click for details'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-7 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>{isHindi ? 'कार्डियो डायबिटिक क्लिनिक' : 'Cardio Diabetic Clinic, Chaibasa'}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            {isHindi ? 'बंद करें' : 'Close'}
          </button>
        </div>

        {/* ============================================================== */}
        {/* POPUP STYLE: Displays the WHOLE INFO when user clicks on notice */}
        {/* ============================================================== */}
        {popupNotice && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setPopupNotice(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-notice-title"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg max-h-[85vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            >
              {/* Popup Header */}
              <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-[#103F4A] to-[#0A262D] text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#65D9D0]">
                  <Calendar className="w-4 h-4 text-[#65D9D0]" />
                  <span>{formatDateInIST(popupNotice.effectiveDate)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setPopupNotice(null)}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Popup Body: Whole Info */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-4 text-left">
                {/* Full Title */}
                <h3
                  id="popup-notice-title"
                  className="text-lg sm:text-xl font-extrabold text-slate-950 leading-snug"
                >
                  {localize(popupNotice.title)}
                </h3>

                {/* Whole info content */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2 whitespace-pre-line font-medium">
                  <p>{localize(popupNotice.content)}</p>
                </div>

                {/* Verified Chamber Notice Desk Tag */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cardio Diabetic Clinic, Amlatola, Chaibasa Chamber Notice Desk</span>
                </div>
              </div>

              {/* Popup Footer */}
              <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setPopupNotice(null)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  {isHindi ? '← वापस सूची पर जाएं' : '← Back to Notices'}
                </button>

                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300/60 transition-colors shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{isHindi ? 'व्हाट्सएप पूछताछ' : 'WhatsApp Inquiry Desk'}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
