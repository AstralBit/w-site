---
title: Next.js 入门指南
excerpt: 学习如何使用 Next.js 构建现代化的 React 应用程序，包括服务端渲染、静态生成等核心概念。
coverImage: /images/blog/nextjs.jpg
author:
  name: astral
  avatar: /images/avatars/author1.jpg
category: tech
tags:
  - Next.js
  - React
  - 前端
publishedAt: 2024-01-15
---

# Next.js 入门指南

学习如何使用 Next.js 构建现代化的 React 应用程序，包括服务端渲染、静态生成等核心概念。

## 目录

- [一、Next.js 简介](#一nextjs-简介)
  - [1. 什么是 Next.js](#1-什么是-nextjs)
  - [2. 核心优势](#2-核心优势)
  - [3. 适用场景](#3-适用场景)
- [二、环境搭建与项目初始化](#二环境搭建与项目初始化)
  - [1. 前置条件](#1-前置条件)
  - [2. 快速创建项目](#2-快速创建项目)
  - [3. 项目目录结构解析](#3-项目目录结构解析)
  - [4. 启动与调试](#4-启动与调试)
- [三、核心特性详解](#三核心特性详解)
  - [1. 路由系统（File-system Routing）](#1-路由系统file-system-routing)
  - [2. 渲染方式（SSR/SSG/ISR/CSR）](#2-渲染方式ssrssgisrcsr)
  - [3. 数据获取](#3-数据获取)
  - [4. API Routes](#4-api-routes)
  - [5. 样式解决方案](#5-样式解决方案)
- [四、基础实战：构建简单页面](#四基础实战构建简单页面)
  - [1. 静态页面创建](#1-静态页面创建)
  - [2. 动态路由实现](#2-动态路由实现)
  - [3. 数据渲染示例（SSG + SSR）](#3-数据渲染示例ssg--ssr)
- [五、进阶技巧](#五进阶技巧)
  - [1. 路由跳转与参数传递](#1-路由跳转与参数传递)
  - [2. 环境变量配置](#2-环境变量配置)
  - [3. 图片优化（Next/Image）](#3-图片优化nextimage)
  - [4. 性能优化建议](#4-性能优化建议)
- [六、部署与上线](#六部署与上线)
  - [1. 构建生产版本](#1-构建生产版本)
  - [2. 常用部署平台](#2-常用部署平台)
  - [3. 部署注意事项](#3-部署注意事项)
- [七、总结与资源推荐](#七总结与资源推荐)

## 一、Next.js 简介

### 1. 什么是 Next.js

Next.js 是一个基于 React 的开源框架，由 Vercel 开发维护，专为构建现代化 Web 应用而生。它封装了 React 应用的构建配置、路由管理、渲染优化等核心能力，让开发者无需手动配置复杂工具链，即可快速搭建高性能、可扩展的 React 应用。

### 2. 核心优势

- **多种渲染方式支持**：同时支持服务端渲染（SSR）、静态生成（SSG）、增量静态再生（ISR）和客户端渲染（CSR），按需选择适配场景。
- **零配置路由**：基于文件系统的路由机制，无需额外配置路由表，文件结构即路由结构，降低学习和维护成本。
- **内置优化能力**：自动优化图片、字体、脚本加载，支持代码分割、懒加载，提升应用加载速度和性能。
- **API 路由集成**：可直接创建后端 API 接口，无需单独搭建服务器，实现前后端同构开发。
- **良好的开发体验**：支持热重载、TypeScript 原生集成、ES Modules 等，适配现代开发流程。

### 3. 适用场景

- 个人博客、企业官网、营销页面（优先用 SSG 提升加载速度和 SEO）。
- 电商平台、内容管理系统（CMS）（结合 SSR/ISR 实现动态内容与性能平衡）。
- 全栈应用（利用 API Routes 实现前后端一体化开发）。
- 对 SEO、加载性能、用户体验有较高要求的 React 应用。

## 二、环境搭建与项目初始化

### 1. 前置条件

确保本地环境已安装：

- **Node.js 18.17 及以上版本**（推荐使用 LTS 版本）
- **npm、yarn 或 pnpm 包管理器**（本文以 npm 为例）

### 2. 快速创建项目

使用官方脚手架快速初始化 Next.js 项目，命令如下：

```bash
# 创建项目（project-name 替换为你的项目名称）
npx create-next-app@latest project-name

# 进入项目目录
cd project-name
```

执行命令后，会出现交互式配置选项，可根据需求选择：

- 是否使用 TypeScript（推荐选 Yes）
- 是否使用 ESLint（代码检查，推荐选 Yes）
- 是否使用 Tailwind CSS（样式框架，按需选择）
- 是否使用 src/ 目录（规范项目结构，推荐选 Yes）
- 是否使用 App Router（Next.js 13+ 新路由，推荐新手先选 Pages Router）
- 是否自定义导入别名（按需选择）

### 3. 项目目录结构解析

以 Pages Router（传统路由，适合入门）为例，核心目录结构如下：

```plaintext
project-name/
├── node_modules/       # 依赖包
├── public/             # 静态资源目录（图片、字体等，可直接通过根路径访问）
├── src/
│   └── pages/          # 路由核心目录，文件即路由
│       ├── _app.js     # 全局入口组件，用于包裹所有页面
│       ├── _document.js# 自定义 HTML 文档结构（可选）
│       ├── index.js    # 首页（对应 / 路由）
│       └── api/        # API 路由目录（对应 /api 路由）
├── .eslintrc.json      # ESLint 配置
├── next.config.js      # Next.js 核心配置文件
├── package.json        # 项目依赖与脚本
└── README.md           # 项目说明
```

### 4. 启动与调试

```bash
# 启动开发服务器（默认端口 3000）
npm run dev

# 访问项目
打开浏览器访问 http://localhost:3000
```

开发模式下支持热重载，修改代码后页面会自动刷新，无需手动重启服务器。

## 三、核心特性详解

### 1. 路由系统（File-system Routing）

Next.js Pages Router 采用 "文件即路由" 的设计，`src/pages` 目录下的文件会自动映射为对应路由：

- **静态路由**：`pages/index.js` → `/`（首页），`pages/about.js` → `/about`（关于页）。
- **嵌套路由**：`pages/blog/index.js` → `/blog`，`pages/blog/post1.js` → `/blog/post1`；也可通过文件夹嵌套实现，如 `pages/blog/posts/[id].js` → `/blog/posts/:id`（动态路由）。
- **动态路由**：文件名用 `[参数名].js` 表示，如 `pages/users/[id].js`，可通过 `useRouter` 钩子获取参数 `id`。
- **404 页面**：创建 `pages/404.js`，当访问不存在的路由时自动渲染该页面。

### 2. 渲染方式（SSR/SSG/ISR/CSR）

Next.js 提供四种渲染方式，可根据页面需求灵活选择：

**静态生成（SSG）** - 推荐优先使用：

- 构建时生成静态 HTML 文件，后续请求直接返回静态文件，加载速度快、SEO 友好。
- **适用场景**：内容不常变化的页面（如博客文章、官网介绍页）。
- **实现方式**：在页面组件中导出 `getStaticProps` 函数，构建时获取数据并生成页面。

**服务端渲染（SSR）**：

- 每次用户请求时动态生成 HTML，确保页面内容最新，适合动态数据场景。
- **适用场景**：内容实时更新的页面（如电商商品详情、用户个性化页面）。
- **实现方式**：在页面组件中导出 `getServerSideProps` 函数，每次请求时获取数据并渲染页面。

**增量静态再生（ISR）**：

- 结合 SSG 和 SSR 的优势，构建时生成静态页面，后续请求在后台增量更新页面，既保证性能又兼顾数据新鲜度。
- **适用场景**：内容中等频率更新的页面（如新闻列表、商品分类页）。
- **实现方式**：在 `getStaticProps` 中配置 `revalidate` 参数（单位：秒），指定页面再生间隔。

**客户端渲染（CSR）**：

- 与传统 React 应用一致，客户端加载 JS 后渲染页面，适合交互性强、无需 SEO 的页面。
- **实现方式**：不导出 `getStaticProps` 或 `getServerSideProps`，直接在组件中通过 `useEffect` 获取数据。

### 3. 数据获取

根据渲染方式不同，Next.js 提供对应的数据流方案：

**SSG 数据获取**：`getStaticProps`（构建时获取数据，仅运行在服务端，客户端不可见）。

```jsx
// pages/posts/[id].js
export async function getStaticProps(context) {
  const { id } = context.params; // 获取动态路由参数
  // 从接口或数据库获取数据
  const res = await fetch(`https://api.example.com/posts/${id}`);
  const post = await res.json();
  // 返回数据给页面组件
  return { props: { post } };
}

// 动态路由需配置 getStaticPaths，指定预渲染的路由
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  const paths = posts.map(post => ({ params: { id: post.id.toString() } }));
  return { paths, fallback: false }; // fallback: false 表示未预渲染的路由返回 404
}

export default function Post({ post }) {
  return <h1>{post.title}</h1>;
}
```

**SSR 数据获取**：`getServerSideProps`（每次请求时获取数据，运行在服务端）。

```jsx
// pages/users.js
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/users');
  const users = await res.json();
  return { props: { users } };
}

export default function Users({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**CSR 数据获取**：`useEffect`（客户端渲染，运行在浏览器）。

```jsx
// pages/profile.js
import { useState, useEffect } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user');
      const data = await res.json();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  return <h1>Welcome, {user.name}</h1>;
}
```

### 4. API Routes

Next.js 允许在 `pages/api` 目录下创建 API 接口，实现前后端同构开发，无需单独搭建服务器。

**创建 API 接口**：

```jsx
// pages/api/user.js
export default function handler(req, res) {
  // req: 请求对象（包含方法、参数、头信息等）
  // res: 响应对象（用于返回数据）
  if (req.method === 'GET') {
    // 返回模拟用户数据
    res.status(200).json({ id: 1, name: 'John Doe', email: 'john@example.com' });
  } else {
    // 处理其他请求方法
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

**访问 API**：通过 `http://localhost:3000/api/user` 即可访问该接口，客户端可直接通过相对路径 `/api/user` 请求。

### 5. 样式解决方案

Next.js 支持多种样式方案，适配不同开发习惯：

**全局样式**：在 `_app.js` 中导入 `.css` 文件，作用于整个应用（需注意样式污染）。

```jsx
// src/pages/_app.js
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

**CSS Modules**：创建 `.module.css` 后缀的文件，样式仅作用于当前组件，避免污染。

```jsx
// src/pages/index.module.css
.title {
  font-size: 24px;
  color: #333;
}

// src/pages/index.js
import styles from './index.module.css';

export default function Home() {
  return <h1 className={styles.title}>Next.js 入门指南</h1>;
}
```

**Tailwind CSS**：创建项目时选择 Tailwind CSS 即可自动配置，支持原子化样式开发。

**Styled Components**：需额外配置 `_document.js`，支持组件级样式和动态样式。

## 四、基础实战：构建简单页面

### 1. 静态页面创建

创建一个关于页（静态路由），展示固定内容：

```jsx
// src/pages/about.js
export default function About() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>关于我们</h1>
      <p>这是一个基于 Next.js 构建的静态页面，采用静态生成（SSG）方式渲染。</p>
      <p>Next.js 让 React 应用开发更高效、更灵活。</p>
    </div>
  );
}
```

访问 `http://localhost:3000/about` 即可查看页面。

### 2. 动态路由实现

创建博客文章详情页（动态路由），通过路由参数获取文章 ID 并展示内容：

```jsx
// src/pages/blog/[id].js
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query; // 获取动态路由参数 id

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>博客文章 #{id}</h1>
      <p>这是第 {id} 篇博客文章的详情页。</p>
    </div>
  );
}

// 配置预渲染的路由路径
export async function getStaticPaths() {
  // 预渲染 id 为 1、2、3 的文章页面
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    fallback: true, // 未预渲染的路由（如 /blog/4）会动态生成
  };
}

// 构建时为每个预渲染路径获取数据
export async function getStaticProps({ params }) {
  return { props: { id: params.id } };
}
```

### 3. 数据渲染示例（SSG + SSR）

**SSG 示例**：构建时生成博客列表页，内容不常变化。

```jsx
// src/pages/blog/index.js
export async function getStaticProps() {
  // 模拟从接口获取博客列表
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts = await res.json();
  return { props: { posts } };
}

export default function BlogList({ posts }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>博客列表</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ margin: '1rem 0' }}>
            <h3>{post.title}</h3>
            <p>{post.body.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**SSR 示例**：每次请求时获取最新用户列表，内容实时更新。

```jsx
// src/pages/users.js
export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  return { props: { users } };
}

export default function Users({ users }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>用户列表</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 五、进阶技巧

### 1. 路由跳转与参数传递

Next.js 提供两种路由跳转方式：标签跳转和编程式跳转。

**标签跳转**：使用 `next/link` 组件，支持客户端路由跳转（无页面刷新）。

```jsx
import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/" style={{ marginRight: '1rem' }}>首页</Link>
      <Link href="/about">关于我们</Link>
      {/* 动态路由跳转 */}
      <Link href="/blog/1">博客文章 1</Link>
    </nav>
  );
}
```

**编程式跳转**：使用 `useRouter` 钩子，适合在事件中触发跳转。

```jsx
import { useRouter } from 'next/router';

export default function Button() {
  const router = useRouter();

  const handleGoToAbout = () => {
    // 跳转至关于页
    router.push('/about');
    // 带查询参数跳转：router.push('/search?query=nextjs')
  };

  return <button onClick={handleGoToAbout}>前往关于页</button>;
}
```

### 2. 环境变量配置

Next.js 支持环境变量配置，可区分开发和生产环境：

**创建 `.env.local` 文件**（本地环境变量，不提交到 Git）：

```env
# 客户端可访问的环境变量（需前缀 NEXT_PUBLIC_）
NEXT_PUBLIC_API_URL=https://api.example.com
# 仅服务端可访问的环境变量（无前缀）
SERVER_SECRET_KEY=your-secret-key
```

**在代码中使用**：

```jsx
// 客户端和服务端均可访问
console.log(process.env.NEXT_PUBLIC_API_URL);
// 仅服务端可访问（如 API Routes、getStaticProps 等）
console.log(process.env.SERVER_SECRET_KEY);
```

### 3. 图片优化（Next/Image）

Next.js 提供 `next/image` 组件，替代原生 `<img>` 标签，实现图片自动优化：

- 自动压缩图片、适配不同设备尺寸。
- 支持懒加载、WebP 格式自动转换。
- 防止布局偏移（CLS），提升用户体验。

```jsx
import Image from 'next/image';

export default function ImageDemo() {
  return (
    <div style={{ width: '500px', height: '300px', position: 'relative' }}>
      <Image
        src="/images/nextjs.jpg" // 静态资源目录 public/images 下的图片
        alt="Next.js Logo"
        fill // 填充父容器
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority // 优先加载（适合首屏图片）
      />
    </div>
  );
}
```

### 4. 性能优化建议

- **合理选择渲染方式**：静态内容用 SSG，动态内容用 SSR/ISR，交互页面用 CSR。
- **代码分割**：Next.js 自动实现页面级代码分割，也可通过 `dynamic import` 实现组件级懒加载。

```jsx
import dynamic from 'next/dynamic';

// 懒加载组件，仅在需要时加载
const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});
```

- **优化字体加载**：使用 `next/font` 加载字体，避免 FOIT（字体加载时文本不可见）。
- **减少不必要的渲染**：使用 `React.memo`、`useMemo`、`useCallback` 优化组件性能。

## 六、部署与上线

### 1. 构建生产版本

首先构建生产环境包，命令如下：

```bash
npm run build
```

构建完成后，会生成 `.next` 目录，包含优化后的生产代码。

### 2. 常用部署平台

**Vercel**：Next.js 官方推荐平台，一键部署，自动集成 CI/CD，支持全球边缘网络分发，部署流程最简单。

- **步骤**：将代码推送到 GitHub/GitLab/Bitbucket，在 Vercel 中导入项目，自动构建部署。

**Netlify**：类似 Vercel，支持一键部署，提供边缘网络、CI/CD 等功能。

**自建服务器**：通过 `npm start` 启动生产服务器，或配合 Nginx 作为反向代理。

```bash
# 启动生产服务器（默认端口 3000）
npm start
```

### 3. 部署注意事项

- 确保环境变量配置正确，生产环境变量需在部署平台单独配置。
- 若使用 SSG/ISR，确保构建时能正常获取数据（避免依赖本地环境）。
- 部署后测试路由跳转、API 接口、图片加载等功能，确保正常运行。

## 七、总结与资源推荐

### 总结

Next.js 简化了 React 应用的开发流程，通过内置的路由、渲染、优化能力，让开发者聚焦业务逻辑而非工具链配置。核心是根据页面内容特性选择合适的渲染方式，平衡性能、SEO 和开发效率。从入门到进阶，Next.js 能满足从个人项目到企业级应用的各类需求，是现代 React 开发的首选框架之一。

### 资源推荐

- **官方文档**：Next.js 官方文档（最权威、最全面的学习资源）。
- **实战教程**：Vercel 官方博客、Next.js 示例仓库（包含各类场景示例）。
- **社区资源**：GitHub（Next.js 源码与 Issues）、Stack Overflow（问题解答）、掘金 / 知乎（中文教程）。
