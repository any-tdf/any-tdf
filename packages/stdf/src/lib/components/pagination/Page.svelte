<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolvePaginationPageClass } from '@any-tdf/common/derived/pagination';

	type Props = {
		active?: boolean;
		radius?: string;
		type?: 'border' | 'block' | 'bold';
		children?: Snippet;
		onclick?: () => void;
	};
	let { active = false, radius = '', type = 'border', children, onclick }: Props = $props();
	// 页码 class 由公共派生函数统一计算，组件层只绑定事件和内容。
	// Page classes are resolved by common derivation; the component layer only binds events and content.
	let pageClass = $derived(resolvePaginationPageClass({ active, type, radius }));

</script>

<button
	{onclick}
	class={pageClass}
>
	{@render children?.()}
</button>
