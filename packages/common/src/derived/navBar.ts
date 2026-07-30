import { textAlignObj } from './common.js';
import { joinClasses } from './helpers.js';

export type NavBarTitleAlign = keyof typeof textAlignObj | string;
export type NavBarTextDefaults = {
	title: string;
};
export type NavBarLeftKind = 'back' | 'child' | 'icon' | 'spacer';
export type ResolveNavBarLeftStateOptions<TIconProps = unknown> = {
	hasCustomChild?: boolean;
	left?: TIconProps | 'back' | null;
};
export type ResolveNavBarDerivedOptions<TIconProps = unknown> = ResolveNavBarLeftStateOptions<TIconProps> & {
	title?: string;
	titleAlign?: NavBarTitleAlign;
	line?: boolean;
	love?: boolean;
	injClass?: string;
	defaults?: NavBarTextDefaults;
};
export type NavBarStatePropsLike<TIconProps = unknown> = Partial<
	Omit<ResolveNavBarDerivedOptions<TIconProps>, 'defaults' | 'hasCustomChild'>
>;
export type ResolveNavBarStateOptionsParams<TIconProps = unknown> = {
	defaults?: NavBarTextDefaults;
	hasCustomChild?: boolean;
	props: NavBarStatePropsLike<TIconProps>;
};
export type NavBarLeftState<TIconProps = unknown> =
	| {
			kind: 'back';
			ariaLabel: 'back';
	  }
	| {
			kind: 'child' | 'spacer';
	  }
	| {
			iconProps: TIconProps;
			kind: 'icon';
	  };

// 输入 NavBar 组件状态，返回框架无关的 class 字符串和尺寸值。
// Convert NavBar component state into framework-agnostic class strings and size values.
export const resolveNavBarIconSize = (love = false) => (love ? 30 : 24);

// 输入组件标题 prop 和默认标题，返回框架无关的最终标题。
// Consume the component title prop and default title, then return a framework-agnostic final title.
export const resolveNavBarTitle = (title: string | undefined, defaults: NavBarTextDefaults): string => title ?? defaults.title;

export const resolveNavBarTitleAlignClass = (titleAlign: NavBarTitleAlign = 'left') =>
	textAlignObj[titleAlign as keyof typeof textAlignObj] || textAlignObj.left;

export const resolveNavBarContainerClass = ({
	line = true,
	love = false,
	injClass = ''
}: { line?: boolean; love?: boolean; injClass?: string } = {}) =>
	joinClasses([
		'flex h-12 w-full justify-between border-black/10 bg-white leading-12 dark:border-white/10 dark:bg-black',
		line ? 'border-b' : '',
		love ? 'text-xl' : '',
		injClass
	]);

export const resolveNavBarTitleWrapClass = (left: unknown) => joinClasses(['flex-1 truncate', left === null ? 'pl-2' : '']);

export const resolveNavBarLeftButtonClass = (): string => 'min-w-12 text-center lining-nums active:opacity-80';

export const resolveNavBarBackSvgClass = (): string => 'mx-auto block';

export const resolveNavBarSpacerClass = (): string => 'h-full w-4';

export const resolveNavBarRightWrapClass = (): string => 'flex';

export const resolveNavBarRightButtonClass = (): string => 'w-12 text-center active:opacity-80';

// 输入 NavBar 左侧内容状态，返回框架无关的展示分支。
// Resolve NavBar left content state into a framework-agnostic display branch.
export const resolveNavBarLeftState = <TIconProps = unknown>({
	hasCustomChild = false,
	left = 'back'
}: ResolveNavBarLeftStateOptions<TIconProps> = {}): NavBarLeftState<TIconProps> => {
	if (hasCustomChild) return { kind: 'child' };
	if (left === 'back') return { ariaLabel: 'back', kind: 'back' };
	if (left === null) return { kind: 'spacer' };
	if (left && typeof left === 'object') return { iconProps: left, kind: 'icon' };
	return { kind: 'spacer' };
};

// 输入组件 props、默认文案和左侧插槽状态，返回框架无关的 NavBar 派生入参。
// Receive component props, default text and left slot state, then return framework-agnostic NavBar derivation options.
export const resolveNavBarStateOptions = <TIconProps = unknown>({
	defaults,
	hasCustomChild,
	props
}: ResolveNavBarStateOptionsParams<TIconProps>): ResolveNavBarDerivedOptions<TIconProps> => ({
	defaults,
	hasCustomChild,
	injClass: props.injClass,
	left: props.left,
	line: props.line,
	love: props.love,
	title: props.title,
	titleAlign: props.titleAlign
});

// 输入 NavBar 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current NavBar state and return framework-agnostic derived values ready for component binding.
export const resolveNavBarDerived = <TIconProps = unknown>({
	title,
	titleAlign = 'left',
	left = 'back',
	line = true,
	love = false,
	injClass = '',
	hasCustomChild = false,
	defaults = { title: '' }
}: ResolveNavBarDerivedOptions<TIconProps> = {}) => ({
	iconSize: resolveNavBarIconSize(love),
	backSvgClass: resolveNavBarBackSvgClass(),
	containerClass: resolveNavBarContainerClass({ line, love, injClass }),
	leftState: resolveNavBarLeftState({ hasCustomChild, left }),
	leftButtonClass: resolveNavBarLeftButtonClass(),
	rightButtonClass: resolveNavBarRightButtonClass(),
	rightWrapClass: resolveNavBarRightWrapClass(),
	spacerClass: resolveNavBarSpacerClass(),
	titleText: resolveNavBarTitle(title, defaults),
	titleWrapClass: resolveNavBarTitleWrapClass(left),
	titleAlignClass: resolveNavBarTitleAlignClass(titleAlign)
});
