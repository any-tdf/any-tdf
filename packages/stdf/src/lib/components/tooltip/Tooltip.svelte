<script lang="ts">
	import type { TooltipProps } from '../../types/index.js';
	import { fade, fly } from 'svelte/transition';
	import { tick } from 'svelte';
	import {
		resolveTooltipDerived,
		resolveTooltipHideForViewportAction,
		resolveTooltipHideFlow,
		resolveTooltipPosition,
		resolveTooltipRestoreFromViewportAction,
		resolveTooltipShouldBindGlobalListeners,
		resolveTooltipShowFlow,
		resolveTooltipStateOptions,
		resolveTooltipToggleAction,
		resolveTooltipTriggerInViewport,
		resolveTooltipViewportAction
	} from '@any-tdf/common/derived/tooltip';
	import { resolveViewportDimension, resolveViewportFallbackDimension } from '@any-tdf/common/derived/helpers';

	let {
		content = '',
		position = 'top',
		visible = $bindable(false),
		delay = 0,
		hideDelay = 0,
		arrow = true,
		radius = 'sm',
		state: colorState = 'black',
		maxWidth = 200,
		zIndex = 800,
		disabled = false,
		injClass = '',
		contentClass = '',
		children,
		contentSnippet,
		onshow,
		onhide
	}: TooltipProps = $props();

	// 触发元素引用
	// Trigger element reference
	let triggerEl: HTMLElement | null = $state(null);

	// Tooltip 元素引用
	// Tooltip element reference
	let tooltipEl: HTMLElement | null = $state(null);

	// Tooltip 位置
	// Tooltip position
	let tooltipTop = $state(0);
	let tooltipLeft = $state(0);
	let hiddenByViewport = $state(false);

	// 延迟定时器
	// Delay timer
	let showTimer: ReturnType<typeof setTimeout> | null = null;
	let hideTimer: ReturnType<typeof setTimeout> | null = null;

	// 公共派生层只处理 Tooltip 状态推导，DOM 读取、timer 与监听留在组件内。
	// The shared derived layer handles Tooltip state derivation; DOM reads, timers and listeners stay in the component.
	const tooltipState = $derived(
		resolveTooltipDerived(
			resolveTooltipStateOptions({
				props: { disabled, injClass, maxWidth, position, radius, state: colorState, zIndex },
				left: tooltipLeft,
				top: tooltipTop
			})
		)
	);

	// 计算位置
	// Calculate position
	const updatePosition = () => {
		if (!triggerEl || !tooltipEl) return;

		const triggerRect = triggerEl.getBoundingClientRect();
		const tooltipRect = tooltipEl.getBoundingClientRect();
		const nextPosition = resolveTooltipPosition({
			position,
			triggerRect,
			tooltipRect,
			viewportWidth: resolveViewportDimension({ value: window.innerWidth }),
			viewportHeight: resolveViewportDimension({ value: window.innerHeight })
		});

		tooltipTop = nextPosition.top;
		tooltipLeft = nextPosition.left;
	};

	const isTriggerInViewport = () => {
		if (!triggerEl) return false;
		const triggerRect = triggerEl.getBoundingClientRect();
		const viewportWidth = resolveViewportFallbackDimension({ value: window.innerWidth, fallback: document.documentElement.clientWidth });
		const viewportHeight = resolveViewportFallbackDimension({ value: window.innerHeight, fallback: document.documentElement.clientHeight });
		return resolveTooltipTriggerInViewport({ triggerRect, viewportWidth, viewportHeight });
	};

	const hideForViewport = () => {
		if (showTimer) {
			clearTimeout(showTimer);
			showTimer = null;
		}
		if (hideTimer) {
			clearTimeout(hideTimer);
			hideTimer = null;
		}
		const action = resolveTooltipHideForViewportAction({ visible, hiddenByViewport });
		if (!action.shouldChange) return;
		hiddenByViewport = action.nextHiddenByViewport;
		visible = action.nextVisible;
		if (action.shouldEmitHide) onhide?.();
	};

	const restoreFromViewport = () => {
		const action = resolveTooltipRestoreFromViewportAction({ hiddenByViewport, disabled, triggerInViewport: isTriggerInViewport(), visible });
		if (!action.shouldChange) return;
		hiddenByViewport = action.nextHiddenByViewport;
		visible = action.nextVisible;
		if (action.shouldEmitShow) onshow?.();
	};

	// 显示 tooltip
	// Show tooltip
	const show = () => {
		// 公共 flow 统一推导显示动作，timer 和事件派发留在组件层。
		// The shared flow derives the show action; timers and events stay in the component layer.
		const flow = resolveTooltipShowFlow({ disabled, hiddenByViewport, delay });
		if (!flow.shouldShow) return;
		hiddenByViewport = flow.nextHiddenByViewport;

		if (hideTimer) {
			clearTimeout(hideTimer);
			hideTimer = null;
		}

		if (flow.shouldDelay) {
			showTimer = setTimeout(() => {
				const commitAction = flow.commitAction;
				hiddenByViewport = commitAction.nextHiddenByViewport;
				visible = commitAction.nextVisible;
				if (commitAction.shouldEmitShow) onshow?.();
			}, flow.delayMs);
		} else {
			const commitAction = flow.commitAction;
			hiddenByViewport = commitAction.nextHiddenByViewport;
			visible = commitAction.nextVisible;
			if (commitAction.shouldEmitShow) onshow?.();
		}
	};

	// 隐藏 tooltip
	// Hide tooltip
	const hide = () => {
		// 公共 flow 统一推导隐藏动作，timer 和事件派发留在组件层。
		// The shared flow derives the hide action; timers and events stay in the component layer.
		const flow = resolveTooltipHideFlow({ delay: hideDelay });
		hiddenByViewport = flow.nextHiddenByViewport;

		if (showTimer) {
			clearTimeout(showTimer);
			showTimer = null;
		}

		if (flow.shouldDelay) {
			hideTimer = setTimeout(() => {
				const commitAction = flow.commitAction;
				hiddenByViewport = commitAction.nextHiddenByViewport;
				visible = commitAction.nextVisible;
				if (commitAction.shouldEmitHide) onhide?.();
			}, flow.delayMs);
		} else {
			const commitAction = flow.commitAction;
			hiddenByViewport = commitAction.nextHiddenByViewport;
			visible = commitAction.nextVisible;
			if (commitAction.shouldEmitHide) onhide?.();
		}
	};

	// 切换显示状态
	// Toggle visibility
	const toggle = (e: MouseEvent) => {
		e.stopPropagation();
		if (resolveTooltipToggleAction(visible) === 'hide') {
			hide();
		} else {
			show();
		}
	};

	// 点击外部关闭
	// Close on click outside
	const handleClickOutside = () => {
		hide();
	};

	// 监听 visible 变化，添加滚动监听和点击外部监听
	// Listen for visible changes, add scroll listener and click outside listener
	$effect(() => {
		if (resolveTooltipShouldBindGlobalListeners({ visible, hiddenByViewport })) {
			// 延迟添加点击外部监听
			// Delay adding click outside listener
			const clickTimer = visible
				? setTimeout(() => {
						document.addEventListener('click', handleClickOutside);
					}, 0)
				: null;

			let frameId = 0;
			const updateOrHide = () => {
				cancelAnimationFrame(frameId);
				frameId = requestAnimationFrame(() => {
					const viewportAction = resolveTooltipViewportAction({ triggerInViewport: isTriggerInViewport(), hiddenByViewport });
					if (viewportAction === 'hideForViewport') {
						hideForViewport();
						return;
					}
					if (viewportAction === 'restoreFromViewport') {
						restoreFromViewport();
						return;
					}
					updatePosition();
				});
			};
			window.addEventListener('scroll', updateOrHide, true);
			window.addEventListener('resize', updateOrHide);

			// 初始计算位置
			// Initial position calculation
			tick().then(() => {
				updateOrHide();
			});

			return () => {
				cancelAnimationFrame(frameId);
				if (clickTimer) clearTimeout(clickTimer);
				document.removeEventListener('click', handleClickOutside);
				window.removeEventListener('scroll', updateOrHide, true);
				window.removeEventListener('resize', updateOrHide);
			};
		}
	});
</script>

<div class={tooltipState.wrapperClass} bind:this={triggerEl}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div onclick={toggle} class={tooltipState.triggerClass}>
		{@render children?.()}
	</div>
</div>

{#if visible}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={tooltipEl}
		class={tooltipState.panelClass}
		style={tooltipState.panelStyleString}
		onclick={(e) => e.stopPropagation()}
		in:fly={tooltipState.inParams}
		out:fade={tooltipState.outParams}
	>
		{#if contentSnippet}
			<div class={contentClass}>
				{@render contentSnippet()}
			</div>
		{:else}
			<div class={contentClass}>{content}</div>
		{/if}

		{#if arrow}
			<div class={tooltipState.arrowClass}></div>
		{/if}
	</div>
{/if}
