import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useLanguage } from '../../contexts/LanguageContext';

const Header = () => {
  const { t } = useTranslation('common');
  const { language, changeLanguage } = useLanguage();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          Admin Store
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link href="/" className="hover:text-indigo-600">
            {t('header.home')}
          </Link>
          <Link href="/products" className="hover:text-indigo-600">
            {t('header.products')}
          </Link>
          <Link href="/cart" className="hover:text-indigo-600">
            {t('header.cart')}
          </Link>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => changeLanguage('en')}
              className={`px-2 py-1 rounded ${language === 'en' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
            >
              English
            </button>
            <button 
              onClick={() => changeLanguage('bn')}
              className={`px-2 py-1 rounded ${language === 'bn' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
            >
              বাংলা
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;