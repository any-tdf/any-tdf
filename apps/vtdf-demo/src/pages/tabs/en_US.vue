<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { Transition as MotionTransition } from '@any-tdf/vue-motion';
import { Divider, Slider, Tab, TabContent, Tabs } from 'vtdf';
import type { TabLabelProps, TabProps } from 'vtdf/types';

type TabRadius = NonNullable<TabProps['radius']>;

const labels: TabLabelProps[] = [{ text: 'aircraft' }, { text: 'steamer' }, { text: 'train' }, { text: 'car' }];
const radiusOptions: TabRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
const radiusLabels = [...radiusOptions];
const labels1: TabLabelProps[] = [
	{ icon: { name: 'ri-plane-line', theme: true, size: 20 } },
	{ icon: { name: 'ri-ship-2-line', theme: true, size: 20 } },
	{ icon: { name: 'ri-train-line', theme: true, size: 20 } },
	{ icon: { name: 'ri-car-line', theme: true, size: 20 } }
];
const labels2: TabLabelProps[] = [
	{ text: 'aircraft', icon: { name: 'ri-plane-line', theme: true, size: 16, y: -1 } },
	{ text: 'steamer', icon: { name: 'ri-ship-2-line', theme: true, size: 16, y: -1 } },
	{ text: 'train', icon: { name: 'ri-train-line', theme: true, size: 16, y: -1 } },
	{ text: 'car', icon: { name: 'ri-car-line', theme: true, size: 16, y: -1 } }
];
const overflowLabels: TabLabelProps[] = [
	{ text: 'aircraft' },
	{ text: 'steamer' },
	{ text: 'train' },
	{ text: 'car' },
	{ text: 'motorcycle' },
	{ text: 'bicycle' },
	{ text: 'hot air balloon' },
	{ text: 'rocket' },
	{ text: 'tractor' },
	{ text: 'subway' },
	{ text: 'bus' },
	{ text: 'skateboard' },
	{ text: 'flying saucer' }
];

const changeActive = ref(0);
const active = ref(2);
const radiusIndex = ref(3);
const customWidth = ref(0);
const customTransitionRef = ref<HTMLDivElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

const currentRadius = computed(() => radiusOptions[radiusIndex.value]);

const clickTabFun = (nextActive: number) => {
	active.value = nextActive;
};

const tabsChangeFun = (nextActive: number) => {
	changeActive.value = nextActive;
};

const updateCustomWidth = async () => {
	await nextTick();
	customWidth.value = customTransitionRef.value?.clientWidth || 0;
};

const getFlyParams = (index: number) => ({
	x: (customWidth.value / labels.length) * index,
	y: -80,
	duration: 1000
});

onMounted(() => {
	updateCustomWidth();
	resizeObserver = new ResizeObserver(updateCustomWidth);
	if (customTransitionRef.value) {
		resizeObserver.observe(customTransitionRef.value);
	}
});

onBeforeUnmount(() => {
	resizeObserver?.disconnect();
	resizeObserver = null;
});
</script>

