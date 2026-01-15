import { Locale } from '@/i18n/routing';

// 像素字体
export const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

// 基于语言的字体大小配置
// 中文字符在像素字体下需要更大的尺寸才能清晰显示
export const fontSizes = {
  // 超小号文字 (状态指示器、标签等)
  xs: {
    zh: '0.6rem',
    en: '0.4rem',
  },
  // 小号文字 (分类、时间、作者等)
  sm: {
    zh: '0.75rem',
    en: '0.5rem',
  },
  // 基础文字 (摘要、正文等)
  base: {
    zh: '0.875rem',
    en: '0.6rem',
  },
  // 中号文字 (标题等)
  md: {
    zh: '1rem',
    en: '0.7rem',
  },
  // 大号文字 (页面标题等)
  lg: {
    zh: '1.25rem',
    en: '1rem',
  },
  // 超大号文字 (主标题)
  xl: {
    zh: '1.75rem',
    en: '1.5rem',
  },
  // 巨大文字 (Hero 标题)
  '2xl': {
    zh: '2.5rem',
    en: '2rem',
  },
} as const;

// 获取字体大小的辅助函数
export const getFontSize = (size: keyof typeof fontSizes, locale: Locale): string => {
  return fontSizes[size][locale] || fontSizes[size].en;
};

// 行高配置 (中文需要更大的行高)
export const lineHeights = {
  tight: {
    zh: '1.8',
    en: '1.6',
  },
  normal: {
    zh: '2.2',
    en: '1.8',
  },
  relaxed: {
    zh: '2.5',
    en: '2.0',
  },
  loose: {
    zh: '2.8',
    en: '2.2',
  },
} as const;

export const getLineHeight = (size: keyof typeof lineHeights, locale: Locale): string => {
  return lineHeights[size][locale] || lineHeights[size].en;
};

