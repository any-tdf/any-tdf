import { useState, useEffect } from 'react';
import Loading from '../loading';
import type { SwitchProps } from '../../types';
import {
	resolveSwitchActiveSyncAction,
	resolveSwitchClickAction,
	resolveSwitchDerived,
	resolveSwitchStateOptions,
	resolveSwitchStretchFlow
} from '@any-tdf/common/derived/switch';

const Switch: React.FC<SwitchProps> = ({
	active: propActive = false,
	radius = '',
	inside = null,
	injClass = '',
	disabled = false,
	async = false,
	loading = {},
	trueChild,
	falseChild,
	onChange,
	onClick
}) => {
	const [active, setActive] = useState(propActive);
	const [isLong, setIsLong] = useState(false);

	// 公共派生层只处理 Switch 的 class 字符串、滑块样式和下一状态，事件与 children 留在组件内。
	// Shared derived layer only handles Switch class strings, thumb styles and next state; events and children stay in the component.
	const switchState = resolveSwitchDerived(
		resolveSwitchStateOptions({
			props: { disabled, radius, injClass, inside },
			active,
			isLong,
			hasTrueChild: Boolean(trueChild),
			hasFalseChild: Boolean(falseChild)
		})
	);

	const setChangeFun = () => {
		// 公共动作函数只返回更新和事件触发决策，组件层负责状态写入。
		// Shared action function only returns update and event decisions; the component writes state.
		const action = resolveSwitchClickAction({ active, disabled, async });
		if (action.shouldChange) {
			setActive(action.nextActive);
			onChange?.(action.nextActive);
		}
		if (action.shouldClick) onClick?.();
	};

	useEffect(() => {
		// 公共 action 只返回是否同步内部 active，状态写入留在组件层。
		// Shared action only returns whether to sync internal active; state writes stay in the component layer.
		const action = resolveSwitchActiveSyncAction({ active: propActive, disabled });
		if (action.shouldSync) setActive(action.nextActive);
	}, [propActive, disabled]);

	useEffect(() => {
		// 公共 action 只返回拉伸反馈决策，计时器生命周期留在组件层。
		// Shared action only returns stretch feedback decisions; timer lifecycle stays in the component layer.
		const flow = resolveSwitchStretchFlow({ disabled });
		if (flow.shouldStretch) {
			setIsLong(flow.nextIsLong);
			const timer = setTimeout(() => {
				setIsLong(flow.resetNextIsLong);
			}, flow.resetDelay);
			return () => clearTimeout(timer);
		}
	}, [active, disabled]);

	const renderInside = () => {
		if (switchState.insideState.kind === 'state') {
			return (
				<>
					{switchState.insideState.active ? (
						<div className={switchState.stateTrueMarkClass} />
					) : (
						<div className={switchState.stateFalseMarkClass} />
					)}
				</>
			);
		}

		if (switchState.insideState.kind === 'loading') {
			return (
				<div className={switchState.loadingClass}>
					<Loading width="full" height="full" {...loading} />
				</div>
			);
		}

		if (switchState.insideState.kind === 'children') {
			return (
				<>
					<span className={switchState.insideState.trueClass}>{trueChild}</span>
					<span className={switchState.insideState.falseClass}>{falseChild}</span>
				</>
			);
		}

		if (switchState.insideState.kind === 'array') return switchState.insideState.value;

		return null;
	};

	return (
		<button type="button" onClick={setChangeFun} disabled={disabled} className={switchState.rootClass}>
			<div className={switchState.thumbClass} style={switchState.thumbStyle}>
				{renderInside()}
			</div>
		</button>
	);
};

export type { SwitchProps } from '../../types';
export default Switch;
