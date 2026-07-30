import type { IconProps, StepsItemProps, StepsStepBarIconProps, StepsStepBarImageProps, StepsStepBarStringProps } from '../types/index.js';
import { radiusObj } from './common.js';
import { joinClasses } from './helpers.js';

export type StepsRadiusKey = keyof typeof radiusObj | string;
export type StepsBar = StepsStepBarIconProps | StepsStepBarImageProps | StepsStepBarStringProps;
export type StepsBarType = StepsBar['type'];
export type StepsStyleValue = Record<string, string>;
export type ResolveStepsItemDerivedOptions<TItem extends StepsItemProps = StepsItemProps> = {
	item: TItem;
	index: number;
	current: number;
};
export type ResolveStepsItemsDerivedOptions<TItem extends StepsItemProps = StepsItemProps> = {
	current: number;
	steps: TItem[];
};
export type ResolveStepsItemLineStyleOptions = ResolveStepsItemDerivedOptions & {
	height?: number;
	total: number;
	vertical?: boolean;
	width?: number;
};
export type ResolveStepsItemLineClassOptions = {
	finished: boolean;
	hasBar?: boolean;
	index?: number;
	total?: number;
	vertical?: boolean;
};
export type ResolveStepsMeasuredHeightsStateOptions = {
	currentHeights: number[];
	nextHeights: readonly number[];
};
export type ResolveStepsMeasuredHeightItemStateOptions = {
	currentHeights: number[];
	height: number;
	index: number;
};
export type ResolveStepsMeasuredWidthStateOptions = {
	currentWidth: number;
	measuredWidth: number;
};
export type StepsMeasuredClientWidthLike =
	| {
			clientWidth?: number | null;
	  }
	| null
	| undefined;
export type StepsMeasuredClientHeightLike =
	| {
			clientHeight?: number | null;
	  }
	| null
	| undefined;
export type StepsMeasuredWidthState = {
	shouldUpdate: boolean;
	width: number;
};
export type StepsItemInject<TItem extends StepsItemProps = StepsItemProps> =
	| TItem['step']['injComponent']
	| NonNullable<TItem['finishStep']>['injComponent'];
export type StepsItemDerived<TItem extends StepsItemProps = StepsItemProps> = {
	completed: boolean;
	current: boolean;
	hasBar: boolean;
	bar?: StepsBar;
	title?: string;
	desc?: string;
	inject?: StepsItemInject<TItem>;
};
export type StepsBarContentState =
	| { kind: 'none' }
	| { kind: 'icon'; iconProps: Omit<IconProps, 'children'> }
	| { kind: 'image'; src: string }
	| { kind: 'text'; text: string };
export type StepsItemViewState<TItem extends StepsItemProps = StepsItemProps> = {
	barContentState: StepsBarContentState;
	index: number;
	item: TItem;
	itemState: StepsItemDerived<TItem>;
};
export type StepsRenderItemViewState<TItem extends StepsItemProps = StepsItemProps> = StepsItemViewState<TItem> & {
	barIconClass: string;
	barImageClass: string;
	barTextClass: string;
	barWrapperClass: string;
	lineClass: string;
	lineStyle: StepsStyleValue;
	lineStyleString: string;
	barClass: string;
	barStyle: StepsStyleValue;
	barStyleString: string;
	contentClass: string;
	horizontalItemClass: string;
	verticalItemClass: string;
	titleClass: string;
	descClass: string;
};
export type StepsMeasuredHeightsState = {
	shouldUpdate: boolean;
	heights: number[];
};
export type ResolveStepsDerivedOptions<TItem extends StepsItemProps = StepsItemProps> = {
	steps?: TItem[];
	current?: number;
	radius?: StepsRadiusKey;
	barBorder?: boolean;
	vertical?: boolean;
	width?: number;
	heightList?: readonly number[];
};
export type StepsStatePropsLike<TItem extends StepsItemProps = StepsItemProps> = Partial<
	Omit<ResolveStepsDerivedOptions<TItem>, 'heightList' | 'width'>
>;
export type ResolveStepsStateOptionsParams<TItem extends StepsItemProps = StepsItemProps> = {
	heightList?: readonly number[];
	props: StepsStatePropsLike<TItem>;
	width?: number;
};
export type StepsDerived<TItem extends StepsItemProps = StepsItemProps> = {
	horizontalRootClass: string;
	radiusClass: string;
	items: StepsRenderItemViewState<TItem>[];
	verticalRootClass: string;
};
export type ResolveStepsTypedBarOptions =
	| boolean
	| {
			allowFinishFallback?: boolean;
			preferFinish?: boolean;
	  };

