import { useEffect, useRef, useCallback } from 'react';
import {
	normalizeTransitionBaseTransform,
	resolveFlyOutFrame,
	resolveFlyTransitionFrame,
	resolveTransitionDurationWithDelay,
	resolveTransitionProgress,
	resolveTransitionTickProgress
} from '@any-tdf/common/derived/transition';

export interface FlyOptions {
	duration?: number;
	delay?: number;
	easing?: (t: number) => number;
	y?: number;
	x?: number;
	opacity?: number;
}

const fly = (node: HTMLElement, options: FlyOptions = {}) => {
	const { y = 0, x = 0, opacity = 0, duration: d = 400, delay = 0, easing = (t: number) => t } = options;
	const style = getComputedStyle(node);
	const targetOpacity = Number(style.opacity);
	const baseTransform = normalizeTransitionBaseTransform(style.transform);
	const tick = (t: number) => {
		// 输入动画状态，消费公共纯函数返回的样式帧。
		// Feed animation state into shared pure helpers and consume the returned style frame.
		const frame = resolveFlyTransitionFrame({
			baseTransform,
			easing,
			opacity,
			progress: t,
			targetOpacity,
			x,
			y
		});
		node.style.transform = frame.transform;
		node.style.opacity = frame.opacity;
	};
	return { tick, duration: resolveTransitionDurationWithDelay({ duration: d, delay }) };
};

export function useFlyIn(nodeRef: React.RefObject<HTMLElement | null>, options: FlyOptions & { enabled: boolean }) {
	const animationRef = useRef<number | null>(null);

	const startAnimation = useCallback(() => {
		if (!nodeRef.current || !options.enabled) return;

		// 清理之前的动画。
		// Cancel the previous animation before starting a new one.
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
		}

		const node = nodeRef.current;
		const { tick, duration } = fly(node, options);
		const startTime = performance.now();

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			const progress = resolveTransitionProgress({ elapsed, duration });

			tick(progress);

			if (progress < 1) {
				animationRef.current = requestAnimationFrame(animate);
			} else {
				animationRef.current = null;
			}
		};

		animationRef.current = requestAnimationFrame(animate);
	}, [nodeRef, options]);

	const cleanup = useCallback(() => {
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
			animationRef.current = null;
		}
	}, []);

	useEffect(() => {
		startAnimation();
		return cleanup;
	}, [options.enabled, startAnimation, cleanup]);

	return { startAnimation, cleanup };
}

export function useFlyOut(
	nodeRef: React.RefObject<HTMLElement | null>,
	options: FlyOptions & { enabled: boolean; onComplete?: () => void }
) {
	const animationRef = useRef<number | null>(null);

	const startAnimation = useCallback(() => {
		if (!nodeRef.current || !options.enabled) return;

		// 清理之前的动画。
		// Cancel the previous animation before starting a new one.
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
		}

		const node = nodeRef.current;
		const { y = 0, duration = 400, easing = (t: number) => t } = options;
		const startTime = performance.now();

		// 延迟一帧，确保 useFlyIn 的 cleanup 已经执行。
		// Delay one frame so the useFlyIn cleanup has already run.
		requestAnimationFrame(() => {
			const animate = (currentTime: number) => {
				const elapsed = currentTime - startTime;
				const progress = resolveTransitionProgress({ elapsed, duration });
				const frame = resolveFlyOutFrame({ easing, progress, y });
				node.style.transform = frame.transform;
				node.style.opacity = frame.opacity;

				if (progress < 1) {
					animationRef.current = requestAnimationFrame(animate);
				} else {
					animationRef.current = null;
					// 动画完成后保留最终位置，只清理 opacity。
					// Keep the final position after completion and only clear opacity.
					node.style.opacity = '';
					// 设置 visibility 为 hidden，确保元素不可交互。
					// Set visibility to hidden so the element is not interactive.
					node.style.visibility = 'hidden';
					options.onComplete?.();
				}
			};

			animationRef.current = requestAnimationFrame(animate);
		});
	}, [nodeRef, options]);

	const cleanup = useCallback(() => {
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
			animationRef.current = null;
		}
		// 清理所有样式。
		// Clear all inline animation styles.
		if (nodeRef.current) {
			nodeRef.current.style.transform = '';
			nodeRef.current.style.opacity = '';
			nodeRef.current.style.visibility = '';
		}
	}, []);

	// 使用单独的 effect，只在 enabled 变为 true 时触发。
	// Use a separate effect so the animation starts only when enabled becomes true.
	useEffect(() => {
		if (options.enabled) {
			startAnimation();
			return cleanup;
		}
	}, [options.enabled, startAnimation, cleanup]);

	return { startAnimation, cleanup };
}

type FlyTransitionOptions = {
	in?: FlyOptions;
	out?: FlyOptions;
};

export function useFlyTransition(visible: boolean, options: FlyTransitionOptions) {
	const nodeRef = useRef<HTMLDivElement | null>(null);
	const animationRef = useRef<number | null>(null);
	const wasVisible = useRef(visible);

	const cleanup = useCallback(() => {
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
			animationRef.current = null;
		}
	}, []);

	const runAnimation = useCallback(
		(mode: 'in' | 'out', transitionOptions?: FlyOptions) => {
			if (!nodeRef.current || !transitionOptions) return;
			cleanup();

			const node = nodeRef.current;
			const { tick, duration } = fly(node, transitionOptions);
			const startTime = performance.now();

			const animate = (currentTime: number) => {
				const elapsed = currentTime - startTime;
				const progress = resolveTransitionProgress({ elapsed, duration });
				tick(resolveTransitionTickProgress({ mode, progress }));

				if (progress < 1) {
					animationRef.current = requestAnimationFrame(animate);
				} else {
					animationRef.current = null;
					if (mode === 'out' && nodeRef.current) {
						nodeRef.current.style.visibility = 'hidden';
					}
				}
			};

			animationRef.current = requestAnimationFrame(animate);
		},
		[cleanup]
	);

	useEffect(() => {
		const node = nodeRef.current;
		if (!node) {
			wasVisible.current = visible;
			return;
		}

		if (visible && !wasVisible.current) {
			node.style.visibility = 'visible';
			runAnimation('in', options.in || options.out);
		} else if (!visible && wasVisible.current) {
			runAnimation('out', options.out || options.in);
		} else if (!visible) {
			node.style.visibility = 'hidden';
		}

		wasVisible.current = visible;
		return cleanup;
	}, [visible, options.in, options.out, runAnimation, cleanup]);

	return nodeRef;
}
