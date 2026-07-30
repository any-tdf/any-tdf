import { joinClasses } from './helpers.js';

export const dividerPxObj = {
	'0': 'px-0',
	'4': 'px-4',
	'8': 'px-8',
	'16': 'px-16',
	'36': 'px-36'
} as const;

export const dividerPyObj = {
	'0': 'py-0',
	'4': 'py-4',
	'8': 'py-8'
} as const;

export const dividerMxObj = {
	'1': 'm-1',
	'2': 'm-2',
	'4': 'm-4'
} as const;

export const dividerLineObj = {
	solid: 'border-solid',
	dashed: 'border-dashed',
	dotted: 'border-dotted'
} as const;

export const dividerWeightHObj = {
	'1': 'border-t',
	'2': 'border-t-2 rounded-full',
	'4': 'border-t-4 rounded-full'
} as const;

export const dividerWeightWObj = {
	'1': 'border-r',
	'2': 'border-r-2 rounded-full',
	'4': 'border-r-4 rounded-full'
} as const;

export type DividerLayout = 'h' | 'v';
export type DividerAlign = 'left' | 'center' | 'right' | string;
export type DividerScaleKey = string;
export type DividerLineKey = keyof typeof dividerLineObj | string;

export type ResolveDividerClassOptions = {
	px?: DividerScaleKey;
	py?: DividerScaleKey;
	mx?: DividerScaleKey;
	weight?: DividerScaleKey;
	line?: DividerLineKey;
	injClass?: string;
};

export type ResolveDividerVisibilityOptions = {
	text?: string;
	align?: DividerAlign;
};

export type DividerLineVisibility = {
	showLeadingLine: boolean;
	showText: boolean;
	showTrailingLine: boolean;
};
export type ResolveDividerDerivedOptions = ResolveDividerClassOptions &
	ResolveDividerVisibilityOptions & {
		layout?: DividerLayout;
	};
export type DividerStatePropsLike = Partial<ResolveDividerDerivedOptions>;
export type ResolveDividerStateOptionsParams = {
	props: DividerStatePropsLike;
};

export type DividerDerived = {
	horizontalClass: string;
	isVertical: boolean;
	lineClass: string;
	lineVisibility: DividerLineVisibility;
	textClass: string;
	verticalClass: string;
};

// 输入 Divider 状态，返回框架无关的垂直分隔线 class。
// Resolve Divider state into framework-agnostic vertical divider classes.
export const resolveDividerVerticalClass = ({
	mx = '1',
	weight = '1',
	line = 'solid',
	injClass = ''
}: ResolveDividerClassOptions = {}): string =>
	joinClasses([
		'inline',
		dividerWeightWObj[weight as keyof typeof dividerWeightWObj] || dividerWeightWObj['1'],
		'border-black/10 dark:border-white/20',
		dividerMxObj[mx as keyof typeof dividerMxObj] || dividerMxObj['1'],
		dividerLineObj[line as keyof typeof dividerLineObj] || dividerLineObj.solid,
		injClass
	]);

// 输入 Divider 状态，返回框架无关的水平容器 class。
// Resolve Divider state into framework-agnostic horizontal container classes.
export const resolveDividerHorizontalClass = ({ px = '0', py = '4' }: ResolveDividerClassOptions = {}): string =>
	joinClasses([
		'flex items-center',
		dividerPxObj[px as keyof typeof dividerPxObj] || dividerPxObj['0'],
		dividerPyObj[py as keyof typeof dividerPyObj] || dividerPyObj['4']
	]);

// 输入 Divider 状态，返回框架无关的水平线 class。
// Resolve Divider state into framework-agnostic horizontal line classes.
export const resolveDividerLineClass = ({ weight = '1', line = 'solid', injClass = '' }: ResolveDividerClassOptions = {}): string =>
	joinClasses([
		'grow',
		dividerWeightHObj[weight as keyof typeof dividerWeightHObj] || dividerWeightHObj['1'],
		'border-black/10 dark:border-white/20',
		dividerLineObj[line as keyof typeof dividerLineObj] || dividerLineObj.solid,
		injClass
	]);

// 输入 Divider 注入 class，返回框架无关的文本 class。
// Resolve Divider injected class into framework-agnostic text classes.
export const resolveDividerTextClass = (injClass = ''): string => joinClasses(['mx-2 flex-none text-xs text-gray-400', injClass]);

// 输入 Divider 文本和对齐状态，返回组件层需要渲染的纯可见性分支。
// Resolve Divider text and alignment into pure visibility branches for the component layer.
export const resolveDividerLineVisibility = ({
	text = '',
	align = 'center'
}: ResolveDividerVisibilityOptions = {}): DividerLineVisibility => ({
	showLeadingLine: text === '' || align !== 'left',
	showText: text !== '',
	showTrailingLine: text === '' || align !== 'right'
});

// 输入组件 props，返回框架无关的 Divider 派生入参。
// Receive component props and return framework-agnostic Divider derivation options.
export const resolveDividerStateOptions = ({ props }: ResolveDividerStateOptionsParams): ResolveDividerDerivedOptions => ({
	align: props.align,
	injClass: props.injClass,
	layout: props.layout,
	line: props.line,
	mx: props.mx,
	px: props.px,
	py: props.py,
	text: props.text,
	weight: props.weight
});

// 输入 Divider 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Divider state and return framework-agnostic derived values ready for component binding.
export const resolveDividerDerived = ({
	layout = 'h',
	px = '0',
	py = '4',
	text = '',
	align = 'center',
	line = 'solid',
	mx = '1',
	weight = '1',
	injClass = ''
}: ResolveDividerDerivedOptions = {}): DividerDerived => ({
	isVertical: layout === 'v',
	verticalClass: resolveDividerVerticalClass({ mx, weight, line, injClass }),
	horizontalClass: resolveDividerHorizontalClass({ px, py }),
	lineClass: resolveDividerLineClass({ weight, line, injClass }),
	textClass: resolveDividerTextClass(injClass),
	lineVisibility: resolveDividerLineVisibility({ text, align })
});
