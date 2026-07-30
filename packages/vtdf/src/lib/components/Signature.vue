<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
	resolveSignatureCanvasDrawOptions,
	resolveSignatureCanvasSetupState,
	resolveSignatureClearAction,
	resolveSignatureClearPlan,
	resolveSignatureDerived,
	resolveSignatureEmpty,
	resolveSignatureExportPlan,
	resolveSignaturePointerDownAction,
	resolveSignaturePointerMoveAction,
	resolveSignaturePointerPosition,
	resolveSignaturePointerUpAction,
	resolveSignatureResult,
	resolveSignatureStateOptions
} from '@any-tdf/common/derived/signature';
import { resolveDevicePixelRatio } from '@any-tdf/common/derived/helpers';
import { splitButtonCallbacks } from '@any-tdf/common/derived/props';
import type { ButtonProps, SignatureProps, SignatureResult, SignatureRotation } from '../types';
import { zh_CN } from '../lang';
import { useConfig } from './adapter/config';
import Button from './Button.vue';

type SignatureComponentProps = Omit<SignatureProps, 'clearButton' | 'confirmButton'> & {
	clearButton?: ButtonProps;
	confirmButton?: ButtonProps;
};

const props = withDefaults(defineProps<SignatureComponentProps>(), {
	aspectRatio: () => [3, 1],
	lineWidth: 3,
	lineColor: '#000000',
	bgColor: '#ffffff',
	radius: '',
	showButtons: true,
	clearText: '',
	confirmText: '',
	clearButton: () => ({}),
	confirmButton: () => ({}),
	imageType: 'png',
	imageQuality: 0.92,
	injClass: '',
	canvasClass: ''
});

const emit = defineEmits<{
	(event: 'clear'): void;
	(event: 'confirm', result: SignatureResult): void;
	(event: 'drawStart'): void;
	(event: 'drawEnd'): void;
}>();

const config = useConfig();
const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);
const isDrawing = ref(false);
const hasDrawn = ref(false);
const pointers = new Map<number, { x: number; y: number }>();
let observer: ResizeObserver | null = null;

const signatureLang = computed(() => config.locale?.signature || zh_CN.signature);
// 公共派生层只处理 Signature 顶层 class、style 和文案，canvas 与 DOM API 留在组件内。
// Shared derived layer only handles Signature top-level classes, styles and text; canvas and DOM APIs stay in the component.
const signatureState = computed(() =>
	resolveSignatureDerived(
		resolveSignatureStateOptions({
			defaults: signatureLang.value,
			props
		})
	)
);

const clearButtonConfig = computed(() => splitButtonCallbacks(props.clearButton));
const confirmButtonConfig = computed(() => splitButtonCallbacks(props.confirmButton));
const clearButtonProps = computed(() => clearButtonConfig.value.buttonProps);
const confirmButtonProps = computed(() => confirmButtonConfig.value.buttonProps);

const emitClear = () => {
	emit('clear');
};

const emitConfirm = (result: SignatureResult) => {
	emit('confirm', result);
};

const emitDrawStart = () => {
	emit('drawStart');
};

const emitDrawEnd = () => {
	emit('drawEnd');
};

const clearCanvas = () => {
	const ctx = context.value;
	const canvas = canvasRef.value;
	const container = containerRef.value;
	if (!ctx || !canvas || !container) return;
	// 公共纯函数只计算清空参数，Canvas 填充动作留在组件层。
	// The shared pure helper only calculates clear params; canvas filling stays in the component layer.
	const clearPlan = resolveSignatureClearPlan({
		rect: container.getBoundingClientRect(),
		bgColor: props.bgColor,
		emitClear: false
	});
	ctx.fillStyle = clearPlan.fillStyle;
	ctx.fillRect(0, 0, clearPlan.width, clearPlan.height);
	const action = clearPlan.action;
	if (action.shouldClear) hasDrawn.value = action.nextHasDrawn;
};

