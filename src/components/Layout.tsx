import { ReactNode } from 'react';
import Head from 'next/head';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';


interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title = 'ClickMaart' }: LayoutProps) => {

  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="E-commerce application" />
      </Head>
      <div className="min-h-screen flex flex-col" dir="ltr">
        <Header />
        <main className="flex-grow container mx-auto px-4 pb-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;