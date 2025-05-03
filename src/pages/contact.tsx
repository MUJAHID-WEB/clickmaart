import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import nextI18nextConfig from '../../next-i18next.config';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const ContactPage = () => {
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    // In a real app, you would send this data to your backend
    console.log(data);
    toast.success(t('contact.form_success'));
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('contact.title')}</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{t('contact.form_title')}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                {t('contact.name')} *
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { required: t('contact.required_field') })}
                className="w-full p-2 border rounded"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block mb-1">
                {t('contact.email')} *
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: t('contact.required_field'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('contact.invalid_email'),
                  },
                })}
                className="w-full p-2 border rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1">
                {t('contact.phone')}
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1">
                {t('contact.message')} *
              </label>
              <textarea
                id="message"
                rows={4}
                {...register('message', { required: t('contact.required_field') })}
                className="w-full p-2 border rounded"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700"
            >
              {t('contact.submit')}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">{t('contact.contact_info')}</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-indigo-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">{t('contact.address')}</h3>
                  <p>123 Business Center, Paltan</p>
                  <p>Dhaka 1000, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaPhone className="text-indigo-600 mr-3" />
                <div>
                  <h3 className="font-medium">{t('contact.phone')}</h3>
                  <p>+880 1234 567890</p>
                  <p>+880 9876 543210</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaEnvelope className="text-indigo-600 mr-3" />
                <div>
                  <h3 className="font-medium">{t('contact.email')}</h3>
                  <p>info@clickmaart.com</p>
                  <p>support@clickmaart.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaClock className="text-indigo-600 mr-3" />
                <div>
                  <h3 className="font-medium">{t('contact.hours')}</h3>
                  <p>{t('contact.weekdays')}: 9:00 AM - 6:00 PM</p>
                  <p>{t('contact.weekends')}: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t('contact.find_us')}</h2>
            <div className="h-64 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.216874160924!2d90.4096143154313!3d23.73622188459391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f7c9d8e6c5%3A0x8f1e8f9f9f9f9f9f!2sPaltan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
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

export default ContactPage;