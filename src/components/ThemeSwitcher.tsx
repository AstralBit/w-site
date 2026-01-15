'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// 像素字体
const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

// 动画
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const SwitcherButton = styled.button<{ $isDark: boolean }>`
  width: 36px;
  height: 36px;
  border: 2px solid var(--foreground);
  background: var(--card-bg);
  color: ${props => props.$isDark ? '#fbbf24' : '#525252'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.1s ease;
  position: relative;
  
  /* 像素化阴影 */
  box-shadow: 2px 2px 0 var(--foreground);
  
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 var(--foreground);
    
    span {
      animation: ${props => props.$isDark ? rotate : pulse} 0.5s ease-in-out;
    }
  }
  
  &:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }
  
  span {
    display: inline-block;
  }
`;

// 像素化图标
const SunIcon = styled.span`
  font-family: ${pixelFont};
  font-size: 0.75rem;
  color: #fbbf24;
`;

const MoonIcon = styled.span`
  font-family: ${pixelFont};
  font-size: 0.75rem;
  color: #a78bfa;
`;

// 在服务端使用 useEffect，在客户端使用 useLayoutEffect
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    // 检查本地存储或系统偏好
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

  // 避免服务端渲染不匹配
  if (!mounted) {
    return (
      <SwitcherButton $isDark={false}>
        <MoonIcon>🌙</MoonIcon>
      </SwitcherButton>
    );
  }

  return (
    <SwitcherButton $isDark={isDark} onClick={toggleTheme} aria-label="切换主题">
      <span>{isDark ? '☀️' : '🌙'}</span>
    </SwitcherButton>
  );
}
