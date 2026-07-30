<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { debounce, throttleWithRAF } from '@any-tdf/common/utils';
	import {
		resolveSliderChangePayload,
		resolveSliderDerived,
		resolveSliderEndPositions,
		resolveSliderMeasuredBlockWidth,
		resolveSliderMeasuredLayoutState,
		resolveSliderPointerMoveAction,
		resolveSliderPointerStartAction,
		resolveSliderPositionSyncAction,
		resolveSliderRangeMoveState,
		resolveSliderRangeStartState,
		resolveSliderSingleMoveState,
		resolveSliderSingleStartState,
		resolveSliderStateOptions,
		type SliderMoveTarget
	} from '@any-tdf/common/derived/slider';
	import type { SliderProps } from '../../types/index.js';

	let {
		value = $bindable(40),
		step = 1,
		minRange = 0,
		maxRange = 100,
		isRange = false,
		valueRange = $bindable([20, 60]),
		startValue = $bindable(20),
		endValue = $bindable(60),
		showTip = 'touch',
		showSteps = false,
		stepsStyle = 'block',
		stepLabels = [],
		radius = '',
		lineBlock = false,
		disabled = false,
		readonly = false,
		children,
		onchange
	}: SliderProps = $props();

	const emitSliderChange = (nextValue: number, nextRange?: [number, number]) => {
		const payload = resolveSliderChangePayload({ value: nextValue, valueRange: nextRange, minRange, step, stepLabels });
		onchange?.(payload.value, payload.valueRange, payload.label, payload.labelRange);
	};

	//滑动条 dom slider dom
	let lineDom = $state<HTMLDivElement | null>(null);
	//滑块 dom block dom
	let blockDom = $state<HTMLDivElement | null>(null);
	//滑块宽度 block width
	let blockWidth = $state(0);
	//滑块条起始位置 slider start position
	let lineDomStartX = $state(0);
	//滑块条结束位置 slider end position
	let lineDomEndX = $state(0);
	//滑块条宽度 slider width
	let lineDomWidth = $state(0);
	//初始位置 initial position
	let currentX = $state(0);
	//区间选择时开始位置 start position
	let currentStartX = $state(0);
	//区间选择时结束位置 end position
	let currentEndX = $state(0);
	$effect(() => {
		// 公共同步动作统一处理“拖拽中不回写位置”的判断，组件层只写入状态。
		// Shared sync action owns the "do not rewrite positions while dragging" decision; the component layer only writes state.
		const action = resolveSliderPositionSyncAction({ isDown, value, startValue, endValue, minRange, maxRange, lineWidth: lineDomWidth });
		if (!action.shouldSync) return;
		currentX = action.currentX;
		currentStartX = action.currentStartX;
		currentEndX = action.currentEndX;
	});
	//当前移动的滑块 current move block
	let currentMove = $state<SliderMoveTarget>('none');

	//是否按下 is down
	let isDown = $state(false);
	// 公共派生层处理 Slider 的渲染状态，框架事件与 DOM 读取留在组件层。
	// Shared derived layer handles Slider render state; framework events and DOM reads stay in the component layer.
	let sliderState = $derived(
		resolveSliderDerived(
			resolveSliderStateOptions({
				value,
				startValue,
				endValue,
				props: { minRange, maxRange, step, stepLabels, isRange, showTip, showSteps, stepsStyle, radius, lineBlock, disabled },
				isDown,
				currentMove,
				currentX,
				currentStartX,
				currentEndX
			})
		)
	);

	const touchLineStart = (e: PointerEvent) => {
		// 公共 action 只判断是否进入拖拽计算，DOM 事件与尺寸读取留在组件层。
		// Shared action only decides whether to enter drag math; DOM events and measurements stay in the component layer.
		const action = resolveSliderPointerStartAction({ disabled, readonly });
		if (!action.shouldStart) return;
		isDown = true;
		const clientX = e.clientX;
		if (isRange) {
			const nextState = resolveSliderRangeStartState({
				clientX,
				lineStartX: lineDomStartX,
				lineWidth: lineDomWidth,
				currentStartX,
				currentEndX,
				startValue,
				endValue,
				minRange,
				maxRange,
				step
			});
			currentMove = nextState.currentMove;
			currentStartX = nextState.currentStartX;
			currentEndX = nextState.currentEndX;
			startValue = nextState.startValue;
			endValue = nextState.endValue;
			emitSliderChange(0, [startValue, endValue]);
		} else {
			const nextState = resolveSliderSingleStartState({ clientX, lineStartX: lineDomStartX, lineWidth: lineDomWidth, minRange, maxRange, step });
			currentMove = nextState.currentMove;
			currentX = nextState.currentX;
			value = nextState.value;
			emitSliderChange(value);
		}
	};
	const touchLineMove = (e: PointerEvent) => {
		if (!lineDom?.hasPointerCapture(e.pointerId)) {
			lineDom?.setPointerCapture(e.pointerId);
		}
		// 公共 action 只判断是否继续拖拽计算，pointer capture 保持在组件层。
		// Shared action only decides whether to continue drag math; pointer capture stays in the component layer.
		const action = resolveSliderPointerMoveAction({ disabled, readonly, isDown });
		if (!action.shouldMove) return;
		const clientX = e.clientX;
		if (isRange) {
			const nextState = resolveSliderRangeMoveState({
				clientX,
				lineStartX: lineDomStartX,
				lineEndX: lineDomEndX,
				lineWidth: lineDomWidth,
				blockWidth,
				currentMove,
				currentStartX,
				currentEndX,
				minRange,
				maxRange,
				step
			});
			currentStartX = nextState.currentStartX;
			currentEndX = nextState.currentEndX;
			startValue = nextState.startValue;
			endValue = nextState.endValue;
			emitSliderChange(0, [startValue, endValue]);
		} else {
			const nextState = resolveSliderSingleMoveState({ clientX, lineStartX: lineDomStartX, lineEndX: lineDomEndX, lineWidth: lineDomWidth, minRange, maxRange, step });
			currentX = nextState.currentX;
			value = nextState.value;
			emitSliderChange(value);
		}
	};
	const touchLineEnd = (e: PointerEvent) => {
		if (lineDom?.hasPointerCapture(e.pointerId)) {
			lineDom?.releasePointerCapture(e.pointerId);
		}
		// 松开时将滑块位置吸附到档位 Snap slider position to step when released
		const nextState = resolveSliderEndPositions({ isRange, lineWidth: lineDomWidth, value, startValue, endValue, minRange, maxRange });
		if (typeof nextState.currentStartX === 'number') currentStartX = nextState.currentStartX;
		if (typeof nextState.currentEndX === 'number') currentEndX = nextState.currentEndX;
		if (typeof nextState.currentX === 'number') currentX = nextState.currentX;
		currentMove = nextState.currentMove;
		isDown = nextState.isDown;
	};
	const handleResize = () => {
		if (!lineDom) return;
		// 公共 helper 只处理测量后的数字，DOM 读取留在组件层。
		// Shared helper only handles measured numbers; DOM reads stay in the component layer.
		const nextState = resolveSliderMeasuredLayoutState({
			lineRect: lineDom.getBoundingClientRect(),
			blockWidth: resolveSliderMeasuredBlockWidth({ isRange, measuredWidth: blockDom ? blockDom.getBoundingClientRect().width : undefined, fallbackWidth: blockWidth }),
			isRange,
			value,
			startValue,
			endValue,
			minRange,
			maxRange
		});
		lineDomStartX = nextState.lineStartX;
		lineDomEndX = nextState.lineEndX;
		lineDomWidth = nextState.lineWidth;
		currentX = nextState.currentX; //挂载完成之后初始位置 initial position after mounting
		currentStartX = nextState.currentStartX; //区间选择开始位置 initial position after mounting
		currentEndX = nextState.currentEndX; //区间选择结束位置 initial position after mounting
		blockWidth = nextState.blockWidth;
	};
	onMount(() => {
		handleResize();
		window.addEventListener('resize', debounce(handleResize, 200));
	});
