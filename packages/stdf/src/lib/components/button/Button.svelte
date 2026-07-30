<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import Loading from '../loading/Loading.svelte';
	import type { ButtonProps } from '../../types/index.js';
	import { resolveButtonDerived, resolveButtonStateOptions } from '@any-tdf/common/derived/button';

	let {
		fill = 'base',
		state,
		radius = '',
		size = 'big',
		border = 'solid',
		injClass = '',
		love = false,
		heightOut = '2',
		heightIn = '3',
		disabled = false,
		customSize = false,
		customWidth = 0,
		customHeight = 0,
		icon = null,
		iconPosition = 'left',
		loading = null,
		disabledLoading = true,
		type = 'button',
		children,
		onclick
	}: ButtonProps = $props();

	// 公共派生层处理 Button class、尺寸和内容分支，事件与 slot 留在组件层。
	// Shared derived layer handles Button classes, size and content branches; events and slots stay in the component layer.
	const buttonState = $derived(
		resolveButtonDerived(
			resolveButtonStateOptions({
				props: { fill, state, radius, size, border, heightOut, heightIn, injClass, love, disabled, loading, disabledLoading, customSize, customWidth, customHeight, icon, iconPosition }
			})
		)
	);
</script>

<div class={buttonState.outerClass}>
	<button
		{onclick}
		class={buttonState.buttonClass}
		disabled={buttonState.innerDisabled}
		style={buttonState.buttonStyleString}
		{type}
	>
		{#if buttonState.contentState.showLoading && buttonState.contentState.loadingProps}
			<Loading {...buttonState.contentState.loadingProps} />
		{/if}
		{#if buttonState.contentState.showLeftIcon && buttonState.contentState.iconProps}
			<Icon {...buttonState.contentState.iconProps} />
		{/if}
		{@render children?.()}
		{#if buttonState.contentState.showRightIcon && buttonState.contentState.iconProps}
			<Icon {...buttonState.contentState.iconProps} />
		{/if}
	</button>
</div>
