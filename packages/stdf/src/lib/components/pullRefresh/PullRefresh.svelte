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
		resolvePullRefreshReleaseAction
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

	const handleTouchStart = (event: TouchEvent) => {
		const touch = event.touches[0];
		const scrollElement = getScrollElement(scrollTarget, rootEl);
		canPull = resolvePullRefreshCanStart({ disabled, refreshing, scrollTop: getScrollMetrics(scrollElement).scrollTop });
		startX = touch.clientX;
		startY = touch.clientY;
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (!canPull) return;
		const touch = event.touches[0];
		const intent = resolvePullRefreshGestureIntent({ currentX: touch.clientX, currentY: touch.clientY, startX, startY });
		if (intent.isHorizontal || intent.deltaY <= 0 || !intent.isPullDown) return;
		event.preventDefault();
		const nextDistance = resolvePullRefreshDistance({ deltaY: intent.deltaY, pullFactor });
		const nextStatus: PullRefreshStatus = nextDistance >= threshold ? 'canRelease' : 'pulling';
		distance = nextDistance;
		status = nextStatus;
		emitChange(nextStatus, nextDistance);
	};

	const handleTouchEnd = () => {
		if (!canPull) return;
		canPull = false;
		const action = resolvePullRefreshReleaseAction({ disabled, distance, headHeight, refreshing, threshold });
		distance = action.nextDistance;
		status = action.nextStatus;
		emitChange(action.nextStatus, action.nextDistance);
		if (action.shouldRefresh) onrefresh?.();
	};

	onDestroy(clearSuccessTimer);
</script>

<div bind:this={rootEl} role="presentation" class={pullRefreshState.rootClass} ontouchstart={handleTouchStart} ontouchmove={handleTouchMove} ontouchend={handleTouchEnd} ontouchcancel={handleTouchEnd}>
	<div class={pullRefreshState.trackClass}>
		<div class={pullRefreshState.headClass} style={pullRefreshState.headStyleString}>
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
