<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { FullKeyboardProps } from '../../types/index.js';
	import {
		fullKeyboardLetterRows,
		fullKeyboardNumberRow,
		fullKeyboardSymbolRows,
		resolveFullKeyboardCaseToggleAction,
		resolveFullKeyboardDerived,
		resolveFullKeyboardInputKey,
		resolveFullKeyboardKeyFlow,
		resolveFullKeyboardStateOptions,
		resolveFullKeyboardSymbolModeToggleAction,
		resolveFullKeyboardTexts,
		resolveFullKeyboardUsePopup,
		resolveFullKeyboardVisibleChangeFlow
	} from '@any-tdf/common/derived/fullKeyboard';
	import { fullKeyboardShiftSvg } from '@any-tdf/common/svg/fullKeyboard';
	import { numKeyboardDeleteSvg } from '@any-tdf/common/svg/numKeyboard';
	import SvgIcon from '../utils/SvgIcon.svelte';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const commonLang: LangProps['common'] = currentLang.common;
	const fullKeyboardLang = currentLang.fullKeyboard || zh_CN.fullKeyboard;

	let {
		value = $bindable(''),
		visible = $bindable(true),
		type = 'button',
		mode = 'full',
		done = true,
		doneText,
		doneDisabled = $bindable(false),
		radius = '',
		preview = false,
		previewMask = false,
		panelClass = '',
		keyClass: keyClassProp = '',
		doneClass = '',
		popup = {},
		onclick,
		onopen,
		onclose
	}: FullKeyboardProps = $props();

	// 是否使用弹出层，当 popup 为 null 时不使用
	// Whether to use popup, when popup is null, do not use
	const usePopup = $derived(resolveFullKeyboardUsePopup(popup));
	const keyboardTexts = $derived(resolveFullKeyboardTexts({ doneText, defaults: { common: commonLang, fullKeyboard: fullKeyboardLang } }));

	// 是否大写模式
	// Whether uppercase mode
	let isUpperCase = $state(false);

	// 是否符号模式（用于 full 模式下切换字母/数字符号）
	// Whether symbol mode (for switching between letters and numbers/symbols in full mode)
	let isSymbolMode = $state(false);
	let previousVisible = $state<boolean | undefined>(undefined);

	const [letterRow1, letterRow2, letterRow3] = fullKeyboardLetterRows;
	const numberRow = fullKeyboardNumberRow;
	const symbolRow4 = fullKeyboardSymbolRows[3];

	// 公共派生层只处理 FullKeyboard 的按键、面板和布局 class，输入事件留在组件内。
	// Shared derived layer only handles FullKeyboard key, panel and layout classes; input events stay in the component.
	const keyboardState = $derived(
		resolveFullKeyboardDerived(
			resolveFullKeyboardStateOptions({
				props: {
					done,
					doneClass,
					keyClass: keyClassProp,
					mode,
					panelClass,
					popup,
					preview,
					previewMask,
					radius,
					type
				},
				doneDisabled,
				isSymbolMode,
				isUpperCase,
				value
			})
		)
	);

	// 点击按键事件
	// Click key event
	const clickKey = (key: string) => {
		// 公共 flow 返回输入值、事件键和关闭动作，事件派发仍留在组件层。
		// Shared flow returns input value, emit key and close action; event dispatch stays in the component layer.
		const flow = resolveFullKeyboardKeyFlow({ value, key, isUpperCase, doneDisabled, closeOptions: { emitClose: false } });
		if (flow.shouldUpdateValue) {
			value = flow.nextValue;
		}
		if (flow.shouldEmit) {
			onclick?.(flow.emitKey);
		}
		if (flow.closeAction) {
			if (flow.closeAction.shouldClose) visible = flow.closeAction.nextVisible;
			if (flow.closeAction.shouldEmitClose) onclose?.();
		}
	};

	// 点击删除
	// Click delete
	const clickDelete = () => {
		clickKey('delete');
	};

	// 点击空格
	// Click space
	const clickSpace = () => {
		clickKey(' ');
	};

	// 点击完成
	// Click done
	const clickDone = () => {
		clickKey('done');
	};

	// 切换大小写
	// Toggle uppercase
	const toggleCase = () => {
		const action = resolveFullKeyboardCaseToggleAction(isUpperCase);
		isUpperCase = action.nextUpperCase;
	};

	// 切换符号模式
	// Toggle symbol mode
	const toggleSymbolMode = () => {
		const action = resolveFullKeyboardSymbolModeToggleAction(isSymbolMode);
		isSymbolMode = action.nextSymbolMode;
	};

	// 激活与关闭键盘事件
	// Activate and close the keyboard event
	$effect(() => {
		// 公共 visibility flow 只判断可见性回调，事件派发仍在组件层。
		// Shared visibility flow only decides visibility callbacks; event emits stay in the component layer.
		const flow = resolveFullKeyboardVisibleChangeFlow({ visible, previousVisible, keyboardHeight: keyboardState.keyboardHeight });
		if (flow.shouldSkip) return;
		previousVisible = flow.nextPreviousVisible;
		if (flow.shouldEmitOpen) {
			onopen?.(flow.openHeight);
		}
		if (flow.shouldEmitClose) {
			onclose?.();
		}
	});
</script>

