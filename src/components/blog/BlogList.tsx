'use client';

import styled from 'styled-components';
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

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
  text-align: center;
  padding: 64px 24px;
  color: #737373;
  
  @media (prefers-color-scheme: dark) {
    color: #71717a;
  }
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
    return <EmptyState>{emptyText}</EmptyState>;
  }
  
  return (
    <Grid>
      {posts.map(post => (
        <BlogCard key={post.id} post={post} readTimeText={readTimeText} />
      ))}
    </Grid>
  );
}

