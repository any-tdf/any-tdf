import type { CellProps } from '../../types';
import {
	resolveCellClickAction,
	resolveCellDerived,
	resolveCellKeyboardAction,
	resolveCellStateOptions
} from '@any-tdf/common/derived/cell';
import { arrowRightSvg } from '@any-tdf/common/svg/common';
import { useEffect, useState } from 'react';
import Icon from '../icon';
import Switch from '../switch';
import { SvgIcon } from '../utils/SvgIcon';

const Cell: React.FC<CellProps> = ({
	title = '',
	detail = '',
	right = 'arrow',
	left = null,
	subTitle = '',
	info = '',
	line = false,
	bg = 'surface',
	my = '4',
	mx = '2',
	radius = '',
	switchActive = false,
	shadow = 'xs',
	injClass = '',
	love = false,
	clickAll = true,
	leftChild,
	rightChild,
	detailChild,
	onClick
}) => {
	const [innerSwitchActive, setInnerSwitchActive] = useState(switchActive);

	useEffect(() => {
		setInnerSwitchActive(switchActive);
	}, [switchActive]);

	// 公共派生层处理 Cell class、图标尺寸和右侧内容分支，事件与 children 留在组件层。
	// Shared derived layer handles Cell classes, icon size and right-content branches; events and children stay in the component layer.
	const cellState = resolveCellDerived(
		resolveCellStateOptions({
			props: {
				my,
				mx,
				radius,
				shadow,
				injClass,
				bg,
				clickAll,
				love,
				line,
				lineTone: 'black',
				subTitle,
				info,
				right
			},
			includeCursor: true
		})
	);

	// 点击事件
	const handleClick = () => {
		// 公共动作函数只返回点击和 switch 状态决策，状态写入与事件触发留在组件层。
		// Shared action function only returns click and switch state decisions; state writes and events stay in the component.
		const action = resolveCellClickAction({ clickAll, active: innerSwitchActive, right });
		if (!action.shouldClick) return;
		if (action.shouldToggleSwitch) {
			setInnerSwitchActive(action.nextSwitchActive);
		}
		onClick?.();
	};
	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		// 公共键盘动作函数只处理按键分支，事件对象处理留在组件层。
		// Shared keyboard action function only resolves key branches; event object handling stays in the component.
		const action = resolveCellKeyboardAction({ key: event.key, clickAll });
		if (action.shouldPreventDefault) {
			event.preventDefault();
		}
		if (action.shouldClick) {
			handleClick();
		}
	};

	return (
		<div className={cellState.outerClass}>
			<div className={cellState.contentClass}>
				<div role="button" tabIndex={cellState.tabIndex} onClick={handleClick} onKeyDown={handleKeyDown} className={cellState.rowClass}>
					<div className={cellState.leftContentClass}>
						{leftChild ||
							(left ? (
								<div className={cellState.leftIconWrapClass}>
									<Icon {...left} />
								</div>
							) : null)}
						<div className={cellState.titleClass}>
							<div className={cellState.titleTextClass}>{title}</div>
							<div className={cellState.subTitleClass}>{subTitle}</div>
						</div>
					</div>
					<div className={cellState.rightContentClass}>
						<div className={cellState.detailClass}>
							{detailChild || (detail ? <div className={cellState.detailTextClass}>{detail}</div> : null)}
							<div className={cellState.infoClass}>{info}</div>
						</div>
						{rightChild ||
							(cellState.rightState.kind === 'arrow' ? (
								<div className={cellState.rightArrowAccessoryClass}>
									{/* 公共箭头 SVG 数据在 common 中维护。 / Shared arrow SVG data lives in common. */}
									<SvgIcon
										svg={arrowRightSvg}
										className={cellState.rightArrowIconClass}
										width={cellState.rightState.arrowSize}
										height={cellState.rightState.arrowSize}
									/>
								</div>
							) : cellState.rightState.kind === 'switch' ? (
								<div className={cellState.rightAccessoryClass} onClick={(event) => event.stopPropagation()}>
									<Switch active={innerSwitchActive} {...cellState.rightState.switchProps} />
								</div>
							) : cellState.rightState.kind === 'icon' ? (
								<div className={cellState.rightAccessoryClass}>
									<Icon {...cellState.rightState.iconProps} />
								</div>
							) : null)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cell;
