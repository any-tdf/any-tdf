<script lang="ts">
	import {
		oklchToRgb,
		rgbToHex,
		rgbToOklch as rgbToOklchUtil,
		isDisplayable,
		getMaxChroma as getMaxChromaUtil,
		formatOklch,
		hslToRgb,
		rgbToHsl
	} from 'stdf/utils';

	type OklchColor = { l: number; c: number; h: number };
	type ColorMode = 'oklch' | 'rgb' | 'hex';

	let {
		value = $bindable({ l: 0.7, c: 0.15, h: 250 }),
		onchange,
		contrastTarget,
		showContrast = false
	}: {
		value?: OklchColor;
		onchange?: (color: OklchColor, hex: string, rgb: [number, number, number]) => void;
		contrastTarget?: OklchColor;
		showContrast?: boolean;
	} = $props();

	let lcCanvas = $state<HTMLCanvasElement>();
	let slider1Canvas = $state<HTMLCanvasElement>();
	let slider2Canvas = $state<HTMLCanvasElement>();
	let slider3Canvas = $state<HTMLCanvasElement>();

	let isDraggingLC = $state(false);
	let isDragging1 = $state(false);
	let isDragging2 = $state(false);
	let isDragging3 = $state(false);
	let copiedText = $state<string>('');
	let showCopyTip = $state(false);
	let rafId: number | null = null;

	// 当前模式
	let colorMode = $state<ColorMode>('oklch');

	// 输入框临时值（用于失焦验证）
	let input1 = $state('');
	let input2 = $state('');
	let input3 = $state('');

	// 语言支持
	const isZh = typeof window !== 'undefined' ? localStorage.getItem('lang') === 'zh_CN' : true;

	// 面板尺寸
	const LC_WIDTH = 288;
	const LC_HEIGHT = 180;
	const BAR_HEIGHT = 16;

	// 滑块容器宽度（动态）
	let sliderWidth = $state(200);

	// 设备像素比
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

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
			h: result.h || value.h // 如果色相为 0（灰色），保持原来的色相
		};
	};

	// 当前颜色的各种格式
	let currentHex = $derived(toHex(value.l, value.c, value.h));
	let currentOklch = $derived(formatOklch(value.l, value.c, value.h));
	let currentRgbArray = $derived(toRgb(value.l, value.c, value.h));
	let currentRgb = $derived(`rgb(${currentRgbArray[0]}, ${currentRgbArray[1]}, ${currentRgbArray[2]})`);
	let maxChroma = $derived(getMaxChroma(value.l, value.h));

	// 对比度计算函数
	const sRGBtoLinear = (v: number): number => {
		const scaled = v / 255;
		return scaled <= 0.04045 ? scaled / 12.92 : Math.pow((scaled + 0.055) / 1.055, 2.4);
	};

	const getLuminance = (r: number, g: number, b: number): number => {
		return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
	};

	const getContrastRatio = (rgb1: [number, number, number], rgb2: [number, number, number]): number => {
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
	let contrastInfo = $derived.by(() => {
		if (!showContrast || !contrastTarget) return null;
		const targetRgb = toRgb(contrastTarget.l, contrastTarget.c, contrastTarget.h);
		const ratio = getContrastRatio(currentRgbArray, targetRgb);
		const { level, color } = getContrastLevel(ratio);
		return { ratio: ratio.toFixed(2), level, color };
	});

	// 同步输入框值
	$effect(() => {
		if (colorMode === 'oklch') {
			input1 = value.l.toFixed(3);
			input2 = value.c.toFixed(3);
			input3 = value.h.toFixed(1);
		} else if (colorMode === 'rgb') {
			input1 = currentRgbArray[0].toString();
			input2 = currentRgbArray[1].toString();
			input3 = currentRgbArray[2].toString();
		} else {
			input1 = currentRgbArray[0].toString(16).padStart(2, '0');
			input2 = currentRgbArray[1].toString(16).padStart(2, '0');
			input3 = currentRgbArray[2].toString(16).padStart(2, '0');
		}
	});

	// 圆形色轮的尺寸
	const WHEEL_SIZE = 180;
	const WHEEL_RADIUS = WHEEL_SIZE / 2;

	// 绘制色块区域
	const drawColorBlock = () => {
		if (!lcCanvas) return;

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

					if (isDisplayable(l, c, value.h)) {
						const [r, g, b] = oklchToRgb(l, c, value.h);
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
		if (!slider1Canvas || sliderWidth <= 0) return;
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
				if (isDisplayable(l, value.c, value.h)) {
					[r, g, b] = oklchToRgb(l, value.c, value.h);
				} else {
					const maxC = getMaxChroma(l, value.h);
					[r, g, b] = oklchToRgb(l, Math.min(value.c, maxC), value.h);
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
		if (!slider2Canvas || sliderWidth <= 0) return;
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
				if (isDisplayable(value.l, c, value.h)) {
					[r, g, b] = oklchToRgb(value.l, c, value.h);
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

	// 更新颜色并触发回调
	const updateColor = (newValue: OklchColor) => {
		value = newValue;
		onchange?.(value, toHex(value.l, value.c, value.h), toRgb(value.l, value.c, value.h));
	};

	// 色块区域交互
	const handleColorBlockInteraction = (e: MouseEvent | TouchEvent) => {
		if (!lcCanvas) return;
		const rect = lcCanvas.getBoundingClientRect();
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

		if (colorMode === 'oklch') {
			// OKLCH 模式：矩形 L-C 平面
			const x = Math.max(0, Math.min(LC_WIDTH, clientX - rect.left));
			const y = Math.max(0, Math.min(LC_HEIGHT, clientY - rect.top));
			const newL = 1 - y / LC_HEIGHT;
			const newC = (x / LC_WIDTH) * 0.4;
			const maxC = getMaxChroma(newL, value.h);
			updateColor({ l: newL, c: Math.min(newC, maxC), h: value.h });
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
		if (!slider1Canvas) return;
		const rect = slider1Canvas.getBoundingClientRect();
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const w = rect.width;
		const x = Math.max(0, Math.min(w, clientX - rect.left));

		if (colorMode === 'oklch') {
			const newL = x / w;
			const maxC = getMaxChroma(newL, value.h);
			updateColor({ l: newL, c: Math.min(value.c, maxC), h: value.h });
		} else {
			const newR = Math.round((x / w) * 255);
			const newOklch = rgbToOklch(newR, currentRgbArray[1], currentRgbArray[2]);
			updateColor(newOklch);
		}
	};

	// 滑动条 2 交互
	const handleSlider2Interaction = (e: MouseEvent | TouchEvent) => {
		if (!slider2Canvas) return;
		const rect = slider2Canvas.getBoundingClientRect();
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const w = rect.width;
		const x = Math.max(0, Math.min(w, clientX - rect.left));

		if (colorMode === 'oklch') {
			const newC = (x / w) * 0.4;
			const maxC = getMaxChroma(value.l, value.h);
			updateColor({ l: value.l, c: Math.min(newC, maxC), h: value.h });
		} else {
			const newG = Math.round((x / w) * 255);
			const newOklch = rgbToOklch(currentRgbArray[0], newG, currentRgbArray[2]);
			updateColor(newOklch);
		}
	};

	// 滑动条 3 交互
	const handleSlider3Interaction = (e: MouseEvent | TouchEvent) => {
		if (!slider3Canvas) return;
		const rect = slider3Canvas.getBoundingClientRect();
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const w = rect.width;
		const x = Math.max(0, Math.min(w, clientX - rect.left));

		if (colorMode === 'oklch') {
			const newH = (x / w) * 360;
			const maxC = getMaxChroma(value.l, newH);
			updateColor({ l: value.l, c: Math.min(value.c, maxC), h: newH });
		} else {
			const newB = Math.round((x / w) * 255);
			const newOklch = rgbToOklch(currentRgbArray[0], currentRgbArray[1], newB);
			updateColor(newOklch);
		}
	};

	// 鼠标/触摸事件处理
	const onLCMouseDown = (e: MouseEvent) => {
		isDraggingLC = true;
		handleColorBlockInteraction(e);
	};
	const onLCTouchStart = (e: TouchEvent) => {
		isDraggingLC = true;
		handleColorBlockInteraction(e);
	};
	const onSlider1MouseDown = (e: MouseEvent) => {
		isDragging1 = true;
		handleSlider1Interaction(e);
	};
	const onSlider1TouchStart = (e: TouchEvent) => {
		isDragging1 = true;
		handleSlider1Interaction(e);
	};
	const onSlider2MouseDown = (e: MouseEvent) => {
		isDragging2 = true;
		handleSlider2Interaction(e);
	};
	const onSlider2TouchStart = (e: TouchEvent) => {
		isDragging2 = true;
		handleSlider2Interaction(e);
	};
	const onSlider3MouseDown = (e: MouseEvent) => {
		isDragging3 = true;
		handleSlider3Interaction(e);
	};
	const onSlider3TouchStart = (e: TouchEvent) => {
		isDragging3 = true;
		handleSlider3Interaction(e);
	};

	const onGlobalMouseMove = (e: MouseEvent) => {
		if (rafId !== null) return;
		rafId = requestAnimationFrame(() => {
			if (isDraggingLC) handleColorBlockInteraction(e);
			if (isDragging1) handleSlider1Interaction(e);
			if (isDragging2) handleSlider2Interaction(e);
			if (isDragging3) handleSlider3Interaction(e);
			rafId = null;
		});
	};

	const onGlobalTouchMove = (e: TouchEvent) => {
		if (rafId !== null) return;
		rafId = requestAnimationFrame(() => {
			if (isDraggingLC) handleColorBlockInteraction(e);
			if (isDragging1) handleSlider1Interaction(e);
			if (isDragging2) handleSlider2Interaction(e);
			if (isDragging3) handleSlider3Interaction(e);
			rafId = null;
		});
	};

	const onGlobalMouseUp = () => {
		isDraggingLC = false;
		isDragging1 = false;
		isDragging2 = false;
		isDragging3 = false;
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	};

	// 输入框失焦验证
	const onBlur1 = () => {
		if (colorMode === 'oklch') {
			const val = parseFloat(input1);
			if (!isNaN(val) && val >= 0 && val <= 1) {
				const newL = val;
				const maxC = getMaxChroma(newL, value.h);
				updateColor({ l: newL, c: Math.min(value.c, maxC), h: value.h });
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
		if (colorMode === 'oklch') {
			const val = parseFloat(input2);
			if (!isNaN(val) && val >= 0 && val <= 0.4) {
				const maxC = getMaxChroma(value.l, value.h);
				updateColor({ l: value.l, c: Math.min(val, maxC), h: value.h });
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
		if (colorMode === 'oklch') {
			const val = parseFloat(input3);
			if (!isNaN(val)) {
				const newH = ((val % 360) + 360) % 360;
				const maxC = getMaxChroma(value.l, newH);
				updateColor({ l: value.l, c: Math.min(value.c, maxC), h: newH });
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

	// 获取调整步长（Mac 用 Option，Windows 用 Ctrl）
	const getStep = (e: KeyboardEvent): number => {
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
	const onKeydown1 = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			onBlur1();
			return;
		}
		if (colorMode === 'hex') return;

		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			e.preventDefault();
			const step = getStep(e);
			const direction = e.key === 'ArrowUp' ? 1 : -1;

			if (colorMode === 'oklch') {
				const newL = Math.max(0, Math.min(1, value.l + step * direction));
				const maxC = getMaxChroma(newL, value.h);
				updateColor({ l: newL, c: Math.min(value.c, maxC), h: value.h });
			} else {
				const newR = Math.max(0, Math.min(255, currentRgbArray[0] + step * direction));
				updateColor(rgbToOklch(Math.round(newR), currentRgbArray[1], currentRgbArray[2]));
			}
		}
	};

	const onKeydown2 = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			onBlur2();
			return;
		}
		if (colorMode === 'hex') return;

		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			e.preventDefault();
			const step = getStep(e);
			const direction = e.key === 'ArrowUp' ? 1 : -1;

			if (colorMode === 'oklch') {
				const maxC = getMaxChroma(value.l, value.h);
				const newC = Math.max(0, Math.min(maxC, value.c + step * direction));
				updateColor({ l: value.l, c: newC, h: value.h });
			} else {
				const newG = Math.max(0, Math.min(255, currentRgbArray[1] + step * direction));
				updateColor(rgbToOklch(currentRgbArray[0], Math.round(newG), currentRgbArray[2]));
			}
		}
	};

	const onKeydown3 = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			onBlur3();
			return;
		}
		if (colorMode === 'hex') return;

		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			e.preventDefault();
			const step = getStep(e);
			const direction = e.key === 'ArrowUp' ? 1 : -1;

			if (colorMode === 'oklch') {
				// H 的步长放大 10 倍（因为范围是 0-360）
				const hStep = step * 10;
				let newH = value.h + hStep * direction;
				newH = ((newH % 360) + 360) % 360;
				const maxC = getMaxChroma(value.l, newH);
				updateColor({ l: value.l, c: Math.min(value.c, maxC), h: newH });
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
			copiedText = text;
			showCopyTip = true;
			setTimeout(() => {
				showCopyTip = false;
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

	// 检测是否是 Mac
	const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

	// 初始化和响应式绘制
	$effect(() => {
		drawColorBlock();
	});
	$effect(() => {
		drawSlider1();
	});
	$effect(() => {
		drawSlider2();
	});
	$effect(() => {
		drawSlider3();
	});
</script>

<svelte:window onmousemove={onGlobalMouseMove} onmouseup={onGlobalMouseUp} ontouchmove={onGlobalTouchMove} ontouchend={onGlobalMouseUp} />

<div class="w-72 select-none">
	<!-- 颜色预览 -->
	<div class="mb-3 flex items-center gap-3">
		<div class="h-10 w-10 flex-none rounded-md border border-black/10 dark:border-white/20" style="background-color: {currentHex}"></div>
		<div class="relative flex-1 text-xs">
			<button
				onclick={() => copyToClipboard(currentHex)}
				class="mb-0.5 w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 dark:hover:bg-white/10"
				title={isZh ? '点击复制' : 'Click to copy'}
			>
				{currentHex}
			</button>
			<button
				onclick={() => copyToClipboard(currentRgb)}
				class="mb-0.5 w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 dark:hover:bg-white/10"
				title={isZh ? '点击复制' : 'Click to copy'}
			>
				{currentRgb}
			</button>
			<button
				onclick={() => copyToClipboard(currentOklch)}
				class="w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 dark:hover:bg-white/10"
				title={isZh ? '点击复制' : 'Click to copy'}
			>
				{currentOklch}
			</button>
			{#if showCopyTip}
				<div class="absolute -top-1 right-0 rounded bg-black/80 px-2 py-1 text-xs text-white dark:bg-white/80 dark:text-black">
					{isZh ? '已复制' : 'Copied'}
				</div>
			{/if}
		</div>
		<div class="relative flex-none group/hint">
			<svg
				class="h-4 w-4 cursor-help text-black/40 dark:text-white/40"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path
					d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"
				/>
			</svg>
			<div
				class="pointer-events-none absolute -top-1 right-6 w-40 rounded bg-black px-2 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover/hint:opacity-100 dark:bg-white dark:text-black"
			>
				{isZh ? '转换精度损失肉眼不可见' : 'Precision loss is imperceptible'}
			</div>
		</div>
	</div>

	<!-- 对比度评分 -->
	{#if contrastInfo}
		<div class="mb-3 flex items-center justify-between rounded-md bg-black/5 px-3 py-2 dark:bg-white/5">
			<div class="flex items-center gap-2">
				<span class="text-xs text-black/60 dark:text-white/60">{isZh ? '对比度' : 'Contrast'}</span>
				<span class="font-mono text-sm font-medium">{contrastInfo.ratio}:1</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="text-xs text-black/60 dark:text-white/60">WCAG</span>
				<span class="font-mono text-sm font-bold {contrastInfo.color}">{contrastInfo.level}</span>
				<div class="relative flex-none group/wcag">
					<svg
						class="h-3.5 w-3.5 cursor-help text-black/40 dark:text-white/40"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path
							d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"
						/>
					</svg>
					<div
						class="pointer-events-none absolute bottom-full right-0 z-10 mb-2 w-48 rounded bg-black px-2.5 py-2 text-xs leading-relaxed text-white opacity-0 transition-opacity group-hover/wcag:opacity-100 dark:bg-white dark:text-black"
					>
						<div class="mb-1 font-medium">{isZh ? '网页内容无障碍指南' : 'Web Content Accessibility Guidelines'}</div>
						<div class="space-y-0.5 text-white/80 dark:text-black/70">
							<div><span class="font-bold text-green-400 dark:text-green-600">AAA</span> ≥7:1 {isZh ? '最高标准' : 'Enhanced'}</div>
							<div><span class="font-bold text-blue-400 dark:text-blue-600">AA</span> ≥4.5:1 {isZh ? '推荐标准' : 'Minimum'}</div>
							<div><span class="font-bold text-yellow-400 dark:text-yellow-600">A</span> ≥3:1 {isZh ? '大文本标准' : 'Large text'}</div>
							<div><span class="font-bold text-red-400 dark:text-red-600">Fail</span> &lt;3:1 {isZh ? '不符合标准' : 'Non-compliant'}</div>
						</div>
						<div class="absolute -bottom-1 right-1 h-2 w-2 rotate-45 bg-black dark:bg-white"></div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- 色块区域 -->
	<div class="relative mb-3 {colorMode === 'oklch' ? '' : 'flex justify-center'}">
		<canvas
			bind:this={lcCanvas}
			style="width: {colorMode === 'oklch' ? LC_WIDTH : WHEEL_SIZE}px; height: {colorMode === 'oklch' ? LC_HEIGHT : WHEEL_SIZE}px;"
			class="cursor-crosshair {colorMode === 'oklch' ? 'rounded-md border border-black/10 dark:border-white/20' : ''}"
			onmousedown={onLCMouseDown}
			ontouchstart={onLCTouchStart}
			aria-label={isZh ? '颜色选择器' : 'Color selector'}
			tabindex="0"
		></canvas>
		<div
			class="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
			style="left: {colorMode === 'oklch'
				? getColorBlockPosition().x
				: (LC_WIDTH - WHEEL_SIZE) / 2 + getColorBlockPosition().x}px; top: {getColorBlockPosition().y}px; background-color: {currentHex}"
		></div>
	</div>

	<!-- 滑动条 1 -->
	<div class="mb-2 flex items-center gap-2">
		<span class="w-3 flex-none text-xs text-black/60 dark:text-white/60">{getLabels()[0]}</span>
		<div class="relative flex-1" bind:clientWidth={sliderWidth}>
			<canvas
				bind:this={slider1Canvas}
				style="height: {BAR_HEIGHT}px;"
				class="w-full cursor-pointer rounded-md border border-black/10 dark:border-white/20"
				onmousedown={onSlider1MouseDown}
				ontouchstart={onSlider1TouchStart}
				tabindex="0"
			></canvas>
			<div
				class="pointer-events-none absolute top-0 h-full w-1 -translate-x-1/2 rounded-sm bg-white shadow-md"
				style="left: {getSlider1Position()}px; border: 1px solid rgba(0,0,0,0.3)"
			></div>
		</div>
		<input
			type="text"
			bind:value={input1}
			onblur={onBlur1}
			onkeydown={onKeydown1}
			class="w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark"
		/>
	</div>

	<!-- 滑动条 2 -->
	<div class="mb-2 flex items-center gap-2">
		<span class="w-3 flex-none text-xs text-black/60 dark:text-white/60">{getLabels()[1]}</span>
		<div class="relative flex-1">
			<canvas
				bind:this={slider2Canvas}
				style="height: {BAR_HEIGHT}px;"
				class="w-full cursor-pointer rounded-md border border-black/10 dark:border-white/20"
				onmousedown={onSlider2MouseDown}
				ontouchstart={onSlider2TouchStart}
				tabindex="0"
			></canvas>
			<div
				class="pointer-events-none absolute top-0 h-full w-1 -translate-x-1/2 rounded-sm bg-white shadow-md"
				style="left: {getSlider2Position()}px; border: 1px solid rgba(0,0,0,0.3)"
			></div>
		</div>
		<input
			type="text"
			bind:value={input2}
			onblur={onBlur2}
			onkeydown={onKeydown2}
			class="w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark"
		/>
	</div>

	<!-- 滑动条 3 -->
	<div class="mb-3 flex items-center gap-2">
		<span class="w-3 flex-none text-xs text-black/60 dark:text-white/60">{getLabels()[2]}</span>
		<div class="relative flex-1">
			<canvas
				bind:this={slider3Canvas}
				style="height: {BAR_HEIGHT}px;"
				class="w-full cursor-pointer rounded-md border border-black/10 dark:border-white/20"
				onmousedown={onSlider3MouseDown}
				ontouchstart={onSlider3TouchStart}
				tabindex="0"
			></canvas>
			<div
				class="pointer-events-none absolute top-0 h-full w-1 -translate-x-1/2 rounded-sm bg-white shadow-md"
				style="left: {getSlider3Position()}px; border: 1px solid rgba(0,0,0,0.3)"
			></div>
		</div>
		<input
			type="text"
			bind:value={input3}
			onblur={onBlur3}
			onkeydown={onKeydown3}
			class="w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark"
		/>
	</div>

	<!-- 模式切换 -->
	<div class="flex justify-center gap-1 rounded-md bg-black/5 p-1 dark:bg-white/5">
		<button
			onclick={() => (colorMode = 'oklch')}
			class="flex-1 rounded px-2 py-1 text-xs font-medium transition-colors {colorMode === 'oklch'
				? 'bg-white text-black shadow-sm dark:bg-white/20 dark:text-white'
				: 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'}"
		>
			OKLCH
		</button>
		<button
			onclick={() => (colorMode = 'rgb')}
			class="flex-1 rounded px-2 py-1 text-xs font-medium transition-colors {colorMode === 'rgb'
				? 'bg-white text-black shadow-sm dark:bg-white/20 dark:text-white'
				: 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'}"
		>
			RGB
		</button>
		<button
			onclick={() => (colorMode = 'hex')}
			class="flex-1 rounded px-2 py-1 text-xs font-medium transition-colors {colorMode === 'hex'
				? 'bg-white text-black shadow-sm dark:bg-white/20 dark:text-white'
				: 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'}"
		>
			HEX
		</button>
	</div>

	<!-- 快捷键提示 -->
	{#if colorMode !== 'hex'}
		<div class="mt-2 text-center text-xs text-black/40 dark:text-white/40">
			{#if colorMode === 'oklch'}
				{#if isMac}
					↑↓ ±0.01 | ⇧ ±0.1 | ⌥ ±0.001
				{:else}
					↑↓ ±0.01 | Shift ±0.1 | Ctrl ±0.001
				{/if}
			{:else}
				{#if isMac}
					↑↓ ±5 | ⇧ ±10 | ⌥ ±1
				{:else}
					↑↓ ±5 | Shift ±10 | Ctrl ±1
				{/if}
			{/if}
		</div>
	{/if}
</div>
