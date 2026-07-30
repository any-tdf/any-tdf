export const accordionRadiusObj = {
	none: 'rounded-none',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
	'2xl': 'rounded-2xl',
	'3xl': 'rounded-3xl',
	'4xl': 'rounded-4xl',
	full: 'rounded-full',
	'': 'rounded-(--radius-box)'
} as const;

export const accordionBorderObj = {
	none: '',
	solid: 'border border-solid border-black/10 dark:border-white/10',
	dashed: 'border border-dashed border-black/10 dark:border-white/10',
	dotted: 'border border-dotted border-black/10 dark:border-white/10'
} as const;

export const accordionDividerObj = {
	none: 'border-t border-black/10 dark:border-white/10',
	solid: 'border-t border-solid border-black/10 dark:border-white/10',
	dashed: 'border-t border-dashed border-black/10 dark:border-white/10',
	dotted: 'border-t border-dotted border-black/10 dark:border-white/10'
} as const;

export type AccordionActiveIndex = number | number[] | undefined;
export type AccordionBorder = keyof typeof accordionBorderObj;
export type AccordionDividerBorder = keyof typeof accordionDividerObj;
export type AccordionExpandIcon = string | null | false | undefined;
export type AccordionIconPosition = 'left' | 'right' | string;
export type AccordionRadius = keyof typeof accordionRadiusObj;
export type AccordionExpandIconKind = 'arrow' | 'plus' | 'custom' | 'none';

export type ResolveAccordionExpandedOptions = {
	activeIndex: AccordionActiveIndex;
	index: number;
	multiple?: boolean;
};

export type ResolveAccordionNextActiveOptions = ResolveAccordionExpandedOptions;
export type ResolveAccordionToggleActionOptions = ResolveAccordionNextActiveOptions & {
	disabled?: boolean;
};
export type AccordionToggleAction = {
	nextActive: AccordionActiveIndex;
	shouldToggle: boolean;
};

export type ResolveAccordionButtonClassOptions = {
	disabled?: boolean;
	iconPosition?: AccordionIconPosition;
	titleClass?: string;
};
export type ResolveAccordionExpandIconStateOptions = {
	expanded?: boolean;
	expandIcon?: AccordionExpandIcon;
};
export type AccordionExpandIconState = {
	iconClass: string;
	kind: AccordionExpandIconKind;
	shouldRender: boolean;
	wrapClass: string;
};
export type AccordionItemLike = {
	disabled?: boolean;
};
export type ResolveAccordionItemViewStateListOptions<TItem extends AccordionItemLike = AccordionItemLike> = {
	activeIndex: AccordionActiveIndex;
	border?: AccordionDividerBorder | string;
	divider?: boolean;
	expandIcon?: AccordionExpandIcon;
	iconPosition?: AccordionIconPosition;
	items?: readonly TItem[];
	multiple?: boolean;
	titleClass?: string;
};
export type AccordionItemViewState<TItem extends AccordionItemLike = AccordionItemLike> = {
	buttonClass: string;
	dividerClass: string;
	expanded: boolean;
	iconState: AccordionExpandIconState;
	index: number;
	item: TItem;
	titleClass: string;
};
export type ResolveAccordionSlideParamsOptions<TEasing = never> = {
	duration?: number;
	easing?: TEasing;
};
export type AccordionSlideParams<TEasing = never> = {
	duration: number;
	easing?: TEasing;
};
export type ResolveAccordionDerivedOptions<
	TItem extends AccordionItemLike = AccordionItemLike,
	TEasing = never
> = ResolveAccordionItemViewStateListOptions<TItem> & {
	contentClass?: string;
	easing?: TEasing;
	injClass?: string;
	radius?: AccordionRadius | string;
	transitionDuration?: number;
};
export type AccordionStatePropsLike<TItem extends AccordionItemLike = AccordionItemLike, TEasing = never> = Partial<
	Omit<ResolveAccordionDerivedOptions<TItem, TEasing>, 'activeIndex' | 'easing'>
>;
export type ResolveAccordionStateOptionsParams<TItem extends AccordionItemLike = AccordionItemLike, TEasing = never> = {
	activeIndex: AccordionActiveIndex;
	easing?: TEasing;
	props: AccordionStatePropsLike<TItem, TEasing>;
};
export type AccordionDerived<TItem extends AccordionItemLike = AccordionItemLike, TEasing = never> = {
	contentClass: string;
	itemViewStates: AccordionItemViewState<TItem>[];
	panelClass: string;
	rootClass: string;
	slideParams: AccordionSlideParams<TEasing>;
	titleTextClass: string;
};

