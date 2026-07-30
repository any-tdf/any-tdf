import type { ColorPickerMode, ColorPickerValue, OklchColor } from '../types/index.js';
import {
	formatOklch,
	formatRgb,
	getMaxChroma,
	hexToRgb,
	hslToRgb,
	isDisplayable,
	oklchToRgb,
	rgbToHex,
	rgbToHsl,
	rgbToOklch
} from '../utils/index.js';
import { radiusObj } from './common.js';

export const colorPickerDefaultColor: OklchColor = { l: 0.7, c: 0.15, h: 250 };
export const colorPickerCopyTipHideDelay = 1500;

export type ColorPickerSliderIndex = 1 | 2 | 3;
export type ColorPickerRadiusKey = keyof typeof radiusObj | string;
export type ColorPickerDragTarget = 'panel' | ColorPickerSliderIndex;

export type ColorPickerDisplayValues = {
	rgb: [number, number, number];
	hex: string;
	oklch: string;
	rgbString: string;
	colorStrings: string[];
};

export type ColorPickerControlDerived = {
	labels: [string, string, string];
	panelMarkerLeft: number;
	panelPosition: ColorPickerPoint;
	panelSize: {
		width: number;
		height: number;
	};
	slider1Position: number;
	slider2Position: number;
	slider3Position: number;
};

export type ColorPickerPoint = {
	x: number;
	y: number;
};

export type ColorPickerPreviewStyleValue = {
	backgroundColor: string;
};

export type ColorPickerPanelSizeStyleValue = {
	height: string;
	width: string;
};

export type ColorPickerPanelMarkerStyleValue = {
	backgroundColor: string;
	left: string;
	top: string;
};

export type ColorPickerSliderCanvasStyleValue = {
	height: string;
};

export type ColorPickerSliderHandleStyleValue = {
	border: string;
	left: string;
};

export type ColorPickerCanvasMetrics = {
	pixelHeight: number;
	pixelWidth: number;
	shouldDraw: boolean;
};

export type ColorPickerRgba = [number, number, number, number];
export type ColorPickerTabLabel = {
	text: string;
};
export type ColorPickerSliderRenderState = {
	handleStyleString: string;
	handleStyleValue: ColorPickerSliderHandleStyleValue;
	position: number;
};
export type ResolveColorPickerDerivedOptions<TPopup extends ColorPickerPopupLike = ColorPickerPopupLike> = {
	activeModeIndex?: number;
	color: OklchColor;
	containerWidth?: number;
	fallbackPanelWidth?: number;
	injClass?: string;
	modes?: readonly ColorPickerMode[];
	panelHeight?: number;
	popup?: TPopup | null;
	popupProps?: TPopup | null;
	radius?: ColorPickerRadiusKey | '';
	sliderHeight?: number;
	sliderWidth?: number;
};
export type ColorPickerMeasuredClientWidthLike =
	| {
			clientWidth?: number | null;
	  }
	| null
	| undefined;
export type ColorPickerStatePropsLike<TPopup extends ColorPickerPopupLike = ColorPickerPopupLike> = Partial<
	Omit<ResolveColorPickerDerivedOptions<TPopup>, 'activeModeIndex' | 'color' | 'containerWidth' | 'sliderWidth'>
>;
export type ResolveColorPickerStateOptionsParams<TPopup extends ColorPickerPopupLike = ColorPickerPopupLike> = {
	activeModeIndex?: number;
	color: OklchColor;
	containerWidth?: number;
	props: ColorPickerStatePropsLike<TPopup>;
	sliderWidth?: number;
};
export type ColorPickerDerived<TPopup extends ColorPickerPopupLike = ColorPickerPopupLike> = {
	colorDisplay: ColorPickerDisplayValues;
	colorMode: ColorPickerMode;
	colorStrings: string[];
	containerMeasureClass: string;
	contentClass: string;
	controlDerived: ColorPickerControlDerived;
	copyButtonClass: string;
	copyLastButtonClass: string;
	copyTipClass: string;
	currentHex: string;
	currentOklch: string;
	currentRgb: [number, number, number];
	currentRgbStr: string;
	displayLastValueClass: string;
	displayValueClass: string;
	effectiveModes: ColorPickerMode[];
	inputClass: string;
	inputValues: [string, string, string];
	isDirectMode: boolean;
	labels: [string, string, string];
	panelCanvasClass: string;
	panelMarkerClass: string;
	panelMarkerStyleString: string;
	panelMarkerStyleValue: ColorPickerPanelMarkerStyleValue;
	panelPosition: ColorPickerPoint;
	panelSize: {
		width: number;
		height: number;
	};
	panelSizeStyleString: string;
	panelSizeStyleValue: ColorPickerPanelSizeStyleValue;
	panelWidth: number;
	panelWrapperClass: string;
	popupProps: Partial<ColorPickerPopupDerived<TPopup>>;
	previewClass: string;
	previewRowClass: string;
	previewStyleString: string;
	previewStyleValue: ColorPickerPreviewStyleValue;
	previewTextClass: string;
	radiusClass: string;
	safeActiveModeIndex: number;
	slider1: ColorPickerSliderRenderState;
	slider2: ColorPickerSliderRenderState;
	slider3: ColorPickerSliderRenderState;
	sliderCanvasClass: string;
	sliderCanvasStyleString: string;
	sliderCanvasStyleValue: ColorPickerSliderCanvasStyleValue;
	sliderHandleClass: string;
	sliderLabelClass: string;
	sliderLastRowClass: string;
	sliderRowClass: string;
	sliderTrackClass: string;
	tabLabels: ColorPickerTabLabel[];
	wheelSize: number;
};

// 输入组件 props、内部颜色状态和测量值，返回 ColorPicker 派生层统一入参。
// Receive component props, internal color state and measured values, then return normalized ColorPicker derivation options.
export const resolveColorPickerStateOptions = <TPopup extends ColorPickerPopupLike = ColorPickerPopupLike>({
	activeModeIndex,
	color,
	containerWidth,
	props,
	sliderWidth
}: ResolveColorPickerStateOptionsParams<TPopup>): ResolveColorPickerDerivedOptions<TPopup> => ({
	activeModeIndex,
	color,
	containerWidth,
	injClass: props.injClass,
	modes: props.modes,
	panelHeight: props.panelHeight,
	popup: props.popup,
	popupProps: props.popupProps,
	radius: props.radius,
	sliderHeight: props.sliderHeight,
	sliderWidth
});