const initCanvas = async () => {
	await nextTick();
	const canvas = canvasRef.value;
	const container = containerRef.value;
	if (!canvas || !container) return;
	const dpr = resolveDevicePixelRatio({ value: window.devicePixelRatio });
	// DOM 测量留在组件层，尺寸归一化和像素换算交给公共纯函数。
	// DOM measurement stays in the component; size normalization and pixel conversion use shared pure helpers.
	const { canvasSize, shouldSetup } = resolveSignatureCanvasSetupState({
		rect: container.getBoundingClientRect(),
		dpr
	});
	if (!shouldSetup) return;
	canvas.width = canvasSize.pixelWidth;
	canvas.height = canvasSize.pixelHeight;
	canvas.style.width = canvasSize.cssWidth;
	canvas.style.height = canvasSize.cssHeight;

	const ctx = canvas.getContext('2d');
	if (!ctx) return;
	// 公共纯函数只返回 context 配置，组件层执行 Canvas API 写入。
	// The shared pure helper only returns context options; the component layer writes Canvas APIs.
	const drawOptions = resolveSignatureCanvasDrawOptions({
		lineColor: props.lineColor,
		lineWidth: props.lineWidth
	});
	context.value = ctx;
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	ctx.lineCap = drawOptions.lineCap;
	ctx.lineJoin = drawOptions.lineJoin;
	ctx.lineWidth = drawOptions.lineWidth;
	ctx.strokeStyle = drawOptions.strokeStyle;
	clearCanvas();
};

const getPointerPos = (event: PointerEvent) => {
	const canvas = canvasRef.value;
	if (!canvas) return { x: 0, y: 0 };
	const rect = canvas.getBoundingClientRect();
	return resolveSignaturePointerPosition({
		clientX: event.clientX,
		clientY: event.clientY,
		rectLeft: rect.left,
		rectTop: rect.top
	});
};

const handlePointerDown = (event: PointerEvent) => {
	const ctx = context.value;
	const canvas = canvasRef.value;
	if (!ctx || !canvas) return;
	canvas.setPointerCapture(event.pointerId);
	const pos = getPointerPos(event);
	pointers.set(event.pointerId, pos);
	const action = resolveSignaturePointerDownAction({ pointerCount: pointers.size });
	if (action.shouldStartDrawing) {
		isDrawing.value = action.nextDrawing;
		ctx.beginPath();
		ctx.moveTo(pos.x, pos.y);
		if (action.shouldEmitDrawStart) emitDrawStart();
	}
};

const handlePointerMove = (event: PointerEvent) => {
	const ctx = context.value;
	if (!ctx || !isDrawing.value) return;
	const pos = getPointerPos(event);
	const lastPos = pointers.get(event.pointerId);
	const action = resolveSignaturePointerMoveAction({
		isDrawing: isDrawing.value,
		hasLastPointer: Boolean(lastPos),
		pointerCount: pointers.size
	});
	if (action.shouldDraw) {
		ctx.lineTo(pos.x, pos.y);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(pos.x, pos.y);
		hasDrawn.value = action.shouldMarkDrawn;
	}
	pointers.set(event.pointerId, pos);
};

const handlePointerUp = (event: PointerEvent) => {
	const canvas = canvasRef.value;
	if (!canvas) return;
	if (canvas.hasPointerCapture(event.pointerId)) {
		canvas.releasePointerCapture(event.pointerId);
	}
	pointers.delete(event.pointerId);
	const action = resolveSignaturePointerUpAction({
		remainingPointerCount: pointers.size,
		isDrawing: isDrawing.value
	});
	if (action.shouldEndDrawing) {
		isDrawing.value = action.nextDrawing;
		context.value?.closePath();
		if (action.shouldEmitDrawEnd) emitDrawEnd();
	}
};

