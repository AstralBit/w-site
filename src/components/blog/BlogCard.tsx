'use client';

import styled, { keyframes, css } from 'styled-components';
import { Link } from '../../i18n/routing';
import { BlogPost } from '@/types/blog';
import { useState } from 'react';
import { Locale } from '@/i18n/routing';
import { pixelFont, getFontSize, getLineHeight } from '@/config/fonts';

// ========== 动画 ==========
const scanline = keyframes`
  0% { top: -10%; }
  100% { top: 110%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.05); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(0, 255, 65, 0); }
`;

// ========== 样式组件 ==========
const Card = styled.article<{ $isHovered: boolean }>`
  background: var(--card-bg);
  border: 3px solid var(--foreground);
  position: relative;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  /* 像素角裁剪 */
  clip-path: polygon(
    0 8px, 8px 8px, 8px 0,
    calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px,
    100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%,
    8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px)
  );

  /* 扫描线效果 */
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(
      transparent 0%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 100%
    );
    animation: ${scanline} 3s linear infinite;
    pointer-events: none;
    z-index: 5;
    opacity: ${props => props.$isHovered ? 1 : 0};
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translate(-6px, -6px);
    box-shadow: 
      6px 6px 0 var(--foreground),
      12px 12px 0 #ff2d7b;
  }

  &:active {
    transform: translate(-2px, -2px);
    box-shadow: 2px 2px 0 var(--foreground);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

// 封面区域 - 游戏卡带风格
const CoverArea = styled.div<{ $category: string }>`
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;
  background: ${props => {
    const gradients: Record<string, string> = {
      tech: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0a192f 100%)',
      design: 'linear-gradient(135deg, #1a0a1a 0%, #3d1a3d 50%, #2d0a2d 100%)',
      product: 'linear-gradient(135deg, #1a1a0a 0%, #2d2d1a 50%, #1a1a0a 100%)',
    };
    return gradients[props.$category] || gradients.tech;
  }};

  /* 网格背景 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px);
    background-size: 8px 8px;
  }

  /* 底部分隔线 */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: repeating-linear-gradient(
      90deg,
      #ff2d7b 0px, #ff2d7b 4px,
      transparent 4px, transparent 8px
    );
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  animation: ${float} 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(0, 255, 65, 0.3));

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 10px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    filter: blur(5px);
  }
`;

// 角落装饰
const CornerDecor = styled.div<{ $position: 'tl' | 'tr' | 'bl' | 'br' }>`
  position: absolute;
  width: 20px;
  height: 20px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff41;
  opacity: 0.6;

  ${props => {
    switch(props.$position) {
      case 'tl': return css`top: 8px; left: 8px;`;
      case 'tr': return css`top: 8px; right: 8px;`;
      case 'bl': return css`bottom: 8px; left: 8px;`;
      case 'br': return css`bottom: 8px; right: 8px;`;
    }
  }}
`;

// 状态指示器
const StatusIndicator = styled.div<{ $locale: Locale }>`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #00ff41;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('xs', props.$locale)};
  color: #00ff41;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #00ff41;
    border-radius: 50%;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

// 内容区域
const CardContent = styled.div`
  padding: 20px;
  position: relative;
`;

// 分类标签 - 游戏风格
const CategoryBadge = styled.div<{ $color: string; $locale: Locale }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: ${props => props.$color};
  color: #000;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('xs', props.$locale)};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;

  /* 像素角 */
  clip-path: polygon(
    0 4px, 4px 4px, 4px 0,
    calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
  );

  &::before {
    content: '◆';
    font-size: 6px;
  }
`;

// 标题 - 终端风格
const Title = styled.h3<{ $locale: Locale }>`
  font-family: ${pixelFont};
  margin: 16px 0 12px;
  font-size: 1rem;
  color: var(--foreground);
  line-height: ${props => getLineHeight('tight', props.$locale)};
  position: relative;

  &::before {
    content: '>';
    color: #00ff41;
    margin-right: 8px;
    opacity: 0.8;
  }
