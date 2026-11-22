import fs from "node:fs";
import path from "node:path";

function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

const args = process.argv.slice(2);
if (args.length === 0) {
	console.error("Usage: pnpm new <slug> [title]");
	process.exit(1);
}

const rawSlug = args[0].replace(/\.(md|mdx)$/i, "");
const title = args.slice(1).join(" ") || rawSlug;
const fileName = `${rawSlug}.md`;
const targetDir = "./src/content/posts";
const fullPath = path.join(targetDir, fileName);

if (fs.existsSync(fullPath)) {
	console.error(`Error: ${fullPath} already exists.`);
	process.exit(1);
}

fs.mkdirSync(path.dirname(fullPath), { recursive: true });

const content = `---
title: "${title}"
published: ${getDate()}
description: ""
category: "AI 工具"
tags: []
draft: false
---

在这里开始写正文...
`;

fs.writeFileSync(fullPath, content, "utf-8");
console.log(`Created: ${fullPath}`);
