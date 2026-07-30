<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import Button from '../button/Button.svelte';
	import Icon from '../icon/Icon.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { ModalProps } from '../../types/index.js';
	import { resolveModalCloseAction, resolveModalDerived, resolveModalStateOptions } from '@any-tdf/common/derived/modal';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const modalLang: LangProps['modal'] = currentLang.modal;

	let {
		visible = $bindable(false),
		title = undefined,
		titleAlign = 'center',
		content = undefined,
		popup = {},
		showIcon = false,
		icon = {},
		showBtn = true,
		btnText = undefined,
		button = {},
		contentChild,
		onclose
	}: ModalProps = $props();

	// 关闭并派发事件
	// Close and dispatch events
	const closeModalFunc = () => {
		// 公共动作函数只返回关闭决策，组件层负责状态写入和事件触发。
		// Shared action function only returns close decisions; the component writes state and fires events.
		const action = resolveModalCloseAction();
		visible = action.nextVisible;
		if (action.shouldClose) onclose?.();
	};

	// 公共派生层处理 Modal 状态推导，关闭事件和 slot 留在组件内。
	// The shared derived layer handles Modal state derivation; close events and slots stay in the component.
	const modalState = $derived(
		resolveModalDerived(
			resolveModalStateOptions({
				props: { title, titleAlign, content, btnText, showBtn, popup, showIcon },
				defaults: modalLang,
				hasCustomContent: Boolean(contentChild)
			})
		)
	);
</script>

<Popup
	bind:visible
	{...modalState.popupProps}
>
	<div class={modalState.contentClass}>
		<div class={modalState.titleClass}>{modalState.texts.title}</div>
		{#if modalState.contentState.showIcon}
			<div><Icon {...icon} /></div>
		{/if}
		<div>
			{#if modalState.contentState.showCustomContent}
				{@render contentChild?.()}
			{:else if modalState.contentState.showContentText}
				{modalState.texts.content}
			{/if}
		</div>
		{#if modalState.contentState.showButton}
			<div><Button size="full" {...button} onclick={closeModalFunc}>{modalState.texts.btnText}</Button></div>
		{/if}
	</div>
</Popup>
