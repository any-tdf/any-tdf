<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { NumKeyboardProps } from '../../types/index.js';
	import {
		resolveNumKeyboardDerived,
		resolveNumKeyboardKeyFlow,
		resolveNumKeyboardStateOptions,
		resolveNumKeyboardVisibleChangeAction,
	} from '@any-tdf/common/derived/numKeyboard';
	import { numKeyboardCloseSvg, numKeyboardDeleteSvg } from '@any-tdf/common/svg/numKeyboard';
	import SvgIcon from '../utils/SvgIcon.svelte';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const commonLang: LangProps['common'] = currentLang.common;

	let {
		type = 'button',
		value = $bindable(''),
		visible = $bindable(true),
		height = '12',
		space = '2',
		p = '2',
		reverse = false,
		done = true,
		dot = true,
		close = false,
		doneText,
		doneDisabled = $bindable(false),
		radius = '',
		clear = false,
		preview = false,
		previewMask = false,
		panelClass = '',
		keyClass = '',
		doneClass = '',
		popup = {},
		onclick,
		onopen,
		onclose
	}: NumKeyboardProps = $props();
	let previousVisible = $state<boolean | undefined>(undefined);

	// 公共派生层只处理 NumKeyboard 文案、布局、class、预览和 Popup 参数，事件留在组件内。
	// Shared derived layer only handles NumKeyboard text, layout, classes, preview and Popup params; events stay in the component.
	const keyboardState = $derived(
		resolveNumKeyboardDerived(
			resolveNumKeyboardStateOptions({
				props: {
					type,
					height,
					space,
					p,
					reverse,
					done,
					dot,
					close,
					doneText,
					radius,
					preview,
					previewMask,
					panelClass,
					keyClass,
					doneClass,
					popup
				},
				value,
				doneDisabled,
				defaults: commonLang
			})
		)
	);

	// 点击按键事件
	// Click the button event
	const clickFunc = (key: string) => {
		// 公共 flow 返回值更新和关闭动作，事件触发仍保留在组件内。
		// Shared flow returns value updates and close actions; event dispatch stays inside the component.
		const flow = resolveNumKeyboardKeyFlow({ value, key, doneDisabled, closeOptions: { emitClose: false } });
		if (flow.shouldUpdateValue) {
			value = flow.nextValue;
		}
		if (flow.closeAction) {
			if (flow.closeAction.shouldClose) visible = flow.closeAction.nextVisible;
			if (flow.closeAction.shouldEmitClose) onclose?.();
		}
		// 派发事件，传递出两个参数，输入的数字字符串和本次点击的类型
		// Dispatch events, pass out two parameters, the input number string and the type of this click
		onclick?.(key as '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.' | 'delete' | 'close' | 'done');
	};

	// 激活与关闭键盘事件
	// Activate and close the keyboard event
	$effect(() => {
		// 公共 action 只判断可见性回调和清空策略，状态写入与事件派发仍在组件层。
		// Shared action only decides visibility callbacks and clear policy; state writes and event emits stay in the component layer.
		const action = resolveNumKeyboardVisibleChangeAction({ visible, previousVisible, clear, keyboardHeight: keyboardState.keyboardHeight });
		if (action.shouldSkip) return;
		previousVisible = action.nextPreviousVisible;
		if (action.shouldClearValue) {
			value = '';
		}
		if (action.shouldEmitOpen) {
			onopen?.(action.openHeight);
		}
		if (action.shouldEmitClose) {
			onclose?.();
		}
	});
</script>

{#snippet keyboardContent()}
	<div class={keyboardState.panelClass}>
		{#if preview}
			<!-- 输入预览区 -->
			<!-- Input preview area -->
			<div class={keyboardState.previewClass}>
				{#if keyboardState.previewState.showMask}
					{#each keyboardState.previewState.maskIndexes as index (index)}
						<span class={keyboardState.previewState.dotClass}></span>
					{/each}
				{:else}
					{keyboardState.previewState.displayValue}
				{/if}
			</div>
		{/if}
		<div class={keyboardState.gridClass}>
			{#each keyboardState.keyRows.topKeys as item (item)}
				<button class={keyboardState.keyClasses[item]} onclick={() => clickFunc(item)}>{item} </button>
			{/each}
			{#if done}
				<button class={keyboardState.keyClasses.delete} onclick={() => clickFunc('delete')} aria-label="delete">
					<!-- 公共 NumKeyboard SVG 数据在 common 中维护。 / Shared NumKeyboard SVG data lives in common. -->
					<SvgIcon svg={numKeyboardDeleteSvg} width={keyboardState.svgSize} height={keyboardState.svgSize} class={keyboardState.svgClass} />
				</button>
			{/if}
			{#each keyboardState.keyRows.middleKeys as item (item)}
				<button class={keyboardState.keyClasses[item]} onclick={() => clickFunc(item)}>{item} </button>
			{/each}
			{#if done}
				<button
					class={keyboardState.doneKeyClass}
					onclick={() => clickFunc('done')}
				>
					{keyboardState.doneText}
				</button>
			{/if}
			{#each keyboardState.keyRows.bottomKeys as item (item)}
				<button class={keyboardState.keyClasses[item]} onclick={() => clickFunc(item)}>{item} </button>
			{/each}
			{#if dot}
				<button class={keyboardState.keyClasses['.']} onclick={() => clickFunc('.')}>.</button>
			{/if}
			{#if keyboardState.showCloseKey}
				<button class={keyboardState.keyClasses.close} onclick={() => clickFunc('close')} aria-label="close">
					<SvgIcon svg={numKeyboardCloseSvg} width={keyboardState.svgSize} height={keyboardState.svgSize} class={keyboardState.svgClass} />
				</button>
			{/if}
			<button class={keyboardState.zeroKeyClass} onclick={() => clickFunc('0')}>0</button>
			{#if !done}
				<button class={keyboardState.keyClasses.delete} onclick={() => clickFunc('delete')} aria-label="delete">
					<SvgIcon svg={numKeyboardDeleteSvg} width={keyboardState.svgSize} height={keyboardState.svgSize} class={keyboardState.svgClass} />
				</button>
			{/if}
		</div>
	</div>
{/snippet}

{#if keyboardState.usePopup}
	<Popup bind:visible {...keyboardState.popupProps}>
		{@render keyboardContent()}
	</Popup>
{:else}
	{@render keyboardContent()}
{/if}
