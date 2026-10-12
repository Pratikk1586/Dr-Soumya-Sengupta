import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { noticeService } from '../../services';
import { isRecentInIST } from '../../utils/date';
import { ClinicNoticesModal } from '../notices/ClinicNoticesModal';
import { cn } from '../../utils/cn';

interface HeroNewsTickerProps {
  className?: string;
}

export const HeroNewsTicker: React.FC<HeroNewsTickerProps> = ({ className = '' }) => {
  const { localize, isHindi } = useLanguage();
  const { data: allNotices, isLoading } = useService(() => noticeService.getNotices(), []);
  const [filterType] = useState<'latest' | 'all'>('latest');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notices = useMemo(() => allNotices ?? [], [allNotices]);

  // Filter notices based on recent news
  const filteredNotices = useMemo(() => {
    if (filterType === 'latest') {
      const recent = notices.filter((n) => isRecentInIST(n.publishedAt || n.effectiveDate, 3));
      return recent.length > 0 ? recent : notices.slice(0, 2);
    }
    return notices;
  }, [filterType, notices]);

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
          'w-full max-w-2xl bg-white/90 rounded-full border border-slate-200/90 px-3 py-1.5 sm:py-2 flex items-center justify-between gap-2 shadow-2xs hover:shadow-xs hover:border-[#65D9D0]/70 transition-all backdrop-blur-xs',
          className
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="Clinic Announcements"
      >
        {/* Left: Slim badge & notice text */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#103F4A] text-white text-[10px] sm:text-[11px] font-bold shrink-0 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isHindi ? 'सूचना' : 'Notice'}</span>
          </span>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-left text-xs text-slate-700 hover:text-[#103F4A] truncate font-medium transition-colors cursor-pointer"
            title={localize(currentNotice.title)}
          >
            {localize(currentNotice.title)}
          </button>
        </div>

        {/* Right: Controls & View All */}
        <div className="flex items-center gap-1 shrink-0 text-slate-400">
          {filteredNotices.length > 1 && (
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label="Previous announcement"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-1 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label="Next announcement"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-[11px] font-bold text-[#103F4A] hover:underline px-1.5 py-0.5 ml-1 hidden sm:inline cursor-pointer"
          >
            {isHindi ? 'सभी देखें' : 'View All'}
          </button>
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
