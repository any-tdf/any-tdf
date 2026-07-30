import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ColorPickerMode, ColorPickerProps, OklchColor } from '../../types';
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
import Popup from '../popup';
import Tab from '../tabs/tab';
import { throttleWithRAF } from '@any-tdf/common/utils';
import { splitPopupCallbacks, splitTabCallbacks } from '@any-tdf/common/derived/props';

const ColorPicker: React.FC<ColorPickerProps> = ({
	visible: visibleProp,
	value: valueProp,
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
	onChange,
	onClose,
	onCopy
}) => {
	const [innerVisible, setInnerVisible] = useState(() => resolveColorPickerInitialVisible(visibleProp));
	const visible = innerVisible;
	const { popupProps, popupOnClose } = splitPopupCallbacks(popup);
	const { tabProps, tabOnClickTab } = splitTabCallbacks(tab);

	useEffect(() => {
		setInnerVisible(resolveColorPickerInitialVisible(visibleProp));
	}, [visibleProp]);

	const [activeModeIndex, setActiveModeIndex] = useState(0);
	const handleModeTabClick = useCallback(
		(index: number) => {
			tabOnClickTab?.(index);
			setActiveModeIndex(index);
		},
		[tabOnClickTab]
	);

	const getThemeColor = useCallback((): OklchColor => {
		if (typeof window === 'undefined') return colorPickerDefaultColor;
		const colorVar = resolveColorPickerThemeColorVariable(document.documentElement.getAttribute('data-mode'));
		const colorValue = getComputedStyle(document.documentElement).getPropertyValue(colorVar).trim();
		return resolveColorPickerThemeColorFromCssValue(colorValue);
	}, []);

	const [internalColor, setInternalColor] = useState<OklchColor>(() =>
		resolveColorPickerInputColor({ value: valueProp, themeColor: getThemeColor() })
	);

	useEffect(() => {
		// 公共解析函数不读取 DOM，主题色由组件层读取后传入。
		// Shared parser does not read the DOM; the component reads the theme color and passes it in.
		const parsed = resolveColorPickerInputColor({ value: valueProp, themeColor: getThemeColor() });
		setInternalColor((prev) => {
			if (resolveColorPickerShouldSyncColor(prev, parsed)) {
				return parsed;
			}
			return prev;
		});
	}, [valueProp, getThemeColor]);

	const [containerWidth, setContainerWidth] = useState(0);
	const [sliderWidth, setSliderWidth] = useState(0);
	const dpr = resolveDevicePixelRatio({
		value: typeof window !== 'undefined' ? window.devicePixelRatio : undefined
	});

	// 公共派生层只处理 ColorPicker 显示值、尺寸、样式和控制点，DOM 测量与 Canvas 绘制留在组件内。
	// Shared derived layer only handles ColorPicker display values, sizes, styles and control points; DOM measurement and Canvas drawing stay in the component.
	const colorPickerState = useMemo(
		() =>
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
						popupProps,
						radius,
						sliderHeight
					},
					sliderWidth
				})
			),
		[activeModeIndex, containerWidth, injClass, internalColor, modes, panelHeight, popup, popupProps, radius, sliderHeight, sliderWidth]
	);
	const effectiveModes: ColorPickerMode[] = colorPickerState.effectiveModes;
	const colorMode = colorPickerState.colorMode;
	const currentRgb: [number, number, number] = colorPickerState.currentRgb;
	const currentHex = colorPickerState.currentHex;
	const currentOklch = colorPickerState.currentOklch;
	const currentRgbStr = colorPickerState.currentRgbStr;
	const colorStrings = colorPickerState.colorStrings;
	const contentClass = colorPickerState.contentClass;
	const isDirectMode = colorPickerState.isDirectMode;
	const panelWidth = colorPickerState.panelWidth;
	const wheelSize = colorPickerState.wheelSize;
	const colorPickerPopupProps = colorPickerState.popupProps;

	useEffect(() => {
		if (colorPickerState.safeActiveModeIndex !== activeModeIndex) {
			setActiveModeIndex(colorPickerState.safeActiveModeIndex);
		}
	}, [activeModeIndex, colorPickerState.safeActiveModeIndex]);

	const emitChange = useCallback(
		(colors: string[]) => {
			onChange?.(colors);
		},
		[onChange]
	);
	const emitClose = useCallback(
		(colors: string[]) => {
			onClose?.(colors);
		},
		[onClose]
	);
	const emitCopy = useCallback(
		(text: string) => {
			onCopy?.(text);
		},
		[onCopy]
	);

	const updateColor = useCallback(
		(next: OklchColor) => {
			// 公共 action 计算 direct change 输出，组件层只写状态和派发事件。
			// Shared action calculates direct change output; the component layer only writes state and emits events.
			const action = resolveColorPickerUpdateAction({
				color: next,
				modes: effectiveModes,
				isDirectMode
			});
			setInternalColor(next);
			if (action.shouldEmitChange) {
				emitChange(action.changeColors);
			}
		},
		[effectiveModes, emitChange, isDirectMode]
	);

	const panelCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const slider1CanvasRef = useRef<HTMLCanvasElement | null>(null);
	const slider2CanvasRef = useRef<HTMLCanvasElement | null>(null);
	const slider3CanvasRef = useRef<HTMLCanvasElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const sliderRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		const updateSize = () => {
			setContainerWidth(resolveColorPickerMeasuredClientWidth(container));
		};
		updateSize();
		const observer = new ResizeObserver(updateSize);
		observer.observe(container);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const slider = sliderRef.current;
		if (!slider) return;
		const updateSize = () => {
			setSliderWidth(resolveColorPickerMeasuredClientWidth(slider));
		};
		updateSize();
		const observer = new ResizeObserver(updateSize);
		observer.observe(slider);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!visible) return;
		const timer = window.setTimeout(() => {
			setContainerWidth(resolveColorPickerMeasuredClientWidth(containerRef.current));
			setSliderWidth(resolveColorPickerMeasuredClientWidth(sliderRef.current));
		}, 50);
		return () => window.clearTimeout(timer);
	}, [visible]);

	const [input1, setInput1] = useState('');
	const [input2, setInput2] = useState('');
	const [input3, setInput3] = useState('');
	const [showCopyTip, setShowCopyTip] = useState(false);
	const copyTimeoutRef = useRef<number | null>(null);

	useEffect(() => {
		const inputValues = colorPickerState.inputValues;
		setInput1(inputValues[0]);
		setInput2(inputValues[1]);
		setInput3(inputValues[2]);
	}, [colorPickerState.inputValues]);

	const drawPanel = useCallback(() => {
		const panelCanvas = panelCanvasRef.current;
		const metrics = resolveColorPickerPanelCanvasMetrics({
			mode: colorMode,
			panelWidth,
			panelHeight,
			wheelSize,
			dpr
		});
		if (!panelCanvas || !metrics.shouldDraw) return;
		panelCanvas.width = metrics.pixelWidth;
		panelCanvas.height = metrics.pixelHeight;

		const ctx = panelCanvas.getContext('2d');
		if (!ctx) return;
		const imageData = ctx.createImageData(panelCanvas.width, panelCanvas.height);
		// 公共函数只返回像素数据，Canvas 写入继续留在组件层。
		// Shared helper only returns pixel data; Canvas writes stay in the component layer.
		imageData.data.set(
			resolveColorPickerPanelBitmapData({
				mode: colorMode,
				color: internalColor,
				rgb: currentRgb,
				width: panelCanvas.width,
				height: panelCanvas.height,
				dpr
			})
		);
		ctx.putImageData(imageData, 0, 0);
	}, [colorMode, currentRgb, dpr, internalColor, panelHeight, panelWidth, wheelSize]);

	const drawSlider = useCallback(
		(sliderCanvas: HTMLCanvasElement | null, sliderIndex: 1 | 2 | 3) => {
			const metrics = resolveColorPickerSliderCanvasMetrics({ sliderWidth, sliderHeight, dpr });
			if (!sliderCanvas || !metrics.shouldDraw) return;
			sliderCanvas.width = metrics.pixelWidth;
			sliderCanvas.height = metrics.pixelHeight;
			const ctx = sliderCanvas.getContext('2d');
			if (!ctx) return;
			const imageData = ctx.createImageData(sliderCanvas.width, sliderCanvas.height);
			imageData.data.set(
				resolveColorPickerSliderBitmapData({
					mode: colorMode,
					sliderIndex,
					color: internalColor,
					width: sliderCanvas.width,
					height: sliderCanvas.height
				})
			);
			ctx.putImageData(imageData, 0, 0);
		},
		[colorMode, dpr, internalColor, sliderHeight, sliderWidth]
	);

	const drawSlider1 = useCallback(() => drawSlider(slider1CanvasRef.current, 1), [drawSlider]);

	const drawSlider2 = useCallback(() => drawSlider(slider2CanvasRef.current, 2), [drawSlider]);

	const drawSlider3 = useCallback(() => drawSlider(slider3CanvasRef.current, 3), [drawSlider]);

	useEffect(() => {
		if (visible && panelWidth > 0 && sliderWidth > 0) {
			const timer = window.setTimeout(() => {
				drawPanel();
				drawSlider1();
				drawSlider2();
				drawSlider3();
			}, 50);
			return () => window.clearTimeout(timer);
		}
		return undefined;
	}, [drawPanel, drawSlider1, drawSlider2, drawSlider3, panelWidth, sliderWidth, visible]);

	useEffect(() => {
		if (panelWidth > 0) {
			drawPanel();
		}
	}, [drawPanel, panelWidth]);

	useEffect(() => {
		if (sliderWidth > 0) {
			drawSlider1();
			drawSlider2();
			drawSlider3();
		}
	}, [drawSlider1, drawSlider2, drawSlider3, sliderWidth]);

	useEffect(() => {
		if (panelWidth > 0) {
			drawPanel();
		}
		if (sliderWidth > 0) {
			drawSlider1();
			drawSlider2();
			drawSlider3();
		}
	}, [colorMode, drawPanel, drawSlider1, drawSlider2, drawSlider3, internalColor, panelWidth, sliderWidth]);

	const handlePanelInteraction = useCallback(
		(event: PointerEvent) => {
			const panelCanvas = panelCanvasRef.current;
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
					clientX: event.clientX,
					clientY: event.clientY,
					rectLeft: rect.left,
					rectTop: rect.top
				})
			);
		},
		[colorMode, currentRgb, internalColor, panelHeight, panelWidth, updateColor, wheelSize]
	);

	const handleSlider1Interaction = useCallback(
		(event: PointerEvent) => {
			const sliderCanvas = slider1CanvasRef.current;
			if (!sliderCanvas) return;
			const rect = sliderCanvas.getBoundingClientRect();
			updateColor(
				resolveColorPickerSliderInteractionColor({
					mode: colorMode,
					sliderIndex: 1,
					color: internalColor,
					rgb: currentRgb,
					rectWidth: rect.width,
					clientX: event.clientX,
					rectLeft: rect.left
				})
			);
		},
		[colorMode, currentRgb, internalColor, updateColor]
	);

	const handleSlider2Interaction = useCallback(
		(event: PointerEvent) => {
			const sliderCanvas = slider2CanvasRef.current;
			if (!sliderCanvas) return;
			const rect = sliderCanvas.getBoundingClientRect();
			updateColor(
				resolveColorPickerSliderInteractionColor({
					mode: colorMode,
					sliderIndex: 2,
					color: internalColor,
					rgb: currentRgb,
					rectWidth: rect.width,
					clientX: event.clientX,
					rectLeft: rect.left
				})
			);
		},
		[colorMode, currentRgb, internalColor, updateColor]
	);

	const handleSlider3Interaction = useCallback(
		(event: PointerEvent) => {
			const sliderCanvas = slider3CanvasRef.current;
			if (!sliderCanvas) return;
			const rect = sliderCanvas.getBoundingClientRect();
			updateColor(
				resolveColorPickerSliderInteractionColor({
					mode: colorMode,
					sliderIndex: 3,
					color: internalColor,
					rgb: currentRgb,
					rectWidth: rect.width,
					clientX: event.clientX,
					rectLeft: rect.left
				})
			);
		},
		[colorMode, currentRgb, internalColor, updateColor]
	);

	const throttledPanelInteraction = useMemo(() => throttleWithRAF(handlePanelInteraction), [handlePanelInteraction]);
	const throttledSlider1Interaction = useMemo(() => throttleWithRAF(handleSlider1Interaction), [handleSlider1Interaction]);
	const throttledSlider2Interaction = useMemo(() => throttleWithRAF(handleSlider2Interaction), [handleSlider2Interaction]);
	const throttledSlider3Interaction = useMemo(() => throttleWithRAF(handleSlider3Interaction), [handleSlider3Interaction]);

	useEffect(() => {
		return () => {
			throttledPanelInteraction.clear?.();
			throttledSlider1Interaction.clear?.();
			throttledSlider2Interaction.clear?.();
			throttledSlider3Interaction.clear?.();
		};
	}, [throttledPanelInteraction, throttledSlider1Interaction, throttledSlider2Interaction, throttledSlider3Interaction]);

	const isDraggingPanelRef = useRef(false);
	const isDragging1Ref = useRef(false);
	const isDragging2Ref = useRef(false);
	const isDragging3Ref = useRef(false);

	const setSliderDragging = (sliderIndex: 1 | 2 | 3, nextDragging: boolean) => {
		// 公共函数只计算拖拽标记分发，组件层负责写入 ref。
		// Shared helper only calculates drag-flag distribution; this component writes refs.
		const state = resolveColorPickerSliderDraggingState({
			isDragging1: isDragging1Ref.current,
			isDragging2: isDragging2Ref.current,
			isDragging3: isDragging3Ref.current,
			sliderIndex,
			nextDragging
		});
		isDragging1Ref.current = state.isDragging1;
		isDragging2Ref.current = state.isDragging2;
		isDragging3Ref.current = state.isDragging3;
	};

	const shouldHandleSliderMove = (sliderIndex: 1 | 2 | 3) =>
		resolveColorPickerSliderMoveAction({
			sliderIndex,
			isDragging1: isDragging1Ref.current,
			isDragging2: isDragging2Ref.current,
			isDragging3: isDragging3Ref.current
		}).shouldHandleInteraction;

	const onPanelPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
		const action = resolveColorPickerDragAction({ target: 'panel', phase: 'start' });
		isDraggingPanelRef.current = action.nextDragging;
		event.currentTarget.setPointerCapture(event.pointerId);
		if (action.shouldHandleInteraction) handlePanelInteraction(event.nativeEvent);
	};

	const onPanelPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
		if (!isDraggingPanelRef.current) return;
		throttledPanelInteraction(event.nativeEvent);
	};

	const onPanelPointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
		const action = resolveColorPickerDragAction({ target: 'panel', phase: 'end' });
		isDraggingPanelRef.current = action.nextDragging;
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
	};

	const onSlider1PointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
		const action = resolveColorPickerDragAction({ target: 1, phase: 'start' });
		setSliderDragging(1, action.nextDragging);
		event.currentTarget.setPointerCapture(event.pointerId);
		if (action.shouldHandleInteraction) handleSlider1Interaction(event.nativeEvent);
	};

	const onSlider1PointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
		if (!shouldHandleSliderMove(1)) return;
		throttledSlider1Interaction(event.nativeEvent);
	};

	const onSlider1PointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
		const action = resolveColorPickerDragAction({ target: 1, phase: 'end' });
		setSliderDragging(1, action.nextDragging);
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
	};

	const onSlider2PointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
		const action = resolveColorPickerDragAction({ target: 2, phase: 'start' });
		setSliderDragging(2, action.nextDragging);
		event.currentTarget.setPointerCapture(event.pointerId);
		if (action.shouldHandleInteraction) handleSlider2Interaction(event.nativeEvent);
	};

	const onSlider2PointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
		if (!shouldHandleSliderMove(2)) return;
		throttledSlider2Interaction(event.nativeEvent);
	};

	const onSlider2PointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
		const action = resolveColorPickerDragAction({ target: 2, phase: 'end' });
		setSliderDragging(2, action.nextDragging);
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
	};

	const onSlider3PointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
		const action = resolveColorPickerDragAction({ target: 3, phase: 'start' });
		setSliderDragging(3, action.nextDragging);
		event.currentTarget.setPointerCapture(event.pointerId);
		if (action.shouldHandleInteraction) handleSlider3Interaction(event.nativeEvent);
	};

	const onSlider3PointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
		if (!shouldHandleSliderMove(3)) return;
		throttledSlider3Interaction(event.nativeEvent);
	};

	const onSlider3PointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
		const action = resolveColorPickerDragAction({ target: 3, phase: 'end' });
		setSliderDragging(3, action.nextDragging);
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
	};

	const onBlur1 = () => {
		const nextColor = resolveColorPickerInputNextColor({
			mode: colorMode,
			inputIndex: 1,
			input: input1,
			color: internalColor,
			rgb: currentRgb
		});
		if (nextColor) updateColor(nextColor);
	};

	const onBlur2 = () => {
		const nextColor = resolveColorPickerInputNextColor({
			mode: colorMode,
			inputIndex: 2,
			input: input2,
			color: internalColor,
			rgb: currentRgb
		});
		if (nextColor) updateColor(nextColor);
	};

	const onBlur3 = () => {
		const nextColor = resolveColorPickerInputNextColor({
			mode: colorMode,
			inputIndex: 3,
			input: input3,
			color: internalColor,
			rgb: currentRgb
		});
		if (nextColor) updateColor(nextColor);
	};

	const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>, blurFn: () => void) => {
		// 公共 action 只判断输入框按键是否提交，实际提交函数留在组件层。
		// Shared action only decides whether the input key commits; the commit function stays in the component layer.
		const action = resolveColorPickerInputKeyboardAction({ key: event.key });
		if (action.shouldCommit) blurFn();
	};

	const copyToClipboard = useCallback(
		async (text: string) => {
			if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) return;
			await navigator.clipboard.writeText(text);
			const action = resolveColorPickerCopySuccessAction({ text });
			if (action.shouldEmitCopy) emitCopy(action.copyText);
			setShowCopyTip(action.nextShowCopyTip);
			if (copyTimeoutRef.current) {
				window.clearTimeout(copyTimeoutRef.current);
			}
			copyTimeoutRef.current = window.setTimeout(() => {
				const hideAction = resolveColorPickerCopyTipHideAction();
				setShowCopyTip(hideAction.nextShowCopyTip);
			}, action.hideDelay);
		},
		[emitCopy]
	);

	useEffect(() => {
		return () => {
			if (copyTimeoutRef.current) {
				window.clearTimeout(copyTimeoutRef.current);
			}
		};
	}, []);

	const handlePopupClose = useCallback(() => {
		const action = resolveColorPickerCloseAction({ colorStrings });
		if (action.shouldClose) setInnerVisible(action.nextVisible);
		if (action.shouldEmitClose) emitClose(action.closeValue);
		if (action.shouldEmitClose) popupOnClose?.();
	}, [colorStrings, emitClose, popupOnClose]);

	const content = (
		<div className={contentClass}>
			<div ref={containerRef} className={colorPickerState.containerMeasureClass} />
			{showPreview ? (
				<div className={colorPickerState.previewRowClass}>
					<div className={colorPickerState.previewClass} style={colorPickerState.previewStyleValue} />
					<div className={colorPickerState.previewTextClass}>
						{showCopy ? (
							<>
								<button type="button" onClick={() => void copyToClipboard(currentHex)} className={colorPickerState.copyButtonClass}>
									{currentHex}
								</button>
								<button type="button" onClick={() => void copyToClipboard(currentRgbStr)} className={colorPickerState.copyButtonClass}>
									{currentRgbStr}
								</button>
								<button type="button" onClick={() => void copyToClipboard(currentOklch)} className={colorPickerState.copyLastButtonClass}>
									{currentOklch}
								</button>
							</>
						) : (
							<>
								<div className={colorPickerState.displayValueClass}>{currentHex}</div>
								<div className={colorPickerState.displayValueClass}>{currentRgbStr}</div>
								<div className={colorPickerState.displayLastValueClass}>{currentOklch}</div>
							</>
						)}
						{showCopyTip ? <div className={colorPickerState.copyTipClass}>Copied</div> : null}
					</div>
				</div>
			) : null}

			{showPanel ? (
				<div className={colorPickerState.panelWrapperClass}>
					<canvas
						ref={panelCanvasRef}
						style={colorPickerState.panelSizeStyleValue}
						className={colorPickerState.panelCanvasClass}
						onPointerDown={onPanelPointerDown}
						onPointerMove={onPanelPointerMove}
						onPointerUp={onPanelPointerUp}
						onPointerCancel={onPanelPointerUp}
					/>
					<div className={colorPickerState.panelMarkerClass} style={colorPickerState.panelMarkerStyleValue} />
				</div>
			) : null}

			<div className={colorPickerState.sliderRowClass}>
				{showInputs ? <span className={colorPickerState.sliderLabelClass}>{colorPickerState.labels[0]}</span> : null}
				<div ref={sliderRef} className={colorPickerState.sliderTrackClass}>
					<canvas
						ref={slider1CanvasRef}
						style={colorPickerState.sliderCanvasStyleValue}
						className={colorPickerState.sliderCanvasClass}
						onPointerDown={onSlider1PointerDown}
						onPointerMove={onSlider1PointerMove}
						onPointerUp={onSlider1PointerUp}
						onPointerCancel={onSlider1PointerUp}
					/>
					<div className={colorPickerState.sliderHandleClass} style={colorPickerState.slider1.handleStyleValue} />
				</div>
				{showInputs ? (
					<input
						type="text"
						value={input1}
						onChange={(event) => setInput1(event.target.value)}
						onBlur={onBlur1}
						onKeyDown={(event) => onKeydown(event, onBlur1)}
						className={colorPickerState.inputClass}
					/>
				) : null}
			</div>

			<div className={colorPickerState.sliderRowClass}>
				{showInputs ? <span className={colorPickerState.sliderLabelClass}>{colorPickerState.labels[1]}</span> : null}
				<div className={colorPickerState.sliderTrackClass}>
					<canvas
						ref={slider2CanvasRef}
						style={colorPickerState.sliderCanvasStyleValue}
						className={colorPickerState.sliderCanvasClass}
						onPointerDown={onSlider2PointerDown}
						onPointerMove={onSlider2PointerMove}
						onPointerUp={onSlider2PointerUp}
						onPointerCancel={onSlider2PointerUp}
					/>
					<div className={colorPickerState.sliderHandleClass} style={colorPickerState.slider2.handleStyleValue} />
				</div>
				{showInputs ? (
					<input
						type="text"
						value={input2}
						onChange={(event) => setInput2(event.target.value)}
						onBlur={onBlur2}
						onKeyDown={(event) => onKeydown(event, onBlur2)}
						className={colorPickerState.inputClass}
					/>
				) : null}
			</div>

			<div className={colorPickerState.sliderLastRowClass}>
				{showInputs ? <span className={colorPickerState.sliderLabelClass}>{colorPickerState.labels[2]}</span> : null}
				<div className={colorPickerState.sliderTrackClass}>
					<canvas
						ref={slider3CanvasRef}
						style={colorPickerState.sliderCanvasStyleValue}
						className={colorPickerState.sliderCanvasClass}
						onPointerDown={onSlider3PointerDown}
						onPointerMove={onSlider3PointerMove}
						onPointerUp={onSlider3PointerUp}
						onPointerCancel={onSlider3PointerUp}
					/>
					<div className={colorPickerState.sliderHandleClass} style={colorPickerState.slider3.handleStyleValue} />
				</div>
				{showInputs ? (
					<input
						type="text"
						value={input3}
						onChange={(event) => setInput3(event.target.value)}
						onBlur={onBlur3}
						onKeyDown={(event) => onKeydown(event, onBlur3)}
						className={colorPickerState.inputClass}
					/>
				) : null}
			</div>

			{effectiveModes.length > 1 ? (
				<Tab
					{...tabProps}
					labels={colorPickerState.tabLabels}
					active={activeModeIndex}
					onClickTab={handleModeTabClick}
					mx={tabProps.mx ?? '0'}
				/>
			) : null}
		</div>
	);

	if (isDirectMode) {
		return content;
	}

	return (
		<Popup visible={visible} {...colorPickerPopupProps} onClose={handlePopupClose}>
			{content}
		</Popup>
	);
};

export default ColorPicker;
