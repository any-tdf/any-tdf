<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { FullKeyboardProps } from '../types';
import {
	fullKeyboardLetterRows,
	fullKeyboardNumberRow,
	fullKeyboardSymbolRows,
	resolveFullKeyboardCaseToggleAction,
	resolveFullKeyboardCloseAction,
	resolveFullKeyboardDerived,
	resolveFullKeyboardInitialValue,
	resolveFullKeyboardInitialVisible,
	resolveFullKeyboardInputKey,
	resolveFullKeyboardKeyFlow,
	resolveFullKeyboardRootProps,
	resolveFullKeyboardStateOptions,
	resolveFullKeyboardSymbolModeToggleAction,
	resolveFullKeyboardTexts,
	resolveFullKeyboardUsePopup,
	resolveFullKeyboardVisibleChangeFlow
} from '@any-tdf/common/derived/fullKeyboard';
import { fullKeyboardShiftSvg } from '@any-tdf/common/svg/fullKeyboard';
import { numKeyboardDeleteSvg } from '@any-tdf/common/svg/numKeyboard';
import { zh_CN } from '../lang';
import { useConfig } from './adapter/config';
import Popup from './Popup.vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<FullKeyboardProps & {}>(), {
	value: '',
	visible: true,
	type: 'button',
	mode: 'full',
	done: true,
	doneDisabled: false,
	radius: '',
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
	click: [key: string];
	open: [height: number];
	close: [];
}>();

const config = useConfig();
const innerValue = ref(resolveFullKeyboardInitialValue(props.value));
const innerVisible = ref(resolveFullKeyboardInitialVisible(props.visible));
const previousVisible = ref<boolean | undefined>(undefined);
const isUpperCase = ref(false);
const isSymbolMode = ref(false);

