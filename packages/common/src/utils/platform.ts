export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

export type SafeAnimationFrameHandle = number | ReturnType<typeof setTimeout>;

export const getWindow = (): Window | undefined => {
	return typeof window === 'undefined' ? undefined : window;
};

export const getDocument = (): Document | undefined => {
	return typeof document === 'undefined' ? undefined : document;
};

export const getDocumentElement = (): HTMLElement | undefined => {
	return getDocument()?.documentElement;
};

export const getBody = (): HTMLElement | undefined => {
	return getDocument()?.body;
};

export const getPerformanceNow = (): number => {
	return typeof performance !== 'undefined' && typeof performance.now === 'function' ? performance.now() : Date.now();
};

export const safeRequestAnimationFrame = (callback: FrameRequestCallback): SafeAnimationFrameHandle => {
	if (typeof requestAnimationFrame === 'function') return requestAnimationFrame(callback);
	return setTimeout(() => callback(getPerformanceNow()), 16);
};

export const safeCancelAnimationFrame = (handle: SafeAnimationFrameHandle | undefined): void => {
	if (handle === undefined) return;
	if (typeof cancelAnimationFrame === 'function' && typeof handle === 'number') {
		cancelAnimationFrame(handle);
		return;
	}
	clearTimeout(handle);
};

export const createIntersectionObserver = (...args: ConstructorParameters<typeof IntersectionObserver>): IntersectionObserver | null => {
	if (typeof IntersectionObserver === 'undefined') return null;
	return new IntersectionObserver(...args);
};

export const createResizeObserver = (...args: ConstructorParameters<typeof ResizeObserver>): ResizeObserver | null => {
	if (typeof ResizeObserver === 'undefined') return null;
	return new ResizeObserver(...args);
};

export const setBodyOverflow = (value: string): void => {
	const body = getBody();
	if (!body) return;
	body.style.overflow = value;
};
