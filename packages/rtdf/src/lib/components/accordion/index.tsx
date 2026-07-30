import { useCallback, useEffect, useState } from 'react';
import type { AccordionItemProps, AccordionProps } from '../../types';
import Icon from '../icon';
import { SvgIcon } from '../utils/SvgIcon';
import { Transition as MotionTransition } from '../utils/transition';
import { easingFunctions } from '../utils/easing';
import { resolveAccordionDerived, resolveAccordionStateOptions, resolveAccordionToggleAction } from '@any-tdf/common/derived/accordion';
import { accordionArrowRightSvg, accordionPlusSvg } from '@any-tdf/common/svg/common';

interface AccordionPanelProps {
	className: string;
	visible: boolean;
	contentClass: string;
	slideParams: {
		duration: number;
		easing?: (progress: number) => number;
	};
	children: React.ReactNode;
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({ visible, slideParams, contentClass, className, children }) => {
	return (
		<MotionTransition visible={visible} transition="slide" inParams={slideParams} outParams={slideParams} className={className}>
			<div className={contentClass}>{children}</div>
		</MotionTransition>
	);
};

const Accordion: React.FC<AccordionProps> = ({
	items = [],
	activeIndex: activeIndexProp,
	multiple = false,
	radius = 'md',
	border = 'solid',
	divider = true,
	expandIcon = 'arrow',
	iconPosition = 'right',
	transitionDuration = 300,
	injClass = '',
	titleClass = '',
	contentClass = '',
	children,
	onChange
}) => {
	const [innerActive, setInnerActive] = useState<number | number[] | undefined>(activeIndexProp);

	useEffect(() => {
		setInnerActive(activeIndexProp);
	}, [activeIndexProp]);

	const activeIndex = innerActive;
	// 输入组件状态，返回框架无关的展开视图、class 和动画参数派生结果。
	// Receive component state and return framework-agnostic expanded views, classes and motion params.
	const accordionState = resolveAccordionDerived(
		resolveAccordionStateOptions({
			activeIndex,
			easing: easingFunctions.cubicOut,
			props: {
				border,
				contentClass,
				divider,
				expandIcon,
				iconPosition,
				injClass,
				items,
				multiple,
				radius,
				titleClass,
				transitionDuration
			}
		})
	);

	const toggle = useCallback(
		(index: number) => {
			const item = items[index];
			const action = resolveAccordionToggleAction({
				activeIndex,
				index,
				multiple,
				disabled: item?.disabled
			});
			if (!action.shouldToggle) return;
			setInnerActive(action.nextActive);
			onChange?.(action.nextActive);
		},
		[activeIndex, items, multiple, onChange]
	);

	return (
		<div className={accordionState.rootClass}>
			{accordionState.itemViewStates.map((itemViewState) => {
				const { item, index, iconState } = itemViewState;
				return (
					<div key={`${item.title}-${index}`} className={itemViewState.dividerClass}>
						<button type="button" className={itemViewState.buttonClass} onClick={() => toggle(index)} disabled={item.disabled}>
							<div className={itemViewState.titleClass}>
								{item.icon ? <Icon {...item.icon} /> : null}
								<span className={accordionState.titleTextClass}>{item.title}</span>
							</div>
							{iconState.shouldRender ? (
								<span className={iconState.wrapClass}>
									{/* 公共 SVG 数据在 common，框架渲染留在组件内。 */}
									{/* Shared SVG data lives in common, while framework rendering stays here. */}
									{iconState.kind === 'arrow' ? (
										<SvgIcon svg={accordionArrowRightSvg} className={iconState.iconClass} />
									) : iconState.kind === 'plus' ? (
										<SvgIcon svg={accordionPlusSvg} className={iconState.iconClass} />
									) : null}
								</span>
							) : null}
						</button>

						<AccordionPanel
							visible={itemViewState.expanded}
							slideParams={accordionState.slideParams}
							contentClass={accordionState.contentClass}
							className={accordionState.panelClass}
						>
							{typeof children === 'function'
								? (children as (item: AccordionItemProps, index: number) => React.ReactNode)(item, index)
								: children || item.content}
						</AccordionPanel>
					</div>
				);
			})}
		</div>
	);
};

export default Accordion;
