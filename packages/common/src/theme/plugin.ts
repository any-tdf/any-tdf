import type { BuiltInIconLibrary } from '../svg/common.js';

type ThemePluginApi = {
	addBase: (base: Record<string, Record<string, string>>) => void;
};

type ThemePluginWithOptions<Options> = {
	(options?: Options): {
		handler: (api: ThemePluginApi) => void;
		config?: object;
	};
	__isOptionsFunction: true;
};

const createPlugin = {
	withOptions: <Options>(
		pluginFunction: (options: Options) => (api: ThemePluginApi) => void,
		configFunction: (options: Options) => object = () => ({})
	): ThemePluginWithOptions<Options> => {
		const optionsFunction = ((options?: Options) => {
			const resolvedOptions = options ?? ({} as Options);
			return {
				handler: pluginFunction(resolvedOptions),
				config: configFunction(resolvedOptions)
			};
		}) as ThemePluginWithOptions<Options>;

		optionsFunction.__isOptionsFunction = true;
		return optionsFunction;
	}
};

/**
 * ANYTDF 主题插件
 * 支持使用内置的 42 套预设主题，只需传入主题名称即可
 * 自定义主题时，color-primary 和 color-dark 传入基础色，插件会自动计算 50-950 梯度
 * 背景色和文字色必须手动配置，不会自动生成
 *
 * ANYTDF Theme Plugin
 * Supports 42 built-in preset themes, just pass the theme name
 * For custom themes, color-primary and color-dark will auto-calculate 50-950 gradients
 * Background colors and text colors MUST be configured manually (not auto-generated)
 *
 * @example
 * // 在 CSS 中使用内置主题 / Use built-in theme in CSS
 * @plugin "<framework>/theme" {
 *   name: "ANYTDF";
 * }
 *
 * // 使用多个内置主题（逗号分隔）/ Use multiple built-in themes (comma-separated)
 * @plugin "<framework>/theme" {
 *   name: "ANYTDF, Ocean, Forest";
 * }
 *
 * // 或者自定义主题 / Or custom theme
 * @plugin "<framework>/theme" {
 *   name: "mytheme";
 *   color-primary: oklch(0.467 0.296 264.886);
 *   color-dark: oklch(0.845 0.153 80.597);
 *   color-bg-base: oklch(0.967 0.015 264.9);
 *   color-bg-surface: oklch(0.985 0.005 80.6);
 *   color-bg-overlay: oklch(0.955 0.005 80.6);
 *   color-bg-highlight: oklch(0.98 0.009 264.9);
 *   color-bg-base-dark: oklch(0.15 0.012 80.6);
 *   color-bg-surface-dark: oklch(0.22 0.009 95.6);
 *   color-bg-overlay-dark: oklch(0.19 0.008 80.6);
 *   color-bg-highlight-dark: oklch(0.08 0.006 80.6);
 *   color-text-primary: oklch(0.144 0.015 264.9);
 *   color-text-dark: oklch(0.917 0.038 80.6);
 *   color-text-on-primary: oklch(0.883 0.043 80.6);
 *   color-text-on-dark: oklch(0.189 0.050 264.9);
 *   color-success: oklch(0.65 0.18 155);
 *   color-warning: oklch(0.7 0.16 60);
 *   color-error: oklch(0.55 0.22 25);
 *   color-info: oklch(0.55 0.18 250);
 *   radius-box: 0.75rem;
 *   radius-form: 0.5rem;
 *   radius-small: 0.25rem;
 * }
 *
 * // 在 HTML 中使用 / Use in HTML
 * <html data-theme="ANYTDF">
 *
 * // 切换主题 / Switch theme
 * document.documentElement.setAttribute('data-theme', 'ANYTDF');
 */

/**
 * 解析 oklch 颜色字符串，提取亮度、色度、色相值
 * Parse oklch color string to extract lightness, chroma, and hue values
 *
 * @param color - oklch 格式的颜色字符串 / oklch format color string, e.g. "oklch(0.5 0.15 180)"
 * @returns 包含 l(亮度)、c(色度)、h(色相) 的对象 / Object containing l(lightness), c(chroma), h(hue)
 */
const parseOklch = (color: string) => {
	const match = color.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
	if (!match) return { l: 0.5, c: 0.15, h: 0 };
	return {
		l: parseFloat(match[1]),
		c: parseFloat(match[2]),
		h: parseFloat(match[3])
	};
};

/**
 * 根据基础色生成 50-950 的颜色梯度
 * Generate 50-950 color scale from a base color
 *
 * 算法说明 / Algorithm:
 * - 50-500: 逐渐变亮，色度降低 / Gradually lighter with reduced chroma
 * - 600: 基础色 / Base color
 * - 700-950: 逐渐变暗，色度略增 / Gradually darker with slightly increased chroma
 * - 色相会根据冷暖色调微调 / Hue shifts based on warm/cool tones
 *
 * @param baseColor - oklch 格式的基础色 / Base color in oklch format
 * @returns 包含 50-950 色阶的对象 / Object containing 50-950 color scale
 *
 * @example
 * const scale = generateColorScale('oklch(0.5 0.2 250)');
 * // Returns: { 50: 'oklch(...)', 100: 'oklch(...)', ..., 950: 'oklch(...)' }
 */
export const generateColorScale = (baseColor: string) => {
	const { l, c, h } = parseOklch(baseColor);
	const hueStep = 2;
	const lightSteps = 6;
	const darkSteps = 4;

	const getNewHue = (isLight: boolean, idx: number) => {
		const delta = hueStep * idx;
		const hue = h >= 60 && h <= 240 ? (isLight ? h - delta : h + delta) : isLight ? h + delta : h - delta;
		return ((hue % 360) + 360) % 360;
	};

	const getNewChroma = (isLight: boolean, idx: number) => {
		const minChroma = c * 0.15;
		return isLight ? c - ((c - minChroma) / 6) * idx : Math.min(c * 1.1, c + 0.02 * idx);
	};

	const getNewLightness = (isLight: boolean, idx: number) => {
		const maxL = l < 0.97 ? 0.97 : Math.min(0.99, l + Math.max((1 - l) * 0.6, 0.02));
		const minL = l > 0.25 ? 0.25 : Math.max(0.05, l - Math.max(l * 0.6, 0.04));
		if (isLight) {
			return l + ((maxL - l) / lightSteps) * idx;
		}
		return l - ((l - minL) / darkSteps) * idx;
	};

	const format = (value: number) => +value.toFixed(3);

	const buildColor = (index: number) => {
		if (index === 6) {
			return `oklch(${format(l)} ${format(c)} ${format(h)})`;
		}
		const isLight = index < 6;
		const idx = isLight ? 6 - index : index - 6;
		const newL = getNewLightness(isLight, idx);
		const newC = Math.max(0, getNewChroma(isLight, idx));
		const newH = getNewHue(isLight, idx);
		return `oklch(${format(newL)} ${format(newC)} ${format(newH)})`;
	};

	const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
	return Object.fromEntries(steps.map((step, index) => [step, buildColor(index)]));
};

/**
 * 主题配置类型，变量名与 CSS 变量名一致
 * Theme configuration type, variable names match CSS variable names
 *
 * @property name - 主题名称 / Theme name
 * @property color-primary - 主色调基础色 / Primary color base
 * @property color-dark - 深色调基础色 / Dark color base
 * @property color-success - 成功状态色 / Success status color
 * @property color-warning - 警告状态色 / Warning status color
 * @property color-error - 错误状态色 / Error status color
 * @property color-info - 信息状态色 / Info status color
 * @property radius-box - 容器圆角 / Container border radius
 * @property radius-form - 表单元素圆角 / Form element border radius
 * @property radius-small - 小元素圆角 / Small element border radius
 * @property built-in-icon-library - 内置图标库 / Built-in icon library
 * @property color-bg-* - 背景色（亮色/暗色模式）/ Background colors (light/dark mode)
 * @property color-text-* - 文字色 / Text colors
 */
