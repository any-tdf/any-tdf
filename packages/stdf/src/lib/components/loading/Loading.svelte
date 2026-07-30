<script lang="ts">
	import { tick } from 'svelte';
	import type { LoadingProps } from '../../types/index.js';
	import {
		resolveLoadingAnimationPlayState,
		resolveLoadingAnimationTargets,
		resolveLoadingDerived,
		resolveLoadingIntersectionState,
		resolveLoadingStateOptions,
		type LoadingAnimationPlayState
	} from '@any-tdf/common/derived/loading';
	import {
		Loading1_0,
		Loading1_1,
		Loading1_2,
		Loading1_3,
		Loading1_4,
		Loading1_5,
		Loading1_6,
		Loading1_7,
		Loading1_8,
		Loading1_9,
		Loading1_10,
		Loading1_11,
		Loading1_12,
		Loading1_13,
		Loading1_14,
		Loading1_15,
		Loading1_16,
		Loading1_17,
		Loading1_18,
		Loading1_19,
		Loading1_20,
		Loading1_21,
		Loading1_22,
		Loading1_23,
		Loading1_24,
		Loading1_25,
		Loading1_26,
		Loading1_27,
		Loading1_28,
		Loading1_29,
		Loading1_30,
		Loading1_31,
		Loading1_32,
		Loading1_33,
		Loading1_34,
		Loading1_35,
		Loading1_36,
		Loading1_37,
		Loading1_38,
		Loading1_39,
		Loading1_40,
		Loading1_41,
		Loading1_42,
		Loading1_43,
		Loading1_44,
		Loading1_45,
		Loading1_46,
		Loading1_47,
		Loading1_48,
		Loading1_49,
		Loading1_50,
		Loading1_51,
		Loading1_52,
		Loading1_53
	} from './loadings/oneColor/index.js';
	import { Loading2_0, Loading2_1, Loading2_2, Loading2_3, Loading2_4, Loading2_5 } from './loadings/twoColor/index.js';
	import { Loading4_0, Loading4_1, Loading4_2, Loading4_3 } from './loadings/fourColor/index.js';

	let {
		type = '1_0',
		height = '8',
		width = '8',
		theme = false,
		inverse = false,
		customColor = [],
		lazyAnimation = true,
		speed = $bindable(1)
	}: LoadingProps = $props();

	// loading 元素
	// loading element
	let loadingDom: HTMLDivElement | null = $state(null);
	let observer: IntersectionObserver | null = null;
	let observedTarget: Element | null = null;
	let currentPlayState: LoadingAnimationPlayState = 'running';
	let visibilityFrame = 0;
	let visibilityListenersActive = false;
	const scrollListenerOptions = { capture: true, passive: true };

	// 公共派生负责尺寸 class 和变体 key，组件只保留渲染分支和 DOM 动画暂停逻辑。
	// Shared derivation resolves size classes and variant keys; the component keeps render branches and DOM animation pause logic.
	let loadingState = $derived(
		resolveLoadingDerived(
			resolveLoadingStateOptions({
				props: { height, width, type }
			})
		)
	);

	const applyAnimationPlayState = (playState = currentPlayState) => {
		if (!loadingDom) return;
		currentPlayState = playState;

		resolveLoadingAnimationTargets(loadingDom).forEach((child) => {
			child.style.animationPlayState = playState;
		});
	};

	const resolveCurrentIntersectionState = () => {
		if (!loadingDom || typeof window === 'undefined') return false;

		const viewportHeight = window.innerHeight;
		const viewportWidth = window.innerWidth;
		return resolveLoadingIntersectionState({
			rect: loadingDom.getBoundingClientRect(),
			viewportHeight,
			viewportWidth
		});
	};

	const syncAnimationVisibility = () => {
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

	const clearObservedTarget = () => {
		if (observedTarget) {
			observer?.unobserve(observedTarget);
		}
		observedTarget = null;
	};

	const observeAnimationTarget = () => {
		if (!observer || !loadingDom) return;
		clearObservedTarget();

		observedTarget = loadingDom;
		observer.observe(loadingDom);
	};

	// 判断 Loading 根节点是否在可视区域内；播放状态会同步到根节点和所有动画后代。
	// Determine whether the Loading root is visible, then sync play state to the root and animation descendants.
	$effect(() => {
		const target = loadingDom;
		const shouldLazyAnimation = lazyAnimation;
		if (!target) return;

		if (!shouldLazyAnimation) {
			clearObservedTarget();
			removeAnimationVisibilityListeners();
			applyAnimationPlayState('running');
			return;
		}

		if (typeof IntersectionObserver === 'undefined') {
			clearObservedTarget();
			syncAnimationVisibility();
			addAnimationVisibilityListeners();
			return () => {
				removeAnimationVisibilityListeners();
			};
		}

		observer = new IntersectionObserver((entries) => {
			const isIntersecting = entries.some((entry) => entry.target === target && entry.isIntersecting);
			const playState = resolveLoadingAnimationPlayState(isIntersecting);
			applyAnimationPlayState(playState);
		});
		observeAnimationTarget();
		syncAnimationVisibility();
		addAnimationVisibilityListeners();

		return () => {
			clearObservedTarget();
			removeAnimationVisibilityListeners();
			observer?.disconnect();
			observer = null;
		};
	});

	$effect(() => {
		void loadingState.type;
		void loadingState.sizeClass;
		void theme;
		void inverse;
		void speed;
		void customColor;
		void tick().then(() => {
			observeAnimationTarget();
			if (lazyAnimation) {
				syncAnimationVisibility();
				return;
			}
			applyAnimationPlayState('running');
		});
	});
</script>

<div bind:this={loadingDom}>
	<!--one-->
	{#if loadingState.type === '1_0'}
		<Loading1_0 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_1'}
		<Loading1_1 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_2'}
		<Loading1_2 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_3'}
		<Loading1_3 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_4'}
		<Loading1_4 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_5'}
		<Loading1_5 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_6'}
		<Loading1_6 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_7'}
		<Loading1_7 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_8'}
		<Loading1_8 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_9'}
		<Loading1_9 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_10'}
		<Loading1_10 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_11'}
		<Loading1_11 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_12'}
		<Loading1_12 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_13'}
		<Loading1_13 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_14'}
		<Loading1_14 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_15'}
		<Loading1_15 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_16'}
		<Loading1_16 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_17'}
		<Loading1_17 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_18'}
		<Loading1_18 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_19'}
		<Loading1_19 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_20'}
		<Loading1_20 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_21'}
		<Loading1_21 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_22'}
		<Loading1_22 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_23'}
		<Loading1_23 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_24'}
		<Loading1_24 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_25'}
		<Loading1_25 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_26'}
		<Loading1_26 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_27'}
		<Loading1_27 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_28'}
		<Loading1_28 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_29'}
		<Loading1_29 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_30'}
		<Loading1_30 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_31'}
		<Loading1_31 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_32'}
		<Loading1_32 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_33'}
		<Loading1_33 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_34'}
		<Loading1_34 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_35'}
		<Loading1_35 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_36'}
		<Loading1_36 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_37'}
		<Loading1_37 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_38'}
		<Loading1_38 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_39'}
		<Loading1_39 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_40'}
		<Loading1_40 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_41'}
		<Loading1_41 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_42'}
		<Loading1_42 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_43'}
		<Loading1_43 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_44'}
		<Loading1_44 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_45'}
		<Loading1_45 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_46'}
		<Loading1_46 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_47'}
		<Loading1_47 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_48'}
		<Loading1_48 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_49'}
		<Loading1_49 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_50'}
		<Loading1_50 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_51'}
		<Loading1_51 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_52'}
		<Loading1_52 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '1_53'}
		<Loading1_53 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />

		<!--twoColor-->
	{:else if loadingState.type === '2_0'}
		<Loading2_0 {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '2_1'}<Loading2_1 {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '2_2'}<Loading2_2 {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '2_3'}<Loading2_3 {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '2_4'}<Loading2_4 {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '2_5'}<Loading2_5 {inverse} size={loadingState.sizeClass} {customColor} bind:speed />

		<!--fourColor-->
	{:else if loadingState.type === '4_0'}
		<Loading4_0 size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '4_1'}
		<Loading4_1 size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '4_2'}
		<Loading4_2 size={loadingState.sizeClass} {customColor} bind:speed />
	{:else if loadingState.type === '4_3'}
		<Loading4_3 size={loadingState.sizeClass} {customColor} bind:speed />
	{:else}
		<Loading1_0 {theme} {inverse} size={loadingState.sizeClass} {customColor} bind:speed />
	{/if}
</div>
