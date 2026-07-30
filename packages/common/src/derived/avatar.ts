import { radiusObj } from './common.js';
import { joinClasses, resolveClassMapValue } from './helpers.js';

export const avatarSizeObj = {
	xs: 'w-6 h-6',
	sm: 'w-10 h-10',
	base: 'w-12 h-12',
	md: 'w-16 h-16',
	lg: 'w-20 h-20',
	xl: 'w-28 h-28',
	'2xl': 'w-32 h-32'
} as const;

export const avatarImgSizeObj = {
	s: 'h-1/3 w-1/3',
	m: 'h-2/3 w-2/3',
	l: 'h-full w-full'
} as const;

export const avatarLineObj = {
	none: ' ',
	solid: ' border border-solid border-primary dark:border-dark',
	dashed: ' border border-dashed border-primary dark:border-dark',
	dotted: ' border border-dotted border-primary dark:border-dark'
} as const;

export const avatarAltSizeObj = {
	xs: 'text-base',
	sm: 'text-2xl',
	md: 'text-4xl',
	lg: 'text-6xl',
	xl: 'text-8xl'
} as const;

export const avatarIconSizeObj = {
	xs: 12,
	sm: 20,
	base: 24,
	md: 32,
	lg: 40,
	xl: 56,
	'2xl': 64
} as const;

export const avatarCenteredContentClass = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';

export type AvatarSizeKey = keyof typeof avatarSizeObj | string;
export type AvatarImgSizeKey = keyof typeof avatarImgSizeObj | string;
export type AvatarLineKey = keyof typeof avatarLineObj | string;
export type AvatarAltSizeKey = keyof typeof avatarAltSizeObj | string;
export type AvatarRadiusKey = keyof typeof radiusObj | string;

export type ResolveAvatarClassesOptions = {
	size?: AvatarSizeKey;
	imgSize?: AvatarImgSizeKey;
	line?: AvatarLineKey;
	altSize?: AvatarAltSizeKey;
	radius?: AvatarRadiusKey;
	injClass?: string;
};

export type ResolveAvatarKeyboardActionOptions = {
	key: string;
};

export type ResolveAvatarContentStateOptions = {
	alt?: unknown;
	hasIcon?: boolean;
	image?: unknown;
};
export type ResolveAvatarDerivedOptions = ResolveAvatarClassesOptions & ResolveAvatarContentStateOptions;

export type AvatarStatePropsLike = Partial<Omit<ResolveAvatarDerivedOptions, 'hasIcon'>>;

export type ResolveAvatarStateOptionsParams = {
	hasIcon?: boolean;
	props: AvatarStatePropsLike;
};

export type AvatarContentState =
	| {
			kind: 'alt';
	  }
	| {
			kind: 'defaultIcon';
	  }
	| {
			kind: 'icon';
	  }
	| {
			kind: 'image';
	  };

export type AvatarKeyboardAction = {
	shouldClick: boolean;
	shouldPreventDefault: boolean;
};
export type AvatarDerived = {
	altClass: string;
	centeredAltClass: string;
	centeredImageClass: string;
	contentState: AvatarContentState;
	defaultIconClass: string;
	iconSize: number;
	iconWrapClass: string;
	imageClass: string;
	imageWrapClass: string;
	rootClass: string;
};

// 输入 Avatar 组件状态，返回框架无关的 class 字符串和尺寸值。
// Convert Avatar component state into framework-agnostic class strings and size values.
export const resolveAvatarSizeClass = (size: AvatarSizeKey = 'base') => resolveClassMapValue(avatarSizeObj, size, 'base');

export const resolveAvatarImgSizeClass = (imgSize: AvatarImgSizeKey = 'l') => resolveClassMapValue(avatarImgSizeObj, imgSize, 'l');

export const resolveAvatarLineClass = (line: AvatarLineKey = 'none') =>
	avatarLineObj[line as keyof typeof avatarLineObj] || avatarLineObj.none;

export const resolveAvatarAltSizeClass = (altSize: AvatarAltSizeKey = 'md') => resolveClassMapValue(avatarAltSizeObj, altSize, 'md');

export const resolveAvatarRadiusClass = (radius: AvatarRadiusKey = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-form)';

