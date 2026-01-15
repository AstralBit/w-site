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

const neonPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
    opacity: 1;
  }
  50% { 
    box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
    opacity: 0.9;
  }
`;

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

// ========== 样式组件 ==========
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(5, 5, 15, 0.95);
  border-bottom: 2px solid #00ff41;
  overflow: hidden;
  backdrop-filter: blur(10px);

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
      rgba(0, 255, 65, 0.03) 50%,
      transparent 100%
    );
    animation: ${scanline} 4s linear infinite;
    pointer-events: none;
    z-index: 10;
  }

  /* 底部霓虹彩虹条 */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      #ff2d7b 0%,
      #ff2d7b 20%,
      #ffff00 20%,
      #ffff00 40%,
      #00ff41 40%,
      #00ff41 60%,
      #00d4ff 60%,
      #00d4ff 80%,
      #a78bfa 80%,
      #a78bfa 100%
    );
    animation: ${rainbow} 8s linear infinite;
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
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
  background: rgba(0, 255, 65, 0.1);
  border: 2px solid #00ff41;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  animation: ${float} 3s ease-in-out infinite;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.3), inset 0 0 10px rgba(0, 255, 65, 0.1);
  
  &::before {
    content: ">";
    color: #00ff41;
    font-family: ${pixelFont};
    font-size: 12px;
    animation: ${cursorBlink} 1s step-end infinite;
    text-shadow: 0 0 10px #00ff41;
  }
`;

const LogoText = styled(Link)`
  font-family: ${pixelFont};
  font-size: 0.8rem;
  color: #00ff41;
  text-decoration: none;
  position: relative;
  letter-spacing: 2px;
  text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41;
  
  /* 打字机效果容器 */
  &::after {
    content: "_";
    animation: ${cursorBlink} 0.8s step-end infinite;
    margin-left: 2px;
  }

  &:hover {
    animation: ${glitchAnim} 0.3s ease-in-out;
    text-shadow: 
      0 0 10px #00ff41,
      0 0 20px #00ff41,
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
  padding: 6px 14px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(0, 255, 65, 0.3);
  border-radius: 0;
  box-shadow: 0 0 15px rgba(0, 255, 65, 0.1), inset 0 0 20px rgba(0, 0, 0, 0.5);

  /* 像素角 */
  clip-path: polygon(
    0 4px, 4px 4px, 4px 0,
    calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
  );

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
  color: ${props => props.$color || '#888'};
`;

const StatusIcon = styled.span<{ $animate?: boolean; $color?: string }>`
  font-size: 12px;
  ${props => props.$animate && css`
    animation: ${bounce} 1s ease-in-out infinite;
  `}
  ${props => props.$color && css`
    filter: drop-shadow(0 0 5px ${props.$color});
  `}
`;

const StatusValue = styled.span<{ $color?: string }>`
  color: ${props => props.$color || '#fff'};
  text-shadow: ${props => props.$color ? `0 0 10px ${props.$color}` : 'none'};
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
  font-size: 0.8rem;
  color: ${props => props.$active ? '#0a0a0a' : '#aaa'};
  background: ${props => props.$active ? '#00ff41' : 'rgba(0, 0, 0, 0.5)'};
  border: 2px solid ${props => props.$active ? '#00ff41' : 'rgba(0, 255, 65, 0.3)'};
  padding: 8px 14px;
  cursor: pointer;
  position: relative;
  transition: all 0.15s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  ${props => props.$active && css`
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.5), inset 0 0 10px rgba(0, 255, 65, 0.3);
  `}

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
    ${props => !props.$active && css`
      text-shadow: 0 0 10px #ff2d7b;
    `}
  }

  &:hover {
    color: #0a0a0a;
    background: #00d4ff;
    border-color: #00d4ff;
    transform: translate(-2px, -2px);
    box-shadow: 
      2px 2px 0 #00ff41,
      4px 4px 0 #ff2d7b,
      0 0 20px rgba(0, 212, 255, 0.5);

    &::before {
      content: "◆";
      color: #0a0a0a;
      text-shadow: none;
    }
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
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
    background: #333;
    box-shadow: 0 0 5px rgba(0, 255, 65, 0.3);

    &:nth-child(1) { background: #ff2d7b; box-shadow: 0 0 5px #ff2d7b; }
    &:nth-child(2) { background: #00ff41; box-shadow: 0 0 5px #00ff41; }
    &:nth-child(3) { background: #00d4ff; box-shadow: 0 0 5px #00d4ff; }
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
  filter: drop-shadow(0 0 10px rgba(255, 200, 0, 0.5));

  &:hover {
    animation: ${rotate} 0.5s linear;
    filter: drop-shadow(0 0 20px rgba(255, 200, 0, 0.8));
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

// 星星装饰
const StarDecor = styled.span<{ $delay: number }>`
  position: absolute;
  font-size: 8px;
  color: #fff;
  animation: ${starTwinkle} 2s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: 0.6;
  pointer-events: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