interface ThemeConfig {
	name: string;
	'color-primary': string;
	'color-dark': string;
	'color-success': string;
	'color-warning': string;
	'color-error': string;
	'color-info': string;
	'radius-box': string;
	'radius-form': string;
	'radius-small': string;
	'built-in-icon-library'?: BuiltInIconLibrary;
	// 背景色 / Background colors
	'color-bg-base': string;
	'color-bg-surface': string;
	'color-bg-overlay': string;
	'color-bg-highlight': string;
	'color-bg-base-dark': string;
	'color-bg-surface-dark': string;
	'color-bg-overlay-dark': string;
	'color-bg-highlight-dark': string;
	// 文字色 / Text colors
	'color-text-primary': string;
	'color-text-dark': string;
	'color-text-on-primary': string;
	'color-text-on-dark': string;
}

/**
 * 42 套内置主题配置
 * 42 built-in theme configurations
 *
 * 包含多种风格：自然色系、品牌色系、赛博风格等
 * Includes various styles: natural colors, brand colors, cyber styles, etc.
 */
const builtInThemes: ThemeConfig[] = [
	{
		name: 'ANYTDF',
		'built-in-icon-library': 'remix',
		'color-primary': 'oklch(0.467 0.296 264.886)',
		'color-dark': 'oklch(0.845 0.153 80.597)',
		'color-success': 'oklch(0.704 0.142 167.084)',
		'color-warning': 'oklch(0.558 0.153 47.186)',
		'color-error': 'oklch(0.564 0.223 28.46)',
		'color-info': 'oklch(0.482 0.14 261.518)',
		'radius-box': '0.75rem',
		'radius-form': '0.5rem',
		'radius-small': '0.25rem',
		'color-bg-base': 'oklch(0.967 0.015 264.9)',
		'color-bg-surface': 'oklch(0.985 0.005 80.6)',
		'color-bg-overlay': 'oklch(0.955 0.005 80.6)',
		'color-bg-highlight': 'oklch(0.98 0.009 264.9)',
		'color-bg-base-dark': 'oklch(0.15 0.012 80.6)',
		'color-bg-surface-dark': 'oklch(0.22 0.009 95.6)',
		'color-bg-overlay-dark': 'oklch(0.19 0.008 80.6)',
		'color-bg-highlight-dark': 'oklch(0.08 0.006 80.6)',
		'color-text-primary': 'oklch(0.144 0.015 264.9)',
		'color-text-dark': 'oklch(0.917 0.038 80.6)',
		'color-text-on-primary': 'oklch(0.883 0.043 80.6)',
		'color-text-on-dark': 'oklch(0.189 0.050 264.9)'
	},
	{
		name: 'Nintendo',
		'built-in-icon-library': 'reicon',
		'color-primary': 'oklch(0.581 0.238 27.862)',
		'color-dark': 'oklch(0.752 0.133 215.123)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 65)',
		'color-error': 'oklch(0.6 0.22 25)',
		'color-info': 'oklch(0.6 0.16 245)',
		'radius-box': '2rem',
		'radius-form': 'calc(infinity * 1px)',
		'radius-small': 'calc(infinity * 1px)',
		'color-bg-base': 'oklch(0.967 0.012 27.9)',
		'color-bg-surface': 'oklch(0.985 0.005 215.1)',
		'color-bg-overlay': 'oklch(0.955 0.005 215.1)',
		'color-bg-highlight': 'oklch(0.98 0.007 27.9)',
		'color-bg-base-dark': 'oklch(0.15 0.011 215.1)',
		'color-bg-surface-dark': 'oklch(0.22 0.008 230.1)',
		'color-bg-overlay-dark': 'oklch(0.19 0.007 215.1)',
		'color-bg-highlight-dark': 'oklch(0.08 0.005 215.1)',
		'color-text-primary': 'oklch(0.144 0.012 27.9)',
		'color-text-dark': 'oklch(0.917 0.033 215.1)',
		'color-text-on-primary': 'oklch(0.883 0.037 215.1)',
		'color-text-on-dark': 'oklch(0.189 0.040 27.9)'
	},
	{
		name: 'Sepia',
		'built-in-icon-library': 'reicon',
		'color-primary': 'oklch(0.585 0.163 31.809)',
		'color-dark': 'oklch(0.789 0.114 93.529)',
		'color-success': 'oklch(0.626 0.170 142.735)',
		'color-warning': 'oklch(0.629 0.162 79.407)',
		'color-error': 'oklch(0.585 0.202 24.957)',
		'color-info': 'oklch(0.632 0.205 264.223)',
		'radius-box': '0.375rem',
		'radius-form': '0.5rem',
		'radius-small': '0.375rem',
		'color-bg-base': 'oklch(0.894 0.028 89.118)',
		'color-bg-surface': 'oklch(0.95 0.028 59.118)',
		'color-bg-overlay': 'oklch(0.878 0.072 75)',
		'color-bg-highlight': 'oklch(0.95 0.02 34.412)',
		'color-bg-base-dark': 'oklch(0.144 0.049 31.809)',
		'color-bg-surface-dark': 'oklch(0.256 0.028 48.529)',
		'color-bg-overlay-dark': 'oklch(0.35 0.052 57.353)',
		'color-bg-highlight-dark': 'oklch(0.322 0.051 75)',
		'color-text-primary': 'oklch(0.128 0.02 40.147)',
		'color-text-dark': 'oklch(0.944 0.02 45.441)',
		'color-text-on-primary': 'oklch(0.922 0.028 76.324)',
		'color-text-on-dark': 'oklch(0.206 0.061 3.632)'
	},
	{
		name: 'Ocean',
		'built-in-icon-library': 'lucide',
		'color-primary': 'oklch(0.49 0.2 235)',
		'color-dark': 'oklch(0.73 0.2 55)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 60)',
		'color-error': 'oklch(0.6 0.22 25)',
		'color-info': 'oklch(0.55 0.18 245)',
		'radius-box': '0.75rem',
		'radius-form': 'calc(infinity * 1px)',
		'radius-small': '0.25rem',
		'color-bg-base': 'oklch(0.94 0.025 210)',
		'color-bg-surface': 'oklch(0.96 0.018 200)',
		'color-bg-overlay': 'oklch(0.90 0.035 215)',
		'color-bg-highlight': 'oklch(0.97 0.015 195)',
		'color-bg-base-dark': 'oklch(0.18 0.035 220)',
		'color-bg-surface-dark': 'oklch(0.25 0.045 230)',
		'color-bg-overlay-dark': 'oklch(0.22 0.040 225)',
		'color-bg-highlight-dark': 'oklch(0.12 0.025 220)',
		'color-text-primary': 'oklch(0.18 0.025 220)',
		'color-text-dark': 'oklch(0.92 0.035 195)',
		'color-text-on-primary': 'oklch(0.95 0.02 55)',
		'color-text-on-dark': 'oklch(0.18 0.04 235)'
	},
	{
		name: 'Forest',
		'built-in-icon-library': 'iconoir',
		'color-primary': 'oklch(0.49 0.19 155)',
		'color-dark': 'oklch(0.73 0.17 45)',
		'color-success': 'oklch(0.55 0.2 150)',
		'color-warning': 'oklch(0.7 0.16 60)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 245)',
		'radius-box': '0.75rem',
		'radius-form': '0.5rem',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.93 0.035 130)',
		'color-bg-surface': 'oklch(0.95 0.028 115)',
		'color-bg-overlay': 'oklch(0.88 0.055 140)',
		'color-bg-highlight': 'oklch(0.96 0.022 120)',
		'color-bg-base-dark': 'oklch(0.20 0.045 145)',
		'color-bg-surface-dark': 'oklch(0.28 0.055 155)',
		'color-bg-overlay-dark': 'oklch(0.24 0.050 150)',
		'color-bg-highlight-dark': 'oklch(0.14 0.035 145)',
		'color-text-primary': 'oklch(0.20 0.035 140)',
		'color-text-dark': 'oklch(0.90 0.045 120)',
		'color-text-on-primary': 'oklch(0.95 0.025 45)',
		'color-text-on-dark': 'oklch(0.20 0.035 155)'
	},
	{
		name: 'Sunset',
		'built-in-icon-library': 'tabler',
		'color-primary': 'oklch(0.52 0.24 35)',
		'color-dark': 'oklch(0.72 0.18 250)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.72 0.18 45)',
		'color-error': 'oklch(0.55 0.24 15)',
		'color-info': 'oklch(0.55 0.18 260)',
		'radius-box': '1.5rem',
		'radius-form': '0.5rem',
		'radius-small': 'calc(infinity * 1px)',
		'color-bg-base': 'oklch(0.94 0.045 55)',
		'color-bg-surface': 'oklch(0.96 0.035 45)',
		'color-bg-overlay': 'oklch(0.90 0.065 60)',
		'color-bg-highlight': 'oklch(0.97 0.028 40)',
		'color-bg-base-dark': 'oklch(0.18 0.045 280)',
		'color-bg-surface-dark': 'oklch(0.25 0.055 290)',
		'color-bg-overlay-dark': 'oklch(0.22 0.050 285)',
		'color-bg-highlight-dark': 'oklch(0.12 0.035 275)',
		'color-text-primary': 'oklch(0.18 0.035 50)',
		'color-text-dark': 'oklch(0.92 0.040 45)',
		'color-text-on-primary': 'oklch(0.95 0.025 250)',
		'color-text-on-dark': 'oklch(0.18 0.045 35)'
	},
	{
		name: 'Cherry',
		'built-in-icon-library': 'remix',
		'color-primary': 'oklch(0.52 0.22 340)',
		'color-dark': 'oklch(0.72 0.18 175)',
		'color-success': 'oklch(0.65 0.18 165)',
		'color-warning': 'oklch(0.7 0.16 55)',
		'color-error': 'oklch(0.55 0.22 355)',
		'color-info': 'oklch(0.55 0.18 245)',
		'radius-box': '2rem',
		'radius-form': 'calc(infinity * 1px)',
		'radius-small': '0.25rem',
		'color-bg-base': 'oklch(0.95 0.025 350)',
		'color-bg-surface': 'oklch(0.97 0.018 355)',
		'color-bg-overlay': 'oklch(0.92 0.040 345)',
		'color-bg-highlight': 'oklch(0.98 0.015 0)',
		'color-bg-base-dark': 'oklch(0.18 0.035 350)',
		'color-bg-surface-dark': 'oklch(0.25 0.045 355)',
		'color-bg-overlay-dark': 'oklch(0.22 0.040 352)',
		'color-bg-highlight-dark': 'oklch(0.12 0.025 345)',
		'color-text-primary': 'oklch(0.18 0.030 345)',
		'color-text-dark': 'oklch(0.93 0.025 355)',
		'color-text-on-primary': 'oklch(0.95 0.02 175)',
		'color-text-on-dark': 'oklch(0.18 0.040 340)'
	},
	{
		name: 'Twilight',
		'built-in-icon-library': 'lucide',
		'color-primary': 'oklch(0.48 0.22 285)',
		'color-dark': 'oklch(0.73 0.18 320)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.73 0.18 50)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0.75rem',
		'radius-form': '0.5rem',
		'radius-small': 'calc(infinity * 1px)',
		'color-bg-base': 'oklch(0.94 0.030 295)',
		'color-bg-surface': 'oklch(0.96 0.022 300)',
		'color-bg-overlay': 'oklch(0.90 0.045 290)',
		'color-bg-highlight': 'oklch(0.97 0.018 305)',
		'color-bg-base-dark': 'oklch(0.16 0.045 270)',
		'color-bg-surface-dark': 'oklch(0.22 0.055 280)',
		'color-bg-overlay-dark': 'oklch(0.19 0.050 275)',
		'color-bg-highlight-dark': 'oklch(0.10 0.035 265)',
		'color-text-primary': 'oklch(0.18 0.030 290)',
		'color-text-dark': 'oklch(0.92 0.035 300)',
		'color-text-on-primary': 'oklch(0.95 0.02 320)',
		'color-text-on-dark': 'oklch(0.18 0.040 285)'
	},
	{
		name: 'Amber',
		'built-in-icon-library': 'iconoir',
		'color-primary': 'oklch(0.61 0.24 65)',
		'color-dark': 'oklch(0.72 0.18 280)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.65 0.2 50)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0',
		'radius-form': '0.5rem',
		'radius-small': '0.25rem',
		'color-bg-base': 'oklch(0.967 0.012 65.0)',
		'color-bg-surface': 'oklch(0.985 0.005 280.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 280.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 65.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 280.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 295.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 280.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 280.0)',
		'color-text-primary': 'oklch(0.144 0.012 65.0)',
		'color-text-dark': 'oklch(0.917 0.045 280.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 280.0)',
		'color-text-on-dark': 'oklch(0.189 0.041 65.0)'
	},
	{
		name: 'Mint',
		'built-in-icon-library': 'phosphor',
		'color-primary': 'oklch(0.58 0.18 185)',
		'color-dark': 'oklch(0.72 0.2 315)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 55)',
		'color-error': 'oklch(0.55 0.22 15)',
		'color-info': 'oklch(0.55 0.18 245)',
		'radius-box': '1.5rem',
		'radius-form': 'calc(infinity * 1px)',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.95 0.028 175)',
		'color-bg-surface': 'oklch(0.97 0.020 170)',
		'color-bg-overlay': 'oklch(0.92 0.042 180)',
		'color-bg-highlight': 'oklch(0.98 0.015 165)',
		'color-bg-base-dark': 'oklch(0.17 0.035 190)',
		'color-bg-surface-dark': 'oklch(0.24 0.045 195)',
		'color-bg-overlay-dark': 'oklch(0.21 0.040 192)',
		'color-bg-highlight-dark': 'oklch(0.11 0.028 185)',
		'color-text-primary': 'oklch(0.18 0.025 180)',
		'color-text-dark': 'oklch(0.92 0.030 170)',
		'color-text-on-primary': 'oklch(0.95 0.02 315)',
		'color-text-on-dark': 'oklch(0.18 0.035 185)'
	},
	{
		name: 'GoldWood',
		'built-in-icon-library': 'phosphor',
		'color-primary': 'oklch(0.461 0.115 147.678)',
		'color-dark': 'oklch(0.840 0.165 85.885)',
		'color-success': 'oklch(0.626 0.170 142.735)',
		'color-warning': 'oklch(0.629 0.162 79.407)',
		'color-error': 'oklch(0.585 0.202 24.957)',
		'color-info': 'oklch(0.632 0.205 264.223)',
		'radius-box': '1.5rem',
		'radius-form': '1rem',
		'radius-small': 'calc(infinity * 1px)',
		'color-bg-base': 'oklch(0.917 0.048 85.885)',
		'color-bg-surface': 'oklch(0.944 0.042 82.059)',
		'color-bg-overlay': 'oklch(0.894 0.069 83.824)',
		'color-bg-highlight': 'oklch(0.956 0.036 75)',
		'color-bg-base-dark': 'oklch(0.16 0.035 174.192)',
		'color-bg-surface-dark': 'oklch(0.30 0.065 168.387)',
		'color-bg-overlay-dark': 'oklch(0.25 0.055 157.941)',
		'color-bg-highlight-dark': 'oklch(0.18 0.040 152.647)',
		'color-text-primary': 'oklch(0.189 0.029 82.5)',
		'color-text-dark': 'oklch(0.911 0.107 167.206)',
		'color-text-on-primary': 'oklch(0.96 0.012 147.678)',
		'color-text-on-dark': 'oklch(0.187 0.015 3.632)'
	},
	{
		name: 'Coral',
		'built-in-icon-library': 'tabler',
		'color-primary': 'oklch(0.52 0.23 15)',
		'color-dark': 'oklch(0.72 0.18 200)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 45)',
		'color-error': 'oklch(0.55 0.24 5)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0.75rem',
		'radius-form': '1rem',
		'radius-small': 'calc(infinity * 1px)',
		'color-bg-base': 'oklch(0.967 0.012 15.0)',
		'color-bg-surface': 'oklch(0.985 0.005 200.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 200.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 15.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 200.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 215.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 200.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 200.0)',
		'color-text-primary': 'oklch(0.144 0.012 15.0)',
		'color-text-dark': 'oklch(0.917 0.045 200.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 200.0)',
		'color-text-on-dark': 'oklch(0.189 0.039 15.0)'
	},
	{
		name: 'Slate',
		'built-in-icon-library': 'phosphor',
		'color-primary': 'oklch(0.48 0.12 260)',
		'color-dark': 'oklch(0.72 0.15 45)',
		'color-success': 'oklch(0.65 0.16 155)',
		'color-warning': 'oklch(0.7 0.14 55)',
		'color-error': 'oklch(0.55 0.2 25)',
		'color-info': 'oklch(0.5 0.14 260)',
		'radius-box': '0',
		'radius-form': '0',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.967 0.006 260.0)',
		'color-bg-surface': 'oklch(0.985 0.005 45.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 45.0)',
		'color-bg-highlight': 'oklch(0.98 0.004 260.0)',
		'color-bg-base-dark': 'oklch(0.15 0.012 45.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.009 60.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.007 45.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.006 45.0)',
		'color-text-primary': 'oklch(0.144 0.006 260.0)',
		'color-text-dark': 'oklch(0.917 0.037 45.0)',
		'color-text-on-primary': 'oklch(0.883 0.042 45.0)',
		'color-text-on-dark': 'oklch(0.189 0.020 260.0)'
	},
	{
		name: 'Emerald',
		'built-in-icon-library': 'lucide',
		'color-primary': 'oklch(0.5 0.22 165)',
		'color-dark': 'oklch(0.73 0.2 25)',
		'color-success': 'oklch(0.55 0.22 160)',
		'color-warning': 'oklch(0.72 0.18 35)',
		'color-error': 'oklch(0.55 0.22 15)',
		'color-info': 'oklch(0.55 0.18 245)',
		'radius-box': '0.75rem',
		'radius-form': '0',
		'radius-small': '0.375rem',
		'color-bg-base': 'oklch(0.967 0.011 165.0)',
		'color-bg-surface': 'oklch(0.985 0.005 25.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 25.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 165.0)',
		'color-bg-base-dark': 'oklch(0.15 0.016 25.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.012 40.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.010 25.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.008 25.0)',
		'color-text-primary': 'oklch(0.144 0.011 165.0)',
		'color-text-dark': 'oklch(0.917 0.050 25.0)',
		'color-text-on-primary': 'oklch(0.883 0.056 25.0)',
		'color-text-on-dark': 'oklch(0.189 0.037 165.0)'
	},
	{
		name: 'Crimson',
		'built-in-icon-library': 'iconoir',
		'color-primary': 'oklch(0.5 0.27 5)',
		'color-dark': 'oklch(0.73 0.18 190)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 50)',
		'color-error': 'oklch(0.5 0.28 0)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '1rem',
		'radius-form': '0.5rem',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.967 0.014 5.0)',
		'color-bg-surface': 'oklch(0.985 0.005 190.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 190.0)',
		'color-bg-highlight': 'oklch(0.98 0.008 5.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 190.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 205.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 190.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 190.0)',
		'color-text-primary': 'oklch(0.144 0.014 5.0)',
		'color-text-dark': 'oklch(0.917 0.045 190.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 190.0)',
		'color-text-on-dark': 'oklch(0.189 0.046 5.0)'
	},
	{
		name: 'Navy',
		'built-in-icon-library': 'iconoir',
		'color-primary': 'oklch(0.45 0.2 250)',
		'color-dark': 'oklch(0.75 0.18 35)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.73 0.17 55)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.48 0.2 255)',
		'radius-box': '0',
		'radius-form': '0.5rem',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.967 0.010 250.0)',
		'color-bg-surface': 'oklch(0.985 0.005 35.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 35.0)',
		'color-bg-highlight': 'oklch(0.98 0.006 250.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 35.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 50.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 35.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 35.0)',
		'color-text-primary': 'oklch(0.144 0.010 250.0)',
		'color-text-dark': 'oklch(0.917 0.045 35.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 35.0)',
		'color-text-on-dark': 'oklch(0.189 0.034 250.0)'
	},
	{
		name: 'CyberNeon',
		'built-in-icon-library': 'phosphor',
		'color-primary': 'oklch(0.65 0.28 320)',
		'color-dark': 'oklch(0.75 0.22 195)',
		'color-success': 'oklch(0.72 0.20 145)',
		'color-warning': 'oklch(0.75 0.18 85)',
		'color-error': 'oklch(0.62 0.24 15)',
		'color-info': 'oklch(0.68 0.20 250)',
		'radius-box': '0.25rem',
		'radius-form': '0',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.94 0.025 290)',
		'color-bg-surface': 'oklch(0.96 0.018 295)',
		'color-bg-overlay': 'oklch(0.90 0.035 285)',
		'color-bg-highlight': 'oklch(0.97 0.015 300)',
		'color-bg-base-dark': 'oklch(0.12 0.045 280)',
		'color-bg-surface-dark': 'oklch(0.18 0.055 290)',
		'color-bg-overlay-dark': 'oklch(0.10 0.040 275)',
		'color-bg-highlight-dark': 'oklch(0.22 0.060 295)',
		'color-text-primary': 'oklch(0.18 0.030 285)',
		'color-text-dark': 'oklch(0.94 0.025 295)',
		'color-text-on-primary': 'oklch(0.95 0.02 280)',
		'color-text-on-dark': 'oklch(0.12 0.025 195)'
	},
	{
		name: 'Olive',
		'built-in-icon-library': 'remix',
		'color-primary': 'oklch(0.52 0.18 105)',
		'color-dark': 'oklch(0.73 0.18 295)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 55)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0.5rem',
		'radius-form': 'calc(infinity * 1px)',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.967 0.009 105.0)',
		'color-bg-surface': 'oklch(0.985 0.005 295.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 295.0)',
		'color-bg-highlight': 'oklch(0.98 0.005 105.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 295.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 310.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 295.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 295.0)',
		'color-text-primary': 'oklch(0.144 0.009 105.0)',
		'color-text-dark': 'oklch(0.917 0.045 295.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 295.0)',
		'color-text-on-dark': 'oklch(0.189 0.031 105.0)'
	},
	{
		name: 'Plum',
		'built-in-icon-library': 'tabler',
		'color-primary': 'oklch(0.48 0.22 320)',
		'color-dark': 'oklch(0.73 0.18 145)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 55)',
		'color-error': 'oklch(0.55 0.22 15)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '1.5rem',
		'radius-form': '0.75rem',
		'radius-small': '0.25rem',
		'color-bg-base': 'oklch(0.967 0.011 320.0)',
		'color-bg-surface': 'oklch(0.985 0.005 145.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 145.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 320.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 145.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 160.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 145.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 145.0)',
		'color-text-primary': 'oklch(0.144 0.011 320.0)',
		'color-text-dark': 'oklch(0.917 0.045 145.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 145.0)',
		'color-text-on-dark': 'oklch(0.189 0.037 320.0)'
	},
	{
		name: 'Cyan',
		'built-in-icon-library': 'remix',
		'color-primary': 'oklch(0.52 0.2 200)',
		'color-dark': 'oklch(0.75 0.2 30)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.73 0.18 40)',
		'color-error': 'oklch(0.55 0.22 20)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0.75rem',
		'radius-form': '0.5rem',
		'radius-small': 'calc(infinity * 1px)',
		'color-bg-base': 'oklch(0.967 0.010 200.0)',
		'color-bg-surface': 'oklch(0.985 0.005 30.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 30.0)',
		'color-bg-highlight': 'oklch(0.98 0.006 200.0)',
		'color-bg-base-dark': 'oklch(0.15 0.016 30.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.012 45.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.010 30.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.008 30.0)',
		'color-text-primary': 'oklch(0.144 0.010 200.0)',
		'color-text-dark': 'oklch(0.917 0.050 30.0)',
		'color-text-on-primary': 'oklch(0.883 0.056 30.0)',
		'color-text-on-dark': 'oklch(0.189 0.034 200.0)'
	},
	{
		name: 'Tangerine',
		'built-in-icon-library': 'remix',
		'color-primary': 'oklch(0.6 0.24 45)',
		'color-dark': 'oklch(0.72 0.18 230)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.62 0.22 50)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 240)',
		'radius-box': '2rem',
		'radius-form': 'calc(infinity * 1px)',
		'radius-small': 'calc(infinity * 1px)',
		'color-bg-base': 'oklch(0.967 0.012 45.0)',
		'color-bg-surface': 'oklch(0.985 0.005 230.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 230.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 45.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 230.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 245.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 230.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 230.0)',
		'color-text-primary': 'oklch(0.144 0.012 45.0)',
		'color-text-dark': 'oklch(0.917 0.045 230.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 230.0)',
		'color-text-on-dark': 'oklch(0.189 0.041 45.0)'
	},
	{
		name: 'Sage',
		'built-in-icon-library': 'tabler',
		'color-primary': 'oklch(0.52 0.16 130)',
		'color-dark': 'oklch(0.73 0.18 310)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 55)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0.25rem',
		'radius-form': 'calc(infinity * 1px)',
		'radius-small': '0.25rem',
		'color-bg-base': 'oklch(0.967 0.008 130.0)',
		'color-bg-surface': 'oklch(0.985 0.005 310.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 310.0)',
		'color-bg-highlight': 'oklch(0.98 0.005 130.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 310.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 325.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 310.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 310.0)',
		'color-text-primary': 'oklch(0.144 0.008 130.0)',
		'color-text-dark': 'oklch(0.917 0.045 310.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 310.0)',
		'color-text-on-dark': 'oklch(0.189 0.027 130.0)'
	},
	{
		name: 'Berry',
		'built-in-icon-library': 'reicon',
		'color-primary': 'oklch(0.5 0.23 305)',
		'color-dark': 'oklch(0.73 0.18 125)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 55)',
		'color-error': 'oklch(0.55 0.22 15)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '1rem',
		'radius-form': '0',
		'radius-small': 'calc(infinity * 1px)',
		'color-bg-base': 'oklch(0.967 0.012 305.0)',
		'color-bg-surface': 'oklch(0.985 0.005 125.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 125.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 305.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 125.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 140.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 125.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 125.0)',
		'color-text-primary': 'oklch(0.144 0.012 305.0)',
		'color-text-dark': 'oklch(0.917 0.045 125.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 125.0)',
		'color-text-on-dark': 'oklch(0.189 0.039 305.0)'
	},
	{
		name: 'Wine',
		'built-in-icon-library': 'iconoir',
		'color-primary': 'oklch(0.45 0.23 355)',
		'color-dark': 'oklch(0.75 0.18 175)',
		'color-success': 'oklch(0.65 0.18 160)',
		'color-warning': 'oklch(0.7 0.16 55)',
		'color-error': 'oklch(0.55 0.22 5)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0.5rem',
		'radius-form': '0',
		'radius-small': '0.375rem',
		'color-bg-base': 'oklch(0.967 0.012 355.0)',
		'color-bg-surface': 'oklch(0.985 0.005 175.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 175.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 355.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 175.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 190.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 175.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 175.0)',
		'color-text-primary': 'oklch(0.144 0.012 355.0)',
		'color-text-dark': 'oklch(0.917 0.045 175.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 175.0)',
		'color-text-on-dark': 'oklch(0.189 0.039 355.0)'
	},
	{
		name: 'IKEA',
		'built-in-icon-library': 'lucide',
		'color-primary': 'oklch(0.45 0.22 240)',
		'color-dark': 'oklch(0.85 0.18 85)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 60)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0',
		'radius-form': '0',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.967 0.011 240.0)',
		'color-bg-surface': 'oklch(0.985 0.005 85.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 85.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 240.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 85.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 100.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 85.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 85.0)',
		'color-text-primary': 'oklch(0.144 0.011 240.0)',
		'color-text-dark': 'oklch(0.917 0.045 85.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 85.0)',
		'color-text-on-dark': 'oklch(0.189 0.037 240.0)'
	},
	{
		name: 'Ferrari',
		'built-in-icon-library': 'phosphor',
		'color-primary': 'oklch(0.52 0.26 25)',
		'color-dark': 'oklch(0.82 0.17 85)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.72 0.15 70)',
		'color-error': 'oklch(0.5 0.24 15)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0.375rem',
		'radius-form': '1.5rem',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.967 0.013 25.0)',
		'color-bg-surface': 'oklch(0.985 0.005 85.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 85.0)',
		'color-bg-highlight': 'oklch(0.98 0.008 25.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 85.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.010 100.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 85.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 85.0)',
		'color-text-primary': 'oklch(0.144 0.013 25.0)',
		'color-text-dark': 'oklch(0.917 0.043 85.0)',
		'color-text-on-primary': 'oklch(0.883 0.048 85.0)',
		'color-text-on-dark': 'oklch(0.189 0.044 25.0)'
	},
	{
		name: 'Tiffany',
		'built-in-icon-library': 'reicon',
		'color-primary': 'oklch(0.72 0.12 175)',
		'color-dark': 'oklch(0.92 0.02 280)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 60)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '1.5rem',
		'radius-form': '0.75rem',
		'radius-small': 'calc(infinity * 1px)',
		'color-bg-base': 'oklch(0.967 0.006 175.0)',
		'color-bg-surface': 'oklch(0.985 0.005 280.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 280.0)',
		'color-bg-highlight': 'oklch(0.98 0.004 175.0)',
		'color-bg-base-dark': 'oklch(0.15 0.002 280.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.001 295.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.001 280.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.001 280.0)',
		'color-text-primary': 'oklch(0.144 0.006 175.0)',
		'color-text-dark': 'oklch(0.917 0.005 280.0)',
		'color-text-on-primary': 'oklch(0.883 0.006 280.0)',
		'color-text-on-dark': 'oklch(0.189 0.020 175.0)'
	},
	{
		name: 'Pepsi',
		'built-in-icon-library': 'reicon',
		'color-primary': 'oklch(0.48 0.22 250)',
		'color-dark': 'oklch(0.58 0.22 25)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 60)',
		'color-error': 'oklch(0.55 0.22 15)',
		'color-info': 'oklch(0.55 0.18 260)',
		'radius-box': '2rem',
		'radius-form': 'calc(infinity * 1px)',
		'radius-small': '0.5rem',
		'color-bg-base': 'oklch(0.967 0.011 250.0)',
		'color-bg-surface': 'oklch(0.985 0.005 25.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 25.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 250.0)',
		'color-bg-base-dark': 'oklch(0.15 0.018 25.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.013 40.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.011 25.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.009 25.0)',
		'color-text-primary': 'oklch(0.144 0.011 250.0)',
		'color-text-dark': 'oklch(0.917 0.055 25.0)',
		'color-text-on-primary': 'oklch(0.883 0.062 25.0)',
		'color-text-on-dark': 'oklch(0.189 0.037 250.0)'
	},
	{
		name: 'Spotify',
		'built-in-icon-library': 'iconoir',
		'color-primary': 'oklch(0.68 0.22 145)',
		'color-dark': 'oklch(0.88 0.06 90)',
		'color-success': 'oklch(0.58 0.2 150)',
		'color-warning': 'oklch(0.7 0.16 60)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '1rem',
		'radius-form': 'calc(infinity * 1px)',
		'radius-small': 'calc(infinity * 1px)',
		'color-bg-base': 'oklch(0.967 0.011 145.0)',
		'color-bg-surface': 'oklch(0.985 0.005 90.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 90.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 145.0)',
		'color-bg-base-dark': 'oklch(0.15 0.005 90.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.004 105.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.003 90.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.002 90.0)',
		'color-text-primary': 'oklch(0.144 0.011 145.0)',
		'color-text-dark': 'oklch(0.917 0.015 90.0)',
		'color-text-on-primary': 'oklch(0.883 0.017 90.0)',
		'color-text-on-dark': 'oklch(0.189 0.037 145.0)'
	},
	{
		name: 'Terracotta',
		'built-in-icon-library': 'reicon',
		'color-primary': 'oklch(0.58 0.16 45)',
		'color-dark': 'oklch(0.65 0.14 185)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.70 0.16 65)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.60 0.16 240)',
		'radius-box': '2rem',
		'radius-form': '1.5rem',
		'radius-small': 'calc(infinity * 1px)',
		'color-bg-base': 'oklch(0.90 0.055 175)',
		'color-bg-surface': 'oklch(0.93 0.045 180)',
		'color-bg-overlay': 'oklch(0.85 0.070 170)',
		'color-bg-highlight': 'oklch(0.95 0.035 185)',
		'color-bg-base-dark': 'oklch(0.18 0.045 40)',
		'color-bg-surface-dark': 'oklch(0.25 0.055 45)',
		'color-bg-overlay-dark': 'oklch(0.22 0.050 42)',
		'color-bg-highlight-dark': 'oklch(0.30 0.060 50)',
		'color-text-primary': 'oklch(0.22 0.040 170)',
		'color-text-dark': 'oklch(0.90 0.045 45)',
		'color-text-on-primary': 'oklch(0.95 0.025 185)',
		'color-text-on-dark': 'oklch(0.20 0.035 185)'
	},
	{
		name: 'Netflix',
		'built-in-icon-library': 'tabler',
		'color-primary': 'oklch(0.52 0.24 25)',
		'color-dark': 'oklch(0.9 0.02 60)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 60)',
		'color-error': 'oklch(0.62 0.22 20)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0',
		'radius-form': '0.25rem',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.967 0.012 25.0)',
		'color-bg-surface': 'oklch(0.985 0.005 60.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 60.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 25.0)',
		'color-bg-base-dark': 'oklch(0.15 0.002 60.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.001 75.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.001 60.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.001 60.0)',
		'color-text-primary': 'oklch(0.144 0.012 25.0)',
		'color-text-dark': 'oklch(0.917 0.005 60.0)',
		'color-text-on-primary': 'oklch(0.883 0.006 60.0)',
		'color-text-on-dark': 'oklch(0.189 0.041 25.0)'
	},
	{
		name: 'Hermes',
		'built-in-icon-library': 'phosphor',
		'color-primary': 'oklch(0.68 0.2 50)',
		'color-dark': 'oklch(0.85 0.08 70)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.78 0.16 55)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0.5rem',
		'radius-form': '0',
		'radius-small': '1rem',
		'color-bg-base': 'oklch(0.967 0.010 50.0)',
		'color-bg-surface': 'oklch(0.985 0.005 70.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 70.0)',
		'color-bg-highlight': 'oklch(0.98 0.006 50.0)',
		'color-bg-base-dark': 'oklch(0.15 0.006 70.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.005 85.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.004 70.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.003 70.0)',
		'color-text-primary': 'oklch(0.144 0.010 50.0)',
		'color-text-dark': 'oklch(0.917 0.020 70.0)',
		'color-text-on-primary': 'oklch(0.883 0.022 70.0)',
		'color-text-on-dark': 'oklch(0.189 0.034 50.0)'
	},
	{
		name: 'Aurora',
		'built-in-icon-library': 'lucide',
		'color-primary': 'oklch(0.52 0.18 165)',
		'color-dark': 'oklch(0.78 0.18 55)',
		'color-success': 'oklch(0.68 0.20 150)',
		'color-warning': 'oklch(0.75 0.18 70)',
		'color-error': 'oklch(0.60 0.22 20)',
		'color-info': 'oklch(0.65 0.18 245)',
		'radius-box': '1rem',
		'radius-form': '0.5rem',
		'radius-small': '0.25rem',
		'color-bg-base': 'oklch(0.93 0.035 175)',
		'color-bg-surface': 'oklch(0.95 0.028 180)',
		'color-bg-overlay': 'oklch(0.88 0.050 170)',
		'color-bg-highlight': 'oklch(0.96 0.022 185)',
		'color-bg-base-dark': 'oklch(0.14 0.050 285)',
		'color-bg-surface-dark': 'oklch(0.20 0.060 290)',
		'color-bg-overlay-dark': 'oklch(0.12 0.045 280)',
		'color-bg-highlight-dark': 'oklch(0.24 0.065 295)',
		'color-text-primary': 'oklch(0.18 0.035 170)',
		'color-text-dark': 'oklch(0.94 0.030 180)',
		'color-text-on-primary': 'oklch(0.95 0.02 175)',
		'color-text-on-dark': 'oklch(0.15 0.030 55)'
	},
	{
		name: 'CocaCola',
		'built-in-icon-library': 'iconoir',
		'color-primary': 'oklch(0.48 0.22 25)',
		'color-dark': 'oklch(0.88 0.02 0)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 60)',
		'color-error': 'oklch(0.58 0.2 20)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '1.5rem',
		'radius-form': '0.75rem',
		'radius-small': '0.25rem',
		'color-bg-base': 'oklch(0.967 0.011 25.0)',
		'color-bg-surface': 'oklch(0.985 0.005 0.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 0.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 25.0)',
		'color-bg-base-dark': 'oklch(0.15 0.002 0.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.001 15.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.001 0.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.001 0.0)',
		'color-text-primary': 'oklch(0.144 0.011 25.0)',
		'color-text-dark': 'oklch(0.917 0.005 0.0)',
		'color-text-on-primary': 'oklch(0.883 0.006 0.0)',
		'color-text-on-dark': 'oklch(0.189 0.037 25.0)'
	},
	{
		name: 'Starbucks',
		'built-in-icon-library': 'reicon',
		'color-primary': 'oklch(0.42 0.12 165)',
		'color-dark': 'oklch(0.75 0.08 55)',
		'color-success': 'oklch(0.55 0.16 160)',
		'color-warning': 'oklch(0.7 0.16 60)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '2rem',
		'radius-form': 'calc(infinity * 1px)',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.967 0.006 165.0)',
		'color-bg-surface': 'oklch(0.985 0.005 55.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 55.0)',
		'color-bg-highlight': 'oklch(0.98 0.004 165.0)',
		'color-bg-base-dark': 'oklch(0.15 0.006 55.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.005 70.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.004 55.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.003 55.0)',
		'color-text-primary': 'oklch(0.144 0.006 165.0)',
		'color-text-dark': 'oklch(0.917 0.020 55.0)',
		'color-text-on-primary': 'oklch(0.883 0.022 55.0)',
		'color-text-on-dark': 'oklch(0.189 0.020 165.0)'
	},
	{
		name: 'McDonalds',
		'built-in-icon-library': 'phosphor',
		'color-primary': 'oklch(0.5 0.22 30)',
		'color-dark': 'oklch(0.85 0.18 85)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.75 0.16 70)',
		'color-error': 'oklch(0.6 0.2 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '1rem',
		'radius-form': '0.375rem',
		'radius-small': 'calc(infinity * 1px)',
		'color-bg-base': 'oklch(0.967 0.011 30.0)',
		'color-bg-surface': 'oklch(0.985 0.005 85.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 85.0)',
		'color-bg-highlight': 'oklch(0.98 0.007 30.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 85.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 100.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 85.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 85.0)',
		'color-text-primary': 'oklch(0.144 0.011 30.0)',
		'color-text-dark': 'oklch(0.917 0.045 85.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 85.0)',
		'color-text-on-dark': 'oklch(0.189 0.037 30.0)'
	},
	{
		name: 'Gucci',
		'built-in-icon-library': 'lucide',
		'color-primary': 'oklch(0.4 0.12 155)',
		'color-dark': 'oklch(0.55 0.2 25)',
		'color-success': 'oklch(0.55 0.16 160)',
		'color-warning': 'oklch(0.7 0.16 60)',
		'color-error': 'oklch(0.65 0.18 20)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0',
		'radius-form': '0.25rem',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.967 0.006 155.0)',
		'color-bg-surface': 'oklch(0.985 0.005 25.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 25.0)',
		'color-bg-highlight': 'oklch(0.98 0.004 155.0)',
		'color-bg-base-dark': 'oklch(0.15 0.016 25.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.012 40.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.010 25.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.008 25.0)',
		'color-text-primary': 'oklch(0.144 0.006 155.0)',
		'color-text-dark': 'oklch(0.917 0.050 25.0)',
		'color-text-on-primary': 'oklch(0.883 0.056 25.0)',
		'color-text-on-dark': 'oklch(0.189 0.020 155.0)'
	},
	{
		name: 'Chanel',
		'built-in-icon-library': 'remix',
		'color-primary': 'oklch(0.15 0.005 0)',
		'color-dark': 'oklch(0.92 0.03 70)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.7 0.16 60)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0',
		'radius-form': '0',
		'radius-small': '0.25rem',
		'color-bg-base': 'oklch(0.967 0.000 0.0)',
		'color-bg-surface': 'oklch(0.985 0.005 70.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 70.0)',
		'color-bg-highlight': 'oklch(0.98 0.000 0.0)',
		'color-bg-base-dark': 'oklch(0.15 0.002 70.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.002 85.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.002 70.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.001 70.0)',
		'color-text-primary': 'oklch(0.144 0.000 0.0)',
		'color-text-dark': 'oklch(0.917 0.007 70.0)',
		'color-text-on-primary': 'oklch(0.883 0.008 70.0)',
		'color-text-on-dark': 'oklch(0.189 0.001 0.0)'
	},
	{
		name: 'Rolex',
		'built-in-icon-library': 'remix',
		'color-primary': 'oklch(0.38 0.1 155)',
		'color-dark': 'oklch(0.8 0.15 85)',
		'color-success': 'oklch(0.52 0.14 160)',
		'color-warning': 'oklch(0.7 0.16 70)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0.25rem',
		'radius-form': '1rem',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.967 0.005 155.0)',
		'color-bg-surface': 'oklch(0.985 0.005 85.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 85.0)',
		'color-bg-highlight': 'oklch(0.98 0.003 155.0)',
		'color-bg-base-dark': 'oklch(0.15 0.012 85.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.009 100.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.007 85.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.006 85.0)',
		'color-text-primary': 'oklch(0.144 0.005 155.0)',
		'color-text-dark': 'oklch(0.917 0.037 85.0)',
		'color-text-on-primary': 'oklch(0.883 0.042 85.0)',
		'color-text-on-dark': 'oklch(0.189 0.017 155.0)'
	},
	{
		name: 'LouisVuitton',
		'built-in-icon-library': 'lucide',
		'color-primary': 'oklch(0.38 0.08 55)',
		'color-dark': 'oklch(0.78 0.14 80)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.68 0.16 65)',
		'color-error': 'oklch(0.55 0.22 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '0',
		'radius-form': '0',
		'radius-small': '0.5rem',
		'color-bg-base': 'oklch(0.967 0.004 55.0)',
		'color-bg-surface': 'oklch(0.985 0.005 80.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 80.0)',
		'color-bg-highlight': 'oklch(0.98 0.002 55.0)',
		'color-bg-base-dark': 'oklch(0.15 0.011 80.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.008 95.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.007 80.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.006 80.0)',
		'color-text-primary': 'oklch(0.144 0.004 55.0)',
		'color-text-dark': 'oklch(0.917 0.035 80.0)',
		'color-text-on-primary': 'oklch(0.883 0.039 80.0)',
		'color-text-on-dark': 'oklch(0.189 0.014 55.0)'
	},
	{
		name: 'Mastercard',
		'built-in-icon-library': 'tabler',
		'color-primary': 'oklch(0.48 0.2 30)',
		'color-dark': 'oklch(0.72 0.18 55)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.62 0.16 65)',
		'color-error': 'oklch(0.58 0.18 25)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '1.5rem',
		'radius-form': '0.5rem',
		'radius-small': '0',
		'color-bg-base': 'oklch(0.967 0.010 30.0)',
		'color-bg-surface': 'oklch(0.985 0.005 55.0)',
		'color-bg-overlay': 'oklch(0.955 0.005 55.0)',
		'color-bg-highlight': 'oklch(0.98 0.006 30.0)',
		'color-bg-base-dark': 'oklch(0.15 0.014 55.0)',
		'color-bg-surface-dark': 'oklch(0.22 0.011 70.0)',
		'color-bg-overlay-dark': 'oklch(0.19 0.009 55.0)',
		'color-bg-highlight-dark': 'oklch(0.08 0.007 55.0)',
		'color-text-primary': 'oklch(0.144 0.010 30.0)',
		'color-text-dark': 'oklch(0.917 0.045 55.0)',
		'color-text-on-primary': 'oklch(0.883 0.050 55.0)',
		'color-text-on-dark': 'oklch(0.189 0.034 30.0)'
	},
	{
		name: 'Sakura',
		'built-in-icon-library': 'tabler',
		'color-primary': 'oklch(0.45 0.22 265)',
		'color-dark': 'oklch(0.72 0.16 350)',
		'color-success': 'oklch(0.65 0.18 155)',
		'color-warning': 'oklch(0.70 0.16 60)',
		'color-error': 'oklch(0.58 0.22 15)',
		'color-info': 'oklch(0.55 0.18 250)',
		'radius-box': '1.5rem',
		'radius-form': 'calc(infinity * 1px)',
		'radius-small': '0.5rem',
		'color-bg-base': 'oklch(0.94 0.035 350)',
		'color-bg-surface': 'oklch(0.96 0.028 355)',
		'color-bg-overlay': 'oklch(0.90 0.050 345)',
		'color-bg-highlight': 'oklch(0.97 0.022 0)',
		'color-bg-base-dark': 'oklch(0.16 0.055 265)',
		'color-bg-surface-dark': 'oklch(0.22 0.065 270)',
		'color-bg-overlay-dark': 'oklch(0.19 0.060 268)',
		'color-bg-highlight-dark': 'oklch(0.26 0.070 275)',
		'color-text-primary': 'oklch(0.20 0.035 345)',
		'color-text-dark': 'oklch(0.92 0.040 270)',
		'color-text-on-primary': 'oklch(0.95 0.02 350)',
		'color-text-on-dark': 'oklch(0.18 0.04 265)'
	}
];

