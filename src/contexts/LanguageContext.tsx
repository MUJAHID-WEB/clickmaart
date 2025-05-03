
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import i18n from '../utils/i18n-client';

type LanguageContextType = {
  language: string;
  changeLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [language, setLanguage] = useState(router.locale || 'en');

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  useEffect(() => {
    if (router.locale) {
      setLanguage(router.locale);
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);