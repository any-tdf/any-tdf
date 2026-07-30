import { bgObj, mxScaleObj, myScaleObj, pxScaleObj, pyScaleObj, radiusObj } from './common.js';

export const cardShadowObj = {
	none: 'shadow-none',
	xs: 'shadow-xs dark:shadow-white/5',
	sm: 'shadow-sm dark:shadow-white/5',
	md: 'shadow-md dark:shadow-white/10',
	lg: 'shadow-lg dark:shadow-white/10',
	xl: 'shadow-xl dark:shadow-white/10',
	'2xl': 'shadow-2xl dark:shadow-white/20'
} as const;

export const cardBorderObj = {
	none: '',
	solid: 'border-solid border-black/10 dark:border-white/10',
	dashed: 'border-dashed border-black/10 dark:border-white/10',
	dotted: 'border-dotted border-black/10 dark:border-white/10'
} as const;

export const cardBorderWidthObj = {
	'0': 'border-0',
	'1': 'border',
	'2': 'border-2',
	'4': 'border-4'
} as const;

export const cardSpacingObj = {
	'0': 'p-0',
	'1': 'p-1',
	'2': 'p-2',
	'3': 'p-3',
	'4': 'p-4',
	'6': 'p-6',
	'8': 'p-8'
} as const;

export type CardBg = keyof typeof bgObj | string;
export type CardRadius = keyof typeof radiusObj | string;
export type CardShadow = keyof typeof cardShadowObj | string;
export type CardBorder = keyof typeof cardBorderObj | string;
export type CardBorderWidth = keyof typeof cardBorderWidthObj | string;
export type CardSpacing = keyof typeof cardSpacingObj | string;
export type CardScale = keyof typeof mxScaleObj | string;

export type ResolveCardContentStateOptions = {
	footerLine?: boolean;
	handler?: unknown;
	hasBody?: boolean;
	hasFooter?: boolean;
	hasHeader?: boolean;
	headerLine?: boolean;
};

export type CardContentState = {
	isInteractive: boolean;
	showBody: boolean;
	showFooter: boolean;
	showFooterDivider: boolean;
	showHeader: boolean;
	showHeaderDivider: boolean;
};
export type ResolveCardDerivedOptions = ResolveCardContentStateOptions & {
	bg?: CardBg;
	bodyClass?: string;
	border?: CardBorder;
	borderWidth?: CardBorderWidth;
	footerClass?: string;
	headerClass?: string;
	injClass?: string;
	mx?: CardScale;
	my?: CardScale;
	overflow?: boolean;
	p?: CardSpacing;
	px?: CardScale;
	py?: CardScale;
	radius?: CardRadius;
	shadow?: CardShadow;
};
export type CardStatePropsLike = Partial<Omit<ResolveCardDerivedOptions, 'handler' | 'hasBody' | 'hasFooter' | 'hasHeader'>>;
export type ResolveCardStateOptionsParams = {
	handler?: unknown;
	hasBody?: boolean;
	hasFooter?: boolean;
	hasHeader?: boolean;
	props: CardStatePropsLike;
};

export type CardDerived = {
	bodySlotClass: string;
	containerClass: string;
	contentState: CardContentState;
	dividerClass: string;
	footerSlotClass: string;
	headerSlotClass: string;
	interactiveClass: string;
	paddingClass: string;
};

// 输入 Card 组件状态，返回框架无关的 class 字符串和显示分支。
// Convert Card component state into framework-agnostic class strings and visibility branches.
export const resolveCardPaddingClass = ({
	p = '4',
	px,
	py
}: {
	p?: CardSpacing;
	px?: CardScale;
	py?: CardScale;
} = {}) => {
	if (px || py) {
		return [px ? pxScaleObj[px as keyof typeof pxScaleObj] || '' : '', py ? pyScaleObj[py as keyof typeof pyScaleObj] || '' : '']
			.filter(Boolean)
			.join(' ');
	}

	return cardSpacingObj[p as keyof typeof cardSpacingObj] || cardSpacingObj['4'];
};

export const resolveCardBorderClass = ({
	border = 'none',
	borderWidth = '1'
}: {
	border?: CardBorder;
	borderWidth?: CardBorderWidth;
} = {}) => {
	if (border === 'none') return '';

	return [
		cardBorderObj[border as keyof typeof cardBorderObj] || '',
		cardBorderWidthObj[borderWidth as keyof typeof cardBorderWidthObj] || ''
	]
		.filter(Boolean)
		.join(' ');
};

export const resolveCardBgClass = (bg: CardBg = 'surface') => (bg in bgObj ? bgObj[bg as keyof typeof bgObj] : bgObj.surface);

export const resolveCardRadiusClass = (radius: CardRadius = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-box)';

export const resolveCardShadowClass = (shadow: CardShadow = 'sm') =>
	cardShadowObj[shadow as keyof typeof cardShadowObj] || cardShadowObj.sm;

export const resolveCardMxClass = (mx: CardScale = '2') => mxScaleObj[mx as keyof typeof mxScaleObj] || mxScaleObj['2'];

