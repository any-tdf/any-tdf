<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue';
import type { StepsProps } from '../types';
import {
	resolveStepsDerived,
	resolveStepsMeasuredClientHeights,
	resolveStepsMeasuredClientWidth,
	resolveStepsMeasuredHeightsState,
	resolveStepsMeasuredWidthState,
	resolveStepsStateOptions
} from '@any-tdf/common/derived/steps';
import Icon from './Icon.vue';

const props = withDefaults(defineProps<StepsProps>(), {
	steps: () => [],
	current: 1,
	radius: '',
	barBorder: true,
	vertical: false
});

const containerRef = ref<HTMLDivElement | null>(null);
const itemRefs = ref<(HTMLDivElement | null)[]>([]);
const width = ref(0);
const heightList = ref<number[]>([]);
let resizeObserver: ResizeObserver | null = null;

// 公共派生层处理 Steps 的数据选择、class 和布局值，DOM 测量留在组件层。
// Shared derived layer handles Steps data selection, classes and layout values; DOM measurement stays in the component layer.
const stepsState = computed(() =>
	resolveStepsDerived(
		resolveStepsStateOptions({
			props: {
				steps: props.steps,
				current: props.current,
				radius: props.radius,
				barBorder: props.barBorder,
				vertical: props.vertical
			},
			width: width.value,
			heightList: heightList.value
		})
	)
);

const measure = async () => {
	await nextTick();
	if (!props.vertical) {
		const nextWidth = resolveStepsMeasuredClientWidth(containerRef.value);
		const widthState = resolveStepsMeasuredWidthState({
			currentWidth: width.value,
			measuredWidth: nextWidth
		});
		if (widthState.shouldUpdate) {
			width.value = widthState.width;
		}
		return;
	}
	const nextHeightList = resolveStepsMeasuredClientHeights(itemRefs.value);
	const heightState = resolveStepsMeasuredHeightsState({
		currentHeights: heightList.value,
		nextHeights: nextHeightList
	});
	if (heightState.shouldUpdate) {
		heightList.value = heightState.heights;
	}
};

const setItemRef = (element: unknown, index: number) => {
	itemRefs.value[index] = element instanceof HTMLDivElement ? element : null;
};

watch(() => [props.steps.length, props.vertical], measure);

onMounted(() => {
	measure();
	resizeObserver = new ResizeObserver(() => {
		measure();
	});
	if (containerRef.value) {
		resizeObserver.observe(containerRef.value);
	}
	window.addEventListener('resize', measure);
});

onUpdated(() => {
	measure();
});

onBeforeUnmount(() => {
	resizeObserver?.disconnect();
	resizeObserver = null;
	window.removeEventListener('resize', measure);
});
</script>

<template>
	<div v-if="vertical" ref="containerRef" :class="stepsState.verticalRootClass">
		<div
			v-for="itemViewState in stepsState.items"
			:key="itemViewState.index"
			:ref="(element) => setItemRef(element, itemViewState.index)"
			:class="itemViewState.verticalItemClass"
		>
			<div :class="itemViewState.barWrapperClass">
				<div :class="itemViewState.lineClass" :style="itemViewState.lineStyle" />
				<div v-if="itemViewState.itemState.hasBar" :class="itemViewState.barClass" :style="itemViewState.barStyle">
					<template v-if="itemViewState.barContentState.kind === 'icon'">
						<div :class="itemViewState.barIconClass">
							<Icon v-bind="itemViewState.barContentState.iconProps" :size="16" />
						</div>
					</template>
					<img
						v-else-if="itemViewState.barContentState.kind === 'image'"
						:class="itemViewState.barImageClass"
						:src="itemViewState.barContentState.src"
						alt=""
					/>
					<div v-else-if="itemViewState.barContentState.kind === 'text'" :class="itemViewState.barTextClass">
						{{ itemViewState.barContentState.text }}
					</div>
				</div>
				<div v-else :class="itemViewState.barClass" :style="itemViewState.barStyle" />
			</div>
			<div :class="itemViewState.contentClass">
				<div :class="itemViewState.titleClass">
					{{ itemViewState.itemState.title }}
				</div>
				<div v-if="itemViewState.itemState.desc" :class="itemViewState.descClass">
					{{ itemViewState.itemState.desc }}
				</div>
				<component :is="itemViewState.itemState.inject" v-if="itemViewState.itemState.inject" />
			</div>
		</div>
	</div>

	<div v-else ref="containerRef" :class="stepsState.horizontalRootClass">
		<div v-for="itemViewState in stepsState.items" :key="itemViewState.index" :class="itemViewState.horizontalItemClass">
			<div :class="itemViewState.barWrapperClass">
				<div :class="itemViewState.lineClass" :style="itemViewState.lineStyle" />
				<div v-if="itemViewState.itemState.hasBar" :class="itemViewState.barClass" :style="itemViewState.barStyle">
					<template v-if="itemViewState.barContentState.kind === 'icon'">
						<div :class="itemViewState.barIconClass">
							<Icon v-bind="itemViewState.barContentState.iconProps" :size="16" />
						</div>
					</template>
					<img
						v-else-if="itemViewState.barContentState.kind === 'image'"
						:class="itemViewState.barImageClass"
						:src="itemViewState.barContentState.src"
						alt=""
					/>
					<div v-else-if="itemViewState.barContentState.kind === 'text'" :class="itemViewState.barTextClass">
						{{ itemViewState.barContentState.text }}
					</div>
				</div>
				<div v-else :class="itemViewState.barClass" :style="itemViewState.barStyle" />
			</div>
			<div :class="itemViewState.contentClass">
				<div :class="itemViewState.titleClass">
					{{ itemViewState.itemState.title }}
				</div>
				<div v-if="itemViewState.itemState.desc" :class="itemViewState.descClass">
					{{ itemViewState.itemState.desc }}
				</div>
				<component :is="itemViewState.itemState.inject" v-if="itemViewState.itemState.inject" />
			</div>
		</div>
	</div>
</template>
