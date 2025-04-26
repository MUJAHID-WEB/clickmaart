import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Add your registration logic here
    console.log(data);
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t('register.title')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">{t('register.name')}</label>
          <input
            {...register('name', { required: t('register.required_field') })}
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">{t('register.email')}</label>
          <input
            type="email"
            {...register('email', {
              required: t('register.required_field'),
              pattern: {
                value: /^\S+@\S+$/i,
                message: t('register.invalid_email'),
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">{t('register.password')}</label>
          <input
            type="password"
            {...register('password', {
              required: t('register.required_field'),
              minLength: {
                value: 8,
                message: t('register.password_min_length'),
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">{t('register.confirm_password')}</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: t('register.required_field'),
              validate: (value) =>
                value === watch('password') || t('register.passwords_mismatch'),
            })}
            className="w-full p-2 border rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {t('register.submit_button')}
        </button>

        <div className="text-center mt-4">
          <Link href="/auth/login" className="text-indigo-600 hover:underline">
            {t('register.already_have_account')}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;