// 输入组件层测得的节点，返回 ColorPicker 可复用的安全宽度。
// Normalize a component-measured node into a reusable ColorPicker safe width.
export const resolveColorPickerMeasuredClientWidth = (node?: ColorPickerMeasuredClientWidthLike): number => node?.clientWidth ?? 0;

export type ResolveColorPickerPanelNextColorOptions = {
	mode: ColorPickerMode;
	color: OklchColor;
	rgb: [number, number, number];
	panelWidth: number;
	panelHeight: number;
	wheelSize: number;
	x: number;
	y: number;
};

export type ResolveColorPickerSliderNextColorOptions = {
	mode: ColorPickerMode;
	sliderIndex: ColorPickerSliderIndex;
	color: OklchColor;
	rgb: [number, number, number];
	sliderWidth: number;
	x: number;
};

export type ResolveColorPickerPanelInteractionColorOptions = Omit<ResolveColorPickerPanelNextColorOptions, 'x' | 'y'> &
	ResolveColorPickerPointerPointOptions;

export type ResolveColorPickerSliderInteractionColorOptions = Omit<ResolveColorPickerSliderNextColorOptions, 'sliderWidth' | 'x'> & {
	clientX: number;
	rectLeft: number;
	rectWidth: number;
};

export type ResolveColorPickerInputNextColorOptions = {
	mode: ColorPickerMode;
	inputIndex: ColorPickerSliderIndex;
	input: string;
	color: OklchColor;
	rgb: [number, number, number];
};

export type ResolveColorPickerPanelPixelOptions = {
	mode: ColorPickerMode;
	color: OklchColor;
	rgb: [number, number, number];
	x: number;
	y: number;
	width: number;
	height: number;
	dpr?: number;
};

export type ResolveColorPickerSliderPixelOptions = {
	mode: ColorPickerMode;
	sliderIndex: ColorPickerSliderIndex;
	color: OklchColor;
	x: number;
	width: number;
};

export type ResolveColorPickerPanelBitmapDataOptions = {
	mode: ColorPickerMode;
	color: OklchColor;
	rgb: [number, number, number];
	width: number;
	height: number;
	dpr?: number;
};

export type ResolveColorPickerSliderBitmapDataOptions = {
	mode: ColorPickerMode;
	sliderIndex: ColorPickerSliderIndex;
	color: OklchColor;
	width: number;
	height: number;
};

export type ResolveColorPickerControlDerivedOptions = {
	mode: ColorPickerMode;
	color: OklchColor;
	rgb: [number, number, number];
	panelWidth: number;
	panelHeight: number;
	wheelSize: number;
	sliderWidth: number;
};

export type ResolveColorPickerInputColorOptions = {
	themeColor?: OklchColor;
	value?: ColorPickerValue;
};

export type ResolveColorPickerUpdateActionOptions = {
	color: OklchColor;
	isDirectMode?: boolean;
	modes?: readonly ColorPickerMode[];
};

export type ColorPickerUpdateAction = {
	changeColors: string[];
	nextValue: ColorPickerValue;
	shouldEmitChange: boolean;
};

export type ResolveColorPickerInputKeyboardActionOptions = {
	key: string;
};

export type ResolveColorPickerCloseActionOptions = {
	colorStrings: readonly string[];
	emitClose?: boolean;
	emitVisible?: boolean;
	shouldClose?: boolean;
};

export type ColorPickerCloseAction = {
	closeValue: string[];
	nextVisible: false;
	shouldClose: boolean;
	shouldEmitClose: boolean;
	shouldEmitVisible: boolean;
};

export type ResolveColorPickerDragActionOptions = {
	phase: 'start' | 'end';
	target: ColorPickerDragTarget;
};

export type ColorPickerDragAction = {
	nextDragging: boolean;
	shouldHandleInteraction: boolean;
	target: ColorPickerDragTarget;
};

export type ColorPickerSliderDraggingState = {
	isDragging1: boolean;
	isDragging2: boolean;
	isDragging3: boolean;
};

export type ResolveColorPickerSliderDraggingStateOptions = ColorPickerSliderDraggingState & {
	nextDragging: boolean;
	sliderIndex: ColorPickerSliderIndex;
};

export type ResolveColorPickerSliderMoveActionOptions = ColorPickerSliderDraggingState & {
	sliderIndex: ColorPickerSliderIndex;
};

export type ColorPickerSliderMoveAction = {
	shouldHandleInteraction: boolean;
};

export type ResolveColorPickerCopySuccessActionOptions = {
	text: string;
};

export type ColorPickerCopySuccessAction = {
	copyText: string;
	hideDelay: number;
	nextShowCopyTip: true;
	shouldEmitCopy: true;
};

export type ColorPickerCopyTipHideAction = {
	nextShowCopyTip: false;
};

export type ResolveColorPickerPanelCanvasMetricsOptions = {
	dpr?: number;
	mode: ColorPickerMode;
	panelHeight: number;
	panelWidth: number;
	wheelSize: number;
};

export type ResolveColorPickerSliderCanvasMetricsOptions = {
	dpr?: number;
	sliderHeight: number;
	sliderWidth: number;
};

export type ResolveColorPickerPointerPointOptions = {
	clientX: number;
	clientY: number;
	rectLeft: number;
	rectTop: number;
};

export type ColorPickerInputKeyboardAction = {
	shouldCommit: boolean;
};

export type ColorPickerPopupLike = {
	visible?: unknown;
};

