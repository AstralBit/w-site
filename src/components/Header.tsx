"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { Link, useRouter, usePathname } from "../i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

// 像素字体
const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

// ========== 动画定义 ==========
const glitchAnim = keyframes`
  0%, 100% { 
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  5% { 
    clip-path: inset(40% 0 30% 0);
    transform: translate(-2px, 2px);
  }
  10% { 
    clip-path: inset(10% 0 60% 0);
    transform: translate(2px, -1px);
  }
  15% { 
    clip-path: inset(80% 0 5% 0);
    transform: translate(-1px, 2px);
  }
  20% { 
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-3px) rotate(2deg); }
  75% { transform: translateY(3px) rotate(-2deg); }
`;

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const cursorBlink = keyframes`
  0%, 100% { border-color: #00ff41; }
  50% { border-color: transparent; }
`;

const rainbow = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const scanline = keyframes`
  0% { top: -100%; }
  100% { top: 100%; }
`;

// ========== 样式组件 ==========
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--header-bg);
  border-bottom: 3px solid var(--foreground);
  overflow: hidden;

  /* CRT 扫描线效果 */
  &::before {
    content: "";
    position: absolute;
    top: -100%;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
      transparent 0%,
      rgba(255, 255, 255, 0.03) 50%,
      transparent 100%
    );
    animation: ${scanline} 4s linear infinite;
    pointer-events: none;
    z-index: 10;
  }

  /* 底部像素装饰条 */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: repeating-linear-gradient(
      90deg,
      #ff2d7b 0px,
      #ff2d7b 8px,
      #00d4ff 8px,
      #00d4ff 16px,
      #ffff00 16px,
      #ffff00 24px,
      #00ff41 24px,
      #00ff41 32px
    );
    animation: ${rainbow} 8s linear infinite;
  }
`;

const HeaderInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

// Logo 区域 - 终端风格
const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TerminalIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #0a0a0a;
  border: 2px solid #00ff41;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  animation: ${float} 3s ease-in-out infinite;
  position: relative;
  
  &::before {
    content: ">";
    color: #00ff41;
    font-family: ${pixelFont};
    font-size: 12px;
    animation: ${cursorBlink} 1s step-end infinite;
  }
`;

const LogoText = styled(Link)`
  font-family: ${pixelFont};
  font-size: 0.8rem;
  color: #00ff41;
  text-decoration: none;
  position: relative;
  letter-spacing: 2px;
  
  /* 打字机效果容器 */
  &::after {
    content: "_";
    animation: ${cursorBlink} 0.8s step-end infinite;
    margin-left: 2px;
  }

  &:hover {
    animation: ${glitchAnim} 0.3s ease-in-out;
    text-shadow: 
      2px 0 #ff2d7b,
      -2px 0 #00d4ff;
  }

  @media (max-width: 640px) {
    font-size: 0.6rem;
  }
`;

// 状态栏 - 游戏风格
const StatusBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid var(--card-border);
  border-radius: 0;

  @media (max-width: 900px) {
    display: none;
  }
`;

const StatusItem = styled.div<{ $color?: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${pixelFont};
  font-size: 0.5rem;
  color: ${props => props.$color || 'var(--text-secondary)'};
`;

const StatusIcon = styled.span<{ $animate?: boolean }>`
  font-size: 12px;
  ${props => props.$animate && css`
    animation: ${bounce} 1s ease-in-out infinite;
  `}
`;

const StatusValue = styled.span`
  color: var(--foreground);
`;

// 导航区域 - 像素按钮风格
const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavButton = styled.button<{ $active?: boolean }>`
  font-family: ${pixelFont};
  font-size: 0.55rem;
  color: ${props => props.$active ? '#0a0a0a' : 'var(--text-secondary)'};
  background: ${props => props.$active ? '#00ff41' : 'transparent'};
  border: 2px solid ${props => props.$active ? '#00ff41' : 'var(--card-border)'};
  padding: 8px 14px;
  cursor: pointer;
  position: relative;
  transition: all 0.1s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  /* 像素角 */
  clip-path: polygon(
    0 4px, 4px 4px, 4px 0,
    calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
  );

  &::before {
    content: "${props => props.$active ? '◆' : '◇'}";
    margin-right: 6px;
    font-size: 8px;
    color: ${props => props.$active ? '#0a0a0a' : '#ff2d7b'};
  }

  &:hover {
    color: #0a0a0a;
    background: #00d4ff;
    border-color: #00d4ff;
    transform: translate(-2px, -2px);
    box-shadow: 
      2px 2px 0 var(--foreground),
      4px 4px 0 #ff2d7b;

    &::before {
      content: "◆";
      color: #0a0a0a;
    }
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: none;
  }

  &[data-loading="true"] {
    opacity: 0.6;
    pointer-events: none;
  }
`;

