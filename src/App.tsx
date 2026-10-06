import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { useLanguage } from './context/useLanguage';
import { doctorService, medicalContentService, clinicService } from './services';
import type { DoctorProfile } from './types/doctor';
import type { ClinicalService } from './types/services';
import type { ClinicLocation } from './types/clinic';
import type { PlaceholderEntry } from './data/_placeholders';
import { VerificationBadge } from './components/common/VerificationBadge';
import { MedicalDisclaimerBanner } from './components/common/MedicalDisclaimerBanner';
import { CheckCircle2, Globe, Stethoscope, Clock, Shield, AlertTriangle } from 'lucide-react';
import { ENV } from './config/env';

const CURRENT_YEAR = new Date().getFullYear();

const AppContent: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [services, setServices] = useState<ClinicalService[]>([]);
  const [clinics, setClinics] = useState<ClinicLocation[]>([]);
  const [placeholders, setPlaceholders] = useState<PlaceholderEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [docData, srvData, clnData, plcData] = await Promise.all([
          doctorService.getProfile(),
          medicalContentService.getClinicalServices(),
          clinicService.getClinics(),
          medicalContentService.getPlaceholders(),
        ]);
        setDoctor(docData);
        setServices(srvData);
        setClinics(clnData);
        setPlaceholders(plcData);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading || !doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <div className="flex items-center gap-3 text-teal-800 text-sm font-medium">
          <div className="w-5 h-5 border-2 border-teal-800 border-t-transparent rounded-full animate-spin" />
          <span>Loading clinical profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#112229] flex flex-col font-sans">
      <Helmet>
        <html lang={language} />
        <title>{t(doctor.name)} — {t(doctor.title)}</title>
        <meta name="description" content={t(doctor.shortBio)} />
      </Helmet>

      {/* Top Utility Clinical Bar */}
      <header className="border-b border-[#E2E8EC] bg-white sticky top-0 z-50 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-lg tracking-wider shadow-xs">
              <Stethoscope className="w-5 h-5 text-teal-200" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">
                {t(doctor.name)}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {t(doctor.title)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-teal-700/30 text-teal-900 hover:bg-teal-50 transition-colors focus-visible:ring-2 focus-visible:ring-teal-700 cursor-pointer"
              aria-label={`Switch language to ${language === 'en' ? 'हिन्दी' : 'English'}`}
            >
              <Globe className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
              <span>{language === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Phase 1 Verification / Safety Protocol Notice */}
        <section
          aria-labelledby="phase-status-heading"
          className="rounded-xl border border-teal-200 bg-white p-6 shadow-xs"
        >
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4 pb-4 border-b border-slate-100">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-100 text-teal-900 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                Phase 1 Active Baseline
              </span>
              <h2 id="phase-status-heading" className="text-2xl font-bold text-slate-900">
                Foundational Architecture & Content Safety Layer
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Strict separation of UI from data layer, bilingual token engine, and rigorous placeholder tracking.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">
                Active Locale: <strong className="text-slate-800 uppercase">{language}</strong>
              </span>
            </div>
          </div>

          {/* Medical Disclaimer Banner */}
          <MedicalDisclaimerBanner className="mb-6" />

          {/* Doctor Bio Preview */}
          <div className="grid md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal-700" />
                {t({ en: 'Clinical Bio & Practice Philosophy', hi: 'चिकित्सीय परिचय एवं दर्शन' })}
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {t(doctor.shortBio)}
              </p>
              <div className="p-4 rounded-lg bg-teal-50/60 border border-teal-100 text-sm italic text-teal-950 font-serif">
                "{t(doctor.clinicalPhilosophy)}"
              </div>

              {/* Verified vs Unverified Qualifications */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t({ en: 'Qualifications & Credentials', hi: 'डिग्रियां एवं योग्यताएं' })}
                </h4>
                <ul className="space-y-2">
                  {doctor.qualifications.map((q, idx) => (
                    <li
                      key={idx}
                      className="text-xs bg-slate-50 border border-slate-200 p-2.5 rounded-md flex items-center justify-between gap-3"
                    >
                      <span className="font-medium text-slate-800">
                        {t(q.degree)} — {t(q.institution)}
                      </span>
                      {!q.isVerified && <VerificationBadge />}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Clinic & Environment Degradation Audit */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-700" />
                {t({ en: 'Clinic OPD Logistics', hi: 'क्लिनिक समय एवं स्थान' })}
              </h3>

              <div className="space-y-3 text-xs">
                {clinics.map((c) => (
                  <div key={c.id} className="pb-3 border-b border-slate-200 last:border-b-0">
                    <p className="font-semibold text-slate-800">{t(c.name)}</p>
                    <p className="text-slate-500 mt-0.5">{t(c.address.line1)}, {t(c.address.city)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-slate-600">Fee: {c.consultationFee?.value}</span>
                      {!c.isVerified && <VerificationBadge />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Graceful Degradation Diagnostics */}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Channel Availability
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Phone Call (tel:):</span>
                    <span className={ENV.hasPhone ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                      {ENV.hasPhone ? 'Configured' : 'Degraded (Inactive)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>WhatsApp Booking:</span>
                    <span className={ENV.hasWhatsapp ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                      {ENV.hasWhatsapp ? 'Configured' : 'Degraded (Inactive)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Google Maps URL:</span>
                    <span className={ENV.hasGoogleMaps ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                      {ENV.hasGoogleMaps ? 'Configured' : 'Degraded (Address fallback)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Services (Service Layer Verification) */}
        <section aria-labelledby="services-preview-heading" className="space-y-4">
          <div>
            <h2 id="services-preview-heading" className="text-xl font-bold text-slate-900">
              {t({ en: 'Specialized Diabetology Domains', hi: 'विशिष्ट मधुमेह चिकित्सा सेवाएं' })}
            </h2>
            <p className="text-xs text-slate-600">
              {t({
                en: 'Fetched dynamically through IMedicalContentService abstraction layer.',
                hi: 'सर्विस लेयर अमूर्तता के माध्यम से प्राप्त सेवाएं।',
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {services.slice(0, 3).map((service) => (
              <div
                key={service.id}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-teal-300 transition-colors shadow-2xs space-y-2.5"
              >
                <h3 className="font-bold text-slate-900 text-sm">{t(service.title)}</h3>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {t(service.shortDescription)}
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-teal-800 font-semibold">
                  <span>{service.indications.length} Clinical Indications</span>
                  <span>Review: Approved</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Placeholders Audit Registry Table */}
        <section aria-labelledby="placeholders-registry-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="placeholders-registry-heading" className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Active Placeholders Registry ({placeholders.length} Registered)
              </h2>
              <p className="text-xs text-slate-600">
                Cataloged in <code>src/data/_placeholders.ts</code>. Awaiting formal clinic verification before final publication.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                <tr>
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Current Placeholder Value</th>
                  <th className="px-4 py-3">Required Doctor Action</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {placeholders.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">{entry.field}</td>
                    <td className="px-4 py-3">
                      <span className="capitalize px-2 py-0.5 bg-slate-100 rounded text-[11px] text-slate-600">
                        {entry.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-amber-900">
                      {entry.currentPlaceholderValue}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{entry.actionRequired}</td>
                    <td className="px-4 py-3">
                      <VerificationBadge note={entry.actionRequired} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {CURRENT_YEAR} Dr. Soumya Sengupta. Diabetology & Metabolic Care.</p>
          <p className="text-slate-400">
            For medical emergencies, please visit the nearest hospital casualty immediately.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}
