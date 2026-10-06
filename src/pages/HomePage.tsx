import React from 'react';
import { SEO } from '../components/common/SEO';
import { HeroSection } from '../components/hero/HeroSection';
import { QuickClinicInfo } from '../components/home/QuickClinicInfo';
import { RecentNoticesSection } from '../components/home/RecentNoticesSection';
import { HowCanWeHelpSection } from '../components/home/HowCanWeHelpSection';
import { AboutDoctorSection } from '../components/home/AboutDoctorSection';
import { ConditionsServicesSection } from '../components/home/ConditionsServicesSection';
import { SectionSlotPlaceholder } from '../components/home/SectionSlotPlaceholder';
import { KnowYourProblemSection } from '../components/home/KnowYourProblemSection';
import { CareJourneySection } from '../components/home/CareJourneySection';
import { WhyChooseSection } from '../components/home/WhyChooseSection';
import { KnowYourNumbersSection } from '../components/home/KnowYourNumbersSection';
import { KnowledgeHubSection } from '../components/home/KnowledgeHubSection';
import { DoctorVideosSection } from '../components/home/DoctorVideosSection';
import { PatientReviewsSection } from '../components/home/PatientReviewsSection';
import { ClinicShowcaseSection } from '../components/home/ClinicShowcaseSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Dr. Soumya Sengupta — Consultant Diabetologist"
        description="Senior Consultant Diabetologist in Kolkata specializing in Type 1 & Type 2 diabetes, Continuous Glucose Monitoring (CGM), and cardiometabolic organ protection."
        canonicalPath="/"
      />

      {/* 1. Signature Hero Section (Instant LCP layer + Progressive Lazy 3D Pancreas) */}
      <HeroSection />

      {/* 2. Quick Clinic Information (Location, Timings, Direct Call, Prior Booking) */}
      <QuickClinicInfo />

      {/* 3. Recent Notices (Complete notice system: Recent in IST vs All, Category Filters, Empty States) */}
      <RecentNoticesSection />

      {/* 4. How Can We Help? (Diabetes, Thyroid, Weight Management, Metabolic Health) */}
      <HowCanWeHelpSection />

      {/* 5. About Dr. Sengupta (Photo placeholder, qualifications, clinical focus, bio) */}
      <AboutDoctorSection />

      {/* 6. Conditions & Services (5 verified conditions linking to /conditions/:slug) */}
      <ConditionsServicesSection />

      {/* 7. Know Your Problem (Interactive clinical guidance navigator with disclaimer) */}
      <KnowYourProblemSection />

      {/* 8. Treatment / Care Journey (6-step visual & accessible ordered list) */}
      <CareJourneySection />

      {/* 9. Why Choose Dr. Sengupta (Evidence-based, patient-centered, non-claim positioning) */}
      <WhyChooseSection />

      {/* 10. Know Your Numbers (Glycemic & Metabolic Biomarkers cards from reportService) */}
      <KnowYourNumbersSection />

      {/* 11. Knowledge Hub (Featured and recent peer-reviewed clinical articles) */}
      <KnowledgeHubSection />

      {/* 12. Dr. Sengupta Explains (Video masterclasses with facade and transcripts) */}
      <DoctorVideosSection />

      {/* 13. Patient Reviews (Genuine observations, feature-flagged, NMC ethics disclaimer) */}
      <PatientReviewsSection />

      {/* 14. Clinic Showcase (Chamber environment, waiting lounge, and photo gallery) */}
      <ClinicShowcaseSection />

      {/* 15. [Slot Placeholder] Location & Contact (Interactive map & chamber directions) */}
      <SectionSlotPlaceholder
        slotNumber={15}
        moduleName="Location & Chamber Access"
        tagline="Physical Consultation Access"
        description="Interactive Google Maps integration, prominent landmarks, parking accessibility, and public transit navigation to the Salt Lake and Kolkata consultation chambers."
        targetLink="/clinic/location"
        targetLinkText="Get Directions & Location"
      />

      {/* 16. [Slot Placeholder] Book Appointment (Dedicated interactive reservation module) */}
      <SectionSlotPlaceholder
        slotNumber={16}
        moduleName="Consultation Scheduling & Slot Reservation"
        tagline="Online OPD Appointment Desk"
        description="Select your preferred chamber slot, submit past clinical records, and receive timely WhatsApp or SMS appointment confirmations."
        targetLink="/book-appointment"
        targetLinkText="Book Clinical Slot"
      />
    </>
  );
};

export default HomePage;
