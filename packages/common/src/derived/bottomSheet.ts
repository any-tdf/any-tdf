import { radiusObj, textAlignObj } from './common.js';

export const bottomSheetWindowRadiusClass = {
	none: ' rounded-t-none',
	sm: ' rounded-t-sm',
	md: ' rounded-t-md',
	lg: ' rounded-t-lg',
	xl: ' rounded-t-xl',
	'2xl': ' rounded-t-2xl',
	'3xl': ' rounded-t-3xl',
	'4xl': ' rounded-t-4xl',
	full: ' rounded-t-full',
	'': ' rounded-t-(--radius-box)'
} as const;

const defaultStayHeightList = [10, 50, 90] as const;
export const bottomSheetDefaultScrollTopHeight = 5;

export type BottomSheetRadius = keyof typeof bottomSheetWindowRadiusClass | string;
export type BottomSheetIconRadius = keyof typeof radiusObj | string;
export type BottomSheetTitleAlign = keyof typeof textAlignObj | string;
export type BottomSheetCloseContentKind = 'closeIcon' | 'downIcon' | 'text' | 'none';
export type BottomSheetTextDefaults = {
	title: string;
};

export type BottomSheetValidationState = {
	invalidStayHeightList: boolean;
	nonAscendingStayHeightList: boolean;
	stayHeightIndexOutOfRange: boolean;
	closeHeightTooLarge: boolean;
};

export type BottomSheetNearestTopState = {
	top: number;
	index: number;
	height: number;
};

export type ResolveBottomSheetRenderStateOptions = {
	visible?: boolean;
	outDuration?: number;
	currentRender?: boolean;
};

export type ResolveBottomSheetVisibleChangeActionOptions = {
	baseStartTop?: number;
	moveDistance?: number;
	outDuration?: number;
	shouldRender?: boolean;
	startTop?: number;
	visible?: boolean;
	wasVisible?: boolean;
};

export type BottomSheetVisibleChangeActionKind = 'open' | 'closeAnimate' | 'closedIdle';

export type BottomSheetVisibleChangeAction = {
	kind: BottomSheetVisibleChangeActionKind;
	nextIsClosing: boolean;
	nextIsTouch: boolean;
	nextMoveDistance: number;
	nextShouldRender: boolean;
	nextStartTop: number | undefined;
	renderEndDelayMs: number;
	shouldApplyState: boolean;
	shouldRunInAnimation: boolean;
	shouldRunOutAnimation: boolean;
	shouldScheduleRenderEnd: boolean;
};

export type BottomSheetRenderEndAction = {
	nextIsClosing: false;
	nextShouldRender: false;
};

export type ResolveBottomSheetCloseActionOptions = {
	emitClose?: boolean;
	shouldClose?: boolean;
	visible?: boolean;
};

export type BottomSheetCloseAction = {
	nextVisible: false;
	shouldClose: boolean;
	shouldEmitClose: boolean;
};

export type ResolveBottomSheetMaskClickActionOptions = {
	maskClosable?: boolean;
};

export type BottomSheetMaskClickAction = {
	shouldClose: boolean;
};

export type ResolveBottomSheetMaskClickFlowOptions = ResolveBottomSheetMaskClickActionOptions & ResolveBottomSheetCloseActionOptions;

export type BottomSheetMaskClickFlow = BottomSheetMaskClickAction & {
	closeAction: BottomSheetCloseAction;
};

export type ResolveBottomSheetCloseContentStateOptions = {
	closeContent?: string;
};

export type BottomSheetCloseContentState = {
	ariaLabel?: 'close';
	kind: BottomSheetCloseContentKind;
	shouldRender: boolean;
	text?: string;
};

export type BottomSheetLayerStyleValue = {
	zIndex: string | number;
};

export type BottomSheetPanelStyleValue = {
	height: string;
	top: string;
};

export type BottomSheetContentStyleValue = {
	height: string;
	overscrollBehaviorY: 'contain';
};

export type BottomSheetTransitionParams = {
	duration: number;
	opacity: number;
	y: number;
};

