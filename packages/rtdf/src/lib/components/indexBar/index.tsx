import type { IndexBarProps, IndexBarItemProps } from '../../types';
import type { ForwardedRef, ReactElement, RefAttributes } from 'react';
import type { IndexBarBubbleTransitionParams } from '@any-tdf/common/derived/indexBar';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	resolveIndexBarDerived,
	resolveIndexBarContentTooShort,
	resolveIndexBarInitialTouchState,
	resolveIndexBarMeasuredClientHeight,
	resolveIndexBarMeasuredClientHeights,
	resolveIndexBarMeasuredBarHeightState,
	resolveIndexBarMeasuredHeightsState,
	resolveIndexBarScrollAction,
	resolveIndexBarScrollTop,
	resolveIndexBarTouchEndAction,
	resolveIndexBarTouchSelectAction
} from '@any-tdf/common/derived/indexBar';
import { throttleWithRAF } from '@any-tdf/common/utils';
import { useFlyTransition } from '../utils/transition';

type IndexBubbleProps = {
	visible: boolean;
	text: string;
	bubbleClass: string;
	transitionParams: IndexBarBubbleTransitionParams;
};

const IndexBubble: React.FC<IndexBubbleProps> = ({ visible, text, bubbleClass, transitionParams }) => {
	const bubbleRef = useFlyTransition(visible, { in: transitionParams, out: transitionParams });

	return (
		<div ref={bubbleRef} className={bubbleClass}>
			{text}
		</div>
	);
};

