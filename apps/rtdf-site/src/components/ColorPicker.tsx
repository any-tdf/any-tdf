import { useEffect, useRef, useState } from 'react';
import {
	oklchToRgb,
	rgbToHex,
	rgbToOklch as rgbToOklchUtil,
	isDisplayable,
	getMaxChroma as getMaxChromaUtil,
	formatOklch,
	hslToRgb,
	rgbToHsl
} from '@any-tdf/common/utils';

type OklchColor = { l: number; c: number; h: number };
type ColorMode = 'oklch' | 'rgb' | 'hex';

type ColorPickerProps = {
	value?: OklchColor;
	onchange?: (color: OklchColor, hex: string, rgb: [number, number, number]) => void;
	contrastTarget?: OklchColor;
	showContrast?: boolean;
};

// 面板尺寸
const LC_WIDTH = 288;
const LC_HEIGHT = 180;
const BAR_HEIGHT = 16;
// 圆形色轮的尺寸
const WHEEL_SIZE = 180;

const ColorPicker = ({ value = { l: 0.7, c: 0.15, h: 250 }, onchange, contrastTarget, showContrast = false }: ColorPickerProps) => {
	const lcCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const slider1CanvasRef = useRef<HTMLCanvasElement | null>(null);
	const slider2CanvasRef = useRef<HTMLCanvasElement | null>(null);
	const slider3CanvasRef = useRef<HTMLCanvasElement | null>(null);
	const sliderWidthRef = useRef<HTMLDivElement | null>(null);

	const [isDraggingLC, setIsDraggingLC] = useState(false);
	const [isDragging1, setIsDragging1] = useState(false);
	const [isDragging2, setIsDragging2] = useState(false);
	const [isDragging3, setIsDragging3] = useState(false);
	const [showCopyTip, setShowCopyTip] = useState(false);
	const rafIdRef = useRef<number | null>(null);

	// 当前模式
	const [colorMode, setColorMode] = useState<ColorMode>('oklch');

	// 输入框临时值（用于失焦验证）
	const [input1, setInput1] = useState('');
	const [input2, setInput2] = useState('');
	const [input3, setInput3] = useState('');

	// 语言支持
	const isZh = typeof window !== 'undefined' ? localStorage.getItem('lang') === 'zh_CN' : true;

	// 滑块容器宽度（动态）
	const [sliderWidth, setSliderWidth] = useState(200);

	// 设备像素比
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

	// value 的可变镜像，避免闭包捕获旧值
	const valueRef = useRef(value);
	valueRef.current = value;

	// 计算最大可用 chroma
	const getMaxChroma = (l: number, h: number): number => {
		return getMaxChromaUtil(l, h);
	};

	// 转换为 hex
	const toHex = (l: number, c: number, h: number): string => {
		if (isDisplayable(l, c, h)) {
			const [r, g, b] = oklchToRgb(l, c, h);
			return rgbToHex(r, g, b);
		}
		const maxC = getMaxChroma(l, h);
		const [r, g, b] = oklchToRgb(l, Math.min(c, maxC), h);
		return rgbToHex(r, g, b);
	};

	// 转换为 rgb 数组
	const toRgb = (l: number, c: number, h: number): [number, number, number] => {
		return oklchToRgb(l, c, h);
	};

	// 从 RGB 转换为 OKLCH
	const rgbToOklch = (r: number, g: number, b: number): OklchColor => {
		const result = rgbToOklchUtil(r, g, b);
		return {
			l: result.l,
			c: result.c,
			h: result.h || valueRef.current.h // 如果色相为 0（灰色），保持原来的色相
		};
	};

	// 当前颜色的各种格式
	const currentHex = toHex(value.l, value.c, value.h);
	const currentOklch = formatOklch(value.l, value.c, value.h);
	const currentRgbArray = toRgb(value.l, value.c, value.h);
	const currentRgb = `rgb(${currentRgbArray[0]}, ${currentRgbArray[1]}, ${currentRgbArray[2]})`;

	// 对比度计算函数
	const sRGBtoLinear = (v: number): number => {
		const scaled = v / 255;
		return scaled <= 0.04045 ? scaled / 12.92 : Math.pow((scaled + 0.055) / 1.055, 2.4);
	};

	const getLuminance = (r: number, g: number, b: number): number => {
		return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
	};

	const getContrastRatioLocal = (rgb1: [number, number, number], rgb2: [number, number, number]): number => {
		const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
		const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
		const lighter = Math.max(lum1, lum2);
		const darker = Math.min(lum1, lum2);
		return (lighter + 0.05) / (darker + 0.05);
	};

	const getContrastLevel = (ratio: number): { level: string; color: string } => {
		if (ratio >= 7) return { level: 'AAA', color: 'text-green-600 dark:text-green-400' };
		if (ratio >= 4.5) return { level: 'AA', color: 'text-blue-600 dark:text-blue-400' };
		if (ratio >= 3) return { level: 'A', color: 'text-yellow-600 dark:text-yellow-400' };
		return { level: 'Fail', color: 'text-red-600 dark:text-red-400' };
	};

	// 计算与对比目标的对比度
	const contrastInfo = (() => {
		if (!showContrast || !contrastTarget) return null;
		const targetRgb = toRgb(contrastTarget.l, contrastTarget.c, contrastTarget.h);
		const ratio = getContrastRatioLocal(currentRgbArray, targetRgb);
		const { level, color } = getContrastLevel(ratio);
		return { ratio: ratio.toFixed(2), level, color };
	})();

	// 同步输入框值
	useEffect(() => {
		if (colorMode === 'oklch') {
			setInput1(value.l.toFixed(3));
			setInput2(value.c.toFixed(3));
			setInput3(value.h.toFixed(1));
		} else if (colorMode === 'rgb') {
			setInput1(currentRgbArray[0].toString());
			setInput2(currentRgbArray[1].toString());
			setInput3(currentRgbArray[2].toString());
		} else {
			setInput1(currentRgbArray[0].toString(16).padStart(2, '0'));
			setInput2(currentRgbArray[1].toString(16).padStart(2, '0'));
			setInput3(currentRgbArray[2].toString(16).padStart(2, '0'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value.l, value.c, value.h, colorMode]);

	// 绘制色块区域
	const drawColorBlock = () => {
		const lcCanvas = lcCanvasRef.current;
		if (!lcCanvas) return;
		const currentValue = valueRef.current;

		if (colorMode === 'oklch') {
			// OKLCH 模式：矩形 L-C 平面
			lcCanvas.width = LC_WIDTH * dpr;
			lcCanvas.height = LC_HEIGHT * dpr;
			const ctx = lcCanvas.getContext('2d');
			if (!ctx) return;

			const w = LC_WIDTH * dpr;
			const h = LC_HEIGHT * dpr;
			const imageData = ctx.createImageData(w, h);
			const data = imageData.data;

			for (let y = 0; y < h; y++) {
				const l = 1 - y / h;
				for (let x = 0; x < w; x++) {
					const c = (x / w) * 0.4;
					const idx = (y * w + x) * 4;

					if (isDisplayable(l, c, currentValue.h)) {
						const [r, g, b] = oklchToRgb(l, c, currentValue.h);
						data[idx] = r;
						data[idx + 1] = g;
						data[idx + 2] = b;
						data[idx + 3] = 255;
					} else {
						const checkSize = 4 * dpr;
						const isLight = (Math.floor(x / checkSize) + Math.floor(y / checkSize)) % 2 === 0;
						const gray = isLight ? 200 : 180;
						data[idx] = gray;
						data[idx + 1] = gray;
						data[idx + 2] = gray;
						data[idx + 3] = 255;
					}
				}
			}
			ctx.putImageData(imageData, 0, 0);
		} else {
			// RGB/HEX 模式：圆形色轮
			lcCanvas.width = WHEEL_SIZE * dpr;
			lcCanvas.height = WHEEL_SIZE * dpr;
			const ctx = lcCanvas.getContext('2d');
			if (!ctx) return;

			const size = WHEEL_SIZE * dpr;
			const radius = size / 2;
			const imageData = ctx.createImageData(size, size);
			const data = imageData.data;

			// 当前颜色的亮度
			const [, , currentL] = rgbToHsl(currentRgbArray[0], currentRgbArray[1], currentRgbArray[2]);

			// 抗锯齿边缘宽度
			const edgeWidth = 1.5 * dpr;

			for (let y = 0; y < size; y++) {
				for (let x = 0; x < size; x++) {
					const idx = (y * size + x) * 4;
					const dx = x - radius;
					const dy = y - radius;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist <= radius + edgeWidth) {
						const angle = Math.atan2(dy, dx);
						const h = ((angle * 180) / Math.PI + 360) % 360;
						const s = Math.min(dist / radius, 1);
						const [r, g, b] = hslToRgb(h, s, currentL);
						data[idx] = r;
						data[idx + 1] = g;
						data[idx + 2] = b;

						// 边缘抗锯齿
						if (dist > radius - edgeWidth) {
							const alpha = Math.max(0, 1 - (dist - radius + edgeWidth) / (edgeWidth * 2));
							data[idx + 3] = Math.round(alpha * 255);
						} else {
							data[idx + 3] = 255;
						}
					} else {
						data[idx] = 0;
						data[idx + 1] = 0;
						data[idx + 2] = 0;
						data[idx + 3] = 0;
					}
				}
			}
			ctx.putImageData(imageData, 0, 0);
		}
	};

	// 绘制滑动条 1 (OKLCH: L / RGB: R)
	const drawSlider1 = () => {
		const slider1Canvas = slider1CanvasRef.current;
		if (!slider1Canvas || sliderWidth <= 0) return;
		const currentValue = valueRef.current;
		slider1Canvas.width = sliderWidth * dpr;
		slider1Canvas.height = BAR_HEIGHT * dpr;
		const ctx = slider1Canvas.getContext('2d');
		if (!ctx) return;

		const w = sliderWidth * dpr;
		const h = BAR_HEIGHT * dpr;
		const imageData = ctx.createImageData(w, h);
		const data = imageData.data;

		for (let x = 0; x < w; x++) {
			let r = 0,
				g = 0,
				b = 0;

			if (colorMode === 'oklch') {
				// L 滑动条
				const l = x / w;
				if (isDisplayable(l, currentValue.c, currentValue.h)) {
					[r, g, b] = oklchToRgb(l, currentValue.c, currentValue.h);
				} else {
					const maxC = getMaxChroma(l, currentValue.h);
					[r, g, b] = oklchToRgb(l, Math.min(currentValue.c, maxC), currentValue.h);
				}
			} else {
				// R 滑动条：从黑色到红色
				r = Math.round((x / w) * 255);
				g = 0;
				b = 0;
			}

			for (let y = 0; y < h; y++) {
				const idx = (y * w + x) * 4;
				data[idx] = r;
				data[idx + 1] = g;
				data[idx + 2] = b;
				data[idx + 3] = 255;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	};

	// 绘制滑动条 2 (OKLCH: C / RGB: G)
	const drawSlider2 = () => {
		const slider2Canvas = slider2CanvasRef.current;
		if (!slider2Canvas || sliderWidth <= 0) return;
		const currentValue = valueRef.current;
		slider2Canvas.width = sliderWidth * dpr;
		slider2Canvas.height = BAR_HEIGHT * dpr;
		const ctx = slider2Canvas.getContext('2d');
		if (!ctx) return;

		const w = sliderWidth * dpr;
		const h = BAR_HEIGHT * dpr;
		const imageData = ctx.createImageData(w, h);
		const data = imageData.data;

		for (let x = 0; x < w; x++) {
			let r = 0,
				g = 0,
				b = 0;

			if (colorMode === 'oklch') {
				// C 滑动条
				const c = (x / w) * 0.4;
				if (isDisplayable(currentValue.l, c, currentValue.h)) {
					[r, g, b] = oklchToRgb(currentValue.l, c, currentValue.h);
				} else {
					// 超出色域显示灰色
					r = g = b = 180;
				}
			} else {
				// G 滑动条：从黑色到绿色
				r = 0;
				g = Math.round((x / w) * 255);
				b = 0;
			}

			for (let y = 0; y < h; y++) {
				const idx = (y * w + x) * 4;
				data[idx] = r;
				data[idx + 1] = g;
				data[idx + 2] = b;
				data[idx + 3] = 255;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	};

	// 绘制滑动条 3 (OKLCH: H / RGB: B)
	const drawSlider3 = () => {
		const slider3Canvas = slider3CanvasRef.current;
		if (!slider3Canvas || sliderWidth <= 0) return;
		slider3Canvas.width = sliderWidth * dpr;
		slider3Canvas.height = BAR_HEIGHT * dpr;
		const ctx = slider3Canvas.getContext('2d');
		if (!ctx) return;

		const w = sliderWidth * dpr;
		const h = BAR_HEIGHT * dpr;
		const imageData = ctx.createImageData(w, h);
		const data = imageData.data;

		for (let x = 0; x < w; x++) {
			let r = 0,
				g = 0,
				b = 0;

			if (colorMode === 'oklch') {
				// H 滑动条（色相）- 使用固定的 L 和 C 值，确保色相条始终清晰可辨
				const hue = (x / w) * 360;
				const fixedL = 0.7;
				const fixedC = 0.15;
				if (isDisplayable(fixedL, fixedC, hue)) {
					[r, g, b] = oklchToRgb(fixedL, fixedC, hue);
				} else {
					const maxC = getMaxChroma(fixedL, hue);
					[r, g, b] = oklchToRgb(fixedL, Math.min(fixedC, maxC), hue);
				}
			} else {
				// B 滑动条：从黑色到蓝色
				r = 0;
				g = 0;
				b = Math.round((x / w) * 255);
			}

			for (let y = 0; y < h; y++) {
				const idx = (y * w + x) * 4;
				data[idx] = r;
				data[idx + 1] = g;
				data[idx + 2] = b;
				data[idx + 3] = 255;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	};

	const drawAll = () => {
		drawColorBlock();
		drawSlider1();
		drawSlider2();
		drawSlider3();
	};

	// 初始化和响应式绘制
	useEffect(() => {
		drawAll();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value.h, value.l, value.c, colorMode, sliderWidth]);

	// 监听滑块容器宽度
	useEffect(() => {
		const node = sliderWidthRef.current;
		if (!node) return;
		const updateWidth = () => setSliderWidth(node.clientWidth);
		updateWidth();
		if (typeof ResizeObserver === 'undefined') return;
		const observer = new ResizeObserver(updateWidth);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	// 更新颜色并触发回调
	const updateColor = (newValue: OklchColor) => {
		onchange?.(newValue, toHex(newValue.l, newValue.c, newValue.h), toRgb(newValue.l, newValue.c, newValue.h));
	};

	// 色块区域交互
	const handleColorBlockInteraction = (e: MouseEvent | TouchEvent) => {
		const lcCanvas = lcCanvasRef.current;
		if (!lcCanvas) return;
		const rect = lcCanvas.getBoundingClientRect();
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
		const currentValue = valueRef.current;

		if (colorMode === 'oklch') {
			// OKLCH 模式：矩形 L-C 平面
			const x = Math.max(0, Math.min(LC_WIDTH, clientX - rect.left));
			const y = Math.max(0, Math.min(LC_HEIGHT, clientY - rect.top));
			const newL = 1 - y / LC_HEIGHT;
			const newC = (x / LC_WIDTH) * 0.4;
			const maxC = getMaxChroma(newL, currentValue.h);
			updateColor({ l: newL, c: Math.min(newC, maxC), h: currentValue.h });
		} else {
			// RGB/HEX 模式：圆形色轮
			const centerX = WHEEL_SIZE / 2;
			const centerY = WHEEL_SIZE / 2;
			const dx = clientX - rect.left - centerX;
			const dy = clientY - rect.top - centerY;
			const dist = Math.sqrt(dx * dx + dy * dy);
			const radius = WHEEL_SIZE / 2;

			// 限制在圆内
			const clampedDist = Math.min(dist, radius);
			const angle = Math.atan2(dy, dx);
			const hue = ((angle * 180) / Math.PI + 360) % 360;
			const saturation = clampedDist / radius;

			// 获取当前亮度
			const [, , currentL] = rgbToHsl(currentRgbArray[0], currentRgbArray[1], currentRgbArray[2]);
			const [r, g, b] = hslToRgb(hue, saturation, currentL);
			updateColor(rgbToOklch(r, g, b));
		}
	};

	// 滑动条 1 交互
	const handleSlider1Interaction = (e: MouseEvent | TouchEvent) => {
		const slider1Canvas = slider1CanvasRef.current;
		if (!slider1Canvas) return;
		const rect = slider1Canvas.getBoundingClientRect();
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const w = rect.width;
		const x = Math.max(0, Math.min(w, clientX - rect.left));
		const currentValue = valueRef.current;

		if (colorMode === 'oklch') {
			const newL = x / w;
			const maxC = getMaxChroma(newL, currentValue.h);
			updateColor({ l: newL, c: Math.min(currentValue.c, maxC), h: currentValue.h });
		} else {
			const newR = Math.round((x / w) * 255);
			const newOklch = rgbToOklch(newR, currentRgbArray[1], currentRgbArray[2]);
			updateColor(newOklch);
		}
	};

	// 滑动条 2 交互
	const handleSlider2Interaction = (e: MouseEvent | TouchEvent) => {
		const slider2Canvas = slider2CanvasRef.current;
		if (!slider2Canvas) return;
		const rect = slider2Canvas.getBoundingClientRect();
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const w = rect.width;
		const x = Math.max(0, Math.min(w, clientX - rect.left));
		const currentValue = valueRef.current;

		if (colorMode === 'oklch') {
			const newC = (x / w) * 0.4;
			const maxC = getMaxChroma(currentValue.l, currentValue.h);
			updateColor({ l: currentValue.l, c: Math.min(newC, maxC), h: currentValue.h });
		} else {
			const newG = Math.round((x / w) * 255);
			const newOklch = rgbToOklch(currentRgbArray[0], newG, currentRgbArray[2]);
			updateColor(newOklch);
		}
	};

	// 滑动条 3 交互
	const handleSlider3Interaction = (e: MouseEvent | TouchEvent) => {
		const slider3Canvas = slider3CanvasRef.current;
		if (!slider3Canvas) return;
		const rect = slider3Canvas.getBoundingClientRect();
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const w = rect.width;
		const x = Math.max(0, Math.min(w, clientX - rect.left));
		const currentValue = valueRef.current;

		if (colorMode === 'oklch') {
			const newH = (x / w) * 360;
			const maxC = getMaxChroma(currentValue.l, newH);
			updateColor({ l: currentValue.l, c: Math.min(currentValue.c, maxC), h: newH });
		} else {
			const newB = Math.round((x / w) * 255);
			const newOklch = rgbToOklch(currentRgbArray[0], currentRgbArray[1], newB);
			updateColor(newOklch);
		}
	};

	// 鼠标/触摸事件处理
	const onLCMouseDown = (e: React.MouseEvent) => {
		setIsDraggingLC(true);
		handleColorBlockInteraction(e.nativeEvent);
	};
	const onLCTouchStart = (e: React.TouchEvent) => {
		setIsDraggingLC(true);
		handleColorBlockInteraction(e.nativeEvent);
	};
	const onSlider1MouseDown = (e: React.MouseEvent) => {
		setIsDragging1(true);
		handleSlider1Interaction(e.nativeEvent);
	};
	const onSlider1TouchStart = (e: React.TouchEvent) => {
		setIsDragging1(true);
		handleSlider1Interaction(e.nativeEvent);
	};
	const onSlider2MouseDown = (e: React.MouseEvent) => {
		setIsDragging2(true);
		handleSlider2Interaction(e.nativeEvent);
	};
	const onSlider2TouchStart = (e: React.TouchEvent) => {
		setIsDragging2(true);
		handleSlider2Interaction(e.nativeEvent);
	};
	const onSlider3MouseDown = (e: React.MouseEvent) => {
		setIsDragging3(true);
		handleSlider3Interaction(e.nativeEvent);
	};
	const onSlider3TouchStart = (e: React.TouchEvent) => {
		setIsDragging3(true);
		handleSlider3Interaction(e.nativeEvent);
	};

	// 全局鼠标/触摸事件
	useEffect(() => {
		const onGlobalMouseMove = (e: MouseEvent) => {
			if (rafIdRef.current !== null) return;
			rafIdRef.current = requestAnimationFrame(() => {
				if (isDraggingLC) handleColorBlockInteraction(e);
				if (isDragging1) handleSlider1Interaction(e);
				if (isDragging2) handleSlider2Interaction(e);
				if (isDragging3) handleSlider3Interaction(e);
				rafIdRef.current = null;
			});
		};

		const onGlobalTouchMove = (e: TouchEvent) => {
			if (rafIdRef.current !== null) return;
			rafIdRef.current = requestAnimationFrame(() => {
				if (isDraggingLC) handleColorBlockInteraction(e);
				if (isDragging1) handleSlider1Interaction(e);
				if (isDragging2) handleSlider2Interaction(e);
				if (isDragging3) handleSlider3Interaction(e);
				rafIdRef.current = null;
			});
		};

		const onGlobalMouseUp = () => {
			setIsDraggingLC(false);
			setIsDragging1(false);
			setIsDragging2(false);
			setIsDragging3(false);
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
		};

		window.addEventListener('mousemove', onGlobalMouseMove);
		window.addEventListener('mouseup', onGlobalMouseUp);
		window.addEventListener('touchmove', onGlobalTouchMove);
		window.addEventListener('touchend', onGlobalMouseUp);
		return () => {
			window.removeEventListener('mousemove', onGlobalMouseMove);
			window.removeEventListener('mouseup', onGlobalMouseUp);
			window.removeEventListener('touchmove', onGlobalTouchMove);
			window.removeEventListener('touchend', onGlobalMouseUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDraggingLC, isDragging1, isDragging2, isDragging3, colorMode]);

	// 输入框失焦验证
	const onBlur1 = () => {
		const currentValue = valueRef.current;
		if (colorMode === 'oklch') {
			const val = parseFloat(input1);
			if (!isNaN(val) && val >= 0 && val <= 1) {
				const newL = val;
				const maxC = getMaxChroma(newL, currentValue.h);
				updateColor({ l: newL, c: Math.min(currentValue.c, maxC), h: currentValue.h });
			}
		} else if (colorMode === 'rgb') {
			const val = parseInt(input1);
			if (!isNaN(val) && val >= 0 && val <= 255) {
				const newOklch = rgbToOklch(val, currentRgbArray[1], currentRgbArray[2]);
				updateColor(newOklch);
			}
		} else {
			const val = parseInt(input1, 16);
			if (!isNaN(val) && val >= 0 && val <= 255) {
				const newOklch = rgbToOklch(val, currentRgbArray[1], currentRgbArray[2]);
				updateColor(newOklch);
			}
		}
	};

	const onBlur2 = () => {
		const currentValue = valueRef.current;
		if (colorMode === 'oklch') {
			const val = parseFloat(input2);
			if (!isNaN(val) && val >= 0 && val <= 0.4) {
				const maxC = getMaxChroma(currentValue.l, currentValue.h);
				updateColor({ l: currentValue.l, c: Math.min(val, maxC), h: currentValue.h });
			}
		} else if (colorMode === 'rgb') {
			const val = parseInt(input2);
			if (!isNaN(val) && val >= 0 && val <= 255) {
				const newOklch = rgbToOklch(currentRgbArray[0], val, currentRgbArray[2]);
				updateColor(newOklch);
			}
		} else {
			const val = parseInt(input2, 16);
			if (!isNaN(val) && val >= 0 && val <= 255) {
				const newOklch = rgbToOklch(currentRgbArray[0], val, currentRgbArray[2]);
				updateColor(newOklch);
			}
		}
	};

	const onBlur3 = () => {
		const currentValue = valueRef.current;
		if (colorMode === 'oklch') {
			const val = parseFloat(input3);
			if (!isNaN(val)) {
				const newH = ((val % 360) + 360) % 360;
				const maxC = getMaxChroma(currentValue.l, newH);
				updateColor({ l: currentValue.l, c: Math.min(currentValue.c, maxC), h: newH });
			}
		} else if (colorMode === 'rgb') {
			const val = parseInt(input3);
			if (!isNaN(val) && val >= 0 && val <= 255) {
				const newOklch = rgbToOklch(currentRgbArray[0], currentRgbArray[1], val);
				updateColor(newOklch);
			}
		} else {
			const val = parseInt(input3, 16);
			if (!isNaN(val) && val >= 0 && val <= 255) {
				const newOklch = rgbToOklch(currentRgbArray[0], currentRgbArray[1], val);
				updateColor(newOklch);
			}
		}
	};

	// 检测是否是 Mac
	const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

	// 获取调整步长（Mac 用 Option，Windows 用 Ctrl）
	const getStep = (e: React.KeyboardEvent): number => {
		const fineKey = isMac ? e.altKey : e.ctrlKey;
		if (colorMode === 'oklch') {
			if (fineKey) return 0.001;
			if (e.shiftKey) return 0.1;
			return 0.01;
		} else if (colorMode === 'rgb') {
			if (fineKey) return 1;
			if (e.shiftKey) return 10;
			return 5;
		}
		return 0;
	};

	// 键盘事件处理（回车确认 + 上下键调整）
	const onKeydown1 = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			onBlur1();
			return;
		}
		if (colorMode === 'hex') return;

		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			e.preventDefault();
			const step = getStep(e);
			const direction = e.key === 'ArrowUp' ? 1 : -1;
			const currentValue = valueRef.current;

			if (colorMode === 'oklch') {
				const newL = Math.max(0, Math.min(1, currentValue.l + step * direction));
				const maxC = getMaxChroma(newL, currentValue.h);
				updateColor({ l: newL, c: Math.min(currentValue.c, maxC), h: currentValue.h });
			} else {
				const newR = Math.max(0, Math.min(255, currentRgbArray[0] + step * direction));
				updateColor(rgbToOklch(Math.round(newR), currentRgbArray[1], currentRgbArray[2]));
			}
		}
	};

	const onKeydown2 = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			onBlur2();
			return;
		}
		if (colorMode === 'hex') return;

		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			e.preventDefault();
			const step = getStep(e);
			const direction = e.key === 'ArrowUp' ? 1 : -1;
			const currentValue = valueRef.current;

			if (colorMode === 'oklch') {
				const maxC = getMaxChroma(currentValue.l, currentValue.h);
				const newC = Math.max(0, Math.min(maxC, currentValue.c + step * direction));
				updateColor({ l: currentValue.l, c: newC, h: currentValue.h });
			} else {
				const newG = Math.max(0, Math.min(255, currentRgbArray[1] + step * direction));
				updateColor(rgbToOklch(currentRgbArray[0], Math.round(newG), currentRgbArray[2]));
			}
		}
	};

	const onKeydown3 = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			onBlur3();
			return;
		}
		if (colorMode === 'hex') return;

		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			e.preventDefault();
			const step = getStep(e);
			const direction = e.key === 'ArrowUp' ? 1 : -1;
			const currentValue = valueRef.current;

			if (colorMode === 'oklch') {
				// H 的步长放大 10 倍（因为范围是 0-360）
				const hStep = step * 10;
				let newH = currentValue.h + hStep * direction;
				newH = ((newH % 360) + 360) % 360;
				const maxC = getMaxChroma(currentValue.l, newH);
				updateColor({ l: currentValue.l, c: Math.min(currentValue.c, maxC), h: newH });
			} else {
				const newB = Math.max(0, Math.min(255, currentRgbArray[2] + step * direction));
				updateColor(rgbToOklch(currentRgbArray[0], currentRgbArray[1], Math.round(newB)));
			}
		}
	};

	// 复制文本到剪贴板
	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setShowCopyTip(true);
			setTimeout(() => {
				setShowCopyTip(false);
			}, 1500);
		} catch (err) {
			console.error('复制失败:', err);
		}
	};

	// 获取滑动条位置
	const getSlider1Position = () => {
		if (colorMode === 'oklch') {
			return value.l * sliderWidth;
		} else {
			return (currentRgbArray[0] / 255) * sliderWidth;
		}
	};

	const getSlider2Position = () => {
		if (colorMode === 'oklch') {
			// 将 C 值限制在当前 L 和 H 下的最大可显示彩度内
			const maxC = getMaxChroma(value.l, value.h);
			const displayC = Math.min(value.c, maxC);
			return (displayC / 0.4) * sliderWidth;
		} else {
			return (currentRgbArray[1] / 255) * sliderWidth;
		}
	};

	const getSlider3Position = () => {
		if (colorMode === 'oklch') {
			return (value.h / 360) * sliderWidth;
		} else {
			return (currentRgbArray[2] / 255) * sliderWidth;
		}
	};

	// 获取标签
	const getLabels = (): [string, string, string] => {
		if (colorMode === 'oklch') {
			return ['L', 'C', 'H'];
		} else if (colorMode === 'rgb') {
			return ['R', 'G', 'B'];
		} else {
			return ['R', 'G', 'B'];
		}
	};

	// 获取色块区域指示器位置
	const getColorBlockPosition = (): { x: number; y: number } => {
		if (colorMode === 'oklch') {
			// 将 C 值限制在当前 L 和 H 下的最大可显示彩度内
			const maxC = getMaxChroma(value.l, value.h);
			const displayC = Math.min(value.c, maxC);
			return {
				x: (displayC / 0.4) * LC_WIDTH,
				y: (1 - value.l) * LC_HEIGHT
			};
		} else {
			// RGB/HEX 模式：计算圆形色轮上的位置
			const [hue, saturation] = rgbToHsl(currentRgbArray[0], currentRgbArray[1], currentRgbArray[2]);
			const radius = WHEEL_SIZE / 2;
			const centerX = radius;
			const centerY = radius;
			const angle = (hue * Math.PI) / 180;
			const dist = saturation * radius;
			return {
				x: centerX + Math.cos(angle) * dist,
				y: centerY + Math.sin(angle) * dist
			};
		}
	};

	return (
		<div className="w-72 select-none">
			{/* 颜色预览 */}
			<div className="mb-3 flex items-center gap-3">
				<div
					className="h-10 w-10 flex-none rounded-md border border-black/10 dark:border-white/20"
					style={{ backgroundColor: currentHex }}
				></div>
				<div className="relative flex-1 text-xs">
					<button
						onClick={() => void copyToClipboard(currentHex)}
						className="mb-0.5 w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 dark:hover:bg-white/10"
						title={isZh ? '点击复制' : 'Click to copy'}
						type="button"
					>
						{currentHex}
					</button>
					<button
						onClick={() => void copyToClipboard(currentRgb)}
						className="mb-0.5 w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 dark:hover:bg-white/10"
						title={isZh ? '点击复制' : 'Click to copy'}
						type="button"
					>
						{currentRgb}
					</button>
					<button
						onClick={() => void copyToClipboard(currentOklch)}
						className="w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 dark:hover:bg-white/10"
						title={isZh ? '点击复制' : 'Click to copy'}
						type="button"
					>
						{currentOklch}
					</button>
					{showCopyTip ? (
						<div className="absolute -top-1 right-0 rounded bg-black/80 px-2 py-1 text-xs text-white dark:bg-white/80 dark:text-black">
							{isZh ? '已复制' : 'Copied'}
						</div>
					) : null}
				</div>
				<div className="relative flex-none group/hint">
					<svg
						className="h-4 w-4 cursor-help text-black/40 dark:text-white/40"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z" />
					</svg>
					<div className="pointer-events-none absolute -top-1 right-6 w-40 rounded bg-black px-2 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover/hint:opacity-100 dark:bg-white dark:text-black">
						{isZh ? '转换精度损失肉眼不可见' : 'Precision loss is imperceptible'}
					</div>
				</div>
			</div>

			{/* 对比度评分 */}
			{contrastInfo ? (
				<div className="mb-3 flex items-center justify-between rounded-md bg-black/5 px-3 py-2 dark:bg-white/5">
					<div className="flex items-center gap-2">
						<span className="text-xs text-black/60 dark:text-white/60">{isZh ? '对比度' : 'Contrast'}</span>
						<span className="font-mono text-sm font-medium">{contrastInfo.ratio}:1</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-xs text-black/60 dark:text-white/60">WCAG</span>
						<span className={`font-mono text-sm font-bold ${contrastInfo.color}`}>{contrastInfo.level}</span>
						<div className="relative flex-none group/wcag">
							<svg
								className="h-3.5 w-3.5 cursor-help text-black/40 dark:text-white/40"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z" />
							</svg>
							<div className="pointer-events-none absolute bottom-full right-0 z-10 mb-2 w-48 rounded bg-black px-2.5 py-2 text-xs leading-relaxed text-white opacity-0 transition-opacity group-hover/wcag:opacity-100 dark:bg-white dark:text-black">
								<div className="mb-1 font-medium">{isZh ? '网页内容无障碍指南' : 'Web Content Accessibility Guidelines'}</div>
								<div className="space-y-0.5 text-white/80 dark:text-black/70">
									<div>
										<span className="font-bold text-green-400 dark:text-green-600">AAA</span> ≥7:1 {isZh ? '最高标准' : 'Enhanced'}
									</div>
									<div>
										<span className="font-bold text-blue-400 dark:text-blue-600">AA</span> ≥4.5:1 {isZh ? '推荐标准' : 'Minimum'}
									</div>
									<div>
										<span className="font-bold text-yellow-400 dark:text-yellow-600">A</span> ≥3:1 {isZh ? '大文本标准' : 'Large text'}
									</div>
									<div>
										<span className="font-bold text-red-400 dark:text-red-600">Fail</span> &lt;3:1 {isZh ? '不符合标准' : 'Non-compliant'}
									</div>
								</div>
								<div className="absolute -bottom-1 right-1 h-2 w-2 rotate-45 bg-black dark:bg-white"></div>
							</div>
						</div>
					</div>
				</div>
			) : null}

			{/* 色块区域 */}
			<div className={`relative mb-3 ${colorMode === 'oklch' ? '' : 'flex justify-center'}`}>
				<canvas
					ref={lcCanvasRef}
					style={{
						width: `${colorMode === 'oklch' ? LC_WIDTH : WHEEL_SIZE}px`,
						height: `${colorMode === 'oklch' ? LC_HEIGHT : WHEEL_SIZE}px`
					}}
					className={`cursor-crosshair ${colorMode === 'oklch' ? 'rounded-md border border-black/10 dark:border-white/20' : ''}`}
					onMouseDown={onLCMouseDown}
					onTouchStart={onLCTouchStart}
					aria-label={isZh ? '颜色选择器' : 'Color selector'}
					tabIndex={0}
				></canvas>
				<div
					className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
					style={{
						left: `${colorMode === 'oklch' ? getColorBlockPosition().x : (LC_WIDTH - WHEEL_SIZE) / 2 + getColorBlockPosition().x}px`,
						top: `${getColorBlockPosition().y}px`,
						backgroundColor: currentHex
					}}
				></div>
			</div>

			{/* 滑动条 1 */}
			<div className="mb-2 flex items-center gap-2">
				<span className="w-3 flex-none text-xs text-black/60 dark:text-white/60">{getLabels()[0]}</span>
				<div className="relative flex-1" ref={sliderWidthRef}>
					<canvas
						ref={slider1CanvasRef}
						style={{ height: `${BAR_HEIGHT}px` }}
						className="w-full cursor-pointer rounded-md border border-black/10 dark:border-white/20"
						onMouseDown={onSlider1MouseDown}
						onTouchStart={onSlider1TouchStart}
						tabIndex={0}
					></canvas>
					<div
						className="pointer-events-none absolute top-0 h-full w-1 -translate-x-1/2 rounded-sm bg-white shadow-md"
						style={{ left: `${getSlider1Position()}px`, border: '1px solid rgba(0,0,0,0.3)' }}
					></div>
				</div>
				<input
					type="text"
					value={input1}
					onChange={(e) => setInput1(e.target.value)}
					onBlur={onBlur1}
					onKeyDown={onKeydown1}
					className="w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark"
				/>
			</div>

			{/* 滑动条 2 */}
			<div className="mb-2 flex items-center gap-2">
				<span className="w-3 flex-none text-xs text-black/60 dark:text-white/60">{getLabels()[1]}</span>
				<div className="relative flex-1">
					<canvas
						ref={slider2CanvasRef}
						style={{ height: `${BAR_HEIGHT}px` }}
						className="w-full cursor-pointer rounded-md border border-black/10 dark:border-white/20"
						onMouseDown={onSlider2MouseDown}
						onTouchStart={onSlider2TouchStart}
						tabIndex={0}
					></canvas>
					<div
						className="pointer-events-none absolute top-0 h-full w-1 -translate-x-1/2 rounded-sm bg-white shadow-md"
						style={{ left: `${getSlider2Position()}px`, border: '1px solid rgba(0,0,0,0.3)' }}
					></div>
				</div>
				<input
					type="text"
					value={input2}
					onChange={(e) => setInput2(e.target.value)}
					onBlur={onBlur2}
					onKeyDown={onKeydown2}
					className="w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark"
				/>
			</div>

			{/* 滑动条 3 */}
			<div className="mb-3 flex items-center gap-2">
				<span className="w-3 flex-none text-xs text-black/60 dark:text-white/60">{getLabels()[2]}</span>
				<div className="relative flex-1">
					<canvas
						ref={slider3CanvasRef}
						style={{ height: `${BAR_HEIGHT}px` }}
						className="w-full cursor-pointer rounded-md border border-black/10 dark:border-white/20"
						onMouseDown={onSlider3MouseDown}
						onTouchStart={onSlider3TouchStart}
						tabIndex={0}
					></canvas>
					<div
						className="pointer-events-none absolute top-0 h-full w-1 -translate-x-1/2 rounded-sm bg-white shadow-md"
						style={{ left: `${getSlider3Position()}px`, border: '1px solid rgba(0,0,0,0.3)' }}
					></div>
				</div>
				<input
					type="text"
					value={input3}
					onChange={(e) => setInput3(e.target.value)}
					onBlur={onBlur3}
					onKeyDown={onKeydown3}
					className="w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark"
				/>
			</div>

			{/* 模式切换 */}
			<div className="flex justify-center gap-1 rounded-md bg-black/5 p-1 dark:bg-white/5">
				<button
					onClick={() => setColorMode('oklch')}
					className={`flex-1 rounded px-2 py-1 text-xs font-medium transition-colors ${
						colorMode === 'oklch'
							? 'bg-white text-black shadow-sm dark:bg-white/20 dark:text-white'
							: 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
					}`}
					type="button"
				>
					OKLCH
				</button>
				<button
					onClick={() => setColorMode('rgb')}
					className={`flex-1 rounded px-2 py-1 text-xs font-medium transition-colors ${
						colorMode === 'rgb'
							? 'bg-white text-black shadow-sm dark:bg-white/20 dark:text-white'
							: 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
					}`}
					type="button"
				>
					RGB
				</button>
				<button
					onClick={() => setColorMode('hex')}
					className={`flex-1 rounded px-2 py-1 text-xs font-medium transition-colors ${
						colorMode === 'hex'
							? 'bg-white text-black shadow-sm dark:bg-white/20 dark:text-white'
							: 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
					}`}
					type="button"
				>
					HEX
				</button>
			</div>

			{/* 快捷键提示 */}
			{colorMode !== 'hex' ? (
				<div className="mt-2 text-center text-xs text-black/40 dark:text-white/40">
					{colorMode === 'oklch' ? (
						isMac ? (
							<>↑↓ ±0.01 | ⇧ ±0.1 | ⌥ ±0.001</>
						) : (
							<>↑↓ ±0.01 | Shift ±0.1 | Ctrl ±0.001</>
						)
					) : isMac ? (
						<>↑↓ ±5 | ⇧ ±10 | ⌥ ±1</>
					) : (
						<>↑↓ ±5 | Shift ±10 | Ctrl ±1</>
					)}
				</div>
			) : null}
		</div>
	);
};

export default ColorPicker;
