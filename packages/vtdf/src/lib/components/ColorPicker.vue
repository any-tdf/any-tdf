<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { throttleWithRAF } from '@any-tdf/common/utils';
import {
	colorPickerDefaultColor,
	resolveColorPickerCloseAction,
	resolveColorPickerCopySuccessAction,
	resolveColorPickerCopyTipHideAction,
	resolveColorPickerDerived,
	resolveColorPickerDragAction,
	resolveColorPickerInitialVisible,
	resolveColorPickerInputColor,
	resolveColorPickerInputKeyboardAction,
	resolveColorPickerInputNextColor,
	resolveColorPickerMeasuredClientWidth,
	resolveColorPickerPanelBitmapData,
	resolveColorPickerPanelCanvasMetrics,
	resolveColorPickerPanelInteractionColor,
	resolveColorPickerShouldSyncColor,
	resolveColorPickerSliderBitmapData,
	resolveColorPickerSliderCanvasMetrics,
	resolveColorPickerSliderDraggingState,
	resolveColorPickerSliderInteractionColor,
	resolveColorPickerSliderMoveAction,
	resolveColorPickerStateOptions,
	resolveColorPickerThemeColorFromCssValue,
	resolveColorPickerThemeColorVariable,
	resolveColorPickerUpdateAction
} from '@any-tdf/common/derived/colorPicker';
import { resolveDevicePixelRatio } from '@any-tdf/common/derived/helpers';
import { splitTabCallbacks } from '@any-tdf/common/derived/props';
import type { ColorPickerMode, ColorPickerProps, ColorPickerValue, OklchColor, PopupProps, TabProps } from '../types';
import Popup from './Popup.vue';
import Tab from './Tab.vue';

type ColorPickerPopupProps = PopupProps & {};
type ColorPickerTabProps = TabProps & {};
type ColorPickerVueProps = Omit<ColorPickerProps, 'popup' | 'tab'> & {
	popup?: ColorPickerPopupProps | null;
	tab?: ColorPickerTabProps;
};

const getThemeColor = (): OklchColor => {
	if (typeof window === 'undefined') return colorPickerDefaultColor;

	const colorVar = resolveColorPickerThemeColorVariable(document.documentElement.getAttribute('data-mode'));
	const colorValue = getComputedStyle(document.documentElement).getPropertyValue(colorVar).trim();
	return resolveColorPickerThemeColorFromCssValue(colorValue);
};

const props = withDefaults(defineProps<ColorPickerVueProps>(), {
	visible: false,
	value: undefined,
	modes: () => ['oklch', 'rgb', 'hex'],
	showPreview: true,
	showPanel: true,
	showInputs: true,
	showCopy: true,
	panelHeight: 160,
	sliderHeight: 24,
	radius: 'md',
	injClass: '',
	popup: () => ({}),
	tab: () => ({})
});

const emit = defineEmits<{
	(event: 'update:visible', visible: boolean): void;
	(event: 'update:value', value: ColorPickerValue): void;
	(event: 'change', colors: string[]): void;
	(event: 'close', colors: string[]): void;
	(event: 'copy', text: string): void;
}>();

const innerVisible = ref(resolveColorPickerInitialVisible(props.visible));
const internalColor = ref<OklchColor>(resolveColorPickerInputColor({ value: props.value, themeColor: getThemeColor() }));
const activeModeIndex = ref(0);
const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const showCopyTip = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);
const sliderRef = ref<HTMLDivElement | null>(null);
const panelCanvas = ref<HTMLCanvasElement | null>(null);
const slider1Canvas = ref<HTMLCanvasElement | null>(null);
const slider2Canvas = ref<HTMLCanvasElement | null>(null);
const slider3Canvas = ref<HTMLCanvasElement | null>(null);
const containerWidth = ref(0);
const sliderWidth = ref(0);
const isDraggingPanel = ref(false);
const isDragging1 = ref(false);
const isDragging2 = ref(false);
const isDragging3 = ref(false);
let resizeObserver: ResizeObserver | null = null;
let copyTimeout: ReturnType<typeof setTimeout> | null = null;
const dpr = resolveDevicePixelRatio({
	value: typeof window !== 'undefined' ? window.devicePixelRatio : undefined
});

