import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { DOCTOR_DATA } from '../../data/doctor';
import type { DoctorSocialLink } from '../../types';
import { cn } from '../../utils/cn';

interface DoctorSocialLinksProps {
  variant?: 'icons' | 'cards' | 'chips';
  theme?: 'light' | 'dark';
  className?: string;
  links?: DoctorSocialLink[];
  title?: string;
}

// Pixel-perfect SVG Brand Icons
const SocialIcon: React.FC<{ platform: DoctorSocialLink['platform']; className?: string }> = ({
  platform,
  className = 'w-4 h-4',
}) => {
  switch (platform) {
    case 'youtube':
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn('fill-current', className)}
          aria-hidden="true"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn('fill-current', className)}
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn('fill-current', className)}
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn('fill-current', className)}
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn('fill-current', className)}
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      );
    default:
      return null;
  }
};

const getPlatformStyles = (platform: DoctorSocialLink['platform'], theme: 'light' | 'dark' = 'light') => {
  if (theme === 'dark') {
    switch (platform) {
      case 'youtube':
        return {
          brandBg: 'bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-600 hover:text-white hover:border-red-600',
          cardBorder: 'hover:border-red-400 hover:shadow-red-500/20',
          badgeBg: 'bg-red-950/80 text-red-300',
          accentText: 'text-red-400',
        };
      case 'facebook':
        return {
          brandBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-600 hover:text-white hover:border-blue-600',
          cardBorder: 'hover:border-blue-400 hover:shadow-blue-500/20',
          badgeBg: 'bg-blue-950/80 text-blue-300',
          accentText: 'text-blue-400',
        };
      case 'instagram':
        return {
          brandBg: 'bg-pink-500/15 text-pink-400 border-pink-500/30 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-600 hover:to-purple-600 hover:text-white hover:border-pink-600',
          cardBorder: 'hover:border-pink-400 hover:shadow-pink-500/20',
          badgeBg: 'bg-pink-950/80 text-pink-300',
          accentText: 'text-pink-400',
        };
      case 'linkedin':
        return {
          brandBg: 'bg-sky-500/15 text-sky-400 border-sky-500/30 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]',
          cardBorder: 'hover:border-sky-400 hover:shadow-sky-500/20',
          badgeBg: 'bg-sky-950/80 text-sky-300',
          accentText: 'text-sky-400',
        };
      case 'whatsapp':
        return {
          brandBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600 hover:text-white hover:border-emerald-600',
          cardBorder: 'hover:border-emerald-400 hover:shadow-emerald-500/20',
          badgeBg: 'bg-emerald-950/80 text-emerald-300',
          accentText: 'text-emerald-400',
        };
      default:
        return {
          brandBg: 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white',
          cardBorder: 'hover:border-slate-600',
          badgeBg: 'bg-slate-800 text-slate-300',
          accentText: 'text-slate-300',
        };
    }
  }

  switch (platform) {
    case 'youtube':
      return {
        brandBg: 'bg-red-50 text-red-600 border-red-200/80 hover:bg-red-600 hover:text-white hover:border-red-600',
        cardBorder: 'hover:border-red-300 hover:shadow-red-500/10',
        badgeBg: 'bg-red-100 text-red-800',
        accentText: 'text-red-600',
      };
    case 'facebook':
      return {
        brandBg: 'bg-blue-50 text-blue-600 border-blue-200/80 hover:bg-blue-600 hover:text-white hover:border-blue-600',
        cardBorder: 'hover:border-blue-300 hover:shadow-blue-500/10',
        badgeBg: 'bg-blue-100 text-blue-800',
        accentText: 'text-blue-600',
      };
    case 'instagram':
      return {
        brandBg: 'bg-pink-50 text-pink-600 border-pink-200/80 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-600 hover:to-purple-600 hover:text-white hover:border-pink-600',
        cardBorder: 'hover:border-pink-300 hover:shadow-pink-500/10',
        badgeBg: 'bg-pink-100 text-pink-800',
        accentText: 'text-pink-600',
      };
    case 'linkedin':
      return {
        brandBg: 'bg-sky-50 text-sky-700 border-sky-200/80 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]',
        cardBorder: 'hover:border-sky-300 hover:shadow-sky-500/10',
        badgeBg: 'bg-sky-100 text-sky-800',
        accentText: 'text-sky-700',
      };
    case 'whatsapp':
      return {
        brandBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/80 hover:bg-emerald-600 hover:text-white hover:border-emerald-600',
        cardBorder: 'hover:border-emerald-300 hover:shadow-emerald-500/10',
        badgeBg: 'bg-emerald-100 text-emerald-800',
        accentText: 'text-emerald-600',
      };
    default:
      return {
        brandBg: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-800 hover:text-white',
        cardBorder: 'hover:border-slate-300',
        badgeBg: 'bg-slate-100 text-slate-800',
        accentText: 'text-slate-700',
      };
  }
};

export const DoctorSocialLinks: React.FC<DoctorSocialLinksProps> = ({
  variant = 'icons',
  theme = 'light',
  className,
  links = DOCTOR_DATA.socialLinks || [],
  title,
}) => {
  const { localize, isHindi } = useLanguage();

  if (!links || links.length === 0) return null;

  // Variant 1: Compact circular icon buttons (ideal for headers, sidebars, home teaser)
  if (variant === 'icons') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {title && (
          <span className={cn('text-xs font-semibold select-none mr-1', theme === 'dark' ? 'text-slate-300' : 'text-slate-500')}>
            {title}
          </span>
        )}
        <div className="flex items-center gap-1.5 flex-wrap">
          {links.map((link) => {
            const styles = getPlatformStyles(link.platform, theme);
            const labelText = localize(link.label);
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer',
                  styles.brandBg
                )}
                aria-label={`Dr. Soumya Sengupta on ${labelText}`}
                title={`Dr. Soumya Sengupta on ${labelText} (${link.handle || ''})`}
              >
                <SocialIcon platform={link.platform} className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // Variant 2: Pill badges / chips (clean, readable text with platform icon)
  if (variant === 'chips') {
    return (
      <div className={cn('flex flex-wrap items-center gap-2', className)}>
        {links.map((link) => {
          const styles = getPlatformStyles(link.platform);
          const labelText = localize(link.label);
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 shadow-2xs hover:scale-102 active:scale-98 cursor-pointer',
                styles.brandBg
              )}
            >
              <SocialIcon platform={link.platform} className="w-3.5 h-3.5" />
              <span>{labelText}</span>
              {link.handle && (
                <span className="opacity-75 font-normal text-[11px] hidden sm:inline">
                  {link.handle}
                </span>
              )}
            </a>
          );
        })}
      </div>
    );
  }

  // Variant 3: Interactive cards grid (rich layout for dedicated Doctor sections)
  return (
    <div className={cn('grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5', className)}>
      {links.map((link) => {
        const styles = getPlatformStyles(link.platform);
        const labelText = localize(link.label);
        const descText = link.description ? localize(link.description) : undefined;

        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer',
              styles.cardBorder
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105',
                    styles.brandBg
                  )}
                >
                  <SocialIcon platform={link.platform} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#103F4A] transition-colors leading-tight">
                    {labelText}
                  </h4>
                  {link.handle && (
                    <span className="text-xs text-slate-500 font-mono">
                      {link.handle}
                    </span>
                  )}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0 mt-0.5" />
            </div>

            {descText && (
              <p className="text-xs text-slate-600 leading-relaxed">
                {descText}
              </p>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#103F4A]">
              <span>{isHindi ? 'प्रोफाइल देखें' : 'Visit Profile'}</span>
              <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">
                &rarr;
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
};
