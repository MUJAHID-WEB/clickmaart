import { AppProps } from "next/app";
// import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { appWithTranslation } from "next-i18next";
// import nextI18NextConfig from 'next-i18next.config';
import nextI18nConfig from 'next-i18next.config';

export function MyApp({ Component, pageProps }: AppProps) {
  // const { locale } = useRouter();

  return (
    
    <CartProvider>
      <LanguageProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </LanguageProvider>
    </CartProvider>
  );
}

export default appWithTranslation(MyApp, nextI18nConfig);
