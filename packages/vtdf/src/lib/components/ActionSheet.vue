<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
	resolveActionSheetActionClickFlow,
	resolveActionSheetCancelAction,
	resolveActionSheetCloseAction,
	resolveActionSheetDerived,
	resolveActionSheetIconProps,
	resolveActionSheetInitialVisible,
	resolveActionSheetStateOptions
} from '@any-tdf/common/derived/actionSheet';
import { splitPopupCallbacks } from '@any-tdf/common/derived/props';
import type { ActionProps, ActionSheetProps } from '../types';
import { zh_CN } from '../lang';
import { useConfig } from './adapter/config';
import Icon from './Icon.vue';
import Popup from './Popup.vue';

const props = withDefaults(defineProps<ActionSheetProps & {}>(), {
	title: '',
	titleAlign: 'center',
	actions: () => [],
	popup: () => ({}),
	showCancel: false,
	cancelText: undefined,
	actionClosable: true,
	align: 'center'
});

const emit = defineEmits<{
	'update:visible': [visible: boolean];
	cancel: [];
	clickAction: [index: number, action: ActionProps];
	close: [];
}>();

const config = useConfig();
const internalVisible = ref(resolveActionSheetInitialVisible(props.visible));

const actionSheetLang = computed(() => config.locale?.actionSheet || zh_CN.actionSheet);
const popupConfig = computed(() => splitPopupCallbacks(props.popup));
const popupProps = computed(() => popupConfig.value.popupProps);

// 公共派生层统一 ActionSheet 的高度、标题、按钮和操作项展示结果，组件层只处理事件和 Popup 绑定。
// Common derivation unifies ActionSheet height, title, buttons and action item view state; the component layer only handles events and Popup binding.
const actionSheetState = computed(() =>
	resolveActionSheetDerived(
		resolveActionSheetStateOptions({
			defaults: actionSheetLang.value,
			props
		})
	)
);

const emitVisible = (visible: boolean) => {
	internalVisible.value = visible;
	emit('update:visible', visible);
};

const emitClose = () => {
	emit('close');
};

const handlePopupClose = () => {
	// 公共 close action 只返回可见状态和 close 回调决策，Popup 事件留在组件层。
	// Shared close action only returns visibility and close callback decisions; Popup events stay in the component layer.
	const action = resolveActionSheetCloseAction();
	if (!action.shouldClose) return;
	emitVisible(action.nextVisible);
	if (action.shouldEmitClose) {
		emitClose();
		const popupOnClose = popupConfig.value.popupOnClose;
		if (typeof popupOnClose === 'function') popupOnClose();
	}
};

const handleVisibleUpdate = (visible: boolean) => {
	internalVisible.value = visible;
	emit('update:visible', visible);
};

const handleCancelClick = () => {
	// 公共动作函数只返回状态和回调决策，组件层负责写入状态和触发事件。
	// Shared action function only returns state and callback decisions; the component writes state and fires events.
	const action = resolveActionSheetCancelAction();
	emitVisible(action.nextVisible);
	if (action.shouldCancel) emit('cancel');
	if (action.shouldClose) emitClose();
};

const handleActionClick = (index: number, action: ActionProps) => {
	const clickAction = resolveActionSheetActionClickFlow({
		action,
		actionClosable: props.actionClosable,
		index
	});
	if (!clickAction.shouldSelect) return;
	emit('clickAction', clickAction.index, clickAction.action);
	if (clickAction.closeAction.shouldClose) {
		emitVisible(clickAction.closeAction.nextVisible);
		if (clickAction.closeAction.shouldEmitClose) emitClose();
	}
};

watch(
	() => props.visible,
	(visible) => {
		internalVisible.value = resolveActionSheetInitialVisible(visible);
	}
);
</script>

<template>
	<Popup
		:visible="internalVisible"
		:size="0"
		:transition-distance="actionSheetState.transitionDistance"
		v-bind="popupProps"
		@update:visible="handleVisibleUpdate"
		@close="handlePopupClose"
	>
		<div v-if="actionSheetState.showTitle" :class="actionSheetState.titleClass">
			{{ title }}
		</div>

		<div>
			<template v-for="(actionViewState, index) in actionSheetState.actionViewStates" :key="index">
				<button
					type="button"
					:class="actionViewState.buttonClass"
					:disabled="actionViewState.disabled"
					@click="handleActionClick(index, actionViewState.action)"
				>
					<Icon
						v-if="actionViewState.showIcon"
						v-bind="resolveActionSheetIconProps(actionViewState.action.icon)"
						:state="actionViewState.iconState"
						:inj-class="actionViewState.iconInjClass"
					/>
					<div v-else-if="actionViewState.showImage" :class="actionViewState.imageClass">
						<img :class="actionViewState.imageInnerClass" :src="actionViewState.action.imgSrc" alt="" />
					</div>
					<div>
						<div :class="actionViewState.contentClass">
							{{ actionViewState.action.content }}
						</div>
						<div v-if="actionViewState.showDesc" :class="actionViewState.descClass">
							{{ actionViewState.action.desc }}
						</div>
					</div>
				</button>
				<div v-if="actionViewState.showDivider" :class="actionViewState.dividerClass" />
			</template>
		</div>

		<template v-if="showCancel">
			<div :class="actionSheetState.cancelGapClass" />
			<button type="button" :class="actionSheetState.cancelButtonClass" @click="handleCancelClick">
				<div>{{ actionSheetState.cancelText }}</div>
			</button>
		</template>
	</Popup>
</template>
