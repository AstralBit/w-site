'use client';

import styled, { keyframes } from 'styled-components';
import { BlogPost } from '@/types/blog';
import BlogList from './BlogList';
import Header from '../Header';
import { Locale } from '@/i18n/routing';
import { pixelFont, getFontSize, getLineHeight } from '@/config/fonts';

// ========== 动画 ==========
const scanline = keyframes`
  0% { top: -100%; }
  100% { top: 200%; }
`;

const glitch = keyframes`
  0%, 100% { 
    text-shadow: 2px 0 #ff2d7b, -2px 0 #00d4ff;
    transform: translate(0);
  }
  20% { 
    text-shadow: -2px 0 #ff2d7b, 2px 0 #00d4ff;
    transform: translate(-1px, 1px);
  }
  40% { 
    text-shadow: 2px 0 #ff2d7b, -2px 0 #00d4ff;
    transform: translate(1px, -1px);
  }
  60% { 
    text-shadow: -2px 0 #ff2d7b, 2px 0 #00d4ff;
    transform: translate(-1px, -1px);
  }
  80% { 
    text-shadow: 2px 0 #ff2d7b, -2px 0 #00d4ff;
    transform: translate(1px, 1px);
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(5deg); }
  75% { transform: translateY(5px) rotate(-5deg); }
`;

// ========== 样式组件 ==========
const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--background);
  position: relative;
  overflow: hidden;
`;

// CRT 扫描线
const Scanline = styled.div`
  position: fixed;
  top: -100%;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(
    transparent 0%,
    rgba(255, 255, 255, 0.02) 50%,
    transparent 100%
  );
  animation: ${scanline} 6s linear infinite;
  pointer-events: none;
  z-index: 100;
`;

// 像素网格背景
const PixelGrid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(var(--card-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--card-border) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.2;
  pointer-events: none;
`;

// 浮动装饰
const FloatingDecor = styled.div<{ $top: string; $left?: string; $right?: string; $delay: number }>`
  position: fixed;
  top: ${props => props.$top};
  left: ${props => props.$left || 'auto'};
  right: ${props => props.$right || 'auto'};
  font-size: 2rem;
  opacity: 0.15;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

// 主容器
const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px 80px;
  position: relative;
  z-index: 2;
`;

// 页面头部
const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  position: relative;
`;

// 终端风格标题区域
const TerminalHeader = styled.div`
  display: inline-block;
  background: rgba(0, 0, 0, 0.3);
  border: 3px solid var(--foreground);
  padding: 32px 48px;
  position: relative;

  /* 像素角 */
  clip-path: polygon(
    0 12px, 12px 12px, 12px 0,
    calc(100% - 12px) 0, calc(100% - 12px) 12px, 100% 12px,
    100% calc(100% - 12px), calc(100% - 12px) calc(100% - 12px), calc(100% - 12px) 100%,
    12px 100%, 12px calc(100% - 12px), 0 calc(100% - 12px)
  );

  /* 顶部装饰条 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 12px;
    right: 12px;
    height: 4px;
    background: repeating-linear-gradient(
      90deg,
      #ff2d7b 0px, #ff2d7b 8px,
      #00d4ff 8px, #00d4ff 16px,
      #ffff00 16px, #ffff00 24px,
      #00ff41 24px, #00ff41 32px
    );
  }

  @media (max-width: 640px) {
    padding: 24px 32px;
  }
`;

// 终端标题栏
const TerminalTitleBar = styled.div<{ $locale: Locale }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('xs', props.$locale)};
  color: var(--text-muted);
`;

const TerminalDot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  background: ${props => props.$color};
  border-radius: 0;

  /* 像素角 */
  clip-path: polygon(
    0 3px, 3px 3px, 3px 0,
    calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px,
    100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%,
    3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px)
  );
