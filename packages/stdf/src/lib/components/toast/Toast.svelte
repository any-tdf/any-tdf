<script lang="ts">
	import Loading from '../loading/Loading.svelte';
	import Icon from '../icon/Icon.svelte';
	import Mask from '../mask/Mask.svelte';
	import SvgIcon from '../utils/SvgIcon.svelte';
	import Transition from './Transition.svelte';
	import type { ToastProps } from '../../types/index.js';
	import { resolveToastDerived, resolveToastStateOptions, resolveToastVisibilityFlow } from '@any-tdf/common/derived/toast';
	import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';

	let {
		message = '',
		visible = $bindable(false),
		duration = 2000,
		position = 'center',
		py = '0',
		radius = '',
		transitionType = 'scale',
		transitionParams = {},
		outDuration = 0,
		easeType = 'cubicOut',
		easeOutType = 'cubicOut',
		zIndex = 1000,
		type = null,
		mask = {},
		loading = {},
		icon = {},
		clickable = false,
		dynamicFixed = true,
		children,
		onclose
	}: ToastProps = $props();

	$effect(() => {
		// 公共 visibility flow 只返回自动关闭计划，timer 和事件触发留在组件内。
		// Shared visibility flow only returns auto-close planning; timers and event dispatch stay in the component.
		const flow = resolveToastVisibilityFlow({ visible, duration });
		if (!flow.shouldScheduleClose) return;
		const timer = setTimeout(() => {
			visible = flow.nextVisible;
			if (flow.shouldEmitClose) onclose?.();
		}, flow.delayMs);
		return () => clearTimeout(timer);
	});

	// 解决 Safari 和 Chrome 或其他浏览器滚动时工具栏隐藏与显示引发的窗口高度变化问题。
	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	// let vh = window.innerHeight * 0.01;
	// // Then we set the value in the --vh custom property to the root of the document
	// document.documentElement.style.setProperty('--vh', `${vh}px`);
	// // We listen to the resize event
	// window.addEventListener('resize', () => {
	//     // We execute the same script as before
	//     let vh = window.innerHeight * 0.01;
	//     document.documentElement.style.setProperty('--vh', `${vh}px`);
	// });

	let innerHeight = $state(resolveViewportDimension({ value: typeof window === 'undefined' ? undefined : window.innerHeight }));
	// 公共派生层只处理 Toast 的绑定值，自动关闭和 DOM 监听留在组件内。
	// Shared derived layer only handles Toast binding values; auto-close and DOM listeners stay in the component.
	const toastState = $derived(resolveToastDerived(resolveToastStateOptions({
		innerHeight,
		props: { clickable, dynamicFixed, outDuration, position, py, radius, transitionParams: transitionParams as Record<string, unknown>, transitionType, type, zIndex }
	})));

	$effect(() => {
		if (dynamicFixed) {
			// 解决 Safari 和 Chrome 或其他浏览器滚动时工具栏隐藏与显示引发的窗口高度变化问题。
			// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
			window.addEventListener('resize', () => {
				innerHeight = resolveViewportDimension({ value: window.innerHeight });
			});
		}
	});
</script>

{#if visible}
	<Mask {visible} {clickable} opacity="0" {outDuration} {...mask} />
{/if}
{#if visible}
	<div
		class={toastState.containerClass}
		style={toastState.containerStyleString}
	>
		<Transition {visible} {transitionType} {transitionParams} {outDuration} {easeType} {easeOutType}>
			<div class={toastState.transitionClass}>
				<div class={toastState.contentClass}>
					{#if children}
						{@render children()}
					{:else}
						{#if toastState.iconFrameState.shouldRender}
							<div class="mb-2">
									{#if toastState.iconFrameState.icon.kind === 'loading'}
										<Loading inverse {...loading} />
									{:else if toastState.iconFrameState.icon.kind === 'icon'}
										<Icon size={30} {...icon} />
									{:else if toastState.iconFrameState.icon.kind === 'svg'}
										<SvgIcon svg={toastState.iconFrameState.icon.svg} width="30" height="30" class={toastState.iconFrameState.icon.className} />
									{:else}{/if}
							</div>
						{/if}
						<div>
							{message}
						</div>
					{/if}
				</div>
			</div>
		</Transition>
	</div>
{/if}
