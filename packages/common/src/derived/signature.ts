import { radiusObj } from './common.js';
import { joinClasses } from './helpers.js';

export type SignatureRadius = keyof typeof signatureLargeAreaRadiusMap;
export type SignatureImageType = 'png' | 'jpeg' | 'webp' | string;
export type SignatureCanvasRotation = 0 | 90 | 180 | 270;
export type SignatureTexts = {
	clearText: string;
	confirmText: string;
};
export type ResolveSignatureTextsOptions = Partial<SignatureTexts> & {
	defaults: SignatureTexts;
};

export type ResolveSignatureContainerStyleOptions = {
	aspectRatio: readonly number[];
	bgColor: string;
};

export type ResolveSignatureDerivedOptions = Partial<SignatureTexts> &
	ResolveSignatureContainerStyleOptions & {
		canvasClass?: string;
		defaults: SignatureTexts;
		injClass?: string;
		radius?: SignatureRadius | string;
	};
export type SignatureStatePropsLike = Partial<Omit<ResolveSignatureDerivedOptions, 'aspectRatio' | 'bgColor' | 'defaults'>> &
	Pick<ResolveSignatureDerivedOptions, 'aspectRatio' | 'bgColor'>;
export type ResolveSignatureStateOptionsParams = {
	defaults: SignatureTexts;
	props: SignatureStatePropsLike;
};

export type ResolveSignaturePointerPositionOptions = {
	clientX: number;
	clientY: number;
	rectLeft: number;
	rectTop: number;
};
export type ResolveSignaturePointerDownActionOptions = {
	pointerCount: number;
};
export type ResolveSignaturePointerMoveActionOptions = {
	hasLastPointer?: boolean;
	isDrawing?: boolean;
	pointerCount: number;
};
export type ResolveSignaturePointerUpActionOptions = {
	isDrawing?: boolean;
	remainingPointerCount: number;
};

export type ResolveSignatureClearActionOptions = {
	emitClear?: boolean;
	shouldClear?: boolean;
};

export type ResolveSignatureCanvasDrawOptionsOptions = {
	lineColor?: string;
	lineWidth?: number;
};

export type SignatureCanvasDrawOptions = {
	lineCap: 'round';
	lineJoin: 'round';
	lineWidth: number;
	strokeStyle: string;
};

export type ResolveSignatureClearPlanOptions = ResolveSignatureClearActionOptions & {
	bgColor?: string;
	rect?: SignatureMeasuredRectLike;
};

export type ResolveSignatureCanvasSizeOptions = {
	width: number;
	height: number;
	dpr?: number;
};

export type SignatureMeasuredRectLike =
	| {
			width?: number | null;
			height?: number | null;
	  }
	| null
	| undefined;

export type SignatureMeasuredSize = {
	width: number;
	height: number;
};

export type SignatureCanvasSize = {
	pixelWidth: number;
	pixelHeight: number;
	cssWidth: string;
	cssHeight: string;
};

export type ResolveSignatureCanvasSetupStateOptions = {
	dpr?: number;
	rect?: SignatureMeasuredRectLike;
};

export type SignatureCanvasSetupState = SignatureMeasuredSize & {
	canvasSize: SignatureCanvasSize;
	shouldSetup: boolean;
};

export type ResolveSignatureRotatedCanvasSizeOptions = {
	sourceWidth: number;
	sourceHeight: number;
	rotation?: SignatureCanvasRotation;
};

