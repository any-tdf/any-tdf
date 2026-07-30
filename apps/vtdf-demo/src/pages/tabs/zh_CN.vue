<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { Transition as MotionTransition } from '@any-tdf/vue-motion';
import { Divider, Slider, Tab, TabContent, Tabs } from 'vtdf';
import type { TabLabelProps, TabProps } from 'vtdf/types';

type TabRadius = NonNullable<TabProps['radius']>;

const labels: TabLabelProps[] = [{ text: '飞机' }, { text: '轮船' }, { text: '火车' }, { text: '汽车' }];
const radiusOptions: TabRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
const radiusLabels = [...radiusOptions];
const labels1: TabLabelProps[] = [
	{ icon: { name: 'ri-plane-line', theme: true, size: 20 } },
	{ icon: { name: 'ri-ship-2-line', theme: true, size: 20 } },
	{ icon: { name: 'ri-train-line', theme: true, size: 20 } },
	{ icon: { name: 'ri-car-line', theme: true, size: 20 } }
];
const labels2: TabLabelProps[] = [
	{ text: '飞机', icon: { name: 'ri-plane-line', theme: true, size: 16, y: -1 } },
	{ text: '轮船', icon: { name: 'ri-ship-2-line', theme: true, size: 16, y: -1 } },
	{ text: '火车', icon: { name: 'ri-train-line', theme: true, size: 16, y: -1 } },
	{ text: '汽车', icon: { name: 'ri-car-line', theme: true, size: 16, y: -1 } }
];
const overflowLabels: TabLabelProps[] = [
	{ text: '飞机' },
	{ text: '轮船' },
	{ text: '火车' },
	{ text: '汽车' },
	{ text: '摩托车' },
	{ text: '自行车' },
	{ text: '热气球' },
	{ text: '火箭' },
	{ text: '拖拉机' },
	{ text: '地铁' },
	{ text: '公交车' },
	{ text: '滑板' },
	{ text: '飞碟' }
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
		<div class="px-4 text-xl font-bold">使用 Tabs</div>
		<div class="my-4 space-y-4">
			<div class="px-4 font-bold">基础用法</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels }">
					<TabContent>我是飞机</TabContent>
					<TabContent>我是轮船</TabContent>
					<TabContent>我是火车</TabContent>
					<TabContent>我是汽车</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">加快过渡</div>
			<div class="space-y-4">
				<Tabs duration="fast" :tab="{ labels }">
					<TabContent>我是飞机</TabContent>
					<TabContent>我是轮船</TabContent>
					<TabContent>我是火车</TabContent>
					<TabContent>我是汽车</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">减缓过渡</div>
			<div class="space-y-4">
				<Tabs duration="slower" :tab="{ labels }">
					<TabContent>我是飞机</TabContent>
					<TabContent>我是轮船</TabContent>
					<TabContent>我是火车</TabContent>
					<TabContent>我是汽车</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">使用线性风格</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels, lineType: true }">
					<TabContent>我是飞机</TabContent>
					<TabContent>我是轮船</TabContent>
					<TabContent>我是火车</TabContent>
					<TabContent>我是汽车</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">选项卡位于底部</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels }" position="b">
					<TabContent>我是飞机</TabContent>
					<TabContent>我是轮船</TabContent>
					<TabContent>我是火车</TabContent>
					<TabContent>我是汽车</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">选项卡位于左侧</div>
			<Tabs :tab="{ labels }" position="l" v-slot="{ active: tabActive }">
				<TabContent :show="tabActive === 0">我是飞机</TabContent>
				<TabContent :show="tabActive === 1">我是轮船</TabContent>
				<TabContent :show="tabActive === 2">我是火车</TabContent>
				<TabContent :show="tabActive === 3">我是汽车</TabContent>
			</Tabs>
			<Divider />

			<div class="px-4 font-bold">选项卡位于右侧</div>
			<Tabs :tab="{ labels }" position="r" v-slot="{ active: tabActive }">
				<TabContent :show="tabActive === 0">我是飞机</TabContent>
				<TabContent :show="tabActive === 1">我是轮船</TabContent>
				<TabContent :show="tabActive === 2">我是火车</TabContent>
				<TabContent :show="tabActive === 3">我是汽车</TabContent>
			</Tabs>
			<Divider />

			<div ref="customTransitionRef" class="px-4 font-bold">自定义过渡</div>
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
							我是{{ item.text }}
						</MotionTransition>
					</div>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">监听 change 事件</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels }" @change="tabsChangeFun">
					<TabContent>我是飞机</TabContent>
					<TabContent>我是轮船</TabContent>
					<TabContent>我是火车</TabContent>
					<TabContent>我是汽车</TabContent>
				</Tabs>
			</div>
			<div class="mt-4">当前 Tabs 激活的 active：{{ changeActive }}</div>
			<Divider />

			<div class="px-4 font-bold">溢出模式</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels: overflowLabels, overflow: true }">
					<TabContent v-for="item in overflowLabels" :key="item.text">我是{{ item.text }}</TabContent>
				</Tabs>
			</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels: overflowLabels, overflow: true, lineType: true }">
					<TabContent v-for="item in overflowLabels" :key="item.text">我是{{ item.text }}</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">溢出模式关闭自动滚动</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels: overflowLabels, overflow: true, autoScroll: false }">
					<TabContent v-for="item in overflowLabels" :key="item.text">我是{{ item.text }}</TabContent>
				</Tabs>
			</div>
			<Divider />

			<div class="px-4 font-bold">溢出模式完整显示 2 项</div>
			<div class="space-y-4">
				<Tabs :tab="{ labels: overflowLabels, overflow: true, showNum: 2 }">
					<TabContent v-for="item in overflowLabels" :key="item.text">我是{{ item.text }}</TabContent>
				</Tabs>
			</div>
		</div>
		<Divider />

		<div class="mt-8 px-4 text-xl font-bold">不同的 Tab 风格</div>
		<div class="mt-4 flex flex-col space-y-2">
			<div class="px-4 font-bold">不同圆角</div>
			<div class="px-4 text-xs text-gray-500">当前圆角：{{ currentRadius }}</div>
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

			<div class="px-4 font-bold">文字与图标搭配</div>
			<Tab :labels="labels" />
			<Tab :labels="labels1" />
			<Tab :labels="labels2" />

			<div class="px-4 font-bold">关爱版</div>
			<Tab :labels="labels" love />

			<div class="px-4 font-bold">线性风格</div>
			<Tab :labels="labels" line-type />
			<Tab :labels="labels2" line-type />

			<div class="px-4 font-bold">自定义 Tab 外层风格</div>
			<Tab :labels="labels" inj-class="vtdf-demo-gradient-soft-y" />

			<div class="px-4 font-bold">自定义 Tab 风格</div>
			<Tab :labels="labels" tab-inj-class="underline text-primary decoration-primary dark:text-dark dark:decoration-dark" />

			<div class="px-4 font-bold">自定义选定 Tab 风格</div>
			<Tab :labels="labels" active-tab-inj-class="text-primary dark:text-dark !text-base transition-all" />

			<div class="px-4 font-bold">自定义指示器风格</div>
			<Tab :labels="labels" active-inj-class="vtdf-demo-gradient-primary-y" active-tab-inj-class="text-white" />
			<Tab :labels="labels" line-type active-inj-class="vtdf-demo-gradient-primary" />

			<div class="px-4 font-bold">不同的左右间距</div>
			<div class="mt-4 flex flex-col space-y-2">
				<Tab :labels="labels" mx="12" />
				<Tab :labels="labels" line-type mx="12" />
				<Tab :labels="labels" mx="0" />
				<Tab :labels="labels" line-type mx="0" />
			</div>
		</div>
		<Divider />

		<div class="my-8 px-4 text-xl font-bold">单独使用 Tab</div>
		<div class="my-4">
			<Tab :labels="labels" :active="active" @click-tab="clickTabFun" />
			<div class="mt-4">当前 Tab 点击的 active：{{ active }}</div>
		</div>
		<Divider />
	</div>
</template>
