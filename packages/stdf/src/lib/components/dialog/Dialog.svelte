<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import Button from '../button/Button.svelte';
	import Icon from '../icon/Icon.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { DialogProps } from '../../types/index.js';
	import {
		resolveDialogDerived,
		resolveDialogPrimaryAction,
		resolveDialogSecondaryFlow,
		resolveDialogStateOptions,
	} from '@any-tdf/common/derived/dialog';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const dialogLang: LangProps['dialog'] = currentLang.dialog;

	let {
		visible = $bindable(false),
		title = undefined,
		titleAlign = 'center',
		content = undefined,
		popup = {},
		showIcon = false,
		icon = {},
		btnStyle = 'button',
		primaryText = undefined,
		primaryButton = {},
		secondaryText = undefined,
		secondaryButton = {},
		btnRatio = [1, 1],
		btnReverse = false,
		secondaryClose = true,
		btnGap = '2',
		onsecondary,
		onprimary,
		onclose,
		contentChild,
		primaryChild
	}: DialogProps = $props();

	// 公共派生层处理 Dialog 状态推导，事件与 slot 留在组件内。
	// The shared derived layer handles Dialog state derivation; events and slots stay in the component.
	const dialogState = $derived(resolveDialogDerived(resolveDialogStateOptions({
		defaults: dialogLang,
		hasCustomContent: Boolean(contentChild),
		hasPrimaryCustomContent: Boolean(primaryChild),
		props: { btnGap, btnRatio, btnReverse, btnStyle, content, popup, primaryText, secondaryText, showIcon, title, titleAlign }
	})));

	const handleSecondary = () => {
		// 公共动作函数只返回关闭和回调决策，组件层负责状态写入和事件触发。
		// Shared action function only returns close and callback decisions; the component writes state and fires events.
		const action = resolveDialogSecondaryFlow({ secondaryClose });
		if (action.closeAction) {
			visible = action.closeAction.nextVisible;
			onclose?.();
		}
		if (action.shouldSecondary) onsecondary?.();
	};

	const handlePrimary = () => {
		const action = resolveDialogPrimaryAction();
		if (action.shouldPrimary) onprimary?.();
	};
</script>

<Popup
	bind:visible
	{...dialogState.popupProps}
>
	<div class={dialogState.panelClass}>
		<div class={dialogState.titleClass}>{dialogState.texts.title}</div>
		{#if dialogState.contentState.showIcon}
			<div><Icon {...icon} /></div>
		{/if}
		<div>
			{#if dialogState.contentState.showCustomContent}
				{@render contentChild?.()}
			{:else if dialogState.contentState.showContentText}
				{dialogState.texts.content}
			{/if}
		</div>
		<div class={dialogState.buttonRowClass}>
			<div class={dialogState.secondarySideClass} style={dialogState.secondarySideStyleString}>
				<Button
					size="full"
					fill={dialogState.secondaryButtonState.fill}
					heightIn={dialogState.secondaryButtonState.heightIn}
					injClass={dialogState.secondaryButtonState.injClass}
					{...secondaryButton}
					onclick={handleSecondary}
				>
					{dialogState.texts.secondaryText}
				</Button>
			</div>
			<div class={dialogState.primarySideClass} style={dialogState.primarySideStyleString}>
				<Button
					size="full"
					fill={dialogState.primaryButtonState.fill}
					heightIn={dialogState.primaryButtonState.heightIn}
					injClass={dialogState.primaryButtonState.injClass}
					{...primaryButton}
					onclick={handlePrimary}
				>
					{#if dialogState.contentState.showPrimaryCustomContent}
						{@render primaryChild?.()}
					{:else}
						{dialogState.texts.primaryText}
					{/if}
				</Button>
			</div>
		</div>
	</div>
</Popup>
