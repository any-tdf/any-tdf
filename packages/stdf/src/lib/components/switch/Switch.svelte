<script lang="ts">
	import Loading from '../loading/Loading.svelte';
	import type { SwitchProps } from '../../types/index.js';
	import {
		resolveSwitchActiveSyncAction,
		resolveSwitchClickAction,
		resolveSwitchDerived,
		resolveSwitchStateOptions,
		resolveSwitchStretchFlow,
	} from '@any-tdf/common/derived/switch';

	let {
		active = $bindable(false),
		radius = '',
		inside = null,
		injClass = '',
		disabled = false,
		async = false,
		loading = {},
		trueChild,
		falseChild,
		onchange,
		onclick
	}: SwitchProps = $props();

	// 是否处于纵向拉长状态
	// Whether the thumb is stretching.
	let isLong = $state(false);

	// 公共派生层只处理 Switch 的 class 字符串、滑块样式和下一状态，事件与 slot 留在组件内。
	// Shared derived layer only handles Switch class strings, thumb styles and next state; events and slots stay in the component.
	let switchState = $derived(
		resolveSwitchDerived(
			resolveSwitchStateOptions({
				props: { disabled, radius, injClass, inside },
				active,
				isLong,
				hasTrueChild: Boolean(trueChild),
				hasFalseChild: Boolean(falseChild)
			})
		)
	);

	const setChangeFun = () => {
		// 公共动作函数只返回更新和事件触发决策，组件层负责状态写入。
		// Shared action function only returns update and event decisions; the component writes state.
		const action = resolveSwitchClickAction({ active, disabled, async: async });
		if (action.shouldChange) {
			active = action.nextActive;
			onchange?.(action.nextActive);
		}
		if (action.shouldClick) onclick?.();
	};

	$effect(() => {
		// 公共 action 只返回同步和拉伸决策，定时器与状态写入留在组件层。
		// Shared actions only return sync and stretch decisions; timers and state writes stay in the component layer.
		const syncAction = resolveSwitchActiveSyncAction({ active, disabled });
		const stretchFlow = resolveSwitchStretchFlow({ disabled });
		if (syncAction.shouldSync) active = syncAction.nextActive;
		if (stretchFlow.shouldStretch) {
			isLong = stretchFlow.nextIsLong;
			setTimeout(() => {
				isLong = stretchFlow.resetNextIsLong;
			}, stretchFlow.resetDelay);
		}
	});
</script>

<button
	onclick={setChangeFun}
	class={switchState.rootClass}
>
	<div
		class={switchState.thumbClass}
		style={switchState.thumbStyleString}
	>
		{#if switchState.insideState.kind === 'state'}
			<span class={switchState.insideState.trueClass}><div class={switchState.stateTrueMarkClass}></div></span>
			<span class={switchState.insideState.falseClass}><div class={switchState.stateFalseMarkClass}></div></span>
		{:else if switchState.insideState.kind === 'loading'}
			<div class={switchState.loadingClass}>
				<Loading width="full" height="full" {...loading} />
			</div>
		{:else if switchState.insideState.kind === 'children'}
			<span class={switchState.insideState.trueClass}>{@render trueChild?.()}</span>
			<span class={switchState.insideState.falseClass}>{@render falseChild?.()}</span>
		{:else if switchState.insideState.kind === 'array'}
			<span>{switchState.insideState.value}</span>
		{:else}{/if}
	</div>
</button>
