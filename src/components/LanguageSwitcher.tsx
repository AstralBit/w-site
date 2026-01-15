'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { locales, type Locale } from '../i18n/routing';

const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px currentColor; }
  50% { box-shadow: 0 0 10px currentColor, 0 0 15px currentColor; }
`;

const SwitcherWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  border: 2px solid rgba(0, 212, 255, 0.5);
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.5);

  /* 像素角 */
  clip-path: polygon(
    0 4px, 4px 4px, 4px 0,
    calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
  );
`;

const LanguageButton = styled(Link)<{ $active: boolean }>`
  font-family: ${pixelFont};
  font-size: 0.45rem;
  padding: 8px 10px;
  background: ${props => props.$active ? '#00d4ff' : 'transparent'};
  color: ${props => props.$active ? '#0a0a0a' : '#888'};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  ${props => props.$active && `
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.5), inset 0 0 10px rgba(0, 212, 255, 0.3);
  `}

  &::before {
    content: "${props => props.$active ? '●' : '○'}";
    font-size: 6px;
    color: ${props => props.$active ? '#0a0a0a' : '#00d4ff'};
    ${props => !props.$active && `
      text-shadow: 0 0 5px #00d4ff;
    `}
  }

  &:hover {
    background: ${props => props.$active ? '#00d4ff' : 'rgba(0, 212, 255, 0.2)'};
    color: ${props => props.$active ? '#0a0a0a' : '#00d4ff'};
    ${props => !props.$active && `
      text-shadow: 0 0 10px #00d4ff;
    `}

    &::before {
      animation: ${bounce} 0.3s ease-in-out;
    }
  }

  &:not(:last-child) {
    border-right: 1px solid rgba(0, 212, 255, 0.3);
  }
`;

const Flag = styled.span`
  font-size: 12px;
  line-height: 1;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
`;

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const getPathWithoutLocale = () => {
    const segments = pathname.split('/');
    if (segments[1] && locales.includes(segments[1] as Locale)) {
      segments.splice(1, 1);
    }
    return segments.join('/') || '/';
  };

  const pathWithoutLocale = getPathWithoutLocale();

  const getFlag = (loc: Locale) => {
    return loc === 'zh' ? '🇨🇳' : '🇺🇸';
  };

  const getLabel = (loc: Locale) => {
    return loc === 'zh' ? '中' : 'EN';
  };

  return (
    <SwitcherWrapper>
      {locales.map((loc) => (
        <LanguageButton
          key={loc}
          href={`/${loc}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}
          $active={locale === loc}
        >
          <Flag>{getFlag(loc)}</Flag>
          {getLabel(loc)}
        </LanguageButton>
      ))}
    </SwitcherWrapper>
  );
}
