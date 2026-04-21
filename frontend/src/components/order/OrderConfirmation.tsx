import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const OrderConfirmation = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-lg mx-auto">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">{t('order_confirmation.title')}</h1>
        <p className="mb-6">
          {t('order_confirmation.message')} <span className="font-semibold">{orderId}</span>
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/products"
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {t('order_confirmation.continue_shopping')}
          </Link>
          <Link
            href={`/orders/${orderId}`}
            className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
          >
            {t('order_confirmation.view_order')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;