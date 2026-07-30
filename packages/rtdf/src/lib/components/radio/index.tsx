import { useEffect, useState } from 'react';
import RadioItem from './RadioItem';
import type { RadioProps } from '../../types';
import {
	resolveRadioClickAction,
	resolveRadioDerived,
	resolveRadioInitialValue,
	resolveRadioStateOptions
} from '@any-tdf/common/derived/radio';

const Radio: React.FC<RadioProps> = (props) => {
	const { data = [], value, layout = 'v', textPosition = 'r', icon = 'default', iconChecked = 'default', radioChild, onChange } = props;
	const safeValue = resolveRadioInitialValue(value);
	const [internalValue, setInternalValue] = useState<string>(safeValue);
	const currentValue = internalValue;
	// 公共派生层只处理选中态和布局 class，状态写入与事件留在组件层。
	// Shared derivation only handles checked state and layout classes; state writes and events stay in the component layer.
	const radioState = resolveRadioDerived(
		resolveRadioStateOptions({
			props: { data, layout },
			value: currentValue
		})
	);

	useEffect(() => {
		setInternalValue(safeValue);
	}, [safeValue]);

	const clickItemFn = (name: string) => {
		// 公共动作函数只返回下一选中值，组件层负责状态写入和事件触发。
		// Shared action function only returns the next selected value; the component writes state and fires events.
		const action = resolveRadioClickAction({ name });
		setInternalValue(action.nextValue);
		if (action.shouldEmit) onChange?.(action.nextValue);
	};

	return (
		<div className={radioState.groupClass}>
			{radioState.itemStates.map(({ item, checked }) =>
				typeof radioChild === 'function' ? (
					<div key={item.name}>{radioChild({ item })}</div>
				) : radioChild ? (
					<div key={item.name}>{radioChild}</div>
				) : (
					<RadioItem
						key={item.name}
						layout={layout}
						{...item}
						textPosition={textPosition}
						icon={icon}
						iconChecked={iconChecked}
						checked={checked}
						onClick={() => clickItemFn(item.name)}
					>
						{item.label}
					</RadioItem>
				)
			)}
		</div>
	);
};

export type { RadioProps } from '../../types';
export default Radio;
