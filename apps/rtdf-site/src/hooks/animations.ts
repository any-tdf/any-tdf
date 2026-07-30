import { useEffect, useRef } from 'react';

export type RevealOptions = {
	/** 子元素选择器，传入时对匹配的子元素做交错揭示；不传则揭示自身 */
	selector?: string;
	/** 子元素交错间隔（毫秒） */
	stagger?: number;
	/** 延迟时间（毫秒） */
	delay?: number;
	/** 过渡持续时间（毫秒） */
	duration?: number;
	/** 初始向下偏移距离（像素） */
	distance?: number;
};

/**
 * 揭示动画 - 进入视口时从向下偏移淡入到原位，触发一次即结束
 * 过渡结束后清理内联过渡，避免覆盖 CSS 中定义的 hover 过渡。
 * 遵守 prefers-reduced-motion：减少动态效果时不做任何隐藏，直接展示。
 *
 * @example
 * const ref = useReveal<HTMLDivElement>();
 * const listRef = useReveal<HTMLDivElement>({ selector: ':scope > *', stagger: 60 });
 */
export const useReveal = <T extends HTMLElement>(options: RevealOptions = {}) => {
	const { selector, stagger = 60, delay = 0, duration = 520, distance = 12 } = options;
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		// 减少动态效果时直接展示
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const targets = selector ? Array.from(node.querySelectorAll<HTMLElement>(selector)) : [node];

		targets.forEach((target) => {
			target.style.opacity = '0';
			target.style.transform = `translateY(${distance}px)`;
			target.style.transitionProperty = 'opacity, transform';
			target.style.transitionDuration = `${duration}ms`;
			target.style.transitionTimingFunction = 'var(--site-spring, cubic-bezier(0.34, 1.56, 0.64, 1))';
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;

					targets.forEach((target, index) => {
						setTimeout(
							() => {
								target.style.opacity = '1';
								target.style.transform = 'translateY(0)';

								// 过渡结束后清理内联过渡，恢复 CSS 中的 hover 过渡
								setTimeout(() => {
									target.style.transitionProperty = '';
									target.style.transitionDuration = '';
									target.style.transitionTimingFunction = '';
								}, duration);
							},
							delay + index * stagger
						);
					});

					observer.disconnect();
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [delay, distance, duration, selector, stagger]);

	return ref;
};

export type FadeInUpOptions = {
	delay?: number;
	duration?: number;
	distance?: number;
	threshold?: number;
};

export type StaggerChildrenOptions = {
	selector?: string;
	stagger?: number;
	duration?: number;
	threshold?: number;
};

export const useFadeInUp = <T extends HTMLElement>(options: FadeInUpOptions = {}) => {
	const { delay = 0, duration = 1000, distance = 200, threshold = 0.1 } = options;
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		node.style.opacity = '0';
		node.style.transform = `translateY(${distance}px)`;
		node.style.transitionProperty = 'opacity, transform';
		node.style.transitionDuration = `${duration}ms`;
		node.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					setTimeout(() => {
						node.style.opacity = '1';
						node.style.transform = 'translateY(0)';
					}, delay);
					setTimeout(() => {
						node.style.transitionDuration = '300ms';
					}, delay + duration);
					observer.disconnect();
				});
			},
			{ threshold }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [delay, distance, duration, threshold]);

	return ref;
};

export const useStaggerChildren = <T extends HTMLElement>(options: StaggerChildrenOptions = {}) => {
	const { selector = ':scope > *', stagger = 100, duration = 800, threshold = 0.1 } = options;
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		const children = node.querySelectorAll<HTMLElement>(selector);

		children.forEach((child) => {
			child.style.opacity = '0';
			child.style.transform = 'translateY(30px)';
			child.style.transitionProperty = 'opacity, transform';
			child.style.transitionDuration = `${duration}ms`;
			child.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					children.forEach((child, index) => {
						setTimeout(() => {
							child.style.opacity = '1';
							child.style.transform = 'translateY(0)';
						}, index * stagger);
					});
					observer.disconnect();
				});
			},
			{ threshold }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [duration, selector, stagger, threshold]);

	return ref;
};
