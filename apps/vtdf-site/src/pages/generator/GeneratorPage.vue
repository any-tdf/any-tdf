<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import ColorPickerButton from './ColorPickerButton.vue';
import { appState } from '../../store/appStore';
import {
	defaultThemeName,
	evaluateColorContrast,
	generateRandomOklchColor,
	generateThemeBlack,
	generateThemeWhite,
	normalizeThemeName,
	oklchToHex,
	oklchToRgb,
	type WCAGLevel
} from '../../utils';
import GeneratorPreview from './GeneratorPreview.vue';
import hljs from 'highlight.js';
import { getContrastRatio, oklchStrToHex, parseOklch } from 'vtdf/utils';
import { generateColorScale, themes as vtdfThemes } from 'vtdf/theme';
import {
	builtInIconLibraryLabelMap,
	builtInIconLibraryList,
	defaultBuiltInIconLibrary,
	type BuiltInIconLibrary
} from '@any-tdf/common/svg';
import { themeLabels } from '../../data/homeData';

const isZh = computed(() => appState.lang === 'zh_CN');

type OklchColor = { l: number; c: number; h: number };

// 默认主题色值
const defaultTheme = {
	primary: 'oklch(0.467 0.296 264.886)',
	dark: 'oklch(0.845 0.153 80.597)',
	success: 'oklch(0.704 0.142 167.084)',
	warning: 'oklch(0.558 0.154 47.186)',
	error: 'oklch(0.564 0.223 28.46)',
	info: 'oklch(0.482 0.14 261.518)',
	builtInIconLibrary: defaultBuiltInIconLibrary,
	extend: [
		{ color: 'oklch(0.6 0.2 250)', alias: 'blue' },
		{ color: 'oklch(0.6 0.2 300)', alias: 'purple' },
		{ color: 'oklch(0.7 0.18 50)', alias: 'orange' },
		{ color: 'oklch(0.7 0.15 190)', alias: 'cyan' }
	]
};

// 从 VTDF 导入的内置主题配置
type BuiltInIconThemeConfig = {
	'built-in-icon-library'?: BuiltInIconLibrary;
};

const builtInThemes: Record<
	string,
	{
		primaryColor: string;
		darkColor: string;
		successColor: string;
		warningColor: string;
		errorColor: string;
		infoColor: string;
		radiusBox: string;
		radiusForm: string;
		radiusSmall: string;
		builtInIconLibrary: BuiltInIconLibrary;
		// 背景色和文字色
		bgBase: string;
		bgSurface: string;
		bgOverlay: string;
		bgHighlight: string;
		bgBaseDark: string;
		bgSurfaceDark: string;
		bgOverlayDark: string;
		bgHighlightDark: string;
		textPrimary: string;
		textDark: string;
		textOnPrimary: string;
		textOnDark: string;
	}
> = Object.fromEntries(
	vtdfThemes.map((t) => [
		t.name,
		{
			primaryColor: t['color-primary'],
			darkColor: t['color-dark'],
			successColor: t['color-success'],
			warningColor: t['color-warning'],
			errorColor: t['color-error'],
			infoColor: t['color-info'],
			radiusBox: t['radius-box'],
			radiusForm: t['radius-form'],
			radiusSmall: t['radius-small'],
			builtInIconLibrary: (t as BuiltInIconThemeConfig)['built-in-icon-library'] || defaultBuiltInIconLibrary,
			// 背景色和文字色
			bgBase: t['color-bg-base'],
			bgSurface: t['color-bg-surface'],
			bgOverlay: t['color-bg-overlay'],
			bgHighlight: t['color-bg-highlight'],
			bgBaseDark: t['color-bg-base-dark'],
			bgSurfaceDark: t['color-bg-surface-dark'],
			bgOverlayDark: t['color-bg-overlay-dark'],
			bgHighlightDark: t['color-bg-highlight-dark'],
			textPrimary: t['color-text-primary'],
			textDark: t['color-text-dark'],
			textOnPrimary: t['color-text-on-primary'],
			textOnDark: t['color-text-on-dark']
		}
	])
);

// 主题名称中英文映射 - 使用从 homeData 导入的 themeLabels
const themeNameMap = themeLabels;

const activeTab = ref<'palette' | 'preview'>('preview');
const previewDark = ref(false); // 预览区域的亮暗模式
const cachedThemes = ref<CachedTheme[]>([]);
const selectedCachedTheme = ref<string | null>(null); // 当前选中的缓存主题
const cacheWarning = ref('');
let appliedSiteThemeName = normalizeThemeName(localStorage.getItem('theme_color'));

// 设置站点亮暗模式（data-mode 与 localStorage 由 App.vue 的 watcher 统一更新）
const setSiteMode = (isDark: boolean) => {
	appState.themeMode = isDark ? 'dark' : 'light';
};

// 缓存主题类型定义
type CachedTheme = {
	name: string;
	primaryOklch: OklchColor;
	darkOklch: OklchColor;
	successOklch: OklchColor;
	warningOklch: OklchColor;
	errorOklch: OklchColor;
	infoOklch: OklchColor;
	bgBaseOklch: OklchColor;
	bgSurfaceOklch: OklchColor;
	bgOverlayOklch: OklchColor;
	bgHighlightOklch: OklchColor;
	bgBaseDarkOklch: OklchColor;
	bgSurfaceDarkOklch: OklchColor;
	bgOverlayDarkOklch: OklchColor;
	bgHighlightDarkOklch: OklchColor;
	textLightOklch: OklchColor;
	textDarkOklch: OklchColor;
	textOnPrimaryLightOklch: OklchColor;
	textOnPrimaryDarkOklch: OklchColor;
	boxRadius: string;
	formRadius: string;
	smallRadius: string;
	builtInIconLibrary: BuiltInIconLibrary;
	extendList: Array<{ color: string; alias: string; hex: string }>;
	primaryColor: string;
	darkColor: string;
	bgLightColor: string;
	bgDarkColor: string;
};

// 将颜色解析为 oklch 对象 { l, c, h }
const parseOklchObj = (color: string) => {
	const parsed = parseOklch(color);
	return {
		l: parsed?.l ?? 0.5,
		c: parsed?.c ?? 0.15,
		h: parsed?.h ?? 250
	};
};

// 将 oklch 对象转换为 oklch 字符串
const oklchObjToStr = (obj: OklchColor) => {
	return `oklch(${+obj.l.toFixed(3)} ${+obj.c.toFixed(3)} ${+obj.h.toFixed(3)})`;
};

const formatScaleColor = (color: string) => {
	const parsed = parseOklch(color);
	return parsed ? oklchObjToStr(parsed) : color;
};

const getContrastTextColor = (color: string) => {
	const background = parseOklch(color);
	if (!background) return '#000';
	const black = { l: 0.08, c: 0, h: 0 };
	const white = { l: 0.98, c: 0, h: 0 };
	const blackRatio = getContrastRatio(black, background);
	const whiteRatio = getContrastRatio(white, background);
	return blackRatio >= whiteRatio ? '#000' : '#fff';
};

const buildScaleList = (baseColor: string) => {
	const scale = generateColorScale(baseColor);
	return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => formatScaleColor(scale[step]));
};

// 使用 extendList 返回 extendListStr
const extendListStrFunc = (list: { color: string; alias: string }[]) => {
	let extendListStr = '	{';
	list.forEach((item) => {
		extendListStr += `
			color: '${item.color}', // ${oklchToHex(item.color)} ${oklchToRgb(item.color)}
			alias: "${item.alias}",
		},`;
		extendListStr += `
		{`;
	});
	// 如果 extendListStr 最后一个是换行符，则删除换行
	extendListStr = extendListStr.slice(0, extendListStr.lastIndexOf('\n'));
	return extendListStr;
};

// 使用 extendList 返回 extendListStr2
const extendListStrFunc2 = (list: { color: string; alias: string }[]) => {
	let extendListStr = '';
	list.forEach((item) => {
		extendListStr += `	--color-${item.alias}: ${item.color}; /* ${oklchToHex(item.color)} ${oklchToRgb(item.color)} */
`;
	});
	// 如果 extendListStr 最后一个是换行符，则删除换行
	extendListStr = extendListStr.slice(0, extendListStr.lastIndexOf('\n'));
	return extendListStr;
};

const currentColorObj = {
	name: '',
	color: {
		primary: { default: defaultTheme.primary },
		dark: { default: defaultTheme.dark },
		functional: { success: '', warning: '', error: '', info: '' },
		extend: [{ color: '', alias: '' }]
	}
};
const primaryColors = ref<{ oklch: string; n: number }[]>([]);
const darkColors = ref<{ oklch: string; n: number }[]>([]);
const themeBlack = ref({
	primary: '',
	dark: ''
});
const themeWhite = ref({
	primary: '',
	dark: ''
});
const stateColor = ref({ success: '', warning: '', error: '', info: '' });

// 对比度评分状态
const primaryContrast = ref({ ratio: 0, level: 'Fail' as WCAGLevel, score: 0 });
const darkContrast = ref({ ratio: 0, level: 'Fail' as WCAGLevel, score: 0 });
const extendList = ref<{ color: string; alias: string; hex: string }[]>(
	defaultTheme.extend.map((item) => ({
		...item,
		hex: oklchStrToHex(item.color)
	}))
);

// 扩展色的 OKLCH 状态
const extendOklchList = ref<OklchColor[]>(defaultTheme.extend.map((item) => parseOklchObj(item.color)));

// 圆角配置 - 三类圆角，每类可选值不同
// 基本 10 个值：none(0), xs(0.125rem), sm(0.25rem), md(0.375rem), lg(0.5rem), xl(0.75rem), 2xl(1rem), 3xl(1.5rem), 4xl(2rem), full
// 容器类：不要 xs 和 full
const boxRadiusOptions = [
	{ value: '0', label: '0' },
	{ value: '0.25rem', label: '0.25' },
	{ value: '0.375rem', label: '0.375' },
	{ value: '0.5rem', label: '0.5' },
	{ value: '0.75rem', label: '0.75' },
	{ value: '1rem', label: '1' },
	{ value: '1.5rem', label: '1.5' },
	{ value: '2rem', label: '2' }
] as const;

// 表单类：不要 xs 和 4xl
const formRadiusOptions = [
	{ value: '0', label: '0' },
	{ value: '0.25rem', label: '0.25' },
	{ value: '0.375rem', label: '0.375' },
	{ value: '0.5rem', label: '0.5' },
	{ value: '0.75rem', label: '0.75' },
	{ value: '1rem', label: '1' },
	{ value: '1.5rem', label: '1.5' },
	{ value: 'calc(infinity * 1px)', label: 'full' }
] as const;

// 小型控件类：不要 xs 和 4xl
const smallRadiusOptions = [
	{ value: '0', label: '0' },
	{ value: '0.25rem', label: '0.25' },
	{ value: '0.375rem', label: '0.375' },
	{ value: '0.5rem', label: '0.5' },
	{ value: '0.75rem', label: '0.75' },
	{ value: '1rem', label: '1' },
	{ value: '1.5rem', label: '1.5' },
	{ value: 'calc(infinity * 1px)', label: 'full' }
] as const;

const getRadiusPreview = (value: string) => (value.includes('infinity') ? '9999px' : value);

// 三类圆角状态
const boxRadius = ref('0.5rem'); // 容器类默认值
const formRadius = ref('0.25rem'); // 表单类默认值
const smallRadius = ref('calc(infinity * 1px)'); // 小型控件类默认值
const builtInIconLibrary = ref<BuiltInIconLibrary>(defaultTheme.builtInIconLibrary);

// 背景色配置 - 亮色模式
const bgBaseOklch = ref<OklchColor>({ l: 1, c: 0, h: 0 });
const bgSurfaceOklch = ref<OklchColor>({ l: 0.98, c: 0, h: 0 });
const bgOverlayOklch = ref<OklchColor>({ l: 0.99, c: 0, h: 0 });

// 背景色配置 - 暗色模式
const bgBaseDarkOklch = ref<OklchColor>({ l: 0.15, c: 0, h: 0 });
const bgSurfaceDarkOklch = ref<OklchColor>({ l: 0.2, c: 0, h: 0 });
const bgOverlayDarkOklch = ref<OklchColor>({ l: 0.12, c: 0, h: 0 });

