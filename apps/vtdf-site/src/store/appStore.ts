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

export const getStoredLang = (): LangType => {
	const urlLang = new URLSearchParams(window.location.search).get('lang');
	return resolveSiteLanguage(urlLang, localStorage.getItem('lang'), navigator.language);
};

export const getStoredThemeMode = (): ThemeMode => {
	return normalizeSiteThemeMode(localStorage.getItem('theme'));
};

const themeMode = getStoredThemeMode();

export const appState = reactive<AppState>({
	lang: getStoredLang(),
	isShowNav: false,
	isCmdK: false,
	isShowFund: false,
	showThemeSwitch: false,
	currentColor: normalizeThemeName(localStorage.getItem('theme_color')),
	themeMode,
	currentThemeMode: resolveSiteThemeMode(themeMode, window.matchMedia('(prefers-color-scheme: dark)').matches),
	sysTheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
	isWideScreen: localStorage.getItem('isFull') === 'full',
	pathname: window.location.pathname,
	search: window.location.search
});

export const syncRouteState = () => {
	appState.pathname = window.location.pathname;
	appState.search = window.location.search;
};

export const navigateTo = (url: string) => {
	window.history.pushState({}, '', url);
	syncRouteState();
};
