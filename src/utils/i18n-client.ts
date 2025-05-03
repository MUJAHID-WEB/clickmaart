
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import resources from '../../public/locales/en/common.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    resources: {
      en: {
        common: resources
      }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;