import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

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
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);