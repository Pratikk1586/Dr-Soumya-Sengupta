import React from 'react';
import { SEO } from '../components/common/SEO';
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

      {/* 1. Header & Hero Section (Includes 'Our Clinic' redirection button) */}
      <HeroSection />

      {/* 2. How Can We Help? (Short overview reflecting conditions with link to full section) */}
      <HowCanWeHelpSection />

      {/* 3. About Dr. Sengupta Preview (Overview with button to full About profile) */}
      <AboutDoctorSection />

      {/* 4. Know Your Problem (Merged with 'Know Your Numbers' tabs & full report guides) */}
      <KnowYourProblemSection />

      {/* 5. Care Journey / Consultation Process (Step-by-step roadmap with actions) */}
      <CareJourneySection />

      {/* 6. Patient Reviews (Observations & feedback) */}
      <PatientReviewsSection />

      {/* 7. Clinic Info (New section merging Showcase, Photos, Location, Map & Directions) */}
      <ClinicInfoSection />

      {/* 8. FAQ Accordion (Frequently asked clinical & appointment questions with FAQPage schema) */}
      <HomeFaqSection />

      {/* 9. Book Appointment Module (1-step scheduling & WhatsApp confirmation) */}
      <AppointmentTeaserSection />
    </>
  );
};

export default HomePage;
