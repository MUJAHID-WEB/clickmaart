import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import nextI18nextConfig from '../../../next-i18next.config';

const SignInPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('auth.invalid_email'))
      .required(t('auth.email_required')),
    password: Yup.string()
      .min(6, t('auth.password_min'))
      .required(t('auth.password_required')),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    // In a real app, you would call your authentication API here
    console.log('Signing in with:', values);
    // After successful sign in:
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.sign_in_title')}
          </h2>
        </div>
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
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
                
                <div>
                  <label htmlFor="password" className="sr-only">
                    {t('auth.password')}
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={t('auth.password_placeholder')}
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Field
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    {t('auth.remember_me')}
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {t('auth.forgot_password')}
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('auth.sign_in_button')}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t('auth.no_account')}{' '}
            <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              {t('auth.sign_up_link')}
            </Link>
          </p>
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

export default SignInPage;