// 高亮背景色配置（用于 Tab 选中项、键盘按键、Switch 滑块等）
// Highlight background color (for Tab active item, keyboard keys, Switch slider, etc.)
const bgHighlightOklch = ref<OklchColor>({ l: 0.99, c: 0, h: 0 }); // 亮色模式偏白
const bgHighlightDarkOklch = ref<OklchColor>({ l: 0.08, c: 0, h: 0 }); // 暗色模式偏黑

// 文字色配置
const textLightOklch = ref<OklchColor>({ l: 0.15, c: 0, h: 0 });
const textDarkOklch = ref<OklchColor>({ l: 0.95, c: 0, h: 0 });
const textOnPrimaryLightOklch = ref<OklchColor>({ l: 1, c: 0, h: 0 });
const textOnPrimaryDarkOklch = ref<OklchColor>({ l: 0.1, c: 0, h: 0 });

// 颜色的 oklch 值
const primaryOklch = ref<OklchColor>(parseOklchObj(defaultTheme.primary));
const darkOklch = ref<OklchColor>(parseOklchObj(defaultTheme.dark));
const successOklch = ref<OklchColor>(parseOklchObj(defaultTheme.success));
const warningOklch = ref<OklchColor>(parseOklchObj(defaultTheme.warning));
const errorOklch = ref<OklchColor>(parseOklchObj(defaultTheme.error));
const infoOklch = ref<OklchColor>(parseOklchObj(defaultTheme.info));

// OklchPicker 变化时触发
const onPrimaryOklchChange = (color: OklchColor, hex: string) => {
	currentColorObj.color.primary.default = hex;
	generateFunc();
};

const onDarkOklchChange = (color: OklchColor, hex: string) => {
	currentColorObj.color.dark.default = hex;
	generateFunc();
};

// 功能色变更处理函数
const onFunctionalColorChange = (type: 'success' | 'warning' | 'error' | 'info', color: OklchColor) => {
	const oklchStr = oklchObjToStr(color);
	currentColorObj.color.functional[type] = oklchStr;
	stateColor.value[type] = oklchStr;
};

const onSuccessOklchChange = (color: OklchColor) => {
	onFunctionalColorChange('success', color);
};

const onWarningOklchChange = (color: OklchColor) => {
	onFunctionalColorChange('warning', color);
};

const onErrorOklchChange = (color: OklchColor) => {
	onFunctionalColorChange('error', color);
};

const onInfoOklchChange = (color: OklchColor) => {
	onFunctionalColorChange('info', color);
};

const defaultBuiltInTheme = builtInThemes[defaultThemeName] ?? Object.values(builtInThemes)[0];

const getBuiltInTheme = (themeName: string) => builtInThemes[normalizeThemeName(themeName)] ?? defaultBuiltInTheme;

const name = ref(defaultThemeName);
const showCopyTip = ref(false);
const showCopyTip2 = ref(false);
const extendListStr = computed(() => extendListStrFunc(extendList.value));

const extendListStr2 = computed(() => extendListStrFunc2(extendList.value));

// 生成预览区域的内联样式（包含所有 CSS 变量）
const previewStyle = computed(() => {
	let style = '';
	// 主题色梯度
	primaryColors.value.forEach((item) => {
		style += `${item.n === 600 ? '--color-primary' : `--color-primary-${item.n}`}: ${item.oklch};`;
	});
	darkColors.value.forEach((item) => {
		style += `${item.n === 600 ? '--color-dark' : `--color-dark-${item.n}`}: ${item.oklch};`;
	});
	// 功能色
	style += `--color-success: ${stateColor.value.success};`;
	style += `--color-warning: ${stateColor.value.warning};`;
	style += `--color-error: ${stateColor.value.error};`;
	style += `--color-info: ${stateColor.value.info};`;
	// 背景色
	style += `--color-bg-base: ${oklchObjToStr(bgBaseOklch.value)};`;
	style += `--color-bg-surface: ${oklchObjToStr(bgSurfaceOklch.value)};`;
	style += `--color-bg-overlay: ${oklchObjToStr(bgOverlayOklch.value)};`;
	style += `--color-bg-highlight: ${oklchObjToStr(bgHighlightOklch.value)};`;
	style += `--color-bg-base-dark: ${oklchObjToStr(bgBaseDarkOklch.value)};`;
	style += `--color-bg-surface-dark: ${oklchObjToStr(bgSurfaceDarkOklch.value)};`;
	style += `--color-bg-overlay-dark: ${oklchObjToStr(bgOverlayDarkOklch.value)};`;
	style += `--color-bg-highlight-dark: ${oklchObjToStr(bgHighlightDarkOklch.value)};`;
	// 文字色
	style += `--color-text-primary: ${oklchObjToStr(textLightOklch.value)};`;
	style += `--color-text-dark: ${oklchObjToStr(textDarkOklch.value)};`;
	style += `--color-text-on-primary: ${oklchObjToStr(textOnPrimaryLightOklch.value)};`;
	style += `--color-text-on-dark: ${oklchObjToStr(textOnPrimaryDarkOklch.value)};`;
	// 圆角
	style += `--radius-box: ${boxRadius.value};`;
	style += `--radius-form: ${formRadius.value};`;
	style += `--radius-small: ${smallRadius.value};`;
	return style;
});

const configStr = computed(
	() =>
		hljs.highlight(
			`/* ${isZh.value ? '主题配置 - 放入项目 CSS 文件，当 HTML 的 data-theme="' + name.value + '" 即生效' : 'Theme config - Add to CSS file, add data-theme="' + name.value + '" to HTML'} */
/* ${isZh.value ? 'primary 和 dark 只需传入基础色，插件自动计算 50-950 梯度' : 'For primary and dark, just provide base colors, plugin auto-calculates 50-950 gradients'} */
@plugin "vtdf/theme" {
	name: "${name.value}";

	color-primary: ${primaryColors.value[6]?.oklch}; /* ${oklchToHex(primaryColors.value[6]?.oklch || '')} ${oklchToRgb(primaryColors.value[6]?.oklch || '')} */
	color-dark: ${darkColors.value[6]?.oklch}; /* ${oklchToHex(darkColors.value[6]?.oklch || '')} ${oklchToRgb(darkColors.value[6]?.oklch || '')} */

	color-bg-base: ${oklchObjToStr(bgBaseOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgBaseOklch.value))} ${oklchToRgb(oklchObjToStr(bgBaseOklch.value))} */
	color-bg-surface: ${oklchObjToStr(bgSurfaceOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgSurfaceOklch.value))} ${oklchToRgb(oklchObjToStr(bgSurfaceOklch.value))} */
	color-bg-overlay: ${oklchObjToStr(bgOverlayOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgOverlayOklch.value))} ${oklchToRgb(oklchObjToStr(bgOverlayOklch.value))} */
	color-bg-highlight: ${oklchObjToStr(bgHighlightOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgHighlightOklch.value))} ${oklchToRgb(oklchObjToStr(bgHighlightOklch.value))} */
	color-bg-base-dark: ${oklchObjToStr(bgBaseDarkOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgBaseDarkOklch.value))} ${oklchToRgb(oklchObjToStr(bgBaseDarkOklch.value))} */
	color-bg-surface-dark: ${oklchObjToStr(bgSurfaceDarkOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgSurfaceDarkOklch.value))} ${oklchToRgb(oklchObjToStr(bgSurfaceDarkOklch.value))} */
	color-bg-overlay-dark: ${oklchObjToStr(bgOverlayDarkOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgOverlayDarkOklch.value))} ${oklchToRgb(oklchObjToStr(bgOverlayDarkOklch.value))} */
	color-bg-highlight-dark: ${oklchObjToStr(bgHighlightDarkOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgHighlightDarkOklch.value))} ${oklchToRgb(oklchObjToStr(bgHighlightDarkOklch.value))} */

	color-text-primary: ${oklchObjToStr(textLightOklch.value)}; /* ${oklchToHex(oklchObjToStr(textLightOklch.value))} ${oklchToRgb(oklchObjToStr(textLightOklch.value))} */
	color-text-dark: ${oklchObjToStr(textDarkOklch.value)}; /* ${oklchToHex(oklchObjToStr(textDarkOklch.value))} ${oklchToRgb(oklchObjToStr(textDarkOklch.value))} */
	color-text-on-primary: ${oklchObjToStr(textOnPrimaryLightOklch.value)}; /* ${oklchToHex(oklchObjToStr(textOnPrimaryLightOklch.value))} ${oklchToRgb(oklchObjToStr(textOnPrimaryLightOklch.value))} */
	color-text-on-dark: ${oklchObjToStr(textOnPrimaryDarkOklch.value)}; /* ${oklchToHex(oklchObjToStr(textOnPrimaryDarkOklch.value))} ${oklchToRgb(oklchObjToStr(textOnPrimaryDarkOklch.value))} */

	color-success: ${stateColor.value.success}; /* ${oklchToHex(stateColor.value.success)} ${oklchToRgb(stateColor.value.success)} */
	color-warning: ${stateColor.value.warning}; /* ${oklchToHex(stateColor.value.warning)} ${oklchToRgb(stateColor.value.warning)} */
	color-error: ${stateColor.value.error}; /* ${oklchToHex(stateColor.value.error)} ${oklchToRgb(stateColor.value.error)} */
	color-info: ${stateColor.value.info}; /* ${oklchToHex(stateColor.value.info)} ${oklchToRgb(stateColor.value.info)} */

	radius-box: ${boxRadius.value};
	radius-form: ${formRadius.value};
	radius-small: ${smallRadius.value};

	built-in-icon-library: ${builtInIconLibrary.value};
}`,
			{ language: 'css', ignoreIllegals: true }
		).value
);