export type ResolveBottomSheetDerivedOptions = {
	closeContent?: string;
	closeHeight?: number;
	currentRender?: boolean;
	duration?: number;
	iconRadius?: BottomSheetIconRadius;
	isTouch?: boolean;
	moveDistance?: number;
	outDuration?: number;
	radius?: BottomSheetRadius;
	scrollTopHeight?: number;
	startTop?: number;
	stayHeightIndex?: number;
	stayHeightList?: readonly number[];
	title?: string;
	titleAlign?: BottomSheetTitleAlign;
	viewportHeight?: number;
	visible?: boolean;
	zIndex?: string | number;
	defaults: BottomSheetTextDefaults;
};
export type BottomSheetStatePropsLike = Partial<
	Omit<
		ResolveBottomSheetDerivedOptions,
		'currentRender' | 'defaults' | 'isTouch' | 'moveDistance' | 'scrollTopHeight' | 'startTop' | 'viewportHeight' | 'visible'
	>
>;
export type ResolveBottomSheetStateOptionsParams = {
	currentRender?: boolean;
	defaults: BottomSheetTextDefaults;
	isTouch?: boolean;
	moveDistance?: number;
	props: BottomSheetStatePropsLike;
	scrollTopHeight?: number;
	startTop?: number;
	viewportHeight?: number;
	visible?: boolean;
};
export type BottomSheetMeasuredScrollTopHeightLike =
	| {
			clientHeight?: number | null;
	  }
	| null
	| undefined;

export type BottomSheetDerived = {
	baseStartTop: number;
	closeContentState: BottomSheetCloseContentState;
	contentHeight: number;
	contentScrollClass: string;
	contentStyleString: string;
	contentStyleValue: BottomSheetContentStyleValue;
	currentTop: number;
	closeTextButtonClass: string;
	dividerClass: string;
	dragHandleClass: string;
	dragIndicatorClass: string;
	finalTitle: string;
	headerRowClass: string;
	headerTitleClass: string;
	iconButtonClass: string;
	iconRadiusClass: string;
	iconSvgClass: string;
	inParams: BottomSheetTransitionParams;
	layerClass: string;
	layerStyleString: string;
	layerStyleValue: BottomSheetLayerStyleValue;
	maxHeight: number;
	outParams: BottomSheetTransitionParams;
	panelClass: string;
	panelStyleString: string;
	panelStyleValue: BottomSheetPanelStyleValue;
	resolvedStayHeightList: number[];
	shouldRender: boolean;
	startTop: number;
	stayHeight: number;
	titleAlignClass: string;
	transitionDistance: number;
	validationState: BottomSheetValidationState;
	windowRadiusClass: string;
};

// 输入组件 props、拖拽状态、渲染状态和环境数值，返回 BottomSheet 派生层统一入参。
// Receive component props, drag state, render state and environment values, then return normalized BottomSheet derivation options.
export const resolveBottomSheetStateOptions = ({
	currentRender,
	defaults,
	isTouch,
	moveDistance,
	props,
	scrollTopHeight,
	startTop,
	viewportHeight,
	visible
}: ResolveBottomSheetStateOptionsParams): ResolveBottomSheetDerivedOptions => ({
	closeContent: props.closeContent,
	closeHeight: props.closeHeight,
	currentRender,
	duration: props.duration,
	iconRadius: props.iconRadius,
	isTouch,
	moveDistance,
	outDuration: props.outDuration,
	radius: props.radius,
	scrollTopHeight,
	startTop,
	stayHeightIndex: props.stayHeightIndex,
	stayHeightList: props.stayHeightList,
	title: props.title,
	titleAlign: props.titleAlign,
	viewportHeight,
	visible,
	zIndex: props.zIndex,
	defaults
});

export type ResolveBottomSheetTouchStartActionOptions = {
	clientY: number;
	currentTop: number;
};

export type BottomSheetTouchStartAction = {
	currentY: number;
	isTouch: true;
	moveDistance: 0;
	startTop: number;
	startY: number;
};

export type ResolveBottomSheetTouchEndActionOptions = {
	closeHeight: number;
	currentTop: number;
	currentY: number;
	stayHeightList: readonly number[];
	viewportHeight: number;
};

export type BottomSheetTouchEndAction = {
	height: number;
	isTouch: false;
	moveDistance: 0;
	shouldClose: boolean;
	startTop: number;
};

export type ResolveBottomSheetTouchEndFlowOptions = ResolveBottomSheetTouchEndActionOptions & ResolveBottomSheetCloseActionOptions;

export type BottomSheetTouchEndFlow = BottomSheetTouchEndAction & {
	closeAction: BottomSheetCloseAction;
};

export type BottomSheetTouchCancelAction = {
	isTouch: false;
};

