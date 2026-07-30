<script lang="ts">
	import { getContext } from 'svelte';
	import Page from './Page.svelte';
	import SecondPageNext from './SecondPageNext.svelte';
	import SecondPagePre from './SecondPagePre.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { PaginationProps } from '../../types/index.js';
	import {
		resolvePaginationDerived,
		resolvePaginationEllipsisToggleAction,
		resolvePaginationNavigateAction,
		resolvePaginationNextOmitSyncAction,
		resolvePaginationSelectAction,
		resolvePaginationStateOptions
	} from '@any-tdf/common/derived/pagination';
	import { arrowLeftSvg, arrowRightSvg, moreSmallSvg, moreSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const commonLang: LangProps['common'] = currentLang.common;
	const paginationLang: LangProps['pagination'] = currentLang.pagination;

	let {
		total = 0,
		pageSize = 10,
		current = $bindable(1),
		maxShowPage = 7,
		radius = '',
		type = 'bold',
		bg = 'gray',
		pageCol = 3,
		showNextOmitPage = $bindable(false),
		showPreOmitPage = $bindable(false),
		injClass = '',
		noDataText,
		onePageText,
		continuous = false,
		onchange,
		onnext,
		onpre
	}: PaginationProps = $props();

	// 公共派生层接收分页 props 和内部状态，组件层只保留响应式赋值与事件派发。
	// The common derivation layer receives pagination props and internal state; this component only keeps reactive assignment and event dispatch.
	let paginationState = $derived(
		resolvePaginationDerived(
			resolvePaginationStateOptions({
				props: {
					total,
					pageSize,
					maxShowPage,
					radius,
					type,
					bg,
					injClass,
					noDataText,
					onePageText
				},
				current,
				showNextOmitPage,
				showPreOmitPage,
				defaults: { common: commonLang, pagination: paginationLang }
			})
		)
	);

	$effect(() => {
		const action = resolvePaginationNextOmitSyncAction({ totalPage: paginationState.totalPage, maxShowPage, showNextOmitPage });
		if (action.shouldSync) showNextOmitPage = action.nextShowNextOmitPage;
	});

	// 点击后省略号事件
	// click next ellipsis event
	const clickNextEllipsisFunc = () => {
		const action = resolvePaginationEllipsisToggleAction({ pageCount: paginationState.nextEllipsisPages.length, visible: showNextOmitPage });
		if (action.shouldToggle) showNextOmitPage = action.nextVisible;
	};

	// 点击前省略号事件
	// click pre ellipsis event
	const clickPreEllipsisFunc = () => {
		const action = resolvePaginationEllipsisToggleAction({ pageCount: paginationState.preEllipsisPages.length, visible: showPreOmitPage });
		if (action.shouldToggle) showPreOmitPage = action.nextVisible;
	};

	const applyCurrentAction = (action: ReturnType<typeof resolvePaginationSelectAction>) => {
		if (!action.shouldChange) return false;
		current = action.nextCurrent;
		showNextOmitPage = action.nextShowNextOmitPage;
		showPreOmitPage = action.nextShowPreOmitPage;
		return true;
	};

	// 点击下一页
	// click next page
	const nextFunc = () => {
		// 公共 action 只返回页码状态，事件派发留在组件内。
		// Shared action only returns pagination state; event dispatch stays in the component.
		const action = resolvePaginationNavigateAction({ current, totalPage: paginationState.totalPage, direction: 'next' });
		if (!applyCurrentAction(action)) return;
		onnext?.(current);
		onchange?.(current);
	};

	// 点击上一页
	// click pre page
	const preFunc = () => {
		const action = resolvePaginationNavigateAction({ current, totalPage: paginationState.totalPage, direction: 'pre' });
		if (!applyCurrentAction(action)) return;
		onpre?.(current);
		onchange?.(current);
	};

	// 点击页码
	// click page
	const clickItemFunc = (index: number) => {
		if (applyCurrentAction(resolvePaginationSelectAction(index))) onchange?.(current);
	};

	// 点击省略页码事件
	// click second page item event
	const clickSecondPageItemFunc = (index: number) => {
		if (applyCurrentAction(resolvePaginationSelectAction(index))) onchange?.(current);
	};

</script>

<div class={paginationState.rootClass}>
	<button
		class={paginationState.preButtonClass}
		disabled={!paginationState.canPre}
		onclick={preFunc}
		aria-label="pre"
	>
		<!-- 公共 SVG 数据在 common 中维护，组件层只负责渲染图标。 / Shared SVG data lives in common; the component layer only renders the icon. -->
		<SvgIcon svg={arrowLeftSvg} width="20" height="20" class={paginationState.iconClass} />
	</button>
	{#if paginationState.showNoData}
		<div class={paginationState.textClass}>{paginationState.texts.noDataText}</div>
	{:else if paginationState.showOnePage}
		<div class={paginationState.textClass}>{paginationState.texts.onePageText}</div>
	{:else if paginationState.showAllPages}
		{#each paginationState.allPageItems as item (item.page)}
			<Page active={item.active} {type} {radius} onclick={() => !continuous && clickItemFunc(item.page)}>
				{item.page}
			</Page>
		{/each}
	{:else}
		<Page active={paginationState.firstPageItem.active} {type} {radius} onclick={() => !continuous && clickItemFunc(1)}>1</Page>
		{#if paginationState.showPreEllipsis}
			<button
				class={paginationState.preEllipsisClass}
				onclick={() => !continuous && clickPreEllipsisFunc()}
			>
				{#if showPreOmitPage}
					<SvgIcon svg={moreSvg} width="20" height="20" class={paginationState.iconClass} />
				{:else}
					<SvgIcon svg={moreSmallSvg} width="20" height="20" class={paginationState.mutedIconClass} />
				{/if}
			</button>
		{/if}
		{#if paginationState.leadingPageItems.length > 0}
			{#each paginationState.leadingPageItems as item (item.page)}
				<Page active={item.active} {type} {radius} onclick={() => !continuous && clickItemFunc(item.page)}>
					{item.page}
				</Page>
			{/each}
		{/if}
		{#if paginationState.middlePageItems.length > 0}
			{#each paginationState.middlePageItems as item (item.page)}
				<Page active={item.active} {type} {radius} onclick={() => !continuous && clickItemFunc(item.page)}>
					{item.page}
				</Page>
			{/each}
		{/if}
		{#if paginationState.trailingPageItems.length > 0}
			{#each paginationState.trailingPageItems as item (item.page)}
				<Page
					active={item.active}
					{type}
					{radius}
					onclick={() => !continuous && clickItemFunc(item.page)}
				>
					{item.page}
				</Page>
			{/each}
		{/if}
		{#if paginationState.showNextEllipsis}
			<button
				class={paginationState.nextEllipsisClass}
				onclick={() => !continuous && clickNextEllipsisFunc()}
			>
				{#if showNextOmitPage}
					<SvgIcon svg={moreSvg} width="20" height="20" class={paginationState.iconClass} />
				{:else}
					<SvgIcon svg={moreSmallSvg} width="20" height="20" class={paginationState.mutedIconClass} />
				{/if}
			</button>
		{/if}
		<Page active={paginationState.lastPageItem.active} {type} {radius} onclick={() => !continuous && clickItemFunc(paginationState.totalPage)}>{paginationState.totalPage}</Page>
	{/if}
	<button
		class={paginationState.nextButtonClass}
		disabled={!paginationState.canNext}
		onclick={nextFunc}
		aria-label="next"
	>
		<SvgIcon svg={arrowRightSvg} width="20" height="20" class={paginationState.iconClass} />
	</button>
	{#if showNextOmitPage}
		<SecondPageNext {pageCol} Pages={paginationState.nextEllipsisPages} {type} {radius} {bg} onclickItem={clickSecondPageItemFunc} {maxShowPage} />
	{/if}
	{#if showPreOmitPage}
		<SecondPagePre {pageCol} Pages={paginationState.preEllipsisPages} {type} {radius} {bg} onclickItem={clickSecondPageItemFunc} {maxShowPage} />
	{/if}
</div>
