<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { TabsProps } from '../types';
import {
	resolveTabsClickAction,
	resolveTabsDerived,
	resolveTabsLabelCount,
	resolveTabsMeasuredClientWidth,
	resolveTabsStateOptions
} from '@any-tdf/common/derived/tabs';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import { splitTabCallbacks } from '@any-tdf/common/derived/props';
import Tab from './Tab.vue';

const props = withDefaults(defineProps<TabsProps>(), {
	tab: () => ({}),
	duration: 'base',
	position: 't',
	transition: true,
	active: 0
});

const emit = defineEmits<{
	'update:active': [active: number];
	change: [active: number];
}>();

defineSlots<{
	default?: (props: { active: number }) => unknown;
}>();

const viewportRef = ref<HTMLDivElement | null>(null);
const width = ref(
	resolveViewportDimension({
		value: typeof window === 'undefined' ? undefined : window.innerWidth
	})
);
const internalActive = ref(props.active);
let resizeObserver: ResizeObserver | null = null;

const tabConfig = computed(() => splitTabCallbacks(props.tab));
const labelCount = computed(() => resolveTabsLabelCount(tabConfig.value.tabProps));
const tabProps = computed(() => tabConfig.value.tabProps);
// 输入组件状态，返回框架无关的位置和内容切换派生结果。
// Receive component state and return framework-agnostic position and transition derivations.
const tabsState = computed(() =>
	resolveTabsDerived(
		resolveTabsStateOptions({
			labelCount: labelCount.value,
			width: width.value,
			active: internalActive.value,
			props: { duration: props.duration, position: props.position, transition: props.transition }
		})
	)
);

const updateWidth = () => {
	width.value = resolveTabsMeasuredClientWidth(viewportRef.value);
};

const clickTab = (active: number) => {
	const tabOnClickTab = tabConfig.value.tabOnClickTab;
	if (typeof tabOnClickTab === 'function') tabOnClickTab(active);
	// 公共动作函数只返回 active 更新结果，组件层负责状态写入和事件触发。
	// Shared action function only returns the active update result; the component writes state and fires events.
	const action = resolveTabsClickAction({ index: active });
	internalActive.value = action.nextActive;
	emit('update:active', action.nextActive);
	if (action.shouldEmit) emit('change', action.nextActive);
};

watch(
	() => props.active,
	(nextActive) => {
		internalActive.value = nextActive;
	}
);

watch(
	() => [props.position, props.transition, labelCount.value],
	() => {
		void nextTick(updateWidth);
	}
);

onMounted(() => {
	updateWidth();
	resizeObserver = new ResizeObserver(updateWidth);
	if (viewportRef.value) {
		resizeObserver.observe(viewportRef.value);
	}
});

onBeforeUnmount(() => {
	resizeObserver?.disconnect();
	resizeObserver = null;
});
</script>

<template>
	<div v-if="tabsState.positionState.isTop">
		<Tab v-bind="tabProps" :active="internalActive" :duration="duration" @click-tab="clickTab" />
		<div v-if="tabsState.showTransitionViewport" ref="viewportRef" :class="tabsState.viewportClass">
			<div :class="tabsState.transitionClass" :style="tabsState.transitionStyleValue">
				<slot :active="internalActive" />
			</div>
		</div>
		<slot v-else :active="internalActive" />
	</div>

	<div v-else-if="tabsState.positionState.isBottom">
		<div v-if="tabsState.showTransitionViewport" ref="viewportRef" :class="tabsState.viewportClass">
			<div :class="tabsState.transitionClass" :style="tabsState.transitionStyleValue">
				<slot :active="internalActive" />
			</div>
		</div>
		<slot v-else :active="internalActive" />
		<Tab v-bind="tabProps" :active="internalActive" :duration="duration" @click-tab="clickTab" />
	</div>

	<div v-else-if="tabsState.positionState.isLeft" :class="tabsState.verticalRootClass">
		<div>
			<Tab v-bind="tabProps" :active="internalActive" :duration="duration" layout="v" @click-tab="clickTab" />
		</div>
		<div :class="tabsState.verticalContentClass">
			<slot :active="internalActive" />
		</div>
	</div>

	<div v-else-if="tabsState.positionState.isRight" :class="tabsState.verticalRootClass">
		<div :class="tabsState.verticalContentClass">
			<slot :active="internalActive" />
		</div>
		<div>
			<Tab v-bind="tabProps" :active="internalActive" :duration="duration" layout="v" @click-tab="clickTab" />
		</div>
	</div>
</template>
