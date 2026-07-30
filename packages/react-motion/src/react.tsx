import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { runAnimationConfig, type AnimationController, type MaybeDeferredAnimationConfig } from './internal';
import { transitionMap, type TransitionName, type TransitionFunction } from './transition';

export type TransitionLike<P = unknown> = TransitionName | TransitionFunction<P> | null;
export type TransitionMode = 'bidirectional' | 'separate';
export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

export interface UseTransitionOptions<P = unknown> {
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

const resolveTransition = <P,>(
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

export const useTransition = <T extends Element = HTMLDivElement, P = unknown>(visible: boolean, options: UseTransitionOptions<P> = {}) => {
	const nodeRef = useRef<T | null>(null);
	const controllerRef = useRef<AnimationController | null>(null);
	const hasMountedRef = useRef(false);
	const [shouldRender, setShouldRender] = useState(visible);
	const [status, setStatus] = useState<TransitionStatus>(visible ? 'entered' : 'exited');

	useEffect(() => {
		if (visible) setShouldRender(true);
	}, [visible]);

	useLayoutEffect(() => {
		const node = nodeRef.current;
		if (!node || (!visible && !shouldRender)) return;

		const initialMount = !hasMountedRef.current;
		hasMountedRef.current = true;
		const selectedMode: TransitionMode = options.mode ?? (options.inTransition || options.outTransition ? 'separate' : 'bidirectional');
		const direction = visible ? 'in' : 'out';
		const transition = visible ? (options.inTransition ?? options.transition) : (options.outTransition ?? options.transition);
		const params = visible ? (options.inParams ?? options.params) : (options.outParams ?? options.params);
		const currentController = controllerRef.current;
		const currentT = currentController?.t();
		currentController?.cancel();
		controllerRef.current = null;

		const config = resolveTransition(transition, node, params, selectedMode === 'bidirectional' ? 'both' : direction);

		if (!config) {
			controllerRef.current = null;
			if (visible) {
				setStatus('entered');
			} else {
				setStatus('exited');
				setShouldRender(false);
			}
			return;
		}

		const targetT = visible ? 1 : 0;
		const fromT = selectedMode === 'bidirectional' && currentT !== undefined ? currentT : visible ? 0 : 1;

		if (initialMount && visible && options.intro === false) {
			runAnimationConfig(node, config, 1, { fromT: 1, direction: selectedMode === 'bidirectional' ? 'both' : direction }).cancel();
			setStatus('entered');
			return;
		}

		const controller = runAnimationConfig(node, config, targetT, {
			fromT,
			direction: selectedMode === 'bidirectional' ? 'both' : direction,
			onStart: () => {
				if (visible) {
					setStatus('entering');
					options.onIntroStart?.();
				} else {
					setStatus('exiting');
					options.onOutroStart?.();
				}
			},
			onEnd: () => {
				if (visible) {
					setStatus('entered');
					options.onIntroEnd?.();
				} else {
					setStatus('exited');
					setShouldRender(false);
					options.onOutroEnd?.();
				}
			}
		});
		controllerRef.current = controller;

		return () => {
			controller.deactivate();
		};
	}, [
		visible,
		shouldRender,
		options.transition,
		options.params,
		options.inTransition,
		options.outTransition,
		options.inParams,
		options.outParams,
		options.mode,
		options.intro,
		options.onIntroStart,
		options.onIntroEnd,
		options.onOutroStart,
		options.onOutroEnd
	]);

	useEffect(() => {
		return () => {
			controllerRef.current?.cancel();
			controllerRef.current = null;
		};
	}, []);

	return { ref: nodeRef, shouldRender, status };
};

export interface TransitionProps<P = unknown> extends UseTransitionOptions<P> {
	visible: boolean;
	as?: keyof React.JSX.IntrinsicElements;
	children?: React.ReactNode;
	className?: string;
	style?: unknown;
	[key: string]: unknown;
}

export const Transition = <P,>({
	visible,
	as = 'div',
	children,
	transition = 'fade',
	params,
	inTransition,
	outTransition,
	inParams,
	outParams,
	mode,
	intro,
	onIntroStart,
	onIntroEnd,
	onOutroStart,
	onOutroEnd,
	...rest
}: TransitionProps<P>) => {
	const { ref, shouldRender } = useTransition<Element, P>(visible, {
		transition,
		params,
		inTransition,
		outTransition,
		inParams,
		outParams,
		mode,
		intro,
		onIntroStart,
		onIntroEnd,
		onOutroStart,
		onOutroEnd
	});

	if (!shouldRender) return null;

	return React.createElement(
		as,
		{
			...(rest as Record<string, unknown>),
			ref
		},
		children
	);
};
