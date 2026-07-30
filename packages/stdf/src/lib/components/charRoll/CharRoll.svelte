<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { CharRollProps } from '../../types/index.js';
	import * as easing from 'svelte/easing';
	import {
		formatCharRollValue,
		resolveCharRollDerived,
		resolveCharRollDisplayState,
		resolveCharRollEasingFunction,
		resolveCharRollFrameAction,
		resolveCharRollInitialInitialized,
		resolveCharRollPauseAction,
		resolveCharRollResetAction,
		resolveCharRollStartAction,
		resolveCharRollStateOptions,
		resolveCharRollValueChangeAction
	} from '@any-tdf/common/derived/charRoll';

	let {
		value = '',
		duration = 1000,
		delay = 0,
		stagger = 50,
		direction = 'up',
		height = 40,
		separator = false,
		decimal,
		prefix = '',
		suffix = '',
		charSet,
		preset = 'number',
		loops = 1,
		autoStart = true,
		loop = false,
		loopInterval = 3000,
		easing: easingType = 'cubicOut',
		radius = 'sm',
		bg = 'none',
		gap = '1',
		fontSize = 'xl',
		fontWeight = 'bold',
		injClass = '',
		charClass = '',
		children,
		onstart,
		oncomplete,
		onchange
	}: CharRollProps = $props();

	// 当前显示的字符数组（包含前缀后缀）
	// Current display characters array (including prefix and suffix)
	let displayChars = $state<string[]>([]);

	// 每个字符的动画进度 (0-1)
	// Animation progress for each character (0-1)
	let animationProgress = $state<number[]>([]);

	// 每个字符的起始索引（动画开始时显示的字符在字符集中的索引）
	// Starting index for each character (character index in charset when animation starts)
	let startIndexes = $state<number[]>([]);

	// 每个字符的目标索引
	// Target index for each character
	let targetIndexes = $state<number[]>([]);

	// 是否正在动画中
	// Whether animating
	let isAnimating = $state(false);
	let charStarted = $state<boolean[]>([]);

	// 动画帧 ID
	// Animation frame ID
	let rafId: number | null = null;

	// 循环定时器
	// Loop timer
	let loopTimer: ReturnType<typeof setTimeout> | null = null;

	// 上一次的值
	// Previous value
	let prevValue = '';

	// 输入组件状态，返回框架无关的字符展示、class 和 style 派生结果。
	// Receive component state and return framework-agnostic character display, class and style derivations.
	const charRollState = $derived(
		resolveCharRollDerived(resolveCharRollStateOptions({
			animationProgress,
			charStarted,
			displayChars,
			isAnimating,
			props: { bg, charClass, charSet, direction, fontSize, fontWeight, gap, height, injClass, loops, preset, radius },
			startIndexes,
			targetIndexes
		}))
	);

	// 更新显示字符
	// Update display characters
	const updateDisplayChars = () => {
		const nextState = resolveCharRollDisplayState({
			value,
			decimal,
			separator,
			prefix,
			suffix,
			charSetArray: charRollState.charSetArray,
			previousDisplayChars: displayChars,
			previousAnimationProgress: animationProgress,
			previousStartIndexes: startIndexes,
			previousTargetIndexes: targetIndexes,
			autoStart,
			direction,
			loops
		});

		displayChars = nextState.displayChars;
		targetIndexes = nextState.targetIndexes;
		startIndexes = nextState.startIndexes;
		animationProgress = nextState.animationProgress;
		charStarted = nextState.charStarted;
	};

	// 开始动画
	// Start animation
	const start = () => {
		const startAction = resolveCharRollStartAction({ isAnimating, now: Date.now() });
		if (!startAction.shouldStart) return;

		reset();
		isAnimating = startAction.nextAnimating;
		onstart?.();

		const startTime = startAction.startTime;
		const easingFn = resolveCharRollEasingFunction(easing, easingType);
		const charCount = displayChars.length;

		const animate = () => {
			// 公共 action 只返回帧状态，动画帧和循环定时器留在组件内。
			// Shared action only returns frame state; animation frames and loop timers stay in the component.
			const action = resolveCharRollFrameAction({
				charCount,
				delay,
				decimal,
				displayChars,
				duration,
				easing: easingFn,
				loop,
				loopInterval,
				now: Date.now(),
				separator,
				stagger,
				startTime,
				targetIndexes,
				value
			});
			animationProgress = action.animationProgress;
			charStarted = action.charStarted;

			if (action.shouldComplete) {
				isAnimating = action.nextAnimating;
				rafId = null;
				startIndexes = action.completeStartIndexes;
				charStarted = action.completeCharStarted;

				oncomplete?.();
				onchange?.(action.changeValue);

				if (action.shouldScheduleLoop) {
					loopTimer = setTimeout(() => {
						reset();
						start();
					}, action.loopDelayMs);
				}
			} else {
				rafId = requestAnimationFrame(animate);
			}
		};

		rafId = requestAnimationFrame(animate);
	};

	// 重置动画
	// Reset animation
	const reset = () => {
		const action = resolveCharRollResetAction({ displayChars, rafActive: rafId !== null });
		if (action.shouldCancelFrame && rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
		isAnimating = action.nextAnimating;
		animationProgress = action.animationProgress;
		charStarted = action.charStarted;
	};

	// 暂停动画（保存当前位置以便继续）
	// Pause animation (save current position for resuming)
	const pause = () => {
		const action = resolveCharRollPauseAction({
			displayChars,
			animationProgress,
			startIndexes,
			targetIndexes,
			charSetArray: charRollState.charSetArray,
			direction,
			loops,
			rafActive: rafId !== null
		});
		if (action.shouldCancelFrame && rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
		isAnimating = action.nextAnimating;
		startIndexes = action.startIndexes;
		animationProgress = action.animationProgress;
	};

	// 是否已初始化
	// Whether initialized
	let initialized = resolveCharRollInitialInitialized();

	// 初始化
	// Initialize
	onMount(() => {
		prevValue = formatCharRollValue({ value, decimal, separator });
		updateDisplayChars();
		if (autoStart) {
			start();
		} else {
			// 首次加载时，startIndexes 应该等于 targetIndexes（然后滚动 loops 圈）
			// On first load, startIndexes equals targetIndexes (then scroll loops cycles)
			startIndexes = [...targetIndexes];
		}
		initialized = true;
	});

	// 监听 value 变化
	// Watch value changes
	$effect(() => {
		const action = resolveCharRollValueChangeAction({ value, decimal, separator, initialized, previousValue: prevValue, autoStart });
		if (action.shouldUpdateDisplay) {
			prevValue = action.nextPreviousValue;
			updateDisplayChars();
			if (action.shouldRestart) {
				reset();
				start();
			}
		}
	});

	onDestroy(() => {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
		}
		if (loopTimer !== null) {
			clearTimeout(loopTimer);
		}
	});

	// 暴露方法供外部调用
	// Expose methods for external use
	export { start, pause, reset };
</script>

<div class={charRollState.rootClass}>
	{#each charRollState.displayItems as item (item.index)}
		<div
			class={charRollState.charClassName}
			style={charRollState.charHeightStyleString}
		>
			{#if children}
				{@render children(item.meta.displayChar, item.index)}
			{:else if item.meta.inCharSet && item.meta.hasStarted}
				<!-- 滚动的字符列表 -->
				<!-- Scrolling character list -->
				<div
					class={charRollState.scrollListClass}
					style={item.scrollStyleString}
				>
					{#each item.renderIndexes as renderIndex (renderIndex)}
						<div
							class={charRollState.rollItemClass}
							style={item.rollItemStyleString}
						>
							{item.meta.charSetArray[renderIndex % item.meta.charSetArray.length]}
						</div>
					{/each}
				</div>
			{:else}
				<!-- 非字符集中的字符（如逗号、点号、空格等）直接显示 -->
				<!-- Characters not in charset (like comma, dot, space) display directly -->
				<div
					class={charRollState.directClass}
					style={item.directStyleString}
				>
					{item.meta.displayChar}
				</div>
			{/if}
		</div>
	{/each}
</div>
