<script setup lang="ts">
import { computed, ref } from 'vue';
import { Avatar, Badge, Button, Cell, Icon, Input, Slider } from 'vtdf/components';

const isShow = ref(true);
const radiusOptions = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'leaf'] as const;
const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'leaf'];
const radiusIndex = ref(6);
const currentRadius = computed(() => radiusOptions[radiusIndex.value]);
</script>

<template>
	<div class="pb-4 pt-1">
		<div class="mx-4 mt-8 text-lg font-bold">Basic usage</div>
		<div class="flex justify-around p-4">
			<Badge><Avatar /></Badge>
			<Badge text="24"><Avatar /></Badge>
			<Badge text="99+"><Avatar /></Badge>
			<Badge text="New"><Avatar /></Badge>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">Different rounded corners</div>
		<div class="px-4 py-2">
			<Slider
				:value="radiusIndex"
				:min-range="0"
				:max-range="7"
				:step="1"
				show-steps
				:step-labels="radiusLabels"
				@change="(value) => (radiusIndex = value)"
			/>
		</div>
		<div class="flex justify-around p-4">
			<Badge :radius="currentRadius"><Avatar /></Badge>
			<Badge text="24" :radius="currentRadius"><Avatar /></Badge>
			<Badge text="99+" :radius="currentRadius"><Avatar /></Badge>
			<Badge text="Hot" :radius="currentRadius"><Avatar /></Badge>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">Located on the left</div>
		<div class="flex justify-around p-4">
			<Badge is-left><Avatar /></Badge>
			<Badge is-left text="24"><Avatar /></Badge>
			<Badge is-left text="24" radius="leaf"><Avatar /></Badge>
			<Badge is-left text="sharp"><Avatar /></Badge>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">Match other components</div>
		<div class="flex justify-around p-4">
			<Badge text="Cool" radius="leaf" :offset-x="-6"><Icon name="ri-spy-fill" /></Badge>
			<Badge text="Great" radius="leaf" :offset-x="-10"><Icon name="ri-medal-fill" /></Badge>
			<Badge text="Happy" radius="leaf" :offset-x="-12"><Icon name="ri-cake-2-fill" /></Badge>
		</div>
		<Badge text="Hot" :offset-x="18" :offset-y="8"><Button>Match Button</Button></Badge>
		<Badge text="Required" :offset-x="30" :offset-y="26"><Input title="Match Input" /></Badge>
		<Cell title="Match Cell">
			<template #detail>
				<Badge is-inner />
			</template>
		</Cell>
		<Cell title="Match Cell" :line="false">
			<template #detail>
				<Badge text="99+" is-inner />
			</template>
		</Cell>
		<Cell title="Match no radius corner Cell" radius="none">
			<template #detail>
				<Badge text="new version" radius="lg" is-inner />
			</template>
		</Cell>
		<Cell title="Match full radius Cell" radius="4xl">
			<template #detail>
				<Badge is-inner />
			</template>
		</Cell>

		<div class="mx-4 mt-8 text-lg font-bold">Badge animation</div>
		<div class="flex justify-around p-4">
			<Badge :is-show="isShow"><Avatar /></Badge>
			<Badge text="24" :is-show="isShow"><Avatar /></Badge>
			<Badge text="24" radius="lg" :is-show="isShow"><Avatar /></Badge>
			<Badge text="Hot" radius="leaf" :is-show="isShow"><Avatar /></Badge>
		</div>
		<Cell :title="!isShow ? 'Hidden' : 'Show'">
			<template #detail>
				<Badge is-inner :is-show="isShow" />
			</template>
		</Cell>
		<Button @click="() => (isShow = !isShow)">Click {{ isShow ? 'Hidden' : 'Show' }} Badge</Button>

		<div class="mx-4 mt-8 text-lg font-bold">Custom background color and border</div>
		<div class="flex justify-around p-4">
			<Badge text="Theme" inj-class="!bg-primary dark:!bg-dark text-white dark:text-black"><Avatar /></Badge>
			<Badge text="New" inj-class="vtdf-demo-gradient-primary"><Avatar /></Badge>
			<Badge radius="lg" inj-class="vtdf-demo-ring-neutral"><Avatar image="/assets/images/avatar_1.jpg" /></Badge>
			<Badge :offset-x="9" :offset-y="9" inj-class="vtdf-demo-ring-neutral">
				<Avatar radius="full" image="/assets/images/avatar_1.jpg" />
			</Badge>
		</div>
	</div>
</template>
