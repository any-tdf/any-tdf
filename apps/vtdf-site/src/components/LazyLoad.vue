<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(
	defineProps<{
		/** 触发加载的阈值 */
		threshold?: number;
		/** 根元素的边距，用于提前加载 */
		rootMargin?: string;
		/** 加载中显示的高度 */
		height?: string;
		/** 是否显示加载占位 */
		showPlaceholder?: boolean;
	}>(),
	{
		threshold: 0.1,
		rootMargin: '100px',
		height: '400px',
		showPlaceholder: true
	}
);

const isLoaded = ref(false);
const containerEl = ref<HTMLDivElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
	if (!containerEl.value) return;

	observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// 保存当前滚动位置
					const scrollY = window.scrollY;
					isLoaded.value = true;
					// 恢复滚动位置
					requestAnimationFrame(() => {
						window.scrollTo(0, scrollY);
					});
					observer?.disconnect();
				}
			});
		},
		{
			threshold: props.threshold,
			rootMargin: props.rootMargin
		}
	);

	observer.observe(containerEl.value);
});

onBeforeUnmount(() => {
	observer?.disconnect();
});
</script>

<template>
	<div ref="containerEl" style="overflow-anchor: none">
		<slot v-if="isLoaded" />
		<div v-else-if="showPlaceholder" class="flex items-center justify-center" :style="{ minHeight: height }">
			<div class="flex flex-col items-center gap-4 text-gray-400 dark:text-gray-600">
				<!-- 加载动画 -->
				<div class="relative size-10">
					<div class="absolute inset-0 animate-ping rounded-full bg-primary/30 dark:bg-dark/30"></div>
					<div class="absolute inset-2 animate-pulse rounded-full bg-primary/50 dark:bg-dark/50"></div>
				</div>
				<span class="text-sm">Loading...</span>
			</div>
		</div>
	</div>
</template>
