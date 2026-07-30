import { useState } from 'react';
import { ButtonGroup, Progress } from 'rtdf/components';

const ProgressEn = () => {
	const [percent, setPercent] = useState(20);

	const changePercentFun = (type: string) => {
		if (type === '+10') {
			setPercent((prev) => (prev >= 100 ? 100 : prev + 10));
		} else {
			setPercent((prev) => (prev <= 0 ? 0 : prev - 10));
		}
	};

	return (
		<div className="px-4 pb-8">
			<div className="m-4 mt-8 text-lg font-bold">Basic usage</div>
			<Progress />

			<div className="m-4 mt-8 text-lg font-bold">Different heights</div>
			<div className="flex flex-col space-y-4">
				<Progress height="1" />
				<Progress height="2" />
				<Progress height="3" />
				<Progress height="4" />
			</div>

			<div className="m-4 mt-8 text-lg font-bold">Percentage different position</div>
			<div className="flex flex-col space-y-4">
				<Progress />
				<Progress percentPosition="inner" />
				<Progress percentPosition="block" />
				<Progress percentPosition={null} />
			</div>

			<div className="m-4 mt-8 text-lg font-bold">Different styles of rounded corners</div>
			<div className="flex flex-col space-y-4">
				<Progress radius="none" />
				<Progress radius="md" />
				<Progress radius="none" percentPosition="block" />
				<Progress radius="md" percentPosition="block" />
				<Progress percentPosition="block" />
			</div>

			<div className="m-4 mt-8 text-lg font-bold">Inactive</div>
			<div className="flex flex-col space-y-4">
				<Progress inactive />
				<Progress inactive percentPosition="block" />
			</div>

			<div className="m-4 mt-8 text-lg font-bold">Transition effect</div>
			<div className="mb-4 flex flex-col space-y-4 px-2">
				<Progress percent={percent} />
				<Progress percent={percent} percentPosition="inner" />
				<Progress percent={percent} percentPosition="block" />
				<Progress percent={percent} duration="500" />
				<Progress percent={percent} duration="1000" />
			</div>
			<ButtonGroup heightIn="0" size="full">
				<div className="flex w-full">
					<button
						type="button"
						className="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black"
						onClick={() => changePercentFun('-10')}
					>
						-10
					</button>
					<button
						type="button"
						className="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black"
						onClick={() => changePercentFun('+10')}
					>
						+10
					</button>
					<button type="button" className="flex-1 py-2 active:opacity-80" onClick={() => setPercent(20)}>
						Reset
					</button>
				</div>
			</ButtonGroup>

			<div className="m-4 mt-8 text-lg font-bold">Custom color</div>
			<div className="flex flex-col space-y-4">
				<Progress injClass="bg-success dark:bg-error" />
				<Progress injClass="bg-linear-to-r from-primary to-info dark:from-dark dark:to-info" />
				<Progress percentPosition="block" injClass="bg-warning dark:bg-info" />
				<Progress trackInjClass="!bg-primary/20 dark:!bg-dark/20" />
			</div>

			<div className="m-4 mt-8 text-lg font-bold">Custom text</div>
			<div className="flex flex-col space-y-4">
				<Progress>
					<div className="whitespace-nowrap text-xs">completed 2/3</div>
				</Progress>
				<Progress percentPosition="block">
					<div className="whitespace-nowrap text-xs">completed 2/3</div>
				</Progress>
			</div>
		</div>
	);
};

export default ProgressEn;