// 输入 Accordion 状态，返回框架无关的展开状态、下一状态和 class 派生。
// Resolve Accordion state into framework-agnostic expansion, next state and class derivations.
export const resolveAccordionRadiusClass = (radius: AccordionRadius | string = 'md') =>
	accordionRadiusObj[radius as AccordionRadius] || accordionRadiusObj[''];

export const resolveAccordionBorderClass = (border: AccordionBorder | string = 'solid') =>
	accordionBorderObj[border as AccordionBorder] || '';

export const resolveAccordionBaseDividerClass = (border: AccordionDividerBorder | string = 'solid') =>
	accordionDividerObj[border as AccordionDividerBorder] || '';

export const resolveAccordionDividerClass = ({
	index,
	divider = true,
	border = 'solid'
}: {
	border?: AccordionDividerBorder | string;
	divider?: boolean;
	index: number;
}) => (index > 0 && divider ? resolveAccordionBaseDividerClass(border) : '');

export const resolveAccordionExpanded = ({ activeIndex, index, multiple = false }: ResolveAccordionExpandedOptions) => {
	if (activeIndex === undefined) return false;
	if (multiple && Array.isArray(activeIndex)) return activeIndex.includes(index);
	return activeIndex === index;
};

export const resolveAccordionNextActive = ({
	activeIndex,
	index,
	multiple = false
}: ResolveAccordionNextActiveOptions): AccordionActiveIndex => {
	if (multiple) {
		const currentActive = Array.isArray(activeIndex) ? [...activeIndex] : [];
		const currentIndex = currentActive.indexOf(index);
		if (currentIndex > -1) {
			currentActive.splice(currentIndex, 1);
			return currentActive;
		}
		currentActive.push(index);
		return currentActive;
	}
	return activeIndex === index ? undefined : index;
};

// 输入 Accordion 点击状态，返回是否切换和下一展开值。
// Receive Accordion click state and return whether to toggle plus the next active value.
export const resolveAccordionToggleAction = ({
	disabled = false,
	...options
}: ResolveAccordionToggleActionOptions): AccordionToggleAction => ({
	nextActive: disabled ? options.activeIndex : resolveAccordionNextActive(options),
	shouldToggle: !disabled
});

export const resolveAccordionIconRotationClass = ({ expanded, expandIcon }: { expanded?: boolean; expandIcon?: AccordionExpandIcon }) => {
	if (!expanded) return '';
	if (expandIcon === 'arrow') return 'rotate-90';
	if (expandIcon === 'plus') return 'rotate-45';
	return '';
};

export const resolveAccordionRootClass = ({
	radius = 'md',
	border = 'solid',
	injClass = ''
}: {
	border?: AccordionBorder | string;
	injClass?: string;
	radius?: AccordionRadius | string;
}) => ['overflow-hidden', resolveAccordionRadiusClass(radius), resolveAccordionBorderClass(border), injClass].filter(Boolean).join(' ');

export const resolveAccordionButtonClass = ({
	disabled = false,
	iconPosition = 'right',
	titleClass = ''
}: ResolveAccordionButtonClassOptions) =>
	[
		'flex w-full items-center justify-between px-4 py-3 text-left transition-colors',
		disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:bg-black/5 dark:active:bg-white/5',
		iconPosition === 'left' ? 'flex-row-reverse' : '',
		titleClass
	]
		.filter(Boolean)
		.join(' ');

export const resolveAccordionTitleClass = (iconPosition: AccordionIconPosition = 'right') =>
	['flex flex-1 items-center gap-2', iconPosition === 'left' ? 'flex-row-reverse justify-end' : ''].filter(Boolean).join(' ');

export const resolveAccordionContentClass = (contentClass = '') =>
	['px-4 pb-4 text-sm text-black/70 dark:text-white/70', contentClass].filter(Boolean).join(' ');

export const resolveAccordionIconWrapClass = ({ expanded, expandIcon }: { expanded?: boolean; expandIcon?: AccordionExpandIcon }) =>
	['shrink-0 transition-transform duration-300', resolveAccordionIconRotationClass({ expanded, expandIcon })].filter(Boolean).join(' ');

export const resolveAccordionIconClass = () => 'h-4 w-4';

export const resolveAccordionPanelClass = () => 'overflow-hidden';

export const resolveAccordionTitleTextClass = () => 'font-medium';

