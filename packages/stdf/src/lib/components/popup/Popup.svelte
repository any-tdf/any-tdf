<script lang="ts">
	import * as eases from 'svelte/easing';
	import Mask from '../mask/Mask.svelte';
	import Transition from './Transition.svelte';
	import type { PopupProps } from '../../types/index.js';
	import {
		resolvePopupDerived,
		resolvePopupMaskClickFlow,
		resolvePopupRenderEndAction,
		resolvePopupRenderState,
		resolvePopupStateOptions,
		resolvePopupTransitionDerived,
		resolvePopupTransitionStateOptions,
		resolvePopupViewportSize
	} from '@any-tdf/common/derived/popup';
	import { resolveMapValue } from '@any-tdf/common/derived/helpers';

	let {
		visible = $bindable(false),
		size = 40,
		position = 'bottom',
		duration = 450,
		outDuration = 240,
		easeType = 'cubicOut',
		easeOutType = 'cubicOut',
		px = '0',
		py = '0',
		mask = {},
		maskClosable = true,
		radiusPosition = 'auto',
		radius = '',
		transitionDistance = 0,
		transparent = false,
		zIndex = 600,
		dynamicFixed = true,
		hideScrollbar = false,
		children,
		onclose,
		onclickMask
	}: PopupProps = $props();

	const getViewportSize = () =>
		typeof window === 'undefined'
			? resolvePopupViewportSize()
			: resolvePopupViewportSize({ height: window.innerHeight, width: window.innerWidth });
	const initialViewportSize = getViewportSize();

	// 页面滚动时，动态计算窗口高度
	// Dynamically calculate the window height when the page scrolls
	let innerHeight = $state(initialViewportSize.height);
	let innerWidth = $state(initialViewportSize.width);
	let shouldRender = $state(resolvePopupRenderState({ visible }));

	$effect(() => {
		shouldRender = resolvePopupRenderState({ visible, outDuration, currentRender: shouldRender });
	});

	// 公共派生层只处理 Popup 状态推导，事件、窗口读取和动画绑定留在组件内。
	// The shared derived layer only handles Popup state derivation; events, window reads and animation bindings stay in the component.
	const popupState = $derived(
		resolvePopupDerived(
			resolvePopupStateOptions({
				innerHeight,
				props: { position, radiusPosition, radius, zIndex, transparent, hideScrollbar }
			})
		)
	);
	const transitionState = $derived(
		resolvePopupTransitionDerived(
			resolvePopupTransitionStateOptions({
				props: {
					position,
					size,
					transitionDistance,
					px,
					py,
					duration,
					outDuration,
					easing: resolveMapValue(eases, easeType, 'cubicOut'),
					outEasing: resolveMapValue(eases, easeOutType, 'cubicOut')
				},
				viewportHeight: innerHeight,
				viewportWidth: innerWidth
			})
		)
	);

	// 点击遮罩时派发事件
	// Dispatch events when clicking the mask
	const clickMask = () => {
		onclickMask?.();
		// 公共流程只返回遮罩点击和关闭决策，事件派发和绑定状态留在组件层。
		// Shared flow only returns mask-click and close decisions; event dispatch and bound state stay in the component layer.
		const action = resolvePopupMaskClickFlow({ maskClosable, visible });
		if (!action.closeAction.shouldClose) return;
		visible = action.closeAction.nextVisible;
		if (action.closeAction.shouldEmitClose) onclose?.();
	};

	const handleOutroEnd = () => {
		const action = resolvePopupRenderEndAction();
		shouldRender = action.nextShouldRender;
	};

	$effect(() => {
		if (dynamicFixed) {
			// 组件层保留 window 读取，公共层只接收数值。
			// Keep window reads in the component layer; common helpers only receive values.
			const handleResize = () => {
				const viewportSize = getViewportSize();
				innerHeight = viewportSize.height;
				innerWidth = viewportSize.width;
			};
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	});
</script>

<svelte:head>
	<style>
		{popupState.css}
	</style>
</svelte:head>

<Mask {visible} {duration} {outDuration} {...mask} onclickMask={clickMask} />

{#if shouldRender}
	<div
		class={popupState.wrapperClass}
		style={popupState.wrapperStyleString}
	>
		<Transition
			{visible}
			transitionName={transitionState.transitionName}
			transitionClass={transitionState.transitionClass}
			sizeStyle={transitionState.sizeStyleString}
			transitionParams={transitionState.inParams}
			transitionOutParams={transitionState.outParams}
			onoutroend={handleOutroEnd}
		>
			<div class={popupState.panelClass}>
				{@render children?.()}
			</div>
		</Transition>
	</div>
{/if}
