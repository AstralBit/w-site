'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { locales, type Locale } from '../i18n/routing';

// 像素字体
const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

const SwitcherWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const LanguageButton = styled(Link)<{ $active: boolean }>`
  font-family: ${pixelFont};
  font-size: 0.5rem;
  padding: 6px 10px;
  border: 2px solid var(--foreground);
  background: ${props => props.$active ? '#00d4ff' : 'var(--card-bg)'};
  color: ${props => props.$active ? '#000' : 'var(--foreground)'};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.1s ease;
  
  /* 像素化阴影 */
  box-shadow: ${props => props.$active ? 'none' : '2px 2px 0 var(--foreground)'};
  transform: ${props => props.$active ? 'translate(2px, 2px)' : 'translate(0, 0)'};
  
  &:hover {
    background: ${props => props.$active ? '#00d4ff' : 'var(--foreground)'};
    color: ${props => props.$active ? '#000' : 'var(--background)'};
  }
`;

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
    <SwitcherWrapper>
      {locales.map((loc) => (
        <LanguageButton
          key={loc}
          href={`/${loc}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}
          $active={locale === loc}
        >
          {loc === 'zh' ? '中文' : 'EN'}
        </LanguageButton>
      ))}
    </SwitcherWrapper>
  );
}
