import { PROJECTS } from "@data/site";
import { formatDate, getPublishedPosts } from "@utils/posts";
import type { APIRoute } from "astro";

function stripMarkdown(md: string): string {
	return md
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`[^`]*`/g, " ")
		.replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/[#>*_~\-|]/g, " ")
		.replace(/\s+/g, " ")
		.trim()
		.slice(0, 260);
}

export const GET: APIRoute = async () => {
	const posts = await getPublishedPosts();

	const payload = {
		posts: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			category: post.data.category ?? "",
			tags: post.data.tags ?? [],
			date: formatDate(post.data.published),
			url: `/posts/${post.slug}/`,
			excerpt: stripMarkdown(post.body),
		})),
		projects: PROJECTS.map((project) => ({
			name: project.name,
			tagline: project.tagline,
			description: project.description,
			status: project.status,
			tags: project.tags,
			url: project.url,
		})),
	};

	return new Response(JSON.stringify(payload), {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	});
};
