import { radiusObj } from './common.js';
import { resolveSkeletonSvg, type BuiltInIconLibrary } from '../svg/common.js';

export const skeletonBgClass = {
	gray: 'bg-black/20 dark:bg-white/20',
	theme: 'bg-primary/20 dark:bg-dark/20'
} as const;

export const skeletonWidthObj = {
	full: ' w-full',
	'2': ' w-2',
	'4': ' w-4',
	'6': ' w-6',
	'8': ' w-8',
	'12': ' w-12',
	'16': ' w-16',
	'24': ' w-24',
	'32': ' w-32',
	'48': ' w-48',
	'64': ' w-64',
	'96': ' w-96'
} as const;

export const skeletonHeightObj = {
	'1': ' h-1',
	'2': ' h-2',
	'4': ' h-4',
	'6': ' h-6',
	'8': ' h-8',
	'12': ' h-12',
	'16': ' h-16',
	'24': ' h-24',
	'32': ' h-32',
	'48': ' h-48',
	'64': ' h-64',
	'96': ' h-96'
} as const;

export const skeletonPaddingObj = {
	'0.5': ' p-0.5',
	'1': ' p-1',
	'2': ' p-2',
	'4': ' p-4',
	'8': ' p-8'
} as const;

export const skeletonRandomWidthList = ['w-1/2', 'w-1/3', 'w-2/3', 'w-1/4', 'w-3/4', 'w-2/5', 'w-3/5', 'w-4/5', 'w-5/6'] as const;
export const skeletonIconTypes = ['img', 'video', 'code', 'qrcode', 'barcode'] as const;

export type SkeletonTypeKey = 'div' | 'p' | 'img' | 'video' | 'code' | 'qrcode' | 'barcode' | string;
export type SkeletonRadiusKey = keyof typeof radiusObj | string;
export type SkeletonWidthKey = keyof typeof skeletonWidthObj | string;
export type SkeletonHeightKey = keyof typeof skeletonHeightObj | string;
export type SkeletonSpaceKey = keyof typeof skeletonPaddingObj | string;
export type SkeletonBgKey = keyof typeof skeletonBgClass | string;
export type SkeletonEffectKey = 'pulse' | 'wave' | 'breathe' | string;
export type SkeletonIconRatioStyleValue = {
	width: string;
};
export type SkeletonDisplayState = {
	showBlock: boolean;
	showIcon: boolean;
	showParagraph: boolean;
};

export type ResolveSkeletonClassesOptions = {
	type?: SkeletonTypeKey;
	width?: SkeletonWidthKey;
	height?: SkeletonHeightKey;
	radius?: SkeletonRadiusKey | '';
	space?: SkeletonSpaceKey;
	effect?: SkeletonEffectKey;
	bg?: SkeletonBgKey;
};

export type ResolveSkeletonDerivedOptions = ResolveSkeletonClassesOptions & {
	builtInIconLibrary?: BuiltInIconLibrary;
	lines?: number;
	iconRatio?: number;
	randomValue?: number;
};

export type SkeletonStatePropsLike = Partial<Omit<ResolveSkeletonDerivedOptions, 'randomValue'>>;

export type ResolveSkeletonStateOptionsParams = {
	props: SkeletonStatePropsLike;
	randomValue?: number;
};
export type ResolveSkeletonRandomValueOptions = {
	random?: number;
};

export type SkeletonDerived = {
	classes: ReturnType<typeof resolveSkeletonClasses>;
	displayState: SkeletonDisplayState;
	paragraphClass: string;
	iconWrapClass: string;
	iconSvgClass: string;
	randomLineClass: string;
	paragraphLineIndexes: number[];
	iconRatioStyleValue: SkeletonIconRatioStyleValue;
	iconRatioStyleString: string;
	iconSvg: ReturnType<typeof resolveSkeletonSvg>;
	css: string;
};

export const resolveSkeletonRadiusClass = (radius: SkeletonRadiusKey | '' = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-box)';

export const resolveSkeletonWidthClass = (width: SkeletonWidthKey = '6') =>
	skeletonWidthObj[width as keyof typeof skeletonWidthObj] || skeletonWidthObj.full;