// 输入外部可见值，返回组件内部初始可见状态。
// Normalize an external visible value into the component's initial internal visibility state.
export const resolveBottomSheetInitialVisible = (visible?: boolean): boolean => Boolean(visible);

// 输入组件标题 prop 和默认标题，返回框架无关的最终标题。
// Consume the component title prop and default title, then return a framework-agnostic final title.
export const resolveBottomSheetTitle = (title: string | undefined, defaults: BottomSheetTextDefaults): string => title ?? defaults.title;

// 输入 BottomSheet 关闭内容状态，返回框架无关的展示分支。
// Resolve BottomSheet close content state into a framework-agnostic display branch.
export const resolveBottomSheetCloseContentState = ({
	closeContent = 'downIcon'
}: ResolveBottomSheetCloseContentStateOptions = {}): BottomSheetCloseContentState => {
	if (closeContent === '') return { kind: 'none', shouldRender: false };
	if (closeContent === 'closeIcon') return { ariaLabel: 'close', kind: 'closeIcon', shouldRender: true };
	if (closeContent === 'downIcon') return { ariaLabel: 'close', kind: 'downIcon', shouldRender: true };
	return { kind: 'text', shouldRender: true, text: closeContent };
};

// 输入 BottomSheet 组件状态，返回框架无关的高度、class 和滑动派生结果。
// Convert BottomSheet component state into framework-agnostic height, class and drag derivations.
export const resolveBottomSheetStayHeightList = (stayHeightList?: readonly number[]) => {
	if (Array.isArray(stayHeightList) && stayHeightList.length > 0) {
		return [...stayHeightList];
	}

	return [...defaultStayHeightList];
};

export const resolveBottomSheetStayHeight = (stayHeightList: readonly number[], stayHeightIndex: number) =>
	stayHeightList[stayHeightIndex] ?? stayHeightList[stayHeightList.length - 1] ?? 0;

export const resolveBottomSheetMaxHeight = (stayHeightList: readonly number[]) => stayHeightList[stayHeightList.length - 1] ?? 0;

export const resolveBottomSheetStartTop = (stayHeight: number) => 100 - stayHeight;

export const resolveBottomSheetCurrentTop = (startTop: number, moveDistance: number) => startTop + moveDistance;

// 滑动距离只做数字换算和边界限制，事件读取与 DOM 操作留在组件内。
// Drag distance only converts numbers and clamps bounds; event reading and DOM work stay in the component.
export const resolveBottomSheetMoveDistance = ({
	currentY,
	startY,
	viewportHeight,
	startTop,
	maxHeight
}: {
	currentY: number;
	startY: number;
	viewportHeight: number;
	startTop: number;
	maxHeight: number;
}) => {
	if (viewportHeight <= 0) return 0;

	const nextDistance = ((currentY - startY) / viewportHeight) * 100;
	const minTop = 100 - maxHeight;

	if (nextDistance + startTop < minTop) {
		return minTop - startTop;
	}

	return nextDistance;
};

export const resolveBottomSheetTopList = (stayHeightList: readonly number[]) => stayHeightList.map((item) => 100 - item);

export const resolveBottomSheetNearestTopState = ({
	stayHeightList,
	currentTop
}: {
	stayHeightList: readonly number[];
	currentTop: number;
}): BottomSheetNearestTopState => {
	const topList = resolveBottomSheetTopList(stayHeightList);
	let minDiff = 100;
	let currentIndex = 0;

	topList.forEach((item, index) => {
		const diff = Math.abs(item - currentTop);
		if (diff < minDiff) {
			minDiff = diff;
			currentIndex = index;
		}
	});

	return {
		top: topList[currentIndex] ?? 0,
		index: currentIndex,
		height: stayHeightList[currentIndex] ?? 0
	};
};

export const resolveBottomSheetShouldClose = ({
	currentY,
	viewportHeight,
	closeHeight
}: {
	currentY: number;
	viewportHeight: number;
	closeHeight: number;
}) => {
	if (viewportHeight <= 0 || closeHeight <= 0) return false;

	return ((viewportHeight - currentY) / viewportHeight) * 100 < closeHeight;
};

// 输入拖拽开始位置，返回组件层可写入的无副作用状态。
// Receive the drag-start position and return side-effect-free state for the component layer.
export const resolveBottomSheetTouchStartAction = ({
	clientY,
	currentTop
}: ResolveBottomSheetTouchStartActionOptions): BottomSheetTouchStartAction => ({
	currentY: clientY,
	isTouch: true,
	moveDistance: 0,
	startTop: currentTop,
	startY: clientY
});

