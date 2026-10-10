import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { noticeService } from '../../services';
import { formatDateInIST, isRecentInIST } from '../../utils/date';
import { ClinicNoticesModal } from '../notices/ClinicNoticesModal';
import { cn } from '../../utils/cn';

interface HeroNewsTickerProps {
  className?: string;
}

export const HeroNewsTicker: React.FC<HeroNewsTickerProps> = ({ className = '' }) => {
  const { localize, isHindi } = useLanguage();
  const { data: allNotices, isLoading } = useService(() => noticeService.getNotices(), []);
  const [filterType, setFilterType] = useState<'latest' | 'all'>('latest');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notices = useMemo(() => allNotices ?? [], [allNotices]);

  // Filter notices based on the two options:
  // 1. "Latest news": updated within 3 days
  // 2. "All news": all notices
  const filteredNotices = useMemo(() => {
    if (filterType === 'latest') {
      const recent = notices.filter((n) => isRecentInIST(n.publishedAt || n.effectiveDate, 3));
      return recent.length > 0 ? recent : notices.slice(0, 2);
    }
    return notices;
  }, [filterType, notices]);

  // Reset index when switching tabs
  const handleTabChange = (type: 'latest' | 'all') => {
    setFilterType(type);
    setCurrentIndex(0);
  };

  const handleNext = useCallback(() => {
    if (filteredNotices.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredNotices.length);
  }, [filteredNotices.length]);

  const handlePrev = useCallback(() => {
    if (filteredNotices.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredNotices.length) % filteredNotices.length);
  }, [filteredNotices.length]);

  // Auto-advance every 6 seconds unless paused
  useEffect(() => {
    if (isPaused || filteredNotices.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, filteredNotices.length, handleNext]);

  if (isLoading || notices.length === 0) {
    return null;
  }

  const currentNotice = filteredNotices[currentIndex] || filteredNotices[0] || notices[0];

  return (
    <>
      <div
        className={cn(
          'w-full max-w-2xl bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden',
          className
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="Clinic Notices & News"
      >
        {/* Top bar: Two Tab Options (Latest news / All news) + Controls */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 flex-wrap">
          {/* Two Options: Latest news & All news (No category tags) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl">
            <button
              type="button"
              onClick={() => handleTabChange('latest')}
              className={cn(
                'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer',
                filterType === 'latest'
                  ? 'bg-[#0f3d4a] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {isHindi ? 'ताज़ा समाचार' : 'Latest news'}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('all')}
              className={cn(
                'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer',
                filterType === 'all'
                  ? 'bg-[#0f3d4a] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {isHindi ? 'सभी समाचार' : 'All news'}
            </button>
          </div>

          {/* Controls: Prev / Counter / Next + Dialog trigger */}
          <div className="flex items-center gap-2">
            {filteredNotices.length > 1 && (
              <span className="text-[11px] text-slate-500 font-medium">
                {currentIndex + 1} / {filteredNotices.length}
              </span>
            )}

            {filteredNotices.length > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous notice"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next notice"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-[11px] font-bold text-[#0f3d4a] hover:underline flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg hover:bg-teal-50 transition-colors ml-1"
            >
              <span>{isHindi ? 'विस्तार से' : 'View Notices'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Notice Content (No category tags) */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="pt-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsModalOpen(true);
            }
          }}
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatDateInIST(currentNotice.effectiveDate)}</span>
            </div>

            <h4 className="text-sm font-bold text-slate-950 group-hover:text-[#0f3d4a] transition-colors leading-snug line-clamp-1">
              {localize(currentNotice.title)}
            </h4>

            <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">
              {localize(currentNotice.content)}
            </p>
          </div>
        </div>
      </div>

      {/* Full Notices Modal Dialog */}
      <ClinicNoticesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedNoticeId={currentNotice?.id}
        initialFilter={filterType}
      />
    </>
  );
};