const configStr2 = computed(
	() =>
		hljs.highlight(
			`/* ${isZh.value ? '初始主题 CSS 变量' : 'Initial theme CSS variables'} */
@theme {
	--color-primary-50: ${primaryColors.value[0]?.oklch || ''}; /* ${oklchToHex(primaryColors.value[0]?.oklch || '')} ${oklchToRgb(primaryColors.value[0]?.oklch || '')} */
	--color-primary-100: ${primaryColors.value[1]?.oklch || ''}; /* ${oklchToHex(primaryColors.value[1]?.oklch || '')} ${oklchToRgb(primaryColors.value[1]?.oklch || '')} */
	--color-primary-200: ${primaryColors.value[2]?.oklch || ''}; /* ${oklchToHex(primaryColors.value[2]?.oklch || '')} ${oklchToRgb(primaryColors.value[2]?.oklch || '')} */
	--color-primary-300: ${primaryColors.value[3]?.oklch || ''}; /* ${oklchToHex(primaryColors.value[3]?.oklch || '')} ${oklchToRgb(primaryColors.value[3]?.oklch || '')} */
	--color-primary-400: ${primaryColors.value[4]?.oklch || ''}; /* ${oklchToHex(primaryColors.value[4]?.oklch || '')} ${oklchToRgb(primaryColors.value[4]?.oklch || '')} */
	--color-primary-500: ${primaryColors.value[5]?.oklch || ''}; /* ${oklchToHex(primaryColors.value[5]?.oklch || '')} ${oklchToRgb(primaryColors.value[5]?.oklch || '')} */
	--color-primary: ${primaryColors.value[6]?.oklch || ''}; /* ${oklchToHex(primaryColors.value[6]?.oklch || '')} ${oklchToRgb(primaryColors.value[6]?.oklch || '')} */
	--color-primary-700: ${primaryColors.value[7]?.oklch || ''}; /* ${oklchToHex(primaryColors.value[7]?.oklch || '')} ${oklchToRgb(primaryColors.value[7]?.oklch || '')} */
	--color-primary-800: ${primaryColors.value[8]?.oklch || ''}; /* ${oklchToHex(primaryColors.value[8]?.oklch || '')} ${oklchToRgb(primaryColors.value[8]?.oklch || '')} */
	--color-primary-900: ${primaryColors.value[9]?.oklch || ''}; /* ${oklchToHex(primaryColors.value[9]?.oklch || '')} ${oklchToRgb(primaryColors.value[9]?.oklch || '')} */
	--color-primary-950: ${primaryColors.value[10]?.oklch || ''}; /* ${oklchToHex(primaryColors.value[10]?.oklch || '')} ${oklchToRgb(primaryColors.value[10]?.oklch || '')} */

	--color-dark-50: ${darkColors.value[0]?.oklch || ''}; /* ${oklchToHex(darkColors.value[0]?.oklch || '')} ${oklchToRgb(darkColors.value[0]?.oklch || '')} */
	--color-dark-100: ${darkColors.value[1]?.oklch || ''}; /* ${oklchToHex(darkColors.value[1]?.oklch || '')} ${oklchToRgb(darkColors.value[1]?.oklch || '')} */
	--color-dark-200: ${darkColors.value[2]?.oklch || ''}; /* ${oklchToHex(darkColors.value[2]?.oklch || '')} ${oklchToRgb(darkColors.value[2]?.oklch || '')} */
	--color-dark-300: ${darkColors.value[3]?.oklch || ''}; /* ${oklchToHex(darkColors.value[3]?.oklch || '')} ${oklchToRgb(darkColors.value[3]?.oklch || '')} */
	--color-dark-400: ${darkColors.value[4]?.oklch || ''}; /* ${oklchToHex(darkColors.value[4]?.oklch || '')} ${oklchToRgb(darkColors.value[4]?.oklch || '')} */
	--color-dark-500: ${darkColors.value[5]?.oklch || ''}; /* ${oklchToHex(darkColors.value[5]?.oklch || '')} ${oklchToRgb(darkColors.value[5]?.oklch || '')} */
	--color-dark: ${darkColors.value[6]?.oklch || ''}; /* ${oklchToHex(darkColors.value[6]?.oklch || '')} ${oklchToRgb(darkColors.value[6]?.oklch || '')} */
	--color-dark-700: ${darkColors.value[7]?.oklch || ''}; /* ${oklchToHex(darkColors.value[7]?.oklch || '')} ${oklchToRgb(darkColors.value[7]?.oklch || '')} */
	--color-dark-800: ${darkColors.value[8]?.oklch || ''}; /* ${oklchToHex(darkColors.value[8]?.oklch || '')} ${oklchToRgb(darkColors.value[8]?.oklch || '')} */
	--color-dark-900: ${darkColors.value[9]?.oklch || ''}; /* ${oklchToHex(darkColors.value[9]?.oklch || '')} ${oklchToRgb(darkColors.value[9]?.oklch || '')} */
	--color-dark-950: ${darkColors.value[10]?.oklch || ''}; /* ${oklchToHex(darkColors.value[10]?.oklch || '')} ${oklchToRgb(darkColors.value[10]?.oklch || '')} */

	--color-black: oklch(0 0 0); /* #000000 rgb(0, 0, 0) */
	--color-white: oklch(1 0 0); /* #FFFFFF rgb(255, 255, 255) */
	--color-gray-50: oklch(0.961 0 0); /* #F5F5F5 rgb(245, 245, 245) */
	--color-gray-100: oklch(0.925 0 0); /* #E8E8E8 rgb(232, 232, 232) */
	--color-gray-200: oklch(0.845 0 0); /* #D1D1D1 rgb(209, 209, 209) */
	--color-gray-300: oklch(0.767 0 0); /* #B8B8B8 rgb(184, 184, 184) */
	--color-gray-400: oklch(0.683 0 0); /* #9E9E9E rgb(158, 158, 158) */
	--color-gray-500: oklch(0.6 0 0); /* #858585 rgb(133, 133, 133) */
	--color-gray-600: oklch(0.51 0 0); /* #6B6B6B rgb(107, 107, 107) */
	--color-gray-700: oklch(0.42 0 0); /* #525252 rgb(82, 82, 82) */
	--color-gray-800: oklch(0.321 0 0); /* #383838 rgb(56, 56, 56) */
	--color-gray-900: oklch(0.218 0 0); /* #1F1F1F rgb(31, 31, 31) */
	--color-gray-950: oklch(0.159 0 0); /* #121212 rgb(18, 18, 18) */
	--color-transparent: transparent;

	--color-bg-base: ${oklchObjToStr(bgBaseOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgBaseOklch.value))} ${oklchToRgb(oklchObjToStr(bgBaseOklch.value))} */
	--color-bg-surface: ${oklchObjToStr(bgSurfaceOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgSurfaceOklch.value))} ${oklchToRgb(oklchObjToStr(bgSurfaceOklch.value))} */
	--color-bg-overlay: ${oklchObjToStr(bgOverlayOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgOverlayOklch.value))} ${oklchToRgb(oklchObjToStr(bgOverlayOklch.value))} */
	--color-bg-highlight: ${oklchObjToStr(bgHighlightOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgHighlightOklch.value))} ${oklchToRgb(oklchObjToStr(bgHighlightOklch.value))} */
	--color-bg-base-dark: ${oklchObjToStr(bgBaseDarkOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgBaseDarkOklch.value))} ${oklchToRgb(oklchObjToStr(bgBaseDarkOklch.value))} */
	--color-bg-surface-dark: ${oklchObjToStr(bgSurfaceDarkOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgSurfaceDarkOklch.value))} ${oklchToRgb(oklchObjToStr(bgSurfaceDarkOklch.value))} */
	--color-bg-overlay-dark: ${oklchObjToStr(bgOverlayDarkOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgOverlayDarkOklch.value))} ${oklchToRgb(oklchObjToStr(bgOverlayDarkOklch.value))} */
	--color-bg-highlight-dark: ${oklchObjToStr(bgHighlightDarkOklch.value)}; /* ${oklchToHex(oklchObjToStr(bgHighlightDarkOklch.value))} ${oklchToRgb(oklchObjToStr(bgHighlightDarkOklch.value))} */

	--color-text-primary: ${oklchObjToStr(textLightOklch.value)}; /* ${oklchToHex(oklchObjToStr(textLightOklch.value))} ${oklchToRgb(oklchObjToStr(textLightOklch.value))} */
	--color-text-dark: ${oklchObjToStr(textDarkOklch.value)}; /* ${oklchToHex(oklchObjToStr(textDarkOklch.value))} ${oklchToRgb(oklchObjToStr(textDarkOklch.value))} */
	--color-text-on-primary: ${oklchObjToStr(textOnPrimaryLightOklch.value)}; /* ${oklchToHex(oklchObjToStr(textOnPrimaryLightOklch.value))} ${oklchToRgb(oklchObjToStr(textOnPrimaryLightOklch.value))} */
	--color-text-on-dark: ${oklchObjToStr(textOnPrimaryDarkOklch.value)}; /* ${oklchToHex(oklchObjToStr(textOnPrimaryDarkOklch.value))} ${oklchToRgb(oklchObjToStr(textOnPrimaryDarkOklch.value))} */

	--color-success: ${stateColor.value.success}; /* ${oklchToHex(stateColor.value.success)} ${oklchToRgb(stateColor.value.success)} */
	--color-warning: ${stateColor.value.warning}; /* ${oklchToHex(stateColor.value.warning)} ${oklchToRgb(stateColor.value.warning)} */
	--color-error: ${stateColor.value.error}; /* ${oklchToHex(stateColor.value.error)} ${oklchToRgb(stateColor.value.error)} */
	--color-info: ${stateColor.value.info}; /* ${oklchToHex(stateColor.value.info)} ${oklchToRgb(stateColor.value.info)} */

${extendListStr2.value}

	--radius-box: ${boxRadius.value};
	--radius-form: ${formRadius.value};
	--radius-small: ${smallRadius.value};
}
`,
			{ language: 'css', ignoreIllegals: true }
		).value
);

/**
 * 统一生成颜色梯度
 * 根据当前主题的 primary 和 dark 颜色生成完整的梯度色板
 * 每个色板包含 11 个颜色（50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950）
 */
const generateFunc = () => {
	// 使用 VTDF 主题算法生成梯度色板
	const primaryColorList = buildScaleList(oklchObjToStr(primaryOklch.value));
	const darkColorList = buildScaleList(oklchObjToStr(darkOklch.value));

	// 添加 n（色号）
	// n 值：50, 100, 200, 300, 400, 500, 600 (默认), 700, 800, 900, 950
	const scaleSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
	primaryColors.value = primaryColorList.map((oklch, index) => ({
		oklch,
		n: scaleSteps[index]
	}));

	darkColors.value = darkColorList.map((oklch, index) => ({
		oklch,
		n: scaleSteps[index]
	}));

	// 根据主题色生成主题黑和白（返回 oklch 字符串）
	const primaryColorB = generateThemeBlack(primaryOklch.value);
	const darkColorB = generateThemeBlack(darkOklch.value);
	// 查找 meta 标签，name="theme-color" 且 media="(prefers-color-scheme: dark)"
	const darkMeta = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]');
	// 如果找到了，就修改它的 content 属性
	if (darkMeta) {
		darkMeta.setAttribute('content', oklchToHex(darkColorB));
	}
	themeBlack.value = { primary: primaryColorB, dark: darkColorB };

	const primaryColorW = generateThemeWhite(primaryOklch.value);
	// 查找 meta 标签，name="theme-color" 且 media="(prefers-color-scheme: light)"
	const lightMeta = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]');
	// 如果找到了，就修改它的 content 属性
	if (lightMeta) {
		lightMeta.setAttribute('content', oklchToHex(primaryColorW));
	}
	const darkColorW = generateThemeWhite(darkOklch.value);
	themeWhite.value = { primary: primaryColorW, dark: darkColorW };
	stateColor.value = currentColorObj.color.functional;

	// 计算对比度评分
	// primary 在白色背景上的对比度
	const whiteBackground = { l: 1, c: 0, h: 0 };
	primaryContrast.value = evaluateColorContrast(primaryOklch.value, whiteBackground);
	// dark 在黑色背景上的对比度
	const blackBackground = { l: 0, c: 0, h: 0 };
	darkContrast.value = evaluateColorContrast(darkOklch.value, blackBackground);
};