// 输入拖拽结束状态，返回吸附高度和关闭决策；事件派发留在组件层。
// Receive drag-end state and return snapped height plus close decision; event emits stay in the component layer.
export const resolveBottomSheetTouchEndAction = ({
	closeHeight,
	currentTop,
	currentY,
	stayHeightList,
	viewportHeight
}: ResolveBottomSheetTouchEndActionOptions): BottomSheetTouchEndAction => {
	const nearestTopState = resolveBottomSheetNearestTopState({ stayHeightList, currentTop });
	return {
		height: nearestTopState.height,
		isTouch: false,
		moveDistance: 0,
		shouldClose: resolveBottomSheetShouldClose({ currentY, viewportHeight, closeHeight }),
		startTop: nearestTopState.top
	};
};

// 输入拖拽结束状态，返回吸附结果和对应关闭动作，不派发事件。
// Receive drag-end state and return the snap result plus close action without emitting events.
export const resolveBottomSheetTouchEndFlow = ({
	emitClose = true,
	visible = true,
	...options
}: ResolveBottomSheetTouchEndFlowOptions): BottomSheetTouchEndFlow => {
	const action = resolveBottomSheetTouchEndAction(options);
	return {
		...action,
		closeAction: resolveBottomSheetCloseAction({ emitClose, visible, shouldClose: action.shouldClose })
	};
};

// 输入 BottomSheet 拖拽取消信号，返回组件层可写入的触摸复位状态。
// Receive a BottomSheet drag-cancel signal and return touch reset state for the component layer.
export const resolveBottomSheetTouchCancelAction = (): BottomSheetTouchCancelAction => ({
	isTouch: false
});

export const resolveBottomSheetContentHeight = ({
	viewportHeight,
	currentTop,
	scrollTopHeight
}: {
	viewportHeight: number;
	currentTop: number;
	scrollTopHeight: number;
}) => Math.max(0, viewportHeight * ((100 - currentTop) / 100) - scrollTopHeight);

export const resolveBottomSheetTransitionDistance = ({ maxHeight, viewportHeight }: { maxHeight: number; viewportHeight: number }) =>
	(maxHeight / 100) * viewportHeight;

// 输入面板过渡距离和时长，返回组件层可直接绑定的入场参数。
// Convert panel transition distance and duration into bind-ready intro params.
export const resolveBottomSheetInParams = ({
	transitionDistance,
	duration
}: {
	transitionDistance: number;
	duration: number;
}): BottomSheetTransitionParams => ({
	y: transitionDistance,
	opacity: 1,
	duration
});

// 输入面板过渡距离和出场时长，返回组件层可直接绑定的出场参数。
// Convert panel transition distance and outro duration into bind-ready outro params.
export const resolveBottomSheetOutParams = ({
	transitionDistance,
	outDuration
}: {
	transitionDistance: number;
	outDuration: number;
}): BottomSheetTransitionParams => ({
	y: transitionDistance,
	opacity: 1,
	duration: outDuration
});

export const resolveBottomSheetWindowRadiusClass = (radius: BottomSheetRadius = '') =>
	radius
		? bottomSheetWindowRadiusClass[radius as keyof typeof bottomSheetWindowRadiusClass] || 'rounded-t-(--radius-box)'
		: 'rounded-t-(--radius-box)';

export const resolveBottomSheetIconRadiusClass = (iconRadius: BottomSheetIconRadius = '') =>
	iconRadius ? radiusObj[iconRadius as keyof typeof radiusObj] : 'rounded-(--radius-small)';

export const resolveBottomSheetTitleAlignClass = (titleAlign: BottomSheetTitleAlign = 'left') =>
	textAlignObj[titleAlign as keyof typeof textAlignObj] || textAlignObj.left;

export const resolveBottomSheetPanelClass = ({ windowRadiusClass, isTouch }: { windowRadiusClass: string; isTouch: boolean }) =>
	[
		'fixed w-screen bg-bg-overlay dark:bg-bg-overlay-dark',
		windowRadiusClass,
		'pointer-events-auto',
		isTouch ? '' : 'transition-all duration-300'
	]
		.filter(Boolean)
		.join(' ');

