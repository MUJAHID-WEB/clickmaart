import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import HeroCarousel from '../components/homepage/HeroCarousel';
import FeaturedProducts from '../components/homepage/FeaturedProducts';
import CategoryGrid from '../components/homepage/CategoryGrid';

const HomePage = () => {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen">
      <HeroCarousel />
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">{t('home.featured')}</h2>
        <FeaturedProducts />
        
        <h2 className="text-2xl font-bold mt-12 mb-6">Categories</h2>
        <CategoryGrid />
      </div>
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