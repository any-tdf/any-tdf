import { linear, type EasingFunction } from './easing';

export interface AnimationConfig {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
	css?: (t: number, u: number) => string;
	tick?: (t: number, u: number) => void;
}

export type DeferredAnimationConfig = (options?: { direction: 'in' | 'out' | 'both' }) => AnimationConfig;
export type MaybeDeferredAnimationConfig = AnimationConfig | DeferredAnimationConfig;

export type AnimationController = {
	cancel: () => void;
	deactivate: () => void;
	reset: () => void;
	t: () => number;
	finished: Promise<void>;
};

const propertyToCamelCase = (property: string) => {
	if (property === 'float') return 'cssFloat';
	if (property === 'offset') return 'cssOffset';
	if (property.startsWith('--')) return property;
	const parts = property.split('-');
	if (parts.length === 1) return parts[0];
	return `${parts[0]}${parts
		.slice(1)
		.map((part) => `${part[0]?.toUpperCase() || ''}${part.slice(1)}`)
		.join('')}`;
};

const parseCssDeclarations = (css: string) => {
	const entries: [string, string][] = [];
	for (const part of css.split(';')) {
		const index = part.indexOf(':');
		if (index < 0) continue;
		const property = part.slice(0, index).trim();
		const value = part.slice(index + 1).trim();
		if (!property || !value) continue;
		entries.push([property, value]);
	}
	return entries;
};

const cssToKeyframe = (css: string): Keyframe => {
	const keyframe: Keyframe = {};
	for (const [property, value] of parseCssDeclarations(css)) {
		(keyframe as Record<string, string>)[propertyToCamelCase(property)] = value;
	}
	return keyframe;
};

const applyCssText = (element: Element, css: string) => {
	const style = (element as HTMLElement | SVGElement).style;
	for (const [property, value] of parseCssDeclarations(css)) {
		style.setProperty(property, value);
	}
};

const resolveConfig = (config: MaybeDeferredAnimationConfig, direction: 'in' | 'out' | 'both') => {
	if (typeof config === 'function') {
		return config({ direction });
	}
	return config;
};

const now = () => (typeof performance === 'undefined' ? Date.now() : performance.now());

const scheduleFrame = (callback: FrameRequestCallback) => {
	if (typeof requestAnimationFrame === 'undefined') {
		const id = setTimeout(() => callback(now()), 16);
		return id as unknown as number;
	}
	return requestAnimationFrame(callback);
};

const cancelScheduledFrame = (id: number) => {
	if (typeof cancelAnimationFrame === 'undefined') {
		clearTimeout(id);
		return;
	}
	cancelAnimationFrame(id);
};

