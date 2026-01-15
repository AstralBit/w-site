'use client';

import styled from 'styled-components';
import { Link } from '../../i18n/routing';
import { BlogPost } from '@/types/blog';
import Header from '../Header';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #fafafa;
  
  @media (prefers-color-scheme: dark) {
    background: #0a0a0a;
  }
`;

const Container = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 24px 64px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #525252;
  text-decoration: none;
  font-size: 0.875rem;
  margin-bottom: 32px;
  transition: color 0.2s ease;
  
  @media (prefers-color-scheme: dark) {
    color: #a1a1aa;
  }
  
  &:hover {
    color: #171717;
    
    @media (prefers-color-scheme: dark) {
      color: #ededed;
    }
  }
  
  &::before {
    content: '←';
  }
`;

const CoverImage = styled.div<{ $bgColor: string }>`
  width: 100%;
  height: 300px;
  background: ${props => props.$bgColor};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  margin-bottom: 32px;
`;

const Category = styled.span`
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #171717;
  margin: 24px 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
  
  @media (prefers-color-scheme: dark) {
    color: #ededed;
  }
  
  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  
  @media (prefers-color-scheme: dark) {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AuthorAvatar = styled.div<{ $bgColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #fff;
  font-weight: 600;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AuthorName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #171717;
  
  @media (prefers-color-scheme: dark) {
    color: #ededed;
  }
`;

const PublishDate = styled.span`
  font-size: 0.875rem;
  color: #737373;
  
  @media (prefers-color-scheme: dark) {
    color: #71717a;
  }
`;

const ReadTime = styled.span`
  font-size: 0.875rem;
  color: #737373;
  
  @media (prefers-color-scheme: dark) {
    color: #71717a;
  }
`;

const Content = styled.article`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
  
  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: #171717;
    margin: 2em 0 1em;
    font-weight: 700;
    line-height: 1.3;
    
    @media (prefers-color-scheme: dark) {
      color: #ededed;
    }
  }
  
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
  
  p {
    margin: 1.5em 0;
  }
  
  ul, ol {
    margin: 1.5em 0;
    padding-left: 1.5em;
  }
  
  li {
    margin: 0.5em 0;
  }
  
  code {
    background: rgba(0, 0, 0, 0.05);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
    
    @media (prefers-color-scheme: dark) {
      background: rgba(255, 255, 255, 0.1);
    }
  }
  
  pre {
    background: #1e1e1e;
    padding: 20px;
    border-radius: 12px;
    overflow-x: auto;
    margin: 2em 0;
    
    code {
      background: none;
      padding: 0;
      color: #d4d4d4;
    }
  }
  
  blockquote {
    border-left: 4px solid #667eea;
    padding-left: 20px;
    margin: 2em 0;
    font-style: italic;
    color: #525252;
    
    @media (prefers-color-scheme: dark) {
      color: #a1a1aa;
    }
  }
  
  a {
    color: #667eea;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  
  @media (prefers-color-scheme: dark) {
    border-top-color: rgba(255, 255, 255, 0.1);
  }
`;

const Tag = styled.span`
  padding: 6px 14px;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 20px;
`;

// 根据分类生成封面背景色
const getCoverColor = (category: string): string => {
  const colors: Record<string, string> = {
    tech: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    design: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    product: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  };
  return colors[category] || colors.tech;
};

// 根据分类生成图标
const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    tech: '💻',
    design: '🎨',
    product: '🚀',
  };
  return icons[category] || '📝';
};

// 生成头像背景色
const getAvatarColor = (name: string): string => {
  const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

interface BlogDetailClientProps {
  post: BlogPost;
  readTimeText: string;
  backText: string;
  navItems: { label: string; href: string }[];
}

export default function BlogDetailClient({ 
  post, 
  readTimeText,
  backText,
  navItems 
}: BlogDetailClientProps) {
  return (
    <PageWrapper>
      <Header navItems={navItems} />
      <Container>
        <BackLink href="/blog">
          {backText}
        </BackLink>
        
        <CoverImage $bgColor={getCoverColor(post.category)}>
          {getCategoryIcon(post.category)}
        </CoverImage>
        
        <Category>
          {post.category}
        </Category>
        
        <Title>{post.title}</Title>
        
        <Meta>
          <Author>
            <AuthorAvatar $bgColor={getAvatarColor(post.author.name)}>
              {post.author.name.charAt(0)}
            </AuthorAvatar>
            <AuthorInfo>
              <AuthorName>{post.author.name}</AuthorName>
              <PublishDate>{post.publishedAt}</PublishDate>
            </AuthorInfo>
          </Author>
          <ReadTime>{post.readingTime} {readTimeText}</ReadTime>
        </Meta>
        
        <Content>
          {post.content.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </Content>
        
        <Tags>
          {post.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      </Container>
    </PageWrapper>
  );
}

