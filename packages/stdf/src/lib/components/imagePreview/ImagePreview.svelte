<script lang="ts">
	import { getContext } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import Mask from '../mask/Mask.svelte';
	import Icon from '../icon/Icon.svelte';
	import Loading from '../loading/Loading.svelte';
	import type { ImagePreviewProps, ImagePreviewItemProps } from '../../types/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import {
		resolveImagePreviewBodyOverflowStyle,
		resolveImagePreviewCloseAction,
		resolveImagePreviewDerived,
		resolveImagePreviewLoadStatusAction,
		resolveImagePreviewPointerDownState,
		resolveImagePreviewPointerList,
		resolveImagePreviewPointerMoveState,
		resolveImagePreviewPointerUpAction,
		resolveImagePreviewPointerUpState,
		resolveImagePreviewRotateAction,
		resolveImagePreviewRotationAnimationAction,
		resolveImagePreviewRotationResetAction,
		resolveImagePreviewStateOptions,
		resolveImagePreviewSwitchAction,
		resolveImagePreviewTransformResetAction
	} from '@any-tdf/common/derived/imagePreview';
	import { arrowLeftSvg, arrowRightSvg, imageLineSvg, imageRotateSvg } from '@any-tdf/common/svg/common';
	import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
	import SvgIcon from '../utils/SvgIcon.svelte';

	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const imagePreviewLang = (currentLang.imagePreview || zh_CN.imagePreview) as NonNullable<LangProps['imagePreview']>;

	let {
		visible = $bindable(false),
		images = [],
		current = $bindable(0),
		loop = true,
		swipeDuration = 300,
		minScale = 0.5,
		maxScale = 3,
		closePosition = 'tr',
		showNavigation = true,
		navigationPosition = 'center',
		maskClosable = false,
		showIndex = true,
		indicatorType = 'number',
		zIndex = 1000,
		duration = 300,
		outDuration = 200,
		mask = {},
		icon = {},
		showRotation = false,
		rotationIcon = {},
		children,
		loadingChild,
		errorChild,
		indexChild,
		onchange,
		onclose,
		onscale,
		onrotate
	}: ImagePreviewProps = $props();

	// 图片加载状态 { [index]: 'loading' | 'loaded' | 'error' }
	// Image load status
	let loadStatus = $state<Record<number, 'loading' | 'loaded' | 'error'>>({});

	// 图片旋转状态（内部使用，支持 360 用于连续动画）
	// Image rotation status (internal use, supports 360 for continuous animation)
	let rotationStatus = $state<Record<number, number>>({});

	// 是否正在重置旋转（用于禁用动画）
	// Whether resetting rotation (for disabling animation)
	let isResettingRotation = $state(false);

	// 缩放相关状态
	// Scale related states
	let currentScale = $state(1);
	let translateX = $state(0);
	let translateY = $state(0);

	// Pointer 事件相关状态
	// Pointer event related states
	let activePointers = $state<Map<number, PointerEvent>>(new Map());
	let startX = $state(0);
	let startY = $state(0);
	let isMoving = $state(false);
	let isSwiping = $state(false);
	let swipeStartX = $state(0);
	let swipeOffset = $state(0);
	let hasMoved = $state(false); // 是否有移动，用于判断点击 Whether moved, for tap detection

	// 双指缩放状态
	// Pinch zoom states
	let isPinching = $state(false);
	let pinchStartDistance = $state(0);
	let pinchStartScale = $state(1);

	// 容器元素引用
	// Container element reference
	let containerRef = $state<HTMLElement | null>(null);

	// 公共派生层统一 ImagePreview 的展示数据、style、控制区状态和图标参数，事件与 DOM 副作用留在组件层。
	// Shared derivation centralizes ImagePreview display data, styles, control state and icon params; events and DOM side effects stay in the component layer.
	const imagePreviewState = $derived(
		resolveImagePreviewDerived<ImagePreviewItemProps, NonNullable<ImagePreviewProps['icon']>, NonNullable<ImagePreviewProps['rotationIcon']>>(
			resolveImagePreviewStateOptions<ImagePreviewItemProps, NonNullable<ImagePreviewProps['icon']>, NonNullable<ImagePreviewProps['rotationIcon']>>({
				props: {
					images,
					closePosition,
					zIndex,
					duration,
					outDuration,
					icon,
					rotationIcon,
					loop,
					navigationPosition,
					showIndex,
					showNavigation,
					swipeDuration
				},
				currentIndex: current,
				currentScale,
				translateX,
				translateY,
				rotationStatus,
				loadStatus,
				loadingContentVisible: Boolean(loadingChild),
				errorContentVisible: Boolean(errorChild),
				isMoving,
				isPinching,
				isResettingRotation,
				isSwiping,
				swipeOffset
			})
		)
	);

	// 关闭预览
	// Close preview
	const close = () => {
		// 公共 action 只返回关闭状态和变换重置值，事件触发留在组件内。
		// Shared action only returns close state and transform reset values; event dispatch stays in the component.
		const action = resolveImagePreviewCloseAction({ visible });
		if (!action.shouldClose) return;
		visible = action.nextVisible;
		currentScale = action.currentScale;
		translateX = action.translateX;
		translateY = action.translateY;
		if (action.shouldEmitClose) onclose?.();
	};

	// 重置变换
	// Reset transform
	const resetTransform = () => {
		const action = resolveImagePreviewTransformResetAction();
		currentScale = action.currentScale;
		translateX = action.translateX;
		translateY = action.translateY;
	};

	// 旋转当前图片（逆时针）
	// Rotate current image (counterclockwise)
	const rotate = () => {
		const action = resolveImagePreviewRotateAction({ currentIndex: current, rotationStatus });
		rotationStatus = action.nextRotationStatus;

		// 回调返回规范化的角度 (0, 90, 180, 270)
		// Callback returns normalized angle (0, 90, 180, 270)
		onrotate?.(action.normalizedRotation);

		// 当旋转到 360° 时，动画完成后重置为 0（无动画）
		// When rotated to 360°, reset to 0 after animation completes (no animation)
		if (action.shouldResetRotation) {
			const idx = action.resetIndex;
			setTimeout(() => {
				// 先禁用动画
				// First disable animation
				isResettingRotation = resolveImagePreviewRotationAnimationAction({ phase: 'start' }).nextIsResettingRotation;
				// 等待 transition: none 生效后再更新角度
				// Wait for transition: none to take effect before updating angle
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						rotationStatus = resolveImagePreviewRotationResetAction({ index: idx, rotationStatus }).nextRotationStatus;
						// 等待角度更新完成后恢复动画
						// Restore animation after angle update completes
						setTimeout(() => {
							isResettingRotation = resolveImagePreviewRotationAnimationAction({ phase: 'end' }).nextIsResettingRotation;
						}, 20);
					});
				});
			}, 200);
		}
	};

	// 切换图片
	// Switch image
	const switchImage = (index: number) => {
		if (index === current) return;
		const action = resolveImagePreviewSwitchAction({ currentIndex: current, requestedIndex: index, total: imagePreviewState.total, loop });
		if (action.shouldChange) {
			current = action.nextIndex;
			currentScale = action.currentScale;
			translateX = action.translateX;
			translateY = action.translateY;
			onchange?.(action.nextIndex);
		}
	};

	// 上一张
	// Previous
	const prev = () => switchImage(current - 1);

	// 下一张
	// Next
	const next = () => switchImage(current + 1);

	// Pointer 按下
	// Pointer down
	const handlePointerDown = (e: PointerEvent) => {
		// 捕获 pointer
		// Capture pointer
		containerRef?.setPointerCapture(e.pointerId);
		activePointers.set(e.pointerId, e);

		// 公共手势派生只返回下一步状态，pointer capture 和赋值留在组件内。
		// Shared gesture derivation only returns next state; pointer capture and assignment stay in the component.
		const pointerState = resolveImagePreviewPointerDownState({ currentScale, pointers: resolveImagePreviewPointerList(activePointers.values()) });
		hasMoved = pointerState.hasMoved;
		isPinching = pointerState.isPinching;
		isSwiping = pointerState.isSwiping;
		isMoving = pointerState.isMoving;
		if (pointerState.startX !== undefined) startX = pointerState.startX;
		if (pointerState.startY !== undefined) startY = pointerState.startY;
		if (pointerState.swipeStartX !== undefined) swipeStartX = pointerState.swipeStartX;
		if (pointerState.swipeOffset !== undefined) swipeOffset = pointerState.swipeOffset;
		if (pointerState.pinchStartDistance !== undefined) pinchStartDistance = pointerState.pinchStartDistance;
		if (pointerState.pinchStartScale !== undefined) pinchStartScale = pointerState.pinchStartScale;
	};

	const applyPointerMoveState = (pointerState: ReturnType<typeof resolveImagePreviewPointerMoveState>, e: PointerEvent) => {
		if (pointerState.hasMoved) hasMoved = true;
		if (pointerState.nextScale !== undefined) {
			currentScale = pointerState.nextScale;
			onscale?.(pointerState.nextScale);
		}
		if (pointerState.swipeOffset !== undefined) swipeOffset = pointerState.swipeOffset;
		if (pointerState.translateDeltaX !== undefined) translateX += pointerState.translateDeltaX;
		if (pointerState.translateDeltaY !== undefined) translateY += pointerState.translateDeltaY;
		if (pointerState.nextStartX !== undefined) startX = pointerState.nextStartX;
		if (pointerState.nextStartY !== undefined) startY = pointerState.nextStartY;
		if (pointerState.preventDefault) e.preventDefault();
	};

	// Pointer 移动
	// Pointer move
	const handlePointerMove = (e: PointerEvent) => {
		if (!activePointers.has(e.pointerId)) return;

		// 更新当前 pointer 位置
		// Update current pointer position
		activePointers.set(e.pointerId, e);

		const pointerState = resolveImagePreviewPointerMoveState({
			pointers: resolveImagePreviewPointerList(activePointers.values()),
			point: e,
			currentScale,
			isPinching,
			isSwiping,
			isMoving,
			pinchStartDistance,
			pinchStartScale,
			minScale,
			maxScale,
			startX,
			startY,
			swipeStartX
		});
		applyPointerMoveState(pointerState, e);
	};

	// Pointer 抬起/取消
	// Pointer up/cancel
	const handlePointerUp = (e: PointerEvent) => {
		containerRef?.releasePointerCapture(e.pointerId);
		activePointers.delete(e.pointerId);

		const pointerState = resolveImagePreviewPointerUpState({
			pointers: resolveImagePreviewPointerList(activePointers.values()),
			currentScale,
			isSwiping,
			swipeOffset,
			viewportWidth: resolveViewportDimension({ value: window.innerWidth }),
			hasMoved,
			maskClosable
		});
		const pointerAction = resolveImagePreviewPointerUpAction({ pointerCount: activePointers.size, pointerState });

		if (pointerAction.kind === 'continueTracking') {
			const pointerFlags = pointerAction.pointerFlags;
			isPinching = pointerFlags.isPinching;
			isSwiping = pointerFlags.isSwiping;
			isMoving = pointerFlags.isMoving;
			if (pointerAction.startX !== undefined) startX = pointerAction.startX;
			if (pointerAction.startY !== undefined) startY = pointerAction.startY;
			if (pointerAction.swipeStartX !== undefined) swipeStartX = pointerAction.swipeStartX;
			return;
		}

		if (pointerAction.kind !== 'settled') return;

		// 所有 pointer 都抬起，组件层只执行公共动作决策对应的状态写入和回调。
		// All pointers are up; the component layer only applies state writes and callbacks from the shared action decision.
		const pointerFlags = pointerAction.pointerFlags;
		isPinching = pointerFlags.isPinching;
		isMoving = pointerFlags.isMoving;

		// 滑动切换判断
		// Swipe switch judgment
		if (pointerAction.shouldResetSwipeOffset) {
			isSwiping = pointerFlags.isSwiping;
			if (pointerAction.shouldSwitchPrev) {
				prev();
			} else if (pointerAction.shouldSwitchNext) {
				next();
			}
			swipeOffset = 0;
		}

		// 点击关闭判断（没有移动 = 点击）
		// Tap to close judgment (no movement = tap)
		if (pointerAction.shouldClose) {
			close();
			return;
		}

		// 缩放边界处理
		// Scale boundary handling
		if (pointerAction.shouldResetScale) {
			resetTransform();
		}
	};

	// 图片加载完成
	// Image loaded
	const handleImageLoad = (index: number) => {
		loadStatus = resolveImagePreviewLoadStatusAction({ index, loadStatus, status: 'loaded' }).nextLoadStatus as Record<number, 'loading' | 'loaded' | 'error'>;
	};

	// 图片加载失败
	// Image load error
	const handleImageError = (index: number) => {
		loadStatus = resolveImagePreviewLoadStatusAction({ index, loadStatus, status: 'error' }).nextLoadStatus as Record<number, 'loading' | 'loaded' | 'error'>;
	};

	// 当 visible 变化时重置状态并控制页面滚动
	// Reset state when visible changes and control page scroll
	$effect(() => {
		if (visible) {
			resetTransform();
		}
		// DOM 写入保留在组件内，公共函数只返回要写入的值。
		// Keep DOM writes in component code; the shared helper only returns the value to apply.
		document.body.style.overflow = resolveImagePreviewBodyOverflowStyle({ visible });
		return () => {
			// 组件销毁时恢复页面滚动
			// Restore page scroll when component is destroyed
			document.body.style.overflow = resolveImagePreviewBodyOverflowStyle({ visible: false });
		};
	});

