import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Stethoscope, ArrowRight, ShieldCheck } from 'lucide-react';
import { Section } from '../common/Section';
import { Button } from '../common/Button';
import { SmartImage } from '../common/SmartImage';
import { VerificationBadge } from '../common/VerificationBadge';
import { DoctorSocialLinks } from '../doctor/DoctorSocialLinks';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { doctorService } from '../../services';

export const AboutDoctorSection: React.FC = () => {
  const { localize, isHindi, t } = useLanguage();
  const { data: doctor } = useService(() => doctorService.getProfile(), []);

  return (
    <Section
      eyebrow="Clinical Profile"
      heading="About Dr. Soumya Sengupta"
      lede="A disciplined, evidence-based approach to metabolic health that balances scientific rigor with patient-centered communication."
      containerSize="xl"
      className="bg-[#faf9f6] border-b border-slate-200/80"
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Photo & Credentials badge */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <SmartImage
              src="/assets/images/doctor-portrait.webp"
              alt="Dr. Soumya Sengupta, Consultant Diabetologist"
              aspectRatio="4/3"
              className="rounded-2xl shadow-xl border border-slate-200/90"
              fallbackSrc=""
            />
            <div className="absolute bottom-3 left-3 bg-[#06181f]/90 backdrop-blur-md border border-teal-500/30 rounded-xl px-3 py-1.5 text-white shadow-lg text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Consultant Diabetologist</span>
            </div>
          </div>
          <div className="flex justify-center lg:justify-start">
            <VerificationBadge note="Doctor portrait & clinic tenure under review" />
          </div>
        </div>

        {/* Right Column: Bio, Qualifications, Clinical Experience */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#06181f] tracking-tight">
              {doctor ? localize(doctor.name) : 'Dr. Soumya Sengupta'}
            </h3>
            <p className="text-base sm:text-lg font-semibold text-[#0f3d4a]">
              {doctor ? localize(doctor.title) : 'Consultant Diabetologist & Metabolic Physician'}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            {doctor
              ? localize(doctor.shortBio)
              : 'Dedicated to empowering patients with chronic metabolic conditions through structured education, continuous glucose monitoring (CGM), and individualized therapy regimens that protect vital organ systems.'}
          </p>

          {/* Credentials and Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#0f3d4a] font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-teal-600" />
                <span>Clinical Tenure</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                Practicing since 2007 (19+ Years in Diabetes Care) • Cardio Diabetic Clinic
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#0f3d4a] font-bold text-xs uppercase tracking-wider">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Specialisations</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                Diabetes, Hypertension, Dyslipidemia, Hypothyroidism & Organ Protection
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/about">
              <Button variant="primary" size="md">
                <span>{t('cta.learnMore')} — Full Qualifications & Experience</span>
                <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
              </Button>
            </Link>

            <Link to="/book-appointment">
              <Button variant="outline" size="md">
                <span>{t('cta.bookAppointment')}</span>
              </Button>
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isHindi ? 'सोशल मीडिया पर जुड़ें:' : 'Connect with Doctor:'}
            </span>
            <DoctorSocialLinks variant="icons" />
          </div>
        </div>
      </div>
    </Section>
  );
};
