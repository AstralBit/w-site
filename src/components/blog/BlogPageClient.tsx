'use client';

import styled, { keyframes } from 'styled-components';
import { BlogPost } from '@/types/blog';
import BlogList from './BlogList';
import Header from '../Header';
import StarWarsBackground from '../StarWarsBackground';
import { Locale } from '@/i18n/routing';
import { pixelFont, getFontSize, getLineHeight } from '@/config/fonts';

// ========== 动画 ==========
const glitch = keyframes`
  0%, 100% { 
    text-shadow: 2px 0 #ff2d7b, -2px 0 #00d4ff;
    transform: translate(0);
  }
  20% { 
    text-shadow: -2px 0 #ff2d7b, 2px 0 #00d4ff;
    transform: translate(-2px, 2px);
  }
  40% { 
    text-shadow: 2px 0 #ff2d7b, -2px 0 #00d4ff;
    transform: translate(2px, -2px);
  }
  60% { 
    text-shadow: -2px 0 #ff2d7b, 2px 0 #00d4ff;
    transform: translate(-2px, -2px);
  }
  80% { 
    text-shadow: 2px 0 #ff2d7b, -2px 0 #00d4ff;
    transform: translate(2px, 2px);
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  75% { transform: translateY(10px) rotate(-5deg); }
`;

const pulse = keyframes`
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.4);
  }
  50% { 
    transform: scale(1.02);
    box-shadow: 0 0 20px 5px rgba(0, 255, 65, 0.2);
  }
`;

const neonFlicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  96% { opacity: 0.9; }
  97% { opacity: 1; }
`;

// ========== 样式组件 ==========
const PageWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

// 浮动装饰 - 更大更明显
const FloatingDecor = styled.div<{ $top: string; $left?: string; $right?: string; $delay: number; $size?: string }>`
  position: fixed;
  top: ${props => props.$top};
  left: ${props => props.$left || 'auto'};
  right: ${props => props.$right || 'auto'};
  font-size: ${props => props.$size || '3rem'};
  opacity: 0.2;
  animation: ${float} 8s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  pointer-events: none;
  z-index: 1;
  filter: drop-shadow(0 0 10px currentColor);

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

// 终端风格标题区域 - 增强版
const TerminalHeader = styled.div`
  display: inline-block;
  background: rgba(10, 10, 10, 0.8);
  border: 3px solid #00ff41;
  padding: 40px 60px;
  position: relative;
  backdrop-filter: blur(10px);
  animation: ${pulse} 4s ease-in-out infinite;
  width: 100%;

  /* 像素角 */
  clip-path: polygon(
    0 16px, 16px 16px, 16px 0,
    calc(100% - 16px) 0, calc(100% - 16px) 16px, 100% 16px,
    100% calc(100% - 16px), calc(100% - 16px) calc(100% - 16px), calc(100% - 16px) 100%,
    16px 100%, 16px calc(100% - 16px), 0 calc(100% - 16px)
  );

  /* 霓虹边框效果 */
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background-size: 400% 400%;
    animation: ${neonFlicker} 3s ease-in-out infinite;
    z-index: -1;
    clip-path: polygon(
      0 16px, 16px 16px, 16px 0,
      calc(100% - 16px) 0, calc(100% - 16px) 16px, 100% 16px,
      100% calc(100% - 16px), calc(100% - 16px) calc(100% - 16px), calc(100% - 16px) 100%,
      16px 100%, 16px calc(100% - 16px), 0 calc(100% - 16px)
    );
    opacity: 0.5;
    filter: blur(4px);
  }

  /* 顶部彩虹条 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 16px;
    right: 16px;
    height: 4px;
    background: repeating-linear-gradient(
      90deg,
      #ff2d7b 0px, #ff2d7b 10px,
      #00d4ff 10px, #00d4ff 20px,
      #ffff00 20px, #ffff00 30px,
      #00ff41 30px, #00ff41 40px
    );
  }

  @media (max-width: 640px) {
    padding: 28px 36px;
  }
`;

// 终端标题栏
const TerminalTitleBar = styled.div<{ $locale: Locale }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('xs', props.$locale)};
  color: #00ff41;
`;

const TerminalDot = styled.span<{ $color: string }>`
  width: 12px;
  height: 12px;
  background: ${props => props.$color};
  border-radius: 0;
  box-shadow: 0 0 10px ${props => props.$color};

  /* 像素角 */
  clip-path: polygon(
    0 3px, 3px 3px, 3px 0,
    calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px,
    100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%,
    3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px)
  );
`;

// 主标题 - 霓虹效果
const Title = styled.h1<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('2xl', props.$locale)};
  color: #fff;
  margin: 0 0 20px;
  letter-spacing: 6px;
  text-shadow: 
    0 0 10px #00ff41,
    0 0 20px #00ff41,
    0 0 40px #00ff41,
    0 0 80px #00ff41;
  animation: ${neonFlicker} 3s ease-in-out infinite;

  &:hover {
    animation: ${glitch} 0.5s ease-in-out;
  }
  
  @media (max-width: 640px) {
    font-size: ${props => getFontSize('xl', props.$locale)};
    letter-spacing: 3px;
  }
`;

