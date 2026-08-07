import { writable } from 'svelte/store';
import { normalizeThemeName } from './utils/theme';

// 安全读取 localStorage，存储被禁用（如 Safari 阻止所有 Cookie）时回退为 null
const safeGetStorage = (key: string): string | null => {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
};
// 安全写入 localStorage，存储被禁用时静默失败
const safeSetStorage = (key: string, value: string) => {
	try {
		localStorage.setItem(key, value);
	} catch {
		// 忽略写入失败
	}
};

// 是否显示导航
export const isShowNavStore = writable(false);
// 文档 theme 模式，dark、light、auto。
export const themeStore = writable(safeGetStorage('theme') || 'auto');
// 系统 theme 模式，dark、light
export const sysThemeStore = writable(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
// 当前 theme 模式，dark、light
const currentTheme =
	(safeGetStorage('theme') || 'auto') === 'auto'
		? window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
		: safeGetStorage('theme') || 'auto';
export const currentThemeStore = writable(currentTheme);
// 是否开启 cmdK
export const isCmdKStore = writable(false);
// 是否显示赞赏
export const isShowFundStore = writable(false);
// 当前主题色
const currentColor = normalizeThemeName(safeGetStorage('theme_color'));
if (safeGetStorage('theme_color') !== currentColor) {
	safeSetStorage('theme_color', currentColor);
}
export const currentColorStore = writable(currentColor);
// 显示主题色选择器
export const showThemeSwitchStore = writable(false);
