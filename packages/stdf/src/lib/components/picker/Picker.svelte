<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import ScrollRadio from '../scrollRadio/ScrollRadio.svelte';
	import Tag from '../tag/Tag.svelte';
	import Icon from '../icon/Icon.svelte';
	import { resolveHiddenScrollbarCss, resolveViewportDimension } from '@any-tdf/common/derived/helpers';
	import {
		resolvePickerCancelAction,
		resolvePickerConfirmAction,
		resolvePickerDatasColumnData,
		resolvePickerDerived,
		resolvePickerLinkageScrollState,
		resolvePickerMultipleRemoveAction,
		resolvePickerMultipleToggleAction,
		resolvePickerStateOptions
	} from '@any-tdf/common/derived/picker';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { PickerProps, PickerDatasProps, PickerDataChildProps } from '../../types/index.js';

	// 当前语言
	// current language
	const currentLang: LangProps = getContext('STDF_lang') || zh_CN;
	const pickerLang: LangProps['picker'] = currentLang.picker;

	let {
		visible = $bindable(false),
		datas = [],
		autoScrollToLast = true,
		cancelText,
		confirmText,
		title,
		isLinkage = false,
		linkageInitIndexs = [],
		linkageShowRows = [],
		linkageFlexs = [],
		linkageLabelKeys = [],
		linkageAligns = [],
		linkageChildrenKey = 'children',
		height = 30,
		popup = {},
		multiple = false,
		multipleIcon = { name: 'ri-checkbox-circle-line', type: 'symbol', size: 24 },
		multipleIconActive = { name: 'ri-checkbox-circle-fill', type: 'symbol', size: 24 },
		multipleSelected = $bindable([]),
		onclose,
		onconfirm,
		oncancel,
		onmultiplechange
	}: PickerProps = $props();

	// 公共函数统一组装 Picker 派生入参，组件只传入当前 props、滚动状态和环境数值。
	// Shared helper normalizes Picker derivation options from current props, scroll state and environment values.
	const pickerBaseOptions = $derived(
		resolvePickerStateOptions({
			defaults: pickerLang,
			props: {
				datas,
				isLinkage,
				childrenKey: linkageChildrenKey,
				labelKeys: linkageLabelKeys,
				linkageInitIndexs,
				linkageShowRows,
				linkageFlexs,
				linkageAligns,
				cancelText,
				confirmText,
				title,
				height,
				popup
			},
			viewportHeight: resolveViewportDimension({ value: typeof window === 'undefined' ? undefined : window.innerHeight })
		})
	);
	const initialPickerState = $derived(resolvePickerDerived(pickerBaseOptions));
	const css = resolveHiddenScrollbarCss({ selector: '.picker-selected-tags', includeFirefox: true });

	// 内部使用的 datas
	// Datas used internally
	let newDatas: PickerDatasProps[] | PickerDataChildProps[] = $state([]);
	$effect(() => {
		const { initialState } = initialPickerState;

		// 公共 Picker 派生只返回初始化后的列和索引，状态赋值留在组件层。
		// Shared Picker derivations only return initialized columns and indexes; state assignment stays in the component.
		newDatas = initialState.datas;
		scrollEndIndexs = initialState.scrollEndIndexs;
		currentScrollingIndexs = initialState.currentScrollingIndexs;
		lastSelectedIndexs = initialState.lastSelectedIndexs;
		allLevelData = initialPickerState.allLevelData;
	});

	let scrollEndIndexs: number[] = [];
	let lastSelectedIndexs: number[] = $state([]);
	// 滚动中的索引，用于实时判断当前是否选中
	// Scrolling indexes, used to determine if currently selected in real-time
	let currentScrollingIndexs: number[] = $state([]);

	// 公共派生层统一 Picker 的文本、列样式、多选状态和布局值，滚动状态写入留在组件层。
	// Shared derivation centralizes Picker text, column styles, multiple state and layout values; scroll state writes stay in the component layer.
	const pickerState = $derived(resolvePickerDerived(resolvePickerStateOptions({
		currentScrollingIndexs,
		defaults: pickerLang,
		displayDatas: newDatas as PickerDatasProps[],
		lastSelectedIndexs,
		multiple,
		multipleSelected,
		props: {
			datas,
			isLinkage,
			childrenKey: linkageChildrenKey,
			labelKeys: linkageLabelKeys,
			linkageInitIndexs,
			linkageShowRows,
			linkageFlexs,
			linkageAligns,
			cancelText,
			confirmText,
			title,
			height,
			popup
		},
		viewportHeight: resolveViewportDimension({ value: typeof window === 'undefined' ? undefined : window.innerHeight })
	})));

	// 多级联动时，根据当前选中项的索引，需要知道滚动的上级、当前级、下级以及所有级的数据
	// When multi-level linkage, according to the index of the currently selected item, you need to know the data of the scrolling upper level, current level, next level and all levels
	let allLevelData: (PickerDataChildProps[] | PickerDatasProps[])[] = [];

	// 点击取消按钮
	// Click cancel button
	const clickCancelFunc = () => {
		// 公共动作函数只返回关闭和回调决策，组件层负责状态写入和事件触发。
		// Shared action function only returns close and callback decisions; the component writes state and fires events.
		const action = resolvePickerCancelAction();
		visible = action.nextVisible;
		if (action.shouldCancel) oncancel?.();
		if (action.shouldClose) onclose?.();
	};

	// 点击确定按钮
	// Click confirm button
	const clickConfirmFunc = () => {
		const action = resolvePickerConfirmAction<{ [key: string]: string }>({
			datas,
			currentIndexs: scrollEndIndexs,
			isLinkage,
			allLevelData,
			linkageLabelKeys
		});
		visible = action.nextVisible;
		if (action.shouldClose) onclose?.();
		lastSelectedIndexs = action.indexs;
		if (action.shouldConfirm) onconfirm?.(action.items, action.indexs);
	};

	// 滚动中更新索引
	// Update index during scrolling
	const scrollingFunc = (index: number, col: number) => {
		currentScrollingIndexs[col] = index;
		currentScrollingIndexs = [...currentScrollingIndexs];
	};

	// 滚动结束
	// Scroll end
	const scrollEndFunc = (i: number, col: number) => {
		// col 为当前滚动结束的列的索引
		// index 为当前滚动结束的列的选中项的索引
		const index = i;
		scrollEndIndexs = [...scrollEndIndexs];
		scrollEndIndexs[col] = index;
		// 同步更新滚动中索引
		// Sync scrolling indexes
		currentScrollingIndexs[col] = index;
		currentScrollingIndexs = [...currentScrollingIndexs];
		if (isLinkage) {
			// 公共函数计算联动列更新，组件层只负责同步状态和异步填充。
			// Shared helper computes linkage column updates; component layer only syncs state and schedules async fills.
			const linkageState = resolvePickerLinkageScrollState({
				datas,
				displayDatas: newDatas as PickerDatasProps[],
				allLevelData,
				currentIndexs: scrollEndIndexs,
				column: col,
				index,
				childrenKey: linkageChildrenKey,
				labelKeys: linkageLabelKeys
			});
			scrollEndIndexs = linkageState.currentIndexs;
			currentScrollingIndexs = [...linkageState.currentIndexs];
			newDatas = linkageState.datas;
			allLevelData = linkageState.allLevelData;
			linkageState.columnUpdates.forEach(({ column, data }) => {
				newDatas = resolvePickerDatasColumnData(newDatas as PickerDatasProps[], column, []);
				if (data.length > 0) {
					setTimeout(() => {
						newDatas = resolvePickerDatasColumnData(newDatas as PickerDatasProps[], column, data);
					});
				}
			});
		}
	};

	// 点击多选图标
	// Click multiple selection icon
	const clickMultipleIcon = () => {
		const action = resolvePickerMultipleToggleAction({
			datas,
			currentIndexs: scrollEndIndexs,
			isLinkage,
			allLevelData,
			linkageLabelKeys,
			multipleSelected: pickerState.multipleSelected
		});
		multipleSelected = action.nextSelected;
		if (action.shouldEmit) onmultiplechange?.(action.nextSelected);
	};

	// 删除已选项
	// Remove selected item
	const removeSelectedItem = (index: number) => {
		const action = resolvePickerMultipleRemoveAction({ multipleSelected: pickerState.multipleSelected, index });
		multipleSelected = action.nextSelected;
		if (action.shouldEmit) onmultiplechange?.(action.nextSelected);
	};
