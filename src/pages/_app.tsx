import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
// import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

function MyApp({ Component, pageProps }: AppProps) {
  // const { locale } = useRouter();

  return (
    <LanguageProvider>
      {/* <div dir={locale === "bn" ? "rtl" : "ltr"}> */}
      <div dir="ltl">
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </div>
    </LanguageProvider>
  );
}

export default appWithTranslation(MyApp);
