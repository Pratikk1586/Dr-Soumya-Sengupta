import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Bell,
  Calendar,
  Clock,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { noticeService } from '../../services';
import { formatDateInIST, isRecentInIST } from '../../utils/date';
import { getSafeWhatsAppHref } from '../../config/env';
import { cn } from '../../utils/cn';

interface ClinicNoticesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNoticeId?: string | null;
  initialFilter?: 'latest' | 'all';
}

export const ClinicNoticesModal: React.FC<ClinicNoticesModalProps> = ({
  isOpen,
  onClose,
  selectedNoticeId,
  initialFilter = 'latest',
}) => {
  const { localize, isHindi } = useLanguage();
  const { data: allNotices, isLoading } = useService(() => noticeService.getNotices(), []);
  const [filterType, setFilterType] = useState<'latest' | 'all'>(initialFilter);
  const [activeNoticeId, setActiveNoticeId] = useState<string | null>(selectedNoticeId || null);

  const notices = useMemo(() => allNotices ?? [], [allNotices]);

  useEffect(() => {
    if (initialFilter) {
      setFilterType(initialFilter);
    }
  }, [initialFilter]);

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

  useEffect(() => {
    if (selectedNoticeId) {
      setActiveNoticeId(selectedNoticeId);
    } else if (filteredNotices.length > 0) {
      if (!activeNoticeId || !filteredNotices.some((n) => n.id === activeNoticeId)) {
        setActiveNoticeId(filteredNotices[0].id);
      }
    }
  }, [selectedNoticeId, filteredNotices, activeNoticeId]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
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
  }, [isOpen, onClose]);

  const activeNotice = useMemo(() => {
    if (!activeNoticeId) return filteredNotices[0] || null;
    return notices.find((n) => n.id === activeNoticeId) || filteredNotices[0] || null;
  }, [notices, filteredNotices, activeNoticeId]);

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
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-slate-200/90 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f3d4a] text-white flex items-center justify-center shadow-xs">
              <Bell className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h2 id="notices-modal-title" className="text-lg sm:text-xl font-extrabold text-slate-950">
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
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two Options Bar: Latest news & All news (No category tags) */}
        <div className="px-5 sm:px-8 py-3 bg-slate-50/90 border-b border-slate-200 flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setFilterType('latest');
                const recent = notices.filter((n) => isRecentInIST(n.publishedAt || n.effectiveDate, 3));
                if (recent.length > 0) setActiveNoticeId(recent[0].id);
              }}
              className={cn(
                'px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                filterType === 'latest'
                  ? 'bg-[#0f3d4a] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {isHindi ? 'ताज़ा समाचार (पिछले 3 दिन)' : 'Latest news'}
            </button>

            <button
              type="button"
              onClick={() => {
                setFilterType('all');
                if (notices.length > 0) setActiveNoticeId(notices[0].id);
              }}
              className={cn(
                'px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                filterType === 'all'
                  ? 'bg-[#0f3d4a] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {isHindi ? 'सभी समाचार' : 'All news'}
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium ml-2">
            ({filteredNotices.length} {isHindi ? 'सूचनाएं' : 'notices'})
          </span>
        </div>

        {/* Modal Body: Master-Detail Layout (No Category Tags) */}
        <div className="flex-1 overflow-y-auto grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Left Column: List of Notices */}
          <div className="md:col-span-5 p-3 sm:p-4 space-y-2 max-h-[500px] overflow-y-auto">
            {isLoading ? (
              <p className="text-xs text-slate-400 p-4 text-center">Loading notices...</p>
            ) : filteredNotices.length === 0 ? (
              <p className="text-xs text-slate-500 p-4 text-center">
                {isHindi ? 'पिछले 3 दिनों में कोई नई सूचना नहीं है।' : 'No notices updated within the last 3 days.'}
              </p>
            ) : (
              filteredNotices.map((n) => {
                const isActive = activeNotice?.id === n.id;

                return (
                  <div
                    key={n.id}
                    onClick={() => setActiveNoticeId(n.id)}
                    className={cn(
                      'p-3.5 rounded-xl border transition-all cursor-pointer text-left',
                      isActive
                        ? 'bg-teal-50/80 border-[#0f3d4a] shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80'
                    )}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{formatDateInIST(n.effectiveDate)}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {localize(n.title)}
                    </h4>

                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {localize(n.content)}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Full Details of Active Notice (No Category Tags) */}
          <div className="md:col-span-7 p-5 sm:p-7 flex flex-col justify-between bg-white max-h-[500px] overflow-y-auto">
            {activeNotice ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-teal-700" />
                    <span>{formatDateInIST(activeNotice.effectiveDate)}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 leading-tight">
                    {localize(activeNotice.title)}
                  </h3>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
                  <p>{localize(activeNotice.content)}</p>
                </div>

                <div className="space-y-2 text-xs text-slate-500">
                  <p className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Cardio Diabetic Clinic, Amlatola, Chaibasa Chamber Notice Desk</span>
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">Select a notice to view complete details.</p>
            )}

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">
                Official announcement published by Cardio Diabetic Clinic
              </span>
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Inquiry Desk</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
