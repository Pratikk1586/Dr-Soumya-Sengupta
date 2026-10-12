import React from 'react';
import { Clock, CalendarCheck } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { clinicService, noticeService } from '../../services';

export const TimingsPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);
  const { data: notice } = useService(() => noticeService.getActiveNotice(), []);

  return (
    <>
      <SEO
        title="Chamber OPD Timings & Schedule — Dr. Soumya Sengupta"
        description="Daily OPD consultation hours, weekly schedule, and special advisory updates for Dr. Soumya Sengupta's practice."
        canonicalPath="/clinic/timings"
      />

      <div className="bg-gradient-to-b from-[#FCFEFF] via-[#F4FBFC] to-[#EAF7FA]/60 border-b border-slate-200/80 relative">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.clinic'), href: '/clinic' },
              { label: 'OPD Timings' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Consulting Hours</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              OPD Timings & Chamber Schedule
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Regular weekly consultation slots. Advance appointment booking is recommended to avoid long waiting times.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-8 max-w-4xl">
        {notice && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
            <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Active Advisory:</strong> {localize(notice.title)} — {localize(notice.content)}
            </div>
          </div>
        )}

        <Card padding="lg" className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <CalendarCheck className="w-5 h-5 text-[#103F4A]" />
              <h2 className="text-lg font-bold text-slate-900">Weekly Consultation Slots</h2>
            </div>
            <VerificationBadge note="Timings to be reconfirmed with clinic desk" />
          </div>

          <div className="divide-y divide-slate-100">
            {clinic?.timings.map((tm, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-800">{localize(tm.dayOfWeek)}</span>
                <span
                  className={`font-mono px-3 py-1 rounded-md text-xs ${
                    tm.isAvailable
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold'
                      : 'bg-slate-100 text-slate-700 font-medium'
                  }`}
                >
                  {localize(tm.timeSlot)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1.5">
            <p className="font-semibold text-slate-700">• Please contact the clinic to confirm appointment availability before visiting.</p>
            <p>• Initial and follow-up consultations include a full review of glucose logs.</p>
            <p>• Emergency appointments outside routine hours require prior phone confirmation.</p>
          </div>
        </Card>
      </Container>
    </>
  );
};
