import { afterAll, describe, expect, test } from 'bun:test';
import { flip, FlipGroup, type FlipParams } from './animate';
import { easingFunctions, type EasingProps } from './easing';
import { runAnimationConfig } from './internal';
import { getInterpolator, prefersReducedMotion, Spring, spring, Tween, tweened } from './motion';
import {
	blur,
	crossfade,
	draw,
	fade,
	fly,
	scale,
	slide,
	type BlurParams,
	type CrossfadeParams,
	type DrawParams,
	type FadeParams,
	type FlyParams,
	type ScaleParams,
	type SlideParams
} from './transition';
import { Transition } from './vue';

const easingNames: EasingProps[] = [
	'backIn',
	'backInOut',
	'backOut',
	'bounceIn',
	'bounceInOut',
	'bounceOut',
	'circIn',
	'circInOut',
	'circOut',
	'cubicIn',
	'cubicInOut',
	'cubicOut',
	'elasticIn',
	'elasticInOut',
	'elasticOut',
	'expoIn',
	'expoInOut',
	'expoOut',
	'linear',
	'quadIn',
	'quadInOut',
	'quadOut',
	'quartIn',
	'quartInOut',
	'quartOut',
	'quintIn',
	'quintInOut',
	'quintOut',
	'sineIn',
	'sineInOut',
	'sineOut'
];

const originalGetComputedStyle = globalThis.getComputedStyle;
const originalRequestAnimationFrame = globalThis.requestAnimationFrame;
const originalCancelAnimationFrame = globalThis.cancelAnimationFrame;

const computedStyle = {
	opacity: '0.8',
	transform: 'none',
	filter: 'none',
	strokeLinecap: 'butt',
	strokeWidth: '2',
	zoom: '1',
	transformOrigin: '0px 0px',
	getPropertyValue: (property: string) => {
		const values: Record<string, string> = {
			height: '120px',
			width: '80px',
			'padding-top': '12px',
			'padding-bottom': '16px',
			'padding-left': '8px',
			'padding-right': '10px',
			'margin-top': '4px',
			'margin-bottom': '6px',
			'margin-left': '3px',
			'margin-right': '5px',
			'border-top-width': '1px',
			'border-bottom-width': '2px',
			'border-left-width': '1px',
			'border-right-width': '2px'
		};
		return values[property] ?? '0px';
	}
} as unknown as CSSStyleDeclaration;

globalThis.getComputedStyle = (() => computedStyle) as typeof getComputedStyle;

afterAll(() => {
	globalThis.getComputedStyle = originalGetComputedStyle;
	globalThis.requestAnimationFrame = originalRequestAnimationFrame;
	globalThis.cancelAnimationFrame = originalCancelAnimationFrame;
});

describe('Svelte easing parity', () => {
	test('exports every easing function by name with stable endpoints', () => {
		expect(easingNames).toHaveLength(31);
		for (const name of easingNames) {
			expect(typeof easingFunctions[name]).toBe('function');
			expect(easingFunctions[name](0)).toBeCloseTo(0);
			expect(easingFunctions[name](1)).toBeCloseTo(1);
		}
	});
});

describe('Svelte transition parity', () => {
	const node = {} as Element;
	const transitionParamKeys = {
		blur: ['delay', 'duration', 'easing', 'amount', 'opacity'],
		fade: ['delay', 'duration', 'easing'],
		fly: ['delay', 'duration', 'easing', 'x', 'y', 'opacity'],
		slide: ['delay', 'duration', 'easing', 'axis'],
		scale: ['delay', 'duration', 'easing', 'start', 'opacity'],
		draw: ['delay', 'speed', 'duration', 'easing'],
		crossfade: ['delay', 'duration', 'easing']
	} satisfies {
		blur: Array<keyof BlurParams>;
		fade: Array<keyof FadeParams>;
		fly: Array<keyof FlyParams>;
		slide: Array<keyof SlideParams>;
		scale: Array<keyof ScaleParams>;
		draw: Array<keyof DrawParams>;
		crossfade: Array<keyof CrossfadeParams>;
	};

	test('tracks every public parameter name', () => {
		expect(transitionParamKeys.fade).toEqual(['delay', 'duration', 'easing']);
		expect(transitionParamKeys.fly).toContain('opacity');
		expect(transitionParamKeys.draw).toContain('speed');
	});

	test('emits the same CSS fragments as Svelte transitions', () => {
		expect(fade(node, { duration: 150 }).css?.(0.5, 0.5)).toBe('opacity: 0.4;');
		expect(fly(node, { x: 20, y: '10%', opacity: 0.2 }).css?.(0.5, 0.5)).toContain('translate(10px, 5%)');
		expect(scale(node, { start: 0.5, opacity: 0 }).css?.(0.5, 0.5)).toContain('scale(0.75)');
		expect(blur(node, { amount: 10, opacity: 0 }).css?.(0.5, 0.5)).toContain('blur(5px)');
		expect(slide(node, { axis: 'y' }).css?.(0.5)).toContain('height: 60px');
		expect(slide(node, { axis: 'x' }).css?.(0.5)).toContain('width: 40px');
	});

	test('draw and crossfade preserve duration and fallback behavior', () => {
		const path = { getTotalLength: () => 50 } as SVGElement & { getTotalLength: () => number };
		expect(draw(path, { speed: 2 }).duration).toBe(25);
		expect(draw(path, { duration: (length) => length * 3 }).duration).toBe(150);

		const fromNode = { getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 50 }) } as Element;
		const toNode = { getBoundingClientRect: () => ({ left: 10, top: 5, width: 200, height: 100 }) } as Element;
		const [send, receive] = crossfade({ fallback: () => ({ duration: 123 }) });
		send(fromNode, { key: 'item' });
		expect(receive(toNode, { key: 'item' })().css?.(0.5, 0.5)).toContain('translate(');
		expect(receive(toNode, { key: 'missing' })().duration).toBe(123);
	});
});

