import type { LoadingProps } from '../../types';
import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import {
	resolveLoadingAnimationPlayState,
	resolveLoadingAnimationTargets,
	resolveLoadingDerived,
	resolveLoadingIntersectionState,
	resolveLoadingStateOptions,
	type LoadingAnimationPlayState
} from '@any-tdf/common/derived/loading';
import {
	Loading1_0,
	Loading1_1,
	Loading1_2,
	Loading1_3,
	Loading1_4,
	Loading1_5,
	Loading1_6,
	Loading1_7,
	Loading1_8,
	Loading1_9,
	Loading1_10,
	Loading1_11,
	Loading1_12,
	Loading1_13,
	Loading1_14,
	Loading1_15,
	Loading1_16,
	Loading1_17,
	Loading1_18,
	Loading1_19,
	Loading1_20,
	Loading1_21,
	Loading1_22,
	Loading1_23,
	Loading1_24,
	Loading1_25,
	Loading1_26,
	Loading1_27,
	Loading1_28,
	Loading1_29,
	Loading1_30,
	Loading1_31,
	Loading1_32,
	Loading1_33,
	Loading1_34,
	Loading1_35,
	Loading1_36,
	Loading1_37,
	Loading1_38,
	Loading1_39,
	Loading1_40,
	Loading1_41,
	Loading1_42,
	Loading1_43,
	Loading1_44,
	Loading1_45,
	Loading1_46,
	Loading1_47,
	Loading1_48,
	Loading1_49,
	Loading1_50,
	Loading1_51,
	Loading1_52,
	Loading1_53
} from './loadings/oneColor';
import { Loading2_0, Loading2_1, Loading2_2, Loading2_3, Loading2_4, Loading2_5 } from './loadings/twoColor';
import { Loading4_0, Loading4_1, Loading4_2, Loading4_3 } from './loadings/fourColor';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading: React.FC<LoadingProps> = ({
	type = '1_0',
	height = '8',
	width = '8',
	theme = false,
	inverse = false,
	customColor = [],
	lazyAnimation = true,
	speed = 1
}) => {
	// loading 元素
	const loadingDom = useRef<HTMLDivElement>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const observedTargetRef = useRef<Element | null>(null);
	const playStateRef = useRef<LoadingAnimationPlayState>('running');
	// const [currentSpeed, setCurrentSpeed] = useState(speed)

	// 公共派生负责尺寸 class 和变体 key，组件只保留渲染分支和 DOM 动画暂停逻辑。
	// Shared derivation resolves size classes and variant keys; the component keeps render branches and DOM animation pause logic.
	const loadingState = resolveLoadingDerived(
		resolveLoadingStateOptions({
			props: { height, width, type }
		})
	);
	const customColorKey = customColor.join('|');

	const applyAnimationPlayState = useCallback((playState = playStateRef.current) => {
		if (!loadingDom.current) return;
		playStateRef.current = playState;

		// loadingDom 和所有后代元素的 animation-play-state 使用同一个可见性状态。
		// Root and descendant animation-play-state values share one visibility state.
		resolveLoadingAnimationTargets(loadingDom.current).forEach((item) => {
			item.style.animationPlayState = playState;
		});
	}, []);

	const clearObservedTarget = useCallback(() => {
		const observer = observerRef.current;
		if (observer && observedTargetRef.current) {
			observer.unobserve(observedTargetRef.current);
		}
		observedTargetRef.current = null;
	}, []);

	const observeAnimationTarget = useCallback(() => {
		const observer = observerRef.current;
		if (!observer || !loadingDom.current) return;
		clearObservedTarget();

		observedTargetRef.current = loadingDom.current;
		observer.observe(loadingDom.current);
	}, [clearObservedTarget]);

	const resolveCurrentIntersectionState = useCallback(() => {
		if (!loadingDom.current || typeof window === 'undefined') return false;

		const viewportHeight = window.innerHeight;
		const viewportWidth = window.innerWidth;
		return resolveLoadingIntersectionState({
			rect: loadingDom.current.getBoundingClientRect(),
			viewportHeight,
			viewportWidth
		});
	}, []);

	const syncAnimationVisibility = useCallback(() => {
		const playState = resolveLoadingAnimationPlayState(resolveCurrentIntersectionState());
		applyAnimationPlayState(playState);
	}, [applyAnimationPlayState, resolveCurrentIntersectionState]);

	useEffect(() => {
		if (!loadingDom.current) return;
		if (!lazyAnimation || typeof IntersectionObserver === 'undefined') {
			applyAnimationPlayState('running');
			return;
		}

		// 判断 Loading 根节点是否在可视区域内；播放状态会同步到根节点和所有动画后代。
		const io = new IntersectionObserver((entries) => {
			const isIntersecting = entries.some((entry) => entry.target === loadingDom.current && entry.isIntersecting);
			const playState = resolveLoadingAnimationPlayState(isIntersecting);
			applyAnimationPlayState(playState);
		});

		observerRef.current = io;
		observeAnimationTarget();
		syncAnimationVisibility();

		return () => {
			clearObservedTarget();
			io.disconnect();
			observerRef.current = null;
		};
	}, [applyAnimationPlayState, clearObservedTarget, lazyAnimation, observeAnimationTarget, syncAnimationVisibility]);

	useEffect(() => {
		if (!lazyAnimation || typeof window === 'undefined') return;

		let frame = 0;
		const queueAnimationVisibilitySync = () => {
			if (frame) return;
			if (typeof requestAnimationFrame === 'undefined') {
				syncAnimationVisibility();
				return;
			}

			frame = requestAnimationFrame(() => {
				frame = 0;
				syncAnimationVisibility();
			});
		};
		const scrollOptions = { capture: true, passive: true };
		window.addEventListener('scroll', queueAnimationVisibilitySync, scrollOptions);
		window.addEventListener('resize', queueAnimationVisibilitySync, { passive: true });
		queueAnimationVisibilitySync();

		return () => {
			if (frame && typeof cancelAnimationFrame !== 'undefined') {
				cancelAnimationFrame(frame);
			}
			window.removeEventListener('scroll', queueAnimationVisibilitySync, scrollOptions);
			window.removeEventListener('resize', queueAnimationVisibilitySync);
		};
	}, [lazyAnimation, syncAnimationVisibility]);

	useEffect(() => {
		if (typeof requestAnimationFrame === 'undefined') {
			const timeout = setTimeout(() => {
				observeAnimationTarget();
				applyAnimationPlayState();
			});

			return () => {
				clearTimeout(timeout);
			};
		}

		const frame = requestAnimationFrame(() => {
			observeAnimationTarget();
			applyAnimationPlayState();
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	}, [applyAnimationPlayState, observeAnimationTarget, loadingState.type, loadingState.sizeClass, theme, inverse, speed, customColorKey]);

	const loadingMap: Record<string, React.FC<LoadingAnimationProps>> = {
		'1_0': Loading1_0,
		'1_1': Loading1_1,
		'1_2': Loading1_2,
		'1_3': Loading1_3,
		'1_4': Loading1_4,
		'1_5': Loading1_5,
		'1_6': Loading1_6,
		'1_7': Loading1_7,
		'1_8': Loading1_8,
		'1_9': Loading1_9,
		'1_10': Loading1_10,
		'1_11': Loading1_11,
		'1_12': Loading1_12,
		'1_13': Loading1_13,
		'1_14': Loading1_14,
		'1_15': Loading1_15,
		'1_16': Loading1_16,
		'1_17': Loading1_17,
		'1_18': Loading1_18,
		'1_19': Loading1_19,
		'1_20': Loading1_20,
		'1_21': Loading1_21,
		'1_22': Loading1_22,
		'1_23': Loading1_23,
		'1_24': Loading1_24,
		'1_25': Loading1_25,
		'1_26': Loading1_26,
		'1_27': Loading1_27,
		'1_28': Loading1_28,
		'1_29': Loading1_29,
		'1_30': Loading1_30,
		'1_31': Loading1_31,
		'1_32': Loading1_32,
		'1_33': Loading1_33,
		'1_34': Loading1_34,
		'1_35': Loading1_35,
		'1_36': Loading1_36,
		'1_37': Loading1_37,
		'1_38': Loading1_38,
		'1_39': Loading1_39,
		'1_40': Loading1_40,
		'1_41': Loading1_41,
		'1_42': Loading1_42,
		'1_43': Loading1_43,
		'1_44': Loading1_44,
		'1_45': Loading1_45,
		'1_46': Loading1_46,
		'1_47': Loading1_47,
		'1_48': Loading1_48,
		'1_49': Loading1_49,
		'1_50': Loading1_50,
		'1_51': Loading1_51,
		'1_52': Loading1_52,
		'1_53': Loading1_53,
		'2_0': Loading2_0,
		'2_1': Loading2_1,
		'2_2': Loading2_2,
		'2_3': Loading2_3,
		'2_4': Loading2_4,
		'2_5': Loading2_5,
		'4_0': Loading4_0,
		'4_1': Loading4_1,
		'4_2': Loading4_2,
		'4_3': Loading4_3
	};
	const LoadingComponent = loadingMap[loadingState.type] || Loading1_0;

	return (
		<div ref={loadingDom}>
			<LoadingComponent theme={theme} inverse={inverse} size={loadingState.sizeClass} customColor={customColor} speed={speed} />
		</div>
	);
};

export type { LoadingProps } from '../../types';
export default Loading;
