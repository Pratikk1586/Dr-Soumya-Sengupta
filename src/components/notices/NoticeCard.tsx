import React from 'react';
import { Calendar, AlertCircle, Clock, HeartPulse, Bell, Tag } from 'lucide-react';
import type { Notice, NoticeCategory } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { VerificationBadge } from '../common/VerificationBadge';
import { useLanguage } from '../../context/useLanguage';
import { formatDateInIST, isRecentInIST } from '../../utils/date';

interface NoticeCardProps {
  notice: Notice;
  className?: string;
}

const CATEGORY_META: Record<
  NoticeCategory,
  { label: { en: string; hi: string }; icon: React.FC<{ className?: string }>; badgeVariant: 'primary' | 'neutral' | 'success' | 'warning' }
> = {
  holiday: {
    label: { en: 'Clinic Holiday', hi: 'क्लिनिक अवकाश' },
    icon: Calendar,
    badgeVariant: 'warning',
  },
  changed_timings: {
    label: { en: 'Changed Timings', hi: 'समय परिवर्तन' },
    icon: Clock,
    badgeVariant: 'primary',
  },
  health_camp: {
    label: { en: 'Health Camp', hi: 'स्वास्थ्य शिविर' },
    icon: HeartPulse,
    badgeVariant: 'success',
  },
  important_update: {
    label: { en: 'Important Update', hi: 'महत्वपूर्ण सूचना' },
    icon: AlertCircle,
    badgeVariant: 'warning',
  },
  clinic_announcement: {
    label: { en: 'Clinic Announcement', hi: 'क्लिनिक घोषणा' },
    icon: Bell,
    badgeVariant: 'primary',
  },
  clinic_schedule: {
    label: { en: 'Schedule Notice', hi: 'समय सारणी' },
    icon: Clock,
    badgeVariant: 'neutral',
  },
  general: {
    label: { en: 'General Notice', hi: 'सामान्य सूचना' },
    icon: Tag,
    badgeVariant: 'neutral',
  },
  emergency_advisory: {
    label: { en: 'Emergency Advisory', hi: 'आपातकालीन सलाह' },
    icon: AlertCircle,
    badgeVariant: 'warning',
  },
};

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice, className = '' }) => {
  const { localize, language } = useLanguage();
  const meta = CATEGORY_META[notice.category] || CATEGORY_META.general;
  const CategoryIcon = meta.icon;

  const dateToCheck = notice.publishedAt || notice.effectiveDate;
  const isRecent = isRecentInIST(dateToCheck, 3);
  const formattedDate = formatDateInIST(dateToCheck, language as 'en' | 'hi');

  return (
    <Card
      hoverable
      padding="md"
      className={`border-slate-200/90 shadow-sm relative overflow-hidden transition-all duration-200 ${
        notice.isImportant ? 'border-l-4 border-l-[#d97706] bg-amber-50/20' : ''
      } ${className}`}
    >
      <div className="space-y-3">
        {/* Header row: category + recent badge + verification tag */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant={meta.badgeVariant} size="sm">
              <CategoryIcon className="w-3 h-3 mr-1" aria-hidden="true" />
              <span>{meta.label[language === 'hi' ? 'hi' : 'en']}</span>
            </Badge>

            {isRecent && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                Recent (IST)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {notice.status === 'placeholder' && (
              <VerificationBadge note="Demo announcement" />
            )}
            <span className="text-xs text-slate-500 font-medium">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Notice Title */}
        <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
          {localize(notice.title)}
        </h4>

        {/* Notice Content */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {localize(notice.content)}
        </p>

        {notice.effectiveDate && (
          <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5 border-t border-slate-100">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Effective date: {formatDateInIST(notice.effectiveDate, language as 'en' | 'hi')}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};