<template>
	<div class="py-8">
		<div class="px-4 text-xl font-bold">use Tabs</div>
		<div class="my-4 space-y-4">
			<div class="px-4 font-bold">Basic usage</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels }">
					<TabContent>I am a plane</TabContent>
					<TabContent>I am a ship</TabContent>
					<TabContent>I am a train</TabContent>
					<TabContent>I am a car</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">Accelerate the transition</div>
			<div class="space-y-4">
				<Tabs duration="fast" :tab="{ labels }">
					<TabContent>I am a plane</TabContent>
					<TabContent>I am a ship</TabContent>
					<TabContent>I am a train</TabContent>
					<TabContent>I am a car</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">Transition mitigation</div>
			<div class="space-y-4">
				<Tabs duration="slower" :tab="{ labels }">
					<TabContent>I am a plane</TabContent>
					<TabContent>I am a ship</TabContent>
					<TabContent>I am a train</TabContent>
					<TabContent>I am a car</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">Use linear style</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels, lineType: true }">
					<TabContent>I am a plane</TabContent>
					<TabContent>I am a ship</TabContent>
					<TabContent>I am a train</TabContent>
					<TabContent>I am a car</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">The TAB is located at the bottom</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels }" position="b">
					<TabContent>I am a plane</TabContent>
					<TabContent>I am a ship</TabContent>
					<TabContent>I am a train</TabContent>
					<TabContent>I am a car</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">The TAB is located on the left</div>
			<Tabs :tab="{ labels }" position="l" v-slot="{ active: tabActive }">
				<TabContent :show="tabActive === 0">I am a plane</TabContent>
				<TabContent :show="tabActive === 1">I am a ship</TabContent>
				<TabContent :show="tabActive === 2">I am a train</TabContent>
				<TabContent :show="tabActive === 3">I am a car</TabContent>
			</Tabs>
			<Divider />

			<div class="px-4 font-bold">The TAB is located on the right</div>
			<Tabs :tab="{ labels }" position="r" v-slot="{ active: tabActive }">
				<TabContent :show="tabActive === 0">I am a plane</TabContent>
				<TabContent :show="tabActive === 1">I am a ship</TabContent>
				<TabContent :show="tabActive === 2">I am a train</TabContent>
				<TabContent :show="tabActive === 3">I am a car</TabContent>
			</Tabs>
			<Divider />

			<div ref="customTransitionRef" class="px-4 font-bold">Custom transition</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels }" :transition="false" v-slot="{ active: tabActive }">
					<div class="relative py-8">
						<MotionTransition
							v-for="(item, index) in labels"
							:key="item.text"
							:visible="tabActive === index"
							transition="fly"
							:in-params="getFlyParams(index)"
							:out-transition="null"
							class="absolute"
						>
							I am {{ item.text }}
						</MotionTransition>
					</div>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">monitor change event</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels }" @change="tabsChangeFun">
					<TabContent>I am a plane</TabContent>
					<TabContent>I am a ship</TabContent>
					<TabContent>I am a train</TabContent>
					<TabContent>I am a car</TabContent>
				</Tabs>
			</div>
			<div class="mt-4">At present Tabs activated active: {{ changeActive }}</div>
			<Divider />

			<div class="px-4 font-bold">Overflow mode</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels: overflowLabels, overflow: true }">
					<TabContent v-for="item in overflowLabels" :key="item.text">I am {{ item.text }}</TabContent>
				</Tabs>
			</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels: overflowLabels, overflow: true, lineType: true }">
					<TabContent v-for="item in overflowLabels" :key="item.text">I am {{ item.text }}</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">Overflow mode closes automatic scrolling</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels: overflowLabels, overflow: true, autoScroll: false }">
					<TabContent v-for="item in overflowLabels" :key="item.text">I am {{ item.text }}</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">Overflow mode shows 2 items</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels: overflowLabels, overflow: true, showNum: 2 }">
					<TabContent v-for="item in overflowLabels" :key="item.text">I am {{ item.text }}</TabContent>
				</Tabs>
			</div>
		</div>
		<Divider />

		<div class="mt-8 px-4 text-xl font-bold">different Tab style</div>
		<div class="mt-4 flex flex-col space-y-2">
			<div class="px-4 font-bold">Different fillet</div>
			<div class="px-4 text-xs text-gray-500">Current radius: {{ currentRadius }}</div>
			<div class="px-4">
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
			<Tab :labels="labels" :radius="currentRadius" />
			<Tab :labels="labels" :radius="currentRadius" line-type />

			<div class="px-4 font-bold">Match text with ICONS</div>
			<Tab :labels="labels" />
			<Tab :labels="labels1" />
			<Tab :labels="labels2" />

			<div class="px-4 font-bold">Care edition</div>
			<Tab :labels="labels" love />

			<div class="px-4 font-bold">Linear style</div>
			<Tab :labels="labels" line-type />
			<Tab :labels="labels2" line-type />

			<div class="px-4 font-bold">customize Tab Outer style</div>
			<Tab :labels="labels" inj-class="vtdf-demo-gradient-soft-y" />

			<div class="px-4 font-bold">customize Tab style</div>
			<Tab :labels="labels" tab-inj-class="underline text-primary decoration-primary dark:text-dark dark:decoration-dark" />

			<div class="px-4 font-bold">Custom selection Tab style</div>
			<Tab :labels="labels" active-tab-inj-class="text-primary dark:text-dark !text-base transition-all" />

			<div class="px-4 font-bold">Customize the indicator style</div>
			<Tab :labels="labels" active-inj-class="vtdf-demo-gradient-primary-y" active-tab-inj-class="text-white" />
			<Tab :labels="labels" line-type active-inj-class="vtdf-demo-gradient-primary" />

			<div class="px-4 font-bold">Different mx</div>
			<div class="mt-4 flex flex-col space-y-2">
				<Tab :labels="labels" mx="12" />
				<Tab :labels="labels" line-type mx="12" />
				<Tab :labels="labels" mx="0" />
				<Tab :labels="labels" line-type mx="0" />
			</div>
		</div>
		<Divider />

		<div class="my-8 px-4 text-xl font-bold">Use alone Tab</div>
		<div class="my-4">
			<Tab :labels="labels" :active="active" @click-tab="clickTabFun" />
			<div class="mt-4">At present Tab clickable active: {{ active }}</div>
		</div>
		<Divider />
	</div>
</template>
