<script lang="ts">
	import Page from './Page.svelte';
	import type { SmallAreaRadius } from '../../types/index.js';
	import { resolveHiddenScrollbarCss } from '@any-tdf/common/derived/helpers';
	import { resolvePaginationSecondPageDerived, resolvePaginationSecondPageStateOptions } from '@any-tdf/common/derived/pagination';

	type Props = {
		pageCol: number;
		Pages: number[];
		maxShowPage: number;
		radius: SmallAreaRadius;
		type: 'border' | 'block' | 'bold';
		bg: 'white' | 'surface' | 'gray' | 'theme';
		onclickItem: (index: number) => void;
	};
	let { pageCol = 3, Pages = [], maxShowPage = 9, radius = 'md', type = 'bold', bg = 'white', onclickItem }: Props = $props();
	// 公共派生层统一二级页码浮层结果，组件层只渲染按钮与绑定点击。
	// Common derivation unifies second-level page popover output; the component layer only renders buttons and binds clicks.
	let secondPageState = $derived(resolvePaginationSecondPageDerived(resolvePaginationSecondPageStateOptions({
		props: { bg, dropShadow: false, maxShowPage, pageCol, pages: Pages, placement: 'next' }
	})));
	const css = resolveHiddenScrollbarCss({ selector: '.second-page-contents' });

</script>

<svelte:head>
	<style>
		{css}
	</style>
</svelte:head>

{#if secondPageState.visible}
	<div
		class={secondPageState.containerClass}
		style={secondPageState.containerStyleString}
	>
		<div
			class={secondPageState.contentClass}
			style={secondPageState.gridStyleString}
		>
			{#each Pages as item, index (index)}
				<Page onclick={() => onclickItem && onclickItem(item)} {type} {radius}>{item}</Page>
			{/each}
		</div>
		<div class={secondPageState.arrowClass}></div>
	</div>
{/if}