`;

// 主标题
const Title = styled.h1<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('2xl', props.$locale)};
  color: var(--foreground);
  margin: 0 0 16px;
  letter-spacing: 4px;

  &:hover {
    animation: ${glitch} 0.5s ease-in-out;
  }
  
  @media (max-width: 640px) {
    font-size: ${props => getFontSize('xl', props.$locale)};
    letter-spacing: 2px;
  }
`;

// 副标题/描述
const Description = styled.p<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('base', props.$locale)};
  color: var(--text-secondary);
  margin: 0;
  line-height: ${props => getLineHeight('normal', props.$locale)};
  max-width: 600px;
  margin: 0 auto;

  &::after {
    content: '_';
    animation: ${blink} 1s step-end infinite;
    margin-left: 4px;
    color: #00ff41;
  }
`;

// 统计信息
const StatsBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 48px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 16px;
  }
`;

const StatItem = styled.div<{ $locale: Locale }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('xs', props.$locale)};
  color: var(--text-secondary);

  /* 像素角 */
  clip-path: polygon(
    0 4px, 4px 4px, 4px 0,
    calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
  );

  span {
    color: #00ff41;
    font-size: ${props => getFontSize('sm', props.$locale)};
  }
`;

// 分隔线
const Divider = styled.div<{ $locale: Locale }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 48px 0;
  color: var(--text-muted);
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('xs', props.$locale)};

  &::before,
  &::after {
    content: '';
    flex: 1;
    max-width: 100px;
    height: 2px;
    background: repeating-linear-gradient(
      90deg,
      var(--card-border) 0px,
      var(--card-border) 4px,
      transparent 4px,
      transparent 8px
    );
  }
`;

// ========== 组件 ==========
interface BlogPageClientProps {
  title: string;
  description: string;
  posts: BlogPost[];
  readTimeText: string;
  emptyText: string;
  navItems: { label: string; href: string }[];
  locale: Locale;
}

export default function BlogPageClient({ 
  title, 
  description, 
  posts, 
  readTimeText,
  emptyText,
  navItems,
  locale
}: BlogPageClientProps) {
  return (
    <PageWrapper>
      <Scanline />
      <PixelGrid />
      
      {/* 浮动装饰 */}
      <FloatingDecor $top="20%" $left="5%" $delay={0}>📚</FloatingDecor>
      <FloatingDecor $top="35%" $right="8%" $delay={1.5}>✏️</FloatingDecor>
      <FloatingDecor $top="60%" $left="3%" $delay={3}>💡</FloatingDecor>
      <FloatingDecor $top="75%" $right="5%" $delay={2}>🎯</FloatingDecor>
      
      <Header navItems={navItems} />
      
      <Container>
        <PageHeader>
          <TerminalHeader>
            <TerminalTitleBar $locale={locale}>
              <TerminalDot $color="#ff5f56" />
              <TerminalDot $color="#ffbd2e" />
              <TerminalDot $color="#27c93f" />
              <span style={{ marginLeft: '8px' }}>blog.exe</span>
            </TerminalTitleBar>
            
            <Title $locale={locale}>{title}</Title>
            <Description $locale={locale}>{description}</Description>
          </TerminalHeader>

          <StatsBar>
            <StatItem $locale={locale}>
              📝 {locale === 'zh' ? '文章' : 'POSTS'}: <span>{posts.length}</span>
            </StatItem>
            <StatItem $locale={locale}>
              🏷️ {locale === 'zh' ? '分类' : 'CATEGORIES'}: <span>3</span>
            </StatItem>
            <StatItem $locale={locale}>
              ⚡ {locale === 'zh' ? '状态' : 'STATUS'}: <span>{locale === 'zh' ? '在线' : 'ONLINE'}</span>
            </StatItem>
          </StatsBar>
        </PageHeader>

        <Divider $locale={locale}>◆ {locale === 'zh' ? '文章列表' : 'ENTRIES'} ◆</Divider>

        <BlogList posts={posts} readTimeText={readTimeText} emptyText={emptyText} locale={locale} />
      </Container>
    </PageWrapper>
  );
}
