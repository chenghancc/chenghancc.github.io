---
title: Codex 和 Claude Code 安装指南（含国内镜像切换）
published: 2026-03-08
description: 一篇讲清楚 Codex 与 Claude Code 安装、验证、国内 npm 镜像切换与回切的实操教程。
tags: [codex, claude-code, npm, 教程, 镜像]
category: AI 工具
draft: false
---

> 更新时间：2026-03-08  
> 适用：macOS / Linux / Windows（建议 WSL）

这篇文章给你一套可直接复制执行的流程，目标是：

1. 安装 OpenAI 的 Codex CLI
2. 安装 Anthropic 的 Claude Code
3. 在中国网络环境下切换到国内 npm 镜像，加速安装
4. 安装完成后可随时切回官方源

## 1. 前置检查

先确认 Node.js 和 npm：

```bash
node -v
npm -v
```

如果 Node 版本低于 18，先升级到 Node 18+（建议 LTS）。

## 2. 切换到国内 npm 镜像（关键）

先看当前 npm 源：

```bash
npm config get registry
```

切换到 `npmmirror`：

```bash
npm config set registry https://registry.npmmirror.com
npm config get registry
```

如果你也用 `pnpm`，建议一起切换：

```bash
pnpm config set registry https://registry.npmmirror.com
pnpm config get registry
```

## 3. 安装 Codex（OpenAI）

官方 npm 安装命令：

```bash
npm install -g @openai/codex
```

验证安装：

```bash
codex --version
```

首次登录：

```bash
codex
```

按提示在浏览器完成账号授权即可。

## 4. 安装 Claude Code（Anthropic）

Claude Code 官方现在推荐原生安装器（native installer）：

```bash
curl -fsSL https://claude.ai/install.sh | bash
claude --version
```

首次登录：

```bash
claude
```

### 4.1 国内网络备用方案：用 npm 安装 Claude Code

如果原生安装器网络不稳定，可临时用 npm 方式（已在官方文档中标记为 deprecated，仅作兼容方案）：

```bash
npm install -g @anthropic-ai/claude-code
claude --version
```

后续网络稳定后，可迁移回原生安装器。

## 5. 常用验证命令

```bash
codex --version
claude --version
claude doctor
```

## 6. 用完后切回官方源

```bash
npm config set registry https://registry.npmjs.org
npm config get registry
```

如果你改过 pnpm，也切回去：

```bash
pnpm config set registry https://registry.npmjs.org
pnpm config get registry
```

## 7. 常见问题

### 7.1 `command not found`

新开一个终端后再试；或检查全局 bin 是否在 `PATH` 中。

### 7.2 全局安装权限报错

不要使用 `sudo npm install -g`。优先修正 npm 全局目录权限，或使用 nvm 管理 Node。

### 7.3 WSL 环境安装 Claude Code 异常

优先使用 Linux 内的 Node/npm，不要混用 Windows 的 Node 路径。

## 8. 官方参考

- OpenAI Codex CLI（GitHub）：https://github.com/openai/codex
- Claude Code 安装文档：https://code.claude.com/docs/en/getting-started
