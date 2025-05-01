import { getProducts } from '@/data/products';
import { useTranslation } from 'next-i18next';
import ProductCard from '../common/ProductCard';


const FeaturedProducts = () => {
  const { t } = useTranslation('common');
  const products = getProducts(t).slice(0,6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;