// 移动端菜单按钮
const MobileMenuBtn = styled.button<{ $isOpen: boolean }>`
  display: none;
  font-family: ${pixelFont};
  font-size: 10px;
  background: ${props => props.$isOpen ? '#ff2d7b' : 'rgba(0, 0, 0, 0.5)'};
  border: 2px solid ${props => props.$isOpen ? '#ff2d7b' : '#00ff41'};
  color: ${props => props.$isOpen ? '#fff' : '#00ff41'};
  padding: 10px;
  cursor: pointer;
  position: relative;
  transition: all 0.15s ease;
  ${props => props.$isOpen && css`
    box-shadow: 0 0 15px rgba(255, 45, 123, 0.5);
  `}
  ${props => !props.$isOpen && css`
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  `}

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
    border-color: #00d4ff;
    color: #0a0a0a;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
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
    background: rgba(5, 5, 15, 0.98);
    transform: translateX(${props => props.$isOpen ? '0' : '100%'});
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 99;
    padding: 24px;
    overflow-y: auto;

    /* 星空网格背景 */
    background-image: 
      radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.3), transparent),
      radial-gradient(1px 1px at 40px 70px, rgba(0,255,65,0.3), transparent),
      radial-gradient(1px 1px at 50px 160px, rgba(0,212,255,0.3), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(255,45,123,0.3), transparent),
      linear-gradient(rgba(0, 255, 65, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 65, 0.02) 1px, transparent 1px);
    background-size: 200px 200px, 200px 200px, 200px 200px, 200px 200px, 30px 30px, 30px 30px;
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
  text-shadow: 0 0 10px #00ff41;

  &::before {
    content: "//";
    color: #ff2d7b;
    text-shadow: 0 0 10px #ff2d7b;
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
  color: #fff;
  background: rgba(0, 255, 65, 0.05);
  border: 2px solid rgba(0, 255, 65, 0.3);
  padding: 16px 20px;
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: all 0.15s ease;
  animation: slideInRight 0.3s ease-out;
  animation-delay: ${props => props.$index * 0.1}s;
  animation-fill-mode: both;

  /* 像素角 */
  clip-path: polygon(
    0 6px, 6px 6px, 6px 0,
    calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px,
    100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%,
    6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px)
  );

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
    text-shadow: 0 0 10px #ff2d7b;
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
    text-shadow: 0 0 10px #00d4ff;
  }

  &:hover {
    background: #00ff41;
    border-color: #00ff41;
    color: #0a0a0a;
    transform: translateX(8px);
    box-shadow: -8px 0 0 #ff2d7b, 0 0 20px rgba(0, 255, 65, 0.5);

    &::before {
      color: #0a0a0a;
      text-shadow: none;
    }

    &::after {
      opacity: 1;
      right: 12px;
      color: #0a0a0a;
      text-shadow: none;
    }
  }
`;

const MobileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 2px dashed rgba(0, 255, 65, 0.3);
`;

const MobileFooter = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  font-family: ${pixelFont};
  font-size: 0.4rem;
  color: #666;
  text-align: center;

  span {
    color: #ff2d7b;
    text-shadow: 0 0 10px #ff2d7b;
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
        {/* 星星装饰 */}
        <StarDecor $delay={0} style={{ top: '15%', left: '30%' }}>✦</StarDecor>
        <StarDecor $delay={0.5} style={{ top: '60%', left: '45%' }}>✧</StarDecor>
        <StarDecor $delay={1} style={{ top: '25%', right: '35%' }}>✦</StarDecor>
        <StarDecor $delay={1.5} style={{ top: '70%', right: '25%' }}>✧</StarDecor>

        <HeaderInner>
          {/* Logo 区域 */}
          <LogoArea>
            <TerminalIcon />
            <LogoText href="/">{logoText}</LogoText>
          </LogoArea>

          {/* 状态栏 */}
          <StatusBar>
            <StatusItem $color="#00ff41">
              <StatusIcon $animate $color="#00ff41">⚡</StatusIcon>
              <StatusValue $color="#00ff41">ONLINE</StatusValue>
            </StatusItem>
            <StatusItem>
              <StatusIcon $color="#00d4ff">🕐</StatusIcon>
              <StatusValue $color="#00d4ff">{time}</StatusValue>
            </StatusItem>
            <StatusItem $color="#ffff00">
              <StatusIcon $color="#ffff00">★</StatusIcon>
              <StatusValue $color="#ffff00">LV.99</StatusValue>
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
            <PixelCharacter title="Hello!">🚀</PixelCharacter>
            
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
