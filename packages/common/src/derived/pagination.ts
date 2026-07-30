import { bgObj, radiusObj } from './common.js';
import { joinClasses, resolveClassMapValue } from './helpers.js';

export const paginationPageTypeClass = {
	border: 'border-primary dark:border-dark text-primary dark:text-dark',
	block: 'bg-primary text-text-on-primary dark:bg-dark dark:text-text-on-dark border-transparent',
	bold: 'font-bold text-primary dark:text-dark border-transparent'
} as const;

export const paginationSecondPageBgClass = {
	white: 'bg-white dark:bg-gray-800',
	surface: 'bg-bg-surface dark:bg-bg-surface-dark',
	gray: 'bg-bg-overlay dark:bg-bg-overlay-dark',
	theme: 'bg-primary-50 dark:bg-dark-950'
} as const;

export const paginationSecondPageArrowClass = {
	white: 'border-t-white dark:border-t-gray-800',
	surface: 'border-t-bg-surface dark:border-t-bg-surface-dark',
	gray: 'border-t-bg-overlay dark:border-t-bg-overlay-dark',
	theme: 'border-t-primary-50 dark:border-t-dark-950'
} as const;

export type PaginationType = keyof typeof paginationPageTypeClass;
export type PaginationBg = keyof typeof paginationSecondPageBgClass;
export type PaginationRadius = keyof typeof radiusObj | '';
export type PaginationSecondPagePlacement = 'pre' | 'next';
export type PaginationNavigateDirection = 'next' | 'pre';

export type ResolvePaginationRangeOptions = {
	current: number;
	totalPage: number;
	maxShowPage: number;
};

export type ResolvePaginationEllipsisPagesOptions = ResolvePaginationRangeOptions & {
	showPreEllipsis: boolean;
	showNextEllipsis: boolean;
	middlePages: number[];
};

export type PaginationSecondPageStyleValue = {
	width: string;
	left?: string;
	right?: string;
};

export type PaginationSecondPageGridStyleValue = {
	gridTemplateColumns: string;
};

export type PaginationPageItem = {
	page: number;
	active: boolean;
	className: string;
};

export type PaginationTexts = {
	noDataText: string;
	onePageText: string;
};

export type PaginationTextDefaults = {
	common: {
		noData: string;
	};
	pagination: {
		defaultOnlyOnePage: string;
	};
};

export type ResolvePaginationTextsOptions = Partial<PaginationTexts> & {
	defaults: PaginationTextDefaults;
};

export type PaginationEllipsisToggleAction = {
	shouldToggle: boolean;
	nextVisible: boolean;
};

export type PaginationCurrentAction = {
	shouldChange: boolean;
	nextCurrent: number;
	nextShowNextOmitPage: boolean;
	nextShowPreOmitPage: boolean;
};

export type PaginationNextOmitSyncAction = {
	shouldSync: boolean;
	nextShowNextOmitPage: boolean;
};

export type ResolvePaginationDerivedOptions = {
	total?: number;
	pageSize?: number;
	current?: number;
	maxShowPage?: number;
	radius?: PaginationRadius | string;
	type?: PaginationType | string;
	bg?: PaginationBg | string;
	injClass?: string;
	showNextOmitPage?: boolean;
	showPreOmitPage?: boolean;
	noDataText?: string;
	onePageText?: string;
	defaults: PaginationTextDefaults;
};

export type PaginationStatePropsLike = Partial<
	Omit<ResolvePaginationDerivedOptions, 'current' | 'defaults' | 'showNextOmitPage' | 'showPreOmitPage'>
>;

export type ResolvePaginationStateOptionsParams = {
	current?: number;
	defaults: PaginationTextDefaults;
	props: PaginationStatePropsLike;
	showNextOmitPage?: boolean;
	showPreOmitPage?: boolean;
};

export type PaginationDerived = {
	texts: PaginationTexts;
	totalPage: number;
	showNoData: boolean;
	showOnePage: boolean;
	showAllPages: boolean;
	showComplexPages: boolean;
	showPreEllipsis: boolean;
	showNextEllipsis: boolean;
	showPreOmitPage: boolean;
	showNextOmitPage: boolean;
	canPre: boolean;
	canNext: boolean;
	allPages: number[];
	allPageItems: PaginationPageItem[];
	leadingPages: number[];
	leadingPageItems: PaginationPageItem[];
	middlePages: number[];
	middlePageItems: PaginationPageItem[];
	trailingPages: number[];
	trailingPageItems: PaginationPageItem[];
	preEllipsisPages: number[];
	nextEllipsisPages: number[];
	radiusClass: string;
	rootClass: string;
	textClass: string;
	iconClass: string;
	mutedIconClass: string;
	preButtonClass: string;
	nextButtonClass: string;
	preEllipsisClass: string;
	nextEllipsisClass: string;
	inactivePageClass: string;
	firstPageItem: PaginationPageItem;
	lastPageItem: PaginationPageItem;
};

