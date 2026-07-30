<script lang="ts">
	import type { TagProps } from '../../types/index.js';
	import { resolveTagClickAction, resolveTagCloseAction, resolveTagDerived, resolveTagKeyboardAction, resolveTagStateOptions } from '@any-tdf/common/derived/tag';
	import { tagCloseSvg } from '@any-tdf/common/svg/tag';
	import SvgIcon from '../utils/SvgIcon.svelte';

	let {
		text = '',
		state = 'theme',
		fill = 'base',
		size = 'md',
		radius = 'sm',
		mark = false,
		closable = false,
		disabled = false,
		injClass = '',
		children,
		onclick,
		onclose
	}: TagProps = $props();

	const tagState = $derived(
		resolveTagDerived(
			resolveTagStateOptions({
				props: { text, state, fill, size, radius, mark, closable, disabled, injClass },
				hasCustomContent: Boolean(children)
			})
		)
	);

	// 处理点击事件
	// Handle click event
	const handleClick = () => {
		const action = resolveTagClickAction({ disabled });
		if (action.shouldEmit) onclick?.();
	};

	// 处理关闭事件
	// Handle close event
	const handleClose = (e: MouseEvent) => {
		e.stopPropagation();
		const action = resolveTagCloseAction({ disabled });
		if (action.shouldEmit) onclose?.();
	};

	const handleKeydown = (e: KeyboardEvent) => {
		// 公共 action 只判断按键是否触发 Tag 事件，DOM 事件仍留在组件层。
		// Shared action only decides whether the key triggers a Tag event; DOM events stay in the component layer.
		const action = resolveTagKeyboardAction({ key: e.key, disabled });
		if (action.shouldEmit) onclick?.();
	};
</script>

<span
	class={tagState.classes.rootClass}
	onclick={handleClick}
	onkeydown={handleKeydown}
	role="button"
	tabindex={tagState.focusableTabIndex}
>
	{#if tagState.contentState.showCustomContent}
		{@render children?.()}
	{:else if tagState.contentState.showText}
		{text}
	{/if}
	{#if tagState.contentState.showClose}
		<button
			type="button"
			class={tagState.classes.closeButtonClass}
			onclick={handleClose}
			disabled={disabled}
			aria-label="close"
		>
			<SvgIcon
				svg={tagCloseSvg}
				class={tagState.classes.closeIconClass}
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
			/>
		</button>
	{/if}
</span>
