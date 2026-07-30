import {
	defineComponent,
	h,
	isRef,
	nextTick,
	onBeforeUnmount,
	onMounted,
	shallowRef,
	toRef,
	unref,
	watch,
	type PropType,
	type Ref
} from 'vue';
import { cubicOut, type EasingFunction } from './easing.js';
import { runAnimationConfig, type AnimationConfig } from './internal.js';

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
	animate?: AnimateFunction<P> | Ref<AnimateFunction<P> | undefined>;
	params?: P | Ref<P | undefined>;
	disabled?: boolean | Ref<boolean | undefined>;
}

export const useFlipList = <K extends string | number | symbol, P = FlipParams>(
	keys: Ref<readonly K[]> | readonly K[],
	options: UseFlipListOptions<P> = {}
) => {
	const nodeMap = new Map<K, HTMLElement>();
	const rectMap = new Map<K, DOMRect>();
	const animationMap = new Map<K, ReturnType<typeof runAnimationConfig>>();
	const getKeys = (): readonly K[] => (isRef(keys) ? keys.value : keys);

	const setRef = (key: K) => (node: HTMLElement | null) => {
		if (node) {
			nodeMap.set(key, node);
		} else {
			nodeMap.delete(key);
		}
	};

	const measure = () => {
		const nextRects = new Map<K, DOMRect>();
		for (const key of getKeys()) {
			const node = nodeMap.get(key);
			if (!node) continue;
			const nextRect = node.getBoundingClientRect();
			const previousRect = rectMap.get(key);
			nextRects.set(key, nextRect);
			if (unref(options.disabled) || !previousRect) continue;
			if (
				previousRect.left === nextRect.left &&
				previousRect.top === nextRect.top &&
				previousRect.right === nextRect.right &&
				previousRect.bottom === nextRect.bottom
			)
				continue;
			animationMap.get(key)?.cancel();
			const animateFn = unref(options.animate) ?? (flip as AnimateFunction<P>);
			const config = animateFn(node, { from: previousRect, to: nextRect }, unref(options.params));
			animationMap.set(key, runAnimationConfig(node, config, 1, { fromT: 0, direction: 'both' }));
		}
		rectMap.clear();
		nextRects.forEach((rect, key) => rectMap.set(key, rect));
	};

	onMounted(() => {
		void nextTick(measure);
	});
	watch(
		() => [...getKeys()],
		() => {
			void nextTick(measure);
		},
		{ deep: true }
	);
	onBeforeUnmount(() => {
		for (const controller of animationMap.values()) controller.cancel();
		animationMap.clear();
	});

	return { setRef, measure };
};

export const FlipGroup = defineComponent({
	name: 'FlipGroup',
	props: {
		items: { type: Array as PropType<unknown[]>, default: () => [] },
		getKey: { type: Function as PropType<(item: unknown, index: number) => string | number>, required: true },
		as: { type: String, default: 'div' },
		itemAs: { type: String, default: 'div' },
		class: { type: String, default: '' },
		itemClass: { type: [String, Function] as PropType<string | ((item: unknown, index: number) => string)>, default: '' },
		params: { type: Object as PropType<FlipParams>, default: undefined },
		animate: { type: Function as PropType<AnimateFunction<FlipParams>>, default: undefined },
		disabled: { type: Boolean, default: false }
	},
	setup(props, { slots }) {
		const keys = shallowRef<PropertyKey[]>([]);
		const { setRef } = useFlipList(keys, {
			animate: toRef(props, 'animate'),
			params: toRef(props, 'params'),
			disabled: toRef(props, 'disabled')
		});
		watch(
			() => props.items,
			(items) => {
				keys.value = items.map((item, index) => props.getKey(item, index));
			},
			{ immediate: true }
		);
		return () =>
			h(
				props.as,
				{ class: props.class },
				props.items.map((item, index) => {
					const key = props.getKey(item, index);
					const itemClass = typeof props.itemClass === 'function' ? props.itemClass(item, index) : props.itemClass;
					return h(props.itemAs, { key, ref: setRef(key) as never, class: itemClass }, slots.default?.({ item, index }));
				})
			);
	}
});
