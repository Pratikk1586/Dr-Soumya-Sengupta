import React from 'react';
import { BellOff } from 'lucide-react';
import type { Notice } from '../../types';
import { NoticeCard } from './NoticeCard';
import { EmptyState } from '../common/EmptyState';

interface NoticeListProps {
  notices: Notice[];
  emptyMessage?: string;
  className?: string;
}

export const NoticeList: React.FC<NoticeListProps> = ({
  notices,
  emptyMessage = 'No notices found for this filter.',
  className = '',
}) => {
  if (notices.length === 0) {
    return (
      <div className="py-8 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
        <EmptyState
          icon={<BellOff className="w-8 h-8 text-slate-400" />}
          title="No Notices Available"
          description={emptyMessage}
        />
      </div>
    );
  }

  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ${className}`}>
      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} />
      ))}
    </div>
  );
};
