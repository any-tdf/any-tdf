import Icon from '../icon';
import { SvgIcon } from '../utils/SvgIcon';
import type { CheckboxItemProps } from '../../types';
import { checkboxCheckedSvg, checkboxUncheckedSvg } from '@any-tdf/common/svg/common';
import { resolveSelectionItemRenderState } from '@any-tdf/common/derived/selection';

const CheckboxItem: React.FC<CheckboxItemProps> = ({
	name,
	layout = 'v',
	checked = false,
	textPosition = 'r',
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
						{/* 公共 SVG 数据在 common，选中态和事件仍保留在 CheckboxItem。 */}
						{/* Shared SVG data lives in common, while checked state and events stay in CheckboxItem. */}
						<SvgIcon svg={checkboxCheckedSvg} width={24} height={24} className={itemState.checkedSvgClass} />
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
					<SvgIcon svg={checkboxUncheckedSvg} width={24} height={24} className={itemState.uncheckedSvgClass} />
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

export default CheckboxItem;
