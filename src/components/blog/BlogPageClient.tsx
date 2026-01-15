'use client';

import styled, { keyframes } from 'styled-components';
import { BlogPost } from '@/types/blog';
import BlogList from './BlogList';
import Header from '../Header';

// 像素字体
const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

// 动画
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--background);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.03) 50%);
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 10;
  }
`;

const Scanline = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  animation: ${scanline} 8s linear infinite;
  pointer-events: none;
  z-index: 11;
`;

const PixelGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(var(--card-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--card-border) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
  pointer-events: none;
`;

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px 64px;
  position: relative;
  z-index: 1;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
`;

const TitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-family: ${pixelFont};
  font-size: 2.5rem;
  color: var(--foreground);
  margin: 0;
  text-shadow: 
    4px 4px 0 #ff2d7b,
    -2px -2px 0 #00d4ff;
  
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-family: ${pixelFont};
  font-size: 0.75rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 2;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 16px;
  background: var(--foreground);
  margin-left: 4px;
  animation: ${blink} 1s step-end infinite;
`;

const PixelDivider = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 32px 0;
  
  span {
    width: 8px;
    height: 8px;
    background: var(--text-muted);
  }
`;

// 装饰性像素元素
const PixelDecoration = styled.div`
  position: absolute;
  font-size: 24px;
  opacity: 0.3;
  animation: ${float} 4s ease-in-out infinite;
  
  &:nth-child(1) { top: 15%; left: 5%; animation-delay: 0s; }
  &:nth-child(2) { top: 25%; right: 8%; animation-delay: 1s; }
  &:nth-child(3) { bottom: 40%; left: 3%; animation-delay: 2s; }
  &:nth-child(4) { bottom: 30%; right: 5%; animation-delay: 1.5s; }
`;

interface BlogPageClientProps {
  title: string;
  description: string;
  posts: BlogPost[];
  readTimeText: string;
  emptyText: string;
  navItems: { label: string; href: string }[];
}

export default function BlogPageClient({ 
  title, 
  description, 
  posts, 
  readTimeText,
  emptyText,
  navItems 
}: BlogPageClientProps) {
  return (
    <PageWrapper>
      <Scanline />
      <PixelGrid />
      <PixelDecoration>📚</PixelDecoration>
      <PixelDecoration>✏️</PixelDecoration>
      <PixelDecoration>💡</PixelDecoration>
      <PixelDecoration>🎯</PixelDecoration>
      
      <Header navItems={navItems} />
      <Container>
        <PageHeader>
          <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper>
          <Description>
            {description}
            <Cursor />
          </Description>
          <PixelDivider>
            <span /><span /><span /><span /><span />
          </PixelDivider>
        </PageHeader>
        <BlogList posts={posts} readTimeText={readTimeText} emptyText={emptyText} />
      </Container>
    </PageWrapper>
  );
}
