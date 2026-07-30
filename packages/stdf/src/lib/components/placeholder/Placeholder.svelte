<script lang="ts">
	import type { PlaceholderProps } from '../../types/index.js';
	import { resolvePlaceholderDerived, resolvePlaceholderStateOptions } from '@any-tdf/common/derived/placeholder';

	let { py = '4', height = 'full', radius = '', shadow = 'none', injClass = '', children }: PlaceholderProps = $props();

	// 公共派生层只处理 Placeholder 的 class 字符串，slot 渲染留在组件内。
	// Shared derived layer only handles Placeholder class strings; slot rendering stays in the component.
	const placeholderState = $derived(resolvePlaceholderDerived(resolvePlaceholderStateOptions({ props: { py, height, radius, shadow, injClass } })));
</script>

<div class={placeholderState.rootClass}>
	{@render children?.()}
</div>
