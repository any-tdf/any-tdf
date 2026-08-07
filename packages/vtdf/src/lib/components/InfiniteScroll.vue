<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue';
import type { InfiniteScrollProps, InfiniteScrollStatus } from '../types';
import Loading from './Loading.vue';
import { useConfig } from './adapter/config';
import { zh_CN } from '../lang';
import { addScrollListener, getScrollElement, getScrollMetrics } from './adapter/scroll';
import {
	infiniteScrollDefaultTexts,
	resolveInfiniteScrollDerived,
	resolveInfiniteScrollDetail,
	resolveInfiniteScrollDistance,
	resolveInfiniteScrollRootMargin,
	resolveInfiniteScrollShouldLoad
} from '@any-tdf/common/derived/infiniteScroll';

const props = withDefaults(defineProps<InfiniteScrollProps>(), {
	loading: false,
	finished: false,
	error: false,
	disabled: false,
	offset: 300,
	direction: 'down',
	immediateCheck: true,
	loadingText: undefined,
	finishedText: undefined,
	errorText: undefined,
	loadingIcon: undefined,
	scrollTarget: null,
	injClass: '',
	textClass: ''
});

const emit = defineEmits<{
	load: [isRetry: boolean];
}>();

const config = useConfig();
const slots = useSlots();
const rootRef = ref<HTMLDivElement | null>(null);
const defaultLoadingIcon: NonNullable<InfiniteScrollProps['loadingIcon']> = {
	type: '1_0',
	height: '4',
	width: '4',
	theme: true
};
let locked = false;
let removeScrollListener: (() => void) | null = null;
let observer: IntersectionObserver | null = null;

const textState = computed(() => {
	const lang = config.locale.infiniteScroll || zh_CN.infiniteScroll || infiniteScrollDefaultTexts;
	return {
		loadingText: props.loadingText ?? lang.loadingText,
		finishedText: props.finishedText ?? lang.finishedText,
		errorText: props.errorText ?? lang.errorText
	};
});

const infiniteScrollState = computed(() =>
	resolveInfiniteScrollDerived({
		disabled: props.disabled,
		error: props.error,
		errorText: textState.value.errorText,
		finished: props.finished,
		finishedText: textState.value.finishedText,
		injClass: props.injClass,
		loading: props.loading,
		loadingText: textState.value.loadingText,
		textClass: props.textClass
	})
);
const loadingIconState = computed(() => (props.loadingIcon === null ? null : { ...defaultLoadingIcon, ...props.loadingIcon }));

const statusSlotNames: Record<InfiniteScrollStatus, 'loadingChild' | 'finishedChild' | 'errorChild' | null> = {
	idle: null,
	loading: 'loadingChild',
	finished: 'finishedChild',
	error: 'errorChild'
};

const currentSlotName = computed(() => {
	if (slots.default) return 'default';
	const statusSlotName = statusSlotNames[infiniteScrollState.value.status];
	return statusSlotName && slots[statusSlotName] ? statusSlotName : null;
});

const emitLoad = (isRetry: boolean) => {
	if (locked) return;
	locked = true;
	emit('load', isRetry);
};

const retry = () => {
	locked = false;
	emitLoad(true);
};

const detail = computed(() => resolveInfiniteScrollDetail({ status: infiniteScrollState.value.status, retry }));

const check = () => {
	const scrollElement = getScrollElement(props.scrollTarget, rootRef.value);
	const metrics = getScrollMetrics(scrollElement);
	const distance = resolveInfiniteScrollDistance({ ...metrics, direction: props.direction });
	if (
		resolveInfiniteScrollShouldLoad({
			disabled: props.disabled,
			distance,
			error: props.error,
			finished: props.finished,
			loading: props.loading,
			offset: props.offset,
			visible: true
		})
	) {
		emitLoad(false);
	}
};

watch(
	() => [props.loading, props.error, props.finished, props.disabled],
	() => {
		// 任一阻塞状态解除后主动复检，避免内容变化后停在边界不再触发
		// Re-check after any blocking state clears so the component does not stall at the boundary
		if (!props.loading) locked = false;
		if (props.loading || props.error || props.finished || props.disabled) return;
		if (typeof window === 'undefined') return;
		window.requestAnimationFrame(check);
	}
);

onMounted(() => {
	const scrollElement = getScrollElement(props.scrollTarget, rootRef.value);
	removeScrollListener = addScrollListener(scrollElement, check);
	if (rootRef.value && typeof IntersectionObserver !== 'undefined') {
		const root = scrollElement === window ? null : (scrollElement as HTMLElement);
		observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) check();
			},
			{ root, rootMargin: resolveInfiniteScrollRootMargin({ direction: props.direction, offset: props.offset }) }
		);
		observer.observe(rootRef.value);
	}
	if (props.immediateCheck) window.setTimeout(check, 0);
});

onBeforeUnmount(() => {
	observer?.disconnect();
	observer = null;
	removeScrollListener?.();
	removeScrollListener = null;
});

defineExpose({ check });
</script>

<template>
	<div ref="rootRef" :class="infiniteScrollState.rootClass" :aria-busy="infiniteScrollState.ariaBusy" aria-live="polite">
		<slot v-if="currentSlotName" :name="currentSlotName" v-bind="detail" />
		<div v-else-if="infiniteScrollState.status === 'loading'" :class="infiniteScrollState.textClass">
			<Loading v-if="loadingIconState" v-bind="loadingIconState" />
			<span>{{ infiniteScrollState.defaultText }}</span>
		</div>
		<div v-else-if="infiniteScrollState.status === 'finished'" :class="infiniteScrollState.textClass">
			{{ infiniteScrollState.defaultText }}
		</div>
		<button v-else-if="infiniteScrollState.status === 'error'" type="button" :class="infiniteScrollState.errorButtonClass" @click="retry">
			{{ infiniteScrollState.defaultText }}
		</button>
	</div>
</template>
