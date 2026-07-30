<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import Switch from '../switch/Switch.svelte';
	import type { CellProps } from '../../types/index.js';
	import {
		resolveCellClickAction,
		resolveCellDerived,
		resolveCellStateOptions
	} from '@any-tdf/common/derived/cell';
	import { arrowRightSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';

	let {
		title = '',
		detail = '',
		right = 'arrow',
		left = null,
		subTitle = '',
		info = '',
		line = false,
		bg = 'surface',
		my = '4',
		mx = '2',
		radius = '',
		switchActive = $bindable(false),
		shadow = 'xs',
		injClass = '',
		love = false,
		clickAll = true,
		leftChild,
		rightChild,
		detailChild,
		onclick
	}: CellProps = $props();

	// 点击事件
	// Click event
	const setClickFun = () => {
		// 公共动作函数只返回点击和 switch 状态决策，状态写入与事件触发留在组件层。
		// Shared action function only returns click and switch state decisions; state writes and events stay in the component.
		const action = resolveCellClickAction({ clickAll, active: switchActive, right });
		if (!action.shouldClick) return;
		if (action.shouldToggleSwitch) {
			switchActive = action.nextSwitchActive;
		}
		// 派发事件
		// Dispatch event
		onclick?.();
	};

	// 公共派生层处理 Cell class、图标尺寸和右侧内容分支，事件与 slot 留在组件层。
	// Shared derived layer handles Cell classes, icon size and right-content branches; events and slots stay in the component layer.
	const cellState = $derived(
		resolveCellDerived(
			resolveCellStateOptions({
				props: { my, mx, radius, shadow, injClass, bg, clickAll, love, line, subTitle, info, right }
			})
		)
	);
</script>

<div
	class={cellState.outerClass}
>
	<!-- 主内容区域 -->
	<!-- Main content area -->
	<div
		class={cellState.contentClass}
	>
		<button
			onclick={setClickFun}
			class={cellState.rowClass}
		>
			<div class={cellState.leftContentClass}>
				{#if leftChild}
					{@render leftChild?.()}
				{:else if left}
					<div class={cellState.leftIconWrapClass}>
						<Icon {...left} />
					</div>
				{:else}{/if}
				<div class={cellState.titleClass}>
					<div class={cellState.titleTextClass}>{title}</div>
					<div class={cellState.subTitleClass}>{subTitle}</div>
				</div>
			</div>
			<div class={cellState.rightContentClass}>
				<div class={cellState.detailClass}>
					{#if detailChild}
						{@render detailChild?.()}
					{:else if detail}
						<div class={cellState.detailTextClass}>{detail}</div>
					{:else}{/if}
					<div class={cellState.infoClass}>{info}</div>
				</div>
				{#if rightChild}
					{@render rightChild?.()}
				{:else if cellState.rightState.kind === 'arrow'}
					<div class={cellState.rightArrowAccessoryClass}>
						<!-- 公共箭头 SVG 数据在 common 中维护。 / Shared arrow SVG data lives in common. -->
						<SvgIcon svg={arrowRightSvg} class={cellState.rightArrowIconClass} width={cellState.rightState.arrowSize} height={cellState.rightState.arrowSize} />
					</div>
				{:else if cellState.rightState.kind === 'switch'}
					<div class={cellState.rightAccessoryClass}>
						<Switch active={switchActive} {...cellState.rightState.switchProps} />
					</div>
				{:else if cellState.rightState.kind === 'icon'}
					<div class={cellState.rightAccessoryClass}>
						<Icon {...cellState.rightState.iconProps} />
					</div>
				{:else}{/if}
			</div>
		</button>
	</div>
</div>
