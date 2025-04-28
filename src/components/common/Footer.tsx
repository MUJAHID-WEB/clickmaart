import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-indigo-600 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row flex-wrap gap-8 justify-between">
          {/* Company Info */}
          <div className="w-full md:w-auto flex flex-col gap-2">
            <div className="max-w-[134px] mb-4">
              <a className='text-2xl font-bold mb-5' href='#'>Click Maart</a>
              {/* <Link href="/" className="block">
                <Image
                  src="/app/public/business/2024-11-16-673818c2b1dff.png"
                  alt="Logo"
                  width={134}
                  height={50}
                  className="w-auto h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/admin/img/160x160/img2.jpg";
                  }}
                />
              </Link> */}
            </div>
            <p className="mb-4 w-[300px]">
              {t('footer.description')}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="#" target="_blank">
                <Image
                  src="/images/homepage/gplay.svg"
                  alt="Google Play"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <Link href="#" target="_blank">
                <Image
                  src="/images/homepage/appstore.svg"
                  alt="App Store"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-full md:w-auto">
            <h5 className="text-lg font-semibold mb-5">{t('footer.support')}</h5>
            <ul className="space-y-3">
              {['privacy-policy', 'terms-and_conditions', 'refund', 'shipping-policy', 'cancelation'].map((policy) => (
                <li key={policy}>
                  <Link 
                    href={`/${policy}`}
                    className="text-white hover:underline text-sm md:text-base"
                  >
                    {t(`footer.policies.${policy.replace('-', '_')}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-auto">
            <h5 className="text-lg font-semibold mb-5">{t('footer.contact_us')}</h5>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 12 16" fill="currentColor" className="mt-0.5 flex-shrink-0">
                  <path d="M10.2379 2.73992C9.26683 1.06417 7.54208 0.0403906 5.62411 0.00126563C5.54223 -0.000421875 5.45983 -0.000421875 5.37792 0.00126563C3.45998 0.0403906 1.73523 1.06417 0.764169 2.73992C-0.228393 4.4528 -0.25555 6.5103 0.691513 8.24376L4.65911 15.5059C4.66089 15.5091 4.66267 15.5123 4.66451 15.5155C4.83908 15.8189 5.15179 16 5.50108 16C5.85033 16 6.16304 15.8189 6.33757 15.5155C6.33942 15.5123 6.3412 15.5091 6.34298 15.5059L10.3106 8.24376C11.2576 6.5103 11.2304 4.4528 10.2379 2.73992ZM5.50101 7.25002C4.26036 7.25002 3.25101 6.24067 3.25101 5.00002C3.25101 3.75936 4.26036 2.75002 5.50101 2.75002C6.74167 2.75002 7.75101 3.75936 7.75101 5.00002C7.75101 6.24067 6.7417 7.25002 5.50101 7.25002Z"></path>
                </svg>
                <span>Paltan, Dhaka, bangladesh</span>
              </li>
              <li className="flex items-start gap-2">
                <Link href="mailto:support@6amtech.com" className="flex items-start gap-2 hover:underline">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="mt-0.5 flex-shrink-0">
                    <path d="M0.333768 2.97362C2.52971 4.83334 6.38289 8.10516 7.51539 9.12531C7.66742 9.263 7.83049 9.333 7.99977 9.333C8.16871 9.333 8.33149 9.26366 8.48317 9.12663C9.61664 8.10547 13.4698 4.83334 15.6658 2.97362C15.8025 2.85806 15.8234 2.65494 15.7127 2.51366C15.4568 2.18719 15.0753 2 14.6664 2H1.33311C0.924268 2 0.542737 2.18719 0.286893 2.51369C0.176205 2.65494 0.197049 2.85806 0.333768 2.97362Z"></path>
                    <path d="M15.8067 3.98127C15.6885 3.92627 15.5495 3.94546 15.4512 4.02946C13.0159 6.0939 9.90788 8.74008 8.93 9.62124C8.38116 10.1167 7.61944 10.1167 7.06931 9.62058C6.027 8.68146 2.53675 5.71433 0.548813 4.02943C0.449844 3.94543 0.310531 3.9269 0.193344 3.98124C0.0755312 4.03596 0 4.1538 0 4.28368V12.6665C0 13.4019 0.597969 13.9998 1.33334 13.9998H14.6667C15.402 13.9998 16 13.4019 16 12.6665V4.28368C16 4.1538 15.9245 4.03565 15.8067 3.98127Z"></path>
                  </svg>
                  support@clickmaart.com
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <Link href="tel:01700000000" className="flex items-start gap-2 hover:underline">
                  <svg width="16" height="14" viewBox="0 0 14 14" fill="currentColor" className="mt-0.5 flex-shrink-0">
                    <path d="M13.6043 10.2746L11.6505 8.32085C10.9528 7.62308 9.76655 7.90222 9.48744 8.80928C9.27812 9.4373 8.58035 9.78618 7.95236 9.6466C6.55683 9.29772 4.67287 7.48353 4.32398 6.01822C4.11465 5.39021 4.53331 4.69244 5.1613 4.48314C6.0684 4.20403 6.3475 3.01783 5.64974 2.32007L3.696 0.366327C3.13778 -0.122109 2.30047 -0.122109 1.81203 0.366327L0.486277 1.69208C-0.839476 3.08761 0.62583 6.78576 3.90533 10.0653C7.18482 13.3448 10.883 14.8799 12.2785 13.4843L13.6043 12.1586C14.0927 11.6003 14.0927 10.763 13.6043 10.2746Z"></path>
                  </svg>
                  01700000000
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12 text-sm">
          © 2025-{new Date().getFullYear()} Click Maart. {t('footer.copyright_text')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;