// 公共派生层只处理 ColorPicker 显示值、尺寸、样式和控制点，DOM 测量与 Canvas 绘制留在组件内。
// Shared derived layer only handles ColorPicker display values, sizes, styles and control points; DOM measurement and Canvas drawing stay in the component.
const colorPickerState = computed(() =>
	resolveColorPickerDerived<ColorPickerPopupProps>(
		resolveColorPickerStateOptions<ColorPickerPopupProps>({
			activeModeIndex: activeModeIndex.value,
			color: internalColor.value,
			containerWidth: containerWidth.value,
			props: {
				injClass: props.injClass,
				modes: props.modes,
				panelHeight: props.panelHeight,
				popup: props.popup,
				radius: props.radius,
				sliderHeight: props.sliderHeight
			},
			sliderWidth: sliderWidth.value
		})
	)
);
const isDirectMode = computed(() => colorPickerState.value.isDirectMode);
const effectiveModes = computed<ColorPickerMode[]>(() => colorPickerState.value.effectiveModes);
const colorMode = computed<ColorPickerMode>(() => colorPickerState.value.colorMode);
const panelWidth = computed(() => colorPickerState.value.panelWidth);
const wheelSize = computed(() => colorPickerState.value.wheelSize);
const currentRgb = computed<[number, number, number]>(() => colorPickerState.value.currentRgb);
const currentHex = computed(() => colorPickerState.value.currentHex);
const currentOklch = computed(() => colorPickerState.value.currentOklch);
const currentRgbStr = computed(() => colorPickerState.value.currentRgbStr);
const colorStrings = computed(() => colorPickerState.value.colorStrings);
const tabLabels = computed(() => colorPickerState.value.tabLabels);
const contentClass = computed(() => colorPickerState.value.contentClass);
const popupProps = computed(() => colorPickerState.value.popupProps);
const tabConfig = computed(() => splitTabCallbacks(props.tab));
const tabProps = computed(() => tabConfig.value.tabProps);
const labels = computed(() => colorPickerState.value.labels);
const previewStyle = computed(() => colorPickerState.value.previewStyleValue);
const panelSizeStyle = computed(() => colorPickerState.value.panelSizeStyleValue);
const panelMarkerStyle = computed(() => colorPickerState.value.panelMarkerStyleValue);
const sliderCanvasStyle = computed(() => colorPickerState.value.sliderCanvasStyleValue);
const slider1HandleStyle = computed(() => colorPickerState.value.slider1.handleStyleValue);
const slider2HandleStyle = computed(() => colorPickerState.value.slider2.handleStyleValue);
const slider3HandleStyle = computed(() => colorPickerState.value.slider3.handleStyleValue);

const emitChange = (colors: string[]) => {
	emit('change', colors);
};

const emitClose = (colors: string[]) => {
	emit('close', colors);
};

const emitCopy = (text: string) => {
	emit('copy', text);
};

const updateColor = (color: OklchColor) => {
	// 公共 action 计算外部值和 direct change 输出，组件层只写状态和派发事件。
	// Shared action calculates external value and direct change output; the component layer only writes state and emits events.
	const action = resolveColorPickerUpdateAction({
		color,
		modes: effectiveModes.value,
		isDirectMode: isDirectMode.value
	});
	internalColor.value = color;
	emit('update:value', action.nextValue);
	if (action.shouldEmitChange) {
		emitChange(action.changeColors);
	}
};

const drawPanel = () => {
	const canvas = panelCanvas.value;
	const metrics = resolveColorPickerPanelCanvasMetrics({
		mode: colorMode.value,
		panelWidth: panelWidth.value,
		panelHeight: props.panelHeight,
		wheelSize: wheelSize.value,
		dpr
	});
	if (!canvas || !metrics.shouldDraw) return;
	canvas.width = metrics.pixelWidth;
	canvas.height = metrics.pixelHeight;

	const ctx = canvas.getContext('2d');
	if (!ctx) return;
	const imageData = ctx.createImageData(canvas.width, canvas.height);
	// 公共函数只返回像素数据，Canvas 写入继续留在组件层。
	// Shared helper only returns pixel data; Canvas writes stay in the component layer.
	imageData.data.set(
		resolveColorPickerPanelBitmapData({
			mode: colorMode.value,
			color: internalColor.value,
			rgb: currentRgb.value,
			width: canvas.width,
			height: canvas.height,
			dpr
		})
	);
	ctx.putImageData(imageData, 0, 0);
};

