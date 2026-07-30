import { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
	resolveTabAutoScrollAction,
	resolveTabButtonRenderState,
	resolveTabClickAction,
	resolveTabDerived,
	resolveTabMeasuredSizeState,
	resolveTabStateOptions
} from '@any-tdf/common/derived/tabs';
import type { TabLabelProps, TabProps } from '../../types';
import Icon from '../icon';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const Tab = forwardRef<HTMLDivElement, TabProps>(
	(
		{
			labels = [],
			active = 0,
			lineType = false,
			radius = '',
			duration = 'base',
			layout = 'h',
			love = false,
			injClass = '',
			tabInjClass = '',
			activeTabInjClass = '',
			activeInjClass = '',
			mx = '2',
			overflow = false,
			showNum = 3,
			autoScroll = true,
			labelChild,
			onClickTab
		},
		ref
	) => {
		const rootRef = useRef<HTMLDivElement | null>(null);
		const [internalActive, setInternalActive] = useState(active);
		const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
		const [showIndexsOffset, setShowIndexsOffset] = useState(0);

		const labelCount = labels.length;
		// 公共派生层统一 Tab 的 class、style、指标和滚动数学，DOM 测量与滚动执行留在组件层。
		// Shared derivation centralizes Tab classes, styles, metrics and scroll math; DOM reads and scroll execution stay in the component layer.
		const tabState = useMemo(
			() =>
				resolveTabDerived(
					resolveTabStateOptions({
						props: {
							active: internalActive,
							activeInjClass,
							activeTabInjClass,
							duration,
							height: containerSize.height,
							injClass,
							labels,
							layout,
							lineType,
							love,
							mx,
							overflow,
							radius,
							showIndexesOffset: showIndexsOffset,
							showNum,
							tabInjClass,
							width: containerSize.width
						}
					})
				),
			[
				activeInjClass,
				containerSize.height,
				containerSize.width,
				duration,
				injClass,
				internalActive,
				labelCount,
				labels,
				layout,
				lineType,
				love,
				mx,
				overflow,
				radius,
				showIndexsOffset,
				showNum,
				tabInjClass,
				activeTabInjClass
			]
		);

		useEffect(() => {
			setInternalActive(active);
		}, [active]);

		useIsomorphicLayoutEffect(() => {
			const node = rootRef.current;
			if (!node) return;
			const updateSize = () => {
				// 公共测量函数只处理数值状态，DOM 读取仍留在组件层。
				// Shared measurement helper only handles numeric state; DOM reads stay in the component layer.
				const measuredState = resolveTabMeasuredSizeState({
					current: { tabWidth: containerSize.width, tabHeight: containerSize.height },
					tabRect: { width: node.clientWidth, height: node.clientHeight }
				});
				setContainerSize({ width: measuredState.tabWidth, height: measuredState.tabHeight });
			};
			updateSize();
			if (typeof ResizeObserver === 'undefined') return;
			const observer = new ResizeObserver(updateSize);
			observer.observe(node);
			return () => observer.disconnect();
		}, [tabState.showOverflow, layout, labelCount]);

		useEffect(() => {
			const action = resolveTabAutoScrollAction({
				autoScroll,
				hasScrollElement: Boolean(rootRef.current),
				showOverflow: tabState.showOverflow,
				scrollState: tabState.overflow.autoScrollState
			});
			if (action.shouldScroll && rootRef.current) {
				rootRef.current.scrollLeft = action.scrollLeft;
				if (action.shouldUpdateOffset) setShowIndexsOffset(action.nextOffset);
			}
		}, [
			autoScroll,
			tabState.showOverflow,
			tabState.overflow.itemW,
			tabState.overflow.autoScrollState.offset,
			tabState.overflow.autoScrollState.offsetChanged,
			tabState.overflow.autoScrollState.scrollLeft,
			tabState.overflow.autoScrollState.shouldScroll
		]);

		const clickTabFun = (index: number) => {
			// 公共动作函数只返回 active 更新结果，组件层负责状态写入和事件触发。
			// Shared action function only returns the active update result; the component writes state and fires events.
			const action = resolveTabClickAction({ index });
			setInternalActive(action.nextActive);
			if (action.shouldEmit) onClickTab?.(action.nextActive);
		};

		const renderLabelChild = (isActive: boolean) => {
			if (typeof labelChild === 'function') return labelChild({ active: isActive });
			return labelChild;
		};

		const renderButton = (label: TabLabelProps, i: number, isOverflowButton: boolean = false) => {
			const itemState = tabState.items[i];
			if (!itemState) return null;
			// 公共派生层负责在普通按钮和 overflow 按钮之间选择 class 与 style。
			// The shared derived layer chooses classes and styles for normal and overflow buttons.
			const buttonState = resolveTabButtonRenderState({
				item: itemState,
				overflow: isOverflowButton
			});
			return (
				<button
					key={`tab-${i}`}
					type="button"
					className={buttonState.buttonClass}
					style={buttonState.styleValue}
					onClick={() => clickTabFun(i)}
				>
					{label.icon ? (
						<div className={tabState.iconClass}>
							<Icon {...label.icon} />
						</div>
					) : null}
					{label.text ? <div className={tabState.textClass}>{label.text}</div> : null}
					{labelChild ? renderLabelChild(itemState.active) : null}
				</button>
			);
		};

		if (tabState.showOverflow) {
			return (
				<div
					ref={(node) => {
						rootRef.current = node;
						if (typeof ref === 'function') {
							ref(node);
						} else if (ref) {
							(ref as { current: HTMLDivElement | null }).current = node;
						}
					}}
					className={tabState.overflow.rootClass}
				>
					{tabState.overflow.lineVisible ? <div className={tabState.lineClass} style={tabState.overflow.lineStyleValue}></div> : null}
					<div className={tabState.overflow.indicatorClass} style={tabState.overflow.indicatorStyleValue}></div>
					<div className={tabState.overflow.listClass} style={tabState.overflow.listStyleValue}>
						{labels.map((label, i) => renderButton(label, i, true))}
					</div>
				</div>
			);
		}

		return (
			<div
				ref={(node) => {
					rootRef.current = node;
					if (typeof ref === 'function') {
						ref(node);
					} else if (ref) {
						(ref as { current: HTMLDivElement | null }).current = node;
					}
				}}
				className={tabState.normal.rootClass}
			>
				{tabState.normal.lineVisible ? <div className={tabState.lineClass} style={tabState.normal.lineStyleValue}></div> : null}
				<div className={tabState.normal.indicatorClass} style={tabState.normal.indicatorStyleValue}></div>
				<div className={tabState.normal.listClass}>{labels.map((label, i) => renderButton(label, i))}</div>
			</div>
		);
	}
);

Tab.displayName = 'Tab';

export default Tab;
