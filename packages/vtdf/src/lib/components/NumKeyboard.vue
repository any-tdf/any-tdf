<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { NumKeyboardKey, NumKeyboardProps } from '../types';
import {
	resolveNumKeyboardCloseAction,
	resolveNumKeyboardDerived,
	resolveNumKeyboardInitialValue,
	resolveNumKeyboardInitialVisible,
	resolveNumKeyboardKeyFlow,
	resolveNumKeyboardStateOptions,
	resolveNumKeyboardVisibleChangeAction
} from '@any-tdf/common/derived/numKeyboard';
import { numKeyboardCloseSvg, numKeyboardDeleteSvg } from '@any-tdf/common/svg/numKeyboard';
import { useConfig } from './adapter/config';
import Popup from './Popup.vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<NumKeyboardProps & {}>(), {
	type: 'button',
	value: '',
	visible: true,
	height: '12',
	space: '2',
	p: '2',
	reverse: false,
	done: true,
	dot: true,
	close: false,
	doneDisabled: false,
	radius: '',
	clear: false,
	preview: false,
	previewMask: false,
	panelClass: '',
	keyClass: '',
	doneClass: '',
	popup: () => ({})
});

const emit = defineEmits<{
	'update:value': [value: string];
	'update:visible': [visible: boolean];
	click: [key: NumKeyboardKey];
	open: [height: number];
	close: [];
}>();

const config = useConfig();
const innerValue = ref(resolveNumKeyboardInitialValue(props.value));
const innerVisible = ref(resolveNumKeyboardInitialVisible(props.visible));
const previousVisible = ref<boolean | undefined>(undefined);

// 公共派生层只处理 NumKeyboard 文案、布局、class、预览和 Popup 参数，事件留在组件内。
// Shared derived layer only handles NumKeyboard text, layout, classes, preview and Popup params; events stay in the component.
const keyboardState = computed(() =>
	resolveNumKeyboardDerived(
		resolveNumKeyboardStateOptions({
			props: {
				type: props.type,
				height: props.height,
				space: props.space,
				p: props.p,
				reverse: props.reverse,
				done: props.done,
				dot: props.dot,
				close: props.close,
				doneText: props.doneText,
				radius: props.radius,
				preview: props.preview,
				previewMask: props.previewMask,
				panelClass: props.panelClass,
				keyClass: props.keyClass,
				doneClass: props.doneClass,
				popup: props.popup
			},
			value: innerValue.value,
			doneDisabled: props.doneDisabled,
			defaults: config.locale.common
		})
	)
);

const syncValue = (value: string) => {
	innerValue.value = value;
	emit('update:value', value);
};

const emitClose = () => {
	emit('close');
};

const setVisible = (visible: boolean) => {
	innerVisible.value = visible;
	emit('update:visible', visible);
};

const clickKey = (key: NumKeyboardKey) => {
	// 公共 flow 返回值更新和关闭动作，事件触发仍保留在组件内。
	// Shared flow returns value updates and close actions; event dispatch stays inside the component.
	const flow = resolveNumKeyboardKeyFlow({
		value: innerValue.value,
		key,
		doneDisabled: props.doneDisabled,
		closeOptions: { emitClose: false }
	});
	if (flow.shouldUpdateValue) {
		syncValue(flow.nextValue);
	}
	emit('click', key);

	if (flow.closeAction) {
		if (flow.closeAction.shouldClose) setVisible(flow.closeAction.nextVisible);
		if (flow.closeAction.shouldEmitClose) emitClose();
	}
};

const handlePopupClose = () => {
	// 公共 close action 只返回可见状态，Popup 关闭事件交给组件层同步。
	// Shared close action only returns visibility state; Popup close synchronization stays in the component layer.
	const action = resolveNumKeyboardCloseAction({ emitClose: false });
	if (action.shouldClose) setVisible(action.nextVisible);
	if (action.shouldEmitClose) emitClose();
};

watch(
	() => props.value,
	(value) => {
		innerValue.value = resolveNumKeyboardInitialValue(value);
	}
);

watch(
	() => props.visible,
	(visible) => {
		innerVisible.value = resolveNumKeyboardInitialVisible(visible);
	}
);

watch(
	innerVisible,
	(visible) => {
		// 公共 action 只判断可见性回调和清空策略，响应式写入和 emit 留在组件层。
		// Shared action only decides visibility callbacks and clear policy; reactive writes and emits stay in the component layer.
		const action = resolveNumKeyboardVisibleChangeAction({
			visible,
			previousVisible: previousVisible.value,
			clear: props.clear,
			keyboardHeight: keyboardState.value.keyboardHeight
		});
		if (action.shouldSkip) return;
		previousVisible.value = action.nextPreviousVisible;
		if (action.shouldClearValue) {
			syncValue('');
		}
		if (action.shouldEmitOpen) {
			emit('open', action.openHeight);
			return;
		}
		if (action.shouldEmitClose) {
			emitClose();
		}
	},
	{ immediate: true }
);
</script>

