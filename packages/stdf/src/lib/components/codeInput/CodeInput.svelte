<script lang="ts">
	import type { CodeInputProps } from '../../types/index.js';
	import {
		normalizeCodeInputValue,
		resolveCodeInputAutoScrollTarget,
		resolveCodeInputBlurAction,
		resolveCodeInputDerived,
		resolveCodeInputFinishFlow,
		resolveCodeInputFocusAction,
		resolveCodeInputInputAction,
		resolveCodeInputShouldAutoScroll,
		resolveCodeInputStateOptions,
	} from '@any-tdf/common/derived/codeInput';
	import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';

	let {
		value = $bindable(''),
		length = 6,
		mask = false,
		gutter = '2',
		focused = $bindable(false),
		type = 'number',
		inputMode = '',
		native = false,
		info = '',
		errorInfo = '',
		radius = '',
		cellSize = 'md',
		cellStyle = 'box',
		cellBg = 'gray',
		cellBorder = 'solid',
		cursorStyle = 'line',
		cursorAnimation = 'blink',
		keyboardVisible = $bindable(false),
		autoClose = false,
		autoScroll = true as boolean | number,
		bold = false,
		injClass = '',
		onfinish,
		onclose,
		onfocus
	}: CodeInputProps = $props();

	// 隐藏输入框引用
	// Hidden input reference
	let inputRef: HTMLInputElement | null = $state(null);

	// 组件容器引用
	// Component container reference
	let containerRef: HTMLDivElement | null = $state(null);
	let lastFinishedValue: string | null = $state(null);

	// 消费框架无关派生结果，组件层只负责事件、绑定和 DOM 读取。
	// Consume framework-agnostic derived results while the component layer keeps events, bindings and DOM reads.
	const codeInputState = $derived(
		resolveCodeInputDerived(
			resolveCodeInputStateOptions({
				props: {
					bold,
					cellBg,
					cellBorder,
					cellSize,
					cellStyle,
					cursorAnimation,
					cursorStyle,
					errorInfo,
					gutter,
					info,
					inputMode,
					injClass,
					length,
					mask,
					native,
					radius,
					type
				},
				focused,
				keyboardVisible,
				value
			})
		)
	);

	// 单元格点击事件
	// Cell click event
	const handleClick = () => {
		// 公共 focus action 只返回聚焦状态和原生输入聚焦决策，DOM focus 留在组件层。
		// Shared focus action only returns focus state and native-input focus decisions; DOM focus stays in the component layer.
		const action = resolveCodeInputFocusAction({ native });
		focused = action.nextFocused;
		if (action.shouldFocusNative && inputRef) {
			inputRef.focus();
		}
		if (action.shouldEmitFocus) onfocus?.();
	};

	// 原生输入处理
	// Native input handler
	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		// 公共 input action 负责清洗原始输入，组件层只同步绑定值。
		// Shared input action normalizes raw input; the component layer only syncs bound value.
		const action = resolveCodeInputInputAction({ rawValue: target.value, length, type });
		value = action.nextValue;
	};

	// 原生输入失焦
	// Native input blur
	const handleBlur = () => {
		const action = resolveCodeInputBlurAction();
		focused = action.nextFocused;
	};

	// 监听输入完成
	// Watch input finish
	$effect(() => {
		// 公共 finish flow 只返回完成和关闭意图，事件派发和状态赋值留在组件层。
		// Shared finish flow only returns finish and close intent; event dispatch and state assignment stay in the component layer.
		const flow = resolveCodeInputFinishFlow({ value, length, lastFinishedValue, autoClose });
		lastFinishedValue = flow.nextLastFinishedValue;
		if (!flow.shouldFinish) return;
		onfinish?.(flow.finishedValue);
		if (flow.shouldClose) {
			keyboardVisible = flow.nextKeyboardVisible;
			focused = flow.nextFocused;
			if (flow.shouldEmitClose) onclose?.();
		}
	});

	// 限制值长度（非原生模式）
	// Limit value length (non-native mode)
	$effect(() => {
		if (!native) {
			// 公共派生负责输入清洗，组件层只处理绑定和事件。
			// Shared derived normalizes input; the component layer only handles binding and events.
			const normalizedValue = normalizeCodeInputValue({ value, length, type, native });
			if (normalizedValue !== value) {
				value = normalizedValue;
			}
		}
	});

	// 键盘弹出时自动滚动页面，避免键盘遮挡输入区域
	// Auto scroll page when keyboard opens to avoid keyboard covering input area
	$effect(() => {
		const shouldScroll = autoScroll;
		const isKeyboardVisible = keyboardVisible;
		const container = containerRef;

		if (resolveCodeInputShouldAutoScroll({ autoScroll: shouldScroll, keyboardVisible: isKeyboardVisible, hasContainer: Boolean(container) }) && container) {
			// 延迟执行，等待键盘动画完成
			// Delay execution to wait for keyboard animation
			const timer = setTimeout(() => {
				const rect = container.getBoundingClientRect();
				const viewportHeight = resolveViewportDimension({ value: window.innerHeight });
				const targetTop = resolveCodeInputAutoScrollTarget({ rectBottom: rect.bottom, viewportHeight, autoScroll, scrollY: window.scrollY });
				// 组件层只执行 DOM 滚动，滚动目标由 common 纯计算得出。
				// The component layer only performs DOM scrolling; common returns the pure target value.
				if (targetTop !== null) {
					window.scrollTo({
						top: targetTop,
						behavior: 'smooth'
					});
				}
			}, 300);

			return () => clearTimeout(timer);
		}
	});
