# 在线后台写作（GitHub Pages）

目标：在保留 `GitHub Pages` 部署的前提下，通过网页后台在线写文章。

## 已接入内容

- 后台入口：`/admin/`（文件：`public/admin/index.html`）
- 后台配置：`public/admin/config.yml`
- 图片上传目录：`public/uploads/`

推送到 `main` 后，GitHub Actions 会继续按你现有流程自动部署。

## 一次性配置（必须）

`GitHub Pages` 是纯静态托管，Decap CMS 登录 GitHub 需要一个 OAuth 回调服务。

### 1. 部署 OAuth 回调服务

推荐使用 `sterlingwes/decap-proxy` 作为 Cloudflare Worker OAuth 代理。

官方说明：
- https://decapcms.org/docs/github-backend/
- https://github.com/sterlingwes/decap-proxy

按模板 README 完成部署后，你会得到一个 Worker 地址，例如：
`https://decap-oauth.your-subdomain.workers.dev`

### 2. 创建 GitHub OAuth App

在 GitHub 创建 OAuth App（Settings -> Developer settings -> OAuth Apps）：

- Homepage URL：你的 Worker 地址  
  例：`https://decap-oauth.your-subdomain.workers.dev`
- Authorization callback URL：Worker 回调地址  
  例：`https://decap-oauth.your-subdomain.workers.dev/callback`

参考：
- https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

### 3. 回填 CMS 配置

编辑 `public/admin/config.yml`：

```yml
backend:
  base_url: https://decap-oauth.your-subdomain.workers.dev
  auth_endpoint: auth
```

保存后推送到 `main`。

## 使用方式

上线后访问：

- `https://chenghancc.github.io/admin/`

登录后即可：

- 新建/编辑文章（`src/content/posts/*.md`）
- 编辑关于页（`src/content/spec/about.md`）
- 编辑全局站点配置（`src/site-settings.json`）
- 上传图片到 `public/uploads/`

### 后台可管理范围（当前）

- 文章：标题、日期、标签、分类、封面图、正文
- 单页：关于页
- 站点配置：标题、副标题、语言、Banner、导航、头像与社交链接、版权、代码高亮主题

### 图片上传说明（重要）

- 本项目已固定上传到仓库根目录：`/public/uploads/*`
- 前台引用路径统一为：`/uploads/*`
- 若历史配置里出现 `src/public/...` 路径，系统已做兼容转换，无需手改历史文章

## 本地调试后台（可选）

本地可不走 OAuth，直接使用本地代理：

```bash
cd /root/chenghancc.github.io
pnpm cms:proxy
# 新开一个终端
pnpm dev
```

然后访问：

- `http://localhost:4321/admin/`