<template>
	<Popup v-if="keyboardState.usePopup" :visible="innerVisible" v-bind="keyboardState.popupProps" @close="handlePopupClose">
		<div :class="keyboardState.panelClass">
			<div v-if="preview" :class="keyboardState.previewClass">
				<template v-if="keyboardState.previewState.showMask">
					<span v-for="index in keyboardState.previewState.maskIndexes" :key="index" :class="keyboardState.previewState.dotClass" />
				</template>
				<template v-else>{{ keyboardState.previewState.displayValue }}</template>
			</div>
			<div :class="keyboardState.gridClass">
				<button
					v-for="key in keyboardState.keyRows.topKeys"
					:key="key"
					type="button"
					:class="keyboardState.keyClasses[key]"
					@click="clickKey(key)"
				>
					{{ key }}
				</button>

				<button v-if="done" type="button" :class="keyboardState.keyClasses.delete" aria-label="delete" @click="clickKey('delete')">
					<!-- 公共 NumKeyboard SVG 数据在 common 中维护。 / Shared NumKeyboard SVG data lives in common. -->
					<SvgIcon
						:svg="numKeyboardDeleteSvg"
						:width="keyboardState.svgSize"
						:height="keyboardState.svgSize"
						:class-name="keyboardState.svgClass"
					/>
				</button>

				<button
					v-for="key in keyboardState.keyRows.middleKeys"
					:key="key"
					type="button"
					:class="keyboardState.keyClasses[key]"
					@click="clickKey(key)"
				>
					{{ key }}
				</button>

				<button v-if="done" type="button" :class="keyboardState.doneKeyClass" :disabled="doneDisabled" @click="clickKey('done')">
					{{ keyboardState.doneText }}
				</button>

				<button
					v-for="key in keyboardState.keyRows.bottomKeys"
					:key="key"
					type="button"
					:class="keyboardState.keyClasses[key]"
					@click="clickKey(key)"
				>
					{{ key }}
				</button>

				<button v-if="dot" type="button" :class="keyboardState.keyClasses['.']" @click="clickKey('.')">.</button>

				<button
					v-if="keyboardState.showCloseKey"
					type="button"
					:class="keyboardState.keyClasses.close"
					aria-label="close"
					@click="clickKey('close')"
				>
					<SvgIcon
						:svg="numKeyboardCloseSvg"
						:width="keyboardState.svgSize"
						:height="keyboardState.svgSize"
						:class-name="keyboardState.svgClass"
					/>
				</button>

				<button type="button" :class="keyboardState.zeroKeyClass" @click="clickKey('0')">0</button>

				<button v-if="!done" type="button" :class="keyboardState.keyClasses.delete" aria-label="delete" @click="clickKey('delete')">
					<SvgIcon
						:svg="numKeyboardDeleteSvg"
						:width="keyboardState.svgSize"
						:height="keyboardState.svgSize"
						:class-name="keyboardState.svgClass"
					/>
				</button>
			</div>
		</div>
	</Popup>
	<div v-else :class="keyboardState.panelClass">
		<div v-if="preview" :class="keyboardState.previewClass">
			<template v-if="keyboardState.previewState.showMask">
				<span v-for="index in keyboardState.previewState.maskIndexes" :key="index" :class="keyboardState.previewState.dotClass" />
			</template>
			<template v-else>{{ keyboardState.previewState.displayValue }}</template>
		</div>
		<div :class="keyboardState.gridClass">
			<button
				v-for="key in keyboardState.keyRows.topKeys"
				:key="key"
				type="button"
				:class="keyboardState.keyClasses[key]"
				@click="clickKey(key)"
			>
				{{ key }}
			</button>
			<button v-if="done" type="button" :class="keyboardState.keyClasses.delete" aria-label="delete" @click="clickKey('delete')">
				<!-- 公共 NumKeyboard SVG 数据在 common 中维护。 / Shared NumKeyboard SVG data lives in common. -->
				<SvgIcon
					:svg="numKeyboardDeleteSvg"
					:width="keyboardState.svgSize"
					:height="keyboardState.svgSize"
					:class-name="keyboardState.svgClass"
				/>
			</button>
			<button
				v-for="key in keyboardState.keyRows.middleKeys"
				:key="key"
				type="button"
				:class="keyboardState.keyClasses[key]"
				@click="clickKey(key)"
			>
				{{ key }}
			</button>
			<button v-if="done" type="button" :class="keyboardState.doneKeyClass" :disabled="doneDisabled" @click="clickKey('done')">
				{{ keyboardState.doneText }}
			</button>
			<button
				v-for="key in keyboardState.keyRows.bottomKeys"
				:key="key"
				type="button"
				:class="keyboardState.keyClasses[key]"
				@click="clickKey(key)"
			>
				{{ key }}
			</button>
			<button v-if="dot" type="button" :class="keyboardState.keyClasses['.']" @click="clickKey('.')">.</button>
			<button
				v-if="keyboardState.showCloseKey"
				type="button"
				:class="keyboardState.keyClasses.close"
				aria-label="close"
				@click="clickKey('close')"
			>
				<SvgIcon
					:svg="numKeyboardCloseSvg"
					:width="keyboardState.svgSize"
					:height="keyboardState.svgSize"
					:class-name="keyboardState.svgClass"
				/>
			</button>
			<button type="button" :class="keyboardState.zeroKeyClass" @click="clickKey('0')">0</button>
			<button v-if="!done" type="button" :class="keyboardState.keyClasses.delete" aria-label="delete" @click="clickKey('delete')">
				<SvgIcon
					:svg="numKeyboardDeleteSvg"
					:width="keyboardState.svgSize"
					:height="keyboardState.svgSize"
					:class-name="keyboardState.svgClass"
				/>
			</button>
		</div>
	</div>
</template>
