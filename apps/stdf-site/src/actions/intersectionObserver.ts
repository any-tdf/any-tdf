import type { Action } from 'svelte/action';

export interface IntersectOptions {
	/** 触发回调的阈值，0-1 之间 */
	threshold?: number;
	/** 根元素的边距 */
	rootMargin?: string;
	/** 是否只触发一次 */
	once?: boolean;
	/** 进入视口时添加的 class */
	enterClass?: string;
	/** 离开视口时添加的 class */
	leaveClass?: string;
	/** 初始状态的 class（元素挂载时添加，进入视口时移除） */
	initialClass?: string;
	/** 过渡持续时间（毫秒） */
	transitionDuration?: number;
	/** 延迟时间（毫秒） */
	delay?: number;
}

export interface IntersectAttributes {
	'on:intersect'?: (e: CustomEvent<{ isIntersecting: boolean; entry: IntersectionObserverEntry }>) => void;
}

/**
 * IntersectionObserver Svelte Action
 * 用于检测元素是否进入/离开视口，并触发相应的动画效果
 *
 * @example
 * <div use:intersect={{ threshold: 0.3, once: true, enterClass: 'animate-fadeIn' }}>
 *   内容
 * </div>
 *
 * @example
 * <div use:intersect on:intersect={(e) => console.log(e.detail.isIntersecting)}>
 *   内容
 * </div>
 */
export const intersect: Action<HTMLElement, IntersectOptions | undefined, IntersectAttributes> = (node, options = {}) => {
	const {
		threshold = 0.1,
		rootMargin = '0px',
		once = true,
		enterClass = '',
		leaveClass = '',
		initialClass = '',
		transitionDuration = 1000,
		delay = 0
	} = options;

	let hasIntersected = false;

	// 设置初始样式
	if (initialClass) {
		node.classList.add(...initialClass.split(' ').filter(Boolean));
	}

	// 设置过渡时间
	if (transitionDuration) {
		node.style.transitionDuration = `${transitionDuration}ms`;
	}

	const handleIntersect = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			const { isIntersecting } = entry;

			// 如果设置了 once 且已经触发过，则不再处理
			if (once && hasIntersected && !isIntersecting) {
				return;
			}

			if (isIntersecting) {
				hasIntersected = true;

				// 延迟执行
				setTimeout(() => {
					// 移除初始 class，添加进入 class
					if (initialClass) {
						node.classList.remove(...initialClass.split(' ').filter(Boolean));
					}
					if (enterClass) {
						node.classList.add(...enterClass.split(' ').filter(Boolean));
					}
					if (leaveClass) {
						node.classList.remove(...leaveClass.split(' ').filter(Boolean));
					}

					// 触发自定义事件
					node.dispatchEvent(
						new CustomEvent('intersect', {
							detail: { isIntersecting, entry }
						})
					);

					// 如果只触发一次，则断开观察
					if (once) {
						observer.disconnect();
					}
				}, delay);
			} else if (!once) {
				// 离开视口
				if (enterClass) {
					node.classList.remove(...enterClass.split(' ').filter(Boolean));
				}
				if (leaveClass) {
					node.classList.add(...leaveClass.split(' ').filter(Boolean));
				}

				node.dispatchEvent(
					new CustomEvent('intersect', {
						detail: { isIntersecting, entry }
					})
				);
			}
		});
	};

	const observer = new IntersectionObserver(handleIntersect, {
		threshold,
		rootMargin
	});

	observer.observe(node);

	return {
		update(newOptions) {
			// 重新创建观察器（如果选项改变）
			observer.disconnect();

			const newOpts = { ...options, ...newOptions };
			const newObserver = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						node.dispatchEvent(
							new CustomEvent('intersect', {
								detail: { isIntersecting: entry.isIntersecting, entry }
							})
						);
					});
				},
				{
					threshold: newOpts.threshold,
					rootMargin: newOpts.rootMargin
				}
			);

			newObserver.observe(node);
		},
		destroy() {
			observer.disconnect();
		}
	};
};

/**
 * 简化版：淡入上移动画
 * 元素初始状态为透明且向下偏移，进入视口时淡入并上移到原位
 */
export const fadeInUp: Action<HTMLElement, { delay?: number; duration?: number; distance?: number } | undefined> = (node, options = {}) => {
	const { delay = 0, duration = 1000, distance = 200 } = options;

	// 设置初始样式
	node.style.opacity = '0';
	node.style.transform = `translateY(${distance}px)`;
	node.style.transitionProperty = 'opacity, transform';
	node.style.transitionDuration = `${duration}ms`;
	node.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						node.style.opacity = '1';
						node.style.transform = 'translateY(0)';
					}, delay);

					// 动画完成后减少过渡时间
					setTimeout(() => {
						node.style.transitionDuration = '300ms';
					}, delay + duration);

					observer.disconnect();
				}
			});
		},
		{ threshold: 0.1 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};

/**
 * 简化版：缩放淡入动画
 */
export const scaleIn: Action<HTMLElement, { delay?: number; duration?: number; scale?: number } | undefined> = (node, options = {}) => {
	const { delay = 0, duration = 800, scale = 0.8 } = options;

	node.style.opacity = '0';
	node.style.transform = `scale(${scale})`;
	node.style.transitionProperty = 'opacity, transform';
	node.style.transitionDuration = `${duration}ms`;
	node.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						node.style.opacity = '1';
						node.style.transform = 'scale(1)';
					}, delay);

					observer.disconnect();
				}
			});
		},
		{ threshold: 0.1 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};

/**
 * 交错动画 - 为容器内的子元素添加交错延迟
 */
export const staggerChildren: Action<HTMLElement, { selector?: string; stagger?: number; duration?: number } | undefined> = (
	node,
	options = {}
) => {
	const { selector = ':scope > *', stagger = 100, duration = 800 } = options;

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
				if (entry.isIntersecting) {
					children.forEach((child, index) => {
						setTimeout(() => {
							child.style.opacity = '1';
							child.style.transform = 'translateY(0)';
						}, index * stagger);
					});

					observer.disconnect();
				}
			});
		},
		{ threshold: 0.1 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};

export interface RevealOptions {
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
}

/**
 * 揭示动画 - 进入视口时从向下偏移淡入到原位，触发一次即结束
 * 过渡结束后清理内联过渡，避免覆盖 CSS 中定义的 hover 过渡。
 * 遵守 prefers-reduced-motion：减少动态效果时不做任何隐藏，直接展示。
 *
 * @example
 * <div use:reveal>标题区</div>
 * <div use:reveal={{ selector: ':scope > *', stagger: 60 }}>卡片列表</div>
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options = {}) => {
	const { selector, stagger = 60, delay = 0, duration = 520, distance = 12 } = options ?? {};

	// 减少动态效果时直接展示
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return {};
	}

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

	return {
		destroy() {
			observer.disconnect();
		}
	};
};

export default intersect;