`;

// 摘要
const Excerpt = styled.p<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: ${props => getLineHeight('normal', props.$locale)};
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-left: 16px;
  border-left: 2px solid var(--card-border);
`;

// 底部信息栏
const MetaBar = styled.div<{ $locale: Locale }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 2px dashed var(--card-border);
  position: relative;

  &::before {
    content: '//';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--card-bg);
    padding: 0 8px;
    color: var(--text-muted);
    font-family: ${pixelFont};
    font-size: ${props => getFontSize('xs', props.$locale)};
  }
`;

// 作者区域
const AuthorArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div<{ $color: string; $locale: Locale }>`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, ${props => props.$color} 0%, ${props => props.$color}88 100%);
  border: 2px solid var(--foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('sm', props.$locale)};
  color: #fff;
  text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
  position: relative;

  /* 像素角 */
  clip-path: polygon(
    0 4px, 4px 4px, 4px 0,
    calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
  );

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background: #00ff41;
    border-radius: 50%;
    border: 1px solid var(--card-bg);
  }
`;

const AuthorName = styled.span<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('sm', props.$locale)};
  color: var(--foreground);
`;

// 阅读时间
const ReadTime = styled.div<{ $locale: Locale }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('xs', props.$locale)};
  color: var(--text-muted);
  padding: 4px 8px;
  background: var(--card-border);
  border-radius: 0;

  /* 像素角 */
  clip-path: polygon(
    0 3px, 3px 3px, 3px 0,
    calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px,
    100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%,
    3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px)
  );

  span {
    color: #00d4ff;
  }
`;

// 悬停时显示的"阅读更多"
const ReadMore = styled.div<{ $show: boolean; $locale: Locale }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 255, 65, 0.1) 100%);
  text-align: center;
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('sm', props.$locale)};
  color: #00ff41;
  transform: translateY(${props => props.$show ? '0' : '100%'});
  opacity: ${props => props.$show ? 1 : 0};
  transition: all 0.2s ease;

  &::before {
    content: '[ ';
  }
  &::after {
    content: ' ]';
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
interface BlogCardProps {
  post: BlogPost;
  readTimeText?: string;
  locale: Locale;
}

export default function BlogCard({ post, readTimeText = 'MIN', locale }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      $isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardLink href={`/blog/${post.slug}`}>
        <CoverArea $category={post.category}>
          <CornerDecor $position="tl">┌</CornerDecor>
          <CornerDecor $position="tr">┐</CornerDecor>
          <CornerDecor $position="bl">└</CornerDecor>
          <CornerDecor $position="br">┘</CornerDecor>
          
          <IconContainer>
            {getCategoryIcon(post.category)}
          </IconContainer>
          
          <StatusIndicator $locale={locale}>READY</StatusIndicator>
        </CoverArea>

        <CardContent>
          <CategoryBadge $color={getCategoryColor(post.category)} $locale={locale}>
            {post.category}
          </CategoryBadge>

          <Title $locale={locale}>{post.title}</Title>
          <Excerpt $locale={locale}>{post.excerpt}</Excerpt>

          <MetaBar $locale={locale}>
            <AuthorArea>
              <Avatar $color={getAvatarColor(post.author.name)} $locale={locale}>
                {post.author.name.charAt(0)}
              </Avatar>
              <AuthorName $locale={locale}>{post.author.name}</AuthorName>
            </AuthorArea>

            <ReadTime $locale={locale}>
              ⏱ <span>{post.readingTime}</span> {readTimeText}
            </ReadTime>
          </MetaBar>

          <ReadMore $show={isHovered} $locale={locale}>
            {locale === 'zh' ? '点击阅读' : 'PRESS TO READ'}
          </ReadMore>
        </CardContent>
      </CardLink>
    </Card>
  );
}
