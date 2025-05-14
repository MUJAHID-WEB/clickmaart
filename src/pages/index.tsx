import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import HeroCarousel from "@/components/homepage/HeroCarousel";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
// import CategoryGrid from "@/components/homepage/CategoryGrid";
// import BecomeMember from '@/components/homepage/BecomeMember';
import HowItWorks from "@/components/homepage/HowItWorks";
import nextI18nConfig from "next-i18next.config";
import { getProducts } from "@/data/products";
import ProductCard from "@/components/common/ProductCard";

const HomePage = () => {
  const { t } = useTranslation("common");
  const products = getProducts(t);

  return (
    <div className="min-h-screen">
      <HeroCarousel />
      {/* <div className="md:hidden">
        <CategoryGrid />
      </div> */}

      <div className="container mx-auto pt-8">
        <h2 className="text-2xl font-bold mb-6">{t("home.featured")}</h2>
        <FeaturedProducts />
      </div>

      <div className="container mx-auto ">
        <h2 className="text-2xl font-bold mb-6">{t('products_grid.title')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 pb-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* <BecomeMember /> */}

      <HowItWorks />
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], nextI18nConfig)),
    },
  };
}

export default HomePage;
