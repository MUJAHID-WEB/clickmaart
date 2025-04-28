import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BecomeMember from '@/components/homepage/BecomeMember';
import HeroCarousel from '@/components/homepage/HeroCarousel';
import FeaturedProducts from '@/components/homepage/FeaturedProducts';
import CategoryGrid from '@/components/homepage/CategoryGrid';
import AboutUs from '@/components/homepage/AboutUs';


const HomePage = () => {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      <AboutUs/>
      
      <div className="container mx-auto pt-8">
        <h2 className="text-2xl font-bold mb-6">{t('home.featured')}</h2>
        <FeaturedProducts />
      </div>

      <CategoryGrid />

      <BecomeMember />
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default HomePage;