export const runAnimationConfig = (
	element: Element,
	config: MaybeDeferredAnimationConfig,
	targetT: 0 | 1,
	options: {
		fromT?: number;
		onStart?: () => void;
		onEnd?: () => void;
		direction?: 'in' | 'out' | 'both';
	} = {}
): AnimationController => {
	const isIntro = targetT === 1;
	const direction = options.direction ?? (isIntro ? 'in' : 'out');
	let resolved = false;
	let deactivated = false;
	let aborted = false;
	let animation: Animation | null = null;
	let rafId: number | null = null;
	let currentT = options.fromT ?? 1 - targetT;
	let finishPromiseResolve: () => void = () => {};
	const finished = new Promise<void>((resolve) => {
		finishPromiseResolve = resolve;
	});

	const finish = () => {
		if (deactivated) {
			finishPromiseResolve();
			return;
		}
		options.onEnd?.();
		finishPromiseResolve();
	};

	queueMicrotask(() => {
		if (aborted) return;
		const resolvedConfig = resolveConfig(config, direction);
		const delay = resolvedConfig.delay ?? 0;
		const duration = resolvedConfig.duration ?? 0;
		const easing = resolvedConfig.easing ?? linear;
		const fromT = currentT;
		const delta = targetT - fromT;
		const activeDuration = Math.abs(delta) * duration;

		resolved = true;

		if (!activeDuration && !delay) {
			options.onStart?.();
			currentT = targetT;
			resolvedConfig.tick?.(targetT, 1 - targetT);
			if (resolvedConfig.css) applyCssText(element, resolvedConfig.css(targetT, 1 - targetT));
			finish();
			return;
		}

		const runMain = () => {
			if (aborted) return;
			options.onStart?.();

			if (!activeDuration) {
				currentT = targetT;
				resolvedConfig.tick?.(targetT, 1 - targetT);
				if (resolvedConfig.css) applyCssText(element, resolvedConfig.css(targetT, 1 - targetT));
				finish();
				return;
			}

			if (resolvedConfig.tick) {
				const start = now();
				const step = (time: number) => {
					if (aborted) return;
					const ratio = Math.min((time - start) / activeDuration, 1);
					currentT = fromT + delta * easing(ratio);
					resolvedConfig.tick?.(currentT, 1 - currentT);
					if (resolvedConfig.css) applyCssText(element, resolvedConfig.css(currentT, 1 - currentT));
					if (ratio < 1) {
						rafId = scheduleFrame(step);
					} else {
						currentT = targetT;
						resolvedConfig.tick?.(targetT, 1 - targetT);
						if (resolvedConfig.css) applyCssText(element, resolvedConfig.css(targetT, 1 - targetT));
						finish();
					}
				};
				rafId = scheduleFrame(step);
				return;
			}

			if (resolvedConfig.css && typeof element.animate === 'function') {
				const frameCount = Math.max(1, Math.ceil(activeDuration / (1000 / 60)));
				const keyframes: Keyframe[] = [];
				for (let index = 0; index <= frameCount; index += 1) {
					const ratio = index / frameCount;
					const t = fromT + delta * easing(ratio);
					keyframes.push(cssToKeyframe(resolvedConfig.css(t, 1 - t)));
				}
				animation = element.animate(keyframes, { duration: activeDuration, fill: 'forwards' });
				animation.onfinish = () => {
					currentT = targetT;
					resolvedConfig.tick?.(targetT, 1 - targetT);
					applyCssText(element, resolvedConfig.css?.(targetT, 1 - targetT) ?? '');
					const finishedAnimation = animation;
					animation = null;
					if (finishedAnimation) {
						finishedAnimation.onfinish = null;
						finishedAnimation.cancel();
					}
					finish();
				};
				return;
			}

			const start = now();
			const step = (time: number) => {
				if (aborted) return;
				const ratio = Math.min((time - start) / activeDuration, 1);
				currentT = fromT + delta * easing(ratio);
				if (resolvedConfig.css) applyCssText(element, resolvedConfig.css(currentT, 1 - currentT));
				if (ratio < 1) {
					rafId = scheduleFrame(step);
				} else {
					currentT = targetT;
					if (resolvedConfig.css) applyCssText(element, resolvedConfig.css(targetT, 1 - targetT));
					finish();
				}
			};
			rafId = scheduleFrame(step);
		};

		if (delay > 0 && typeof element.animate === 'function') {
			animation = element.animate([], { duration: delay, fill: 'forwards' });
			animation.onfinish = () => {
				animation?.cancel();
				animation = null;
				runMain();
			};
		} else if (delay > 0) {
			const start = now();
			const wait = (time: number) => {
				if (aborted) return;
				if (time - start >= delay) {
					rafId = null;
					runMain();
					return;
				}
				rafId = scheduleFrame(wait);
			};
			rafId = scheduleFrame(wait);
		} else {
			runMain();
		}
	});

	return {
		cancel: () => {
			aborted = true;
			if (animation) {
				animation.onfinish = null;
				animation.cancel();
				animation = null;
			}
			if (rafId !== null) {
				cancelScheduledFrame(rafId);
				rafId = null;
			}
			finishPromiseResolve();
		},
		deactivate: () => {
			deactivated = true;
		},
		reset: () => {
			currentT = targetT === 0 ? 1 : 0;
		},
		t: () => (resolved ? currentT : (options.fromT ?? 1 - targetT)),
		finished
	};
};

export const splitCssUnit = (value: number | string): [number, string] => {
	const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return split ? [Number.parseFloat(split[1]), split[2] || 'px'] : [value as number, 'px'];
};
