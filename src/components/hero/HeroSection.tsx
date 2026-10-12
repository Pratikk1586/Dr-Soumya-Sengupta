import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  UserRound,
  ShieldCheck,
  Heart,
  Activity,
} from 'lucide-react';
import { Container } from '../common/Container';
import { OrganHeroInteractive } from './OrganHeroInteractive';
import { HeroLatestNoticesCard } from './HeroLatestNoticesCard';
import { ClinicNoticesModal } from '../notices/ClinicNoticesModal';
import { useLanguage } from '../../context/useLanguage';

export const HeroSection: React.FC = () => {
  const { isHindi } = useLanguage();
  const [isNoticesModalOpen, setIsNoticesModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#FBF8F1] pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
      {/* Soft teal-green radial background glow on the right side */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-0 w-[550px] lg:w-[750px] h-[550px] lg:h-[750px] rounded-full pointer-events-none blur-3xl z-0"
        style={{
          background: 'radial-gradient(circle, rgba(15, 92, 74, 0.16) 0%, rgba(232, 242, 238, 0.45) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Visual Typography & Clinical Trust Authority */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-5 sm:space-y-6">
            {/* Pill Section Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5EFE6] border border-[#E8E2D5] text-[#B8862B] text-[11px] font-bold tracking-wider uppercase shadow-2xs">
              <span>
                {isHindi
                  ? 'स्वस्थ भविष्य के लिए विशिष्ट चिकित्सा'
                  : 'SPECIALISED CARE FOR A HEALTHIER TOMORROW'}
              </span>
            </div>

            {/* 2-Line Serif Heading */}
            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#1B2A26] leading-[1.15] tracking-tight">
              <span>{isHindi ? 'विश्वसनीय उपचार' : 'Expert Care for'}</span>
              <br />
              <span className="text-[#0F5C4A]">
                {isHindi ? 'डायबिटीज एवं मेटाबोलिक स्वास्थ्य' : 'Diabetes & Metabolic Health'}
              </span>
            </h1>

            {/* Sub-paragraph */}
            <p className="text-sm sm:text-base text-[#4A5753] leading-relaxed max-w-xl font-normal">
              {isHindi
                ? 'व्यक्तिगत उपचार योजनाएं, साक्ष्य-आधारित चिकित्सा और दीर्घकालिक सहयोग — एक स्वस्थ और आत्मनिर्भर जीवन के लिए।'
                : 'Personalised treatment, evidence-based care, and long-term support for a healthier, more independent life.'}
            </p>

            {/* Primary & Secondary Action Pill Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Primary Filled Green Button */}
              <Link to="/book-appointment" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0F5C4A] hover:bg-[#0B4636] text-white text-sm sm:text-base font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>{isHindi ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}</span>
                </button>
              </Link>

              {/* Secondary Outlined Button */}
              <Link to="/conditions/diabetes" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#0F5C4A] text-[#0F5C4A] hover:bg-[#E8F2EE] text-sm sm:text-base font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                >
                  <span>{isHindi ? 'डायबिटीज के बारे में जानें' : 'Learn About Diabetes'}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </Link>
            </div>

            {/* Row of 4 Trust Items with Circular Beige Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 pt-4 border-t border-[#E8E2D5]/70">
              {/* Item 1 */}
              <div className="flex flex-col items-start gap-1.5">
                <div className="w-9 h-9 rounded-full bg-[#F5EFE6] border border-[#E8E2D5] flex items-center justify-center text-[#B8862B] shadow-2xs">
                  <UserRound className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[#1B2A26] leading-tight">
                  {isHindi ? 'व्यक्तिगत उपचार' : 'Personalised Treatment'}
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-start gap-1.5">
                <div className="w-9 h-9 rounded-full bg-[#F5EFE6] border border-[#E8E2D5] flex items-center justify-center text-[#B8862B] shadow-2xs">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[#1B2A26] leading-tight">
                  {isHindi ? 'साक्ष्य-आधारित प्रणाली' : 'Evidence-Based Approach'}
                </span>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-start gap-1.5">
                <div className="w-9 h-9 rounded-full bg-[#F5EFE6] border border-[#E8E2D5] flex items-center justify-center text-[#B8862B] shadow-2xs">
                  <Heart className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[#1B2A26] leading-tight">
                  {isHindi ? 'रोगी-केंद्रित देखभाल' : 'Patient-Centred Care'}
                </span>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-start gap-1.5">
                <div className="w-9 h-9 rounded-full bg-[#F5EFE6] border border-[#E8E2D5] flex items-center justify-center text-[#B8862B] shadow-2xs">
                  <Activity className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[#1B2A26] leading-tight">
                  {isHindi ? 'दीर्घकालिक सहयोग' : 'Long-Term Support'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Anatomical Organ Illustration with Hotspots & Floating Notices */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center">
            {/* Top-Right Floating "Latest Notices" Glass Card */}
            <div className="hidden md:block absolute top-0 right-0 z-30">
              <HeroLatestNoticesCard onOpenModal={() => setIsNoticesModalOpen(true)} />
            </div>

            {/* 3D Organ Visualization with Hotspots */}
            <div className="w-full">
              <OrganHeroInteractive />
            </div>
          </div>
        </div>
      </Container>

      {/* Notices Modal */}
      <ClinicNoticesModal
        isOpen={isNoticesModalOpen}
        onClose={() => setIsNoticesModalOpen(false)}
      />
    </section>
  );
};

export default HeroSection;
