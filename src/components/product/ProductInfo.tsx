import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { StarIcon } from '@heroicons/react/24/solid';
import Button from '@/components/common/Button';
import { Product } from '@/types';
import { toast } from 'react-toastify';
import Link from 'next/link';
// import { useTranslation } from 'next-i18next';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
    // const { t } = useTranslation('common');
  const { addToCart} = useCart();
  const [quantity, setQuantity] = useState(1);

  const discountedPrice = product.price * (1 - product.discount / 100);

  

const handleAddToCart = () => {
  try {
    if (!product.id || !product.name || !product.images?.[0]) {
      throw new Error('Invalid product data');
    }

    console.log('Attempting to add to cart:', {
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.images[0],
      quantity
    });

    addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.images[0] 
    }, quantity);

    toast.success(`${quantity} ${product.name} added to cart!`);
    console.log('Add to cart successful'); 
  } catch (error) {
    console.error('Add to cart error:', error);
    toast.error('Failed to add item to cart');
  }
};


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
        
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.rating.toFixed(1)}) | {product.stock} in stock
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {product.discount > 0 && (
            <>
              <span className="text-3xl font-bold text-indigo-600">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                Save {product.discount}%
              </span>
            </>
          )}
          {product.discount <= 0 && (
            <span className="text-3xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <p className="text-gray-700">{product.description}</p>

        <div className="border-t border-b border-gray-200 py-4">
          <h3 className="font-medium mb-2">Specifications:</h3>
          <div className="grid grid-cols-2 gap-2">
            {product.specifications?.map((spec, i) => (
              <div key={i} className="text-sm">
                <span className="text-gray-500">{spec.label}:</span>{' '}
                <span className="font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center border rounded">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100"  type="button"
            >
              -
            </button>
            <span className="px-4 py-2">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100"  type="button"
            >
              +
            </button>
          </div>

          <Button 
            onClick={handleAddToCart}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            type="button" 
          >
            Add to Cart
          </Button>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {/* {t('auth.no_account')}{' '} */}
            Or, Become a {" "}
            <Link href="/register/wholesaler" className="font-medium text-indigo-600 hover:text-indigo-500">
              {/* {t('auth.sign_up_link')} */}
              Wholesaler 
            </Link>
            {" "}/{" "}
            <Link href="/register/retailer" className="font-medium text-indigo-600 hover:text-indigo-500">
              {/* {t('auth.sign_up_link')} */}
               Retailer
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;