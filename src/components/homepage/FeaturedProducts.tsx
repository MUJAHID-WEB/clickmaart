import { getProducts } from '@/data/products';
import { useTranslation } from 'next-i18next';
import ProductCard from '../common/ProductCard';


const FeaturedProducts = () => {
  const { t } = useTranslation('common');
  const products = getProducts(t).slice(0,10);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 pb-16">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;