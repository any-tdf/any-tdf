<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type Component } from 'vue';
import type { LoadingProps } from '../types';
import {
	resolveLoadingAnimationPlayState,
	resolveLoadingAnimationTargets,
	resolveLoadingDerived,
	resolveLoadingIntersectionState,
	resolveLoadingStateOptions,
	type LoadingAnimationPlayState
} from '@any-tdf/common/derived/loading';
import * as fourColorLoadings from './loading/loadings/fourColor';
import * as oneColorLoadings from './loading/loadings/oneColor';
import * as twoColorLoadings from './loading/loadings/twoColor';

const props = withDefaults(defineProps<LoadingProps>(), {
	type: '1_0',
	height: '8',
	width: '8',
	theme: false,
	inverse: false,
	customColor: () => [],
	lazyAnimation: true,
	speed: 1
});

const loadingDom = ref<HTMLDivElement | null>(null);
let observer: IntersectionObserver | null = null;
let observedTarget: Element | null = null;
let currentPlayState: LoadingAnimationPlayState = 'running';
let visibilityFrame = 0;
let visibilityListenersActive = false;
const scrollListenerOptions = { capture: true, passive: true };

const loadingMap: Record<string, Component> = {
	...oneColorLoadings,
	...twoColorLoadings,
	...fourColorLoadings
};

// 公共派生负责尺寸 class 和变体 key，组件只保留动态组件和 DOM 动画暂停逻辑。
// Shared derivation resolves size classes and variant keys; the component keeps dynamic component and DOM animation pause logic.
const loadingState = computed(() =>
	resolveLoadingDerived(
		resolveLoadingStateOptions({
			props: {
				height: props.height,
				width: props.width,
				type: props.type
			}
		})
	)
);
const customColor = computed(() => props.customColor);
const loadingComponent = computed(() => loadingMap[loadingState.value.componentName] ?? oneColorLoadings.Loading1_0);

const disconnectAnimationObserver = () => {
	if (observedTarget) {
		observer?.unobserve(observedTarget);
	}
	observedTarget = null;
	observer?.disconnect();
	observer = null;
	removeAnimationVisibilityListeners();
};

const applyAnimationPlayState = (playState = currentPlayState) => {
	currentPlayState = playState;
	if (!loadingDom.value) return;

	resolveLoadingAnimationTargets(loadingDom.value).forEach((child) => {
		child.style.animationPlayState = playState;
	});
};

const resolveCurrentIntersectionState = () => {
	if (!loadingDom.value || typeof window === 'undefined') return false;

	const viewportHeight = window.innerHeight;
	const viewportWidth = window.innerWidth;
	return resolveLoadingIntersectionState({
		rect: loadingDom.value.getBoundingClientRect(),
		viewportHeight,
		viewportWidth
	});
};

const syncAnimationVisibility = () => {
	if (!props.lazyAnimation) {
		applyAnimationPlayState('running');
		return;
	}
	const playState = resolveLoadingAnimationPlayState(resolveCurrentIntersectionState());
	applyAnimationPlayState(playState);
};

const queueAnimationVisibilitySync = () => {
	if (visibilityFrame) return;
	if (typeof requestAnimationFrame === 'undefined') {
		syncAnimationVisibility();
		return;
	}

	visibilityFrame = requestAnimationFrame(() => {
		visibilityFrame = 0;
		syncAnimationVisibility();
	});
};

const addAnimationVisibilityListeners = () => {
	if (visibilityListenersActive || typeof window === 'undefined') return;
	window.addEventListener('scroll', queueAnimationVisibilitySync, scrollListenerOptions);
	window.addEventListener('resize', queueAnimationVisibilitySync, { passive: true });
	visibilityListenersActive = true;
	queueAnimationVisibilitySync();
};

const removeAnimationVisibilityListeners = () => {
	if (visibilityFrame && typeof cancelAnimationFrame !== 'undefined') {
		cancelAnimationFrame(visibilityFrame);
	}
	visibilityFrame = 0;
	if (!visibilityListenersActive || typeof window === 'undefined') return;
	window.removeEventListener('scroll', queueAnimationVisibilitySync, scrollListenerOptions);
	window.removeEventListener('resize', queueAnimationVisibilitySync);
	visibilityListenersActive = false;
};

const observeAnimationTarget = () => {
	if (!observer || !loadingDom.value) return;
	if (observedTarget) {
		observer.unobserve(observedTarget);
	}
	observedTarget = loadingDom.value;
	observer.observe(loadingDom.value);
};

const waitLoadingRendered = async () => {
	await nextTick();
	await nextTick();
};

const setupAnimationObserver = async () => {
	await waitLoadingRendered();
	disconnectAnimationObserver();

	if (!loadingDom.value) return;
	if (!props.lazyAnimation) {
		applyAnimationPlayState('running');
		return;
	}
	if (typeof IntersectionObserver === 'undefined') {
		syncAnimationVisibility();
		addAnimationVisibilityListeners();
		return;
	}

	observer = new IntersectionObserver((entries) => {
		const isIntersecting = entries.some(
			(entry) => entry.target === loadingDom.value && (entry.isIntersecting || entry.intersectionRatio > 0)
		);
		const hasViewportFallback = resolveCurrentIntersectionState();
		const playState = resolveLoadingAnimationPlayState(isIntersecting);
		applyAnimationPlayState(playState === 'running' || hasViewportFallback ? 'running' : 'paused');
	});
	observeAnimationTarget();
	syncAnimationVisibility();
	addAnimationVisibilityListeners();
};

onMounted(() => {
	void setupAnimationObserver();
});

watch(
	() => props.lazyAnimation,
	async () => {
		await setupAnimationObserver();
	}
);

watch(
	() => [loadingState.value.type, loadingState.value.sizeClass, props.theme, props.inverse, props.speed, props.customColor.join('|')],
	async () => {
		await setupAnimationObserver();
	}
);

onBeforeUnmount(() => {
	disconnectAnimationObserver();
});
</script>

<template>
	<div ref="loadingDom">
		<component
			:is="loadingComponent"
			:theme="theme"
			:inverse="inverse"
			:size="loadingState.sizeClass"
			:custom-color="customColor"
			:speed="speed"
		/>
	</div>
</template>
