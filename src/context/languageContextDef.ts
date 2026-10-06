import { createContext } from 'react';
import type { Language, LocalizedString } from '../types';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (keyOrObj: string | LocalizedString | undefined | null) => string;
  localize: (obj: LocalizedString | undefined | null) => string;
  isHindi: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
