import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import nextI18nextConfig from '../../next-i18next.config';
import AboutUs from '@/components/homepage/AboutUs';

const AboutPage = () => {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen">
      <Head>
        <title>{t('about.page_title')} | Your Store</title>
        <meta name="description" content={t('about.meta_description')} />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('about.title')}</h1>
        
        <AboutUs/>
        {/* About Us Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{t('about.about_us')}</h2>
            <p className="text-gray-700 mb-6">{t('about.about_content')}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">{t('about.mission')}</h3>
                <p className="text-gray-700">{t('about.mission_content')}</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">{t('about.vision')}</h3>
                <p className="text-gray-700">{t('about.vision_content')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{t('about.our_services')}</h2>
            <p className="text-gray-700 mb-6">{t('about.services_intro')}</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['wholesaler', 'retailer', 'store', 'customer'].map((service) => (
                <div 
                  key={service} 
                  className="border border-gray-200 p-6 rounded-lg hover:border-indigo-300 transition-colors"
                >
                  <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t(`about.${service}_dashboard`)}</h3>
                  <p className="text-gray-700">{t(`about.${service}_description`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section>
          <div className="bg-white rounded-lg shadow p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">{t('about.faqs')}</h2>
            <p className="text-gray-700 mb-6">{t('about.faqs_intro')}</p>
            
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="border-b pb-6 last:border-b-0">
                  <h3 className="text-lg font-medium text-indigo-700">{t(`about.faq${item}_question`)}</h3>
                  <p className="text-gray-700 mt-2">{t(`about.faq${item}_answer`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
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

export default AboutPage;