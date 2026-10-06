import { createContext } from 'react';
import type { Language, LocalizedString } from '../types/content';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (localized: LocalizedString | undefined | null) => string;
  isHindi: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
