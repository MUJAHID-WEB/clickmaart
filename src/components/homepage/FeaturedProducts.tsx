import { useTranslation } from 'next-i18next';
import ProductCard from '../common/ProductCard';
import Link from 'next/link';

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
      category: 'shoes',
      description: t('products.shoes_description'),
      stock: 10,
      specifications: [
        { label: t('product.material'), value: 'Leather' },
        { label: t('product.size'), value: 'Various' }
      ]
    },
    {
      id: '2',
      name: t('products.oil'),
      price: 24.99,
      discount: 10,
      images: ['/images/homepage/Product2.jpg'],
      rating: 4.2,
      category: 'oil',
      description: t('products.oil_description'),
      stock: 25,
      specifications: [
        { label: t('product.volume'), value: '500ml' },
        { label: t('product.type'), value: 'Organic' }
      ]
    },
    {
      id: '3',
      name: t('products.bag'),
      price: 89.99,
      discount: 20,
      images: ['/images/homepage/Product3.jpg'],
      rating: 4.7,
      category: 'bags',
      description: t('products.bag_description'),
      stock: 15,
      specifications: [
        { label: t('product.material'), value: 'Canvas' },
        { label: t('product.dimensions'), value: '30x40cm' }
      ]
    },
  ];

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} passHref>
   
              <ProductCard 
                product={product}
                showCategory={false}
              />
  
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;