export const resolveAvatarIconSize = (size: AvatarSizeKey = 'base') =>
	avatarIconSizeObj[size as keyof typeof avatarIconSizeObj] || avatarIconSizeObj.base;

export const resolveAvatarRootClass = (options: ResolveAvatarClassesOptions = {}) =>
	joinClasses([
		'bg-primary-200 dark:bg-dark-200 flex flex-col items-center justify-center overflow-hidden relative',
		resolveAvatarLineClass(options.line),
		resolveAvatarSizeClass(options.size),
		resolveAvatarRadiusClass(options.radius),
		options.injClass
	]);

export const resolveAvatarAltClass = (altSize: AvatarAltSizeKey = 'md') =>
	joinClasses(['text-primary-950 dark:text-dark-950 text-center', resolveAvatarAltSizeClass(altSize)]);

export const resolveAvatarImageClass = (imgSize: AvatarImgSizeKey = 'l') =>
	joinClasses(['inline-block object-cover', resolveAvatarImgSizeClass(imgSize)]);

export const resolveAvatarIconWrapClass = (): string => 'flex flex-col items-center justify-center';

export const resolveAvatarDefaultIconClass = (): string => 'text-primary-900 dark:text-dark-900';

export const resolveAvatarImageWrapClass = (): string => 'm-auto text-center';

// 输入 Avatar 内容 class，返回组件层可直接绑定的居中内容 class。
// Resolve Avatar content classes into centered classes for component binding.
export const resolveAvatarCenteredContentClass = (contentClass = '') => joinClasses([avatarCenteredContentClass, contentClass]);

// 输入 Avatar 内容状态，返回框架无关的展示分支。
// Resolve Avatar content state into framework-agnostic display branches.
export const resolveAvatarContentState = ({
	alt = '',
	hasIcon = false,
	image = ''
}: ResolveAvatarContentStateOptions = {}): AvatarContentState => {
	if (image === '' && alt === '') {
		return { kind: hasIcon ? 'icon' : 'defaultIcon' };
	}
	if (image === '' && alt !== '') {
		return { kind: 'alt' };
	}
	return { kind: 'image' };
};

// 输入组件 props 和图标状态，返回框架无关的 Avatar 派生入参。
// Receive component props and icon state, then return framework-agnostic Avatar derivation options.
export const resolveAvatarStateOptions = ({ hasIcon, props }: ResolveAvatarStateOptionsParams): ResolveAvatarDerivedOptions => ({
	alt: props.alt,
	altSize: props.altSize,
	image: props.image,
	imgSize: props.imgSize,
	injClass: props.injClass,
	line: props.line,
	radius: props.radius,
	size: props.size,
	hasIcon
});

// 输入 Avatar 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Avatar state and return framework-agnostic derived values ready for component binding.
export const resolveAvatarDerived = ({
	size = 'base',
	imgSize = 'l',
	line = 'none',
	altSize = 'md',
	radius = '',
	injClass = '',
	alt = '',
	hasIcon = false,
	image = ''
}: ResolveAvatarDerivedOptions = {}): AvatarDerived => {
	const altClass = resolveAvatarAltClass(altSize);
	const imageClass = resolveAvatarImageClass(imgSize);
	return {
		rootClass: resolveAvatarRootClass({ size, radius, line, injClass }),
		altClass,
		imageClass,
		centeredAltClass: resolveAvatarCenteredContentClass(altClass),
		centeredImageClass: resolveAvatarCenteredContentClass(imageClass),
		iconWrapClass: resolveAvatarIconWrapClass(),
		defaultIconClass: resolveAvatarDefaultIconClass(),
		imageWrapClass: resolveAvatarImageWrapClass(),
		iconSize: resolveAvatarIconSize(size),
		contentState: resolveAvatarContentState({ image, alt, hasIcon })
	};
};

// 输入 Avatar 键盘状态，返回框架无关的点击动作结果。
// Convert Avatar keyboard state into a framework-agnostic click action result.
export const resolveAvatarKeyboardAction = ({ key }: ResolveAvatarKeyboardActionOptions): AvatarKeyboardAction => {
	const shouldClick = key === 'Enter' || key === ' ';
	return {
		shouldClick,
		shouldPreventDefault: shouldClick
	};
};
