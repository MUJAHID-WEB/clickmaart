import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import nextI18nextConfig from '../../../next-i18next.config';

const ForgotPasswordPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('auth.invalid_email'))
      .required(t('auth.email_required')),
  });

  const handleSubmit = async (values: { email: string }) => {
    // In a real app, you would call your password reset API here
    console.log('Requesting password reset for:', values.email);
    // After successful request:
    router.push('/auth/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.forgot_password_title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.forgot_password_instructions')}
          </p>
        </div>
        
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    {t('auth.email')}
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={t('auth.email_placeholder')}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('auth.reset_password_button')}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center">
          <Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            {t('auth.back_to_sign_in')}
          </Link>
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

export default ForgotPasswordPage;