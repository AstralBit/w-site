'use client';

import styled, { keyframes } from 'styled-components';
import { Link } from '../../i18n/routing';
import { BlogPost } from '@/types/blog';

// 像素字体
const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

// 动画
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

const Card = styled.article`
  background: var(--card-bg);
  border: 4px solid var(--foreground);
  position: relative;
  transition: all 0.2s ease;
  
  /* 像素化阴影 */
  box-shadow: 8px 8px 0 var(--foreground);
  
  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 var(--foreground);
  }
  
  &:active {
    transform: translate(0, 0);
    box-shadow: 4px 4px 0 var(--foreground);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const CoverImage = styled.div<{ $bgColor: string }>`
  width: 100%;
  height: 160px;
  background: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border-bottom: 4px solid var(--foreground);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.1) 50%);
    background-size: 100% 4px;
    pointer-events: none;
  }
`;

const IconWrapper = styled.span`
  animation: ${float} 2s ease-in-out infinite;
  display: inline-block;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const Category = styled.span<{ $color: string }>`
  font-family: ${pixelFont};
  display: inline-block;
  padding: 4px 8px;
  background: ${props => props.$color};
  color: #000;
  font-size: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  border: 2px solid var(--foreground);
  box-shadow: 2px 2px 0 var(--foreground);
`;

const Title = styled.h3`
  font-family: ${pixelFont};
  margin: 16px 0 12px;
  font-size: 0.75rem;
  color: var(--foreground);
  line-height: 1.8;
  transition: color 0.3s ease;
`;

const Excerpt = styled.p`
  font-family: ${pixelFont};
  font-size: 0.5rem;
  color: var(--text-secondary);
  line-height: 2;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 2px dashed var(--card-border);
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.div<{ $bgColor: string }>`
  width: 28px;
  height: 28px;
  background: ${props => props.$bgColor};
  border: 2px solid var(--foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #fff;
  font-weight: 600;
`;

const AuthorName = styled.span`
  font-family: ${pixelFont};
  font-size: 0.5rem;
  font-weight: 500;
  color: var(--foreground);
`;

const ReadTime = styled.span`
  font-family: ${pixelFont};
  font-size: 0.5rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: '⏱️';
    font-size: 0.75rem;
  }
`;

// 根据分类生成颜色
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    tech: '#00d4ff',
    design: '#ff2d7b',
    product: '#ffff00',
  };
  return colors[category] || colors.tech;
};

// 根据分类生成封面背景色
const getCoverColor = (category: string): string => {
  const colors: Record<string, string> = {
    tech: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    design: 'linear-gradient(135deg, #2d132c 0%, #801336 100%)',
    product: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
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
  const colors = ['#00d4ff', '#ff2d7b', '#ffff00', '#00ff00', '#a78bfa'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

interface BlogCardProps {
  post: BlogPost;
  readTimeText?: string;
}

export default function BlogCard({ post, readTimeText = '分钟' }: BlogCardProps) {
  return (
    <Card>
      <CardLink href={`/blog/${post.slug}`}>
        <CoverImage $bgColor={getCoverColor(post.category)}>
          <IconWrapper>{getCategoryIcon(post.category)}</IconWrapper>
        </CoverImage>
        <CardContent>
          <Category $color={getCategoryColor(post.category)}>
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
