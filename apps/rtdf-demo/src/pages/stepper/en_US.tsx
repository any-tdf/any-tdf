import { useState } from 'react';
import { Slider, Stepper, Toast } from 'rtdf/components';
import type { StepperProps } from 'rtdf/types';

const StepperEn = () => {
	const [asyncValue1, setAsyncValue1] = useState(1);
	const [loading1, setLoading1] = useState(false);
	const [asyncValue2, setAsyncValue2] = useState(1);
	const [loading2, setLoading2] = useState(false);
	const [asyncValue3, setAsyncValue3] = useState(1);
	const [loading3, setLoading3] = useState(false);

	const radiusOptions: StepperProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const [radiusIndex, setRadiusIndex] = useState(1);
	const currentRadius = radiusOptions[radiusIndex];

	const handleChange1 = (type: 'increase' | 'decrease') => {
		setLoading1(true);
		setTimeout(() => {
			setAsyncValue1((prev) => (type === 'increase' ? prev + 1 : prev - 1));
			setLoading1(false);
		}, 2000);
	};

	const handleChange2 = (type: 'increase' | 'decrease') => {
		setLoading2(true);
		setTimeout(() => {
			setAsyncValue2((prev) => (type === 'increase' ? prev + 1 : prev - 1));
			setLoading2(false);
		}, 3000);
	};

	const handleChange3 = (type: 'increase' | 'decrease') => {
		setLoading3(true);
		setTimeout(() => {
			setAsyncValue3((prev) => (type === 'increase' ? prev + 1 : prev - 1));
			setLoading3(false);
		}, 4000);
	};

	return (
		<div>
			<div className="mx-4 mt-8 text-lg font-bold">Basic Usage</div>
			<div className="px-4 py-4">
				<Stepper />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Set Maximum / Minimum / Initial Value</div>
			<div className="px-4 py-4">
				<Stepper min={2} max={10} value={5} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Set Step</div>
			<div className="px-4 py-4">
				<Stepper step={5} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Highlight Number Area</div>
			<div className="px-4 py-4">
				<Stepper numberHighlight />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Highlight without Theme Color</div>
			<div className="flex gap-2 px-4 py-4">
				<Stepper theme={false} />
				<Stepper theme={false} numberHighlight />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Different Radius</div>
			<div className="px-4 py-2">
				<Slider
					value={radiusIndex}
					minRange={0}
					maxRange={6}
					step={1}
					showSteps
					stepLabels={radiusLabels}
					onChange={(value: number) => setRadiusIndex(value)}
				/>
			</div>
			<div className="flex flex-wrap gap-2 px-4 py-4">
				<div>
					<Stepper radius={currentRadius} />
				</div>
				<div>
					<Stepper radius={currentRadius} numberHighlight />
				</div>
				<div>
					<Stepper radius={currentRadius} theme={false} />
				</div>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Vertical</div>
			<div className="flex justify-around px-2 py-4">
				<Stepper vertical />
				<Stepper vertical numberHighlight />
				<Stepper vertical theme={false} />
				<Stepper vertical radius="none" />
				<Stepper radius="xl" vertical />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Fixed Width</div>
			<div className="space-x-8 px-2 py-4">
				<Stepper width={160} />
				<Stepper width={80} vertical />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Format Display Numbers</div>
			<div className="px-4 py-4">
				<div className="mb-2 text-sm">Keep one decimal place</div>
				<Stepper decimal={1} step={0.1} max={1} min={0.1} value={0.5} />
			</div>
			<div className="px-4 py-4">
				<div className="mb-2 text-sm">Keep four decimal places</div>
				<Stepper decimal={4} step={0.0001} max={1} min={0.0001} value={0.5} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Asynchronous Display Numbers</div>
			<div className="px-4 py-4">
				<div className="mb-2 text-sm">Toast shows asynchronous status</div>
				<Stepper
					async={loading1}
					value={asyncValue1}
					onIncrease={() => handleChange1('increase')}
					onDecrease={() => handleChange1('decrease')}
				/>
			</div>
			<Toast visible={loading1} type="loading" message="Saving..." onClose={() => setLoading1(false)} />
			<div className="mb-2 px-4 text-sm">Internal display asynchronous status</div>
			<div className="flex gap-2 px-4 py-4">
				<Stepper
					async={loading2}
					value={asyncValue2}
					asyncLoading
					onIncrease={() => handleChange2('increase')}
					onDecrease={() => handleChange2('decrease')}
				/>
				<Stepper
					async={loading3}
					value={asyncValue3}
					asyncLoading
					loading={{ type: '1_51' }}
					onIncrease={() => handleChange3('increase')}
					onDecrease={() => handleChange3('decrease')}
				/>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">No external padding</div>
			<div className="px-4 py-2">
				<Stepper padding={false} />
			</div>
			<div className="px-4 py-2">
				<Stepper padding={false} numberHighlight />
			</div>
			<div className="px-4 py-2">
				<Stepper padding={false} theme={false} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Inject Class in Different Positions</div>
			<div className="px-4 py-2">
				<Stepper theme={false} injClassOut="bg-linear-to-r from-primary to-info dark:from-dark dark:to-info" />
			</div>
			<div className="px-4 py-2">
				<Stepper injClassNum="text-primary dark:text-dark" />
			</div>
			<div className="px-4 py-2">
				<Stepper injClassBtn="rounded-full" />
			</div>
		</div>
	);
};

export default StepperEn;
