import { joinClasses } from './helpers.js';

export const iconStateColorClass = {
	theme: 'text-primary dark:text-dark',
	success: 'text-success',
	warning: 'text-warning',
	error: 'text-error',
	info: 'text-info'
} as const;

export type IconState = keyof typeof iconStateColorClass;
export type IconType = 'symbol' | 'iconify' | 'iconify-color';
export type IconSizeValue = number | 'full' | undefined;

export type ResolveIconStateClassOptions = {
	state?: IconState;
	theme?: boolean;
};

export type ResolveIconStyleOptions = {
	height?: IconSizeValue;
	opacity?: number;
	size?: IconSizeValue;
	width?: IconSizeValue;
	y?: number;
};

export type ResolveIconClassOptions = {
	injClass?: string;
	name?: string;
	stateClass?: string;
	type?: IconType;
};

export type ResolveIconSymbolHrefOptions = {
	name?: string;
	path?: string;
};

export type IconifyStyleValue = {
	opacity: number;
	width: string;
	height: string;
	top: string;
};

export type IconSymbolStyleValue = {
	fillOpacity: number;
	top: string;
};

export type ResolveIconKeyboardActionOptions = {
	interactive?: boolean;
	key: string;
};

export type ResolveIconDerivedOptions = ResolveIconStateClassOptions &
	ResolveIconStyleOptions &
	ResolveIconClassOptions & {
		path?: string;
		configPath?: string;
		interactive?: boolean;
	};
export type IconStatePropsLike = Partial<Omit<ResolveIconDerivedOptions, 'configPath' | 'interactive'>>;
export type ResolveIconStateOptionsParams = {
	configPath?: string;
	interactive?: boolean;
	props: IconStatePropsLike;
};

export type IconKeyboardAction = {
	shouldClick: boolean;
	shouldPreventDefault: boolean;
};
export type IconAccessibility = {
	ariaHidden: true | undefined;
	ariaLabel: string | undefined;
	role: 'button' | undefined;
	tabIndex: 0 | undefined;
};
export type IconDerived = {
	stateClass: string;
	iconifyClass: string;
	iconifyStyleValue: IconifyStyleValue;
	iconifyStyleString: string;
	symbolClass: string;
	symbolStyleValue: IconSymbolStyleValue;
	symbolStyleString: string;
	symbolWidth: string | number;
	symbolHeight: string | number;
	symbolHref: string;
	interactive: boolean;
	accessibility: IconAccessibility;
	finalPath: string;
};

// 输入 Icon 状态，返回框架无关的 class 和尺寸派生。
// Resolve Icon state into framework-agnostic class and size derivations.
export const resolveIconStateClass = ({ state, theme = false }: ResolveIconStateClassOptions = {}) =>
	state ? iconStateColorClass[state] || '' : theme ? iconStateColorClass.theme : '';

export const resolveIconInteractive = (handler: unknown): boolean => Boolean(handler);

// 输入 Icon 交互状态，返回框架无关的可访问性属性。
// Resolve Icon interaction state into framework-agnostic accessibility attributes.
export const resolveIconAccessibility = ({
	interactive = false,
	name = ''
}: { interactive?: boolean; name?: string } = {}): IconAccessibility => ({
	ariaHidden: interactive ? undefined : true,
	ariaLabel: interactive ? name : undefined,
	role: interactive ? 'button' : undefined,
	tabIndex: interactive ? 0 : undefined
});

// 输入 Icon 键盘状态，返回框架无关的点击动作结果。
// Convert Icon keyboard state into a framework-agnostic click action result.
export const resolveIconKeyboardAction = ({ interactive = false, key }: ResolveIconKeyboardActionOptions): IconKeyboardAction => {
	const shouldClick = interactive && (key === 'Enter' || key === ' ');
	return {
		shouldClick,
		shouldPreventDefault: shouldClick
	};
};

export const resolveIconCssSizeValue = (value: IconSizeValue, fallback: IconSizeValue = 24) => {
	const size = value || fallback;
	return size === 'full' ? '100%' : `${size}px`;
};

export const resolveIconSvgSizeValue = (value: IconSizeValue, fallback: IconSizeValue = 24) => {
	const size = value || fallback;
	return size === 'full' ? '100%' : size;
};