const drawSlider = (canvas: HTMLCanvasElement | null, sliderIndex: 1 | 2 | 3) => {
	const metrics = resolveColorPickerSliderCanvasMetrics({
		sliderWidth: sliderWidth.value,
		sliderHeight: props.sliderHeight,
		dpr
	});
	if (!canvas || !metrics.shouldDraw) return;
	canvas.width = metrics.pixelWidth;
	canvas.height = metrics.pixelHeight;
	const ctx = canvas.getContext('2d');
	if (!ctx) return;
	const imageData = ctx.createImageData(canvas.width, canvas.height);
	imageData.data.set(
		resolveColorPickerSliderBitmapData({
			mode: colorMode.value,
			sliderIndex,
			color: internalColor.value,
			width: canvas.width,
			height: canvas.height
		})
	);
	ctx.putImageData(imageData, 0, 0);
};

const drawAll = () => {
	drawPanel();
	drawSlider(slider1Canvas.value, 1);
	drawSlider(slider2Canvas.value, 2);
	drawSlider(slider3Canvas.value, 3);
};

const redrawSoon = () => {
	nextTick(() => {
		setTimeout(drawAll, 50);
	});
};

const handlePanelInteraction = (event: PointerEvent) => {
	const canvas = panelCanvas.value;
	if (!canvas) return;
	const rect = canvas.getBoundingClientRect();
	updateColor(
		resolveColorPickerPanelInteractionColor({
			mode: colorMode.value,
			color: internalColor.value,
			rgb: currentRgb.value,
			panelWidth: panelWidth.value,
			panelHeight: props.panelHeight,
			wheelSize: wheelSize.value,
			clientX: event.clientX,
			clientY: event.clientY,
			rectLeft: rect.left,
			rectTop: rect.top
		})
	);
};

const handleSliderInteraction = (event: PointerEvent, sliderIndex: 1 | 2 | 3) => {
	const canvas = sliderIndex === 1 ? slider1Canvas.value : sliderIndex === 2 ? slider2Canvas.value : slider3Canvas.value;
	if (!canvas) return;
	const rect = canvas.getBoundingClientRect();
	updateColor(
		resolveColorPickerSliderInteractionColor({
			mode: colorMode.value,
			sliderIndex,
			color: internalColor.value,
			rgb: currentRgb.value,
			rectWidth: rect.width,
			clientX: event.clientX,
			rectLeft: rect.left
		})
	);
};

const throttledPanelInteraction = throttleWithRAF(handlePanelInteraction);
const throttledSlider1Interaction = throttleWithRAF((event: PointerEvent) => handleSliderInteraction(event, 1));
const throttledSlider2Interaction = throttleWithRAF((event: PointerEvent) => handleSliderInteraction(event, 2));
const throttledSlider3Interaction = throttleWithRAF((event: PointerEvent) => handleSliderInteraction(event, 3));

const onPanelPointerDown = (event: PointerEvent) => {
	const canvas = panelCanvas.value;
	if (!canvas) return;
	const action = resolveColorPickerDragAction({ target: 'panel', phase: 'start' });
	isDraggingPanel.value = action.nextDragging;
	canvas.setPointerCapture(event.pointerId);
	if (action.shouldHandleInteraction) handlePanelInteraction(event);
};

const onPanelPointerMove = (event: PointerEvent) => {
	if (!isDraggingPanel.value) return;
	throttledPanelInteraction(event);
};

const onPanelPointerUp = (event: PointerEvent) => {
	const canvas = panelCanvas.value;
	const action = resolveColorPickerDragAction({ target: 'panel', phase: 'end' });
	isDraggingPanel.value = action.nextDragging;
	if (canvas?.hasPointerCapture(event.pointerId)) {
		canvas.releasePointerCapture(event.pointerId);
	}
};

const setSliderDragging = (sliderIndex: 1 | 2 | 3, nextDragging: boolean) => {
	// 公共函数只计算拖拽标记分发，组件层负责写入响应式状态。
	// Shared helper only calculates drag-flag distribution; this component writes reactive state.
	const state = resolveColorPickerSliderDraggingState({
		isDragging1: isDragging1.value,
		isDragging2: isDragging2.value,
		isDragging3: isDragging3.value,
		sliderIndex,
		nextDragging
	});
	isDragging1.value = state.isDragging1;
	isDragging2.value = state.isDragging2;
	isDragging3.value = state.isDragging3;
};

