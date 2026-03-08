#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

usage() {
	cat <<'EOF'
Blog workflow helper

Usage:
  bash scripts/blog.sh info
  bash scripts/blog.sh status
  bash scripts/blog.sh new <slug>
  bash scripts/blog.sh dev
  bash scripts/blog.sh build
  bash scripts/blog.sh publish [commit_message]
  bash scripts/blog.sh release [commit_message]

Commands:
  info     Show which files to edit for content/theme updates.
  status   Show git status.
  new      Create a new post file. Example: new my-first-post
  dev      Start local dev server.
  build    Build static site (same as CI).
  publish  git add/commit/push to main.
  release  build + publish in one command.
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
可修改文件：
1) 站点标题、头像、导航、社交链接
   src/config.ts

2) 关于页内容
   src/content/spec/about.md

3) 博客文章
   src/content/posts/*.md

详细教程：
   docs/BLOG_GUIDE.zh-CN.md
EOF
	;;
status)
	git status -sb
	;;
new)
	slug="${1:-}"
	if [ -z "$slug" ]; then
		echo "Error: missing slug. Example: bash scripts/blog.sh new my-first-post"
		exit 1
	fi
	ensure_deps
	pnpm new-post "$slug"
	echo "Post created. Edit file in src/content/posts/"
	;;
dev)
	ensure_deps
	pnpm dev
	;;
build)
	ensure_deps
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
	echo "Published to main. GitHub Actions will deploy automatically."
	;;
release)
	msg="${1:-chore: update blog content}"
	ensure_deps
	pnpm build
	git add -A
	if git diff --cached --quiet; then
		echo "No changes to commit."
		exit 0
	fi
	git commit -m "$msg"
	git push origin main
	echo "Build + publish complete."
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