// 随机事件
// Random event
const randomFunc = () => {
	// 清除缓存主题选中状态
	// Clear cached theme selection
	selectedCachedTheme.value = null;

	// 使用新的随机颜色生成算法
	// Use new random color generation algorithm
	// primary: 在浅色界面突出的颜色，亮度范围 L: 0.35-0.55，适合在白色背景上显示
	// primary: Color that stands out on light interface, L: 0.35-0.55, suitable for display on white background
	// dark: 在深色界面突出的颜色，亮度范围 L: 0.7-0.9，适合在黑色背景上显示
	// dark: Color that stands out on dark interface, L: 0.7-0.9, suitable for display on black background
	const randomPrimaryColor = generateRandomOklchColor('light');
	const randomDarkColor = generateRandomOklchColor('dark');

	// 主题名称固定为 "new theme"
	// Theme name fixed as "new theme"
	name.value = 'new theme';

	// 更新 primary 颜色
	// Update primary color
	primaryOklch.value = randomPrimaryColor;
	currentColorObj.color.primary.default = oklchObjToStr(randomPrimaryColor);

	// 更新 dark 颜色
	// Update dark color
	darkOklch.value = randomDarkColor;
	currentColorObj.color.dark.default = oklchObjToStr(randomDarkColor);

	generateFunc();

	// 随机生成功能色（在指定色相范围内）
	// Randomly generate functional colors (within specified hue ranges)
	// 色相范围说明 / Hue range explanation:
	// - 绿色（成功）：色相 140-160，代表积极、完成、成功 / Green (success): hue 140-160, represents positive, complete, success
	// - 橙色（警告）：色相 60-85，代表注意、提醒 / Orange (warning): hue 60-85, represents attention, reminder
	// - 红色（错误）：色相 20-40，代表错误、危险、删除 / Red (error): hue 20-40, represents error, danger, delete
	// - 蓝色（信息）：色相 240-270，代表提示、帮助信息 / Blue (info): hue 240-270, represents tips, help info
	const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
	const generateFunctionalColor = (hMin: number, hMax: number) => ({
		// L: 0.55-0.65 功能色亮度适中，在亮暗模式下都能清晰可见
		// L: 0.55-0.65 moderate lightness for functional colors, clearly visible in both light and dark modes
		l: randomInRange(0.55, 0.65),
		// C: 0.15-0.22 功能色需要较高饱和度以便醒目
		// C: 0.15-0.22 functional colors need higher chroma to be eye-catching
		c: randomInRange(0.15, 0.22),
		h: randomInRange(hMin, hMax)
	});

	successOklch.value = generateFunctionalColor(140, 160);
	warningOklch.value = generateFunctionalColor(60, 85);
	errorOklch.value = generateFunctionalColor(20, 40);
	infoOklch.value = generateFunctionalColor(240, 270);

	// 更新功能色状态
	// Update functional color state
	currentColorObj.color.functional.success = oklchObjToStr(successOklch.value);
	currentColorObj.color.functional.warning = oklchObjToStr(warningOklch.value);
	currentColorObj.color.functional.error = oklchObjToStr(errorOklch.value);
	currentColorObj.color.functional.info = oklchObjToStr(infoOklch.value);

	// 获取当前 extendList 的长度
	// Get current extendList length
	const extendListLength = extendList.value.length;
	// 随机生成扩展色
	// Randomly generate extended colors
	const generateExtendColor = () => ({
		// L: 0.5-0.7 中间亮度，确保亮暗模式都能使用
		// L: 0.5-0.7 middle lightness, ensuring usability in both light and dark modes
		l: 0.5 + Math.random() * 0.2,
		// C: 0.12-0.25 中等到较高饱和度
		// C: 0.12-0.25 medium to high chroma
		c: 0.12 + Math.random() * 0.13,
		// H: 0-360 全色相范围随机
		// H: 0-360 random across full hue range
		h: Math.random() * 360
	});
	const randomExtendColors = Array.from({ length: extendListLength }, () => generateExtendColor());
	extendList.value = randomExtendColors.map((color, index) => ({
		color: oklchObjToStr(color),
		alias: `extend${index + 1}`,
		hex: oklchToHex(oklchObjToStr(color))
	}));

	// 更新扩展色的 OKLCH 状态
	// Update extended colors OKLCH state
	extendOklchList.value = randomExtendColors;

	// 随机圆角
	// Random radius
	boxRadius.value = boxRadiusOptions[Math.floor(Math.random() * boxRadiusOptions.length)].value;
	formRadius.value = formRadiusOptions[Math.floor(Math.random() * formRadiusOptions.length)].value;
	smallRadius.value = smallRadiusOptions[Math.floor(Math.random() * smallRadiusOptions.length)].value;

	// 随机内置图标库
	// Random built-in icon library
	builtInIconLibrary.value = builtInIconLibraryList[Math.floor(Math.random() * builtInIconLibraryList.length)];

	// ==================== 随机背景色 - 亮色模式 ====================
	// ==================== Random background colors - Light mode ====================
	// L: 0.92-0.98 亮色模式背景亮度范围
	// L: 0.92-0.98 lightness range for light mode background
	// 0.92 是接近白色但带有轻微色彩的下限，0.98 是接近纯白的上限
	// 0.92 is the lower limit close to white but with slight tint, 0.98 is upper limit close to pure white
	// 这个范围确保背景足够亮，同时可以带有主题色调
	// This range ensures background is bright enough while allowing theme tint
	const baseLightness = 0.92 + Math.random() * 0.06;
	// H: 0-360 随机色相，给背景带来微妙的色彩倾向
	// H: 0-360 random hue, giving background a subtle color tendency
	const bgHue = Math.random() * 360;
	// C: 0.01-0.04 非常低的色度，保持背景近乎中性但带有轻微色彩
	// C: 0.01-0.04 very low chroma, keeping background nearly neutral with slight tint
	// 色度过高会导致背景色彩过于浓重，影响内容阅读
	// Too high chroma would make background too colorful, affecting content readability
	const bgChroma = 0.01 + Math.random() * 0.03;
	// base: 页面主背景色
	// base: Main page background
	bgBaseOklch.value = { l: baseLightness, c: bgChroma, h: bgHue };
	// surface: 卡片/容器表面色，可以比 base 更亮或更暗，形成层次感
	// surface: Card/container surface, can be lighter or darker than base for layering
	// 差值范围 0.02-0.05，随机正负方向
	// Difference range 0.02-0.05, random positive or negative direction
	const surfaceLightDiff = (0.02 + Math.random() * 0.03) * (Math.random() > 0.5 ? 1 : -1);
	// 确保 surface 亮度在合理范围内 (0.88-1.0)
	// Ensure surface lightness stays within reasonable range (0.88-1.0)
	const surfaceLightness = Math.max(0.88, Math.min(1.0, baseLightness + surfaceLightDiff));
	// H: surface 可以有 ±10-30 度的色相偏移，增加层次变化
	// H: surface can have ±10-30 degree hue offset for more layering variety
	const surfaceHueOffset = (10 + Math.random() * 20) * (Math.random() > 0.5 ? 1 : -1);
	// 色相是 0-360 的循环值，需要处理边界
	// Hue is cyclic 0-360, need to handle wraparound
	const surfaceHue = (((bgHue + surfaceHueOffset) % 360) + 360) % 360;
	bgSurfaceOklch.value = { l: surfaceLightness, c: bgChroma, h: surfaceHue };
	// overlay: 弹窗/浮层背景色，比 base 稍暗或稍亮
	// overlay: Popup/modal background, slightly darker or lighter than base
	const overlayLightDiff = (0.01 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1);
	const overlayLightness = Math.max(0.88, Math.min(1.0, baseLightness + overlayLightDiff));
	bgOverlayOklch.value = { l: overlayLightness, c: bgChroma, h: bgHue };

	// ==================== 随机背景色 - 暗色模式 ====================
	// ==================== Random background colors - Dark mode ====================
	// L: 0.12-0.22 暗色模式背景亮度范围
	// L: 0.12-0.22 lightness range for dark mode background
	// 0.12 是接近纯黑的下限，0.22 是带有可感知亮度的上限
	// 0.12 is lower limit close to pure black, 0.22 is upper limit with perceivable lightness
	// 这个范围确保背景足够暗，减少眼睛疲劳，同时不会完全漆黑
	// This range ensures background is dark enough to reduce eye strain, while not completely black
	const baseDarkLightness = 0.12 + Math.random() * 0.1;
	// H: 0-360 暗色模式可以有独立的色相
	// H: 0-360 dark mode can have independent hue
	const bgDarkHue = Math.random() * 360;
	// C: 0.01-0.04 暗色模式同样保持低色度
	// C: 0.01-0.04 dark mode also maintains low chroma
	const bgDarkChroma = 0.01 + Math.random() * 0.03;
	// base: 暗色主背景
	// base: Dark mode main background
	bgBaseDarkOklch.value = { l: baseDarkLightness, c: bgDarkChroma, h: bgDarkHue };
	// surface: 可以比 base 更亮或更暗，用于卡片等浮起元素
	// surface: Can be lighter or darker than base, for elevated elements like cards
	// 差值范围 0.05-0.1，暗色模式需要更大差值才能形成明显层次
	// Difference range 0.05-0.1, dark mode needs larger difference for visible layering
	const surfaceDarkDiff = (0.05 + Math.random() * 0.05) * (Math.random() > 0.5 ? 1 : -1);
	// 确保 surface 亮度在合理范围内 (0.05-0.35)
	// Ensure surface lightness stays within reasonable range (0.05-0.35)
	const surfaceDarkLightness = Math.max(0.05, Math.min(0.35, baseDarkLightness + surfaceDarkDiff));
	// H: 暗色 surface 也可以有 ±10-30 度的色相偏移
	// H: dark surface can also have ±10-30 degree hue offset
	const surfaceDarkHueOffset = (10 + Math.random() * 20) * (Math.random() > 0.5 ? 1 : -1);
	const surfaceDarkHue = (((bgDarkHue + surfaceDarkHueOffset) % 360) + 360) % 360;
	bgSurfaceDarkOklch.value = { l: surfaceDarkLightness, c: bgDarkChroma, h: surfaceDarkHue };
	// overlay: 比 base 稍暗或稍亮，用于遮罩后的弹窗
	// overlay: Slightly darker or lighter than base, for popups over mask
	// 差值范围 0.03-0.06
	// Difference range 0.03-0.06
	const overlayDarkDiff = (0.03 + Math.random() * 0.03) * (Math.random() > 0.5 ? 1 : -1);
	const overlayDarkLightness = Math.max(0.04, Math.min(0.3, baseDarkLightness + overlayDarkDiff));
	bgOverlayDarkOklch.value = { l: overlayDarkLightness, c: bgDarkChroma, h: bgDarkHue };

	// ==================== 随机高亮背景色 ====================
	// ==================== Random highlight background colors ====================
	// 高亮背景色用于 Tab 选中项、键盘按键、Switch 滑块、步进器等需要突出的元素
	// Highlight background for Tab active item, keyboard keys, Switch slider, Stepper, etc.
	// 亮色模式：L: 0.96-1.0 偏白，在彩色背景上突出
	// Light mode: L: 0.96-1.0, near white, stands out on colored backgrounds
	// C: 0-0.02 极低色度，保持近乎纯白
	// C: 0-0.02 very low chroma, keeping near pure white
	const highlightLightness = 0.96 + Math.random() * 0.04;
	const highlightChroma = Math.random() * 0.02;
	// H: 可以跟随 primary 或随机，保持整体协调
	// H: can follow primary or random, maintaining overall harmony
	const highlightHue = Math.random() > 0.5 ? primaryOklch.value.h : Math.random() * 360;
	bgHighlightOklch.value = { l: highlightLightness, c: highlightChroma, h: highlightHue };
	// 暗色模式：L: 0.04-0.12 偏黑，在彩色背景上突出
	// Dark mode: L: 0.04-0.12, near black, stands out on colored backgrounds
	const highlightDarkLightness = 0.04 + Math.random() * 0.08;
	const highlightDarkChroma = Math.random() * 0.02;
	// H: 可以跟随 dark 或随机
	// H: can follow dark or random
	const highlightDarkHue = Math.random() > 0.5 ? darkOklch.value.h : Math.random() * 360;
	bgHighlightDarkOklch.value = { l: highlightDarkLightness, c: highlightDarkChroma, h: highlightDarkHue };

	// ==================== 随机文字色 ====================
	// ==================== Random text colors ====================
	// 文字色可以有独立的色相，与背景形成微妙的色彩搭配
	// Text colors can have independent hue, creating subtle color coordination with background
	const textLightHue = Math.random() * 360;
	const textDarkHue = Math.random() * 360;
	// C: 0.01-0.04 文字色保持低色度，避免色彩干扰阅读
	// C: 0.01-0.04 text colors maintain low chroma to avoid color interference with reading
	const textLightChroma = 0.01 + Math.random() * 0.03;
	const textDarkChroma = 0.01 + Math.random() * 0.03;
	// text-primary: 亮色模式全局文字，L: 0.15-0.3 深色文字
	// text-primary: Light mode global text, L: 0.15-0.3 dark text
	textLightOklch.value = { l: 0.15 + Math.random() * 0.15, c: textLightChroma, h: textLightHue };
	// text-dark: 暗色模式全局文字，L: 0.85-0.95 浅色文字
	// text-dark: Dark mode global text, L: 0.85-0.95 light text
	textDarkOklch.value = { l: 0.85 + Math.random() * 0.1, c: textDarkChroma, h: textDarkHue };
	// text-on-primary: 亮色主题色上的文字，L: 0.92-1.0 需要足够亮以在深色主题色上清晰可见
	// text-on-primary: Text on primary theme color, L: 0.92-1.0 needs to be bright enough for visibility on dark theme color
	// 色相跟随 primary 色，色度减半保持协调
	// Hue follows primary, chroma halved for coordination
	textOnPrimaryLightOklch.value = { l: 0.92 + Math.random() * 0.08, c: textLightChroma * 0.5, h: primaryOklch.value.h };
	// text-on-dark: 暗色主题色上的文字，L: 0.08-0.2 需要足够暗以在亮色主题色上清晰可见
	// text-on-dark: Text on dark theme color, L: 0.08-0.2 needs to be dark enough for visibility on light theme color
	// 色相跟随 dark 色
	// Hue follows dark color
	textOnPrimaryDarkOklch.value = { l: 0.08 + Math.random() * 0.12, c: textDarkChroma * 0.5, h: darkOklch.value.h };
};

