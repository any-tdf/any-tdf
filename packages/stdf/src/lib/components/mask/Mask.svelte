<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { MaskProps } from '../../types/index.js';
	import { resolveMaskDerived, resolveMaskStateOptions } from '@any-tdf/common/derived/mask';

	let {
		visible = false,
		opacity = '0.5',
		clickable = false,
		inverse = false,
		backdropBlur = 'none',
		duration = 150,
		outDuration = 0,
		zIndex = 500,
		children,
		onclickMask
	}: MaskProps = $props();

	// 公共派生层只处理 Mask class、过渡参数和 z-index style，点击事件留在组件层。
	// Shared derivation only handles Mask classes, transition params and z-index style; click events stay in the component layer.
	const maskState = $derived(
		resolveMaskDerived(
			resolveMaskStateOptions({
				props: { opacity, clickable, inverse, backdropBlur, duration, outDuration, zIndex }
			})
		)
	);
</script>

{#if visible}
	<button
		in:fade|global={maskState.inParams}
		out:fade|global={maskState.outParams}
		onclick={() => onclickMask && onclickMask?.()}
		class={maskState.rootClass}
		style={maskState.zIndexStyleString}
	>
		{@render children?.()}
	</button>
{/if}