export const resolveIconifyClass = ({ type = 'symbol', name = '', stateClass = '', injClass = '' }: ResolveIconClassOptions = {}) =>
	joinClasses([type, name, 'relative', stateClass, injClass]);

export const resolveIconSymbolClass = ({ stateClass = '', injClass = '' }: Pick<ResolveIconClassOptions, 'stateClass' | 'injClass'> = {}) =>
	joinClasses(['relative inline fill-current', stateClass, injClass]);

export const resolveIconifyStyleValue = ({
	opacity = 1,
	width = 0,
	height = 0,
	size = 24,
	y = 0
}: ResolveIconStyleOptions = {}): IconifyStyleValue => ({
	opacity,
	width: resolveIconCssSizeValue(width, size),
	height: resolveIconCssSizeValue(height, size),
	top: `${y}px`
});

export const resolveIconifyStyleString = (options: ResolveIconStyleOptions = {}) => {
	const style = resolveIconifyStyleValue(options);
	return `opacity:${style.opacity}; width:${style.width}; height:${style.height}; top:${style.top};`;
};

export const resolveIconSymbolStyleValue = ({
	opacity = 1,
	y = 0
}: Pick<ResolveIconStyleOptions, 'opacity' | 'y'> = {}): IconSymbolStyleValue => ({
	fillOpacity: opacity,
	top: `${y}px`
});

export const resolveIconSymbolStyleString = (options: Pick<ResolveIconStyleOptions, 'opacity' | 'y'> = {}) => {
	const style = resolveIconSymbolStyleValue(options);
	return `fill-opacity:${style.fillOpacity}; top:${style.top};`;
};

// 输入 Icon 资源路径和图标名，返回组件层可直接绑定的 symbol 引用。
// Receive Icon asset path and icon name, then return the symbol reference bound by component implementations.
export const resolveIconSymbolHref = ({ path = 'fonts/symbol.svg', name = '' }: ResolveIconSymbolHrefOptions = {}) => `/${path}#${name}`;

// 输入组件 props 和配置路径，返回框架无关的 Icon 派生入参。
// Receive component props and configured path, then return framework-agnostic Icon derivation options.
export const resolveIconStateOptions = ({ configPath, interactive, props }: ResolveIconStateOptionsParams): ResolveIconDerivedOptions => ({
	configPath,
	height: props.height,
	injClass: props.injClass,
	interactive,
	name: props.name,
	opacity: props.opacity,
	path: props.path,
	size: props.size,
	state: props.state,
	theme: props.theme,
	type: props.type,
	width: props.width,
	y: props.y
});

// 输入 Icon props 和组件层交互状态，返回框架无关的渲染派生结果。
// Receive Icon props and component-layer interaction state, then return framework-agnostic render derivation.
export const resolveIconDerived = ({
	type = 'symbol',
	name = '',
	size = 24,
	width = 0,
	height = 0,
	state,
	theme = false,
	opacity = 1,
	path,
	configPath,
	y = 0,
	injClass = '',
	interactive = false
}: ResolveIconDerivedOptions = {}): IconDerived => {
	const stateClass = resolveIconStateClass({ state, theme });
	const finalPath = path ?? configPath ?? 'fonts/symbol.svg';
	return {
		stateClass,
		iconifyClass: resolveIconifyClass({ type, name, stateClass, injClass }),
		iconifyStyleValue: resolveIconifyStyleValue({ opacity, width, height, size, y }),
		iconifyStyleString: resolveIconifyStyleString({ opacity, width, height, size, y }),
		symbolClass: resolveIconSymbolClass({ stateClass, injClass }),
		symbolStyleValue: resolveIconSymbolStyleValue({ opacity, y }),
		symbolStyleString: resolveIconSymbolStyleString({ opacity, y }),
		symbolWidth: resolveIconSvgSizeValue(width, size),
		symbolHeight: resolveIconSvgSizeValue(height, size),
		symbolHref: resolveIconSymbolHref({ path: finalPath, name }),
		interactive,
		accessibility: resolveIconAccessibility({ interactive, name }),
		finalPath
	};
};
