import React, { useState, useEffect, useCallback } from 'react';
import type { Language, LocalizedString } from '../types/content';
import { getLocalizedText } from '../utils/localization';
import { LanguageContext } from './languageContextDef';

const STORAGE_KEY = 'dr_sengupta_preferred_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'hi' || saved === 'en') {
        return saved;
      }
    } catch {
      // Ignore storage access restrictions
    }
    return 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  }, [language, setLanguage]);

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'hi') {
      document.documentElement.classList.add('font-devanagari');
    } else {
      document.documentElement.classList.remove('font-devanagari');
    }
  }, [language]);

  const t = useCallback(
    (localized: LocalizedString | undefined | null) => {
      return getLocalizedText(localized, language);
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isHindi: language === 'hi',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
