'use client';

import styled, { keyframes } from 'styled-components';
import { Link } from '../../i18n/routing';
import { BlogPost } from '@/types/blog';
import Header from '../Header';
import StarWarsBackground from '../StarWarsBackground';
import { Locale } from '@/i18n/routing';
import { pixelFont, getFontSize, getLineHeight } from '@/config/fonts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// ========== 动画 ==========
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const glitch = keyframes`
  0%, 100% { 
    text-shadow: 2px 0 #ff2d7b, -2px 0 #00d4ff;
  }
  25% { 
    text-shadow: -2px 0 #ff2d7b, 2px 0 #00d4ff;
  }
  50% { 
    text-shadow: 2px 2px #ff2d7b, -2px -2px #00d4ff;
  }
  75% { 
    text-shadow: -2px 2px #ff2d7b, 2px -2px #00d4ff;
  }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(0, 255, 65, 0); }
`;

const neonFlicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  96% { opacity: 0.9; }
  97% { opacity: 1; }
`;

// ========== 样式组件 ==========
const PageWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Container = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 120px 24px 80px;
  position: relative;
  z-index: 2;
`;

// 返回按钮
const BackButton = styled(Link)<{ $locale: Locale }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('sm', props.$locale)};
  color: var(--text-secondary);
  text-decoration: none;
  padding: 10px 16px;
  background: var(--card-bg);
  border: 2px solid var(--foreground);
  margin-bottom: 40px;
  transition: all 0.15s ease;

  /* 像素角 */
  clip-path: polygon(
    0 4px, 4px 4px, 4px 0,
    calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
  );

  &::before {
    content: '◀';
    color: #00ff41;
    font-size: 10px;
  }

  &:hover {
    background: #00ff41;
    color: #0a0a0a;
    transform: translateX(-4px);

    &::before {
      color: #0a0a0a;
    }
  }
`;

// 封面区域
const CoverArea = styled.div<{ $category: string }>`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  border: 3px solid var(--foreground);
  background: ${props => {
    const gradients: Record<string, string> = {
      tech: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0a192f 100%)',
      design: 'linear-gradient(135deg, #1a0a1a 0%, #3d1a3d 50%, #2d0a2d 100%)',
      product: 'linear-gradient(135deg, #1a1a0a 0%, #2d2d1a 50%, #1a1a0a 100%)',
    };
    return gradients[props.$category] || gradients.tech;
  }};

  /* 像素角 */
  clip-path: polygon(
    0 12px, 12px 12px, 12px 0,
    calc(100% - 12px) 0, calc(100% - 12px) 12px, 100% 12px,
    100% calc(100% - 12px), calc(100% - 12px) calc(100% - 12px), calc(100% - 12px) 100%,
    12px 100%, 12px calc(100% - 12px), 0 calc(100% - 12px)
  );

  /* 网格 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px);
    background-size: 12px 12px;
  }

  /* 底部渐变 */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(transparent, var(--background));
  }
`;

const CoverIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6rem;
  animation: ${float} 3s ease-in-out infinite;
  filter: drop-shadow(0 0 30px rgba(0, 255, 65, 0.3));
`;

const CoverCorner = styled.div<{ $position: 'tl' | 'tr' | 'bl' | 'br'; $locale: Locale }>`
  position: absolute;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('xs', props.$locale)};
  color: #00ff41;
  opacity: 0.5;

  ${props => {
    switch(props.$position) {
      case 'tl': return `top: 16px; left: 16px;`;
      case 'tr': return `top: 16px; right: 16px;`;
      case 'bl': return `bottom: 16px; left: 16px;`;
      case 'br': return `bottom: 16px; right: 16px;`;
    }
  }}
`;

// 文章头部信息
const ArticleHeader = styled.div`
  margin-bottom: 48px;
`;

// 分类标签
const CategoryBadge = styled.div<{ $color: string; $locale: Locale }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: ${props => props.$color};
  color: #0a0a0a;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('sm', props.$locale)};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 24px;

  /* 像素角 */
  clip-path: polygon(
    0 4px, 4px 4px, 4px 0,
    calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
  );

  &::before {
    content: '◆';
    font-size: 8px;
  }
`;

// 标题
const Title = styled.h1<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('xl', props.$locale)};
  color: var(--foreground);
  line-height: ${props => getLineHeight('normal', props.$locale)};
  margin-bottom: 24px;
  
  &:hover {
    animation: ${glitch} 0.5s ease-in-out;
  }

  @media (max-width: 640px) {
    font-size: ${props => getFontSize('lg', props.$locale)};
  }
`;

