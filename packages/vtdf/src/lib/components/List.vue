<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import type { BatchActionProps, ListProps, SwipeActionProps } from '../types';
import {
	resolveListBatchActionClass,
	resolveListBatchActionStatus,
	resolveListBatchModeAction,
	resolveListBatchSelected,
	resolveListBatchToggleText,
	resolveListCloseSwipeAction,
	resolveListInitialBatchMode,
	resolveListInitialBatchSelected,
	resolveListInitialSwiping,
	resolveListItemClickAction,
	resolveListItemKey,
	resolveListItemKeyboardAction,
	resolveListItemSwipeOffset,
	resolveListItemsAfterLeave,
	resolveListRenderItems,
	resolveListDerived,
	resolveListSelectAll,
	resolveListSwipeEndAction,
	resolveListSwipeMoveState,
	resolveListSwipeStartAction,
	resolveListTransitionCss,
	type ListRenderItem
} from '@any-tdf/common/derived/list';
import { arrowRightSvg, listBackTopSvg, listCheckSvg, radioUncheckedSvg } from '@any-tdf/common/svg/common';
import { zh_CN } from '../lang';
import { useConfig } from './adapter/config';
import Icon from './Icon.vue';
import SvgIcon from './SvgIcon.vue';

type ListItem = Record<string, unknown>;
type ListKey = string | number;
const props = withDefaults(
	defineProps<
		Omit<ListProps<ListItem>, 'itemChild' | 'headerChild' | 'footerChild'> & {
			itemChild?: ListProps<ListItem>['itemChild'];
			headerChild?: ListProps<ListItem>['headerChild'];
			footerChild?: ListProps<ListItem>['footerChild'];
		}
	>(),
	{
		data: () => [],
		keyField: 'id',
		gap: '0',
		mx: '0',
		my: '0',
		itemPx: '0',
		itemPy: '0',
		transition: 'slideRight',
		transitionDelay: 50,
		batchMode: false,
		batchSelected: () => [],
		batchSelectable: false,
		batchActions: () => [],
		injClass: '',
		itemInjClass: '',
		clickable: true,
		arrow: false,
		divider: true,
		itemRadius: '',
		swipeActions: () => [],
		swipeHint: 'first',
		swipeThreshold: 30
	}
);

const emit = defineEmits<{
	'update:batchMode': [value: boolean];
	'update:batchSelected': [value: ListKey[]];
	batchModeChange: [value: boolean];
	batchChange: [value: ListKey[]];
	batchAction: [actionIndex: number, action: BatchActionProps, selected: ListKey[]];
	clickItem: [item: ListItem, index: number];
	swipeAction: [actionIndex: number, action: SwipeActionProps, item: ListItem, itemIndex: number];
}>();

const config = useConfig();
const listLang = computed(() => config.locale.list || zh_CN.list);
const listTransitionCss = resolveListTransitionCss({ prefix: 'vtdf' });
const innerBatchMode = ref(resolveListInitialBatchMode(props.batchMode));
const innerBatchSelected = ref<ListKey[]>(resolveListInitialBatchSelected(props.batchSelected));
const swipeOffsets = ref<Record<ListKey, number>>({});
const renderItems = ref<ListRenderItem<ListItem>[]>([]);
const leaveTimers = new Map<ListKey, ReturnType<typeof setTimeout>>();
const swipeStartX = ref(0);
const swipeStartY = ref(0);
const swipeMovedDistance = ref(0);
const swipeMovedKey = ref<ListKey | null>(null);
const swipeClickBlockKey = ref<ListKey | null>(null);
const activeSwipeKey = ref<ListKey | null>(null);
const isSwiping = ref(resolveListInitialSwiping());
const listTransitionDuration = 300;

// 公共派生层处理 List class、item 视图状态和纯计算，DOM 事件与 slot 渲染留在组件层。
// Shared derived layer handles List classes, item view state and pure calculations; DOM events and slot rendering stay in the component layer.
const listState = computed(() =>
	resolveListDerived<ListItem, SwipeActionProps>({
		renderItems: renderItems.value,
		prefix: 'vtdf',
		transition: props.transition,
		transitionDelay: props.transitionDelay,
		staggerVariable: '--vtdf-list-stagger-x',
		swipeActions: props.swipeActions,
		swipeOffsets: swipeOffsets.value,
		swipeHint: props.swipeHint,
		batchMode: innerBatchMode.value,
		batchSelected: innerBatchSelected.value,
		clickable: props.clickable,
		hasClickHandler: true,
		gap: props.gap,
		mx: props.mx,
		my: props.my,
		itemPx: props.itemPx,
		itemPy: props.itemPy,
		itemRadius: props.itemRadius,
		itemInjClass: props.itemInjClass,
		injClass: props.injClass,
		divider: props.divider
	})
);