export const resolveSkeletonHeightClass = (height: SkeletonHeightKey = '6') =>
	skeletonHeightObj[height as keyof typeof skeletonHeightObj] || skeletonHeightObj['6'];

export const resolveSkeletonPaddingClass = (space: SkeletonSpaceKey = '1') =>
	skeletonPaddingObj[space as keyof typeof skeletonPaddingObj] || skeletonPaddingObj['1'];

export const resolveSkeletonBgClass = (bg: SkeletonBgKey = 'gray') =>
	skeletonBgClass[bg as keyof typeof skeletonBgClass] || skeletonBgClass.gray;

export const resolveSkeletonEffectClass = (effect: SkeletonEffectKey = 'pulse') =>
	effect === 'pulse' ? 'animate-pulse' : effect === 'wave' ? 'skeleton-wave' : effect === 'breathe' ? 'skeleton-breathe' : '';

// 输入组件运行时随机源，返回 Skeleton 公共派生层使用的稳定随机值。
// Receive the component runtime random source and return the stable random value consumed by Skeleton derivations.
export const resolveSkeletonRandomValue = ({ random = 0 }: ResolveSkeletonRandomValueOptions = {}): number =>
	Math.max(0, Math.min(random, 1));

// 输入 Skeleton 类型，返回框架无关的展示分支。
// Receive Skeleton type and return framework-agnostic display branches.
export const resolveSkeletonDisplayState = (type: SkeletonTypeKey = 'div'): SkeletonDisplayState => {
	const showParagraph = type === 'p';
	return {
		showParagraph,
		showBlock: !showParagraph,
		showIcon: skeletonIconTypes.includes(type as (typeof skeletonIconTypes)[number])
	};
};

export const resolveSkeletonWrapperClass = (options: Pick<ResolveSkeletonClassesOptions, 'type' | 'width' | 'space' | 'effect'> = {}) => {
	const { type = 'div', width = '6', space = '1', effect = 'pulse' } = options;
	return [
		resolveSkeletonEffectClass(effect),
		type === 'p' || width === 'full' ? 'block' : 'inline-block',
		resolveSkeletonPaddingClass(space)
	]
		.filter(Boolean)
		.join(' ');
};

export const resolveSkeletonParagraphClass = (): string => 'flex flex-col space-y-2';

export const resolveSkeletonIconWrapClass = (): string => 'm-auto';

export const resolveSkeletonIconSvgClass = (): string => 'opacity-20';

// 输入 Skeleton 的 props 状态，返回框架无关的 class 集合。
// Resolve Skeleton props state into framework-agnostic class groups.
export const resolveSkeletonClasses = (options: ResolveSkeletonClassesOptions = {}) => {
	const { type = 'div', width = '6', height = '6', radius = '', space = '1', effect = 'pulse', bg = 'gray' } = options;
	const radiusClass = resolveSkeletonRadiusClass(radius);
	const heightClass = resolveSkeletonHeightClass(height);
	const bgClass = resolveSkeletonBgClass(bg);

	return {
		radiusClass,
		widthClass: resolveSkeletonWidthClass(width),
		heightClass,
		paddingClass: resolveSkeletonPaddingClass(space),
		bgClass,
		effectClass: resolveSkeletonEffectClass(effect),
		wrapperClass: resolveSkeletonWrapperClass({ type, width, space, effect }),
		lineClass: ['skeleton-item w-full', bgClass, heightClass, radiusClass].join(' '),
		randomLineBaseClass: ['skeleton-item', bgClass, heightClass, radiusClass].join(' '),
		blockClass: ['skeleton-item flex flex-col justify-center', bgClass, resolveSkeletonWidthClass(width), heightClass, radiusClass].join(
			' '
		)
	};
};

export const resolveSkeletonRandomWidthClass = (randomValue = 0) => {
	const index = Math.floor(randomValue * skeletonRandomWidthList.length);
	return skeletonRandomWidthList[Math.max(0, Math.min(index, skeletonRandomWidthList.length - 1))];
};

// 输入 Skeleton 随机值和基础 class，返回框架无关的随机行 class。
// Receive a Skeleton random value and base class, then return a framework-agnostic random line class.
export const resolveSkeletonRandomLineClass = (randomValue = 0, baseClass = ''): string =>
	[baseClass, resolveSkeletonRandomWidthClass(randomValue)].filter(Boolean).join(' ');

