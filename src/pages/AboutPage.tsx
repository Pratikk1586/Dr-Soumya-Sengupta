import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle,
  Shield,
  Calendar,
  Building2,
  FileCheck,
  Eye,
  Stethoscope,
  Activity,
  Users,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Share2,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { MedicalDisclaimerBanner } from '../components/common/MedicalDisclaimerBanner';
import { CertificateModal } from '../components/doctor/CertificateModal';
import { DoctorSocialLinks } from '../components/doctor/DoctorSocialLinks';
import { useLanguage } from '../context/useLanguage';
import { useService } from '../hooks/useService';
import { doctorService } from '../services';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import { CERTIFICATIONS_DATA } from '../data/certifications';
import type { DoctorCertification } from '../types';

export const AboutPage: React.FC = () => {
  const { localize, isHindi, t } = useLanguage();
  const { data: doctor } = useService(() => doctorService.getProfile(), []);
  const [selectedCertificate, setSelectedCertificate] = useState<DoctorCertification | null>(null);

  const achievements = doctor?.achievements || ACHIEVEMENTS_DATA;
  const certifications = doctor?.certifications || CERTIFICATIONS_DATA;

  return (
    <>
      <SEO
        title="About Dr. Soumya Sengupta — Diabetologist & Metabolic Physician"
        description="Comprehensive clinical biography, verified medical qualifications, 19+ years clinical experience, professional certifications, and society memberships of Dr. Soumya Sengupta."
        canonicalPath="/about"
      />

      {/* Header Banner */}
      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: isHindi ? 'डॉक्टर परिचय' : 'Know Your Doctor' }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f3d4a]/10 text-[#0f3d4a] text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-[#0f3d4a]" />
              {isHindi ? 'वरिष्ठ चिकित्सक परिचय एवं साख' : 'Physician Profile & Credentials'}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#06181f] tracking-tight">
              {doctor ? localize(doctor.name) : 'Dr. Soumya Sengupta'}
            </h1>
            <p className="text-base sm:text-xl text-[#0f3d4a] font-semibold">
              {doctor ? localize(doctor.title) : 'Consultant Diabetologist & Metabolic Physician'}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium pt-1">
              {doctor ? localize(doctor.tagline) : 'Practicing Since 2007 • Cardio Diabetic Clinic • Comprehensive Metabolic Health'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 sm:py-16 space-y-20">
        <MedicalDisclaimerBanner />

        {/* =========================================================================
            SECTION 1: PRIMARY PROFILE HERO (#overview)
            ========================================================================= */}
        <section id="overview" className="scroll-mt-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Portrait Treatment & Clinical Factsheet */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl bg-gradient-to-b from-[#0f3d4a] to-[#08222a] p-1.5 shadow-xl">
                <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-4/3 sm:aspect-square flex flex-col items-center justify-center text-center p-6 border border-white/20">
                  {/* Doctor Portrait Image with Graceful Monogram Fallback */}
                  <img
                    src="/assets/images/doctor-portrait.webp"
                    alt="Dr. Soumya Sengupta, Consultant Diabetologist"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Elegant Fallback Avatar Seal */}
                  <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0f3d4a] to-[#185363] text-white flex items-center justify-center shadow-lg border border-teal-300/30">
                      <Stethoscope className="w-10 h-10 text-[#dff0f4]" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 text-lg block">
                        Dr. Soumya Sengupta
                      </span>
                      <span className="text-xs text-slate-600 font-medium block">
                        Cardio Diabetic Clinic, Chaibasa
                      </span>
                    </div>
                  </div>

                  {/* Floating Experience Badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#06181f]/90 backdrop-blur-md border border-teal-500/30 rounded-xl px-3.5 py-2 text-white shadow-lg text-xs flex items-center justify-between z-20">
                    <span className="flex items-center gap-1.5 font-semibold text-teal-300">
                      <Clock className="w-3.5 h-3.5 text-teal-400" />
                      {isHindi ? '2007 से अभ्यास (डायबिटीज केयर में 19+ वर्ष)' : 'Practicing since 2007 (19+ Years in Diabetes Care)'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-300">Since 2007</span>
                  </div>
                </div>
              </div>

              {/* Physician Quick Facts Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3.5 shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {isHindi ? 'पंजीकरण एवं अभ्यास' : 'Registration & Credentials'}
                  </span>
                  <VerificationBadge />
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-slate-500 flex items-center gap-1.5 shrink-0">
                      <FileCheck className="w-3.5 h-3.5 text-[#0f3d4a]" />
                      {isHindi ? 'पंजीकरण:' : 'Medical Registry:'}
                    </span>
                    <span className="font-semibold text-slate-900 text-right font-mono text-xs">
                      {doctor?.registrationNumber}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <span className="text-slate-500 flex items-center gap-1.5 shrink-0">
                      <Building2 className="w-3.5 h-3.5 text-[#0f3d4a]" />
                      {isHindi ? 'प्रमुख क्लिनिक:' : 'Chamber Location:'}
                    </span>
                    <span className="font-semibold text-slate-900 text-right text-xs">
                      Cardio Diabetic Clinic, Chaibasa, Jharkhand
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <span className="text-slate-500 flex items-center gap-1.5 shrink-0">
                      <Users className="w-3.5 h-3.5 text-[#0f3d4a]" />
                      {isHindi ? 'भाषाएं:' : 'Languages Spoken:'}
                    </span>
                    <span className="font-semibold text-slate-900 text-right text-xs">
                      {doctor?.languagesSpoken.map((l) => localize(l)).join(', ')}
                    </span>
                  </div>

                  {/* Quick Social Connect in Facts Card */}
                  <div className="pt-2.5 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      {isHindi ? 'ऑनलाइन प्रोफाइल एवं सोशल मीडिया:' : 'Follow & Connect Online:'}
                    </span>
                    <DoctorSocialLinks variant="icons" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative, Mission, and Core Competencies */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0f3d4a] block">
                  {isHindi ? 'डॉ. सौम्य सेनगुप्ता का परिचय' : 'About Dr. Soumya Sengupta'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {isHindi
                    ? 'मधुमेह एवं मेटाबोलिक विकारों में विशेषज्ञ नैदानिक मार्गदर्शन'
                    : 'Dedicated Diabetology & Multi-Organ Protection Since 2007'}
                </h2>
              </div>

              {/* Short Bio Highlight Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                {doctor ? localize(doctor.shortBio) : ''}
              </div>

              {/* Narrative Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {doctor?.fullBio.map((paragraph, index) => (
                  <p key={index}>{localize(paragraph)}</p>
                ))}
              </div>

              {/* Key Practice Highlights Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-0.5">
                  <span className="block text-lg sm:text-xl font-bold text-[#0f3d4a]">19+ Yrs</span>
                  <span className="block text-[11px] text-slate-600 font-medium">
                    {isHindi ? 'डायबिटीज केयर में' : 'In Diabetes Care'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-0.5">
                  <span className="block text-lg sm:text-xl font-bold text-[#0f3d4a]">2007</span>
                  <span className="block text-[11px] text-slate-600 font-medium">
                    {isHindi ? 'क्लिनिक स्थापना वर्ष' : 'Established Practice'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-0.5 col-span-2 sm:col-span-1">
                  <span className="block text-lg sm:text-xl font-bold text-[#0f3d4a]">Chaibasa</span>
                  <span className="block text-[11px] text-slate-600 font-medium">
                    {isHindi ? 'पश्चिमी सिंहभूम, झारखंड' : 'West Singhbhum, JH'}
                  </span>
                </div>
              </div>

              {/* Quick Profile Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/book-appointment">
                  <Button variant="primary" size="md" className="shadow-xs">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    <span>{t('cta.bookAppointment')}</span>
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="md">
                    <span>{isHindi ? 'क्लिनिक संपर्क विवरण' : 'Contact Clinic'}</span>
                  </Button>
                </Link>
                <a href="#social-media">
                  <Button variant="ghost" size="md" className="text-slate-600 hover:text-[#0f3d4a]">
                    <Share2 className="w-4 h-4 mr-1.5 text-teal-600" />
                    <span>{isHindi ? 'सोशल मीडिया' : 'Social Channels'}</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: QUALIFICATIONS (#qualifications)
            ========================================================================= */}
        <section id="qualifications" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0f3d4a]/10 text-[#0f3d4a] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#0f3d4a]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {isHindi ? 'चिकित्सीय योग्यताएं एवं डिग्रियां' : 'Medical Degrees & Qualifications'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isHindi ? 'सत्यापित शैक्षणिक पृष्ठभूमि एवं विशेष चिकित्सा प्रशिक्षण' : 'Verified academic background & specialist medical curriculum'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {doctor?.qualifications.map((q) => (
              <div
                key={q.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#0f3d4a]/40 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-[#0f3d4a] text-xs font-bold border border-teal-200/60 font-mono">
                    {q.year || '2007'}
                  </span>
                  <VerificationBadge />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                    {localize(q.degree)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{localize(q.institution)}</span>
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Conferred: {q.year}</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified Credential
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: PROFESSIONAL EXPERIENCE (#experience)
            ========================================================================= */}
        <section id="experience" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0f3d4a]/10 text-[#0f3d4a] flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#0f3d4a]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {isHindi ? 'व्यावसायिक एवं क्लिनिकल अनुभव' : 'Professional & Clinical Experience'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isHindi ? '2007 से समर्पित चिकित्सा सेवा (डायबिटीज केयर में 19+ वर्ष)' : 'Practicing since 2007 (19+ Years in Diabetes Care)'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {doctor?.experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                      {localize(exp.role)}
                    </h3>
                    <VerificationBadge />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{localize(exp.organization)}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-[#0f3d4a] bg-[#dff0f4] px-3 py-1.5 rounded-xl border border-teal-200/80">
                    {localize(exp.period)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: AREAS OF EXPERTISE (#expertise)
            ========================================================================= */}
        <section id="expertise" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0f3d4a]/10 text-[#0f3d4a] flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#0f3d4a]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {isHindi ? 'विशेषज्ञता एवं नैदानिक फोकस' : 'Areas of Clinical Expertise'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isHindi ? 'मधुमेह एवं मेटाबोलिक विकारों के समग्र समाधान' : 'Specialized management across metabolic, endocrine, and organ preservation care'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctor?.specialties.map((spec, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-[#0f3d4a]/40 text-slate-800 flex items-start gap-3 shadow-2xs transition-colors"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#0f3d4a] mt-1.5 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold leading-snug">
                  {localize(spec)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: ACHIEVEMENTS & RECOGNITIONS (#achievements) [DEDICATED SECTION]
            ========================================================================= */}
        <section id="achievements" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {isHindi ? 'उपलब्धियां एवं नैदानिक सम्मान' : 'Achievements & Recognitions'}
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    Milestones
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {isHindi ? 'सामुदायिक स्वास्थ्य एवं मधुमेह देखभाल में विशिष्ट योगदान' : 'Key milestones in regional community health, screening, and chronic disease care'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white to-amber-50/20 border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-amber-700" />
                    </span>
                    {ach.year && (
                      <span className="text-[11px] font-mono font-bold text-slate-500 px-2 py-0.5 rounded-md bg-slate-100">
                        {ach.year}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {localize(ach.title)}
                  </h3>
                  <p className="text-xs font-medium text-[#0f3d4a]">
                    {localize(ach.organization)}
                  </p>
                  {ach.description && (
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {localize(ach.description)}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100/80 flex items-center gap-1.5 text-[11px] text-amber-800 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Clinical Community Milestone</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: CERTIFICATIONS & PROFESSIONAL TRAINING (#certifications) [WITH LIGHTBOX]
            ========================================================================= */}
        <section id="certifications" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-700 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {isHindi ? 'प्रमाणन एवं विशेष प्रशिक्षण' : 'Certifications & Professional Training'}
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {isHindi ? 'सत्यापित चिकित्सकीय प्रमाण पत्र एवं तकनीकी प्रशिक्षण' : 'Verified credentials in cardio-diabetic medicine, ambulatory glucose profiling, and clinical management'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-400/60 hover:shadow-xs transition-all space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-[#0f3d4a]/10 text-[#0f3d4a] flex items-center justify-center group-hover:bg-[#0f3d4a] group-hover:text-white transition-colors">
                      <Award className="w-5 h-5" />
                    </span>
                    {cert.year && (
                      <span className="text-[11px] font-mono font-bold text-slate-600 px-2 py-0.5 rounded-md bg-slate-100">
                        {cert.year}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#0f3d4a] transition-colors">
                      {localize(cert.title)}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      {localize(cert.organization)}
                    </p>
                  </div>

                  {cert.description && (
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {localize(cert.description)}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-slate-500 truncate">
                    {cert.credentialId || 'CRED-VERIFIED'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(cert)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0f3d4a] hover:bg-teal-50 border border-teal-200 transition-colors cursor-pointer shrink-0"
                    title={isHindi ? 'प्रमाण पत्र देखें' : 'View Certificate'}
                  >
                    <Eye className="w-3.5 h-3.5 text-teal-600" />
                    <span>{isHindi ? 'प्रमाणन देखें' : 'View Certificate'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: MEMBERSHIPS (#memberships)
            ========================================================================= */}
        <section id="memberships" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0f3d4a]/10 text-[#0f3d4a] flex items-center justify-center">
                <Award className="w-5 h-5 text-[#0f3d4a]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {isHindi ? 'व्यावसायिक सदस्यताएं एवं संस्थागत संबद्धताएं' : 'Professional Memberships & Affiliations'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isHindi ? 'राष्ट्रीय एवं अंतरराष्ट्रीय डायबिटोलॉजी अकादमियों की सक्रिय सदस्यता' : 'Active memberships in premier national medical and diabetes research bodies'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctor?.memberships.map((m, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between gap-3 text-xs font-medium text-slate-800 shadow-2xs"
              >
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-[#0f3d4a] shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-900 text-sm leading-snug">
                    {localize(m)}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">Affiliation</span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                    Active Member
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: CLINICAL PHILOSOPHY / CARE BEYOND THE DIAGNOSIS
            ========================================================================= */}
        <section id="philosophy" className="scroll-mt-28 space-y-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0f3d4a] via-[#0d343f] to-[#08222a] text-white shadow-xl space-y-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                {isHindi ? 'उपचार दर्शन एवं दृष्टिकोण' : 'Care Beyond the Diagnosis'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isHindi ? 'शुरुआती पहचान द्वारा अंगों की सुरक्षा' : 'Early Glycemic Control & Multi-Organ Protection'}
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-teal-50 text-base sm:text-lg italic font-serif leading-relaxed">
              "{doctor ? localize(doctor.clinicalPhilosophy) : ''}"
            </div>

            {/* 4 Pillars of Organ Health */}
            <div className="pt-4 border-t border-white/15">
              <span className="text-xs uppercase tracking-wider text-teal-300 font-bold block mb-4">
                {isHindi ? 'अंग सुरक्षा के 4 मुख्य स्तंभ:' : 'Four Pillars of Organ Preservation:'}
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-white block">Kidney Shield</span>
                  <span className="text-teal-200 text-[11px] leading-tight block">
                    Routine uACR & eGFR renal protection
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-white block">Retinal Guard</span>
                  <span className="text-teal-200 text-[11px] leading-tight block">
                    Microvascular eye & vision preservation
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-white block">Nerve Defense</span>
                  <span className="text-teal-200 text-[11px] leading-tight block">
                    Peripheral neuropathy & sensory checks
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-white block">Cardio Harmony</span>
                  <span className="text-teal-200 text-[11px] leading-tight block">
                    Blood pressure & lipid optimization
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8B: SOCIAL MEDIA & DIGITAL CHANNELS (#social-media)
            ========================================================================= */}
        <section id="social-media" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-[#0f3d4a] flex items-center justify-center">
                <Share2 className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {isHindi ? 'सोशल मीडिया एवं डिजिटल चैनल' : 'Connect & Follow Dr. Sengupta'}
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-[#0f3d4a]">
                    Verified Profiles
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {isHindi
                    ? 'मधुमेह जागरूकता, स्वास्थ्य वार्ता और क्लिनिक अपडेट के लिए आधिकारिक प्लेटफॉर्म पर जुड़ें'
                    : 'Verified patient education videos, daily blood sugar guidance, community health camp updates, and chamber inquiry channels'}
                </p>
              </div>
            </div>
          </div>

          <DoctorSocialLinks variant="cards" />
        </section>

        {/* =========================================================================
            SECTION 9: CONSULTATION CTA
            ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0f3d4a]">
              {isHindi ? 'अगला कदम उठाएं' : 'Ready to Take the Next Step?'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isHindi ? 'डॉ. सौम्य सेनगुप्ता से परामर्श हेतु समय आरक्षित करें' : 'Schedule a Consultation with Dr. Soumya Sengupta'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {isHindi
                ? 'कार्डियो डायबिटिक क्लिनिक, चाईबासा में व्यापक जांच एवं व्यक्तिगत ग्लूकोज प्रबंधन हेतु अपॉइंटमेंट बुक करें।'
                : 'Prior appointment booking ensures dedicated consultation time for lab report analysis, CGM interpretation, and comprehensive metabolic assessment.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link to="/book-appointment">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{t('cta.bookAppointment')}</span>
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Phone className="w-4 h-4 mr-2" />
                <span>{isHindi ? 'क्लिनिक विवरण' : 'Contact Clinic'}</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Certificate Lightbox Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </>
  );
};
