import { radiusObj } from './common.js';

export const switchLongResetDelay = 150;

export type SwitchRadius = keyof typeof radiusObj | string;
export type SwitchThumbStyle = {
	left: string;
	transform: string;
};
export type ResolveSwitchDerivedOptions = ResolveSwitchInsideStateOptions & {
	disabled?: boolean;
	injClass?: string;
	isLong?: boolean;
	radius?: SwitchRadius;
};
export type SwitchStatePropsLike = Partial<Omit<ResolveSwitchDerivedOptions, 'active' | 'hasFalseChild' | 'hasTrueChild' | 'isLong'>>;
export type ResolveSwitchStateOptionsParams = {
	active?: boolean;
	hasFalseChild?: boolean;
	hasTrueChild?: boolean;
	isLong?: boolean;
	props: SwitchStatePropsLike;
};
export type SwitchDerived = {
	insideState: SwitchInsideState;
	radiusClass: string;
	stateTrueMarkClass: string;
	stateFalseMarkClass: string;
	loadingClass: string;
	rootClass: string;
	thumbClass: string;
	thumbStyle: SwitchThumbStyle;
	thumbStyleString: string;
};
export type ResolveSwitchClickActionOptions = {
	active: boolean;
	disabled: boolean;
	async: boolean;
};
export type SwitchClickAction = {
	nextActive: boolean;
	shouldChange: boolean;
	shouldClick: boolean;
};
export type ResolveSwitchActiveSyncActionOptions = {
	active: boolean;
	disabled: boolean;
};
export type SwitchActiveSyncAction = {
	nextActive: boolean;
	shouldSync: boolean;
};
export type ResolveSwitchStretchActionOptions = {
	disabled: boolean;
};
export type SwitchStretchAction = {
	resetDelay: number;
	shouldStretch: boolean;
};
export type SwitchStretchResetAction = {
	nextIsLong: false;
};
export type SwitchStretchFlow = SwitchStretchAction & {
	nextIsLong: boolean;
	resetNextIsLong: false;
};
export type SwitchInsideKind = 'array' | 'children' | 'loading' | 'none' | 'state';
export type ResolveSwitchInsideStateOptions = {
	active?: boolean;
	hasFalseChild?: boolean;
	hasTrueChild?: boolean;
	inside?: unknown;
};
export type SwitchInsideState =
	| {
			active: boolean;
			falseClass: string;
			kind: 'state';
			trueClass: string;
	  }
	| {
			kind: 'loading' | 'none';
	  }
	| {
			falseClass: string;
			kind: 'children';
			trueClass: string;
	  }
	| {
			kind: 'array';
			value: string;
	  };

// 输入 Switch 组件状态，返回框架无关的 class 字符串、样式值和下一状态。
// Convert Switch component state into framework-agnostic class strings, style values and next state.
export const resolveSwitchRadiusClass = (radius: SwitchRadius = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-small)';

export const resolveSwitchRootClass = ({
	active,
	disabled,
	radiusClass,
	injClass = ''
}: {
	active: boolean;
	disabled: boolean;
	radiusClass: string;
	injClass?: string;
}) =>
	[
		'relative flex h-6 w-12 justify-around transition-all duration-500 active:opacity-80',
		radiusClass,
		active ? ['bg-primary dark:bg-dark', injClass].filter(Boolean).join(' ') : 'bg-text-primary/10 dark:bg-text-dark/20',
		disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
	]
		.filter(Boolean)
		.join(' ');

export const resolveSwitchThumbClass = (radiusClass: string) =>
	[
		'absolute top-0.5 h-5 w-5 bg-bg-highlight dark:bg-bg-highlight-dark text-center text-xs leading-5 text-text-primary/80 transition-all duration-300 dark:text-text-dark/90',
		radiusClass
	]
		.filter(Boolean)
		.join(' ');

export const resolveSwitchThumbLeft = (active: boolean) => (active ? '1.625rem' : '0.125rem');

export const resolveSwitchThumbTransform = (isLong: boolean) => (isLong ? 'scaleX(1.3)' : 'scaleX(1)');

export const resolveSwitchThumbStyle = ({ active, isLong }: { active: boolean; isLong: boolean }): SwitchThumbStyle => ({
	left: resolveSwitchThumbLeft(active),
	transform: resolveSwitchThumbTransform(isLong)
});

export const resolveSwitchThumbStyleString = (options: { active: boolean; isLong: boolean }) => {
	const style = resolveSwitchThumbStyle(options);
	return `left:${style.left};transform:${style.transform}`;
};

export const resolveSwitchNextActive = ({ active, disabled, async }: { active: boolean; disabled: boolean; async: boolean }) => {
	if (disabled || async) return active;

	return !active;
};

export const resolveSwitchShouldToggle = ({ disabled, async }: { disabled: boolean; async: boolean }) => !disabled && !async;

// 输入 Switch 点击状态，返回组件层可消费的状态更新和事件触发决策。
// Consume Switch click state and return state update and event decisions for component usage.
export const resolveSwitchClickAction = (options: ResolveSwitchClickActionOptions): SwitchClickAction => ({
	nextActive: resolveSwitchNextActive(options),
	shouldChange: resolveSwitchShouldToggle(options),
	shouldClick: !options.disabled
});

