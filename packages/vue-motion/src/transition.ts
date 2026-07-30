import { cubicInOut, cubicOut, linear, type EasingFunction } from './easing.js';
import { runAnimationConfig, splitCssUnit, type AnimationConfig } from './internal.js';

export { runAnimationConfig };
export type { AnimationConfig as TransitionConfig, AnimationController, MaybeDeferredAnimationConfig } from './internal.js';
export type { EasingFunction };

export interface BlurParams {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
	amount?: number | string;
	opacity?: number;
}

export interface FadeParams {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
}

export interface FlyParams {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
	x?: number | string;
	y?: number | string;
	opacity?: number;
}

export interface SlideParams {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
	axis?: 'x' | 'y';
}

export interface ScaleParams {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
	start?: number;
	opacity?: number;
}

export interface DrawParams {
	delay?: number;
	speed?: number;
	duration?: number | ((len: number) => number);
	easing?: EasingFunction;
}

export interface CrossfadeParams {
	delay?: number;
	duration?: number | ((len: number) => number);
	easing?: EasingFunction;
}

export type TransitionName = 'fade' | 'fly' | 'slide' | 'scale' | 'blur' | 'draw';
export type TransitionFunction<P = unknown> = (
	node: Element,
	params?: P,
	options?: { direction: 'in' | 'out' | 'both' }
) => AnimationConfig | ((options?: { direction: 'in' | 'out' | 'both' }) => AnimationConfig);

const readOpacity = (node: Element) => Number.parseFloat(getComputedStyle(node).opacity || '1');

export const blur = (
	node: Element,
	{ delay = 0, duration = 400, easing = cubicInOut, amount = 5, opacity = 0 }: BlurParams = {}
): AnimationConfig => {
	const style = getComputedStyle(node);
	const targetOpacity = readOpacity(node);
	const filter = style.filter === 'none' ? '' : style.filter;
	const opacityDelta = targetOpacity * (1 - opacity);
	const [value, unit] = splitCssUnit(amount);
	return {
		delay,
		duration,
		easing,
		css: (_t, u) => `opacity: ${targetOpacity - opacityDelta * u}; filter: ${filter} blur(${u * value}${unit});`
	};
};

export const fade = (node: Element, { delay = 0, duration = 400, easing = linear }: FadeParams = {}): AnimationConfig => {
	const opacity = readOpacity(node);
	return {
		delay,
		duration,
		easing,
		css: (t) => `opacity: ${t * opacity};`
	};
};

