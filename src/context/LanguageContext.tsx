import React, { useEffect, useCallback, useMemo } from 'react';
import type { Language, LocalizedString } from '../types';
import { getTranslation, localize as localizeHelper } from '../i18n';
import { LanguageContext } from './languageContextDef';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<Language>('dr_sengupta_preferred_lang', 'en');

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  }, [setLanguage]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      if (language === 'hi') {
        document.documentElement.classList.add('font-devanagari');
      } else {
        document.documentElement.classList.remove('font-devanagari');
      }
    }
  }, [language]);

  const localize = useCallback(
    (obj: LocalizedString | undefined | null) => {
      return localizeHelper(obj, language);
    },
    [language]
  );

  const t = useCallback(
    (keyOrObj: string | LocalizedString | undefined | null) => {
      if (!keyOrObj) return '';
      if (typeof keyOrObj === 'string') {
        return getTranslation(keyOrObj, language);
      }
      return localizeHelper(keyOrObj, language);
    },
    [language]
  );

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      localize,
      isHindi: language === 'hi',
    }),
    [language, setLanguage, toggleLanguage, t, localize]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

