'use client';

import { useState, useEffect } from 'react';
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
import { visit } from 'unist-util-visit';
import type { Root, Heading } from 'mdast';

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


// ========== 样式组件 ==========
const PageWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  /* 移除 overflow: hidden，否则会阻止 sticky 定位 */
`;

const Container = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 24px 80px;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 40px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const MainContent = styled.div`
  /* 移除 max-width，让 grid 布局控制宽度 */
`;

const Sidebar = styled.aside<{ $top: number }>`
  position: sticky;
  top: ${props => props.$top}px;
  align-self: start;
  height: fit-content;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  background: var(--card-bg);
  border: 3px solid var(--foreground);
  width: 100%;
  min-width: 0;
  transition: top 0.3s ease;
  
  /* 像素角 */
  clip-path: polygon(
    0 8px, 8px 8px, 8px 0,
    calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px,
    100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%,
    8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px)
  );

  /* 滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--card-border);
  }

  &::-webkit-scrollbar-thumb {
    background: #00ff41;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #00d4ff;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SidebarTitle = styled.div<{ $locale: Locale }>`
  font-family: ${pixelFont};
  font-size: ${props => getFontSize('sm', props.$locale)};
  color: var(--foreground);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--card-border);
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '📑';
  }
`;

const TocList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TocItem = styled.li<{ $level: number; $isActive: boolean; $locale: Locale }>`
  margin: ${props => props.$level === 1 ? '12px 0' : '8px 0'};
  padding-left: ${props => (props.$level - 1) * 16}px;
  
  a {
    display: block;
    font-family: ${pixelFont};
    font-size: ${props => {
      if (props.$level === 1) return '0.8rem';
      if (props.$level === 2) return '0.7rem';
      return '0.7rem';
    }};
    color: ${props => props.$isActive ? '#00ff41' : 'var(--text-secondary)'};
    text-decoration: none;
    padding: 6px 10px;
    border-left: 2px solid ${props => props.$isActive ? '#00ff41' : 'transparent'};
    transition: all 0.15s ease;
    position: relative;

    &:hover {
      color: #00d4ff;
      background: rgba(0, 212, 255, 0.1);
      border-left-color: #00d4ff;
    }

    &::before {
      content: '▶';
      display: ${props => props.$isActive ? 'inline' : 'none'};
      margin-right: 6px;
      color: #00ff41;
      font-size: 8px;
    }
  }
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
    scroll-margin-top: 100px;

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

// 标题类型
interface TocItem {
  id: string;
  text: string;
  level: number;
}

// 生成标题 ID
const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// 解析 Markdown 提取标题
const extractHeadings = (content: string): TocItem[] => {
  const headings: TocItem[] = [];
  if (!content) {
    console.log('extractHeadings: content is empty');
    return headings;
  }
  
  const lines = content.split('\n');

  lines.forEach((line) => {
    // 匹配 Markdown 标题格式：## 标题 或 # 标题
    // 支持 # 后面有空格或没有空格的情况
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      // 移除标题中的 Markdown 链接格式 [text](url)
      const cleanText = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
      const id = generateId(cleanText);
      headings.push({ id, text: cleanText, level });
    }
  });
  
  return headings;
};

const TOP_OFFSET = 820;

export default function BlogDetailClient({ 
  post, 
  readTimeText,
  backText,
  navItems,
  locale
}: BlogDetailClientProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [sidebarTop, setSidebarTop] = useState<number>(TOP_OFFSET);

  // 从内容中提取标题
  useEffect(() => {
    const extracted = extractHeadings(post.content);
    // 使用 setTimeout 避免同步 setState
    if (extracted.length > 0) {
      setTimeout(() => setHeadings(extracted), 0);
    } else {
      // 如果从内容中提取失败，等待 DOM 渲染后从 DOM 中提取
      const timer = setTimeout(() => {
        const domHeadings = document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6');
        
        if (domHeadings.length > 0) {
          const extractedFromDom: TocItem[] = [];
          domHeadings.forEach((heading) => {
            const level = parseInt(heading.tagName.charAt(1));
            const text = heading.textContent?.trim() || '';
            // 移除 # 符号（如果存在）
            const cleanText = text.replace(/^#+\s*/, '').trim();
            const id = heading.id || generateId(cleanText);
            
            if (cleanText && !extractedFromDom.find(h => h.id === id)) {
              extractedFromDom.push({ id, text: cleanText, level });
            }
          });
          if (extractedFromDom.length > 0) {
            setHeadings(extractedFromDom);
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [post.content]);

  // 监听滚动，高亮当前标题并调整侧边栏位置
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // 当滚动超过 680px 时，将侧边栏 top 从 800px 改为 120px
      // 680 = 800 - 120，这样在滚动到 680px 时，侧边栏刚好到达 120px 位置
      if (scrollPosition >= 680) {
        setSidebarTop(TOP_OFFSET - 700);
      } else {
        setSidebarTop(TOP_OFFSET);
      }
      
      // 找到当前应该高亮的标题
      const scrollPositionForHeading = scrollPosition + 150;
      let current = '';
      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id);
        if (element && element.offsetTop <= scrollPositionForHeading) {
          current = headings[i].id;
          break;
        }
      }
      
      setActiveId(current || headings[0]?.id || '');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始调用

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // 为标题添加 ID 的 rehype 插件
  const rehypeSlug = () => {
    return (tree: Root) => {
      visit(tree, 'heading', (node: Heading) => {
        if (node.children && node.children.length > 0) {
          const text = node.children
            .filter((child) => child.type === 'text')
            .map((child) => 'value' in child ? child.value : '')
            .join('');
          const id = generateId(text);
          node.data = node.data || {};
          (node.data as { id?: string; hProperties?: { id: string } }).id = id;
          (node.data as { id?: string; hProperties?: { id: string } }).hProperties = { id };
        }
      });
    };
  };

  // 点击跳转到标题
  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <PageWrapper>
      {/* 星际大战背景 */}
      <StarWarsBackground />
      
      <Header navItems={navItems} />
      
      <Container>
        <MainContent>
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
                rehypePlugins={[rehypeRaw, rehypeSlug]}
                components={{
                  h1: ({ node, children, ...props }) => {
                    const textContent = Array.isArray(children) 
                      ? children.map(c => typeof c === 'string' ? c : '').join('')
                      : String(children || '');
                    const id = (node?.data as { id?: string })?.id || generateId(textContent);
                    return <h1 id={id} {...props}>{children}</h1>;
                  },
                  h2: ({ node, children, ...props }) => {
                    const textContent = Array.isArray(children) 
                      ? children.map(c => typeof c === 'string' ? c : '').join('')
                      : String(children || '');
                    const id = (node?.data as { id?: string })?.id || generateId(textContent);
                    return <h2 id={id} {...props}>{children}</h2>;
                  },
                  h3: ({ node, children, ...props }) => {
                    const textContent = Array.isArray(children) 
                      ? children.map(c => typeof c === 'string' ? c : '').join('')
                      : String(children || '');
                    const id = (node?.data as { id?: string })?.id || generateId(textContent);
                    return <h3 id={id} {...props}>{children}</h3>;
                  },
                  h4: ({ node, children, ...props }) => {
                    const textContent = Array.isArray(children) 
                      ? children.map(c => typeof c === 'string' ? c : '').join('')
                      : String(children || '');
                    const id = (node?.data as { id?: string })?.id || generateId(textContent);
                    return <h4 id={id} {...props}>{children}</h4>;
                  },
                  h5: ({ node, children, ...props }) => {
                    const textContent = Array.isArray(children) 
                      ? children.map(c => typeof c === 'string' ? c : '').join('')
                      : String(children || '');
                    const id = (node?.data as { id?: string })?.id || generateId(textContent);
                    return <h5 id={id} {...props}>{children}</h5>;
                  },
                  h6: ({ node, children, ...props }) => {
                    const textContent = Array.isArray(children) 
                      ? children.map(c => typeof c === 'string' ? c : '').join('')
                      : String(children || '');
                    const id = (node?.data as { id?: string })?.id || generateId(textContent);
                    return <h6 id={id} {...props}>{children}</h6>;
                  },
                }}
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
        </MainContent>

        {headings.length > 0 ? (
          <Sidebar $top={sidebarTop}>
            <SidebarTitle $locale={locale}>
              {locale === 'zh' ? '目录' : 'TABLE OF CONTENTS'}
            </SidebarTitle>
            <TocList>
              {headings.map((heading) => (
                <TocItem
                  key={heading.id}
                  $level={heading.level}
                  $isActive={activeId === heading.id}
                  $locale={locale}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleTocClick(e, heading.id)}
                  >
                    {heading.text}
                  </a>
                </TocItem>
              ))}
            </TocList>
          </Sidebar>
        ) : null}
      </Container>
    </PageWrapper>
  );
}
