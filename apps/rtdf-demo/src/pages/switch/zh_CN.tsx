import { useState } from 'react';
import { Switch, Icon, Cell, Dialog } from 'rtdf/components';

function SwitchZh() {
	const [checkAsync, setCheckAsync] = useState(false);
	const switchClickFun = () => {
		setTimeout(() => {
			setCheckAsync(!checkAsync);
		}, 2000);
	};

	const [cellCheck, setCellCheck] = useState(false);
	const cellAsyncFun = () => {
		setTimeout(() => {
			setCellCheck(!cellCheck);
		}, 2000);
	};

	const [loading, setLoading] = useState(false);
	const [loadingCheck, setLoadingCheck] = useState(false);
	const loadingFun = () => {
		setLoading(true);
		setTimeout(() => {
			setLoadingCheck(!loadingCheck);
			setLoading(false);
		}, 3000);
	};

	const [cellLoading, setCellLoading] = useState(false);
	const [cellLoadingCheck, setCellLoadingCheck] = useState(false);
	const cellLoadingFun = () => {
		setCellLoading(true);
		setTimeout(() => {
			setCellLoadingCheck(!cellLoadingCheck);
			setCellLoading(false);
		}, 3000);
	};

	const [visible, setVisible] = useState(false);
	const [confirmswitchActive, setConfirmswitchActive] = useState(false);

	return (
		<div className="pb-8">
			<div className="flex flex-col space-y-8 px-4 py-8">
				<div>
					<div className="mb-4 font-bold">不同圆角</div>
					<div className="flex justify-between">
						<Switch />
						<Switch radius="none" />
						<Switch radius="full" />
					</div>
				</div>
				<div>
					<div className="mb-4 font-bold">不同颜色</div>
					<div className="flex justify-between">
						<Switch active injClass="bg-success dark:bg-success" />
						<Switch active injClass="bg-error dark:bg-error" />
						<Switch active injClass="bg-warning dark:bg-warning" />
						<Switch active injClass="rtdf-demo-switch-bg" />
					</div>
				</div>
				<div>
					<div className="mb-4 font-bold">带文字 / 状态 / 图标</div>
					<div className="flex justify-between">
						<Switch inside={['关', '开']} />
						<Switch inside={['😭', '😄']} />
						<Switch inside="state" />
						<Switch
							falseChild={
								<div>
									<Icon name="ri-moon-line" size={16} y={-1} />
								</div>
							}
							trueChild={
								<div>
									<Icon name="ri-sun-line" size={16} y={-1} />
								</div>
							}
						/>
					</div>
				</div>
				<div>
					<div className="mb-4 font-bold">禁用</div>
					<div className="flex justify-between">
						<Switch disabled />
						<Switch disabled active />
					</div>
				</div>
				<div>
					<div className="mb-4 font-bold">异步控制</div>
					<div className="flex justify-between">
						<div className="flex flex-col items-center space-y-2">
							<Switch async active={checkAsync} onClick={switchClickFun} />
							<div className="text-sm">点击 2 秒后触发</div>
						</div>
						<div className="flex flex-col items-center space-y-2">
							<Switch async active={loadingCheck} loading={{ theme: true }} onClick={loadingFun} inside={loading ? 'loading' : undefined} />
							<div className="text-sm">点击 3 秒后触发</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-4 px-4 font-bold">Cell 中使用</div>
			<Cell title="开关" detail="点击整行皆可触发开关" right={{ type: 'switch' }} />
			<Cell title="开关带文字" right={{ type: 'switch', switch: { inside: ['😭', '😄'] } }} switchActive />
			<Cell title="开关全圆角" right={{ type: 'switch', switch: { radius: 'full' } }} />
			<Cell
				title="异步控制"
				detail="点击 2 秒后触发开关"
				right={{ type: 'switch', switch: { async: true } }}
				switchActive={cellCheck}
				onClick={cellAsyncFun}
			/>
			<Cell
				title="异步加载"
				detail="点击 3 秒后触发开关"
				right={{ type: 'switch', switch: { async: true, inside: cellLoading ? 'loading' : undefined } }}
				switchActive={cellLoadingCheck}
				onClick={cellLoadingFun}
			/>
			<Cell title="禁用开关" right={{ type: 'switch', switch: { disabled: true } }} switchActive />

			<Cell
				title="二次确认"
				right={{ type: 'switch', switch: { async: true } }}
				switchActive={confirmswitchActive}
				onClick={() => setVisible(true)}
			/>
			<Dialog
				visible={visible}
				content={`确定${confirmswitchActive ? '关闭' : '开启'}吗？`}
				onPrimary={() => {
					setVisible(false);
					setConfirmswitchActive(!confirmswitchActive);
				}}
				onClose={() => setVisible(false)}
			/>
		</div>
	);
}

export default SwitchZh;
