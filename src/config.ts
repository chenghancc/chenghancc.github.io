import type {
	ExpressiveCodeConfig,
	LinkPreset as LinkPresetType,
	LicenseConfig,
	NavBarLink,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";
import siteSettings from "./site-settings.json";

type SiteSettings = {
	siteConfig: SiteConfig;
	navBar: {
		enablePresets: {
			home: boolean;
			archive: boolean;
			about: boolean;
		};
		links: NavBarLink[];
	};
	profileConfig: ProfileConfig;
	licenseConfig: LicenseConfig;
	expressiveCodeConfig: ExpressiveCodeConfig;
};

const settings = siteSettings as SiteSettings;

function normalizeCmsMediaPath(value?: string): string | undefined {
	if (!value) return value;
	if (value.startsWith("src/public/")) return `/${value.slice("src/public/".length)}`;
	if (value.startsWith("public/")) return `/${value.slice("public/".length)}`;
	return value;
}

const presetLinks: LinkPresetType[] = [];
if (settings.navBar.enablePresets.home) presetLinks.push(LinkPreset.Home);
if (settings.navBar.enablePresets.archive) presetLinks.push(LinkPreset.Archive);
if (settings.navBar.enablePresets.about) presetLinks.push(LinkPreset.About);

export const siteConfig: SiteConfig = {
	...settings.siteConfig,
	banner: {
		...settings.siteConfig.banner,
		src: normalizeCmsMediaPath(settings.siteConfig.banner.src) || "",
	},
};

export const navBarConfig: NavBarConfig = {
	links: [...presetLinks, ...settings.navBar.links],
};

export const profileConfig: ProfileConfig = {
	...settings.profileConfig,
	avatar: normalizeCmsMediaPath(settings.profileConfig.avatar),
};

export const licenseConfig: LicenseConfig = settings.licenseConfig;

export const expressiveCodeConfig: ExpressiveCodeConfig = settings.expressiveCodeConfig;
