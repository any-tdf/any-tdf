import { useState } from 'react';
import { Cell, Dialog, Icon, Switch } from 'rtdf/components';

const SwitchEn = () => {
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
	const [confirmSwitchActive, setConfirmSwitchActive] = useState(false);

	return (
		<div className="pb-8">
			<div className="flex flex-col space-y-8 px-4 py-8">
				<div>
					<div className="mb-4 font-bold">Different Radius</div>
					<div className="flex justify-between">
						<Switch />
						<Switch radius="none" />
						<Switch radius="full" />
					</div>
				</div>
				<div>
					<div className="mb-4 font-bold">Different Colors</div>
					<div className="flex justify-between">
						<Switch active injClass="bg-success dark:bg-success" />
						<Switch active injClass="bg-error dark:bg-error" />
						<Switch active injClass="bg-warning dark:bg-warning" />
						<Switch active injClass="rtdf-demo-switch-bg" />
					</div>
				</div>
				<div>
					<div className="mb-4 font-bold">With Text / State / Icon</div>
					<div className="flex justify-between">
						<Switch inside={['OF', 'ON']} />
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
					<div className="mb-4 font-bold">Disabled</div>
					<div className="flex justify-between">
						<Switch disabled />
						<Switch disabled active />
					</div>
				</div>
				<div>
					<div className="mb-4 font-bold">Async Control</div>
					<div className="flex justify-between">
						<div className="flex flex-col items-center space-y-2">
							<Switch async active={checkAsync} onClick={switchClickFun} />
							<div className="text-sm">Wait 2 seconds</div>
						</div>
						<div className="flex flex-col items-center space-y-2">
							<Switch async active={loadingCheck} loading={{ theme: true }} onClick={loadingFun} inside={loading ? 'loading' : undefined} />
							<div className="text-sm">Wait 3 seconds</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-4 px-4 font-bold">Used in Cell</div>
			<Cell title="Switch" detail="Click row to toggle" right={{ type: 'switch' }} />
			<Cell title="Switch with Text" right={{ type: 'switch', switch: { inside: ['😭', '😄'] } }} switchActive />
			<Cell title="Full Radius Switch" right={{ type: 'switch', switch: { radius: 'full' } }} />
			<Cell
				title="Async Control"
				detail="Toggles after 2s"
				right={{ type: 'switch', switch: { async: true } }}
				switchActive={cellCheck}
				onClick={cellAsyncFun}
			/>
			<Cell
				title="Async Loading"
				detail="Toggles after 3s"
				right={{ type: 'switch', switch: { async: true, inside: cellLoading ? 'loading' : undefined } }}
				switchActive={cellLoadingCheck}
				onClick={cellLoadingFun}
			/>
			<Cell title="Disabled Switch" right={{ type: 'switch', switch: { disabled: true } }} switchActive />

			<Cell
				title="Double Confirmation"
				right={{ type: 'switch', switch: { async: true } }}
				switchActive={confirmSwitchActive}
				onClick={() => setVisible(true)}
			/>
			<Dialog
				visible={visible}
				content={`Are you sure you want to ${confirmSwitchActive ? 'turn off' : 'turn on'}?`}
				onPrimary={() => {
					setVisible(false);
					setConfirmSwitchActive(!confirmSwitchActive);
				}}
				onClose={() => setVisible(false)}
			/>
		</div>
	);
};

export default SwitchEn;
