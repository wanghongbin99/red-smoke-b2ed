# Welcome to React Router + Cloudflare Workers!

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/react-router-starter-template)

![React Router Starter Template Preview](https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/bfdc2f85-e5c9-4c92-128b-3a6711249800/public)

<!-- dash-content-start -->

A modern, production-ready template for building full-stack React applications using [React Router](https://reactrouter.com/) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)
- 🔎 Built-in Observability to monitor your Worker
<!-- dash-content-end -->

## Getting Started

Outside of this repo, you can start a new project with this template using [C3](https://developers.cloudflare.com/pages/get-started/c3/) (the `create-cloudflare` CLI):

```bash
npm create cloudflare@latest -- --template=cloudflare/templates/react-router-starter-template
```

A live public deployment of this template is available at [https://react-router-starter-template.templates.workers.dev](https://react-router-starter-template.templates.workers.dev)

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Typegen

Generate types for your Cloudflare bindings in `wrangler.json`:

```sh
npm run typegen
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Previewing the Production Build

Preview the production build locally:

```bash
npm run preview
```

## Deployment

If you don't have a Cloudflare account, [create one here](https://dash.cloudflare.com/sign-up)! Go to your [Workers dashboard](https://dash.cloudflare.com/?to=%2F%3Aaccount%2Fworkers-and-pages) to see your [free custom Cloudflare Workers subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) on `*.workers.dev`.

Once that's done, you can build your app:

```sh
npm run build
```

And deploy it:

```sh
npm run deploy
```

To deploy a preview URL:

```sh
npx wrangler versions upload
```

You can then promote a version to production after verification or roll it out progressively.

```sh
npx wrangler versions deploy
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

---

# 项目分析报告 (Project Analysis Report)

本项目是一个现代化的全栈 Web 应用程序，基于 **React Router 7** 构建，并针对 **Cloudflare Workers** 边缘计算平台进行了深度优化。

## 1. 核心技术栈

- **前端框架**: [React Router 7](https://reactrouter.com/) (v7.9.6) - 集成了 Remix 的全栈能力和 React 19。
- **运行平台**: [Cloudflare Workers](https://workers.cloudflare.com/) - 边缘渲染与执行环境。
- **构建工具**: [Vite](https://vitejs.dev/) - 极速的开发体验与生产构建。
- **样式方案**: [Tailwind CSS 4](https://tailwindcss.com/) - 现代化的原子类驱动样式工具。
- **编程语言**: [TypeScript](https://www.typescriptlang.org/) - 强类型支持。

## 2. 系统架构分析

### 边缘端集成 (Backend / Edge)
- **适配层**: `workers/app.ts` 是应用的统一入口。它利用 React Router 的 `createRequestHandler` 将标准 HTTP 请求转换为框架内部逻辑。
- **上下文注入**: Worker 运行时的 `env`（环境变量、KV、D1 绑定等）和 `ctx`（执行上下文）被注入到 `AppLoadContext` 中，使得前端页面可以通过 `loader` 或 `action` 直接访问边缘资源。

### 前端应用 (Frontend)
- **根路由**: `app/root.tsx` 定义了应用的外壳、元数据 (Meta) 以及全局资源加载。
- **路由系统**: 采用配置驱动的路由模式（`app/routes.ts`），目前已配置首页路由 `app/routes/home.tsx`。
- **数据流**: 首页展示了如何从边缘端获取环境变量 (`VALUE_FROM_CLOUDFLARE`) 并进行服务端渲染 (SSR)。

## 3. 关键目录结构

- `app/`: 应用逻辑核心，包含路由 (`routes/`)、通用组件 (`welcome/`) 和全局配置。
- `workers/`: 平台适配层，负责与 Cloudflare Runtime 的对接。
- `wrangler.json`: Cloudflare 部署与绑定的配置文件。
- `package.json`: 定义了全栈开发所需的脚本（`dev`, `build`, `deploy`, `typegen` 等）。

## 4. 开发指南

- **启动开发服务器**: `npm run dev`
- **生成绑定类型**: `npm run typegen` (修改 `wrangler.json` 后执行)
- **构建生产版本**: `npm run build`
- **部署至 Cloudflare**: `npm run deploy`

---
*该分析报告由 Antigravity AI 自动生成于 2026-04-09*