// 输入 BottomSheet 结构状态，返回组件实现可复用的框架无关 class。
// Receive BottomSheet structure state and return framework-agnostic classes for component implementations.
export const resolveBottomSheetLayerClass = () => 'pointer-events-none fixed inset-0 flex h-screen w-screen flex-col justify-end px-0';

export const resolveBottomSheetDragHandleClass = () => 'cursor-move touch-none select-none py-1';

export const resolveBottomSheetDragIndicatorClass = () => 'mx-auto h-1 w-8 rounded-full bg-black/20 dark:bg-white/30';

export const resolveBottomSheetHeaderRowClass = () => 'flex items-center justify-between gap-2 px-3 py-1';

export const resolveBottomSheetCloseTextButtonClass = () => 'cursor-pointer font-bold text-primary dark:text-dark';

export const resolveBottomSheetDividerClass = () => 'h-px w-full bg-black/5 dark:bg-white/10';

export const resolveBottomSheetContentScrollClass = () => 'overflow-auto';

export const resolveBottomSheetIconSvgClass = () => 'mx-auto block opacity-40';

// 输入 BottomSheet 层级，返回组件层可直接绑定的外层样式。
// Convert BottomSheet z-index into bind-ready layer styles for the component layer.
export const resolveBottomSheetLayerStyleValue = (zIndex: string | number = 600): BottomSheetLayerStyleValue => ({
	zIndex
});

export const resolveBottomSheetLayerStyleString = (zIndex: string | number = 600) => `z-index:${zIndex};`;

// 输入 BottomSheet 面板高度和顶部位置，返回组件层可直接绑定的面板样式。
// Convert BottomSheet panel metrics into bind-ready panel styles for the component layer.
export const resolveBottomSheetPanelStyleValue = ({
	maxHeight = 0,
	currentTop = 0
}: { maxHeight?: number; currentTop?: number } = {}): BottomSheetPanelStyleValue => ({
	height: `${maxHeight}%`,
	top: `${currentTop}%`
});

export const resolveBottomSheetPanelStyleString = ({ maxHeight = 0, currentTop = 0 }: { maxHeight?: number; currentTop?: number } = {}) =>
	`height:${maxHeight}%;top:${currentTop}%`;

// 输入 BottomSheet 内容高度，返回组件层可直接绑定的内容滚动样式。
// Convert BottomSheet content height into bind-ready scroll content styles.
export const resolveBottomSheetContentStyleValue = (contentHeight = 0): BottomSheetContentStyleValue => ({
	height: `${contentHeight}px`,
	overscrollBehaviorY: 'contain'
});

export const resolveBottomSheetContentStyleString = (contentHeight = 0) => `height:${contentHeight}px;overscroll-behavior-y: contain;`;

export const resolveBottomSheetIconButtonClass = (iconRadiusClass: string) =>
	['h-6 w-6 flex-none bg-black/5 dark:bg-white/10 text-center', iconRadiusClass].filter(Boolean).join(' ');

export const resolveBottomSheetHeaderTitleClass = (titleAlignClass: string) =>
	['h-7 truncate text-lg font-bold grow', titleAlignClass].filter(Boolean).join(' ');

export const resolveBottomSheetValidationState = ({
	stayHeightList,
	stayHeightIndex,
	closeHeight
}: {
	stayHeightList?: readonly number[];
	stayHeightIndex: number;
	closeHeight: number;
}): BottomSheetValidationState => {
	// 未传入时使用默认停靠高度，显式非法输入仍保留校验信号。
	// Use default snap heights when omitted, while preserving validation signals for explicit invalid input.
	const list = Array.isArray(stayHeightList) ? stayHeightList : defaultStayHeightList;
	const invalidStayHeightList =
		stayHeightList !== undefined &&
		(!Array.isArray(stayHeightList) ||
			list.length === 0 ||
			list.some((item) => typeof item !== 'number' || item < 0 || item > 100 || item % 1 !== 0));

	return {
		invalidStayHeightList,
		nonAscendingStayHeightList: list.some((item, index) => index > 0 && item <= list[index - 1]),
		stayHeightIndexOutOfRange: stayHeightIndex > list.length - 1,
		closeHeightTooLarge: closeHeight > (list[0] ?? 0)
	};
};