describe('Svelte flip parity', () => {
	test('supports delay, duration functions, and easing', () => {
		const keys = ['delay', 'duration', 'easing'] satisfies Array<keyof FlipParams>;
		expect(keys).toEqual(['delay', 'duration', 'easing']);
		const node = { clientWidth: 100, clientHeight: 50, parentElement: null } as Element;
		const from = { left: 0, top: 0, width: 100, height: 50 } as DOMRect;
		const to = { left: 3, top: 4, width: 100, height: 50 } as DOMRect;
		const config = flip(node, { from, to }, { delay: 7, duration: (distance) => distance + 2 });
		expect(config.delay).toBe(7);
		expect(config.duration).toBe(7);
		expect(config.css?.(0.5, 0.5)).toContain('translate(-1.5px, -2px)');
	});

	test('exports Vue wrapper components', () => {
		expect(FlipGroup.name).toBe('FlipGroup');
		expect(Transition.name).toBe('MotionTransition');
	});
});

describe('animation runtime fallback', () => {
	test('commits final CSS and releases a finished Web Animation', async () => {
		const properties = new Map<string, string>();
		let cancelled = false;
		const animation = {
			cancel: () => {
				cancelled = true;
			},
			onfinish: null
		} as unknown as Animation;
		const element = {
			animate: () => animation,
			style: {
				setProperty: (property: string, value: string) => properties.set(property, value)
			}
		} as unknown as Element;
		const controller = runAnimationConfig(element, { duration: 100, css: (t) => `opacity: ${t};` }, 1);
		await Promise.resolve();
		const finishAnimation = animation.onfinish;
		expect(finishAnimation).not.toBeNull();
		finishAnimation?.call(animation, {} as AnimationPlaybackEvent);
		await controller.finished;
		expect(properties.get('opacity')).toBe('1');
		expect(animation.onfinish).toBeNull();
		expect(cancelled).toBe(true);
	});

	test('honors delay and writes CSS without Web Animations API', async () => {
		let nextId = 0;
		const callbacks = new Map<number, FrameRequestCallback>();
		const properties = new Map<string, string>();
		globalThis.requestAnimationFrame = ((callback: FrameRequestCallback) => {
			const id = (nextId += 1);
			callbacks.set(id, callback);
			return id;
		}) as typeof requestAnimationFrame;
		globalThis.cancelAnimationFrame = ((id: number) => {
			callbacks.delete(id);
		}) as typeof cancelAnimationFrame;
		const element = {
			style: {
				setProperty: (property: string, value: string) => properties.set(property, value)
			}
		} as unknown as Element;
		const controller = runAnimationConfig(
			element,
			{ delay: 20, duration: 100, css: (t) => `opacity: ${t}; transform: translateX(${t * 10}px);` },
			1
		);
		await Promise.resolve();
		const start = performance.now();
		for (const time of [start + 10, start + 30, start + 80, start + 150]) {
			const pending = [...callbacks.values()];
			callbacks.clear();
			for (const callback of pending) callback(time);
		}
		await controller.finished;
		globalThis.requestAnimationFrame = originalRequestAnimationFrame;
		globalThis.cancelAnimationFrame = originalCancelAnimationFrame;
		expect(properties.get('opacity')).toBe('1');
		expect(properties.get('transform')).toBe('translateX(10px)');
	});
});

describe('Svelte motion parity', () => {
	test('interpolates numbers, arrays, objects, and dates', () => {
		expect(getInterpolator(0, 10)(0.5)).toBe(5);
		expect(getInterpolator([0, 10], [10, 20])(0.5)).toEqual([5, 15]);
		expect(getInterpolator({ x: 0, y: 10 }, { x: 10, y: 20 })(0.5)).toEqual({ x: 5, y: 15 });
		expect(getInterpolator(new Date(0), new Date(1000))(0.5).getTime()).toBe(500);
	});

	test('Tween honors options and legacy tweened updates', async () => {
		const calls: string[] = [];
		const tween = new Tween(0);
		await tween.set(10, {
			duration: (from, to) => {
				calls.push(`${from}:${to}`);
				return 80;
			},
			easing: (t) => t,
			interpolate: (from, to) => (t) => from + (to - from) * t
		});
		expect(tween.current).toBe(10);
		expect(calls).toContain('0:10');

		const store = tweened(1, { duration: 0 });
		let current = 0;
		const unsubscribe = store.subscribe((value) => {
			current = value;
		});
		await store.update((target, value) => target + value, { duration: 0 });
		unsubscribe();
		expect(current).toBe(2);
	});

	test('Spring clamps mutable class options and preserves class/store option boundaries', async () => {
		const value = new Spring(0, { stiffness: 2, damping: -1, precision: 0.5 });
		expect(value.stiffness).toBe(1);
		expect(value.damping).toBe(0);
		value.stiffness = -1;
		value.damping = 2;
		expect(value.stiffness).toBe(0);
		expect(value.damping).toBe(1);
		await value.set(10, { instant: true });
		expect(value.current).toBe(10);

		const store = spring(0, { precision: 100 });
		let current = 0;
		const unsubscribe = store.subscribe((next) => {
			current = next ?? 0;
		});
		await store.set(5, { hard: true });
		unsubscribe();
		expect(current).toBe(5);
	});

	test('prefersReducedMotion exposes a Svelte-compatible readable store', () => {
		let current = true;
		const unsubscribe = prefersReducedMotion.subscribe((value) => {
			current = value;
		});
		unsubscribe();
		expect(typeof current).toBe('boolean');
	});
});
