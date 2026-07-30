<script setup lang="ts">
import { computed, ref } from 'vue';
import { Slider, Stepper, Toast } from 'vtdf';
import type { StepperProps } from 'vtdf/types';

const radiusOptions: StepperProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
const radiusIndex = ref(1);
const currentRadius = computed(() => radiusOptions[radiusIndex.value]);
const asyncValue1 = ref(1);
const loading1 = ref(false);
const asyncValue2 = ref(1);
const loading2 = ref(false);
const asyncValue3 = ref(1);
const loading3 = ref(false);

const handleChange1 = (type: 'increase' | 'decrease') => {
	loading1.value = true;
	setTimeout(() => {
		asyncValue1.value += type === 'increase' ? 1 : -1;
		loading1.value = false;
	}, 2000);
};

const handleChange2 = (type: 'increase' | 'decrease') => {
	loading2.value = true;
	setTimeout(() => {
		asyncValue2.value += type === 'increase' ? 1 : -1;
		loading2.value = false;
	}, 3000);
};

const handleChange3 = (type: 'increase' | 'decrease') => {
	loading3.value = true;
	setTimeout(() => {
		asyncValue3.value += type === 'increase' ? 1 : -1;
		loading3.value = false;
	}, 4000);
};
</script>

<template>
	<div class="mx-4 mt-8 text-lg font-bold">Basic Usage</div>
	<div class="px-4 py-4">
		<Stepper />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Set Maximum/Minimum/Initial Value</div>
	<div class="px-4 py-4">
		<Stepper :min="2" :max="10" :value="5" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Set Step</div>
	<div class="px-4 py-4">
		<Stepper :step="5" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Highlight Number Area</div>
	<div class="px-4 py-4">
		<Stepper number-highlight />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Highlight Number Area</div>
	<div class="flex gap-2 px-4 py-4">
		<Stepper :theme="false" />
		<Stepper :theme="false" number-highlight />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Different Radius</div>
	<div class="px-6 py-2">
		<Slider
			:value="radiusIndex"
			:min-range="0"
			:max-range="6"
			:step="1"
			show-steps
			:step-labels="radiusLabels"
			@change="(value) => (radiusIndex = value)"
		/>
	</div>
	<div class="flex flex-wrap gap-2 px-4 py-4">
		<div><Stepper :radius="currentRadius" /></div>
		<div><Stepper :radius="currentRadius" number-highlight /></div>
		<div><Stepper :radius="currentRadius" :theme="false" /></div>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Vertical</div>
	<div class="flex justify-around px-2 py-4">
		<Stepper vertical />
		<Stepper vertical number-highlight />
		<Stepper vertical :theme="false" />
		<Stepper vertical radius="none" />
		<Stepper radius="xl" vertical />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Fixed Width</div>
	<div class="space-x-8 px-2 py-4">
		<Stepper :width="160" />
		<Stepper :width="80" vertical />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Format Display Numbers</div>
	<div class="px-4 py-4">
		<div class="mb-2 text-sm">Keep one decimal place</div>
		<Stepper :decimal="1" :step="0.1" :max="1" :min="0.1" :value="0.5" />
	</div>
	<div class="px-4 py-4">
		<div class="mb-2 text-sm">Keep four decimal places</div>
		<Stepper :decimal="4" :step="0.0001" :max="1" :min="0.0001" :value="0.5" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Asynchronous Display Numbers</div>
	<div class="px-4 py-4">
		<div class="mb-2 text-sm">Toast shows asynchronous status</div>
		<Stepper
			:async="loading1"
			:value="asyncValue1"
			@increase="() => handleChange1('increase')"
			@decrease="() => handleChange1('decrease')"
		/>
	</div>
	<Toast v-model:visible="loading1" type="loading" message="Saving..." />
	<div class="mb-2 px-4 text-sm">Internal display asynchronous status</div>
	<div class="flex gap-2 px-4 py-4">
		<Stepper
			:async="loading2"
			:value="asyncValue2"
			async-loading
			@increase="() => handleChange2('increase')"
			@decrease="() => handleChange2('decrease')"
		/>
		<Stepper
			:async="loading3"
			:value="asyncValue3"
			async-loading
			:loading="{ type: '1_51' }"
			@increase="() => handleChange3('increase')"
			@decrease="() => handleChange3('decrease')"
		/>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">No external padding</div>
	<div class="px-4 py-2">
		<Stepper :padding="false" />
	</div>
	<div class="px-4 py-2">
		<Stepper :padding="false" number-highlight />
	</div>
	<div class="px-4 py-2">
		<Stepper :padding="false" :theme="false" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Inject Class in Different Positions</div>
	<div class="px-4 py-2">
		<Stepper :theme="false" inj-class-out="vtdf-demo-gradient-primary" />
	</div>
	<div class="px-4 py-2">
		<Stepper inj-class-num="text-primary dark:text-dark" />
	</div>
	<div class="px-4 py-2">
		<Stepper inj-class-btn="rounded-full" />
	</div>
</template>
