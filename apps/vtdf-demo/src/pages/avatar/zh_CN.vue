<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IconProps } from 'vtdf/types';
import { Avatar, Slider } from 'vtdf/components';

const icons: IconProps[] = [
	{ name: 'ri-aliens-fill', theme: true, y: -1, size: 16 },
	{ name: 'ri-emotion-line', theme: true, y: -1, size: 46 },
	{ name: 'ri-shield-user-line', theme: true, y: 0, size: 32 },
	{ type: 'iconify', name: 'solar--user-hands-line-duotone', theme: true, size: 28 }
];
const radiusOptions = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
const radiusIndex = ref(1);
const currentRadius = computed(() => radiusOptions[radiusIndex.value]);
</script>

<template>
	<div class="px-4 py-8">
		<div class="font-bold">不同圆角</div>
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
		<div class="mb-8 mt-4 flex justify-between">
			<Avatar :radius="currentRadius" />
			<Avatar :radius="currentRadius" image="/assets/images/avatar_1.jpg" />
			<Avatar :radius="currentRadius" image="/assets/images/avatar_2.png" img-size="m" />
			<Avatar :radius="currentRadius" alt="张" />
			<Avatar :radius="currentRadius" :icon="{ name: 'ri-bear-smile-line', theme: true }" />
		</div>

		<div class="font-bold">不同图片类型与大小</div>
		<div class="mb-8 mt-4 flex justify-between">
			<Avatar image="/assets/images/avatar_2.png" img-size="s" />
			<Avatar image="/assets/images/avatar_2.png" img-size="m" />
			<Avatar image="/assets/images/avatar_2.png" />
			<Avatar image="/assets/images/avatar_1.jpg" />
		</div>

		<div class="font-bold">自定义背景色</div>
		<div class="mb-8 mt-4 flex justify-between">
			<Avatar image="/assets/images/avatar_2.png" img-size="m" inj-class="!bg-success" />
			<Avatar image="/assets/images/avatar_2.png" img-size="m" inj-class="vtdf-demo-avatar-bg" />
			<Avatar image="/assets/images/avatar_2.png" img-size="m" inj-class="vtdf-demo-gradient-primary !text-white" />
			<Avatar image="/assets/images/avatar_2.png" img-size="m" inj-class="!bg-transparent" />
		</div>

		<div class="font-bold">不同边框</div>
		<div class="mb-8 mt-4 flex justify-between">
			<Avatar image="/assets/images/avatar_2.png" img-size="m" line="solid" />
			<Avatar image="/assets/images/avatar_2.png" img-size="m" line="dashed" />
			<Avatar image="/assets/images/avatar_2.png" img-size="m" line="dotted" />
			<Avatar image="/assets/images/avatar_2.png" img-size="m" line="solid" inj-class="vtdf-demo-border-red-purple" />
		</div>

		<div class="font-bold">替换文本</div>
		<div class="mb-8 mt-4 flex justify-between">
			<Avatar alt="张" alt-size="xs" />
			<Avatar alt="张" alt-size="sm" />
			<Avatar alt="张" />
			<Avatar alt="张" alt-size="lg" />
		</div>

		<div class="font-bold">替换 Icon</div>
		<div class="mb-8 mt-4 flex justify-between">
			<Avatar v-for="icon in icons" :key="icon.name" :icon="icon" />
		</div>

		<div class="font-bold">不同大小</div>
		<div class="flex justify-between">
			<div class="mb-8 mt-4 flex flex-col items-center space-y-4">
				<Avatar size="xs" :icon="{ name: 'ri-bear-smile-line', theme: true }" />
				<Avatar size="sm" image="/assets/images/avatar_1.jpg" />
				<Avatar line="solid" />
				<Avatar size="lg" image="/assets/images/avatar_2.png" img-size="m" />
				<Avatar size="xl" alt="张" alt-size="xl" />
			</div>
			<div class="mb-8 mt-4 flex flex-col items-center space-y-4">
				<Avatar radius="full" size="xs" :icon="{ name: 'ri-bear-smile-line', theme: true }" />
				<Avatar radius="full" size="sm" image="/assets/images/avatar_1.jpg" />
				<Avatar radius="full" line="solid" />
				<Avatar radius="full" size="lg" image="/assets/images/avatar_2.png" img-size="m" />
				<Avatar radius="full" size="xl" alt="张" alt-size="xl" />
			</div>
		</div>
	</div>
</template>
