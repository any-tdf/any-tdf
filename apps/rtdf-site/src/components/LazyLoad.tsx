import { useEffect, useRef, useState, type ReactNode } from 'react';

type LazyLoadProps = {
	/** 触发加载的阈值 */
	threshold?: number;
	/** 根元素的边距，用于提前加载 */
	rootMargin?: string;
	/** 加载中显示的高度 */
	height?: string;
	/** 是否显示加载占位 */
	showPlaceholder?: boolean;
	/** 子组件 */
	children: ReactNode;
};

const LazyLoad = ({ threshold = 0.1, rootMargin = '100px', height = '400px', showPlaceholder = true, children }: LazyLoadProps) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const containerEl = containerRef.current;
		if (!containerEl) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// 保存当前滚动位置
						const scrollY = window.scrollY;
						setIsLoaded(true);
						// 恢复滚动位置
						requestAnimationFrame(() => {
							window.scrollTo(0, scrollY);
						});
						observer.disconnect();
					}
				});
			},
			{
				threshold,
				rootMargin
			}
		);

		observer.observe(containerEl);

		return () => observer.disconnect();
	}, [rootMargin, threshold]);

	return (
		<div ref={containerRef} style={{ overflowAnchor: 'none' }}>
			{isLoaded ? (
				children
			) : showPlaceholder ? (
				<div className="flex items-center justify-center" style={{ minHeight: height }}>
					<div className="flex flex-col items-center gap-4 text-gray-400 dark:text-gray-600">
						{/* 加载动画 */}
						<div className="relative size-10">
							<div className="absolute inset-0 animate-ping rounded-full bg-primary/30 dark:bg-dark/30"></div>
							<div className="absolute inset-2 animate-pulse rounded-full bg-primary/50 dark:bg-dark/50"></div>
						</div>
						<span className="text-sm">Loading...</span>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default LazyLoad;
