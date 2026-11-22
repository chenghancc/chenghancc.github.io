import { SITE } from "@data/site";
import type { APIRoute } from "astro";

const siteUrl = import.meta.env.SITE || SITE.url;
const robotsTxt = `
User-agent: *
Allow: /
Disallow: /_astro/

Sitemap: ${new URL("sitemap-index.xml", siteUrl).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
