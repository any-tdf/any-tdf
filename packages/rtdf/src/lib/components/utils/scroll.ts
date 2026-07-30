import type { RefObject } from 'react';

export type ScrollTarget = HTMLElement | RefObject<HTMLElement | null> | string | null | undefined;

const isRefObject = (target: ScrollTarget): target is RefObject<HTMLElement | null> =>
	typeof target === 'object' && target !== null && 'current' in target;

const isWindowScrollElement = (element: HTMLElement | Window): element is Window => typeof window !== 'undefined' && element === window;

export const getScrollElement = (target: ScrollTarget, fallback?: HTMLElement | null): HTMLElement | Window => {
	if (typeof window === 'undefined') return fallback || ({} as HTMLElement);
	if (typeof target === 'string') {
		return (document.querySelector(target) as HTMLElement | null) || window;
	}
	if (isRefObject(target)) {
		return target.current || window;
	}
	if (target) return target;
	if (fallback) {
		let parent = fallback.parentElement;
		while (parent) {
			const style = window.getComputedStyle(parent);
			if (/(auto|scroll|overlay)/.test(style.overflowY)) return parent;
			parent = parent.parentElement;
		}
	}
	return window;
};

export const getScrollMetrics = (element: HTMLElement | Window) => {
	if (isWindowScrollElement(element)) {
		const scrollingElement = document.scrollingElement || document.documentElement;
		return {
			clientHeight: window.innerHeight,
			scrollHeight: scrollingElement.scrollHeight,
			scrollTop: window.scrollY || scrollingElement.scrollTop
		};
	}
	const scrollElement = element as HTMLElement;
	return {
		clientHeight: scrollElement.clientHeight,
		scrollHeight: scrollElement.scrollHeight,
		scrollTop: scrollElement.scrollTop
	};
};

export const addScrollListener = (element: HTMLElement | Window, listener: () => void) => {
	element.addEventListener('scroll', listener, { passive: true });
	window.addEventListener('resize', listener);
	return () => {
		element.removeEventListener('scroll', listener);
		window.removeEventListener('resize', listener);
	};
};