export type ResolvePaginationSecondPageDerivedOptions = {
	placement: PaginationSecondPagePlacement;
	pageCol?: number;
	pages?: number[];
	maxShowPage?: number;
	bg?: PaginationBg | string;
	dropShadow?: boolean;
};
export type PaginationSecondPageStatePropsLike = Partial<ResolvePaginationSecondPageDerivedOptions> &
	Pick<ResolvePaginationSecondPageDerivedOptions, 'placement'>;
export type ResolvePaginationSecondPageStateOptionsParams = {
	props: PaginationSecondPageStatePropsLike;
};

export type PaginationSecondPageDerived = {
	visible: boolean;
	containerClass: string;
	containerStyleValue: PaginationSecondPageStyleValue;
	containerStyleString: string;
	contentClass: string;
	gridStyleValue: PaginationSecondPageGridStyleValue;
	gridStyleString: string;
	arrowClass: string;
};

// 输入分页状态，返回框架无关的页码派生结果。
// Resolve pagination state into framework-agnostic page ranges.
export const resolvePaginationTotalPage = ({ total = 0, pageSize = 10 }: { total?: number; pageSize?: number }): number =>
	Math.ceil(total / pageSize);

// 输入组件文案 props 和默认文案，返回框架无关的最终文案。
// Consume component text props and default text, then return framework-agnostic final text.
export const resolvePaginationTexts = ({ noDataText, onePageText, defaults }: ResolvePaginationTextsOptions): PaginationTexts => ({
	noDataText: noDataText ?? defaults.common.noData,
	onePageText: onePageText ?? defaults.pagination.defaultOnlyOnePage
});

export const resolvePaginationShowPreEllipsis = ({ current, maxShowPage }: { current: number; maxShowPage: number }): boolean =>
	current > maxShowPage - 2;

export const resolvePaginationShowNextEllipsis = ({ current, totalPage, maxShowPage }: ResolvePaginationRangeOptions): boolean =>
	current <= maxShowPage - 2 || current <= totalPage - (maxShowPage - 3);

export const resolvePaginationMiddlePages = ({
	current,
	maxShowPage,
	showPreEllipsis,
	showNextEllipsis
}: ResolvePaginationRangeOptions & { showPreEllipsis: boolean; showNextEllipsis: boolean }): number[] => {
	if (!showPreEllipsis || !showNextEllipsis) return [];
	if (maxShowPage === 5) return [current];
	if (maxShowPage === 7) return [current - 1, current, current + 1];
	if (maxShowPage === 9) return [current - 2, current - 1, current, current + 1, current + 2];
	if (maxShowPage === 11) return [current - 3, current - 2, current - 1, current, current + 1, current + 2, current + 3];
	return [];
};

// 输入中间页索引，返回框架无关的 active 状态。
// Resolve middle-page index into a framework-agnostic active state.
export const resolvePaginationMiddlePageActive = ({ index, pageLength }: { index: number; pageLength: number }): boolean =>
	index === Math.floor((pageLength - 1) / 2);

export const resolvePaginationAllPages = (totalPage: number): number[] => Array.from({ length: totalPage }, (_, index) => index + 1);

export const resolvePaginationPreEllipsisPages = ({
	totalPage,
	maxShowPage,
	showPreEllipsis,
	showNextEllipsis,
	middlePages
}: ResolvePaginationEllipsisPagesOptions): number[] => {
	const allPages = resolvePaginationAllPages(totalPage);
	if (showPreEllipsis && !showNextEllipsis) return allPages.slice(1, totalPage - (maxShowPage - 2));
	if (showPreEllipsis && showNextEllipsis && middlePages.length > 0) return allPages.slice(1, middlePages[0] - 1);
	return [];
};

export const resolvePaginationNextEllipsisPages = ({
	totalPage,
	maxShowPage,
	showPreEllipsis,
	showNextEllipsis,
	middlePages
}: ResolvePaginationEllipsisPagesOptions): number[] => {
	const allPages = resolvePaginationAllPages(totalPage);
	if (!showPreEllipsis && showNextEllipsis) return allPages.slice(maxShowPage - 2, totalPage - 1);
	if (showPreEllipsis && showNextEllipsis && middlePages.length > 0)
		return allPages.slice(middlePages[middlePages.length - 1], totalPage - 1);
	return [];
};

