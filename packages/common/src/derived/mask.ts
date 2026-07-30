export const maskBackdropBlurClass = {
	none: '',
	xs: ' backdrop-blur-xs',
	sm: ' backdrop-blur-sm',
	md: ' backdrop-blur-md',
	lg: ' backdrop-blur-lg',
	xl: ' backdrop-blur-xl',
	'2xl': ' backdrop-blur-2xl',
	'3xl': ' backdrop-blur-3xl'
} as const;

export const maskBgClass = {
	'0': ' bg-transparent',
	'0.1': ' bg-black/10 dark:bg-white/10',
	'0.2': ' bg-black/20 dark:bg-white/20',
	'0.3': ' bg-black/30 dark:bg-white/30',
	'0.4': ' bg-black/40 dark:bg-white/40',
	'0.5': ' bg-black/50 dark:bg-white/50',
	'0.6': ' bg-black/60 dark:bg-white/60',
	'0.7': ' bg-black/70 dark:bg-white/70',
	'0.8': ' bg-black/80 dark:bg-white/80',
	'0.9': ' bg-black/90 dark:bg-white/90',
	'1': ' bg-black dark:bg-white'
} as const;

export const maskBgInverseClass = {
	'0': ' bg-transparent',
	'0.1': ' bg-white/10 dark:bg-black/10',
	'0.2': ' bg-white/20 dark:bg-black/20',
	'0.3': ' bg-white/30 dark:bg-black/30',
	'0.4': ' bg-white/40 dark:bg-black/40',
	'0.5': ' bg-white/50 dark:bg-black/50',
	'0.6': ' bg-white/60 dark:bg-black/60',
	'0.7': ' bg-white/70 dark:bg-black/70',
	'0.8': ' bg-white/80 dark:bg-black/80',
	'0.9': ' bg-white/90 dark:bg-black/90',
	'1': ' bg-white dark:bg-black'
} as const;

export type MaskOpacityKey = keyof typeof maskBgClass | string;
export type MaskBackdropBlurKey = keyof typeof maskBackdropBlurClass | string;
export type ResolveMaskClassOptions = {
	opacity?: MaskOpacityKey;
	clickable?: boolean;
	inverse?: boolean;
	backdropBlur?: MaskBackdropBlurKey;
};
export type ResolveMaskDerivedOptions = ResolveMaskClassOptions & {
	duration?: number;
	outDuration?: number;
	zIndex?: number;
};
export type MaskStatePropsLike = Partial<ResolveMaskDerivedOptions>;
export type ResolveMaskStateOptionsParams = {
	props: MaskStatePropsLike;
};
export type MaskZIndexStyleValue = {
	zIndex: number;
};
export type MaskTransitionParams = {
	duration: number;
};
export type MaskDerived = {
	inParams: MaskTransitionParams;
	outParams: MaskTransitionParams;
	rootClass: string;
	zIndexStyleString: string;
	zIndexStyleValue: MaskZIndexStyleValue;
};

// 输入 Mask 状态，返回框架无关的 class 字符串。
// Resolve Mask state into a framework-agnostic class string.
export const resolveMaskRootClass = ({
	opacity = '0.5',
	clickable = false,
	inverse = false,
	backdropBlur = 'none'
}: ResolveMaskClassOptions = {}) =>
	`fixed h-screen w-screen inset-0${inverse ? maskBgInverseClass[opacity as keyof typeof maskBgInverseClass] || maskBgInverseClass['0.5'] : maskBgClass[opacity as keyof typeof maskBgClass] || maskBgClass['0.5']}${clickable ? ' pointer-events-none' : ''}${maskBackdropBlurClass[backdropBlur as keyof typeof maskBackdropBlurClass] || maskBackdropBlurClass.none}`;

export const resolveMaskTransitionParams = (duration = 150): MaskTransitionParams => ({ duration });

export const resolveMaskZIndexStyleValue = (zIndex = 500): MaskZIndexStyleValue => ({ zIndex });

export const resolveMaskZIndexStyleString = (zIndex = 500): string => `z-index:${zIndex}`;

// 输入组件 props，返回框架无关的 Mask 派生入参。
// Receive component props and return framework-agnostic Mask derivation options.
export const resolveMaskStateOptions = ({ props }: ResolveMaskStateOptionsParams): ResolveMaskDerivedOptions => ({
	backdropBlur: props.backdropBlur,
	clickable: props.clickable,
	duration: props.duration,
	inverse: props.inverse,
	opacity: props.opacity,
	outDuration: props.outDuration,
	zIndex: props.zIndex
});

// 输入 Mask 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Mask state and return framework-agnostic derived values ready for component binding.
export const resolveMaskDerived = ({
	duration = 150,
	outDuration = 0,
	zIndex = 500,
	...classOptions
}: ResolveMaskDerivedOptions = {}): MaskDerived => ({
	rootClass: resolveMaskRootClass(classOptions),
	inParams: resolveMaskTransitionParams(duration),
	outParams: resolveMaskTransitionParams(outDuration),
	zIndexStyleValue: resolveMaskZIndexStyleValue(zIndex),
	zIndexStyleString: resolveMaskZIndexStyleString(zIndex)
});
