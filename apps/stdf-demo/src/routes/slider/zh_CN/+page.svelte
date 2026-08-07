<!-- Slider Demo -->
<script lang="ts">
	import { Slider, Icon } from 'stdf';

	let value = $state(20);

	let valueRange: [number, number] = $state([50, 60]);
	//生成指定数字之间的随机数组成的数组
	const randomArray = (min: number, max: number, length: number) => {
		let arr = [];
		for (let i = 0; i < length; i++) {
			arr.push(Math.floor(Math.random() * (max - min + 1) + min));
		}
		return arr;
	};
	//将数组递增或递减排序
	const sortArray = (arr: number[], isAsc: boolean) => arr.sort((a, b) => (isAsc ? a - b : b - a));
	const barList1 = sortArray(randomArray(2, 60, 20), true);
	const barList2 = sortArray(randomArray(2, 60, 20), false);
	const barList = [...barList1, ...barList2];
	let valueBar: number = $state(70);
</script>

<div class="mx-4 mt-8 text-lg font-bold">基础用法</div>
<div class="px-6 py-4">
	<Slider />
</div>
<div class="mx-4 mt-8 text-lg font-bold">监听 value</div>
<div class="px-6 py-4">
	<Slider onchange={(v: number) => (value = v)} {value} />
	当前值：{value}
</div>
<div class="mx-4 mt-8 text-lg font-bold">步长为 5</div>
<div class="px-6 py-4">
	<Slider step={5} />
</div>
<div class="mx-4 mt-8 text-lg font-bold">显示档位（block 样式）</div>
<div class="px-6 py-4">
	<Slider step={10} showSteps />
</div>
<div class="px-6 py-4">
	<Slider step={20} showSteps radius="full" />
</div>
<div class="mx-4 mt-8 text-lg font-bold">显示档位（break 样式）</div>
<div class="px-6 py-4">
	<Slider step={10} showSteps stepsStyle="break" />
</div>
<div class="px-6 py-4">
	<Slider step={20} showSteps stepsStyle="break" radius="full" />
</div>
<div class="mx-4 mt-8 text-lg font-bold">显示档位（区间选择）</div>
<div class="px-6 py-4">
	<Slider step={10} showSteps isRange startValue={20} endValue={70} />
</div>
<div class="px-6 py-4">
	<Slider step={20} showSteps stepsStyle="break" isRange startValue={20} endValue={80} radius="full" />
</div>
<div class="mx-4 mt-8 text-lg font-bold">档位标签</div>
<div class="px-6 py-4">
	<Slider step={25} showSteps value={50} stepLabels={['极慢', '慢', '中', '快', '极快']} />
</div>
<div class="px-6 py-4">
	<Slider step={20} showSteps stepsStyle="break" radius="full" stepLabels={['0%', '20%', '40%', '60%', '80%', '100%']} />
</div>
<div class="mx-4 mt-8 text-lg font-bold">步长为 0.1</div>
<div class="px-6 py-4">
	<Slider step={0.1} value={0.2} minRange={0} maxRange={1} />
</div>
<div class="mx-4 mt-8 text-lg font-bold">设定可选范围（60-80）</div>
<div class="px-6 py-4">
	<Slider value={68} minRange={60} maxRange={80} />
</div>
<div class="mx-4 mt-8 text-lg font-bold">区间选择</div>
<div class="px-6 py-4">
	<Slider isRange />
</div>
<div class="mx-4 mt-8 text-lg font-bold">区间设定可选范围（40-80）</div>
<div class="px-6 py-4">
	<Slider
		isRange
		minRange={40}
		maxRange={80}
		startValue={valueRange[0]}
		endValue={valueRange[1]}
		onchange={(_, range) => {
			if (range) valueRange = range;
		}}
	/>
	当前区间：{valueRange[0]} - {valueRange[1]}
</div>
<div class="mx-4 mt-8 text-lg font-bold">不同圆角</div>
<div class="px-6 py-4">
	<Slider radius="full" />
</div>
<div class="px-6 py-4">
	<Slider radius="none" />
</div>
<div class="px-6 py-4">
	<Slider radius="full" isRange />
</div>
<div class="mx-4 mt-8 text-lg font-bold">线框滑块</div>
<div class="px-6 py-4">
	<Slider lineBlock radius="full" />
</div>
<div class="px-6 py-4">
	<Slider lineBlock isRange />
</div>
<div class="mx-4 mt-8 text-lg font-bold">一直显示 Tip</div>
<div class="px-6 py-4">
	<Slider showTip="always" />
</div>
<div class="px-6 py-4">
	<Slider showTip="always" isRange />
</div>
<div class="px-6 py-4">
	<Slider showTip="always" radius="none" />
</div>
<div class="mx-4 mt-8 text-lg font-bold">不显示 Tip</div>
<div class="px-6 py-4">
	<Slider showTip="never" />
</div>
<div class="mx-4 mt-8 text-lg font-bold">组合布局</div>
<div class="flex space-x-3 p-4">
	<Icon name="ri-volume-mute-line" />
	<div class="grow">
		<Slider />
	</div>
	<Icon name="ri-volume-up-line" />
</div>
<div class="mx-4 mt-8 text-lg font-bold">使用 Snippet</div>
<div class="px-6 pt-16">
	<Slider lineBlock showTip="never" value={valueBar} onchange={(v: number) => (valueBar = v)}>
		{#snippet children()}
			<div class="relative grow items-end">
				<div class="flex items-end justify-between overflow-hidden" style="transform: translateY(-30px);">
					{#each barList as item, i}
						<div
							class="w-1 rounded-full{i / 40 < valueBar / 100 ? ' bg-primary dark:bg-dark' : ' bg-gray-200 dark:bg-gray-500'}"
							style="height: {item}px"
						></div>
					{/each}
				</div>
			</div>
		{/snippet}
	</Slider>
</div>
<div class="mx-4 mt-8 text-lg font-bold">禁用</div>
<div class="px-6 py-4">
	<Slider disabled />
</div>
<div class="mx-4 mt-8 text-lg font-bold">只读</div>
<div class="px-6 py-4">
	<Slider readonly />
</div>
