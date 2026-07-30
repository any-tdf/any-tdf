import { bgObj, radiusObj } from './common.js';

export const cellBgClass = {
	white: 'bg-white dark:bg-gray-800',
	surface: 'bg-bg-surface dark:bg-bg-surface-dark',
	gray: 'bg-text-primary/5 dark:bg-text-dark/5',
	theme: 'bg-primary/5 dark:bg-dark/5'
} as const;

export const cellActiveBgClass = {
	white: 'active:bg-black/5 dark:active:bg-white/5',
	surface: 'active:bg-text-primary/5 dark:active:bg-text-dark/5',
	gray: 'active:bg-text-primary/10 dark:active:bg-text-dark/10',
	theme: 'active:bg-primary/10 dark:active:bg-dark/10'
} as const;

export const cellShadowClass = {
	none: ' shadow-none',
	xs: ' shadow-xs dark:shadow-white/5',
	sm: ' shadow-sm dark:shadow-white/5',
	md: ' shadow-md dark:shadow-white/10',
	lg: ' shadow-lg dark:shadow-white/10',
	xl: ' shadow-xl dark:shadow-white/10',
	'2xl': ' shadow-2xl dark:shadow-white/25'
} as const;

export const cellMxClass = {
	'0': ' mx-0',
	'1': ' mx-1',
	'2': ' mx-2',
	'3': ' mx-3',
	'4': ' mx-4',
	'6': ' mx-6',
	'8': ' mx-8'
} as const;

export const cellMyClass = {
	'0': ' my-0',
	'1': ' my-1',
	'2': ' my-2',
	'3': ' my-3',
	'4': ' my-4',
	'6': ' my-6',
	'8': ' my-8'
} as const;

export type CellBg = keyof typeof cellBgClass | string;
export type CellGroupBg = keyof typeof bgObj | string;
export type CellRadius = keyof typeof radiusObj | string;
export type CellShadow = keyof typeof cellShadowClass | string;
export type CellScale = keyof typeof cellMxClass | string;
export type CellRightKind = 'arrow' | 'switch' | 'icon' | 'none';

export type ResolveCellClickActionOptions = {
	clickAll?: boolean;
	active: boolean;
	right: unknown;
};

export type CellClickAction = {
	shouldClick: boolean;
	shouldToggleSwitch: boolean;
	nextSwitchActive: boolean;
};

export type ResolveCellKeyboardActionOptions = {
	key: string;
	clickAll?: boolean;
};

export type CellKeyboardAction = {
	shouldClick: boolean;
	shouldPreventDefault: boolean;
};
export type ResolveCellRightStateOptions<TSwitchProps = unknown, TIconProps = unknown> = {
	right?: null | 'arrow' | { type?: unknown; switch?: TSwitchProps; icon?: TIconProps };
	love?: boolean;
};
export type CellRightState<TSwitchProps = unknown, TIconProps = unknown> =
	| {
			kind: 'arrow';
			arrowSize: number;
	  }
	| {
			kind: 'switch';
			arrowSize: number;
			switchProps: TSwitchProps;
	  }
	| {
			kind: 'icon';
			arrowSize: number;
			iconProps: TIconProps;
	  }
	| {
			kind: 'none';
			arrowSize: number;
	  };
export type ResolveCellDerivedOptions<TSwitchProps = unknown, TIconProps = unknown> = ResolveCellRightStateOptions<
	TSwitchProps,
	TIconProps
> & {
	bg?: CellBg;
	clickAll?: boolean;
	includeCursor?: boolean;
	info?: string;
	injClass?: string;
	line?: boolean;
	lineTone?: 'text' | 'black';
	mx?: CellScale;
	my?: CellScale;
	radius?: CellRadius;
	shadow?: CellShadow;
	subTitle?: string;
};
export type CellStatePropsLike<TSwitchProps = unknown, TIconProps = unknown> = Partial<
	Omit<ResolveCellDerivedOptions<TSwitchProps, TIconProps>, 'includeCursor'>
>;
export type ResolveCellStateOptionsParams<TSwitchProps = unknown, TIconProps = unknown> = {
	includeCursor?: boolean;
	props: CellStatePropsLike<TSwitchProps, TIconProps>;
};
export type CellDerived<TSwitchProps = unknown, TIconProps = unknown> = {
	contentClass: string;
	detailClass: string;
	detailTextClass: string;
	infoClass: string;
	leftContentClass: string;
	leftIconWrapClass: string;
	outerClass: string;
	rightContentClass: string;
	rightAccessoryClass: string;
	rightArrowAccessoryClass: string;
	rightArrowIconClass: string;
	rightState: CellRightState<TSwitchProps, TIconProps>;
	rowClass: string;
	subTitleClass: string;
	tabIndex: 0 | -1;
	titleClass: string;
	titleTextClass: string;
};

const trimClass = (className: string) => className.trim();

