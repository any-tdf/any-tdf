<script lang="ts">
	import type { CardProps } from '../../types/index.js';
	import { resolveCardDerived, resolveCardStateOptions } from '@any-tdf/common/derived/card';

	let {
		bg = 'surface',
		radius = '',
		shadow = 'sm',
		border = 'none',
		borderWidth = '1',
		mx = '2',
		my = '2',
		p = '4',
		px,
		py,
		overflow = true,
		headerLine = true,
		footerLine = true,
		injClass = '',
		headerClass = '',
		bodyClass = '',
		footerClass = '',
		header,
		children,
		footer,
		onclick
	}: CardProps = $props();

	// 公共派生层处理 Card class 和内容分支，slot 与事件留在组件层。
	// Shared derived layer handles Card classes and content branches; slots and events stay in the component layer.
	const cardState = $derived(
		resolveCardDerived(
			resolveCardStateOptions({
				props: { overflow, bg, radius, shadow, mx, my, border, borderWidth, injClass, p, px, py, headerClass, bodyClass, footerClass, headerLine, footerLine },
				handler: onclick,
				hasHeader: Boolean(header),
				hasBody: Boolean(children),
				hasFooter: Boolean(footer)
			})
		)
	);
</script>

{#if cardState.contentState.isInteractive}
	<button class={cardState.interactiveClass} {onclick}>
		{#if cardState.contentState.showHeader}
			<div class={cardState.headerSlotClass}>
				{@render header?.()}
			</div>
			{#if cardState.contentState.showHeaderDivider}
				<div class={cardState.dividerClass}></div>
			{/if}
		{/if}
		{#if cardState.contentState.showBody}
			<div class={cardState.bodySlotClass}>
				{@render children?.()}
			</div>
		{/if}
		{#if cardState.contentState.showFooter}
			{#if cardState.contentState.showFooterDivider}
				<div class={cardState.dividerClass}></div>
			{/if}
			<div class={cardState.footerSlotClass}>
				{@render footer?.()}
			</div>
		{/if}
	</button>
{:else}
	<div class={cardState.containerClass}>
		{#if cardState.contentState.showHeader}
			<div class={cardState.headerSlotClass}>
				{@render header?.()}
			</div>
			{#if cardState.contentState.showHeaderDivider}
				<div class={cardState.dividerClass}></div>
			{/if}
		{/if}
		{#if cardState.contentState.showBody}
			<div class={cardState.bodySlotClass}>
				{@render children?.()}
			</div>
		{/if}
		{#if cardState.contentState.showFooter}
			{#if cardState.contentState.showFooterDivider}
				<div class={cardState.dividerClass}></div>
			{/if}
			<div class={cardState.footerSlotClass}>
				{@render footer?.()}
			</div>
		{/if}
	</div>
{/if}
