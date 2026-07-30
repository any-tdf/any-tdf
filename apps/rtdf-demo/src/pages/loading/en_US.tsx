import { Fragment, useState } from 'react';
import { Button, Loading, TabContent, Tabs } from 'rtdf/components';

const LoadingEn = () => {
	const [speed, setSpeed] = useState(1);
	const speedBtns = [0.5, 1, 2];

	const randomColorArr = (num: number) => {
		const randomColor = () => `#${`00000${((Math.random() * 0x1000000) << 0).toString(16)}`.slice(-6)}`;
		const arr: string[] = [];
		for (let i = 0; i < num; i += 1) {
			arr.push(randomColor());
		}
		return arr;
	};

	const arr1 = Array.from({ length: 54 });
	const arr2 = Array.from({ length: 6 });
	const arr4 = Array.from({ length: 4 });
	const labels = [{ text: 'One color' }, { text: 'Two color' }, { text: 'Four color' }, { text: 'Other' }];

	return (
		<>
			<div className="py-4">
				<Tabs tab={{ labels }}>
					<TabContent>
						<div className="py-4">
							<div className="flex text-center text-sm font-bold">
								{['Default', 'Theme', 'Custom', 'Inverse', 'Inv theme'].map((item) => (
									<div key={item} className="flex-1 border border-black/5 py-2 dark:border-white/5">
										{item}
									</div>
								))}
							</div>
							<div className="grid grid-cols-5">
								{arr1.map((_, i) => (
									<Fragment key={`loading-1-${i}`}>
										<div className="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
											<div className="h-8 w-8">
												<Loading type={`1_${i}`} speed={speed} />
											</div>
											<div className="mt-8 text-center text-xs">{`1_${i}`}</div>
										</div>
										<div className="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
											<div className="h-8 w-8">
												<Loading type={`1_${i}`} theme speed={speed} />
											</div>
											<div className="mt-8 text-center text-xs">{`1_${i}`}</div>
										</div>
										<div className="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
											<div className="h-8 w-8">
												<Loading type={`1_${i}`} theme customColor={randomColorArr(1)} speed={speed} />
											</div>
											<div className="mt-8 text-center text-xs">{`1_${i}`}</div>
										</div>
										<div className="bg-bg-base-dark dark:bg-bg-base flex w-full flex-col items-center border border-white/5 py-6 text-white dark:border-black/5 dark:text-black">
											<div className="h-8 w-8">
												<Loading type={`1_${i}`} inverse speed={speed} />
											</div>
											<div className="mt-8 text-center text-xs">{`1_${i}`}</div>
										</div>
										<div className="bg-bg-base-dark dark:bg-bg-base flex w-full flex-col items-center border border-white/5 py-6 text-white dark:border-black/5 dark:text-black">
											<div className="h-8 w-8">
												<Loading type={`1_${i}`} theme inverse speed={speed} />
											</div>
											<div className="mt-8 text-center text-xs">{`1_${i}`}</div>
										</div>
									</Fragment>
								))}
							</div>
						</div>
						<div className="p-4 text-xs">Continually updated...</div>
					</TabContent>
					<TabContent>
						<div className="py-4">
							<div className="flex text-center text-sm font-bold">
								{['Default', 'Custom', 'Inverse'].map((item) => (
									<div key={item} className="flex-1 border border-black/5 py-2 dark:border-white/5">
										{item}
									</div>
								))}
							</div>
							<div className="grid grid-cols-3">
								{arr2.map((_, i) => (
									<Fragment key={`loading-2-${i}`}>
										<div className="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
											<div className="h-8 w-8">
												<Loading type={`2_${i}`} speed={speed} />
											</div>
											<div className="mt-8 text-center text-xs">{`2_${i}`}</div>
										</div>
										<div className="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
											<div className="h-8 w-8">
												<Loading type={`2_${i}`} customColor={randomColorArr(2)} speed={speed} />
											</div>
											<div className="mt-8 text-center text-xs">{`2_${i}`}</div>
										</div>
										<div className="bg-bg-base-dark dark:bg-bg-base flex w-full flex-col items-center border border-white/5 py-6 text-white dark:border-black/5 dark:text-black">
											<div className="h-8 w-8">
												<Loading type={`2_${i}`} inverse speed={speed} />
											</div>
											<div className="mt-8 text-center text-xs">{`2_${i}`}</div>
										</div>
									</Fragment>
								))}
							</div>
						</div>
						<div className="p-4 text-xs">Continually updated...</div>
					</TabContent>
					<TabContent>
						<div className="py-4">
							<div className="flex text-center text-sm font-bold">
								{['Default', 'Custom', 'Default', 'Custom'].map((item, index) => (
									<div key={`${item}-${index}`} className="flex-1 border border-black/5 py-2 dark:border-white/5">
										{item}
									</div>
								))}
							</div>
							<div className="grid grid-cols-4">
								{arr4.map((_, i) => (
									<Fragment key={`loading-4-${i}`}>
										<div className="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
											<div className="h-8 w-8">
												<Loading type={`4_${i}`} speed={speed} />
											</div>
											<div className="mt-8 text-center text-xs">{`4_${i}`}</div>
										</div>
										<div className="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
											<div className="h-8 w-8">
												<Loading type={`4_${i}`} customColor={randomColorArr(4)} speed={speed} />
											</div>
											<div className="mt-8 text-center text-xs">{`4_${i}`}</div>
										</div>
									</Fragment>
								))}
							</div>
						</div>
						<div className="p-4 text-xs">Continually updated...</div>
					</TabContent>
					<TabContent>
						<div className="py-4" />
						<div className="p-4 text-xs">Continually updated...</div>
					</TabContent>
				</Tabs>
			</div>
			<div className="sticky bottom-0 left-0 z-10 flex w-full justify-between gap-3 bg-white/60 px-2 backdrop-blur-sm dark:bg-black/60">
				{speedBtns.map((item) => (
					<div key={item} className="flex-1">
						<Button fill={speed === item ? 'base' : 'lineState'} size="full" injClass="text-xs px-2" onClick={() => setSpeed(item)}>
							{item}x speed
						</Button>
					</div>
				))}
			</div>
		</>
	);
};

export default LoadingEn;