export type ColorPickerPopupDerived<TPopup extends ColorPickerPopupLike> = Omit<TPopup, 'visible'> & {
	position: 'bottom';
	size: 0;
	transitionDistance: 400;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const toOklchWithPreviousHue = (rgb: [number, number, number], previousHue: number): OklchColor => {
	const oklch = rgbToOklch(rgb[0], rgb[1], rgb[2]);
	return { l: oklch.l, c: oklch.c, h: oklch.h || previousHue };
};

export const resolveColorPickerColorFromRgb = (rgb: [number, number, number], previousHue: number): OklchColor =>
	toOklchWithPreviousHue(rgb, previousHue);

// 输入两个 OKLCH 颜色，返回组件层是否需要同步内部颜色。
// Compare two OKLCH colors and tell the component layer whether internal color should sync.
export const resolveColorPickerShouldSyncColor = (current: OklchColor, next: OklchColor): boolean =>
	current.l !== next.l || current.c !== next.c || current.h !== next.h;

// 输入模式配置，返回框架无关的有效模式列表。
// Resolve mode config into a framework-agnostic effective mode list.
export const resolveColorPickerEffectiveModes = (
	modes: readonly ColorPickerMode[] | undefined = ['oklch', 'rgb', 'hex']
): ColorPickerMode[] => {
	return modes && modes.length > 0 ? [...modes] : ['oklch'];
};

// 输入外部可见值，返回组件内部初始可见状态。
// Normalize an external visible value into the component's initial internal visibility state.
export const resolveColorPickerInitialVisible = (visible?: boolean): boolean => Boolean(visible);

// 输入 ColorPicker 关闭请求，返回组件层可写入的关闭动作和事件决策。
// Receive a ColorPicker close request and return close state plus event decisions for the component layer.
export const resolveColorPickerCloseAction = ({
	colorStrings,
	emitClose = true,
	emitVisible = true,
	shouldClose = true
}: ResolveColorPickerCloseActionOptions): ColorPickerCloseAction => ({
	closeValue: [...colorStrings],
	nextVisible: false,
	shouldClose,
	shouldEmitClose: shouldClose && emitClose,
	shouldEmitVisible: shouldClose && emitVisible
});

// 输入拖拽目标和阶段，返回组件层可写入的拖拽状态。
// Receive the drag target and phase, then return drag state for the component layer.
export const resolveColorPickerDragAction = ({ phase, target }: ResolveColorPickerDragActionOptions): ColorPickerDragAction => ({
	nextDragging: phase === 'start',
	shouldHandleInteraction: phase === 'start',
	target
});

// 输入滑条序号和当前拖拽状态，返回组件层可写入的下一份状态。
// Receive a slider index plus current drag state, then return the next state for component layers to write.
export const resolveColorPickerSliderDraggingState = ({
	isDragging1,
	isDragging2,
	isDragging3,
	nextDragging,
	sliderIndex
}: ResolveColorPickerSliderDraggingStateOptions): ColorPickerSliderDraggingState => ({
	isDragging1: sliderIndex === 1 ? nextDragging : isDragging1,
	isDragging2: sliderIndex === 2 ? nextDragging : isDragging2,
	isDragging3: sliderIndex === 3 ? nextDragging : isDragging3
});

// 输入滑条序号和拖拽状态，返回是否应继续处理当前 pointer move。
// Receive a slider index and drag state, then return whether the pointer move should continue.
export const resolveColorPickerSliderMoveAction = ({
	isDragging1,
	isDragging2,
	isDragging3,
	sliderIndex
}: ResolveColorPickerSliderMoveActionOptions): ColorPickerSliderMoveAction => ({
	shouldHandleInteraction: sliderIndex === 1 ? isDragging1 : sliderIndex === 2 ? isDragging2 : isDragging3
});

// 输入复制成功结果，返回提示状态和事件决策；Clipboard API 留在组件层。
// Receive a copy success result and return tooltip state plus event decisions; Clipboard APIs stay in the component layer.
export const resolveColorPickerCopySuccessAction = ({
	text
}: ResolveColorPickerCopySuccessActionOptions): ColorPickerCopySuccessAction => ({
	copyText: text,
	hideDelay: colorPickerCopyTipHideDelay,
	nextShowCopyTip: true,
	shouldEmitCopy: true
});

// 输入复制提示隐藏时机，返回组件层可写入的隐藏状态。
// Receive the copy tooltip hide timing and return hidden state for the component layer.
export const resolveColorPickerCopyTipHideAction = (): ColorPickerCopyTipHideAction => ({
	nextShowCopyTip: false
});

// 输入当前模式索引和有效模式列表，返回组件层可使用的安全索引。
// Resolve the current mode index and effective modes into a safe index for component state.
export const resolveColorPickerActiveModeIndex = (activeModeIndex: number, effectiveModes: readonly ColorPickerMode[]): number =>
	activeModeIndex >= effectiveModes.length ? 0 : activeModeIndex;

// 输入主题模式值，返回组件层要读取的 CSS 变量名，不读取 DOM。
// Resolve the theme mode value into the CSS variable name for component-level DOM reads.
export const resolveColorPickerThemeColorVariable = (themeMode: string | null | undefined): '--color-dark' | '--color-primary' =>
	themeMode === 'dark' ? '--color-dark' : '--color-primary';

// 输入 CSS 颜色字符串，返回框架无关的 OKLCH 颜色。
// Resolve a CSS color string into a framework-agnostic OKLCH color.
export const resolveColorPickerThemeColorFromCssValue = (
	colorValue: string | undefined,
	fallback: OklchColor = colorPickerDefaultColor
): OklchColor => {
	const value = colorValue?.trim();
	if (!value) return fallback;

	if (value.startsWith('oklch(')) {
		const match = value.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/);
		if (match) {
			const l = parseFloat(match[1]) > 1 ? parseFloat(match[1]) / 100 : parseFloat(match[1]);
			return { l, c: parseFloat(match[2]), h: parseFloat(match[3]) };
		}
	}

	if (value.startsWith('rgb')) {
		const match = value.match(/rgba?\(\s*(\d+)\s*,?\s*(\d+)\s*,?\s*(\d+)/);
		if (match) {
			const oklch = rgbToOklch(parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10));
			return { l: oklch.l, c: oklch.c, h: oklch.h || fallback.h };
		}
	}

	if (value.startsWith('#')) {
		const rgb = hexToRgb(value);
		const oklch = rgbToOklch(rgb[0], rgb[1], rgb[2]);
		return { l: oklch.l, c: oklch.c, h: oklch.h || fallback.h };
	}

	return fallback;
};

