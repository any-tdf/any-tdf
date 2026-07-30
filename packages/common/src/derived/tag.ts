import { radiusObj } from './common.js';
import { joinClasses, resolveFocusableTabIndex } from './helpers.js';

export const tagStateBaseObj = {
	theme: 'bg-primary dark:bg-dark text-white dark:text-black',
	success: 'bg-success text-white',
	warning: 'bg-warning text-white',
	error: 'bg-error text-white',
	info: 'bg-info text-white',
	neutral: 'bg-black/30 text-white dark:bg-white/30 dark:text-black'
} as const;

export const tagStateLineObj = {
	theme: 'border border-primary dark:border-dark text-primary dark:text-dark bg-transparent',
	success: 'border border-success text-success bg-transparent',
	warning: 'border border-warning text-warning bg-transparent',
	error: 'border border-error text-error bg-transparent',
	info: 'border border-info text-info bg-transparent',
	neutral: 'border border-black/20 text-black/50 bg-transparent dark:border-white/20 dark:text-white/50'
} as const;

export const tagStateLightObj = {
	theme: 'bg-primary/10 dark:bg-dark/10 text-primary dark:text-dark',
	success: 'bg-success/10 text-success',
	warning: 'bg-warning/10 text-warning',
	error: 'bg-error/10 text-error',
	info: 'bg-info/10 text-info',
	neutral: 'bg-black/5 text-black/50 dark:bg-white/5 dark:text-white/50'
} as const;

export const tagSizeObj = {
	xs: 'text-xs px-1 py-0.5',
	sm: 'text-xs px-1.5 py-0.5',
	md: 'text-sm px-2 py-0.5',
	lg: 'text-base px-2.5 py-1'
} as const;

export const tagCloseSizeObj = {
	xs: 'w-3 h-3 ml-0.5',
	sm: 'w-3 h-3 ml-1',
	md: 'w-3.5 h-3.5 ml-1',
	lg: 'w-4 h-4 ml-1.5'
} as const;

export type TagStateClassKey = keyof typeof tagStateBaseObj;
export type TagFillClassKey = 'base' | 'line' | 'light';
export type TagSizeClassKey = keyof typeof tagSizeObj;
export type TagRadiusClassKey = keyof typeof radiusObj | '';

export type ResolveTagClassesOptions = {
	state?: TagStateClassKey;
	fill?: TagFillClassKey;
	size?: TagSizeClassKey;
	radius?: TagRadiusClassKey;
	mark?: boolean;
	disabled?: boolean;
	injClass?: string;
};

export type ResolveTagActionOptions = {
	disabled?: boolean;
};

export type ResolveTagContentStateOptions = {
	closable?: boolean;
	hasCustomContent?: boolean;
	text?: unknown;
};
export type ResolveTagDerivedOptions = ResolveTagClassesOptions & ResolveTagContentStateOptions;

export type TagStatePropsLike = Partial<Omit<ResolveTagDerivedOptions, 'hasCustomContent'>>;

export type ResolveTagStateOptionsParams = {
	hasCustomContent?: boolean;
	props: TagStatePropsLike;
};

export type TagContentState = {
	showClose: boolean;
	showCustomContent: boolean;
	showText: boolean;
};

export type TagAction = {
	shouldEmit: boolean;
};

export type ResolveTagKeyboardActionOptions = ResolveTagActionOptions & {
	key: string;
};

export type TagKeyboardAction = {
	isActivationKey: boolean;
	shouldEmit: boolean;
};
export type TagDerived = {
	classes: ReturnType<typeof resolveTagClasses>;
	contentState: TagContentState;
	focusableTabIndex: number;
};

const getTagFillClass = (state: TagStateClassKey, fill: TagFillClassKey) => {
	if (fill === 'base') return tagStateBaseObj[state];
	if (fill === 'line') return tagStateLineObj[state];
	return tagStateLightObj[state];
};

// 输入 Tag 的 props 状态，返回组件层可直接消费的框架无关派生 class。
// Resolve Tag props state into framework-agnostic derived classes for component rendering.
export const resolveTagClasses = (options: ResolveTagClassesOptions = {}) => {
	const { state = 'theme', fill = 'base', size = 'md', radius = 'sm', mark = false, disabled = false, injClass = '' } = options;
	const fillClass = getTagFillClass(state, fill);
	const radiusClass = mark ? 'rounded-l-none rounded-r-full' : radius ? radiusObj[radius] : '';
	const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
	const closeClass = `${tagCloseSizeObj[size]} shrink-0`;
	const closeButtonClass = joinClasses([closeClass, 'inline-flex items-center justify-center border-0 bg-transparent p-0']);
	const closeIconClass = 'h-full w-full';
	const rootClass = joinClasses([
		'inline-flex items-center whitespace-nowrap',
		tagSizeObj[size],
		fillClass,
		radiusClass,
		disabledClass,
		injClass
	]);

	return {
		fillClass,
		radiusClass,
		disabledClass,
		rootClass,
		closeClass,
		closeButtonClass,
		closeIconClass
	};
};

// 输入 Tag 内容状态，返回框架无关的展示分支。
// Resolve Tag content state into framework-agnostic display branches.
export const resolveTagContentState = ({
	closable = false,
	hasCustomContent = false,
	text = ''
}: ResolveTagContentStateOptions = {}): TagContentState => ({
	showClose: Boolean(closable),
	showCustomContent: hasCustomContent,
	showText: !hasCustomContent && Boolean(text)
});

// 输入组件 props 和内容插槽状态，返回框架无关的 Tag 派生入参。
// Receive component props and content slot state, then return framework-agnostic Tag derivation options.
export const resolveTagStateOptions = ({ hasCustomContent, props }: ResolveTagStateOptionsParams): ResolveTagDerivedOptions => ({
	closable: props.closable,
	disabled: props.disabled,
	fill: props.fill,
	injClass: props.injClass,
	mark: props.mark,
	radius: props.radius,
	size: props.size,
	state: props.state,
	text: props.text,
	hasCustomContent
});

// 输入 Tag 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Tag state and return framework-agnostic derived values ready for component binding.
export const resolveTagDerived = (options: ResolveTagDerivedOptions = {}): TagDerived => ({
	classes: resolveTagClasses(options),
	contentState: resolveTagContentState(options),
	focusableTabIndex: resolveFocusableTabIndex({ disabled: options.disabled })
});

// 输入 Tag 点击状态，返回组件层可消费的事件触发决策。
// Consume Tag click state and return event emission decisions for component usage.
export const resolveTagClickAction = ({ disabled = false }: ResolveTagActionOptions = {}): TagAction => ({
	shouldEmit: !disabled
});

// 输入 Tag 键盘状态，返回组件层是否应派发点击或关闭事件。
// Resolve Tag keyboard state into whether the component layer should emit click or close events.
export const resolveTagKeyboardAction = ({ key, disabled = false }: ResolveTagKeyboardActionOptions): TagKeyboardAction => {
	const isActivationKey = key === 'Enter';
	return {
		isActivationKey,
		shouldEmit: isActivationKey && !disabled
	};
};

// 输入 Tag 关闭状态，返回组件层可消费的事件触发决策。
// Consume Tag close state and return event emission decisions for component usage.
export const resolveTagCloseAction = resolveTagClickAction;
