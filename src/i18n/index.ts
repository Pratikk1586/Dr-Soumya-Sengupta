import { en, type TranslationDictionary } from './en';
import { hi } from './hi';
import type { Language, LocalizedString } from '../types';

export { en, hi };
export type { TranslationDictionary };

export const translations = { en, hi };

// Helper to resolve dot-notation paths safely
type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? string extends F
      ? string
      : `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string;

export type TranslationKey = Join<PathsToStringProps<TranslationDictionary>, '.'>;

export function getTranslation(key: string, lang: Language): string {
  const dict = translations[lang] || translations.en;
  const parts = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = dict;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // Fallback to English
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fallbackCurrent: any = translations.en;
      for (const fPart of parts) {
        if (fallbackCurrent && typeof fallbackCurrent === 'object' && fPart in fallbackCurrent) {
          fallbackCurrent = fallbackCurrent[fPart];
        } else {
          return key;
        }
      }
      return typeof fallbackCurrent === 'string' ? fallbackCurrent : key;
    }
  }
  return typeof current === 'string' ? current : key;
}

/**
 * Helper localize(LocalizedString, lang)
 * Resolves bilingual object with automatic fallback to English
 */
export function localize(
  localized: LocalizedString | undefined | null,
  lang: Language = 'en'
): string {
  if (!localized) return '';
  if (lang === 'hi' && localized.hi && localized.hi.trim().length > 0) {
    return localized.hi;
  }
  return localized.en || '';
}
