import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  MapPin,
  ArrowUpRight,
  Navigation,
  ChevronRight,
  FileText,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { clinicService } from '../../services';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Container } from '../common/Container';
import { getDirectionsUrl } from '../../lib/maps';
import { ENV, getSafePhoneHref, getSafeWhatsAppHref } from '../../config/env';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { localize } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);

  const phoneHref = getSafePhoneHref();
  const whatsappHref = getSafeWhatsAppHref(
    'Hello Dr. Sengupta chamber reception, I would like to make an inquiry.'
  );
  const mapsUrl = clinic?.mapsUrl || getDirectionsUrl();

  return (
    <footer className="bg-gradient-to-b from-[#082E22] via-[#06261C] to-[#041D15] text-stone-200 pt-12 sm:pt-14 pb-28 md:pb-14 border-t border-[#0F5C4A]/40 relative overflow-hidden">
      <Container size="xl">
        {/* Responsive Grid: 1 col on mobile, 2 cols on tablet (md), 4 cols on desktop (xl) with subtle dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr_1.1fr] xl:divide-x xl:divide-white/10 gap-8 xl:gap-0 pb-10 sm:pb-12 border-b border-white/10">
          
          {/* COLUMN 1: Clinic Branding */}
          <div className="md:pr-6 xl:pr-8 space-y-3.5">
            {/* Logo */}
            <div className="h-11 w-fit px-3 py-1.5 rounded-xl bg-white flex items-center shrink-0 border border-[#E8E2D5] shadow-xs">
              <picture>
                <source type="image/webp" srcSet="/images/clinic-logo.webp" />
                <img
                  src="/images/clinic-logo.png"
                  alt="Dr. Soumya Sengupta's Diabetic Clinic"
                  className="h-8 w-auto max-w-[120px] object-contain"
                  width={110}
                  height={36}
                  loading="lazy"
                />
              </picture>
            </div>

            {/* Doctor Name & Designation */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white tracking-tight">
                Dr. Soumya Sengupta
              </h3>
              <p className="text-xs text-[#E0EFE8] mt-0.5 font-medium">
                Consultant Diabetologist &amp; Metabolic Physician
              </p>
            </div>

            {/* Accent divider line */}
            <div className="w-10 h-0.5 bg-[#B8862B]" aria-hidden="true" />

            {/* Tagline / Description */}
            <p className="text-xs text-[#E2EBE6] leading-relaxed max-w-sm">
              Evidence-based diabetology, individualized glucose management, and holistic organ protection for a healthier tomorrow.
            </p>

            {/* Connect With Us & Social Icons */}
            <div className="pt-1 space-y-2">
              <span className="text-xs font-semibold text-white block">
                Connect With Us
              </span>
              <div className="flex items-center gap-2">
                {/* YouTube */}
                <a
                  href="https://youtube.com/@drsoumyasengupta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#E02424] hover:bg-[#C81E1E] text-white flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://facebook.com/drsoumyasengupta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com/drsoumyasengupta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* WhatsApp */}
                <a
                  href={whatsappHref || "https://wa.me/919431114510"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="pt-1">
              <LanguageSwitcher variant="compact" theme="dark" />
            </div>
          </div>

          {/* COLUMN 2: Clinical Focus */}
          <div className="md:pl-6 xl:px-8 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0F5C4A]/60 border border-white/10 flex items-center justify-center text-[#74C69D] shrink-0">
                <FileText className="w-4 h-4" aria-hidden="true" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                CLINICAL FOCUS
              </h4>
            </div>
            <div className="w-12 h-0.5 bg-[#B8862B]" aria-hidden="true" />

            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/diabetes-care/management" className="text-stone-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-[#E5C158] group-hover:translate-x-0.5 transition-transform" />
                  <span>Comprehensive Diabetes Care</span>
                </Link>
              </li>
              <li>
                <Link to="/diabetes-care/prediabetes" className="text-stone-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-[#E5C158] group-hover:translate-x-0.5 transition-transform" />
                  <span>Prediabetes &amp; Remission</span>
                </Link>
              </li>
              <li>
                <Link to="/diabetes-care/education" className="text-stone-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-[#E5C158] group-hover:translate-x-0.5 transition-transform" />
                  <span>CGM &amp; Sensor Analytics</span>
                </Link>
              </li>
              <li>
                <Link to="/diabetes-care/complications" className="text-stone-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-[#E5C158] group-hover:translate-x-0.5 transition-transform" />
                  <span>Kidney &amp; Foot Preservation</span>
                </Link>
              </li>
              <li>
                <Link to="/conditions/thyroid" className="text-stone-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-[#E5C158] group-hover:translate-x-0.5 transition-transform" />
                  <span>Thyroid (TSH) Management</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Patient Resources */}
          <div className="md:pr-6 xl:px-8 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0F5C4A]/60 border border-white/10 flex items-center justify-center text-[#74C69D] shrink-0">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                PATIENT RESOURCES
              </h4>
            </div>
            <div className="w-12 h-0.5 bg-[#B8862B]" aria-hidden="true" />

            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/patient-resources/knowledge-hub" className="text-stone-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-[#E5C158] group-hover:translate-x-0.5 transition-transform" />
                  <span>Knowledge Hub</span>
                </Link>
              </li>
              <li>
                <Link to="/patient-resources/reports" className="text-stone-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-[#E5C158] group-hover:translate-x-0.5 transition-transform" />
                  <span>Understanding HbA1c Reports</span>
                </Link>
              </li>
              <li>
                <Link to="/patient-resources/faqs" className="text-stone-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-[#E5C158] group-hover:translate-x-0.5 transition-transform" />
                  <span>Diabetes FAQs</span>
                </Link>
              </li>
              <li>
                <Link to="/patient-resources/guides" className="text-stone-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-[#E5C158] group-hover:translate-x-0.5 transition-transform" />
                  <span>Patient Self-Care Guides</span>
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="text-[#F3D785] hover:text-white font-semibold transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-[#F3D785] group-hover:translate-x-0.5 transition-transform" />
                  <span className="flex items-center gap-1">
                    Book Consultation <ArrowUpRight className="w-3.5 h-3.5 text-[#F3D785]" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Consultation Chambers */}
          <div className="md:pl-6 xl:pl-8 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0F5C4A]/60 border border-white/10 flex items-center justify-center text-[#74C69D] shrink-0">
                <MapPin className="w-4 h-4" aria-hidden="true" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                CONSULTATION CHAMBERS
              </h4>
            </div>
            <div className="w-12 h-0.5 bg-[#B8862B]" aria-hidden="true" />

            <div className="space-y-3 text-xs">
              <div>
                <p className="font-bold text-white text-xs">Cardio Diabetic Clinic</p>
                <div className="flex items-start gap-1.5 text-stone-200 mt-1 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-[#E5C158] shrink-0 mt-0.5" />
                  <span>
                    {clinic
                      ? `${localize(clinic.address.line1)}, ${localize(clinic.address.city)} ${clinic.address.pincode}`
                      : 'Amatola, Post Box No. 20, Chaibasa 833201'}
                  </span>
                </div>
              </div>

              {/* Direct Map & Directions Button */}
              <div className="pt-0.5">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-2.5 px-4 py-2 rounded-full border border-[#B8862B]/70 hover:border-[#E5C158] bg-[#0A3A2D] hover:bg-[#0E4B3B] text-white text-xs font-semibold shadow-xs transition-all w-fit group"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E5C158] group-hover:rotate-12 transition-transform" />
                  <span>Direct Map &amp; Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E5C158]" />
                </a>
              </div>

              {/* Phone & WhatsApp Contacts */}
              <div className="pt-0.5 space-y-2">
                {ENV.hasPhone && phoneHref && (
                  <a
                    href={phoneHref}
                    className="flex items-center gap-2.5 text-white hover:text-[#E5C158] font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>{clinic?.phone || '+91 6582 256446'}</span>
                  </a>
                )}

                {ENV.hasWhatsapp && whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-[#4ADE80] hover:text-[#86EFAC] font-medium transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#4ADE80]" />
                    <span>WhatsApp Consultation Desk</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-200 gap-4">
          <p>© {CURRENT_YEAR} Dr. Soumya Sengupta. All rights reserved.</p>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/disclaimer" className="text-stone-200 hover:text-white font-medium transition-colors">
              Medical Disclaimer
            </Link>
            <span className="text-white/30">|</span>
            <Link to="/privacy" className="text-stone-200 hover:text-white font-medium transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/30">|</span>
            <Link to="/about" className="text-stone-200 hover:text-white font-medium transition-colors">
              Doctor Profile
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
