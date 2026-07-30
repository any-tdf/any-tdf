import { afterAll, describe, expect, test } from 'bun:test';
import { easingFunctions, type EasingProps } from './easing';
import { flip, type FlipParams } from './animate';
import { getInterpolator } from './interpolate';
import { runAnimationConfig } from './internal';
import {
	Spring,
	Tween,
	prefersReducedMotion,
	spring,
	tweened,
	type SpringOptions,
	type SpringUpdateOptions,
	type TweenOptions
} from './motion';
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

describe('easing', () => {
	test('exports Svelte easing functions by name', () => {
		expect(easingNames).toHaveLength(31);
		for (const name of easingNames) {
			expect(typeof easingFunctions[name]).toBe('function');
		}
	});

	test('keeps stable endpoint values for common functions', () => {
		expect(easingFunctions.linear(0.25)).toBe(0.25);
		expect(easingFunctions.cubicIn(0)).toBe(0);
		expect(easingFunctions.cubicIn(1)).toBe(1);
		expect(easingFunctions.sineIn(0)).toBe(0);
		expect(easingFunctions.sineOut(1)).toBeCloseTo(1);
	});
});

describe('transition', () => {
	const node = {} as Element;
	const customEasing = (t: number) => t * t;

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

	test('tracks every Svelte transition parameter name', () => {
		expect(transitionParamKeys).toEqual({
			blur: ['delay', 'duration', 'easing', 'amount', 'opacity'],
			fade: ['delay', 'duration', 'easing'],
			fly: ['delay', 'duration', 'easing', 'x', 'y', 'opacity'],
			slide: ['delay', 'duration', 'easing', 'axis'],
			scale: ['delay', 'duration', 'easing', 'start', 'opacity'],
			draw: ['delay', 'speed', 'duration', 'easing'],
			crossfade: ['delay', 'duration', 'easing']
		});
	});

	test('fade samples opacity from 0 to the computed value', () => {
		const config = fade(node, { delay: 12, duration: 120, easing: customEasing });
		expect(config.delay).toBe(12);
		expect(config.duration).toBe(120);
		expect(config.easing).toBe(customEasing);
		expect(config.css?.(0, 1)).toContain('opacity: 0');
		expect(config.css?.(1, 0)).toContain('opacity: 0.8');
	});

	test('fly preserves duration and emits translate and opacity CSS', () => {
		const config = fly(node, { delay: 8, x: 10, y: '2rem', opacity: 0.2, duration: 240, easing: customEasing });
		const css = config.css?.(0.5, 0.5) ?? '';
		expect(config.delay).toBe(8);
		expect(config.duration).toBe(240);
		expect(config.easing).toBe(customEasing);
		expect(css).toContain('translate(5px, 1rem)');
		expect(css).toContain('opacity: 0.48');
	});

	test('scale and blur emit expected CSS fragments', () => {
		const scaleConfig = scale(node, { delay: 4, duration: 160, easing: customEasing, start: 0.5, opacity: 0.25 });
		const blurConfig = blur(node, { delay: 6, duration: 180, easing: customEasing, amount: '10px', opacity: 0.2 });
		expect(scaleConfig.delay).toBe(4);
		expect(scaleConfig.duration).toBe(160);
		expect(scaleConfig.easing).toBe(customEasing);
		expect(scaleConfig.css?.(0.5, 0.5)).toContain('scale(0.75)');
		expect(scaleConfig.css?.(0.5, 0.5)).toContain('opacity: 0.5');
		expect(blurConfig.delay).toBe(6);
		expect(blurConfig.duration).toBe(180);
		expect(blurConfig.easing).toBe(customEasing);
		expect(blurConfig.css?.(0.25, 0.75)).toContain('blur(7.5px)');
		expect(blurConfig.css?.(0.25, 0.75)).toContain('opacity: 0.31999999999999995');
	});

	test('slide measures box properties along the selected y axis', () => {
		const config = slide(node, { delay: 10, duration: 220, easing: customEasing, axis: 'y' });
		const css = config.css?.(0.5, 0.5) ?? '';
		expect(config.delay).toBe(10);
		expect(config.duration).toBe(220);
		expect(config.easing).toBe(customEasing);
		expect(css).toContain('height: 60px');
		expect(css).toContain('padding-top: 6px');
		expect(css).toContain('border-bottom-width: 1px');
	});

	test('slide measures box properties along the selected x axis', () => {
		const css = slide(node, { axis: 'x' }).css?.(0.5, 0.5) ?? '';
		expect(css).toContain('width: 40px');
		expect(css).toContain('padding-left: 4px');
		expect(css).toContain('border-right-width: 1px');
	});

	test('draw computes duration from SVG path length', () => {
		const path = { getTotalLength: () => 100 } as SVGElement & { getTotalLength(): number };
		const config = draw(path, { delay: 14, speed: 2, easing: customEasing });
		expect(config.delay).toBe(14);
		expect(config.duration).toBe(50);
		expect(config.easing).toBe(customEasing);
		expect(config.css?.(0, 1)).toContain('stroke-dashoffset: 100');
	});

	test('draw accepts duration functions', () => {
		const path = { getTotalLength: () => 100 } as SVGElement & { getTotalLength(): number };
		const config = draw(path, { duration: (length) => length + 20 });
		expect(config.duration).toBe(120);
	});

	test('crossfade applies defaults, parameter overrides, and fallback', () => {
		const fromNode = {
			getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 50 })
		} as Element;
		const toNode = {
			getBoundingClientRect: () => ({ left: 3, top: 4, width: 50, height: 25 })
		} as Element;
		const fallbackCalls: boolean[] = [];
		const [send, receive] = crossfade({
			delay: 9,
			duration: (distance) => distance + 1,
			easing: customEasing,
			fallback: (_node, params, intro) => {
				fallbackCalls.push(intro);
				return { delay: params.delay, duration: 33, easing: customEasing };
			}
		});

		send(fromNode, { key: 'shared' });
		const matched = receive(toNode, { key: 'shared' })();
		expect(matched.delay).toBe(9);
		expect(matched.duration).toBe(6);
		expect(matched.easing).toBe(customEasing);
		expect(matched.css?.(0.5, 0.5)).toContain('translate(-1.5px, -2px)');

		const fallback = receive(toNode, { key: 'missing', delay: 11 })();
		expect(fallback.delay).toBe(11);
		expect(fallback.duration).toBe(33);
		expect(fallbackCalls).toEqual([true]);
	});

	test('crossfade returns no transition when no counterpart or fallback exists', () => {
		const toNode = {
			getBoundingClientRect: () => ({ left: 0, top: 0, width: 50, height: 25 })
		} as Element;
		const [, receive] = crossfade({});
		expect(receive(toNode, { key: 'missing' })()).toBeUndefined();
	});
});