export const resolvePaginationLeadingPages = ({
	current,
	maxShowPage,
	showPreEllipsis
}: ResolvePaginationRangeOptions & { showPreEllipsis: boolean }): number[] =>
	!showPreEllipsis && current <= maxShowPage - 1 ? Array.from({ length: maxShowPage - 3 }, (_, index) => index + 2) : [];

export const resolvePaginationTrailingPages = ({
	current,
	totalPage,
	maxShowPage,
	showNextEllipsis
}: ResolvePaginationRangeOptions & { showNextEllipsis: boolean }): number[] =>
	!showNextEllipsis && current > totalPage - (maxShowPage - 3)
		? Array.from({ length: maxShowPage - 3 }, (_, index) => totalPage + index + 3 - maxShowPage)
		: [];

export const resolvePaginationRadiusClass = (radius: PaginationRadius | string = ''): string =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-form)';

export const resolvePaginationBgClass = (bg: PaginationBg | string = 'gray'): string => resolveClassMapValue(bgObj, bg, 'gray');

export const resolvePaginationRootClass = ({
	bg = 'gray',
	radius = '',
	injClass = ''
}: { bg?: PaginationBg | string; radius?: PaginationRadius | string; injClass?: string } = {}): string =>
	joinClasses([
		'relative flex justify-between',
		resolvePaginationBgClass(bg),
		resolvePaginationRadiusClass(radius),
		'py-1 text-center text-sm',
		injClass
	]);

// 输入省略页可选数量和当前展开状态，返回无副作用的开关动作。
// Receive available ellipsis page count and current visibility, then return a side-effect-free toggle action.
export const resolvePaginationEllipsisToggleAction = ({
	pageCount,
	visible
}: {
	pageCount: number;
	visible: boolean;
}): PaginationEllipsisToggleAction => ({
	shouldToggle: pageCount > 0,
	nextVisible: pageCount > 0 ? !visible : visible
});

// 输入目标页，返回页码选择后的状态动作。
// Receive target page and return state action after selecting the page.
export const resolvePaginationSelectAction = (page: number): PaginationCurrentAction => ({
	shouldChange: true,
	nextCurrent: page,
	nextShowNextOmitPage: false,
	nextShowPreOmitPage: false
});

// 输入翻页方向和边界，返回上一页或下一页动作。
// Receive navigation direction and bounds, then return previous-page or next-page action.
export const resolvePaginationNavigateAction = ({
	current,
	totalPage,
	direction
}: {
	current: number;
	totalPage: number;
	direction: PaginationNavigateDirection;
}): PaginationCurrentAction => {
	const shouldChange = direction === 'next' ? current < totalPage : current > 1;
	const nextCurrent = shouldChange ? current + (direction === 'next' ? 1 : -1) : current;
	return {
		shouldChange,
		nextCurrent,
		nextShowNextOmitPage: false,
		nextShowPreOmitPage: false
	};
};

// 输入总页数和最大展示页数，返回 next 省略层是否需要同步关闭。
// Receive total pages and max visible pages, then return whether the next ellipsis layer should close.
export const resolvePaginationNextOmitSyncAction = ({
	totalPage,
	maxShowPage,
	showNextOmitPage
}: {
	totalPage: number;
	maxShowPage: number;
	showNextOmitPage: boolean;
}): PaginationNextOmitSyncAction => ({
	shouldSync: totalPage <= maxShowPage && showNextOmitPage,
	nextShowNextOmitPage: totalPage <= maxShowPage ? false : showNextOmitPage
});

export const resolvePaginationPageClass = ({
	active = false,
	type = 'border',
	radius = '',
	radiusClass,
	injClass = ''
}: {
	active?: boolean;
	type?: PaginationType | string;
	radius?: PaginationRadius | string;
	radiusClass?: string;
	injClass?: string;
} = {}): string =>
	joinClasses([
		'flex-1 border py-2',
		active ? resolveClassMapValue(paginationPageTypeClass, type, 'border') : `border-transparent${type === 'bold' ? ' opacity-50' : ''}`,
		radiusClass || resolvePaginationRadiusClass(radius),
		injClass
	]);

export const resolvePaginationNavButtonClass = ({
	enabled = false,
	radius = '',
	radiusClass
}: {
	enabled?: boolean;
	radius?: PaginationRadius | string;
	radiusClass?: string;
} = {}): string =>
	joinClasses([
		'flex-1 border border-transparent py-2 transition-all',
		enabled ? 'text-primary dark:text-dark' : 'text-primary/30 dark:text-dark/30',
		radiusClass || resolvePaginationRadiusClass(radius),
		enabled && 'active:scale-75'
	]);

