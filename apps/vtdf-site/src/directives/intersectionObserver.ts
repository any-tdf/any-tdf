import type { Directive } from 'vue';

type FadeInUpOptions = {
	delay?: number;
	duration?: number;
	distance?: number;
};

type StaggerChildrenOptions = {
	selector?: string;
	stagger?: number;
	duration?: number;
};

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

const observerMap = new WeakMap<HTMLElement, IntersectionObserver>();

/**
 * 揭示动画 - 进入视口时从向下偏移淡入到原位，触发一次即结束
 * 过渡结束后清理内联过渡，避免覆盖 CSS 中定义的 hover 过渡。
 * 遵守 prefers-reduced-motion：减少动态效果时不做任何隐藏，直接展示。
 *
 * @example
 * <div v-reveal>标题区</div>
 * <div v-reveal="{ selector: ':scope > *', stagger: 60 }">卡片列表</div>
 */
export const reveal: Directive<HTMLElement, RevealOptions | undefined> = {
	mounted: (node, binding) => {
		const { selector, stagger = 60, delay = 0, duration = 520, distance = 12 } = binding.value || {};

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
						window.setTimeout(
							() => {
								target.style.opacity = '1';
								target.style.transform = 'translateY(0)';

								// 过渡结束后清理内联过渡，恢复 CSS 中的 hover 过渡
								window.setTimeout(() => {
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
		observerMap.set(node, observer);
	},
	unmounted: (node) => {
		observerMap.get(node)?.disconnect();
		observerMap.delete(node);
	}
};

/**
 * 简化版：淡入上移动画
 * 元素初始状态为透明且向下偏移，进入视口时淡入并上移到原位
 */
export const fadeInUp: Directive<HTMLElement, FadeInUpOptions | undefined> = {
	mounted: (node, binding) => {
		const { delay = 0, duration = 1000, distance = 200 } = binding.value || {};

		node.style.opacity = '0';
		node.style.transform = `translateY(${distance}px)`;
		node.style.transitionProperty = 'opacity, transform';
		node.style.transitionDuration = `${duration}ms`;
		node.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					window.setTimeout(() => {
						node.style.opacity = '1';
						node.style.transform = 'translateY(0)';
					}, delay);
					window.setTimeout(() => {
						node.style.transitionDuration = '300ms';
					}, delay + duration);
					observer.disconnect();
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(node);
		observerMap.set(node, observer);
	},
	unmounted: (node) => {
		observerMap.get(node)?.disconnect();
		observerMap.delete(node);
	}
};

/**
 * 交错动画 - 为容器内的子元素添加交错延迟
 */
export const staggerChildren: Directive<HTMLElement, StaggerChildrenOptions | undefined> = {
	mounted: (node, binding) => {
		const { selector = ':scope > *', stagger = 100, duration = 800 } = binding.value || {};
		const children = Array.from(node.querySelectorAll<HTMLElement>(selector));

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
						window.setTimeout(() => {
							child.style.opacity = '1';
							child.style.transform = 'translateY(0)';
						}, index * stagger);
					});
					observer.disconnect();
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(node);
		observerMap.set(node, observer);
	},
	unmounted: (node) => {
		observerMap.get(node)?.disconnect();
		observerMap.delete(node);
	}
};
