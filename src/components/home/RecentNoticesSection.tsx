import React, { useState, useMemo } from 'react';
import { Section } from '../common/Section';
import { NoticeTabs, type NoticeTabMode } from '../notices/NoticeTabs';
import { NoticeList } from '../notices/NoticeList';
import { useService } from '../../hooks/useService';
import { noticeService } from '../../services';
import { isRecentInIST } from '../../utils/date';

export const RecentNoticesSection: React.FC = () => {
  const { data: allNotices, isLoading } = useService(() => noticeService.getNotices(), []);
  const [activeTab, setActiveTab] = useState<NoticeTabMode>('recent');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const noticesList = useMemo(() => allNotices ?? [], [allNotices]);

  // Recent in IST (published within last 3 days)
  const recentNotices = useMemo(() => {
    return noticesList.filter((n) => {
      const dateToCheck = n.publishedAt || n.effectiveDate;
      return isRecentInIST(dateToCheck, 3);
    });
  }, [noticesList]);

  // Filter based on active tab and category
  const filteredNotices = useMemo(() => {
    const baseList = activeTab === 'recent' ? recentNotices : noticesList;
    if (selectedCategory === 'all') return baseList;
    return baseList.filter((n) => n.category === selectedCategory);
  }, [activeTab, recentNotices, noticesList, selectedCategory]);

  const emptyMessage =
    activeTab === 'recent'
      ? 'No notices published in the last 72 hours (Asia/Kolkata). Switch to "All Notices" to view earlier clinic updates.'
      : 'No notices found for this category.';

  return (
    <Section
      eyebrow="Clinic Announcements & Updates"
      heading="Recent Notices & Timings"
      lede="Live schedule updates, holiday notices, and quarterly diabetes screening announcements computed in Indian Standard Time (IST)."
      containerSize="xl"
      className="bg-[#faf9f6] border-b border-slate-200/80"
    >
      <div className="space-y-6">
        <NoticeTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          recentCount={recentNotices.length}
          totalCount={noticesList.length}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {isLoading ? (
          <div className="py-12 text-center text-sm text-slate-500">
            Loading clinic notices...
          </div>
        ) : (
          <NoticeList notices={filteredNotices} emptyMessage={emptyMessage} />
        )}
      </div>
    </Section>
  );
};