// 应用站点当前主题配置
const applySiteTheme = (themeName = localStorage.getItem('theme_color')) => {
	const siteThemeName = normalizeThemeName(themeName);
	const theme = getBuiltInTheme(siteThemeName);
	appliedSiteThemeName = siteThemeName;

	// 设置主题名称（根据语言显示中文或英文）
	name.value = isZh.value ? themeNameMap[siteThemeName] || siteThemeName : siteThemeName;

	// 设置主题色
	primaryOklch.value = parseOklchObj(theme.primaryColor);
	darkOklch.value = parseOklchObj(theme.darkColor);

	// 设置功能色
	successOklch.value = parseOklchObj(theme.successColor);
	warningOklch.value = parseOklchObj(theme.warningColor);
	errorOklch.value = parseOklchObj(theme.errorColor);
	infoOklch.value = parseOklchObj(theme.infoColor);

	// 同步更新 stateColor 和 currentColorObj.color.functional（用于预览和配置文件）
	stateColor.value = {
		success: theme.successColor,
		warning: theme.warningColor,
		error: theme.errorColor,
		info: theme.infoColor
	};
	currentColorObj.color.functional = {
		success: theme.successColor,
		warning: theme.warningColor,
		error: theme.errorColor,
		info: theme.infoColor
	};

	// 设置圆角
	boxRadius.value = theme.radiusBox;
	formRadius.value = theme.radiusForm;
	smallRadius.value = theme.radiusSmall;
	builtInIconLibrary.value = theme.builtInIconLibrary;

	// 亮色模式背景色
	bgBaseOklch.value = parseOklchObj(theme.bgBase);
	bgSurfaceOklch.value = parseOklchObj(theme.bgSurface);
	bgOverlayOklch.value = parseOklchObj(theme.bgOverlay);
	bgHighlightOklch.value = parseOklchObj(theme.bgHighlight);

	// 暗色模式背景色
	bgBaseDarkOklch.value = parseOklchObj(theme.bgBaseDark);
	bgSurfaceDarkOklch.value = parseOklchObj(theme.bgSurfaceDark);
	bgOverlayDarkOklch.value = parseOklchObj(theme.bgOverlayDark);
	bgHighlightDarkOklch.value = parseOklchObj(theme.bgHighlightDark);

	// 文字色
	textLightOklch.value = parseOklchObj(theme.textPrimary);
	textDarkOklch.value = parseOklchObj(theme.textDark);
	textOnPrimaryLightOklch.value = parseOklchObj(theme.textOnPrimary);
	textOnPrimaryDarkOklch.value = parseOklchObj(theme.textOnDark);

	// 重置扩展色为默认
	extendList.value = defaultTheme.extend.map((item) => ({
		...item,
		hex: oklchStrToHex(item.color)
	}));
	extendOklchList.value = defaultTheme.extend.map((item) => parseOklchObj(item.color));

	// 清除选中的缓存主题状态
	selectedCachedTheme.value = null;

	// 重新生成色板
	generateFunc();
};

// 重置事件
const resetFunc = () => {
	// 应用站点当前主题配置
	applySiteTheme();
};

// 暂存主题
const saveTheme = () => {
	// 清除之前的警告
	cacheWarning.value = '';

	// 检查名称是否为空
	if (!name.value.trim()) {
		cacheWarning.value = isZh.value ? '请输入主题名称' : 'Please enter theme name';
		setTimeout(() => (cacheWarning.value = ''), 2000);
		return;
	}

	// 检查名称是否已存在
	if (cachedThemes.value.some((t) => t.name === name.value)) {
		cacheWarning.value = isZh.value ? '主题名称已存在' : 'Theme name already exists';
		setTimeout(() => (cacheWarning.value = ''), 2000);
		return;
	}

	// 检查是否超过 10 个
	if (cachedThemes.value.length >= 10) {
		cacheWarning.value = isZh.value ? '最多缓存 10 个主题' : 'Maximum 10 themes';
		setTimeout(() => (cacheWarning.value = ''), 2000);
		return;
	}

	const theme: CachedTheme = {
		name: name.value,
		primaryOklch: { ...primaryOklch.value },
		darkOklch: { ...darkOklch.value },
		successOklch: { ...successOklch.value },
		warningOklch: { ...warningOklch.value },
		errorOklch: { ...errorOklch.value },
		infoOklch: { ...infoOklch.value },
		bgBaseOklch: { ...bgBaseOklch.value },
		bgSurfaceOklch: { ...bgSurfaceOklch.value },
		bgOverlayOklch: { ...bgOverlayOklch.value },
		bgHighlightOklch: { ...bgHighlightOklch.value },
		bgBaseDarkOklch: { ...bgBaseDarkOklch.value },
		bgSurfaceDarkOklch: { ...bgSurfaceDarkOklch.value },
		bgOverlayDarkOklch: { ...bgOverlayDarkOklch.value },
		bgHighlightDarkOklch: { ...bgHighlightDarkOklch.value },
		textLightOklch: { ...textLightOklch.value },
		textDarkOklch: { ...textDarkOklch.value },
		textOnPrimaryLightOklch: { ...textOnPrimaryLightOklch.value },
		textOnPrimaryDarkOklch: { ...textOnPrimaryDarkOklch.value },
		boxRadius: boxRadius.value,
		formRadius: formRadius.value,
		smallRadius: smallRadius.value,
		builtInIconLibrary: builtInIconLibrary.value,
		extendList: extendList.value.map((item) => ({ ...item })),
		primaryColor: oklchObjToStr(primaryOklch.value),
		darkColor: oklchObjToStr(darkOklch.value),
		bgLightColor: oklchObjToStr(bgBaseOklch.value),
		bgDarkColor: oklchObjToStr(bgBaseDarkOklch.value)
	};

	cachedThemes.value = [theme, ...cachedThemes.value];
	localStorage.setItem('vtdf-cached-themes', JSON.stringify(cachedThemes.value));
};

// 删除缓存主题
const deleteCachedTheme = (themeName: string) => {
	cachedThemes.value = cachedThemes.value.filter((t) => t.name !== themeName);
	localStorage.setItem('vtdf-cached-themes', JSON.stringify(cachedThemes.value));
	// 如果删除的是当前选中的主题，清除选中状态
	if (selectedCachedTheme.value === themeName) {
		selectedCachedTheme.value = null;
	}
};

// 应用缓存主题
const applyCachedTheme = (theme: CachedTheme) => {
	name.value = theme.name;
	primaryOklch.value = { ...theme.primaryOklch };
	darkOklch.value = { ...theme.darkOklch };
	successOklch.value = { ...theme.successOklch };
	warningOklch.value = { ...theme.warningOklch };
	errorOklch.value = { ...theme.errorOklch };
	infoOklch.value = { ...theme.infoOklch };
	bgBaseOklch.value = { ...theme.bgBaseOklch };
	bgSurfaceOklch.value = { ...theme.bgSurfaceOklch };
	bgOverlayOklch.value = { ...theme.bgOverlayOklch };
	bgHighlightOklch.value = theme.bgHighlightOklch ? { ...theme.bgHighlightOklch } : { l: 0.99, c: 0, h: 0 };
	bgBaseDarkOklch.value = { ...theme.bgBaseDarkOklch };
	bgSurfaceDarkOklch.value = { ...theme.bgSurfaceDarkOklch };
	bgOverlayDarkOklch.value = { ...theme.bgOverlayDarkOklch };
	bgHighlightDarkOklch.value = theme.bgHighlightDarkOklch ? { ...theme.bgHighlightDarkOklch } : { l: 0.08, c: 0, h: 0 };
	textLightOklch.value = { ...theme.textLightOklch };
	textDarkOklch.value = { ...theme.textDarkOklch };
	textOnPrimaryLightOklch.value = { ...theme.textOnPrimaryLightOklch };
	textOnPrimaryDarkOklch.value = { ...theme.textOnPrimaryDarkOklch };
	boxRadius.value = theme.boxRadius;
	formRadius.value = theme.formRadius;
	smallRadius.value = theme.smallRadius;
	builtInIconLibrary.value = theme.builtInIconLibrary || defaultBuiltInIconLibrary;
	extendList.value = theme.extendList.map((item) => ({ ...item }));
	extendOklchList.value = theme.extendList.map((item) => parseOklchObj(item.color));
	// 重新生成色板
	generateFunc();
	// 设置选中状态
	selectedCachedTheme.value = theme.name;
};

// 删除扩展色
const deleteFunc = (i: number) => {
	extendList.value = extendList.value.filter((_, index) => index !== i);
	extendOklchList.value = extendOklchList.value.filter((_, index) => index !== i);
};

// 选择 extendList 的颜色（用于 ColorPickerButton）
const onExtendOklchChange = (i: number, color: OklchColor, hex: string) => {
	const newExtendList = [...extendList.value];
	newExtendList[i].color = oklchObjToStr(parseOklchObj(hex));
	newExtendList[i].hex = hex;
	extendList.value = newExtendList;
};

// 输入 extendList 的别名
const inputExtendFunc = (e: Event, i: number) => {
	const aliasValue = (e.target as HTMLInputElement).value;
	const newExtendList = [...extendList.value];
	newExtendList[i].alias = aliasValue;
	extendList.value = newExtendList;
};

// 新增扩展色
const addExtendFunc = () => {
	const defaultHex = '#000000';
	const defaultOklch = oklchObjToStr(parseOklchObj(defaultHex));
	extendList.value = [...extendList.value, { color: defaultOklch, alias: '', hex: defaultHex }];
	extendOklchList.value = [...extendOklchList.value, parseOklchObj(defaultHex)];
};

// 复制配置文件
const copyConfig = async (blockId: string, tipRef: 'first' | 'second') => {
	const text = document.getElementById(blockId)?.textContent ?? '';
	try {
		await navigator.clipboard.writeText(text);
		if (tipRef === 'first') {
			showCopyTip.value = true;
			setTimeout(() => (showCopyTip.value = false), 2000);
		} else {
			showCopyTip2.value = true;
			setTimeout(() => (showCopyTip2.value = false), 2000);
		}
	} catch {
		console.error('无法将内容复制到剪贴板');
	}
};

// 同步站点亮暗模式到预览区域
watch(
	() => appState.currentThemeMode,
	(mode) => {
		previewDark.value = mode === 'dark';
	}
);

// 站点主题色变化时重新应用
watch(
	() => appState.currentColor,
	(themeName) => {
		const normalizedThemeName = normalizeThemeName(themeName);
		if (normalizedThemeName !== appliedSiteThemeName) applySiteTheme(normalizedThemeName);
	}
);

onMounted(() => {
	// 初始化预览区域亮暗模式跟随站点
	previewDark.value = document.documentElement.getAttribute('data-mode') === 'dark';

	// 初始化应用站点当前主题配置
	applySiteTheme();

	// 从 localStorage 读取用户缓存的主题
	const saved = localStorage.getItem('vtdf-cached-themes');
	cachedThemes.value = saved ? JSON.parse(saved) : [];

	// 设置页面标题
	document.title = isZh.value ? '主题生成器 - VTDF' : 'Theme generator - VTDF';
	document
		.querySelector('meta[name="description"]')
		?.setAttribute(
			'content',
			isZh.value
				? '使用 VTDF 主题生成器创建并预览完整的组件主题。'
				: 'Create and preview complete component themes with the VTDF theme generator.'
		);
});
</script>

