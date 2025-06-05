import path from 'path';

/** @type {import('next-i18next').UserConfig} */
const config = {
  i18n: {
    locales: ['bn', 'en'],
    defaultLocale: 'bn',
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  saveMissing: true,
  localePath: path.resolve('./public/locales'),
};
export default config;

// module.exports = config;