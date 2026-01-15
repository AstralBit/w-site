'use client';

import styled, { keyframes } from 'styled-components';
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';
import { Locale } from '@/i18n/routing';
import { pixelFont, getFontSize } from '@/config/fonts';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const glitch = keyframes`
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-2px, -2px); }
  80% { transform: translate(2px, 2px); }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 40px;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CardWrapper = styled.div<{ $index: number }>`
  animation: ${fadeInUp} 0.6s ease-out;
  animation-delay: ${props => props.$index * 0.1}s;
  animation-fill-mode: both;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 24px;
  background: var(--card-bg);
  border: 3px solid var(--foreground);
  position: relative;
  overflow: hidden;

  /* 像素角 */
  clip-path: polygon(
    0 12px, 12px 12px, 12px 0,
    calc(100% - 12px) 0, calc(100% - 12px) 12px, 100% 12px,
    100% calc(100% - 12px), calc(100% - 12px) calc(100% - 12px), calc(100% - 12px) 100%,
    12px 100%, 12px calc(100% - 12px), 0 calc(100% - 12px)
  );

  /* 网格背景 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(var(--card-border) 1px, transparent 1px),
      linear-gradient(90deg, var(--card-border) 1px, transparent 1px);
    background-size: 16px 16px;
    opacity: 0.5;
  }
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 24px;
  animation: ${float} 3s ease-in-out infinite;
  position: relative;
  z-index: 1;
`;

const EmptyTitle = styled.div<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('lg', props.$locale)};
  color: var(--foreground);
  margin-bottom: 16px;
  position: relative;
  z-index: 1;

  &:hover {
    animation: ${glitch} 0.3s ease-in-out;
  }
`;

const EmptyText = styled.div<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('sm', props.$locale)};
  color: var(--text-muted);
  position: relative;
  z-index: 1;

  &::after {
    content: '_';
    animation: ${blink} 1s step-end infinite;
    margin-left: 2px;
  }
`;

const EmptyDecor = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
  position: relative;
  z-index: 1;

  span {
    width: 8px;
    height: 8px;
    background: var(--text-muted);

    &:nth-child(1) { background: #ff2d7b; }
    &:nth-child(3) { background: #00d4ff; }
    &:nth-child(5) { background: #ffff00; }
  }
`;

interface BlogListProps {
  posts: BlogPost[];
  readTimeText?: string;
  emptyText?: string;
  locale: Locale;
}

export default function BlogList({ 
  posts, 
  readTimeText = 'MIN',
  emptyText = 'NO DATA FOUND',
  locale
}: BlogListProps) {
  if (posts.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>📭</EmptyIcon>
        <EmptyTitle $locale={locale}>ERROR 404</EmptyTitle>
        <EmptyText $locale={locale}>{emptyText}</EmptyText>
        <EmptyDecor>
          <span /><span /><span /><span /><span />
        </EmptyDecor>
      </EmptyState>
    );
  }
  
  return (
    <Grid>
      {posts.map((post, index) => (
        <CardWrapper key={post.id} $index={index}>
          <BlogCard post={post} readTimeText={readTimeText} locale={locale} />
        </CardWrapper>
      ))}
    </Grid>
  );
}