// 输入 Cell 组件状态，返回框架无关的 class 字符串和纯状态分支。
// Convert Cell component state into framework-agnostic class strings and pure state branches.
export const resolveCellRadiusClass = (radius: CellRadius = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-box)';

export const resolveCellShadowClass = (shadow: CellShadow = 'xs') =>
	trimClass(cellShadowClass[shadow as keyof typeof cellShadowClass] || cellShadowClass.xs);

export const resolveCellMxClass = (mx: CellScale = '2') => trimClass(cellMxClass[mx as keyof typeof cellMxClass] || cellMxClass['2']);

export const resolveCellMyClass = (my: CellScale = '4') => trimClass(cellMyClass[my as keyof typeof cellMyClass] || cellMyClass['4']);

export const resolveCellOuterClass = ({
	my = '4',
	mx = '2',
	radius = '',
	shadow = 'xs',
	injClass = ''
}: {
	my?: CellScale;
	mx?: CellScale;
	radius?: CellRadius;
	shadow?: CellShadow;
	injClass?: string;
} = {}) =>
	[
		'relative overflow-hidden',
		resolveCellMyClass(my),
		resolveCellMxClass(mx),
		resolveCellRadiusClass(radius),
		resolveCellShadowClass(shadow),
		injClass
	]
		.filter(Boolean)
		.join(' ');

export const resolveCellContentClass = ({
	bg = 'surface',
	clickAll = true,
	love = false
}: {
	bg?: CellBg;
	clickAll?: boolean;
	love?: boolean;
} = {}) =>
	[
		cellBgClass[bg as keyof typeof cellBgClass] || cellBgClass.surface,
		'px-3',
		clickAll ? cellActiveBgClass[bg as keyof typeof cellActiveBgClass] || cellActiveBgClass.surface : '',
		love ? 'text-xl' : ''
	]
		.filter(Boolean)
		.join(' ');

export const resolveCellRowClass = ({
	line = false,
	my = '4',
	clickAll = true,
	includeCursor = false,
	lineTone = 'text'
}: {
	line?: boolean;
	my?: CellScale;
	clickAll?: boolean;
	includeCursor?: boolean;
	lineTone?: 'text' | 'black';
} = {}) =>
	[
		'flex w-full items-center justify-between gap-4 py-4',
		includeCursor && clickAll ? 'cursor-pointer' : '',
		line && my === '0'
			? lineTone === 'black'
				? 'border-b border-black/5 dark:border-white/5'
				: 'border-b border-text-primary/5 dark:border-text-dark/5'
			: ''
	]
		.filter(Boolean)
		.join(' ');

export const resolveCellTitleClass = (subTitle = '') =>
	['flex flex-col text-left', subTitle === '' ? 'justify-center' : 'justify-between'].join(' ');

export const resolveCellDetailClass = (info = '') =>
	['flex flex-col', info === '' ? 'justify-center' : 'justify-between', 'text-right'].join(' ');

export const resolveCellArrowSize = (love = false) => (love ? 26 : 20);

export const resolveCellLeftContentClass = (): string => 'flex items-center justify-between';

export const resolveCellRightContentClass = (): string => 'flex items-center justify-between';

export const resolveCellLeftIconWrapClass = (): string => 'mr-1 flex flex-col justify-center';

export const resolveCellRightAccessoryClass = (): string => 'ml-1 flex flex-col justify-center';

export const resolveCellRightArrowAccessoryClass = (): string => 'flex flex-col justify-center text-gray-700 dark:text-gray-300';

export const resolveCellRightArrowIconClass = (): string => 'relative inline opacity-60 -top-0.5';

export const resolveCellTitleTextClass = (): string => 'font-medium';

export const resolveCellSubTitleClass = (): string => 'text-xs text-gray-500 dark:text-gray-400';

export const resolveCellDetailTextClass = (): string => 'text-gray-700 dark:text-gray-300';

export const resolveCellInfoClass = (): string => 'text-xs font-light text-gray-500 dark:text-gray-400';

// 输入 Cell 右侧内容状态，返回框架无关的展示分支和子组件 props。
// Resolve Cell right content state into framework-agnostic display branch and child props.
export const resolveCellRightState = <TSwitchProps = Record<string, never>, TIconProps = unknown>({
	right = 'arrow',
	love = false
}: ResolveCellRightStateOptions<TSwitchProps, TIconProps> = {}): CellRightState<TSwitchProps, TIconProps> => {
	const arrowSize = resolveCellArrowSize(love);
	if (right === 'arrow') return { kind: 'arrow', arrowSize };
	if (!right || typeof right !== 'object') return { kind: 'none', arrowSize };

	if (right.type === 'switch') {
		return { kind: 'switch', arrowSize, switchProps: (right.switch || {}) as TSwitchProps };
	}
	if (right.type === 'icon' && right.icon) {
		return { kind: 'icon', arrowSize, iconProps: right.icon };
	}
	return { kind: 'none', arrowSize };
};

