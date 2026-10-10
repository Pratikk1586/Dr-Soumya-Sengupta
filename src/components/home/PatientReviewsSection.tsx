import React from 'react';
import { ExternalLink, Star, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { reviewService } from '../../services';
import { ENABLE_PATIENT_REVIEWS_SECTION } from '../../config/constants';
import { ENV } from '../../config/env';

export const PatientReviewsSection: React.FC = () => {
  const { localize, isHindi } = useLanguage();
  const { data: reviews, isLoading } = useService(() => reviewService.getReviews(), []);

  if (!ENABLE_PATIENT_REVIEWS_SECTION) {
    return null;
  }

  return (
    <Section
      eyebrow={isHindi ? 'मरीजों की राय' : 'Patient Reviews'}
      heading={isHindi ? 'मरीजों के वास्तविक अनुभव' : 'Verified Patient Reviews'}
      lede={
        isHindi
          ? 'डॉ. सौम्य सेनगुप्ता क्लिनिक पर मरीजों और उनके परिवारों द्वारा गूगल मैप्स पर साझा की गई वास्तविक समीक्षाएं।'
          : 'Real feedback shared by patients and families on Google Maps regarding consultation care and diabetes management.'
      }
      containerSize="xl"
      className="bg-white border-b border-slate-200/80 py-10 sm:py-14"
    >
      {isLoading ? (
        <div className="py-8 text-center text-xs text-slate-500">Loading reviews...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews?.map((review) => (
            <Card
              key={review.id}
              hoverable
              padding="sm"
              className="p-4 sm:p-5 border-slate-200/90 shadow-2xs hover:shadow-xs flex flex-col justify-between bg-white transition-all h-full"
            >
              <div className="space-y-3">
                {/* 5-Star Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-semibold border border-teal-200/60">
                    <ShieldCheck className="w-3 h-3 text-teal-700 shrink-0" aria-hidden="true" />
                    <span>Google</span>
                  </span>
                </div>

                {/* Review Comment */}
                <blockquote className="text-slate-700 text-xs sm:text-[13px] leading-relaxed italic">
                  "{localize(review.comment)}"
                </blockquote>
              </div>

              {/* Reviewer Details & Link */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                <div className="min-w-0">
                  <span className="font-bold text-slate-900 block text-xs truncate">
                    {review.patientInitials}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {review.year || (isHindi ? 'सत्यापित समीक्षा' : 'Verified Review')}
                  </span>
                </div>

                {review.url && (
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0f3d4a] hover:text-[#1b6c83] shrink-0 hover:underline"
                    aria-label={`View ${review.patientInitials} review on Google Maps`}
                  >
                    <span>{isHindi ? 'देखें' : 'View'}</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Subtle ethics notice & Google review link */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-[11px]">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" aria-hidden="true" />
          <span>
            {isHindi
              ? 'एनएमसी दिशानिर्देशों के तहत यह मरीजों का व्यक्तिगत अनुभव है, परिणाम व्यक्ति-विशिष्ट हो सकते हैं।'
              : 'NMC compliant — Individual patient experiences; clinical outcomes vary per individual.'}
          </span>
        </div>

        {ENV.hasGoogleMaps && (
          <a
            href={ENV.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#0f3d4a] hover:underline text-xs"
          >
            <span>{isHindi ? 'गूगल मैप्स पर सभी समीक्षाएं देखें' : 'View All Reviews on Google Maps'}</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </Section>
  );
};
