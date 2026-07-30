<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { resolveHiddenScrollbarCss } from '@any-tdf/common/derived/helpers';
import {
	resolveScrollRadioDerived,
	resolveScrollRadioScrollAction,
	resolveScrollRadioStateOptions
} from '@any-tdf/common/derived/scrollRadio';

type ScrollRadioProps = {
	data?: Record<string, string>[];
	showRow?: 3 | 5 | 7;
	initIndex?: number;
	labelKey?: string;
	autoScrollToLast?: boolean;
	useAnimation?: boolean;
	lastSelectedIndex?: number;
	align?: 'center' | 'left' | 'right';
	injClass?: string;
};

const props = withDefaults(defineProps<ScrollRadioProps>(), {
	data: () => [],
	showRow: 5,
	initIndex: 0,
	labelKey: 'label',
	autoScrollToLast: true,
	useAnimation: true,
	lastSelectedIndex: 0,
	align: 'center',
	injClass: ''
});

const emit = defineEmits<{
	scrollEnd: [index: number, isTouch: boolean];
	scrolling: [index: number];
}>();

const scrollElementRef = ref<HTMLDivElement | null>(null);
const isTouch = ref(false);
let scrollTimer: ReturnType<typeof setTimeout> | null = null;

// 公共派生层处理 ScrollRadio 的列表布局和滚动数学，DOM 监听留在组件层。
// Shared derived layer handles ScrollRadio list layout and scroll math; DOM listeners stay in the component layer.
const scrollRadioState = computed(() =>
	resolveScrollRadioDerived(
		resolveScrollRadioStateOptions({
			props: {
				data: props.data,
				labelKey: props.labelKey,
				showRow: props.showRow,
				autoScrollToLast: props.autoScrollToLast,
				useAnimation: props.useAnimation,
				initIndex: props.initIndex,
				align: props.align,
				injClass: props.injClass
			},
			lastSelectedIndex: props.lastSelectedIndex
		})
	)
);
const css = resolveHiddenScrollbarCss({ selector: '.picker-contents' });

const scrollToSelected = () => {
	const scrollElement = scrollElementRef.value;
	if (!scrollElement) return;
	scrollElement.scrollTop = scrollRadioState.value.scrollTop;
};

const handleScroll = (event: Event) => {
	isTouch.value = true;
	const scrollTop = (event.target as HTMLElement).scrollTop;
	const scrollAction = resolveScrollRadioScrollAction({
		scrollTop,
		itemHeight: scrollRadioState.value.itemHeight,
		isTouch: isTouch.value
	});
	emit('scrolling', scrollAction.scrollingIndex);

	if (scrollTimer) {
		clearTimeout(scrollTimer);
	}
	scrollTimer = setTimeout(() => {
		emit('scrollEnd', scrollAction.scrollEndIndex, scrollAction.wasTouch);
	});
};

watch(
	() => [scrollRadioState.value.scrollTop, scrollRadioState.value.paddedData.length] as const,
	() => {
		scrollToSelected();
	}
);

onMounted(() => {
	scrollToSelected();
});

onBeforeUnmount(() => {
	if (scrollTimer) {
		clearTimeout(scrollTimer);
		scrollTimer = null;
	}
});
</script>

<template>
	<component :is="'style'" v-html="css" />
	<div :class="scrollRadioState.rootClass" :style="scrollRadioState.wrapperStyle">
		<div ref="scrollElementRef" :class="scrollRadioState.scrollClass" :style="scrollRadioState.wrapperStyle" @scroll.passive="handleScroll">
			<div
				v-for="(item, index) in scrollRadioState.paddedData"
				:key="index"
				:class="scrollRadioState.itemClass"
				:style="scrollRadioState.itemStyle"
			>
				<div :class="scrollRadioState.labelClass">{{ item[labelKey] }}</div>
			</div>
			<div :class="scrollRadioState.maskLayerClass" :style="scrollRadioState.wrapperStyle">
				<div :class="scrollRadioState.topMaskClass" :style="scrollRadioState.maskStyle" />
				<div :class="scrollRadioState.highlightClass" :style="scrollRadioState.itemStyle" />
				<div :class="scrollRadioState.bottomMaskClass" :style="scrollRadioState.maskStyle" />
			</div>
		</div>
	</div>
</template>
