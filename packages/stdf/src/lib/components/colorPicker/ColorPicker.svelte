<script lang="ts">
	import type { ColorPickerProps, OklchColor, ColorPickerMode, ColorPickerValue } from '../../types/index.js';
	import Popup from '../popup/Popup.svelte';
	import Tab from '../tabs/Tab.svelte';
	import { throttleWithRAF } from '@any-tdf/common/utils';
	import {
		colorPickerDefaultColor,
		resolveColorPickerCloseAction,
		resolveColorPickerCopySuccessAction,
		resolveColorPickerCopyTipHideAction,
		resolveColorPickerDerived,
		resolveColorPickerDragAction,
		resolveColorPickerInputColor,
		resolveColorPickerInputKeyboardAction,
		resolveColorPickerInputNextColor,
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

	// 获取主题颜色作为默认值
	// Get theme color as default value
	const getThemeColor = (): OklchColor => {
		if (typeof window === 'undefined') return colorPickerDefaultColor;
		const colorVar = resolveColorPickerThemeColorVariable(document.documentElement.getAttribute('data-mode'));
		const colorValue = getComputedStyle(document.documentElement).getPropertyValue(colorVar).trim();
		return resolveColorPickerThemeColorFromCssValue(colorValue);
	};

	let {
		visible = $bindable(false),
		value = $bindable<ColorPickerValue | undefined>(undefined),
		modes = ['oklch', 'rgb', 'hex'],
		showPreview = true,
		showPanel = true,
		showInputs = true,
		showCopy = true,
		panelHeight = 160,
		sliderHeight = 24,
		radius = 'md',
		injClass = '',
		popup = {},
		tab = {},
		onchange,
		onclose,
		oncopy
	}: ColorPickerProps = $props();

	// 内部 OKLCH 颜色状态
	// Internal OKLCH color state
	let internalColor = $state<OklchColor>(resolveColorPickerInputColor({ value, themeColor: getThemeColor() }));

	// 当外部 value 变化时同步内部状态
	// Sync internal state when external value changes
	$effect(() => {
		// 公共解析函数不读取 DOM，主题色由组件层读取后传入。
		// Shared parser does not read the DOM; the component reads the theme color and passes it in.
		const parsed = resolveColorPickerInputColor({ value, themeColor: getThemeColor() });
		// 只有当值真正变化时才更新（避免循环）
		// Only update when value actually changes (avoid loop)
		if (resolveColorPickerShouldSyncColor(internalColor, parsed)) {
			internalColor = parsed;
		}
	});

	// 容器宽度（自适应）
	// Container width (adaptive)
	let containerWidth = $state(0);

	// 滑动条宽度（由于标签和输入框占据空间，滑动条实际宽度小于面板宽度）
	// Slider width (actual width is less than panel width due to labels and inputs)
	let sliderWidth = $state(0);

	// Canvas refs
	let panelCanvas = $state<HTMLCanvasElement | null>(null);
	let slider1Canvas = $state<HTMLCanvasElement | null>(null);
	let slider2Canvas = $state<HTMLCanvasElement | null>(null);
	let slider3Canvas = $state<HTMLCanvasElement | null>(null);

	// 交互状态
	// Interaction state
	let isDraggingPanel = $state(false);
	let isDragging1 = $state(false);
	let isDragging2 = $state(false);
	let isDragging3 = $state(false);

	// 当前模式索引
	// Current mode index
	let activeModeIndex = $state(0);

	// 输入框临时值
	// Input temporary values
	let input1 = $state('');
	let input2 = $state('');
	let input3 = $state('');

	// 复制提示
	// Copy tooltip
	let showCopyTip = $state(false);

	// 设备像素比
	// Device pixel ratio
	const dpr = resolveDevicePixelRatio({ value: typeof window !== 'undefined' ? window.devicePixelRatio : undefined });

	// 公共派生层只处理 ColorPicker 显示值、尺寸、样式和控制点，DOM 测量与 Canvas 绘制留在组件内。
	// Shared derived layer only handles ColorPicker display values, sizes, styles and control points; DOM measurement and Canvas drawing stay in the component.
	const colorPickerState = $derived(
		resolveColorPickerDerived(
			resolveColorPickerStateOptions({
				activeModeIndex,
				color: internalColor,
				containerWidth,
				props: {
					injClass,
					modes,
					panelHeight,
					popup,
					radius,
					sliderHeight
				},
				sliderWidth
			})
		)
	);
	const effectiveModes: ColorPickerMode[] = $derived(colorPickerState.effectiveModes);
	const colorMode = $derived<ColorPickerMode>(colorPickerState.colorMode);
	const panelWidth = $derived(colorPickerState.panelWidth);
	const wheelSize = $derived(colorPickerState.wheelSize);
	const colorDisplay = $derived(colorPickerState.colorDisplay);
	const currentRgb: [number, number, number] = $derived(colorPickerState.currentRgb);
	const currentHex = $derived(colorPickerState.currentHex);
	const currentOklch = $derived(colorPickerState.currentOklch);
	const currentRgbStr = $derived(colorPickerState.currentRgbStr);
	const isDirectMode = $derived(colorPickerState.isDirectMode);
	const contentClass = $derived(colorPickerState.contentClass);
	const colorPickerPopupProps = $derived(colorPickerState.popupProps);
	const tabLabels = $derived(colorPickerState.tabLabels);

	// 同步输入框值
	// Sync input values
	$effect(() => {
		const inputValues = colorPickerState.inputValues;
		input1 = inputValues[0];
		input2 = inputValues[1];
		input3 = inputValues[2];
	});

	// 更新颜色
	// Update color
	const updateColor = (newValue: OklchColor) => {
		// 公共 action 计算外部值和 direct change 输出，组件层只写状态和派发事件。
		// Shared action calculates external value and direct change output; the component layer only writes state and emits events.
		const action = resolveColorPickerUpdateAction({ color: newValue, modes: effectiveModes, isDirectMode });
		internalColor = newValue;
		value = action.nextValue;
		if (action.shouldEmitChange) {
			onchange?.(action.changeColors);
		}
	};

	// Popup 关闭处理
	// Popup close handler
	const handlePopupClose = () => {
		const action = resolveColorPickerCloseAction({ colorStrings: colorDisplay.colorStrings });
		if (action.shouldClose) visible = action.nextVisible;
		if (action.shouldEmitClose) onclose?.(action.closeValue);
	};

	// ==================== Canvas 绘制 ====================
	// ==================== Canvas Drawing ====================

	// 绘制颜色面板
	// Draw color panel
	const drawPanel = () => {
		const metrics = resolveColorPickerPanelCanvasMetrics({ mode: colorMode, panelWidth, panelHeight, wheelSize, dpr });
		if (!panelCanvas || !metrics.shouldDraw) return;
		panelCanvas.width = metrics.pixelWidth;
		panelCanvas.height = metrics.pixelHeight;

		const ctx = panelCanvas.getContext('2d');
		if (!ctx) return;
		const imageData = ctx.createImageData(panelCanvas.width, panelCanvas.height);
		// 公共函数只返回像素数据，Canvas 写入继续留在组件层。
		// Shared helper only returns pixel data; Canvas writes stay in the component layer.
		imageData.data.set(resolveColorPickerPanelBitmapData({ mode: colorMode, color: internalColor, rgb: currentRgb, width: panelCanvas.width, height: panelCanvas.height, dpr }));
		ctx.putImageData(imageData, 0, 0);
	};

	// 绘制单个滑动条，真实 Canvas API 仍在组件层调用。
	// Draw one slider; real Canvas APIs are still called in the component layer.
	const drawSlider = (canvas: HTMLCanvasElement | null, sliderIndex: 1 | 2 | 3) => {
		const metrics = resolveColorPickerSliderCanvasMetrics({ sliderWidth, sliderHeight, dpr });
		if (!canvas || !metrics.shouldDraw) return;
		canvas.width = metrics.pixelWidth;
		canvas.height = metrics.pixelHeight;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const imageData = ctx.createImageData(canvas.width, canvas.height);
		imageData.data.set(resolveColorPickerSliderBitmapData({ mode: colorMode, sliderIndex, color: internalColor, width: canvas.width, height: canvas.height }));
		ctx.putImageData(imageData, 0, 0);
	};

	// 绘制滑动条 1 (OKLCH: L / RGB: R)
	// Draw slider 1 (OKLCH: L / RGB: R)
	const drawSlider1 = () => drawSlider(slider1Canvas, 1);

	// 绘制滑动条 2 (OKLCH: C / RGB: G)
	// Draw slider 2 (OKLCH: C / RGB: G)
	const drawSlider2 = () => drawSlider(slider2Canvas, 2);

	// 绘制滑动条 3 (OKLCH: H / RGB: B)
	// Draw slider 3 (OKLCH: H / RGB: B)
	const drawSlider3 = () => drawSlider(slider3Canvas, 3);

	// ==================== 交互处理 ====================
	// ==================== Interaction Handling ====================

	// 面板交互
	// Panel interaction
	const handlePanelInteraction = (e: PointerEvent) => {
		if (!panelCanvas) return;
		const rect = panelCanvas.getBoundingClientRect();
		updateColor(
			resolveColorPickerPanelInteractionColor({
				mode: colorMode,
				color: internalColor,
				rgb: currentRgb,
				panelWidth,
				panelHeight,
				wheelSize,
				clientX: e.clientX,
				clientY: e.clientY,
				rectLeft: rect.left,
				rectTop: rect.top
			})
		);
	};

	// 滑动条 1 交互
	// Slider 1 interaction
	const handleSlider1Interaction = (e: PointerEvent) => {
		if (!slider1Canvas) return;
		const rect = slider1Canvas.getBoundingClientRect();
		updateColor(resolveColorPickerSliderInteractionColor({ mode: colorMode, sliderIndex: 1, color: internalColor, rgb: currentRgb, rectWidth: rect.width, clientX: e.clientX, rectLeft: rect.left }));
	};

	// 滑动条 2 交互
	// Slider 2 interaction
	const handleSlider2Interaction = (e: PointerEvent) => {
		if (!slider2Canvas) return;
		const rect = slider2Canvas.getBoundingClientRect();
		updateColor(resolveColorPickerSliderInteractionColor({ mode: colorMode, sliderIndex: 2, color: internalColor, rgb: currentRgb, rectWidth: rect.width, clientX: e.clientX, rectLeft: rect.left }));
	};

	// 滑动条 3 交互
	// Slider 3 interaction
	const handleSlider3Interaction = (e: PointerEvent) => {
		if (!slider3Canvas) return;
		const rect = slider3Canvas.getBoundingClientRect();
		updateColor(resolveColorPickerSliderInteractionColor({ mode: colorMode, sliderIndex: 3, color: internalColor, rgb: currentRgb, rectWidth: rect.width, clientX: e.clientX, rectLeft: rect.left }));
	};

	// Pointer 事件处理
	// Pointer event handlers
	const onPanelPointerDown = (e: PointerEvent) => {
		if (!panelCanvas) return;
		const action = resolveColorPickerDragAction({ target: 'panel', phase: 'start' });
		isDraggingPanel = action.nextDragging;
		panelCanvas.setPointerCapture(e.pointerId);
		if (action.shouldHandleInteraction) handlePanelInteraction(e);
	};
	const onPanelPointerMove = (e: PointerEvent) => {
		if (!isDraggingPanel) return;
		throttleWithRAF(handlePanelInteraction)(e);
	};
	const onPanelPointerUp = (e: PointerEvent) => {
		const action = resolveColorPickerDragAction({ target: 'panel', phase: 'end' });
		isDraggingPanel = action.nextDragging;
		if (panelCanvas?.hasPointerCapture(e.pointerId)) {
			panelCanvas.releasePointerCapture(e.pointerId);
		}
	};

	const setSliderDragging = (sliderIndex: 1 | 2 | 3, nextDragging: boolean) => {
		// 公共函数只计算拖拽标记分发，组件层负责写入本地状态。
		// Shared helper only calculates drag-flag distribution; this component writes local state.
		const state = resolveColorPickerSliderDraggingState({ isDragging1, isDragging2, isDragging3, sliderIndex, nextDragging });
		isDragging1 = state.isDragging1;
		isDragging2 = state.isDragging2;
		isDragging3 = state.isDragging3;
	};

	const onSlider1PointerDown = (e: PointerEvent) => {
		if (!slider1Canvas) return;
		const action = resolveColorPickerDragAction({ target: 1, phase: 'start' });
		setSliderDragging(1, action.nextDragging);
		slider1Canvas.setPointerCapture(e.pointerId);
		if (action.shouldHandleInteraction) handleSlider1Interaction(e);
	};
	const onSlider1PointerMove = (e: PointerEvent) => {
		const action = resolveColorPickerSliderMoveAction({ sliderIndex: 1, isDragging1, isDragging2, isDragging3 });
		if (!action.shouldHandleInteraction) return;
		throttleWithRAF(handleSlider1Interaction)(e);
	};
	const onSlider1PointerUp = (e: PointerEvent) => {
		const action = resolveColorPickerDragAction({ target: 1, phase: 'end' });
		setSliderDragging(1, action.nextDragging);
		if (slider1Canvas?.hasPointerCapture(e.pointerId)) {
			slider1Canvas.releasePointerCapture(e.pointerId);
		}
	};

	const onSlider2PointerDown = (e: PointerEvent) => {
		if (!slider2Canvas) return;
		const action = resolveColorPickerDragAction({ target: 2, phase: 'start' });
		setSliderDragging(2, action.nextDragging);
		slider2Canvas.setPointerCapture(e.pointerId);
		if (action.shouldHandleInteraction) handleSlider2Interaction(e);
	};
	const onSlider2PointerMove = (e: PointerEvent) => {
		const action = resolveColorPickerSliderMoveAction({ sliderIndex: 2, isDragging1, isDragging2, isDragging3 });
		if (!action.shouldHandleInteraction) return;
		throttleWithRAF(handleSlider2Interaction)(e);
	};
	const onSlider2PointerUp = (e: PointerEvent) => {
		const action = resolveColorPickerDragAction({ target: 2, phase: 'end' });
		setSliderDragging(2, action.nextDragging);
		if (slider2Canvas?.hasPointerCapture(e.pointerId)) {
			slider2Canvas.releasePointerCapture(e.pointerId);
		}
	};

	const onSlider3PointerDown = (e: PointerEvent) => {
		if (!slider3Canvas) return;
		const action = resolveColorPickerDragAction({ target: 3, phase: 'start' });
		setSliderDragging(3, action.nextDragging);
		slider3Canvas.setPointerCapture(e.pointerId);
		if (action.shouldHandleInteraction) handleSlider3Interaction(e);
	};
	const onSlider3PointerMove = (e: PointerEvent) => {
		const action = resolveColorPickerSliderMoveAction({ sliderIndex: 3, isDragging1, isDragging2, isDragging3 });
		if (!action.shouldHandleInteraction) return;
		throttleWithRAF(handleSlider3Interaction)(e);
	};
	const onSlider3PointerUp = (e: PointerEvent) => {
		const action = resolveColorPickerDragAction({ target: 3, phase: 'end' });
		setSliderDragging(3, action.nextDragging);
		if (slider3Canvas?.hasPointerCapture(e.pointerId)) {
			slider3Canvas.releasePointerCapture(e.pointerId);
		}
	};

	// ==================== 输入框处理 ====================
	// ==================== Input Handling ====================

	const onBlur1 = () => {
		const nextColor = resolveColorPickerInputNextColor({ mode: colorMode, inputIndex: 1, input: input1, color: internalColor, rgb: currentRgb });
		if (nextColor) updateColor(nextColor);
	};

	const onBlur2 = () => {
		const nextColor = resolveColorPickerInputNextColor({ mode: colorMode, inputIndex: 2, input: input2, color: internalColor, rgb: currentRgb });
		if (nextColor) updateColor(nextColor);
	};

	const onBlur3 = () => {
		const nextColor = resolveColorPickerInputNextColor({ mode: colorMode, inputIndex: 3, input: input3, color: internalColor, rgb: currentRgb });
		if (nextColor) updateColor(nextColor);
	};

	const onKeydown = (e: KeyboardEvent, blurFn: () => void) => {
		// 公共 action 只判断输入框按键是否提交，实际提交函数留在组件层。
		// Shared action only decides whether the input key commits; the commit function stays in the component layer.
		const action = resolveColorPickerInputKeyboardAction({ key: e.key });
		if (action.shouldCommit) blurFn();
	};

	// ==================== 复制功能 ====================
	// ==================== Copy Functionality ====================

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			const action = resolveColorPickerCopySuccessAction({ text });
			if (action.shouldEmitCopy) oncopy?.(action.copyText);
			showCopyTip = action.nextShowCopyTip;
			setTimeout(() => {
				const hideAction = resolveColorPickerCopyTipHideAction();
				showCopyTip = hideAction.nextShowCopyTip;
			}, action.hideDelay);
		} catch (err) {
			console.error('Copy failed:', err);
		}
	};

	// ==================== 响应式绘制 ====================
	// ==================== Reactive Drawing ====================

	// 监听 visible 变化，重新打开时延迟绘制
	// Watch visible change, delay drawing when reopened
	$effect(() => {
		if (visible && panelWidth > 0 && sliderWidth > 0) {
			// 使用 setTimeout 确保 canvas 已渲染
			// Use setTimeout to ensure canvas is rendered
			setTimeout(() => {
				drawPanel();
				drawSlider1();
				drawSlider2();
				drawSlider3();
			}, 50);
		}
	});

	$effect(() => {
		if (panelWidth > 0) {
			drawPanel();
		}
	});

	// 滑动条宽度变化时重绘
	// Redraw when slider width changes
	$effect(() => {
		if (sliderWidth > 0) {
			drawSlider1();
			drawSlider2();
			drawSlider3();
		}
	});

	$effect(() => {
		void internalColor.h;
		void internalColor.l;
		void internalColor.c;
		void colorMode;
		if (panelWidth > 0) {
			drawPanel();
		}
		if (sliderWidth > 0) {
			drawSlider1();
			drawSlider2();
			drawSlider3();
		}
	});
