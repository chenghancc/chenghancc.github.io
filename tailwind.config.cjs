/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"'Inter Variable'",
					"-apple-system",
					"BlinkMacSystemFont",
					"'PingFang SC'",
					"'Hiragino Sans GB'",
					"'Noto Sans SC'",
					"'Microsoft YaHei'",
					...defaultTheme.fontFamily.sans,
				],
				mono: [
					"'JetBrains Mono Variable'",
					"ui-monospace",
					"SFMono-Regular",
					...defaultTheme.fontFamily.mono,
				],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
