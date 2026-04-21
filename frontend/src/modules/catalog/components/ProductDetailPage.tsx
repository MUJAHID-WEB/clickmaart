"use client";

import CustomerReviews from "@/components/product/CustomerReviews";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import type { Product, Review } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type ProductDetailPageProps = {
  product: Product;
  relatedProducts: Product[];
  reviews?: Review[];
};

export default function ProductDetailPage({
  product,
  relatedProducts,
  reviews = [],
}: ProductDetailPageProps) {
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState("details");

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">{t("product.description")}</h3>
            <p className="text-gray-700">
              {product.details ??
                product.description ??
                "Product details will appear here shortly."}
            </p>
          </div>
        );
      case "specifications":
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">
              {t("product.specifications")}
            </h3>
            {product.specifications && product.specifications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((specification, index) => (
                  <div key={index} className="border-b pb-2">
                    <span className="font-medium">{specification.label}: </span>
                    <span>{specification.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-700">
                Specifications will be available after the catalog sync finishes.
              </p>
            )}
          </div>
        );
      case "shipping":
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">{t("product.shipping")}</h3>
            <p className="text-gray-700">{t("product.shipping_details")}</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>{t("product.shipping_option1")}</li>
              <li>{t("product.shipping_option2")}</li>
              <li>{t("product.shipping_option3")}</li>
              <li>{t("product.shipping_option4")}</li>
            </ul>
            <p className="mt-3 text-green-600 font-medium">
              {t("product.shipping_note")}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="tabs mb-8 mr-4 flex gap-4">
        <button
          className={`tab tab-bordered pb-2 border-b-2 ${
            activeTab === "details"
              ? "border-indigo-700 text-indigo-700"
              : "border-black text-black"
          }`}
          onClick={() => setActiveTab("details")}
        >
          {t("product.description")}
        </button>
        <button
          className={`tab tab-bordered pb-2 border-b-2 ${
            activeTab === "specifications"
              ? "border-indigo-700 text-indigo-700"
              : "border-black text-black"
          }`}
          onClick={() => setActiveTab("specifications")}
        >
          {t("product.specifications")}
        </button>
        <button
          className={`tab tab-bordered pb-2 border-b-2 ${
            activeTab === "shipping"
              ? "border-indigo-700 text-indigo-700"
              : "border-black text-black"
          }`}
          onClick={() => setActiveTab("shipping")}
        >
          {t("product.shipping")}
        </button>
      </div>

      <div className="mb-16">{renderTabContent()}</div>

      <CustomerReviews
        productId={product.id}
        reviews={reviews}
        averageRating={product.rating}
        reviewCount={reviews.length || product.reviewCount || 0}
      />

      <RelatedProducts
        category={product.category}
        currentProductId={product.id}
        products={relatedProducts}
      />
    </div>
  );
}
