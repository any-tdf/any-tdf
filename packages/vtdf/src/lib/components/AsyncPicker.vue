<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { AsyncPickerProps, PopupProps } from '../types';
import { Transition as MotionTransition } from '@any-tdf/vue-motion';
import { zh_CN } from '../lang';
import { useConfig } from './adapter/config';
import Loading from './Loading.vue';
import Popup from './Popup.vue';
import ScrollRadio from './ScrollRadio.vue';
import {
	resolveAsyncPickerCloseAction,
	resolveAsyncPickerDerived,
	resolveAsyncPickerInitialVisible,
	resolveAsyncPickerLeftButtonFlow,
	resolveAsyncPickerRightButtonFlow,
	resolveAsyncPickerStateOptions
} from '@any-tdf/common/derived/asyncPicker';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import { resolveConditionalProps } from '@any-tdf/common/derived/props';

type PopupWithAlias = PopupProps & {};
type AsyncPickerComponentProps = Omit<AsyncPickerProps, 'popup'> & {
	popup?: PopupWithAlias | null;
};

const props = withDefaults(defineProps<AsyncPickerComponentProps>(), {
	visible: false,
	data: () => [],
	lastLevel: false,
	firstLevel: true,
	showRow: 5,
	labelKey: 'label',
	align: 'center',
	showSelected: false,
	height: 30,
	popup: () => ({}),
	loading: () => ({})
});

const emit = defineEmits<{
	(event: 'update:visible', value: boolean): void;
	(event: 'update:data', value: Record<string, unknown>[]): void;
	(event: 'cancel'): void;
	(event: 'prev'): void;
	(event: 'confirm', items: Record<string, unknown>[], indexs: number[]): void;
	(event: 'next', index: number): void;
	(event: 'close'): void;
}>();

const config = useConfig();
const internalVisible = ref(resolveAsyncPickerInitialVisible(props.visible));
const internalData = ref<Record<string, unknown>[]>([...props.data]);
const internalLastLevel = ref(props.lastLevel);
const internalFirstLevel = ref(props.firstLevel);
const internalLabelKey = ref(props.labelKey);
const items = ref<Record<string, unknown>[]>([]);
const indexs = ref<number[]>([]);
const currentIndex = ref(0);
const innerHeight = ref(
	resolveViewportDimension({
		value: typeof window === 'undefined' ? undefined : window.innerHeight
	})
);

const asyncPickerLang = computed(() => config.locale?.asyncPicker || zh_CN.asyncPicker);
// 公共派生层只处理 AsyncPicker 尺寸、按钮文案、选中路径和纯动作描述，事件与异步加载留在组件内。
// Shared derived layer only handles AsyncPicker sizes, button text, selected path and pure actions; events and async loading stay in the component.
const asyncPickerDerived = computed(() =>
	resolveAsyncPickerDerived<PopupProps, Record<string, unknown>>(
		resolveAsyncPickerStateOptions<PopupProps, Record<string, unknown>>({
			currentIndex: currentIndex.value,
			data: internalData.value,
			defaults: asyncPickerLang.value,
			firstLevel: internalFirstLevel.value,
			indexs: indexs.value,
			items: items.value,
			lastLevel: internalLastLevel.value,
			props: {
				cancelText: props.cancelText,
				confirmText: props.confirmText,
				height: props.height,
				nextText: props.nextText,
				popup: props.popup,
				prevText: props.prevText,
				selectedText: props.selectedText,
				showRow: props.showRow,
				showSelected: props.showSelected,
				title: props.title
			},
			viewportHeight: innerHeight.value,
			viewportWidth: resolveViewportDimension({
				value: typeof document === 'undefined' ? undefined : document.documentElement.clientWidth
			})
		})
	)
);
const asyncPickerTexts = computed(() => asyncPickerDerived.value.texts);
const usePopup = computed(() => asyncPickerDerived.value.usePopup);
const isLoading = computed(() => asyncPickerDerived.value.isLoading);
const transitionDistance = computed(() => asyncPickerDerived.value.metrics.transitionDistance);
const pickerHeightStyle = computed(() => asyncPickerDerived.value.loadingHeightStyleValue);
const leftButtonText = computed(() => asyncPickerDerived.value.leftButtonText);
const rightButtonText = computed(() => asyncPickerDerived.value.rightButtonText);
const selectedFlyInParams = computed(() => asyncPickerDerived.value.selectedFlyInParams);
const selectedFlyOutParams = computed(() => asyncPickerDerived.value.selectedFlyOutParams);
const popupConfig = computed(() => asyncPickerDerived.value.popupConfig);
const popupBindProps = computed(() => resolveConditionalProps({ enabled: usePopup.value, props: popupConfig.value.popupProps }));

const setVisible = (value: boolean) => {
	internalVisible.value = value;
	emit('update:visible', value);
};

const setInternalData = (value: Record<string, unknown>[]) => {
	internalData.value = value;
	emit('update:data', value);
};

const emitClose = () => {
	emit('close');
};

