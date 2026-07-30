<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly, scale, type ScaleParams, type FlyParams } from 'svelte/transition';

	type Props = {
		visible?: boolean;
		transitionParams?: ScaleParams | FlyParams;
		transitionOutParams?: ScaleParams | FlyParams;
		transitionName?: 'scale' | 'fly';
		transitionClass?: string;
		sizeStyle?: string;
		onoutroend?: () => void;
		children?: Snippet;
	};
	let {
		visible = false,
		transitionParams = {},
		transitionOutParams = {},
		transitionName = 'fly',
		transitionClass = '',
		sizeStyle = '',
		onoutroend,
		children
	}: Props = $props();

	// 公共派生层已给出过渡参数，组件层只保留 Svelte 过渡指令绑定。
	// The shared derived layer provides transition params; this component only keeps Svelte transition bindings.
</script>

{#if visible}
	{#if transitionName === 'scale'}
		<div
			out:scale|global={transitionOutParams}
			in:scale|global={transitionParams}
			class={transitionClass}
			style={sizeStyle}
			{onoutroend}
		>
			{@render children?.()}
		</div>
	{:else}
		<div
			in:fly|global={transitionParams}
			out:fly|global={transitionOutParams}
			class={transitionClass}
			style={sizeStyle}
			{onoutroend}
		>
			{@render children?.()}
		</div>
	{/if}
{/if}
