import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import CustomerReviews from '@/components/product/CustomerReviews';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { Product, Review } from '@/types';


const products: Product[] = [
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
    images: ['/images/homepage/Product1.jpg'],
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
    images: ['/images/homepage/Product1.jpg'],
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
    images: ['/images/homepage/Product2.jpg'],
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
    images: ['/images/homepage/Product2.jpg'],
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
    images: ['/images/homepage/Product3.jpg'],
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
    images: ['/images/homepage/Product3.jpg'],
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
];

const reviews: Record<string, Review[]> = {
  '1': [
    {
      id: '1',
      userName: 'John Doe',
      rating: 5,
      date: '2023-05-15',
      comment: 'Excellent shoes! Very comfortable and stylish.',
      location: 'New York, USA'
    },
    {
      id: '2',
      userName: 'Sarah Smith',
      rating: 4,
      date: '2023-04-28',
      comment: 'Great quality but runs a bit large.',
      location: 'London, UK'
    }
  ],
  '2': [
    {
      id: '1',
      userName: 'John Doe',
      rating: 5,
      date: '2023-05-15',
      comment: 'Excellent shoes! Very comfortable and stylish.',
      location: 'New York, USA'
    },
    {
      id: '2',
      userName: 'Sarah Smith',
      rating: 4,
      date: '2023-04-28',
      comment: 'Great quality but runs a bit large.',
      location: 'London, UK'
    }
  ],
  '3': [
    {
      id: '1',
      userName: 'John Doe',
      rating: 5,
      date: '2023-05-15',
      comment: 'Excellent shoes! Very comfortable and stylish.',
      location: 'New York, USA'
    },
    {
      id: '2',
      userName: 'Sarah Smith',
      rating: 4,
      date: '2023-04-28',
      comment: 'Great quality but runs a bit large.',
      location: 'London, UK'
    }
  ],
  '4': [
    {
      id: '1',
      userName: 'John Doe',
      rating: 5,
      date: '2023-05-15',
      comment: 'Excellent shoes! Very comfortable and stylish.',
      location: 'New York, USA'
    },
    {
      id: '2',
      userName: 'Sarah Smith',
      rating: 4,
      date: '2023-04-28',
      comment: 'Great quality but runs a bit large.',
      location: 'London, UK'
    }
  ],
  // Add reviews for other products...
};

const ProductDetailPage = ({ product, productReviews }: { product: Product; productReviews: Review[] }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');

  if (router.isFallback) {
    return <div className="container mx-auto py-8 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto py-8 text-center">Product not found</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">{t('product.description')}</h3>
            <p className="text-gray-700">{product.details}</p>
          </div>
        );
      case 'specifications':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">{t('product.specifications')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications?.map((spec, index) => (
                <div key={index} className="border-b pb-2">
                  <span className="font-medium">{spec.label}: </span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'shipping':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">{t('product.shipping')}</h3>
            <p className="text-gray-700">
              {t('product.shipping_details')}
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>{t('product.shipping_option1')}</li>
              <li>{t('product.shipping_option2')}</li>
              <li>{t('product.shipping_option3')}</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      {/* Product Details Tabs */}
      <div className="tabs mb-8 mr-4">
        <button 
          className={`tab tab-bordered ${activeTab === 'details' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          {t('product.details')}
        </button>
        <button 
          className={`tab tab-bordered ${activeTab === 'specifications' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('specifications')}
        >
          {t('product.specifications')}
        </button>
        <button 
          className={`tab tab-bordered ${activeTab === 'shipping' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('shipping')}
        >
          {t('product.shipping')}
        </button>
      </div>

      <div className="mb-16">
        {renderTabContent()}
      </div>

      <CustomerReviews 
        productId={product.id}
        reviews={productReviews}
        averageRating={product.rating}
        reviewCount={productReviews.length}
      />

      <RelatedProducts 
        category={product.category} 
        currentProductId={product.id}
      />
    </div>
  );
};


export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params, locale } = context;
  const product = products.find(p => p.id === params?.id);
  const productReviews = product ? reviews[product.id] || [] : [];

  if (!product) {
    return {
      notFound: true,
    };
  }
  

  return {
    props: {
      product,
      productReviews,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
    revalidate: 60, 
  };
};



export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = products.flatMap(product => 
    (locales || []).map(locale => ({
      params: { id: product.id },
      locale,
    }))
  );

  return {
    paths,
    fallback: 'blocking', 
  };
};
export default ProductDetailPage;