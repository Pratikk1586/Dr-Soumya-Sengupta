import React from 'react';
import { SEO } from '../components/common/SEO';
import { HeroSection } from '../components/hero/HeroSection';
import { QuickClinicInfo } from '../components/home/QuickClinicInfo';
import { RecentNoticesSection } from '../components/home/RecentNoticesSection';
import { HowCanWeHelpSection } from '../components/home/HowCanWeHelpSection';
import { AboutDoctorSection } from '../components/home/AboutDoctorSection';
import { ConditionsServicesSection } from '../components/home/ConditionsServicesSection';
import { SectionSlotPlaceholder } from '../components/home/SectionSlotPlaceholder';
import { CareJourneySection } from '../components/home/CareJourneySection';
import { WhyChooseSection } from '../components/home/WhyChooseSection';
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

      {/* 7. [Slot Placeholder] Know Your Problem (Interactive clinical guidance navigator) */}
      <SectionSlotPlaceholder
        slotNumber={7}
        moduleName="Know Your Problem — Symptom & Concern Navigator"
        tagline="Interactive Clinical Self-Assessment"
        description="An upcoming interactive decision tree allowing patients experiencing unexplained thirst, fatigue, weight changes, or fluctuating blood sugar to map their symptoms to appropriate clinical guidance."
        targetLink="/patient-resources/guides"
        targetLinkText="Explore Patient Guides"
      />

      {/* 8. Treatment / Care Journey (6-step visual & accessible ordered list) */}
      <CareJourneySection />

      {/* 9. Why Choose Dr. Sengupta (Evidence-based, patient-centered, non-claim positioning) */}
      <WhyChooseSection />

      {/* 10. [Slot Placeholder] Know Your Numbers (Biomarkers & lab report interpretation) */}
      <SectionSlotPlaceholder
        slotNumber={10}
        moduleName="Know Your Numbers — Glycemic & Metabolic Biomarkers"
        tagline="Diagnostic Literacy Hub"
        description="Comprehensive explanations for key diabetic biomarkers including HbA1c targets, Time in Range (TIR), urinary Albumin-to-Creatinine Ratio (uACR), and lipid ratios."
        targetLink="/patient-resources/reports"
        targetLinkText="Review Lab Report Guides"
      />

      {/* 11. [Slot Placeholder] Knowledge Hub (Curated evidence-based articles & FAQs) */}
      <SectionSlotPlaceholder
        slotNumber={11}
        moduleName="Knowledge Hub — Patient Education & Articles"
        tagline="Scientific Literacy Library"
        description="In-depth, peer-reviewed clinical articles on insulin injection techniques, hypoglycemia management, continuous glucose monitoring, and meal planning."
        targetLink="/patient-resources/knowledge-hub"
        targetLinkText="Visit Knowledge Hub"
      />

      {/* 12. [Slot Placeholder] Dr. Sengupta Explains (Video masterclasses & patient FAQs) */}
      <SectionSlotPlaceholder
        slotNumber={12}
        moduleName="Dr. Sengupta Explains — Video Education Series"
        tagline="Clinical Video Explanations"
        description="High-definition educational video guides addressing common patient questions on diabetic retinopathy prevention, carb counting, and morning glucose spikes (Dawn Phenomenon)."
        targetLink="/patient-resources/videos"
        targetLinkText="Watch Video Library"
      />

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
