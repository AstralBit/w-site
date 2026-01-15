'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { locales, type Locale } from '../i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  // 获取不带语言前缀的路径
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/');
    // 如果第一个非空段是语言代码，移除它
    if (segments[1] && locales.includes(segments[1] as Locale)) {
      segments.splice(1, 1);
    }
    return segments.join('/') || '/';
  };

  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <div className="flex gap-2">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={`/${loc}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}
          className={`px-3 py-1 rounded ${
            locale === loc
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {loc === 'zh' ? '中文' : 'English'}
        </Link>
      ))}
    </div>
  );
}