const onSliderPointerDown = (event: PointerEvent, sliderIndex: 1 | 2 | 3) => {
	const canvas = sliderIndex === 1 ? slider1Canvas.value : sliderIndex === 2 ? slider2Canvas.value : slider3Canvas.value;
	if (!canvas) return;
	const action = resolveColorPickerDragAction({ target: sliderIndex, phase: 'start' });
	setSliderDragging(sliderIndex, action.nextDragging);
	canvas.setPointerCapture(event.pointerId);
	if (action.shouldHandleInteraction) handleSliderInteraction(event, sliderIndex);
};

const onSliderPointerMove = (event: PointerEvent, sliderIndex: 1 | 2 | 3) => {
	const action = resolveColorPickerSliderMoveAction({
		sliderIndex,
		isDragging1: isDragging1.value,
		isDragging2: isDragging2.value,
		isDragging3: isDragging3.value
	});
	if (!action.shouldHandleInteraction) return;
	if (sliderIndex === 1) throttledSlider1Interaction(event);
	if (sliderIndex === 2) throttledSlider2Interaction(event);
	if (sliderIndex === 3) throttledSlider3Interaction(event);
};

const onSliderPointerUp = (event: PointerEvent, sliderIndex: 1 | 2 | 3) => {
	const canvas = sliderIndex === 1 ? slider1Canvas.value : sliderIndex === 2 ? slider2Canvas.value : slider3Canvas.value;
	const action = resolveColorPickerDragAction({ target: sliderIndex, phase: 'end' });
	setSliderDragging(sliderIndex, action.nextDragging);
	if (canvas?.hasPointerCapture(event.pointerId)) {
		canvas.releasePointerCapture(event.pointerId);
	}
};

const onBlur1 = () => {
	const nextColor = resolveColorPickerInputNextColor({
		mode: colorMode.value,
		inputIndex: 1,
		input: input1.value,
		color: internalColor.value,
		rgb: currentRgb.value
	});
	if (nextColor) updateColor(nextColor);
};

const onBlur2 = () => {
	const nextColor = resolveColorPickerInputNextColor({
		mode: colorMode.value,
		inputIndex: 2,
		input: input2.value,
		color: internalColor.value,
		rgb: currentRgb.value
	});
	if (nextColor) updateColor(nextColor);
};

const onBlur3 = () => {
	const nextColor = resolveColorPickerInputNextColor({
		mode: colorMode.value,
		inputIndex: 3,
		input: input3.value,
		color: internalColor.value,
		rgb: currentRgb.value
	});
	if (nextColor) updateColor(nextColor);
};

const onKeydown = (event: KeyboardEvent, blurFn: () => void) => {
	// 公共 action 只判断输入框按键是否提交，实际提交函数留在组件层。
	// Shared action only decides whether the input key commits; the commit function stays in the component layer.
	const action = resolveColorPickerInputKeyboardAction({ key: event.key });
	if (action.shouldCommit) blurFn();
};

const copyToClipboard = (text: string) => {
	if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) return;
	navigator.clipboard.writeText(text).then(() => {
		const action = resolveColorPickerCopySuccessAction({ text });
		if (action.shouldEmitCopy) emitCopy(action.copyText);
		showCopyTip.value = action.nextShowCopyTip;
		if (copyTimeout) {
			clearTimeout(copyTimeout);
		}
		copyTimeout = setTimeout(() => {
			const hideAction = resolveColorPickerCopyTipHideAction();
			showCopyTip.value = hideAction.nextShowCopyTip;
		}, action.hideDelay);
	});
};

const handleModeTabClick = (index: number) => {
	const tabOnClickTab = tabConfig.value.tabOnClickTab;
	if (typeof tabOnClickTab === 'function') tabOnClickTab(index);
	activeModeIndex.value = index;
};

const handlePopupClose = () => {
	const action = resolveColorPickerCloseAction({ colorStrings: colorStrings.value });
	if (action.shouldClose) innerVisible.value = action.nextVisible;
	if (action.shouldEmitVisible) emit('update:visible', action.nextVisible);
	if (action.shouldEmitClose) emitClose(action.closeValue);
};

