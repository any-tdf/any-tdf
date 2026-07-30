<script lang="ts">
	import type { GridProps } from '../../types/index.js';
	import { resolveGridDerived, resolveGridStateOptions } from '@any-tdf/common/derived/grids';

	let { col = '1', row = '1', children }: GridProps = $props();

	const gridState = $derived(resolveGridDerived(resolveGridStateOptions({ props: { row, col } })));
</script>

<!-- 公共 Grid 派生函数返回布局 class，组件层只负责渲染内容。 / Shared Grid derivation returns layout classes; the component layer only renders content. -->
<div class={gridState.itemClass}>
	{@render children?.()}
</div>
