import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
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
  MapPin,
  Phone,
  Sparkles,
  Share2,
  Heart,
  HeartPulse,
  Droplet,
  BarChart3,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Quote,
  Home,
  ChevronRight,
  User,
  FileText,
  Sprout,
  ClipboardList,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { CertificateModal } from '../components/doctor/CertificateModal';
import { DoctorSocialLinks } from '../components/doctor/DoctorSocialLinks';
import { useLanguage } from '../context/useLanguage';
import { useService } from '../hooks/useService';
import { doctorService } from '../services';
import { CLINIC_IMAGES } from '../config/images';
import type { DoctorCertification } from '../types';

// Custom Kidney Organ Icon
const KidneyIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1 4 2 5.5s1 2.5 0 4.5c-.8 1.5-.5 3 1.5 3.8 2.5 1 5 .2 6.5-1.3C18 18 18 14 18 10c0-4.5-2.5-8-6-8z" />
  </svg>
);

export const AboutPage: React.FC = () => {
  const { localize, isHindi, t } = useLanguage();
  const { data: doctor } = useService(() => doctorService.getProfile(), []);
  const [selectedCertificate, setSelectedCertificate] = useState<DoctorCertification | null>(null);

  const achievements = doctor?.achievements || [];
  const certifications = doctor?.certifications || [];

  // 6 Areas of Clinical Expertise
  const clinicalExpertise = [
    {
      icon: Droplet,
      title: { en: 'Diabetes Management', hi: 'मधुमेह प्रबंधन' },
      description: {
        en: 'Type 1, Type 2 and gestational diabetes care.',
        hi: 'टाइप 1, टाइप 2 एवं गर्भकालीन मधुमेह की विशेष देखभाल।',
      },
    },
    {
      icon: HeartPulse,
      title: { en: 'Hypertension & Cardiovascular Risk', hi: 'उच्च रक्तचाप एवं हृदय जोखिम' },
      description: {
        en: 'Blood pressure management and cardiovascular risk reduction.',
        hi: 'रक्तचाप संतुलन और हृदय संबंधी जटिलताओं की रोकथाम।',
      },
    },
    {
      icon: BarChart3,
      title: { en: 'Dyslipidemia & Lipid Management', hi: 'डिस्लिपिडेमिया एवं लिपिड संतुलन' },
      description: {
        en: 'Cholesterol and lipid profile optimization.',
        hi: 'कोलेस्ट्रॉल और ट्राइग्लिसराइड्स का व्यवस्थित नियंत्रण।',
      },
    },
    {
      icon: Activity,
      title: { en: 'Thyroid Disorders', hi: 'थायराइड विकार' },
      description: {
        en: 'Diagnosis and management of hypothyroidism, hyperthyroidism and related conditions.',
        hi: 'हाइपोथायरायडिज्म और हाइपरथायरायडिज्म का सटीक निदान व उपचार।',
      },
    },
    {
      icon: ShieldCheck,
      title: { en: 'Kidney & Organ Protection', hi: 'किडनी एवं अंग सुरक्षा' },
      description: {
        en: 'Preventing and managing diabetes-related kidney, eye, nerve, heart and brain complications.',
        hi: 'गुर्दे, आंखें, नसें, हृदय और मस्तिष्क की सुरक्षा व शुरुआती प्रबंधन।',
      },
    },
    {
      icon: UserCheck,
      title: { en: 'Lifestyle & Metabolic Health', hi: 'जीवनशैली एवं मेटाबोलिक स्वास्थ्य' },
      description: {
        en: 'Weight management, nutrition guidance and holistic metabolic care.',
        hi: 'वजन प्रबंधन, पोषण मार्गदर्शन और समग्र मेटाबोलिक स्वास्थ्य सुधार।',
      },
    },
  ];

  // Professional Timeline Milestones
  const timelineMilestones = [
    {
      icon: GraduationCap,
      year: '2007',
      title: { en: 'Began Clinical Practice', hi: 'क्लिनिकल अभ्यास प्रारंभ' },
      description: {
        en: 'Started dedicated diabetes and metabolic care practice.',
        hi: 'समर्पित मधुमेह एवं मेटाबोलिक स्वास्थ्य देखभाल का शुभारंभ।',
      },
    },
    {
      icon: Building2,
      year: '2007 – Present',
      title: { en: 'Cardio Diabetic Clinic, Chaibasa', hi: 'कार्डियो डायबिटिक क्लिनिक, चाईबासा' },
      description: {
        en: 'Established and leading clinical practice.',
        hi: 'संस्थापक एवं प्रमुख चिकित्सक के रूप में सतत संचालन।',
      },
    },
    {
      icon: Users,
      year: isHindi ? 'क्लिनिकल अनुभव' : 'Clinical Practice',
      title: { en: 'Community Screening', hi: 'सामुदायिक जांच शिविर' },
      description: {
        en: 'Organized multi-specialty screening camps for early detection and awareness.',
        hi: 'शीघ्र पहचान और जन-जागरूकता हेतु निरंतर निःशुल्क जांच शिविर।',
      },
    },
    {
      icon: Heart,
      year: isHindi ? 'निरंतर' : 'Ongoing',
      title: { en: 'Patient Education & Advocacy', hi: 'रोगी शिक्षा एवं स्वास्थ्य मार्गदर्शन' },
      description: {
        en: 'Focused on lifestyle modification, prevention and long-term metabolic health.',
        hi: 'जीवनशैली सुधार, रोकथाम और दीर्घकालिक स्वास्थ्य पर केंद्रित मार्गदर्शन।',
      },
    },
  ];

  return (
    <div className="bg-[#FAF8F2] min-h-screen text-[#1B2A26]">
      <SEO
        title="Know Your Doctor — Dr. Soumya Sengupta | Diabetologist & Metabolic Physician"
        description="Learn about Dr. Soumya Sengupta, Consultant Diabetologist with 19+ years in diabetes care at Cardio Diabetic Clinic, Chaibasa. Verified credentials, clinical timeline, and multi-organ protection."
        canonicalPath="/about"
      />

      {/* =========================================================================
          SECTION 1: HERO SECTION — EXACT RECREATION OF "MEET YOUR DOCTOR"
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[#FAF8F0] pt-5 sm:pt-7 lg:pt-8 pb-8 sm:pb-10 lg:pb-12 border-b border-[#EBE6DA]/80">
        {/* Background Decorative Layer 1: Left Botanical Foliage */}
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-20 xl:w-24 2xl:w-28 pointer-events-none select-none z-0 opacity-85">
          <img
            src="/images/botanical-foliage-left.png"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Background Decorative Layer 2: Lower-Right Stethoscope Platter & Foliage (Seamlessly Isolated) */}
        <div className="hidden lg:block absolute right-0 bottom-0 w-[290px] xl:w-[330px] 2xl:w-[360px] pointer-events-none select-none z-0 opacity-95">
          <img
            src="/images/hero_stethoscope_seamless.png"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Background Decorative Layer 3: Organic Sage Waves & Gold Orbital Rings */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          <svg
            className="absolute right-0 top-0 w-full h-full"
            viewBox="0 0 1440 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Defs for gradients & filters */}
            <defs>
              {/* Organic Soft Sage Background Gradients */}
              <linearGradient id="sageBlobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D8ECE0" stopOpacity="0.88" />
                <stop offset="45%" stopColor="#E8F4EC" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D0E6D8" stopOpacity="0.65" />
              </linearGradient>
              <linearGradient id="softMintGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E4F2E8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FAF8F0" stopOpacity="0" />
              </linearGradient>

              {/* Champagne Gold Ring Gradient */}
              <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DFCA9B" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#F2E6C6" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#D5BE86" stopOpacity="0.75" />
              </linearGradient>
            </defs>

            {/* Layer A: Organic Soft Sage Background Wave behind Doctor */}
            <path
              d="M680 0 C790 35, 900 55, 1070 25 C1240 -5, 1360 70, 1440 130 L1440 500 L820 500 C770 420, 720 340, 700 250 C680 150, 650 70, 680 0 Z"
              fill="url(#sageBlobGrad)"
            />
            <path
              d="M770 50 C890 70, 1030 100, 1160 75 C1290 45, 1380 110, 1440 170 L1440 500 L910 500 C860 380, 820 250, 770 170 Z"
              fill="url(#softMintGrad)"
            />

            {/* Layer B: Center Champagne Gold Orbital Ring (sweeps up from left, loops over doctor) */}
            <path
              d="M 680 340 C 660 210, 740 85, 910 40 C 1080 0, 1220 70, 1260 220 C 1280 310, 1210 410, 1100 450"
              stroke="url(#goldRingGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            {/* Layer C: Outer Champagne Gold Orbital Ring (sweeps behind quote card) */}
            <path
              d="M 760 90 C 930 25, 1160 35, 1310 115 C 1410 170, 1440 280, 1440 380"
              stroke="url(#goldRingGrad)"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            <ellipse
              cx="1190"
              cy="345"
              rx="210"
              ry="135"
              stroke="url(#goldRingGrad)"
              strokeWidth="1.2"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Foreground Content Container */}
        <Container size="xl" className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-start gap-8 lg:gap-2 xl:gap-4 min-h-[460px]">
            {/* =================================================================
                LEFT ZONE: DOCTOR INTRODUCTION
                ================================================================= */}
            <div className="w-full lg:w-[480px] xl:w-[515px] space-y-3.5 sm:space-y-4 shrink-0">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-1.5 text-xs text-[#5F6D66] font-medium">
                <Home className="w-3.5 h-3.5 text-[#8C6418]" />
                <Link to="/" className="hover:text-[#0F5C4A] transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3 h-3 text-[#A8A29E]" />
                <span className="text-[#0E3326] font-semibold">
                  {isHindi ? 'डॉक्टर परिचय' : 'Know Your Doctor'}
                </span>
              </div>

              {/* Professional Designation Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EEDB] border border-[#E8D4A7] text-[#8C6418] text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider shadow-2xs">
                <div className="w-4 h-4 rounded-full bg-[#E5D5A5] flex items-center justify-center text-[#176F5B] shrink-0">
                  <User className="w-2.5 h-2.5 text-[#176F5B]" />
                </div>
                <span>CONSULTANT DIABETOLOGIST &amp; METABOLIC PHYSICIAN</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[45px] xl:text-[50px] font-serif font-bold text-[#0E3326] tracking-tight leading-[1.08]">
                Dr. Soumya Sengupta
              </h1>

              {/* Specialty Headline (Wrapped into two balanced lines as in reference) */}
              <h2 className="text-lg sm:text-[20px] lg:text-[21px] font-semibold text-[#124B3B] leading-snug">
                Dedicated Diabetology &amp; Multi-Organ<br className="hidden sm:inline" /> Protection Since 2007
              </h2>

              {/* Introductory Paragraph (Balanced readable width) */}
              <p className="text-[13.5px] sm:text-[14px] text-[#4A5E57] leading-[1.65] font-normal max-w-[475px]">
                Practicing physician with 19+ years of experience in diabetes care, hypertension, dyslipidemia, thyroid disorders and comprehensive metabolic health, with a focus on early detection, personalised treatment and long-term well-being.
              </p>

              {/* CTA Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link to="/book-appointment">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#006B59] hover:bg-[#005546] text-white font-semibold text-[14px] shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                  >
                    <Calendar className="w-4 h-4 text-white" />
                    <span>Book Appointment →</span>
                  </button>
                </Link>

                <a
                  href="#credentials"
                  className="inline-flex items-center justify-center gap-2 px-5.5 py-3 rounded-full bg-white hover:bg-[#FBF9F4] text-[#006B59] border border-[#006B59] font-semibold text-[14px] shadow-2xs transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                >
                  <FileText className="w-4 h-4 text-[#006B59]" />
                  <span>View Credentials →</span>
                </a>
              </div>

              {/* Four Trust Indicators (Clean horizontal flow with subtle dividers matching reference) */}
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-1.5 sm:gap-2 lg:gap-2.5 xl:gap-3 pt-2 sm:pt-2.5">
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#F5EEDB] border border-[#E8D4A7] flex items-center justify-center text-[#8C621F] shrink-0 shadow-2xs">
                    <Sprout className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C621F]" />
                  </div>
                  <div className="text-[10px] sm:text-[10.5px] xl:text-[11px] font-semibold text-[#11382B] leading-tight">
                    <span>Personalised</span>
                    <span className="block text-[#4D5A58] font-normal text-[9.5px] sm:text-[10px]">Treatment</span>
                  </div>
                </div>

                <div className="hidden sm:block w-[1px] h-4.5 sm:h-5 bg-[#E4D7BF]/70 shrink-0 self-center" />

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#F5EEDB] border border-[#E8D4A7] flex items-center justify-center text-[#8C621F] shrink-0 shadow-2xs">
                    <ClipboardList className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C621F]" />
                  </div>
                  <div className="text-[10px] sm:text-[10.5px] xl:text-[11px] font-semibold text-[#11382B] leading-tight">
                    <span>Evidence-Based</span>
                    <span className="block text-[#4D5A58] font-normal text-[9.5px] sm:text-[10px]">Approach</span>
                  </div>
                </div>

                <div className="hidden sm:block w-[1px] h-4.5 sm:h-5 bg-[#E4D7BF]/70 shrink-0 self-center" />

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#F5EEDB] border border-[#E8D4A7] flex items-center justify-center text-[#8C621F] shrink-0 shadow-2xs">
                    <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C621F]" />
                  </div>
                  <div className="text-[10px] sm:text-[10.5px] xl:text-[11px] font-semibold text-[#11382B] leading-tight">
                    <span>Patient-Centred</span>
                    <span className="block text-[#4D5A58] font-normal text-[9.5px] sm:text-[10px]">Care</span>
                  </div>
                </div>

                <div className="hidden sm:block w-[1px] h-4.5 sm:h-5 bg-[#E4D7BF]/70 shrink-0 self-center" />

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#F5EEDB] border border-[#E8D4A7] flex items-center justify-center text-[#8C621F] shrink-0 shadow-2xs">
                    <KidneyIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C621F]" />
                  </div>
                  <div className="text-[10px] sm:text-[10.5px] xl:text-[11px] font-semibold text-[#11382B] leading-tight">
                    <span>Multi-Organ</span>
                    <span className="block text-[#4D5A58] font-normal text-[9.5px] sm:text-[10px]">Protection</span>
                  </div>
                </div>
              </div>

              {/* Mobile Quotation Card (Neatly placed below badges on mobile/tablet) */}
              <div className="lg:hidden mt-5 w-full bg-white/95 rounded-2xl p-4 border border-[#E8D4A7] shadow-[0_4px_16px_rgba(14,51,38,0.04)] space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F5EEDB] border border-[#E8D4A7] flex items-center justify-center text-[#11382B] shrink-0">
                    <Quote className="w-3 h-3 fill-[#11382B] text-[#11382B]" />
                  </div>
                  <span className="text-xs font-bold text-[#11382B]">Dr. Soumya Sengupta</span>
                </div>
                <p className="text-[12px] italic font-serif text-[#1F3D36] leading-relaxed">
                  “Early detection, consistent care and a healthy lifestyle can prevent complications and help you live a better, longer life.”
                </p>
              </div>
            </div>

            {/* =================================================================
                CENTER-RIGHT & FAR-RIGHT ZONES: DOCTOR PORTRAIT + QUOTATION CARD
                ================================================================= */}
            <div className="w-full lg:flex-1 relative flex items-end justify-center lg:justify-start min-h-[430px] sm:min-h-[460px] lg:min-h-[490px]">
              {/* Center Botanical Foliage & Golden Ribbon (Authentic reference artwork tucked behind doctor's right shoulder) */}
              <div className="hidden lg:block absolute left-[-25px] xl:left-[-35px] bottom-0 w-[240px] xl:w-[275px] pointer-events-none select-none z-0">
                <img
                  src="/images/hero_center_foliage_clean.png"
                  alt=""
                  className="w-full h-auto object-contain object-bottom"
                />
              </div>

              {/* Doctor Transparent Portrait — Authentic asset, anchored at bottom */}
              <div className="relative z-10 w-full max-w-[400px] sm:max-w-[440px] xl:max-w-[480px] 2xl:max-w-[500px] flex justify-center lg:justify-start lg:-ml-4 xl:-ml-6 -mb-4 sm:-mb-5 lg:-mb-6">
                <img
                  src="https://pub-7db5b1cd8b0147abb4dc0bbc590bac39.r2.dev/doctor/doc%20bg%20removed.png"
                  alt="Dr. Soumya Sengupta, Consultant Diabetologist & Metabolic Physician"
                  className="w-full h-auto max-h-[510px] sm:max-h-[540px] xl:max-h-[570px] object-contain object-bottom select-none"
                  loading="eager"
                />
              </div>

              {/* Quotation Card (Tucked intimately beside doctor's head/shoulder, matching reference) */}
              <div className="hidden lg:block absolute left-[310px] xl:left-[355px] 2xl:left-[375px] top-6 xl:top-8 z-20 w-[205px] xl:w-[218px] bg-[#FAF8F2]/95 backdrop-blur-xs rounded-[22px] p-3.5 xl:p-4 border border-[#E8D4A7] shadow-[0_8px_24px_rgba(14,51,38,0.06)] space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-6.5 h-6.5 rounded-full bg-[#F5EEDB] border border-[#E8D4A7] flex items-center justify-center text-[#11382B] shrink-0 mt-0.5">
                    <Quote className="w-3 h-3 fill-[#11382B] text-[#11382B]" />
                  </div>
                  <p className="text-[12.5px] xl:text-[13px] italic font-serif text-[#163D34] leading-[1.42]">
                    “Early detection, consistent care and a healthy lifestyle can prevent complications and help you live a better, longer life.”
                  </p>
                </div>

                <div className="text-[10.5px] font-bold text-[#163D34] pl-8.5 mt-1.5">
                  — Dr. Soumya Sengupta
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2: FLOATING STATS STRIP (Overlapping Section Break)
          ========================================================================= */}
      <section className="-mt-8 sm:-mt-10 lg:-mt-12 relative z-20 mb-8 sm:mb-12">
        <Container size="xl">
          <div className="bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_16px_40px_rgba(27,42,38,0.07)] border border-[#E8E2D5] p-5 sm:p-6 lg:p-7 xl:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#EAE5DA]">
            {/* Stat 1: 19+ Years Experience in Diabetes Care */}
            <div className="flex items-center gap-3.5 sm:gap-4 lg:pr-5 xl:pr-6">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F4EC] border border-[#0F5C4A]/15 text-[#0F5C4A] flex items-center justify-center shrink-0">
                <Calendar className="w-5.5 h-5.5 text-[#0F5C4A]" />
              </div>
              <div className="min-w-0">
                <span className="block text-2xl xl:text-[26px] font-bold font-serif text-[#102D2D] leading-tight tracking-tight">
                  19+ Years
                </span>
                <span className="block text-xs sm:text-[13px] font-semibold text-[#102D2D] mt-0.5">
                  {isHindi ? 'डायबिटीज केयर में' : 'Experience in'}
                </span>
                <span className="block text-[11.5px] sm:text-xs text-[#5A6863] mt-0.5">
                  {isHindi ? 'समर्पित नैदानिक अनुभव' : 'Diabetes Care'}
                </span>
              </div>
            </div>

            {/* Stat 2: 2007 Established Practice in Chaibasa */}
            <div className="flex items-center gap-3.5 sm:gap-4 pt-4 sm:pt-0 lg:px-5 xl:px-6">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F4EC] border border-[#0F5C4A]/15 text-[#0F5C4A] flex items-center justify-center shrink-0">
                <Building2 className="w-5.5 h-5.5 text-[#0F5C4A]" />
              </div>
              <div className="min-w-0">
                <span className="block text-2xl xl:text-[26px] font-bold font-serif text-[#102D2D] leading-tight tracking-tight">
                  2007
                </span>
                <span className="block text-xs sm:text-[13px] font-semibold text-[#102D2D] mt-0.5">
                  {isHindi ? 'स्थापना वर्ष' : 'Established Practice'}
                </span>
                <span className="block text-[11.5px] sm:text-xs text-[#5A6863] mt-0.5">
                  {isHindi ? 'चाईबासा में' : 'in Chaibasa'}
                </span>
              </div>
            </div>

            {/* Stat 3: Cardio Diabetic Clinic, Chaibasa, Jharkhand */}
            <div className="flex items-center gap-3.5 sm:gap-4 pt-4 sm:pt-0 lg:px-5 xl:px-6">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F4EC] border border-[#0F5C4A]/15 text-[#0F5C4A] flex items-center justify-center shrink-0">
                <MapPin className="w-5.5 h-5.5 text-[#0F5C4A]" />
              </div>
              <div className="min-w-0">
                <span className="block text-lg xl:text-[19px] font-bold font-serif text-[#102D2D] leading-snug tracking-tight">
                  Cardio Diabetic Clinic
                </span>
                <span className="block text-xs sm:text-[13px] font-semibold text-[#102D2D] mt-0.5">
                  {isHindi ? 'चाईबासा, झारखंड' : 'Chaibasa, Jharkhand'}
                </span>
                <span className="block text-[11.5px] sm:text-xs text-[#5A6863] mt-0.5">
                  Amlatola, Post Box No. 20
                </span>
              </div>
            </div>

            {/* Stat 4: Thousands+ Patients Benefitted */}
            <div className="flex items-center gap-3.5 sm:gap-4 pt-4 sm:pt-0 lg:pl-5 xl:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F4EC] border border-[#0F5C4A]/15 text-[#0F5C4A] flex items-center justify-center shrink-0">
                <Users className="w-5.5 h-5.5 text-[#0F5C4A]" />
              </div>
              <div className="min-w-0">
                <span className="block text-2xl xl:text-[26px] font-bold font-serif text-[#102D2D] leading-tight tracking-tight">
                  Thousands+
                </span>
                <span className="block text-xs sm:text-[13px] font-semibold text-[#102D2D] mt-0.5">
                  {isHindi ? 'लाभान्वित मरीज' : 'Patients Benefitted'}
                </span>
                <span className="block text-[11.5px] sm:text-xs text-[#5A6863] mt-0.5">
                  {isHindi ? 'वर्षों के निरंतर विश्वास से' : 'Over the Years'}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3: 3-COLUMN PROFILE & PHILOSOPHY SECTION
          ========================================================================= */}
      <section id="overview" className="py-16 sm:py-20 scroll-mt-24">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Column 1: Registration & Credentials Card */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#11382B] pb-3 border-b border-stone-100 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#0F5C4A]" />
                  <span>{isHindi ? 'पंजीकरण एवं साख' : 'Registration & Credentials'}</span>
                </h3>

                <div className="space-y-4 pt-4 text-xs sm:text-sm">
                  {/* Registry */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] text-[#B8862B] flex items-center justify-center shrink-0 mt-0.5">
                      <FileCheck className="w-4 h-4 text-[#B8862B]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-stone-500 block">
                        {isHindi ? 'चिकित्सा पंजीकरण:' : 'Medical Registry'}
                      </span>
                      <span className="font-semibold text-stone-900 block font-mono text-xs">
                        {doctor?.registrationNumber || 'Practicing Physician (Reg. since 2007)'}
                      </span>
                    </div>
                  </div>

                  {/* Chamber Location */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] text-[#B8862B] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-[#B8862B]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-stone-500 block">
                        {isHindi ? 'क्लिनिक स्थान:' : 'Chamber Location'}
                      </span>
                      <span className="font-semibold text-stone-900 block">
                        Cardio Diabetic Clinic, Chaibasa, Jharkhand
                      </span>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] text-[#B8862B] flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4 text-[#B8862B]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-stone-500 block">
                        {isHindi ? 'परामर्श भाषाएं:' : 'Languages Spoken'}
                      </span>
                      <span className="font-semibold text-stone-900 block">
                        {doctor?.languagesSpoken.map((l) => localize(l)).join(', ') || 'English, Hindi, Bengali'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Follow & Connect Links */}
              <div className="pt-4 border-t border-stone-100 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5 text-[#B8862B]" />
                  <span className="text-xs font-semibold text-stone-700">
                    {isHindi ? 'सोशल मीडिया व डिजिटल संपर्क:' : 'Follow & Connect'}
                  </span>
                </div>
                <DoctorSocialLinks variant="icons" />
              </div>
            </div>

            {/* Column 2: About Dr. Soumya Sengupta (Narrative Story) */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#11382B] tracking-tight">
                {isHindi ? 'डॉ. सौम्य सेनगुप्ता का परिचय' : 'About Dr. Soumya Sengupta'}
              </h2>

              <div className="space-y-3.5 text-sm sm:text-[15px] text-stone-600 leading-relaxed">
                {doctor?.fullBio.map((paragraph, index) => (
                  <p key={index}>{localize(paragraph)}</p>
                ))}
              </div>
            </div>

            {/* Column 3: Philosophy Quote Card with Signature */}
            <div className="lg:col-span-3 bg-[#F4F7F4] rounded-2xl border border-emerald-900/10 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100/70 text-[#0F5C4A] flex items-center justify-center">
                  <Quote className="w-4 h-4 fill-[#0F5C4A] text-[#0F5C4A]" />
                </div>

                <p className="text-sm italic text-[#13382D] leading-relaxed font-serif">
                  {doctor
                    ? localize(doctor.clinicalPhilosophy)
                    : '“My goal is to help each patient achieve better health through early detection, individualised care and continuous support.”'}
                </p>
              </div>

              <div className="pt-2 border-t border-emerald-900/10">
                <span className="text-xs font-bold text-[#11382B] block">
                  — Dr. Soumya Sengupta
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4: PROFESSIONAL TIMELINE
          ========================================================================= */}
      <section id="timeline" className="py-14 sm:py-16 bg-[#F6F3EB]/60 border-y border-[#EBE6DA]">
        <Container size="xl" className="space-y-8">
          {/* Section Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0D9] text-[#B8862B] flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-[#B8862B]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#11382B]">
                {isHindi ? 'व्यावसायिक यात्रा एवं टाइमलाइन' : 'Professional Timeline'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                {isHindi
                  ? 'डॉ. सौम्य सेनगुप्ता की शैक्षणिक एवं क्लिनिकल यात्रा के मुख्य मील के पत्थर।'
                  : "Key milestones in Dr. Soumya Sengupta's academic and clinical journey."}
              </p>
            </div>
          </div>

          {/* Stepper Grid Container with Connecting Line */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs relative">
            {/* Desktop Horizontal Connecting Track */}
            <div className="hidden md:block absolute top-[43px] left-[45px] right-[45px] h-0.5 bg-[#DCEEE5] z-0" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              {timelineMilestones.map((milestone, idx) => {
                const IconComponent = milestone.icon;
                return (
                  <div key={idx} className="relative space-y-3 flex flex-col justify-between">
                    {/* Step indicator node */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F5F0] text-[#0F5C4A] border-2 border-white shadow-xs flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4 text-[#0F5C4A]" />
                      </div>
                      <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-stone-100 text-[#11382B]">
                        {milestone.year}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-[#11382B] text-sm sm:text-base leading-snug">
                        {localize(milestone.title)}
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        {localize(milestone.description)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5: AREAS OF CLINICAL EXPERTISE
          ========================================================================= */}
      <section id="expertise" className="py-16 sm:py-20 scroll-mt-24">
        <Container size="xl" className="space-y-8">
          {/* Header Row with "View All →" */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0D9] text-[#B8862B] flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5 text-[#B8862B]" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#11382B]">
                  {isHindi ? 'विशेषज्ञता एवं नैदानिक क्षेत्र' : 'Areas of Clinical Expertise'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  {isHindi
                    ? 'मेटाबोलिक, एंडोक्राइन एवं अंग सुरक्षा प्रबंधन में विशेष नैदानिक अनुभव।'
                    : 'Specialized management across metabolic, endocrine, and organ preservation care.'}
                </p>
              </div>
            </div>

            <Link
              to="/conditions"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0F5C4A] hover:text-[#0A4436] transition-colors self-start sm:self-auto"
            >
              <span>{isHindi ? 'सभी देखें' : 'View All'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 6 Cards Grid (3x2) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {clinicalExpertise.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200/80 p-6 space-y-3.5 hover:border-emerald-300 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFF6E5] text-[#C07F00] flex items-center justify-center">
                    <IconComp className="w-5 h-5 text-[#C07F00]" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-[#11382B] group-hover:text-[#0F5C4A] transition-colors">
                      {localize(item.title)}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-stone-500 leading-relaxed">
                      {localize(item.description)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6: CARE BEYOND THE DIAGNOSIS (Dark Emerald Organ Banner)
          ========================================================================= */}
      <section id="organ-care" className="py-6 sm:py-8">
        <Container size="xl">
          <div className="rounded-3xl bg-gradient-to-br from-[#06241B] via-[#093528] to-[#0D4434] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Heading and Approach */}
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold tracking-widest uppercase text-[#D4AF37] block">
                  {isHindi ? 'निदान से परे संपूर्ण देखभाल' : 'Care Beyond the Diagnosis'}
                </span>

                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                  {isHindi
                    ? 'शीघ्र ग्लाइसेमिक नियंत्रण एवं बहु-अंग सुरक्षा'
                    : 'Early Glycemic Control & Multi-Organ Protection'}
                </h2>

                <p className="text-sm sm:text-base text-emerald-100/85 leading-relaxed font-normal max-w-lg">
                  {isHindi
                    ? 'महत्वपूर्ण अंगों की सुरक्षा और दीर्घकालिक जीवन की गुणवत्ता में सुधार के लिए एक व्यापक क्लिनिकल दृष्टिकोण।'
                    : 'A comprehensive approach to protect vital organs and improve long-term quality of life.'}
                </p>

                <div className="pt-2">
                  <Link to="/conditions">
                    <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#093528] font-medium text-sm hover:bg-emerald-50 transition-all shadow-md cursor-pointer">
                      <span>{isHindi ? 'हमारा क्लिनिकल दृष्टिकोण जानें' : 'Learn More About Our Approach'}</span>
                      <ArrowRight className="w-4 h-4 text-[#093528]" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Column: 4 Circular Organ Health Items */}
              <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {/* Kidney */}
                <div className="flex flex-col items-center space-y-2.5">
                  <div className="w-16 h-16 rounded-full border-2 border-emerald-400/40 bg-emerald-950/70 flex items-center justify-center text-emerald-300 shadow-lg">
                    <KidneyIcon className="w-7 h-7 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">
                      {isHindi ? 'किडनी सुरक्षा' : 'Kidney Health'}
                    </span>
                    <span className="text-[11px] text-emerald-200/75 leading-tight block">
                      {isHindi ? 'रीनल फंक्शन की सुरक्षा' : 'Protecting renal function'}
                    </span>
                  </div>
                </div>

                {/* Eye */}
                <div className="flex flex-col items-center space-y-2.5">
                  <div className="w-16 h-16 rounded-full border-2 border-emerald-400/40 bg-emerald-950/70 flex items-center justify-center text-emerald-300 shadow-lg">
                    <Eye className="w-7 h-7 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">
                      {isHindi ? 'नेत्र स्वास्थ्य' : 'Eye Health'}
                    </span>
                    <span className="text-[11px] text-emerald-200/75 leading-tight block">
                      {isHindi ? 'दृष्टि हानि से बचाव' : 'Preventing vision loss'}
                    </span>
                  </div>
                </div>

                {/* Nerve */}
                <div className="flex flex-col items-center space-y-2.5">
                  <div className="w-16 h-16 rounded-full border-2 border-emerald-400/40 bg-emerald-950/70 flex items-center justify-center text-emerald-300 shadow-lg">
                    <Activity className="w-7 h-7 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">
                      {isHindi ? 'तंत्रिका स्वास्थ्य' : 'Nerve Health'}
                    </span>
                    <span className="text-[11px] text-emerald-200/75 leading-tight block">
                      {isHindi ? 'न्यूरोपैथी जोखिम कमी' : 'Reducing neuropathy risk'}
                    </span>
                  </div>
                </div>

                {/* Heart */}
                <div className="flex flex-col items-center space-y-2.5">
                  <div className="w-16 h-16 rounded-full border-2 border-emerald-400/40 bg-emerald-950/70 flex items-center justify-center text-emerald-300 shadow-lg">
                    <HeartPulse className="w-7 h-7 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">
                      {isHindi ? 'हृदय स्वास्थ्य' : 'Heart Health'}
                    </span>
                    <span className="text-[11px] text-emerald-200/75 leading-tight block">
                      {isHindi ? 'हृदय जोखिम न्यूनीकरण' : 'Lowering cardiovascular risk'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 7: ACHIEVEMENTS & RECOGNITIONS
          ========================================================================= */}
      <section id="achievements" className="py-16 sm:py-20 scroll-mt-24">
        <Container size="xl" className="space-y-8">
          {/* Header Row with "View All →" */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0D9] text-[#B8862B] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#B8862B]" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#11382B]">
                  {isHindi ? 'उपलब्धियां एवं सम्मान' : 'Achievements & Recognitions'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  {isHindi
                    ? 'सामुदायिक स्वास्थ्य, जांच शिविरों और रोगी शिक्षा के महत्वपूर्ण मील के पत्थर।'
                    : 'Key milestones in community health, screening and patient education.'}
                </p>
              </div>
            </div>

            <Link
              to="/clinic"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0F5C4A] hover:text-[#0A4436] transition-colors self-start sm:self-auto"
            >
              <span>{isHindi ? 'सभी गैलरी देखें' : 'View All'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Visual Image Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="w-full h-44 bg-stone-100 overflow-hidden">
                    <img
                      src={ach.image || CLINIC_IMAGES.rssdiJhconAward}
                      alt={localize(ach.title)}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                  </div>

                  <div className="p-5 sm:p-6 space-y-2.5">
                    {/* Category Pill */}
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#E8F5F0] text-[#0F5C4A] text-[11px] font-bold uppercase tracking-wider">
                      {ach.category === 'academic'
                        ? (isHindi ? 'कॉन्फ्रेंस प्रस्तुति' : 'Conference Presentation')
                        : ach.category === 'community'
                        ? (isHindi ? 'सामुदायिक पहल' : 'Community Outreach')
                        : (isHindi ? 'रोगी शिक्षा' : 'Patient Education')}
                    </span>

                    <h3 className="font-bold text-[#11382B] text-base leading-snug">
                      {localize(ach.title)}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-stone-500 leading-relaxed font-normal">
                      {ach.description ? localize(ach.description) : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 8: QUALIFICATIONS & MEMBERSHIPS (Side-by-side 2 Columns)
          ========================================================================= */}
      <section id="credentials" className="py-16 sm:py-20 bg-[#F6F3EB]/60 border-y border-[#EBE6DA] scroll-mt-24">
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Left Column: Medical Degrees & Qualifications */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0D9] text-[#B8862B] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-[#B8862B]" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#11382B]">
                    {isHindi ? 'चिकित्सीय योग्यताएं एवं डिग्रियां' : 'Medical Degrees & Qualifications'}
                  </h2>
                  <p className="text-xs text-stone-500">
                    {isHindi
                      ? 'सत्यापित शैक्षणिक पृष्ठभूमि एवं विशेष चिकित्सा प्रशिक्षण।'
                      : 'Verified academic background and specialist medical curriculum.'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {doctor?.qualifications.map((q, idx) => (
                  <div
                    key={q.id || idx}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#0F5C4A]" />
                        <h3 className="font-bold text-[#11382B] text-base">
                          {localize(q.degree)}
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                        {q.year || '2007'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{localize(q.institution)}</span>
                    </p>

                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {idx === 0
                        ? (isHindi
                            ? 'मेटाबोलिक एवं एंडोक्राइन विकारों के निदान और आजीवन प्रबंधन हेतु प्राथमिक चिकित्सकीय योग्यता।'
                            : 'Primary medical qualification and foundational physician training in diagnosis and management of metabolic endocrine conditions.')
                        : (isHindi
                            ? 'ग्लूकोज नियंत्रण, डिस्लिपिडेमिया, उच्च रक्तचाप एवं अंग सुरक्षा पर केंद्रित विशेष क्लिनिकल प्रशिक्षण।'
                            : 'Structured clinical curriculum focusing on glycemic control, dyslipidemia, hypertension and vital organ preservation.')}
                    </p>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          if (certifications[idx]) {
                            setSelectedCertificate(certifications[idx]);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 text-xs font-semibold cursor-pointer"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isHindi ? 'सत्यापित प्रमाणपत्र' : 'Verified Credential'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Professional Memberships */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0D9] text-[#B8862B] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#B8862B]" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#11382B]">
                    {isHindi ? 'व्यावसायिक सदस्यताएं' : 'Professional Memberships'}
                  </h2>
                  <p className="text-xs text-stone-500">
                    {isHindi
                      ? 'प्रमुख चिकित्सा एवं मधुमेह अनुसंधान संस्थाओं की सक्रिय सदस्यता।'
                      : 'Active memberships in premier medical and diabetes research bodies.'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {doctor?.memberships.slice(0, 2).map((m, i) => (
                  <div
                    key={i}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F5F0] text-[#0F5C4A] flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-[#0F5C4A]" />
                      </div>
                      <span className="font-bold text-[#11382B] text-sm sm:text-base leading-snug">
                        {localize(m)}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold shrink-0">
                      {isHindi ? 'सक्रिय सदस्य' : 'Active Member'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 9: CONSULTATION CTA CARD
          ========================================================================= */}
      <section className="py-16 sm:py-20">
        <Container size="xl">
          <div className="rounded-3xl bg-gradient-to-r from-[#F6F3EB] via-[#ECE7DC] to-[#F6F3EB] border border-stone-200/80 p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F5F0] text-[#0F5C4A] flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                <Stethoscope className="w-6 h-6 text-[#0F5C4A]" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C4A] block">
                  {isHindi ? 'अगला कदम उठाने के लिए तैयार?' : 'READY TO TAKE THE NEXT STEP?'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#11382B] tracking-tight">
                  {isHindi
                    ? 'डॉ. सौम्य सेनगुप्ता से परामर्श हेतु समय आरक्षित करें'
                    : 'Schedule a Consultation with Dr. Soumya Sengupta'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal max-w-xl">
                  {isHindi
                    ? 'पहले से अपॉइंटमेंट बुक करने पर लैब रिपोर्ट विश्लेषण, सीजीएम व्याख्या और संपूर्ण मेटाबोलिक मूल्यांकन के लिए समर्पित समय सुनिश्चित होता है।'
                    : 'Prior appointment booking ensures dedicated consultation time for lab report analysis, CGM interpretation, and comprehensive metabolic assessment.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 w-full sm:w-auto">
              <Link to="/book-appointment">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0F5C4A] hover:bg-[#0A4436] text-white font-medium text-sm sm:text-base shadow-sm transition-all cursor-pointer">
                  <Calendar className="w-4 h-4 text-emerald-200" />
                  <span>{t('cta.bookAppointment')}</span>
                </button>
              </Link>
              <Link to="/contact">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-medium text-sm sm:text-base shadow-2xs transition-all cursor-pointer">
                  <Phone className="w-4 h-4 text-stone-600" />
                  <span>{isHindi ? 'क्लिनिक संपर्क' : 'Contact Clinic'}</span>
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Certificate Modal for Credential Verification */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
};
