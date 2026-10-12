import React from 'react';
import { SEO } from '../components/common/SEO';
import { SectionDivider } from '../components/common/SectionDivider';
import { HeroSection } from '../components/hero/HeroSection';
import { QuickLinksStrip } from '../components/home/QuickLinksStrip';
import { AboutDoctorSection } from '../components/home/AboutDoctorSection';
import { HowCanWeHelpSection } from '../components/home/HowCanWeHelpSection';
import { KnowYourProblemSection } from '../components/home/KnowYourProblemSection';
import { CareJourneySection } from '../components/home/CareJourneySection';
import { PatientReviewsSection } from '../components/home/PatientReviewsSection';
import { ClinicInfoSection } from '../components/home/ClinicInfoSection';
import { HomeFaqSection } from '../components/home/HomeFaqSection';
import { AppointmentTeaserSection } from '../components/home/AppointmentTeaserSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Dr. Soumya Sengupta — Consultant Diabetologist & Metabolic Physician"
        description="Practicing since 2007 (19+ Years in Diabetes Care) at Cardio Diabetic Clinic, Chaibasa, West Singhbhum, Jharkhand specializing in Type 1 & Type 2 Diabetes, Hypertension, Dyslipidemia, and multi-organ protection."
        canonicalPath="/"
      />

      {/* 1. Header & Hero Section */}
      <HeroSection />

      {/* 2. Section A: Quick Links Strip (Floating Card) */}
      <QuickLinksStrip />

      {/* 3. Section B: About Dr. Sengupta Introduction & Stats */}
      <AboutDoctorSection />

      {/* 4. Section C: Our Services — Comprehensive Care */}
      <HowCanWeHelpSection />

      {/* 4. Know Your Problem & Numbers (Primary-Soft Background) */}
      <KnowYourProblemSection />
      <SectionDivider variant="ecg" />

      {/* 5. Care Journey / Consultation Process (Surface Background) */}
      <CareJourneySection />
      <SectionDivider variant="ecg" />

      {/* 6. Patient Reviews (White Background) */}
      <PatientReviewsSection />
      <SectionDivider variant="ecg" />

      {/* 7. Clinic Info & Gallery Slot (Primary-Soft Background) */}
      <ClinicInfoSection />
      <SectionDivider variant="ecg" />

      {/* 8. FAQ Accordion (White Background) */}
      <HomeFaqSection />
      <SectionDivider variant="ecg" />

      {/* 9. Book Appointment Module (Surface Background) */}
      <AppointmentTeaserSection />
    </>
  );
};

export default HomePage;