// 输入 Steps 组件状态，返回框架无关的 class 字符串和布局片段。
// Convert Steps component state into framework-agnostic class strings and layout fragments.
export const resolveStepsRadiusClass = (radius: StepsRadiusKey = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-small)';

export const resolveStepsLineClass = (finished: boolean) =>
	joinClasses(['absolute transition-all', finished ? 'bg-primary dark:bg-dark' : 'bg-black/30 dark:bg-white/30']);

export const resolveStepsBarToneClass = ({ index, current, hasText = false }: { index: number; current: number; hasText?: boolean }) => {
	if (index < current - 1)
		return hasText ? 'border-primary dark:border-dark text-primary dark:text-dark' : 'border-primary dark:border-dark';
	if (index === current - 1)
		return hasText
			? 'border-primary dark:border-dark bg-primary dark:bg-dark text-text-on-primary dark:text-text-on-dark'
			: 'border-primary dark:border-dark bg-primary dark:bg-dark';
	return hasText ? 'border-black/30 text-black/30 dark:border-white/30 dark:text-white/30' : 'border-black/30 dark:border-white/30';
};

export const resolveStepsBarClass = ({
	index,
	current,
	radiusClass,
	barBorder = true,
	hasText = false,
	large = false
}: {
	index: number;
	current: number;
	radiusClass: string;
	barBorder?: boolean;
	hasText?: boolean;
	large?: boolean;
}) =>
	joinClasses([
		'absolute overflow-hidden border transition-all duration-300',
		large ? 'box-border h-7.5 w-7.5' : 'h-2.5 w-2.5',
		resolveStepsBarToneClass({ index, current, hasText }),
		radiusClass,
		!barBorder && large ? '!border-transparent' : ''
	]);

export const resolveStepsTitleClass = ({ index, current, horizontal = false }: { index: number; current: number; horizontal?: boolean }) =>
	joinClasses([
		horizontal ? 'text-center text-sm' : '',
		'font-medium transition-all duration-300',
		index < current - 1 ? '' : index === current - 1 ? 'text-primary dark:text-dark' : 'opacity-30'
	]);

export const resolveStepsDescClass = ({ index, current }: { index: number; current: number }) =>
	joinClasses(['text-xs transition-all duration-300', index <= current - 1 ? '' : 'opacity-30']);

export const resolveStepsCompleted = (index: number, current: number) => index < current - 1;

export const resolveStepsCurrent = (index: number, current: number) => index === current - 1;

export const resolveStepsHasBar = (item: StepsItemProps) => Boolean(item.step?.bar || item.finishStep?.bar);

export const resolveStepsBar = (item: StepsItemProps, useFinish = false): StepsBar | undefined =>
	useFinish && item.finishStep?.bar ? item.finishStep.bar : item.step?.bar;

export const resolveStepsTypedBar = <TType extends StepsBarType>(
	item: StepsItemProps,
	type: TType,
	options: ResolveStepsTypedBarOptions = false
): Extract<StepsBar, { type: TType }> | undefined => {
	const { preferFinish = false, allowFinishFallback = true } =
		typeof options === 'boolean' ? { preferFinish: options, allowFinishFallback: true } : options;
	const finishBar = item.finishStep?.bar;
	const stepBar = item.step?.bar;
	if (preferFinish && finishBar?.type === type) return finishBar as Extract<StepsBar, { type: TType }>;
	if (stepBar?.type === type) return stepBar as Extract<StepsBar, { type: TType }>;
	if (allowFinishFallback && finishBar?.type === type) return finishBar as Extract<StepsBar, { type: TType }>;
	return undefined;
};

export const resolveStepsIconContent = (bar: StepsBar | undefined): IconProps => (bar?.type === 'icon' ? bar.content : {});

export const resolveStepsIconRenderProps = (bar: StepsBar | undefined): Omit<IconProps, 'children'> => {
	const { children: _children, ...iconProps } = resolveStepsIconContent(bar);
	return iconProps;
};

