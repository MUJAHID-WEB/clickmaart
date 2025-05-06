import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


import HeroCarousel from '@/components/homepage/HeroCarousel';
import FeaturedProducts from '@/components/homepage/FeaturedProducts';
import CategoryGrid from '@/components/homepage/CategoryGrid';
import BecomeMember from '@/components/homepage/BecomeMember';
import AboutUs from '@/components/homepage/AboutUs';
import HowItWorks from '@/components/homepage/HowItWorks';
import nextI18nConfig from 'next-i18next.config';


const HomePage = () => {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      <CategoryGrid />

      <div className="container mx-auto pt-8">
        <h2 className="text-2xl font-bold mb-6">{t('home.featured')}</h2>
        <FeaturedProducts />
      </div>

      <BecomeMember />

      <HowItWorks />

      <AboutUs/>
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18nConfig)),
    },
  };
}

export default HomePage;