describe('animate', () => {
	const customEasing = (t: number) => t * t;
	const flipParamKeys = ['delay', 'duration', 'easing'] satisfies Array<keyof FlipParams>;

	test('tracks every Svelte flip parameter name', () => {
		expect(flipParamKeys).toEqual(['delay', 'duration', 'easing']);
	});

	test('flip applies delay, duration function, and easing', () => {
		const node = {
			clientWidth: 100,
			clientHeight: 50,
			parentElement: null
		} as Element;
		const from = { left: 0, top: 0, width: 100, height: 50 } as DOMRect;
		const to = { left: 3, top: 4, width: 100, height: 50 } as DOMRect;
		const config = flip(node, { from, to }, { delay: 7, duration: (distance) => distance + 2, easing: customEasing });
		expect(config.delay).toBe(7);
		expect(config.duration).toBe(7);
		expect(config.easing).toBe(customEasing);
		expect(config.css?.(0.5, 0.5)).toContain('translate(-1.5px, -2px)');
	});
});

describe('runtime animation config', () => {
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

	test('honors delay when Web Animations are unavailable', async () => {
		let nextId = 0;
		const callbacks = new Map<number, FrameRequestCallback>();
		globalThis.requestAnimationFrame = ((callback: FrameRequestCallback) => {
			const id = (nextId += 1);
			callbacks.set(id, callback);
			return id;
		}) as typeof requestAnimationFrame;
		globalThis.cancelAnimationFrame = ((id: number) => {
			callbacks.delete(id);
		}) as typeof cancelAnimationFrame;

		const flushFrames = (time: number) => {
			const pending = [...callbacks.values()];
			callbacks.clear();
			for (const callback of pending) {
				callback(time);
			}
		};

		let started = false;
		let ticked = false;
		const element = {} as Element;
		const controller = runAnimationConfig(
			element,
			{
				delay: 50,
				duration: 0,
				tick: () => {
					ticked = true;
				}
			},
			1,
			{
				onStart: () => {
					started = true;
				}
			}
		);

		await Promise.resolve();
		expect(started).toBe(false);
		flushFrames(performance.now() + 10);
		expect(started).toBe(false);
		flushFrames(performance.now() + 80);
		await controller.finished;
		globalThis.requestAnimationFrame = originalRequestAnimationFrame;
		globalThis.cancelAnimationFrame = originalCancelAnimationFrame;
		expect(started).toBe(true);
		expect(ticked).toBe(true);
	});

	test('applies CSS on every fallback frame when Web Animations are unavailable', async () => {
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
			{
				duration: 100,
				css: (t) => `opacity: ${t}; transform: translateX(${t * 10}px);`
			},
			1
		);
		await Promise.resolve();
		const start = performance.now();
		for (const time of [start + 20, start + 60, start + 120]) {
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

describe('motion interpolation', () => {
	test('interpolates numbers, arrays, objects, and dates', () => {
		expect(getInterpolator(0, 10)(0.5)).toBe(5);
		expect(getInterpolator([0, 10], [10, 20])(0.5)).toEqual([5, 15]);
		expect(getInterpolator({ x: 0, y: 10 }, { x: 10, y: 20 })(0.5)).toEqual({ x: 5, y: 15 });
		expect(getInterpolator(new Date(0), new Date(1000))(0.5).getTime()).toBe(500);
	});
});

describe('motion', () => {
	const tweenParamKeys = ['delay', 'duration', 'easing', 'interpolate'] satisfies Array<keyof TweenOptions<number>>;
	const springOptionKeys = ['stiffness', 'damping', 'precision'] satisfies Array<keyof SpringOptions>;
	const springUpdateOptionKeys = ['hard', 'soft', 'instant', 'preserveMomentum'] satisfies Array<keyof SpringUpdateOptions>;

	test('tracks every Svelte motion parameter name', () => {
		expect(tweenParamKeys).toEqual(['delay', 'duration', 'easing', 'interpolate']);
		expect(springOptionKeys).toEqual(['stiffness', 'damping', 'precision']);
		expect(springUpdateOptionKeys).toEqual(['hard', 'soft', 'instant', 'preserveMomentum']);
	});

	test('Tween set uses delay, duration, easing, and interpolate options', async () => {
		const calls: string[] = [];
		const tween = new Tween(0);
		await tween.set(10, {
			delay: 1,
			duration: (from, to) => {
				calls.push(`duration:${from}:${to}`);
				return 80;
			},
			easing: (t) => {
				calls.push('easing');
				return t;
			},
			interpolate: (from, to) => {
				calls.push(`interpolate:${from}:${to}`);
				return (t) => from + (to - from) * t;
			}
		});
		expect(tween.current).toBe(10);
		expect(calls).toContain('duration:0:10');
		expect(calls).toContain('interpolate:0:10');
		expect(calls).toContain('easing');
	});

	test('Tween update and tweened store accept option overrides', async () => {
		const tween = new Tween(1, { duration: 0 });
		await tween.update((targetValue, value) => targetValue + value, { duration: 0 });
		expect(tween.current).toBe(2);

		const store = tweened(1, { duration: 0 });
		let current = 0;
		const unsubscribe = store.subscribe((value) => {
			current = value;
		});
		await store.set(2, { duration: 0 });
		await store.update((targetValue, value) => targetValue + value, { duration: 0 });
		unsubscribe();
		expect(current).toBe(4);
	});

	test('tweened store sets immediately from nullish initial values like Svelte', async () => {
		const store = tweened<number>();
		let current: number | undefined;
		const unsubscribe = store.subscribe((value) => {
			current = value;
		});
		await store.set(5);
		unsubscribe();
		expect(current).toBe(5);
	});

	test('Spring constructor and set options cover Svelte spring parameters', async () => {
		const immediate = new Spring(0, { stiffness: 2, damping: -1, precision: 0.5 });
		expect(immediate.stiffness).toBe(1);
		expect(immediate.damping).toBe(0);
		expect(immediate.precision).toBe(0.5);
		immediate.stiffness = -1;
		immediate.damping = 2;
		immediate.precision = 0.25;
		expect(immediate.stiffness).toBe(0);
		expect(immediate.damping).toBe(1);
		expect(immediate.precision).toBe(0.25);
		await immediate.set(10, { instant: true });
		expect(immediate.current).toBe(10);
		await immediate.set(20, { instant: true });
		expect(immediate.current).toBe(20);

		const animated = new Spring(0, { stiffness: 0.3, damping: 0.6, precision: 100 });
		await animated.set(10, { soft: true });
		expect(animated.current).toBe(10);
		await animated.set(20, { soft: 0.25 });
		expect(animated.current).toBe(20);
		await animated.set(30, { soft: '0.4' });
		expect(animated.current).toBe(30);
		await animated.set(40, { preserveMomentum: 120 });
		expect(animated.current).toBe(40);
	});

	test('Spring class ignores legacy hard option while instant remains immediate', async () => {
		const animated = new Spring(0, { precision: 100 });
		const hardPromise = animated.set(10, { hard: true });
		expect(animated.current).toBe(0);
		await hardPromise;
		expect(animated.current).toBe(10);

		await animated.set(20, { instant: true });
		expect(animated.current).toBe(20);
	});

	test('legacy spring store keeps hard and ignores class-only instant option', async () => {
		const store = spring(0, { precision: 100 });
		let current = 0;
		const unsubscribe = store.subscribe((value) => {
			current = value ?? 0;
		});

		await store.set(5, { hard: true });
		expect(current).toBe(5);

		const instantPromise = store.set(10, { instant: true });
		expect(current).toBe(5);
		await instantPromise;
		unsubscribe();
		expect(current).toBe(10);
	});

	test('spring store and prefersReducedMotion expose Svelte-compatible subscription APIs', async () => {
		const store = spring(1, { stiffness: 1, damping: 1 });
		let current = 0;
		const unsubscribe = store.subscribe((value) => {
			current = value;
		});
		await store.set(2, { instant: true });
		await store.update((targetValue, value) => targetValue + value, { instant: true });
		unsubscribe();
		expect(current).toBe(4);

		let reducedMotion = true;
		const unsubscribeReducedMotion = prefersReducedMotion.subscribe((value) => {
			reducedMotion = value;
		});
		unsubscribeReducedMotion();
		expect(typeof reducedMotion).toBe('boolean');
	});
});
