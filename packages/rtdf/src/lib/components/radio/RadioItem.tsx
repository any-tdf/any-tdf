import Icon from '../icon';
import { SvgIcon } from '../utils/SvgIcon';
import type { RadioItemProps } from '../../types';
import { radioCheckedSvg, radioUncheckedSvg } from '@any-tdf/common/svg/common';
import { resolveSelectionItemRenderState } from '@any-tdf/common/derived/selection';

const RadioItem: React.FC<RadioItemProps> = ({
	name,
	textPosition = 'r',
	layout = 'v',
	checked = false,
	icon = 'default',
	iconChecked = 'default',
	label,
	children,
	onClick
}) => {
	const labelContent = children ?? label;
	// 公共派生层只处理选择项可见性和 class，点击事件留在组件层。
	// Shared derivation only handles selection item visibility and classes; click events stay in the component layer.
	const itemState = resolveSelectionItemRenderState({
		layout,
		textPosition,
		icon,
		iconChecked,
		checked
	});

	// 点击选项事件
	// Click option event
	const clickRadioFun = () => {
		onClick?.(name);
	};

	return (
		<button type="button" onClick={() => clickRadioFun()} className={itemState.itemClass}>
			{itemState.showLeadingLabel && (
				<div className={itemState.leadingLabelClass}>
					{labelContent}
					{itemState.showDivider && <div className={itemState.dividerClass}></div>}
				</div>
			)}
			<div className={itemState.checkedIconClass}>
				{itemState.checkedIconState.kind === 'none' ? (
					''
				) : itemState.checkedIconState.kind === 'default' ? (
					<>
						{/* 公共 SVG 数据在 common，选中态和事件仍保留在 RadioItem。 */}
						{/* Shared SVG data lives in common, while checked state and events stay in RadioItem. */}
						<SvgIcon svg={radioCheckedSvg} width={24} height={24} className={itemState.checkedSvgClass} />
					</>
				) : itemState.checkedIconProps ? (
					<Icon {...itemState.checkedIconProps} theme />
				) : (
					''
				)}
			</div>
			<div className={itemState.uncheckedIconClass}>
				{itemState.uncheckedIconState.kind === 'none' ? (
					''
				) : itemState.uncheckedIconState.kind === 'default' ? (
					<SvgIcon svg={radioUncheckedSvg} width={24} height={24} className={itemState.uncheckedSvgClass} />
				) : itemState.uncheckedIconProps ? (
					<Icon opacity={0.2} {...itemState.uncheckedIconProps} />
				) : (
					''
				)}
			</div>
			{itemState.showTrailingLabel && <div className={itemState.trailingLabelClass}>{labelContent}</div>}
		</button>
	);
};

export default RadioItem;
