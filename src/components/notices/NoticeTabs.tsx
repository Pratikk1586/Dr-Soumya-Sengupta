import React from 'react';

export type NoticeTabMode = 'recent' | 'all';

interface NoticeTabsProps {
  activeTab: NoticeTabMode;
  onTabChange: (tab: NoticeTabMode) => void;
  recentCount: number;
  totalCount: number;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const NoticeTabs: React.FC<NoticeTabsProps> = ({
  activeTab,
  onTabChange,
  recentCount,
  totalCount,
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'holiday', label: 'Holidays' },
    { id: 'changed_timings', label: 'Changed Timings' },
    { id: 'health_camp', label: 'Health Camps' },
    { id: 'important_update', label: 'Important Updates' },
    { id: 'clinic_announcement', label: 'Announcements' },
  ];

  return (
    <div className="space-y-4">
      {/* Primary Tab Toggle (Recent vs All) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="inline-flex p-1 bg-slate-100 rounded-xl" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'recent'}
            onClick={() => onTabChange('recent')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'recent'
                ? 'bg-white text-[#103F4A] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Recent Notices
            <span
              className={`ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                activeTab === 'recent'
                  ? 'bg-teal-50 text-teal-800'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {recentCount}
            </span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'all'}
            onClick={() => onTabChange('all')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#103F4A] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Notices
            <span
              className={`ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                activeTab === 'all'
                  ? 'bg-teal-50 text-teal-800'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {totalCount}
            </span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#103F4A] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
