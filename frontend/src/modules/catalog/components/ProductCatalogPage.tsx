"use client";

import ProductCard from "@/components/common/ProductCard";
import type { Product } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const formatCategoryLabel = (category: string) =>
  category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

export default function ProductCatalogPage({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const { t } = useTranslation("common");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  const allProducts = initialProducts;
  const categories = ["all", ...new Set(allProducts.map((product) => product.category))];

  const products = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">{t("products_grid.title")}</h1>

      <div className="grid lg:grid-cols-6 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="font-semibold mb-2">{t("products_grid.search")}</h2>
            <input
              type="text"
              placeholder={t("products_grid.search_placeholder")}
              className="w-full p-2 border rounded"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div>
            <h2 className="font-semibold mb-2">
              {t("products_grid.categories")}
            </h2>
            <div className="lg:space-y-2 flex lg:flex-col gap-4 items-center lg:items-start whitespace-nowrap py-4 flex-wrap">
              {categories.map((category) => (
                <div key={category} className="flex items-center flex-shrink-0">
                  <input
                    type="radio"
                    id={category}
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="mr-2"
                  />
                  <label htmlFor={category}>
                    {category === "all"
                      ? t("products_grid.categories.all")
                      : formatCategoryLabel(category)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">
              {t("products_grid.price_range")}
            </h2>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="50000"
                step="100"
                value={priceRange[1]}
                onChange={(event) =>
                  setPriceRange([priceRange[0], parseInt(event.target.value, 10)])
                }
                className="w-full"
              />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          {products.length === 0 ? (
            <p className="text-center py-8">{t("products_grid.no_products")}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
