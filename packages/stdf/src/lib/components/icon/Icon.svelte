<script lang="ts">
	import { getContext } from 'svelte';
	import type { IconProps } from '../../types/index.js';
	import { resolveIconDerived, resolveIconStateOptions } from '@any-tdf/common/derived/icon';

	let {
		type = 'symbol',
		name = '',
		size = 24,
		width = 0,
		height = 0,
		state,
		theme = false,
		opacity = 1,
		path = getContext('STDF-global-icon-svg-path') || 'fonts/symbol.svg',
		y = 0,
		injClass = '',
		children
	}: IconProps = $props();

	// 公共派生层统一 Icon 的 class、style、尺寸和最终资源路径，组件层只负责渲染。
	// Common derivation unifies Icon class, style, size and final asset path; the component layer only renders.
	const iconState = $derived(resolveIconDerived(resolveIconStateOptions({ props: { type, name, size, width, height, state, theme, opacity, path, y, injClass } })));
</script>

{#if children}
	{@render children()}
{:else if type === 'iconify' || type === 'iconify-color'}
	<span
		class={iconState.iconifyClass}
		style={iconState.iconifyStyleString}
	>
	</span>
{:else if type === 'symbol'}
	<svg
		width={iconState.symbolWidth}
		height={iconState.symbolHeight}
		class={iconState.symbolClass}
		style={iconState.symbolStyleString}
	>
		<use xlink:href={iconState.symbolHref} />
	</svg>
{:else}{/if}
