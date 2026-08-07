<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import type { LangProps } from '../../lang/index.js';
	import { zh_CN } from '../../lang/index.js';
	import type { PullRefreshProps, PullRefreshStatus } from '../../types/index.js';
	import Loading from '../loading/Loading.svelte';
	import { getScrollElement, getScrollMetrics } from '../utils/scroll.js';
	import {
		pullRefreshDefaultTexts,
		resolvePullRefreshCanStart,
		resolvePullRefreshChangeDetail,
		resolvePullRefreshCompletionAction,
		resolvePullRefreshDerived,
		resolvePullRefreshDistance,
		resolvePullRefreshGestureIntent,
		resolvePullRefreshGestureLock,
		resolvePullRefreshReleaseAction,
		type PullRefreshGestureLock
	} from '@any-tdf/common/derived/pullRefresh';

	const currentLang: LangProps = getContext('STDF_lang') || zh_CN;
	const pullRefreshLang = currentLang.pullRefresh || zh_CN.pullRefresh || pullRefreshDefaultTexts;
	const defaultLoadingIcon: NonNullable<PullRefreshProps['loadingIcon']> = { type: '1_0', height: '4', width: '4', theme: true };

	let {
		refreshing = $bindable(false),
		disabled = false,
		headHeight = 50,
		threshold = 60,
		pullFactor = 1,
		maxDistance = 0,
		successDuration = 500,
		animationDuration = 300,
		pullingText = pullRefreshLang.pullingText,
		canReleaseText = pullRefreshLang.canReleaseText,
		refreshingText = pullRefreshLang.refreshingText,
		successText = pullRefreshLang.successText,
		loadingIcon = undefined,
		scrollTarget = null,
		injClass = '',
		headClass = '',
		contentClass = '',
		children,
		normalChild,
		pullingChild,
		canReleaseChild,
		refreshingChild,
		successChild,
		onrefresh,
		onchange
	}: PullRefreshProps = $props();

	let rootEl: HTMLDivElement | null = $state(null);
	let distance = $state(0);
	let status = $state<PullRefreshStatus>('normal');
	let startX = 0;
	let startY = 0;
	let canPull = false;
	let gestureLock: PullRefreshGestureLock = 'none';
	let mouseDragging = false;
	let wasRefreshing = refreshing;
	let successTimer: ReturnType<typeof setTimeout> | null = null;

	const pullRefreshState = $derived(
		resolvePullRefreshDerived({
			animationDuration,
			canReleaseText,
			contentClass,
			disabled,
			distance,
			headClass,
			headHeight,
			injClass,
			pullingText,
			refreshing,
			refreshingText,
			status,
			successText,
			threshold
		})
	);
	const detail = $derived(resolvePullRefreshChangeDetail({ status: pullRefreshState.status, distance: pullRefreshState.distance, threshold }));
	const loadingIconState = $derived(loadingIcon === null ? null : { ...defaultLoadingIcon, ...loadingIcon });
	const customHead = $derived(
		pullRefreshState.status === 'success'
			? successChild
			: pullRefreshState.status === 'refreshing'
				? refreshingChild
				: pullRefreshState.status === 'canRelease'
					? canReleaseChild
					: pullRefreshState.status === 'pulling'
						? pullingChild
						: normalChild
	);

	const emitChange = (nextStatus: PullRefreshStatus, nextDistance: number) => {
		onchange?.(resolvePullRefreshChangeDetail({ status: nextStatus, distance: nextDistance, threshold }));
	};

	const clearSuccessTimer = () => {
		if (!successTimer) return;
		clearTimeout(successTimer);
		successTimer = null;
	};

	$effect(() => {
		if (refreshing) {
			clearSuccessTimer();
			wasRefreshing = true;
			distance = headHeight;
			status = 'refreshing';
			emitChange('refreshing', headHeight);
			return;
		}
		if (wasRefreshing) {
			wasRefreshing = false;
			const action = resolvePullRefreshCompletionAction({ headHeight, showSuccess: Boolean(successText) });
			distance = action.nextDistance;
			status = action.nextStatus;
			emitChange(action.nextStatus, action.nextDistance);
			clearSuccessTimer();
			successTimer = setTimeout(() => {
				distance = 0;
				status = 'normal';
				emitChange('normal', 0);
			}, successDuration);
		}
	});

	const startGesture = (clientX: number, clientY: number) => {
		const scrollElement = getScrollElement(scrollTarget, rootEl);
		canPull = resolvePullRefreshCanStart({ disabled, refreshing, scrollTop: getScrollMetrics(scrollElement).scrollTop });
		gestureLock = 'none';
		startX = clientX;
		startY = clientY;
	};

	const moveGesture = (clientX: number, clientY: number, preventDefault: () => void) => {
		if (!canPull) return;
		const intent = resolvePullRefreshGestureIntent({ currentX: clientX, currentY: clientY, startX, startY });
		gestureLock = resolvePullRefreshGestureLock({ current: gestureLock, deltaX: intent.deltaX, deltaY: intent.deltaY });
		if (gestureLock !== 'vertical') return;
		if (intent.deltaY <= 0) {
			// 回拖超过起点时取消下拉，并把滚动交还给原生容器
			// Dragging back past the start point cancels the pull and hands scrolling back to the native container
			if (distance !== 0 || status !== 'normal') {
				distance = 0;
				status = 'normal';
				emitChange('normal', 0);
			}
			return;
		}
		preventDefault();
		const nextDistance = resolvePullRefreshDistance({ deltaY: intent.deltaY, pullFactor, threshold, maxDistance });
		const nextStatus: PullRefreshStatus = nextDistance <= 0 ? 'normal' : nextDistance >= threshold ? 'canRelease' : 'pulling';
		if (nextDistance === distance && nextStatus === status) return;
		distance = nextDistance;
		status = nextStatus;
		emitChange(nextStatus, nextDistance);
	};

	const endGesture = () => {
		if (!canPull) return;
		canPull = false;
		gestureLock = 'none';
		const action = resolvePullRefreshReleaseAction({ disabled, distance, headHeight, refreshing, threshold });
		distance = action.nextDistance;
		status = action.nextStatus;
		emitChange(action.nextStatus, action.nextDistance);
		if (action.shouldRefresh) onrefresh?.();
	};

	const handleTouchStart = (event: TouchEvent) => {
		const touch = event.touches[0];
		startGesture(touch.clientX, touch.clientY);
	};

	const handleTouchMove = (event: TouchEvent) => {
		const touch = event.touches[0];
		moveGesture(touch.clientX, touch.clientY, () => {
			if (event.cancelable) event.preventDefault();
		});
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (!mouseDragging) return;
		if ((event.buttons & 1) !== 1) {
			handleMouseUp();
			return;
		}
		moveGesture(event.clientX, event.clientY, () => event.preventDefault());
	};

	const removeMouseListeners = () => {
		mouseDragging = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	};

	function handleMouseUp() {
		if (!mouseDragging) return;
		removeMouseListeners();
		endGesture();
	}

	const handleMouseDown = (event: MouseEvent) => {
		if (event.button !== 0) return;
		startGesture(event.clientX, event.clientY);
		if (!canPull) return;
		mouseDragging = true;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};

	onDestroy(() => {
		clearSuccessTimer();
		if (mouseDragging) removeMouseListeners();
	});
</script>

<div
	bind:this={rootEl}
	role="presentation"
	class={pullRefreshState.rootClass}
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={endGesture}
	ontouchcancel={endGesture}
	onmousedown={handleMouseDown}
>
	<div class={pullRefreshState.trackClass}>
		<div class={pullRefreshState.headClass} style={pullRefreshState.headStyleString} aria-live="polite">
			{#if customHead}
				{@render customHead(detail)}
			{:else}
				<div class="inline-flex items-center gap-2">
					{#if pullRefreshState.status === 'refreshing' && loadingIconState}
						<Loading {...loadingIconState} />
					{/if}
					<span>{pullRefreshState.defaultText}</span>
				</div>
			{/if}
		</div>
		<div class={pullRefreshState.contentClass} style={pullRefreshState.contentStyleString}>
			{@render children?.()}
		</div>
	</div>
</div>
