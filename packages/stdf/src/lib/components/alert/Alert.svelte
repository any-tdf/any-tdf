<script lang="ts">
	import { fly, slide, fade, scale, blur } from 'svelte/transition';
	import * as eases from 'svelte/easing';
	import Card from '../card/Card.svelte';
	import Icon from '../icon/Icon.svelte';
	import SvgIcon from '../utils/SvgIcon.svelte';
	import type { AlertProps } from '../../types/index.js';
	import { resolveAlertCloseFlow, resolveAlertDerived, resolveAlertInitialClosingBySelf, resolveAlertOutroEndAction, resolveAlertShouldAutoClose, resolveAlertStateOptions } from '@any-tdf/common/derived/alert';
	import { closePlainSvg } from '@any-tdf/common/svg/common';
	import { resolveMapValue } from '@any-tdf/common/derived/helpers';

	let {
		visible = $bindable(false),
		title = '',
		message = '',
		duration = 3000,
		position = 'top',
		py = '20',
		type = null,
		showIcon = true,
		icon = {},
		closable = true,
		inverse = true,
		card = {},
		transitionType = 'fly',
		transitionParams = {},
		outDuration = 300,
		easeType = 'cubicOut',
		easeOutType = 'cubicOut',
		zIndex = 1000,
		clickable = true,
		injClass = '',
		children,
		onclose
	}: AlertProps = $props();

	let closingBySelf = $state(resolveAlertInitialClosingBySelf());

	// 自动关闭
	// Auto close
	$effect(() => {
		// 公共 action 只判断是否需要自动关闭，timer 调度和关闭事件留在组件层。
		// Shared action only decides whether auto close is needed; timer scheduling and close events stay in the component layer.
		if (resolveAlertShouldAutoClose({ visible, duration })) {
			const timer = setTimeout(() => {
				requestClose();
			}, duration);
			return () => clearTimeout(timer);
		}
	});

	// 关闭按钮点击
	// Close button click
	const handleClose = () => {
		requestClose();
	};

	const requestClose = () => {
		// 公共 close flow 只返回关闭和立即收尾意图，事件触发和过渡结束仍留在组件内。
		// Shared close flow only returns close and immediate-completion intent; event dispatch and transition end stay in the component.
		const flow = resolveAlertCloseFlow({ visible, closingBySelf, currentRendered: true, transitionType, outDuration });
		if (!flow.shouldClose) return;
		closingBySelf = flow.nextClosingBySelf;
		visible = flow.nextVisible;
		if (flow.shouldEmitClose) {
			onclose?.();
		}
	};

	const handleOutroEnd = () => {
		if (!closingBySelf) return;
		const action = resolveAlertOutroEndAction({ visible, emitClose: true });
		if (!action.shouldComplete) return;
		if (action.shouldEmitClose) onclose?.();
		closingBySelf = action.nextClosingBySelf;
	};

	// 公共派生层处理 Alert 的 class、过渡参数和纯状态判断，事件留在组件内。
	// Shared derivations cover Alert classes, transition params and pure state decisions; events stay here.
	const alertState = $derived(resolveAlertDerived(resolveAlertStateOptions({
		easeIn: resolveMapValue(eases, easeType, 'cubicOut'),
		easeOut: resolveMapValue(eases, easeOutType, 'cubicOut'),
		hasCustomContent: Boolean(children),
		props: { cardRadius: card.radius, clickable, closable, icon, injClass, inverse, message, outDuration, position, py, showIcon, title, transitionParams: transitionParams as Record<string, unknown>, transitionType, type, zIndex }
	})));
</script>

{#snippet alertContent()}
	<div class={alertState.contentClass}>
		<Card shadow="lg" mx="0" my="0" bg={alertState.cardBg} {...card}>
			<div class={alertState.bodyClass}>
				<!-- 类型图标 Type icon -->
				{#if alertState.contentState.showTypeIcon && alertState.contentState.typeIcon}
					<div class={alertState.contentState.typeIcon.wrapperClass}>
						<!-- 公共 SVG 只提供状态图形，Alert 的可见性、事件和过渡仍保留在组件内。 -->
						<!-- Shared SVG only provides status shapes; visibility, events, and transitions stay in Alert. -->
						<SvgIcon svg={alertState.contentState.typeIcon.svg} width="24" height="24" />
					</div>
				{:else if alertState.contentState.showCustomIcon}
					<div class={alertState.customIconClass}>
						<Icon size={24} {...icon} />
					</div>
				{/if}

				<!-- 内容区域 Content area -->
				<div class={alertState.textContentClass}>
					{#if alertState.contentState.showCustomContent}
						{@render children?.()}
					{:else}
						{#if alertState.contentState.showTitle}
							<div class={alertState.titleClass}>{title}</div>
						{/if}
						{#if alertState.contentState.showMessage}
							<div class={alertState.messageClass}>{message}</div>
						{/if}
					{/if}
				</div>

				<!-- 关闭按钮 Close button -->
				{#if alertState.contentState.showClose}
					<button
						type="button"
						class={alertState.closeButtonClass}
						onclick={handleClose}
						aria-label="Close"
					>
						<SvgIcon svg={closePlainSvg} width="18" height="18" />
					</button>
				{/if}
			</div>
		</Card>
	</div>
{/snippet}

{#if visible}
	{#if transitionType === 'scale'}
		<div
			class={alertState.containerClass}
			style={alertState.containerStyleString}
			in:scale|global={alertState.inParams}
			out:scale|global={alertState.outParams}
			onoutroend={handleOutroEnd}
		>
			{@render alertContent()}
		</div>
	{:else if transitionType === 'fly'}
		<div
			class={alertState.containerClass}
			style={alertState.containerStyleString}
			in:fly|global={alertState.inParams}
			out:fly|global={alertState.outParams}
			onoutroend={handleOutroEnd}
		>
			{@render alertContent()}
		</div>
	{:else if transitionType === 'slide'}
		<div
			class={alertState.containerClass}
			style={alertState.containerStyleString}
			in:slide|global={alertState.inParams}
			out:slide|global={alertState.outParams}
			onoutroend={handleOutroEnd}
		>
			{@render alertContent()}
		</div>
	{:else if transitionType === 'fade'}
		<div
			class={alertState.containerClass}
			style={alertState.containerStyleString}
			in:fade|global={alertState.inParams}
			out:fade|global={alertState.outParams}
			onoutroend={handleOutroEnd}
		>
			{@render alertContent()}
		</div>
	{:else if transitionType === 'blur'}
		<div
			class={alertState.containerClass}
			style={alertState.containerStyleString}
			in:blur|global={alertState.inParams}
			out:blur|global={alertState.outParams}
			onoutroend={handleOutroEnd}
		>
			{@render alertContent()}
		</div>
	{:else}
		<div
			class={alertState.containerClass}
			style={alertState.containerStyleString}
		>
			{@render alertContent()}
		</div>
	{/if}
{/if}
