import { AppProps } from "next/app";
// import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { appWithTranslation } from "next-i18next";
// import nextI18NextConfig from 'next-i18next.config';
// import nextI18nConfig from 'next-i18next.config';
import { useEffect, useState } from 'react';

export function MyApp({ Component, pageProps }: AppProps) {
  // const { locale } = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null; 

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

export default appWithTranslation(MyApp);
