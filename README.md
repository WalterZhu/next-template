![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)

# Next.js 模板项目

这是一个基于 [Next.js](https://nextjs.org) 构建的现代化全栈应用模板，使用了最新的 App Router 架构和 TypeScript。

## ✨ 功能特性

- 🚀 **Next.js 15** - 最新版本，支持 App Router 和 RSC
- 🎨 **Tailwind CSS 4** - 实用优先的 CSS 框架
- 📘 **TypeScript** - 完整的类型支持
- 🔐 **Cookie-Only Session** - 基于 Redis 的纯 Cookie 会话管理系统
- 🌍 **地区屏蔽** - 基于 Vercel 地理位置的访问控制
- 📍 **位置显示** - 实时显示用户访问地理位置
- 📊 **API 路由** - RESTful API 设计
- 🎭 **组件化架构** - SSR/CSR 分离的现代化架构
- 🔄 **流式渲染** - 优化的用户体验
- 💾 **Redis 集成** - 高性能数据存储

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm/yarn/pnpm
- Redis 服务器

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

### 环境配置

创建 `.env.local` 文件：

```env
# Redis 配置
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your_redis_password

# Next.js 配置
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

编辑 `app/page.tsx` 文件，页面会自动热重载。

## 📁 项目结构

```
├── app/                        # App Router 路由
│   ├── api/                   # API 路由
│   │   ├── count/             # 计数器 API
│   │   └── session/           # 会话管理 API
│   ├── globals.css            # 全局样式
│   ├── layout.tsx             # 根布局
│   └── page.tsx               # 首页
├── components/                # 可复用组件
│   ├── CountDisplay.tsx       # 计数器显示组件(服务端)
│   ├── IncrementButton.tsx    # 增加按钮(客户端)
│   ├── GeoInfo.tsx            # 地理位置显示组件
│   └── SessionProvider.tsx    # Session上下文提供者
├── lib/                       # 工具库
│   ├── count.ts               # 计数逻辑
│   ├── geo-blocking.ts        # 地区屏蔽功能
│   └── session.ts             # 会话管理
├── middleware.ts              # Next.js中间件(地区屏蔽+Session管理)
├── public/                    # 静态资源
├── .env.local                 # 环境变量
├── next.config.js            # Next.js 配置
├── package.json              # 项目依赖
├── tailwind.config.ts        # Tailwind 配置
└── tsconfig.json             # TypeScript 配置
```

## 🔧 主要功能

### Cookie-Only Session 系统
- 🔐 基于 Redis 的纯 Cookie 会话管理
- 👤 无需用户注册的匿名会话系统
- 🍪 Middleware 自动创建和管理 Session
- 🛡️ 安全的 httpOnly Cookie 设置
- ⚡ 24小时自动过期机制

### API 设计
- 📡 RESTful API 设计
- 🔒 Session 保护机制
- 🎯 TypeScript 类型安全
- 📊 完整的错误处理

### 前端特性
- ⚡ 服务器组件 (RSC) 
- 🌊 流式渲染
- 🎨 响应式设计
- 🔄 实时状态更新
- 📦 模块化组件架构
- 🚀 并行数据获取优化

## 🌐 Vercel 部署

### 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/next-template)

### 手动部署

1. **连接 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/next-template.git
   git push -u origin main
   ```

2. **在 Vercel 控制台部署**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入您的 GitHub 仓库
   - 配置环境变量

3. **环境变量配置**
   
   在 Vercel 项目设置中添加以下环境变量：
   ```
   REDIS_URL=your_redis_connection_string
   REDIS_PASSWORD=your_redis_password
   NEXTAUTH_SECRET=your_production_secret
   NEXTAUTH_URL=https://your-app.vercel.app
   ```

### Vercel 特性

- ⚡ **边缘函数** - API 路由自动部署为 Vercel Functions
- 🌍 **全球 CDN** - 静态资源全球分发
- 🔄 **自动部署** - Git 推送自动触发部署
- 📊 **性能监控** - 内置的性能分析工具
- 🔧 **预览部署** - 每个 PR 自动生成预览环境
- 🛡️ **安全头部** - 自动配置安全 HTTP 头部

## 📚 学习资源

- [Next.js 文档](https://nextjs.org/docs) - 学习 Next.js 功能和 API
- [Learn Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程
- [Vercel 文档](https://vercel.com/docs) - 了解 Vercel 平台功能
- [React 文档](https://react.dev) - React 官方文档
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架文档

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js) - 欢迎反馈和贡献！

## 📄 许可证

[MIT License](LICENSE)

---

**Made with ❤️ by [Your Name]**