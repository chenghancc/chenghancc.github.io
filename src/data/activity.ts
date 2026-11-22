export type ActivityKind = "build" | "ai" | "post" | "note";

export interface ActivityEntry {
	/** Format: YYYY-MM-DD */
	date: string;
	title: string;
	kind: ActivityKind;
	summary?: string;
	url?: string;
}

/**
 * 折腾记录 / Building Log
 * 以后做了任何有趣的小工具、AI 实验、开源项目或想法，
 * 不用写长文章，在这里加一行就能自动点亮首页热力图并展示在动态中。
 */
export const ACTIVITY_LOG: ActivityEntry[] = [
	{
		date: "2026-11-22",
		title: "个人主页 v2.0 重构上线 & 接入创作热力图",
		kind: "build",
		summary:
			"切换回 chenghancc.github.io，升级为现代 AI 工程师风 + ⌘K 命令面板 + 双源热力图",
		url: "/projects/",
	},
	{
		date: "2026-03-08",
		title: "搭建个人博客并跑通 AI CLI 工具链",
		kind: "ai",
		summary: "完成 Codex CLI & Claude Code 国内镜像实操梳理",
		url: "/posts/codex-claude-code-install-cn-mirror/",
	},
];
