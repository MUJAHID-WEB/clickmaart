import { useTranslation } from 'next-i18next';
import ProductCard from '../common/ProductCard';

const FeaturedProducts = () => {
  const { t } = useTranslation('common');
  
  const featuredProducts = [
    {
      id: '1',
      name: t('products.smartphone'),
      price: 299.99,
      discount: 15,
      images: ['/products/phone.jpg'],
      rating: 4.5,
      category: 'electronics'
    },
    {
      id: '2',
      name: t('products.tshirt'),
      price: 24.99,
      discount: 10,
      images: ['/products/tshirt.jpg'],
      rating: 4.2,
      category: 'clothing'
    },
    {
      id: '3',
      name: t('products.headphones'),
      price: 89.99,
      discount: 20,
      images: ['/products/headphones.jpg'],
      rating: 4.7,
      category: 'electronics'
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