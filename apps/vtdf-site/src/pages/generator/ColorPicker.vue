<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
	formatOklch,
	getMaxChroma as getMaxChromaUtil,
	hslToRgb,
	isDisplayable,
	oklchToRgb,
	rgbToHex,
	rgbToHsl,
	rgbToOklch as rgbToOklchUtil
} from 'vtdf/utils';

type OklchColor = { l: number; c: number; h: number };
type ColorMode = 'oklch' | 'rgb' | 'hex';

const props = withDefaults(
	defineProps<{
		value?: OklchColor;
		contrastTarget?: OklchColor;
		showContrast?: boolean;
	}>(),
	{
		value: () => ({ l: 0.7, c: 0.15, h: 250 }),
		contrastTarget: undefined,
		showContrast: false
	}
);

const emit = defineEmits<{
	'update:value': [value: OklchColor];
	change: [color: OklchColor, hex: string, rgb: [number, number, number]];
}>();

const lcCanvas = ref<HTMLCanvasElement | null>(null);
const slider1Canvas = ref<HTMLCanvasElement | null>(null);
const slider2Canvas = ref<HTMLCanvasElement | null>(null);
const slider3Canvas = ref<HTMLCanvasElement | null>(null);

const isDraggingLC = ref(false);
const isDragging1 = ref(false);
const isDragging2 = ref(false);
const isDragging3 = ref(false);
const copiedText = ref<string>('');
const showCopyTip = ref(false);
let rafId: number | null = null;

// 当前模式
const colorMode = ref<ColorMode>('oklch');

// 输入框临时值（用于失焦验证）
const input1 = ref('');
const input2 = ref('');
const input3 = ref('');

// 语言支持
const isZh = typeof window !== 'undefined' ? localStorage.getItem('lang') === 'zh_CN' : true;

// 面板尺寸
const LC_WIDTH = 288;
const LC_HEIGHT = 180;
const BAR_HEIGHT = 16;

// 滑块容器宽度（动态）
const sliderWidth = ref(200);
const sliderContainerEl = ref<HTMLDivElement | null>(null);
let sliderResizeObserver: ResizeObserver | null = null;

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
		h: result.h || props.value.h // 如果色相为 0（灰色），保持原来的色相
	};
};

// 当前颜色的各种格式
const currentHex = computed(() => toHex(props.value.l, props.value.c, props.value.h));
const currentOklch = computed(() => formatOklch(props.value.l, props.value.c, props.value.h));
const currentRgbArray = computed(() => toRgb(props.value.l, props.value.c, props.value.h));
const currentRgb = computed(() => `rgb(${currentRgbArray.value[0]}, ${currentRgbArray.value[1]}, ${currentRgbArray.value[2]})`);

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
const contrastInfo = computed(() => {
	if (!props.showContrast || !props.contrastTarget) return null;
	const targetRgb = toRgb(props.contrastTarget.l, props.contrastTarget.c, props.contrastTarget.h);
	const ratio = getContrastRatio(currentRgbArray.value, targetRgb);
	const { level, color } = getContrastLevel(ratio);
	return { ratio: ratio.toFixed(2), level, color };
});

// 同步输入框值
watch(
	[() => props.value, colorMode],
	() => {
		if (colorMode.value === 'oklch') {
			input1.value = props.value.l.toFixed(3);
			input2.value = props.value.c.toFixed(3);
			input3.value = props.value.h.toFixed(1);
		} else if (colorMode.value === 'rgb') {
			input1.value = currentRgbArray.value[0].toString();
			input2.value = currentRgbArray.value[1].toString();
			input3.value = currentRgbArray.value[2].toString();
		} else {
			input1.value = currentRgbArray.value[0].toString(16).padStart(2, '0');
			input2.value = currentRgbArray.value[1].toString(16).padStart(2, '0');
			input3.value = currentRgbArray.value[2].toString(16).padStart(2, '0');
		}
	},
	{ immediate: true }
);

// 圆形色轮的尺寸
const WHEEL_SIZE = 180;
const WHEEL_RADIUS = WHEEL_SIZE / 2;

