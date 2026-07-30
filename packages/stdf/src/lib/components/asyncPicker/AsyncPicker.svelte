<script lang="ts">
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import Popup from '../popup/Popup.svelte';
	import Loading from '../loading/Loading.svelte';
	import ScrollRadio from '../scrollRadio/ScrollRadio.svelte';
	import type { AsyncPickerProps } from '../../types/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import { resolveAsyncPickerCloseAction, resolveAsyncPickerDerived, resolveAsyncPickerLeftButtonFlow, resolveAsyncPickerRightButtonFlow, resolveAsyncPickerStateOptions } from '@any-tdf/common/derived/asyncPicker';
	import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const asyncPickerLang: LangProps['asyncPicker'] = currentLang.asyncPicker;

	let {
		visible = $bindable(false),
		data = $bindable([]),
		lastLevel = $bindable(false),
		firstLevel = $bindable(true),
		showRow = 5,
		labelKey = $bindable('label'),
		align = 'center',
		cancelText,
		confirmText,
		title = $bindable(),
		nextText,
		prevText,
		showSelected = false,
		selectedText,
		height = 30,
		popup = {},
		loading = {},
		oncancel,
		onprev,
		onconfirm,
		onnext,
		onclose
	}: AsyncPickerProps = $props();

	// 用于存储当前选定的所有项和索引
	// Used to store all selected items and indexes
	let items: Record<string, unknown>[] = $state([]);
	let indexs: number[] = $state([]);

	// 当前选中项索引
	// Current selected item index
	let currentIndex = $state(0);
	// 公共派生层只处理 AsyncPicker 尺寸、按钮文案、选中路径和纯动作描述，事件与异步加载留在组件内。
	// Shared derived layer only handles AsyncPicker sizes, button text, selected path and pure actions; events and async loading stay in the component.
	let asyncPickerDerived = $derived(
		resolveAsyncPickerDerived(
			resolveAsyncPickerStateOptions({
				currentIndex,
				data: data as Record<string, unknown>[],
				defaults: asyncPickerLang,
				firstLevel,
				indexs,
				items,
				lastLevel,
				props: {
					cancelText,
					confirmText,
					height,
					nextText,
					popup,
					prevText,
					selectedText,
					showRow,
					showSelected,
					title
				},
				viewportHeight: resolveViewportDimension({ value: typeof window === 'undefined' ? undefined : window.innerHeight }),
				viewportWidth: resolveViewportDimension({ value: typeof document === 'undefined' ? undefined : document.documentElement.clientWidth })
			})
		)
	);
	let asyncPickerTexts = $derived(asyncPickerDerived.texts);
	let usePopup = $derived(asyncPickerDerived.usePopup);
	let metrics = $derived(asyncPickerDerived.metrics);
	let isLoading = $derived(asyncPickerDerived.isLoading);
	let leftButtonText = $derived(asyncPickerDerived.leftButtonText);
	let rightButtonText = $derived(asyncPickerDerived.rightButtonText);
	let selectedFlyInParams = $derived(asyncPickerDerived.selectedFlyInParams);
	let selectedFlyOutParams = $derived(asyncPickerDerived.selectedFlyOutParams);

	// 点击左侧按钮
	// Click left button
	const clickLeftFunc = () => {
		// 公共流程只返回状态补丁和关闭决策，事件与异步加载留在组件层。
		// Shared flow only returns state patches and close decisions; events and async loading stay in the component layer.
		const flow = resolveAsyncPickerLeftButtonFlow(asyncPickerDerived.leftAction);
		if (flow.type === 'none') return;
		if (flow.type === 'cancel') {
			if (flow.closeAction.shouldClose) visible = flow.closeAction.nextVisible;
			if (flow.closeAction.shouldEmitClose) onclose?.();
			oncancel?.();
			return;
		}
		items = flow.items;
		indexs = flow.indexs;
		data = flow.resetState.data;
		setTimeout(() => {
			onprev?.();
			currentIndex = flow.resetState.currentIndex;
		});
	};

	// 点击右侧按钮，如果是最后一列，则触发 confirm 事件，否则触发 next 事件
	// Click the right button, if it is the last column, trigger the confirm event, otherwise trigger the next event
	const clickRightFunc = () => {
		// 公共流程只返回状态补丁和确认 / 下一级决策，事件与异步加载留在组件层。
		// Shared flow only returns state patches plus confirm or next-step decisions; events and async loading stay in the component layer.
		const flow = resolveAsyncPickerRightButtonFlow(asyncPickerDerived.rightAction);
		if (flow.type === 'none') return;
		if (flow.type === 'confirm') {
			items = flow.items;
			indexs = flow.indexs;
			data = flow.resetState.data;
			if (flow.closeAction.shouldClose) visible = flow.closeAction.nextVisible;
			if (flow.closeAction.shouldEmitClose) onclose?.();
			currentIndex = flow.resetState.currentIndex;
			onconfirm?.(flow.items as [], flow.indexs);
			return;
		}
		items = flow.items;
		indexs = flow.indexs;
		data = flow.resetState.data;
		setTimeout(() => {
			onnext?.(flow.currentIndex);
			currentIndex = flow.resetState.currentIndex;
		});
	};

	// 滚动结束
	// Scroll end
	const scrollEndFunc = (index: number) => {
		currentIndex = index;
	};
