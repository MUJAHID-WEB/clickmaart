import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enResources from '../../public/locales/en/common.json';
import bnResources from '../../public/locales/bn/common.json';


i18n
  .use(initReactI18next)
  .init({
    lng: 'bn',
    fallbackLng: 'bn',
    ns: ['common'],
    defaultNS: 'common',
    resources: {
      en: { common: enResources },
      bn: { common: bnResources }
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false 
    }
  })
  .then(() => console.log('i18n initialized', i18n.language))
  .catch(err => console.error('i18n init failed', err));

// Log language changes
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to', lng);
  
  // Sync URL with language change
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(bn|en)/, `/${lng}`);
    
    if (!currentPath.startsWith(`/${lng}`)) {
      window.location.pathname = newPath;
    }
  }
});

export default i18n;