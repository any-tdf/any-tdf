<script lang="ts">
	import { onMount } from 'svelte';
	import type { SwiperProps, SwiperImgProps, SwiperComponentProps } from '../../types/index.js';
	import {
		resolveSwiperAutoplayGuardAction,
		resolveSwiperAutoplayTickAction,
		resolveSwiperDerived,
		resolveSwiperHeight,
		resolveSwiperInitialActive,
		resolveSwiperInitialIndicator,
		resolveSwiperLoopResetTransition,
		resolveSwiperLongLineResetAction,
		resolveSwiperPointerDownAction,
		resolveSwiperPointerMoveAction,
		resolveSwiperPointerUpAction,
		resolveSwiperWidth
	} from '@any-tdf/common/derived/swiper';
	import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';

	let {
		data = [],
		interval = 4,
		duration = 1000,
		autoplay = true,
		lazyplay = true,
		initActive = 0,
		indicatePosition = 'inner',
		indicateAlign = 'center',
		indicateStyle = 'pointLine',
		indicateRadius = '',
		indicateInjClass = '',
		indicateColor = '',
		indicateActiveColor = '',
		aspectRatio = [16, 9],
		containerWidth = 0,
		px = '0',
		py = '0',
		translateX = 0,
		translateZ = 0,
		rotateX = 0,
		rotateY = 0,
		rotateZ = 0,
		activeInjClass = '',
		notActiveInjClass = '',
		radius = '',
		innerInjClass = '',
		triggerLong = 30,
		notTriggerLong = 10,
		triggerSpeed = 0.5,
		onchange,
		onclick
	}: SwiperProps = $props();

	// 公共派生层处理 Swiper 数据、尺寸和指示器 class，手势与定时器留在组件层。
	// Shared derived layer handles Swiper data, metrics and indicator classes; gestures and timers stay in the component layer.
	let width = $derived(resolveSwiperWidth({ containerWidth, fallbackWidth: resolveViewportDimension({ value: typeof document !== 'undefined' ? document.body.clientWidth : undefined }) })); //宽度 width
	let height = $derived(resolveSwiperHeight(width, aspectRatio));
	let active = $derived(resolveSwiperInitialActive({ dataLength: data.length, initActive })); //当前激活的 item current active item
	let currentIndicate = $derived(resolveSwiperInitialIndicator({ dataLength: data.length, initActive })); //当前激活的指示器  current active indicate
	let longTransition = $state(true); //长线指示器过渡 long line indicate transition
	let long = $state(false); //长线指示器是否较长状态 long line indicate is long
	let once = $state(true); //是否是第首次轮播，处理轮播间隔与过渡时间的差异 is first time play, handle interval and duration difference
	let translateXTransition = $state(true); //是否进行过渡动画 is transition animation
	let initialState = $state(true); //是否是初始状态 is initial state
	let startX = $state(0); //滑动开始 X 坐标 when start touch x position
	let moveX = $state(0); //滑动移动 X 坐标 when move touch x position
	let startTime = $state(0); //滑动开始时间 when start touch time
	let endTime = $state(0); //滑动结束时间 when end touch time
	let isMove = $state(false); //是否滑动 is touch move
	// let transition = true;
	let swiperDom = $state<HTMLElement | null>(null); //Swiper 容器
	// 公共派生层处理 Swiper 渲染数据、item 样式和指示器状态，手势与定时器留在组件层。
	// Shared derived layer handles Swiper render data, item styles and indicator state; gestures and timers stay in the component layer.
	let swiperState = $derived(resolveSwiperDerived<SwiperComponentProps | SwiperImgProps>({ data, width, height, active, currentIndicate, moveX, duration, translateX, translateZ, rotateX, rotateY, rotateZ, isMove, px, py, translateXTransition, activeInjClass, notActiveInjClass, radius, innerInjClass, indicateRadius, indicateStyle, indicatePosition, indicateAlign, indicateInjClass, indicateColor, indicateActiveColor, long, longTransition, once, interval }));
	//定时器
	// timer
	let intervalTime: ReturnType<typeof setInterval>;
	let io: IntersectionObserver | null = null;
	const applyLongLineReset = (action = resolveSwiperLongLineResetAction({ autoplay, duration })) => {
		long = action.long;
		longTransition = action.longTransition;
		setTimeout(() => {
			long = action.resetLong;
			longTransition = action.resetLongTransition;
		}, action.resetDelay);
	};
	//定时器执行函数
	// timer function
	const intervalTimeFun = () => {
		intervalTime = setInterval(() => {
			const action = resolveSwiperAutoplayTickAction({ active, currentIndicate, dataLength: swiperState.items.length, autoplay, duration });
			once = action.once;
			initialState = action.initialState;
			active = action.active;
			currentIndicate = action.currentIndicate;
			applyLongLineReset(action.longLine);
			if (action.loopResetActive !== undefined) {
				setTimeout(() => {
					// 切换动画完成后，关闭过渡动画，同时将展示的部分偷偷替换为最开始的样子。
					// After the switching animation is completed, turn off the transition animation, and at the same time, the displayed part is secretly replaced with the original appearance.
					active = action.loopResetActive as number;
					translateXTransition = resolveSwiperLoopResetTransition(action.loopResetTranslateXTransition);
				}, duration);
			} else {
				//开启过渡
				// turn on transition
				// transition = true;
				translateXTransition = action.translateXTransition;
			}
			//派发 Swiper 容器 change 事件，i 表示当前容器索引值
			// dispatch the Swiper container change event, i indicates the current container index value
			onchange?.(currentIndicate);
		}, interval * 1000);
	};
	//判断 Swiper 容器是否在可视区域内，如果在，则开启定时器，否则不开启定时器
	// Determine whether the Swiper container is in the visible area. If it is, start the timer, otherwise do not start the timer
	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((item) => {
			// isIntersecting 是一个 Boolean 值，判断目标元素当前是否可见
			// isIntersecting is a Boolean value that determines whether the target element is currently visible
			if (item.isIntersecting) {
				if (autoplay) {
					if (intervalTime) {
						clearInterval(intervalTime); //清除定时器 clear timer
					}
					intervalTimeFun();
				}
			} else {
				if (intervalTime) {
					clearInterval(intervalTime); //清除定时器 clear timer
				}
			}
		});
	};
	onMount(() => {
		const autoplayGuard = resolveSwiperAutoplayGuardAction({ autoplay, dataLength: data.length, duration, interval });
		if (!autoplayGuard.shouldAutoplay) {
			if (autoplayGuard.shouldWarnInvalidTiming) {
				console.log('间隔时间必须大于过渡时间');
			}
			return;
		}
		applyLongLineReset(resolveSwiperLongLineResetAction({ autoplay, duration: 0 }));
		//懒轮播
		if (lazyplay) {
			if (swiperDom) {
				if (typeof IntersectionObserver === 'undefined') {
					if (autoplay) {
						if (intervalTime) {
							clearInterval(intervalTime); //清除定时器 clear timer
						}
						intervalTimeFun();
					}
				} else {
					io = new IntersectionObserver(handleIntersection);
					io.observe(swiperDom);
				}
			}
		} else {
			if (autoplay && intervalTime) {
				clearInterval(intervalTime); //清除定时器 clear timer
				intervalTimeFun();
			}
		}
		return () => {
			if (intervalTime) {
				clearInterval(intervalTime); //清除定时器 clear timer
			}
			io?.disconnect();
			io = null;
		};
	});
	//点击事件
	// click event
	const clickImgFun = () => {
		//派发 Swiper 容器点击事件，currentIndicate 表示点击的容器索引值
		// dispatch the Swiper container click event, currentIndicate indicates the index value of the clicked container
		onclick?.(currentIndicate);
	};
	//滑动开始
	// slide start
	const touchstartFun = (e: PointerEvent) => {
		// 阻止默认事件
		// prevent default event
		e.preventDefault();
		const action = resolveSwiperPointerDownAction({ clientX: e.clientX, time: Date.now() });
		isMove = action.isMove;
		startTime = action.startTime;
		translateXTransition = action.translateXTransition;
		startX = action.startX;
	};
	//滑动中
	// slideing
	const touchmoveFun = (e: PointerEvent) => {
		const action = resolveSwiperPointerMoveAction({ isMove, clientX: e.clientX, startX });
		if (!action.shouldMove) return false;
		if (action.shouldCapturePointer && swiperDom) {
			swiperDom.setPointerCapture(e.pointerId);
		}
		if (action.shouldStopAutoplay && intervalTime) {
			clearInterval(intervalTime); //清除定时器 clear timer
		}
		moveX = action.moveX;
	};

	//滑动结束
	// slide end
	const touchendFun = () => {
		// 公共派生负责拖动阈值和循环索引计算，定时器和赋值留在组件内。
		// Shared derivation resolves drag thresholds and loop indexes; timers and assignment stay in the component.
		endTime = Date.now();
		const action = resolveSwiperPointerUpAction({ active, currentIndicate, dataLength: swiperState.items.length, moveX, width, startTime, endTime, triggerLong, notTriggerLong, triggerSpeed, autoplay, duration });
		isMove = action.isMove;
		translateXTransition = action.translateXTransition;
		applyLongLineReset(action.longLine);
		moveX = action.moveX;
		active = action.active;
		currentIndicate = action.currentIndicate;
		if (action.loopResetActive !== undefined) {
			setTimeout(() => {
				active = action.loopResetActive as number;
				translateXTransition = resolveSwiperLoopResetTransition(action.loopResetTranslateXTransition);
			}, duration);
		}

		if (action.shouldRestartAutoplay) {
			if (intervalTime) {
				clearInterval(intervalTime); //清除定时器 clear timer
			}
			intervalTimeFun();
		} else if (action.shouldEmitChange) {
			//派发 Swiper 容器 change 事件，i 表示当前容器索引值
			// Dispatch the Swiper container change event, i indicates the current container index value
			onchange?.(currentIndicate);
		}
	};
