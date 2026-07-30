import {
	defineComponent,
	h,
	nextTick,
	onBeforeUnmount,
	ref,
	shallowRef,
	toValue,
	watch,
	type MaybeRefOrGetter,
	type PropType,
	type Ref,
	type ShallowRef
} from 'vue';
import { runAnimationConfig, type AnimationController, type MaybeDeferredAnimationConfig } from './internal.js';
import { transitionMap, type TransitionFunction, type TransitionName } from './transition.js';

export type TransitionLike<P = unknown> = TransitionName | TransitionFunction<P> | null;
export type TransitionMode = 'bidirectional' | 'separate';
export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

export type TransitionParamsObject = Record<string, unknown> | undefined;

export interface UseTransitionOptions<P = TransitionParamsObject> {
	transition?: TransitionLike<P>;
	params?: P;
	inTransition?: TransitionLike<P>;
	outTransition?: TransitionLike<P>;
	inParams?: P;
	outParams?: P;
	mode?: TransitionMode;
	intro?: boolean;
	onIntroStart?: () => void;
	onIntroEnd?: () => void;
	onOutroStart?: () => void;
	onOutroEnd?: () => void;
}

export interface UseTransitionResult<T extends Element = HTMLDivElement> {
	ref: ShallowRef<T | null>;
	shouldRender: Ref<boolean>;
	status: Ref<TransitionStatus>;
}

const resolveTransition = <P>(
	transition: TransitionLike<P> | undefined,
	node: Element,
	params: P | undefined,
	direction: 'in' | 'out' | 'both'
): MaybeDeferredAnimationConfig | null => {
	if (!transition) return null;
	if (typeof transition === 'string') {
		const fn = transitionMap[transition] as unknown as TransitionFunction<P>;
		if (!fn) return null;
		return fn(node as SVGElement & { getTotalLength(): number }, params as never, { direction });
	}
	return transition(node, params, { direction });
};

export const useTransition = <T extends Element = HTMLDivElement, P = unknown>(
	visible: () => boolean,
	options: MaybeRefOrGetter<UseTransitionOptions<P>> = {}
): UseTransitionResult<T> => {
	const nodeRef = shallowRef<T | null>(null) as ShallowRef<T | null>;
	const controller = shallowRef<AnimationController | null>(null);
	const hasMounted = ref(false);
	const shouldRender = ref(visible());
	const status = ref<TransitionStatus>(visible() ? 'entered' : 'exited');
	let runVersion = 0;

	const run = async () => {
		const currentRunVersion = (runVersion += 1);
		if (visible()) shouldRender.value = true;
		await nextTick();
		if (currentRunVersion !== runVersion) return;
		const node = nodeRef.value;
		if (!node || (!visible() && !shouldRender.value)) return;

		const resolvedOptions = toValue(options);
		const initialMount = !hasMounted.value;
		hasMounted.value = true;
		const selectedMode: TransitionMode =
			resolvedOptions.mode ?? (resolvedOptions.inTransition || resolvedOptions.outTransition ? 'separate' : 'bidirectional');
		const direction = visible() ? 'in' : 'out';
		const selectedTransition = visible()
			? (resolvedOptions.inTransition ?? resolvedOptions.transition)
			: (resolvedOptions.outTransition ?? resolvedOptions.transition);
		const params = visible() ? (resolvedOptions.inParams ?? resolvedOptions.params) : (resolvedOptions.outParams ?? resolvedOptions.params);
		const currentT = controller.value?.t();
		controller.value?.cancel();
		controller.value = null;

		const config = resolveTransition(selectedTransition, node, params, selectedMode === 'bidirectional' ? 'both' : direction);
		if (!config) {
			if (visible()) {
				status.value = 'entered';
			} else {
				status.value = 'exited';
				shouldRender.value = false;
			}
			return;
		}

		const targetT = visible() ? 1 : 0;
		const fromT = selectedMode === 'bidirectional' && currentT !== undefined ? currentT : visible() ? 0 : 1;
		if (initialMount && visible() && resolvedOptions.intro === false) {
			runAnimationConfig(node, config, 1, { fromT: 1, direction: selectedMode === 'bidirectional' ? 'both' : direction }).cancel();
			status.value = 'entered';
			return;
		}

		controller.value = runAnimationConfig(node, config, targetT, {
			fromT,
			direction: selectedMode === 'bidirectional' ? 'both' : direction,
			onStart: () => {
				if (visible()) {
					status.value = 'entering';
					resolvedOptions.onIntroStart?.();
				} else {
					status.value = 'exiting';
					resolvedOptions.onOutroStart?.();
				}
			},
			onEnd: () => {
				if (visible()) {
					status.value = 'entered';
					resolvedOptions.onIntroEnd?.();
				} else {
					status.value = 'exited';
					shouldRender.value = false;
					resolvedOptions.onOutroEnd?.();
				}
			}
		});
	};

	watch([visible, () => toValue(options)], () => void run(), { deep: true, immediate: true });
	onBeforeUnmount(() => {
		runVersion += 1;
		controller.value?.cancel();
		controller.value = null;
	});

	return { ref: nodeRef, shouldRender, status };
};

export const Transition = defineComponent({
	name: 'MotionTransition',
	props: {
		visible: { type: Boolean, required: true },
		as: { type: String, default: 'div' },
		transition: { type: [String, Function, Object] as PropType<TransitionLike>, default: 'fade' },
		params: { type: Object as PropType<TransitionParamsObject>, default: undefined },
		inTransition: { type: [String, Function, Object] as PropType<TransitionLike>, default: undefined },
		outTransition: { type: [String, Function, Object] as PropType<TransitionLike>, default: undefined },
		inParams: { type: Object as PropType<TransitionParamsObject>, default: undefined },
		outParams: { type: Object as PropType<TransitionParamsObject>, default: undefined },
		mode: { type: String as PropType<TransitionMode>, default: undefined },
		intro: { type: Boolean, default: undefined }
	},
	emits: ['introStart', 'introEnd', 'outroStart', 'outroEnd'],
	setup(props, { attrs, emit, slots }) {
		const transition = useTransition(
			() => props.visible,
			() => ({
				transition: props.transition,
				params: props.params,
				inTransition: props.inTransition,
				outTransition: props.outTransition,
				inParams: props.inParams,
				outParams: props.outParams,
				mode: props.mode,
				intro: props.intro,
				onIntroStart: () => emit('introStart'),
				onIntroEnd: () => emit('introEnd'),
				onOutroStart: () => emit('outroStart'),
				onOutroEnd: () => emit('outroEnd')
			})
		);
		return () => (transition.shouldRender.value ? h(props.as, { ...attrs, ref: transition.ref }, slots.default?.()) : null);
	}
});
