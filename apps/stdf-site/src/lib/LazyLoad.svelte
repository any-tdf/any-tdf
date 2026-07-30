<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** 触发加载的阈值 */
		threshold?: number;
		/** 根元素的边距，用于提前加载 */
		rootMargin?: string;
		/** 加载中显示的高度 */
		height?: string;
		/** 是否显示加载占位 */
		showPlaceholder?: boolean;
		/** 子组件 */
		children: Snippet;
	}

	let { threshold = 0.1, rootMargin = '100px', height = '400px', showPlaceholder = true, children }: Props = $props();

	let isLoaded = $state(false);
	let containerEl = $state<HTMLDivElement>();

	$effect(() => {
		if (!containerEl) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// 保存当前滚动位置
						const scrollY = window.scrollY;
						isLoaded = true;
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
	});
</script>

<div bind:this={containerEl} style="overflow-anchor: none;">
	{#if isLoaded}
		{@render children()}
	{:else if showPlaceholder}
		<div class="flex items-center justify-center" style="min-height: {height}">
			<div class="flex flex-col items-center gap-4 text-gray-400 dark:text-gray-600">
				<!-- 加载动画 -->
				<div class="relative size-10">
					<div class="absolute inset-0 animate-ping rounded-full bg-primary/30 dark:bg-dark/30"></div>
					<div class="absolute inset-2 animate-pulse rounded-full bg-primary/50 dark:bg-dark/50"></div>
				</div>
				<span class="text-sm">Loading...</span>
			</div>
		</div>
	{/if}
</div>