// 绘制色块区域
const drawColorBlock = () => {
	const canvas = lcCanvas.value;
	if (!canvas) return;

	if (colorMode.value === 'oklch') {
		// OKLCH 模式：矩形 L-C 平面
		canvas.width = LC_WIDTH * dpr;
		canvas.height = LC_HEIGHT * dpr;
		const ctx = canvas.getContext('2d');
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

				if (isDisplayable(l, c, props.value.h)) {
					const [r, g, b] = oklchToRgb(l, c, props.value.h);
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
		canvas.width = WHEEL_SIZE * dpr;
		canvas.height = WHEEL_SIZE * dpr;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const size = WHEEL_SIZE * dpr;
		const radius = size / 2;
		const imageData = ctx.createImageData(size, size);
		const data = imageData.data;

		// 当前颜色的亮度
		const [, , currentL] = rgbToHsl(currentRgbArray.value[0], currentRgbArray.value[1], currentRgbArray.value[2]);

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
	const canvas = slider1Canvas.value;
	if (!canvas || sliderWidth.value <= 0) return;
	canvas.width = sliderWidth.value * dpr;
	canvas.height = BAR_HEIGHT * dpr;
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const w = sliderWidth.value * dpr;
	const h = BAR_HEIGHT * dpr;
	const imageData = ctx.createImageData(w, h);
	const data = imageData.data;

	for (let x = 0; x < w; x++) {
		let r = 0,
			g = 0,
			b = 0;

		if (colorMode.value === 'oklch') {
			// L 滑动条
			const l = x / w;
			if (isDisplayable(l, props.value.c, props.value.h)) {
				[r, g, b] = oklchToRgb(l, props.value.c, props.value.h);
			} else {
				const maxC = getMaxChroma(l, props.value.h);
				[r, g, b] = oklchToRgb(l, Math.min(props.value.c, maxC), props.value.h);
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
	const canvas = slider2Canvas.value;
	if (!canvas || sliderWidth.value <= 0) return;
	canvas.width = sliderWidth.value * dpr;
	canvas.height = BAR_HEIGHT * dpr;
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const w = sliderWidth.value * dpr;
	const h = BAR_HEIGHT * dpr;
	const imageData = ctx.createImageData(w, h);
	const data = imageData.data;

	for (let x = 0; x < w; x++) {
		let r = 0,
			g = 0,
			b = 0;

		if (colorMode.value === 'oklch') {
			// C 滑动条
			const c = (x / w) * 0.4;
			if (isDisplayable(props.value.l, c, props.value.h)) {
				[r, g, b] = oklchToRgb(props.value.l, c, props.value.h);
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
	const canvas = slider3Canvas.value;
	if (!canvas || sliderWidth.value <= 0) return;
	canvas.width = sliderWidth.value * dpr;
	canvas.height = BAR_HEIGHT * dpr;
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const w = sliderWidth.value * dpr;
	const h = BAR_HEIGHT * dpr;
	const imageData = ctx.createImageData(w, h);
	const data = imageData.data;

	for (let x = 0; x < w; x++) {
		let r = 0,
			g = 0,
			b = 0;

		if (colorMode.value === 'oklch') {
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

// 更新颜色并触发回调
const updateColor = (newValue: OklchColor) => {
	emit('update:value', newValue);
	emit('change', newValue, toHex(newValue.l, newValue.c, newValue.h), toRgb(newValue.l, newValue.c, newValue.h));
};

// 色块区域交互
const handleColorBlockInteraction = (e: MouseEvent | TouchEvent) => {
	const canvas = lcCanvas.value;
	if (!canvas) return;
	const rect = canvas.getBoundingClientRect();
	const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
	const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

	if (colorMode.value === 'oklch') {
		// OKLCH 模式：矩形 L-C 平面
		const x = Math.max(0, Math.min(LC_WIDTH, clientX - rect.left));
		const y = Math.max(0, Math.min(LC_HEIGHT, clientY - rect.top));
		const newL = 1 - y / LC_HEIGHT;
		const newC = (x / LC_WIDTH) * 0.4;
		const maxC = getMaxChroma(newL, props.value.h);
		updateColor({ l: newL, c: Math.min(newC, maxC), h: props.value.h });
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
		const [, , currentL] = rgbToHsl(currentRgbArray.value[0], currentRgbArray.value[1], currentRgbArray.value[2]);
		const [r, g, b] = hslToRgb(hue, saturation, currentL);
		updateColor(rgbToOklch(r, g, b));
	}
};

// 滑动条 1 交互
const handleSlider1Interaction = (e: MouseEvent | TouchEvent) => {
	const canvas = slider1Canvas.value;
	if (!canvas) return;
	const rect = canvas.getBoundingClientRect();
	const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
	const w = rect.width;
	const x = Math.max(0, Math.min(w, clientX - rect.left));

	if (colorMode.value === 'oklch') {
		const newL = x / w;
		const maxC = getMaxChroma(newL, props.value.h);
		updateColor({ l: newL, c: Math.min(props.value.c, maxC), h: props.value.h });
	} else {
		const newR = Math.round((x / w) * 255);
		const newOklch = rgbToOklch(newR, currentRgbArray.value[1], currentRgbArray.value[2]);
		updateColor(newOklch);
	}
};

// 滑动条 2 交互
const handleSlider2Interaction = (e: MouseEvent | TouchEvent) => {
	const canvas = slider2Canvas.value;
	if (!canvas) return;
	const rect = canvas.getBoundingClientRect();
	const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
	const w = rect.width;
	const x = Math.max(0, Math.min(w, clientX - rect.left));

	if (colorMode.value === 'oklch') {
		const newC = (x / w) * 0.4;
		const maxC = getMaxChroma(props.value.l, props.value.h);
		updateColor({ l: props.value.l, c: Math.min(newC, maxC), h: props.value.h });
	} else {
		const newG = Math.round((x / w) * 255);
		const newOklch = rgbToOklch(currentRgbArray.value[0], newG, currentRgbArray.value[2]);
		updateColor(newOklch);
	}
};

// 滑动条 3 交互
const handleSlider3Interaction = (e: MouseEvent | TouchEvent) => {
	const canvas = slider3Canvas.value;
	if (!canvas) return;
	const rect = canvas.getBoundingClientRect();
	const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
	const w = rect.width;
	const x = Math.max(0, Math.min(w, clientX - rect.left));

	if (colorMode.value === 'oklch') {
		const newH = (x / w) * 360;
		const maxC = getMaxChroma(props.value.l, newH);
		updateColor({ l: props.value.l, c: Math.min(props.value.c, maxC), h: newH });
	} else {
		const newB = Math.round((x / w) * 255);
		const newOklch = rgbToOklch(currentRgbArray.value[0], currentRgbArray.value[1], newB);
		updateColor(newOklch);
	}
};

// 鼠标/触摸事件处理
const onLCMouseDown = (e: MouseEvent) => {
	isDraggingLC.value = true;
	handleColorBlockInteraction(e);
};
const onLCTouchStart = (e: TouchEvent) => {
	isDraggingLC.value = true;
	handleColorBlockInteraction(e);
};
const onSlider1MouseDown = (e: MouseEvent) => {
	isDragging1.value = true;
	handleSlider1Interaction(e);
};
const onSlider1TouchStart = (e: TouchEvent) => {
	isDragging1.value = true;
	handleSlider1Interaction(e);
};
const onSlider2MouseDown = (e: MouseEvent) => {
	isDragging2.value = true;
	handleSlider2Interaction(e);
};
const onSlider2TouchStart = (e: TouchEvent) => {
	isDragging2.value = true;
	handleSlider2Interaction(e);
};
const onSlider3MouseDown = (e: MouseEvent) => {
	isDragging3.value = true;
	handleSlider3Interaction(e);
};
const onSlider3TouchStart = (e: TouchEvent) => {
	isDragging3.value = true;
	handleSlider3Interaction(e);
};

const onGlobalMouseMove = (e: MouseEvent) => {
	if (rafId !== null) return;
	rafId = requestAnimationFrame(() => {
		if (isDraggingLC.value) handleColorBlockInteraction(e);
		if (isDragging1.value) handleSlider1Interaction(e);
		if (isDragging2.value) handleSlider2Interaction(e);
		if (isDragging3.value) handleSlider3Interaction(e);
		rafId = null;
	});
};

const onGlobalTouchMove = (e: TouchEvent) => {
	if (rafId !== null) return;
	rafId = requestAnimationFrame(() => {
		if (isDraggingLC.value) handleColorBlockInteraction(e);
		if (isDragging1.value) handleSlider1Interaction(e);
		if (isDragging2.value) handleSlider2Interaction(e);
		if (isDragging3.value) handleSlider3Interaction(e);
		rafId = null;
	});
};

const onGlobalMouseUp = () => {
	isDraggingLC.value = false;
	isDragging1.value = false;
	isDragging2.value = false;
	isDragging3.value = false;
	if (rafId !== null) {
		cancelAnimationFrame(rafId);
		rafId = null;
	}
};

// 输入框失焦验证
const onBlur1 = () => {
	if (colorMode.value === 'oklch') {
		const val = parseFloat(input1.value);
		if (!isNaN(val) && val >= 0 && val <= 1) {
			const newL = val;
			const maxC = getMaxChroma(newL, props.value.h);
			updateColor({ l: newL, c: Math.min(props.value.c, maxC), h: props.value.h });
		}
	} else if (colorMode.value === 'rgb') {
		const val = parseInt(input1.value);
		if (!isNaN(val) && val >= 0 && val <= 255) {
			const newOklch = rgbToOklch(val, currentRgbArray.value[1], currentRgbArray.value[2]);
			updateColor(newOklch);
		}
	} else {
		const val = parseInt(input1.value, 16);
		if (!isNaN(val) && val >= 0 && val <= 255) {
			const newOklch = rgbToOklch(val, currentRgbArray.value[1], currentRgbArray.value[2]);
			updateColor(newOklch);
		}
	}
};

const onBlur2 = () => {
	if (colorMode.value === 'oklch') {
		const val = parseFloat(input2.value);
		if (!isNaN(val) && val >= 0 && val <= 0.4) {
			const maxC = getMaxChroma(props.value.l, props.value.h);
			updateColor({ l: props.value.l, c: Math.min(val, maxC), h: props.value.h });
		}
	} else if (colorMode.value === 'rgb') {
		const val = parseInt(input2.value);
		if (!isNaN(val) && val >= 0 && val <= 255) {
			const newOklch = rgbToOklch(currentRgbArray.value[0], val, currentRgbArray.value[2]);
			updateColor(newOklch);
		}
	} else {
		const val = parseInt(input2.value, 16);
		if (!isNaN(val) && val >= 0 && val <= 255) {
			const newOklch = rgbToOklch(currentRgbArray.value[0], val, currentRgbArray.value[2]);
			updateColor(newOklch);
		}
	}
};

const onBlur3 = () => {
	if (colorMode.value === 'oklch') {
		const val = parseFloat(input3.value);
		if (!isNaN(val)) {
			const newH = ((val % 360) + 360) % 360;
			const maxC = getMaxChroma(props.value.l, newH);
			updateColor({ l: props.value.l, c: Math.min(props.value.c, maxC), h: newH });
		}
	} else if (colorMode.value === 'rgb') {
		const val = parseInt(input3.value);
		if (!isNaN(val) && val >= 0 && val <= 255) {
			const newOklch = rgbToOklch(currentRgbArray.value[0], currentRgbArray.value[1], val);
			updateColor(newOklch);
		}
	} else {
		const val = parseInt(input3.value, 16);
		if (!isNaN(val) && val >= 0 && val <= 255) {
			const newOklch = rgbToOklch(currentRgbArray.value[0], currentRgbArray.value[1], val);
			updateColor(newOklch);
		}
	}
};

// 获取调整步长（Mac 用 Option，Windows 用 Ctrl）
const getStep = (e: KeyboardEvent): number => {
	const fineKey = isMac ? e.altKey : e.ctrlKey;
	if (colorMode.value === 'oklch') {
		if (fineKey) return 0.001;
		if (e.shiftKey) return 0.1;
		return 0.01;
	} else if (colorMode.value === 'rgb') {
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
	if (colorMode.value === 'hex') return;

	if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
		e.preventDefault();
		const step = getStep(e);
		const direction = e.key === 'ArrowUp' ? 1 : -1;

		if (colorMode.value === 'oklch') {
			const newL = Math.max(0, Math.min(1, props.value.l + step * direction));
			const maxC = getMaxChroma(newL, props.value.h);
			updateColor({ l: newL, c: Math.min(props.value.c, maxC), h: props.value.h });
		} else {
			const newR = Math.max(0, Math.min(255, currentRgbArray.value[0] + step * direction));
			updateColor(rgbToOklch(Math.round(newR), currentRgbArray.value[1], currentRgbArray.value[2]));
		}
	}
};

const onKeydown2 = (e: KeyboardEvent) => {
	if (e.key === 'Enter') {
		onBlur2();
		return;
	}
	if (colorMode.value === 'hex') return;

	if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
		e.preventDefault();
		const step = getStep(e);
		const direction = e.key === 'ArrowUp' ? 1 : -1;

		if (colorMode.value === 'oklch') {
			const maxC = getMaxChroma(props.value.l, props.value.h);
			const newC = Math.max(0, Math.min(maxC, props.value.c + step * direction));
			updateColor({ l: props.value.l, c: newC, h: props.value.h });
		} else {
			const newG = Math.max(0, Math.min(255, currentRgbArray.value[1] + step * direction));
			updateColor(rgbToOklch(currentRgbArray.value[0], Math.round(newG), currentRgbArray.value[2]));
		}
	}
};

const onKeydown3 = (e: KeyboardEvent) => {
	if (e.key === 'Enter') {
		onBlur3();
		return;
	}
	if (colorMode.value === 'hex') return;

	if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
		e.preventDefault();
		const step = getStep(e);
		const direction = e.key === 'ArrowUp' ? 1 : -1;

		if (colorMode.value === 'oklch') {
			// H 的步长放大 10 倍（因为范围是 0-360）
			const hStep = step * 10;
			let newH = props.value.h + hStep * direction;
			newH = ((newH % 360) + 360) % 360;
			const maxC = getMaxChroma(props.value.l, newH);
			updateColor({ l: props.value.l, c: Math.min(props.value.c, maxC), h: newH });
		} else {
			const newB = Math.max(0, Math.min(255, currentRgbArray.value[2] + step * direction));
			updateColor(rgbToOklch(currentRgbArray.value[0], currentRgbArray.value[1], Math.round(newB)));
		}
	}
};

// 复制文本到剪贴板
const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		copiedText.value = text;
		showCopyTip.value = true;
		setTimeout(() => {
			showCopyTip.value = false;
		}, 1500);
	} catch (err) {
		console.error('复制失败:', err);
	}
};

// 获取滑动条位置
const getSlider1Position = () => {
	if (colorMode.value === 'oklch') {
		return props.value.l * sliderWidth.value;
	} else {
		return (currentRgbArray.value[0] / 255) * sliderWidth.value;
	}
};

const getSlider2Position = () => {
	if (colorMode.value === 'oklch') {
		// 将 C 值限制在当前 L 和 H 下的最大可显示彩度内
		const maxC = getMaxChroma(props.value.l, props.value.h);
		const displayC = Math.min(props.value.c, maxC);
		return (displayC / 0.4) * sliderWidth.value;
	} else {
		return (currentRgbArray.value[1] / 255) * sliderWidth.value;
	}
};

const getSlider3Position = () => {
	if (colorMode.value === 'oklch') {
		return (props.value.h / 360) * sliderWidth.value;
	} else {
		return (currentRgbArray.value[2] / 255) * sliderWidth.value;
	}
};

// 获取标签
const getLabels = (): [string, string, string] => {
	if (colorMode.value === 'oklch') {
		return ['L', 'C', 'H'];
	} else if (colorMode.value === 'rgb') {
		return ['R', 'G', 'B'];
	} else {
		return ['R', 'G', 'B'];
	}
};

// 获取色块区域指示器位置
const getColorBlockPosition = (): { x: number; y: number } => {
	if (colorMode.value === 'oklch') {
		// 将 C 值限制在当前 L 和 H 下的最大可显示彩度内
		const maxC = getMaxChroma(props.value.l, props.value.h);
		const displayC = Math.min(props.value.c, maxC);
		return {
			x: (displayC / 0.4) * LC_WIDTH,
			y: (1 - props.value.l) * LC_HEIGHT
		};
	} else {
		// RGB/HEX 模式：计算圆形色轮上的位置
		const [hue, saturation] = rgbToHsl(currentRgbArray.value[0], currentRgbArray.value[1], currentRgbArray.value[2]);
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
watch([() => props.value.h, () => props.value.l, () => props.value.c, colorMode, sliderWidth], drawAll);

onMounted(() => {
	drawAll();
	if (sliderContainerEl.value) {
		sliderWidth.value = sliderContainerEl.value.clientWidth;
		sliderResizeObserver = new ResizeObserver((entries) => {
			sliderWidth.value = entries[0].contentRect.width;
		});
		sliderResizeObserver.observe(sliderContainerEl.value);
	}
	window.addEventListener('mousemove', onGlobalMouseMove);
	window.addEventListener('mouseup', onGlobalMouseUp);
	window.addEventListener('touchmove', onGlobalTouchMove);
	window.addEventListener('touchend', onGlobalMouseUp);
});

onBeforeUnmount(() => {
	sliderResizeObserver?.disconnect();
	window.removeEventListener('mousemove', onGlobalMouseMove);
	window.removeEventListener('mouseup', onGlobalMouseUp);
	window.removeEventListener('touchmove', onGlobalTouchMove);
	window.removeEventListener('touchend', onGlobalMouseUp);
});
</script>

<template>
	<div class="w-72 select-none">
		<!-- 颜色预览 -->
		<div class="mb-3 flex items-center gap-3">
			<div
				class="h-10 w-10 flex-none rounded-md border border-black/10 dark:border-white/20"
				:style="{ backgroundColor: currentHex }"
			></div>
			<div class="relative flex-1 text-xs">
				<button
					class="mb-0.5 w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 dark:hover:bg-white/10"
					type="button"
					:title="isZh ? '点击复制' : 'Click to copy'"
					@click="copyToClipboard(currentHex)"
				>
					{{ currentHex }}
				</button>
				<button
					class="mb-0.5 w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 dark:hover:bg-white/10"
					type="button"
					:title="isZh ? '点击复制' : 'Click to copy'"
					@click="copyToClipboard(currentRgb)"
				>
					{{ currentRgb }}
				</button>
				<button
					class="w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 dark:hover:bg-white/10"
					type="button"
					:title="isZh ? '点击复制' : 'Click to copy'"
					@click="copyToClipboard(currentOklch)"
				>
					{{ currentOklch }}
				</button>
				<div
					v-if="showCopyTip"
					class="absolute -top-1 right-0 rounded bg-black/80 px-2 py-1 text-xs text-white dark:bg-white/80 dark:text-black"
				>
					{{ isZh ? '已复制' : 'Copied' }}
				</div>
			</div>
			<div class="relative flex-none group/hint" tabindex="0">
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
					class="pointer-events-none absolute -top-1 right-6 w-40 rounded bg-black px-2 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover/hint:opacity-100 group-focus-within/hint:opacity-100 dark:bg-white dark:text-black"
				>
					{{ isZh ? '转换精度损失肉眼不可见' : 'Precision loss is imperceptible' }}
				</div>
			</div>
		</div>

		<!-- 对比度评分 -->
		<div v-if="contrastInfo" class="mb-3 flex items-center justify-between rounded-md bg-black/5 px-3 py-2 dark:bg-white/5">
			<div class="flex items-center gap-2">
				<span class="text-xs text-black/60 dark:text-white/60">{{ isZh ? '对比度' : 'Contrast' }}</span>
				<span class="font-mono text-sm font-medium">{{ contrastInfo.ratio }}:1</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="text-xs text-black/60 dark:text-white/60">WCAG</span>
				<span class="font-mono text-sm font-bold" :class="contrastInfo.color">{{ contrastInfo.level }}</span>
				<div class="relative flex-none group/wcag" tabindex="0">
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
						class="pointer-events-none absolute bottom-full right-0 z-10 mb-2 w-48 rounded bg-black px-2.5 py-2 text-xs leading-relaxed text-white opacity-0 transition-opacity group-hover/wcag:opacity-100 group-focus-within/wcag:opacity-100 dark:bg-white dark:text-black"
					>
						<div class="mb-1 font-medium">{{ isZh ? '网页内容无障碍指南' : 'Web Content Accessibility Guidelines' }}</div>
						<div class="space-y-0.5 text-white/80 dark:text-black/70">
							<div><span class="font-bold text-green-400 dark:text-green-600">AAA</span> ≥7:1 {{ isZh ? '最高标准' : 'Enhanced' }}</div>
							<div><span class="font-bold text-blue-400 dark:text-blue-600">AA</span> ≥4.5:1 {{ isZh ? '推荐标准' : 'Minimum' }}</div>
							<div><span class="font-bold text-yellow-400 dark:text-yellow-600">A</span> ≥3:1 {{ isZh ? '大文本标准' : 'Large text' }}</div>
							<div>
								<span class="font-bold text-red-400 dark:text-red-600">Fail</span> &lt;3:1 {{ isZh ? '不符合标准' : 'Non-compliant' }}
							</div>
						</div>
						<div class="absolute -bottom-1 right-1 h-2 w-2 rotate-45 bg-black dark:bg-white"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- 色块区域 -->
		<div class="relative mb-3" :class="colorMode === 'oklch' ? '' : 'flex justify-center'">
			<canvas
				ref="lcCanvas"
				:style="{
					width: `${colorMode === 'oklch' ? LC_WIDTH : WHEEL_SIZE}px`,
					height: `${colorMode === 'oklch' ? LC_HEIGHT : WHEEL_SIZE}px`
				}"
				class="cursor-crosshair"
				:class="colorMode === 'oklch' ? 'rounded-md border border-black/10 dark:border-white/20' : ''"
				:aria-label="isZh ? '颜色选择器' : 'Color selector'"
				tabindex="0"
				@mousedown="onLCMouseDown"
				@touchstart="onLCTouchStart"
			></canvas>
			<div
				class="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
				:style="{
					left: `${colorMode === 'oklch' ? getColorBlockPosition().x : (LC_WIDTH - WHEEL_SIZE) / 2 + getColorBlockPosition().x}px`,
					top: `${getColorBlockPosition().y}px`,
					backgroundColor: currentHex
				}"
			></div>
		</div>

		<!-- 滑动条 1 -->
		<div class="mb-2 flex items-center gap-2">
			<span class="w-3 flex-none text-xs text-black/60 dark:text-white/60">{{ getLabels()[0] }}</span>
			<div class="relative flex-1" ref="sliderContainerEl">
				<canvas
					ref="slider1Canvas"
					:style="{ height: `${BAR_HEIGHT}px` }"
					class="w-full cursor-pointer rounded-md border border-black/10 dark:border-white/20"
					tabindex="0"
					@mousedown="onSlider1MouseDown"
					@touchstart="onSlider1TouchStart"
				></canvas>
				<div
					class="pointer-events-none absolute top-0 h-full w-1 -translate-x-1/2 rounded-sm bg-white shadow-md"
					:style="{ left: `${getSlider1Position()}px`, border: '1px solid rgba(0,0,0,0.3)' }"
				></div>
			</div>
			<input
				type="text"
				v-model="input1"
				class="w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark"
				@blur="onBlur1"
				@keydown="onKeydown1"
			/>
		</div>

		<!-- 滑动条 2 -->
		<div class="mb-2 flex items-center gap-2">
			<span class="w-3 flex-none text-xs text-black/60 dark:text-white/60">{{ getLabels()[1] }}</span>
			<div class="relative flex-1">
				<canvas
					ref="slider2Canvas"
					:style="{ height: `${BAR_HEIGHT}px` }"
					class="w-full cursor-pointer rounded-md border border-black/10 dark:border-white/20"
					tabindex="0"
					@mousedown="onSlider2MouseDown"
					@touchstart="onSlider2TouchStart"
				></canvas>
				<div
					class="pointer-events-none absolute top-0 h-full w-1 -translate-x-1/2 rounded-sm bg-white shadow-md"
					:style="{ left: `${getSlider2Position()}px`, border: '1px solid rgba(0,0,0,0.3)' }"
				></div>
			</div>
			<input
				type="text"
				v-model="input2"
				class="w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark"
				@blur="onBlur2"
				@keydown="onKeydown2"
			/>
		</div>

		<!-- 滑动条 3 -->
		<div class="mb-3 flex items-center gap-2">
			<span class="w-3 flex-none text-xs text-black/60 dark:text-white/60">{{ getLabels()[2] }}</span>
			<div class="relative flex-1">
				<canvas
					ref="slider3Canvas"
					:style="{ height: `${BAR_HEIGHT}px` }"
					class="w-full cursor-pointer rounded-md border border-black/10 dark:border-white/20"
					tabindex="0"
					@mousedown="onSlider3MouseDown"
					@touchstart="onSlider3TouchStart"
				></canvas>
				<div
					class="pointer-events-none absolute top-0 h-full w-1 -translate-x-1/2 rounded-sm bg-white shadow-md"
					:style="{ left: `${getSlider3Position()}px`, border: '1px solid rgba(0,0,0,0.3)' }"
				></div>
			</div>
			<input
				type="text"
				v-model="input3"
				class="w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark"
				@blur="onBlur3"
				@keydown="onKeydown3"
			/>
		</div>

		<!-- 模式切换 -->
		<div class="flex justify-center gap-1 rounded-md bg-black/5 p-1 dark:bg-white/5">
			<button
				class="flex-1 rounded px-2 py-1 text-xs font-medium transition-colors"
				:class="
					colorMode === 'oklch'
						? 'bg-white text-black shadow-sm dark:bg-white/20 dark:text-white'
						: 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
				"
				type="button"
				@click="colorMode = 'oklch'"
			>
				OKLCH
			</button>
			<button
				class="flex-1 rounded px-2 py-1 text-xs font-medium transition-colors"
				:class="
					colorMode === 'rgb'
						? 'bg-white text-black shadow-sm dark:bg-white/20 dark:text-white'
						: 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
				"
				type="button"
				@click="colorMode = 'rgb'"
			>
				RGB
			</button>
			<button
				class="flex-1 rounded px-2 py-1 text-xs font-medium transition-colors"
				:class="
					colorMode === 'hex'
						? 'bg-white text-black shadow-sm dark:bg-white/20 dark:text-white'
						: 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
				"
				type="button"
				@click="colorMode = 'hex'"
			>
				HEX
			</button>
		</div>

		<!-- 快捷键提示 -->
		<div v-if="colorMode !== 'hex'" class="mt-2 text-center text-xs text-black/40 dark:text-white/40">
			<template v-if="colorMode === 'oklch'">
				<template v-if="isMac">↑↓ ±0.01 | ⇧ ±0.1 | ⌥ ±0.001</template>
				<template v-else>↑↓ ±0.01 | Shift ±0.1 | Ctrl ±0.001</template>
			</template>
			<template v-else>
				<template v-if="isMac">↑↓ ±5 | ⇧ ±10 | ⌥ ±1</template>
				<template v-else>↑↓ ±5 | Shift ±10 | Ctrl ±1</template>
			</template>
		</div>
	</div>
</template>
