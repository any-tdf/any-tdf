import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Tabs, Tab, TabContent, Divider, Slider } from 'rtdf/components';
import type { TabLabelProps } from 'rtdf/types';

function TabsZh() {
	const labels: TabLabelProps[] = [{ text: '飞机' }, { text: '轮船' }, { text: '火车' }, { text: '汽车' }];
	const radiusOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
	const labels1: TabLabelProps[] = [
		{ icon: { name: 'ri-plane-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-ship-2-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-train-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-car-line', theme: true, size: 20 } }
	];
	const labels2: TabLabelProps[] = [
		{ text: '飞机', icon: { name: 'ri-plane-line', theme: true, size: 16, y: -1 } },
		{ text: '轮船', icon: { name: 'ri-ship-2-line', theme: true, size: 16, y: -1 } },
		{ text: '火车', icon: { name: 'ri-train-line', theme: true, size: 16, y: -1 } },
		{ text: '汽车', icon: { name: 'ri-car-line', theme: true, size: 16, y: -1 } }
	];
	const overflowLabels: TabLabelProps[] = [
		{ text: '飞机' },
		{ text: '轮船' },
		{ text: '火车' },
		{ text: '汽车' },
		{ text: '摩托车' },
		{ text: '自行车' },
		{ text: '热气球' },
		{ text: '火箭' },
		{ text: '拖拉机' },
		{ text: '地铁' },
		{ text: '公交车' },
		{ text: '滑板' },
		{ text: '飞碟' }
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
			<div className="px-4 text-xl font-bold">使用 Tabs</div>
			<div className="my-4 space-y-4">
				<div className="px-4 font-bold">基础用法</div>
				<div className="space-y-4">
					<Tabs tab={{ labels }}>
						<TabContent>我是飞机</TabContent>
						<TabContent>我是轮船</TabContent>
						<TabContent>我是火车</TabContent>
						<TabContent>我是汽车</TabContent>
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">加快过渡</div>
				<div className="space-y-4">
					<Tabs duration="fast" tab={{ labels }}>
						<TabContent>我是飞机</TabContent>
						<TabContent>我是轮船</TabContent>
						<TabContent>我是火车</TabContent>
						<TabContent>我是汽车</TabContent>
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">减缓过渡</div>
				<div className="space-y-4">
					<Tabs duration="slower" tab={{ labels }}>
						<TabContent>我是飞机</TabContent>
						<TabContent>我是轮船</TabContent>
						<TabContent>我是火车</TabContent>
						<TabContent>我是汽车</TabContent>
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">使用线性风格</div>
				<div className="space-y-4">
					<Tabs tab={{ labels, lineType: true }}>
						<TabContent>我是飞机</TabContent>
						<TabContent>我是轮船</TabContent>
						<TabContent>我是火车</TabContent>
						<TabContent>我是汽车</TabContent>
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">选项卡位于底部</div>
				<div className="space-y-4">
					<Tabs tab={{ labels }} position="b">
						<TabContent>我是飞机</TabContent>
						<TabContent>我是轮船</TabContent>
						<TabContent>我是火车</TabContent>
						<TabContent>我是汽车</TabContent>
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">选项卡位于左侧</div>
				<Tabs tab={{ labels }} position="l">
					{({ active }) => (
						<>
							<TabContent show={active === 0}>我是飞机</TabContent>
							<TabContent show={active === 1}>我是轮船</TabContent>
							<TabContent show={active === 2}>我是火车</TabContent>
							<TabContent show={active === 3}>我是汽车</TabContent>
						</>
					)}
				</Tabs>
				<Divider />

				<div className="px-4 font-bold">选项卡位于右侧</div>
				<Tabs tab={{ labels }} position="r">
					{({ active }) => (
						<>
							<TabContent show={active === 0}>我是飞机</TabContent>
							<TabContent show={active === 1}>我是轮船</TabContent>
							<TabContent show={active === 2}>我是火车</TabContent>
							<TabContent show={active === 3}>我是汽车</TabContent>
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
					自定义过渡
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
											我是{item.text}
										</div>
									) : null
								)}
							</div>
						)}
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">监听 change 事件</div>
				<div className="space-y-4">
					<Tabs tab={{ labels }} onChange={tabsChangeFun}>
						<TabContent>我是飞机</TabContent>
						<TabContent>我是轮船</TabContent>
						<TabContent>我是火车</TabContent>
						<TabContent>我是汽车</TabContent>
					</Tabs>
				</div>
				<div className="mt-4">当前 Tabs 激活的 active：{changeActive}</div>
				<Divider />

				<div className="px-4 font-bold">溢出模式</div>
				<div className="space-y-4">
					<Tabs tab={{ labels: overflowLabels, overflow: true }}>
						{overflowLabels.map((item) => (
							<TabContent key={item.text}>我是{item.text}</TabContent>
						))}
					</Tabs>
				</div>
				<div className="space-y-4">
					<Tabs tab={{ labels: overflowLabels, overflow: true, lineType: true }}>
						{overflowLabels.map((item) => (
							<TabContent key={item.text}>我是{item.text}</TabContent>
						))}
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">溢出模式关闭自动滚动</div>
				<div className="space-y-4">
					<Tabs tab={{ labels: overflowLabels, overflow: true, autoScroll: false }}>
						{overflowLabels.map((item) => (
							<TabContent key={item.text}>我是{item.text}</TabContent>
						))}
					</Tabs>
				</div>
				<Divider />

				<div className="px-4 font-bold">溢出模式完整显示 2 项</div>
				<div className="space-y-4">
					<Tabs tab={{ labels: overflowLabels, overflow: true, showNum: 2 }}>
						{overflowLabels.map((item) => (
							<TabContent key={item.text}>我是{item.text}</TabContent>
						))}
					</Tabs>
				</div>
			</div>
			<Divider />

			<div className="mt-8 px-4 text-xl font-bold">不同的 Tab 风格</div>
			<div className="mt-4 flex flex-col space-y-2">
				<div className="px-4 font-bold">不同圆角</div>
				<div className="px-4 text-xs text-gray-500">当前圆角：{radiusOptions[radiusIndex]}</div>
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

				<div className="px-4 font-bold">文字与图标搭配</div>
				<Tab labels={labels} />
				<Tab labels={labels1} />
				<Tab labels={labels2} />

				<div className="px-4 font-bold">关爱版</div>
				<Tab labels={labels} love />

				<div className="px-4 font-bold">线性风格</div>
				<Tab labels={labels} lineType />
				<Tab labels={labels2} lineType />

				<div className="px-4 font-bold">自定义 Tab 外层风格</div>
				<Tab labels={labels} injClass="rtdf-demo-gradient-soft-y" />

				<div className="px-4 font-bold">自定义 Tab 风格</div>
				<Tab labels={labels} tabInjClass="underline text-primary decoration-primary dark:text-dark dark:decoration-dark" />

				<div className="px-4 font-bold">自定义选定 Tab 风格</div>
				<Tab labels={labels} activeTabInjClass="text-primary dark:text-dark !text-base transition-all" />

				<div className="px-4 font-bold">自定义指示器风格</div>
				<Tab labels={labels} activeInjClass="rtdf-demo-gradient-primary-y" activeTabInjClass="text-white" />
				<Tab labels={labels} lineType activeInjClass="rtdf-demo-gradient-primary" />

				<div className="px-4 font-bold">不同的左右间距</div>
				<div className="mt-4 flex flex-col space-y-2">
					<Tab labels={labels} mx="12" />
					<Tab labels={labels} lineType mx="12" />
					<Tab labels={labels} mx="0" />
					<Tab labels={labels} lineType mx="0" />
				</div>
			</div>
			<Divider />

			<div className="my-8 px-4 text-xl font-bold">单独使用 Tab</div>
			<div className="my-4">
				<Tab labels={labels} active={active} onClickTab={clickTabFun} />
				<div className="mt-4">当前 Tab 点击的 active：{active}</div>
			</div>
			<Divider />
		</div>
	);
}

export default TabsZh;
