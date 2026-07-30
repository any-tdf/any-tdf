<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { tick } from 'svelte';
	import ColorPicker from './ColorPicker.svelte';
	import { oklchObjToHex } from 'stdf/utils';

	type OklchColor = { l: number; c: number; h: number };

	let {
		value = $bindable({ l: 0.7, c: 0.15, h: 250 }),
		label = '',
		size = 'sm',
		onchange,
		onopen,
		contrastTarget,
		showContrast = false,
		variant = 'default',
		bgColor
	}: {
		value?: OklchColor;
		label?: string;
		size?: 'sm' | 'md' | 'lg';
		onchange?: (color: OklchColor, hex: string, rgb: [number, number, number]) => void;
		onopen?: () => void;
		contrastTarget?: OklchColor;
		showContrast?: boolean;
		variant?: 'default' | 'text' | 'textOnBg';
		bgColor?: OklchColor;
	} = $props();

	const sizeClass = {
		sm: 'h-6 w-6',
		md: 'h-8 w-8',
		lg: 'h-10 w-10'
	};

	// 计算背景色 hex 值（用于 textOnBg 模式）
	let bgHex = $derived(bgColor ? oklchObjToHex(bgColor) : '#ffffff');

	let showPicker = $state(false);
	let pickerPosition = $state({ top: 0, left: 0 });
	let pickerElement: HTMLDivElement | null = $state(null);
	let buttonRect: DOMRect | null = $state(null);

	// 计算 hex 值用于按钮背景色
	let currentHex = $derived(oklchObjToHex(value));

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
		await tick();
		if (pickerElement && buttonRect) {
			const actualHeight = pickerElement.offsetHeight;
			pickerPosition = calculatePickerPosition(buttonRect, actualHeight);
		}
	};

	// 切换选择器
	const togglePicker = async (event: MouseEvent) => {
		const button = event.currentTarget as HTMLElement;
		buttonRect = button.getBoundingClientRect();
		showPicker = !showPicker;
		if (showPicker) {
			// 先用估算高度定位
			pickerPosition = calculatePickerPosition(buttonRect, 500);
			onopen?.();
			// 渲染后用实际高度重新定位
			await updatePosition();
		}
	};

	// 关闭选择器
	const closePicker = () => {
		showPicker = false;
	};

	// 处理键盘事件
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closePicker();
		}
	};
</script>

<div class="group relative">
	{#if variant === 'text'}
		<!-- 全局文字色模式：边框 + A 字母 -->
		<button
			class="{sizeClass[
				size
			]} flex cursor-pointer items-center justify-center rounded-sm border-2 border-black/20 bg-white font-bold dark:border-white/20 dark:bg-gray-900"
			onclick={togglePicker}
			aria-label="Pick {label} color"
		>
			<span style="color: {currentHex};">A</span>
		</button>
	{:else if variant === 'textOnBg'}
		<!-- 主题色上文字模式：主题色背景 + A 字母 -->
		<button
			class="{sizeClass[
				size
			]} flex cursor-pointer items-center justify-center rounded-sm border border-black/20 font-bold dark:border-white/20"
			style="background-color: {bgHex};"
			onclick={togglePicker}
			aria-label="Pick {label} color"
		>
			<span style="color: {currentHex};">A</span>
		</button>
	{:else}
		<!-- 默认模式：纯色块 -->
		<button
			class="{sizeClass[size]} cursor-pointer rounded-sm border border-black/20 dark:border-white/20"
			style="background-color: {currentHex};"
			onclick={togglePicker}
			aria-label="Pick {label} color"
		></button>
	{/if}
	{#if label}
		<div
			class="z-9999 pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-700"
		>
			{label}
			<div class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800 dark:border-r-gray-700"></div>
		</div>
	{/if}
	{#if showPicker}
		<div
			class="z-9998 fixed inset-0"
			onclick={closePicker}
			onkeydown={handleKeydown}
			role="button"
			tabindex="0"
			aria-label="Close picker"
		></div>
		<div
			bind:this={pickerElement}
			class="z-9999 fixed origin-top-left rounded-lg border border-black/10 bg-white p-4 shadow-lg dark:border-white/20 dark:bg-gray-900"
			style="top: {pickerPosition.top}px; left: {pickerPosition.left}px;"
			transition:fly={{ y: -10, duration: 200, easing: cubicOut }}
		>
			<ColorPicker bind:value {onchange} {contrastTarget} {showContrast} />
		</div>
	{/if}
</div>
