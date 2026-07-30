<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue';
import type { IndexBarItemProps, IndexBarProps } from '../types';
import {
	resolveIndexBarDerived,
	resolveIndexBarContentTooShort,
	resolveIndexBarInitialTouchState,
	resolveIndexBarMeasuredClientHeight,
	resolveIndexBarMeasuredClientHeights,
	resolveIndexBarMeasuredBarHeightState,
	resolveIndexBarMeasuredHeightsState,
	resolveIndexBarScrollAction,
	resolveIndexBarScrollTop,
	resolveIndexBarTouchEndAction,
	resolveIndexBarTouchSelectAction
} from '@any-tdf/common/derived/indexBar';
import { Transition as MotionTransition } from '@any-tdf/vue-motion';

type IndexBarItem = IndexBarItemProps<unknown>;

const props = withDefaults(defineProps<Omit<IndexBarProps<unknown>, 'children'> & {}>(), {
	data: () => [],
	current: 0,
	top: 0,
	height: 100,
	radius: '',
	scrollAlign: true,
	titleInjClass: '',
	textInjClass: ''
});

const emit = defineEmits<{
	'update:current': [value: number];
	clickChild: [index: number, group: IndexBarItem, childIndex: number, child: unknown];
}>();

const bodyRef = ref<HTMLDivElement | null>(null);
const barRef = ref<HTMLDivElement | null>(null);
const groupRefs = ref<(HTMLDivElement | null)[]>([]);
const barHeight = ref(0);
const groupHeights = ref<number[]>([]);
const currentIndex = ref(props.current);
const initialTouchState = resolveIndexBarInitialTouchState();
const currentTouch = ref(initialTouchState.currentTouch);
const isDown = ref(initialTouchState.isDown);
let resizeObserver: ResizeObserver | null = null;
let groupResizeObservers: ResizeObserver[] = [];

// 公共派生层处理 IndexBar 几何、class、style 和渲染状态，DOM 滚动与事件留在组件层。
// Shared derived layer handles IndexBar geometry, classes, styles and render state; DOM scrolling and events stay in the component layer.
const indexBarState = computed(() =>
	resolveIndexBarDerived<IndexBarItem>({
		data: props.data,
		current: currentIndex.value,
		currentTouch: currentTouch.value,
		radius: props.radius,
		scrollAlign: props.scrollAlign,
		titleInjClass: props.titleInjClass,
		textInjClass: props.textInjClass,
		top: props.top,
		height: props.height,
		barHeight: barHeight.value
	})
);
const longSumList = computed(() => resolveIndexBarMeasuredHeightsState({ measuredHeights: groupHeights.value }).longSumList);

const setCurrent = (index: number) => {
	currentIndex.value = index;
	emit('update:current', index);
};

const measureGroups = () => {
	// 公共 action 只处理测量数组，DOM ref 读取保留在组件层。
	// Shared action only handles measured arrays; DOM ref reads stay in the component layer.
	const action = resolveIndexBarMeasuredHeightsState({
		currentHeights: groupHeights.value,
		measuredHeights: resolveIndexBarMeasuredClientHeights(groupRefs.value)
	});
	if (action.shouldUpdate) {
		groupHeights.value = action.groupHeights;
	}
};

const measureBar = () => {
	const action = resolveIndexBarMeasuredBarHeightState({
		currentBarHeight: barHeight.value,
		measuredBarHeight: resolveIndexBarMeasuredClientHeight(barRef.value)
	});
	if (action.shouldUpdate) {
		barHeight.value = action.barHeight;
	}
};

const measure = async () => {
	await nextTick();
	measureGroups();
	measureBar();
	if (resolveIndexBarContentTooShort({ height: props.height, barHeight: barHeight.value })) {
		console.error('[VTDF IndexBar error] The index content area height is not enough.');
	}
};

const resetGroupObservers = () => {
	groupResizeObservers.forEach((observer) => observer.disconnect());
	groupResizeObservers = [];
	groupRefs.value.forEach((node) => {
		if (!node) return;
		const observer = new ResizeObserver(measureGroups);
		observer.observe(node);
		groupResizeObservers.push(observer);
	});
};

const setGroupRef = (element: unknown, index: number) => {
	groupRefs.value[index] = element instanceof HTMLDivElement ? element : null;
};

const scrollToIndex = (index: number) => {
	if (!bodyRef.value) return;
	const scrollTop = resolveIndexBarScrollTop({
		index,
		longSumList: longSumList.value,
		heights: groupHeights.value
	});
	bodyRef.value.scrollTop = scrollTop;
};

