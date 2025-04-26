module.exports = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'bn'],
      localeDetection: false,
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  }