const [letterRow1, letterRow2, letterRow3] = fullKeyboardLetterRows;
const numberRow = fullKeyboardNumberRow;
const symbolRow4 = fullKeyboardSymbolRows[3];
const usePopup = computed(() => resolveFullKeyboardUsePopup(props.popup));
const fullKeyboardLang = computed(() => config.locale.fullKeyboard || zh_CN.fullKeyboard);
const keyboardTexts = computed(() =>
	resolveFullKeyboardTexts({
		doneText: props.doneText,
		defaults: { common: config.locale.common, fullKeyboard: fullKeyboardLang.value }
	})
);
// 公共派生层只处理 FullKeyboard 的按键、面板和布局 class，输入事件留在组件内。
// Shared derived layer only handles FullKeyboard key, panel and layout classes; input events stay in the component.
const keyboardState = computed(() =>
	resolveFullKeyboardDerived(
		resolveFullKeyboardStateOptions({
			props: {
				done: props.done,
				doneClass: props.doneClass,
				keyClass: props.keyClass,
				mode: props.mode,
				panelClass: props.panelClass,
				popup: props.popup,
				preview: props.preview,
				previewMask: props.previewMask,
				radius: props.radius,
				type: props.type
			},
			doneDisabled: props.doneDisabled,
			isSymbolMode: isSymbolMode.value,
			isUpperCase: isUpperCase.value,
			value: innerValue.value
		})
	)
);
const rootProps = computed(() =>
	resolveFullKeyboardRootProps({
		usePopup: usePopup.value,
		visible: innerVisible.value,
		popupProps: keyboardState.value.popupProps
	})
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

const emitClick = (key: string) => {
	emit('click', key);
};

const clickKey = (key: string) => {
	// 公共 flow 返回输入值、事件键和关闭动作，事件派发仍留在组件层。
	// Shared flow returns input value, emit key and close action; event dispatch stays in the component layer.
	const flow = resolveFullKeyboardKeyFlow({
		value: innerValue.value,
		key,
		isUpperCase: isUpperCase.value,
		doneDisabled: props.doneDisabled,
		closeOptions: { emitClose: false }
	});
	if (flow.shouldUpdateValue) {
		syncValue(flow.nextValue);
	}
	if (flow.shouldEmit) {
		emitClick(flow.emitKey);
	}
	if (flow.closeAction) {
		if (flow.closeAction.shouldClose) setVisible(flow.closeAction.nextVisible);
		if (flow.closeAction.shouldEmitClose) emitClose();
	}
};

const clickDelete = () => {
	clickKey('delete');
};

const clickSpace = () => {
	clickKey(' ');
};

const clickDone = () => {
	clickKey('done');
};

const toggleCase = () => {
	const action = resolveFullKeyboardCaseToggleAction(isUpperCase.value);
	isUpperCase.value = action.nextUpperCase;
};

const toggleSymbolMode = () => {
	const action = resolveFullKeyboardSymbolModeToggleAction(isSymbolMode.value);
	isSymbolMode.value = action.nextSymbolMode;
};

const handlePopupClose = () => {
	// 公共 close action 只返回可见状态，Popup 关闭事件交给组件层同步。
	// Shared close action only returns visibility state; Popup close synchronization stays in the component layer.
	const action = resolveFullKeyboardCloseAction({ emitClose: false });
	if (action.shouldClose) setVisible(action.nextVisible);
	if (action.shouldEmitClose) emitClose();
};

watch(
	() => props.value,
	(value) => {
		innerValue.value = resolveFullKeyboardInitialValue(value);
	}
);

watch(
	() => props.visible,
	(visible) => {
		innerVisible.value = resolveFullKeyboardInitialVisible(visible);
	}
);

watch(
	innerVisible,
	(visible) => {
		// 公共 visibility flow 只判断可见性回调，响应式写入和 emit 留在组件层。
		// Shared visibility flow only decides visibility callbacks; reactive writes and emits stay in the component layer.
		const flow = resolveFullKeyboardVisibleChangeFlow({
			visible,
			previousVisible: previousVisible.value,
			keyboardHeight: keyboardState.value.keyboardHeight
		});
		if (flow.shouldSkip) return;
		previousVisible.value = flow.nextPreviousVisible;
		if (flow.shouldEmitOpen) {
			emit('open', flow.openHeight);
			return;
		}
		if (flow.shouldEmitClose) {
			emitClose();
		}
	},
	{ immediate: true }
);
</script>

<template>
	<component :is="usePopup ? Popup : 'div'" v-bind="rootProps" @close="handlePopupClose">
		<div :class="keyboardState.panelClass">
			<div v-if="preview" :class="keyboardState.previewClass">
				<template v-if="keyboardState.previewState.showMask">
					<span v-for="index in keyboardState.previewState.maskIndexes" :key="index" :class="keyboardState.previewState.dotClass" />
				</template>
				<template v-else>{{ keyboardState.previewState.displayValue }}</template>
			</div>

			<template v-if="keyboardState.layout.showLetterMode">
				<div :class="keyboardState.gridRow10Class">
					<button v-for="key in letterRow1" :key="key" type="button" :class="keyboardState.keyButtonClass" @click="clickKey(key)">
						{{ resolveFullKeyboardInputKey(key, isUpperCase) }}
					</button>
				</div>
				<div :class="keyboardState.gridRow9PxClass">
					<button v-for="key in letterRow2" :key="key" type="button" :class="keyboardState.keyButtonClass" @click="clickKey(key)">
						{{ resolveFullKeyboardInputKey(key, isUpperCase) }}
					</button>
				</div>
				<div :class="keyboardState.flexRowClass">
					<button type="button" :class="keyboardState.shiftButtonClass" aria-label="shift" @click="toggleCase">
						<!-- 公共 FullKeyboard SVG 数据在 common 中维护。 / Shared FullKeyboard SVG data lives in common. -->
						<SvgIcon :svg="fullKeyboardShiftSvg" width="18" height="16" :class-name="keyboardState.iconClass" />
					</button>
					<div :class="keyboardState.innerGrid7Class">
						<button v-for="key in letterRow3" :key="key" type="button" :class="keyboardState.keyButtonClass" @click="clickKey(key)">
							{{ resolveFullKeyboardInputKey(key, isUpperCase) }}
						</button>
					</div>
					<button type="button" :class="keyboardState.deleteButtonClass" aria-label="delete" @click="clickDelete">
						<SvgIcon :svg="numKeyboardDeleteSvg" width="22" height="22" :class-name="keyboardState.iconClass" />
					</button>
				</div>
				<div :class="keyboardState.bottomRowClass">
					<button type="button" :class="keyboardState.flex1KeyClass" @click="clickSpace">
						<span :class="keyboardState.spaceTextClass">{{ keyboardTexts.spaceText }}</span>
					</button>
					<button
						v-if="keyboardState.layout.showDoneButton"
						type="button"
						:class="keyboardState.doneButtonClass"
						:disabled="doneDisabled"
						@click="clickDone"
					>
						{{ keyboardTexts.doneText }}
					</button>
				</div>
			</template>

			<template v-else-if="keyboardState.layout.showLetterNumberMode">
				<div :class="keyboardState.gridRow10Class">
					<button v-for="key in numberRow" :key="key" type="button" :class="keyboardState.keyButtonClass" @click="clickKey(key)">
						{{ key }}
					</button>
				</div>
				<div :class="keyboardState.gridRow10Class">
					<button v-for="key in letterRow1" :key="key" type="button" :class="keyboardState.keyButtonClass" @click="clickKey(key)">
						{{ resolveFullKeyboardInputKey(key, isUpperCase) }}
					</button>
				</div>
				<div :class="keyboardState.gridRow9PxClass">
					<button v-for="key in letterRow2" :key="key" type="button" :class="keyboardState.keyButtonClass" @click="clickKey(key)">
						{{ resolveFullKeyboardInputKey(key, isUpperCase) }}
					</button>
				</div>
				<div :class="keyboardState.flexRowClass">
					<button type="button" :class="keyboardState.shiftButtonClass" aria-label="shift" @click="toggleCase">
						<SvgIcon :svg="fullKeyboardShiftSvg" width="18" height="16" :class-name="keyboardState.iconClass" />
					</button>
					<div :class="keyboardState.innerGrid7Class">
						<button v-for="key in letterRow3" :key="key" type="button" :class="keyboardState.keyButtonClass" @click="clickKey(key)">
							{{ resolveFullKeyboardInputKey(key, isUpperCase) }}
						</button>
					</div>
					<button type="button" :class="keyboardState.deleteButtonClass" aria-label="delete" @click="clickDelete">
						<SvgIcon :svg="numKeyboardDeleteSvg" width="22" height="22" :class-name="keyboardState.iconClass" />
					</button>
				</div>
				<div :class="keyboardState.bottomRowClass">
					<button type="button" :class="keyboardState.flex1KeyClass" @click="clickSpace">
						<span :class="keyboardState.spaceTextClass">{{ keyboardTexts.spaceText }}</span>
					</button>
					<button
						v-if="keyboardState.layout.showDoneButton"
						type="button"
						:class="keyboardState.doneButtonClass"
						:disabled="doneDisabled"
						@click="clickDone"
					>
						{{ keyboardTexts.doneText }}
					</button>
				</div>
			</template>

			<template v-else>
				<template v-if="keyboardState.layout.showSymbolRows">
					<div v-for="(row, rowIndex) in keyboardState.layout.symbolMainRows" :key="rowIndex" :class="keyboardState.gridRow10Class">
						<button v-for="key in row" :key="key" type="button" :class="keyboardState.keyButtonClass" @click="clickKey(key)">
							{{ key }}
						</button>
					</div>
					<div :class="keyboardState.flexRowClass">
						<div :class="keyboardState.innerGrid9Class">
							<button v-for="key in symbolRow4" :key="key" type="button" :class="keyboardState.keyButtonClass" @click="clickKey(key)">
								{{ key }}
							</button>
						</div>
						<button type="button" :class="keyboardState.deleteButtonClass" aria-label="delete" @click="clickDelete">
							<SvgIcon :svg="numKeyboardDeleteSvg" width="22" height="22" :class-name="keyboardState.iconClass" />
						</button>
					</div>
				</template>
				<template v-else>
					<div :class="keyboardState.gridRow10Class">
						<button v-for="key in letterRow1" :key="key" type="button" :class="keyboardState.keyButtonClass" @click="clickKey(key)">
							{{ resolveFullKeyboardInputKey(key, isUpperCase) }}
						</button>
					</div>
					<div :class="keyboardState.gridRow9PxClass">
						<button v-for="key in letterRow2" :key="key" type="button" :class="keyboardState.keyButtonClass" @click="clickKey(key)">
							{{ resolveFullKeyboardInputKey(key, isUpperCase) }}
						</button>
					</div>
					<div :class="keyboardState.flexRowClass">
						<button type="button" :class="keyboardState.shiftButtonClass" aria-label="shift" @click="toggleCase">
							<SvgIcon :svg="fullKeyboardShiftSvg" width="18" height="16" :class-name="keyboardState.iconClass" />
						</button>
						<div :class="keyboardState.innerGrid7Class">
							<button v-for="key in letterRow3" :key="key" type="button" :class="keyboardState.keyButtonClass" @click="clickKey(key)">
								{{ resolveFullKeyboardInputKey(key, isUpperCase) }}
							</button>
						</div>
						<button type="button" :class="keyboardState.deleteButtonClass" aria-label="delete" @click="clickDelete">
							<SvgIcon :svg="numKeyboardDeleteSvg" width="22" height="22" :class-name="keyboardState.iconClass" />
						</button>
					</div>
				</template>

				<div :class="keyboardState.bottomRowClass">
					<button type="button" :class="keyboardState.symbolToggleButtonClass" @click="toggleSymbolMode">
						{{ keyboardState.symbolToggleText }}
					</button>
					<button
						v-for="key in keyboardState.layout.bottomSymbolKeys"
						:key="key"
						type="button"
						:class="keyboardState.symbolKeyClass"
						@click="clickKey(key)"
					>
						{{ key }}
					</button>
					<button type="button" :class="keyboardState.flex1KeyClass" @click="clickSpace">
						<span :class="keyboardState.spaceTextClass">{{ keyboardTexts.spaceText }}</span>
					</button>
					<button
						v-if="keyboardState.layout.showDoneButton"
						type="button"
						:class="keyboardState.doneButtonClass"
						:disabled="doneDisabled"
						@click="clickDone"
					>
						{{ keyboardTexts.doneText }}
					</button>
				</div>
			</template>
		</div>
	</component>
</template>