export type ResolveSignatureImageParamsOptions = {
	imageType?: SignatureImageType;
	imageQuality?: number;
};
export type ResolveSignatureExportPlanOptions = ResolveSignatureImageParamsOptions & ResolveSignatureRotatedCanvasSizeOptions;
export type SignaturePointerDownAction = {
	nextDrawing: boolean;
	shouldEmitDrawStart: boolean;
	shouldStartDrawing: boolean;
};
export type SignaturePointerMoveAction = {
	shouldDraw: boolean;
	shouldMarkDrawn: boolean;
};
export type SignaturePointerUpAction = {
	nextDrawing: boolean;
	shouldEmitDrawEnd: boolean;
	shouldEndDrawing: boolean;
};
export type SignatureClearAction = {
	nextHasDrawn: false;
	shouldClear: boolean;
	shouldEmitClear: boolean;
};
export type SignatureClearPlan = SignatureMeasuredSize & {
	action: SignatureClearAction;
	fillStyle: string;
};
export type SignatureExportPlan = {
	drawX: number;
	drawY: number;
	height: number;
	mimeType: string;
	quality?: number;
	radians: number;
	shouldRotate: boolean;
	translateX: number;
	translateY: number;
	width: number;
};
export type SignatureResultData = {
	dataUrl: string;
	isEmpty: boolean;
};
export type SignatureDerived = {
	buttonRowClass: string;
	canvasClass: string;
	canvasContainerClass: string;
	containerStyleString: string;
	containerStyleValue: ReturnType<typeof resolveSignatureContainerStyleValue>;
	rootClass: string;
	texts: SignatureTexts;
};

export const signatureLargeAreaRadiusMap = {
	none: radiusObj.none,
	sm: radiusObj.sm,
	md: radiusObj.md,
	lg: radiusObj.lg,
	xl: radiusObj.xl,
	'2xl': radiusObj['2xl'],
	'3xl': radiusObj['3xl'],
	'4xl': radiusObj['4xl'],
	full: radiusObj.full,
	'': ''
} as const;

export const signatureDirectionMarkPositionMap = {
	top: 'top-2 left-1/2 -translate-x-1/2',
	bottom: 'bottom-2 left-1/2 -translate-x-1/2',
	left: 'left-2 top-1/2 -translate-y-1/2',
	right: 'right-2 top-1/2 -translate-y-1/2'
} as const;

export const signatureDirectionMarkRotateMap = {
	top: '',
	bottom: 'rotate-180',
	left: '-rotate-90',
	right: 'rotate-90'
} as const;

export const resolveSignatureRadiusClass = (radius: SignatureRadius | string = '') =>
	signatureLargeAreaRadiusMap[radius as SignatureRadius] || '';

// 输入组件状态，返回框架无关的签名区域 class。
// Consume component state and return framework-agnostic signature area classes.
export const resolveSignatureRootClass = (injClass = '') => joinClasses(['flex flex-col gap-3', injClass]);

// 输入组件按钮文案 props 和默认文案，返回框架无关的最终文案。
// Consume button text props and default text, then return framework-agnostic final text.
export const resolveSignatureTexts = ({ clearText, confirmText, defaults }: ResolveSignatureTextsOptions): SignatureTexts => ({
	clearText: clearText || defaults.clearText,
	confirmText: confirmText || defaults.confirmText
});

export const resolveSignatureCanvasContainerClass = ({
	radius = '',
	canvasClass = ''
}: {
	radius?: SignatureRadius | string;
	canvasClass?: string;
}) =>
	joinClasses([
		'relative w-full overflow-hidden border border-black/10 dark:border-white/10',
		resolveSignatureRadiusClass(radius),
		canvasClass
	]);

export const resolveSignatureCanvasClass = (radius: SignatureRadius | string = '') =>
	joinClasses(['absolute inset-0 cursor-crosshair touch-none', resolveSignatureRadiusClass(radius)]);

export const resolveSignatureButtonRowClass = (): string => 'flex justify-end gap-3';

export const resolveSignatureContainerStyleValue = ({ aspectRatio, bgColor }: ResolveSignatureContainerStyleOptions) => ({
	aspectRatio: `${aspectRatio[0]} / ${aspectRatio[1]}`,
	backgroundColor: bgColor
});

export const resolveSignatureContainerStyleString = ({ aspectRatio, bgColor }: ResolveSignatureContainerStyleOptions) =>
	`aspect-ratio: ${aspectRatio[0]} / ${aspectRatio[1]}; background-color: ${bgColor};`;

// 输入组件 props 和默认文案，返回框架无关的 Signature 派生入参。
// Receive component props and default texts, then return framework-agnostic Signature derivation options.
export const resolveSignatureStateOptions = ({ defaults, props }: ResolveSignatureStateOptionsParams): ResolveSignatureDerivedOptions => ({
	aspectRatio: props.aspectRatio,
	bgColor: props.bgColor,
	canvasClass: props.canvasClass,
	clearText: props.clearText,
	confirmText: props.confirmText,
	defaults,
	injClass: props.injClass,
	radius: props.radius
});