// 输入 Steps bar 数据，返回框架无关的 bar 内容展示分支。
// Receive Steps bar data and return a framework-agnostic bar content branch.
export const resolveStepsBarContentState = (bar: StepsBar | undefined): StepsBarContentState => {
	if (!bar) return { kind: 'none' };
	if (bar.type === 'icon') return { kind: 'icon', iconProps: resolveStepsIconRenderProps(bar) };
	if (bar.type === 'image') return { kind: 'image', src: bar.content || '' };
	return { kind: 'text', text: bar.content };
};

export const resolveStepsTitle = (item: StepsItemProps, useFinish = false) =>
	useFinish && item.finishStep?.title ? item.finishStep.title : item.step?.title;

export const resolveStepsDesc = (item: StepsItemProps, useFinish = false) =>
	useFinish && item.finishStep?.desc ? item.finishStep.desc : item.step?.desc;

export const resolveStepsInject = <TItem extends StepsItemProps = StepsItemProps>(
	item: TItem,
	useFinish = false
): StepsItemInject<TItem> | undefined =>
	(useFinish && item.finishStep?.injComponent ? item.finishStep.injComponent : item.step?.injComponent) as
		| StepsItemInject<TItem>
		| undefined;

// 输入单个 Steps 项状态，返回框架无关的内容选择结果。
// Convert one Steps item state into framework-agnostic content selection results.
export const resolveStepsItemDerived = <TItem extends StepsItemProps = StepsItemProps>({
	item,
	index,
	current
}: ResolveStepsItemDerivedOptions<TItem>): StepsItemDerived<TItem> => {
	const completed = resolveStepsCompleted(index, current);
	const hasBar = resolveStepsHasBar(item);

	return {
		completed,
		current: resolveStepsCurrent(index, current),
		hasBar,
		bar: resolveStepsBar(item, completed),
		title: resolveStepsTitle(item, completed),
		desc: resolveStepsDesc(item, completed),
		inject: resolveStepsInject(item, completed)
	};
};

// 输入 Steps 列表状态，返回框架无关的每项派生结果。
// Receive Steps list state and return framework-agnostic derived results for each item.
export const resolveStepsItemsDerived = <TItem extends StepsItemProps = StepsItemProps>({
	steps,
	current
}: ResolveStepsItemsDerivedOptions<TItem>): StepsItemDerived<TItem>[] =>
	steps.map((item, index) => resolveStepsItemDerived({ item, index, current }));

// 输入 Steps 列表状态，返回组件层可直接渲染的框架无关视图列表。
// Receive Steps list state and return a framework-agnostic view list for component rendering.
export const resolveStepsItemViewStateList = <TItem extends StepsItemProps = StepsItemProps>({
	steps,
	current
}: ResolveStepsItemsDerivedOptions<TItem>): StepsItemViewState<TItem>[] =>
	steps.map((item, index) => {
		const itemState = resolveStepsItemDerived({ item, index, current });
		return {
			barContentState: resolveStepsBarContentState(itemState.bar),
			index,
			item,
			itemState
		};
	});

// 输入组件层测得的容器节点，返回 Steps 可复用的安全宽度。
// Normalize a component-measured container node into a reusable Steps safe width.
export const resolveStepsMeasuredClientWidth = (node?: StepsMeasuredClientWidthLike): number => node?.clientWidth ?? 0;

// 输入组件层测得的项节点列表，返回 Steps 可复用的安全高度列表。
// Normalize component-measured item nodes into reusable Steps safe heights.
export const resolveStepsMeasuredClientHeights = (nodes: readonly StepsMeasuredClientHeightLike[] = []): number[] =>
	nodes.map((node) => node?.clientHeight ?? 0);

export const resolveStepsBarWrapperClass = ({ hasBar, vertical = false }: { hasBar?: boolean; vertical?: boolean }) =>
	vertical ? (hasBar ? 'my-4 mr-10 pl-4' : 'mr-6 pl-4') : hasBar ? 'relative w-full pb-8' : 'relative w-full py-2';

// 输入 Steps 方向状态，返回框架无关的布局 class，DOM 测量仍由组件层完成。
// Resolve Steps direction state into framework-agnostic layout classes; DOM measurement stays in the component layer.
export const resolveStepsLineAxisClass = (vertical = false) => (vertical ? 'w-0.5' : 'h-0.5');

