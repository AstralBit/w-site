// 导航配置
export interface NavItem {
  labelKey: string;  // i18n key
  href: string;
}

// 主导航项配置
export const mainNavItems: NavItem[] = [
  { labelKey: 'home', href: '/' },
  { labelKey: 'blog', href: '/blog' },
  { labelKey: 'about', href: '/about' },
  { labelKey: 'photos', href: '/photos' },
];

// 辅助函数：根据翻译函数生成导航项
export function getNavItems(t: (key: string) => string) {
  return mainNavItems.map(item => ({
    label: t(item.labelKey),
    href: item.href,
  }));
}

