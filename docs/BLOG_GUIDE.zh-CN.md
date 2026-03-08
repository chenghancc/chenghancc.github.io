# 博客维护指南（长期可查）

仓库目录：`/root/chenghancc.github.io`

## 一、先进入仓库

```bash
cd /root/chenghancc.github.io
```

## 二、最常用命令

```bash
pnpm blog:info                       # 查看主要可修改文件
pnpm blog:new my-new-post            # 新建文章
pnpm blog:dev                        # 本地预览
pnpm blog:build                      # 构建检查
pnpm blog:publish "feat: 更新内容"    # 提交并推送
pnpm blog:release "feat: 更新内容"    # 构建 + 提交 + 推送
```

## 三、你要改哪里

1. 站点标题、导航、头像、社交链接  
`src/config.ts`

2. 关于页  
`src/content/spec/about.md`

3. 博客文章  
`src/content/posts/*.md`

## 四、发布流程（推荐）

改完文件后执行：

```bash
cd /root/chenghancc.github.io
pnpm blog:release "feat: 更新博客"
```

推送到 `main` 后，GitHub Actions 会自动部署到：  
`https://chenghancc.github.io/`

## 五、仅提交不构建

```bash
cd /root/chenghancc.github.io
pnpm blog:publish "chore: 文案微调"
```

## 六、查看部署状态

- Actions 页面：`https://github.com/chenghancc/chenghancc.github.io/actions`
- 线上地址：`https://chenghancc.github.io/`

## 七、在线后台写文章（GitHub Pages）

- 后台入口：`https://chenghancc.github.io/admin/`
- 首次接入步骤见：`docs/CMS_ADMIN.zh-CN.md`