const clickLeft = () => {
	// 公共流程只返回状态补丁和关闭决策，事件与异步加载留在组件层。
	// Shared flow only returns state patches and close decisions; events and async loading stay in the component layer.
	const flow = resolveAsyncPickerLeftButtonFlow(asyncPickerDerived.value.leftAction);
	if (flow.type === 'none') return;
	if (flow.type === 'cancel') {
		if (flow.closeAction.shouldClose) setVisible(flow.closeAction.nextVisible);
		if (flow.closeAction.shouldEmitClose) emitClose();
		emit('cancel');
		return;
	}

	items.value = flow.items;
	indexs.value = flow.indexs;
	setInternalData(flow.resetState.data);
	setTimeout(() => {
		emit('prev');
		currentIndex.value = flow.resetState.currentIndex;
	});
};

const clickRight = () => {
	// 公共流程只返回状态补丁和确认 / 下一级决策，事件与异步加载留在组件层。
	// Shared flow only returns state patches plus confirm or next-step decisions; events and async loading stay in the component layer.
	const flow = resolveAsyncPickerRightButtonFlow(asyncPickerDerived.value.rightAction);
	if (flow.type === 'none') return;
	if (flow.type === 'confirm') {
		items.value = flow.items;
		indexs.value = flow.indexs;
		setInternalData(flow.resetState.data);
		if (flow.closeAction.shouldClose) setVisible(flow.closeAction.nextVisible);
		currentIndex.value = flow.resetState.currentIndex;
		if (flow.closeAction.shouldEmitClose) emitClose();
		emit('confirm', flow.items, flow.indexs);
		return;
	}

	items.value = flow.items;
	indexs.value = flow.indexs;
	setInternalData(flow.resetState.data);
	setTimeout(() => {
		emit('next', flow.currentIndex);
		currentIndex.value = flow.resetState.currentIndex;
	});
};

const scrollEnd = (index: number) => {
	currentIndex.value = index;
};

const handlePopupClose = () => {
	// 公共 close action 只返回可见状态和 close 回调决策，Popup 事件留在组件层。
	// Shared close action only returns visibility and close callback decisions; Popup events stay in the component layer.
	const action = resolveAsyncPickerCloseAction();
	if (action.shouldClose) setVisible(action.nextVisible);
	if (action.shouldEmitClose) emitClose();
};

const updateWindowHeight = () => {
	innerHeight.value = resolveViewportDimension({ value: window.innerHeight });
};

watch(
	() => props.visible,
	(value) => {
		internalVisible.value = resolveAsyncPickerInitialVisible(value);
	}
);

watch(
	() => props.data,
	(value) => {
		internalData.value = [...value];
	},
	{ deep: true }
);

watch(
	() => props.lastLevel,
	(value) => {
		internalLastLevel.value = value;
	}
);

watch(
	() => props.firstLevel,
	(value) => {
		internalFirstLevel.value = value;
	}
);

watch(
	() => props.labelKey,
	(value) => {
		internalLabelKey.value = value;
	}
);

onMounted(() => {
	window.addEventListener('resize', updateWindowHeight);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateWindowHeight);
});
</script>

<template>
	<component
		:is="usePopup ? Popup : 'div'"
		v-bind="popupBindProps"
		:visible="internalVisible"
		:size="0"
		mask-closable
		:transition-distance="transitionDistance"
		@close="handlePopupClose"
	>
		<div :class="asyncPickerDerived.headerClass">
			<button type="button" :class="asyncPickerDerived.leftButtonClass" @click="clickLeft">
				<div v-if="isLoading" :class="asyncPickerDerived.buttonLoadingClass">
					<Loading width="4" height="4" :custom-color="['#666']" />
				</div>
				<template v-else>{{ leftButtonText }}</template>
			</button>
			<div>{{ asyncPickerTexts.title }}</div>
			<button type="button" :class="asyncPickerDerived.rightButtonClass" @click="clickRight">
				<div v-if="isLoading" :class="asyncPickerDerived.buttonLoadingClass">
					<Loading width="4" height="4" theme />
				</div>
				<template v-else>{{ rightButtonText }}</template>
			</button>
		</div>

		<div v-if="showSelected" :class="asyncPickerDerived.selectedWrapClass">
			<div :class="asyncPickerDerived.selectedLabelClass">{{ asyncPickerTexts.selectedText }}</div>
			<MotionTransition
				v-for="(item, index) in items"
				:key="index"
				:visible="!isLoading"
				transition="fly"
				:in-params="selectedFlyInParams"
				:out-params="selectedFlyOutParams"
				:class="asyncPickerDerived.selectedItemClass"
			>
				{{ item[internalLabelKey] }}
			</MotionTransition>
		</div>

		<div :class="asyncPickerDerived.bodyClass">
			<div :class="asyncPickerDerived.contentClipClass">
				<div v-if="isLoading" :class="asyncPickerDerived.loadingClass" :style="pickerHeightStyle">
					<Loading width="28" height="8" type="1_16" theme v-bind="loading" />
				</div>
				<div v-else :style="asyncPickerDerived.inlineContentStyleValue">
					<ScrollRadio
						:data="internalData as Record<string, string>[]"
						:show-row="showRow"
						:label-key="internalLabelKey"
						:align="align"
						:auto-scroll-to-last="false"
						@scroll-end="scrollEnd"
					/>
				</div>
			</div>
		</div>
	</component>
</template>