</script>

<svelte:head>
	<style>
		{css}
	</style>
</svelte:head>

{#snippet pickerContent()}
	<div class={pickerState.headerClass}>
		<button class={pickerState.cancelButtonClass} onclick={clickCancelFunc}>{pickerState.texts.cancelText}</button>
		<div>{pickerState.texts.title}</div>
		<button class={pickerState.confirmButtonClass} onclick={clickConfirmFunc}>{pickerState.texts.confirmText}</button>
	</div>
	{#if pickerState.showMultipleTags}
		<div class={pickerState.multipleTagsClass}>
			{#each pickerState.multipleSelected as item, index (index)}
				<Tag text={item.label} size="sm" closable onclose={() => removeSelectedItem(index)} />
			{/each}
		</div>
	{/if}
	<div
		class={pickerState.contentClass}
		style={pickerState.contentStyleString}
	>
		{#each pickerState.columnItems as columnItem (columnItem.index)}
			<div class={columnItem.rootClass} style={columnItem.styleString}>
				{#if columnItem.hasData}
					<ScrollRadio
						{...columnItem.item}
						data={columnItem.data}
						lastSelectedIndex={columnItem.lastSelectedIndex}
						{autoScrollToLast}
						onscrollEnd={(index) => scrollEndFunc(index, columnItem.index)}
						onscrolling={(index) => scrollingFunc(index, columnItem.index)}
					/>
				{/if}
			</div>
		{/each}
		{#if multiple}
			<button
				class={pickerState.multipleButtonClass}
				onclick={clickMultipleIcon}
			>
				{#if pickerState.isCurrentSelected}
					<Icon {...multipleIconActive} state="theme" />
				{:else}
					<span class={pickerState.multipleInactiveIconClass}>
						<Icon {...multipleIcon} />
					</span>
				{/if}
			</button>
		{/if}
	</div>
{/snippet}

{#if pickerState.usePopup}
	<Popup
		bind:visible
		size={0}
		maskClosable
		transitionDistance={pickerState.transitionDistance}
		{...popup}
	>
		{@render pickerContent()}
	</Popup>
{:else}
	{@render pickerContent()}
{/if}