</script>

<div
	role="region"
	aria-roledescription="carousel"
	aria-label="Carousel"
	bind:this={swiperDom}
	onpointerdown={touchstartFun}
	onpointermove={touchmoveFun}
	onpointerup={touchendFun}
	class={swiperState.rootClass}
>
	<!-- 轮播容器 -->
	<!-- Carousel container -->
	<div class={swiperState.containerClass} style={swiperState.containerStyleString}>
		<!-- 通过循环 dataNew 渲染多个 item -->
		<!-- Render multiple item through loop dataNew -->
		{#each swiperState.items as renderItem (renderItem.index)}
			{@const itemContentState = renderItem.contentState}
			<div
				class={renderItem.className}
				style={renderItem.styleString}
			>
				{#if itemContentState.kind === 'image'}
					<button type="button" onclick={clickImgFun} class={swiperState.itemButtonClass}>
						<img class={swiperState.imageClass} src={itemContentState.src} alt="" />
					</button>
				{:else if itemContentState.kind === 'component'}
					{@const SwiperComponent = itemContentState.component as SwiperComponentProps['component']}
					<div class={swiperState.contentClass}>
						<SwiperComponent />
					</div>
				{/if}
			</div>
		{/each}
		<!-- 轮播指示器 (内部) -->
		<!-- Carousel indicator (inner) -->
		<div
			class={swiperState.indicators.inner.className}
		>
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each swiperState.indicators.inner.items as indicator (indicator.index)}
				<div
					class={indicator.className}
					style={indicator.styleString}
				>
					{#if indicator.showLongLine}
						<div
							class={indicator.longLineClass}
							style={indicator.longLineStyleString}
						></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<!-- 轮播指示器 (外部) -->
	<!-- Carousel indicator (outer) -->
	<div
		class={swiperState.indicators.out.className}
	>
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		{#each swiperState.indicators.out.items as indicator (indicator.index)}
			<div
				class={indicator.className}
				style={indicator.styleString}
			>
				{#if indicator.showLongLine}
					<div
						class={indicator.longLineClass}
						style={indicator.longLineStyleString}
					></div>
				{/if}
			</div>
		{/each}
	</div>
</div>
