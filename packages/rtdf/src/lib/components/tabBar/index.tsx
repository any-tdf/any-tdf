import type { TabBarProps } from '../../types';
import type { ReactNode } from 'react';
import { forwardRef, useCallback, useRef, useState, useEffect } from 'react';
import Icon from '../icon';
import {
	resolveTabBarClickAction,
	resolveTabBarDerived,
	resolveTabBarMeasuredClientWidth,
	resolveTabBarStateOptions
} from '@any-tdf/common/derived/tabBar';

const TabBar = forwardRef<HTMLDivElement, TabBarProps>(
	(
		{
			labels = [],
			active = 0,
			line = false,
			lineW = 4,
			love = false,
			injClass = '',
			tabInjClass = '',
			activeTabInjClass = '',
			activeInjClass = '',
			onChange
		},
		ref
	) => {
		const containerRef = useRef<HTMLDivElement>(null);
		const [tabW, setTabW] = useState(0);
		const [internalActive, setInternalActive] = useState(active);
		const setRefs = useCallback(
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
			setInternalActive(active);
		}, [active]);

		useEffect(() => {
			const updateWidth = () => {
				if (containerRef.current) {
					setTabW(resolveTabBarMeasuredClientWidth(containerRef.current));
				}
			};

			updateWidth();
			window.addEventListener('resize', updateWidth);
			return () => window.removeEventListener('resize', updateWidth);
		}, []);

		const clickFun = (i: number) => {
			// 公共动作函数只返回 active 更新结果，组件层负责状态写入和事件触发。
			// Shared action function only returns the active update result; the component writes state and fires events.
			const action = resolveTabBarClickAction({ index: i });
			setInternalActive(action.nextActive);
			if (action.shouldEmit) onChange?.(action.nextActive);
		};

		// 公共派生层只处理 TabBar 状态推导，事件和宽度测量留在组件内。
		// The shared derived layer only handles TabBar state derivation; events and width measurement stay in the component.
		const tabBarState = resolveTabBarDerived(
			resolveTabBarStateOptions({
				props: {
					labels,
					line,
					lineW,
					love,
					injClass,
					tabInjClass,
					activeTabInjClass,
					activeInjClass
				},
				active: internalActive,
				tabWidth: tabW
			})
		);
		const renderIcon = (itemState: (typeof tabBarState.items)[number]) => {
			if (!itemState.hasIcon || !itemState.iconPair.activeIcon || !itemState.iconPair.inactiveIcon) return null;

			return (
				<div className={itemState.iconWrapClass}>
					<i className={itemState.iconPair.activeClass}>
						<Icon {...itemState.iconPair.activeIcon} />
					</i>
					<i className={itemState.iconPair.inactiveClass}>
						<Icon {...itemState.iconPair.inactiveIcon} />
					</i>
				</div>
			);
		};

		const renderText = (itemState: (typeof tabBarState.items)[number]) => {
			if (!itemState.hasText) return null;

			return <div className={itemState.textClass}>{itemState.label.text as ReactNode}</div>;
		};

		return (
			<div ref={setRefs} className={tabBarState.rootClass} style={tabBarState.rootStyleValue}>
				{tabBarState.showIndicator && <div className={tabBarState.indicatorClass} style={tabBarState.indicatorStyleValue} />}
				<div className={tabBarState.listClass}>
					{tabBarState.items.map((itemState) => (
						<button key={itemState.index} type="button" onClick={() => clickFun(itemState.index)} className={itemState.buttonClass}>
							{renderIcon(itemState)}
							{renderText(itemState)}
						</button>
					))}
				</div>
			</div>
		);
	}
);

TabBar.displayName = 'TabBar';

export default TabBar;
