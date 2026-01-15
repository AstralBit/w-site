"use client";

import styled, { keyframes } from "styled-components";
import { Link } from "../i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import GooeyNav from "./GooeyNav";

// 像素字体
const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

// 动画
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
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
const MobileMenuButton = styled.button`
  display: none;
  font-family: ${pixelFont};
  font-size: 1.25rem;
  background: transparent;
  border: none;
  color: var(--foreground);
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: #00d4ff;
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

          {/* <NavLinks>
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </NavLinks> */}

          <GooeyNav timeVariance={1000} items={navItems} />

          <PixelDivider />

          <Actions>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </Actions>

          <MobileMenuButton aria-label="菜单">☰</MobileMenuButton>
        </Nav>
      </HeaderInner>
    </HeaderWrapper>
  );
}
