import { BlogPost, BlogCategory } from '@/types/blog';

export const blogCategories: BlogCategory[] = [
  { id: '1', name: '技术', slug: 'tech' },
  { id: '2', name: '设计', slug: 'design' },
  { id: '3', name: '产品', slug: 'product' },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-nextjs',
    title: 'Next.js 入门指南',
    excerpt: '学习如何使用 Next.js 构建现代化的 React 应用程序，包括服务端渲染、静态生成等核心概念。',
    content: `
# Next.js 入门指南

Next.js 是一个基于 React 的全栈框架，它提供了许多开箱即用的功能，让你能够快速构建生产级别的应用。

## 为什么选择 Next.js？

1. **服务端渲染 (SSR)** - 提升首屏加载速度和 SEO
2. **静态生成 (SSG)** - 构建时预渲染页面
3. **API 路由** - 轻松创建后端 API
4. **文件系统路由** - 基于文件结构自动生成路由

## 开始使用

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## 核心概念

### App Router

Next.js 13+ 引入了新的 App Router，基于 React Server Components 构建。

### 布局和页面

在 \`app\` 目录下创建 \`layout.tsx\` 和 \`page.tsx\` 文件来定义布局和页面。

## 总结

Next.js 是构建现代 Web 应用的绝佳选择，它结合了 React 的灵活性和服务端渲染的优势。
    `,
    coverImage: '/images/blog/nextjs.jpg',
    author: {
      name: '张三',
      avatar: '/images/avatars/author1.jpg',
    },
    category: 'tech',
    tags: ['Next.js', 'React', '前端'],
    publishedAt: '2024-01-15',
    readingTime: 5,
  },
  {
    id: '2',
    slug: 'modern-css-techniques',
    title: '现代 CSS 技巧与最佳实践',
    excerpt: '探索现代 CSS 的强大功能，包括 Grid、Flexbox、CSS 变量等，让你的样式代码更加优雅。',
    content: `
# 现代 CSS 技巧与最佳实践

CSS 已经发展成为一门强大的样式语言，本文将介绍一些现代 CSS 的技巧。

## CSS Grid 布局

CSS Grid 是一个二维布局系统，非常适合创建复杂的页面布局。

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## CSS 变量

CSS 变量让你可以在整个样式表中复用值。

\`\`\`css
:root {
  --primary-color: #3498db;
  --spacing: 16px;
}

.button {
  background: var(--primary-color);
  padding: var(--spacing);
}
\`\`\`

## 容器查询

容器查询允许你根据父容器的大小来应用样式。

## 总结

掌握这些现代 CSS 技巧将大大提升你的开发效率。
    `,
    coverImage: '/images/blog/css.jpg',
    author: {
      name: '李四',
      avatar: '/images/avatars/author2.jpg',
    },
    category: 'design',
    tags: ['CSS', '前端', '设计'],
    publishedAt: '2024-01-10',
    readingTime: 4,
  },
  {
    id: '3',
    slug: 'building-great-products',
    title: '如何打造优秀的产品',
    excerpt: '从用户需求出发，探讨如何设计和开发用户真正需要的产品，以及产品迭代的最佳实践。',
    content: `
# 如何打造优秀的产品

打造优秀的产品需要深入理解用户需求，并持续迭代改进。

## 了解用户

1. 用户调研
2. 数据分析
3. 用户反馈

## 产品设计原则

### 简洁性

保持产品简洁，专注于核心功能。

### 一致性

确保产品体验的一致性，降低用户学习成本。

### 可用性

让产品易于使用，减少用户的认知负担。

## 迭代与改进

产品开发是一个持续的过程，需要不断收集反馈并改进。

## 总结

优秀的产品来自对用户的深入理解和持续的改进。
    `,
    coverImage: '/images/blog/product.jpg',
    author: {
      name: '王五',
      avatar: '/images/avatars/author3.jpg',
    },
    category: 'product',
    tags: ['产品', '设计', '用户体验'],
    publishedAt: '2024-01-05',
    readingTime: 6,
  },
];

// 获取所有博客文章
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// 根据 slug 获取单篇文章
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// 根据分类获取文章
export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

// 获取所有分类
export function getAllCategories(): BlogCategory[] {
  return blogCategories;
}

