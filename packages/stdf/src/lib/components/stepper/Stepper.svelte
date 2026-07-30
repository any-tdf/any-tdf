<script lang="ts">
	import Loading from '../loading/Loading.svelte';
	import SvgIcon from '../utils/SvgIcon.svelte';
	import type { StepperProps } from '../../types/index.js';
	import {
		resolveStepperDerived,
		resolveStepperStateOptions,
		resolveStepperStepAction,
	} from '@any-tdf/common/derived/stepper';
	import { minusSvg, plusSvg } from '@any-tdf/common/svg/common';

	let {
		value = $bindable(10),
		min = 0,
		max = 100,
		step = 1,
		vertical = false,
		numberHighlight = false,
		theme = true,
		radius = '',
		decimal = 0,
		async = false,
		asyncLoading = false,
		loading = {},
		padding = true,
		width = 0,
		injClassOut = '',
		injClassBtn = '',
		injClassNum = '',
		onchange,
		ondecrease,
		onincrease
	}: StepperProps = $props();

	// 减少
	// Decrease
	const decreaseFn = () => {
		// 公共动作函数只返回下一值和是否变更，事件仍由组件派发。
		// Shared action function only returns the next value and change decision; events are still dispatched by the component.
		const action = resolveStepperStepAction({ type: 'decrease', value, min, step, async });
		if (action.shouldChange) {
			value = action.nextValue;
			onchange?.(value);
		}
		ondecrease?.();
	};

	// 增加
	// Increase
	const increaseFn = () => {
		// 公共动作函数只返回下一值和是否变更，事件仍由组件派发。
		// Shared action function only returns the next value and change decision; events are still dispatched by the component.
		const action = resolveStepperStepAction({ type: 'increase', value, max, step, async });
		if (action.shouldChange) {
			value = action.nextValue;
			onchange?.(value);
		}
		onincrease?.();
	};

	// 计算圆角类名，竖向时不允许 full
	// Calculate radius class, full is not allowed when vertical.
	const stepperState = $derived(
		resolveStepperDerived(
			resolveStepperStateOptions({
				value,
				props: { min, max, async, vertical, numberHighlight, theme, radius, decimal, padding, width, injClassOut, injClassBtn, injClassNum }
			})
		)
	);
</script>

<div class={stepperState.rootClass}>
	<button
		onclick={decreaseFn}
		class={stepperState.buttonClass}
		disabled={stepperState.decreaseDisabled}
		aria-label="decrease"
	>
		<span class={stepperState.decreaseIconClass}>
			<!-- 公共 SVG 数据在 common，点击和 disabled 绑定留在组件层。 -->
			<!-- Shared SVG data lives in common; click and disabled bindings stay in the component layer. -->
			<SvgIcon svg={minusSvg} width="24" height="24" class={stepperState.iconClass} />
		</span>
	</button>

	{#if async && asyncLoading}
		<div class={stepperState.loadingClass}>
			<Loading width="6" height="6" {...loading} />
		</div>
	{:else}
		<div
			class={stepperState.numberClass}
			style={stepperState.numberStyleString}
		>
			{stepperState.displayValue}
		</div>
	{/if}

	<button
		onclick={increaseFn}
		class={stepperState.buttonClass}
		aria-label="increase"
		disabled={stepperState.increaseDisabled}
	>
		<span class={stepperState.increaseIconClass}>
			<SvgIcon svg={plusSvg} width="24" height="24" class={stepperState.iconClass} />
		</span>
	</button>
</div>
