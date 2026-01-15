import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// 支持的语言列表
export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];

// 默认语言
export const defaultLocale: Locale = 'zh';

export const routing = defineRouting({
  locales,
  defaultLocale,
  // 语言前缀策略：always 表示总是显示语言前缀（/zh, /en）
  localePrefix: 'always',
});

// 创建导航工具
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