// 输入 Switch 外部 active 和 disabled 状态，返回组件层是否应同步内部 active。
// Resolve Switch external active and disabled state into whether the component layer should sync internal active.
export const resolveSwitchActiveSyncAction = ({ active, disabled }: ResolveSwitchActiveSyncActionOptions): SwitchActiveSyncAction => ({
	nextActive: active,
	shouldSync: !disabled
});

// 输入 Switch disabled 状态，返回组件层是否应执行滑块拉伸反馈。
// Resolve Switch disabled state into whether the component layer should run thumb stretch feedback.
export const resolveSwitchStretchAction = ({ disabled }: ResolveSwitchStretchActionOptions): SwitchStretchAction => ({
	resetDelay: switchLongResetDelay,
	shouldStretch: !disabled
});

// 输入 Switch 拉伸反馈结束信号，返回组件层可写入的复位状态。
// Receive the Switch stretch feedback completion signal and return reset state for the component layer.
export const resolveSwitchStretchResetAction = (): SwitchStretchResetAction => ({
	nextIsLong: false
});

// 输入 Switch disabled 状态，返回组件层可同步的拉伸开始和复位流程。
// Receive Switch disabled state and return the stretch start and reset flow that component layers can sync.
export const resolveSwitchStretchFlow = (options: ResolveSwitchStretchActionOptions): SwitchStretchFlow => {
	const stretchAction = resolveSwitchStretchAction(options);
	const resetAction = resolveSwitchStretchResetAction();
	return {
		...stretchAction,
		nextIsLong: stretchAction.shouldStretch,
		resetNextIsLong: resetAction.nextIsLong
	};
};

export const resolveSwitchContentVisibilityClass = (active: boolean, visibleWhenActive: boolean) =>
	active === visibleWhenActive ? '' : 'hidden';

// 输入 Switch 当前开关状态，返回状态图标可见性的框架无关 class。
// Receive current Switch active state and return framework-agnostic visibility classes for state icons.
export const resolveSwitchStateIconClasses = (active: boolean) => ({
	falseClass: resolveSwitchContentVisibilityClass(active, false),
	trueClass: resolveSwitchContentVisibilityClass(active, true)
});

export const resolveSwitchStateTrueMarkClass = (): string => 'ml-2 mt-1 h-3 w-1 rounded-full bg-text-primary/80 dark:bg-text-dark/90';

export const resolveSwitchStateFalseMarkClass = (): string =>
	'ml-1 mt-1 h-3 w-3 rounded-full border-2 border-text-primary/80 dark:border-text-dark/90';

export const resolveSwitchLoadingClass = (): string => 'm-0.5';

export const resolveSwitchInsideArrayValue = (inside: unknown, active: boolean) => {
	if (!Array.isArray(inside) || inside.length !== 2) return null;

	const value = inside[active ? 1 : 0];
	return typeof value === 'string' ? value : null;
};

// 输入 Switch 内部内容状态，返回框架无关的展示分支。
// Resolve Switch inner content state into a framework-agnostic display branch.
export const resolveSwitchInsideState = ({
	active = false,
	hasFalseChild = false,
	hasTrueChild = false,
	inside = null
}: ResolveSwitchInsideStateOptions = {}): SwitchInsideState => {
	if (inside === 'state') return { active, kind: 'state', ...resolveSwitchStateIconClasses(active) };
	if (inside === 'loading') return { kind: 'loading' };
	if (hasTrueChild && hasFalseChild) {
		return {
			falseClass: resolveSwitchContentVisibilityClass(active, false),
			kind: 'children',
			trueClass: resolveSwitchContentVisibilityClass(active, true)
		};
	}

	const value = resolveSwitchInsideArrayValue(inside, active);
	if (value !== null) return { kind: 'array', value };
	return { kind: 'none' };
};

// 输入组件 props、内部 active 和反馈状态，返回框架无关的 Switch 派生入参。
// Receive component props, internal active state and feedback state, then return framework-agnostic Switch derivation options.
export const resolveSwitchStateOptions = ({
	active,
	hasFalseChild,
	hasTrueChild,
	isLong,
	props
}: ResolveSwitchStateOptionsParams): ResolveSwitchDerivedOptions => ({
	active,
	disabled: props.disabled,
	hasFalseChild,
	hasTrueChild,
	injClass: props.injClass,
	inside: props.inside,
	isLong,
	radius: props.radius
});

// 输入 Switch 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Switch state and return framework-agnostic derived values ready for component binding.
export const resolveSwitchDerived = ({
	active = false,
	disabled = false,
	radius = '',
	injClass = '',
	isLong = false,
	hasTrueChild = false,
	hasFalseChild = false,
	inside = null
}: ResolveSwitchDerivedOptions = {}): SwitchDerived => {
	const radiusClass = resolveSwitchRadiusClass(radius);
	return {
		radiusClass,
		stateTrueMarkClass: resolveSwitchStateTrueMarkClass(),
		stateFalseMarkClass: resolveSwitchStateFalseMarkClass(),
		loadingClass: resolveSwitchLoadingClass(),
		rootClass: resolveSwitchRootClass({ active, disabled, radiusClass, injClass }),
		thumbClass: resolveSwitchThumbClass(radiusClass),
		thumbStyle: resolveSwitchThumbStyle({ active, isLong }),
		thumbStyleString: resolveSwitchThumbStyleString({ active, isLong }),
		insideState: resolveSwitchInsideState({ active, hasTrueChild, hasFalseChild, inside })
	};
};
