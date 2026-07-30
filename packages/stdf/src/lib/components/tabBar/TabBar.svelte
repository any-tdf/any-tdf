<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { TabBarProps } from '../../types/index.js';
	import {
		resolveTabBarClickAction,
		resolveTabBarDerived,
		resolveTabBarStateOptions
	} from '@any-tdf/common/derived/tabBar';

	let {
		labels = [],
		active = $bindable(0),
		line = false,
		lineW = 4,
		love = false,
		injClass = '',
		tabInjClass = '',
		activeTabInjClass = '',
		activeInjClass = '',
		onchange
	}: TabBarProps = $props();

	const clickFun = (i: number) => {
		// 公共动作函数只返回 active 更新结果，组件层负责状态写入和事件触发。
		// Shared action function only returns the active update result; the component writes state and fires events.
		const action = resolveTabBarClickAction({ index: i });
		active = action.nextActive;
		if (action.shouldEmit) onchange?.(action.nextActive);
	};
	let tabW = $state(0);
	// 公共派生层只处理 TabBar 状态推导，事件和宽度测量留在组件内。
	// The shared derived layer only handles TabBar state derivation; events and width measurement stay in the component.
	const tabBarState = $derived(
		resolveTabBarDerived(
			resolveTabBarStateOptions({
				props: {
					labels,
					line,
					lineW,
					love,
					injClass,
					tabInjClass,
					activeTabInjClass,
					activeInjClass
				},
				active,
				tabWidth: tabW
			})
		)
	);
</script>

<div bind:clientWidth={tabW} class={tabBarState.rootClass} style={tabBarState.rootStyleString}>
	{#if tabBarState.showIndicator}
		<div
			class={tabBarState.indicatorClass}
			style={tabBarState.indicatorStyleString}
		></div>
	{/if}
	<div class={tabBarState.listClass}>
		{#each tabBarState.items as itemState (itemState.index)}
			<button
				onclick={() => clickFun(itemState.index)}
				class={itemState.buttonClass}
			>
				{#if itemState.hasIcon}
					<div class={itemState.iconWrapClass}>
						{#if itemState.iconPair.activeIcon && itemState.iconPair.inactiveIcon}
							<i class={itemState.iconPair.activeClass}>
								<Icon
									{...itemState.iconPair.activeIcon}
								/>
							</i>
							<i class={itemState.iconPair.inactiveClass}>
								<Icon
									{...itemState.iconPair.inactiveIcon}
								/>
							</i>
						{/if}
					</div>
				{/if}
				{#if itemState.hasText}
					<div class={itemState.textClass}>
						{itemState.label.text}
					</div>
				{/if}
			</button>
		{/each}
	</div>
</div>
