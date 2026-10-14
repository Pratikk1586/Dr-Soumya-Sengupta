import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Activity,
  HeartPulse,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Bell,
  Info,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { MapSection } from '../../components/common/MapSection';
import { ClinicNoticesModal } from '../../components/notices/ClinicNoticesModal';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { clinicService, noticeService, galleryService } from '../../services';
import { ENV, getSafePhoneHref, getSafeWhatsAppHref } from '../../config/env';
import { VERIFIED_GOOGLE_MAPS_URL } from '../../lib/maps';
import { formatDateInIST } from '../../utils/date';
import { CLINIC_IMAGES } from '../../config/images';
import type { GalleryItem } from '../../services/types';

export const ClinicOverviewPage: React.FC = () => {
  const { localize, isHindi, t } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);
  const { data: activeNotice } = useService(() => noticeService.getActiveNotice(), []);
  const { data: galleryItemsData } = useService(() => galleryService.getGalleryItems('all'), []);

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isNoticesModalOpen, setIsNoticesModalOpen] = useState(false);

  // Gallery items for clinic showcase (filtered to clinic and medical categories)
  const galleryItems = (galleryItemsData && galleryItemsData.length > 0)
    ? galleryItemsData
    : [];

  const activePhoto: GalleryItem | null =
    activeLightboxIndex !== null && galleryItems[activeLightboxIndex]
      ? galleryItems[activeLightboxIndex]
      : null;

  const handleNextPhoto = useCallback(() => {
    if (activeLightboxIndex !== null && galleryItems.length > 0) {
      setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryItems.length : 0));
    }
  }, [activeLightboxIndex, galleryItems.length]);

  const handlePrevPhoto = useCallback(() => {
    if (activeLightboxIndex !== null && galleryItems.length > 0) {
      setActiveLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : 0
      );
    }
  }, [activeLightboxIndex, galleryItems.length]);

  // Keyboard navigation & body scroll lock for lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      else if (e.key === 'ArrowRight') handleNextPhoto();
      else if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightboxIndex, handleNextPhoto, handlePrevPhoto]);

  const phoneHref = getSafePhoneHref();
  const whatsappHref = getSafeWhatsAppHref(
    'Hello Cardio Diabetic Clinic, I would like to inquire about chamber consultation and timings.'
  );

  const addressText = clinic
    ? `${localize(clinic.address.line1)}, ${clinic.address.line2 ? localize(clinic.address.line2) + ', ' : ''}${localize(clinic.address.city)} – ${clinic.address.pincode}, Jharkhand`
    : 'Amlatola, Post Box No. 20, P.O. Chaibasa, West Singhbhum, Jharkhand – 833201';

  const landmarkText = clinic?.address.landmark
    ? localize(clinic.address.landmark)
    : 'Near Post Office, Amlatola, Chaibasa';

  const mapsUrl = clinic?.mapsUrl || VERIFIED_GOOGLE_MAPS_URL;

  // Facilities icons mapping
  const getFacilityIcon = (index: number) => {
    switch (index % 4) {
      case 0:
        return <Activity className="w-5 h-5 text-[#103F4A]" />;
      case 1:
        return <HeartPulse className="w-5 h-5 text-[#103F4A]" />;
      case 2:
        return <Stethoscope className="w-5 h-5 text-[#103F4A]" />;
      case 3:
      default:
        return <ShieldCheck className="w-5 h-5 text-[#103F4A]" />;
    }
  };

  return (
    <>
      <SEO
        title="Our Clinic — Cardio Diabetic Clinic, Chaibasa | Dr. Soumya Sengupta"
        description="Comprehensive diabetes care, cardiovascular risk screening, point-of-care diagnostics, and OPD timings at Cardio Diabetic Clinic, Amlatola, Chaibasa, West Singhbhum."
        canonicalPath="/clinic"
      />

      {/* 1. HERO / INTRODUCTION SECTION */}
      <section className="relative border-b border-[#E8E2D5] pt-6 pb-14 sm:pb-20 overflow-hidden">
        {/* Soft, decorative organic background directly in CSS/SVG */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none -z-0 select-none"
          aria-hidden="true"
        >
          {/* 1. Base subtle layered cream & pale sage wash */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #FAF8F2 0%, #F5F9F6 40%, #EBF4EF 100%)',
            }}
          />

          {/* 2. Soft diffused radial glows behind content and on edges */}
          <div
            className="absolute -top-20 left-1/4 w-[500px] h-[400px] rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 243, 0.5) 60%, transparent 80%)',
            }}
          />
          <div
            className="absolute -bottom-16 -left-10 w-[420px] h-[340px] rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle at center, rgba(15, 92, 74, 0.12) 0%, rgba(232, 242, 238, 0.6) 50%, transparent 75%)',
            }}
          />
          <div
            className="absolute -top-10 -right-10 w-[550px] h-[450px] rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle at center, rgba(15, 92, 74, 0.14) 0%, rgba(242, 163, 58, 0.08) 45%, transparent 75%)',
            }}
          />

          {/* 3. Left Organic Wave Curves */}
          <svg
            className="absolute -left-10 top-0 h-full w-[280px] sm:w-[380px] lg:w-[460px] opacity-45 pointer-events-none"
            viewBox="0 0 400 500"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="clinic-left-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F5C4A" stopOpacity="0.22" />
                <stop offset="50%" stopColor="#2D6A4F" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#52B788" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="clinic-left-wave-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A3C9B8" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#FAF8F2" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M-50 -20 C 180 80, 220 280, 40 520 L -50 520 Z"
              fill="url(#clinic-left-wave-1)"
            />
            <path
              d="M-50 80 C 120 180, 140 340, -10 520 L -50 520 Z"
              fill="url(#clinic-left-wave-2)"
            />
            {/* Delicate gold contour line */}
            <path
              d="M-40 40 C 190 140, 230 310, 50 510"
              stroke="#B8862B"
              strokeWidth="1.2"
              strokeOpacity="0.28"
              fill="none"
            />
          </svg>

          {/* 4. Right Organic Wave Curves & Translucent Botanical Leaves */}
          <svg
            className="absolute right-0 top-0 h-full w-[360px] sm:w-[500px] lg:w-[620px] pointer-events-none"
            viewBox="0 0 600 480"
            fill="none"
            preserveAspectRatio="xMaxYMid meet"
          >
            <defs>
              {/* Sage-Emerald Wave Gradient */}
              <linearGradient id="clinic-right-wave-1" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0F5C4A" stopOpacity="0.20" />
                <stop offset="60%" stopColor="#40916C" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#FAF8F2" stopOpacity="0.0" />
              </linearGradient>

              {/* Botanical Leaf Gradient */}
              <linearGradient id="botanical-leaf-grad" x1="30%" y1="0%" x2="70%" y2="100%">
                <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.28" />
                <stop offset="50%" stopColor="#40916C" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#74C69D" stopOpacity="0.10" />
              </linearGradient>

              {/* Secondary Soft Leaf Gradient */}
              <linearGradient id="botanical-leaf-grad-soft" x1="0%" y1="30%" x2="100%" y2="70%">
                <stop offset="0%" stopColor="#1B4332" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#95D5B2" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* Background sweeping organic curves */}
            <path
              d="M650 -20 C 420 60, 360 260, 520 500 L 650 500 Z"
              fill="url(#clinic-right-wave-1)"
            />
            <path
              d="M650 120 C 490 200, 460 360, 580 500 L 650 500 Z"
              fill="rgba(232, 242, 238, 0.45)"
            />

            {/* Delicate Champagne-Gold Flowing Contour Lines */}
            <path
              d="M620 40 C 390 120, 340 310, 500 490"
              stroke="#B8862B"
              strokeWidth="1.2"
              strokeOpacity="0.32"
              fill="none"
            />
            <path
              d="M640 100 C 430 180, 380 340, 530 490"
              stroke="#0F5C4A"
              strokeWidth="1"
              strokeOpacity="0.22"
              fill="none"
            />

            {/* Botanical Leaf Silhouettes (Elegant stem and leaves matching reference) */}
            {/* Main botanical stem */}
            <path
              d="M580 490 C 530 380, 520 260, 540 110"
              stroke="#2D6A4F"
              strokeWidth="1.8"
              strokeOpacity="0.35"
              strokeLinecap="round"
              fill="none"
            />

            {/* Leaf 1: Top upright leaf */}
            <g transform="translate(540, 110) rotate(-25)">
              <path
                d="M0 0 C -25 -40, -15 -85, 0 -115 C 15 -85, 25 -40, 0 0 Z"
                fill="url(#botanical-leaf-grad)"
              />
              <path
                d="M0 0 L 0 -105"
                stroke="#B8862B"
                strokeWidth="0.9"
                strokeOpacity="0.4"
              />
            </g>

            {/* Leaf 2: Middle-left angled leaf */}
            <g transform="translate(525, 220) rotate(-65)">
              <path
                d="M0 0 C -28 -35, -22 -80, 0 -105 C 22 -80, 28 -35, 0 0 Z"
                fill="url(#botanical-leaf-grad)"
              />
              <path
                d="M0 0 L 0 -95"
                stroke="#B8862B"
                strokeWidth="0.8"
                strokeOpacity="0.35"
              />
            </g>

            {/* Leaf 3: Lower-left wide leaf */}
            <g transform="translate(535, 330) rotate(-78)">
              <path
                d="M0 0 C -30 -30, -26 -75, 0 -95 C 26 -75, 30 -30, 0 0 Z"
                fill="url(#botanical-leaf-grad-soft)"
              />
              <path
                d="M0 0 L 0 -85"
                stroke="#B8862B"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />
            </g>

            {/* Leaf 4: Right-side accent leaf */}
            <g transform="translate(560, 260) rotate(35)">
              <path
                d="M0 0 C -18 -25, -15 -55, 0 -75 C 15 -55, 18 -25, 0 0 Z"
                fill="url(#botanical-leaf-grad-soft)"
              />
            </g>
          </svg>
        </div>

        <Container size="xl" className="relative z-10">
          {/* Breadcrumb at top */}
          <Breadcrumb items={[{ label: t('nav.clinic') }]} />

          <div className="mt-4 sm:mt-5 max-w-4xl space-y-4 sm:space-y-4.5">
            {/* Logo and Clinic Heading Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4.5 pt-1">
              {/* Compact white logo container */}
              <div className="h-12 sm:h-14 w-fit flex items-center shrink-0 bg-white px-3 sm:px-3.5 py-1.5 rounded-2xl border border-[#E8E2D5] shadow-2xs">
                <img
                  src={CLINIC_IMAGES.logo}
                  alt="Cardio Diabetic Clinic Logo"
                  className="h-8 sm:h-9.5 w-auto max-w-[110px] sm:max-w-[130px] object-contain"
                  width={110}
                  height={38}
                />
              </div>

              {/* Large editorial serif heading */}
              <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-bold text-[#1B2A26] tracking-tight leading-tight">
                {clinic ? localize(clinic.name) : 'Cardio Diabetic Clinic'}
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#4A5753] leading-relaxed font-normal max-w-3xl">
              {isHindi
                ? 'अमलाटोला, चाईबासा (पश्चिमी सिंहभूम, झारखंड) में स्थित एक समर्पित परामर्श केंद्र — जहां डॉ. सौम्य सेनगुप्ता के प्रत्यक्ष मार्गदर्शन में समग्र मधुमेह प्रबंधन, कार्डियोवैस्कुलर जोखिम मूल्यांकन एवं मेटाबॉलिक जांच की सुविधा उपलब्ध है।'
                : 'A dedicated clinical setting in Amlatola, Chaibasa, West Singhbhum, providing comprehensive diabetes management, cardiovascular risk screening, and metabolic evaluations under the direct care of Dr. Soumya Sengupta.'}
            </p>

            {/* Information Pills */}
            <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-[#1B2A26]">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#E8E2D5] shadow-2xs">
                <Clock className="w-4 h-4 text-[#0F5C4A] shrink-0" aria-hidden="true" />
                <span>{isHindi ? 'सातों दिन खुला (Open 7 Days)' : 'Open All 7 Days'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#E8E2D5] shadow-2xs">
                <MapPin className="w-4 h-4 text-[#0E7490] shrink-0" aria-hidden="true" />
                <span>{isHindi ? 'अमलाटोला, चाईबासा' : 'Amlatola, Chaibasa'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#E8E2D5] shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#0284C7] shrink-0" aria-hidden="true" />
                <span>{isHindi ? 'ऑन-साइट जांच सुविधाएं' : 'On-Site Diagnostic Facilities'}</span>
              </span>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* 1. Book Appointment */}
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center gap-2 px-5.5 py-3 rounded-xl font-bold text-sm bg-[#0F5C4A] hover:bg-[#0B4636] text-white shadow-sm hover:shadow-md transition-all active:scale-[0.98] min-h-[46px]"
              >
                <Calendar className="w-4 h-4 text-white" aria-hidden="true" />
                <span>{isHindi ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}</span>
                <ArrowRight className="w-4 h-4 text-white" aria-hidden="true" />
              </Link>

              {/* 2. Get Directions */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-white hover:bg-[#FBF8F1] text-[#0F5C4A] border border-[#0F5C4A]/30 shadow-2xs transition-all active:scale-[0.98] min-h-[46px]"
              >
                <Navigation className="w-4 h-4 text-[#0F5C4A]" aria-hidden="true" />
                <span>{isHindi ? 'रास्ता देखें' : 'Get Directions'}</span>
              </a>

              {/* 3. WhatsApp */}
              {ENV.hasWhatsapp && whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4.5 py-3 rounded-xl font-semibold text-sm bg-[#E8F7EE] hover:bg-[#DCFCE7] text-[#15803d] border border-[#22C55E]/30 shadow-2xs transition-all active:scale-[0.98] min-h-[46px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#16a34a]" aria-hidden="true" />
                  <span>{isHindi ? 'व्हाट्सएप संपर्क' : 'WhatsApp'}</span>
                </a>
              )}

              {/* 4. Call Clinic */}
              {ENV.hasPhone && phoneHref && (
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-4.5 py-3 rounded-xl font-semibold text-sm bg-white hover:bg-[#FBF8F1] text-[#1B2A26] border border-[#E8E2D5] shadow-2xs transition-all active:scale-[0.98] min-h-[46px]"
                >
                  <Phone className="w-4 h-4 text-[#4A5753]" aria-hidden="true" />
                  <span>{isHindi ? 'कॉल करें' : 'Call Clinic'}</span>
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. CLINIC OVERVIEW SECTION */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Real Clinic Photograph / Visual Presentation */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-gradient-to-br from-slate-100 via-slate-50 to-[#EAF7FA]/50 group">
                {/* Visual Image Presentation */}
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <img
                    src="/assets/achievements/newspaper-3.webp"
                    alt="Cardio Diabetic Clinic Consultation and Diagnostic Setup"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to elegant styled card if image file is absent
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#103F4A]/90 text-[11px] font-bold uppercase tracking-wider mb-1">
                      {isHindi ? 'परामर्श कक्ष' : 'Consultation Chamber'}
                    </span>
                    <p className="text-sm font-semibold leading-tight text-white/95">
                      {clinic ? localize(clinic.name) : 'Cardio Diabetic Clinic'}
                    </p>
                    <p className="text-xs text-white/80">
                      {isHindi ? 'चाईबासा, पश्चिमी सिंहभूम, झारखंड' : 'Chaibasa, West Singhbhum, Jharkhand'}
                    </p>
                  </div>
                </div>

                {/* Sub-card verification badge */}
                <div className="p-4 bg-slate-50/90 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium">
                      {isHindi ? 'पंजीकृत मेडिकल प्रैक्टिस' : 'Registered Medical Practice'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">Reg. No. 34336</span>
                </div>
              </div>

              {/* Quick links to deeper clinic pages */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <Link
                  to="/clinic/timings"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-[#EAF7FA]/60 border border-slate-200 hover:border-[#103F4A]/30 transition-all flex items-center justify-between group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-[#103F4A]">
                    {isHindi ? 'समय सारणी विवरण' : 'OPD Timings Details'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#103F4A] group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to="/clinic/facilities"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-[#EAF7FA]/60 border border-slate-200 hover:border-[#103F4A]/30 transition-all flex items-center justify-between group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-[#103F4A]">
                    {isHindi ? 'ऑन-साइट सुविधाएं' : 'Diagnostic Facilities'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#103F4A] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: “About Our Clinic” Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#103F4A]">
                  {isHindi ? 'क्लिनिक का परिचय' : 'About Our Clinic'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#06181f] tracking-tight">
                  {isHindi
                    ? 'मधुमेह एवं कार्डियोवैस्कुलर स्वास्थ्य हेतु समर्पित परामर्श केंद्र'
                    : 'Personalized Clinical Care for Diabetes & Cardiovascular Health'}
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                <p>
                  {isHindi
                    ? 'कार्डियो डायबिटिक क्लिनिक चाईबासा एवं आसपास के कोल्हान प्रमंडल के रोगियों के लिए एक विश्वसनीय एवं समर्पित परामर्श स्थल है। क्लिनिक में मधुमेह, रक्तचाप, लिपिड असंतुलन एवं संबंधित मेटाबॉलिक जटिलताओं का व्यवस्थित वैज्ञानिक मूल्यांकन किया जाता है।'
                    : 'Cardio Diabetic Clinic serves as a dedicated medical facility in Chaibasa for patients across West Singhbhum and the broader Kolhan division. The chamber focuses on structured, evidence-based management of glycemic volatility, cardiovascular risk factors, and metabolic imbalances.'}
                </p>

                <p>
                  {isHindi
                    ? 'डॉ. सौम्य सेनगुप्ता (एमडी मेडिसिन) प्रत्येक रोगी के ग्लूकोज रिकॉर्ड्स, आहार शैली एवं पूर्व नैदानिक रिपोर्टों का गहन अध्ययन करते हैं, ताकि जटिलताओं की रोकथाम और दीर्घकालिक स्वास्थ्य सुरक्षा सुनिश्चित हो सके।'
                    : 'Under the direct clinical oversight of Dr. Soumya Sengupta (MD Medicine), consultations emphasize detailed evaluation of ambulatory blood glucose patterns, cardiovascular health markers, and lifestyle adjustments to prevent long-term microvascular and macrovascular complications.'}
                </p>
              </div>

              {/* Key clinic highlights */}
              <div className="pt-2 grid sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'नियमित परामर्श' : 'Comprehensive OPD'}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isHindi
                      ? 'टाइप 1, टाइप 2 एवं प्रीडायबिटीज के लिए चरणबद्ध चिकित्सीय परामर्श।'
                      : 'Structured clinical protocols for Type 1, Type 2, and Prediabetes.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'कार्डियो जोखिम निगरानी' : 'Cardio Risk Screening'}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isHindi
                      ? 'उच्च रक्तचाप एवं डिस्लिपिडेमिया की नियमित क्लिनिकल निगरानी।'
                      : 'Integrated monitoring of hypertension, dyslipidemia, and arterial health.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CLINIC FACILITIES SECTION */}
      <section className="py-12 sm:py-16 bg-[#FCFEFF] border-b border-slate-200/80">
        <Container size="xl">
          <div className="max-w-3xl space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#103F4A]">
              {isHindi ? 'नैदानिक सुविधाएं' : 'Clinical Facilities'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#06181f] tracking-tight">
              {isHindi ? 'क्लिनिक में उपलब्ध प्रमुख सुविधाएं' : 'Chamber Facilities & Diagnostic Equipment'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isHindi
                ? 'क्लिनिक में मरीजों के तुरंत मूल्यांकन हेतु स्थापित की गई महत्वपूर्ण ऑन-साइट सुविधाएं।'
                : 'Verified clinical and screening facilities accessible at the chamber to assist timely clinical decisions.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {clinic?.facilities.map((facility, idx) => (
              <Card
                key={facility.id}
                padding="md"
                className="bg-white border-slate-200/90 hover:border-[#65D9D0]/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#EAF7FA] text-[#103F4A] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getFacilityIcon(idx)}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {localize(facility.name)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {localize(facility.description)}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isHindi ? 'सत्यापित सुविधा' : 'Verified On-Site'}</span>
                  </span>
                  <Link
                    to="/clinic/facilities"
                    className="text-slate-400 group-hover:text-[#103F4A] transition-colors"
                    aria-label="View facilities detail"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. CONSULTATION TIMINGS (EXACT 7-DAY VERIFIED SCHEDULE) */}
      <section id="timings" className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
        <Container size="xl">
          <div className="max-w-3xl space-y-2 mb-8">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Clock className="w-3.5 h-3.5" />
                <span>{isHindi ? 'परामर्श समय सारणी' : 'CONSULTATION TIMINGS'}</span>
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {isHindi ? '7 दिन खुला' : 'Open All 7 Days'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#06181f] tracking-tight">
              {isHindi ? 'सत्यापित परामर्श समय (OPD Schedule)' : 'Verified Consultation Timings'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isHindi
                ? 'क्लिनिक सप्ताह के सातों दिन खुला रहता है। नीचे प्रत्येक दिन का आधिकारिक समय दर्शाया गया है।'
                : 'The clinic is open on all seven days based on the verified schedule below. Please review daily opening and closing hours.'}
            </p>
          </div>

          {/* 7-Day Grid / Card Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-3.5">
            {clinic?.timings.map((timing, idx) => {
              const dayName = timing.day || localize(timing.dayOfWeek);
              const openTime = timing.openingTime || '9:30 AM';
              const closeTime = timing.closingTime || (idx >= 5 ? '3:30 PM' : '3:00 PM');
              const isWeekend = dayName.toLowerCase().includes('sat') || dayName.toLowerCase().includes('sun');

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isWeekend
                      ? 'bg-gradient-to-b from-[#EAF7FA]/40 to-white border-[#103F4A]/25 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {isHindi ? `दिन ${idx + 1}` : `Day ${idx + 1}`}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {isHindi ? 'खुला' : 'Open'}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base">
                      {dayName}
                    </h3>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-500">{isHindi ? 'खुलने का समय:' : 'Opens:'}</span>
                        <span className="font-mono font-bold text-slate-900">{openTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-500">{isHindi ? 'समापन समय:' : 'Closes:'}</span>
                        <span className="font-mono font-bold text-slate-900">{closeTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-100 text-[11px] text-center font-medium text-slate-500">
                    {timing.timeSlot ? localize(timing.timeSlot) : `${openTime} – ${closeTime}`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mandatory Availability Advisory Note */}
          <div className="mt-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 flex items-start gap-3 text-xs sm:text-sm">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-amber-900">
                {isHindi
                  ? 'महत्वपूर्ण सूचना: क्लिनिक आने से पहले कृपया अपॉइंटमेंट उपलब्धता की पुष्टि अवश्य कर लें।'
                  : 'Please contact the clinic to confirm appointment availability before visiting.'}
              </p>
              <p className="text-amber-800 text-xs">
                {isHindi
                  ? 'विशेष आपातकालीन स्थितियों अथवा अवकाश के दिन समय सारणी में परिवर्तन की जानकारी रिसेप्शन से प्राप्त करें।'
                  : 'Emergency appointments outside standard OPD hours require prior telephone confirmation with the chamber desk.'}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. LOCATION & DIRECTIONS (FIND OUR CLINIC) */}
      <section id="location" className="py-12 sm:py-16 bg-[#FCFEFF] border-b border-slate-200/80">
        <Container size="xl">
          <div className="max-w-3xl space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#103F4A]">
              {isHindi ? 'स्थान एवं दिशा-निर्देश' : 'FIND OUR CLINIC'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#06181f] tracking-tight">
              {isHindi ? 'क्लिनिक का पता एवं आवागमन' : 'Location, Transit & Driving Directions'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isHindi
                ? 'गूगल मैप्स पर सीधे रास्ता देखें या रिसेप्शन से संपर्क करें।'
                : 'Accurate chamber location in Chaibasa with verified Google Maps navigation.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Google Maps / Location Visual */}
            <div className="lg:col-span-6">
              <MapSection
                address={addressText}
                landmark={landmarkText}
                mapsUrl={mapsUrl}
              />
            </div>

            {/* Right: Address details and action buttons */}
            <div className="lg:col-span-6 space-y-6">
              <Card padding="lg" className="bg-white border-slate-200 shadow-xs space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">
                      {isHindi ? 'क्लिनिक डाक पता' : 'Clinic Postal Address'}
                    </h3>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold border border-emerald-200">
                      {isHindi ? 'सत्यापित पता' : 'Verified Address'}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3.5 text-xs sm:text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#103F4A] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5">
                          {clinic ? localize(clinic.name) : 'Cardio Diabetic Clinic'}
                        </strong>
                        <p className="text-slate-600 leading-relaxed">{addressText}</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-800">{isHindi ? 'प्रमुख लैंडमार्क:' : 'Key Landmark:'}</strong>{' '}
                          {landmarkText}
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-800">{isHindi ? 'रेलवे / बस संपर्क:' : 'Railway / Bus Transit:'}</strong>{' '}
                          {isHindi
                            ? 'चाईबासा रेलवे स्टेशन एवं लोकल बस स्टैंड से सुगम आवागमन।'
                            : 'Convenient road access from Chaibasa Railway Station and local bus stands.'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary navigation and contact buttons */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2.5">
                  {/* Verified Google Maps "Get Directions" */}
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#103F4A] hover:bg-[#0a252f] text-white shadow-xs hover:shadow-md transition-all active:scale-98"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{isHindi ? 'रास्ता देखें (Get Directions)' : 'Get Directions'}</span>
                  </a>

                  {ENV.hasPhone && phoneHref && (
                    <a
                      href={phoneHref}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all active:scale-98"
                    >
                      <Phone className="w-4 h-4 text-slate-700" />
                      <span>{isHindi ? 'कॉल करें' : 'Call Clinic'}</span>
                    </a>
                  )}

                  {ENV.hasWhatsapp && whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-all active:scale-98"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-700" />
                      <span>{isHindi ? 'व्हाट्सएप संपर्क' : 'WhatsApp Clinic'}</span>
                    </a>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. CLINIC PHOTO GALLERY */}
      {galleryItems.length > 0 && (
        <section id="gallery" className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
          <Container size="xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div className="max-w-2xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#103F4A]">
                  {isHindi ? 'फोटो गैलरी' : 'CLINIC PHOTO GALLERY'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#06181f] tracking-tight">
                  {isHindi ? 'क्लिनिक एवं परामर्श कक्ष की झलकियां' : 'Inside the Clinic & Consulting Rooms'}
                </h2>
                <p className="text-sm text-slate-600">
                  {isHindi
                    ? 'परामर्श कक्ष, निरंतर ग्लूकोज मॉनिटरिंग स्टेशन एवं जांच शिविरों के वास्तविक दृश्य।'
                    : 'A clean glimpse into our consulting areas, continuous glucose monitoring stations, and patient areas.'}
                </p>
              </div>

              <Link
                to="/clinic/photos"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#103F4A] hover:text-[#0a252f] transition-colors shrink-0"
              >
                <span>{isHindi ? 'सभी मीडिया देखें →' : 'View Full Media Gallery →'}</span>
              </Link>
            </div>

            {/* Gallery Grid: 1 Featured item + Supporting Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleryItems.slice(0, 6).map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveLightboxIndex(index);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  className="group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.thumbnailUrl}
                      alt={localize(item.altText)}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        // Safe fallback visual presentation
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs font-bold line-clamp-1">{localize(item.title)}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5 bg-white">
                    <span className="text-[11px] font-bold text-[#103F4A] uppercase tracking-wider block">
                      {item.category.replace('_', ' ')}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1">
                      {localize(item.title)}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {localize(item.caption)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 7. PATIENT VISIT EXPERIENCE (YOUR VISIT TO THE CLINIC) */}
      <section className="py-12 sm:py-16 bg-[#FCFEFF] border-b border-slate-200/80">
        <Container size="xl">
          <div className="max-w-3xl space-y-2 mb-10 text-center mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#103F4A]">
              {isHindi ? 'परामर्श प्रक्रिया' : 'YOUR VISIT TO THE CLINIC'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#06181f] tracking-tight">
              {isHindi ? 'क्लिनिक परामर्श के 4 सरल चरण' : 'What to Expect During Your Clinic Visit'}
            </h2>
            <p className="text-sm text-slate-600">
              {isHindi
                ? 'नियमित व सुव्यवस्थित परामर्श प्रक्रिया ताकि आपके स्वास्थ्य का संपूर्ण मूल्यांकन हो सके।'
                : 'A structured, transparent patient workflow designed for thorough and timely evaluation.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                titleEn: 'Book / Request an Appointment',
                titleHi: 'अपॉइंटमेंट स्लॉट बुक करें',
                descEn: 'Submit our online booking form or contact reception to reserve your preferred consultation day.',
                descHi: 'ऑनलाइन फॉर्म या फोन के माध्यम से अपने पसंदीदा दिन के लिए परामर्श समय आरक्षित करें।',
              },
              {
                step: '02',
                titleEn: 'Visit the Clinic',
                titleHi: 'क्लिनिक आगमन एवं रिसेप्शन',
                descEn: 'Arrive at the Amlatola chamber. Please bring recent 3–6 month blood sugar records and prescriptions.',
                descHi: 'अमलाटोला चेंबर पहुंचे। पिछले 3–6 माह के शुगर चार्ट एवं वर्तमान दवाइयों की पर्चियां साथ लाएं।',
              },
              {
                step: '03',
                titleEn: 'Clinical Consultation',
                titleHi: 'विस्तृत चिकित्सकीय परामर्श',
                descEn: 'In-depth consultation with Dr. Soumya Sengupta covering glycemic variability and cardio-metabolic markers.',
                descHi: 'डॉ. सौम्य सेनगुप्ता के साथ रक्त शर्करा, हृदय जोखिम एवं जीवनशैली पर गहन चिकित्सकीय चर्चा।',
              },
              {
                step: '04',
                titleEn: 'Follow-up & Ongoing Care',
                titleHi: 'अनुवर्ती देखभाल एवं निगरानी',
                descEn: 'Clear follow-up schedule and glycemic targets to ensure long-term stability and complication prevention.',
                descHi: 'दीर्घकालिक नियंत्रण और जटिलताओं से सुरक्षा हेतु अनुवर्ती जांच व स्पष्ट दिशा-निर्देश।',
              },
            ].map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="text-2xl font-black text-[#0F5C4A]/70 block font-mono" aria-hidden="true">
                    {st.step}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {isHindi ? st.titleHi : st.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isHindi ? st.descHi : st.descEn}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-[#103F4A]">
                  {isHindi ? `चरण ${i + 1}` : `Step ${i + 1}`}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. CLINIC ANNOUNCEMENTS / RECENT UPDATES */}
      {activeNotice && (
        <section className="py-10 bg-white border-b border-slate-200/80">
          <Container size="xl">
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-amber-50/70 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5 text-amber-700" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-amber-900 font-semibold">
                      {formatDateInIST(activeNotice.effectiveDate)}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {localize(activeNotice.title)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {localize(activeNotice.content)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsNoticesModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-white text-slate-800 hover:text-[#103F4A] border border-amber-200 shadow-2xs hover:shadow-xs transition-all shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <span>{isHindi ? 'सभी सूचनाएं देखें →' : 'View All Notices →'}</span>
              </button>
            </div>
          </Container>
        </section>
      )}

      {/* 9. FINAL CTA: PLAN YOUR VISIT */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-[#06181f] via-[#103F4A] to-[#145466] text-white">
        <Container size="xl" className="text-center max-w-3xl space-y-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#EAF7FA] border border-white/15">
              {isHindi ? 'यात्रा की योजना बनाएं' : 'PLAN YOUR VISIT'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {isHindi ? 'क्या आप परामर्श के लिए तैयार हैं?' : 'Ready to Schedule Your Consultation?'}
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mx-auto">
              {isHindi
                ? 'कार्डियो डायबिटिक क्लिनिक में परामर्श हेतु स्लॉट बुक करें अथवा सीधे दिशा-निर्देश प्राप्त करें।'
                : 'Confirm your consultation slot with Dr. Soumya Sengupta at Cardio Diabetic Clinic, Amlatola, Chaibasa.'}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/book-appointment"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-[#103F4A] hover:bg-[#EAF7FA] shadow-md transition-all active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>{isHindi ? 'अपॉइंटमेंट बुक करें' : 'Book an Appointment'}</span>
            </Link>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all active:scale-98"
            >
              <Navigation className="w-4 h-4" />
              <span>{isHindi ? 'रास्ता देखें (Get Directions)' : 'Get Directions'}</span>
            </a>
          </div>
        </Container>
      </section>

      {/* ACCESSIBLE LIGHTBOX MODAL */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={localize(activePhoto.title)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          {galleryItems.length > 1 && (
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer hidden sm:flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next button */}
          {galleryItems.length > 1 && (
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer hidden sm:flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Modal Content */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[65vh]">
              <img
                src={activePhoto.fullUrl || activePhoto.thumbnailUrl}
                alt={localize(activePhoto.altText)}
                className="max-h-[65vh] w-auto max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = activePhoto.thumbnailUrl;
                }}
              />
            </div>

            <div className="p-4 sm:p-6 bg-slate-900 text-white border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="uppercase tracking-wider font-semibold text-[#EAF7FA]">
                  {activePhoto.category.replace('_', ' ')}
                </span>
                <span>
                  {(activeLightboxIndex ?? 0) + 1} / {galleryItems.length}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {localize(activePhoto.title)}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {localize(activePhoto.caption)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CLINIC NOTICES MODAL */}
      <ClinicNoticesModal
        isOpen={isNoticesModalOpen}
        onClose={() => setIsNoticesModalOpen(false)}
      />
    </>
  );
};