/**
 * 根据主题配置生成完整的 CSS 变量对象
 * Generate complete CSS variables object from theme configuration
 *
 * @param theme - 主题配置对象 / Theme configuration object
 * @param includeRadius - 是否包含圆角配置，默认 true / Whether to include radius config, default true
 * @returns CSS 变量键值对对象 / CSS variables key-value object
 */
const generateThemeCssVars = (theme: ThemeConfig, includeRadius: boolean = true): Record<string, string> => {
	const primaryScale = generateColorScale(theme['color-primary']);
	const darkScale = generateColorScale(theme['color-dark']);

	const cssVars: Record<string, string> = {
		// Primary 色阶 / Primary color scale
		'--color-primary-50': primaryScale[50],
		'--color-primary-100': primaryScale[100],
		'--color-primary-200': primaryScale[200],
		'--color-primary-300': primaryScale[300],
		'--color-primary-400': primaryScale[400],
		'--color-primary-500': primaryScale[500],
		'--color-primary': primaryScale[600],
		'--color-primary-700': primaryScale[700],
		'--color-primary-800': primaryScale[800],
		'--color-primary-900': primaryScale[900],
		'--color-primary-950': primaryScale[950],
		// Dark 色阶 / Dark color scale
		'--color-dark-50': darkScale[50],
		'--color-dark-100': darkScale[100],
		'--color-dark-200': darkScale[200],
		'--color-dark-300': darkScale[300],
		'--color-dark-400': darkScale[400],
		'--color-dark-500': darkScale[500],
		'--color-dark': darkScale[600],
		'--color-dark-700': darkScale[700],
		'--color-dark-800': darkScale[800],
		'--color-dark-900': darkScale[900],
		'--color-dark-950': darkScale[950],
		// 背景色（亮色模式）/ Background colors (light mode)
		'--color-bg-base': theme['color-bg-base'],
		'--color-bg-surface': theme['color-bg-surface'],
		'--color-bg-overlay': theme['color-bg-overlay'],
		'--color-bg-highlight': theme['color-bg-highlight'],
		// 背景色（暗色模式）/ Background colors (dark mode)
		'--color-bg-base-dark': theme['color-bg-base-dark'],
		'--color-bg-surface-dark': theme['color-bg-surface-dark'],
		'--color-bg-overlay-dark': theme['color-bg-overlay-dark'],
		'--color-bg-highlight-dark': theme['color-bg-highlight-dark'],
		// 文字颜色 / Text colors
		'--color-text-primary': theme['color-text-primary'],
		'--color-text-dark': theme['color-text-dark'],
		'--color-text-on-primary': theme['color-text-on-primary'],
		'--color-text-on-dark': theme['color-text-on-dark'],
		// 功能色 / Functional colors
		'--color-success': theme['color-success'],
		'--color-warning': theme['color-warning'],
		'--color-error': theme['color-error'],
		'--color-info': theme['color-info']
	};

	// 是否包含圆角配置 / Whether to include radius config
	if (includeRadius) {
		cssVars['--radius-box'] = theme['radius-box'];
		cssVars['--radius-form'] = theme['radius-form'];
		cssVars['--radius-small'] = theme['radius-small'];
	}

	return cssVars;
};