const clearLeaveTimer = (key: ListKey) => {
	const timer = leaveTimers.get(key);
	if (timer) {
		clearTimeout(timer);
		leaveTimers.delete(key);
	}
};

const updateRenderItems = () => {
	// 公共函数返回渲染项状态，timer 的创建和清理继续留在组件层。
	// Shared helper returns render-item state while timer ownership stays in the component.
	const nextState = resolveListRenderItems({
		currentItems: renderItems.value,
		data: props.data,
		keyField: props.keyField,
		transition: props.transition
	});
	nextState.restoredKeys.forEach(clearLeaveTimer);
	nextState.leavingKeys.forEach((leavingKey) => {
		if (leaveTimers.has(leavingKey)) return;
		const timer = setTimeout(() => {
			renderItems.value = resolveListItemsAfterLeave(renderItems.value, leavingKey);
			leaveTimers.delete(leavingKey);
		}, listTransitionDuration);
		leaveTimers.set(leavingKey, timer);
	});

	if (!nextState.isSame) {
		renderItems.value = nextState.items;
	}
};

const emitBatchModeChange = (mode: boolean) => {
	emit('update:batchMode', mode);
	emit('batchModeChange', mode);
};

const emitBatchChange = (selected: ListKey[]) => {
	emit('update:batchSelected', selected);
	emit('batchChange', selected);
};

const emitClickItem = (item: ListItem, index: number) => {
	if (!props.clickable) return;
	emit('clickItem', item, index);
};

const emitSwipeAction = (actionIndex: number, action: SwipeActionProps, item: ListItem, itemIndex: number) => {
	emit('swipeAction', actionIndex, action, item, itemIndex);
};

const closeSwipe = (itemKey: ListKey) => {
	const action = resolveListCloseSwipeAction({
		swipeOffsets: swipeOffsets.value,
		itemKey,
		activeSwipeKey: activeSwipeKey.value
	});
	swipeOffsets.value = action.nextSwipeOffsets as Record<ListKey, number>;
	activeSwipeKey.value = action.nextActiveSwipeKey;
};

const handleSwipeStart = (event: PointerEvent, itemKey: ListKey) => {
	const action = resolveListSwipeStartAction({
		hasSwipeActions: listState.value.hasSwipeActions,
		batchMode: innerBatchMode.value,
		activeSwipeKey: activeSwipeKey.value,
		itemKey,
		clientX: event.clientX,
		clientY: event.clientY
	});
	if (!action.shouldStart) return;
	isSwiping.value = action.isSwiping;
	swipeMovedDistance.value = action.swipeMovedDistance;
	swipeMovedKey.value = action.swipeMovedKey;
	swipeStartX.value = action.swipeStartX;
	swipeStartY.value = action.swipeStartY;
	if (action.shouldCapturePointer) {
		(event.target as HTMLElement).setPointerCapture(event.pointerId);
	}
	if (action.closeKey !== null) {
		closeSwipe(action.closeKey);
	}
};

const handleSwipeMove = (event: PointerEvent, itemKey: ListKey) => {
	if (!listState.value.hasSwipeActions || innerBatchMode.value || !isSwiping.value) return;
	const moveState = resolveListSwipeMoveState({
		currentX: event.clientX,
		currentY: event.clientY,
		startX: swipeStartX.value,
		startY: swipeStartY.value,
		currentOffset: resolveListItemSwipeOffset(swipeOffsets.value, itemKey),
		swipeActionWidth: listState.value.swipeActionWidth,
		swipeMovedDistance: swipeMovedDistance.value,
		itemKey
	});
	if (moveState.ignore) return;

	swipeMovedDistance.value = moveState.nextMovedDistance;
	if (moveState.nextMovedKey !== null) {
		swipeMovedKey.value = moveState.nextMovedKey;
	}
	swipeOffsets.value = { ...swipeOffsets.value, [itemKey]: moveState.nextOffset };
	swipeStartX.value = moveState.nextStartX;
};