const touchBoxStart = (event: PointerEvent) => {
	if (indexBarState.value.itemHeight <= 0 || props.data.length === 0) return;
	const action = resolveIndexBarTouchSelectAction({
		clientY: event.clientY,
		barToTop: indexBarState.value.barToTop,
		itemHeight: indexBarState.value.itemHeight,
		dataLength: props.data.length
	});
	isDown.value = action.isDown;
	currentTouch.value = action.currentTouch;
	setCurrent(action.currentIndex);
	scrollToIndex(action.scrollIndex);
};

const touchBoxMove = (event: PointerEvent) => {
	if (!isDown.value || indexBarState.value.itemHeight <= 0) return;
	barRef.value?.setPointerCapture(event.pointerId);
	const action = resolveIndexBarTouchSelectAction({
		clientY: event.clientY,
		barToTop: indexBarState.value.barToTop,
		itemHeight: indexBarState.value.itemHeight,
		dataLength: props.data.length
	});
	currentTouch.value = action.currentTouch;
	setCurrent(action.currentIndex);
	scrollToIndex(action.scrollIndex);
};

const touchBoxEnd = (event?: PointerEvent) => {
	if (event && barRef.value?.hasPointerCapture(event.pointerId)) {
		barRef.value.releasePointerCapture(event.pointerId);
	}
	const action = resolveIndexBarTouchEndAction();
	currentTouch.value = action.currentTouch;
	isDown.value = action.isDown;
};

const scrollBody = () => {
	if (!bodyRef.value) return;
	const action = resolveIndexBarScrollAction({
		scrollTop: bodyRef.value.scrollTop,
		longSumList: longSumList.value
	});
	if (action.shouldUpdate) setCurrent(action.currentIndex);
};

const clickChild = (index: number, group: IndexBarItem, childIndex: number, child: unknown) => {
	emit('clickChild', index, group, childIndex, child);
};

watch(
	() => props.current,
	(current) => {
		currentIndex.value = current;
	}
);

watch(
	() => props.data,
	() => {
		groupRefs.value = [];
		measure();
	},
	{ deep: true }
);

onMounted(async () => {
	if (bodyRef.value) {
		bodyRef.value.scrollTop = 0;
	}
	await measure();
	resetGroupObservers();
	if (barRef.value) {
		resizeObserver = new ResizeObserver(measureBar);
		resizeObserver.observe(barRef.value);
	}
	window.addEventListener('resize', measure);
});

onUpdated(() => {
	measure();
	resetGroupObservers();
});

onBeforeUnmount(() => {
	resizeObserver?.disconnect();
	resizeObserver = null;
	groupResizeObservers.forEach((observer) => observer.disconnect());
	groupResizeObservers = [];
	window.removeEventListener('resize', measure);
});
</script>

<template>
	<div>
		<div ref="bodyRef" :class="indexBarState.bodyClass" :style="indexBarState.bodyStyle" @scroll="scrollBody">
			<div
				v-for="groupState in indexBarState.groups"
				:key="groupState.index"
				:ref="(element) => setGroupRef(element, groupState.index)"
				:class="groupState.groupClass"
			>
				<div :class="groupState.titleClass">{{ groupState.group.title }}</div>
				<template v-for="(child, childIndex) in groupState.group.child" :key="childIndex">
					<button type="button" :class="groupState.childClass" @click="clickChild(groupState.index, groupState.group, childIndex, child)">
						<slot :item="child" :child-index="childIndex" :group="groupState.group" :group-index="groupState.index">
							{{ child }}
						</slot>
					</button>
					<div :class="groupState.dividerClass" />
				</template>
			</div>
		</div>

		<div
			ref="barRef"
			:class="indexBarState.barClass"
			:style="indexBarState.barStyle"
			@pointerdown="touchBoxStart"
			@pointermove="touchBoxMove"
			@pointerup="touchBoxEnd"
			@pointerleave="touchBoxEnd"
			@pointercancel="touchBoxEnd"
		>
			<div v-for="item in indexBarState.barItems" :key="item.index" :class="item.wrapperClass">
				<div :class="item.itemClass">
					{{ item.group.index }}
				</div>
				<MotionTransition
					:visible="item.bubbleVisible"
					transition="fly"
					:in-params="indexBarState.bubbleTransitionParams"
					:out-params="indexBarState.bubbleTransitionParams"
					:class="item.bubbleClass"
				>
					{{ item.group.index }}
				</MotionTransition>
			</div>
		</div>
	</div>
</template>
