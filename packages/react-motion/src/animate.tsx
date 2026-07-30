import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { cubicOut, type EasingFunction } from './easing';
import { runAnimationConfig, type AnimationConfig } from './internal';

export type { AnimationConfig };

export interface FlipParams {
	delay?: number;
	duration?: number | ((len: number) => number);
	easing?: EasingFunction;
}

export type AnimateFunction<P = unknown> = (node: Element, states: { from: DOMRect; to: DOMRect }, params?: P) => AnimationConfig;

const getZoom = (element: Element) => {
	const htmlElement = element as HTMLElement & { currentCSSZoom?: number };
	if (typeof htmlElement.currentCSSZoom === 'number') {
		return Number(htmlElement.currentCSSZoom) || 1;
	}
	let current: HTMLElement | null = htmlElement;
	let zoom = 1;
	while (current !== null) {
		zoom *= Number(getComputedStyle(current).zoom) || 1;
		current = current.parentElement;
	}
	return zoom;
};

export const flip = (node: Element, { from, to }: { from: DOMRect; to: DOMRect }, params: FlipParams = {}): AnimationConfig => {
	const { delay = 0, duration = (distance: number) => Math.sqrt(distance) * 120, easing = cubicOut } = params;
	const htmlNode = node as HTMLElement;
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;
	const [originX = 0, originY = 0] = style.transformOrigin.split(' ').map(Number.parseFloat);
	const clientWidth = htmlNode.clientWidth || to.width || 1;
	const clientHeight = htmlNode.clientHeight || to.height || 1;
	const ox = originX / clientWidth;
	const oy = originY / clientHeight;
	const zoom = getZoom(node);
	const sx = clientWidth / (to.width || clientWidth) / zoom;
	const sy = clientHeight / (to.height || clientHeight) / zoom;
	const fx = from.left + from.width * ox;
	const fy = from.top + from.height * oy;
	const tx = to.left + to.width * ox;
	const ty = to.top + to.height * oy;
	const dx = (fx - tx) * sx;
	const dy = (fy - ty) * sy;
	const dsx = from.width / (to.width || from.width || 1);
	const dsy = from.height / (to.height || from.height || 1);
	const distance = Math.sqrt(dx * dx + dy * dy);

	return {
		delay,
		duration: typeof duration === 'function' ? duration(distance) : duration,
		easing,
		css: (t, u) => {
			const x = u * dx;
			const y = u * dy;
			const scaleX = t + u * dsx;
			const scaleY = t + u * dsy;
			return `transform: ${transform} translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY});`;
		}
	};
};

export interface UseFlipListOptions<P = FlipParams> {
	animate?: AnimateFunction<P>;
	params?: P;
	disabled?: boolean;
}

export const useFlipList = <K extends React.Key, P = FlipParams>(keys: readonly K[], options: UseFlipListOptions<P> = {}) => {
	const nodeMapRef = useRef(new Map<K, HTMLElement>());
	const rectMapRef = useRef(new Map<K, DOMRect>());
	const animationMapRef = useRef(new Map<K, ReturnType<typeof runAnimationConfig>>());
	const animateFn = options.animate ?? (flip as AnimateFunction<P>);

	const getRef = useCallback(
		(key: K) => (node: HTMLElement | null) => {
			if (node) {
				nodeMapRef.current.set(key, node);
			} else {
				nodeMapRef.current.delete(key);
			}
		},
		[]
	);

	useLayoutEffect(() => {
		const nextRects = new Map<K, DOMRect>();
		for (const key of keys) {
			const node = nodeMapRef.current.get(key);
			if (!node) continue;
			const nextRect = node.getBoundingClientRect();
			const previousRect = rectMapRef.current.get(key);
			nextRects.set(key, nextRect);

			if (options.disabled || !previousRect) continue;
			if (
				previousRect.left === nextRect.left &&
				previousRect.top === nextRect.top &&
				previousRect.right === nextRect.right &&
				previousRect.bottom === nextRect.bottom
			)
				continue;

			animationMapRef.current.get(key)?.cancel();
			const config = animateFn(node, { from: previousRect, to: nextRect }, options.params);
			animationMapRef.current.set(key, runAnimationConfig(node, config, 1, { fromT: 0, direction: 'both' }));
		}
		rectMapRef.current = nextRects;

		return () => {
			for (const controller of animationMapRef.current.values()) {
				controller.cancel();
			}
			animationMapRef.current.clear();
		};
	}, [animateFn, keys, options.disabled, options.params]);

	return { getRef };
};

export interface FlipGroupProps<T, P = FlipParams> {
	items: readonly T[];
	getKey: (item: T, index: number) => React.Key;
	children: (item: T, index: number) => React.ReactNode;
	as?: keyof React.JSX.IntrinsicElements;
	itemAs?: keyof React.JSX.IntrinsicElements;
	className?: string;
	itemClassName?: string | ((item: T, index: number) => string);
	params?: P;
	animate?: AnimateFunction<P>;
	disabled?: boolean;
}

export const FlipGroup = <T, P = FlipParams>({
	items,
	getKey,
	children,
	as = 'div',
	itemAs = 'div',
	className,
	itemClassName,
	params,
	animate,
	disabled
}: FlipGroupProps<T, P>) => {
	const keys = items.map(getKey);
	const { getRef } = useFlipList(keys, { animate, params, disabled });
	const renderedItems = items.map((item, index) => {
		const key = getKey(item, index);
		const resolvedClassName = typeof itemClassName === 'function' ? itemClassName(item, index) : itemClassName;
		return React.createElement(
			itemAs,
			{
				key,
				ref: getRef(key),
				className: resolvedClassName
			},
			children(item, index)
		);
	});

	return React.createElement(as, { className }, renderedItems);
};
