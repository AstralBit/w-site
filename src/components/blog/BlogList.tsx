'use client';

import styled, { keyframes } from 'styled-components';
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

// 像素字体
const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

// 动画
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const EmptyState = styled.div`
  font-family: ${pixelFont};
  text-align: center;
  padding: 64px 24px;
  color: var(--text-muted);
  font-size: 0.75rem;
  background: var(--card-bg);
  border: 4px solid var(--foreground);
  box-shadow: 8px 8px 0 var(--foreground);
  
  &::before {
    content: '📭';
    display: block;
    font-size: 3rem;
    margin-bottom: 16px;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 12px;
  background: var(--text-muted);
  margin-left: 4px;
  animation: ${blink} 1s step-end infinite;
`;

interface BlogListProps {
  posts: BlogPost[];
  readTimeText?: string;
  emptyText?: string;
}

export default function BlogList({ 
  posts, 
  readTimeText = '分钟阅读',
  emptyText = '暂无文章'
}: BlogListProps) {
  if (posts.length === 0) {
    return (
      <EmptyState>
        {emptyText}
        <Cursor />
      </EmptyState>
    );
  }
  
  return (
    <Grid>
      {posts.map(post => (
        <BlogCard key={post.id} post={post} readTimeText={readTimeText} />
      ))}
    </Grid>
  );
}