/**
 * 主题插件选项类型
 * Theme plugin options type
 *
 * @property name - 主题名称，支持逗号分隔多个 / Theme name, supports comma-separated multiple names
 * @property all - 是否生成所有内置主题 / Whether to generate all built-in themes
 * @property includeRadius - 是否包含圆角配置 / Whether to include radius config
 */
interface ThemeOptions {
	name?: string;
	all?: boolean; // 是否生成所有内置主题
	includeRadius?: boolean;
	[key: string]: string | boolean | undefined;
}

type AnytdfThemePlugin = {
	(options?: ThemeOptions): {
		handler: (api: ThemePluginApi) => void;
		config?: object;
	};
	__isOptionsFunction: true;
};

/**
 * ANYTDF 主题 Tailwind CSS 插件
 * ANYTDF Theme Tailwind CSS Plugin
 *
 * 功能 / Features:
 * - 支持 42 套内置主题 / Supports 42 built-in themes
 * - 支持自定义主题 / Supports custom themes
 * - 自动生成 primary 和 dark 的 50-950 色阶 / Auto-generates 50-950 color scales for primary and dark
 * - 通过 data-theme 属性切换主题 / Switch themes via data-theme attribute
 *
 * @example
 * // 使用单个内置主题 / Use single built-in theme
 * @plugin "<framework>/theme" { name: "ANYTDF"; }
 *
 * // 使用多个内置主题 / Use multiple built-in themes
 * @plugin "<framework>/theme" { name: "ANYTDF, Ocean, Forest"; }
 *
 * // 使用所有内置主题 / Use all built-in themes
 * @plugin "<framework>/theme" { all: true; }
 */
