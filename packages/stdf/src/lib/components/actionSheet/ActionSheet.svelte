<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import Icon from '../icon/Icon.svelte';
	import type { ActionSheetProps, ActionProps } from '../../types/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import {
		resolveActionSheetActionClickFlow,
		resolveActionSheetCancelAction,
		resolveActionSheetDerived,
		resolveActionSheetIconProps,
		resolveActionSheetStateOptions
	} from '@any-tdf/common/derived/actionSheet';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const actionSheetLang: LangProps['actionSheet'] = currentLang.actionSheet;

	let {
		visible = $bindable(false),
		title = '',
		titleAlign = 'center',
		actions = [],
		popup = {},
		showCancel = false,
		cancelText,
		actionClosable = true,
		align = 'center',
		oncancel,
		onclickAction,
		onclose
	}: ActionSheetProps = $props();

	// 公共派生层统一 ActionSheet 的高度、标题、按钮和操作项展示结果，组件层只处理事件和 Popup 绑定。
	// Common derivation unifies ActionSheet height, title, buttons and action item view state; the component layer only handles events and Popup binding.
	const actionSheetState = $derived(resolveActionSheetDerived(resolveActionSheetStateOptions({
		defaults: actionSheetLang,
		props: { actions, align, cancelText, showCancel, title, titleAlign }
	})));

	// 优化事件处理函数
	// optimize event handling function
	const handleCancel = () => {
		// 公共动作函数只返回状态和回调决策，组件层负责写入状态和触发事件。
		// Shared action function only returns state and callback decisions; the component writes state and fires events.
		const action = resolveActionSheetCancelAction();
		visible = action.nextVisible;
		if (action.shouldCancel) oncancel?.();
		if (action.shouldClose) onclose?.();
	};

	// 处理选项点击事件
	// handle option click event
	const handleActionClick = (index: number, item: ActionProps) => {
		const action = resolveActionSheetActionClickFlow({ action: item, actionClosable, index });
		if (!action.shouldSelect) return;
		onclickAction?.(action.index, action.action);
		if (action.closeAction.shouldClose) {
			visible = action.closeAction.nextVisible;
			if (action.closeAction.shouldEmitClose) onclose?.();
		}
	};
</script>

<Popup bind:visible size={0} transitionDistance={actionSheetState.transitionDistance} {onclose} {...popup}>
	{#if actionSheetState.showTitle}
		<div
			class={actionSheetState.titleClass}
		>
			{title}
		</div>
	{/if}
	<div>
		{#each actionSheetState.actionViewStates as actionViewState, index (index)}
			{@const item = actionViewState.action}
			{@const itemIcon = resolveActionSheetIconProps(item.icon)}
			<button
				class={actionViewState.buttonClass}
				disabled={actionViewState.disabled}
				onclick={() => handleActionClick(index, item)}
			>
				{#if actionViewState.showIcon}
					<Icon
						{...itemIcon}
						state={actionViewState.iconState}
						injClass={actionViewState.iconInjClass}
					/>
				{:else if actionViewState.showImage}
					<div class={actionViewState.imageClass}>
						<img class={actionViewState.imageInnerClass} src={item.imgSrc} alt="" />
					</div>
				{/if}
				<div>
					<div
						class={actionViewState.contentClass}
					>
						{item.content}
					</div>
					{#if actionViewState.showDesc}
						<div class={actionViewState.descClass}>
							{item.desc}
						</div>
					{/if}
				</div>
			</button>
			{#if actionViewState.showDivider}
				<div class={actionViewState.dividerClass}></div>
			{/if}
		{/each}
	</div>
	{#if showCancel}
		<div class={actionSheetState.cancelGapClass}></div>
		<button
			class={actionSheetState.cancelButtonClass}
			onclick={handleCancel}
		>
			<div>
				{actionSheetState.cancelText}
			</div>
		</button>
	{/if}
</Popup>
