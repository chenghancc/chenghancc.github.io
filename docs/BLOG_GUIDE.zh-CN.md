# 博客日常维护指南

线上地址：`https://chenghancc.github.io/`  
部署方式：推送代码到 `main` 分支，GitHub Actions 自动构建并发布到 GitHub Pages（约 1 分钟生效）。

## 一、只需要维护这 4 个地方

1. **个人信息 / 项目卡片 / 社交链接**  
   编辑 `src/data/site.ts`
2. **折腾记录（点亮首页热力图 & 最近动态）**  
   编辑 `src/data/activity.ts`（做了新工具、跑通新模型、写了个小实验，随手加一行即可）
3. **发布或修改文章**  
   在 `src/content/posts/` 下新增或修改 `.md` 文件
4. **关于我页面**  
   编辑 `src/content/spec/about.md`

## 二、写一篇新文章

### 方式 A：命令行新建

```bash
pnpm new ai-agent-notes "AI Agent 实战记录"
```

会在 `src/content/posts/ai-agent-notes.md` 生成带 Frontmatter 的模板：

```markdown
---
title: "AI Agent 实战记录"
published: 2026-11-22
description: "一句话摘要，会显示在首页卡片和搜索引擎结果中"
category: "AI 工具"
tags: [ai, agent]
draft: false
---

正文内容...
```

### 方式 B：直接让 AI 帮你写并发布

把你的想法、笔记或代码直接丢给 AI，说：
> 「帮我在 `src/content/posts/` 写一篇文章，并运行 `pnpm blog:release` 发布到我的博客」

## 三、本地预览与上线

```bash
pnpm dev                              # 本地实时预览：http://localhost:4321
pnpm blog:release "feat: 发布新文章"    # 校验构建 + 自动 git push 上线
```

## 四、查看部署状态

- GitHub Actions：`https://github.com/chenghancc/chenghancc.github.io/actions`
- 线上页面：`https://chenghancc.github.io/`
