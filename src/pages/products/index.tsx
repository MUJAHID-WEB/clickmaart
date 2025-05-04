import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProductCard from '@/components/common/ProductCard';
import { getProducts } from '@/data/products';
// import { TFunction } from 'i18next';
import nextI18nextConfig from '../../../next-i18next.config';

const ProductsPage = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const products = getProducts(t).filter(product => {
    // Filter by search term
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    // Filter by price range
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = ['all', ...new Set(getProducts(t).map(product => product.category))];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">{t('products_grid.title')}</h1>
      
      <div className="grid lg:grid-cols-6 gap-8">
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search Bar */}

          <div>
            <h2 className="font-semibold mb-2">{t('products_grid.search')}</h2>
            <input
              type="text"
              placeholder={t('products_grid.search_placeholder')}
              className="w-full p-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <h2 className="font-semibold mb-2">{t('products_grid.categories')}</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category} className="flex items-center">
                  <input
                    type="radio"
                    id={category}
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="mr-2"
                  />
                  <label htmlFor={category}>
                    {t(`products_grid.categories.${category}`)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h2 className="font-semibold mb-2">{t('products_grid.price_range')}</h2>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Products Grid */}
        <div className="lg:col-span-5">
          {products.length === 0 ? (
            <p className="text-center py-8">{t('products_grid.no_products')}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
    },
  };
}

export default ProductsPage;