watch(
	() => props.visible,
	(visible) => {
		const nextVisible = resolveColorPickerInitialVisible(visible);
		innerVisible.value = nextVisible;
		if (nextVisible) redrawSoon();
	}
);

watch(
	() => props.value,
	(value) => {
		// 公共解析函数不读取 DOM，主题色由组件层读取后传入。
		// Shared parser does not read the DOM; the component reads the theme color and passes it in.
		const parsed = resolveColorPickerInputColor({ value, themeColor: getThemeColor() });
		if (resolveColorPickerShouldSyncColor(internalColor.value, parsed)) {
			internalColor.value = parsed;
		}
	}
);

watch(
	() => effectiveModes.value.length,
	() => {
		if (colorPickerState.value.safeActiveModeIndex !== activeModeIndex.value) {
			activeModeIndex.value = colorPickerState.value.safeActiveModeIndex;
		}
	}
);

watch(
	[colorMode, currentRgb, () => internalColor.value.l, () => internalColor.value.c, () => internalColor.value.h],
	() => {
		const inputValues = colorPickerState.value.inputValues;
		input1.value = inputValues[0];
		input2.value = inputValues[1];
		input3.value = inputValues[2];
	},
	{ immediate: true }
);

watch(
	[colorMode, () => internalColor.value.l, () => internalColor.value.c, () => internalColor.value.h, panelWidth, sliderWidth, innerVisible],
	() => {
		if (isDirectMode.value || innerVisible.value) redrawSoon();
	}
);

onMounted(() => {
	resizeObserver = new ResizeObserver(() => {
		containerWidth.value = resolveColorPickerMeasuredClientWidth(containerRef.value);
		sliderWidth.value = resolveColorPickerMeasuredClientWidth(sliderRef.value);
		redrawSoon();
	});
	if (containerRef.value) resizeObserver.observe(containerRef.value);
	if (sliderRef.value) resizeObserver.observe(sliderRef.value);
	containerWidth.value = resolveColorPickerMeasuredClientWidth(containerRef.value);
	sliderWidth.value = resolveColorPickerMeasuredClientWidth(sliderRef.value);
	redrawSoon();
});

onBeforeUnmount(() => {
	resizeObserver?.disconnect();
	throttledPanelInteraction.clear();
	throttledSlider1Interaction.clear();
	throttledSlider2Interaction.clear();
	throttledSlider3Interaction.clear();
	if (copyTimeout) {
		clearTimeout(copyTimeout);
	}
});
</script>

