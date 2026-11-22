import rss from "@astrojs/rss";
import { SITE } from "@data/site";
import { getPublishedPosts } from "@utils/posts";
import type { APIContext } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

function stripInvalidXmlChars(str: string): string {
	return str.replace(
		// biome-ignore lint/suspicious/noControlCharactersInRegex: strip invalid XML 1.0 control chars
		/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]/g,
		"",
	);
}

export async function GET(context: APIContext) {
	const posts = await getPublishedPosts();

	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site ?? SITE.url,
		items: posts.map((post) => {
			const cleaned = stripInvalidXmlChars(post.body ?? "");
			return {
				title: post.data.title,
				pubDate: post.data.published,
				description: post.data.description || "",
				link: `/posts/${post.slug}/`,
				content: sanitizeHtml(parser.render(cleaned), {
					allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
				}),
			};
		}),
		customData: `<language>${SITE.lang}</language>`,
	});
}