export const parseColorPickerValue = (value: ColorPickerValue | undefined, fallback: OklchColor = colorPickerDefaultColor): OklchColor => {
	if (value === undefined) return fallback;
	if (typeof value === 'object' && value !== null && 'l' in value && 'c' in value && 'h' in value) {
		return value as OklchColor;
	}
	if (Array.isArray(value) && value.length === 3) {
		return toOklchWithPreviousHue(value, fallback.h);
	}
	if (typeof value === 'string') {
		const rgb = hexToRgb(value);
		return toOklchWithPreviousHue(rgb, fallback.h);
	}
	return fallback;
};

// 输入外部颜色值和组件读取到的主题色，返回内部 OKLCH 颜色。
// Receive an external color value and component-read theme color, then return the internal OKLCH color.
export const resolveColorPickerInputColor = ({
	value,
	themeColor = colorPickerDefaultColor
}: ResolveColorPickerInputColorOptions = {}): OklchColor => parseColorPickerValue(value, themeColor);

export const resolveColorPickerOutputValue = (color: OklchColor, primaryMode: ColorPickerMode | undefined): ColorPickerValue => {
	if (primaryMode === 'rgb') return oklchToRgb(color.l, color.c, color.h);
	if (primaryMode === 'hex') return rgbToHex(...oklchToRgb(color.l, color.c, color.h));
	return color;
};

export const resolveColorPickerOutputValueFromModes = (
	color: OklchColor,
	modes: readonly ColorPickerMode[] = ['oklch']
): ColorPickerValue => resolveColorPickerOutputValue(color, modes[0]);

export const resolveColorPickerDisplayValues = (color: OklchColor, modes: readonly ColorPickerMode[]): ColorPickerDisplayValues => {
	const rgb = oklchToRgb(color.l, color.c, color.h);
	const hex = rgbToHex(...rgb);
	const oklch = formatOklch(color.l, color.c, color.h);
	const rgbString = formatRgb(...rgb);
	return {
		rgb,
		hex,
		oklch,
		rgbString,
		colorStrings: modes.map((mode) => {
			if (mode === 'oklch') return oklch;
			if (mode === 'rgb') return rgbString;
			return hex;
		})
	};
};

export const resolveColorPickerColorStrings = (color: OklchColor, modes: readonly ColorPickerMode[]): string[] =>
	resolveColorPickerDisplayValues(color, modes).colorStrings;

// 输入下一份颜色和显示模式，返回组件层可写入和可派发的颜色更新动作。
// Receive the next color and display modes, then return color update actions for component code to apply.
export const resolveColorPickerUpdateAction = ({
	color,
	modes = ['oklch'],
	isDirectMode = false
}: ResolveColorPickerUpdateActionOptions): ColorPickerUpdateAction => ({
	changeColors: resolveColorPickerColorStrings(color, modes),
	nextValue: resolveColorPickerOutputValueFromModes(color, modes),
	shouldEmitChange: isDirectMode
});

// 输入颜色值，返回组件层可绑定的预览色样式。
// Receive a color value and return bind-ready preview style for the component layer.
export const resolveColorPickerPreviewStyleValue = (color: string): ColorPickerPreviewStyleValue => ({
	backgroundColor: color
});

export const resolveColorPickerPreviewStyleString = (color: string): string => `background-color:${color}`;

// 输入面板尺寸，返回组件层可绑定的尺寸样式。
// Receive panel size values and return bind-ready size styles for the component layer.
export const resolveColorPickerPanelSizeStyleValue = ({
	width,
	height
}: {
	height: number;
	width: number;
}): ColorPickerPanelSizeStyleValue => ({
	width: `${width}px`,
	height: `${height}px`
});

export const resolveColorPickerPanelSizeStyleString = (options: { height: number; width: number }): string => {
	const style = resolveColorPickerPanelSizeStyleValue(options);
	return `width:${style.width};height:${style.height}`;
};

// 输入面板标记位置和颜色，返回组件层可绑定的标记样式。
// Receive panel marker position and color, then return bind-ready marker style for the component layer.
export const resolveColorPickerPanelMarkerStyleValue = ({
	left,
	top,
	color
}: {
	color: string;
	left: number;
	top: number;
}): ColorPickerPanelMarkerStyleValue => ({
	left: `${left}px`,
	top: `${top}px`,
	backgroundColor: color
});

export const resolveColorPickerPanelMarkerStyleString = (options: { color: string; left: number; top: number }): string => {
	const style = resolveColorPickerPanelMarkerStyleValue(options);
	return `left:${style.left};top:${style.top};background-color:${style.backgroundColor}`;
};

export const resolveColorPickerSliderCanvasStyleValue = (height: number): ColorPickerSliderCanvasStyleValue => ({
	height: `${height}px`
});

export const resolveColorPickerSliderCanvasStyleString = (height: number): string => `height:${height}px`;

export const resolveColorPickerSliderHandleStyleValue = (left: number): ColorPickerSliderHandleStyleValue => ({
	left: `${left}px`,
	border: '1px solid rgba(0,0,0,0.3)'
});

export const resolveColorPickerSliderHandleStyleString = (left: number): string => {
	const style = resolveColorPickerSliderHandleStyleValue(left);
	return `left:${style.left};border:${style.border}`;
};

export const resolveColorPickerInputValues = (
	mode: ColorPickerMode,
	color: OklchColor,
	rgb: [number, number, number]
): [string, string, string] => {
	if (mode === 'oklch') return [color.l.toFixed(3), color.c.toFixed(3), color.h.toFixed(1)];
	if (mode === 'rgb') return [rgb[0].toString(), rgb[1].toString(), rgb[2].toString()];
	return [rgb[0].toString(16).padStart(2, '0'), rgb[1].toString(16).padStart(2, '0'), rgb[2].toString(16).padStart(2, '0')];
};

