import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProductGallery from '../../components/product/ProductGallery';
import ProductInfo from '../../components/product/ProductInfo';
import RelatedProducts from '../../components/product/RelatedProducts';

const ProductDetailPage = () => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { id } = router.query;
  
    const product = {
      id: id as string,
      name: t('product.sample_name'), 
      price: 99.99,
      discount: 0,
      description: t('product.sample_description'),
      images: ['/placeholder-product.jpg'],
      rating: 4.5,
      stock: 10,
      specifications: [
        { label: t('product.material'), value: t('product.premium') },
        { label: t('product.weight'), value: '1.2kg' }
      ],
      category: 'electronics'
    };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>
      
      <RelatedProducts category="electronics" />
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])), 
      },
    };
  }

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default ProductDetailPage;