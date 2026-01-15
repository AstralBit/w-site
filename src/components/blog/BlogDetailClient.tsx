'use client';

import styled, { keyframes } from 'styled-components';
import { Link } from '../../i18n/routing';
import { BlogPost } from '@/types/blog';
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
  max-width: 900px;
  margin: 0 auto;
  padding: 120px 24px 64px;
  position: relative;
  z-index: 1;
`;

const BackLink = styled(Link)`
  font-family: ${pixelFont};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.625rem;
  margin-bottom: 32px;
  padding: 8px 16px;
  border: 2px solid var(--foreground);
  background: var(--card-bg);
  box-shadow: 4px 4px 0 var(--foreground);
  transition: all 0.1s ease;
  
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--foreground);
    color: var(--foreground);
  }
  
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 var(--foreground);
  }
  
  &::before {
    content: '◀';
    color: #00d4ff;
  }
`;

const CoverImage = styled.div<{ $bgColor: string }>`
  width: 100%;
  height: 280px;
  background: ${props => props.$bgColor};
  border: 4px solid var(--foreground);
  box-shadow: 8px 8px 0 var(--foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  margin-bottom: 32px;
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
  animation: ${float} 3s ease-in-out infinite;
  display: inline-block;
`;

const Category = styled.span<{ $color: string }>`
  font-family: ${pixelFont};
  display: inline-block;
  padding: 6px 12px;
  background: ${props => props.$color};
  color: #000;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  border: 2px solid var(--foreground);
  box-shadow: 4px 4px 0 var(--foreground);
`;

const Title = styled.h1`
  font-family: ${pixelFont};
  font-size: 1.5rem;
  color: var(--foreground);
  margin: 24px 0;
  line-height: 1.8;
  text-shadow: 
    3px 3px 0 #ff2d7b,
    -1px -1px 0 #00d4ff;
  
  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 48px;
  padding: 20px;
  background: var(--card-bg);
  border: 4px solid var(--foreground);
  box-shadow: 6px 6px 0 var(--foreground);
  
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
  background: ${props => props.$bgColor};
  border: 3px solid var(--foreground);
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
  font-family: ${pixelFont};
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--foreground);
`;

const PublishDate = styled.span`
  font-family: ${pixelFont};
  font-size: 0.5rem;
  color: var(--text-muted);
`;

const ReadTime = styled.span`
  font-family: ${pixelFont};
  font-size: 0.625rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
  
  &::before {
    content: '⏱️';
    font-size: 1rem;
  }
`;

const Content = styled.article`
  font-family: ${pixelFont};
  font-size: 0.75rem;
  line-height: 2.5;
  color: var(--text-secondary);
  background: var(--card-bg);
  border: 4px solid var(--foreground);
  box-shadow: 8px 8px 0 var(--foreground);
  padding: 32px;
  
  h1, h2, h3, h4, h5, h6 {
    color: var(--foreground);
    margin: 2em 0 1em;
    font-weight: 700;
    line-height: 1.8;
    text-shadow: 2px 2px 0 #ff2d7b;
  }
  
  h1 { font-size: 1.25rem; }
  h2 { font-size: 1rem; }
  h3 { font-size: 0.875rem; }
  
  p {
    margin: 1.5em 0;
  }
  
  ul, ol {
    margin: 1.5em 0;
    padding-left: 1.5em;
  }
  
  li {
    margin: 0.75em 0;
    
    &::marker {
      color: #00d4ff;
    }
  }
  
  code {
    background: var(--foreground);
    color: var(--background);
    padding: 2px 6px;
    font-family: ${pixelFont};
    font-size: 0.625rem;
  }
  
  pre {
    background: #0a0a0a;
    padding: 20px;
    border: 4px solid var(--foreground);
    box-shadow: 4px 4px 0 var(--foreground);
    overflow-x: auto;
    margin: 2em 0;
    
    code {
      background: none;
      padding: 0;
      color: #00d4ff;
    }
  }
  
  blockquote {
    border-left: 4px solid #00d4ff;
    padding: 16px 20px;
    margin: 2em 0;
    background: rgba(0, 212, 255, 0.1);
    font-style: normal;
    
    &::before {
      content: '💬';
      display: block;
      margin-bottom: 8px;
    }
  }
  
  a {
    color: #00d4ff;
    text-decoration: none;
    border-bottom: 2px solid #00d4ff;
    
    &:hover {
      background: #00d4ff;
      color: #000;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 48px;
`;

const Tag = styled.span`
  font-family: ${pixelFont};
  padding: 6px 12px;
  background: var(--card-bg);
  color: #00d4ff;
  font-size: 0.5rem;
  border: 2px solid var(--foreground);
  box-shadow: 3px 3px 0 var(--foreground);
  transition: all 0.1s ease;
  
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 var(--foreground);
  }
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

const EndMark = styled.div`
  font-family: ${pixelFont};
  text-align: center;
  margin-top: 48px;
  color: var(--text-muted);
  font-size: 0.625rem;
  
  span {
    color: #ff2d7b;
    animation: ${blink} 2s ease-in-out infinite;
    display: inline-block;
  }
`;

// 根据分类生成封面背景色
const getCoverColor = (category: string): string => {
  const colors: Record<string, string> = {
    tech: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    design: 'linear-gradient(135deg, #2d132c 0%, #801336 100%)',
    product: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
  };
  return colors[category] || colors.tech;
};

// 根据分类生成颜色
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    tech: '#00d4ff',
    design: '#ff2d7b',
    product: '#ffff00',
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
      <Scanline />
      <PixelGrid />
      
      <Header navItems={navItems} />
      <Container>
        <BackLink href="/blog">
          {backText}
        </BackLink>
        
        <CoverImage $bgColor={getCoverColor(post.category)}>
          <IconWrapper>{getCategoryIcon(post.category)}</IconWrapper>
        </CoverImage>
        
        <Category $color={getCategoryColor(post.category)}>
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
        
        <PixelDivider>
          <span /><span /><span /><span /><span />
        </PixelDivider>
        
        <Tags>
          {post.tags.map(tag => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </Tags>
        
        <EndMark>
          ◆ END <span>_</span> ◆
        </EndMark>
      </Container>
    </PageWrapper>
  );
}
