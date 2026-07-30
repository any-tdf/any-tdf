<script lang="ts">
	import { SvelteMap } from 'svelte/reactivity';
	import Button from '../button/Button.svelte';
	import type { SignatureProps, SignatureResult, SignatureRotation } from '../../types/index.js';
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

	let {
		aspectRatio = [3, 1],
		lineWidth = 3,
		lineColor = '#000000',
		bgColor = '#ffffff',
		radius = '',
		showButtons = true,
		clearText = '',
		confirmText = '',
		clearButton = {},
		confirmButton = {},
		imageType = 'png',
		imageQuality = 0.92,
		injClass = '',
		canvasClass = '',
		onclear,
		onconfirm,
		ondrawStart,
		ondrawEnd
	}: SignatureProps = $props();

	// 画布元素引用
	// Canvas element reference
	let canvasEl: HTMLCanvasElement | undefined = $state();
	let containerEl: HTMLDivElement | undefined = $state();

	// 绘制状态
	// Drawing state
	let isDrawing = $state(false);
	let hasDrawn = $state(false);
	let ctx: CanvasRenderingContext2D | null = $state(null);

	// 指针追踪
	// Pointer tracking
	const pointers = new SvelteMap<number, { x: number; y: number }>();

	// 公共派生层只处理 Signature 顶层 class、style 和文案，canvas 与 DOM API 留在组件内。
	// Shared derived layer only handles Signature top-level classes, styles and text; canvas and DOM APIs stay in the component.
	const signatureState = $derived(resolveSignatureDerived(resolveSignatureStateOptions({
		defaults: { clearText: '清空', confirmText: '确认' },
		props: { aspectRatio, bgColor, canvasClass, clearText, confirmText, injClass, radius }
	})));

	// 初始化 Canvas
	// Initialize Canvas
	$effect(() => {
		if (canvasEl && containerEl) {
			const dpr = resolveDevicePixelRatio({ value: window.devicePixelRatio });
			// DOM 测量留在组件层，尺寸归一化和像素换算交给公共纯函数。
			// DOM measurement stays in the component; size normalization and pixel conversion use shared pure helpers.
			const { canvasSize } = resolveSignatureCanvasSetupState({ rect: containerEl.getBoundingClientRect(), dpr });

			// 设置 canvas 实际像素大小（高清屏适配）
			// Set canvas actual pixel size (Retina adaptation)
			canvasEl.width = canvasSize.pixelWidth;
			canvasEl.height = canvasSize.pixelHeight;

			// 设置 canvas CSS 大小
			// Set canvas CSS size
			canvasEl.style.width = canvasSize.cssWidth;
			canvasEl.style.height = canvasSize.cssHeight;

			ctx = canvasEl.getContext('2d');
			if (ctx) {
				// 公共纯函数只返回 context 配置，组件层执行 Canvas API 写入。
				// The shared pure helper only returns context options; the component layer writes Canvas APIs.
				const drawOptions = resolveSignatureCanvasDrawOptions({ lineColor, lineWidth });
				// 缩放上下文以匹配设备像素比
				// Scale context to match device pixel ratio
				ctx.scale(dpr, dpr);

				// 设置绘制属性
				// Set drawing properties
				ctx.lineCap = drawOptions.lineCap;
				ctx.lineJoin = drawOptions.lineJoin;
				ctx.lineWidth = drawOptions.lineWidth;
				ctx.strokeStyle = drawOptions.strokeStyle;

				// 清空画布并填充背景色
				// Clear canvas and fill background color
				clearCanvas();
			}
		}
	});

	// 监听画笔颜色变化
	// Watch line color change
	$effect(() => {
		if (ctx) {
			ctx.strokeStyle = lineColor;
		}
	});

	// 监听画笔粗细变化
	// Watch line width change
	$effect(() => {
		if (ctx) {
			ctx.lineWidth = lineWidth;
		}
	});

	// 获取指针在 canvas 上的坐标
	// Get pointer position on canvas
	const getPointerPos = (e: PointerEvent): { x: number; y: number } => {
		if (!canvasEl) return { x: 0, y: 0 };
		const rect = canvasEl.getBoundingClientRect();
		return resolveSignaturePointerPosition({ clientX: e.clientX, clientY: e.clientY, rectLeft: rect.left, rectTop: rect.top });
	};

	// 指针按下
	// Pointer down
	const handlePointerDown = (e: PointerEvent) => {
		if (!ctx || !canvasEl) return;

		canvasEl.setPointerCapture(e.pointerId);
		const pos = getPointerPos(e);
		pointers.set(e.pointerId, pos);

		// 只有单指才开始绘制
		// Only start drawing with single pointer
		const action = resolveSignaturePointerDownAction({ pointerCount: pointers.size });
		if (action.shouldStartDrawing) {
			isDrawing = action.nextDrawing;
			ctx.beginPath();
			ctx.moveTo(pos.x, pos.y);
			if (action.shouldEmitDrawStart) ondrawStart?.();
		}
	};

	// 指针移动
	// Pointer move
	const handlePointerMove = (e: PointerEvent) => {
		if (!ctx || !isDrawing) return;

		const pos = getPointerPos(e);
		const lastPos = pointers.get(e.pointerId);
		const action = resolveSignaturePointerMoveAction({ isDrawing, hasLastPointer: Boolean(lastPos), pointerCount: pointers.size });

		if (action.shouldDraw) {
			// 单指绘制
			// Single pointer drawing
			ctx.lineTo(pos.x, pos.y);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(pos.x, pos.y);
			hasDrawn = action.shouldMarkDrawn;
		}

		pointers.set(e.pointerId, pos);
	};

	// 指针抬起
	// Pointer up
	const handlePointerUp = (e: PointerEvent) => {
		if (!canvasEl) return;

		canvasEl.releasePointerCapture(e.pointerId);
		pointers.delete(e.pointerId);
		const action = resolveSignaturePointerUpAction({ remainingPointerCount: pointers.size, isDrawing });

		if (action.shouldEndDrawing) {
			isDrawing = action.nextDrawing;
			ctx?.closePath();
			if (action.shouldEmitDrawEnd) ondrawEnd?.();
		}
	};

	// 指针取消
	// Pointer cancel
	const handlePointerCancel = (e: PointerEvent) => {
		handlePointerUp(e);
	};

	// 清空画布
	// Clear canvas
	const clearCanvas = () => {
		if (!ctx || !canvasEl || !containerEl) return;

		// 公共纯函数只计算清空参数，Canvas 填充动作留在组件层。
		// The shared pure helper only calculates clear params; canvas filling stays in the component layer.
		const clearPlan = resolveSignatureClearPlan({ rect: containerEl.getBoundingClientRect(), bgColor, emitClear: false });
		ctx.fillStyle = clearPlan.fillStyle;
		ctx.fillRect(0, 0, clearPlan.width, clearPlan.height);

		const action = clearPlan.action;
		if (action.shouldClear) hasDrawn = action.nextHasDrawn;
	};

	// 清空按钮点击
	// Clear button click
	const handleClear = () => {
		clearCanvas();
		const action = resolveSignatureClearAction();
		if (action.shouldEmitClear) onclear?.();
	};

	// 生成旋转后的图片
	// Generate rotated image
	const getRotatedDataUrl = (rotation: SignatureRotation = 0): string => {
		if (!canvasEl) return '';

		const sourceWidth = canvasEl.width;
		const sourceHeight = canvasEl.height;
		// 公共导出计划只计算旋转绘制参数，canvas 创建和导出仍留在组件层。
		// Shared export plan only calculates rotation draw params; canvas creation and export stay in the component layer.
		const exportPlan = resolveSignatureExportPlan({ sourceWidth, sourceHeight, rotation, imageType, imageQuality });

		// 如果不需要旋转，直接返回原图
		// Return original image if no rotation needed
		if (!exportPlan.shouldRotate) {
			return canvasEl.toDataURL(exportPlan.mimeType, exportPlan.quality);
		}

		// 创建临时 canvas 进行旋转
		// Create temporary canvas for rotation
		const tempCanvas = document.createElement('canvas');
		const tempCtx = tempCanvas.getContext('2d');
		if (!tempCtx) return '';

		tempCanvas.width = exportPlan.width;
		tempCanvas.height = exportPlan.height;

		// 移动到画布中心并旋转
		// Move to canvas center and rotate
		tempCtx.translate(exportPlan.translateX, exportPlan.translateY);
		tempCtx.rotate(exportPlan.radians);
		tempCtx.drawImage(canvasEl, exportPlan.drawX, exportPlan.drawY);

		return tempCanvas.toDataURL(exportPlan.mimeType, exportPlan.quality);
	};

	// 确认按钮点击
	// Confirm button click
	const handleConfirm = () => {
		if (!canvasEl) return;

		const result: SignatureResult = resolveSignatureResult({ dataUrl: getRotatedDataUrl(0), hasDrawn });

		onconfirm?.(result);
	};

	// 导出方法供外部调用
	// Export methods for external use
	export function clear() {
		clearCanvas();
	}

	export function getSignature(rotation: SignatureRotation = 0): SignatureResult | null {
		if (!canvasEl) return null;

		return resolveSignatureResult({ dataUrl: getRotatedDataUrl(rotation), hasDrawn });
	}

	export function isEmpty(): boolean {
		return resolveSignatureEmpty(hasDrawn);
	}
</script>

<div class={signatureState.rootClass}>
	<!-- 画布容器 Canvas container -->
	<div
		bind:this={containerEl}
		class={signatureState.canvasContainerClass}
		style={signatureState.containerStyleString}
	>
		<!-- Canvas 画布 Canvas element -->
		<canvas
			bind:this={canvasEl}
			class={signatureState.canvasClass}
			onpointerdown={handlePointerDown}
			onpointermove={handlePointerMove}
			onpointerup={handlePointerUp}
			onpointercancel={handlePointerCancel}
			onpointerleave={handlePointerUp}
		></canvas>
	</div>

	<!-- 操作按钮 Action buttons -->
	{#if showButtons}
		<div class={signatureState.buttonRowClass}>
			<Button fill="line" size="md" customSize customWidth={80} customHeight={36} {...clearButton} onclick={handleClear}>
				{signatureState.texts.clearText}
			</Button>
			<Button fill="base" size="md" customSize customWidth={80} customHeight={36} {...confirmButton} onclick={handleConfirm}>
				{signatureState.texts.confirmText}
			</Button>
		</div>
	{/if}
</div>
