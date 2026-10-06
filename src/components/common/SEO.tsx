import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/useLanguage';
import { ENV } from '../../config/env';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  structuredData?: Record<string, unknown> | object;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  structuredData,
}) => {
  const { language } = useLanguage();

  const baseTitle = 'Dr. Soumya Sengupta — Diabetologist & Metabolic Physician';
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  const defaultDescription =
    'Specialist Diabetology practice by Dr. Soumya Sengupta. Advanced Type 1 and Type 2 diabetes care, continuous glucose monitoring (CGM), and cardiovascular-renal risk reduction.';
  const metaDescription = description || defaultDescription;

  const siteUrl = ENV.siteUrl || 'https://drsoumyasengupta.com';
  const canonicalUrl = `${siteUrl.replace(/\/$/, '')}${canonicalPath ? `/${canonicalPath.replace(/^\//, '')}` : ''}`;

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={language === 'hi' ? 'hi_IN' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />

      {/* Structured Data (Schema.org) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
