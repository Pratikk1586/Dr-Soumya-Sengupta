import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, ShieldAlert, ArrowUpRight, Navigation } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { clinicService } from '../../services';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Container } from '../common/Container';
import { VerificationBadge } from '../common/VerificationBadge';
import { DoctorSocialLinks } from '../doctor/DoctorSocialLinks';
import { getDirectionsUrl } from '../../lib/maps';
import { ENV, getSafePhoneHref, getSafeWhatsAppHref } from '../../config/env';
import { CLINIC_IMAGES } from '../../config/images';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);

  const phoneHref = getSafePhoneHref();
  const whatsappHref = getSafeWhatsAppHref('Hello Dr. Sengupta chamber reception, I would like to make an inquiry.');

  return (
    <footer className="footer-gradient text-slate-300 pt-16 pb-24 md:pb-16 border-t border-[#0E5A6B]/50 relative overflow-hidden">
      {/* Emergency Disclaimer Banner: Red strictly for emergency elements */}
      <Container size="xl" className="mb-12">
        <div className="bg-[#0B2E3A]/90 border border-[#C0392B]/60 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-[#C0392B] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong className="text-red-300 block mb-0.5">
              {t({ en: 'Emergency Medical Guidance', hi: 'आपातकालीन चिकित्सीय निर्देश' })}
            </strong>
            <p>{t('footer.emergencyNotice')}</p>
          </div>
        </div>
      </Container>

      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#145466]/40">
          {/* Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-auto px-2 py-1 rounded-xl bg-white flex items-center justify-center border border-[#1b6c83]/40 shadow-xs shrink-0">
                <img
                  src={CLINIC_IMAGES.logo}
                  alt="Cardio Diabetic Clinic Logo"
                  className="h-8 sm:h-9 w-auto max-w-[80px] object-contain"
                  width={72}
                  height={36}
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Dr. Soumya Sengupta
                </h3>
                <p className="text-xs text-[#EAF7FA]/80">
                  Consultant Diabetologist & Metabolic Physician
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>

            {/* Social Media Handles */}
            <div className="pt-1 space-y-1.5">
              <span className="text-xs font-semibold text-slate-200 block">
                {t({ en: 'Connect on Social Media', hi: 'सोशल मीडिया हैंडल्स' })}
              </span>
              <DoctorSocialLinks variant="icons" theme="dark" />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <LanguageSwitcher variant="compact" />
              <VerificationBadge note="Practice details under clinical verification" />
            </div>
          </div>

          {/* Clinical Focus Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer.clinicalFocus')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/diabetes-care/management" className="hover:text-white transition-colors">
                  Comprehensive Diabetes Care
                </Link>
              </li>
              <li>
                <Link to="/diabetes-care/prediabetes" className="hover:text-white transition-colors">
                  Prediabetes & Remission
                </Link>
              </li>
              <li>
                <Link to="/diabetes-care/education" className="hover:text-white transition-colors">
                  CGM & Sensor Analytics
                </Link>
              </li>
              <li>
                <Link to="/diabetes-care/complications" className="hover:text-white transition-colors">
                  Kidney & Foot Preservation
                </Link>
              </li>
              <li>
                <Link to="/conditions/thyroid" className="hover:text-white transition-colors">
                  Thyroid (TSH) Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Patient Resources Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('nav.patientResources')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/patient-resources/knowledge-hub" className="hover:text-white transition-colors">
                  Knowledge Hub
                </Link>
              </li>
              <li>
                <Link to="/patient-resources/reports" className="hover:text-white transition-colors">
                  Understanding HbA1c Reports
                </Link>
              </li>
              <li>
                <Link to="/patient-resources/faqs" className="hover:text-white transition-colors">
                  Diabetes FAQs
                </Link>
              </li>
              <li>
                <Link to="/patient-resources/guides" className="hover:text-white transition-colors">
                  Patient Self-Care Guides
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="hover:text-white transition-colors text-amber-300 font-semibold flex items-center gap-1">
                  Book Consultation <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Chamber Contact (From Service Layer) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer.chamberLogistics')}
            </h4>

            {clinic ? (
              <div className="space-y-3 text-xs text-slate-300">
                <div>
                  <p className="font-semibold text-white">{localize(clinic.name)}</p>
                  <p className="flex items-start gap-1.5 text-slate-300 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#238ba7] shrink-0 mt-0.5" />
                    <span>
                      {localize(clinic.address.line1)}, {localize(clinic.address.city)} {clinic.address.pincode}
                    </span>
                  </p>
                </div>

                {/* Direct Google Maps Navigation Button */}
                <div className="pt-0.5">
                  <a
                    href={clinic.mapsUrl || getDirectionsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#103F4A] hover:bg-[#145466] border border-[#1b6c83]/70 text-white font-semibold text-xs shadow-xs hover:shadow-md transition-all group active:scale-98"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#38bdf8] group-hover:rotate-12 transition-transform" />
                    <span>{t({ en: 'Direct Map & Directions', hi: 'गूगल मैप्स पर रास्ता देखें' })}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                </div>

                <div className="pt-1 space-y-1.5">
                  {ENV.hasPhone && phoneHref && (
                    <a
                      href={phoneHref}
                      className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#238ba7]" />
                      <span>{clinic.phone}</span>
                    </a>
                  )}

                  {ENV.hasWhatsapp && whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp Consultation Desk</span>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-300">Loading clinic logistics...</p>
            )}
          </div>
        </div>

        {/* Bottom Legal & Ethics Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {CURRENT_YEAR} Dr. Soumya Sengupta. {t('footer.rights')}</p>

          <div className="flex items-center gap-6">
            <Link to="/disclaimer" className="text-slate-300 hover:text-white transition-colors">
              {t('footer.disclaimer')}
            </Link>
            <Link to="/privacy" className="text-slate-300 hover:text-white transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
              Doctor Profile
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