// 输入 Signature 的 props，返回框架无关的顶层渲染派生结果。
// Receive Signature props and return framework-agnostic top-level render derivations.
export const resolveSignatureDerived = ({
	aspectRatio,
	bgColor,
	canvasClass = '',
	clearText,
	confirmText,
	defaults,
	injClass = '',
	radius = ''
}: ResolveSignatureDerivedOptions): SignatureDerived => ({
	texts: resolveSignatureTexts({ clearText, confirmText, defaults }),
	rootClass: resolveSignatureRootClass(injClass),
	buttonRowClass: resolveSignatureButtonRowClass(),
	canvasContainerClass: resolveSignatureCanvasContainerClass({ radius, canvasClass }),
	canvasClass: resolveSignatureCanvasClass(radius),
	containerStyleValue: resolveSignatureContainerStyleValue({ aspectRatio, bgColor }),
	containerStyleString: resolveSignatureContainerStyleString({ aspectRatio, bgColor })
});

// 只计算指针相对坐标，DOM rect 读取留在组件层。
// Only calculate pointer coordinates; DOM rect reading stays in the component layer.
export const resolveSignaturePointerPosition = ({ clientX, clientY, rectLeft, rectTop }: ResolveSignaturePointerPositionOptions) => ({
	x: clientX - rectLeft,
	y: clientY - rectTop
});

// 输入指针数量，返回签名绘制开始动作；指针捕获和 canvas 绘制留在组件层。
// Receive pointer count and return signature draw-start action; pointer capture and canvas drawing stay in the component layer.
export const resolveSignaturePointerDownAction = ({
	pointerCount
}: ResolveSignaturePointerDownActionOptions): SignaturePointerDownAction => {
	const shouldStartDrawing = pointerCount === 1;
	return {
		nextDrawing: shouldStartDrawing,
		shouldEmitDrawStart: shouldStartDrawing,
		shouldStartDrawing
	};
};

// 输入当前绘制状态和指针状态，返回是否执行绘制；canvas API 留在组件层。
// Receive drawing state and pointer state, then return whether drawing should run; canvas APIs stay in the component layer.
export const resolveSignaturePointerMoveAction = ({
	isDrawing = false,
	hasLastPointer = false,
	pointerCount
}: ResolveSignaturePointerMoveActionOptions): SignaturePointerMoveAction => {
	const shouldDraw = isDrawing && hasLastPointer && pointerCount === 1;
	return {
		shouldDraw,
		shouldMarkDrawn: shouldDraw
	};
};

// 输入剩余指针数量和绘制状态，返回签名绘制结束动作。
// Receive remaining pointer count and drawing state, then return signature draw-end action.
export const resolveSignaturePointerUpAction = ({
	remainingPointerCount,
	isDrawing = false
}: ResolveSignaturePointerUpActionOptions): SignaturePointerUpAction => {
	const shouldEndDrawing = remainingPointerCount === 0 && isDrawing;
	return {
		nextDrawing: shouldEndDrawing ? false : isDrawing,
		shouldEmitDrawEnd: shouldEndDrawing,
		shouldEndDrawing
	};
};

// 输入签名清空请求，返回组件层可写入的绘制状态和事件决策。
// Receive a signature clear request and return draw-state plus event decisions for the component layer.
export const resolveSignatureClearAction = ({
	emitClear = true,
	shouldClear = true
}: ResolveSignatureClearActionOptions = {}): SignatureClearAction => ({
	nextHasDrawn: false,
	shouldClear,
	shouldEmitClear: shouldClear && emitClear
});

// 输入画笔 props，返回组件层可写入 canvas context 的绘制配置。
// Receive drawing props and return canvas-context options that component layers can write.
export const resolveSignatureCanvasDrawOptions = ({
	lineColor = '#000000',
	lineWidth = 3
}: ResolveSignatureCanvasDrawOptionsOptions = {}): SignatureCanvasDrawOptions => ({
	lineCap: 'round',
	lineJoin: 'round',
	lineWidth,
	strokeStyle: lineColor
});