// 元信息卡片
const MetaCard = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px 24px;
  background: var(--card-bg);
  border: 3px solid var(--foreground);
  flex-wrap: wrap;

  /* 像素角 */
  clip-path: polygon(
    0 8px, 8px 8px, 8px 0,
    calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px,
    100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%,
    8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px)
  );

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div<{ $color: string; $locale: Locale }>`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, ${props => props.$color} 0%, ${props => props.$color}88 100%);
  border: 2px solid var(--foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('md', props.$locale)};
  color: #fff;
  position: relative;

  /* 像素角 */
  clip-path: polygon(
    0 6px, 6px 6px, 6px 0,
    calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px,
    100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%,
    6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px)
  );

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 12px;
    height: 12px;
    background: #00ff41;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AuthorName = styled.span<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('sm', props.$locale)};
  color: var(--foreground);
`;

const PublishDate = styled.span<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('xs', props.$locale)};
  color: var(--text-muted);
`;

const MetaDivider = styled.div`
  width: 2px;
  height: 40px;
  background: var(--card-border);

  @media (max-width: 640px) {
    width: 100%;
    height: 2px;
  }
`;

const ReadTime = styled.div<{ $locale: Locale }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('sm', props.$locale)};
  color: var(--text-secondary);
  padding: 8px 12px;
  background: var(--card-border);

  /* 像素角 */
  clip-path: polygon(
    0 4px, 4px 4px, 4px 0,
    calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
  );

  span {
    color: #00d4ff;
  }
`;

// 文章内容
const Content = styled.article<{ $locale: Locale }>`
  background: var(--card-bg);
  border: 3px solid var(--foreground);
  padding: 40px;
  position: relative;
  overflow: hidden;

  /* 像素角 */
  clip-path: polygon(
    0 12px, 12px 12px, 12px 0,
    calc(100% - 12px) 0, calc(100% - 12px) 12px, 100% 12px,
    100% calc(100% - 12px), calc(100% - 12px) calc(100% - 12px), calc(100% - 12px) 100%,
    12px 100%, 12px calc(100% - 12px), 0 calc(100% - 12px)
  );

  /* 顶部装饰 */
  &::before {
    content: '// CONTENT START';
    position: absolute;
    top: 12px;
    left: 24px;
    font-family: ${pixelFont};
    font-size: ${props => getFontSize('xs', props.$locale)};
    color: var(--text-muted);
  }

  /* 行号装饰 */
  &::after {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    bottom: 0;
    width: 40px;
    background: var(--card-border);
    opacity: 0.3;
  }

  @media (max-width: 640px) {
    padding: 24px;
  }
`;

const ContentInner = styled.div<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: 1rem;
  line-height: 150%;
  color: var(--text-secondary);
  position: relative;
  padding-left: 20px;

  h1, h2, h3, h4, h5, h6 {
    color: var(--foreground);
    margin: 2.5em 0 1em;
    font-weight: bold;
    line-height: ${props => getLineHeight('normal', props.$locale)};
    position: relative;

    &::before {
      content: '#';
      color: #ff2d7b;
      margin-right: 8px;
    }
  }

  h1 { font-size: 2rem }
  h2 { font-size: 1.5rem }
  h3 { font-size: 1.25rem }

  p {
    margin: 1.5em 0;
  }

  ul, ol {
    margin: 1.5em 0;
    padding-left: 1.5em;
  }

  li {
    margin: 0.75em 0;
    position: relative;

    &::marker {
      color: #00ff41;
    }
  }

  code {
    background: var(--foreground);
    color: var(--background);
    padding: 3px 8px;
    font-family: ${pixelFont};
    font-size: 0.8rem;

    /* 像素角 */
    clip-path: polygon(
      0 2px, 2px 2px, 2px 0,
      calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px,
      100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%,
      2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px)
    );
  }

  pre {
    background: #0a0a0a;
    padding: 24px;
    border: 3px solid #00ff41;
    overflow-x: auto;
    margin: 2em 0;
    position: relative;

    /* 像素角 */
    clip-path: polygon(
      0 8px, 8px 8px, 8px 0,
      calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px,
      100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%,
      8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px)
    );

    &::before {
      content: '> CODE';
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: ${props => getFontSize('xs', props.$locale)};
      color: #00ff41;
      opacity: 0.5;
    }

    code {
      background: none;
      padding: 0;
      color: #00ff41;
      clip-path: none;
    }
  }

  blockquote {
    border-left: 4px solid #00d4ff;
    padding: 20px 24px;
    margin: 2em 0;
    background: rgba(0, 212, 255, 0.05);
    position: relative;

    &::before {
      content: '💬';
      position: absolute;
      top: -12px;
      left: 16px;
      font-size: 1.5rem;
    }
  }

  a {
    color: #00d4ff;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: all 0.15s ease;

    &:hover {
      border-bottom-color: #00d4ff;
      background: rgba(0, 212, 255, 0.1);
    }
  }