</script>

	{#snippet pickerContent()}
		<div class={contentClass}>
			<div class={colorPickerState.containerMeasureClass} bind:clientWidth={containerWidth}></div>
		<!-- 颜色预览 -->
		<!-- Color preview -->
		{#if showPreview}
			<div class={colorPickerState.previewRowClass}>
				<div
					class={colorPickerState.previewClass}
					style={colorPickerState.previewStyleString}
				></div>
				<div class={colorPickerState.previewTextClass}>
					{#if showCopy}
						<button
							onclick={() => copyToClipboard(currentHex)}
							class={colorPickerState.copyButtonClass}
						>
							{currentHex}
						</button>
						<button
							onclick={() => copyToClipboard(currentRgbStr)}
							class={colorPickerState.copyButtonClass}
						>
							{currentRgbStr}
						</button>
						<button
							onclick={() => copyToClipboard(currentOklch)}
							class={colorPickerState.copyLastButtonClass}
						>
							{currentOklch}
						</button>
					{:else}
						<div class={colorPickerState.displayValueClass}>{currentHex}</div>
						<div class={colorPickerState.displayValueClass}>{currentRgbStr}</div>
						<div class={colorPickerState.displayLastValueClass}>{currentOklch}</div>
					{/if}
					{#if showCopyTip}
						<div class={colorPickerState.copyTipClass}>
							Copied
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- 颜色面板 -->
		<!-- Color panel -->
		{#if showPanel}
			<div class={colorPickerState.panelWrapperClass}>
				<canvas
					bind:this={panelCanvas}
					style={colorPickerState.panelSizeStyleString}
					class={colorPickerState.panelCanvasClass}
					onpointerdown={onPanelPointerDown}
					onpointermove={onPanelPointerMove}
					onpointerup={onPanelPointerUp}
					onpointercancel={onPanelPointerUp}
				></canvas>
				<div
					class={colorPickerState.panelMarkerClass}
					style={colorPickerState.panelMarkerStyleString}
				></div>
			</div>
		{/if}

		<!-- 滑动条 1 -->
		<!-- Slider 1 -->
		<div class={colorPickerState.sliderRowClass}>
			{#if showInputs}
				<span class={colorPickerState.sliderLabelClass}>{colorPickerState.labels[0]}</span>
			{/if}
			<div class={colorPickerState.sliderTrackClass} bind:clientWidth={sliderWidth}>
				<canvas
					bind:this={slider1Canvas}
					style={colorPickerState.sliderCanvasStyleString}
					class={colorPickerState.sliderCanvasClass}
					onpointerdown={onSlider1PointerDown}
					onpointermove={onSlider1PointerMove}
					onpointerup={onSlider1PointerUp}
					onpointercancel={onSlider1PointerUp}
				></canvas>
				<div
					class={colorPickerState.sliderHandleClass}
					style={colorPickerState.slider1.handleStyleString}
				></div>
			</div>
			{#if showInputs}
				<input
					type="text"
					bind:value={input1}
					onblur={onBlur1}
					onkeydown={(e) => onKeydown(e, onBlur1)}
					class={colorPickerState.inputClass}
				/>
			{/if}
		</div>

		<!-- 滑动条 2 -->
		<!-- Slider 2 -->
		<div class={colorPickerState.sliderRowClass}>
			{#if showInputs}
				<span class={colorPickerState.sliderLabelClass}>{colorPickerState.labels[1]}</span>
			{/if}
			<div class={colorPickerState.sliderTrackClass}>
				<canvas
					bind:this={slider2Canvas}
					style={colorPickerState.sliderCanvasStyleString}
					class={colorPickerState.sliderCanvasClass}
					onpointerdown={onSlider2PointerDown}
					onpointermove={onSlider2PointerMove}
					onpointerup={onSlider2PointerUp}
					onpointercancel={onSlider2PointerUp}
				></canvas>
				<div
					class={colorPickerState.sliderHandleClass}
					style={colorPickerState.slider2.handleStyleString}
				></div>
			</div>
			{#if showInputs}
				<input
					type="text"
					bind:value={input2}
					onblur={onBlur2}
					onkeydown={(e) => onKeydown(e, onBlur2)}
					class={colorPickerState.inputClass}
				/>
			{/if}
		</div>

		<!-- 滑动条 3 -->
		<!-- Slider 3 -->
		<div class={colorPickerState.sliderLastRowClass}>
			{#if showInputs}
				<span class={colorPickerState.sliderLabelClass}>{colorPickerState.labels[2]}</span>
			{/if}
			<div class={colorPickerState.sliderTrackClass}>
				<canvas
					bind:this={slider3Canvas}
					style={colorPickerState.sliderCanvasStyleString}
					class={colorPickerState.sliderCanvasClass}
					onpointerdown={onSlider3PointerDown}
					onpointermove={onSlider3PointerMove}
					onpointerup={onSlider3PointerUp}
					onpointercancel={onSlider3PointerUp}
				></canvas>
				<div
					class={colorPickerState.sliderHandleClass}
					style={colorPickerState.slider3.handleStyleString}
				></div>
			</div>
			{#if showInputs}
				<input
					type="text"
					bind:value={input3}
					onblur={onBlur3}
					onkeydown={(e) => onKeydown(e, onBlur3)}
					class={colorPickerState.inputClass}
				/>
			{/if}
		</div>

		<!-- 模式切换 Tab -->
		<!-- Mode switch Tab -->
		{#if effectiveModes.length > 1}
			<Tab labels={tabLabels} bind:active={activeModeIndex} mx="0" {...tab} />
		{/if}
	</div>
{/snippet}

<!-- 根据 popup 参数决定渲染方式 -->
<!-- Render based on popup parameter -->
{#if isDirectMode}
	<!-- 直接显示模式 -->
	<!-- Direct display mode -->
	{@render pickerContent()}
{:else}
	<!-- Popup 模式 -->
	<!-- Popup mode -->
	<Popup bind:visible {...colorPickerPopupProps} onclose={handlePopupClose}>
		{@render pickerContent()}
	</Popup>
{/if}
