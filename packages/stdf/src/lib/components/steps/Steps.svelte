<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { StepsProps } from '../../types/index.js';
	import {
		resolveStepsDerived,
		resolveStepsMeasuredHeightItemState,
		resolveStepsStateOptions,
	} from '@any-tdf/common/derived/steps';

	let { steps = [], current = 1, radius = '', barBorder = true, vertical = false }: StepsProps = $props();

	let width = $state(0);

	let heightList = $state<number[]>([]);
	// 公共派生层处理 Steps 的数据选择、class 和布局值，DOM 测量留在组件层。
	// Shared derived layer handles Steps data selection, classes and layout values; DOM measurement stays in the component layer.
	const stepsState = $derived(
		resolveStepsDerived(
			resolveStepsStateOptions({
				props: { steps, current, radius, barBorder, vertical },
				width,
				heightList
			})
		)
	);
	const getClientHeight = (node: HTMLElement, index: number) => {
		const syncHeight = (nextIndex: number) => {
			const heightState = resolveStepsMeasuredHeightItemState({ currentHeights: heightList, index: nextIndex, height: node.clientHeight });
			if (heightState.shouldUpdate) {
				heightList = heightState.heights;
			}
		};

		syncHeight(index);
		return {
			update: syncHeight
		};
	};
</script>

{#if vertical}
	<div class={stepsState.verticalRootClass}>
		{#each stepsState.items as itemViewState (itemViewState.item.step.title)}
			{@const item = itemViewState.item}
			{@const i = itemViewState.index}
			{@const itemState = itemViewState.itemState}
			{@const barContentState = itemViewState.barContentState}
			<div class={itemViewState.verticalItemClass} use:getClientHeight={i}>
				{#if itemState.hasBar}
					<div class={itemViewState.barWrapperClass}>
						<div
							class={itemViewState.lineClass}
							style={itemViewState.lineStyleString}
						></div>
						<div
							class={itemViewState.barClass}
							style={itemViewState.barStyleString}
						>
							{#if barContentState.kind === 'icon'}
								<div class={itemViewState.barIconClass}>
									<Icon
										{...barContentState.iconProps}
										size={16}
									/>
								</div>
							{:else if barContentState.kind === 'image'}
								<img
									class={itemViewState.barImageClass}
									src={barContentState.src}
									alt=""
								/>
							{:else if barContentState.kind === 'text'}
								<div class={itemViewState.barTextClass}>
									{barContentState.text}
								</div>
							{/if}
						</div>
					</div>
				{:else}
					<div class={itemViewState.barWrapperClass}>
						<div
							class={itemViewState.lineClass}
							style={itemViewState.lineStyleString}
						></div>
						<div
							class={itemViewState.barClass}
							style={itemViewState.barStyleString}
						></div>
					</div>
				{/if}
				<div class={itemViewState.contentClass}>
					<div class={itemViewState.titleClass}>
						{itemState.title}
					</div>
					{#if itemState.desc}
						<div class={itemViewState.descClass}>
							{itemState.desc}
						</div>
					{/if}
					{#if itemState.inject}
						{@const SvelteComponent = itemState.inject as typeof item.step.injComponent}
						<SvelteComponent />
					{/if}
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div class={stepsState.horizontalRootClass} bind:clientWidth={width}>
		{#each stepsState.items as itemViewState (itemViewState.item.step.title)}
			{@const itemState = itemViewState.itemState}
			{@const barContentState = itemViewState.barContentState}
			<div class={itemViewState.horizontalItemClass}>
				{#if itemState.hasBar}
					<div class={itemViewState.barWrapperClass}>
						<div
							class={itemViewState.lineClass}
							style={itemViewState.lineStyleString}
						></div>
						<div
							class={itemViewState.barClass}
							style={itemViewState.barStyleString}
						>
							{#if barContentState.kind === 'icon'}
								<div class={itemViewState.barIconClass}>
									<Icon
										{...barContentState.iconProps}
										size={16}
									/>
								</div>
							{:else if barContentState.kind === 'image'}
								<img
									class={itemViewState.barImageClass}
									src={barContentState.src}
									alt=""
								/>
							{:else if barContentState.kind === 'text'}
								<div class={itemViewState.barTextClass}>
									{barContentState.text}
								</div>
							{/if}
						</div>
					</div>
				{:else}
					<div class={itemViewState.barWrapperClass}>
						<div
							class={itemViewState.lineClass}
							style={itemViewState.lineStyleString}
						></div>
						<div
							class={itemViewState.barClass}
							style={itemViewState.barStyleString}
						></div>
					</div>
				{/if}
				<div class={itemViewState.titleClass}>
					{itemState.title}
				</div>
			</div>
		{/each}
	</div>
{/if}
