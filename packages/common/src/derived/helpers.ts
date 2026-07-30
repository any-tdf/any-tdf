export type ClassValue = string | false | null | undefined;
export type ResolveKeyboardPreviewStateOptions = {
	value?: string;
	previewMask?: boolean;
};
export type KeyboardPreviewState = {
	showMask: boolean;
	maskIndexes: number[];
	displayValue: string;
	dotClass: string;
};
export type ResolveRandomBase36SuffixOptions = {
	random: number;
	start?: number;
	end?: number;
};
export type ResolveFocusableTabIndexOptions = {
	disabled?: boolean;
};
export type ResolveDevicePixelRatioOptions = {
	value?: number | null;
};
export type ResolveViewportDimensionOptions = {
	value?: number | null;
	fallback?: number;
};
export type ResolveViewportFallbackDimensionOptions = {
	value?: number | null;
	fallback?: number | null;
};
export type ResolveHiddenScrollbarCssOptions = {
	selector: string;
	includeFirefox?: boolean;
};
export type ResolveMapValueKey = string | number | symbol | undefined;

export type StyleRecord = Record<string, string>;

// 键盘预览遮罩圆点 class 由公共派生层统一维护。
// Keyboard preview mask-dot classes are centralized in the shared derived layer.
export const keyboardPreviewDotClass = 'mx-1 h-2.5 w-2.5 rounded-full bg-text-primary dark:bg-text-dark';

// 输入组件状态，返回框架无关的 class 字符串。
// Convert component state into framework-agnostic class strings.
export const joinClasses = (classes: readonly ClassValue[]) => classes.filter(Boolean).join(' ');

// 输入交互禁用状态，返回框架无关的可聚焦 tabIndex。
// Resolve interactive disabled state into a framework-agnostic focusable tabIndex.
export const resolveFocusableTabIndex = ({ disabled = false }: ResolveFocusableTabIndexOptions = {}): 0 | -1 => (disabled ? -1 : 0);

// 输入组件层读取到的设备像素比，返回画布计算可直接使用的数值。
// Normalize component-read device pixel ratio into a value ready for canvas calculations.
export const resolveDevicePixelRatio = ({ value }: ResolveDevicePixelRatioOptions = {}): number => value || 1;

// 输入组件层读取到的视口尺寸，返回可参与布局计算的数值。
// Normalize a component-read viewport dimension into a value ready for layout calculations.
export const resolveViewportDimension = ({ value, fallback = 0 }: ResolveViewportDimensionOptions = {}): number => value ?? fallback;

// 输入主视口尺寸和备用尺寸，返回保留旧式 fallback 语义的布局数值。
// Normalize primary and fallback viewport dimensions while preserving legacy fallback semantics.
export const resolveViewportFallbackDimension = ({ value, fallback }: ResolveViewportFallbackDimensionOptions = {}): number =>
	value || fallback || 0;

// 输入滚动容器选择器，返回框架无关的隐藏滚动条 CSS。
// Receive a scroll container selector and return framework-agnostic scrollbar-hiding CSS.
export const resolveHiddenScrollbarCss = ({
	selector,
	includeFirefox = false
}: ResolveHiddenScrollbarCssOptions): string => `${selector}::-webkit-scrollbar {
	display: none;
}${
	includeFirefox
		? `\n${selector} {
	-ms-overflow-style: none;
	scrollbar-width: none;
}`
		: ''
}`;

// 从 class map 中取值，组件侧不再重复 fallback 判断。
// Resolve a class map value so component files do not repeat fallback checks.
export const resolveClassMapValue = <T extends Record<string, string>, K extends keyof T>(
	map: T,
	key: K | string | number | undefined,
	fallback: K
) => map[String(key) as keyof T] || map[fallback];

// 输入消费方提供的值映射，返回命名值或默认值，不持有具体框架实现。
// Resolve a named value from a consumer-provided map without owning concrete framework implementations.
export const resolveMapValue = <TMap extends Record<string, unknown>, TFallback extends keyof TMap>(
	map: TMap,
	key: ResolveMapValueKey,
	fallback: TFallback
): TMap[TFallback] | TMap[keyof TMap] => map[String(key) as keyof TMap] ?? map[fallback];

// 动态尺寸只做纯数字计算，不读取 DOM 或框架状态。
// Dynamic size helpers only do pure numeric calculation without reading DOM or framework state.
export const toNumber = (value: string | number) => Number(value);

// 输入组件层生成的随机数，返回框架无关的 base36 后缀。
// Receive a component-provided random value and return a framework-agnostic base36 suffix.
export const resolveRandomBase36Suffix = ({ random, start = 2, end }: ResolveRandomBase36SuffixOptions): string =>
	random.toString(36).slice(start, end);

// 输入 CSS 属性名，返回组件层可绑定的驼峰属性名。
// Receive a CSS property name and return a camel-case property name for component bindings.
export const toStylePropertyName = (value: string): string => {
	const normalized = value.trim().replace(/^-webkit-/, 'Webkit-');
	return normalized.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
};

// 输入 CSS style 字符串，返回框架无关的 style 对象。
// Receive a CSS style string and return a framework-agnostic style object.
export const parseStyleString = (style: string): StyleRecord => {
	const result: StyleRecord = {};
	style.split(';').forEach((item) => {
		if (!item.trim()) {
			return;
		}
		const [prop, ...rest] = item.split(':');
		if (!prop || rest.length === 0) {
			return;
		}
		const key = toStylePropertyName(prop);
		const value = rest.join(':').trim();
		if (!value || value === 'undefined' || value === 'null' || value === 'false') {
			return;
		}
		result[key] = value;
	});
	if (result.borderColor) {
		const hasSide = !!result.borderTopColor || !!result.borderRightColor || !!result.borderBottomColor || !!result.borderLeftColor;
		if (hasSide) {
			const borderColor = result.borderColor;
			if (!result.borderTopColor) {
				result.borderTopColor = borderColor;
			}
			if (!result.borderRightColor) {
				result.borderRightColor = borderColor;
			}
			if (!result.borderBottomColor) {
				result.borderBottomColor = borderColor;
			}
			if (!result.borderLeftColor) {
				result.borderLeftColor = borderColor;
			}
			delete result.borderColor;
		}
	}
	return result;
};

// 输入键盘预览状态，返回框架无关的遮罩点和展示文本。
// Receive keyboard preview state and return framework-agnostic mask dots and display text.
export const resolveKeyboardPreviewState = ({
	value = '',
	previewMask = false
}: ResolveKeyboardPreviewStateOptions = {}): KeyboardPreviewState => {
	const showMask = previewMask && value.length > 0;
	return {
		showMask,
		maskIndexes: showMask ? Array.from({ length: value.length }, (_, index) => index) : [],
		displayValue: showMask ? '' : value || '',
		dotClass: keyboardPreviewDotClass
	};
};
