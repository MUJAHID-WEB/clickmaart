import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'next/router';

const CheckoutPage = () => {
  const { t } = useTranslation('common');
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const handlePlaceOrder = () => {
    clearCart();
    router.push('/order-confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('checkout.title')}</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">{t('checkout.shipping_info')}</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">{t('checkout.full_name')}</label>
              <input type="text" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block mb-1">{t('checkout.address')}</label>
              <input type="text" className="w-full p-2 border rounded" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">{t('checkout.city')}</label>
                <input type="text" className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block mb-1">{t('checkout.postal_code')}</label>
                <input type="text" className="w-full p-2 border rounded" required />
              </div>
            </div>
            <div>
              <label className="block mb-1">{t('checkout.phone')}</label>
              <input type="tel" className="w-full p-2 border rounded" required />
            </div>
          </form>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">{t('checkout.order_summary')}</h2>
          <div className="border rounded-lg p-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">{t('checkout.quantity', { count: item.quantity })}</p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-semibold">
                <span>{t('checkout.total')}:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              {t('checkout.place_order')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}

export default CheckoutPage;