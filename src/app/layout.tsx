import type { Metadata, Viewport } from 'next';
import { defaultLocale } from '../i18n/routing';
import StyledComponentsRegistry from '../lib/StyledComponentsRegistry';
import './globals.css';

// 网站基础信息
const siteConfig = {
  name: 'Pixel Dev',
  url: 'https://lucent-bunny-d32ead.netlify.app',
  author: 'AstralBit',
  email: 'astralbit@163.com',
  github: 'https://github.com/AstralBit',
};

// SEO 元数据
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: '全栈开发者',
    template: '%s | AstralBit',
  },
  description: '一个热爱代码的全栈工程师，专注于创造有趣的数字体验。探索像素艺术风格的个人网站。',
  keywords: [
    'AstralBit',
    '全栈开发者',
    '全栈开发',
    'Full-Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    '前端开发',
    '后端开发',
    '像素艺术',
    'Pixel Art',
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.github }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: '512x512' },
    ],
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'DEV | Full-Stack Developer',
    description: '一个热爱代码的全栈工程师，专注于创造有趣的数字体验。',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'AstralBit - 全栈开发者',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DEV | Full-Stack Developer',
    description: '一个热爱代码的全栈工程师，专注于创造有趣的数字体验。',
    images: ['/og-image.svg'],
    creator: '@AstralBit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'zh-CN': `${siteConfig.url}/zh`,
      'en-US': `${siteConfig.url}/en`,
    },
  },
};

// 视口配置
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// 在页面加载前设置主题的脚本
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