<template>
	<div class="generator-mobile-notice md:hidden">
		{{ isZh ? '请在桌面端使用主题生成器。' : 'Please use the theme generator on a desktop device.' }}
	</div>
	<div class="generator-workbench hidden justify-between md:flex">
		<div class="generator-controls w-64 shrink-0 overflow-y-auto overflow-x-hidden px-3 py-2">
			<!-- 主题名称 -->
			<div class="flex items-center gap-2">
				<div class="shrink-0 text-xs">{{ isZh ? '名称' : 'Name' }}</div>
				<input
					class="focus:outline-primary dark:focus:outline-dark rounded-xs w-full bg-transparent px-2 py-1 text-xs outline outline-black/10 dark:outline-white/20"
					type="text"
					v-model="name"
					maxlength="10"
					:placeholder="isZh ? '请输入主题名称' : 'Please enter theme name'"
				/>
			</div>
			<div class="mt-2 flex flex-col gap-1">
				<!-- 颜色配置标题 -->
				<div class="flex items-center gap-2">
					<div class="h-px flex-1 bg-black/10 dark:bg-white/20"></div>
					<svg class="h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							class="fill-black/50 dark:fill-white/50"
							d="M6.45711 18.9539L15.0208 10.3902L13.6066 8.97596L5.04289 17.5397L6.45711 18.9539ZM12.1924 7.56174L10.7782 6.14753L12.1924 4.73331L13.9602 6.50108L16.7886 3.67265C17.1791 3.28213 17.8123 3.28213 18.2028 3.67265L20.3241 5.79397C20.7146 6.1845 20.7146 6.81766 20.3241 7.20819L17.4957 10.0366L19.2635 11.8044L17.8492 13.2186L16.435 11.8044L7.24264 20.9968H3V16.7541L12.1924 7.56174Z"
						></path>
					</svg>
					<span class="shrink-0 text-xs text-black/50 dark:text-white/50">{{ isZh ? '颜色' : 'Colors' }}</span>
					<div class="h-px flex-1 bg-black/10 dark:bg-white/20"></div>
				</div>

				<!-- 主题色：Primary & Dark -->
				<div class="mt-1 text-center text-xs text-black/50 dark:text-white/50">{{ isZh ? '主题色' : 'Theme colors' }}</div>
				<div class="flex gap-1">
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="primaryOklch"
							size="md"
							show-contrast
							:contrast-target="{ l: 1, c: 0, h: 0 }"
							@change="onPrimaryOklchChange"
							@open="setSiteMode(false)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">primary</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="darkOklch"
							size="md"
							show-contrast
							:contrast-target="{ l: 0, c: 0, h: 0 }"
							@change="onDarkOklchChange"
							@open="setSiteMode(true)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">dark</span>
					</div>
				</div>

				<!-- 背景色 -->
				<div class="mt-2 flex items-center justify-center gap-1">
					<span class="text-center text-xs text-black/50 dark:text-white/50">{{ isZh ? '背景色' : 'Background' }}</span>
					<div class="group/bg relative">
						<svg
							class="h-3 w-3 cursor-help text-black/30 dark:text-white/30"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"
							/>
						</svg>
						<div
							class="pointer-events-none absolute left-1/2 top-full z-10 mt-1 w-36 -translate-x-1/2 rounded bg-black px-2 py-1.5 text-xs leading-relaxed text-white opacity-0 transition-opacity group-hover/bg:opacity-100 dark:bg-white dark:text-black"
						>
							<div v-if="isZh" class="space-y-0.5">
								<div><b>base</b> 页面基础背景</div>
								<div><b>surface</b> 卡片/容器表面</div>
								<div><b>overlay</b> 弹窗/浮层背景</div>
								<div><b>highlight</b> 高亮元素背景</div>
								<div class="pt-1 text-white/70 dark:text-black/60">亮色模式用浅色，暗色 (-D) 用深色</div>
							</div>
							<div v-else class="space-y-0.5">
								<div><b>base</b> Page background</div>
								<div><b>surface</b> Card / container</div>
								<div><b>overlay</b> Popup / modal</div>
								<div><b>highlight</b> Highlight elements</div>
								<div class="pt-1 text-white/70 dark:text-black/60">Light mode: light, Dark (-D): dark</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-1 flex gap-1">
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="bgBaseOklch"
							size="sm"
							show-contrast
							:contrast-target="textLightOklch"
							@open="setSiteMode(false)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">base</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="bgSurfaceOklch"
							size="sm"
							show-contrast
							:contrast-target="textLightOklch"
							@open="setSiteMode(false)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">surface</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="bgOverlayOklch"
							size="sm"
							show-contrast
							:contrast-target="textLightOklch"
							@open="setSiteMode(false)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">overlay</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="bgHighlightOklch"
							size="sm"
							show-contrast
							:contrast-target="textLightOklch"
							@open="setSiteMode(false)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">highlight</span>
					</div>
				</div>
				<div class="mt-1 flex gap-1">
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="bgBaseDarkOklch"
							size="sm"
							show-contrast
							:contrast-target="textDarkOklch"
							@open="setSiteMode(true)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">base-D</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="bgSurfaceDarkOklch"
							size="sm"
							show-contrast
							:contrast-target="textDarkOklch"
							@open="setSiteMode(true)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">surf-D</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="bgOverlayDarkOklch"
							size="sm"
							show-contrast
							:contrast-target="textDarkOklch"
							@open="setSiteMode(true)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">over-D</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="bgHighlightDarkOklch"
							size="sm"
							show-contrast
							:contrast-target="textDarkOklch"
							@open="setSiteMode(true)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">hl-D</span>
					</div>
				</div>

				<!-- 文字色 -->
				<div class="mt-2 flex items-center justify-center gap-1">
					<span class="text-center text-xs text-black/50 dark:text-white/50">{{ isZh ? '文字色' : 'Text' }}</span>
					<div class="group/text relative">
						<svg
							class="h-3 w-3 cursor-help text-black/30 dark:text-white/30"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"
							/>
						</svg>
						<div
							class="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 w-36 -translate-x-1/2 rounded bg-black px-2 py-1.5 text-xs leading-relaxed text-white opacity-0 transition-opacity group-hover/text:opacity-100 dark:bg-white dark:text-black"
						>
							<div v-if="isZh" class="space-y-0.5">
								<div><b>primary</b> 亮色模式全局文字（深色）</div>
								<div><b>onPri</b> 亮色主题色上文字（浅色）</div>
								<div><b>dark</b> 暗色模式全局文字（浅色）</div>
								<div><b>onDark</b> 暗色主题色上文字（深色）</div>
							</div>
							<div v-else class="space-y-0.5">
								<div><b>primary</b> Primary mode text (dark)</div>
								<div><b>onPri</b> On primary in primary (light)</div>
								<div><b>dark</b> Dark mode text (light)</div>
								<div><b>onDark</b> On dark in dark (dark)</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-1 flex gap-0.5">
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="textLightOklch"
							size="sm"
							show-contrast
							:contrast-target="bgBaseOklch"
							variant="textOnBg"
							:bg-color="bgBaseOklch"
							@open="setSiteMode(false)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">primary</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="textOnPrimaryLightOklch"
							size="sm"
							show-contrast
							:contrast-target="primaryOklch"
							variant="textOnBg"
							:bg-color="primaryOklch"
							@open="setSiteMode(false)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">onPri</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="textDarkOklch"
							size="sm"
							show-contrast
							:contrast-target="bgBaseDarkOklch"
							variant="textOnBg"
							:bg-color="bgBaseDarkOklch"
							@open="setSiteMode(true)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">dark</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton
							v-model:value="textOnPrimaryDarkOklch"
							size="sm"
							show-contrast
							:contrast-target="darkOklch"
							variant="textOnBg"
							:bg-color="darkOklch"
							@open="setSiteMode(true)"
						/>
						<span class="leading-none text-xs text-black/50 dark:text-white/50">onDark</span>
					</div>
				</div>

				<!-- 功能色：Success, Warning, Error, Info -->
				<div class="mt-2 text-center text-xs text-black/50 dark:text-white/50">{{ isZh ? '功能色' : 'Functional colors' }}</div>
				<div class="flex gap-1">
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton v-model:value="successOklch" size="sm" @change="onSuccessOklchChange" />
						<span class="leading-none text-xs text-black/50 dark:text-white/50">success</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton v-model:value="warningOklch" size="sm" @change="onWarningOklchChange" />
						<span class="leading-none text-xs text-black/50 dark:text-white/50">warning</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton v-model:value="errorOklch" size="sm" @change="onErrorOklchChange" />
						<span class="leading-none text-xs text-black/50 dark:text-white/50">error</span>
					</div>
					<div class="flex flex-1 flex-col items-center gap-0.5">
						<ColorPickerButton v-model:value="infoOklch" size="sm" @change="onInfoOklchChange" />
						<span class="leading-none text-xs text-black/50 dark:text-white/50">info</span>
					</div>
				</div>

				<!-- 扩展色 -->
				<div class="mt-2 flex items-center justify-center gap-2">
					<div class="text-center text-xs text-black/50 dark:text-white/50">{{ isZh ? '扩展色' : 'Extended colors' }}</div>
					<button aria-label="add" class="cursor-pointer rounded-sm bg-black/5 px-1 dark:bg-white/10" type="button" @click="addExtendFunc">
						<svg class="h-3 w-3 transition-all hover:scale-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path class="fill-black dark:fill-white" d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
						</svg>
					</button>
				</div>
				<div class="flex flex-col gap-1">
					<div v-for="(item, i) in extendList" :key="i" class="flex items-center gap-2">
						<ColorPickerButton
							:value="extendOklchList[i]"
							@update:value="(v: OklchColor) => (extendOklchList[i] = v)"
							@change="(color: OklchColor, hex: string) => onExtendOklchChange(i, color, hex)"
						/>
						<input
							class="focus:outline-primary dark:focus:outline-dark rounded-xs h-6 min-w-0 flex-1 bg-transparent px-1 py-1 text-xs outline outline-black/10 dark:outline-white/20"
							type="text"
							:value="item.alias"
							:placeholder="isZh ? `别名` : `alias`"
							@input="inputExtendFunc($event, i)"
						/>
						<button
							aria-label="delete"
							class="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-sm bg-black/5 dark:bg-white/10"
							type="button"
							@click="deleteFunc(i)"
						>
							<svg class="h-3 w-3 transition-all hover:scale-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									class="fill-error"
									d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
								></path>
							</svg>
						</button>
					</div>
				</div>

				<!-- 圆角配置标题 -->
				<div class="mt-2 flex items-center gap-2">
					<div class="h-px flex-1 bg-black/10 dark:bg-white/20"></div>
					<svg class="h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							class="fill-black/50 dark:fill-white/50"
							d="M21 19V21H19V19H21ZM17 19V21H15V19H17ZM13 19V21H11V19H13ZM9 19V21H7V19H9ZM5 19V21H3V19H5ZM21 15V17H19V15H21ZM5 15V17H3V15H5ZM5 11V13H3V11H5ZM16 3C18.6874 3 20.8817 5.12366 20.9954 7.78322L21 8V13H19V8C19 6.40893 17.7447 5.09681 16.1756 5.00512L16 5H11V3H16ZM5 7V9H3V7H5ZM5 3V5H3V3H5ZM9 3V5H7V3H9Z"
						></path>
					</svg>
					<span class="shrink-0 text-xs text-black/50 dark:text-white/50">{{ isZh ? '圆角' : 'Radius' }}</span>
					<!-- tip -->
					<div class="group/radiusTip relative">
						<svg class="h-3.5 w-3.5 shrink-0 cursor-help" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								class="fill-black/30 dark:fill-white/30"
								d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"
							></path>
						</svg>
						<div
							class="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-36 -translate-x-1/2 rounded bg-black px-2 py-1.5 text-xs leading-tight text-white opacity-0 transition-opacity group-hover/radiusTip:opacity-100 dark:bg-white dark:text-black"
						>
							{{ isZh ? '全局配置后，组件仍可通过 API 单独自定义。' : 'After global config, components can still customize via API.' }}
							<div class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black dark:border-t-white"></div>
						</div>
					</div>
					<div class="h-px flex-1 bg-black/10 dark:bg-white/20"></div>
				</div>

				<!-- 容器类圆角配置 (box) -->
				<div class="mt-1 text-xs text-black/50 dark:text-white/50">
					{{ isZh ? '容器类（弹窗/卡片/单元格/骨架屏）' : 'Box (Popup/Card/Cell/Skeleton)' }}
				</div>
				<div class="grid grid-cols-4 gap-x-1 gap-y-1 py-1">
					<button
						v-for="option in boxRadiusOptions"
						:key="option.value"
						type="button"
						:aria-pressed="boxRadius === option.value"
						class="group flex cursor-pointer flex-col items-center gap-0.5"
						@click="boxRadius = option.value"
					>
						<div class="radius-option-canvas">
							<div
								data-site-component-preview
								class="radius-option-shape border-2 transition-colors"
								:class="
									boxRadius === option.value
										? 'border-primary bg-black/10 dark:border-dark dark:bg-white/10'
										: 'border-gray-300 bg-black/10 group-hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:group-hover:border-white/40'
								"
								:style="{ borderRadius: getRadiusPreview(option.value) }"
							></div>
						</div>
						<span
							class="text-xs transition-colors"
							:class="boxRadius === option.value ? 'text-primary dark:text-dark' : 'text-black/40 dark:text-white/40'"
						>
							{{ option.label }}
						</span>
					</button>
				</div>

				<!-- 表单类圆角配置 (form) -->
				<div class="mt-1 text-xs text-black/50 dark:text-white/50">
					{{ isZh ? '表单类（按钮/输入框/日历/分页）' : 'Form (Button/Input/Calendar/Pagination)' }}
				</div>
				<div class="grid grid-cols-4 gap-x-1 gap-y-1 py-1">
					<button
						v-for="option in formRadiusOptions"
						:key="option.value"
						type="button"
						:aria-pressed="formRadius === option.value"
						class="group flex cursor-pointer flex-col items-center gap-0.5"
						@click="formRadius = option.value"
					>
						<div class="radius-option-canvas">
							<div
								data-site-component-preview
								class="radius-option-shape border-2 transition-colors"
								:class="
									formRadius === option.value
										? 'border-primary bg-black/10 dark:border-dark dark:bg-white/10'
										: 'border-gray-300 bg-black/10 group-hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:group-hover:border-white/40'
								"
								:style="{ borderRadius: getRadiusPreview(option.value) }"
							></div>
						</div>
						<span
							class="text-xs transition-colors"
							:class="formRadius === option.value ? 'text-primary dark:text-dark' : 'text-black/40 dark:text-white/40'"
						>
							{{ option.label }}
						</span>
					</button>
				</div>

				<!-- 小型控件类圆角配置 (small) -->
				<div class="mt-1 text-xs text-black/50 dark:text-white/50">
					{{ isZh ? '小型控件类（开关/进度/滑块/步进器）' : 'Small (Switch/Progress/Slider/Stepper)' }}
				</div>
				<div class="grid grid-cols-4 gap-x-1 gap-y-1 py-1">
					<button
						v-for="option in smallRadiusOptions"
						:key="option.value"
						type="button"
						:aria-pressed="smallRadius === option.value"
						class="group flex cursor-pointer flex-col items-center gap-0.5"
						@click="smallRadius = option.value"
					>
						<div class="radius-option-canvas">
							<div
								data-site-component-preview
								class="radius-option-shape border-2 transition-colors"
								:class="
									smallRadius === option.value
										? 'border-primary bg-black/10 dark:border-dark dark:bg-white/10'
										: 'border-gray-300 bg-black/10 group-hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:group-hover:border-white/40'
								"
								:style="{ borderRadius: getRadiusPreview(option.value) }"
							></div>
						</div>
						<span
							class="text-xs transition-colors"
							:class="smallRadius === option.value ? 'text-primary dark:text-dark' : 'text-black/40 dark:text-white/40'"
						>
							{{ option.label }}
						</span>
					</button>
				</div>

				<div class="mt-3">
					<div class="flex items-center gap-2">
						<div class="h-px flex-1 bg-black/10 dark:bg-white/20"></div>
						<span class="shrink-0 text-xs text-black/50 dark:text-white/50">{{ isZh ? '内置图标' : 'Built-in icons' }}</span>
						<div class="h-px flex-1 bg-black/10 dark:bg-white/20"></div>
					</div>
					<div class="mt-2 grid grid-cols-2 gap-1">
						<button
							v-for="item in builtInIconLibraryList"
							:key="item"
							type="button"
							class="cursor-pointer rounded-sm border px-3 py-1.5 text-xs transition-all"
							:class="
								builtInIconLibrary === item
									? 'border-primary bg-primary/10 text-primary dark:border-dark dark:bg-dark/10 dark:text-dark'
									: 'border-gray-100 text-black/70 dark:border-gray-700 dark:text-white/70'
							"
							@click="builtInIconLibrary = item"
						>
							{{ builtInIconLibraryLabelMap[item] }}
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="generator-main flex min-w-0 flex-1 flex-col overflow-hidden">
			<!-- 顶部工具栏 -->
			<div class="flex h-10 items-center justify-between gap-2 px-4">
				<!-- 左侧：Tab 切换 + 暂存主题 + 缓存列表 -->
				<div class="flex min-w-0 flex-1 items-center gap-2">
					<!-- Tab 切换 -->
					<div class="flex shrink-0 gap-1 rounded-md bg-black/5 p-1 dark:bg-white/5">
						<button
							class="flex cursor-pointer items-center gap-1 rounded px-3 py-1 text-xs font-medium transition-colors"
							:class="activeTab === 'preview' ? 'bg-bg-highlight shadow-sm dark:bg-bg-highlight-dark' : 'opacity-60 hover:opacity-100'"
							type="button"
							@click="activeTab = 'preview'"
						>
							<svg class="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M12 3C17.3917 3 21.8776 6.87976 22.8189 12C21.8776 17.1202 17.3917 21 12 21C6.60833 21 2.12243 17.1202 1.18115 12C2.12243 6.87976 6.60833 3 12 3ZM12 19C16.2549 19 19.9461 16.0779 20.7998 12C19.9461 7.92215 16.2549 5 12 5C7.74512 5 4.05393 7.92215 3.20016 12C4.05393 16.0779 7.74512 19 12 19ZM12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12C16.5 14.4853 14.4853 16.5 12 16.5ZM12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z"
								></path>
							</svg>
							{{ isZh ? '预览' : 'Preview' }}
						</button>
						<button
							class="flex cursor-pointer items-center gap-1 rounded px-3 py-1 text-xs font-medium transition-colors"
							:class="activeTab === 'palette' ? 'bg-bg-highlight shadow-sm dark:bg-bg-highlight-dark' : 'opacity-60 hover:opacity-100'"
							type="button"
							@click="activeTab = 'palette'"
						>
							<svg class="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M5.7646 7.99998L5.46944 7.26944C5.26255 6.75737 5.50995 6.17454 6.02202 5.96765L15.2939 2.22158C15.8059 2.01469 16.3888 2.26209 16.5956 2.77416L22.2147 16.6819C22.4216 17.194 22.1742 17.7768 21.6622 17.9837L12.3903 21.7298C11.8783 21.9367 11.2954 21.6893 11.0885 21.1772L11.0002 20.9586V21H7.00021C6.44792 21 6.00021 20.5523 6.00021 20V19.7303L2.65056 18.377C2.13849 18.1701 1.89109 17.5873 2.09798 17.0752L5.7646 7.99998ZM8.00021 19H10.2089L8.00021 13.5333V19ZM6.00021 12.7558L4.32696 16.8972L6.00021 17.6084V12.7558ZM7.69842 7.44741L12.5683 19.5008L19.9858 16.5039L15.1159 4.45055L7.69842 7.44741ZM10.6766 9.47974C10.1645 9.68663 9.5817 9.43924 9.37481 8.92717C9.16792 8.4151 9.41532 7.83227 9.92739 7.62538C10.4395 7.41849 11.0223 7.66588 11.2292 8.17795C11.4361 8.69002 11.1887 9.27286 10.6766 9.47974Z"
								></path>
							</svg>
							{{ isZh ? '配置' : 'Config' }}
						</button>
					</div>
					<!-- 站点亮暗切换 -->
					<button
						class="flex cursor-pointer items-center gap-1 rounded-sm bg-black/5 px-3 py-1.5 text-xs hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
						type="button"
						:aria-label="previewDark ? (isZh ? '切换到亮色' : 'Switch to light') : isZh ? '切换到暗色' : 'Switch to dark'"
						@click="setSiteMode(!previewDark)"
					>
						<svg v-if="previewDark" class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"
							></path>
						</svg>
						<svg v-else class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7Z"
							></path>
						</svg>
						{{ previewDark ? (isZh ? '亮色' : 'Light') : isZh ? '暗色' : 'Dark' }}
					</button>
					<!-- 随机按钮 -->
					<button
						class="flex cursor-pointer items-center gap-1 rounded-sm bg-black/5 px-3 py-1.5 text-xs hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
						type="button"
						@click="randomFunc"
					>
						<svg class="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M10.9979 1.58018C11.6178 1.22132 12.3822 1.22132 13.0021 1.58018L20.5021 5.92229C21.1197 6.27987 21.5 6.93946 21.5 7.65314V16.3469C21.5 17.0606 21.1197 17.7202 20.5021 18.0778L13.0021 22.4199C12.3822 22.7788 11.6178 22.7788 10.9979 22.4199L3.49793 18.0778C2.88029 17.7202 2.5 17.0606 2.5 16.3469V7.65314C2.5 6.93947 2.88029 6.27987 3.49793 5.92229L10.9979 1.58018ZM4.5 7.65314V7.65792L11.0021 11.4223C11.6197 11.7799 12 12.4395 12 13.1531V20.689L19.5 16.3469V7.65314L12 3.31104L4.5 7.65314ZM6.13208 12.3C6.13206 11.7477 5.74432 11.0761 5.26604 10.7999C4.78776 10.5238 4.40004 10.7476 4.40006 11.2999C4.40008 11.8522 4.78782 12.5238 5.2661 12.7999C5.74439 13.0761 6.1321 12.8523 6.13208 12.3ZM8.72899 18.7982C9.20728 19.0743 9.59499 18.8505 9.59497 18.2982C9.59495 17.7459 9.20721 17.0743 8.72893 16.7982C8.25065 16.522 7.86293 16.7459 7.86295 17.2982C7.86297 17.8504 8.25071 18.522 8.72899 18.7982ZM5.2661 16.799C5.74439 17.0751 6.1321 16.8513 6.13208 16.299C6.13206 15.7467 5.74432 15.0751 5.26604 14.799C4.78776 14.5228 4.40004 14.7467 4.40006 15.2989C4.40008 15.8512 4.78782 16.5228 5.2661 16.799ZM8.72851 14.7995C9.20679 15.0756 9.5945 14.8518 9.59448 14.2995C9.59446 13.7472 9.20673 13.0756 8.72844 12.7995C8.25016 12.5233 7.86245 12.7471 7.86246 13.2994C7.86248 13.8517 8.25022 14.5233 8.72851 14.7995ZM14.8979 8.00001C15.3762 7.72388 15.3762 7.27619 14.8979 7.00006C14.4196 6.72394 13.6441 6.72394 13.1658 7.00006C12.6875 7.27619 12.6875 7.72388 13.1658 8.00001C13.6441 8.27614 14.4196 8.27614 14.8979 8.00001ZM10.0981 7.00006C10.5764 7.27619 10.5764 7.72388 10.0981 8.00001C9.61982 8.27614 8.84434 8.27614 8.36604 8.00001C7.88774 7.72388 7.88774 7.27619 8.36604 7.00006C8.84434 6.72394 9.61982 6.72394 10.0981 7.00006ZM15.9954 15.3495C16.5932 15.0043 17.0779 14.1649 17.0779 13.4745C17.0779 12.7842 16.5933 12.5044 15.9955 12.8496C15.3977 13.1948 14.9131 14.0342 14.913 14.7246C14.913 15.4149 15.3976 15.6947 15.9954 15.3495Z"
							></path>
						</svg>
						{{ isZh ? '随机' : 'Random' }}
					</button>
					<!-- 重置按钮 -->
					<button
						class="flex cursor-pointer items-center gap-1 rounded-sm bg-black/5 px-3 py-1.5 text-xs hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
						type="button"
						@click="resetFunc"
					>
						<svg class="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2V4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 9.25022 5.38734 6.82447 7.50024 5.38451L7.5 8H9.5V2L3.5 2V4L5.99918 3.99989C3.57075 5.82434 2 8.72873 2 12Z"
							></path>
						</svg>
						{{ isZh ? '重置' : 'Reset' }}
					</button>
					<!-- 暂存主题按钮 -->
					<button
						class="flex cursor-pointer items-center gap-1 rounded-sm bg-black/5 px-3 py-1.5 text-xs hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
						type="button"
						@click="saveTheme"
					>
						<svg class="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"
							></path>
						</svg>
						{{ isZh ? '暂存' : 'Cache' }}
					</button>
					<!-- 警告提示 -->
					<span v-if="cacheWarning" class="text-error shrink-0 text-xs">{{ cacheWarning }}</span>
					<!-- 缓存的主题列表 -->
					<div class="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-2">
						<div
							v-for="theme in cachedThemes"
							:key="theme.name"
							class="group relative flex shrink-0 cursor-pointer items-center gap-1 rounded-md border px-2 py-1 transition-all"
							:class="
								selectedCachedTheme === theme.name
									? 'border-primary bg-primary/10 dark:border-dark dark:bg-dark/10'
									: 'border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5'
							"
							role="button"
							tabindex="0"
							@click="applyCachedTheme(theme)"
							@keydown="(e: KeyboardEvent) => e.key === 'Enter' && applyCachedTheme(theme)"
						>
							<!-- 主题名称 -->
							<span
								class="max-w-16 truncate text-xs"
								:class="selectedCachedTheme === theme.name ? 'text-primary dark:text-dark font-medium' : ''"
							>
								{{ theme.name }}
							</span>
							<!-- 主题色块预览 -->
							<div class="flex h-5 w-7 overflow-hidden rounded-sm border border-black/5 dark:border-white/5">
								<!-- 左半部分：亮色背景 + 主题色 -->
								<div class="relative flex-1" :style="{ backgroundColor: theme.bgLightColor }">
									<div class="rounded-xs absolute bottom-0.5 left-0.5 h-2 w-2" :style="{ backgroundColor: theme.primaryColor }"></div>
								</div>
								<!-- 右半部分：暗色背景 + 暗色主题色 -->
								<div class="relative flex-1" :style="{ backgroundColor: theme.bgDarkColor }">
									<div class="rounded-xs absolute bottom-0.5 right-0.5 h-2 w-2" :style="{ backgroundColor: theme.darkColor }"></div>
								</div>
							</div>
							<!-- 删除按钮 -->
							<button
								class="bg-error absolute -right-1.5 -top-1.5 hidden h-4 w-4 cursor-pointer items-center justify-center rounded-full text-white group-hover:flex"
								type="button"
								aria-label="删除主题"
								@click.stop="deleteCachedTheme(theme.name)"
							>
								<svg class="h-2.5 w-2.5" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div v-if="activeTab === 'palette'" class="generator-palette flex min-h-0 flex-1 flex-col overflow-hidden px-4">
				<!-- 色板 & 配置文件 -->
				<div class="mb-1 flex justify-between gap-1 text-center text-xs">
					<div
						v-for="(color, index) in primaryColors"
						:key="index"
						class="h-12 rounded-sm"
						:style="{ backgroundColor: color.oklch, color: getContrastTextColor(color.oklch), flex: index === 6 ? '2' : '1' }"
					>
						<div class="flex h-full items-center justify-center">
							<div :class="index === 6 ? 'text-xl font-bold' : ''">{{ index === 6 ? 'primary' : color.n }}</div>
						</div>
					</div>
				</div>
				<div class="flex justify-between gap-1 text-center text-xs">
					<div
						v-for="(color, index) in darkColors"
						:key="index"
						class="h-12 rounded-sm"
						:style="{ backgroundColor: color.oklch, color: getContrastTextColor(color.oklch), flex: index === 6 ? '2' : '1' }"
					>
						<div class="flex h-full items-center justify-center">
							<div :class="index === 6 ? 'text-xl font-bold' : ''">{{ index === 6 ? 'dark' : color.n }}</div>
						</div>
					</div>
				</div>
				<!-- 背景色和文字色 -->
				<div class="mt-1 flex gap-1">
					<!-- 背景色 -->
					<div class="flex flex-1 gap-1">
						<!-- 亮色背景 -->
						<div class="flex flex-1 flex-col gap-1 rounded-sm border border-black/10 p-1 dark:border-white/10">
							<div class="text-center text-xs text-black/50 dark:text-white/50">{{ isZh ? '亮色背景' : 'Light BG' }}</div>
							<div class="flex gap-1">
								<div class="flex flex-1 flex-col items-center gap-0.5">
									<div class="h-6 w-full rounded-sm border border-black/10" :style="{ backgroundColor: oklchObjToStr(bgBaseOklch) }"></div>
									<span class="leading-none text-xs text-black/50 dark:text-white/50">base</span>
								</div>
								<div class="flex flex-1 flex-col items-center gap-0.5">
									<div
										class="h-6 w-full rounded-sm border border-black/10"
										:style="{ backgroundColor: oklchObjToStr(bgSurfaceOklch) }"
									></div>
									<span class="leading-none text-xs text-black/50 dark:text-white/50">surface</span>
								</div>
								<div class="flex flex-1 flex-col items-center gap-0.5">
									<div
										class="h-6 w-full rounded-sm border border-black/10"
										:style="{ backgroundColor: oklchObjToStr(bgOverlayOklch) }"
									></div>
									<span class="leading-none text-xs text-black/50 dark:text-white/50">overlay</span>
								</div>
								<div class="flex flex-1 flex-col items-center gap-0.5">
									<div
										class="h-6 w-full rounded-sm border border-black/10"
										:style="{ backgroundColor: oklchObjToStr(bgHighlightOklch) }"
									></div>
									<span class="leading-none text-xs text-black/50 dark:text-white/50">highlight</span>
								</div>
							</div>
						</div>
						<!-- 暗色背景 -->
						<div class="flex flex-1 flex-col gap-1 rounded-sm border border-black/10 p-1 dark:border-white/10">
							<div class="text-center text-xs text-black/50 dark:text-white/50">{{ isZh ? '暗色背景' : 'Dark BG' }}</div>
							<div class="flex gap-1">
								<div class="flex flex-1 flex-col items-center gap-0.5">
									<div
										class="h-6 w-full rounded-sm border border-white/10"
										:style="{ backgroundColor: oklchObjToStr(bgBaseDarkOklch) }"
									></div>
									<span class="leading-none text-xs text-black/50 dark:text-white/50">base</span>
								</div>
								<div class="flex flex-1 flex-col items-center gap-0.5">
									<div
										class="h-6 w-full rounded-sm border border-white/10"
										:style="{ backgroundColor: oklchObjToStr(bgSurfaceDarkOklch) }"
									></div>
									<span class="leading-none text-xs text-black/50 dark:text-white/50">surface</span>
								</div>
								<div class="flex flex-1 flex-col items-center gap-0.5">
									<div
										class="h-6 w-full rounded-sm border border-white/10"
										:style="{ backgroundColor: oklchObjToStr(bgOverlayDarkOklch) }"
									></div>
									<span class="leading-none text-xs text-black/50 dark:text-white/50">overlay</span>
								</div>
								<div class="flex flex-1 flex-col items-center gap-0.5">
									<div
										class="h-6 w-full rounded-sm border border-white/10"
										:style="{ backgroundColor: oklchObjToStr(bgHighlightDarkOklch) }"
									></div>
									<span class="leading-none text-xs text-black/50 dark:text-white/50">highlight</span>
								</div>
							</div>
						</div>
					</div>
					<!-- 文字色 -->
					<div class="flex flex-1 flex-col gap-1 rounded-sm border border-black/10 p-1 dark:border-white/10">
						<div class="text-center text-xs text-black/50 dark:text-white/50">{{ isZh ? '文字色' : 'Text' }}</div>
						<div class="flex gap-1">
							<!-- 全局文字色：对应背景色 + A -->
							<div class="flex flex-1 flex-col items-center gap-0.5">
								<div
									class="flex h-6 w-full items-center justify-center rounded-sm border border-black/10 text-sm font-bold"
									:style="{ backgroundColor: oklchObjToStr(bgBaseOklch), color: oklchObjToStr(textLightOklch) }"
								>
									A
								</div>
								<span class="leading-none text-xs text-black/50 dark:text-white/50">light</span>
							</div>
							<div class="flex flex-1 flex-col items-center gap-0.5">
								<div
									class="flex h-6 w-full items-center justify-center rounded-sm border border-white/10 text-sm font-bold"
									:style="{ backgroundColor: oklchObjToStr(bgBaseDarkOklch), color: oklchObjToStr(textDarkOklch) }"
								>
									A
								</div>
								<span class="leading-none text-xs text-black/50 dark:text-white/50">dark</span>
							</div>
							<!-- 主题色上文字：主题色背景 + A -->
							<div class="flex flex-1 flex-col items-center gap-0.5">
								<div
									class="flex h-6 w-full items-center justify-center rounded-sm border border-black/10 text-sm font-bold"
									:style="{ backgroundColor: oklchObjToStr(primaryOklch), color: oklchObjToStr(textOnPrimaryLightOklch) }"
								>
									A
								</div>
								<span class="leading-none text-xs text-black/50 dark:text-white/50">onPri-L</span>
							</div>
							<div class="flex flex-1 flex-col items-center gap-0.5">
								<div
									class="flex h-6 w-full items-center justify-center rounded-sm border border-white/10 text-sm font-bold"
									:style="{ backgroundColor: oklchObjToStr(darkOklch), color: oklchObjToStr(textOnPrimaryDarkOklch) }"
								>
									A
								</div>
								<span class="leading-none text-xs text-black/50 dark:text-white/50">onDark</span>
							</div>
						</div>
					</div>
				</div>
				<!-- 功能色 & 扩展色 -->
				<div class="mt-1 flex justify-between gap-1 text-center text-xs">
					<div
						class="h-12 flex-1 rounded-sm pt-4"
						:style="{ backgroundColor: stateColor.success, color: getContrastTextColor(stateColor.success) }"
					>
						success
					</div>
					<div
						class="h-12 flex-1 rounded-sm pt-4"
						:style="{ backgroundColor: stateColor.warning, color: getContrastTextColor(stateColor.warning) }"
					>
						warning
					</div>
					<div
						class="h-12 flex-1 rounded-sm pt-4"
						:style="{ backgroundColor: stateColor.error, color: getContrastTextColor(stateColor.error) }"
					>
						error
					</div>
					<div
						class="h-12 flex-1 rounded-sm pt-4"
						:style="{ backgroundColor: stateColor.info, color: getContrastTextColor(stateColor.info) }"
					>
						info
					</div>
					<template v-if="extendList">
						<div
							v-for="(item, i) in extendList"
							:key="i"
							class="flex h-12 flex-1 flex-col justify-center gap-1 rounded-sm py-1"
							:style="{ backgroundColor: item.color, color: getContrastTextColor(item.color) }"
						>
							<div class="text-xs">extend{{ i }}</div>
							<div>{{ item.alias }}</div>
						</div>
					</template>
				</div>
				<!-- 配置文件 -->
				<div class="mt-1 flex min-h-0 flex-1 flex-col gap-1 xl:flex-row">
					<div class="relative min-h-0 flex-1 overflow-auto rounded-b-lg rounded-t-sm bg-black/5 dark:bg-white/5">
						<article class="prose dark:prose-invert max-w-none text-sm">
							<pre><code class="hljs language-css" id="myCodeBlock" v-html="configStr"></code></pre>
						</article>
						<button
							aria-label="copy"
							class="absolute right-0 top-0 rounded-bl-sm bg-black/5 px-3 py-2 text-sm hover:opacity-80 dark:bg-white/10"
							type="button"
							@click="copyConfig('myCodeBlock', 'first')"
						>
							<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									class="fill-gray-700 dark:fill-gray-300"
									d="M6 4V8H18V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H6ZM8 2H16V6H8V2Z"
								></path>
							</svg>
						</button>
						<div v-if="showCopyTip" class="absolute right-14 top-1 text-sm">{{ isZh ? '已复制！' : 'Copied!' }}</div>
					</div>
					<div class="relative min-h-0 flex-1 overflow-auto rounded-b-lg rounded-t-sm bg-black/5 dark:bg-white/5">
						<article class="prose dark:prose-invert max-w-none text-sm">
							<pre><code class="hljs language-css" id="myCodeBlock2" v-html="configStr2"></code></pre>
						</article>
						<button
							aria-label="copy"
							class="absolute right-0 top-0 rounded-bl-sm bg-black/5 px-3 py-2 text-sm hover:opacity-80 dark:bg-white/10"
							type="button"
							@click="copyConfig('myCodeBlock2', 'second')"
						>
							<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									class="fill-gray-700 dark:fill-gray-300"
									d="M6 4V8H18V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H6ZM8 2H16V6H8V2Z"
								></path>
							</svg>
						</button>
						<div v-if="showCopyTip2" class="absolute right-14 top-1 text-sm">{{ isZh ? '已复制！' : 'Copied!' }}</div>
					</div>
				</div>
			</div>
			<div
				v-else
				class="generator-preview mx-4 mb-2 min-h-0 flex-1 overflow-auto border"
				:class="previewDark ? 'border-white/10' : 'border-black/10'"
				:style="previewStyle"
				data-theme="generator-preview"
				:data-mode="previewDark ? 'dark' : 'light'"
			>
				<GeneratorPreview :dark="previewDark" :extend-list="extendList" :built-in-icon-library="builtInIconLibrary" />
			</div>
		</div>
	</div>
</template>
