import { useEffect, useState } from 'react';
import Loading from '../loading';
import type { StepperProps } from '../../types';
import { SvgIcon } from '../utils/SvgIcon';
import {
	resolveStepperDerived,
	resolveStepperInitialValue,
	resolveStepperStateOptions,
	resolveStepperStepAction
} from '@any-tdf/common/derived/stepper';
import { minusSvg, plusSvg } from '@any-tdf/common/svg/common';

const Stepper: React.FC<StepperProps> = ({
	value: propValue = 10,
	min = 0,
	max = 100,
	step = 1,
	vertical = false,
	numberHighlight = false,
	theme = true,
	radius = '',
	decimal = 0,
	async = false,
	asyncLoading = false,
	loading = {},
	padding = true,
	width = 0,
	injClassOut = '',
	injClassBtn = '',
	injClassNum = '',
	onChange,
	onDecrease,
	onIncrease
}) => {
	const [value, setValue] = useState(resolveStepperInitialValue(propValue));

	useEffect(() => {
		setValue(resolveStepperInitialValue(propValue));
	}, [propValue]);

	// 公共派生只处理纯 class、数值和禁用态，事件与状态更新留在组件层。
	// Shared derivation only handles pure classes, values and disabled state; events and state updates stay in the component layer.
	const stepperState = resolveStepperDerived(
		resolveStepperStateOptions({
			value,
			props: {
				min,
				max,
				async,
				vertical,
				numberHighlight,
				theme,
				radius,
				decimal,
				padding,
				width,
				injClassOut,
				injClassBtn,
				injClassNum
			}
		})
	);

	// 减少
	// Decrease
	const decreaseFn = () => {
		// 公共动作函数只返回下一值和是否变更，事件仍由组件派发。
		// Shared action function only returns the next value and change decision; events are still dispatched by the component.
		const action = resolveStepperStepAction({ type: 'decrease', value, min, step, async });
		if (action.shouldChange) {
			setValue(action.nextValue);
			onChange?.(action.nextValue);
		}
		onDecrease?.();
	};

	// 增加
	// Increase
	const increaseFn = () => {
		// 公共动作函数只返回下一值和是否变更，事件仍由组件派发。
		// Shared action function only returns the next value and change decision; events are still dispatched by the component.
		const action = resolveStepperStepAction({ type: 'increase', value, max, step, async });
		if (action.shouldChange) {
			setValue(action.nextValue);
			onChange?.(action.nextValue);
		}
		onIncrease?.();
	};

	return (
		<div className={stepperState.rootClass}>
			<button
				type="button"
				onClick={decreaseFn}
				className={stepperState.buttonClass}
				disabled={stepperState.decreaseDisabled}
				aria-label="decrease"
			>
				<span className={stepperState.decreaseIconClass}>
					{/* 公共 SVG 数据在 common，点击和 disabled 绑定留在组件层。 */}
					{/* Shared SVG data lives in common; click and disabled bindings stay in the component layer. */}
					<SvgIcon svg={minusSvg} width={24} height={24} className={stepperState.iconClass} />
				</span>
			</button>

			{async && asyncLoading ? (
				<div className={stepperState.loadingClass}>
					<Loading width="6" height="6" {...loading} />
				</div>
			) : (
				<div className={stepperState.numberClass} style={stepperState.numberStyleValue}>
					{stepperState.displayValue}
				</div>
			)}

			<button
				type="button"
				onClick={increaseFn}
				className={stepperState.buttonClass}
				aria-label="increase"
				disabled={stepperState.increaseDisabled}
			>
				<span className={stepperState.increaseIconClass}>
					<SvgIcon svg={plusSvg} width={24} height={24} className={stepperState.iconClass} />
				</span>
			</button>
		</div>
	);
};

export type { StepperProps } from '../../types';
export default Stepper;
