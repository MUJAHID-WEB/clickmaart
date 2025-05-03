import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18nextConfig from '../../../next-i18next.config';

const OrderDetailsPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { id } = router.query;

  // In a real app, you would fetch order data based on the ID
  const order = {
    id,
    date: '2023-06-15',
    status: 'Delivered',
    items: [
      { id: '1', name: 'Running Shoes', price: 99.99, quantity: 1, image: '/images/homepage/Product1.jpg' },
      { id: '2', name: 'Olive Oil', price: 29.99, quantity: 2, image: '/images/homepage/Product2.jpg' },
    ],
    total: 159.97,
    shippingAddress: '123 Main St, Dhaka, Bangladesh',
    paymentMethod: 'Cash on Delivery',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {t('order.title')} #{order.id}
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Order Items */}
          <div className="border rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">{t('order.items')}</h2>
            {order.items.map(item => (
              <div key={item.id} className="flex items-center border-b py-4">
                <div className="w-20 h-20 bg-gray-100 rounded mr-4 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} × {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between font-semibold mt-4 pt-4 border-t">
              <span>{t('order.total')}:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">{t('order.shipping_info')}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-600">{t('order.shipping_address')}</h3>
                <p>{order.shippingAddress}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600">{t('order.payment_method')}</h3>
                <p>{order.paymentMethod}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600">{t('order.order_date')}</h3>
                <p>{order.date}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600">{t('order.order_status')}</h3>
                <p className={`font-semibold ${
                  order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {order.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="border rounded-lg p-4 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">{t('order.summary')}</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>{t('order.subtotal')}:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('order.shipping')}:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                <span>{t('order.total')}:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 mb-2"
            >
              {t('order.print_invoice')}
            </button>
            <button
              onClick={() => router.push('/products')}
              className="w-full border border-indigo-600 text-indigo-600 py-2 rounded hover:bg-indigo-50"
            >
              {t('order.continue_shopping')}
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
      ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default OrderDetailsPage;