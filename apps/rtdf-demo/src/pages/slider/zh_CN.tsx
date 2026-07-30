import { useMemo, useState } from 'react';
import { Icon, Slider } from 'rtdf/components';

function SliderZh() {
	const [value, setValue] = useState(20);
	const [valueRange, setValueRange] = useState<[number, number]>([50, 60]);
	const [valueBar, setValueBar] = useState(70);

	// 生成指定数字之间的随机数组成的数组
	const randomArray = (min: number, max: number, length: number) => {
		const arr: number[] = [];
		for (let i = 0; i < length; i++) {
			arr.push(Math.floor(Math.random() * (max - min + 1) + min));
		}
		return arr;
	};

	// 将数组递增或递减排序
	const sortArray = (arr: number[], isAsc: boolean) => arr.sort((a, b) => (isAsc ? a - b : b - a));

	const barList = useMemo(() => {
		const barList1 = sortArray(randomArray(2, 60, 20), true);
		const barList2 = sortArray(randomArray(2, 60, 20), false);
		return [...barList1, ...barList2];
	}, []);

	return (
		<div className="pb-8 overflow-x-hidden">
			<div className="mx-4 mt-8 text-lg font-bold">基础用法</div>
			<div className="px-6 py-4">
				<Slider />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">监听 value</div>
			<div className="px-6 py-4">
				<Slider onChange={(v: number) => setValue(v)} value={value} />
				当前值： {value}
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">步长为 5</div>
			<div className="px-6 py-4">
				<Slider step={5} />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">显示档位（ block 样式 ）</div>
			<div className="px-6 py-4">
				<Slider step={10} showSteps />
			</div>
			<div className="px-6 py-4">
				<Slider step={20} showSteps radius="full" />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">显示档位（ break 样式 ）</div>
			<div className="px-6 py-4">
				<Slider step={10} showSteps stepsStyle="break" />
			</div>
			<div className="px-6 py-4">
				<Slider step={20} showSteps stepsStyle="break" radius="full" />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">显示档位（区间选择）</div>
			<div className="px-6 py-4">
				<Slider step={10} showSteps isRange startValue={20} endValue={70} />
			</div>
			<div className="px-6 py-4">
				<Slider step={20} showSteps stepsStyle="break" isRange startValue={20} endValue={80} radius="full" />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">档位标签</div>
			<div className="px-6 py-4">
				<Slider step={25} showSteps value={50} stepLabels={['极慢', '慢', '中', '快', '极快']} />
			</div>
			<div className="px-6 py-4">
				<Slider step={20} showSteps stepsStyle="break" radius="full" stepLabels={['0%', '20%', '40%', '60%', '80%', '100%']} />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">步长为 0.1</div>
			<div className="px-6 py-4">
				<Slider step={0.1} value={0.2} minRange={0} maxRange={1} />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">设定可选范围（ 60-80 ）</div>
			<div className="px-6 py-4">
				<Slider value={68} minRange={60} maxRange={80} />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">区间选择</div>
			<div className="px-6 py-4">
				<Slider isRange />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">区间设定可选范围（ 40-80 ）</div>
			<div className="px-6 py-4">
				<Slider
					isRange
					minRange={40}
					maxRange={80}
					startValue={valueRange[0]}
					endValue={valueRange[1]}
					onChange={(_, range) => range && setValueRange(range)}
				/>
				当前区间： {valueRange[0]} - {valueRange[1]}
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">不同圆角</div>
			<div className="px-6 py-4">
				<Slider radius="full" />
			</div>
			<div className="px-6 py-4">
				<Slider radius="none" />
			</div>
			<div className="px-6 py-4">
				<Slider radius="full" isRange />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">线框滑块</div>
			<div className="px-6 py-4">
				<Slider lineBlock radius="full" />
			</div>
			<div className="px-6 py-4">
				<Slider lineBlock isRange />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">一直显示 Tip</div>
			<div className="px-6 py-4">
				<Slider showTip="always" />
			</div>
			<div className="px-6 py-4">
				<Slider showTip="always" isRange />
			</div>
			<div className="px-6 py-4">
				<Slider showTip="always" radius="none" />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">不显示 Tip</div>
			<div className="px-6 py-4">
				<Slider showTip="never" />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">组合布局</div>
			<div className="flex space-x-3 p-4">
				<Icon name="ri-volume-mute-line" />
				<div className="grow">
					<Slider />
				</div>
				<Icon name="ri-volume-up-line" />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">使用 children</div>
			<div className="px-6 pt-16">
				<Slider lineBlock showTip="never" value={valueBar} onChange={(v: number) => setValueBar(v)}>
					<div className="relative grow items-end">
						<div className="flex items-end justify-between overflow-hidden" style={{ transform: 'translateY(-30px)' }}>
							{barList.map((item, i) => (
								<div
									key={i}
									className={`w-1 rounded-full ${i / 40 < valueBar / 100 ? 'bg-primary dark:bg-dark' : 'bg-gray-200 dark:bg-gray-500'}`}
									style={{ height: `${item}px` }}
								/>
							))}
						</div>
					</div>
				</Slider>
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">禁用</div>
			<div className="px-6 py-4">
				<Slider disabled />
			</div>
			<div className="mx-4 mt-8 text-lg font-bold">只读</div>
			<div className="px-6 py-4">
				<Slider readonly />
			</div>
		</div>
	);
}

export default SliderZh;
