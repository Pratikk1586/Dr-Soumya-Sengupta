import React from 'react';
import { SEO } from '../components/common/SEO';
import { SectionDivider } from '../components/common/SectionDivider';
import { HeroSection } from '../components/hero/HeroSection';
import { HowCanWeHelpSection } from '../components/home/HowCanWeHelpSection';
import { AboutDoctorSection } from '../components/home/AboutDoctorSection';
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

      {/* 1. Header & Hero Section (Surface Background) */}
      <HeroSection />
      <SectionDivider variant="ecg" />

      {/* 2. How Can We Help? (White Background) */}
      <HowCanWeHelpSection />
      <SectionDivider variant="ecg" />

      {/* 3. About Dr. Sengupta Preview (Surface Background) */}
      <AboutDoctorSection />
      <SectionDivider variant="ecg" />

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
