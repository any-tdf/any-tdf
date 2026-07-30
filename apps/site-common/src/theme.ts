import { oklchStrToHex, oklchStrToRgbStr, type OklchColorObj } from '@any-tdf/common/utils';

export type OklchColor = OklchColorObj;
export type WCAGLevel = 'AAA' | 'AA' | 'A' | 'Fail';

// 历史版本站点把默认主题名存为各自的品牌名，统一归一化为 ANYTDF。
const legacyDefaultThemeNames = new Set(['STDF', 'RTDF', 'VTDF']);

export const defaultThemeName = 'ANYTDF';

export const normalizeThemeName = (themeName: string | null | undefined): string => {
	if (!themeName || legacyDefaultThemeNames.has(themeName)) return defaultThemeName;
	return themeName;
};

const generateThemeBW = (color: OklchColor, isBlack: boolean): string => {
	const { c, h } = color;
	const newL = isBlack ? 0.15 : 0.97;
	const newC = isBlack ? c * 0.2 : c * 0.1;

	return `oklch(${+newL.toFixed(3)} ${+newC.toFixed(3)} ${+h.toFixed(3)})`;
};

export const generateThemeBlack = (color: OklchColor): string => generateThemeBW(color, true);

export const generateThemeWhite = (color: OklchColor): string => generateThemeBW(color, false);

export const oklchToHex = (oklchStr: string): string => {
	return oklchStrToHex(oklchStr);
};

export const oklchToRgb = (oklchStr: string): string => {
	return oklchStrToRgbStr(oklchStr);
};

export const colorObjToArr = (obj: Record<string, string>) => {
	const arr = Object.entries(obj).map(([key, value]) => ({ key, value }));
	const lastItem = arr.pop();
	if (lastItem) {
		arr.splice(6, 0, lastItem);
	}
	return arr;
};

export const getOklchOpacity = (str: string, opacity: number) => {
	return str.replace(/\)$/, ` / ${opacity})`);
};

export const calculateContrastRatio = (color1: OklchColor, color2: OklchColor): number => {
	const l1 = Math.max(color1.l, color2.l);
	const l2 = Math.min(color1.l, color2.l);
	return (l1 + 0.05) / (l2 + 0.05);
};

export const getWCAGLevel = (ratio: number, isLargeText: boolean = false): WCAGLevel => {
	if (isLargeText) {
		if (ratio >= 4.5) return 'AAA';
		if (ratio >= 3) return 'AA';
		return 'Fail';
	}
	if (ratio >= 7) return 'AAA';
	if (ratio >= 4.5) return 'AA';
	if (ratio >= 3) return 'A';
	return 'Fail';
};

export const getContrastScore = (ratio: number): number => {
	return Math.min((ratio / 7) * 100, 100);
};

export const evaluateColorContrast = (
	foreground: OklchColor,
	background: OklchColor
): { ratio: number; level: WCAGLevel; score: number } => {
	const ratio = calculateContrastRatio(foreground, background);
	const level = getWCAGLevel(ratio);
	const score = getContrastScore(ratio);
	return { ratio, level, score };
};

export const generateRandomOklchColor = (mode: 'light' | 'dark'): OklchColor => {
	const h = Math.random() * 360;
	const c = 0.12 + Math.random() * 0.13;
	const l = mode === 'light' ? 0.35 + Math.random() * 0.2 : 0.7 + Math.random() * 0.2;

	return { l, c, h };
};

export const generateTextColor = (backgroundColor: OklchColor, minRatio: number = 4.5): OklchColor => {
	void minRatio;
	if (backgroundColor.l > 0.5) {
		return { l: 0.15, c: 0, h: 0 };
	}
	return { l: 0.95, c: 0, h: 0 };
};
