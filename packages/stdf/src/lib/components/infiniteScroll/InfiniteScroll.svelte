<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { LangProps } from '../../lang/index.js';
	import { zh_CN } from '../../lang/index.js';
	import type { InfiniteScrollProps } from '../../types/index.js';
	import Loading from '../loading/Loading.svelte';
	import { addScrollListener, getScrollElement, getScrollMetrics } from '../utils/scroll.js';
	import {
		infiniteScrollDefaultTexts,
		resolveInfiniteScrollDerived,
		resolveInfiniteScrollDetail,
		resolveInfiniteScrollDistance,
		resolveInfiniteScrollRootMargin,
		resolveInfiniteScrollShouldLoad
	} from '@any-tdf/common/derived/infiniteScroll';

	const currentLang: LangProps = getContext('STDF_lang') || zh_CN;
	const infiniteScrollLang = currentLang.infiniteScroll || zh_CN.infiniteScroll || infiniteScrollDefaultTexts;
	const defaultLoadingIcon: NonNullable<InfiniteScrollProps['loadingIcon']> = { type: '1_0', height: '4', width: '4', theme: true };

	let {
		loading = $bindable(false),
		finished = $bindable(false),
		error = $bindable(false),
		disabled = false,
		offset = 300,
		direction = 'down',
		immediateCheck = true,
		loadingText = infiniteScrollLang.loadingText,
		finishedText = infiniteScrollLang.finishedText,
		errorText = infiniteScrollLang.errorText,
		loadingIcon = undefined,
		scrollTarget = null,
		injClass = '',
		textClass = '',
		children,
		loadingChild,
		finishedChild,
		errorChild,
		onload
	}: InfiniteScrollProps = $props();

	let rootEl: HTMLDivElement | null = $state(null);
	let locked = false;
	let mounted = false;

	const infiniteScrollState = $derived(
		resolveInfiniteScrollDerived({
			disabled,
			error,
			errorText,
			finished,
			finishedText,
			injClass,
			loading,
			loadingText,
			textClass
		})
	);
	const customContent = $derived(
		children ||
			(infiniteScrollState.status === 'loading'
				? loadingChild
				: infiniteScrollState.status === 'finished'
					? finishedChild
					: infiniteScrollState.status === 'error'
						? errorChild
						: undefined)
	);
	const loadingIconState = $derived(loadingIcon === null ? null : { ...defaultLoadingIcon, ...loadingIcon });
	const detail = $derived(resolveInfiniteScrollDetail({ status: infiniteScrollState.status, retry }));

	const emitLoad = (isRetry: boolean) => {
		if (locked) return;
		locked = true;
		onload?.(isRetry);
	};

	function retry() {
		locked = false;
		emitLoad(true);
	}

	export function check() {
		const scrollElement = getScrollElement(scrollTarget, rootEl);
		const metrics = getScrollMetrics(scrollElement);
		const distance = resolveInfiniteScrollDistance({ ...metrics, direction });
		if (resolveInfiniteScrollShouldLoad({ disabled, distance, error, finished, loading, offset, visible: true })) {
			emitLoad(false);
		}
	}

	$effect(() => {
		// 任一阻塞状态解除后主动复检，避免内容变化后停在边界不再触发
		// Re-check after any blocking state clears so the component does not stall at the boundary
		const blocked = loading || error || finished || disabled;
		if (!loading) locked = false;
		if (blocked) return;
		if (!mounted || !rootEl || typeof window === 'undefined') return;
		const frame = window.requestAnimationFrame(check);
		return () => window.cancelAnimationFrame(frame);
	});

	onMount(() => {
		mounted = true;
		const scrollElement = getScrollElement(scrollTarget, rootEl);
		const remove = addScrollListener(scrollElement, check);
		let observer: IntersectionObserver | null = null;
		if (rootEl && typeof IntersectionObserver !== 'undefined') {
			const root = scrollElement === window ? null : (scrollElement as HTMLElement);
			observer = new IntersectionObserver(
				(entries) => {
					if (entries.some((entry) => entry.isIntersecting)) check();
				},
				{ root, rootMargin: resolveInfiniteScrollRootMargin({ direction, offset }) }
			);
			observer.observe(rootEl);
		}
		if (immediateCheck) window.setTimeout(check, 0);
		return () => {
			mounted = false;
			observer?.disconnect();
			remove();
		};
	});
</script>

<div bind:this={rootEl} class={infiniteScrollState.rootClass} aria-busy={infiniteScrollState.ariaBusy} aria-live="polite">
	{#if customContent}
		{@render customContent(detail)}
	{:else if infiniteScrollState.status === 'loading'}
		<div class={infiniteScrollState.textClass}>
			{#if loadingIconState}
				<Loading {...loadingIconState} />
			{/if}
			<span>{infiniteScrollState.defaultText}</span>
		</div>
	{:else if infiniteScrollState.status === 'finished'}
		<div class={infiniteScrollState.textClass}>{infiniteScrollState.defaultText}</div>
	{:else if infiniteScrollState.status === 'error'}
		<button type="button" class={infiniteScrollState.errorButtonClass} onclick={retry}>{infiniteScrollState.defaultText}</button>
	{/if}
</div>
