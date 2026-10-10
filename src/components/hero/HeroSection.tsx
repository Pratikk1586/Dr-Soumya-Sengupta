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

// Lazy-load the 3D Interactive Pancreas layer in its own dynamic chunk
const AnimatedPancreas = lazy(() => import('../pancreas/AnimatedPancreas'));

export const HeroSection: React.FC = () => {
  const { localize, isHindi, t } = useLanguage();
  const { data: doctor } = useService(() => doctorService.getProfile(), []);

  const whatsappHref = getSafeWhatsAppHref(
    'Hello Dr. Sengupta, I would like to inquire about consultation availability for diabetes care.'
  );

  return (
    <section className="relative overflow-hidden bg-white lg:bg-gradient-to-b lg:from-[#f0f9fa]/40 lg:via-white lg:to-[#f8fafc]/50 pt-6 pb-12 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-slate-200/80">
      {/* Background ambient medical glow (Web/Desktop view only) */}
      <div className="hidden lg:block absolute top-0 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-teal-100/25 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden lg:block absolute -top-10 -left-10 w-60 h-60 bg-sky-50/30 rounded-full blur-3xl pointer-events-none" />

      <Container size="xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Instant-render text & clinical authority */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Top credentials pill & practicing tenure */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-300 text-teal-950 text-xs font-bold shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-800 shrink-0" aria-hidden="true" />
                <span>Practicing since 2007 (19+ Years in Diabetes Care)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold shadow-2xs">
                <span>Cardio Diabetic Clinic</span>
              </span>
            </div>

            {/* Doctor Name & Designation */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-[-0.03em] leading-[1.15]">
                {doctor ? localize(doctor.name) : 'Dr. Soumya Sengupta'}
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#0a3542] mt-2 sm:mt-2.5 leading-snug tracking-[-0.01em]">
                {doctor ? localize(doctor.title) : 'Consultant Diabetologist & Metabolic Physician'}
              </p>
            </div>

            {/* Short Clinical Introduction */}
            <p className="text-sm sm:text-base md:text-[17px] text-slate-800 leading-relaxed max-w-2xl font-medium">
              {doctor ? localize(doctor.shortBio) : (
                <>
                  Practicing physician since 2007 (19+ years in diabetes care) dedicated to early diabetes detection, hypertension control,
                  and protecting vital organs—Kidneys, Eyes, Nerves, Heart, and Brain—so patients can lead a normal, healthy life.
                </>
              )}
            </p>

            {/* 4 Core Specialisation Badges */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 pt-1 text-xs">
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-50/90 border border-teal-300 text-teal-950 font-bold shadow-2xs">
                <Activity className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>Diabetes Care</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-50/90 border border-rose-300 text-rose-950 font-bold shadow-2xs">
                <HeartPulse className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                <span>Hypertension</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Dyslipidemia</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-50/90 border border-sky-300 text-sky-950 font-bold shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                <span>Hypothyroidism</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link to="/book-appointment" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                  <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>{t('cta.bookAppointment')}</span>
                </Button>
              </Link>

              <Link to="/about" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <User className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>{isHindi ? 'डॉक्टर परिचय' : 'Know Your Doctor'}</span>
                </Button>
              </Link>

              <Link to="/clinic" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Building2 className="w-4 h-4 mr-2 text-[#0f3d4a]" aria-hidden="true" />
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
                    className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-600" aria-hidden="true" />
                    <span>WhatsApp Inquiry</span>
                  </Button>
                </a>
              )}
            </div>

            {/* Live Clinic News & Notices Section */}
            <div className="pt-2">
              <HeroNewsTicker />
            </div>
          </div>

          {/* Right Column: Interactive 3D Pancreas Anatomy */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full flex flex-col items-center justify-center max-w-[480px] lg:max-w-[540px]">
              <Suspense fallback={<HeroStaticVisual />}>
                <AnimatedPancreas
                  className="w-full"
                  showCategoryTabs={false}
                  showDetailsCard={true}
                  showHotspots={true}
                  showMedicalBadges={false}
                  enableParallax={false}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
