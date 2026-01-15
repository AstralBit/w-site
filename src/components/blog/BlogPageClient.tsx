'use client';

import styled from 'styled-components';
import { BlogPost } from '@/types/blog';
import BlogList from './BlogList';
import Header from '../Header';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #fafafa;
  
  @media (prefers-color-scheme: dark) {
    background: #0a0a0a;
  }
`;

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px 64px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #171717;
  margin: 0 0 16px;
  letter-spacing: -0.02em;
  
  @media (prefers-color-scheme: dark) {
    color: #ededed;
  }
  
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: #525252;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (prefers-color-scheme: dark) {
    color: #a1a1aa;
  }
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
      <Header navItems={navItems} />
      <Container>
        <PageHeader>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </PageHeader>
        <BlogList posts={posts} readTimeText={readTimeText} emptyText={emptyText} />
      </Container>
    </PageWrapper>
  );
}