// 输入 ColorPicker 输入框按键状态，返回组件层是否应提交当前输入。
// Resolve ColorPicker input key state into whether the component layer should commit current input.
export const resolveColorPickerInputKeyboardAction = ({
	key
}: ResolveColorPickerInputKeyboardActionOptions): ColorPickerInputKeyboardAction => ({
	shouldCommit: key === 'Enter'
});

export const resolveColorPickerLabels = (mode: ColorPickerMode): [string, string, string] =>
	mode === 'oklch' ? ['L', 'C', 'H'] : ['R', 'G', 'B'];

export const resolveColorPickerTabLabels = (modes: readonly ColorPickerMode[]) => modes.map((mode) => ({ text: mode.toUpperCase() }));

export const resolveColorPickerIsDirectMode = (popup: unknown): boolean => popup === null;

// 输入 ColorPicker 的 Popup 配置，返回组件层可直接透传的 Popup props。
// Receive ColorPicker Popup config and return pass-through Popup props for the component layer.
export const resolveColorPickerPopupProps = <TPopup extends ColorPickerPopupLike>(
	popup: TPopup | null | undefined
): Partial<ColorPickerPopupDerived<TPopup>> => {
	if (!popup) return {};
	const { visible: _visible, ...restPopup } = popup;
	return {
		size: 0,
		transitionDistance: 400,
		position: 'bottom',
		...restPopup
	} as Partial<ColorPickerPopupDerived<TPopup>>;
};

export const resolveColorPickerRadiusClass = (radius: ColorPickerRadiusKey | '' = '') =>
	radius && radiusObj[radius as keyof typeof radiusObj] ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-md';

export const resolveColorPickerContentClass = (injClass = '') => ['w-full select-none px-6 py-4', injClass].filter(Boolean).join(' ');

// 输入 ColorPicker 布局状态，返回组件实现可复用的框架无关 class。
// Receive ColorPicker layout state and return framework-agnostic classes for component implementations.
export const resolveColorPickerContainerMeasureClass = (): string => 'w-full';

export const resolveColorPickerPreviewClass = (radiusClass: string) =>
	['h-10 w-10 flex-none border border-black/10 dark:border-white/20', radiusClass].filter(Boolean).join(' ');

export const resolveColorPickerPreviewRowClass = (): string => 'mb-3 flex items-center gap-3';

export const resolveColorPickerPreviewTextClass = (): string => 'relative flex-1 text-xs';

export const resolveColorPickerCopyButtonClass = (last = false): string =>
	[
		last ? '' : 'mb-0.5',
		'w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/20'
	]
		.filter(Boolean)
		.join(' ');

export const resolveColorPickerDisplayValueClass = (last = false): string =>
	[last ? '' : 'mb-0.5', 'px-1 py-0.5 font-mono'].filter(Boolean).join(' ');

export const resolveColorPickerCopyTipClass = (): string =>
	'absolute -top-1 right-0 rounded bg-black/80 px-2 py-1 text-xs text-white dark:bg-white/80 dark:text-black';

export const resolveColorPickerInputClass = (): string =>
	'w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark';

export const resolveColorPickerPanelWrapperClass = (mode: ColorPickerMode) =>
	['relative mb-3', mode === 'oklch' ? '' : 'flex justify-center'].filter(Boolean).join(' ');

export const resolveColorPickerPanelCanvasClass = (mode: ColorPickerMode, radiusClass: string) => {
	return [
		'cursor-crosshair touch-none',
		mode === 'oklch' ? radiusClass : '',
		mode === 'oklch' ? 'border border-black/10 dark:border-white/20' : ''
	]
		.filter(Boolean)
		.join(' ');
};

export const resolveColorPickerPanelMarkerClass = (): string =>
	'pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md';

export const resolveColorPickerSliderRowClass = (last = false): string => [last ? 'mb-3' : 'mb-2', 'flex items-center gap-2'].join(' ');

export const resolveColorPickerSliderLabelClass = (): string => 'w-3 flex-none text-xs text-black/60 dark:text-white/60';

export const resolveColorPickerSliderTrackClass = (): string => 'relative flex-1';

export const resolveColorPickerSliderCanvasClass = (radiusClass: string) =>
	['w-full cursor-pointer touch-none border border-black/10 dark:border-white/20', radiusClass].filter(Boolean).join(' ');

export const resolveColorPickerSliderHandleClass = (): string =>
	'pointer-events-none absolute top-0 h-full w-3 -translate-x-1/2 rounded-sm bg-white shadow-md';

export const resolveColorPickerPanelWidth = (containerWidth: number, fallback = 280) => (containerWidth > 0 ? containerWidth : fallback);

export const resolveColorPickerWheelSize = (panelWidth: number, panelHeight: number) => Math.min(panelWidth, panelHeight);

export const resolveColorPickerPanelSize = (mode: ColorPickerMode, panelWidth: number, panelHeight: number, wheelSize: number) => ({
	width: mode === 'oklch' ? panelWidth : wheelSize,
	height: mode === 'oklch' ? panelHeight : wheelSize
});

// 输入组件层测量值，返回框架无关的面板 Canvas 像素尺寸和绘制状态。
// Receive component-measured values and return framework-agnostic panel Canvas pixel metrics and draw state.
export const resolveColorPickerPanelCanvasMetrics = ({
	mode,
	panelWidth,
	panelHeight,
	wheelSize,
	dpr = 1
}: ResolveColorPickerPanelCanvasMetricsOptions): ColorPickerCanvasMetrics => {
	const panelSize = resolveColorPickerPanelSize(mode, panelWidth, panelHeight, wheelSize);
	return {
		pixelHeight: panelSize.height * dpr,
		pixelWidth: panelSize.width * dpr,
		shouldDraw: panelSize.width > 0 && panelSize.height > 0 && dpr > 0
	};
};

// 输入组件层测量值，返回框架无关的滑条 Canvas 像素尺寸和绘制状态。
// Receive component-measured values and return framework-agnostic slider Canvas pixel metrics and draw state.
export const resolveColorPickerSliderCanvasMetrics = ({
	sliderWidth,
	sliderHeight,
	dpr = 1
}: ResolveColorPickerSliderCanvasMetricsOptions): ColorPickerCanvasMetrics => ({
	pixelHeight: sliderHeight * dpr,
	pixelWidth: sliderWidth * dpr,
	shouldDraw: sliderWidth > 0 && sliderHeight > 0 && dpr > 0
});

