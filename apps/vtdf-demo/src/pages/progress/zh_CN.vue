<script setup lang="ts">
import { ref } from 'vue';
import { ButtonGroup, Progress } from 'vtdf/components';

const percent = ref(20);

const changePercentFun = (type: string) => {
	if (type === '+10') {
		percent.value = percent.value >= 100 ? 100 : percent.value + 10;
		return;
	}
	percent.value = percent.value <= 0 ? 0 : percent.value - 10;
};
</script>

<template>
	<div class="px-4 pb-8">
		<div class="m-4 mt-8 text-lg font-bold">基础用法</div>
		<Progress />

		<div class="m-4 mt-8 text-lg font-bold">不同高度</div>
		<div class="flex flex-col space-y-4">
			<Progress height="1" />
			<Progress height="2" />
			<Progress height="3" />
			<Progress height="4" />
		</div>

		<div class="m-4 mt-8 text-lg font-bold">百分比不同位置</div>
		<div class="flex flex-col space-y-4">
			<Progress />
			<Progress percent-position="inner" />
			<Progress percent-position="block" />
			<Progress :percent-position="null" />
		</div>

		<div class="m-4 mt-8 text-lg font-bold">不同圆角风格</div>
		<div class="flex flex-col space-y-4">
			<Progress radius="none" />
			<Progress radius="md" />
			<Progress radius="none" percent-position="block" />
			<Progress radius="md" percent-position="block" />
			<Progress percent-position="block" />
		</div>

		<div class="m-4 mt-8 text-lg font-bold">禁用</div>
		<div class="flex flex-col space-y-4">
			<Progress inactive />
			<Progress inactive percent-position="block" />
		</div>

		<div class="m-4 mt-8 text-lg font-bold">过渡效果</div>
		<div class="mb-4 flex flex-col space-y-4 px-2">
			<Progress :percent="percent" />
			<Progress :percent="percent" percent-position="inner" />
			<Progress :percent="percent" percent-position="block" />
			<Progress :percent="percent" duration="500" />
			<Progress :percent="percent" duration="1000" />
		</div>
		<ButtonGroup height-in="0" size="full">
			<button class="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black" @click="changePercentFun('-10')">-10</button>
			<button class="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black" @click="changePercentFun('+10')">+10</button>
			<button class="flex-1 py-2 active:opacity-80" @click="percent = 20">重置</button>
		</ButtonGroup>

		<div class="m-4 mt-8 text-lg font-bold">自定义颜色</div>
		<div class="flex flex-col space-y-4">
			<Progress inj-class="bg-success dark:bg-error" />
			<Progress inj-class="vtdf-demo-gradient-primary" />
			<Progress percent-position="block" inj-class="vtdf-demo-progress-fill" />
			<Progress track-inj-class="!bg-primary/20 dark:!bg-dark/20" />
		</div>

		<div class="m-4 mt-8 text-lg font-bold">自定义文字</div>
		<div class="flex flex-col space-y-4">
			<Progress>
				<div class="whitespace-nowrap text-xs">已完成 2/3</div>
			</Progress>
			<Progress percent-position="block">
				<div class="whitespace-nowrap text-xs">已完成 2/3</div>
			</Progress>
		</div>
	</div>
</template>
