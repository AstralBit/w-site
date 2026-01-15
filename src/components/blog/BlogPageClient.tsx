'use client';

import styled from 'styled-components';
import { BlogPost } from '@/types/blog';
import BlogList from './BlogList';
import Header from '../Header';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--page-bg);
  transition: background-color 0.3s ease;
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
  color: var(--foreground);
  margin: 0 0 16px;
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
  
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  transition: color 0.3s ease;
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

