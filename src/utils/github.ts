export interface GitHubContributionDay {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubContributionSnapshot {
	username: string;
	total: number;
	contributions: GitHubContributionDay[];
	fetchedAt: string;
	source: "live" | "fallback";
}

function formatLocalIsoDate(date: Date): string {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}

export function generateEmptyYearDays(): GitHubContributionDay[] {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const days: GitHubContributionDay[] = [];
	for (let i = 364; i >= 0; i--) {
		const d = new Date(today);
		d.setDate(today.getDate() - i);
		days.push({
			date: formatLocalIsoDate(d),
			count: 0,
			level: 0,
		});
	}
	return days;
}

async function fetchWithTimeout(
	url: string,
	headers: Record<string, string>,
	timeoutMs = 8000,
): Promise<Response> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
	try {
		return await fetch(url, { signal: controller.signal, headers });
	} finally {
		clearTimeout(timeoutId);
	}
}

async function fetchFromJogruberApi(
	username: string,
): Promise<GitHubContributionDay[] | null> {
	try {
		const endpoint = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`;
		const res = await fetchWithTimeout(
			endpoint,
			{ Accept: "application/json" },
			8000,
		);
		if (!res.ok) return null;

		const data = (await res.json()) as {
			contributions?: Array<{ date: string; count: number; level: number }>;
		};
		if (!Array.isArray(data.contributions) || data.contributions.length === 0) {
			return null;
		}

		return data.contributions.map((item) => ({
			date: item.date,
			count: Number(item.count) || 0,
			level: Math.min(4, Math.max(0, Number(item.level) || 0)) as
				| 0
				| 1
				| 2
				| 3
				| 4,
		}));
	} catch {
		return null;
	}
}

async function fetchFromGitHubHtml(
	username: string,
): Promise<GitHubContributionDay[] | null> {
	try {
		const res = await fetchWithTimeout(
			`https://github.com/users/${encodeURIComponent(username)}/contributions`,
			{
				Accept: "text/html",
				"User-Agent": "chenghancc-blog-builder",
			},
			8000,
		);
		if (!res.ok) return null;
		const html = await res.text();

		const countById = new Map<string, number>();
		const tipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
		for (const match of html.matchAll(tipRegex)) {
			const id = match[1];
			const text = match[2].trim();
			const numMatch = text.match(/^(\d+)\s+contribution/i);
			countById.set(id, numMatch ? Number(numMatch[1]) : 0);
		}

		const cellRegex =
			/data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"[^>]*data-level="([0-4])"/g;
		const days: GitHubContributionDay[] = [];
		for (const match of html.matchAll(cellRegex)) {
			const date = match[1];
			const id = match[2];
			const level = Number(match[3]) as 0 | 1 | 2 | 3 | 4;
			const count = countById.get(id) ?? (level > 0 ? level : 0);
			days.push({ date, count, level });
		}

		if (days.length === 0) return null;
		days.sort((a, b) => a.date.localeCompare(b.date));
		return days;
	} catch {
		return null;
	}
}

export async function fetchGitHubContributions(
	username: string,
): Promise<GitHubContributionSnapshot> {
	const liveDays =
		(await fetchFromJogruberApi(username)) ??
		(await fetchFromGitHubHtml(username));

	if (liveDays && liveDays.length > 0) {
		const total = liveDays.reduce((sum, item) => sum + item.count, 0);
		return {
			username,
			total,
			contributions: liveDays,
			fetchedAt: new Date().toISOString(),
			source: "live",
		};
	}

	return {
		username,
		total: 0,
		contributions: generateEmptyYearDays(),
		fetchedAt: new Date().toISOString(),
		source: "fallback",
	};
}
