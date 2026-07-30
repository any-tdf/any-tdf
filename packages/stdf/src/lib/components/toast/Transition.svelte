<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as eases from 'svelte/easing';
	import {
		fade,
		fly,
		blur,
		slide,
		scale,
		type ScaleParams,
		type FlyParams,
		type SlideParams,
		type BlurParams,
		type FadeParams
	} from 'svelte/transition';
	import type { SvelteEasingProps } from '../../types/index.js';
	import { resolveToastTransitionParams } from '@any-tdf/common/derived/toast';
	import { resolveMapValue } from '@any-tdf/common/derived/helpers';

	type Props = {
		visible: boolean;
		transitionType: 'scale' | 'fly' | 'slide' | 'blur' | 'fade' | null;
		transitionParams: ScaleParams | FlyParams | SlideParams | BlurParams | FadeParams;
		outDuration: number;
		easeType: SvelteEasingProps;
		easeOutType: SvelteEasingProps;
		children: Snippet;
	};
	let { visible = false, transitionType = 'scale', transitionParams = {}, outDuration = 0, easeType = 'cubicOut', easeOutType = 'cubicOut', children }: Props = $props();

	// 公共派生层只处理 Toast 过渡参数，具体过渡指令和内容渲染留在组件内。
	// Shared derived layer only handles Toast transition params; concrete transition directives and content rendering stay in the component.
	const inParams = $derived(resolveToastTransitionParams({ transitionType, transitionParams: transitionParams as Record<string, unknown>, duration: 300, easing: resolveMapValue(eases, easeType, 'cubicOut') }));
	const outParams = $derived(resolveToastTransitionParams({ transitionType, transitionParams: transitionParams as Record<string, unknown>, duration: outDuration, easing: resolveMapValue(eases, easeOutType, 'cubicOut') }));
</script>

{#if visible}
	{#if transitionType === 'scale'}
		<div in:scale|global={inParams} out:scale|global={outParams}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'fly'}
		<div in:fly|global={inParams} out:fly|global={outParams}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'fade'}
		<div in:fade|global={inParams} out:fade|global={outParams}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'slide'}
		<div in:slide|global={inParams} out:slide|global={outParams}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'blur'}
		<div in:blur|global={inParams} out:blur|global={outParams}>
			{@render children?.()}
		</div>
	{:else}
		{@render children?.()}
	{/if}
{/if}
