// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// export const getStaticTranslations = async (locale: string, namespaces: string[]) => {
//     const translations = await serverSideTranslations(locale, namespaces);
    
//     return {
//       t: (key: string) => {
//         const keys = key.split('.');
//         let value: any = translations._nextI18Next?.initialI18nStore?.[locale]?.common;
        
//         for (const k of keys) {
//           value = value?.[k];
//           if (value === undefined) return key;
//         }
//         return value || key;
//       },
//       translations
//     };
//   };