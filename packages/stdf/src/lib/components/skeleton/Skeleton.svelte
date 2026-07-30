<script lang="ts">
	import type { SkeletonProps } from '../../types/index.js';
	import { resolveSkeletonDerived, resolveSkeletonRandomValue, resolveSkeletonStateOptions } from '@any-tdf/common/derived/skeleton';
	import SvgIcon from '../utils/SvgIcon.svelte';

	let { type = 'div', width = '6', height = '6', radius = '', space = '1', lines = 3, iconRatio = 0.6, effect = 'pulse', bg = 'gray' }: SkeletonProps = $props();

	// 随机源留在组件层，随机值归一化由公共派生层统一。
	// Random source stays in the component layer, while shared derivations normalize the value.
	const randomValue = resolveSkeletonRandomValue({ random: Math.random() });
	const skeletonState = $derived(
		resolveSkeletonDerived(
			resolveSkeletonStateOptions({
				props: { type, width, height, radius, space, lines, iconRatio, effect, bg },
				randomValue
			})
		)
	);

</script>

<svelte:head>
	<style>
		{skeletonState.css}
	</style>
</svelte:head>

<div
	class={skeletonState.classes.wrapperClass}
>
	{#if skeletonState.displayState.showParagraph}
		<div class={skeletonState.paragraphClass}>
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each skeletonState.paragraphLineIndexes as i (i)}
				<div class={skeletonState.classes.lineClass}></div>
			{/each}
			<div
				class={skeletonState.randomLineClass}
			></div>
		</div>
	{:else}
		<div
			class={skeletonState.classes.blockClass}
		>
			{#if skeletonState.displayState.showIcon}
				<div class={skeletonState.iconWrapClass} style={skeletonState.iconRatioStyleString}>
					{#if skeletonState.iconSvg}
						<!-- 公共 Skeleton 图标 SVG 数据在 common 中维护。 / Shared Skeleton SVG data lives in common. -->
						<SvgIcon svg={skeletonState.iconSvg} width="100%" height="100%" class={skeletonState.iconSvgClass} />
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>
