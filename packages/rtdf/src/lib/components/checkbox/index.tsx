import { useEffect, useState } from 'react';
import CheckboxItem from './CheckboxItem';
import type { CheckboxProps } from '../../types';
import {
	resolveCheckboxClickAction,
	resolveCheckboxDerived,
	resolveCheckboxInitialCheckeds,
	resolveCheckboxStateOptions
} from '@any-tdf/common/derived/checkbox';

const Checkbox: React.FC<CheckboxProps> = (props) => {
	const {
		data = [],
		layout = 'v',
		checkeds,
		textPosition = 'r',
		icon = 'default',
		iconChecked = 'default',
		checkboxChild,
		onChange
	} = props;
	const safeCheckeds = resolveCheckboxInitialCheckeds(checkeds);
	const [internalCheckeds, setInternalCheckeds] = useState<string[]>(safeCheckeds);
	const currentCheckeds = internalCheckeds;
	// 公共派生层只处理选中态和布局 class，状态写入与事件留在组件层。
	// Shared derivation only handles checked state and layout classes; state writes and events stay in the component layer.
	const checkboxState = resolveCheckboxDerived(
		resolveCheckboxStateOptions({
			props: { data, layout },
			checkeds: currentCheckeds
		})
	);

	useEffect(() => {
		setInternalCheckeds(safeCheckeds);
	}, [checkeds]);

	const clickItemFn = (name: string) => {
		// 公共动作函数只返回下一组选中值，组件层负责状态写入和事件触发。
		// Shared action function only returns next checked values; the component writes state and fires events.
		const action = resolveCheckboxClickAction({ checkeds: currentCheckeds, name });
		setInternalCheckeds(action.nextCheckeds);
		if (action.shouldEmit) onChange?.(action.nextCheckeds);
	};

	return (
		<div className={checkboxState.groupClass}>
			{checkboxState.itemStates.map(({ item, checked }) =>
				typeof checkboxChild === 'function' ? (
					<div key={item.name}>{checkboxChild({ item })}</div>
				) : checkboxChild ? (
					<div key={item.name}>{checkboxChild}</div>
				) : (
					<CheckboxItem
						key={item.name}
						layout={layout}
						{...item}
						textPosition={textPosition}
						icon={icon}
						iconChecked={iconChecked}
						checked={checked}
						onClick={clickItemFn}
					>
						{item.label}
					</CheckboxItem>
				)
			)}
		</div>
	);
};

export type { CheckboxProps } from '../../types';
export default Checkbox;
