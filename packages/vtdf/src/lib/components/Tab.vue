<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { TabProps } from '../types';
import { resolveHiddenScrollbarCss } from '@any-tdf/common/derived/helpers';
import {
	resolveTabAutoScrollAction,
	resolveTabClickAction,
	resolveTabDerived,
	resolveTabMeasuredSizeState,
	resolveTabStateOptions
} from '@any-tdf/common/derived/tabs';
import Icon from './Icon.vue';

const props = withDefaults(defineProps<TabProps & {}>(), {
	labels: () => [],
	active: 0,
	lineType: false,
	radius: '',
	duration: 'base',
	layout: 'h',
	love: false,
	injClass: '',
	tabInjClass: '',
	activeTabInjClass: '',
	activeInjClass: '',
	mx: '2',
	overflow: false,
	showNum: 3,
	autoScroll: true
});

const emit = defineEmits<{
	'update:active': [active: number];
	clickTab: [active: number];
}>();

const tabDom = ref<HTMLDivElement | null>(null);
const overflowDom = ref<HTMLDivElement | null>(null);
const tabW = ref(0);
const tabH = ref(0);
const ofTabW = ref(0);
const ofTabH = ref(0);
const showIndexsOffset = ref(0);
let resizeObserver: ResizeObserver | null = null;

// 公共派生层统一 Tab 的 class、style、指标和滚动数学，DOM 测量与滚动执行留在组件层。
// Shared derivation centralizes Tab classes, styles, metrics and scroll math; DOM reads and scroll execution stay in the component layer.
const tabState = computed(() =>
	resolveTabDerived(
		resolveTabStateOptions({
			props: {
				...props,
				height: tabH.value,
				overflowHeight: ofTabH.value,
				overflowWidth: ofTabW.value,
				showIndexesOffset: showIndexsOffset.value,
				width: tabW.value
			}
		})
	)
);
const css = resolveHiddenScrollbarCss({ selector: '.no-scrollbar' });

const clickTabFun = (index: number) => {
	// 公共动作函数只返回 active 更新结果，组件层负责状态写入和事件触发。
	// Shared action function only returns the active update result; the component writes state and fires events.
	const action = resolveTabClickAction({ index });
	emit('update:active', action.nextActive);
	if (action.shouldEmit) emit('clickTab', action.nextActive);
};

const updateSize = () => {
	// 公共测量函数只处理数值状态，DOM 读取仍留在组件层。
	// Shared measurement helper only handles numeric state; DOM reads stay in the component layer.
	const measuredState = resolveTabMeasuredSizeState({
		current: {
			tabWidth: tabW.value,
			tabHeight: tabH.value,
			overflowWidth: ofTabW.value,
			overflowHeight: ofTabH.value
		},
		tabRect: tabDom.value?.getBoundingClientRect(),
		overflowRect: overflowDom.value?.getBoundingClientRect()
	});
	tabW.value = measuredState.tabWidth;
	tabH.value = measuredState.tabHeight;
	ofTabW.value = measuredState.overflowWidth;
	ofTabH.value = measuredState.overflowHeight;
};

watch(
	() => [tabState.value.activeIndex, props.autoScroll, tabState.value.showOverflow, tabState.value.overflow.itemW] as const,
	() => {
		const action = resolveTabAutoScrollAction({
			autoScroll: props.autoScroll,
			hasScrollElement: Boolean(overflowDom.value),
			showOverflow: tabState.value.showOverflow,
			scrollState: tabState.value.overflow.autoScrollState
		});
		if (action.shouldScroll && overflowDom.value) {
			overflowDom.value.scrollLeft = action.scrollLeft;
			if (action.shouldUpdateOffset) {
				showIndexsOffset.value = action.nextOffset;
			}
		}
	}
);

onMounted(() => {
	nextTick(updateSize);
	resizeObserver = new ResizeObserver(updateSize);
	if (tabDom.value) {
		resizeObserver.observe(tabDom.value);
	}
	if (overflowDom.value) {
		resizeObserver.observe(overflowDom.value);
	}
});

onBeforeUnmount(() => {
	resizeObserver?.disconnect();
	resizeObserver = null;
});
</script>

<template>
	<component :is="'style'" v-html="css" />
	<div v-if="tabState.showOverflow" ref="overflowDom" :class="tabState.overflow.rootClass">
		<div v-if="tabState.overflow.lineVisible" :class="tabState.lineClass" :style="tabState.overflow.lineStyleValue" />
		<div :class="tabState.overflow.indicatorClass" :style="tabState.overflow.indicatorStyleValue" />
		<div :class="tabState.overflow.listClass" :style="tabState.overflow.listStyleValue">
			<button
				v-for="itemState in tabState.items"
				:key="itemState.index"
				type="button"
				:class="itemState.overflowButtonClass"
				:style="itemState.overflowButtonStyleValue"
				@click="clickTabFun(itemState.index)"
			>
				<div v-if="itemState.label.icon" :class="tabState.iconClass">
					<Icon v-bind="itemState.label.icon" />
				</div>
				<div v-if="itemState.label.text" :class="tabState.textClass">
					{{ itemState.label.text }}
				</div>
			</button>
		</div>
	</div>

	<div v-else ref="tabDom" :class="tabState.normal.rootClass">
		<div v-if="tabState.normal.lineVisible" :class="tabState.lineClass" :style="tabState.normal.lineStyleValue" />
		<div :class="tabState.normal.indicatorClass" :style="tabState.normal.indicatorStyleValue" />
		<div :class="tabState.normal.listClass">
			<button
				v-for="itemState in tabState.items"
				:key="itemState.index"
				type="button"
				:class="itemState.buttonClass"
				@click="clickTabFun(itemState.index)"
			>
				<div v-if="itemState.label.icon" :class="tabState.iconClass">
					<Icon v-bind="itemState.label.icon" />
				</div>
				<div v-if="itemState.label.text" :class="tabState.textClass">
					{{ itemState.label.text }}
				</div>
			</button>
		</div>
	</div>
</template>
