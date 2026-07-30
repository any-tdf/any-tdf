import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Tabs, Tab, TabContent, Divider, Slider } from 'rtdf/components';
import type { TabLabelProps } from 'rtdf/types';

function TabsEn() {
	const labels: TabLabelProps[] = [{ text: 'aircraft' }, { text: 'steamer' }, { text: 'train' }, { text: 'car' }];
	const radiusOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
	const labels1: TabLabelProps[] = [
		{ icon: { name: 'ri-plane-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-ship-2-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-train-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-car-line', theme: true, size: 20 } }
	];
	const labels2: TabLabelProps[] = [
		{ text: 'aircraft', icon: { name: 'ri-plane-line', theme: true, size: 16, y: -1 } },
		{ text: 'steamer', icon: { name: 'ri-ship-2-line', theme: true, size: 16, y: -1 } },
		{ text: 'train', icon: { name: 'ri-train-line', theme: true, size: 16, y: -1 } },
		{ text: 'car', icon: { name: 'ri-car-line', theme: true, size: 16, y: -1 } }
	];
	const overflowLabels: TabLabelProps[] = [
		{ text: 'aircraft' },
		{ text: 'steamer' },
		{ text: 'train' },
		{ text: 'car' },
		{ text: 'motorcycle' },
		{ text: 'bicycle' },
		{ text: 'hot air balloon' },
		{ text: 'rocket' },
		{ text: 'tractor' },
		{ text: 'subway' },
		{ text: 'bus' },
		{ text: 'skateboard' },
		{ text: 'flying saucer' }
	];

	const [changeActive, setChangeActive] = useState(0);
	const [active, setActive] = useState(2);
	const [radiusIndex, setRadiusIndex] = useState(3);
	const [customWidth, setCustomWidth] = useState(0);
	const customTransitionRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const node = customTransitionRef.current;
		if (!node) return;
		const updateWidth = () => setCustomWidth(node.clientWidth);
		updateWidth();
		const observer = new ResizeObserver(updateWidth);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	const clickTabFun = (a: number) => {
		setActive(a);
	};

	const tabsChangeFun = (a: number) => {
		setChangeActive(a);
	};

	return (
		<div className="py-8">
			<div className="px-4 text-xl font-bold">use Tabs</div>
			<div className="my-4 space-y-4">
				<div className="px-4 font-bold">Basic usage</div>
				<div className="space-y-4">
					<Tabs tab={{ labels }}>
						<TabContent>I am a plane</TabContent>
						<TabContent>I am a ship</TabContent>
						<TabContent>I am a train</TabContent>
						<TabContent>I am a car</TabContent>
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">Accelerate the transition</div>
				<div className="space-y-4">
					<Tabs duration="fast" tab={{ labels }}>
						<TabContent>I am a plane</TabContent>
						<TabContent>I am a ship</TabContent>
						<TabContent>I am a train</TabContent>
						<TabContent>I am a car</TabContent>
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">Transition mitigation</div>
				<div className="space-y-4">
					<Tabs duration="slower" tab={{ labels }}>
						<TabContent>I am a plane</TabContent>
						<TabContent>I am a ship</TabContent>
						<TabContent>I am a train</TabContent>
						<TabContent>I am a car</TabContent>
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">Use linear style</div>
				<div className="space-y-4">
					<Tabs tab={{ labels, lineType: true }}>
						<TabContent>I am a plane</TabContent>
						<TabContent>I am a ship</TabContent>
						<TabContent>I am a train</TabContent>
						<TabContent>I am a car</TabContent>
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">The TAB is located at the bottom</div>
				<div className="space-y-4">
					<Tabs tab={{ labels }} position="b">
						<TabContent>I am a plane</TabContent>
						<TabContent>I am a ship</TabContent>
						<TabContent>I am a train</TabContent>
						<TabContent>I am a car</TabContent>
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">The TAB is located on the left</div>
				<Tabs tab={{ labels }} position="l">
					{({ active }) => (
						<>
							<TabContent show={active === 0}>I am a plane</TabContent>
							<TabContent show={active === 1}>I am a ship</TabContent>
							<TabContent show={active === 2}>I am a train</TabContent>
							<TabContent show={active === 3}>I am a car</TabContent>
						</>
					)}
				</Tabs>
				<Divider />

				<div className="px-4 font-bold">The TAB is located on the right</div>
				<Tabs tab={{ labels }} position="r">
					{({ active }) => (
						<>
							<TabContent show={active === 0}>I am a plane</TabContent>
							<TabContent show={active === 1}>I am a ship</TabContent>
							<TabContent show={active === 2}>I am a train</TabContent>
							<TabContent show={active === 3}>I am a car</TabContent>
						</>
					)}
				</Tabs>
				<Divider />

				<style>{`
					@keyframes rtdf-tabs-custom-fly {
						from {
							opacity: 0;
							transform: translate3d(var(--rtdf-tabs-custom-x), -80px, 0);
						}
						to {
							opacity: 1;
							transform: translate3d(0, 0, 0);
						}
					}
				`}</style>
				<div ref={customTransitionRef} className="px-4 font-bold">
					Custom transition
				</div>
				<div className="space-y-4">
					<Tabs tab={{ labels }} transition={false}>
						{({ active }) => (
							<div className="relative py-8">
								{labels.map((item, index) =>
									active === index ? (
										<div
											key={item.text}
											className="absolute"
											style={
												{
													'--rtdf-tabs-custom-x': `${(customWidth / 4) * index}px`,
													animation: 'rtdf-tabs-custom-fly 1000ms cubic-bezier(0.16, 1, 0.3, 1) both'
												} as CSSProperties
											}
										>
											I am {item.text}
										</div>
									) : null
								)}
							</div>
						)}
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">monitor change event</div>
				<div className="space-y-4">
					<Tabs tab={{ labels }} onChange={tabsChangeFun}>
						<TabContent>I am a plane</TabContent>
						<TabContent>I am a ship</TabContent>
						<TabContent>I am a train</TabContent>
						<TabContent>I am a car</TabContent>
					</Tabs>
				</div>
				<div className="mt-4">At present Tabs activated active: {changeActive}</div>
				<Divider />

				<div className="px-4 font-bold">Overflow mode</div>
				<div className="space-y-4">
					<Tabs tab={{ labels: overflowLabels, overflow: true }}>
						{overflowLabels.map((item) => (
							<TabContent key={item.text}>I am {item.text}</TabContent>
						))}
					</Tabs>
				</div>
				<div className="space-y-4">
					<Tabs tab={{ labels: overflowLabels, overflow: true, lineType: true }}>
						{overflowLabels.map((item) => (
							<TabContent key={item.text}>I am {item.text}</TabContent>
						))}
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">Overflow mode closes automatic scrolling</div>
				<div className="space-y-4">
					<Tabs tab={{ labels: overflowLabels, overflow: true, autoScroll: false }}>
						{overflowLabels.map((item) => (
							<TabContent key={item.text}>I am {item.text}</TabContent>
						))}
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">Overflow mode shows 2 items</div>
				<div className="space-y-4">
					<Tabs tab={{ labels: overflowLabels, overflow: true, showNum: 2 }}>
						{overflowLabels.map((item) => (
							<TabContent key={item.text}>I am {item.text}</TabContent>
						))}
					</Tabs>
				</div>
			</div>
			<Divider />

			<div className="mt-8 px-4 text-xl font-bold">different Tab style</div>
			<div className="mt-4 flex flex-col space-y-2">
				<div className="px-4 font-bold">Different fillet</div>
				<div className="px-4 text-xs text-gray-500">Current radius: {radiusOptions[radiusIndex]}</div>
				<div className="px-4">
					<Slider
						value={radiusIndex}
						minRange={0}
						maxRange={7}
						step={1}
						showSteps
						stepLabels={[...radiusOptions]}
						onChange={(value: number) => setRadiusIndex(value)}
					/>
				</div>
				<Tab labels={labels} radius={radiusOptions[radiusIndex]} />
				<Tab labels={labels} radius={radiusOptions[radiusIndex]} lineType />

				<div className="px-4 font-bold">Match text with ICONS</div>
				<Tab labels={labels} />
				<Tab labels={labels1} />
				<Tab labels={labels2} />

				<div className="px-4 font-bold">Care edition</div>
				<Tab labels={labels} love />

				<div className="px-4 font-bold">Linear style</div>
				<Tab labels={labels} lineType />
				<Tab labels={labels2} lineType />

				<div className="px-4 font-bold">customize Tab Outer style</div>
				<Tab labels={labels} injClass="rtdf-demo-gradient-soft-y" />

				<div className="px-4 font-bold">customize Tab style</div>
				<Tab labels={labels} tabInjClass="underline text-primary decoration-primary dark:text-dark dark:decoration-dark" />

				<div className="px-4 font-bold">Custom selection Tab style</div>
				<Tab labels={labels} activeTabInjClass="text-primary dark:text-dark !text-base transition-all" />

				<div className="px-4 font-bold">Customize the indicator style</div>
				<Tab labels={labels} activeInjClass="rtdf-demo-gradient-primary-y" activeTabInjClass="text-white" />
				<Tab labels={labels} lineType activeInjClass="rtdf-demo-gradient-primary" />

				<div className="px-4 font-bold">Different mx</div>
				<div className="mt-4 flex flex-col space-y-2">
					<Tab labels={labels} mx="12" />
					<Tab labels={labels} lineType mx="12" />
					<Tab labels={labels} mx="0" />
					<Tab labels={labels} lineType mx="0" />
				</div>
			</div>
			<Divider />

			<div className="my-8 px-4 text-xl font-bold">Use alone Tab</div>
			<div className="my-4">
				<Tab labels={labels} active={active} onClickTab={clickTabFun} />
				<div className="mt-4">At present Tab clickable active:{active}</div>
			</div>
			<Divider />
		</div>
	);
}

export default TabsEn;
