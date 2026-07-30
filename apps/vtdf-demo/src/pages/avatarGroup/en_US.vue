<script setup lang="ts">
import { computed, ref } from 'vue';
import { AvatarGroup, Icon, Slider } from 'vtdf/components';

const imgNames = [
	'dota_火女.png',
	'dota_火枪.png',
	'dota_小牛.png',
	'wall_1.jpg',
	'dota_斯温.png',
	'dota_水人.png',
	'wall_2.jpg',
	'wall_3.jpg',
	'wall_4.jpg',
	'avatar_1.jpg',
	'dota_火枪.png',
	'dota_小牛.png',
	'dota_斯温.png'
];
const data = imgNames.map((name) => ({ image: `/assets/images/${name}` }));
const radiusOptions = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
const radiusIndex = ref(1);
const currentRadius = computed(() => radiusOptions[radiusIndex.value]);
</script>

<template>
	<div class="px-4 py-8">
		<div class="font-bold">Default</div>
		<div class="mt-4">
			<AvatarGroup :data="data" />
		</div>

		<div class="mb-2 mt-8 font-bold">Different radius</div>
		<div class="py-4">
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
		<AvatarGroup :data="data" :radius="currentRadius" />

		<div class="mb-2 mt-8 font-bold">Smaller</div>
		<AvatarGroup :data="data" size="sm" line-width="1" />

		<div class="mb-2 mt-8 font-bold">Compact</div>
		<AvatarGroup :data="data" :compact="5" />

		<div class="mb-2 mt-8 font-bold">Border thick</div>
		<AvatarGroup :data="data" line-width="8" />

		<div class="mb-2 mt-8 font-bold">Reverse</div>
		<AvatarGroup :data="data" reverse />

		<div class="mb-2 mt-8 font-bold">Maximum 6 displayed</div>
		<AvatarGroup :data="data" :max="6" />

		<div class="mb-2 mt-8 font-bold">Top layer display add</div>
		<AvatarGroup :data="data" top="add" />

		<div class="mb-2 mt-8 font-bold">Do not show top layer</div>
		<AvatarGroup :data="data" :top="null" />

		<div class="mb-2 mt-8 font-bold">Custom top layer</div>
		<AvatarGroup :data="data">
			<template #top>
				<button type="button" class="relative flex h-12 w-12 justify-center overflow-hidden rounded-full bg-primary-200 dark:bg-dark-200">
					<div class="flex h-full w-full items-center justify-center text-primary-950 dark:text-dark-950">
						<Icon name="ri-vuejs-line" />
					</div>
				</button>
			</template>
		</AvatarGroup>
	</div>
</template>