`;

// 标签区域
const TagsSection = styled.div`
  margin-top: 48px;
`;

const TagsTitle = styled.div<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('sm', props.$locale)};
  color: var(--text-muted);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '🏷️';
  }
`;

const TagsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('md', props.$locale)};
  padding: 8px 14px;
  background: var(--card-bg);
  color: #00d4ff;
  border: 2px solid var(--foreground);
  transition: all 0.15s ease;
  cursor: default;

  /* 像素角 */
  clip-path: polygon(
    0 4px, 4px 4px, 4px 0,
    calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
  );

  &:hover {
    background: #00d4ff;
    color: #0a0a0a;
    transform: translateY(-2px);
  }

  &::before {
    content: '#';
    opacity: 0.6;
  }
`;

// 结束标记
const EndMark = styled.div`
  text-align: center;
  margin-top: 64px;
  padding: 32px;
  border-top: 2px dashed var(--card-border);
`;

const EndText = styled.div<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('sm', props.$locale)};
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  span {
    color: #ff2d7b;
    animation: ${blink} 2s ease-in-out infinite;
  }
`;

const EndDecor = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;

  div {
    width: 8px;
    height: 8px;

    &:nth-child(1) { background: #ff2d7b; }
    &:nth-child(2) { background: #ffff00; }
    &:nth-child(3) { background: #00ff41; }
    &:nth-child(4) { background: #00d4ff; }
    &:nth-child(5) { background: #a78bfa; }
  }
`;

// ========== 辅助函数 ==========
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    tech: '#00ff41',
    design: '#ff2d7b',
    product: '#ffff00',
  };
  return colors[category] || colors.tech;
};

const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    tech: '💻',
    design: '🎨',
    product: '🚀',
  };
  return icons[category] || '📝';
};

const getAvatarColor = (name: string): string => {
  const colors = ['#00d4ff', '#ff2d7b', '#ffff00', '#00ff41', '#a78bfa'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

// ========== 组件 ==========
interface BlogDetailClientProps {
  post: BlogPost;
  readTimeText: string;
  backText: string;
  navItems: { label: string; href: string }[];
  locale: Locale;
}

export default function BlogDetailClient({ 
  post, 
  readTimeText,
  backText,
  navItems,
  locale
}: BlogDetailClientProps) {
  return (
    <PageWrapper>
      {/* 星际大战背景 */}
      <StarWarsBackground />
      
      <Header navItems={navItems} />
      
      <Container>
        <BackButton href="/blog" $locale={locale}>
          {backText}
        </BackButton>

        <CoverArea $category={post.category}>
          <CoverCorner $position="tl" $locale={locale}>┌ FILE: {post.slug}</CoverCorner>
          <CoverCorner $position="tr" $locale={locale}>v1.0 ┐</CoverCorner>
          <CoverCorner $position="bl" $locale={locale}>└ {post.category.toUpperCase()}</CoverCorner>
          <CoverCorner $position="br" $locale={locale}>READY ┘</CoverCorner>
          <CoverIcon>{getCategoryIcon(post.category)}</CoverIcon>
        </CoverArea>

        <ArticleHeader>
          <CategoryBadge $color={getCategoryColor(post.category)} $locale={locale}>
            {post.category}
          </CategoryBadge>

          <Title $locale={locale}>{post.title}</Title>

          <MetaCard>
            <AuthorInfo>
              <Avatar $color={getAvatarColor(post.author.name)} $locale={locale}>
                {post.author.name.charAt(0)}
              </Avatar>
              <AuthorDetails>
                <AuthorName $locale={locale}>{post.author.name}</AuthorName>
                <PublishDate $locale={locale}>{post.publishedAt}</PublishDate>
              </AuthorDetails>
            </AuthorInfo>

            <MetaDivider />

            <ReadTime $locale={locale}>
              ⏱ <span>{post.readingTime}</span> {readTimeText}
            </ReadTime>
          </MetaCard>
        </ArticleHeader>

        <Content $locale={locale}>
          <ContentInner $locale={locale}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {post.content}
            </ReactMarkdown>
          </ContentInner>
        </Content>

        <TagsSection>
          <TagsTitle $locale={locale}>{locale === 'zh' ? '标签' : 'TAGS'}</TagsTitle>
          <TagsGrid>
            {post.tags.map(tag => (
              <Tag key={tag} $locale={locale}>{tag}</Tag>
            ))}
          </TagsGrid>
        </TagsSection>

        <EndMark>
          <EndText $locale={locale}>
            ◆ {locale === 'zh' ? '文章结束' : 'END OF FILE'} <span>_</span> ◆
          </EndText>
          <EndDecor>
            <div /><div /><div /><div /><div />
          </EndDecor>
        </EndMark>
      </Container>
    </PageWrapper>
  );
}
