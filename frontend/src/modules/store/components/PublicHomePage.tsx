"use client";

import ProductCard from "@/components/common/ProductCard";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import HeroCarousel from "@/components/homepage/HeroCarousel";
import HowItWorks from "@/components/homepage/HowItWorks";
import type { Product } from "@/types";
import { useTranslation } from "react-i18next";

export default function PublicHomePage({
  products,
}: {
  products: Product[];
}) {
  const { t } = useTranslation("common");

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      <div className="container mx-auto pt-8">
        <h2 className="text-2xl font-bold mb-6">{t("home.featured")}</h2>
        <FeaturedProducts products={products} />
      </div>

      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          {t("products_grid.title")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 pb-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <HowItWorks />
    </div>
  );
}