const anytdfThemePlugin = createPlugin.withOptions<ThemeOptions | undefined>(
	(options = {}) => {
		return ({ addBase }) => {
			const includeRadius = options.includeRadius !== false; // 默认包含圆角 / Default includes radius

			// 如果设置了 all: true，生成所有内置主题 / If all: true, generate all built-in themes
			if (options.all === true) {
				for (const theme of builtInThemes) {
					const cssVars = generateThemeCssVars(theme, includeRadius);
					addBase({
						[`[data-theme="${theme.name}"]`]: cssVars
					});
				}
				return;
			}

			const themeName = options.name || 'ANYTDF';

			// 支持逗号分隔的多个主题名称 / Support comma-separated multiple theme names
			const themeNames = themeName
				.split(',')
				.map((n) => n.trim())
				.filter((n) => n);

			// 如果有多个主题名称，生成每个主题 / If multiple theme names, generate each theme
			if (themeNames.length > 1) {
				for (const name of themeNames) {
					const builtInTheme = builtInThemes.find((t) => t.name.toLowerCase() === name.toLowerCase());
					if (builtInTheme) {
						const cssVars = generateThemeCssVars(builtInTheme, includeRadius);
						addBase({
							[`[data-theme="${builtInTheme.name}"]`]: cssVars
						});
					}
				}
				return;
			}

			// 单个主题处理 / Single theme processing
			const builtInTheme = builtInThemes.find((t) => t.name.toLowerCase() === themeName.toLowerCase());

			let cssVars: Record<string, string> = {};

			if (builtInTheme) {
				// 使用内置主题 / Use built-in theme
				cssVars = generateThemeCssVars(builtInTheme, includeRadius);
			} else {
				// 自定义主题 - 从 options 中提取 CSS 变量 / Custom theme - extract CSS variables from options
				const primaryColor = (options['color-primary'] || options['--color-primary']) as string | undefined;
				const darkColor = (options['color-dark'] || options['--color-dark']) as string | undefined;

				// 如果提供了基础色，生成 50-950 色阶 / If base colors provided, generate 50-950 scale
				if (primaryColor && darkColor) {
					const primaryScale = generateColorScale(primaryColor);
					cssVars['--color-primary-50'] = primaryScale[50];
					cssVars['--color-primary-100'] = primaryScale[100];
					cssVars['--color-primary-200'] = primaryScale[200];
					cssVars['--color-primary-300'] = primaryScale[300];
					cssVars['--color-primary-400'] = primaryScale[400];
					cssVars['--color-primary-500'] = primaryScale[500];
					cssVars['--color-primary'] = primaryScale[600];
					cssVars['--color-primary-700'] = primaryScale[700];
					cssVars['--color-primary-800'] = primaryScale[800];
					cssVars['--color-primary-900'] = primaryScale[900];
					cssVars['--color-primary-950'] = primaryScale[950];

					const darkScale = generateColorScale(darkColor);
					cssVars['--color-dark-50'] = darkScale[50];
					cssVars['--color-dark-100'] = darkScale[100];
					cssVars['--color-dark-200'] = darkScale[200];
					cssVars['--color-dark-300'] = darkScale[300];
					cssVars['--color-dark-400'] = darkScale[400];
					cssVars['--color-dark-500'] = darkScale[500];
					cssVars['--color-dark'] = darkScale[600];
					cssVars['--color-dark-700'] = darkScale[700];
					cssVars['--color-dark-800'] = darkScale[800];
					cssVars['--color-dark-900'] = darkScale[900];
					cssVars['--color-dark-950'] = darkScale[950];
				}

				// 从 options 中提取其他 CSS 变量 / Extract other CSS variables from options
				for (const [key, value] of Object.entries(options)) {
					if (key === 'name' || key === 'includeRadius' || key === 'all' || value === undefined || typeof value === 'boolean') continue;
					if (key === 'built-in-icon-library') continue;
					if (key === 'color-primary' || key === '--color-primary' || key === 'color-dark' || key === '--color-dark') continue;

					if (key.startsWith('--')) {
						cssVars[key] = value as string;
					} else if (
						key.startsWith('color-') ||
						key.startsWith('radius-') ||
						key.startsWith('font-') ||
						key.startsWith('spacing-') ||
						key.startsWith('shadow-') ||
						key.startsWith('animate-') ||
						key.startsWith('transition-') ||
						key.startsWith('ease-') ||
						key.startsWith('breakpoint-') ||
						key.startsWith('container-')
					) {
						cssVars[`--${key}`] = value as string;
					}
				}
			}

			if (Object.keys(cssVars).length > 0) {
				addBase({
					[`[data-theme="${themeName}"]`]: cssVars
				});
			}
		};
	},
	() => ({})
) as AnytdfThemePlugin;

/**
 * 导出内置主题列表，方便外部使用
 * Export built-in themes list for external use
 *
 * @example
 * import { themes } from '<framework>/theme';
 * console.log(themes.map(t => t.name)); // ['ANYTDF', 'Nintendo', ...]
 */
export const themes = builtInThemes;
export type { ThemeConfig, ThemeOptions };
export default anytdfThemePlugin;