// 输入组件层的动画时长和可选 easing，返回框架无关的折叠动画参数。
// Resolve component-owned duration and optional easing into framework-agnostic slide params.
export const resolveAccordionSlideParams = <TEasing = never>({
	duration = 300,
	easing
}: ResolveAccordionSlideParamsOptions<TEasing> = {}): AccordionSlideParams<TEasing> =>
	easing === undefined ? { duration } : { duration, easing };

// 输入 Accordion 图标状态，返回框架无关的展示分支和包裹层 class。
// Resolve Accordion icon state into framework-agnostic display branch and wrapper class.
export const resolveAccordionExpandIconState = ({
	expanded = false,
	expandIcon = 'arrow'
}: ResolveAccordionExpandIconStateOptions = {}): AccordionExpandIconState => {
	const iconClass = resolveAccordionIconClass();
	if (!expandIcon) return { iconClass: '', kind: 'none', shouldRender: false, wrapClass: '' };
	if (expandIcon === 'arrow')
		return { iconClass, kind: 'arrow', shouldRender: true, wrapClass: resolveAccordionIconWrapClass({ expanded, expandIcon }) };
	if (expandIcon === 'plus')
		return { iconClass, kind: 'plus', shouldRender: true, wrapClass: resolveAccordionIconWrapClass({ expanded, expandIcon }) };
	return { iconClass, kind: 'custom', shouldRender: true, wrapClass: resolveAccordionIconWrapClass({ expanded, expandIcon }) };
};

// 输入 Accordion 列表和组件状态，返回组件层可直接渲染的框架无关视图列表。
// Receive Accordion items and component state, then return a framework-agnostic view list for component rendering.
export const resolveAccordionItemViewStateList = <TItem extends AccordionItemLike = AccordionItemLike>({
	activeIndex,
	border = 'solid',
	divider = true,
	expandIcon = 'arrow',
	iconPosition = 'right',
	items = [],
	multiple = false,
	titleClass = ''
}: ResolveAccordionItemViewStateListOptions<TItem>): AccordionItemViewState<TItem>[] =>
	items.map((item, index) => {
		const expanded = resolveAccordionExpanded({ activeIndex, index, multiple });
		return {
			buttonClass: resolveAccordionButtonClass({ disabled: item.disabled, iconPosition, titleClass }),
			dividerClass: resolveAccordionDividerClass({ index, divider, border }),
			expanded,
			iconState: resolveAccordionExpandIconState({ expanded, expandIcon }),
			index,
			item,
			titleClass: resolveAccordionTitleClass(iconPosition)
		};
	});

// 输入组件 props 和展开状态，返回框架无关的 Accordion 派生入参。
// Receive component props and expansion state, then return framework-agnostic Accordion derivation options.
export const resolveAccordionStateOptions = <TItem extends AccordionItemLike = AccordionItemLike, TEasing = never>({
	activeIndex,
	easing,
	props
}: ResolveAccordionStateOptionsParams<TItem, TEasing>): ResolveAccordionDerivedOptions<TItem, TEasing> => ({
	activeIndex,
	border: props.border,
	contentClass: props.contentClass,
	divider: props.divider,
	easing,
	expandIcon: props.expandIcon,
	iconPosition: props.iconPosition,
	injClass: props.injClass,
	items: props.items,
	multiple: props.multiple,
	radius: props.radius,
	titleClass: props.titleClass,
	transitionDuration: props.transitionDuration
});

// 输入 Accordion props 和动画参数，返回框架无关的渲染派生结果。
// Receive Accordion props and animation params, then return framework-agnostic render derivations.
export const resolveAccordionDerived = <TItem extends AccordionItemLike = AccordionItemLike, TEasing = never>({
	activeIndex,
	border = 'solid',
	contentClass = '',
	divider = true,
	easing,
	expandIcon = 'arrow',
	iconPosition = 'right',
	injClass = '',
	items = [],
	multiple = false,
	radius = 'md',
	titleClass = '',
	transitionDuration = 300
}: ResolveAccordionDerivedOptions<TItem, TEasing>): AccordionDerived<TItem, TEasing> => ({
	contentClass: resolveAccordionContentClass(contentClass),
	itemViewStates: resolveAccordionItemViewStateList({
		items,
		activeIndex,
		multiple,
		expandIcon,
		divider,
		border,
		iconPosition,
		titleClass
	}),
	panelClass: resolveAccordionPanelClass(),
	rootClass: resolveAccordionRootClass({ radius, border, injClass }),
	slideParams: resolveAccordionSlideParams({ duration: transitionDuration, easing }),
	titleTextClass: resolveAccordionTitleTextClass()
});
