import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Info,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { guideService } from '../../services';

export const GuidesPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: guides, isLoading } = useService(() => guideService.getGuides(), []);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = (guideTitle: string, url?: string) => {
    // If the file exists in /public, it downloads. Otherwise, show graceful placeholder notice
    if (url) {
      fetch(url, { method: 'HEAD' })
        .then((res) => {
          if (res.ok && res.headers.get('content-type')?.includes('pdf')) {
            window.open(url, '_blank');
          } else {
            setDownloadNotice(
              `"${guideTitle}": Printable PDF is currently being formatted for clinical distribution. You can review the full guide steps directly on this page.`
            );
          }
        })
        .catch(() => {
          setDownloadNotice(
            `"${guideTitle}": Printable PDF is currently being formatted for clinical distribution. You can review the full guide steps directly on this page.`
          );
        });
    } else {
      setDownloadNotice(
        `"${guideTitle}": Printable PDF coming soon. Please consult the full steps below.`
      );
    }
  };

  return (
    <>
      <SEO
        title="Patient Self-Care Guides — Dr. Soumya Sengupta"
        description="Downloadable patient guides for diabetes lifestyle, blood sugar monitoring, appointment preparation, and daily foot care."
        canonicalPath="/patient-resources/guides"
      />

      <div className="relative overflow-hidden bg-gradient-to-b from-[#EAF7FA]/70 via-[#FCFEFF] to-white border-b border-slate-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#65D9D0]/10 rounded-full blur-3xl pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <Breadcrumb
            items={[
              { label: t('nav.patientResources'), href: '/patient-resources' },
              { label: 'Patient Guides' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/40 shadow-xs">
              <FileText className="w-3.5 h-3.5 text-[#103F4A]" />
              <span>Self-Care Protocols</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#103F4A] tracking-tight">
              Patient Self-Care & Preparation Guides
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Structured step-by-step checklists to assist with daily blood glucose monitoring, appointment readiness, and foot safety.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        {downloadNotice && (
          <div className="p-4 rounded-xl bg-[#EAF7FA] border border-[#65D9D0]/50 text-[#103F4A] text-xs sm:text-sm flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <Info className="w-5 h-5 text-[#103F4A] shrink-0 mt-0.5" />
              <span>{downloadNotice}</span>
            </div>
            <button
              onClick={() => setDownloadNotice(null)}
              className="text-xs font-bold text-[#103F4A] hover:underline shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="py-16 text-center text-sm text-slate-500">
            Loading patient guides...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {guides?.map((guide) => (
              <Card
                key={guide.id}
                padding="lg"
                className="flex flex-col justify-between border-slate-200/90 shadow-2xs hover:border-[#65D9D0]/60 hover:shadow-lg hover:shadow-[#103F4A]/5 transition-all duration-200 bg-white space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF7FA] border border-[#65D9D0]/30 text-[#103F4A] flex items-center justify-center shrink-0 shadow-xs">
                      <FileText className="w-5 h-5 text-[#103F4A]" />
                    </div>
                    <Badge variant="mint" size="sm">
                      Clinical Guide
                    </Badge>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-[#103F4A] leading-snug">
                      {localize(guide.title)}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {localize(guide.summary)}
                    </p>
                  </div>

                  {/* Steps Checklist */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-[#103F4A] uppercase tracking-wider block">
                      Recommended Steps:
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                      {guide.steps.map((st, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50/70 border border-slate-100/80">
                          <CheckCircle2 className="w-4 h-4 text-[#103F4A] shrink-0 mt-0.5" />
                          <span>{localize(st)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Emergency Warning */}
                  {guide.emergencyWarning && (
                    <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>{localize(guide.emergencyWarning)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">PDF printable format</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(localize(guide.title), guide.downloadUrl)}
                    className="gap-1.5 border-[#65D9D0]/50 text-[#103F4A] hover:bg-[#EAF7FA]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Guide (PDF)</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Clinical Appointment CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#103F4A] via-[#0A262D] to-[#103F4A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md border border-[#103F4A]">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#65D9D0]">
              INDIVIDUALIZED CARE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Need Personal Self-Care Guidance?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              Dr. Soumya Sengupta provides personalized education on insulin injection technique, sensor reading, and emergency hypoglycemia protocols during consultations.
            </p>
          </div>
          <Link to="/book-appointment" className="shrink-0">
            <Button variant="primary" size="lg" className="w-full sm:w-auto bg-[#65D9D0] text-[#103F4A] hover:bg-white font-semibold">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{t('cta.bookAppointment')}</span>
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};