<template>
	<div v-if="isDirectMode" :class="contentClass">
		<div ref="containerRef" :class="colorPickerState.containerMeasureClass" />
		<div v-if="showPreview" :class="colorPickerState.previewRowClass">
			<div :class="colorPickerState.previewClass" :style="previewStyle" />
			<div :class="colorPickerState.previewTextClass">
				<template v-if="showCopy">
					<button type="button" :class="colorPickerState.copyButtonClass" @click="copyToClipboard(currentHex)">
						{{ currentHex }}
					</button>
					<button type="button" :class="colorPickerState.copyButtonClass" @click="copyToClipboard(currentRgbStr)">
						{{ currentRgbStr }}
					</button>
					<button type="button" :class="colorPickerState.copyLastButtonClass" @click="copyToClipboard(currentOklch)">
						{{ currentOklch }}
					</button>
				</template>
				<template v-else>
					<div :class="colorPickerState.displayValueClass">{{ currentHex }}</div>
					<div :class="colorPickerState.displayValueClass">{{ currentRgbStr }}</div>
					<div :class="colorPickerState.displayLastValueClass">{{ currentOklch }}</div>
				</template>
				<div v-if="showCopyTip" :class="colorPickerState.copyTipClass">Copied</div>
			</div>
		</div>

		<div v-if="showPanel" :class="colorPickerState.panelWrapperClass">
			<canvas
				ref="panelCanvas"
				:style="panelSizeStyle"
				:class="colorPickerState.panelCanvasClass"
				@pointerdown="onPanelPointerDown"
				@pointermove="onPanelPointerMove"
				@pointerup="onPanelPointerUp"
				@pointercancel="onPanelPointerUp"
			/>
			<div :class="colorPickerState.panelMarkerClass" :style="panelMarkerStyle" />
		</div>

		<div :class="colorPickerState.sliderRowClass">
			<span v-if="showInputs" :class="colorPickerState.sliderLabelClass">{{ labels[0] }}</span>
			<div ref="sliderRef" :class="colorPickerState.sliderTrackClass">
				<canvas
					ref="slider1Canvas"
					:style="sliderCanvasStyle"
					:class="colorPickerState.sliderCanvasClass"
					@pointerdown="(event) => onSliderPointerDown(event, 1)"
					@pointermove="(event) => onSliderPointerMove(event, 1)"
					@pointerup="(event) => onSliderPointerUp(event, 1)"
					@pointercancel="(event) => onSliderPointerUp(event, 1)"
				/>
				<div :class="colorPickerState.sliderHandleClass" :style="slider1HandleStyle" />
			</div>
			<input
				v-if="showInputs"
				v-model="input1"
				type="text"
				:class="colorPickerState.inputClass"
				@blur="onBlur1"
				@keydown="(event) => onKeydown(event, onBlur1)"
			/>
		</div>

		<div :class="colorPickerState.sliderRowClass">
			<span v-if="showInputs" :class="colorPickerState.sliderLabelClass">{{ labels[1] }}</span>
			<div :class="colorPickerState.sliderTrackClass">
				<canvas
					ref="slider2Canvas"
					:style="sliderCanvasStyle"
					:class="colorPickerState.sliderCanvasClass"
					@pointerdown="(event) => onSliderPointerDown(event, 2)"
					@pointermove="(event) => onSliderPointerMove(event, 2)"
					@pointerup="(event) => onSliderPointerUp(event, 2)"
					@pointercancel="(event) => onSliderPointerUp(event, 2)"
				/>
				<div :class="colorPickerState.sliderHandleClass" :style="slider2HandleStyle" />
			</div>
			<input
				v-if="showInputs"
				v-model="input2"
				type="text"
				:class="colorPickerState.inputClass"
				@blur="onBlur2"
				@keydown="(event) => onKeydown(event, onBlur2)"
			/>
		</div>

		<div :class="colorPickerState.sliderLastRowClass">
			<span v-if="showInputs" :class="colorPickerState.sliderLabelClass">{{ labels[2] }}</span>
			<div :class="colorPickerState.sliderTrackClass">
				<canvas
					ref="slider3Canvas"
					:style="sliderCanvasStyle"
					:class="colorPickerState.sliderCanvasClass"
					@pointerdown="(event) => onSliderPointerDown(event, 3)"
					@pointermove="(event) => onSliderPointerMove(event, 3)"
					@pointerup="(event) => onSliderPointerUp(event, 3)"
					@pointercancel="(event) => onSliderPointerUp(event, 3)"
				/>
				<div :class="colorPickerState.sliderHandleClass" :style="slider3HandleStyle" />
			</div>
			<input
				v-if="showInputs"
				v-model="input3"
				type="text"
				:class="colorPickerState.inputClass"
				@blur="onBlur3"
				@keydown="(event) => onKeydown(event, onBlur3)"
			/>
		</div>

		<Tab
			v-if="effectiveModes.length > 1"
			v-bind="tabProps"
			:labels="tabLabels"
			:active="activeModeIndex"
			:mx="tabProps.mx ?? '0'"
			@click-tab="handleModeTabClick"
		/>
	</div>

	<Popup v-else :visible="innerVisible" v-bind="popupProps" @close="handlePopupClose">
		<div :class="contentClass">
			<div ref="containerRef" :class="colorPickerState.containerMeasureClass" />
			<div v-if="showPreview" :class="colorPickerState.previewRowClass">
				<div :class="colorPickerState.previewClass" :style="previewStyle" />
				<div :class="colorPickerState.previewTextClass">
					<template v-if="showCopy">
						<button type="button" :class="colorPickerState.copyButtonClass" @click="copyToClipboard(currentHex)">
							{{ currentHex }}
						</button>
						<button type="button" :class="colorPickerState.copyButtonClass" @click="copyToClipboard(currentRgbStr)">
							{{ currentRgbStr }}
						</button>
						<button type="button" :class="colorPickerState.copyLastButtonClass" @click="copyToClipboard(currentOklch)">
							{{ currentOklch }}
						</button>
					</template>
					<template v-else>
						<div :class="colorPickerState.displayValueClass">{{ currentHex }}</div>
						<div :class="colorPickerState.displayValueClass">{{ currentRgbStr }}</div>
						<div :class="colorPickerState.displayLastValueClass">{{ currentOklch }}</div>
					</template>
					<div v-if="showCopyTip" :class="colorPickerState.copyTipClass">Copied</div>
				</div>
			</div>

			<div v-if="showPanel" :class="colorPickerState.panelWrapperClass">
				<canvas
					ref="panelCanvas"
					:style="panelSizeStyle"
					:class="colorPickerState.panelCanvasClass"
					@pointerdown="onPanelPointerDown"
					@pointermove="onPanelPointerMove"
					@pointerup="onPanelPointerUp"
					@pointercancel="onPanelPointerUp"
				/>
				<div :class="colorPickerState.panelMarkerClass" :style="panelMarkerStyle" />
			</div>

			<div :class="colorPickerState.sliderRowClass">
				<span v-if="showInputs" :class="colorPickerState.sliderLabelClass">{{ labels[0] }}</span>
				<div ref="sliderRef" :class="colorPickerState.sliderTrackClass">
					<canvas
						ref="slider1Canvas"
						:style="sliderCanvasStyle"
						:class="colorPickerState.sliderCanvasClass"
						@pointerdown="(event) => onSliderPointerDown(event, 1)"
						@pointermove="(event) => onSliderPointerMove(event, 1)"
						@pointerup="(event) => onSliderPointerUp(event, 1)"
						@pointercancel="(event) => onSliderPointerUp(event, 1)"
					/>
					<div :class="colorPickerState.sliderHandleClass" :style="slider1HandleStyle" />
				</div>
				<input
					v-if="showInputs"
					v-model="input1"
					type="text"
					:class="colorPickerState.inputClass"
					@blur="onBlur1"
					@keydown="(event) => onKeydown(event, onBlur1)"
				/>
			</div>

			<div :class="colorPickerState.sliderRowClass">
				<span v-if="showInputs" :class="colorPickerState.sliderLabelClass">{{ labels[1] }}</span>
				<div :class="colorPickerState.sliderTrackClass">
					<canvas
						ref="slider2Canvas"
						:style="sliderCanvasStyle"
						:class="colorPickerState.sliderCanvasClass"
						@pointerdown="(event) => onSliderPointerDown(event, 2)"
						@pointermove="(event) => onSliderPointerMove(event, 2)"
						@pointerup="(event) => onSliderPointerUp(event, 2)"
						@pointercancel="(event) => onSliderPointerUp(event, 2)"
					/>
					<div :class="colorPickerState.sliderHandleClass" :style="slider2HandleStyle" />
				</div>
				<input
					v-if="showInputs"
					v-model="input2"
					type="text"
					:class="colorPickerState.inputClass"
					@blur="onBlur2"
					@keydown="(event) => onKeydown(event, onBlur2)"
				/>
			</div>

			<div :class="colorPickerState.sliderLastRowClass">
				<span v-if="showInputs" :class="colorPickerState.sliderLabelClass">{{ labels[2] }}</span>
				<div :class="colorPickerState.sliderTrackClass">
					<canvas
						ref="slider3Canvas"
						:style="sliderCanvasStyle"
						:class="colorPickerState.sliderCanvasClass"
						@pointerdown="(event) => onSliderPointerDown(event, 3)"
						@pointermove="(event) => onSliderPointerMove(event, 3)"
						@pointerup="(event) => onSliderPointerUp(event, 3)"
						@pointercancel="(event) => onSliderPointerUp(event, 3)"
					/>
					<div :class="colorPickerState.sliderHandleClass" :style="slider3HandleStyle" />
				</div>
				<input
					v-if="showInputs"
					v-model="input3"
					type="text"
					:class="colorPickerState.inputClass"
					@blur="onBlur3"
					@keydown="(event) => onKeydown(event, onBlur3)"
				/>
			</div>

			<Tab
				v-if="effectiveModes.length > 1"
				v-bind="tabProps"
				:labels="tabLabels"
				:active="activeModeIndex"
				:mx="tabProps.mx ?? '0'"
				@click-tab="handleModeTabClick"
			/>
		</div>
	</Popup>
</template>
