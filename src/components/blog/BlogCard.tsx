'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { BlogPost } from '@/types/blog';

const Card = styled.article`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  @media (prefers-color-scheme: dark) {
    background: #1a1a1a;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    
    @media (prefers-color-scheme: dark) {
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    }
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const CoverImage = styled.div<{ $bgColor: string }>`
  width: 100%;
  height: 200px;
  background: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const CardContent = styled.div`
  padding: 24px;
`;

const Category = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Title = styled.h3`
  margin: 16px 0 12px;
  font-size: 1.25rem;
  font-weight: 700;
  color: #171717;
  line-height: 1.4;
  
  @media (prefers-color-scheme: dark) {
    color: #ededed;
  }
`;

const Excerpt = styled.p`
  font-size: 0.9rem;
  color: #525252;
  line-height: 1.6;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (prefers-color-scheme: dark) {
    color: #a1a1aa;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  
  @media (prefers-color-scheme: dark) {
    border-top-color: rgba(255, 255, 255, 0.1);
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthorAvatar = styled.div<{ $bgColor: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: #fff;
  font-weight: 600;
`;

const AuthorName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #171717;
  
  @media (prefers-color-scheme: dark) {
    color: #ededed;
  }
`;

const ReadTime = styled.span`
  font-size: 0.8rem;
  color: #737373;
  
  @media (prefers-color-scheme: dark) {
    color: #71717a;
  }
`;

// 根据分类生成颜色
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    tech: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    design: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    product: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  };
  return colors[category] || colors.tech;
};

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

interface BlogCardProps {
  post: BlogPost;
  readTimeText?: string;
}

export default function BlogCard({ post, readTimeText = '分钟阅读' }: BlogCardProps) {
  const locale = useLocale();
  
  return (
    <Card>
      <CardLink href={`/${locale}/blog/${post.slug}`}>
        <CoverImage $bgColor={getCoverColor(post.category)}>
          {getCategoryIcon(post.category)}
        </CoverImage>
        <CardContent>
          <Category style={{ background: getCategoryColor(post.category) }}>
            {post.category}
          </Category>
          <Title>{post.title}</Title>
          <Excerpt>{post.excerpt}</Excerpt>
          <Meta>
            <Author>
              <AuthorAvatar $bgColor={getAvatarColor(post.author.name)}>
                {post.author.name.charAt(0)}
              </AuthorAvatar>
              <AuthorName>{post.author.name}</AuthorName>
            </Author>
            <ReadTime>{post.readingTime} {readTimeText}</ReadTime>
          </Meta>
        </CardContent>
      </CardLink>
    </Card>
  );
}

