export interface SocialLink {
	name: string;
	url: string;
	label: string;
	icon: "github" | "mail" | "rss";
}

export interface ProjectItem {
	name: string;
	tagline: string;
	description: string;
	status: "Live" | "Open Source" | "Building";
	tags: string[];
	url: string;
	repo?: string;
	featured?: boolean;
}

export interface FocusItem {
	label: string;
	value: string;
}

export const SITE = {
	title: "chenghancc",
	subtitle: "AI-Native Builder · 记录技术、AI 工作流与数字创作",
	description:
		"chenghancc 的个人主页与技术博客——聚焦 AI Coding、智能体工作流、工程实践与日常思考。",
	url: "https://chenghancc.github.io",
	lang: "zh-CN",
	author: "chenghancc",
	email: "chenghancn@foxmail.com",
	github: "https://github.com/chenghancc",
	avatar: "https://github.com/chenghancc.png",
	statusBadge: "AI-Native Builder · 探索与构建中",
	heroHeadline: "用 AI 重塑开发与创作工作流",
	heroBio:
		"你好，我是 chenghancc。这里存放我的技术笔记、AI 工具实战、个人项目与阶段性思考。少即是多，持续迭代。",
	focusStack: [
		{ label: "Focus", value: "AI Agents / Coding Workflows" },
		{ label: "Stack", value: "TypeScript · Astro · Python" },
		{ label: "Tools", value: "Codex · Claude Code · Antigravity" },
		{ label: "Location", value: "China (UTC+8)" },
	] satisfies FocusItem[],
	nav: [
		{ label: "首页", href: "/" },
		{ label: "文章", href: "/posts/" },
		{ label: "项目", href: "/projects/" },
		{ label: "关于", href: "/about/" },
	],
	socials: [
		{
			name: "GitHub",
			url: "https://github.com/chenghancc",
			label: "github.com/chenghancc",
			icon: "github",
		},
		{
			name: "Email",
			url: "mailto:chenghancn@foxmail.com",
			label: "chenghancn@foxmail.com",
			icon: "mail",
		},
		{
			name: "RSS",
			url: "/rss.xml",
			label: "RSS 订阅",
			icon: "rss",
		},
	] satisfies SocialLink[],
};

export const PROJECTS: ProjectItem[] = [
	{
		name: "chenghancc.github.io",
		tagline: "AI 时代个人数字空间",
		description:
			"基于 Astro 5 + Tailwind 构建的极简现代个人主页与博客，支持深浅双模、⌘K 命令面板全站检索、Markdown/KaTeX 渲染与 GitHub Actions 零成本自动部署。",
		status: "Live",
		tags: ["Astro 5", "Tailwind", "TypeScript", "GitHub Pages"],
		url: "https://chenghancc.github.io/",
		repo: "https://github.com/chenghancc/chenghancc.github.io",
		featured: true,
	},
	{
		name: "AI Coding 实战手册",
		tagline: "面向国内开发者的 AI CLI 配置指南",
		description:
			"整理 Codex CLI、Claude Code 等主流 AI 编程工具的安装、镜像加速、工作流技巧与避坑记录，持续更新。",
		status: "Open Source",
		tags: ["Codex", "Claude Code", "AI Workflow"],
		url: "/posts/codex-claude-code-install-cn-mirror/",
		featured: true,
	},
	{
		name: "Next AI Experiment",
		tagline: "新想法孵化中",
		description:
			"正在构思下一个 AI 效率小工具或 Agent 实验项目——你可以随时编辑 src/data/site.ts 把它替换成你的最新作品。",
		status: "Building",
		tags: ["AI Agent", "Automation", "WIP"],
		url: "https://github.com/chenghancc",
		featured: true,
	},
];
