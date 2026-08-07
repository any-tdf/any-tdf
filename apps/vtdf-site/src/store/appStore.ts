import { reactive } from 'vue';
import {
	normalizeSiteThemeMode,
	resolveSiteLanguage,
	resolveSiteThemeMode,
	type SiteLanguage,
	type SiteThemeMode
} from '@any-tdf/site-common/site';
import { normalizeThemeName } from '../utils/theme';

export type LangType = SiteLanguage;
export type ThemeMode = SiteThemeMode;

export type AppState = {
	lang: LangType;
	isShowNav: boolean;
	isCmdK: boolean;
	isShowFund: boolean;
	showThemeSwitch: boolean;
	currentColor: string;
	themeMode: ThemeMode;
	currentThemeMode: Exclude<ThemeMode, 'auto'>;
	sysTheme: 'light' | 'dark';
	isWideScreen: boolean;
	pathname: string;
	search: string;
};

// 安全读取 localStorage，存储被禁用（如 Safari 阻止所有 Cookie）时回退为 null
const safeGetStorage = (key: string): string | null => {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
};

export const getStoredLang = (): LangType => {
	const urlLang = new URLSearchParams(window.location.search).get('lang');
	return resolveSiteLanguage(urlLang, safeGetStorage('lang'), navigator.language);
};

export const getStoredThemeMode = (): ThemeMode => {
	return normalizeSiteThemeMode(safeGetStorage('theme'));
};

const themeMode = getStoredThemeMode();

export const appState = reactive<AppState>({
	lang: getStoredLang(),
	isShowNav: false,
	isCmdK: false,
	isShowFund: false,
	showThemeSwitch: false,
	currentColor: normalizeThemeName(safeGetStorage('theme_color')),
	themeMode,
	currentThemeMode: resolveSiteThemeMode(themeMode, window.matchMedia('(prefers-color-scheme: dark)').matches),
	sysTheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
	isWideScreen: safeGetStorage('isFull') === 'full',
	pathname: window.location.pathname,
	search: window.location.search
});

export const syncRouteState = () => {
	appState.pathname = window.location.pathname;
	appState.search = window.location.search;
};

export const navigateTo = (url: string) => {
	const isSamePath = new URL(url, window.location.origin).pathname === window.location.pathname;
	window.history.pushState({}, '', url);
	syncRouteState();
	// 跨路径跳转后回到页面顶部，同路径跳转保持原滚动位置
	if (!isSamePath) window.scrollTo(0, 0);
};
