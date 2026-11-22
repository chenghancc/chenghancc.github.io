import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

const site = process.env.SITE ?? "https://chenghancc.github.io/";
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
	site,
	base,
	trailingSlash: "always",
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		expressiveCode({
			themes: ["github-dark-default", "github-light-default"],
			themeCssSelector: (theme) =>
				theme.type === "dark" ? ".dark" : ":root:not(.dark)",
			defaultProps: {
				wrap: true,
			},
			styleOverrides: {
				borderRadius: "0.75rem",
				borderColor: "var(--ec-border)",
				codeFontFamily:
					"'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
				codeFontSize: "0.875rem",
				codeLineHeight: "1.6",
			},
		}),
		sitemap(),
	],
	markdown: {
		remarkPlugins: [remarkMath, remarkReadingTime],
		rehypePlugins: [
			rehypeKatex,
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: {
						className: ["heading-anchor"],
						ariaLabel: "链接到此标题",
					},
					content: {
						type: "text",
						value: "#",
					},
				},
			],
		],
	},
});
