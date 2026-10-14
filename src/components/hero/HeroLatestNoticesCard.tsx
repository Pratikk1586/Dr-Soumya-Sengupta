import React from 'react';
import { Megaphone, ArrowRight } from 'lucide-react';
import { useService } from '../../hooks/useService';
import { noticeService } from '../../services';
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
  const { data: noticesData } = useService(() => noticeService.getNotices(), []);

  // Pick top 3 notices matching reference design
  const latestNotices = (noticesData || []).slice(0, 3);

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
      className={`w-full max-w-[350px] p-4.5 sm:p-5 rounded-[26px] bg-[#F7F5EE]/95 backdrop-blur-md border border-[#E5E0D2] shadow-[0_16px_40px_rgba(27,42,38,0.07)] flex flex-col gap-3.5 sm:gap-4 z-20 ${className}`}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E3DDD0]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#E5F2EC] border border-[#0F5C4A]/15 flex items-center justify-center text-[#0F5C4A] shrink-0">
            <Megaphone className="w-4 h-4 text-[#0F5C4A]" aria-hidden="true" />
          </div>
          <h3 className="font-serif font-bold text-lg sm:text-[20px] text-[#102D2D] tracking-tight">
            {isHindi ? 'नवीनतम सूचनाएं' : 'Latest Notices'}
          </h3>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="text-xs sm:text-[12.5px] font-semibold text-[#102D2D] hover:text-[#0F5C4A] flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <span>{isHindi ? 'सभी देखें' : 'View All'}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#0F5C4A]" />
        </button>
      </div>

      {/* 3 Notice Cards Matching Reference Screenshot */}
      <div className="flex flex-col gap-2.5">
        {latestNotices.map((notice) => {
          const { day, month } = formatNoticeDate(notice.effectiveDate);
          return (
            <div
              key={notice.id}
              onClick={onOpenModal}
              className="p-2.5 sm:p-3 rounded-xl bg-[#FCFAF5] hover:bg-white border border-[#E8E3D7] hover:border-[#0F5C4A]/30 flex items-center gap-3 group cursor-pointer transition-all shadow-2xs hover:shadow-xs"
            >
              {/* Date Tile */}
              <div className="w-12 sm:w-12.5 py-2 rounded-xl bg-white border border-[#E3DDD0] flex flex-col items-center justify-center shrink-0 text-center shadow-2xs group-hover:border-[#0F5C4A]/30 transition-colors">
                <span className="font-extrabold text-base sm:text-[17px] text-[#102D2D] leading-none">
                  {day}
                </span>
                <span className="text-[10px] sm:text-[10.5px] font-semibold text-[#5A6863] mt-0.5 leading-none">
                  {month}
                </span>
              </div>

              {/* Title & Read More Action */}
              <div className="min-w-0 flex-1">
                <h4 className="text-[12.5px] sm:text-[13px] font-semibold text-[#102D2D] group-hover:text-[#0F5C4A] transition-colors leading-snug line-clamp-2">
                  {localize(notice.title)}
                </h4>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F5C4A] group-hover:underline mt-0.5">
                  <span>{isHindi ? 'और पढ़ें' : 'Read More'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroLatestNoticesCard;
