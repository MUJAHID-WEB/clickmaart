import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

type FormData = {
  email: string;
  password: string;
  remember?: boolean;
};

const LoginForm = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Add your login logic here
    console.log(data);
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t('login.title')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">{t('login.email')}</label>
          <input
            type="email"
            {...register('email', {
              required: t('login.required_field'),
              pattern: {
                value: /^\S+@\S+$/i,
                message: t('login.invalid_email'),
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">{t('login.password')}</label>
          <input
            type="password"
            {...register('password', {
              required: t('login.required_field'),
            })}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('remember')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm">{t('login.remember_me')}</span>
          </label>

          <Link href="/auth/forgot-password" className="text-sm text-indigo-600 hover:underline">
            {t('login.forgot_password')}
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {t('login.submit_button')}
        </button>

        <div className="text-center mt-4">
          <Link href="/auth/register" className="text-indigo-600 hover:underline">
            {t('login.no_account')}
          </Link>
        </div>
      </form>
    </div>
  );
};

// Make sure to export as default
export default LoginForm;