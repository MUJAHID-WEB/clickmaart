import ProductCard from '../common/ProductCard';
import { useRouter } from 'next/router';
import { Product } from '@/types';

interface RelatedProductsProps {
  category: string;
  currentProductId?: string;
}

const RelatedProducts = ({ category, currentProductId }: RelatedProductsProps) => {
  const router = useRouter();
  

  const relatedProducts: Product[] = [
    {
      id: '2',
      name: router.locale === 'bn' ? 'ওয়্যারলেস হেডফোন' : 'Wireless Headphones',
      price: 89.99,
      discount: 20,
      images: ['/products/headphones.jpg'], 
      rating: 4.7,
      category: 'electronics',
      description: 'High-quality wireless headphones',
      stock: 15,
      specifications: [
        { label: 'Color', value: 'Black' },
        { label: 'Battery', value: '20 hours' }
      ]
    },
    {
      id: '4',
      name: router.locale === 'bn' ? 'স্মার্টওয়াচ' : 'Smart Watch',
      price: 199.99,
      discount: 15,
      images: ['/products/watch.jpg'],
      rating: 4.3,
      category: 'electronics',
      description: 'Latest smart watch with health tracking',
      stock: 8
    },
    {
      id: '5',
      name: router.locale === 'bn' ? 'ব্লুটুথ স্পিকার' : 'Bluetooth Speaker',
      price: 59.99,
      discount: 10,
      images: ['/products/speaker.jpg'],
      rating: 4.1,
      category: 'electronics',
      stock: 12
    },
  ].filter(product => 
    product.id !== currentProductId && 
    product.category === category
  );

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold mb-6">
        {router.locale === 'bn' ? 'সম্পর্কিত পণ্য' : 'Related Products'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map(product => (
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

export default RelatedProducts;