// 输入可见状态和出场时长，返回组件层是否保留渲染节点。
// Resolve visibility and outro duration into whether the component layer should keep the node rendered.
export const resolveBottomSheetRenderState = ({
	visible = false,
	outDuration = 240,
	currentRender = false
}: ResolveBottomSheetRenderStateOptions = {}): boolean => {
	if (visible) return true;
	if (outDuration <= 0) return false;
	return currentRender;
};

// 输入动作里的起始位置，返回组件层后续数值计算可直接使用的 top。
// Normalize action start top into a numeric top that component logic can reuse.
export const resolveBottomSheetActionStartTop = (nextStartTop?: number): number => nextStartTop ?? 0;

// 输入组件层测量到的拖拽头节点，返回内容高度计算可使用的高度。
// Normalize a component-measured drag header node into the height used by content calculations.
export const resolveBottomSheetMeasuredScrollTopHeight = (
	node?: BottomSheetMeasuredScrollTopHeightLike,
	fallback = bottomSheetDefaultScrollTopHeight
): number => node?.clientHeight || fallback;

// 输入可见性变化和拖拽快照，返回组件层可执行的渲染生命周期动作。
// Receive visibility changes and drag snapshots, then return render lifecycle actions for the component layer.
export const resolveBottomSheetVisibleChangeAction = ({
	baseStartTop = 0,
	moveDistance = 0,
	outDuration = 240,
	shouldRender = false,
	startTop,
	visible = false,
	wasVisible = false
}: ResolveBottomSheetVisibleChangeActionOptions = {}): BottomSheetVisibleChangeAction => {
	if (visible) {
		return {
			kind: 'open',
			nextIsClosing: false,
			nextIsTouch: false,
			nextMoveDistance: 0,
			nextShouldRender: resolveBottomSheetRenderState({ visible: true, outDuration, currentRender: shouldRender }),
			nextStartTop: baseStartTop,
			renderEndDelayMs: outDuration,
			shouldApplyState: true,
			shouldRunInAnimation: !wasVisible,
			shouldRunOutAnimation: false,
			shouldScheduleRenderEnd: false
		};
	}

	if (!shouldRender || !wasVisible) {
		return {
			kind: 'closedIdle',
			nextIsClosing: false,
			nextIsTouch: false,
			nextMoveDistance: moveDistance,
			nextShouldRender: shouldRender,
			nextStartTop: startTop,
			renderEndDelayMs: outDuration,
			shouldApplyState: false,
			shouldRunInAnimation: false,
			shouldRunOutAnimation: false,
			shouldScheduleRenderEnd: false
		};
	}

	return {
		kind: 'closeAnimate',
		nextIsClosing: true,
		nextIsTouch: false,
		nextMoveDistance: 0,
		nextShouldRender: resolveBottomSheetRenderState({ visible: false, outDuration, currentRender: shouldRender }),
		nextStartTop: (startTop ?? baseStartTop) + moveDistance,
		renderEndDelayMs: outDuration,
		shouldApplyState: true,
		shouldRunInAnimation: false,
		shouldRunOutAnimation: true,
		shouldScheduleRenderEnd: outDuration > 0
	};
};

// 输入出场动画完成信号，返回组件层可写入的渲染结束状态。
// Receive outro completion and return the render-end state for the component layer.
export const resolveBottomSheetRenderEndAction = (): BottomSheetRenderEndAction => ({
	nextIsClosing: false,
	nextShouldRender: false
});

// 输入 BottomSheet 当前可见状态，返回组件层可写入的关闭动作。
// Receive the current BottomSheet visibility and return a close action for the component layer.
export const resolveBottomSheetCloseAction = ({
	emitClose = true,
	shouldClose = true,
	visible = true
}: ResolveBottomSheetCloseActionOptions = {}): BottomSheetCloseAction => {
	const nextShouldClose = Boolean(visible && shouldClose);

	return {
		nextVisible: false,
		shouldClose: nextShouldClose,
		shouldEmitClose: nextShouldClose && emitClose
	};
};

// 输入 BottomSheet 遮罩点击状态，返回组件层需要执行的关闭决策。
// Resolve BottomSheet mask click state into the close decision for the component layer.
export const resolveBottomSheetMaskClickAction = ({
	maskClosable = false
}: ResolveBottomSheetMaskClickActionOptions = {}): BottomSheetMaskClickAction => ({
	shouldClose: maskClosable
});

