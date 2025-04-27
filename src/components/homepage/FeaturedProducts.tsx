import { useTranslation } from 'next-i18next';
import ProductCard from '../common/ProductCard';

const FeaturedProducts = () => {
  const { t } = useTranslation('common');
  
  const featuredProducts = [
    {
      id: '1',
      name: t('products.shoes'),
      price: 299.99,
      discount: 15,
      images: ['/images/homepage/Product1.jpg'],
      rating: 4.5,
      category: 'shoes'
    },
    {
      id: '2',
      name: t('products.oil'),
      price: 24.99,
      discount: 10,
      images: ['/images/homepage/Product2.jpg'],
      rating: 4.2,
      category: 'oil'
    },
    {
      id: '3',
      name: t('products.bag'),
      price: 89.99,
      discount: 20,
      images: ['/images/homepage/Product3.jpg'],
      rating: 4.7,
      category: 'bags'
    },
  ];

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            showCategory={false}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;