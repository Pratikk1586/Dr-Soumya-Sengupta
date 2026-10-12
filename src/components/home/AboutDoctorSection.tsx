import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, ShieldCheck, Heart } from 'lucide-react';
import { Container } from '../common/Container';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { doctorService } from '../../services';
import { CLINIC_IMAGES } from '../../config/images';
import { DOCTOR_CREDENTIALS } from '../../config/credentials';

export const AboutDoctorSection: React.FC = () => {
  const { localize, isHindi } = useLanguage();
  const { data: doctor } = useService(() => doctorService.getProfile(), []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FBF8F1] relative overflow-hidden">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* 1. Left: Doctor Portrait with Soft Green Organic Blob & Cream Backdrop */}
          <div className="lg:col-span-4 relative flex items-center justify-center">
            {/* Organic curved shape & green fluid wash behind photo */}
            <div
              className="absolute -inset-4 rounded-[40px] pointer-events-none -z-0 opacity-80"
              style={{
                background: 'radial-gradient(ellipse at 30% 40%, rgba(15, 92, 74, 0.18) 0%, rgba(245, 239, 230, 0.8) 60%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            {/* Subtle organic SVG wave accent */}
            <svg
              className="absolute -bottom-6 -left-6 w-44 h-44 text-[#0F5C4A]/10 pointer-events-none -z-0"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <path d="M42.7,-62.9C53.8,-53.4,60.2,-39.1,64.8,-24.5C69.4,-9.9,72.2,4.9,68.7,18.7C65.2,32.4,55.5,45.1,43.2,54.4C30.9,63.7,15.5,69.5,-0.7,70.5C-16.9,71.5,-33.7,67.6,-46.6,58.3C-59.5,49.1,-68.4,34.4,-72.1,18.5C-75.9,2.6,-74.4,-14.6,-66.8,-28.4C-59.3,-42.2,-45.6,-52.7,-31.9,-61.2C-18.2,-69.7,-4.6,-76.3,9.5,-73.2C23.6,-70.2,31.6,-72.5,42.7,-62.9Z" transform="translate(100 100)" />
            </svg>

            {/* Doctor Photo Card */}
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(27,42,38,0.12)] border border-[#E8E2D5] bg-white z-10 aspect-[4/5]">
              <img
                src={CLINIC_IMAGES.doctorProfile}
                alt="Dr. Soumya Sengupta — Consultant Diabetologist & Metabolic Physician"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                width={360}
                height={450}
              />
            </div>
          </div>

          {/* 2. Middle: Doctor Credentials, Specialisation, Bio, and CTA */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-4.5">
            {/* Pill Designation Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#F5EFE6] border border-[#E8E2D5] text-[#B8862B] text-xs font-bold tracking-wider uppercase shadow-2xs">
              <span>{isHindi ? 'कंसल्टेंट डायबेटोलॉजिस्ट' : 'CONSULTANT DIABETOLOGIST'}</span>
            </div>

            {/* Serif Doctor Name */}
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-[34px] text-[#1B2A26] leading-tight">
              {doctor ? localize(doctor.name) : 'Dr. Soumya Sengupta'}
            </h2>

            {/* Qualifications & Diabetology Specialties */}
            <div className="space-y-0.5">
              <p className="text-sm sm:text-base font-semibold text-[#1B2A26]">
                {DOCTOR_CREDENTIALS.degrees || 'MBBS, MD (Medicine), DM (Endocrinology)'}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#B8862B]">
                {isHindi
                  ? 'डायबिटीज, थायरॉयड एवं मेटाबोलिक विकारों में विशेषज्ञ'
                  : 'Specialist in Diabetes, Thyroid & Metabolic Disorders'}
              </p>
            </div>

            {/* Short Introduction Paragraph */}
            <p className="text-xs sm:text-sm text-[#4A5753] leading-relaxed font-normal">
              {isHindi
                ? 'डायबिटीज और संबंधित एंडोक्राइन विकारों से जूझ रहे रोगियों के लिए दयालु, साक्ष्य-आधारित देखभाल प्रदान करने के लिए समर्पित, जिसका मुख्य उद्देश्य दीर्घकालिक स्वास्थ्य और जीवन की गुणवत्ता में सुधार है।'
                : 'Dedicated to providing compassionate, evidence-based care for patients with diabetes and related endocrine disorders, with a focus on long-term health and quality of life.'}
            </p>

            {/* Outlined Pill Button Linking to /about */}
            <div className="pt-2">
              <Link to="/about">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0F5C4A] text-[#0F5C4A] hover:bg-[#E8F2EE] font-semibold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                >
                  <span>{isHindi ? 'डॉ. सेनगुप्ता के बारे में और जानें' : 'Know More About Dr. Sengupta'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* 3. Right: Beige Panel with 2x2 Grid of White Stat Cards */}
          <div className="lg:col-span-4">
            <div className="p-4 sm:p-5 rounded-3xl bg-[#F5EFE6]/80 border border-[#E8E2D5] shadow-xs">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Stat 1: Patients Treated */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E2D5] shadow-xs flex flex-col items-center text-center gap-1.5 hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[#F5EFE6] border border-[#E8E2D5] flex items-center justify-center text-[#B8862B] mb-0.5">
                    <Users className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-serif font-bold text-xl sm:text-2xl text-[#0F5C4A] leading-tight">
                    5000+
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#4A5753] leading-tight">
                    {isHindi ? 'उपचारित मरीज' : 'Patients Treated'}
                  </span>
                </div>

                {/* Stat 2: Years of Experience */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E2D5] shadow-xs flex flex-col items-center text-center gap-1.5 hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[#F5EFE6] border border-[#E8E2D5] flex items-center justify-center text-[#B8862B] mb-0.5">
                    <Award className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-serif font-bold text-xl sm:text-2xl text-[#0F5C4A] leading-tight">
                    10+ Years
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#4A5753] leading-tight">
                    {isHindi ? 'का क्लिनिकल अनुभव' : 'of Experience'}
                  </span>
                </div>

                {/* Stat 3: Evidence-Based Treatment */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E2D5] shadow-xs flex flex-col items-center text-center gap-1.5 hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[#F5EFE6] border border-[#E8E2D5] flex items-center justify-center text-[#B8862B] mb-0.5">
                    <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-serif font-bold text-sm sm:text-base text-[#1B2A26] leading-tight mt-1">
                    Evidence-Based
                  </span>
                  <span className="text-[11px] font-semibold text-[#4A5753] leading-tight">
                    {isHindi ? 'आधुनिक चिकित्सा' : 'Modern Treatment'}
                  </span>
                </div>

                {/* Stat 4: Compassionate Care */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E2D5] shadow-xs flex flex-col items-center text-center gap-1.5 hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[#F5EFE6] border border-[#E8E2D5] flex items-center justify-center text-[#B8862B] mb-0.5">
                    <Heart className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-serif font-bold text-sm sm:text-base text-[#1B2A26] leading-tight mt-1">
                    Compassionate
                  </span>
                  <span className="text-[11px] font-semibold text-[#4A5753] leading-tight">
                    {isHindi ? 'रोगी-केंद्रित देखभाल' : 'Patient-Centred Care'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutDoctorSection;
