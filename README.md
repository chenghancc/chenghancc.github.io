# chenghancc.github.io

现代 AI 工程师风格的个人主页与技术博客，基于 **Astro 5 + Tailwind CSS** 构建，托管于 **GitHub Pages**（`https://chenghancc.github.io/`）。

## 特性

- **现代极简视觉**：Linear / Vercel 风格，默认暗黑模式，支持一键深浅切换、细边框表面、微妙网格与等宽字体点缀
- **个人门户 + 博客**：首页集成个人简介、状态卡片、双源创作热力图（GitHub 贡献 + 折腾记录）、精选项目区与最新文章流
- **`⌘K` 命令面板**：支持全站文章/项目搜索与快捷导航、主题切换、复制邮箱
- **专注阅读体验**：Expressive Code 双主题代码高亮 + 一键复制、KaTeX 数学公式、文章目录 Scrollspy
- **极简零负担维护**：纯 Markdown + 单一配置文件，推送 `main` 后 GitHub Actions 自动部署

## 目录结构

```text
src/
├── data/site.ts            # 站点信息、Hero 文案、导航、精选项目、社交链接
├── data/activity.ts        # 折腾记录 / Building Log（自动点亮首页热力图）
├── content/posts/*.md      # 博客文章（Markdown）
├── content/spec/about.md   # 关于页内容
├── components/             # 导航、命令面板、卡片等组件
├── layouts/BaseLayout.astro
└── pages/                  # 首页、文章归档/详情、项目页、关于页、RSS、Search JSON
```

## 日常维护命令

```bash
pnpm install                          # 首次安装依赖
pnpm dev                              # 本地预览（http://localhost:4321）
pnpm new my-post "文章标题"             # 新建一篇 Markdown 文章
pnpm blog:build                       # 本地类型检查 + 构建验证
pnpm blog:release "feat: 发布新文章"    # 构建检查 + 提交并推送自动上线
```

详细维护说明见 [`docs/BLOG_GUIDE.zh-CN.md`](./docs/BLOG_GUIDE.zh-CN.md)。
