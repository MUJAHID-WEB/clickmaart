
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import i18n from '../utils/i18n-client';

type LanguageContextType = {
  language: string;
  changeLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'bn',
  changeLanguage: () => {},
});

const cleanPathFromLocale = (path: string): string => {
  // Remove any existing locale prefix and ensure single leading slash
  return path.replace(/^\/(bn|en)(\/|$)/, '/').replace(/^\/\//, '/');
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [language, setLanguage] = useState('bn');

  const changeLanguage = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      setLanguage(lang);
      
          // Get clean path without any locale prefix
          const cleanPath = cleanPathFromLocale(router.asPath);
      
          // Construct new path with the selected language
          const newPath = `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
          
          // Only navigate if the path would actually change
          if (router.asPath !== newPath) {
            router.push(newPath, undefined, { locale: lang, shallow: true });
          }
    } catch (err) {
      console.error('Language change failed:', err);
    }
  };

  useEffect(() => {
    if (router.locale && router.locale !== language) {
      i18n.changeLanguage(router.locale);
      setLanguage(router.locale);
      
      const cleanPath = cleanPathFromLocale(router.asPath);
      const correctPath = `/${router.locale}${cleanPath === '/' ? '' : cleanPath}`;
      
      if (router.asPath !== correctPath) {
        router.replace(correctPath, undefined, { locale: router.locale, shallow: true });
      }
    }
  }, [router.locale]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);