// 输入 pointer 坐标和组件测量矩形，返回框架无关的本地坐标。
// Receive pointer coordinates plus measured rect offsets and return framework-agnostic local coordinates.
export const resolveColorPickerPointerPoint = ({
	clientX,
	clientY,
	rectLeft,
	rectTop
}: ResolveColorPickerPointerPointOptions): ColorPickerPoint => ({
	x: clientX - rectLeft,
	y: clientY - rectTop
});

// 输入组件层读取的 pointer 与矩形信息，返回框架无关的面板交互下一颜色。
// Receive component-read pointer and rect data, then return the next framework-agnostic panel color.
export const resolveColorPickerPanelInteractionColor = ({
	clientX,
	clientY,
	rectLeft,
	rectTop,
	...options
}: ResolveColorPickerPanelInteractionColorOptions): OklchColor => {
	const point = resolveColorPickerPointerPoint({ clientX, clientY, rectLeft, rectTop });
	return resolveColorPickerPanelNextColor({ ...options, x: point.x, y: point.y });
};

// 输入组件层读取的 pointer 与滑条宽度，返回框架无关的滑条交互下一颜色。
// Receive component-read pointer and slider width, then return the next framework-agnostic slider color.
export const resolveColorPickerSliderInteractionColor = ({
	clientX,
	rectLeft,
	rectWidth,
	...options
}: ResolveColorPickerSliderInteractionColorOptions): OklchColor =>
	resolveColorPickerSliderNextColor({ ...options, sliderWidth: rectWidth, x: clientX - rectLeft });

export const resolveColorPickerPanelPosition = (options: {
	mode: ColorPickerMode;
	color: OklchColor;
	rgb: [number, number, number];
	panelWidth: number;
	panelHeight: number;
	wheelSize: number;
}): ColorPickerPoint => {
	const { mode, color, rgb, panelWidth, panelHeight, wheelSize } = options;
	if (mode === 'oklch') {
		const displayC = Math.min(color.c, getMaxChroma(color.l, color.h));
		return {
			x: (displayC / 0.4) * panelWidth,
			y: (1 - color.l) * panelHeight
		};
	}

	const [hue, saturation] = rgbToHsl(...rgb);
	const radius = wheelSize / 2;
	const angle = (hue * Math.PI) / 180;
	const dist = saturation * radius;
	return {
		x: radius + Math.cos(angle) * dist,
		y: radius + Math.sin(angle) * dist
	};
};

export const resolveColorPickerPanelMarkerLeft = (mode: ColorPickerMode, panelWidth: number, wheelSize: number, panelPositionX: number) =>
	mode === 'oklch' ? panelPositionX : (panelWidth - wheelSize) / 2 + panelPositionX;

export const resolveColorPickerSliderPosition = (options: {
	mode: ColorPickerMode;
	sliderIndex: ColorPickerSliderIndex;
	color: OklchColor;
	rgb: [number, number, number];
	sliderWidth: number;
}) => {
	const { mode, sliderIndex, color, rgb, sliderWidth } = options;
	if (sliderWidth <= 0) return 0;
	if (mode === 'oklch') {
		if (sliderIndex === 1) return color.l * sliderWidth;
		if (sliderIndex === 2) return (Math.min(color.c, getMaxChroma(color.l, color.h)) / 0.4) * sliderWidth;
		return (color.h / 360) * sliderWidth;
	}
	return (rgb[sliderIndex - 1] / 255) * sliderWidth;
};

// 输入颜色、布局尺寸和当前模式，返回组件层可直接绑定的控制点派生值。
// Resolve color, layout sizes and mode into control-point derived values for component bindings.
export const resolveColorPickerControlDerived = ({
	mode,
	color,
	rgb,
	panelWidth,
	panelHeight,
	wheelSize,
	sliderWidth
}: ResolveColorPickerControlDerivedOptions): ColorPickerControlDerived => {
	const panelPosition = resolveColorPickerPanelPosition({ mode, color, rgb, panelWidth, panelHeight, wheelSize });
	return {
		labels: resolveColorPickerLabels(mode),
		panelPosition,
		panelSize: resolveColorPickerPanelSize(mode, panelWidth, panelHeight, wheelSize),
		panelMarkerLeft: resolveColorPickerPanelMarkerLeft(mode, panelWidth, wheelSize, panelPosition.x),
		slider1Position: resolveColorPickerSliderPosition({ mode, sliderIndex: 1, color, rgb, sliderWidth }),
		slider2Position: resolveColorPickerSliderPosition({ mode, sliderIndex: 2, color, rgb, sliderWidth }),
		slider3Position: resolveColorPickerSliderPosition({ mode, sliderIndex: 3, color, rgb, sliderWidth })
	};
};

const createColorPickerSliderRenderState = (position: number): ColorPickerSliderRenderState => ({
	handleStyleString: resolveColorPickerSliderHandleStyleString(position),
	handleStyleValue: resolveColorPickerSliderHandleStyleValue(position),
	position
});

