<script lang="ts">
	import type { CellGroupProps } from '../../types/index.js';
	import { resolveCellGroupClass } from '@any-tdf/common/derived/cell';

	let { radius = '', shadow = 'xs', bg = 'surface', my = '4', mx = '2', children }: CellGroupProps = $props();

	// 公共派生层只处理 CellGroup 的 class 字符串，slot 渲染留在组件内。
	// Shared derived layer only handles CellGroup class strings; slot rendering stays in the component.
	const groupClass = $derived(resolveCellGroupClass({ bg, radius, shadow, my, mx }));
</script>

<div class={groupClass}>
	{@render children?.()}
</div>
