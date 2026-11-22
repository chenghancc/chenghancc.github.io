#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

usage() {
	cat <<'EOF'
Blog workflow helper (chenghancc.github.io)

Usage:
  pnpm blog:info                        查看核心可编辑文件
  pnpm blog:status                      查看当前 git 状态
  pnpm blog:new <slug> [title]          新建一篇 Markdown 文章
  pnpm blog:dev                         启动本地预览 (http://localhost:4321)
  pnpm blog:build                       运行类型检查与生产构建
  pnpm blog:publish [commit_message]    提交并推送到 main（触发 GitHub Pages 自动部署）
  pnpm blog:release [commit_message]    构建校验 + 提交推送一条龙
EOF
}

ensure_deps() {
	if [ ! -d node_modules ]; then
		echo "node_modules not found, running pnpm install..."
		pnpm install
	fi
}

cmd="${1:-help}"
shift || true

case "$cmd" in
info)
	cat <<'EOF'
核心维护文件：
1) 个人信息、首页文案、导航、项目卡片、社交链接：
   src/data/site.ts

2) 博客文章（Markdown）：
   src/content/posts/*.md

3) 关于页内容：
   src/content/spec/about.md

线上地址：
   https://chenghancc.github.io/
EOF
	;;
status)
	git status -sb
	;;
new)
	if [ $# -lt 1 ]; then
		echo "Error: missing slug. Example: pnpm blog:new my-ai-note \"我的 AI 笔记\""
		exit 1
	fi
	node scripts/new-post.js "$@"
	;;
dev)
	ensure_deps
	pnpm dev
	;;
build)
	ensure_deps
	pnpm check
	pnpm build
	;;
publish)
	msg="${1:-chore: update blog content}"
	git add -A
	if git diff --cached --quiet; then
		echo "No changes to commit."
		exit 0
	fi
	git commit -m "$msg"
	git push origin main
	echo "Published to main. GitHub Actions will deploy to https://chenghancc.github.io/"
	;;
release)
	msg="${1:-chore: update blog content}"
	ensure_deps
	pnpm check
	pnpm build
	git add -A
	if git diff --cached --quiet; then
		echo "No changes to commit."
		exit 0
	fi
	git commit -m "$msg"
	git push origin main
	echo "Build + publish complete -> https://chenghancc.github.io/"
	;;
help | -h | --help)
	usage
	;;
*)
	echo "Unknown command: $cmd"
	usage
	exit 1
	;;
esac