const IndexBarInner = <T = string,>(
	{
		data = [],
		current = 0,
		top = 0,
		height = 100,
		radius = '',
		scrollAlign = true,
		titleInjClass = '',
		textInjClass = '',
		children,
		onClickChild,
		...restProps
	}: IndexBarProps<T>,
	ref: ForwardedRef<HTMLDivElement>
) => {
	const bodyDomRef = useRef<HTMLDivElement>(null);
	const barDomRef = useRef<HTMLDivElement>(null);
	const groupRefsRef = useRef<(HTMLDivElement | null)[]>([]);

	const [barHeight, setBarHeight] = useState(0);
	const [groupHeights, setGroupHeights] = useState<number[]>([]);
	const [longSumList, setLongSumList] = useState<number[]>([]);
	const [currentIndex, setCurrentIndex] = useState(current);
	const initialTouchState = resolveIndexBarInitialTouchState();
	const [currentTouch, setCurrentTouch] = useState(initialTouchState.currentTouch);
	const [isDown, setIsDown] = useState(initialTouchState.isDown);

	// 公共派生层处理 IndexBar 几何、class、style 和渲染状态，DOM 滚动与事件留在组件层。
	// Shared derived layer handles IndexBar geometry, classes, styles and render state; DOM scrolling and events stay in the component layer.
	const indexBarState = resolveIndexBarDerived<IndexBarItemProps<T>>({
		data,
		current: currentIndex,
		currentTouch,
		radius,
		scrollAlign,
		titleInjClass,
		textInjClass,
		top,
		height,
		barHeight
	});

	useEffect(() => {
		setCurrentIndex(current);
	}, [current]);

	const scrollToIndex = useCallback(
		(index: number) => {
			if (!bodyDomRef.current) return;
			const scrollTop = resolveIndexBarScrollTop({ index, longSumList, heights: groupHeights });
			bodyDomRef.current.scrollTop = scrollTop;
		},
		[groupHeights, longSumList]
	);

	const touchBoxStart = useCallback(
		(event: React.PointerEvent<HTMLDivElement>) => {
			if (indexBarState.itemHeight <= 0 || data.length === 0) return;
			const action = resolveIndexBarTouchSelectAction({
				clientY: event.clientY,
				barToTop: indexBarState.barToTop,
				itemHeight: indexBarState.itemHeight,
				dataLength: data.length
			});

			setIsDown(action.isDown);
			setCurrentTouch(action.currentTouch);
			setCurrentIndex(action.currentIndex);
			scrollToIndex(action.scrollIndex);
		},
		[indexBarState.barToTop, indexBarState.itemHeight, data.length, scrollToIndex]
	);

	const touchBoxMove = useCallback(
		(event: React.PointerEvent<HTMLDivElement>) => {
			if (!isDown || !barDomRef.current || indexBarState.itemHeight <= 0) {
				return;
			}

			barDomRef.current.setPointerCapture(event.pointerId);
			const action = resolveIndexBarTouchSelectAction({
				clientY: event.clientY,
				barToTop: indexBarState.barToTop,
				itemHeight: indexBarState.itemHeight,
				dataLength: data.length
			});

			setCurrentTouch(action.currentTouch);
			setCurrentIndex(action.currentIndex);
			scrollToIndex(action.scrollIndex);
		},
		[isDown, indexBarState.barToTop, indexBarState.itemHeight, data.length, scrollToIndex]
	);

	const touchBoxEnd = useCallback(() => {
		const action = resolveIndexBarTouchEndAction();
		setCurrentTouch(action.currentTouch);
		setIsDown(action.isDown);
	}, []);

	const scrollBody = useCallback(() => {
		if (!bodyDomRef.current) {
			return;
		}
		const action = resolveIndexBarScrollAction({
			scrollTop: bodyDomRef.current.scrollTop,
			longSumList
		});
		if (action.shouldUpdate) setCurrentIndex(action.currentIndex);
	}, [longSumList]);

	useEffect(() => {
		const updateGroupHeights = () => {
			const heights = resolveIndexBarMeasuredClientHeights(groupRefsRef.current);
			// 公共 action 只处理测量数组，DOM ref 读取保留在组件层。
			// Shared action only handles measured arrays; DOM ref reads stay in the component layer.
			setGroupHeights((prevHeights) => {
				const action = resolveIndexBarMeasuredHeightsState({
					currentHeights: prevHeights,
					measuredHeights: heights
				});
				return action.shouldUpdate ? action.groupHeights : prevHeights;
			});
		};

		updateGroupHeights();

		const resizeObservers = groupRefsRef.current.map((ref) => {
			if (!ref) return null;
			const observer = new ResizeObserver(updateGroupHeights);
			observer.observe(ref);
			return observer;
		});

		return () => {
			resizeObservers.forEach((observer) => observer?.disconnect());
		};
	}, [data]);

	useEffect(() => {
		if (!barDomRef.current) return;

		const updateBarHeight = () => {
			if (!barDomRef.current) return;
			setBarHeight(
				(currentBarHeight) =>
					resolveIndexBarMeasuredBarHeightState({
						currentBarHeight,
						measuredBarHeight: resolveIndexBarMeasuredClientHeight(barDomRef.current)
					}).barHeight
			);
		};

		updateBarHeight();
		const resizeObserver = new ResizeObserver(updateBarHeight);
		resizeObserver.observe(barDomRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, [data]);

	useEffect(() => {
		if (bodyDomRef.current) {
			bodyDomRef.current.scrollTop = 0;
		}

		setLongSumList(resolveIndexBarMeasuredHeightsState({ measuredHeights: groupHeights }).longSumList);

		if (resolveIndexBarContentTooShort({ height, barHeight })) {
			console.error('[RTDF IndexBar error] The index content area height is not enough.');
		}
	}, [groupHeights, height, barHeight]);

	const throttledTouchBoxMove = useMemo(() => throttleWithRAF(touchBoxMove), [touchBoxMove]);

	return (
		<div ref={ref} {...restProps}>
			<div ref={bodyDomRef} className={indexBarState.bodyClass} style={indexBarState.bodyStyle} onScroll={scrollBody}>
				{indexBarState.groups.map((groupState) => (
					<div
						key={groupState.index}
						ref={(el) => {
							groupRefsRef.current[groupState.index] = el;
						}}
						className={groupState.groupClass}
					>
						<div className={groupState.titleClass}>{groupState.group.title}</div>
						{groupState.group.child.map((child, childIndex) => {
							const content =
								typeof children === 'function'
									? children(child, childIndex, groupState.group, groupState.index)
									: typeof child === 'string' || typeof child === 'number'
										? child
										: null;
							return (
								<div key={childIndex}>
									<button
										type="button"
										className={groupState.childClass}
										onClick={() => {
											onClickChild?.(groupState.index, groupState.group, childIndex, child);
										}}
									>
										{content}
									</button>
									<div className={groupState.dividerClass}></div>
								</div>
							);
						})}
					</div>
				))}
			</div>

			<div
				ref={barDomRef}
				className={indexBarState.barClass}
				style={indexBarState.barStyle}
				onPointerDown={touchBoxStart}
				onPointerMove={throttledTouchBoxMove}
				onPointerUp={touchBoxEnd}
				onPointerLeave={touchBoxEnd}
			>
				{indexBarState.barItems.map((item) => (
					<div key={item.index} className={item.wrapperClass}>
						<div className={item.itemClass}>{item.group.index}</div>
						<IndexBubble
							visible={item.bubbleVisible}
							text={item.group.index}
							bubbleClass={item.bubbleClass}
							transitionParams={indexBarState.bubbleTransitionParams}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

const IndexBar = forwardRef(IndexBarInner) as (<T = string>(
	props: IndexBarProps<T> & RefAttributes<HTMLDivElement>
) => ReactElement | null) & { displayName?: string };

IndexBar.displayName = 'IndexBar';

export default IndexBar;
