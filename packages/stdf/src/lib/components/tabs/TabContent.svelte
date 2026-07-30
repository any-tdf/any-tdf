<script lang="ts">
	import type { TabContentProps } from '../../types/index.js';
	import { resolveTabContentClass } from '@any-tdf/common/derived/tabContent';

	let { show = true, children }: TabContentProps = $props();

	// 公共派生层只处理 TabContent 可见性 class，内容渲染留在组件内。
	// Shared derived layer only handles TabContent visibility classes; content rendering stays in the component.
	let contentClass = $derived(resolveTabContentClass(show));
</script>

<div class={contentClass}>
	{@render children?.()}
</div>