</script>

<div bind:this={containerRef} class={codeInputState.rootClass}>
	<!-- 原生隐藏输入框 -->
	<!-- Native hidden input -->
	{#if native}
		<input
			bind:this={inputRef}
			{value}
			oninput={handleInput}
			onblur={handleBlur}
			type="text"
			inputmode={codeInputState.nativeInputMode}
			maxlength={length}
			autocomplete="one-time-code"
			class={codeInputState.nativeInputClass}
		/>
	{/if}

	<!-- 输入格子 -->
	<!-- Input cells -->
	<button
		class={codeInputState.buttonClass}
		onclick={handleClick}
		aria-label="code input"
	>
		{#each codeInputState.cellDisplayStates as cellDisplayState (cellDisplayState.index)}
			{#if codeInputState.cellStyle === 'line'}
				<!-- 线模式 -->
				<!-- Line mode -->
				<div
					class={cellDisplayState.cellClass}
				>
					{#if cellDisplayState.kind === 'dot'}
						<span class={cellDisplayState.dotClass}></span>
					{:else if cellDisplayState.kind === 'maskText'}
						<span class={cellDisplayState.textClass}>{cellDisplayState.text}</span>
					{:else if cellDisplayState.kind === 'valueText'}
						<span class={cellDisplayState.textClass}>{cellDisplayState.text}</span>
					{:else if cellDisplayState.kind === 'cursor'}
						{#if cellDisplayState.showUnderlineCursor}
							<span class={cellDisplayState.underlineCursorClass}></span>
						{:else}
							<span class={cellDisplayState.cursorClass}></span>
						{/if}
					{/if}
					<!-- 底部线条 -->
					<!-- Bottom line -->
					<span
						class={cellDisplayState.lineClass}
					></span>
				</div>
			{:else}
				<!-- 方格模式 -->
				<!-- Box mode -->
				<div
					class={cellDisplayState.cellClass}
				>
					{#if cellDisplayState.kind === 'dot'}
						<span class={cellDisplayState.dotClass}></span>
					{:else if cellDisplayState.kind === 'maskText'}
						<span class={cellDisplayState.textClass}>{cellDisplayState.text}</span>
					{:else if cellDisplayState.kind === 'valueText'}
						<span class={cellDisplayState.textClass}>{cellDisplayState.text}</span>
					{:else if cellDisplayState.kind === 'cursor'}
						{#if cellDisplayState.showUnderlineCursor}
							<span class={cellDisplayState.underlineCursorClass}></span>
						{:else}
							<span class={cellDisplayState.cursorClass}></span>
						{/if}
					{/if}
				</div>
			{/if}
		{/each}
	</button>

	<!-- 提示信息 -->
	<!-- Info text -->
	{#if codeInputState.infoState.showInfo}
		<p class={codeInputState.infoClass}>
			{codeInputState.infoState.text}
		</p>
	{/if}
</div>
