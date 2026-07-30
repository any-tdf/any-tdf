import type { TabsProps } from '../../types';
import {
	resolveTabsClickAction,
	resolveTabsDerived,
	resolveTabsLabelCount,
	resolveTabsMeasuredClientWidth,
	resolveTabsStateOptions
} from '@any-tdf/common/derived/tabs';
import { splitTabCallbacks } from '@any-tdf/common/derived/props';
import { forwardRef, useRef, useState, useEffect, useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import Tab from './tab';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
	({ tab = {}, duration = 'base', position = 't', transition = true, active = 0, onChange, children }, ref) => {
		const viewportRef = useRef<HTMLDivElement>(null);
		const [width, setWidth] = useState(0);
		const [internalActive, setInternalActive] = useState(active);
		const { tabProps, tabOnClickTab } = splitTabCallbacks(tab);
		const labelCount = resolveTabsLabelCount(tab);
		// 输入组件状态，返回框架无关的位置和内容切换派生结果。
		// Receive component state and return framework-agnostic position and transition derivations.
		const tabsState = resolveTabsDerived(
			resolveTabsStateOptions({
				labelCount,
				width,
				active: internalActive,
				props: { duration, position, transition }
			})
		);

		useEffect(() => {
			setInternalActive(active);
		}, [active]);

		useIsomorphicLayoutEffect(() => {
			const node = viewportRef.current;
			if (!node) return;
			const updateWidth = () => {
				setWidth(resolveTabsMeasuredClientWidth(node));
			};
			updateWidth();
			if (typeof ResizeObserver === 'undefined') return;
			const observer = new ResizeObserver(updateWidth);
			observer.observe(node);
			return () => observer.disconnect();
		}, [position, transition, labelCount]);

		const clickTabFun = (index: number) => {
			// 公共动作函数只返回 active 更新结果，组件层负责状态写入和事件触发。
			// Shared action function only returns the active update result; the component writes state and fires events.
			const action = resolveTabsClickAction({ index });
			tabOnClickTab?.(action.nextActive);
			setInternalActive(action.nextActive);
			if (action.shouldEmit) onChange?.(action.nextActive);
		};

		const renderContent = () => {
			if (!children) return null;

			if (typeof children === 'function') {
				return children({ active: internalActive });
			}

			return children;
		};

		const renderTransitionContent = () => {
			if (!children) return null;

			if (tabsState.showTransitionViewport) {
				return (
					<div ref={viewportRef} className={tabsState.viewportClass}>
						<div className={tabsState.transitionClass} style={tabsState.transitionStyleValue}>
							{renderContent()}
						</div>
					</div>
				);
			}

			return renderContent();
		};

		const renderTabComponent = (layout?: 'h' | 'v') => (
			<Tab {...tabProps} active={internalActive} duration={duration} layout={layout} onClickTab={clickTabFun} />
		);
		const renderOptionalRoot = (content: ReactNode) => {
			if (ref) return <div ref={ref}>{content}</div>;
			return <>{content}</>;
		};

		if (transition) {
			if (tabsState.positionState.isTop) {
				return renderOptionalRoot(
					<>
						{renderTabComponent()}
						{renderTransitionContent()}
					</>
				);
			}
			if (tabsState.positionState.isBottom) {
				return renderOptionalRoot(
					<>
						{renderTransitionContent()}
						{renderTabComponent()}
					</>
				);
			}
			if (tabsState.positionState.isLeft) {
				return (
					<div ref={ref} className={tabsState.verticalRootClass}>
						<div>{renderTabComponent('v')}</div>
						<div className={tabsState.verticalContentClass}>{renderContent()}</div>
					</div>
				);
			}
			if (tabsState.positionState.isRight) {
				return (
					<div ref={ref} className={tabsState.verticalRootClass}>
						<div className={tabsState.verticalContentClass}>{renderContent()}</div>
						<div>{renderTabComponent('v')}</div>
					</div>
				);
			}
			return null;
		}

		if (tabsState.positionState.isTop) {
			return renderOptionalRoot(
				<>
					{renderTabComponent()}
					{renderContent()}
				</>
			);
		}
		if (tabsState.positionState.isBottom) {
			return renderOptionalRoot(
				<>
					{renderContent()}
					{renderTabComponent()}
				</>
			);
		}
		if (tabsState.positionState.isLeft) {
			return (
				<div ref={ref} className={tabsState.verticalRootClass}>
					<div>{renderTabComponent('v')}</div>
					<div className={tabsState.verticalContentClass}>{renderContent()}</div>
				</div>
			);
		}
		if (tabsState.positionState.isRight) {
			return (
				<div ref={ref} className={tabsState.verticalRootClass}>
					<div className={tabsState.verticalContentClass}>{renderContent()}</div>
					<div>{renderTabComponent('v')}</div>
				</div>
			);
		}
		return null;
	}
);

Tabs.displayName = 'Tabs';

export default Tabs;