export const resolveSignatureCanvasSize = ({ width, height, dpr = 1 }: ResolveSignatureCanvasSizeOptions): SignatureCanvasSize => ({
	pixelWidth: width * dpr,
	pixelHeight: height * dpr,
	cssWidth: `${width}px`,
	cssHeight: `${height}px`
});

// 输入组件层测量到的签名容器矩形，返回框架无关的安全尺寸。
// Receive a measured signature container rect and return framework-agnostic safe dimensions.
export const resolveSignatureMeasuredSize = (rect?: SignatureMeasuredRectLike): SignatureMeasuredSize => ({
	width: rect?.width ?? 0,
	height: rect?.height ?? 0
});

// 输入清空请求和组件层测量值，返回 canvas 清空所需的纯参数。
// Receive a clear request and component measurements, then return pure canvas-clear params.
export const resolveSignatureClearPlan = ({
	bgColor = '#ffffff',
	rect,
	emitClear = false,
	shouldClear = true
}: ResolveSignatureClearPlanOptions = {}): SignatureClearPlan => ({
	...resolveSignatureMeasuredSize(rect),
	action: resolveSignatureClearAction({ emitClear, shouldClear }),
	fillStyle: bgColor
});

// 输入组件层测量值和 dpr，返回 canvas 初始化可使用的纯状态。
// Receive component measurements and dpr, then return pure state for canvas setup.
export const resolveSignatureCanvasSetupState = ({
	rect,
	dpr = 1
}: ResolveSignatureCanvasSetupStateOptions = {}): SignatureCanvasSetupState => {
	const measuredSize = resolveSignatureMeasuredSize(rect);
	return {
		...measuredSize,
		canvasSize: resolveSignatureCanvasSize({ ...measuredSize, dpr }),
		shouldSetup: measuredSize.width > 0 && measuredSize.height > 0
	};
};

export const resolveSignatureRotatedCanvasSize = ({ sourceWidth, sourceHeight, rotation = 0 }: ResolveSignatureRotatedCanvasSizeOptions) =>
	rotation === 90 || rotation === 270 ? { width: sourceHeight, height: sourceWidth } : { width: sourceWidth, height: sourceHeight };

// 输入旋转角度，返回 canvas 可直接使用的弧度值。
// Consume a rotation angle and return the radian value used by canvas.
export const resolveSignatureRotationRadians = (rotation: SignatureCanvasRotation | number = 0): number => (rotation * Math.PI) / 180;

export const resolveSignatureImageParams = ({ imageType = 'png', imageQuality = 0.92 }: ResolveSignatureImageParamsOptions) => ({
	mimeType: `image/${imageType}`,
	quality: imageType === 'png' ? undefined : imageQuality
});

// 输入签名导出状态，返回组件层可应用的旋转 canvas 绘制参数。
// Receive signature export state and return canvas rotation draw params for the component layer.
export const resolveSignatureExportPlan = ({
	sourceWidth,
	sourceHeight,
	rotation = 0,
	imageType = 'png',
	imageQuality = 0.92
}: ResolveSignatureExportPlanOptions): SignatureExportPlan => {
	const { mimeType, quality } = resolveSignatureImageParams({ imageType, imageQuality });
	const rotatedSize = resolveSignatureRotatedCanvasSize({ sourceWidth, sourceHeight, rotation });

	return {
		drawX: -sourceWidth / 2,
		drawY: -sourceHeight / 2,
		height: rotatedSize.height,
		mimeType,
		quality,
		radians: resolveSignatureRotationRadians(rotation),
		shouldRotate: rotation !== 0,
		translateX: rotatedSize.width / 2,
		translateY: rotatedSize.height / 2,
		width: rotatedSize.width
	};
};

// 输入绘制状态，返回签名是否为空，不读取 canvas。
// Resolve drawing state into an empty flag without reading canvas.
export const resolveSignatureEmpty = (hasDrawn = false): boolean => !hasDrawn;

// 输入导出的图片数据和绘制状态，返回组件层可派发的签名结果。
// Combine exported image data and draw state into the signature result emitted by the component layer.
export const resolveSignatureResult = ({ dataUrl, hasDrawn = false }: { dataUrl: string; hasDrawn?: boolean }): SignatureResultData => ({
	dataUrl,
	isEmpty: resolveSignatureEmpty(hasDrawn)
});