// 输入遮罩点击状态，返回遮罩决策和对应关闭动作，不派发事件。
// Receive mask-click state and return the mask decision plus close action without emitting events.
export const resolveBottomSheetMaskClickFlow = ({
	emitClose = true,
	maskClosable = false,
	visible = true
}: ResolveBottomSheetMaskClickFlowOptions = {}): BottomSheetMaskClickFlow => {
	const action = resolveBottomSheetMaskClickAction({ maskClosable });
	return {
		...action,
		closeAction: resolveBottomSheetCloseAction({ emitClose, visible, shouldClose: action.shouldClose })
	};
};

// 输入 BottomSheet props 和组件层状态，返回框架无关的渲染派生结果。
// Receive BottomSheet props and component-layer state, then return framework-agnostic render derivation.
export const resolveBottomSheetDerived = ({
	closeContent = 'downIcon',
	closeHeight = 0,
	currentRender = false,
	duration = 450,
	iconRadius = '',
	isTouch = false,
	moveDistance = 0,
	outDuration = 240,
	radius = '',
	scrollTopHeight = bottomSheetDefaultScrollTopHeight,
	startTop: startTopOption,
	stayHeightIndex = 1,
	stayHeightList,
	title,
	titleAlign = 'left',
	viewportHeight = 0,
	visible = false,
	zIndex = 600,
	defaults
}: ResolveBottomSheetDerivedOptions): BottomSheetDerived => {
	const resolvedStayHeightList = resolveBottomSheetStayHeightList(stayHeightList);
	const stayHeight = resolveBottomSheetStayHeight(resolvedStayHeightList, stayHeightIndex);
	const maxHeight = resolveBottomSheetMaxHeight(resolvedStayHeightList);
	const baseStartTop = resolveBottomSheetStartTop(stayHeight);
	const startTop = startTopOption ?? baseStartTop;
	const currentTop = resolveBottomSheetCurrentTop(startTop, moveDistance);
	const windowRadiusClass = resolveBottomSheetWindowRadiusClass(radius);
	const iconRadiusClass = resolveBottomSheetIconRadiusClass(iconRadius);
	const titleAlignClass = resolveBottomSheetTitleAlignClass(titleAlign);
	const contentHeight = resolveBottomSheetContentHeight({ viewportHeight, currentTop, scrollTopHeight });
	const transitionDistance = resolveBottomSheetTransitionDistance({ maxHeight, viewportHeight });

	return {
		baseStartTop,
		closeTextButtonClass: resolveBottomSheetCloseTextButtonClass(),
		closeContentState: resolveBottomSheetCloseContentState({ closeContent }),
		contentHeight,
		contentScrollClass: resolveBottomSheetContentScrollClass(),
		contentStyleString: resolveBottomSheetContentStyleString(contentHeight),
		contentStyleValue: resolveBottomSheetContentStyleValue(contentHeight),
		currentTop,
		dividerClass: resolveBottomSheetDividerClass(),
		dragHandleClass: resolveBottomSheetDragHandleClass(),
		dragIndicatorClass: resolveBottomSheetDragIndicatorClass(),
		finalTitle: resolveBottomSheetTitle(title, defaults),
		headerRowClass: resolveBottomSheetHeaderRowClass(),
		headerTitleClass: resolveBottomSheetHeaderTitleClass(titleAlignClass),
		iconButtonClass: resolveBottomSheetIconButtonClass(iconRadiusClass),
		iconRadiusClass,
		iconSvgClass: resolveBottomSheetIconSvgClass(),
		inParams: resolveBottomSheetInParams({ transitionDistance, duration }),
		layerClass: resolveBottomSheetLayerClass(),
		layerStyleString: resolveBottomSheetLayerStyleString(zIndex),
		layerStyleValue: resolveBottomSheetLayerStyleValue(zIndex),
		maxHeight,
		outParams: resolveBottomSheetOutParams({ transitionDistance, outDuration }),
		panelClass: resolveBottomSheetPanelClass({ windowRadiusClass, isTouch }),
		panelStyleString: resolveBottomSheetPanelStyleString({ maxHeight, currentTop }),
		panelStyleValue: resolveBottomSheetPanelStyleValue({ maxHeight, currentTop }),
		resolvedStayHeightList,
		shouldRender: resolveBottomSheetRenderState({ visible, outDuration, currentRender }),
		startTop,
		stayHeight,
		titleAlignClass,
		transitionDistance,
		validationState: resolveBottomSheetValidationState({ stayHeightList, stayHeightIndex, closeHeight }),
		windowRadiusClass
	};
};
