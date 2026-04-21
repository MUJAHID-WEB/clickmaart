import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";
import AdminLayout from "@/admin/layouts/AdminLayout";
import { appWithTranslation } from "next-i18next";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import SharedAppProviders from "@/providers/SharedAppProviders";

export function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  // Check if the current route is an admin route
  const isAdminRoute = router.pathname.startsWith('/admin');

  return (
    <div className="pb-16 md:pb-0">
      <SharedAppProviders>
        {isAdminRoute ? (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SharedAppProviders>
    </div>
  );
}

export default appWithTranslation(MyApp);
