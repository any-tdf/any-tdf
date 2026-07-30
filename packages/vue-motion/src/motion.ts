import { computed, onMounted, onUnmounted, ref, shallowRef, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue';
import { linear, type EasingFunction } from './easing.js';
import { getInterpolator } from './interpolate.js';

export { getInterpolator } from './interpolate.js';

export type Subscriber<T> = (value: T) => void;
export type Unsubscriber = () => void;
export type Updater<T> = (targetValue: T, value: T) => T;

export interface Readable<T> {
	subscribe(run: Subscriber<T>, invalidate?: () => void): Unsubscriber;
}

export interface SpringOptions {
	stiffness?: number;
	damping?: number;
	precision?: number;
}

export interface SpringUpdateOptions {
	hard?: any;
	soft?: string | number | boolean;
	instant?: boolean;
	preserveMomentum?: number;
}

export interface TweenOptions<T> {
	delay?: number;
	duration?: number | ((from: T, to: T) => number);
	easing?: EasingFunction;
	interpolate?: (a: T, b: T) => (t: number) => T;
}

export interface Tweened<T> extends Readable<T> {
	set(value: T, opts?: TweenOptions<T>): Promise<void>;
	update(updater: Updater<T>, opts?: TweenOptions<T>): Promise<void>;
}

const now = () => (typeof performance === 'undefined' ? Date.now() : performance.now());

const frame = (callback: FrameRequestCallback) => {
	if (typeof requestAnimationFrame === 'undefined') {
		const id = setTimeout(() => callback(now()), 16);
		return id as unknown as number;
	}
	return requestAnimationFrame(callback);
};

const cancelFrame = (id: number) => {
	if (typeof cancelAnimationFrame === 'undefined') {
		clearTimeout(id);
		return;
	}
	cancelAnimationFrame(id);
};

const isDateValue = (value: unknown): value is Date => Object.prototype.toString.call(value) === '[object Date]';

class ObservableValue<T> {
	protected value: T;
	private subscribers = new Set<Subscriber<T>>();

	constructor(value: T) {
		this.value = value;
	}

	protected publish(value: T) {
		this.value = value;
		for (const subscriber of this.subscribers) {
			subscriber(value);
		}
	}

	subscribe(run: Subscriber<T>, _invalidate?: () => void) {
		this.subscribers.add(run);
		run(this.value);
		return () => {
			this.subscribers.delete(run);
		};
	}
}

class WritableValue<T> extends ObservableValue<T> {
	set(value: T) {
		this.publish(value);
	}
}

type FrameTask = {
	cancel: () => void;
};

export class Tween<T> extends ObservableValue<T> {
	private task: FrameTask | null = null;
	private defaults: TweenOptions<T>;
	private targetValue: T;

	constructor(value: T, options: TweenOptions<T> = {}) {
		super(value);
		this.targetValue = value;
		this.defaults = options;
	}

	static of<U>(fn: () => U, options?: TweenOptions<U>) {
		return new Tween(fn(), options);
	}

	set(value: T, options?: TweenOptions<T>) {
		this.targetValue = value;
		const merged = { ...this.defaults, ...options };
		let { delay = 0, duration = 400, easing = linear, interpolate = getInterpolator } = merged;
		const previousTask = this.task;

		if (duration === 0) {
			previousTask?.cancel();
			if (this.task === previousTask) this.task = null;
			this.publish(value);
			return Promise.resolve();
		}

		const startTime = now() + delay;
		let started = false;
		let interpolateValue: (t: number) => T = () => value;
		let taskId: number | null = null;
		let cancelled = false;
		const task: FrameTask = {
			cancel: () => {
				cancelled = true;
				if (taskId !== null) {
					cancelFrame(taskId);
					taskId = null;
				}
			}
		};
		this.task = task;

		return new Promise<void>((resolve) => {
			const tick = (time: number) => {
				if (cancelled) return;
				if (time < startTime) {
					taskId = frame(tick);
					return;
				}
				if (!started) {
					started = true;
					const fromValue = this.value;
					interpolateValue = interpolate(this.value, value);
					if (typeof duration === 'function') duration = duration(fromValue, value);
					previousTask?.cancel();
				}
				const elapsed = time - startTime;
				if (elapsed > (duration as number)) {
					if (this.task === task) this.task = null;
					this.publish(value);
					resolve();
					return;
				}
				this.publish(interpolateValue(easing(elapsed / (duration as number))));
				taskId = frame(tick);
			};
			taskId = frame(tick);
		});
	}

	update(updater: Updater<T>, options?: TweenOptions<T>) {
		return this.set(updater(this.targetValue, this.value), options);
	}

	get current() {
		return this.value;
	}

	get target() {
		return this.targetValue;
	}

	set target(value: T) {
		void this.set(value);
	}
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const tickSpring = <T>(
	ctx: { invMass: number; stiffness: number; damping: number; precision: number; dt: number; settled: boolean },
	lastValue: T,
	currentValue: T,
	targetValue: T
): T => {
	if (typeof currentValue === 'number' || isDateValue(currentValue)) {
		const current = isDateValue(currentValue) ? currentValue.getTime() : currentValue;
		const last = isDateValue(lastValue) ? lastValue.getTime() : (lastValue as number);
		const target = isDateValue(targetValue) ? targetValue.getTime() : (targetValue as number);
		const delta = target - current;
		const velocity = (current - last) / (ctx.dt || 1 / 60);
		const springForce = ctx.stiffness * delta;
		const damper = ctx.damping * velocity;
		const acceleration = (springForce - damper) * ctx.invMass;
		const d = (velocity + acceleration) * ctx.dt;
		if (Math.abs(d) < ctx.precision && Math.abs(delta) < ctx.precision) {
			return targetValue;
		}
		ctx.settled = false;
		const next = current + d;
		return (isDateValue(currentValue) ? new Date(next) : next) as T;
	}

	if (Array.isArray(currentValue) && Array.isArray(lastValue) && Array.isArray(targetValue)) {
		return currentValue.map((_, index) => tickSpring(ctx, lastValue[index], currentValue[index], targetValue[index])) as T;
	}

	if (
		typeof currentValue === 'object' &&
		currentValue &&
		typeof lastValue === 'object' &&
		lastValue &&
		typeof targetValue === 'object' &&
		targetValue
	) {
		const next: Record<string, unknown> = {};
		for (const key of Object.keys(currentValue as Record<string, unknown>)) {
			next[key] = tickSpring(
				ctx,
				(lastValue as Record<string, unknown>)[key],
				(currentValue as Record<string, unknown>)[key],
				(targetValue as Record<string, unknown>)[key]
			);
		}
		return next as T;
	}

	throw new Error(`Cannot spring ${typeof currentValue} values`);
};

export class Spring<T = unknown> extends ObservableValue<T> implements Readable<T> {
	private task: number | null = null;
	private lastValue: T;
	private lastTime = 0;
	private inverseMass = 1;
	private inverseMassRecoveryRate = Infinity;
	private targetValue: T;
	private resolveCurrent: (() => void) | null = null;
	private rejectCurrent: ((reason?: unknown) => void) | null = null;
	private stiffnessValue: number;
	private dampingValue: number;
	private precisionValue: number;

	constructor(value: T, options: SpringOptions = {}) {
		super(value);
		this.targetValue = value;
		this.lastValue = value;
		this.stiffnessValue = clamp(options.stiffness ?? 0.15, 0, 1);
		this.dampingValue = clamp(options.damping ?? 0.8, 0, 1);
		this.precisionValue = options.precision ?? 0.01;
	}

	static of<U>(fn: () => U, options?: SpringOptions) {
		return new Spring(fn(), options);
	}

	set(value: T, options: SpringUpdateOptions = {}) {
		this.targetValue = value;
		this.rejectCurrent?.(new Error('Aborted'));
		this.resolveCurrent = null;
		this.rejectCurrent = null;

		if (this.value === undefined || options.instant) {
			if (this.task !== null) {
				cancelFrame(this.task);
				this.task = null;
			}
			this.lastTime = now();
			this.lastValue = value;
			this.publish(value);
			return Promise.resolve();
		}

		if (options.preserveMomentum) {
			this.inverseMassRecoveryRate = 1000 / (options.preserveMomentum * 60);
			this.inverseMass = 0;
		}

		if (this.value === null) {
			this.lastValue = value;
			this.publish(value);
		}

		if (this.task === null) {
			this.lastTime = now();
			const run = (time: number) => {
				this.inverseMass = Math.min(this.inverseMass + this.inverseMassRecoveryRate, 1);
				const elapsed = Math.min(time - this.lastTime, 1000 / 30);
				const ctx = {
					invMass: this.inverseMass,
					stiffness: this.stiffness,
					damping: this.damping,
					precision: this.precision,
					settled: true,
					dt: (elapsed * 60) / 1000
				};
				const nextValue = tickSpring(ctx, this.lastValue, this.value, this.targetValue);
				this.lastTime = time;
				this.lastValue = this.value;
				this.publish(nextValue);
				if (ctx.settled) {
					this.task = null;
					const resolve = this.resolveCurrent;
					this.resolveCurrent = null;
					this.rejectCurrent = null;
					resolve?.();
					return;
				}
				this.task = frame(run);
			};
			this.task = frame(run);
		}

		const promise = new Promise<void>((resolve, reject) => {
			this.resolveCurrent = resolve;
			this.rejectCurrent = reject;
		});
		promise.catch(() => {});
		return promise;
	}

	update(updater: Updater<T>, options?: SpringUpdateOptions) {
		return this.set(updater(this.targetValue, this.value), options);
	}

	get current() {
		return this.value;
	}

	get target() {
		return this.targetValue;
	}

	set target(value: T) {
		void this.set(value);
	}

	get stiffness() {
		return this.stiffnessValue;
	}

	set stiffness(value: number) {
		this.stiffnessValue = clamp(value, 0, 1);
	}

	get damping() {
		return this.dampingValue;
	}

	set damping(value: number) {
		this.dampingValue = clamp(value, 0, 1);
	}

	get precision() {
		return this.precisionValue;
	}

	set precision(value: number) {
		this.precisionValue = value;
	}
}

export const tweened = <T>(value?: T, defaults?: TweenOptions<T>): Tweened<T | undefined> => {
	const store = new WritableValue<T | undefined>(value);
	let currentValue: T | undefined = value;
	let targetValue: T | undefined = value;
	let task: FrameTask | null = null;

	const set = (nextValue: T | undefined, opts?: TweenOptions<T | undefined>) => {
		targetValue = nextValue;

		if (currentValue == null) {
			store.set((currentValue = nextValue));
			return Promise.resolve();
		}

		const previousTask = task;
		let {
			delay = 0,
			duration = 400,
			easing = linear,
			interpolate = getInterpolator
		} = { ...(defaults as TweenOptions<T | undefined> | undefined), ...opts };

		if (duration === 0) {
			previousTask?.cancel();
			if (task === previousTask) task = null;
			store.set((currentValue = targetValue));
			return Promise.resolve();
		}

		const startTime = now() + delay;
		let started = false;
		let interpolateValue: (t: number) => T | undefined = () => nextValue;
		let taskId: number | null = null;
		let cancelled = false;
		const currentTask: FrameTask = {
			cancel: () => {
				cancelled = true;
				if (taskId !== null) {
					cancelFrame(taskId);
					taskId = null;
				}
			}
		};
		task = currentTask;

		return new Promise<void>((resolve) => {
			const tick = (time: number) => {
				if (cancelled) return;
				if (time < startTime) {
					taskId = frame(tick);
					return;
				}
				if (!started) {
					started = true;
					const fromValue = currentValue as T | undefined;
					interpolateValue = interpolate(fromValue, nextValue);
					if (typeof duration === 'function') duration = duration(fromValue, nextValue);
					previousTask?.cancel();
				}
				const elapsed = time - startTime;
				if (elapsed > (duration as number)) {
					if (task === currentTask) task = null;
					store.set((currentValue = nextValue));
					resolve();
					return;
				}
				store.set((currentValue = interpolateValue(easing(elapsed / (duration as number)))));
				taskId = frame(tick);
			};
			taskId = frame(tick);
		});
	};

	return {
		set,
		update: (updater, opts) => set(updater(targetValue, currentValue), opts),
		subscribe: (run, invalidate) => store.subscribe(run, invalidate)
	};
};

export const spring = <T = unknown>(value?: T, opts: SpringOptions = {}): Spring<T | undefined> => {
	const store = new WritableValue<T | undefined>(value);
	let currentValue: T | undefined = value;
	let targetValue: T | undefined = value;
	let lastValue: T | undefined = value;
	let lastTime = 0;
	let task: number | null = null;
	let currentToken: object | null = null;
	let invMass = 1;
	let invMassRecoveryRate = 0;
	let cancelTask = false;
	const springStore = {
		stiffness: opts.stiffness ?? 0.15,
		damping: opts.damping ?? 0.8,
		precision: opts.precision ?? 0.01,
		set: (nextValue: T | undefined, options: SpringUpdateOptions = {}) => {
			targetValue = nextValue;
			const token = {};
			currentToken = token;

			if (currentValue == null || options.hard || (springStore.stiffness >= 1 && springStore.damping >= 1)) {
				cancelTask = true;
				if (task !== null) {
					cancelFrame(task);
					task = null;
				}
				lastTime = now();
				lastValue = nextValue;
				store.set((currentValue = targetValue));
				return Promise.resolve();
			}

			if (options.soft) {
				const rate = options.soft === true ? 0.5 : Number(options.soft);
				invMassRecoveryRate = 1 / (rate * 60);
				invMass = 0;
			}

			if (task === null) {
				lastTime = now();
				cancelTask = false;
				const run = (time: number) => {
					if (cancelTask) {
						cancelTask = false;
						task = null;
						return;
					}
					invMass = Math.min(invMass + invMassRecoveryRate, 1);
					const elapsed = Math.min(time - lastTime, 1000 / 30);
					const ctx = {
						invMass,
						stiffness: springStore.stiffness,
						damping: springStore.damping,
						precision: springStore.precision,
						settled: true,
						dt: (elapsed * 60) / 1000
					};
					const next = tickSpring(ctx, lastValue, currentValue, targetValue);
					lastTime = time;
					lastValue = currentValue;
					store.set((currentValue = next));
					if (ctx.settled) {
						task = null;
						return;
					}
					task = frame(run);
				};
				task = frame(run);
			}

			return new Promise<void>((resolve) => {
				const wait = () => {
					if (task === null) {
						if (token === currentToken) resolve();
						return;
					}
					frame(wait);
				};
				wait();
			});
		},
		update: (updater: Updater<T | undefined>, options?: SpringUpdateOptions) =>
			springStore.set(updater(targetValue, currentValue), options),
		subscribe: (run: Subscriber<T | undefined>, invalidate?: () => void) => store.subscribe(run, invalidate)
	};

	return springStore as Spring<T | undefined>;
};

class PrefersReducedMotion implements Readable<boolean> {
	private query: MediaQueryList | null = null;
	private subscribers = new Set<Subscriber<boolean>>();
	current = false;

	constructor() {
		if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
			this.query = window.matchMedia('(prefers-reduced-motion: reduce)');
			this.current = this.query.matches;
			this.query.addEventListener('change', this.handleChange);
		}
	}

	private handleChange = (event: MediaQueryListEvent) => {
		this.current = event.matches;
		for (const subscriber of this.subscribers) {
			subscriber(this.current);
		}
	};

	subscribe(run: Subscriber<boolean>, _invalidate?: () => void) {
		this.subscribers.add(run);
		run(this.current);
		return () => {
			this.subscribers.delete(run);
		};
	}
}

export const prefersReducedMotion = new PrefersReducedMotion();

export const usePrefersReducedMotion = () => {
	const current = ref(prefersReducedMotion.current);
	let unsubscribe: Unsubscriber | undefined;
	onMounted(() => {
		unsubscribe = prefersReducedMotion.subscribe((value) => {
			current.value = value;
		});
	});
	onUnmounted(() => {
		unsubscribe?.();
	});
	return current;
};

export const useTween = <T>(target: MaybeRefOrGetter<T>, options?: TweenOptions<T>): { current: Ref<T>; tween: Tween<T> } => {
	const tween = new Tween(toValue(target), options);
	const current = ref(tween.current) as Ref<T>;
	let unsubscribe: Unsubscriber | undefined;

	onMounted(() => {
		unsubscribe = tween.subscribe((value) => {
			current.value = value;
		});
	});
	onUnmounted(() => {
		unsubscribe?.();
	});
	watch(
		() => toValue(target),
		(value) => {
			void tween.set(value, options);
		}
	);

	return { current, tween };
};

export const useSpring = <T>(target: MaybeRefOrGetter<T>, options?: SpringOptions): { current: Ref<T>; spring: Spring<T> } => {
	const springValue = new Spring(toValue(target), options);
	const current = ref(springValue.current) as Ref<T>;
	let unsubscribe: Unsubscriber | undefined;

	onMounted(() => {
		unsubscribe = springValue.subscribe((value) => {
			current.value = value;
		});
	});
	onUnmounted(() => {
		unsubscribe?.();
	});
	watch(
		() => toValue(target),
		(value) => {
			void springValue.set(value);
		}
	);

	return { current, spring: springValue };
};

export const useReadable = <T>(store: Readable<T>) => {
	const current = shallowRef<T>();
	let unsubscribe: Unsubscriber | undefined;
	onMounted(() => {
		unsubscribe = store.subscribe((value) => {
			current.value = value;
		});
	});
	onUnmounted(() => {
		unsubscribe?.();
	});
	return computed(() => current.value as T);
};
