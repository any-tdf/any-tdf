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
		<div class="mx-4 mt-8 text-lg font-bold">基础用法</div>
		<div class="flex justify-around p-4">
			<Badge><Avatar /></Badge>
			<Badge text="24"><Avatar /></Badge>
			<Badge text="99+"><Avatar /></Badge>
			<Badge text="New"><Avatar /></Badge>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">不同圆角</div>
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

		<div class="mx-4 mt-8 text-lg font-bold">位于左侧</div>
		<div class="flex justify-around p-4">
			<Badge is-left><Avatar /></Badge>
			<Badge is-left text="24"><Avatar /></Badge>
			<Badge is-left text="24" radius="leaf"><Avatar /></Badge>
			<Badge is-left text="厉害"><Avatar /></Badge>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">搭配其他组件</div>
		<div class="flex justify-around p-4">
			<Badge text="帅" radius="leaf"><Icon name="ri-spy-fill" /></Badge>
			<Badge text="棒" radius="leaf"><Icon name="ri-medal-fill" /></Badge>
			<Badge text="Happy" radius="leaf" :offset-x="-12"><Icon name="ri-cake-2-fill" /></Badge>
		</div>
		<Badge text="Hot" :offset-x="18" :offset-y="8"><Button>搭配 Button</Button></Badge>
		<Badge text="必填" :offset-x="18" :offset-y="26"><Input title="搭配 Input" /></Badge>
		<Cell title="搭配 Cell">
			<template #detail>
				<Badge is-inner />
			</template>
		</Cell>
		<Cell title="搭配 Cell" :line="false">
			<template #detail>
				<Badge text="99+" is-inner />
			</template>
		</Cell>
		<Cell title="搭配无圆角 Cell" radius="none">
			<template #detail>
				<Badge text="新版本" radius="lg" is-inner />
			</template>
		</Cell>
		<Cell title="搭配全圆角 Cell" radius="4xl">
			<template #detail>
				<Badge is-inner />
			</template>
		</Cell>

		<div class="mx-4 mt-8 text-lg font-bold">徽标动画</div>
		<div class="flex justify-around p-4">
			<Badge :is-show="isShow"><Avatar /></Badge>
			<Badge text="24" :is-show="isShow"><Avatar /></Badge>
			<Badge text="24" radius="lg" :is-show="isShow"><Avatar /></Badge>
			<Badge text="Hot" radius="leaf" :is-show="isShow"><Avatar /></Badge>
		</div>
		<Cell :title="!isShow ? '隐藏' : '显示'">
			<template #detail>
				<Badge is-inner :is-show="isShow" />
			</template>
		</Cell>
		<Button @click="() => (isShow = !isShow)">点击{{ isShow ? '隐藏' : '显示' }}徽标</Button>

		<div class="mx-4 mt-8 text-lg font-bold">自定义背景色与边框</div>
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
