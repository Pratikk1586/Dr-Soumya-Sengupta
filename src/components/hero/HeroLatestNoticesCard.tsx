import React from 'react';
import { Megaphone, ArrowRight } from 'lucide-react';
import { NOTICES_DATA } from '../../data/notices';
import { useLanguage } from '../../context/useLanguage';

interface HeroLatestNoticesCardProps {
  onOpenModal?: () => void;
  className?: string;
}

export const HeroLatestNoticesCard: React.FC<HeroLatestNoticesCardProps> = ({
  onOpenModal,
  className = '',
}) => {
  const { localize, isHindi } = useLanguage();

  // Pick top 3 notices
  const latestNotices = NOTICES_DATA.slice(0, 3);

  const formatNoticeDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const day = d.getDate().toString().padStart(2, '0');
      const month = d.toLocaleDateString('en-US', { month: 'short' });
      return { day, month };
    } catch {
      return { day: '12', month: 'Oct' };
    }
  };

  return (
    <div
      className={`w-full max-w-[270px] xl:max-w-[285px] p-4 rounded-3xl bg-white/95 backdrop-blur-md border border-[#E8E2D5] shadow-[0_16px_40px_rgba(27,42,38,0.08)] flex flex-col gap-3.5 z-20 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D5]/70">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#E8F2EE] border border-[#0F5C4A]/20 flex items-center justify-center text-[#0F5C4A]">
            <Megaphone className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#1B2A26]">
            {isHindi ? 'नवीनतम सूचनाएं' : 'Latest Notices'}
          </h3>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="text-xs font-semibold text-[#0F5C4A] hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          <span>{isHindi ? 'सभी देखें' : 'View All'}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* 3 Notice Items */}
      <div className="space-y-3">
        {latestNotices.map((notice) => {
          const { day, month } = formatNoticeDate(notice.effectiveDate);
          return (
            <div
              key={notice.id}
              className="flex items-start gap-2.5 group cursor-pointer"
              onClick={onOpenModal}
            >
              {/* Date Box */}
              <div className="w-10 py-1 rounded-xl bg-[#F5EFE6] border border-[#E8E2D5] flex flex-col items-center justify-center shrink-0 text-center shadow-2xs">
                <span className="font-bold text-sm text-[#1B2A26] leading-none">
                  {day}
                </span>
                <span className="text-[10px] font-semibold uppercase text-[#4A5753] mt-0.5 leading-none">
                  {month}
                </span>
              </div>

              {/* Title & Read More */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#1B2A26] group-hover:text-[#0F5C4A] transition-colors line-clamp-2 leading-snug">
                  {localize(notice.title)}
                </p>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#0F5C4A] group-hover:underline mt-0.5">
                  <span>{isHindi ? 'और पढ़ें' : 'Read More'}</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
