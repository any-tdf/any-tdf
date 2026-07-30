<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
	resolvePickerCancelAction,
	resolvePickerCloseAction,
	resolvePickerConfirmAction,
	resolvePickerDatasColumnData,
	resolvePickerDerived,
	resolvePickerInitialVisible,
	resolvePickerLinkageScrollState,
	resolvePickerMultipleRemoveAction,
	resolvePickerMultipleToggleAction,
	resolvePickerStateOptions
} from '@any-tdf/common/derived/picker';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import { resolveConditionalProps } from '@any-tdf/common/derived/props';
import type { IconProps, PickerDataChildProps, PickerDatasProps, PickerMultipleItem, PickerProps, PopupProps } from '../types';
import { zh_CN } from '../lang';
import { useConfig } from './adapter/config';
import Icon from './Icon.vue';
import Popup from './Popup.vue';
import ScrollRadio from './ScrollRadio.vue';
import Tag from './Tag.vue';

type PickerRecord = { [key: string]: string };
type PopupWithAlias = PopupProps & {};
type PickerComponentProps = Omit<PickerProps, 'datas' | 'popup' | 'multipleIcon' | 'multipleIconActive'> & {
	datas?: PickerDatasProps[] | PickerDataChildProps[];
	popup?: PopupWithAlias | null;
	multipleIcon?: IconProps;
	multipleIconActive?: IconProps;
};

const props = withDefaults(defineProps<PickerComponentProps>(), {
	visible: false,
	datas: () => [],
	autoScrollToLast: true,
	isLinkage: false,
	linkageInitIndexs: () => [],
	linkageShowRows: () => [],
	linkageFlexs: () => [],
	linkageAligns: () => [],
	linkageLabelKeys: () => [],
	linkageChildrenKey: 'children',
	height: 30,
	popup: () => ({}),
	multiple: false,
	multipleIcon: () => ({ name: 'ri-checkbox-circle-line', type: 'symbol', size: 24 }),
	multipleIconActive: () => ({ name: 'ri-checkbox-circle-fill', type: 'symbol', size: 24 })
});

const emit = defineEmits<{
	(event: 'update:visible', value: boolean): void;
	(event: 'update:multipleSelected', value: PickerMultipleItem[]): void;
	(event: 'close'): void;
	(event: 'confirm', items: PickerRecord[], indexs: number[]): void;
	(event: 'cancel'): void;
	(event: 'multipleChange', selected: PickerMultipleItem[]): void;
}>();

const config = useConfig();
const rootRef = ref<HTMLDivElement | null>(null);
const innerVisible = ref(resolvePickerInitialVisible(props.visible));
const innerMultipleSelected = ref<PickerMultipleItem[]>([]);
const newDatas = ref<PickerDatasProps[]>([]);
const lastSelectedIndexs = ref<number[]>([]);
const currentScrollingIndexs = ref<number[]>([]);
const scrollEndIndexs = ref<number[]>([]);
const allLevelData = ref<(PickerDataChildProps[] | PickerDatasProps[])[]>([]);
const innerHeight = ref(
	resolveViewportDimension({
		value: typeof window === 'undefined' ? undefined : window.innerHeight
	})
);

const pickerLang = computed(() => config.locale?.picker || zh_CN.picker);
// 公共函数统一组装 Picker 派生入参，组件只传入当前 props、滚动状态和环境数值。
// Shared helper normalizes Picker derivation options from current props, scroll state and environment values.
const pickerBaseOptions = computed(() =>
	resolvePickerStateOptions<PopupWithAlias>({
		defaults: pickerLang.value,
		props: {
			datas: props.datas,
			isLinkage: props.isLinkage,
			childrenKey: props.linkageChildrenKey,
			labelKeys: props.linkageLabelKeys,
			linkageInitIndexs: props.linkageInitIndexs,
			linkageShowRows: props.linkageShowRows,
			linkageFlexs: props.linkageFlexs,
			linkageAligns: props.linkageAligns,
			cancelText: props.cancelText,
			confirmText: props.confirmText,
			title: props.title,
			height: props.height,
			popup: props.popup
		},
		viewportHeight: innerHeight.value
	})
);
const initialPickerState = computed(() => resolvePickerDerived<PopupWithAlias>(pickerBaseOptions.value));
// 公共派生层统一 Picker 的文本、列样式、多选状态和布局值，滚动状态写入留在组件层。
// Shared derivation centralizes Picker text, column styles, multiple state and layout values; scroll state writes stay in the component layer.
const pickerState = computed(() =>
	resolvePickerDerived<PopupWithAlias>({
		...pickerBaseOptions.value,
		displayDatas: newDatas.value,
		currentScrollingIndexs: currentScrollingIndexs.value,
		lastSelectedIndexs: lastSelectedIndexs.value,
		innerMultipleSelected: innerMultipleSelected.value,
		multiple: props.multiple,
		multipleSelected: props.multipleSelected
	})
);
const multipleSelected = computed(() => pickerState.value.multipleSelected);
const popupBindProps = computed(() =>
	resolveConditionalProps({
		enabled: pickerState.value.usePopup,
		props: pickerState.value.popupConfig.popupProps
	})
);

