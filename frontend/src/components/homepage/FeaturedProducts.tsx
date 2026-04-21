import type { Product } from '@/types';
import ProductCard from '../common/ProductCard';


const FeaturedProducts = ({ products }: { products: Product[] }) => {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 10);
  const visibleProducts =
    featuredProducts.length > 0 ? featuredProducts : products.slice(0, 10);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 pb-16">
      {visibleProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
