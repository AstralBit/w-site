'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px currentColor, 0 0 10px currentColor; }
  50% { box-shadow: 0 0 15px currentColor, 0 0 25px currentColor, 0 0 35px currentColor; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SwitcherButton = styled.button<{ $isDark: boolean }>`
  font-family: ${pixelFont};
  font-size: 0.5rem;
  padding: 8px 12px;
  border: 2px solid ${props => props.$isDark ? '#ffff00' : '#a78bfa'};
  background: rgba(0, 0, 0, 0.5);
  color: ${props => props.$isDark ? '#ffff00' : '#a78bfa'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s ease;
  position: relative;
  box-shadow: ${props => props.$isDark 
    ? '0 0 10px rgba(255, 255, 0, 0.3), inset 0 0 10px rgba(255, 255, 0, 0.1)' 
    : '0 0 10px rgba(167, 139, 250, 0.3), inset 0 0 10px rgba(167, 139, 250, 0.1)'};

  /* 像素角 */
  clip-path: polygon(
    0 4px, 4px 4px, 4px 0,
    calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
  );

  &:hover {
    background: ${props => props.$isDark ? '#ffff00' : '#a78bfa'};
    color: #0a0a0a;
    animation: ${glow} 1s ease-in-out infinite;
    box-shadow: ${props => props.$isDark 
      ? '0 0 20px rgba(255, 255, 0, 0.5)' 
      : '0 0 20px rgba(167, 139, 250, 0.5)'};

    .icon {
      animation: ${spin} 0.5s ease-out;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  .icon {
    font-size: 14px;
    display: inline-block;
    filter: ${props => props.$isDark 
      ? 'drop-shadow(0 0 5px #ffff00)' 
      : 'drop-shadow(0 0 5px #a78bfa)'};
  }

  .label {
    text-shadow: ${props => props.$isDark 
      ? '0 0 10px #ffff00' 
      : '0 0 10px #a78bfa'};
  }

  @media (max-width: 640px) {
    padding: 8px;
    
    .label {
      display: none;
    }
  }
`;

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const themeValue = newTheme ? 'dark' : 'light';
    localStorage.setItem('theme', themeValue);
    document.documentElement.setAttribute('data-theme', themeValue);
  };

  if (!mounted) {
    return (
      <SwitcherButton $isDark={false}>
        <span className="icon">🌙</span>
        <span className="label">DARK</span>
      </SwitcherButton>
    );
  }

  return (
    <SwitcherButton $isDark={isDark} onClick={toggleTheme} aria-label="Toggle theme">
      <span className="icon">{isDark ? '☀️' : '🌙'}</span>
      <span className="label">{isDark ? 'LIGHT' : 'DARK'}</span>
    </SwitcherButton>
  );
}
