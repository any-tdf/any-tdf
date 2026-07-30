<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		resolveCountDownDerived,
		resolveCountDownPauseAction,
		resolveCountDownResetAction,
		resolveCountDownShouldAutoStart,
		resolveCountDownShouldResumeTick,
		resolveCountDownStartAction,
		resolveCountDownStateOptions,
		resolveCountDownTickAction,
		resolveCountDownTimePropAction
	} from '@any-tdf/common/derived/countDown';
	import type { CountDownProps } from '../../types/index.js';

	let {
		time = 0,
		format = 'HH:mm:ss',
		autoStart = true,
		millisecond = false,
		injClass = '',
		children,
		onfinish,
		onchange
	}: CountDownProps = $props();

	// 剩余时间（毫秒）
	// Remaining time (milliseconds)
	let remain = $derived(time);

	// 是否正在运行
	// Whether running
	let counting = $state(false);

	// 结束时间戳
	// End timestamp
	let endTime = 0;

	// 动画帧 ID
	// Animation frame ID
	let rafId: number | null = null;

	// 上一次的 time 值，用于检测外部传入的 time 是否变化
	// Previous time value, used to detect external time prop changes
	let prevTime = $derived(time);

	// 输入组件状态，返回框架无关的文本、时间拆分和 class 派生结果。
	// Receive component state and return framework-agnostic text, time parts and class derivations.
	const countDownState = $derived(
		resolveCountDownDerived(
			resolveCountDownStateOptions({
				props: { format, injClass },
				remain
			})
		)
	);

	// 计时核心函数
	// Core timing function
	const tick = () => {
		// 公共 action 只返回下一次 tick 的动作，动画帧和回调留在组件内。
		// Shared action only returns the next tick action; animation frames and callbacks stay in the component.
		const action = resolveCountDownTickAction({ endTime, now: Date.now(), previousRemain: remain, millisecond });

		remain = action.nextRemain;
		if (action.shouldChange) onchange?.(action.timeData);

		if (action.shouldContinue) {
			rafId = requestAnimationFrame(tick);
		} else {
			counting = action.nextCounting;
			onfinish?.();
		}
	};

	// 开始倒计时
	// Start countdown
	const start = () => {
		const action = resolveCountDownStartAction({ counting, remain, now: Date.now() });
		if (!action.shouldStart) return;

		counting = action.nextCounting;
		endTime = action.endTime;
		tick();
	};

	// 暂停倒计时
	// Pause countdown
	const pause = () => {
		const action = resolveCountDownPauseAction({ counting, endTime, now: Date.now() });
		if (!action.shouldPause) return;

		counting = action.nextCounting;
		if (action.shouldCancelTick && rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
		remain = action.nextRemain;
	};

	// 重置倒计时
	// Reset countdown
	const reset = (newTime?: number) => {
		pause();
		const action = resolveCountDownResetAction({ newTime, time });
		remain = action.nextRemain;
		onchange?.(action.timeData);
	};

	// 处理页面可见性变化
	// Handle page visibility change
	const handleVisibilityChange = () => {
		if (resolveCountDownShouldResumeTick({ hidden: document.hidden, counting, rafId })) {
			tick();
		}
	};

	onMount(() => {
		if (resolveCountDownShouldAutoStart({ autoStart, time })) {
			start();
		}

		// 监听页面可见性变化
		// Listen for page visibility changes
		document.addEventListener('visibilitychange', handleVisibilityChange);
	});

	onDestroy(() => {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
		}
		document.removeEventListener('visibilitychange', handleVisibilityChange);
	});

	// 监听 time 属性变化（只在外部 time 真正变化时才更新）
	// Watch time prop changes (only update when external time actually changes)
	$effect(() => {
		const action = resolveCountDownTimePropAction({ nextTime: time, previousTime: prevTime, counting });
		prevTime = action.nextPreviousTime;
		if (action.shouldSyncRemain) {
			remain = action.nextRemain;
		}
	});

	// 暴露方法供外部调用
	// Expose methods for external use
	export { start, pause, reset };
</script>

<span class={countDownState.rootClass}>
	{#if children}
		{@render children(countDownState.timeData)}
	{:else}
		{countDownState.displayText}
	{/if}
</span>
