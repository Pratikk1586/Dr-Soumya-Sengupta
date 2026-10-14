import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  Megaphone,
  UserRound,
  ShieldCheck,
  Heart,
  BarChart3,
} from 'lucide-react';
import { Container } from '../common/Container';
import { OrganHeroInteractive } from './OrganHeroInteractive';
import { HeroLatestNoticesCard } from './HeroLatestNoticesCard';
import { ClinicNoticesModal } from '../notices/ClinicNoticesModal';
import { useLanguage } from '../../context/useLanguage';

export const HeroSection: React.FC = () => {
  const { isHindi } = useLanguage();
  const [isNoticesModalOpen, setIsNoticesModalOpen] = useState(false);

  // Trust indicators matching reference image: Personalised Treatment, Evidence-Based Approach, Patient-Centred Care, Long-Term Support
  const trustIndicators = [
    {
      id: 'trust-1',
      icon: UserRound,
      title: isHindi ? 'व्यक्तिगत' : 'Personalised',
      subtitle: isHindi ? 'उपचार' : 'Treatment',
    },
    {
      id: 'trust-2',
      icon: ShieldCheck,
      title: isHindi ? 'साक्ष्य-आधारित' : 'Evidence-Based',
      subtitle: isHindi ? 'प्रणाली' : 'Approach',
    },
    {
      id: 'trust-3',
      icon: Heart,
      title: isHindi ? 'मरीज-केंद्रित' : 'Patient-Centred',
      subtitle: isHindi ? 'देखभाल' : 'Care',
    },
    {
      id: 'trust-4',
      icon: BarChart3,
      title: isHindi ? 'दीर्घकालिक' : 'Long-Term',
      subtitle: isHindi ? 'सहयोग' : 'Support',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FAF8F2] pt-4 pb-16 sm:pt-6 sm:pb-20 lg:pt-7 lg:pb-24">
      {/* 1. Full-bleed seamless background: Warm ivory on left smoothly transitioning into luminous mint and rich deep emerald behind anatomy and notices */}
      <div
        className="absolute inset-0 pointer-events-none -z-0"
        style={{
          background: `
            radial-gradient(circle at 96% 92%, rgba(226, 186, 122, 0.36) 0%, rgba(16, 75, 62, 0.20) 42%, transparent 68%),
            radial-gradient(ellipse 62% 58% at 56% 46%, rgba(245, 180, 80, 0.28) 0%, rgba(35, 140, 110, 0.42) 36%, rgba(10, 50, 40, 0.20) 65%, transparent 85%),
            linear-gradient(108deg, #FAF8F2 0%, #FAF8F2 35%, #E6F3EC 46%, #9FD4C1 58%, #36947B 70%, #156B58 82%, #0A4A3C 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* 2. Ambient Bokeh Sparkles and Light Orbs SVG Layer — delicate, subtle medical glow */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none -z-0 opacity-60"
        viewBox="0 0 1664 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="bokeh-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
          <filter id="bokeh-light" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
          </filter>
        </defs>

        {/* Soft glowing bokeh circles in teal area */}
        <circle cx="980" cy="130" r="26" fill="#F2A33A" opacity="0.30" filter="url(#bokeh-soft)" />
        <circle cx="900" cy="95" r="28" fill="#74C69D" opacity="0.25" filter="url(#bokeh-soft)" />
        <circle cx="1150" cy="110" r="32" fill="#A7D7C5" opacity="0.25" filter="url(#bokeh-soft)" />
        <circle cx="1280" cy="180" r="20" fill="#52B788" opacity="0.28" filter="url(#bokeh-soft)" />
        <circle cx="840" cy="170" r="14" fill="#E8F2EE" opacity="0.45" filter="url(#bokeh-light)" />
        <circle cx="1070" cy="230" r="11" fill="#FFFFFF" opacity="0.50" filter="url(#bokeh-light)" />
        <circle cx="1230" cy="150" r="13" fill="#A7D7C5" opacity="0.45" filter="url(#bokeh-light)" />
        <circle cx="1420" cy="120" r="7" fill="#FFFFFF" opacity="0.55" />
        <circle cx="1010" cy="65" r="6" fill="#FFFFFF" opacity="0.65" />
        <circle cx="1520" cy="160" r="16" fill="#74C69D" opacity="0.25" filter="url(#bokeh-soft)" />
        <circle cx="1350" cy="90" r="10" fill="#E8F2EE" opacity="0.40" filter="url(#bokeh-light)" />

        {/* Delicate star sparkles with gentle opacity */}
        <g transform="translate(1050, 85) scale(0.7)" fill="#FFFFFF" opacity="0.60">
          <path d="M0 -10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0 -10 Z" />
        </g>
        <g transform="translate(880, 150) scale(0.65)" fill="#FFFFFF" opacity="0.55">
          <path d="M0 -10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0 -10 Z" />
        </g>
        <g transform="translate(1180, 200) scale(0.6)" fill="#F2A33A" opacity="0.55">
          <path d="M0 -10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0 -10 Z" />
        </g>
        <g transform="translate(1270, 130) scale(0.7)" fill="#E8F2EE" opacity="0.55">
          <path d="M0 -10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0 -10 Z" />
        </g>
      </svg>

      {/* 3. Bottom Flowing Wave Ribbon Sweeping Across Full Width */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-[180px] sm:h-[220px] pointer-events-none -z-0 opacity-60"
        viewBox="0 0 1664 260"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-bottom-ribbon-1" x1="0%" y1="100%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#FAF8F2" stopOpacity="0.0" />
            <stop offset="25%" stopColor="#A7D7C5" stopOpacity="0.20" />
            <stop offset="60%" stopColor="#74C69D" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FAF8F2" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="hero-bottom-ribbon-2" x1="0%" y1="80%" x2="100%" y2="10%">
            <stop offset="0%" stopColor="#FAF8F2" stopOpacity="0.0" />
            <stop offset="30%" stopColor="#D8F3DC" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#95D5B2" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FAF8F2" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <path
          d="M -40 260 C 240 220, 480 150, 780 180 C 1080 210, 1380 90, 1720 150 L 1720 260 Z"
          fill="url(#hero-bottom-ribbon-1)"
        />
        <path
          d="M -40 260 C 280 240, 560 120, 920 140 C 1240 160, 1500 60, 1720 120 L 1720 260 Z"
          fill="url(#hero-bottom-ribbon-2)"
        />
      </svg>

      <Container size="xl" className="relative z-10">
        {/*
          THREE-COLUMN DESKTOP HERO COMPOSITION
          Desktop (xl: 1280px+): Balanced 3-Column (Left: 480px, Center: 1fr, Right: 345px)
          Tablet (md: 768px-1279px): 2 Columns on top (Text + Anatomy), Notices card below
          Mobile (< 768px): Clean Single Column Stack
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-[480px_1fr_345px] gap-4 xl:gap-6 items-center">
          {/* COLUMN 1: LEFT TEXT & ACTIONS */}
          <div className="md:col-span-7 xl:col-auto flex flex-col justify-center space-y-4 sm:space-y-4.5">
            {/* 1. Clinic identity eyebrow badge matching reference image */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F2E8] border border-[#E6DDCF] text-[#6B5A3E] text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase shadow-2xs self-start">
              <div className="w-4.5 h-4.5 rounded-full bg-[#E5D5A5] flex items-center justify-center text-[#1E5D46] shrink-0">
                <Megaphone className="w-2.5 h-2.5 text-[#1E5D46]" aria-hidden="true" />
              </div>
              <span>
                {isHindi
                  ? 'डॉ. सौम्य सेनगुप्ता डायबिटिक क्लिनिक'
                  : "DR. SOUMYA SENGUPTA'S DIABETIC CLINIC"}
              </span>
            </div>

            {/* 2. Main headline on two lines matching editorial serif styling */}
            <h1 className="font-serif font-bold text-[clamp(2.1rem,2.8vw,3.4rem)] leading-[1.08] -tracking-[0.02em]">
              <span className="block text-[#0E2D27]">
                {isHindi ? 'एक क्लिनिक जिस पर आप भरोसा करते हैं।' : 'A Clinic You Trust.'}
              </span>
              <span className="block text-[#075B58] mt-1 sm:mt-1.5">
                {isHindi ? 'एक डॉक्टर जो आपकी परवाह करते हैं।' : 'A Doctor Who Cares.'}
              </span>
            </h1>

            {/* 3. Supporting description */}
            <p className="text-sm sm:text-[14.5px] text-[#4A5E57] leading-[1.65] max-w-[440px] font-normal">
              {isHindi
                ? 'डायबिटीज, थायरॉयड विकारों एवं मेटाबोलिक स्वास्थ्य के लिए विशिष्ट देखभाल — व्यक्तिगत उपचार, साक्ष्य-आधारित चिकित्सा और दीर्घकालिक सहयोग पर केंद्रित।'
                : 'Specialised care for diabetes, thyroid disorders, and metabolic health — with a focus on personalised treatment, evidence-based medicine, and long-term support.'}
            </p>

            {/* 4. Primary and secondary CTA buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-1">
              <Link to="/book-appointment" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6.5 py-3 rounded-full bg-[#006B59] hover:bg-[#005546] text-white text-sm sm:text-[14.5px] font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] min-h-[46px]"
                >
                  <Calendar className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>{isHindi ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}</span>
                </button>
              </Link>

              <Link to="/about" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full border border-[#006B59] bg-white/70 hover:bg-white text-[#006B59] text-sm sm:text-[14.5px] font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] min-h-[46px]"
                >
                  <span>{isHindi ? 'डॉक्टर से मिलें' : 'Meet Your Doctor'}</span>
                  <ArrowRight className="w-4 h-4 text-[#006B59]" aria-hidden="true" />
                </button>
              </Link>
            </div>

            {/* 5. Four Clinic Highlights in single horizontal line matching reference image */}
            <div className="grid grid-cols-2 sm:flex sm:flex-nowrap sm:items-center gap-2 sm:gap-2.5 lg:gap-3 pt-2 max-w-[480px]">
              {trustIndicators.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-center gap-1.5 shrink-0">
                    <div className="w-7 h-7 rounded-full bg-[#F7F2E8] border border-[#E6DDCF] flex items-center justify-center text-[#B8862B] shrink-0 shadow-2xs">
                      <Icon className="w-3.5 h-3.5 text-[#B8862B]" aria-hidden="true" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[11px] font-bold text-[#102D2D] whitespace-nowrap">{item.title}</div>
                      <div className="text-[9.5px] text-[#4A5E57] whitespace-nowrap">{item.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: CENTER ANATOMICAL VISUAL */}
          <div className="md:col-span-5 xl:col-auto flex items-center justify-center w-full">
            <div className="w-full max-w-[500px] lg:max-w-[530px] xl:max-w-[560px] mx-auto flex items-center justify-center">
              <OrganHeroInteractive />
            </div>
          </div>

          {/* COLUMN 3: RIGHT LATEST NOTICES */}
          <div className="md:col-span-12 xl:col-auto flex justify-center xl:justify-end w-full mt-3 md:mt-5 xl:mt-0">
            <HeroLatestNoticesCard
              onOpenModal={() => setIsNoticesModalOpen(true)}
              className="max-w-[350px] sm:max-w-[380px] xl:max-w-[350px] w-full"
            />
          </div>
        </div>
      </Container>

      {/* Full Notices Modal */}
      <ClinicNoticesModal
        isOpen={isNoticesModalOpen}
        onClose={() => setIsNoticesModalOpen(false)}
      />
    </section>
  );
};

export default HeroSection;
