import React, { Suspense, lazy, useState, useEffect } from 'react';
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
} from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { VerificationBadge } from '../common/VerificationBadge';
import { MedicalDisclaimerBanner } from '../common/MedicalDisclaimerBanner';
import { HeroStaticVisual } from './HeroStaticVisual';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { doctorService } from '../../services';
import { ENV, getSafeWhatsAppHref } from '../../config/env';

// Lazy-load the 3D Canvas layer in its own dynamic chunk
const PancreasHero3D = lazy(() => import('./PancreasHero3D'));

export const HeroSection: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: doctor } = useService(() => doctorService.getProfile(), []);
  const [canLoad3D, setCanLoad3D] = useState(false);

  // Progressive enhancement: Allow instant paint of HTML + SVG LCP, then mount 3D chunk
  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // Keep pure static visual for users preferring reduced motion
    }

    // Schedule 3D chunk loading after main thread idle or minimal delay
    if ('requestIdleCallback' in window) {
      const handle = (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(
        () => setCanLoad3D(true)
      );
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(() => setCanLoad3D(true), 200);
      return () => clearTimeout(timer);
    }
  }, []);

  const whatsappHref = getSafeWhatsAppHref(
    'Hello Dr. Sengupta, I would like to inquire about consultation availability for diabetes care.'
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e3f2f5]/60 via-[#faf9f6] to-[#faf9f6] pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-slate-200/70">
      {/* Background ambient medical glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

      <Container size="xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Instant-render text & clinical authority */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Top credentials pill & verification notice */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="md">
                <ShieldCheck className="w-4 h-4 mr-1 text-[#0f3d4a]" aria-hidden="true" />
                <span>Consultant Diabetologist</span>
              </Badge>
              <VerificationBadge note="Tenure & Credentials under doctor review" />
            </div>

            {/* Doctor Name & Designation */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06181f] tracking-tight leading-tight">
                {doctor ? localize(doctor.name) : 'Dr. Soumya Sengupta'}
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#0f3d4a] mt-1.5 leading-snug">
                {doctor ? localize(doctor.title) : 'Consultant Diabetologist & Metabolic Physician'}
              </p>
            </div>

            {/* Short Clinical Introduction (Clearly flagged where unverified) */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl font-normal">
              {doctor ? localize(doctor.shortBio) : (
                <>
                  Dedicated to evidence-based diabetes management, Continuous Glucose Monitoring (CGM) analytics,
                  and cardiometabolic organ protection for sustainable, long-term health.
                </>
              )}
            </p>

            {/* 4 Core Pillars Badges */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200/70 text-[#0f3d4a] font-medium">
                <Activity className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Diabetes Care</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200/70 text-[#0f3d4a] font-medium">
                <HeartPulse className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Metabolic Health</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200/70 text-amber-900 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Patient Education</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200/70 text-blue-900 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Personalised Care</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link to="/book-appointment">
                <Button variant="primary" size="lg" className="shadow-md">
                  <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>{t('cta.bookAppointment')}</span>
                </Button>
              </Link>

              <Link to="/about">
                <Button variant="outline" size="lg">
                  <User className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>About Dr. Sengupta</span>
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

            {/* Universal Medical Disclaimer Banner */}
            <div className="pt-2">
              <MedicalDisclaimerBanner />
            </div>
          </div>

          {/* Right Column: Progressive 3D / Immediate LCP Container */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[480px] lg:max-w-[540px]">
              {/* Immediate LCP Layer: Crisp SVG/CSS visual */}
              <div className={canLoad3D ? 'hidden' : 'block'}>
                <HeroStaticVisual />
              </div>

              {/* Lazy 3D Layer: Only mounted when idle / progressive */}
              {canLoad3D && (
                <Suspense fallback={<HeroStaticVisual />}>
                  <PancreasHero3D />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