// 输入 ColorPicker 的 props 和组件层测量值，返回框架无关的渲染派生结果。
// Receive ColorPicker props and component-layer measurements, then return framework-agnostic render derivations.
export const resolveColorPickerDerived = <TPopup extends ColorPickerPopupLike = ColorPickerPopupLike>({
	activeModeIndex = 0,
	color,
	containerWidth = 0,
	fallbackPanelWidth = 280,
	injClass = '',
	modes = ['oklch', 'rgb', 'hex'],
	panelHeight = 160,
	popup = {} as TPopup,
	popupProps,
	radius = 'md',
	sliderHeight = 24,
	sliderWidth = 0
}: ResolveColorPickerDerivedOptions<TPopup>): ColorPickerDerived<TPopup> => {
	const effectiveModes = resolveColorPickerEffectiveModes(modes);
	const safeActiveModeIndex = resolveColorPickerActiveModeIndex(activeModeIndex, effectiveModes);
	const colorMode = effectiveModes[safeActiveModeIndex] || 'oklch';
	const colorDisplay = resolveColorPickerDisplayValues(color, effectiveModes);
	const currentRgb = colorDisplay.rgb;
	const currentHex = colorDisplay.hex;
	const radiusClass = resolveColorPickerRadiusClass(radius);
	const panelWidth = resolveColorPickerPanelWidth(containerWidth, fallbackPanelWidth);
	const wheelSize = resolveColorPickerWheelSize(panelWidth, panelHeight);
	const controlDerived = resolveColorPickerControlDerived({
		mode: colorMode,
		color,
		rgb: currentRgb,
		panelWidth,
		panelHeight,
		wheelSize,
		sliderWidth
	});
	const panelMarkerStyleOptions = { left: controlDerived.panelMarkerLeft, top: controlDerived.panelPosition.y, color: currentHex };

	return {
		colorDisplay,
		colorMode,
		colorStrings: colorDisplay.colorStrings,
		containerMeasureClass: resolveColorPickerContainerMeasureClass(),
		contentClass: resolveColorPickerContentClass(injClass),
		controlDerived,
		copyButtonClass: resolveColorPickerCopyButtonClass(),
		copyLastButtonClass: resolveColorPickerCopyButtonClass(true),
		copyTipClass: resolveColorPickerCopyTipClass(),
		currentHex,
		currentOklch: colorDisplay.oklch,
		currentRgb,
		currentRgbStr: colorDisplay.rgbString,
		displayLastValueClass: resolveColorPickerDisplayValueClass(true),
		displayValueClass: resolveColorPickerDisplayValueClass(),
		effectiveModes,
		inputClass: resolveColorPickerInputClass(),
		inputValues: resolveColorPickerInputValues(colorMode, color, currentRgb),
		isDirectMode: resolveColorPickerIsDirectMode(popup),
		labels: controlDerived.labels,
		panelCanvasClass: resolveColorPickerPanelCanvasClass(colorMode, radiusClass),
		panelMarkerClass: resolveColorPickerPanelMarkerClass(),
		panelMarkerStyleString: resolveColorPickerPanelMarkerStyleString(panelMarkerStyleOptions),
		panelMarkerStyleValue: resolveColorPickerPanelMarkerStyleValue(panelMarkerStyleOptions),
		panelPosition: controlDerived.panelPosition,
		panelSize: controlDerived.panelSize,
		panelSizeStyleString: resolveColorPickerPanelSizeStyleString(controlDerived.panelSize),
		panelSizeStyleValue: resolveColorPickerPanelSizeStyleValue(controlDerived.panelSize),
		panelWidth,
		panelWrapperClass: resolveColorPickerPanelWrapperClass(colorMode),
		popupProps: resolveColorPickerPopupProps<TPopup>(popupProps === undefined ? popup : popupProps),
		previewClass: resolveColorPickerPreviewClass(radiusClass),
		previewRowClass: resolveColorPickerPreviewRowClass(),
		previewStyleString: resolveColorPickerPreviewStyleString(currentHex),
		previewStyleValue: resolveColorPickerPreviewStyleValue(currentHex),
		previewTextClass: resolveColorPickerPreviewTextClass(),
		radiusClass,
		safeActiveModeIndex,
		slider1: createColorPickerSliderRenderState(controlDerived.slider1Position),
		slider2: createColorPickerSliderRenderState(controlDerived.slider2Position),
		slider3: createColorPickerSliderRenderState(controlDerived.slider3Position),
		sliderCanvasClass: resolveColorPickerSliderCanvasClass(radiusClass),
		sliderCanvasStyleString: resolveColorPickerSliderCanvasStyleString(sliderHeight),
		sliderCanvasStyleValue: resolveColorPickerSliderCanvasStyleValue(sliderHeight),
		sliderHandleClass: resolveColorPickerSliderHandleClass(),
		sliderLabelClass: resolveColorPickerSliderLabelClass(),
		sliderLastRowClass: resolveColorPickerSliderRowClass(true),
		sliderRowClass: resolveColorPickerSliderRowClass(),
		sliderTrackClass: resolveColorPickerSliderTrackClass(),
		tabLabels: resolveColorPickerTabLabels(effectiveModes),
		wheelSize
	};
};

export const resolveColorPickerPanelNextColor = (options: ResolveColorPickerPanelNextColorOptions): OklchColor => {
	const { mode, color, rgb, panelWidth, panelHeight, wheelSize, x, y } = options;
	if (mode === 'oklch') {
		const safeX = clamp(x, 0, panelWidth);
		const safeY = clamp(y, 0, panelHeight);
		const l = 1 - safeY / panelHeight;
		const nextC = (safeX / panelWidth) * 0.4;
		return { l, c: Math.min(nextC, getMaxChroma(l, color.h)), h: color.h };
	}

	const radius = wheelSize / 2;
	const dx = x - radius;
	const dy = y - radius;
	const dist = Math.sqrt(dx * dx + dy * dy);
	const angle = Math.atan2(dy, dx);
	const hue = ((angle * 180) / Math.PI + 360) % 360;
	const saturation = Math.min(dist, radius) / radius;
	const [, , currentL] = rgbToHsl(...rgb);
	return toOklchWithPreviousHue(hslToRgb(hue, saturation, currentL), color.h);
};

export const resolveColorPickerSliderNextColor = (options: ResolveColorPickerSliderNextColorOptions): OklchColor => {
	const { mode, sliderIndex, color, rgb, sliderWidth, x } = options;
	const safeX = clamp(x, 0, sliderWidth);

	if (mode === 'oklch') {
		if (sliderIndex === 1) {
			const l = safeX / sliderWidth;
			return { l, c: Math.min(color.c, getMaxChroma(l, color.h)), h: color.h };
		}
		if (sliderIndex === 2) {
			const c = (safeX / sliderWidth) * 0.4;
			return { l: color.l, c: Math.min(c, getMaxChroma(color.l, color.h)), h: color.h };
		}
		const h = (safeX / sliderWidth) * 360;
		return { l: color.l, c: Math.min(color.c, getMaxChroma(color.l, h)), h };
	}

	const nextRgb: [number, number, number] = [...rgb];
	nextRgb[sliderIndex - 1] = Math.round((safeX / sliderWidth) * 255);
	return toOklchWithPreviousHue(nextRgb, color.h);
};

