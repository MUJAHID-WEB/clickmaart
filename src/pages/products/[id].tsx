import { useState } from 'react';
import { useRouter } from 'next/router';
import {  TFunction, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import CustomerReviews from '@/components/product/CustomerReviews';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { Product, Review } from '@/types';
import { getProducts, getReviews } from '@/data/products';
// import { TFunction } from 'next-i18next';
import i18next from 'i18next';
import nextI18nextConfig from 'next-i18next.config.js';


// interface ReviewsMap {
//   [key: string]: Review[];
// }

const ProductDetailPage = ({ product, productReviews }: { product: Product; productReviews: Review[] }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');

  if (router.isFallback) {
    return <div className="container mx-auto py-8 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto py-8 text-center">Product not found</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">{t('product.description')}</h3>
            <p className="text-gray-700">{product.details}</p>
          </div>
        );
      case 'specifications':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">{t('product.specifications')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications?.map((spec, index) => (
                <div key={index} className="border-b pb-2">
                  <span className="font-medium">{spec.label}: </span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'shipping':
        return (
          <div>
          <h3 className="text-xl font-bold mb-4">{t('product.shipping')}</h3>
          <p className="text-gray-700">
            {t('product.shipping_details')}
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>{t('product.shipping_option1')}</li>
            <li>{t('product.shipping_option2')}</li>
            <li>{t('product.shipping_option3')}</li>
            <li>{t('product.shipping_option4')}</li>
          </ul>
          <p className="mt-3 text-green-600 font-medium">
            {t('product.shipping_note')}
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

      {/* Product Details Tabs */}
      <div className="tabs mb-8 mr-4 flex gap-4">
  <button 
    className={`tab tab-bordered pb-2 border-b-2 ${
      activeTab === 'details' 
        ? 'border-indigo-700 text-indigo-700' 
        : 'border-black text-black'
    }`}
    onClick={() => setActiveTab('details')}
  >
    {t('product.description')}
  </button>
  <button 
    className={`tab tab-bordered pb-2 border-b-2 ${
      activeTab === 'specifications' 
        ? 'border-indigo-700 text-indigo-700' 
        : 'border-black text-black'
    }`}
    onClick={() => setActiveTab('specifications')}
  >
    {t('product.specifications')}
  </button>
  <button 
    className={`tab tab-bordered pb-2 border-b-2 ${
      activeTab === 'shipping' 
        ? 'border-indigo-700 text-indigo-700' 
        : 'border-black text-black'
    }`}
    onClick={() => setActiveTab('shipping')}
  >
    {t('product.shipping')}
  </button>
</div>


      <div className="mb-16">
        {renderTabContent()}
      </div>

      <CustomerReviews 
        productId={product.id}
        reviews={productReviews}
        averageRating={product.rating}
        reviewCount={productReviews.length}
      />

      <RelatedProducts 
        category={product.category} 
        currentProductId={product.id}
      />
    </div>
  );
};


export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: { params: { id: string }; locale: string }[] = [];

  const emptyT = ((key: string) => key) as TFunction;
  const products = getProducts(emptyT);

  for (const product of products) {
    for (const locale of locales || ['en']) {
      paths.push({
        params: { id: product.id },
        locale
      });
    }
  }

  return {
    paths,
    fallback: 'blocking'
  };
};


export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params, locale = 'en' } = context;

  const translations = await serverSideTranslations(locale, ['common'], nextI18nextConfig);
  const t = i18next.getFixedT(locale, 'common');

  const products = getProducts(t);
  const product = products.find(p => p.id === params?.id);
  const productReviews = product ? getReviews()[product.id] || [] : [];

  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product,
      productReviews,
      ...(translations || {})
    },
    revalidate: 60
  };
};

export default ProductDetailPage;