export const resolveStepsLinePositionedClass = ({ finished, vertical = false }: { finished: boolean; vertical?: boolean }) =>
	resolveStepsLineClass(finished).replace('absolute', vertical ? 'absolute' : 'relative');

// 输入 Steps 连线状态，返回框架无关的完整连线 class。
// Receive Steps line state and return a framework-agnostic complete line class.
export const resolveStepsItemLineClass = ({
	finished,
	hasBar = false,
	index = 0,
	total = 0,
	vertical = false
}: ResolveStepsItemLineClassOptions) =>
	joinClasses([
		resolveStepsLineAxisClass(vertical),
		resolveStepsLinePositionedClass({ finished, vertical }),
		!vertical && !hasBar && index === total - 1 ? 'w-px' : ''
	]);

export const resolveStepsContentClass = (vertical = false) => (vertical ? 'pr-4' : 'text-center');

export const resolveStepsVerticalRootClass = () => 'flex flex-col justify-between';

export const resolveStepsHorizontalRootClass = () => 'relative mt-4 flex justify-between';

export const resolveStepsVerticalItemClass = () => 'relative flex items-center py-3';

export const resolveStepsHorizontalItemClass = () => 'flex flex-1 flex-col items-center space-y-2';

export const resolveStepsBarIconClass = () => 'm-auto h-4 w-4';

export const resolveStepsBarImageClass = () => 'object-cover';

export const resolveStepsBarTextClass = () => 'm-auto mt-1 h-5 w-5 text-center text-sm leading-5';

// 输入组件层测量后的高度列表，返回是否需要更新；DOM 测量留在组件层。
// Receive heights measured by the component layer and return whether state should update; DOM measurement stays in the component layer.
export const resolveStepsMeasuredHeightsState = ({
	currentHeights,
	nextHeights
}: ResolveStepsMeasuredHeightsStateOptions): StepsMeasuredHeightsState => {
	const shouldUpdate =
		currentHeights.length !== nextHeights.length || nextHeights.some((height, index) => height !== currentHeights[index]);
	return {
		shouldUpdate,
		heights: shouldUpdate ? [...nextHeights] : currentHeights
	};
};

// 输入组件层测量到的单项高度，返回按索引更新后的高度列表。
// Receive one height measured by the component layer and return the height list updated by index.
export const resolveStepsMeasuredHeightItemState = ({
	currentHeights,
	height,
	index
}: ResolveStepsMeasuredHeightItemStateOptions): StepsMeasuredHeightsState => {
	if (currentHeights[index] === height) {
		return {
			shouldUpdate: false,
			heights: currentHeights
		};
	}

	const nextHeights = [...currentHeights];
	nextHeights[index] = height;
	return {
		shouldUpdate: true,
		heights: nextHeights
	};
};

// 输入组件层测量到的宽度，返回是否需要同步到组件状态。
// Receive width measured by the component layer and return whether component state should sync.
export const resolveStepsMeasuredWidthState = ({
	currentWidth,
	measuredWidth
}: ResolveStepsMeasuredWidthStateOptions): StepsMeasuredWidthState => ({
	shouldUpdate: currentWidth !== measuredWidth,
	width: measuredWidth
});

export const resolveStepsLineStyleValue = ({
	hasBar = false,
	height = 0,
	index,
	total,
	vertical = false,
	width = 0
}: {
	hasBar?: boolean;
	height?: number;
	index: number;
	total: number;
	vertical?: boolean;
	width?: number;
}): StepsStyleValue => {
	if (vertical) {
		return {
			height: index === total - 1 ? '0px' : `${height - (hasBar ? 30 : 10)}px`,
			top: hasBar ? '42px' : '26px',
			left: hasBar ? '30px' : '20px'
		};
	}
	return {
		width: index === total - 1 ? '0' : `${width / total - (hasBar ? 30 : 9)}px`,
		top: hasBar ? '16px' : '0px',
		left: `calc(50% + ${hasBar ? '15' : '5'}px)`
	};
};

export const resolveStepsIconBoxStyleValue = (vertical = false): StepsStyleValue =>
	vertical ? { top: '12px', height: '30px', width: '30px' } : { left: 'calc(50% - 15px)', height: '30px', width: '30px' };

export const resolveStepsDotStyleValue = (vertical = false): StepsStyleValue =>
	vertical ? { top: '16px' } : { left: 'calc(50% - 5px)', top: '4px' };

