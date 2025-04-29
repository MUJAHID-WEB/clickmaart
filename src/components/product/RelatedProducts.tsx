import { useTranslation } from 'next-i18next';
import ProductCard from '../common/ProductCard';
import Link from 'next/link';

const RelatedProducts = ({ category, currentProductId }: { category: string; currentProductId?: string }) => {
  const { t } = useTranslation('common');
  
  // Complete product data including all required properties
  const relatedProducts = [
     // Shoes category
  {
    id: '1',
    name: 'Premium Shoes',
    price: 299.99,
    discount: 15,
    images: ['/images/homepage/Product1.jpg'],
    rating: 4.5,
    category: 'shoes',
    description: 'High-quality premium shoes with comfortable design',
    stock: 10,
    specifications: [
      { label: 'Material', value: 'Genuine Leather' },
      { label: 'Size', value: 'US 7-12' },
      { label: 'Color', value: 'Black/Brown' },
      { label: 'Warranty', value: '1 Year' }
    ],
    details: 'These premium shoes are crafted from the finest materials to provide both style and comfort. The cushioned insoles and breathable lining ensure all-day comfort.'
  },
  {
    id: '4',
    name: 'Running Shoes',
    price: 129.99,
    discount: 10,
    images: ['/images/homepage/Product4.jpg'],
    rating: 4.3,
    category: 'shoes',
    description: 'Lightweight running shoes for athletes',
    stock: 15,
    specifications: [
      { label: 'Material', value: 'Mesh Fabric' },
      { label: 'Size', value: 'US 6-13' }
    ],
    details: 'Designed for runners who need responsive cushioning and breathability.'
  },
  {
    id: '5',
    name: 'Casual Sneakers',
    price: 79.99,
    discount: 0,
    images: ['/images/homepage/Product5.jpg'],
    rating: 4.1,
    category: 'shoes',
    description: 'Everyday comfortable sneakers',
    stock: 20,
    specifications: [
      { label: 'Material', value: 'Canvas' },
      { label: 'Size', value: 'US 5-12' }
    ],
    details: 'Perfect for daily wear with cushioned footbed and flexible sole.'
  },

  // Oil category
  {
    id: '2',
    name: 'Organic Oil',
    price: 24.99,
    discount: 10,
    images: ['/images/homepage/Product2.jpg'],
    rating: 4.2,
    category: 'oil',
    description: 'Pure organic oil for cooking and health benefits',
    stock: 25,
    specifications: [
      { label: 'Volume', value: '500ml' },
      { label: 'Type', value: 'Organic' }
    ],
    details: 'Cold-pressed from premium quality seeds with no additives.'
  },
  {
    id: '6',
    name: 'Coconut Oil',
    price: 19.99,
    discount: 5,
    images: ['/images/homepage/Product6.jpg'],
    rating: 4.4,
    category: 'oil',
    description: 'Virgin coconut oil for cooking and skincare',
    stock: 18,
    specifications: [
      { label: 'Volume', value: '250ml' },
      { label: 'Type', value: 'Virgin' }
    ],
    details: 'Extracted from fresh coconuts without chemical processing.'
  },
  {
    id: '7',
    name: 'Olive Oil',
    price: 29.99,
    discount: 15,
    images: ['/images/homepage/Product7.jpg'],
    rating: 4.6,
    category: 'oil',
    description: 'Extra virgin olive oil',
    stock: 12,
    specifications: [
      { label: 'Volume', value: '1L' },
      { label: 'Type', value: 'Extra Virgin' }
    ],
    details: 'Imported from Mediterranean region with rich flavor.'
  },

  // Bags category
  {
    id: '3',
    name: 'Designer Bag',
    price: 89.99,
    discount: 20,
    images: ['/images/homepage/Product3.jpg'],
    rating: 4.7,
    category: 'bags',
    description: 'Stylish designer bag with multiple compartments',
    stock: 15,
    specifications: [
      { label: 'Material', value: 'Genuine Leather' },
      { label: 'Dimensions', value: '30x40cm' }
    ],
    details: 'Fashionable yet functional with ample storage space.'
  },
  {
    id: '8',
    name: 'Backpack',
    price: 49.99,
    discount: 10,
    images: ['/images/homepage/Product8.jpg'],
    rating: 4.2,
    category: 'bags',
    description: 'Durable backpack for everyday use',
    stock: 22,
    specifications: [
      { label: 'Material', value: 'Nylon' },
      { label: 'Capacity', value: '20L' }
    ],
    details: 'Water-resistant material with padded straps for comfort.'
  },
  {
    id: '9',
    name: 'Laptop Bag',
    price: 59.99,
    discount: 0,
    images: ['/images/homepage/Product9.jpg'],
    rating: 4.3,
    category: 'bags',
    description: 'Professional laptop bag with padding',
    stock: 14,
    specifications: [
      { label: 'Material', value: 'Polyester' },
      { label: 'Compatibility', value: 'Up to 15.6"' }
    ],
    details: 'Protects your laptop with cushioned compartments.'
  }
  ].filter(product => product.category === category && product.id !== currentProductId);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">
        {t('product.related_products')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map(product => (
          <Link 
            key={product.id}
            href={`/products/${product.id}`}
            passHref
          >
            <div>
              <ProductCard 
                product={product}
                showCategory={false}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;