export const fly = (
	node: Element,
	{ delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }: FlyParams = {}
): AnimationConfig => {
	const style = getComputedStyle(node);
	const targetOpacity = readOpacity(node);
	const transform = style.transform === 'none' ? '' : style.transform;
	const opacityDelta = targetOpacity * (1 - opacity);
	const [xValue, xUnit] = splitCssUnit(x);
	const [yValue, yUnit] = splitCssUnit(y);
	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
			opacity: ${targetOpacity - opacityDelta * u};
		`
	};
};

export const slide = (node: Element, { delay = 0, duration = 400, easing = cubicOut, axis = 'y' }: SlideParams = {}): AnimationConfig => {
	const style = getComputedStyle(node);
	const opacity = readOpacity(node);
	const primaryProperty = axis === 'y' ? 'height' : 'width';
	const primaryPropertyValue = Number.parseFloat(style.getPropertyValue(primaryProperty));
	const secondaryProperties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
	const paddingStartValue = Number.parseFloat(style.getPropertyValue(`padding-${secondaryProperties[0]}`));
	const paddingEndValue = Number.parseFloat(style.getPropertyValue(`padding-${secondaryProperties[1]}`));
	const marginStartValue = Number.parseFloat(style.getPropertyValue(`margin-${secondaryProperties[0]}`));
	const marginEndValue = Number.parseFloat(style.getPropertyValue(`margin-${secondaryProperties[1]}`));
	const borderWidthStartValue = Number.parseFloat(style.getPropertyValue(`border-${secondaryProperties[0]}-width`));
	const borderWidthEndValue = Number.parseFloat(style.getPropertyValue(`border-${secondaryProperties[1]}-width`));

	return {
		delay,
		duration,
		easing,
		css: (t) =>
			'overflow: hidden;' +
			`opacity: ${Math.min(t * 20, 1) * opacity};` +
			`${primaryProperty}: ${t * primaryPropertyValue}px;` +
			`padding-${secondaryProperties[0]}: ${t * paddingStartValue}px;` +
			`padding-${secondaryProperties[1]}: ${t * paddingEndValue}px;` +
			`margin-${secondaryProperties[0]}: ${t * marginStartValue}px;` +
			`margin-${secondaryProperties[1]}: ${t * marginEndValue}px;` +
			`border-${secondaryProperties[0]}-width: ${t * borderWidthStartValue}px;` +
			`border-${secondaryProperties[1]}-width: ${t * borderWidthEndValue}px;` +
			`min-${primaryProperty}: 0;`
	};
};

export const scale = (
	node: Element,
	{ delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 }: ScaleParams = {}
): AnimationConfig => {
	const style = getComputedStyle(node);
	const targetOpacity = readOpacity(node);
	const transform = style.transform === 'none' ? '' : style.transform;
	const scaleDelta = 1 - start;
	const opacityDelta = targetOpacity * (1 - opacity);
	return {
		delay,
		duration,
		easing,
		css: (_t, u) => `
			transform: ${transform} scale(${1 - scaleDelta * u});
			opacity: ${targetOpacity - opacityDelta * u};
		`
	};
};

export const draw = (
	node: SVGElement & { getTotalLength(): number },
	{ delay = 0, speed, duration, easing = cubicInOut }: DrawParams = {}
): AnimationConfig => {
	let len = node.getTotalLength();
	const style = getComputedStyle(node);
	if (style.strokeLinecap !== 'butt') {
		len += Number.parseInt(style.strokeWidth, 10);
	}

	let resolvedDuration: number;
	if (duration === undefined) {
		resolvedDuration = speed === undefined ? 800 : len / speed;
	} else {
		resolvedDuration = typeof duration === 'function' ? duration(len) : duration;
	}

	return {
		delay,
		duration: resolvedDuration,
		easing,
		css: (_t, u) => `
			stroke-dasharray: ${len};
			stroke-dashoffset: ${u * len};
		`
	};
};

const assign = <T extends object, S extends object>(target: T, source: S): T & S => Object.assign(target, source);

export const crossfade = ({
	fallback,
	...defaults
}: CrossfadeParams & {
	fallback?: (node: Element, params: CrossfadeParams, intro: boolean) => AnimationConfig;
}): [
	(node: Element, params: CrossfadeParams & { key: unknown }) => () => AnimationConfig | undefined,
	(node: Element, params: CrossfadeParams & { key: unknown }) => () => AnimationConfig | undefined
] => {
	const toReceive = new Map<unknown, Element>();
	const toSend = new Map<unknown, Element>();

	const makeCrossfade = (fromNode: Element, node: Element, params: CrossfadeParams): AnimationConfig => {
		const merged = assign(assign({}, defaults), params);
		const delay = merged.delay ?? 0;
		const duration = merged.duration ?? ((distance: number) => Math.sqrt(distance) * 30);
		const easing = merged.easing ?? cubicOut;
		const from = fromNode.getBoundingClientRect();
		const to = node.getBoundingClientRect();
		const dx = from.left - to.left;
		const dy = from.top - to.top;
		const dw = from.width / to.width;
		const dh = from.height / to.height;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;
		const opacity = Number.parseFloat(style.opacity || '1');
		return {
			delay,
			duration: typeof duration === 'function' ? duration(distance) : duration,
			easing,
			css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px, ${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
		};
	};

	const transition = (items: Map<unknown, Element>, counterparts: Map<unknown, Element>, intro: boolean) => {
		return (node: Element, params: CrossfadeParams & { key: unknown }) => {
			items.set(params.key, node);
			return () => {
				if (counterparts.has(params.key)) {
					const otherNode = counterparts.get(params.key) as Element;
					counterparts.delete(params.key);
					return makeCrossfade(otherNode, node, params);
				}
				items.delete(params.key);
				return fallback?.(node, params, intro);
			};
		};
	};

	return [transition(toSend, toReceive, false), transition(toReceive, toSend, true)];
};

export const transitionMap = {
	blur,
	fade,
	fly,
	slide,
	scale,
	draw
} as const;