export const resolveSkeletonParagraphLineCount = (lines = 3): number => Math.max(lines - 1, 0);

// 输入 Skeleton 行数，返回组件层可直接迭代的稳定索引。
// Resolve Skeleton line count into stable indexes that components can iterate directly.
export const resolveSkeletonParagraphLineIndexes = (lines = 3): number[] =>
	Array.from({ length: resolveSkeletonParagraphLineCount(lines) }, (_, index) => index);

export const resolveSkeletonIconRatioStyle = (iconRatio = 0.6) => `${iconRatio * 100}%`;

// 输入 Skeleton 图标比例，返回组件层可直接绑定的图标容器宽度样式。
// Receive Skeleton icon ratio and return bind-ready icon container width styles for the component layer.
export const resolveSkeletonIconRatioStyleValue = (iconRatio = 0.6): SkeletonIconRatioStyleValue => ({
	width: resolveSkeletonIconRatioStyle(iconRatio)
});

export const resolveSkeletonIconRatioStyleString = (iconRatio = 0.6): string => `width:${resolveSkeletonIconRatioStyle(iconRatio)}`;

// 输入 Skeleton 动画需求，返回框架无关的动画 CSS 字符串。
// Resolve Skeleton animation needs into a framework-agnostic CSS string.
export const resolveSkeletonAnimationCss = (): string => `.skeleton-wave .skeleton-item {
	position: relative;
	overflow: hidden;
}

.skeleton-wave .skeleton-item::after {
	content: '';
	position: absolute;
	inset: 0;
	background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.3), transparent);
	animation: skeleton-wave 1.5s infinite;
}

@keyframes skeleton-wave {
	0% {
		transform: translateX(-100%);
	}

	100% {
		transform: translateX(100%);
	}
}

.skeleton-breathe .skeleton-item {
	animation: skeleton-breathe 2s ease-in-out infinite;
}

@keyframes skeleton-breathe {
	0%,
	100% {
		opacity: 1;
		transform: scale(1);
	}

	50% {
		opacity: 0.5;
		transform: scale(0.97);
	}
}`;

// 输入组件 props 和稳定随机值，返回框架无关的 Skeleton 派生入参。
// Receive component props and stable random value, then return framework-agnostic Skeleton derivation options.
export const resolveSkeletonStateOptions = ({ props, randomValue }: ResolveSkeletonStateOptionsParams): ResolveSkeletonDerivedOptions => ({
	bg: props.bg,
	builtInIconLibrary: props.builtInIconLibrary,
	effect: props.effect,
	height: props.height,
	iconRatio: props.iconRatio,
	lines: props.lines,
	radius: props.radius,
	randomValue,
	space: props.space,
	type: props.type,
	width: props.width
});

// 输入 Skeleton 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Skeleton state and return framework-agnostic derived values ready for component binding.
export const resolveSkeletonDerived = (options: ResolveSkeletonDerivedOptions = {}): SkeletonDerived => {
	const {
		builtInIconLibrary,
		type = 'div',
		width = '6',
		height = '6',
		radius = '',
		space = '1',
		lines = 3,
		iconRatio = 0.6,
		effect = 'pulse',
		bg = 'gray',
		randomValue = 0
	} = options;
	const classes = resolveSkeletonClasses({ type, width, height, radius, space, effect, bg });

	return {
		classes,
		displayState: resolveSkeletonDisplayState(type),
		paragraphClass: resolveSkeletonParagraphClass(),
		iconWrapClass: resolveSkeletonIconWrapClass(),
		iconSvgClass: resolveSkeletonIconSvgClass(),
		randomLineClass: resolveSkeletonRandomLineClass(randomValue, classes.randomLineBaseClass),
		paragraphLineIndexes: resolveSkeletonParagraphLineIndexes(lines),
		iconRatioStyleValue: resolveSkeletonIconRatioStyleValue(iconRatio),
		iconRatioStyleString: resolveSkeletonIconRatioStyleString(iconRatio),
		iconSvg: resolveSkeletonSvg(type, builtInIconLibrary),
		css: resolveSkeletonAnimationCss()
	};
};