const setVisible = (value: boolean) => {
	innerVisible.value = value;
	emit('update:visible', value);
};

const emitClose = () => {
	emit('close');
};

const updateMultipleSelected = (nextSelected: PickerMultipleItem[]) => {
	if (!pickerState.value.multipleSelectionState.isControlled) {
		innerMultipleSelected.value = nextSelected;
	}
	emit('update:multipleSelected', nextSelected);
	emit('multipleChange', nextSelected);
};

const processDatas = () => {
	const { initialState } = initialPickerState.value;

	// 公共 Picker 派生只返回初始化后的列和索引，状态赋值留在组件层。
	// Shared Picker derivations only return initialized columns and indexes; state assignment stays in the component.
	newDatas.value = initialState.datas;
	scrollEndIndexs.value = initialState.scrollEndIndexs;
	currentScrollingIndexs.value = initialState.currentScrollingIndexs;
	lastSelectedIndexs.value = initialState.lastSelectedIndexs;
	allLevelData.value = initialPickerState.value.allLevelData;
};

const clickCancel = () => {
	// 公共动作函数只返回关闭和回调决策，组件层负责状态写入和事件触发。
	// Shared action function only returns close and callback decisions; the component writes state and fires events.
	const action = resolvePickerCancelAction();
	setVisible(action.nextVisible);
	if (action.shouldCancel) emit('cancel');
	if (action.shouldClose) emitClose();
};

const clickConfirm = () => {
	const action = resolvePickerConfirmAction<PickerRecord>({
		datas: props.datas,
		currentIndexs: scrollEndIndexs.value,
		isLinkage: props.isLinkage,
		allLevelData: allLevelData.value,
		linkageLabelKeys: props.linkageLabelKeys
	});
	setVisible(action.nextVisible);
	if (action.shouldClose) emitClose();
	lastSelectedIndexs.value = action.indexs;
	if (action.shouldConfirm) emit('confirm', action.items, action.indexs);
};

const handlePopupClose = () => {
	// 公共 close action 只返回可见状态和 close 回调决策，Popup 事件留在组件层。
	// Shared close action only returns visibility and close callback decisions; Popup events stay in the component layer.
	const action = resolvePickerCloseAction();
	if (!action.shouldClose) return;
	setVisible(action.nextVisible);
	if (action.shouldEmitClose) emitClose();
};

const scrollingFunc = (index: number, column: number) => {
	const next = [...currentScrollingIndexs.value];
	next[column] = index;
	currentScrollingIndexs.value = next;
};

const scrollEndFunc = (index: number, column: number) => {
	const nextIndexs = [...scrollEndIndexs.value];
	nextIndexs[column] = index;

	if (!props.isLinkage) {
		scrollEndIndexs.value = nextIndexs;
		scrollingFunc(index, column);
		return;
	}

	// 公共函数计算联动列更新，组件层只负责同步状态和异步填充。
	// Shared helper computes linkage column updates; component layer only syncs state and schedules async fills.
	const linkageState = resolvePickerLinkageScrollState({
		datas: props.datas,
		displayDatas: newDatas.value,
		allLevelData: allLevelData.value,
		currentIndexs: scrollEndIndexs.value,
		column,
		index,
		childrenKey: props.linkageChildrenKey,
		labelKeys: props.linkageLabelKeys
	});
	scrollEndIndexs.value = linkageState.currentIndexs;
	currentScrollingIndexs.value = [...linkageState.currentIndexs];
	newDatas.value = linkageState.datas;
	allLevelData.value = linkageState.allLevelData;
	linkageState.columnUpdates.forEach(({ column: updateColumn, data }) => {
		newDatas.value = resolvePickerDatasColumnData(newDatas.value, updateColumn, []);
		if (data.length > 0) {
			setTimeout(() => {
				newDatas.value = resolvePickerDatasColumnData(newDatas.value, updateColumn, data);
			});
		}
	});
};