</script>

{#if visible}
	<!-- 遮罩层 Mask layer -->
	<Mask
		visible
		opacity="0.9"
		{duration}
		{outDuration}
		{...mask}
		{zIndex}
	/>

	<!-- 主容器 Main container -->
	<div
		class={imagePreviewState.overlayClass}
		style={imagePreviewState.overlayStyleString}
		in:fade={imagePreviewState.inParams}
		out:fade={imagePreviewState.outParams}
	>
		<!-- 图片容器 Image container -->
		<div
			role="presentation"
			bind:this={containerRef}
			class={imagePreviewState.containerClass}
			onpointerdown={handlePointerDown}
			onpointermove={handlePointerMove}
			onpointerup={handlePointerUp}
			onpointercancel={handlePointerUp}
		>
			<!-- 图片滑动容器 Image slide container -->
			<div
				class={imagePreviewState.slideClass}
				style={imagePreviewState.slideStyleString}
			>
				{#each imagePreviewState.imageDisplayItems as imageDisplayItem (imageDisplayItem.index)}
					{@const img = imageDisplayItem.item}
					{@const index = imageDisplayItem.index}
					{@const imageDisplayState = imageDisplayItem.displayState}
					<div class={imagePreviewState.itemClass}>
						{#if imageDisplayState.showLoading}
							<!-- 加载中 Loading -->
							<div class={imagePreviewState.loadingClass}>
								{#if imageDisplayState.showCustomLoading}
									{@render loadingChild?.()}
								{:else}
									<Loading height="12" width="12" theme />
								{/if}
							</div>
						{/if}

						{#if imageDisplayState.showError}
							<!-- 加载失败 Load error -->
							<div class={imagePreviewState.errorClass}>
								{#if imageDisplayState.showCustomError}
									{@render errorChild?.()}
								{:else}
									<!-- 公共图片占位 SVG 数据在 common 中维护。 / Shared image placeholder SVG data lives in common. -->
									<SvgIcon svg={imageLineSvg} width="48" height="48" class={imagePreviewState.errorIconClass} />
									<span class={imagePreviewState.errorTextClass}>{imagePreviewLang.loadFailedText}</span>
								{/if}
							</div>
						{:else if imageDisplayState.showImage}
							<!-- 图片 Image -->
							<img
								src={img.url}
								alt={imageDisplayItem.alt}
								class={imagePreviewState.imageClass}
								style={imageDisplayItem.imageStyleString}
								draggable="false"
								onload={() => handleImageLoad(index)}
								onerror={() => handleImageError(index)}
							/>
						{/if}
					</div>
				{/each}
			</div>

			<!-- 自定义内容插槽 Custom content slot -->
			{#if children}
				<div class={imagePreviewState.customContentClass}>
					{@render children(imagePreviewState.currentImage, current)}
				</div>
			{/if}
		</div>

		<!-- 关闭按钮和旋转按钮 Close button and rotation button -->
		<div class={imagePreviewState.controlPanelClass} in:scale={imagePreviewState.controlScaleParams}>
			{#if showRotation}
				<!-- 旋转按钮 Rotation button -->
				<button
					class={imagePreviewState.controlButtonClass}
					onclick={rotate}
					aria-label="Rotate"
				>
					<!-- 逆时针旋转图标 Counterclockwise rotation icon -->
					<!-- 公共 ImagePreview 旋转 SVG 数据在 common 中维护。 / Shared ImagePreview rotate SVG data lives in common. -->
					<SvgIcon svg={imageRotateSvg} width={imagePreviewState.mergedRotationIcon.size} height={imagePreviewState.mergedRotationIcon.size} />
				</button>
			{/if}
			<!-- 关闭按钮 Close button -->
			<button
				class={imagePreviewState.controlButtonClass}
				onclick={close}
			>
				<Icon {...imagePreviewState.mergedIcon} />
			</button>
		</div>

		<!-- 左右导航按钮（居中模式）Prev/Next navigation buttons (center mode) -->
		{#if imagePreviewState.controlState.showCenterNavigation}
			<!-- 上一张 Previous -->
			{#if imagePreviewState.controlState.showCenterPrev}
				<button
					class={imagePreviewState.centerPrevButtonClass}
					onclick={prev}
					aria-label="Previous"
					in:scale={imagePreviewState.controlScaleParams}
				>
					<!-- 公共 ImagePreview 导航 SVG 数据在 common 中维护。 / Shared ImagePreview navigation SVG data lives in common. -->
					<SvgIcon svg={arrowLeftSvg} width="24" height="24" />
				</button>
			{/if}
			<!-- 下一张 Next -->
			{#if imagePreviewState.controlState.showCenterNext}
				<button
					class={imagePreviewState.centerNextButtonClass}
					onclick={next}
					aria-label="Next"
					in:scale={imagePreviewState.controlScaleParams}
				>
					<SvgIcon svg={arrowRightSvg} width="24" height="24" />
				</button>
			{/if}
		{/if}

		<!-- 底部栏：导航（底部模式）+ 索引指示器 Bottom bar: navigation (bottom mode) + index indicator -->
		{#if imagePreviewState.controlState.showBottomBar}
			<div class={imagePreviewState.bottomBarClass}>
				<!-- 左侧导航（底部模式）Left navigation (bottom mode) -->
				{#if imagePreviewState.controlState.showBottomPrev}
					<button
						class={imagePreviewState.controlButtonClass}
						onclick={prev}
						aria-label="Previous"
						in:scale={imagePreviewState.controlScaleParams}
					>
						<SvgIcon svg={arrowLeftSvg} width="24" height="24" />
					</button>
				{/if}

				<!-- 索引指示器 Index indicator -->
				{#if imagePreviewState.controlState.showIndex}
					{#if indexChild}
						{@render indexChild(current + 1, imagePreviewState.total)}
					{:else if indicatorType === 'number'}
						<span class={imagePreviewState.indexNumberClass}>
							{current + 1} / {imagePreviewState.total}
						</span>
					{:else if indicatorType === 'dot'}
						<div class={imagePreviewState.dotListClass}>
							{#each imagePreviewState.dotItems as dotItem (dotItem.index)}
								<button
									class={dotItem.className}
									onclick={() => switchImage(dotItem.index)}
									aria-label="Go to image {dotItem.index + 1}"
								></button>
							{/each}
						</div>
					{/if}
				{/if}

				<!-- 右侧导航（底部模式）Right navigation (bottom mode) -->
				{#if imagePreviewState.controlState.showBottomNext}
					<button
						class={imagePreviewState.controlButtonClass}
						onclick={next}
						aria-label="Next"
						in:scale={imagePreviewState.controlScaleParams}
					>
						<SvgIcon svg={arrowRightSvg} width="24" height="24" />
					</button>
				{/if}
			</div>
		{/if}
	</div>
{/if}