</script>

<div class={sliderState.rootClass}>
	<div
		role="group"
		aria-label="Slider"
		onpointerdown={touchLineStart}
		onpointermove={(e) => throttleWithRAF(touchLineMove)(e)}
		onpointerup={touchLineEnd}
		class={sliderState.lineClass}
		bind:this={lineDom}
	>
		{#if children}
			{@render children()}
		{:else if sliderState.showBreakSteps}
			<!-- break 样式：线条被档位隔断 -->
			<div class={sliderState.breakRootClass}>
				{#each sliderState.breakStepItems as stepItem (stepItem.index)}
					<!-- 档位标记（正方形，圆角跟随滑块） -->
					<div
						class={stepItem.markerClass}
						style={stepItem.markerStyleString}
					></div>
					<!-- 线段（除了最后一个档位后面不需要） -->
					{#if stepItem.showSegment}
						<div
							class={stepItem.segmentClass}
						></div>
					{/if}
				{/each}
				<!-- 进度条覆盖层 -->
				<div class={sliderState.breakProgressOverlayClass}>
					{#each sliderState.breakStepItems as stepItem (stepItem.index)}
						<div
							class={stepItem.progressMarkerClass}
							style={stepItem.markerStyleString}
						></div>
						{#if stepItem.showSegment}
							<div
								class={stepItem.progressSegmentClass}
							>
								{#if isRange}
									{#if stepItem.rangeSegmentVisible}
										<div
											class={sliderState.segmentRangeClass}
											style={stepItem.rangeSegmentStyleString}
										></div>
									{/if}
								{:else}
									<div
										class={sliderState.segmentProgressClass}
										style={stepItem.progressSegmentStyleString}
									></div>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{:else}
			<!-- 默认样式或 block 样式：连续线条 + 档位标记 -->
			<div class={sliderState.continuousTrackClass}>
				{#if sliderState.showContinuousSteps}
					{#each sliderState.continuousStepItems as stepItem (stepItem.index)}
						<div
							class={stepItem.markerClass}
							style={stepItem.markerStyleString}
						></div>
					{/each}
				{/if}
				{#if isRange}
					<!-- 区间进度条，两侧留出滑块间距 Range progress bar with slider gaps -->
					<div
						class={sliderState.trackClass}
						style={sliderState.rangeTrackStyleString}
					></div>
					{#if sliderState.showContinuousSteps}
						{#each sliderState.continuousStepItems as stepItem (stepItem.index)}
							{#if stepItem.active}
								<div
									class={stepItem.activeClass}
									style={stepItem.markerStyleString}
								></div>
							{/if}
						{/each}
					{/if}
				{:else}
					<!-- 单值进度条，在滑块前留出间距 Single value progress bar with slider gap -->
					<div class={sliderState.trackClass} style={sliderState.singleTrackStyleString}></div>
					{#if sliderState.showContinuousSteps}
						{#each sliderState.continuousStepItems as stepItem (stepItem.index)}
							{#if stepItem.active}
								<div
									class={stepItem.activeClass}
									style={stepItem.markerStyleString}
								></div>
							{/if}
						{/each}
					{/if}
				{/if}
			</div>
		{/if}
		<!-- 滑块 Slider blocks -->
		{#if isRange}
			<div class={sliderState.blockLayerClass}>
				<div
					class={sliderState.blockClass}
					style={sliderState.startBlockStyleString}
				>
					{#if sliderState.tips.start.visible}
						<div
							class={sliderState.tips.start.positionedClass}
							in:fly={sliderState.tipInParams}
							out:fly={sliderState.tipOutParams}
						>
							{sliderState.tips.start.label}
							<div class={sliderState.tips.start.arrowClass}></div>
						</div>
					{/if}
				</div>
			</div>
			<div class={sliderState.blockLayerClass}>
				<div
					class={sliderState.blockClass}
					style={sliderState.endBlockStyleString}
					bind:this={blockDom}
				>
					{#if sliderState.tips.end.visible}
						<div
							class={sliderState.tips.end.positionedClass}
							in:fly={sliderState.tipInParams}
							out:fly={sliderState.tipOutParams}
						>
							{sliderState.tips.end.label}
							<div class={sliderState.tips.end.arrowClass}></div>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<div class={sliderState.blockLayerClass}>
				<div
					class={sliderState.blockClass}
					style={sliderState.singleBlockStyleString}
				>
					{#if sliderState.tips.single.visible}
						<div
							class={sliderState.tips.single.positionedClass}
							in:fly={sliderState.tipInParams}
							out:fly={sliderState.tipOutParams}
						>
							{sliderState.tips.single.label}
							<div class={sliderState.tips.single.arrowClass}></div>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