const clickMultipleIcon = () => {
	const action = resolvePickerMultipleToggleAction({
		datas: props.datas,
		currentIndexs: scrollEndIndexs.value,
		isLinkage: props.isLinkage,
		allLevelData: allLevelData.value,
		linkageLabelKeys: props.linkageLabelKeys,
		multipleSelected: pickerState.value.multipleSelected
	});
	if (action.shouldEmit) updateMultipleSelected(action.nextSelected);
};

const removeSelectedItem = (index: number) => {
	const action = resolvePickerMultipleRemoveAction({
		multipleSelected: pickerState.value.multipleSelected,
		index
	});
	if (action.shouldEmit) updateMultipleSelected(action.nextSelected);
};

const updateWindowHeight = () => {
	innerHeight.value = resolveViewportDimension({ value: window.innerHeight });
};

watch(
	() => props.visible,
	(value) => {
		innerVisible.value = resolvePickerInitialVisible(value);
	}
);

watch(
	() =>
		[
			props.datas,
			props.isLinkage,
			props.linkageInitIndexs,
			props.linkageShowRows,
			props.linkageFlexs,
			props.linkageAligns,
			props.linkageLabelKeys,
			props.linkageChildrenKey
		] as const,
	() => {
		processDatas();
	},
	{ immediate: true, deep: true }
);

onMounted(() => {
	window.addEventListener('resize', updateWindowHeight);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateWindowHeight);
});

defineExpose({
	root: rootRef
});
</script>

<template>
	<component
		:is="pickerState.usePopup ? Popup : 'div'"
		v-bind="popupBindProps"
		:visible="innerVisible"
		:size="0"
		mask-closable
		:transition-distance="pickerState.transitionDistance"
		@close="handlePopupClose"
	>
		<div ref="rootRef">
			<div :class="pickerState.headerClass">
				<button type="button" :class="pickerState.cancelButtonClass" @click="clickCancel">
					{{ pickerState.texts.cancelText }}
				</button>
				<div>{{ pickerState.texts.title }}</div>
				<button type="button" :class="pickerState.confirmButtonClass" @click="clickConfirm">
					{{ pickerState.texts.confirmText }}
				</button>
			</div>

			<div v-if="pickerState.showMultipleTags" :class="pickerState.multipleTagsClass">
				<Tag
					v-for="(item, index) in pickerState.multipleSelected"
					:key="index"
					:text="item.label"
					size="sm"
					closable
					@close="removeSelectedItem(index)"
				/>
			</div>

			<div :class="pickerState.contentClass" :style="pickerState.contentStyleValue">
				<div
					v-for="columnItem in pickerState.columnItems"
					:key="columnItem.index"
					:class="columnItem.rootClass"
					:style="columnItem.styleValue"
				>
					<ScrollRadio
						v-if="columnItem.hasData"
						:data="columnItem.data"
						:show-row="columnItem.item.showRow"
						:init-index="columnItem.item.initIndex"
						:use-animation="columnItem.item.useAnimation"
						:label-key="columnItem.item.labelKey"
						:align="columnItem.item.align"
						:last-selected-index="columnItem.lastSelectedIndex"
						:auto-scroll-to-last="autoScrollToLast"
						@scroll-end="(index) => scrollEndFunc(index, columnItem.index)"
						@scrolling="(index) => scrollingFunc(index, columnItem.index)"
					/>
				</div>

				<button v-if="multiple" type="button" :class="pickerState.multipleButtonClass" @click="clickMultipleIcon">
					<Icon v-if="pickerState.isCurrentSelected" v-bind="multipleIconActive" theme />
					<span v-else :class="pickerState.multipleInactiveIconClass">
						<Icon v-bind="multipleIcon" />
					</span>
				</button>
			</div>
		</div>
	</component>
</template>
