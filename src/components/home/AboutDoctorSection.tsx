import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Stethoscope, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';
import { Section } from '../common/Section';
import { Button } from '../common/Button';
import { SmartImage } from '../common/SmartImage';
import { VerificationBadge } from '../common/VerificationBadge';
import { DoctorSocialLinks } from '../doctor/DoctorSocialLinks';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { doctorService } from '../../services';
import { CLINIC_IMAGES } from '../../config/images';
import { DOCTOR_CREDENTIALS } from '../../config/credentials';

export const AboutDoctorSection: React.FC = () => {
  const { localize, isHindi, t } = useLanguage();
  const { data: doctor } = useService(() => doctorService.getProfile(), []);

  return (
    <Section
      eyebrow="Clinical Profile"
      heading="About Dr. Soumya Sengupta"
      lede="A disciplined, evidence-based approach to metabolic health that balances scientific rigor with patient-centered communication."
      containerSize="xl"
      className="bg-gradient-to-b from-[#F8FCFD] to-[#FCFEFF] border-b border-slate-200/80 relative"
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Photo cropped to 4:5 portrait (max ~560px tall) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            {/* Subtle ambient lighting behind portrait */}
            <div
              className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#65D9D0]/20 to-[#EAF7FA]/80 blur-xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 ring-1 ring-[#103F4A]/10 max-w-[448px] max-h-[560px] mx-auto">
              <SmartImage
                src={CLINIC_IMAGES.doctorProfile}
                alt="Dr. Soumya Sengupta, Consultant Diabetologist & Metabolic Physician"
                aspectRatio="4/5"
                className="w-full h-full object-cover object-top max-h-[560px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Bio, Qualifications, Clinical Experience */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#06181f] tracking-tight">
              {doctor ? localize(doctor.name) : 'Dr. Soumya Sengupta'}
            </h3>
            <p className="text-base sm:text-lg font-semibold text-[#103F4A]">
              {doctor ? localize(doctor.title) : 'Consultant Diabetologist & Metabolic Physician'}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            {doctor
              ? localize(doctor.shortBio)
              : 'Dedicated to empowering patients with chronic metabolic conditions through structured education, continuous glucose monitoring (CGM), and individualized therapy regimens that protect vital organ systems.'}
          </p>

          {/* Credentials Row driven by DOCTOR_CREDENTIALS config */}
          <div className="p-4 rounded-xl bg-[#EAF7FA]/70 border border-[#65D9D0]/50 space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#103F4A] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#103F4A]" />
              <span>{isHindi ? 'योग्यताएं एवं पंजीकरण विवरण' : 'Qualifications & Professional Registrations'}</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-800">
              <div>
                <span className="block text-slate-500 text-[11px] font-medium">{isHindi ? 'डिग्रियां:' : 'Degrees:'}</span>
                <span className="font-semibold text-slate-900">{DOCTOR_CREDENTIALS.degrees}</span>
              </div>
              <div>
                <span className="block text-slate-500 text-[11px] font-medium">{isHindi ? 'पंजीकरण संख्या:' : 'Registration No.:'}</span>
                <span className="font-semibold font-mono text-slate-900">{DOCTOR_CREDENTIALS.registrationNumber}</span>
              </div>
              <div className="sm:col-span-1">
                <span className="block text-slate-500 text-[11px] font-medium">{isHindi ? 'सदस्यता:' : 'Memberships:'}</span>
                <span className="font-medium text-slate-700">{DOCTOR_CREDENTIALS.memberships.join(' • ')}</span>
              </div>
            </div>
          </div>

          {/* Clinical Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-white border border-slate-200/85 hover:border-[#65D9D0]/60 shadow-xs hover:shadow-sm transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-[#103F4A] font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-md bg-[#EAF7FA] flex items-center justify-center">
                  <Award className="w-3.5 h-3.5 text-[#103F4A]" />
                </div>
                <span>Clinical Tenure</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                Practicing since 2007 (19+ Years in Diabetes Care) • Cardio Diabetic Clinic
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/85 hover:border-[#65D9D0]/60 shadow-xs hover:shadow-sm transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-[#103F4A] font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-md bg-[#EAF7FA] flex items-center justify-center">
                  <Stethoscope className="w-3.5 h-3.5 text-[#103F4A]" />
                </div>
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