export const resolveColorPickerInputNextColor = (options: ResolveColorPickerInputNextColorOptions): OklchColor | null => {
	const { mode, inputIndex, input, color, rgb } = options;

	if (mode === 'oklch') {
		const value = parseFloat(input);
		if (Number.isNaN(value)) return null;
		if (inputIndex === 1 && value >= 0 && value <= 1) return { l: value, c: Math.min(color.c, getMaxChroma(value, color.h)), h: color.h };
		if (inputIndex === 2 && value >= 0 && value <= 0.4)
			return { l: color.l, c: Math.min(value, getMaxChroma(color.l, color.h)), h: color.h };
		if (inputIndex === 3) {
			const h = ((value % 360) + 360) % 360;
			return { l: color.l, c: Math.min(color.c, getMaxChroma(color.l, h)), h };
		}
		return null;
	}

	const value = parseInt(input, mode === 'hex' ? 16 : 10);
	if (Number.isNaN(value) || value < 0 || value > 255) return null;
	const nextRgb: [number, number, number] = [...rgb];
	nextRgb[inputIndex - 1] = value;
	return toOklchWithPreviousHue(nextRgb, color.h);
};

// 只计算 ColorPicker 面板单个像素颜色，不读取 Canvas 或 DOM。
// Only calculate one ColorPicker panel pixel without reading Canvas or DOM.
export const resolveColorPickerPanelPixel = ({
	mode,
	color,
	rgb,
	x,
	y,
	width,
	height,
	dpr = 1
}: ResolveColorPickerPanelPixelOptions): ColorPickerRgba => {
	if (mode === 'oklch') {
		const l = 1 - y / height;
		const c = (x / width) * 0.4;
		if (isDisplayable(l, c, color.h)) {
			const [r, g, b] = oklchToRgb(l, c, color.h);
			return [r, g, b, 255];
		}

		const checkSize = 4 * dpr;
		const isLight = (Math.floor(x / checkSize) + Math.floor(y / checkSize)) % 2 === 0;
		const gray = isLight ? 200 : 180;
		return [gray, gray, gray, 255];
	}

	const size = width;
	const radius = size / 2;
	const dx = x - radius;
	const dy = y - radius;
	const dist = Math.sqrt(dx * dx + dy * dy);
	const edgeWidth = 1.5 * dpr;

	if (dist > radius + edgeWidth) return [0, 0, 0, 0];

	const angle = Math.atan2(dy, dx);
	const hue = ((angle * 180) / Math.PI + 360) % 360;
	const saturation = Math.min(dist / radius, 1);
	const [, , currentL] = rgbToHsl(...rgb);
	const [r, g, b] = hslToRgb(hue, saturation, currentL);
	const alpha = dist > radius - edgeWidth ? Math.round(Math.max(0, 1 - (dist - radius + edgeWidth) / (edgeWidth * 2)) * 255) : 255;

	return [r, g, b, alpha];
};

// 只计算 ColorPicker 滑条单个像素颜色，不处理 ImageData 写入。
// Only calculate one ColorPicker slider pixel without writing ImageData.
export const resolveColorPickerSliderPixel = ({
	mode,
	sliderIndex,
	color,
	x,
	width
}: ResolveColorPickerSliderPixelOptions): ColorPickerRgba => {
	if (mode === 'oklch') {
		if (sliderIndex === 1) {
			const l = x / width;
			const c = Math.min(color.c, getMaxChroma(l, color.h));
			return [...oklchToRgb(l, c, color.h), 255];
		}
		if (sliderIndex === 2) {
			const c = (x / width) * 0.4;
			if (isDisplayable(color.l, c, color.h)) {
				return [...oklchToRgb(color.l, c, color.h), 255];
			}
			return [180, 180, 180, 255];
		}

		const hue = (x / width) * 360;
		const fixedL = 0.7;
		const fixedC = 0.15;
		const c = Math.min(fixedC, getMaxChroma(fixedL, hue));
		return [...oklchToRgb(fixedL, c, hue), 255];
	}

	if (sliderIndex === 1) return [Math.round((x / width) * 255), 0, 0, 255];
	if (sliderIndex === 2) return [0, Math.round((x / width) * 255), 0, 255];
	return [0, 0, Math.round((x / width) * 255), 255];
};

// 输入 Canvas 尺寸和颜色状态，返回框架无关的面板像素数据。
// Receive Canvas dimensions and color state, then return framework-agnostic panel pixel data.
export const resolveColorPickerPanelBitmapData = ({
	mode,
	color,
	rgb,
	width,
	height,
	dpr = 1
}: ResolveColorPickerPanelBitmapDataOptions): Uint8ClampedArray => {
	const data = new Uint8ClampedArray(width * height * 4);

	for (let y = 0; y < height; y += 1) {
		for (let x = 0; x < width; x += 1) {
			const index = (y * width + x) * 4;
			const [r, g, b, alpha] = resolveColorPickerPanelPixel({ mode, color, rgb, x, y, width, height, dpr });
			data[index] = r;
			data[index + 1] = g;
			data[index + 2] = b;
			data[index + 3] = alpha;
		}
	}

	return data;
};

// 输入 Canvas 尺寸和颜色状态，返回框架无关的滑条像素数据。
// Receive Canvas dimensions and color state, then return framework-agnostic slider pixel data.
export const resolveColorPickerSliderBitmapData = ({
	mode,
	sliderIndex,
	color,
	width,
	height
}: ResolveColorPickerSliderBitmapDataOptions): Uint8ClampedArray => {
	const data = new Uint8ClampedArray(width * height * 4);

	for (let x = 0; x < width; x += 1) {
		const [r, g, b, alpha] = resolveColorPickerSliderPixel({ mode, sliderIndex, color, x, width });

		for (let y = 0; y < height; y += 1) {
			const index = (y * width + x) * 4;
			data[index] = r;
			data[index + 1] = g;
			data[index + 2] = b;
			data[index + 3] = alpha;
		}
	}

	return data;
};
