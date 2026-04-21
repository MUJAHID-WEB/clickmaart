import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enResources from '../../public/locales/en/common.json';
import bnResources from '../../public/locales/bn/common.json';

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
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
  });
}

export default i18n;
