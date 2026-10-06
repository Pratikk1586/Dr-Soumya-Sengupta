import type { Language, LocalizedString } from '../types';

/**
 * Resolves a LocalizedString according to the active language.
 * Strict Fallback Rule: If 'hi' is requested but missing/empty, gracefully returns 'en'.
 */
export function getLocalizedText(
  localized: LocalizedString | undefined | null,
  lang: Language = 'en'
): string {
  if (!localized) return '';
  if (lang === 'hi' && localized.hi && localized.hi.trim().length > 0) {
    return localized.hi;
  }
  return localized.en || '';
}
