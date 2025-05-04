import { useTranslation } from 'next-i18next';
import ProductCard from '../common/ProductCard';
import { getProducts } from '@/data/products';

const RelatedProducts = ({ category, currentProductId }: { category: string; currentProductId?: string }) => {
  const { t } = useTranslation('common');
  
  const products = getProducts(t);
  const relatedProducts = products.filter(
    product => product.category === category && product.id !== currentProductId
  );


  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">
        {t('product.related_products')}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;