</script>

{#snippet asyncPickerContent()}
	<div class={asyncPickerDerived.headerClass}>
		<button
			class={asyncPickerDerived.leftButtonClass}
			onclick={() => {
				if (!isLoading) clickLeftFunc();
			}}
		>
			{#if isLoading}
				<div class={asyncPickerDerived.buttonLoadingClass}>
					<Loading width="4" height="4" customColor={['#666']} />
				</div>
			{:else}
				{leftButtonText}
			{/if}
		</button>
		<div>{asyncPickerTexts.title}</div>
		<button
			class={asyncPickerDerived.rightButtonClass}
			onclick={() => {
				if (!isLoading) clickRightFunc();
			}}
		>
			{#if isLoading}
				<div class={asyncPickerDerived.buttonLoadingClass}>
					<Loading width="4" height="4" theme />
				</div>
			{:else}
				{rightButtonText}
			{/if}
		</button>
	</div>
	{#if showSelected}
		<div class={asyncPickerDerived.selectedWrapClass}>
			<div class={asyncPickerDerived.selectedLabelClass}>
				{asyncPickerTexts.selectedText}
			</div>
			{#each items as item, index (index)}
				{#if !isLoading}
					<div
						in:fly|global={selectedFlyInParams}
						out:fly|global={selectedFlyOutParams}
						class={asyncPickerDerived.selectedItemClass}
					>
						{item[labelKey]}
					</div>
				{/if}
			{/each}
		</div>
	{/if}
	<div class={asyncPickerDerived.bodyClass}>
		<div class={asyncPickerDerived.contentClipClass}>
			{#if isLoading}
				<div
					class={asyncPickerDerived.loadingClass}
					style={asyncPickerDerived.loadingHeightStyleString}
				>
					<Loading width="28" height="8" type="1_16" theme {...loading} />
				</div>
			{:else}
				<div style={asyncPickerDerived.inlineContentStyleString}>
					<ScrollRadio
						data={data as Record<string, string>[]}
						{showRow}
						{labelKey}
						{align}
						autoScrollToLast={false}
						onscrollEnd={scrollEndFunc}
					/>
				</div>
			{/if}
		</div>
	</div>
{/snippet}

{#if usePopup}
	<Popup
		bind:visible
		size={0}
		maskClosable
		transitionDistance={metrics.transitionDistance}
		{...asyncPickerDerived.popupConfig.popupProps}
	>
		{@render asyncPickerContent()}
	</Popup>
{:else}
	{@render asyncPickerContent()}
{/if}
