import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { appWithTranslation } from "next-i18next";
// import nextI18NextConfig from 'next-i18next.config.js';
// import nextI18nConfig from 'next-i18next.config';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

export function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    console.log('Current locale:', router.locale);
  }, [router.locale]);
  
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null; 

  return (
    <div className="pb-16 md:pb-0">
        <CartProvider>
          <LanguageProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
          </LanguageProvider>
        </CartProvider>
    </div>
  
  );
}

export default appWithTranslation(MyApp);