const getCellRightSwitch = (right: unknown) => {
	if (!right || typeof right !== 'object') return null;
	const rightRecord = right as { type?: unknown; switch?: { disabled?: boolean; async?: boolean } };
	if (rightRecord.type !== 'switch') return null;

	return rightRecord.switch || {};
};

export const resolveCellCanToggleSwitch = (right: unknown) => {
	const switchProps = getCellRightSwitch(right);
	return Boolean(switchProps && !switchProps.disabled && !switchProps.async);
};

export const resolveCellNextSwitchActive = ({ active, right }: { active: boolean; right: unknown }) =>
	resolveCellCanToggleSwitch(right) ? !active : active;

// 输入 Cell 点击状态，返回框架无关的点击动作结果。
// Convert Cell click state into a framework-agnostic click action result.
export const resolveCellClickAction = ({ clickAll = true, active, right }: ResolveCellClickActionOptions): CellClickAction => {
	if (!clickAll) {
		return {
			shouldClick: false,
			shouldToggleSwitch: false,
			nextSwitchActive: active
		};
	}

	const shouldToggleSwitch = resolveCellCanToggleSwitch(right);
	return {
		shouldClick: true,
		shouldToggleSwitch,
		nextSwitchActive: shouldToggleSwitch ? !active : active
	};
};

// 输入键盘状态，返回框架无关的键盘点击动作结果。
// Convert keyboard state into a framework-agnostic keyboard click action result.
export const resolveCellKeyboardAction = ({ key, clickAll = true }: ResolveCellKeyboardActionOptions): CellKeyboardAction => {
	const shouldClick = clickAll && (key === 'Enter' || key === ' ');
	return {
		shouldClick,
		shouldPreventDefault: shouldClick
	};
};

// 输入组件 props 和交互状态，返回框架无关的 Cell 派生入参。
// Receive component props and interaction state, then return framework-agnostic Cell derivation options.
export const resolveCellStateOptions = <TSwitchProps = unknown, TIconProps = unknown>({
	includeCursor,
	props
}: ResolveCellStateOptionsParams<TSwitchProps, TIconProps>): ResolveCellDerivedOptions<TSwitchProps, TIconProps> => ({
	bg: props.bg,
	clickAll: props.clickAll,
	includeCursor,
	info: props.info,
	injClass: props.injClass,
	line: props.line,
	lineTone: props.lineTone,
	love: props.love,
	mx: props.mx,
	my: props.my,
	radius: props.radius,
	right: props.right,
	shadow: props.shadow,
	subTitle: props.subTitle
});

// 输入 Cell 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Cell state and return framework-agnostic derived values ready for component binding.
export const resolveCellDerived = <TSwitchProps = Record<string, never>, TIconProps = unknown>({
	bg = 'surface',
	clickAll = true,
	includeCursor = false,
	info = '',
	injClass = '',
	line = false,
	lineTone = 'text',
	love = false,
	mx = '2',
	my = '4',
	radius = '',
	right = 'arrow',
	shadow = 'xs',
	subTitle = ''
}: ResolveCellDerivedOptions<TSwitchProps, TIconProps> = {}): CellDerived<TSwitchProps, TIconProps> => ({
	outerClass: resolveCellOuterClass({ my, mx, radius, shadow, injClass }),
	contentClass: resolveCellContentClass({ bg, clickAll, love }),
	rowClass: resolveCellRowClass({ line, my, clickAll, includeCursor, lineTone }),
	titleClass: resolveCellTitleClass(subTitle),
	titleTextClass: resolveCellTitleTextClass(),
	subTitleClass: resolveCellSubTitleClass(),
	detailClass: resolveCellDetailClass(info),
	detailTextClass: resolveCellDetailTextClass(),
	infoClass: resolveCellInfoClass(),
	leftContentClass: resolveCellLeftContentClass(),
	leftIconWrapClass: resolveCellLeftIconWrapClass(),
	rightContentClass: resolveCellRightContentClass(),
	rightAccessoryClass: resolveCellRightAccessoryClass(),
	rightArrowAccessoryClass: resolveCellRightArrowAccessoryClass(),
	rightArrowIconClass: resolveCellRightArrowIconClass(),
	rightState: resolveCellRightState<TSwitchProps, TIconProps>({ right, love }),
	tabIndex: clickAll ? 0 : -1
});

export const resolveCellGroupClass = ({
	bg = 'surface',
	radius = '',
	shadow = 'xs',
	my = '4',
	mx = '2'
}: {
	bg?: CellGroupBg;
	radius?: CellRadius;
	shadow?: CellShadow;
	my?: CellScale;
	mx?: CellScale;
} = {}) =>
	[
		bgObj[bg as keyof typeof bgObj] || bgObj.gray,
		'overflow-hidden',
		resolveCellShadowClass(shadow),
		resolveCellRadiusClass(radius),
		resolveCellMyClass(my),
		resolveCellMxClass(mx)
	]
		.filter(Boolean)
		.join(' ');
