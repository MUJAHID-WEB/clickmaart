
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/CartContext';

// import { useClientCart } from "@/hooks/useClientCart";



const CartPage = () => {
  // const { t } = useTranslation('common');
  const { t } = useTranslation('common');
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
 

  console.log('Translation for cart.summary:', t('cart.summary'));

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCartIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <p className="text-lg mb-4">
          {t('cart.empty')}
          </p>
        <Link href="/products">{t('cart.continue_shopping')}</Link>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('cart.title')}</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCartIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-lg mb-4">{t('cart.empty')}</p>
          <Link 
            href="/products" 
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            {t('cart.continue_shopping')}
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="flex items-start border-b py-4">
                <div className="w-24 h-24 bg-gray-100 rounded mr-4 relative">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 border rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 border rounded-r"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      {t('cart.remove')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">{t('cart.summary')}</h2>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>{t('cart.total')}:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block mt-6 w-full bg-indigo-600 text-white py-2 text-center rounded hover:bg-indigo-700"
              >
                {t('cart.checkout')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale || 'en', ['common'])),
//     },
//   };
// };


export default CartPage;