// 右侧操作区
const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// 像素分隔符
const PixelSeparator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0 8px;

  span {
    width: 4px;
    height: 4px;
    background: var(--text-muted);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// 装饰性小游戏人物
const PixelCharacter = styled.div`
  font-size: 20px;
  animation: ${float} 2s ease-in-out infinite;
  cursor: default;
  user-select: none;

  &:hover {
    animation: ${rotate} 0.5s linear;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

// 移动端菜单按钮
const MobileMenuBtn = styled.button<{ $isOpen: boolean }>`
  display: none;
  font-family: ${pixelFont};
  font-size: 10px;
  background: ${props => props.$isOpen ? '#ff2d7b' : 'transparent'};
  border: 2px solid var(--foreground);
  color: ${props => props.$isOpen ? '#fff' : 'var(--foreground)'};
  padding: 10px;
  cursor: pointer;
  position: relative;
  transition: all 0.15s ease;

  clip-path: polygon(
    0 4px, 4px 4px, 4px 0,
    calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
  );

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  &:hover {
    background: #00d4ff;
    color: #0a0a0a;
  }
`;

// 移动端菜单面板
const MobilePanel = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--background);
    transform: translateX(${props => props.$isOpen ? '0' : '100%'});
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 99;
    padding: 24px;
    overflow-y: auto;

    /* 网格背景 */
    background-image: 
      linear-gradient(var(--card-border) 1px, transparent 1px),
      linear-gradient(90deg, var(--card-border) 1px, transparent 1px);
    background-size: 20px 20px;
  }
`;

const MobileTitle = styled.div`
  font-family: ${pixelFont};
  font-size: 0.7rem;
  color: #00ff41;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "//";
    color: #ff2d7b;
  }

  &::after {
    content: "_";
    animation: ${cursorBlink} 0.8s step-end infinite;
  }
`;

const MobileNavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`;

const MobileNavItem = styled.button<{ $index: number }>`
  font-family: ${pixelFont};
  font-size: 0.65rem;
  color: var(--foreground);
  background: var(--card-bg);
  border: 3px solid var(--foreground);
  padding: 16px 20px;
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: all 0.15s ease;
  animation: slideInRight 0.3s ease-out;
  animation-delay: ${props => props.$index * 0.1}s;
  animation-fill-mode: both;

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &::before {
    content: "0${props => props.$index + 1}";
    font-size: 0.5rem;
    color: #ff2d7b;
    margin-right: 12px;
  }

  &::after {
    content: "→";
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #00d4ff;
    opacity: 0;
    transition: all 0.15s ease;
  }

  &:hover {
    background: #00ff41;
    color: #0a0a0a;
    transform: translateX(8px);
    box-shadow: -8px 0 0 #ff2d7b;

    &::before {
      color: #0a0a0a;
    }

    &::after {
      opacity: 1;
      right: 12px;
    }
  }
`;

const MobileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 2px dashed var(--card-border);
`;

const MobileFooter = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  font-family: ${pixelFont};
  font-size: 0.4rem;
  color: var(--text-muted);
  text-align: center;

  span {
    color: #ff2d7b;
  }
`;

// ========== 组件 ==========
interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logoText?: string;
  navItems?: NavItem[];
}

export default function Header({
  logoText = "PIXEL.DEV",
  navItems = [],
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [time, setTime] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // 实时时间
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 预加载
  useEffect(() => {
    navItems.forEach((item) => {
      router.prefetch(item.href);
    });
  }, [navItems, router]);

  // 禁止滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    startTransition(() => {
      router.push(href);
    });
  }, [router]);

  const handleMobileNavClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    startTransition(() => {
      router.push(href);
    });
  }, [router]);

  // 检查是否是当前路由
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderInner>
          {/* Logo 区域 */}
          <LogoArea>
            <TerminalIcon />
            <LogoText href="/">{logoText}</LogoText>
          </LogoArea>

          {/* 状态栏 */}
          <StatusBar>
            <StatusItem $color="#00ff41">
              <StatusIcon $animate>⚡</StatusIcon>
              <StatusValue>ONLINE</StatusValue>
            </StatusItem>
            <StatusItem>
              <StatusIcon>🕐</StatusIcon>
              <StatusValue>{time}</StatusValue>
            </StatusItem>
            <StatusItem $color="#ffff00">
              <StatusIcon>★</StatusIcon>
              <StatusValue>LV.99</StatusValue>
            </StatusItem>
          </StatusBar>

          {/* 导航 */}
          <Nav>
            {navItems.map((item) => (
              <NavButton
                key={item.href}
                $active={isActive(item.href)}
                onClick={() => handleNavClick(item.href)}
                data-loading={isPending}
              >
                {item.label}
              </NavButton>
            ))}
          </Nav>

          {/* 右侧区域 */}
          <RightArea>
            <PixelCharacter title="Hello!">🎮</PixelCharacter>
            
            <PixelSeparator>
              <span />
              <span />
              <span />
            </PixelSeparator>

            <ThemeSwitcher />
            <LanguageSwitcher />

            <MobileMenuBtn 
              $isOpen={isMobileMenuOpen} 
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? '✕ CLOSE' : '☰ MENU'}
            </MobileMenuBtn>
          </RightArea>
        </HeaderInner>
      </HeaderWrapper>

      {/* 移动端面板 */}
      <MobilePanel $isOpen={isMobileMenuOpen}>
        <MobileTitle>SELECT DESTINATION</MobileTitle>
        
        <MobileNavList>
          {navItems.map((item, index) => (
            <MobileNavItem
              key={item.href}
              $index={index}
              onClick={() => handleMobileNavClick(item.href)}
            >
              {item.label}
            </MobileNavItem>
          ))}
        </MobileNavList>

        <MobileActions>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </MobileActions>

        <MobileFooter>
          PRESS <span>START</span> TO BEGIN YOUR JOURNEY
        </MobileFooter>
      </MobilePanel>
    </>
  );
}