// 副标题/描述
const Description = styled.p<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('base', props.$locale)};
  color: #00d4ff;
  margin: 0;
  line-height: ${props => getLineHeight('normal', props.$locale)};
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 0 0 10px #00d4ff;

  &::after {
    content: '_';
    animation: ${blink} 0.8s step-end infinite;
    margin-left: 4px;
    color: #00ff41;
    text-shadow: 0 0 10px #00ff41;
  }
`;

// 统计信息 - 赛博风格
const StatsBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 48px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 12px;
  }
`;

const StatItem = styled.div<{ $locale: Locale; $color: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: rgba(10, 10, 10, 0.8);
  border: 2px solid ${props => props.$color};
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('md', props.$locale)};
  color: ${props => props.$color};
  backdrop-filter: blur(5px);
  box-shadow: 
    0 0 10px ${props => props.$color}40,
    inset 0 0 20px ${props => props.$color}10;
  transition: all 0.3s ease;

  /* 像素角 */
  clip-path: polygon(
    0 6px, 6px 6px, 6px 0,
    calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px,
    100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%,
    6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px)
  );

  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 0 20px ${props => props.$color}60,
      inset 0 0 30px ${props => props.$color}20;
  }

  span {
    color: #fff;
    font-size: ${props => getFontSize('sm', props.$locale)};
    text-shadow: 0 0 10px ${props => props.$color};
  }
`;

// 分隔线 - 霓虹风格
const Divider = styled.div<{ $locale: Locale }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 60px 0;
  color: #00ff41;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('md', props.$locale)};
  text-shadow: 0 0 10px #00ff41;

  &::before,
  &::after {
    content: '';
    flex: 1;
    max-width: 150px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      #00ff41,
      #00d4ff,
      #ff2d7b,
      transparent
    );
    box-shadow: 0 0 10px #00ff41;
  }
`;

// 装饰性代码行
const CodeDecor = styled.div<{ $locale: Locale }>`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('xs', props.$locale)};
  color: #00ff41;
  opacity: 0.5;
  white-space: nowrap;

  &::before {
    content: '> LOADING BLOG_DATA.EXE...';
  }

  @media (max-width: 768px) {
    display: none;
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
      {/* 星际大战背景 */}
      <StarWarsBackground />
      
      {/* 浮动装饰 */}
      <FloatingDecor $top="15%" $left="3%" $delay={0} $size="4rem">📚</FloatingDecor>
      <FloatingDecor $top="30%" $right="5%" $delay={1.5} $size="3.5rem">✨</FloatingDecor>
      <FloatingDecor $top="55%" $left="5%" $delay={3} $size="3rem">💻</FloatingDecor>
      <FloatingDecor $top="70%" $right="3%" $delay={2} $size="3.5rem">🚀</FloatingDecor>
      <FloatingDecor $top="85%" $left="8%" $delay={2.5} $size="2.5rem">⚡</FloatingDecor>
      
      <Header navItems={navItems} />
      
      <Container>
        <PageHeader>
          <CodeDecor $locale={locale} />
          
          <TerminalHeader>
            <TerminalTitleBar $locale={locale}>
              <TerminalDot $color="#ff5f56" />
              <TerminalDot $color="#ffbd2e" />
              <TerminalDot $color="#27c93f" />
              <span style={{ marginLeft: '12px', letterSpacing: '2px' }}>
                {locale === 'zh' ? '博客终端' : 'BLOG.EXE'}
              </span>
            </TerminalTitleBar>
            
            <Title $locale={locale}>{title}</Title>
            <Description $locale={locale}>{description}</Description>
          </TerminalHeader>

          <StatsBar>
            <StatItem $locale={locale} $color="#00ff41">
              📝 {locale === 'zh' ? '文章' : 'POSTS'}: <span>{posts.length}</span>
            </StatItem>
            <StatItem $locale={locale} $color="#00d4ff">
              🏷️ {locale === 'zh' ? '分类' : 'CATEGORIES'}: <span>3</span>
            </StatItem>
            <StatItem $locale={locale} $color="#ff2d7b">
              ⚡ {locale === 'zh' ? '状态' : 'STATUS'}: <span>{locale === 'zh' ? '在线' : 'ONLINE'}</span>
            </StatItem>
          </StatsBar>
        </PageHeader>

        <Divider $locale={locale}>
          ◆ {locale === 'zh' ? '文章列表' : 'ENTRIES'} ◆
        </Divider>

        <BlogList posts={posts} readTimeText={readTimeText} emptyText={emptyText} locale={locale} />
      </Container>
    </PageWrapper>
  );
}