export const resolvePaginationTextClass = (): string => 'flex-1 border border-transparent py-2';

export const resolvePaginationIconClass = (): string => 'mx-auto block';

export const resolvePaginationMutedIconClass = (): string => 'mx-auto block text-black/50 dark:text-white/50';

export const resolvePaginationSecondPageContainerClass = (
	placement: PaginationSecondPagePlacement,
	{ dropShadow = true }: { dropShadow?: boolean } = {}
): string =>
	joinClasses([
		placement === 'pre'
			? 'pagination-second-page-popover absolute -top-3 -translate-x-1/2 -translate-y-full'
			: 'pagination-second-page-popover absolute -top-3 translate-x-1/2 -translate-y-full',
		dropShadow && 'drop-shadow-sm'
	]);

export const resolvePaginationSecondPageContentClass = (bg: PaginationBg | string = 'white'): string =>
	joinClasses([
		'pagination-second-page-contents second-page-contents grid max-h-29 w-full gap-y-2 overflow-y-auto rounded-lg',
		resolveClassMapValue(paginationSecondPageBgClass, bg, 'white'),
		'p-1'
	]);

export const resolvePaginationSecondPageArrowClass = (bg: PaginationBg | string = 'white'): string =>
	joinClasses([
		'absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 -translate-y-px border-8 border-t-8 border-transparent',
		resolveClassMapValue(paginationSecondPageArrowClass, bg, 'white')
	]);

export const resolvePaginationSecondPageStyleValue = ({
	placement,
	pageCol = 3,
	maxShowPage = 7
}: {
	placement: PaginationSecondPagePlacement;
	pageCol?: number;
	maxShowPage?: number;
}): PaginationSecondPageStyleValue => {
	const sideValue = `${(2.5 / (maxShowPage + 2)) * 100}%`;
	const style: PaginationSecondPageStyleValue = {
		width: `calc(${(pageCol / (maxShowPage + 2)) * 100}% + 8px)`
	};
	if (placement === 'pre') style.left = sideValue;
	else style.right = sideValue;
	return style;
};

export const resolvePaginationSecondPageStyleString = (options: {
	placement: PaginationSecondPagePlacement;
	pageCol?: number;
	maxShowPage?: number;
}): string => {
	const style = resolvePaginationSecondPageStyleValue(options);
	const side = style.left ? `left:${style.left};` : `right:${style.right};`;
	return `width: ${style.width};${side}`;
};

export const resolvePaginationSecondPageGridStyleValue = (pageCol = 3): PaginationSecondPageGridStyleValue => ({
	gridTemplateColumns: `repeat(${pageCol}, minmax(0, 1fr))`
});

export const resolvePaginationSecondPageGridStyleString = (pageCol = 3): string =>
	`grid-template-columns: ${resolvePaginationSecondPageGridStyleValue(pageCol).gridTemplateColumns};`;

// 输入组件 props、内部页码状态和默认文案，返回框架无关的 Pagination 派生入参。
// Receive component props, internal page state and default text, then return framework-agnostic Pagination derivation options.
export const resolvePaginationStateOptions = ({
	current,
	defaults,
	props,
	showNextOmitPage,
	showPreOmitPage
}: ResolvePaginationStateOptionsParams): ResolvePaginationDerivedOptions => ({
	bg: props.bg,
	current,
	defaults,
	injClass: props.injClass,
	maxShowPage: props.maxShowPage,
	noDataText: props.noDataText,
	onePageText: props.onePageText,
	pageSize: props.pageSize,
	radius: props.radius,
	showNextOmitPage,
	showPreOmitPage,
	total: props.total,
	type: props.type
});

// 输入组件 props，返回框架无关的 PaginationSecondPage 派生入参。
// Receive component props and return framework-agnostic PaginationSecondPage derivation options.
export const resolvePaginationSecondPageStateOptions = ({
	props
}: ResolvePaginationSecondPageStateOptionsParams): ResolvePaginationSecondPageDerivedOptions => ({
	bg: props.bg,
	dropShadow: props.dropShadow,
	maxShowPage: props.maxShowPage,
	pageCol: props.pageCol,
	pages: props.pages,
	placement: props.placement
});

