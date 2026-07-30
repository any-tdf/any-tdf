<script lang="ts" generics="T extends Record<string, unknown>">
	import { getContext, onDestroy, untrack } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { ListProps, SwipeActionProps } from '../../types/index.js';
	import {
		resolveListBatchActionClass,
		resolveListBatchActionStatus,
		resolveListBatchModeAction,
		resolveListBatchSelected,
		resolveListBatchToggleText,
		resolveListCloseSwipeAction,
		resolveListDerived,
		resolveListInitialSwiping,
		resolveListItemClickAction,
		resolveListItemKey,
		resolveListItemSwipeOffset,
		resolveListItemsAfterLeave,
		resolveListRenderItems,
		resolveListSelectAll,
		resolveListSwipeEndAction,
		resolveListSwipeMoveState,
		resolveListSwipeStartAction,
		resolveListTransitionCss,
		type ListItemViewState,
		type ListRenderItem
	} from '@any-tdf/common/derived/list';
	import { arrowRightSvg, listBackTopSvg, listCheckSvg, radioUncheckedSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';

	// 当前语言
	// Current language
	const currentLang: LangProps = getContext('STDF_lang') || zh_CN;
	const listLang = (currentLang.list || zh_CN.list) as NonNullable<LangProps['list']>;

	let {
		data = [],
		keyField = 'id',
		gap = '0',
		mx = '0',
		my = '0',
		itemPx = '0',
		itemPy = '0',
		transition: listTransition = 'slideRight',
		transitionDelay = 50,
		batchMode = $bindable(false),
		batchSelected = $bindable([]),
		batchSelectable = false,
		batchActions = [],
		injClass = '',
		itemInjClass = '',
		arrow = false,
		divider = true,
		itemRadius = '',
		// 滑动操作相关
		// Swipe action related
		swipeActions = [],
		swipeHint = 'first',
		swipeThreshold = 30,
		// Snippets
		itemChild,
		headerChild,
		footerChild,
		// Events
		onbatchChange,
		onclickItem,
		onswipeAction
	}: ListProps<T> = $props();

	// 滑动操作状态
	// Swipe action state
	let swipeStartX = 0;
	let swipeStartY = 0;
	let swipeMovedDistance = 0;
	let swipeMovedKey: string | number | null = null;
	let swipeClickBlockKey: string | number | null = null;
	let swipeOffsets: Record<string | number, number> = $state({});
	let activeSwipeKey: string | number | null = $state(null);
	let isSwiping = resolveListInitialSwiping(); // 是否正在滑动 Whether swiping

	const css = resolveListTransitionCss({ prefix: 'stdf' });

	let renderItems = $state<ListRenderItem<T>[]>([]);
	// 公共派生层处理 List class、item 视图状态和纯计算，DOM 事件与 snippet 渲染留在组件层。
	// Shared derived layer handles List classes, item view state and pure calculations; DOM events and snippet rendering stay in the component layer.
	const listState = $derived(resolveListDerived<T, SwipeActionProps>({
		renderItems,
		prefix: 'stdf',
		transition: listTransition,
		transitionDelay,
		swipeActions,
		swipeOffsets,
		swipeHint,
		batchMode,
		batchSelected,
		clickable: Boolean(onclickItem),
		hasClickHandler: Boolean(onclickItem),
		gap,
		mx,
		my,
		itemPx,
		itemPy,
		itemRadius,
		itemInjClass,
		injClass,
		divider
	}));
	const listTransitionDuration = 300;
	const leaveTimers = new Map<string | number, ReturnType<typeof setTimeout>>();

	const clearLeaveTimer = (key: string | number) => {
		const timer = leaveTimers.get(key);
		if (!timer) return;
		clearTimeout(timer);
		leaveTimers.delete(key);
	};

	$effect(() => {
		// 公共函数返回渲染项状态，timer 的创建和清理继续留在组件层。
		// Shared helper returns render-item state while timer ownership stays in the component.
		const currentItems = untrack(() => renderItems);
		const nextState = resolveListRenderItems({ currentItems, data, keyField, transition: listTransition });
		nextState.restoredKeys.forEach(clearLeaveTimer);
		nextState.leavingKeys.forEach((leavingKey) => {
			clearLeaveTimer(leavingKey);
			leaveTimers.set(
				leavingKey,
				setTimeout(() => {
					renderItems = resolveListItemsAfterLeave(renderItems, leavingKey);
					leaveTimers.delete(leavingKey);
				}, listTransitionDuration)
			);
		});

		if (!nextState.isSame) {
			renderItems = nextState.items;
		}
	});

	onDestroy(() => {
		leaveTimers.forEach((timer) => clearTimeout(timer));
		leaveTimers.clear();
	});

	// 滑动操作指针事件
	// Swipe action pointer events
	const handleSwipeStart = (e: PointerEvent, itemKey: string | number) => {
		const action = resolveListSwipeStartAction({ hasSwipeActions: listState.hasSwipeActions, batchMode, activeSwipeKey, itemKey, clientX: e.clientX, clientY: e.clientY });
		if (!action.shouldStart) return;
		isSwiping = action.isSwiping;
		swipeMovedDistance = action.swipeMovedDistance;
		swipeMovedKey = action.swipeMovedKey;
		swipeStartX = action.swipeStartX;
		swipeStartY = action.swipeStartY;
		// 捕获指针以确保持续接收事件
		// Capture pointer to ensure continuous event receiving
		if (action.shouldCapturePointer) {
			(e.target as HTMLElement).setPointerCapture(e.pointerId);
		}
		// 如果有其他项打开，先关闭
		if (action.closeKey !== null) {
			closeSwipe(action.closeKey);
		}
	};

	const handleSwipeMove = (e: PointerEvent, itemKey: string | number) => {
		if (!listState.hasSwipeActions || batchMode || !isSwiping) return;
		const currentX = e.clientX;
		const currentY = e.clientY;
		const moveState = resolveListSwipeMoveState({
			currentX,
			currentY,
			startX: swipeStartX,
			startY: swipeStartY,
			currentOffset: resolveListItemSwipeOffset(swipeOffsets, itemKey),
			swipeActionWidth: listState.swipeActionWidth,
			swipeMovedDistance,
			itemKey
		});

		if (moveState.ignore) return;

		swipeMovedDistance = moveState.nextMovedDistance;
		if (moveState.nextMovedKey !== null) {
			swipeMovedKey = moveState.nextMovedKey;
		}

		swipeOffsets = { ...swipeOffsets, [itemKey]: moveState.nextOffset };
		swipeStartX = moveState.nextStartX;
	};

	const handleSwipeEnd = (e: PointerEvent, itemKey: string | number) => {
		if (!listState.hasSwipeActions || batchMode || !isSwiping) return;
		// 释放指针捕获
		// Release pointer capture
		(e.target as HTMLElement).releasePointerCapture(e.pointerId);
		const offset = resolveListItemSwipeOffset(swipeOffsets, itemKey);
		const action = resolveListSwipeEndAction({ offset, swipeThreshold, swipeActionWidth: listState.swipeActionWidth, itemKey, swipeMovedKey, swipeOffsets, activeSwipeKey });
		isSwiping = action.isSwiping;
		swipeOffsets = action.nextSwipeOffsets as Record<string | number, number>;
		activeSwipeKey = action.nextActiveSwipeKey;

		if (action.shouldBlockClick && action.nextSwipeClickBlockKey !== null) {
			swipeClickBlockKey = action.nextSwipeClickBlockKey;
			setTimeout(() => {
				if (swipeClickBlockKey === itemKey) {
					swipeClickBlockKey = null;
				}
			}, 0);
		}
		swipeMovedKey = action.nextSwipeMovedKey;
	};

	const closeSwipe = (itemKey: string | number) => {
		const action = resolveListCloseSwipeAction({ swipeOffsets, itemKey, activeSwipeKey });
		swipeOffsets = action.nextSwipeOffsets as Record<string | number, number>;
		activeSwipeKey = action.nextActiveSwipeKey;
	};

	// 点击滑动操作按钮
	// Click swipe action button
	const handleSwipeActionClick = (actionIndex: number, action: SwipeActionProps, item: T, itemIndex: number, itemKey: string | number) => {
		// 先关闭滑动
		closeSwipe(itemKey);
		// 触发操作的 onclick
		action.onclick?.();
		// 触发组件的 onswipeAction
		onswipeAction?.(actionIndex, action, item, itemIndex);
	};

	// 批量选择处理
	// Batch selection handling
	const handleBatchSelect = (item: T, index: number) => {
		const key = resolveListItemKey(item, index, keyField);
		batchSelected = resolveListBatchSelected(batchSelected, key);
		onbatchChange?.(batchSelected);
	};

	// 全选
	// Select all
	const handleSelectAll = () => {
		batchSelected = resolveListSelectAll({ selected: batchSelected, data, keyField });
		onbatchChange?.(batchSelected);
	};

	// 切换批量模式
	// Toggle batch mode
	const toggleBatchMode = () => {
		const action = resolveListBatchModeAction({ batchMode });
		batchMode = action.nextBatchMode;
		if (action.shouldClearSelected) {
			batchSelected = action.nextSelected;
			onbatchChange?.(batchSelected);
		}
	};

	// 点击列表项
	// Click list item
	const handleItemClick = (item: T, index: number, itemKey: string | number) => {
		// 公共 action 只返回点击意图，事件和状态赋值留在组件内。
		// Shared action only returns click intent; events and state assignment stay in the component.
		const action = resolveListItemClickAction({ swipeClickBlockKey, itemKey, activeSwipeKey, batchMode, clickable: Boolean(onclickItem) });
		if (action.intent === 'ignore') return;
		if (action.intent === 'closeSwipe' && action.closeKey !== null) {
			closeSwipe(action.closeKey);
			return;
		}
		if (action.intent === 'batchSelect') {
			handleBatchSelect(item, index);
			return;
		}
		if (action.intent === 'clickItem') onclickItem?.(item, index);
	};

</script>

{#snippet swipeHintIcon()}
	<!-- 公共 List 图标 SVG 数据在 common 中维护。 / Shared List SVG data lives in common. -->
	<SvgIcon svg={listBackTopSvg} class={listState.swipeHintIconClass} />
{/snippet}

{#snippet batchUncheckedIcon()}
	<SvgIcon svg={radioUncheckedSvg} class={listState.batchUncheckedIconClass} />
{/snippet}

{#snippet batchCheckedIcon()}
	<SvgIcon svg={listCheckSvg} class={listState.batchCheckedIconClass} />
{/snippet}

{#snippet listItem(itemViewState: ListItemViewState<T, SwipeActionProps>)}
	{@const item = itemViewState.item}
	{@const index = itemViewState.index}
	{@const itemKey = itemViewState.itemKey}

	<div class={itemViewState.shellClass}>
		<!-- 批量选择图标层 -->
		<!-- Batch selection icon layer -->
		{#if itemViewState.showBatchSelect}
			<button
				class={itemViewState.batchSelectClass}
				style={itemViewState.batchSelectWidthStyleString}
				onclick={() => handleBatchSelect(item, index)}
			>
				{#if itemViewState.batchSelected}
					{@render batchCheckedIcon()}
				{:else}
					{@render batchUncheckedIcon()}
				{/if}
			</button>
		{/if}

		<!-- 滑动操作按钮层 -->
		<!-- Swipe action buttons layer -->
		{#if itemViewState.showSwipeActions}
			<div class={itemViewState.actionLayerClass}>
				{#each itemViewState.swipeActions as actionState (actionState.index)}
					<button
						class={actionState.buttonClass}
						onclick={() => handleSwipeActionClick(actionState.index, actionState.action, item, index, itemKey)}
					>
						{#if actionState.action.icon}
							<Icon name={actionState.action.icon} size={20} />
						{/if}
						{#if actionState.action.text}
							<span class={actionState.textClass}>{actionState.action.text}</span>
						{/if}
					</button>
				{/each}
			</div>
		{/if}

		<!-- 列表项内容层 -->
		<!-- List item content layer -->
		<div
			role="presentation"
			class={itemViewState.contentLayerClass}
			style={itemViewState.transformStyleString}
			onpointerdown={(e) => handleSwipeStart(e, itemKey)}
			onpointermove={(e) => handleSwipeMove(e, itemKey)}
			onpointerup={(e) => handleSwipeEnd(e, itemKey)}
			onpointercancel={(e) => handleSwipeEnd(e, itemKey)}
		>
			<button
				class={itemViewState.buttonClass}
				onclick={() => handleItemClick(item, index, itemKey)}
				disabled={itemViewState.disabled}
			>
				<div class={itemViewState.itemContentClass}>
					{@render itemChild(item, index)}
				</div>
				{#if arrow && !batchMode}
					<div class={itemViewState.arrowClass}>
						<!-- 公共箭头 SVG 数据在 common 中维护。 / Shared arrow SVG data lives in common. -->
						<SvgIcon svg={arrowRightSvg} width="20" height="20" class={listState.arrowIconClass} />
					</div>
				{/if}
			</button>
			{#if itemViewState.showSwipeHint}
				<div class={itemViewState.swipeHintClass}>
					{@render swipeHintIcon()}
				</div>
			{/if}
		</div>
	</div>
{/snippet}

<div class={listState.rootClass}>
	<!-- 批量操作栏 -->
	<!-- Batch operation bar -->
	{#if batchSelectable}
		<div class={listState.batchBarClass}>
			{#if batchMode}
				<div class={listState.batchActionGroupClass}>
					<button
						class={listState.batchTextButtonClass}
						onclick={handleSelectAll}
					>
						{listLang.selectAllText} ({batchSelected.length}/{data.length})
					</button>
					{#if batchSelected.length > 0}
						{#each batchActions as action, actionIndex (actionIndex)}
							<button
								class={resolveListBatchActionClass(resolveListBatchActionStatus(action.status))}
								onclick={() => action.onclick?.(batchSelected)}
							>
								{action.text}
							</button>
						{/each}
					{/if}
				</div>
				<button
					class={listState.batchTextButtonClass}
					onclick={toggleBatchMode}
				>
					{resolveListBatchToggleText({ batchMode, doneText: listLang.doneText, editText: listLang.editText })}
				</button>
			{:else}
				<span></span>
				<button
					class={listState.batchTextButtonClass}
					onclick={toggleBatchMode}
				>
					{resolveListBatchToggleText({ batchMode, doneText: listLang.doneText, editText: listLang.editText })}
				</button>
			{/if}
		</div>
	{/if}

	<!-- 头部插槽 -->
	<!-- Header slot -->
	{#if headerChild}
		{@render headerChild()}
	{/if}

	<!-- 列表内容 -->
	<!-- List content -->
	<div class={listState.contentClass}>
		{#each listState.items as itemViewState (itemViewState.itemKey)}
			<div
				class={itemViewState.transitionClass}
				style={itemViewState.transitionStyleString}
			>
				{@render listItem(itemViewState)}
			</div>
		{/each}
	</div>

	<!-- 底部插槽 -->
	<!-- Footer slot -->
	{#if footerChild}
		{@render footerChild()}
	{/if}
</div>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>
