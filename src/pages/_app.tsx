import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { CartProvider } from "@/contexts/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <div dir={locale === "bn" ? "rtl" : "ltr"}>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </div>
  );
}

export default appWithTranslation(MyApp);
