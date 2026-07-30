import type { StepsProps } from '../../types';
import { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Icon from '../icon';
import {
	resolveStepsDerived,
	resolveStepsMeasuredClientHeights,
	resolveStepsMeasuredClientWidth,
	resolveStepsMeasuredHeightsState,
	resolveStepsMeasuredWidthState,
	resolveStepsStateOptions
} from '@any-tdf/common/derived/steps';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const Steps = forwardRef<HTMLDivElement, StepsProps>(
	({ steps = [], current = 1, radius = '', barBorder = true, vertical = false }, ref) => {
		const containerRef = useRef<HTMLDivElement>(null);
		const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
		const [width, setWidth] = useState(0);
		const [heightList, setHeightList] = useState<number[]>([]);

		// 公共派生层处理 Steps 的数据选择、class 和布局值，DOM 测量留在组件层。
		// Shared derived layer handles Steps data selection, classes and layout values; DOM measurement stays in the component layer.
		const stepsState = useMemo(
			() =>
				resolveStepsDerived(
					resolveStepsStateOptions({
						props: { steps, current, radius, barBorder, vertical },
						width,
						heightList
					})
				),
			[steps, current, radius, barBorder, vertical, width, heightList]
		);

		const setContainerRefs = useCallback(
			(node: HTMLDivElement | null) => {
				containerRef.current = node;
				if (typeof ref === 'function') {
					ref(node);
				} else if (ref) {
					ref.current = node;
				}
			},
			[ref]
		);

		useEffect(() => {
			if (vertical) return;
			const updateWidth = () => {
				if (!containerRef.current) return;
				setWidth(
					(currentWidth) =>
						resolveStepsMeasuredWidthState({
							currentWidth,
							measuredWidth: resolveStepsMeasuredClientWidth(containerRef.current)
						}).width
				);
			};

			updateWidth();
			if (typeof ResizeObserver === 'undefined') return;
			const observer = new ResizeObserver(updateWidth);
			if (containerRef.current) {
				observer.observe(containerRef.current);
			}
			return () => observer.disconnect();
		}, [vertical]);

		const measureHeights = useCallback(() => {
			if (!vertical) return;
			const nextHeights = resolveStepsMeasuredClientHeights(itemRefs.current);
			setHeightList((prev) => {
				const heightState = resolveStepsMeasuredHeightsState({ currentHeights: prev, nextHeights });
				return heightState.heights;
			});
		}, [vertical]);

		useIsomorphicLayoutEffect(() => {
			measureHeights();
		}, [measureHeights, steps.length]);

		useEffect(() => {
			if (!vertical) return;
			if (typeof window === 'undefined') return;
			const onResize = () => {
				measureHeights();
			};
			window.addEventListener('resize', onResize);
			return () => window.removeEventListener('resize', onResize);
		}, [measureHeights, vertical]);

		const renderBar = (itemViewState: (typeof stepsState.items)[number]) => {
			const { itemState } = itemViewState;
			if (itemState.hasBar) {
				return (
					<div className={itemViewState.barWrapperClass}>
						<div className={itemViewState.lineClass} style={itemViewState.lineStyle} />
						<div className={itemViewState.barClass} style={itemViewState.barStyle}>
							{renderBarContent(itemViewState)}
						</div>
					</div>
				);
			}

			return (
				<div className={itemViewState.barWrapperClass}>
					<div className={itemViewState.lineClass} style={itemViewState.lineStyle} />
					<div className={itemViewState.barClass} style={itemViewState.barStyle} />
				</div>
			);
		};

		const renderBarContent = (itemViewState: (typeof stepsState.items)[number]) => {
			const { barContentState } = itemViewState;
			switch (barContentState.kind) {
				case 'icon':
					return (
						<div className={itemViewState.barIconClass}>
							<Icon {...barContentState.iconProps} size={16} />
						</div>
					);
				case 'image':
					return <img className={itemViewState.barImageClass} src={barContentState.src} alt="" />;
				case 'text':
					return <div className={itemViewState.barTextClass}>{barContentState.text}</div>;
				default:
					return null;
			}
		};
		const renderInject = (inject: unknown) => {
			if (!inject) return null;
			return typeof inject === 'function' ? inject() : inject;
		};

		const renderStepContent = (itemViewState: (typeof stepsState.items)[number]) => {
			const itemState = itemViewState.itemState;
			const inject = renderInject(itemState.inject);

			return (
				<div className={itemViewState.contentClass}>
					<div className={itemViewState.titleClass}>{itemState.title}</div>
					{itemState.desc && <div className={itemViewState.descClass}>{itemState.desc}</div>}
					{inject && <div>{inject}</div>}
				</div>
			);
		};

		if (vertical) {
			return (
				<div ref={setContainerRefs} className={stepsState.verticalRootClass}>
					{stepsState.items.map((itemViewState) => (
						<div
							key={itemViewState.index}
							className={itemViewState.verticalItemClass}
							ref={(node) => {
								itemRefs.current[itemViewState.index] = node;
							}}
						>
							{renderBar(itemViewState)}
							{renderStepContent(itemViewState)}
						</div>
					))}
				</div>
			);
		}

		return (
			<div ref={setContainerRefs} className={stepsState.horizontalRootClass}>
				{stepsState.items.map((itemViewState) => (
					<div key={itemViewState.index} className={itemViewState.horizontalItemClass}>
						{renderBar(itemViewState)}
						{renderStepContent(itemViewState)}
					</div>
				))}
			</div>
		);
	}
);

Steps.displayName = 'Steps';

export default Steps;