const handleSwipeEnd = (event: PointerEvent, itemKey: ListKey) => {
	if (!listState.value.hasSwipeActions || innerBatchMode.value || !isSwiping.value) return;
	(event.target as HTMLElement).releasePointerCapture(event.pointerId);
	const offset = resolveListItemSwipeOffset(swipeOffsets.value, itemKey);
	const action = resolveListSwipeEndAction({
		offset,
		swipeThreshold: props.swipeThreshold,
		swipeActionWidth: listState.value.swipeActionWidth,
		itemKey,
		swipeMovedKey: swipeMovedKey.value,
		swipeOffsets: swipeOffsets.value,
		activeSwipeKey: activeSwipeKey.value
	});
	isSwiping.value = action.isSwiping;
	swipeOffsets.value = action.nextSwipeOffsets as Record<ListKey, number>;
	activeSwipeKey.value = action.nextActiveSwipeKey;

	if (action.shouldBlockClick && action.nextSwipeClickBlockKey !== null) {
		swipeClickBlockKey.value = action.nextSwipeClickBlockKey;
		setTimeout(() => {
			if (swipeClickBlockKey.value === itemKey) {
				swipeClickBlockKey.value = null;
			}
		}, 0);
	}
	swipeMovedKey.value = action.nextSwipeMovedKey;
};

const handleSwipeActionClick = (actionIndex: number, action: SwipeActionProps, item: ListItem, itemIndex: number, itemKey: ListKey) => {
	closeSwipe(itemKey);
	emitSwipeAction(actionIndex, action, item, itemIndex);
};

const handleBatchActionClick = (actionIndex: number, action: BatchActionProps) => {
	emit('batchAction', actionIndex, action, innerBatchSelected.value);
};

const handleBatchSelect = (item: ListItem, index: number) => {
	const key = resolveListItemKey(item, index, props.keyField);
	const nextSelected = resolveListBatchSelected(innerBatchSelected.value, key);
	innerBatchSelected.value = nextSelected;
	emitBatchChange(nextSelected);
};

const handleSelectAll = () => {
	const nextSelected = resolveListSelectAll({
		selected: innerBatchSelected.value,
		data: props.data,
		keyField: props.keyField
	});
	innerBatchSelected.value = nextSelected;
	emitBatchChange(nextSelected);
};

const toggleBatchMode = () => {
	const action = resolveListBatchModeAction({ batchMode: innerBatchMode.value });
	innerBatchMode.value = action.nextBatchMode;
	emitBatchModeChange(action.nextBatchMode);
	if (action.shouldClearSelected) {
		innerBatchSelected.value = action.nextSelected;
		emitBatchChange(action.nextSelected);
	}
};

const handleItemClick = (item: ListItem, index: number, itemKey: ListKey) => {
	// 公共 action 只返回点击意图，事件和状态赋值留在组件内。
	// Shared action only returns click intent; events and state assignment stay in the component.
	const action = resolveListItemClickAction({
		swipeClickBlockKey: swipeClickBlockKey.value,
		itemKey,
		activeSwipeKey: activeSwipeKey.value,
		batchMode: innerBatchMode.value,
		clickable: props.clickable
	});
	if (action.intent === 'ignore') return;
	if (action.intent === 'closeSwipe' && action.closeKey !== null) {
		closeSwipe(action.closeKey);
		return;
	}
	if (action.intent === 'batchSelect') {
		handleBatchSelect(item, index);
		return;
	}
	if (action.intent === 'clickItem') emitClickItem(item, index);
};

const handleItemKeydown = (event: KeyboardEvent, item: ListItem, index: number, itemKey: ListKey) => {
	const action = resolveListItemKeyboardAction({
		key: event.key,
		clickable: props.clickable,
		hasClickHandler: true,
		batchMode: innerBatchMode.value
	});
	if (action.shouldPreventDefault) {
		event.preventDefault();
	}
	if (action.shouldClick) {
		handleItemClick(item, index, itemKey);
	}
};

watch(() => props.data, updateRenderItems, { immediate: true, deep: true });
watch(() => props.keyField, updateRenderItems);
watch(() => props.transition, updateRenderItems);
watch(
	() => props.batchMode,
	(mode) => {
		innerBatchMode.value = resolveListInitialBatchMode(mode);
	}
);
watch(
	() => props.batchSelected,
	(selected) => {
		innerBatchSelected.value = resolveListInitialBatchSelected(selected);
	}
);

onBeforeUnmount(() => {
	leaveTimers.forEach((timer) => clearTimeout(timer));
	leaveTimers.clear();
});
</script>

