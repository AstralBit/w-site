"use client";

import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "../i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

// 像素字体
const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

// 动画
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--header-bg);
  border-bottom: 4px solid var(--foreground);
  transition: background-color 0.3s ease;

  /* 像素化扫描线效果 */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.05) 50%);
    background-size: 100% 4px;
    pointer-events: none;
  }
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Logo = styled(Link)`
  font-family: ${pixelFont};
  font-size: 1rem;
  color: var(--foreground);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &::before {
    content: "◀";
    color: #00d4ff;
    animation: ${pulse} 2s ease-in-out infinite;
  }

  &::after {
    content: "▶";
    color: #ff2d7b;
    animation: ${pulse} 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  &:hover {
    color: #00d4ff;
    text-shadow: 2px 2px 0 #ff2d7b;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-family: ${pixelFont};
  color: var(--text-secondary);
  text-decoration: none;
  padding: 8px 12px;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  position: relative;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    color: var(--foreground);
    border-color: var(--foreground);
    background: var(--card-bg);

    /* 像素化阴影 */
    box-shadow: 4px 4px 0 var(--foreground);
    transform: translate(-2px, -2px);
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: none;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PixelDivider = styled.div`
  width: 4px;
  height: 24px;
  background: var(--foreground);
  margin: 0 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

// 像素风格的移动端菜单按钮
const MobileMenuButton = styled.button<{ $isOpen?: boolean }>`
  display: none;
  font-family: ${pixelFont};
  font-size: 1.25rem;
  background: ${props => props.$isOpen ? '#00d4ff' : 'transparent'};
  border: 2px solid var(--foreground);
  color: ${props => props.$isOpen ? '#000' : 'var(--foreground)'};
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$isOpen ? 'none' : '2px 2px 0 var(--foreground)'};
  transform: ${props => props.$isOpen ? 'translate(2px, 2px)' : 'translate(0, 0)'};

  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    background: ${props => props.$isOpen ? '#00d4ff' : 'var(--card-bg)'};
    color: ${props => props.$isOpen ? '#000' : '#00d4ff'};
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }
`;

// 移动端菜单面板
const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--header-bg);
    border-top: 4px solid var(--foreground);
    border-bottom: 4px solid var(--foreground);
    box-shadow: 0 8px 0 var(--foreground);
    padding: 16px;
    animation: ${slideIn} 0.2s ease-out;
    
    /* 像素化扫描线效果 */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.03) 50%);
      background-size: 100% 4px;
      pointer-events: none;
    }
  }
`;

// 移动端导航链接容器
const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

// 移动端导航链接
const MobileNavLink = styled(Link)`
  font-family: ${pixelFont};
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 12px 16px;
  border: 2px solid var(--foreground);
  background: var(--card-bg);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 4px 4px 0 var(--foreground);

  &::before {
    content: "▶";
    color: #00d4ff;
    font-size: 0.5rem;
  }

  &:hover, &:active {
    background: #00d4ff;
    color: #000;
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 var(--foreground);
  }
`;

// 移动端操作区域
const MobileActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 2px dashed var(--card-border);
`;

// 移动端菜单标题
const MobileMenuTitle = styled.div`
  font-family: ${pixelFont};
  font-size: 0.5rem;
  color: var(--text-muted);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "◆";
    color: #ff2d7b;
  }

  &::after {
    content: "_";
    animation: ${blink} 1s step-end infinite;
  }
`;

// 遮罩层
const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
`;

// 装饰性像素点
const PixelDot = styled.span<{ $color?: string; $delay?: number }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: ${(props) => props.$color || "#00d4ff"};
  animation: ${pulse} 2s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay || 0}s;

  @media (max-width: 640px) {
    width: 6px;
    height: 6px;
  }
`;

const PixelIndicator = styled.div`
  display: flex;
  gap: 4px;
  margin-right: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logoText?: string;
  navItems?: NavItem[];
}

export default function Header({
  logoText = "PIXEL",
  navItems = [],
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderWrapper>
      <HeaderInner>
        <Logo href="/">{logoText}</Logo>

        <Nav>
          <PixelIndicator>
            <PixelDot $color="#ff2d7b" $delay={0} />
            <PixelDot $color="#ffff00" $delay={0.3} />
            <PixelDot $color="#00ff00" $delay={0.6} />
          </PixelIndicator>

          <NavLinks>
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </NavLinks>

          <PixelDivider />

          <Actions>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </Actions>

          <MobileMenuButton 
            $isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            aria-label="菜单"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </Nav>

        {/* 移动端菜单 */}
        <MobileMenu $isOpen={isMobileMenuOpen}>
          <MobileMenuTitle>MENU</MobileMenuTitle>
          <MobileNavLinks>
            {navItems.map((item) => (
              <MobileNavLink 
                key={item.href} 
                href={item.href}
                onClick={closeMobileMenu}
              >
                {item.label}
              </MobileNavLink>
            ))}
          </MobileNavLinks>
          <MobileActions>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </MobileActions>
        </MobileMenu>
        
        {/* 遮罩层 */}
        <Overlay $isOpen={isMobileMenuOpen} onClick={closeMobileMenu} />
      </HeaderInner>
    </HeaderWrapper>
  );
}
