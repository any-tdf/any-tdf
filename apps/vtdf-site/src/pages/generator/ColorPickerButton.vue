<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import ColorPicker from './ColorPicker.vue';
import { oklchObjToHex } from 'vtdf/utils';

type OklchColor = { l: number; c: number; h: number };

const props = withDefaults(
	defineProps<{
		value?: OklchColor;
		label?: string;
		size?: 'sm' | 'md' | 'lg';
		contrastTarget?: OklchColor;
		showContrast?: boolean;
		variant?: 'default' | 'text' | 'textOnBg';
		bgColor?: OklchColor;
	}>(),
	{
		value: () => ({ l: 0.7, c: 0.15, h: 250 }),
		label: '',
		size: 'sm',
		contrastTarget: undefined,
		showContrast: false,
		variant: 'default',
		bgColor: undefined
	}
);

const emit = defineEmits<{
	'update:value': [value: OklchColor];
	change: [color: OklchColor, hex: string, rgb: [number, number, number]];
	open: [];
}>();

const sizeClass = {
	sm: 'h-6 w-6',
	md: 'h-8 w-8',
	lg: 'h-10 w-10'
};

// 计算背景色 hex 值（用于 textOnBg 模式）
const bgHex = computed(() => (props.bgColor ? oklchObjToHex(props.bgColor) : '#ffffff'));

const showPicker = ref(false);
const pickerPosition = ref({ top: 0, left: 0 });
const pickerElement = ref<HTMLDivElement | null>(null);
let buttonRect: DOMRect | null = null;

// 计算 hex 值用于按钮背景色
const currentHex = computed(() => oklchObjToHex(props.value));

// 计算选择器位置
const calculatePickerPosition = (rect: DOMRect, pickerHeight: number) => {
	const pickerWidth = 320;
	const margin = 8;
	const bottomMargin = 20; // 距离底部最小距离
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;

	let top = rect.top;
	let left = rect.right + margin;

	// 水平位置调整
	if (left + pickerWidth > viewportWidth - margin) {
		left = rect.left - pickerWidth - margin;
	}

	if (left < margin) {
		left = Math.min(rect.right + margin, viewportWidth - pickerWidth - margin);
		if (left < margin) {
			left = margin;
		}
	}

	// 垂直位置调整，确保距离底部至少 bottomMargin
	const maxTop = viewportHeight - pickerHeight - bottomMargin;
	if (top > maxTop) {
		top = maxTop;
	}
	if (top < margin) {
		top = margin;
	}

	return { top, left };
};

// 更新位置（在 picker 渲染后调用）
const updatePosition = async () => {
	await nextTick();
	if (pickerElement.value && buttonRect) {
		const actualHeight = pickerElement.value.offsetHeight;
		pickerPosition.value = calculatePickerPosition(buttonRect, actualHeight);
	}
};

// 切换选择器
const togglePicker = async (event: MouseEvent) => {
	const button = event.currentTarget as HTMLElement;
	buttonRect = button.getBoundingClientRect();
	showPicker.value = !showPicker.value;
	if (showPicker.value) {
		// 先用估算高度定位
		pickerPosition.value = calculatePickerPosition(buttonRect, 500);
		emit('open');
		// 渲染后用实际高度重新定位
		await updatePosition();
	}
};

// 关闭选择器
const closePicker = () => {
	showPicker.value = false;
};

// 处理键盘事件
const handleKeydown = (e: KeyboardEvent) => {
	if (e.key === 'Escape') {
		closePicker();
	}
};

const onPickerUpdate = (value: OklchColor) => {
	emit('update:value', value);
};

const onPickerChange = (color: OklchColor, hex: string, rgb: [number, number, number]) => {
	emit('change', color, hex, rgb);
};
</script>

<template>
	<div class="group relative">
		<!-- 全局文字色模式：边框 + A 字母 -->
		<button
			v-if="variant === 'text'"
			:class="[
				sizeClass[size],
				'flex cursor-pointer items-center justify-center rounded-sm border-2 border-black/20 bg-white font-bold dark:border-white/20 dark:bg-gray-900'
			]"
			type="button"
			:aria-label="`Pick ${label} color`"
			@click="togglePicker"
		>
			<span :style="{ color: currentHex }">A</span>
		</button>
		<!-- 主题色上文字模式：主题色背景 + A 字母 -->
		<button
			v-else-if="variant === 'textOnBg'"
			:class="[
				sizeClass[size],
				'flex cursor-pointer items-center justify-center rounded-sm border border-black/20 font-bold dark:border-white/20'
			]"
			:style="{ backgroundColor: bgHex }"
			type="button"
			:aria-label="`Pick ${label} color`"
			@click="togglePicker"
		>
			<span :style="{ color: currentHex }">A</span>
		</button>
		<!-- 默认模式：纯色块 -->
		<button
			v-else
			:class="[sizeClass[size], 'cursor-pointer rounded-sm border border-black/20 dark:border-white/20']"
			:style="{ backgroundColor: currentHex }"
			type="button"
			:aria-label="`Pick ${label} color`"
			@click="togglePicker"
		></button>
		<div
			v-if="label"
			class="z-9999 pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-gray-700"
		>
			{{ label }}
			<div class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800 dark:border-r-gray-700"></div>
		</div>
		<template v-if="showPicker">
			<div
				class="z-9998 fixed inset-0"
				role="button"
				tabindex="0"
				aria-label="Close picker"
				@click="closePicker"
				@keydown="handleKeydown"
			></div>
			<div
				ref="pickerElement"
				class="z-9999 fixed origin-top-left rounded-lg border border-black/10 bg-white p-4 shadow-lg dark:border-white/20 dark:bg-gray-900"
				:style="{ top: `${pickerPosition.top}px`, left: `${pickerPosition.left}px` }"
			>
				<ColorPicker
					:value="value"
					:contrast-target="contrastTarget"
					:show-contrast="showContrast"
					@update:value="onPickerUpdate"
					@change="onPickerChange"
				/>
			</div>
		</template>
	</div>
</template>
