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
      className="bg-[#F7FAFA] border-b border-[#D7E5E6] relative py-10 sm:py-14"
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Photo cropped to 4:5 portrait (max ~560px tall) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            {/* Subtle radial teal glow behind portrait */}
            <div
              className="absolute -inset-3 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(14,90,107,0.18)_0%,rgba(232,245,244,0.6)_60%,transparent_100%)] blur-xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(11,46,58,0.12)] border border-[#D7E5E6] ring-2 ring-[#0E5A6B]/30 max-w-[448px] max-h-[560px] mx-auto bg-white">
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
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B2B34] tracking-tight">
              {doctor ? localize(doctor.name) : 'Dr. Soumya Sengupta'}
            </h3>
            <p className="text-base sm:text-lg font-semibold text-[#0E5A6B]">
              {doctor ? localize(doctor.title) : 'Consultant Diabetologist & Metabolic Physician'}
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#4F6470] leading-relaxed font-normal">
            {doctor
              ? localize(doctor.shortBio)
              : 'Dedicated to empowering patients with chronic metabolic conditions through structured education, continuous glucose monitoring (CGM), and individualized therapy regimens that protect vital organ systems.'}
          </p>

          {/* Credentials Row driven by DOCTOR_CREDENTIALS config */}
          <div className="p-4 rounded-xl bg-[#E8F5F4] border border-[#D7E5E6] space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#0E5A6B] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#0E5A6B]" />
              <span>{isHindi ? 'योग्यताएं एवं पंजीकरण विवरण' : 'Qualifications & Professional Registrations'}</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-xs text-[#1B2B34]">
              <div>
                <span className="block text-[#4F6470] text-[11px] font-medium">{isHindi ? 'डिग्रियां:' : 'Degrees:'}</span>
                <span className="font-semibold text-[#1B2B34]">{DOCTOR_CREDENTIALS.degrees}</span>
              </div>
              <div>
                <span className="block text-[#4F6470] text-[11px] font-medium">{isHindi ? 'पंजीकरण संख्या:' : 'Registration No.:'}</span>
                <span className="font-semibold font-mono text-[#1B2B34]">{DOCTOR_CREDENTIALS.registrationNumber}</span>
              </div>
              <div className="sm:col-span-1">
                <span className="block text-[#4F6470] text-[11px] font-medium">{isHindi ? 'सदस्यता:' : 'Memberships:'}</span>
                <span className="font-medium text-[#4F6470]">{DOCTOR_CREDENTIALS.memberships.join(' • ')}</span>
              </div>
            </div>
          </div>

          {/* Clinical Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-white border border-[#D7E5E6] hover:border-[#0E5A6B]/50 shadow-xs hover:shadow-sm transition-all space-y-1.5 group">
              <div className="flex items-center gap-2 text-[#0E5A6B] font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-md bg-[#E8F5F4] border border-[#D7E5E6] flex items-center justify-center group-hover:bg-[#0E5A6B] group-hover:text-white transition-colors">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span>Clinical Tenure</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1B2B34] font-medium">
                Practicing since 2007 (19+ Years in Diabetes Care) • Cardio Diabetic Clinic
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#D7E5E6] hover:border-[#0E5A6B]/50 shadow-xs hover:shadow-sm transition-all space-y-1.5 group">
              <div className="flex items-center gap-2 text-[#0E5A6B] font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-md bg-[#E8F5F4] border border-[#D7E5E6] flex items-center justify-center group-hover:bg-[#0E5A6B] group-hover:text-white transition-colors">
                  <Stethoscope className="w-3.5 h-3.5" />
                </div>
                <span>Specialisations</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1B2B34] font-medium">
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