{#snippet shiftKey()}
	<button
		class={keyboardState.shiftButtonClass}
		onclick={toggleCase}
		aria-label="shift"
	>
		<!-- 公共 FullKeyboard SVG 数据在 common 中维护，大小写状态仍在组件内。 / Shared FullKeyboard SVG data lives in common while case state stays here. -->
		<SvgIcon svg={fullKeyboardShiftSvg} width="18" height="16" class={keyboardState.iconClass} />
	</button>
{/snippet}

{#snippet deleteKey()}
	<button class={keyboardState.deleteButtonClass} onclick={clickDelete} aria-label="delete">
		<SvgIcon svg={numKeyboardDeleteSvg} width="22" height="22" class={keyboardState.iconClass} />
	</button>
{/snippet}

{#snippet letterRows()}
	<div class={keyboardState.gridRow10Class}>
		{#each letterRow1 as key (key)}
			<button class={keyboardState.keyButtonClass} onclick={() => clickKey(key)}>
				{resolveFullKeyboardInputKey(key, isUpperCase)}
			</button>
		{/each}
	</div>
	<div class={keyboardState.gridRow9PxClass}>
		{#each letterRow2 as key (key)}
			<button class={keyboardState.keyButtonClass} onclick={() => clickKey(key)}>
				{resolveFullKeyboardInputKey(key, isUpperCase)}
			</button>
		{/each}
	</div>
	<div class={keyboardState.flexRowClass}>
		{@render shiftKey()}
		<div class={keyboardState.innerGrid7Class}>
			{#each letterRow3 as key (key)}
				<button class={keyboardState.keyButtonClass} onclick={() => clickKey(key)}>
					{resolveFullKeyboardInputKey(key, isUpperCase)}
				</button>
			{/each}
		</div>
		{@render deleteKey()}
	</div>
{/snippet}

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

		{#if keyboardState.layout.showLetterMode}
			<!-- 纯字母模式 -->
			<!-- Letter only mode -->
			{@render letterRows()}
			<!-- 底部行：空格、完成 -->
			<div class={keyboardState.bottomRowClass}>
				<button class={keyboardState.flex1KeyClass} onclick={clickSpace}>
					<span class={keyboardState.spaceTextClass}>{keyboardTexts.spaceText}</span>
				</button>
				{#if keyboardState.layout.showDoneButton}
					<button
						class={keyboardState.doneButtonClass}
						onclick={clickDone}
					>
						{keyboardTexts.doneText}
					</button>
				{/if}
			</div>

		{:else if keyboardState.layout.showLetterNumberMode}
			<!-- 字母+数字模式：数字在字母上方一行 -->
			<!-- Letter + Number mode: numbers in a row above letters -->
			<div class={keyboardState.gridRow10Class}>
				{#each numberRow as key (key)}
					<button class={keyboardState.keyButtonClass} onclick={() => clickKey(key)}>{key}</button>
				{/each}
			</div>
			{@render letterRows()}
			<!-- 底部行：空格、完成 -->
			<div class={keyboardState.bottomRowClass}>
				<button class={keyboardState.flex1KeyClass} onclick={clickSpace}>
					<span class={keyboardState.spaceTextClass}>{keyboardTexts.spaceText}</span>
				</button>
				{#if keyboardState.layout.showDoneButton}
					<button
						class={keyboardState.doneButtonClass}
						onclick={clickDone}
					>
						{keyboardTexts.doneText}
					</button>
				{/if}
			</div>

		{:else}
			<!-- full 模式：字母+数字+符号，可切换 -->
			<!-- Full mode: letters + numbers + symbols, switchable -->
			{#if keyboardState.layout.showSymbolRows}
				<!-- 数字符号模式 -->
				<!-- Number symbol mode -->
				{#each keyboardState.layout.symbolMainRows as row, rowIndex (rowIndex)}
					<div class={keyboardState.gridRow10Class}>
						{#each row as key (key)}
							<button class={keyboardState.keyButtonClass} onclick={() => clickKey(key)}>{key}</button>
						{/each}
					</div>
				{/each}
				<div class={keyboardState.flexRowClass}>
					<div class={keyboardState.innerGrid9Class}>
						{#each symbolRow4 as key (key)}
							<button class={keyboardState.keyButtonClass} onclick={() => clickKey(key)}>{key}</button>
						{/each}
					</div>
					{@render deleteKey()}
				</div>
			{:else}
				<!-- 字母模式 -->
				<!-- Letter mode -->
				{@render letterRows()}
			{/if}

			<!-- 底部行：123/ABC、<>/? (符号模式)、空格、完成 -->
			<!-- Bottom row: 123/ABC, <>/? (symbol mode), space, done -->
			<div class={keyboardState.bottomRowClass}>
				<button class={keyboardState.symbolToggleButtonClass} onclick={toggleSymbolMode}>
					{keyboardState.symbolToggleText}
				</button>
				{#each keyboardState.layout.bottomSymbolKeys as key (key)}
					<button class={keyboardState.symbolKeyClass} onclick={() => clickKey(key)}>{key}</button>
				{/each}
				<button class={keyboardState.flex1KeyClass} onclick={clickSpace}>
					<span class={keyboardState.spaceTextClass}>{keyboardTexts.spaceText}</span>
				</button>
				{#if keyboardState.layout.showDoneButton}
					<button
						class={keyboardState.doneButtonClass}
						onclick={clickDone}
					>
						{keyboardTexts.doneText}
					</button>
				{/if}
			</div>
		{/if}
	</div>
{/snippet}

{#if usePopup}
	<Popup bind:visible {...keyboardState.popupProps}>
		{@render keyboardContent()}
	</Popup>
{:else}
	{@render keyboardContent()}
{/if}
