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
          'w-full max-w-2xl bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-3 sm:p-3.5 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden',
          className
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="Clinic Notices & News"
      >
        {/* Top bar: Two Tab Options (Latest news / All news) + Controls */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 flex-wrap">
          {/* Two Options: Latest news & All news (No category tags) */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-100/90 rounded-lg">
            <button
              type="button"
              onClick={() => handleTabChange('latest')}
              className={cn(
                'px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer',
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
                'px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer',
                filterType === 'all'
                  ? 'bg-[#0f3d4a] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {isHindi ? 'सभी समाचार' : 'All news'}
            </button>
          </div>

          {/* Controls: Prev / Counter / Next + Dialog trigger */}
          <div className="flex items-center gap-1.5">
            {filteredNotices.length > 1 && (
              <span className="text-[10px] text-slate-500 font-medium">
                {currentIndex + 1} / {filteredNotices.length}
              </span>
            )}

            {filteredNotices.length > 1 && (
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous notice"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next notice"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-[11px] font-bold text-[#0f3d4a] hover:underline flex items-center gap-1 cursor-pointer px-1.5 py-0.5 rounded-md hover:bg-teal-50 transition-colors ml-0.5"
            >
              <span>{isHindi ? 'विस्तार से' : 'View Notices'}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Notice Content (Compact & click to open full popup dialog) */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="pt-2 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsModalOpen(true);
            }
          }}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-500 font-medium shrink-0">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{formatDateInIST(currentNotice.effectiveDate)}</span>
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-950 group-hover:text-[#0f3d4a] transition-colors leading-tight line-clamp-1 truncate">
                {localize(currentNotice.title)}
              </h4>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-600 leading-snug line-clamp-1 sm:line-clamp-2">
              {localize(currentNotice.content)}
            </p>
          </div>
        </div>
      </div>

      {/* Full Notices Modal Dialog */}
      <ClinicNoticesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialFilter={filterType}
      />
    </>
  );
};
