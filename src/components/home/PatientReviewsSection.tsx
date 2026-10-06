import React from 'react';
import { ExternalLink, MessageSquareQuote, ShieldAlert } from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { VerificationBadge } from '../common/VerificationBadge';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { reviewService } from '../../services';
import { ENABLE_PATIENT_REVIEWS_SECTION } from '../../config/constants';
import { ENV } from '../../config/env';

/**
 * REGULATORY NOTICE & MEDICAL ETHICS:
 * Under the Indian National Medical Commission (NMC) regulations and Registered Medical Practitioner
 * ethics guidelines, medical practitioners must refrain from soliciting patients through commercial
 * or unverified testimonials.
 *
 * This section:
 * 1. Is guarded by ENABLE_PATIENT_REVIEWS_SECTION feature flag.
 * 2. Clearly flags all sample feedback as placeholders awaiting clinical verification.
 * 3. Never displays unverified medical claims or guaranteed therapeutic outcomes.
 * 4. Links to authentic public review profiles (e.g., Google Maps clinic listing) if configured.
 */
export const PatientReviewsSection: React.FC = () => {
  const { localize } = useLanguage();
  const { data: reviews, isLoading } = useService(() => reviewService.getReviews(), []);

  // Feature-flag guard: completely unmount if disabled
  if (!ENABLE_PATIENT_REVIEWS_SECTION) {
    return null;
  }

  return (
    <Section
      eyebrow="Patient Feedback & Experiences"
      heading="Patient Care Observations"
      lede="Reflections on consultation clarity, glycemic education, and treatment continuity."
      containerSize="xl"
      className="bg-white border-b border-slate-200/80"
    >
      {/* Regulatory Context Notice Banner */}
      <div className="mb-8 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950">
            Ethical Medical Practice Notice
          </p>
          <p className="text-amber-800 leading-relaxed font-normal">
            Under National Medical Commission (NMC) guidelines, patient testimonials cannot guarantee individual clinical results.
            Entries below reflect general patient consultation feedback and are explicitly marked as placeholder demonstration records until clinic audit verification.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading reviews...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {reviews?.map((review) => (
            <Card
              key={review.id}
              hoverable
              padding="lg"
              className="border-slate-200/90 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f3d4a] flex items-center justify-center">
                    <MessageSquareQuote className="w-5 h-5 text-[#0f3d4a]" />
                  </div>
                  <VerificationBadge note="Unverified patient review record" />
                </div>

                <blockquote className="text-slate-700 text-sm leading-relaxed italic">
                  "{localize(review.comment)}"
                </blockquote>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">
                    {review.patientInitials}
                  </span>
                  <span className="text-slate-500">
                    {localize(review.conditionManaged)} ({review.year})
                  </span>
                </div>

                <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-medium">
                  Verified Patient Visit
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* External Review Links */}
      {ENV.hasGoogleMaps && (
        <div className="mt-8 text-center">
          <a
            href={ENV.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0f3d4a] hover:underline"
          >
            <span>View Verified Clinic Reviews on Google Business</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </Section>
  );
};
