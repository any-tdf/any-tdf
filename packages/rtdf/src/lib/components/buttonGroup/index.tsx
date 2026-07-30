import type { ButtonGroupProps } from '../../types';
import {
	resolveButtonGroupDerived,
	resolveButtonGroupItemClickAction,
	resolveButtonGroupStateOptions
} from '@any-tdf/common/derived/button';
import Icon from '../icon';
import { Fragment } from 'react';

const ButtonGroup: React.FC<ButtonGroupProps> = ({
	items = [],
	fill = 'base',
	state,
	radius = '',
	size = 'big',
	border = 'solid',
	dividerHeight = 'mid',
	heightIn = '3',
	heightOut = '2',
	injClass = '',
	children
}) => {
	// 公共派生层处理 ButtonGroup class 和纯点击决策，回调与 children 渲染留在组件层。
	// Shared derived layer handles ButtonGroup classes and pure click decisions; callbacks and children rendering stay in the component layer.
	const buttonGroupState = resolveButtonGroupDerived(
		resolveButtonGroupStateOptions({
			props: {
				items,
				fill,
				state,
				radius,
				size,
				border,
				dividerHeight,
				heightIn,
				heightOut,
				injClass
			}
		})
	);
	const clickItemFun = (item: NonNullable<ButtonGroupProps['items']>[number]) => {
		// 公共动作函数只返回点击决策，回调触发留在组件层。
		// Shared action function only returns the click decision; callback execution stays in the component.
		const action = resolveButtonGroupItemClickAction({ disabled: item.disabled });
		if (!action.shouldClick) return;
		item.onClick?.();
	};

	return (
		<div className={buttonGroupState.outerClass}>
			<div className={buttonGroupState.innerClass}>
				{buttonGroupState.useItems
					? buttonGroupState.itemStates.map((itemState, index) => {
							const item = itemState.item;

							return (
								<Fragment key={`item-${index}`}>
									<button type="button" className={itemState.itemClass} disabled={item.disabled} onClick={() => clickItemFun(item)}>
										{itemState.showLeftIcon && item.icon ? <Icon {...item.icon} /> : null}
										{item.text ?? null}
										{itemState.showRightIcon && item.icon ? <Icon {...item.icon} /> : null}
									</button>
									{itemState.showDivider ? (
										<div className={itemState.dividerWrapClass}>
											<div className={itemState.dividerClass} />
										</div>
									) : null}
								</Fragment>
							);
						})
					: children}
			</div>
		</div>
	);
};

export default ButtonGroup;