<template>
	<component :is="'style'" v-html="listTransitionCss" />
	<div :class="listState.rootClass">
		<div v-if="batchSelectable" :class="listState.batchBarClass">
			<template v-if="innerBatchMode">
				<div :class="listState.batchActionGroupClass">
					<button type="button" :class="listState.batchTextButtonClass" @click="handleSelectAll">
						{{ listLang.selectAllText }} ({{ innerBatchSelected.length }}/{{ data.length }})
					</button>
					<template v-if="innerBatchSelected.length > 0">
						<button
							v-for="(action, actionIndex) in batchActions"
							:key="actionIndex"
							type="button"
							:class="resolveListBatchActionClass(resolveListBatchActionStatus(action.status))"
							@click="handleBatchActionClick(actionIndex, action)"
						>
							{{ action.text }}
						</button>
					</template>
				</div>
			</template>
			<span v-else />
			<button type="button" :class="listState.batchTextButtonClass" @click="toggleBatchMode">
				{{
					resolveListBatchToggleText({
						batchMode: innerBatchMode,
						doneText: listLang.doneText,
						editText: listLang.editText
					})
				}}
			</button>
		</div>

		<slot name="header" />

		<div :class="listState.contentClass">
			<div
				v-for="itemViewState in listState.items"
				:key="itemViewState.itemKey"
				:class="itemViewState.transitionClass"
				:style="itemViewState.transitionStyle"
			>
				<div :class="itemViewState.shellClass">
					<button
						v-if="itemViewState.showBatchSelect"
						type="button"
						:class="itemViewState.batchSelectClass"
						:style="itemViewState.batchSelectWidthStyle"
						@click="handleBatchSelect(itemViewState.item, itemViewState.index)"
					>
						<!-- 公共 List 图标 SVG 数据在 common 中维护。 / Shared List SVG data lives in common. -->
						<SvgIcon v-if="itemViewState.batchSelected" :svg="listCheckSvg" :class-name="listState.batchCheckedIconClass" />
						<SvgIcon v-else :svg="radioUncheckedSvg" :class-name="listState.batchUncheckedIconClass" />
					</button>

					<div v-if="itemViewState.showSwipeActions" :class="itemViewState.actionLayerClass">
						<button
							v-for="actionState in itemViewState.swipeActions"
							:key="actionState.index"
							type="button"
							:class="actionState.buttonClass"
							@click="
								handleSwipeActionClick(
									actionState.index,
									actionState.action,
									itemViewState.item,
									itemViewState.index,
									itemViewState.itemKey
								)
							"
						>
							<Icon v-if="actionState.action.icon" :name="actionState.action.icon" :size="20" />
							<span v-if="actionState.action.text" :class="actionState.textClass">{{ actionState.action.text }}</span>
						</button>
					</div>

					<div
						:class="itemViewState.contentLayerClass"
						:style="itemViewState.transformStyle"
						@pointerdown="(event) => handleSwipeStart(event, itemViewState.itemKey)"
						@pointermove="(event) => handleSwipeMove(event, itemViewState.itemKey)"
						@pointerup="(event) => handleSwipeEnd(event, itemViewState.itemKey)"
						@pointercancel="(event) => handleSwipeEnd(event, itemViewState.itemKey)"
					>
						<div
							role="button"
							:tabindex="itemViewState.tabIndex"
							:aria-disabled="itemViewState.disabled"
							:class="itemViewState.buttonClass"
							@click="handleItemClick(itemViewState.item, itemViewState.index, itemViewState.itemKey)"
							@keydown="(event) => handleItemKeydown(event, itemViewState.item, itemViewState.index, itemViewState.itemKey)"
						>
							<div :class="itemViewState.itemContentClass">
								<slot name="item" :item="itemViewState.item" :index="itemViewState.index">
									{{ itemViewState.item }}
								</slot>
							</div>
							<div v-if="arrow && !innerBatchMode" :class="itemViewState.arrowClass">
								<!-- 公共箭头 SVG 数据在 common 中维护。 / Shared arrow SVG data lives in common. -->
								<SvgIcon :svg="arrowRightSvg" width="20" height="20" :class-name="listState.arrowIconClass" />
							</div>
						</div>
						<div v-if="itemViewState.showSwipeHint" :class="itemViewState.swipeHintClass">
							<SvgIcon :svg="listBackTopSvg" :class-name="listState.swipeHintIconClass" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<slot name="footer" />
	</div>
</template>
