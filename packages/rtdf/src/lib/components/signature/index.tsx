import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { SignatureProps, SignatureResult, SignatureRotation } from '../../types';
import Button from '../button';
import { zh_CN } from '../../lang';
import { useConfig } from '../config-provider';
import { splitButtonCallbacks } from '@any-tdf/common/derived/props';
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

export interface SignatureRef {
	clear: () => void;
	getSignature: (rotation?: SignatureRotation) => SignatureResult | null;
	isEmpty: () => boolean;
}

const Signature = forwardRef<SignatureRef, SignatureProps>(
	(
		{
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
			onClear,
			onConfirm,
			onDrawStart,
			onDrawEnd
		},
		ref
	) => {
		const canvasRef = useRef<HTMLCanvasElement | null>(null);
		const containerRef = useRef<HTMLDivElement | null>(null);
		const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
		const isDrawingRef = useRef(false);
		const hasDrawnRef = useRef(false);
		const pointersRef = useRef(new Map<number, { x: number; y: number }>());
		const { locale } = useConfig();
		const signatureLang = locale?.signature || zh_CN.signature;
		const { buttonProps: clearButtonProps, buttonOnClick: clearButtonOnClick } = splitButtonCallbacks(clearButton);
		const { buttonProps: confirmButtonProps, buttonOnClick: confirmButtonOnClick } = splitButtonCallbacks(confirmButton);

		// 公共派生层只处理 Signature 顶层 class、style 和文案，canvas 与 DOM API 留在组件内。
		// Shared derived layer only handles Signature top-level classes, styles and text; canvas and DOM APIs stay in the component.
		const signatureState = resolveSignatureDerived(
			resolveSignatureStateOptions({
				defaults: signatureLang,
				props: { aspectRatio, bgColor, canvasClass, clearText, confirmText, injClass, radius }
			})
		);
		const emitClear = () => {
			onClear?.();
		};
		const emitConfirm = (result: SignatureResult) => {
			onConfirm?.(result);
		};
		const emitDrawStart = () => {
			onDrawStart?.();
		};
		const emitDrawEnd = () => {
			onDrawEnd?.();
		};

		const getPointerPos = (event: PointerEvent) => {
			if (!canvasRef.current) return { x: 0, y: 0 };
			const rect = canvasRef.current.getBoundingClientRect();
			return resolveSignaturePointerPosition({
				clientX: event.clientX,
				clientY: event.clientY,
				rectLeft: rect.left,
				rectTop: rect.top
			});
		};

		const clearCanvas = () => {
			if (!ctxRef.current || !canvasRef.current || !containerRef.current) return;
			// 公共纯函数只计算清空参数，Canvas 填充动作留在组件层。
			// The shared pure helper only calculates clear params; canvas filling stays in the component layer.
			const clearPlan = resolveSignatureClearPlan({
				rect: containerRef.current.getBoundingClientRect(),
				bgColor,
				emitClear: false
			});
			ctxRef.current.fillStyle = clearPlan.fillStyle;
			ctxRef.current.fillRect(0, 0, clearPlan.width, clearPlan.height);
			const action = clearPlan.action;
			if (action.shouldClear) hasDrawnRef.current = action.nextHasDrawn;
		};

		const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
			if (!ctxRef.current || !canvasRef.current) return;
			canvasRef.current.setPointerCapture(event.pointerId);
			const pos = getPointerPos(event.nativeEvent);
			pointersRef.current.set(event.pointerId, pos);
			const action = resolveSignaturePointerDownAction({ pointerCount: pointersRef.current.size });
			if (action.shouldStartDrawing) {
				isDrawingRef.current = action.nextDrawing;
				ctxRef.current.beginPath();
				ctxRef.current.moveTo(pos.x, pos.y);
				if (action.shouldEmitDrawStart) emitDrawStart();
			}
		};

		const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
			if (!ctxRef.current || !isDrawingRef.current) return;
			const pos = getPointerPos(event.nativeEvent);
			const lastPos = pointersRef.current.get(event.pointerId);
			const action = resolveSignaturePointerMoveAction({
				isDrawing: isDrawingRef.current,
				hasLastPointer: Boolean(lastPos),
				pointerCount: pointersRef.current.size
			});
			if (action.shouldDraw) {
				ctxRef.current.lineTo(pos.x, pos.y);
				ctxRef.current.stroke();
				ctxRef.current.beginPath();
				ctxRef.current.moveTo(pos.x, pos.y);
				hasDrawnRef.current = action.shouldMarkDrawn;
			}
			pointersRef.current.set(event.pointerId, pos);
		};

		const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
			if (!canvasRef.current) return;
			canvasRef.current.releasePointerCapture(event.pointerId);
			pointersRef.current.delete(event.pointerId);
			const action = resolveSignaturePointerUpAction({
				remainingPointerCount: pointersRef.current.size,
				isDrawing: isDrawingRef.current
			});
			if (action.shouldEndDrawing) {
				isDrawingRef.current = action.nextDrawing;
				ctxRef.current?.closePath();
				if (action.shouldEmitDrawEnd) emitDrawEnd();
			}
		};

		const initCanvas = () => {
			if (!canvasRef.current || !containerRef.current) return;
			const dpr = resolveDevicePixelRatio({ value: window.devicePixelRatio });
			// DOM 测量留在组件层，尺寸归一化和像素换算交给公共纯函数。
			// DOM measurement stays in the component; size normalization and pixel conversion use shared pure helpers.
			const { canvasSize } = resolveSignatureCanvasSetupState({
				rect: containerRef.current.getBoundingClientRect(),
				dpr
			});
			canvasRef.current.width = canvasSize.pixelWidth;
			canvasRef.current.height = canvasSize.pixelHeight;
			canvasRef.current.style.width = canvasSize.cssWidth;
			canvasRef.current.style.height = canvasSize.cssHeight;
			ctxRef.current = canvasRef.current.getContext('2d');
			if (ctxRef.current) {
				// 公共纯函数只返回 context 配置，组件层执行 Canvas API 写入。
				// The shared pure helper only returns context options; the component layer writes Canvas APIs.
				const drawOptions = resolveSignatureCanvasDrawOptions({ lineColor, lineWidth });
				ctxRef.current.scale(dpr, dpr);
				ctxRef.current.lineCap = drawOptions.lineCap;
				ctxRef.current.lineJoin = drawOptions.lineJoin;
				ctxRef.current.lineWidth = drawOptions.lineWidth;
				ctxRef.current.strokeStyle = drawOptions.strokeStyle;
				clearCanvas();
			}
		};

		const getRotatedDataUrl = (rotation: SignatureRotation = 0) => {
			if (!canvasRef.current) return '';
			const sourceWidth = canvasRef.current.width;
			const sourceHeight = canvasRef.current.height;
			// 公共导出计划只计算旋转绘制参数，canvas 创建和导出仍留在组件层。
			// Shared export plan only calculates rotation draw params; canvas creation and export stay in the component layer.
			const exportPlan = resolveSignatureExportPlan({
				sourceWidth,
				sourceHeight,
				rotation,
				imageType,
				imageQuality
			});
			if (!exportPlan.shouldRotate) {
				return canvasRef.current.toDataURL(exportPlan.mimeType, exportPlan.quality);
			}

			const tempCanvas = document.createElement('canvas');
			const tempCtx = tempCanvas.getContext('2d');
			if (!tempCtx) return '';

			tempCanvas.width = exportPlan.width;
			tempCanvas.height = exportPlan.height;

			tempCtx.translate(exportPlan.translateX, exportPlan.translateY);
			tempCtx.rotate(exportPlan.radians);
			tempCtx.drawImage(canvasRef.current, exportPlan.drawX, exportPlan.drawY);
			return tempCanvas.toDataURL(exportPlan.mimeType, exportPlan.quality);
		};

		const handleConfirm = () => {
			const result: SignatureResult = resolveSignatureResult({
				dataUrl: getRotatedDataUrl(0),
				hasDrawn: hasDrawnRef.current
			});
			emitConfirm(result);
		};

		useEffect(() => {
			initCanvas();
			const observer = new ResizeObserver(() => initCanvas());
			if (containerRef.current) observer.observe(containerRef.current);
			return () => observer.disconnect();
		}, []);

		useEffect(() => {
			if (ctxRef.current) {
				ctxRef.current.strokeStyle = lineColor;
			}
		}, [lineColor]);

		useEffect(() => {
			if (ctxRef.current) {
				ctxRef.current.lineWidth = lineWidth;
			}
		}, [lineWidth]);

		useImperativeHandle(ref, () => ({
			clear: () => {
				clearCanvas();
			},
			getSignature: (rotation: SignatureRotation = 0) => {
				if (!canvasRef.current) return null;
				return resolveSignatureResult({
					dataUrl: getRotatedDataUrl(rotation),
					hasDrawn: hasDrawnRef.current
				});
			},
			isEmpty: () => resolveSignatureEmpty(hasDrawnRef.current)
		}));

		return (
			<div className={signatureState.rootClass}>
				<div ref={containerRef} className={signatureState.canvasContainerClass} style={signatureState.containerStyleValue}>
					<canvas
						ref={canvasRef}
						className={signatureState.canvasClass}
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={handlePointerUp}
						onPointerCancel={handlePointerUp}
						onPointerLeave={handlePointerUp}
					/>
				</div>
				{showButtons ? (
					<div className={signatureState.buttonRowClass}>
						<Button
							size="md"
							customSize
							customWidth={80}
							customHeight={36}
							fill="line"
							{...clearButtonProps}
							onClick={(event) => {
								clearButtonOnClick?.(event);
								clearCanvas();
								const action = resolveSignatureClearAction();
								if (action.shouldEmitClear) emitClear();
							}}
						>
							{signatureState.texts.clearText}
						</Button>
						<Button
							size="md"
							customSize
							customWidth={80}
							customHeight={36}
							fill="base"
							{...confirmButtonProps}
							onClick={(event) => {
								confirmButtonOnClick?.(event);
								handleConfirm();
							}}
						>
							{signatureState.texts.confirmText}
						</Button>
					</div>
				) : null}
			</div>
		);
	}
);

Signature.displayName = 'Signature';

export default Signature;
