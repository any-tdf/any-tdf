<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { throttleWithRAF } from '@any-tdf/common/utils';
	import Mask from '../mask/Mask.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { BottomSheetProps } from '../../types/index.js';
	import {
		bottomSheetDefaultScrollTopHeight,
		resolveBottomSheetCloseAction,
		resolveBottomSheetDerived,
		resolveBottomSheetMaskClickFlow,
		resolveBottomSheetMeasuredScrollTopHeight,
		resolveBottomSheetMoveDistance,
		resolveBottomSheetStateOptions,
		resolveBottomSheetTouchEndFlow,
		resolveBottomSheetTouchStartAction
	} from '@any-tdf/common/derived/bottomSheet';
	import { arrowLeftSvg, closeSvg, downSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';
	import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const bottomSheetLang: LangProps['bottomSheet'] = currentLang.bottomSheet;

	let {
		visible = $bindable(false),
		title,
		titleAlign = 'left',
		showBackIcon = false,
		closeContent = 'downIcon',
		showDivider = true,
		duration = 450,
		outDuration = 240,
		mask = {},
		maskClosable = false,
		zIndex = 600,
		stayHeightList = [10, 50, 90],
		stayHeightIndex = 1,
		closeHeight = 0,
		radius = '',
		iconRadius = '',
		children,
		onheightChange,
		onclickMask,
		onclose,
		onback
	}: BottomSheetProps = $props();

	// 此时是否正在滑动
	// is sliding or not now
	let isTouch = $state(false);

	// 滑动开始 Y 坐标，px
	// start Y coordinate, px
	let startY = 0;

	// 滑动中 Y 方向当前位置，px
	// current Y coordinate, px
	let currentY = 0;

	// 滑动开始距离顶部高度，%
	// start distance from top, %
	let startTop = $state<number | undefined>(undefined);

	// 滑动距离，%
	// move distance, %
	let moveDistance = $state(0);

	// 顶部滚动区域高度，%
	// top scroll area height, %
	let scrollTopHeight = $state(bottomSheetDefaultScrollTopHeight);

	// 顶部滚动区域元素
	// top scroll area element
	let scrollTopDom = $state<HTMLDivElement | null>(null);

	let viewportHeight = $derived(resolveViewportDimension({ value: typeof window === 'undefined' ? undefined : window.innerHeight }));
	// 公共派生层统一 BottomSheet 的高度、class、style、标题和校验结果，组件层只保留 DOM 测量、事件和状态写入。
	// Common derivation unifies BottomSheet height, class, style, title and validation results; the component layer only keeps DOM measurement, events and state writes.
	let bottomSheetState = $derived(
		resolveBottomSheetDerived(
			resolveBottomSheetStateOptions({
				defaults: bottomSheetLang,
				props: { closeContent, closeHeight, duration, iconRadius, outDuration, radius, stayHeightIndex, stayHeightList, title, titleAlign, zIndex },
				isTouch,
				moveDistance,
				scrollTopHeight,
				startTop,
				viewportHeight,
				visible
			})
		)
	);

	// 如果 stayHeightList 不是数组，或者元素不是正数，或者元素不是 0-100 之间的数，或者元素不是整数，给出警告。
	// If stayHeightList is not an array, or the element is not a positive number, or the element is not a number between 0 and 100, or the element is not an integer, give a warning.
	$effect(() => {
		if (bottomSheetState.validationState.invalidStayHeightList) {
			console.error(
				'[STDF BottomSheet error]stayHeightList 必须是一个 0-100 之间的正整数数组。(stayHeightList must be an array of positive integers between 0 and 100)'
			);
		}

		// 如果 stayHeightList 元素不是递增的，给出警告。
		// If the elements of stayHeightList are not increasing, give a warning.
		if (bottomSheetState.validationState.nonAscendingStayHeightList) {
			console.error(
				'[STDF BottomSheet error]stayHeightList 数组元素必须是升序排列。(stayHeightList array elements must be in ascending order)'
			);
		}

		// 如果 stayHeightIndex 超出 stayHeightList 长度给出警告。
		// If stayHeightIndex exceeds the length of stayHeightList, give a warning.
		if (bottomSheetState.validationState.stayHeightIndexOutOfRange) {
			console.warn(
				'[STDF BottomSheet warn]stayHeightIndex 超出 stayHeightList 长度，将使用 stayHeightList 最后一个值。(stayHeightIndex exceeds the length of stayHeightList, the last value of stayHeightList will be used.)'
			);
		}

		// 如果 closeHeight 大于 stayHeightList 最小值给出警告。
		// If closeHeight is greater than the minimum value of stayHeightList, give a warning.
		if (bottomSheetState.validationState.closeHeightTooLarge) {
			console.warn(
				'[STDF BottomSheet warn]closeHeight 大于 stayHeightList 最小值，closeHeight 将失效。(closeHeight is greater than the minimum value of stayHeightList, closeHeight will be invalid.)'
			);
		}
	});

	// 滑动开始
	// start sliding
	/** @type {(e:PointerEvent) => void} */
	const touchstartFun = (e: PointerEvent) => {
		// 公共 action 只返回拖拽开始状态，事件读取保留在组件层。
		// Shared action only returns drag-start state; event reads stay in the component layer.
		const action = resolveBottomSheetTouchStartAction({ clientY: e.clientY, currentTop: bottomSheetState.currentTop });
		moveDistance = action.moveDistance;
		startTop = action.startTop;
		startY = action.startY;
		currentY = action.currentY;
		isTouch = action.isTouch;
	};

	// 滑动中
	// sliding
	/** @type {(e:PointerEvent) => void} */
	const touchmoveFun = (e: PointerEvent) => {
		if (!isTouch) return;
		scrollTopDom?.setPointerCapture(e.pointerId);
		currentY = e.clientY;
		//移动百分比，moveDistance 为正时，向下移动
		//Move percentage, moveDistance is positive when moving down
		moveDistance = resolveBottomSheetMoveDistance({
			currentY,
			startY,
			viewportHeight: resolveViewportDimension({ value: window.innerHeight }),
			startTop: bottomSheetState.startTop,
			maxHeight: bottomSheetState.maxHeight
		});
	};

	// 滑动结束
	// end sliding
	const touchendFun = () => {
		// 公共 action 只返回吸附高度和关闭决策，事件派发和 visible 写入留在组件层。
		// Shared action only returns snapped height and close decisions; event emits and visible writes stay in the component layer.
		const action = resolveBottomSheetTouchEndFlow({ stayHeightList: bottomSheetState.resolvedStayHeightList, currentTop: bottomSheetState.currentTop, currentY, viewportHeight: resolveViewportDimension({ value: window.innerHeight }), closeHeight, visible });
		isTouch = action.isTouch;
		startTop = action.startTop;
		moveDistance = action.moveDistance;
		if (onheightChange) {
			onheightChange(action.height);
		}
		if (!action.closeAction.shouldClose) return;
		visible = action.closeAction.nextVisible;
		if (action.closeAction.shouldEmitClose) onclose?.();
	};

	//点击遮罩层
	//click mask
	const clickMaskFn = () => {
		//点击遮罩时派发 clickMask 事件
		//Dispatch clickMask event when clicking mask
		onclickMask?.();
		// 公共流程只返回遮罩点击和关闭决策，事件派发和绑定状态留在组件层。
		// Shared flow only returns mask-click and close decisions; event dispatch and bound state stay in the component layer.
		const action = resolveBottomSheetMaskClickFlow({ emitClose: false, maskClosable, visible });
		if (!action.closeAction.shouldClose) return;
		visible = action.closeAction.nextVisible;
		if (action.closeAction.shouldEmitClose) onclose?.();
	};

	//点击关闭图标
	//click close icon
	const closeFunc = () => {
		// 公共 close action 只返回可见状态和回调决策，事件调用留在组件层。
		// Shared close action only returns visibility and callback decisions; event calls stay in the component layer.
		const action = resolveBottomSheetCloseAction({ visible });
		if (!action.shouldClose) return;
		visible = action.nextVisible;
		// 点击关闭时派发 close 事件
		// Dispatch close event when clicking close
		if (action.shouldEmitClose) onclose?.();
	};

	//点击返回图标
	//click back icon
	const backFunc = () => {
		//点击返回时派发 back 事件
		//Dispatch back event when clicking back
		onback?.();
	};

	onMount(() => {
		if (visible && scrollTopDom) {
			// 滚动内容高度
			// Scroll content height
			scrollTopHeight = resolveBottomSheetMeasuredScrollTopHeight(scrollTopDom);
		}
	});
</script>

{#if visible}
	<Mask visible {duration} {outDuration} {...mask} onclickMask={clickMaskFn} />
{/if}

<div class={bottomSheetState.layerClass} style={bottomSheetState.layerStyleString}>
	{#if visible}
		<div
			class={bottomSheetState.panelClass}
			style={bottomSheetState.panelStyleString}
			in:fly={bottomSheetState.inParams}
			out:fly={bottomSheetState.outParams}
		>
			<div
				role="presentation"
				onpointerdown={(e: PointerEvent) => touchstartFun(e)}
				onpointermove={(e: PointerEvent) => throttleWithRAF(touchmoveFun)(e)}
				onpointerup={touchendFun}
				bind:this={scrollTopDom}
				class={bottomSheetState.dragHandleClass}
			>
				<div class={bottomSheetState.dragIndicatorClass}></div>
				<div class={bottomSheetState.headerRowClass}>
					{#if showBackIcon}
						<button
							class={bottomSheetState.iconButtonClass}
							onclick={backFunc}
							aria-label="back"
						>
							<!-- 公共 BottomSheet 图标 SVG 数据在 common 中维护。 / Shared BottomSheet SVG data lives in common. -->
							<SvgIcon svg={arrowLeftSvg} width="16" height="16" class={bottomSheetState.iconSvgClass} />
						</button>
					{/if}
					<div class={bottomSheetState.headerTitleClass}>
						{bottomSheetState.finalTitle}
					</div>
					{#if bottomSheetState.closeContentState.kind === 'closeIcon'}
						<button
							class={bottomSheetState.iconButtonClass}
							onclick={closeFunc}
							aria-label={bottomSheetState.closeContentState.ariaLabel}
						>
							<SvgIcon svg={closeSvg} width="16" height="16" class={bottomSheetState.iconSvgClass} />
						</button>
					{:else if bottomSheetState.closeContentState.kind === 'downIcon'}
						<button
							class={bottomSheetState.iconButtonClass}
							onclick={closeFunc}
							aria-label={bottomSheetState.closeContentState.ariaLabel}
						>
							<SvgIcon svg={downSvg} width="16" height="16" class={bottomSheetState.iconSvgClass} />
						</button>
					{:else if bottomSheetState.closeContentState.kind === 'text'}
						<button class={bottomSheetState.closeTextButtonClass} onclick={closeFunc}>{bottomSheetState.closeContentState.text}</button>
					{/if}
				</div>
			</div>
			{#if showDivider}
				<div class={bottomSheetState.dividerClass}></div>
			{/if}
			<div
				class={bottomSheetState.contentScrollClass}
				style={bottomSheetState.contentStyleString}
			>
				{@render children?.()}
			</div>
		</div>
	{/if}
</div>