export const resolveCardMyClass = (my: CardScale = '2') => myScaleObj[my as keyof typeof myScaleObj] || myScaleObj['2'];

export const resolveCardInteractive = (handler: unknown): boolean => Boolean(handler);

// 输入 Card 内容状态，返回框架无关的展示分支。
// Resolve Card content state into framework-agnostic display branches.
export const resolveCardContentState = ({
	footerLine = true,
	handler,
	hasBody = false,
	hasFooter = false,
	hasHeader = false,
	headerLine = true
}: ResolveCardContentStateOptions = {}): CardContentState => ({
	isInteractive: resolveCardInteractive(handler),
	showBody: hasBody,
	showFooter: hasFooter,
	showFooterDivider: resolveCardDividerVisible({ line: footerLine, hasChildren: hasBody, hasSection: hasFooter }),
	showHeader: hasHeader,
	showHeaderDivider: resolveCardDividerVisible({ line: headerLine, hasChildren: hasBody, hasSection: hasHeader })
});

export const resolveCardContainerClass = ({
	overflow = true,
	bg = 'surface',
	radius = '',
	shadow = 'sm',
	mx = '2',
	my = '2',
	border = 'none',
	borderWidth = '1',
	injClass = ''
}: {
	overflow?: boolean;
	bg?: CardBg;
	radius?: CardRadius;
	shadow?: CardShadow;
	mx?: CardScale;
	my?: CardScale;
	border?: CardBorder;
	borderWidth?: CardBorderWidth;
	injClass?: string;
} = {}) =>
	[
		overflow ? 'overflow-hidden' : '',
		resolveCardBgClass(bg),
		resolveCardRadiusClass(radius),
		resolveCardShadowClass(shadow),
		resolveCardMxClass(mx),
		resolveCardMyClass(my),
		resolveCardBorderClass({ border, borderWidth }),
		injClass
	]
		.filter(Boolean)
		.join(' ');

export const resolveCardInteractiveClass = (containerClass: string) => ['block text-left', containerClass].filter(Boolean).join(' ');

export const resolveCardHeaderClass = (headerClass = '') => ['px-4 py-3', headerClass].filter(Boolean).join(' ');

export const resolveCardBodyClass = ({ paddingClass, bodyClass = '' }: { paddingClass: string; bodyClass?: string }) =>
	[paddingClass, bodyClass].filter(Boolean).join(' ');

export const resolveCardFooterClass = (footerClass = '') => ['px-4 py-3', footerClass].filter(Boolean).join(' ');

export const resolveCardDividerClass = () => 'border-t border-black/5 dark:border-white/5';

export const resolveCardDividerVisible = ({
	line,
	hasChildren,
	hasSection
}: {
	line: boolean;
	hasChildren: boolean;
	hasSection: boolean;
}) => line && hasChildren && hasSection;

// 输入组件 props 和内容状态，返回框架无关的 Card 派生入参。
// Receive component props and content state, then return framework-agnostic Card derivation options.
export const resolveCardStateOptions = ({
	handler,
	hasBody,
	hasFooter,
	hasHeader,
	props
}: ResolveCardStateOptionsParams): ResolveCardDerivedOptions => ({
	bg: props.bg,
	bodyClass: props.bodyClass,
	border: props.border,
	borderWidth: props.borderWidth,
	footerClass: props.footerClass,
	footerLine: props.footerLine,
	handler,
	hasBody,
	hasFooter,
	hasHeader,
	headerClass: props.headerClass,
	headerLine: props.headerLine,
	injClass: props.injClass,
	mx: props.mx,
	my: props.my,
	overflow: props.overflow,
	p: props.p,
	px: props.px,
	py: props.py,
	radius: props.radius,
	shadow: props.shadow
});

// 输入 Card 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Card state and return framework-agnostic derived values ready for component binding.
export const resolveCardDerived = ({
	bg = 'surface',
	bodyClass = '',
	border = 'none',
	borderWidth = '1',
	footerClass = '',
	footerLine = true,
	handler,
	hasBody = false,
	hasFooter = false,
	hasHeader = false,
	headerClass = '',
	headerLine = true,
	injClass = '',
	mx = '2',
	my = '2',
	overflow = true,
	p = '4',
	px,
	py,
	radius = '',
	shadow = 'sm'
}: ResolveCardDerivedOptions = {}): CardDerived => {
	const paddingClass = resolveCardPaddingClass({ p, px, py });
	const containerClass = resolveCardContainerClass({ overflow, bg, radius, shadow, mx, my, border, borderWidth, injClass });

	return {
		paddingClass,
		containerClass,
		interactiveClass: resolveCardInteractiveClass(containerClass),
		headerSlotClass: resolveCardHeaderClass(headerClass),
		bodySlotClass: resolveCardBodyClass({ paddingClass, bodyClass }),
		footerSlotClass: resolveCardFooterClass(footerClass),
		dividerClass: resolveCardDividerClass(),
		contentState: resolveCardContentState({ headerLine, footerLine, handler, hasHeader, hasBody, hasFooter })
	};
};
