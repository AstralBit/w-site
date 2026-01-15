'use client';

import styled from 'styled-components';
import { Link } from '../i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  
  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
  color: #171717;
  text-decoration: none;
  letter-spacing: -0.02em;
  
  @media (prefers-color-scheme: dark) {
    color: #ededed;
  }
  
  &:hover {
    opacity: 0.8;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;
  
  @media (max-width: 640px) {
    gap: 16px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  
  @media (max-width: 640px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 500;
  color: #525252;
  text-decoration: none;
  transition: color 0.2s ease;
  
  @media (prefers-color-scheme: dark) {
    color: #a1a1aa;
  }
  
  &:hover {
    color: #171717;
    
    @media (prefers-color-scheme: dark) {
      color: #ededed;
    }
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
  logoText = 'W-Site',
  navItems = []
}: HeaderProps) {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <Logo href="/">
          {logoText}
        </Logo>
        <Nav>
          <NavLinks>
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </NavLinks>
          <LanguageSwitcher />
        </Nav>
      </HeaderInner>
    </HeaderWrapper>
  );
}

