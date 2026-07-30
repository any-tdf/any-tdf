<script lang="ts">
	import type { GridsProps } from '../../types/index.js';
	import { resolveGridsDerived, resolveGridsStateOptions } from '@any-tdf/common/derived/grids';

	let { cols = '6', gap = '2', mx = '2', my = '2', children }: GridsProps = $props();

	const gridsState = $derived(resolveGridsDerived(resolveGridsStateOptions({ props: { cols, mx, my, gap } })));
</script>

<!-- 公共 Grids 派生函数返回容器布局 class，组件层只负责渲染内容。 / Shared Grids derivation returns container layout classes; the component layer only renders content. -->
<div class={gridsState.containerClass}>
	{@render children?.()}
</div>
