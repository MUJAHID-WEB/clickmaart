import { useTranslation } from 'next-i18next';
import ProductCard from '../common/ProductCard';
import Link from 'next/link';

const FeaturedProducts = () => {
  const { t } = useTranslation('common');

  const bnToEn = (bnNumber: string): string => {
    const bnDigits = '০১২৩৪৫৬৭৮৯';
    const enDigits = '0123456789';
    return bnNumber.replace(/[০-৯]/g, digit => enDigits[bnDigits.indexOf(digit)]);
  };
  
  const featuredProducts = [
    {
      id: '1',
      name: t('home.products.shoes'),
      price: parseFloat(bnToEn(t('home.products.shoes_price'))),
      discount: 15,
      images: ['/images/homepage/Product1.jpg'],
      rating: parseFloat(bnToEn(t('home.products.shoes_rating'))),
      category: t('product.category'),
      description: t('home.products.shoes_description'),
      stock: parseInt(bnToEn(t('home.products.shoes_stock'))),
      specifications: [
        { label: t('product.material'), value: t('product.material_value') },
        { label: t('product.size'), value: t('product.size_value') }
      ]
    },
    {
      id: '2',
      name: t('home.products.oil'),
      price: parseFloat(bnToEn(t('home.products.shoes_price'))),
      discount: 10,
      images: ['/images/homepage/Product2.jpg'],
      rating: parseFloat(bnToEn(t('home.products.shoes_rating'))),
      category: t('product.category'),
      description: t('home.products.oil_description'),
      stock: parseInt(bnToEn(t('home.products.shoes_stock'))),
      specifications: [
        { label: t('product.material'), value: t('product.material_value') },
        { label: t('product.size'), value: t('product.size_value') }
      ]
    },
    {
      id: '3',
      name: t('home.products.bag'),
      price: parseFloat(bnToEn(t('home.products.shoes_price'))),
      discount: 20,
      images: ['/images/homepage/Product3.jpg'],
      rating: parseFloat(bnToEn(t('home.products.shoes_rating'))),
      category: t('product.category'),
      description: t('home.products.bag_description'),
      stock: parseInt(bnToEn(t('home.products.shoes_stock'))),
      specifications: [
        { label: t('product.material'), value: t('product.material_value') },
        { label: t('product.size'), value: t('product.size_value') }
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