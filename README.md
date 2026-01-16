# 🎮 Pixel Portfolio

一个像素风格的个人网站，使用 Next.js 16 + styled-components 构建，支持中英文双语。
<img width="1980" height="1242" alt="局部截取_20260115_171239" src="https://github.com/user-attachments/assets/78787595-e2c9-439a-941f-ae819497bdaf" />

<img width="2348" height="1278" alt="局部截取_20260116_182602" src="https://github.com/user-attachments/assets/e2c84d4e-83e3-4511-9544-8b8beaa19e3f" />


<img width="1679" height="1278" alt="局部截取_20260116_182707" src="https://github.com/user-attachments/assets/30d85b74-eb45-4e62-86b8-de3c1bf6d20b" />

<img width="2150" height="1241" alt="局部截取_20260116_182729" src="https://github.com/user-attachments/assets/bdcc232d-27f7-460a-ad4c-f185062a527f" />



![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![styled-components](https://img.shields.io/badge/styled--components-6-pink)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ 特性

- 🎨 **像素艺术风格** - 复古游戏机风格的 UI 设计
- 🌍 **国际化支持** - 中文/英文双语切换
- 🌙 **主题切换** - 支持明暗主题切换
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **服务端渲染** - Next.js App Router + SSR
- 🎬 **丰富动画** - 扫描线、故障效果、粒子动画等

## 📁 项目结构

```
w-site/
├── messages/           # 国际化翻译文件
│   ├── zh.json        # 中文翻译
│   └── en.json        # 英文翻译
├── src/
│   ├── app/           # Next.js App Router 页面
│   │   ├── [locale]/  # 多语言路由
│   │   │   ├── page.tsx       # 首页
│   │   │   ├── about/         # 关于页面
│   │   │   └── blog/          # 博客页面
│   │   ├── layout.tsx # 根布局
│   │   └── globals.css # 全局样式
│   ├── components/    # React 组件
│   │   ├── Header.tsx         # 导航头部
│   │   ├── PixelHome.tsx      # 像素风格首页
│   │   ├── PixelAbout.tsx     # 像素风格关于页
│   │   ├── ThemeSwitcher.tsx  # 主题切换器
│   │   ├── LanguageSwitcher.tsx # 语言切换器
│   │   ├── Antigravity.tsx    # 粒子动画组件
│   │   └── blog/              # 博客相关组件
│   ├── config/        # 配置文件
│   │   └── navigation.ts      # 导航配置
│   ├── data/          # 数据文件
│   │   └── blog.ts            # 博客数据
│   ├── i18n/          # 国际化配置
│   │   ├── routing.ts         # 路由配置
│   │   └── request.ts         # 请求配置
│   ├── lib/           # 工具库
│   │   └── StyledComponentsRegistry.tsx
│   └── types/         # TypeScript 类型定义
├── public/            # 静态资源
├── netlify.toml       # Netlify 部署配置
└── next.config.ts     # Next.js 配置
```

## 🚀 快速开始

### 环境要求

- Node.js 20+
- pnpm 9+

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| [Next.js](https://nextjs.org/) | 16.x | React 全栈框架 |
| [React](https://react.dev/) | 19.x | UI 库 |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | 类型安全 |
| [styled-components](https://styled-components.com/) | 6.x | CSS-in-JS 样式方案 |
| [next-intl](https://next-intl-docs.vercel.app/) | 4.x | 国际化解决方案 |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | 原子化 CSS |
| [Three.js](https://threejs.org/) | 0.182.x | 3D 图形库 |

## 🌐 国际化

项目支持中英文双语，翻译文件位于 `messages/` 目录：

- `messages/zh.json` - 中文翻译
- `messages/en.json` - 英文翻译

### 添加新语言

1. 在 `messages/` 目录下创建新的翻译文件（如 `ja.json`）
2. 在 `src/i18n/routing.ts` 中添加新语言代码
3. 更新 `LanguageSwitcher` 组件

## 🎨 主题定制

主题颜色定义在 `src/app/globals.css` 中：

```css
:root {
  --background: #fafafa;
  --foreground: #0a0a0a;
  --card-bg: #ffffff;
  /* ... */
}

:root[data-theme="dark"] {
  --background: #0a0a0a;
  --foreground: #ededed;
  --card-bg: #1a1a1a;
  /* ... */
}
```

## 📦 部署

### Netlify

项目已配置 Netlify 部署，直接连接 Git 仓库即可自动部署。

配置文件：`netlify.toml`

### Vercel

```bash
npx vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## 📄 许可证

MIT License © 2024

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

<p align="center">
  用代码和热情构建 ♥
</p>