// 输入二级页码状态，返回框架无关的浮层 class 和 style。
// Receive second-level page state and return framework-agnostic popover classes and styles.
export const resolvePaginationSecondPageDerived = ({
	placement,
	pageCol = 3,
	pages = [],
	maxShowPage = 7,
	bg = 'white',
	dropShadow = true
}: ResolvePaginationSecondPageDerivedOptions): PaginationSecondPageDerived => ({
	visible: pages.length > 0,
	containerClass: resolvePaginationSecondPageContainerClass(placement, { dropShadow }),
	containerStyleValue: resolvePaginationSecondPageStyleValue({ placement, pageCol, maxShowPage }),
	containerStyleString: resolvePaginationSecondPageStyleString({ placement, pageCol, maxShowPage }),
	contentClass: resolvePaginationSecondPageContentClass(bg),
	gridStyleValue: resolvePaginationSecondPageGridStyleValue(pageCol),
	gridStyleString: resolvePaginationSecondPageGridStyleString(pageCol),
	arrowClass: resolvePaginationSecondPageArrowClass(bg)
});

// 输入分页 props 和内部状态，返回框架无关的渲染派生结果。
// Receive pagination props and internal state, then return framework-agnostic render derivation.
export const resolvePaginationDerived = ({
	total = 0,
	pageSize = 10,
	current = 1,
	maxShowPage = 7,
	radius = '',
	type = 'bold',
	bg = 'gray',
	injClass = '',
	showNextOmitPage = false,
	showPreOmitPage = false,
	noDataText,
	onePageText,
	defaults
}: ResolvePaginationDerivedOptions): PaginationDerived => {
	const texts = resolvePaginationTexts({ noDataText, onePageText, defaults });
	const totalPage = resolvePaginationTotalPage({ total, pageSize });
	const showPreEllipsis = resolvePaginationShowPreEllipsis({ current, maxShowPage });
	const showNextEllipsis = resolvePaginationShowNextEllipsis({ current, totalPage, maxShowPage });
	const middlePages = resolvePaginationMiddlePages({ current, totalPage, maxShowPage, showPreEllipsis, showNextEllipsis });
	const preEllipsisPages = resolvePaginationPreEllipsisPages({
		current,
		totalPage,
		maxShowPage,
		showPreEllipsis,
		showNextEllipsis,
		middlePages
	});
	const nextEllipsisPages = resolvePaginationNextEllipsisPages({
		current,
		totalPage,
		maxShowPage,
		showPreEllipsis,
		showNextEllipsis,
		middlePages
	});
	const leadingPages = resolvePaginationLeadingPages({ current, totalPage, maxShowPage, showPreEllipsis });
	const trailingPages = resolvePaginationTrailingPages({ current, totalPage, maxShowPage, showNextEllipsis });
	const allPages = resolvePaginationAllPages(totalPage);
	const radiusClass = resolvePaginationRadiusClass(radius);
	const toPageItem = (page: number, active = current === page): PaginationPageItem => ({
		page,
		active,
		className: resolvePaginationPageClass({ active, type, radiusClass })
	});

	return {
		texts,
		totalPage,
		showNoData: totalPage === 0,
		showOnePage: totalPage === 1,
		showAllPages: totalPage > 1 && totalPage <= maxShowPage,
		showComplexPages: totalPage > 1 && totalPage > maxShowPage,
		showPreEllipsis,
		showNextEllipsis,
		showPreOmitPage,
		showNextOmitPage,
		canPre: current > 1,
		canNext: current < totalPage,
		allPages,
		allPageItems: allPages.map((page) => toPageItem(page)),
		leadingPages,
		leadingPageItems: leadingPages.map((page) => toPageItem(page)),
		middlePages,
		middlePageItems: middlePages.map((page, index) =>
			toPageItem(page, resolvePaginationMiddlePageActive({ index, pageLength: middlePages.length }))
		),
		trailingPages,
		trailingPageItems: trailingPages.map((page) => toPageItem(page)),
		preEllipsisPages,
		nextEllipsisPages,
		radiusClass,
		rootClass: resolvePaginationRootClass({ bg, radius, injClass }),
		textClass: resolvePaginationTextClass(),
		iconClass: resolvePaginationIconClass(),
		mutedIconClass: resolvePaginationMutedIconClass(),
		preButtonClass: resolvePaginationNavButtonClass({ enabled: current > 1, radiusClass }),
		nextButtonClass: resolvePaginationNavButtonClass({ enabled: current < totalPage, radiusClass }),
		preEllipsisClass: resolvePaginationPageClass({ active: showPreOmitPage, type, radiusClass }),
		nextEllipsisClass: resolvePaginationPageClass({ active: showNextOmitPage, type, radiusClass }),
		inactivePageClass: resolvePaginationPageClass({ active: false, type, radiusClass }),
		firstPageItem: toPageItem(1),
		lastPageItem: toPageItem(totalPage)
	};
};