const getRotatedDataUrl = (rotation: SignatureRotation = 0) => {
	const canvas = canvasRef.value;
	if (!canvas) return '';
	const sourceWidth = canvas.width;
	const sourceHeight = canvas.height;
	// 公共导出计划只计算旋转绘制参数，canvas 创建和导出仍留在组件层。
	// Shared export plan only calculates rotation draw params; canvas creation and export stay in the component layer.
	const exportPlan = resolveSignatureExportPlan({
		sourceWidth,
		sourceHeight,
		rotation,
		imageType: props.imageType,
		imageQuality: props.imageQuality
	});
	if (!exportPlan.shouldRotate) {
		return canvas.toDataURL(exportPlan.mimeType, exportPlan.quality);
	}

	const tempCanvas = document.createElement('canvas');
	const tempCtx = tempCanvas.getContext('2d');
	if (!tempCtx) return '';

	tempCanvas.width = exportPlan.width;
	tempCanvas.height = exportPlan.height;

	tempCtx.translate(exportPlan.translateX, exportPlan.translateY);
	tempCtx.rotate(exportPlan.radians);
	tempCtx.drawImage(canvas, exportPlan.drawX, exportPlan.drawY);
	return tempCanvas.toDataURL(exportPlan.mimeType, exportPlan.quality);
};

const handleClear = (event?: MouseEvent) => {
	const clearButtonOnClick = clearButtonConfig.value.buttonOnClick;
	if (typeof clearButtonOnClick === 'function') clearButtonOnClick(event);
	clearCanvas();
	const action = resolveSignatureClearAction();
	if (action.shouldEmitClear) emitClear();
};

const getSignature = (rotation: SignatureRotation = 0): SignatureResult | null => {
	if (!canvasRef.value) return null;
	return resolveSignatureResult({ dataUrl: getRotatedDataUrl(rotation), hasDrawn: hasDrawn.value });
};

const handleConfirm = (event?: MouseEvent) => {
	const confirmButtonOnClick = confirmButtonConfig.value.buttonOnClick;
	if (typeof confirmButtonOnClick === 'function') confirmButtonOnClick(event);
	const result = getSignature(0);
	if (result) {
		emitConfirm(result);
	}
};

const clear = () => {
	clearCanvas();
};

const isEmpty = () => resolveSignatureEmpty(hasDrawn.value);

watch(
	() => props.lineColor,
	(value) => {
		if (context.value) {
			context.value.strokeStyle = value;
		}
	}
);

watch(
	() => props.lineWidth,
	(value) => {
		if (context.value) {
			context.value.lineWidth = value;
		}
	}
);

watch(
	() => props.bgColor,
	() => {
		clearCanvas();
	}
);

onMounted(() => {
	void initCanvas();
	observer = new ResizeObserver(() => {
		void initCanvas();
	});
	if (containerRef.value) {
		observer.observe(containerRef.value);
	}
});

onBeforeUnmount(() => {
	observer?.disconnect();
	pointers.clear();
});

defineExpose({
	clear,
	getSignature,
	isEmpty
});
</script>

<template>
	<div :class="signatureState.rootClass">
		<div ref="containerRef" :class="signatureState.canvasContainerClass" :style="signatureState.containerStyleValue">
			<canvas
				ref="canvasRef"
				:class="signatureState.canvasClass"
				@pointerdown="handlePointerDown"
				@pointermove="handlePointerMove"
				@pointerup="handlePointerUp"
				@pointercancel="handlePointerUp"
				@pointerleave="handlePointerUp"
			/>
		</div>
		<div v-if="showButtons" :class="signatureState.buttonRowClass">
			<Button fill="line" size="md" custom-size :custom-width="80" :custom-height="36" v-bind="clearButtonProps" @click="handleClear">
				{{ signatureState.texts.clearText }}
			</Button>
			<Button fill="base" size="md" custom-size :custom-width="80" :custom-height="36" v-bind="confirmButtonProps" @click="handleConfirm">
				{{ signatureState.texts.confirmText }}
			</Button>
		</div>
	</div>
</template>
