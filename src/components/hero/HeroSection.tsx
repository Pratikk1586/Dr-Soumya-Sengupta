import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Calendar,
  User,
  MessageCircle,
  Activity,
  HeartPulse,
  BookOpen,
  Sparkles,
  Building2,
} from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { HeroNewsTicker } from './HeroNewsTicker';
import { HeroStaticVisual } from './HeroStaticVisual';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { doctorService } from '../../services';
import { ENV, getSafeWhatsAppHref } from '../../config/env';
import { CLINIC_IMAGES } from '../../config/images';

// Lazy-load the Anatomical Pancreas Viewer layer in its own dynamic chunk
const PancreasViewer = lazy(() => import('../pancreas/PancreasViewer'));

export const HeroSection: React.FC = () => {
  const { localize, isHindi, t } = useLanguage();
  const { data: doctor } = useService(() => doctorService.getProfile(), []);

  const whatsappHref = getSafeWhatsAppHref(
    'Hello Dr. Sengupta, I would like to inquire about consultation availability for diabetes care.'
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FCFEFF] via-[#F4FBFC] to-[#EAF7FA]/80 pt-4 pb-4 sm:pt-6 sm:pb-6 lg:pt-8 lg:pb-8">
      {/* 1. Sophisticated Ambient Lighting Glows (Palette: #103F4A, #65D9D0, #EAF7FA, #E7F8F2) */}
      {/* Soft radial aqua & deep medical teal glow behind pancreas illustration */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-[2%] lg:right-[6%] w-[380px] sm:w-[460px] lg:w-[520px] h-[380px] sm:h-[460px] lg:h-[520px] rounded-full pointer-events-none blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(101,217,208,0.22) 0%, rgba(16,63,74,0.08) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      {/* Faint cool-blue & soft mint glow behind doctor portrait and left header */}
      <div
        className="absolute top-8 left-2 sm:left-8 w-72 sm:w-88 h-72 sm:h-88 rounded-full pointer-events-none blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(234,247,250,0.7) 0%, rgba(101,217,208,0.14) 40%, rgba(231,248,242,0.2) 60%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      {/* Subtle top-center ambient diffusion */}
      <div
        className="hidden lg:block absolute -top-20 left-1/3 w-80 h-80 rounded-full pointer-events-none blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(101,217,208,0.12) 0%, rgba(234,247,250,0.4) 60%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* 2. Scientific Decorative Graphics: Molecular nodes, fine links, and orbital rings */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sci-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#65D9D0" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#103F4A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#65D9D0" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Top-left scientific molecular cluster (outside text area) */}
        <g opacity="0.4" className="hidden sm:block">
          <line x1="35" y1="25" x2="95" y2="55" stroke="url(#sci-line-grad)" strokeWidth="0.8" strokeDasharray="3 4" />
          <line x1="95" y1="55" x2="65" y2="115" stroke="url(#sci-line-grad)" strokeWidth="0.8" />
          <line x1="95" y1="55" x2="155" y2="40" stroke="url(#sci-line-grad)" strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="35" cy="25" r="2.5" fill="#65D9D0" />
          <circle cx="95" cy="55" r="3" fill="#103F4A" />
          <circle cx="65" cy="115" r="2" fill="#65D9D0" />
          <circle cx="155" cy="40" r="2.5" fill="#65D9D0" opacity="0.8" />
        </g>

        {/* Right-edge orbital ring echoes behind pancreas */}
        <g opacity="0.35" className="hidden lg:block">
          <circle cx="86%" cy="46%" r="270" stroke="#65D9D0" strokeWidth="0.75" strokeDasharray="4 8" fill="none" opacity="0.45" />
          <circle cx="86%" cy="46%" r="330" stroke="#103F4A" strokeWidth="0.5" strokeDasharray="3 6" fill="none" opacity="0.25" />
          <circle cx="calc(86% - 190px)" cy="calc(46% - 190px)" r="2.5" fill="#65D9D0" opacity="0.7" />
          <circle cx="calc(86% + 235px)" cy="calc(46% - 110px)" r="2" fill="#103F4A" opacity="0.5" />
        </g>

        {/* Bottom-left subtle metabolic connection nodes */}
        <g opacity="0.32" className="hidden md:block">
          <line x1="25" y1="90%" x2="85" y2="86%" stroke="#65D9D0" strokeWidth="0.7" strokeDasharray="3 5" />
          <line x1="85" y1="86%" x2="140" y2="92%" stroke="#65D9D0" strokeWidth="0.7" />
          <circle cx="25" cy="90%" r="2" fill="#103F4A" />
          <circle cx="85" cy="86%" r="2.5" fill="#65D9D0" />
          <circle cx="140" cy="92%" r="2" fill="#65D9D0" />
        </g>
      </svg>

      <Container size="xl" className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Instant-render text & clinical authority */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-3.5">
            {/* Top credentials pill & practicing tenure */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50/90 border border-teal-300 text-teal-950 text-xs font-bold shadow-2xs backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-800 shrink-0" aria-hidden="true" />
                <span>Practicing since 2007 (19+ Years in Diabetes Care)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-300 text-slate-800 text-xs font-bold shadow-2xs backdrop-blur-xs">
                <span>Cardio Diabetic Clinic</span>
              </span>
            </div>

            {/* Doctor Profile Header with Verified Photograph & Soft Blue Glow */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="relative shrink-0">
                {/* Faint cool-blue & aqua ambient halo */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#65D9D0]/35 to-[#EAF7FA]/90 blur-xs pointer-events-none" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-[84px] lg:h-[84px] rounded-2xl overflow-hidden ring-2 ring-[#103F4A]/25 shadow-sm bg-slate-100">
                  <img
                    src={CLINIC_IMAGES.doctorProfile}
                    alt="Dr. Soumya Sengupta — Consultant Diabetologist & Metabolic Physician"
                    className="w-full h-full object-cover object-top"
                    width={84}
                    height={84}
                    fetchPriority="high"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-extrabold text-slate-950 tracking-[-0.025em] leading-[1.2]">
                  {doctor ? localize(doctor.name) : 'Dr. Soumya Sengupta'}
                </h1>
                <p className="text-sm sm:text-base md:text-lg font-bold text-[#103F4A] mt-0.5 sm:mt-1 leading-snug tracking-tight">
                  {doctor ? localize(doctor.title) : 'Consultant Diabetologist & Metabolic Physician'}
                </p>
              </div>
            </div>

            {/* Short Clinical Introduction */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl font-normal pt-0.5">
              {doctor ? localize(doctor.shortBio) : (
                <>
                  Practicing physician since 2007 (19+ years in diabetes care) dedicated to early diabetes detection, hypertension control,
                  and protecting vital organs—Kidneys, Eyes, Nerves, Heart, and Brain—so patients can lead a normal, healthy life.
                </>
              )}
            </p>

            {/* 4 Core Specialisation Badges */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 pt-0.5 text-xs">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl bg-teal-50/90 border border-teal-300 text-teal-950 font-bold shadow-2xs">
                <Activity className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>Diabetes Care</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl bg-rose-50/90 border border-rose-300 text-rose-950 font-bold shadow-2xs">
                <HeartPulse className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                <span>Hypertension</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Dyslipidemia</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl bg-sky-50/90 border border-sky-300 text-sky-950 font-bold shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                <span>Hypothyroidism</span>
              </span>
            </div>

            {/* Action Buttons: Dominant Primary CTA + Clean Secondary Actions */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              <Link to="/book-appointment" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md font-bold px-5">
                  <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>{t('cta.bookAppointment')}</span>
                </Button>
              </Link>

              <Link to="/about" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-medium">
                  <User className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>{isHindi ? 'डॉक्टर परिचय' : 'Know Your Doctor'}</span>
                </Button>
              </Link>

              <Link to="/clinic" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-medium">
                  <Building2 className="w-4 h-4 mr-2 text-[#103F4A]" aria-hidden="true" />
                  <span>Our Clinic</span>
                </Button>
              </Link>

              {ENV.hasWhatsapp && whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 font-medium"
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-600" aria-hidden="true" />
                    <span>WhatsApp Inquiry</span>
                  </Button>
                </a>
              )}
            </div>

            {/* Live Clinic News & Notices Section */}
            <div className="pt-2 sm:pt-2.5">
              <HeroNewsTicker />
            </div>
          </div>

          {/* Right Column: Interactive 3D Pancreas Anatomy */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full flex flex-col items-center justify-center max-w-[480px] lg:max-w-[540px]">
              <Suspense fallback={<HeroStaticVisual />}>
                <PancreasViewer
                  className="w-full"
                  showCategoryTabs={false}
                  showDetailsCard={true}
                  showHotspots={true}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>

      {/* Seamless organic flowing wave section transition to next section */}
      <div className="w-full overflow-hidden leading-none z-10 pointer-events-none select-none -mb-1 mt-4 sm:mt-6">
        <svg
          className="w-full h-5 sm:h-7 md:h-9 block text-white"
          viewBox="0 0 1440 36"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0,12 C320,30 720,2 1120,22 C1260,28 1360,18 1440,14 L1440,36 L0,36 Z"
            fill="#EAF7FA"
            fillOpacity="0.5"
          />
          <path
            d="M0,20 C360,34 820,10 1200,28 C1320,34 1390,24 1440,22 L1440,36 L0,36 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
