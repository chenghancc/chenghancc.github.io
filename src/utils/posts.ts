import { type CollectionEntry, getCollection } from "astro:content";

export type BlogPost = CollectionEntry<"posts">;

export async function getPublishedPosts(): Promise<BlogPost[]> {
	const posts = await getCollection("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	return posts.sort((a, b) => {
		const timeDiff = b.data.published.getTime() - a.data.published.getTime();
		if (timeDiff !== 0) return timeDiff;
		return a.slug.localeCompare(b.slug);
	});
}

export function formatDate(date: Date): string {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}

export function formatShortDate(date: Date): string {
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	return `${m}-${d}`;
}

export function groupPostsByYear(
	posts: BlogPost[],
): Array<{ year: number; posts: BlogPost[] }> {
	const map = new Map<number, BlogPost[]>();
	for (const post of posts) {
		const year = post.data.published.getFullYear();
		const list = map.get(year) ?? [];
		list.push(post);
		map.set(year, list);
	}
	return Array.from(map.entries())
		.sort((a, b) => b[0] - a[0])
		.map(([year, items]) => ({ year, posts: items }));
}

export function getAllTags(
	posts: BlogPost[],
): Array<{ name: string; count: number }> {
	const counts = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.data.tags ?? []) {
			const clean = tag.trim();
			if (!clean) continue;
			counts.set(clean, (counts.get(clean) ?? 0) + 1);
		}
	}
	return Array.from(counts.entries())
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getAllCategories(
	posts: BlogPost[],
): Array<{ name: string; count: number }> {
	const counts = new Map<string, number>();
	for (const post of posts) {
		const cat = post.data.category?.trim();
		if (!cat) continue;
		counts.set(cat, (counts.get(cat) ?? 0) + 1);
	}
	return Array.from(counts.entries())
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