export const resolveStepsStyleString = (style: StepsStyleValue) =>
	Object.entries(style)
		.map(([key, value]) => `${key}:${value}`)
		.join(';');

export const resolveStepsLineStyleString = (options: Parameters<typeof resolveStepsLineStyleValue>[0]) =>
	resolveStepsStyleString(resolveStepsLineStyleValue(options));

// 输入 Steps 单项状态和测量尺寸，返回组件层可直接绑定的连线样式。
// Resolve one Steps item state and measured size into line styles for component binding.
export const resolveStepsItemLineStyleValue = ({
	item,
	index,
	current,
	total,
	vertical = false,
	height = 0,
	width = 0
}: ResolveStepsItemLineStyleOptions): StepsStyleValue => {
	const itemState = resolveStepsItemDerived({ item, index, current });
	return resolveStepsLineStyleValue({ hasBar: itemState.hasBar, height, index, total, vertical, width });
};

export const resolveStepsItemLineStyleString = (options: ResolveStepsItemLineStyleOptions) =>
	resolveStepsStyleString(resolveStepsItemLineStyleValue(options));

export const resolveStepsIconBoxStyleString = (vertical = false) => resolveStepsStyleString(resolveStepsIconBoxStyleValue(vertical));

export const resolveStepsDotStyleString = (vertical = false) => resolveStepsStyleString(resolveStepsDotStyleValue(vertical));

// 输入组件 props 和测量值，返回框架无关的 Steps 派生入参。
// Receive component props and measured values, then return framework-agnostic Steps derivation options.
export const resolveStepsStateOptions = <TItem extends StepsItemProps = StepsItemProps>({
	heightList,
	props,
	width
}: ResolveStepsStateOptionsParams<TItem>): ResolveStepsDerivedOptions<TItem> => ({
	barBorder: props.barBorder,
	current: props.current,
	heightList,
	radius: props.radius,
	steps: props.steps,
	vertical: props.vertical,
	width
});

// 输入 Steps 属性和组件层测量值，返回框架无关的每项渲染派生结果。
// Receive Steps props and measured values from the component layer, then return framework-agnostic render state for each item.
export const resolveStepsDerived = <TItem extends StepsItemProps = StepsItemProps>({
	steps = [],
	current = 1,
	radius = '',
	barBorder = true,
	vertical = false,
	width = 0,
	heightList = []
}: ResolveStepsDerivedOptions<TItem> = {}): StepsDerived<TItem> => {
	const radiusClass = resolveStepsRadiusClass(radius);
	const total = steps.length;

	return {
		horizontalRootClass: resolveStepsHorizontalRootClass(),
		radiusClass,
		items: resolveStepsItemViewStateList({ steps, current }).map((itemViewState) => {
			const { item, index, itemState } = itemViewState;
			const lineStyle = resolveStepsItemLineStyleValue({
				item,
				index,
				current,
				height: heightList[index] || 0,
				total,
				vertical,
				width
			});
			const barStyle = itemState.hasBar ? resolveStepsIconBoxStyleValue(vertical) : resolveStepsDotStyleValue(vertical);

			return {
				...itemViewState,
				barIconClass: resolveStepsBarIconClass(),
				barImageClass: resolveStepsBarImageClass(),
				barTextClass: resolveStepsBarTextClass(),
				barWrapperClass: resolveStepsBarWrapperClass({ hasBar: itemState.hasBar, vertical }),
				lineClass: resolveStepsItemLineClass({ finished: itemState.completed, hasBar: itemState.hasBar, index, total, vertical }),
				lineStyle,
				lineStyleString: resolveStepsStyleString(lineStyle),
				barClass: itemState.hasBar
					? resolveStepsBarClass({ index, current, radiusClass, barBorder, hasText: true, large: true })
					: resolveStepsBarClass({ index, current, radiusClass }),
				barStyle,
				barStyleString: resolveStepsStyleString(barStyle),
				contentClass: resolveStepsContentClass(vertical),
				horizontalItemClass: resolveStepsHorizontalItemClass(),
				verticalItemClass: resolveStepsVerticalItemClass(),
				titleClass: resolveStepsTitleClass({ index, current, horizontal: !vertical }),
				descClass: resolveStepsDescClass({ index, current })
			};
		}),
		verticalRootClass: resolveStepsVerticalRootClass()
	};
};
