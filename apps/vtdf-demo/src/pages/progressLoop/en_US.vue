<script setup lang="ts">
import { ref } from 'vue';
import { ButtonGroup, ProgressLoop } from 'vtdf/components';

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
	<div class="m-4 mt-8 text-lg font-bold">Basic usage</div>
	<div class="mx-4 w-1/3">
		<ProgressLoop />
	</div>

	<div class="m-4 mt-8 text-lg font-bold">Different width</div>
	<div class="mx-4 flex grow gap-4">
		<div class="flex-1">
			<ProgressLoop :stroke-width="0.5" />
		</div>
		<div class="flex-1">
			<ProgressLoop :stroke-width="1" />
		</div>
		<div class="flex-1">
			<ProgressLoop :stroke-width="6" />
		</div>
	</div>

	<div class="m-4 mt-8 text-lg font-bold">Straight end</div>
	<div class="mx-4 w-1/3">
		<ProgressLoop butt />
	</div>

	<div class="m-4 mt-8 text-lg font-bold">Counterclockwise direction</div>
	<div class="mx-4 w-1/3">
		<ProgressLoop reverse />
	</div>

	<div class="m-4 mt-8 text-lg font-bold">Custom color</div>
	<div class="m-4 flex grow gap-2">
		<div class="flex-1">
			<ProgressLoop inj-class="stroke-success dark:stroke-error" />
		</div>
		<div class="flex-1">
			<ProgressLoop :gradient="['#CE9FFC', '#7367F0']" />
		</div>
		<div class="flex-1">
			<ProgressLoop :gradient="['#CE9FFC', '#7367F0']" reverse />
		</div>
		<div class="flex-1">
			<ProgressLoop track-inj-class="!stroke-primary/20 dark:!stroke-dark/20" />
		</div>
	</div>

	<div class="m-4 mt-8 text-lg font-bold">Custom text</div>
	<div class="m-4 flex grow gap-2">
		<div class="flex-1">
			<ProgressLoop>
				<div class="text-center text-xs">
					<div>Completed</div>
					<div class="text-lg text-primary dark:text-dark">6666</div>
					<div>step</div>
				</div>
			</ProgressLoop>
		</div>
		<div class="flex-1">
			<ProgressLoop>
				<div class="text-center text-xs">
					<div>Residual flow</div>
					<div class="text-lg text-primary dark:text-dark">66</div>
					<div>GB</div>
				</div>
			</ProgressLoop>
		</div>
		<div class="flex-1">
			<ProgressLoop>
				<div class="text-xs">complete 2/3</div>
			</ProgressLoop>
		</div>
	</div>

	<div class="m-4 mb-1 mt-8 text-lg font-bold">Transition effect</div>
	<div class="mx-4 text-xs">Different end points, ring width, direction, transition time, color</div>
	<div class="m-4 flex grow gap-2">
		<div class="flex-1">
			<ProgressLoop :percent="percent" />
		</div>
		<div class="flex-1">
			<ProgressLoop :percent="percent" butt />
		</div>
		<div class="flex-1">
			<ProgressLoop :percent="percent" :stroke-width="4" />
		</div>
		<div class="flex-1">
			<ProgressLoop :percent="percent" reverse />
		</div>
	</div>
	<div class="m-4 flex grow gap-2">
		<div class="flex-1">
			<ProgressLoop :percent="percent" duration="150" />
		</div>
		<div class="flex-1">
			<ProgressLoop :percent="percent" duration="500" />
		</div>
		<div class="flex-1">
			<ProgressLoop :percent="percent" duration="1000" />
		</div>
		<div class="flex-1">
			<ProgressLoop :percent="percent" :gradient="['#CE9FFC', '#7367F0']" />
		</div>
	</div>
	<div class="mx-4 pb-8">
		<ButtonGroup height-in="0" size="full">
			<button class="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black" @click="changePercentFun('-10')">-10</button>
			<button class="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black" @click="changePercentFun('+10')">+10</button>
			<button class="flex-1 py-2 active:opacity-80" @click="percent = 20">Reset</button>
		</ButtonGroup>
	</div>
</template>
