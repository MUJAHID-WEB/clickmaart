import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4 text-center">
        <p>{t('copyright')} © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;