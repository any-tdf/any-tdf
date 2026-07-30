<script lang="ts">
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { InputProps } from '../../types/index.js';
	import {
		resolveInputBlurStateAction,
		resolveInputClearAction,
		resolveInputCompositionAction,
		resolveInputCustomContentKeyboardAction,
		resolveInputDerived,
		resolveInputFocusAction,
		resolveInputFocusStateAction,
		resolveInputStateOptions,
		resolveInputTextareaHeightStyle,
		resolveInputValueChangeAction
	} from '@any-tdf/common/derived/input';
	import { formClearSvg, selectArrowRightSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const inputLang: LangProps['input'] = currentLang.input;

	let {
		title = '',
		titlePosition = 'out',
		inputPosition = 'left',
		placeholder = '',
		radius = '',
		label1 = null,
		label2 = null,
		label3 = null,
		label4 = null,
		label5 = null,
		label6 = null,
		tip = null,
		data1 = null,
		data2 = null,
		data3 = null,
		value = $bindable(''),
		clear = false,
		inputStyle = 'block',
		lineTransition = null,
		duration = 'base',
		autocomplete = true,
		py = '2',
		disabled = false,
		state: inputState = 'theme',
		type = 'text',
		inputmode = '',
		readonly = false,
		select = false,
		required = false,
		maxlength = 24,
		textareaMaxlength = 200,
		rows = 2,
		autosize = false,
		negative = false,
		onfocus,
		onblur,
		onchange,
		onclear,
		onclickLabel1,
		onclickLabel2,
		onclickLabel3,
		onclickLabel4,
		onclickLabel5,
		onclickLabel6,
		onkeydown,
		titleChild,
		data1Child,
		data2Child,
		data3Child,
		inputChild,
		label1Child,
		label2Child,
		label3Child,
		label4Child,
		label5Child,
		label6Child,
		tipChild
	}: InputProps = $props();

	// 是否获取焦点
	// Whether to get focus
	let focus = $state(false);

	// 中文输入上屏标识
	// Chinese input screening flag
	let flag = true;

	//textarea 元素
	//textarea element
	let textareaDom: HTMLTextAreaElement | undefined = $state(undefined);

	// 输入框引用
	// Input ref
	let inputDom: HTMLInputElement | null = $state(null);

	// 输入框类型判断
	// Input type judgment
	const typeAction = (node: HTMLInputElement | HTMLTextAreaElement) => {
		if (type !== 'textarea' && node instanceof HTMLInputElement) {
			node.type = inputViewState.nativeInputType;
		}
	};

	// 公共派生层只处理 Input 状态推导，事件、绑定和 DOM 读取留在组件内。
	// The shared derived layer handles Input state derivation; events, bindings and DOM reads stay in the component.
	const inputViewState = $derived(
		resolveInputDerived(
			resolveInputStateOptions({
				props: {
					autocomplete,
					clear,
					disabled,
					duration,
					inputPosition,
					inputState,
					inputStyle,
					inputmode,
					lineTransition,
					placeholder,
					py,
					radius,
					readonly,
					rows,
					select,
					title,
					titlePosition,
					type
				},
				focus,
				hasInputChild: !!inputChild,
				hasTip: tip !== null,
				pleaseSelect: inputLang.pleaseSelect,
				pleaseInput: inputLang.pleaseInput,
				value
			})
		)
	);

	// 获取焦点时派发事件
	// Get focus to dispatch events
	const onFocus = () => {
		const action = resolveInputFocusStateAction({ value });
		focus = action.nextFocus;
		if (action.shouldEmitFocus) onfocus?.(action.value);
	};

	// 失去焦点时派发事件
	// Dispatch events when focus is lost
	const onBlur = () => {
		const action = resolveInputBlurStateAction({ value });
		focus = action.nextFocus;
		if (action.shouldEmitBlur) onblur?.(action.value);
	};

	// 输入内容变化时触发
	// Triggered when input content changes
	const valueChangeFun = (e: HTMLInputElement | HTMLTextAreaElement) => {
		//处理拼音输入时，内容上屏后才做校验
		//Handle pinyin input, content screening after validation
		setTimeout(function () {
			// 公共 action 只返回输入提交动作，DOM 高度和事件派发留在组件内。
			// Shared action only returns input commit action; DOM height and events stay in the component.
			const action = resolveInputValueChangeAction({ rawValue: e.value, value: e.value, type, maxlength, textareaMaxlength, negative, autosize, composing: !flag });
			if (!action.shouldCommit) return;
			if (action.shouldResizeTextarea && textareaDom) {
				textareaDom.style.height = resolveInputTextareaHeightStyle({ scrollHeight: textareaDom.scrollHeight });
			}
			value = action.nextValue;
			onchange?.(value);
		}, 0);
	};

	//拼音输入时，文字还未上屏触发
	//Triggered when the text has not been screened during pinyin input
	const compositionendFun = () => {
		const action = resolveInputCompositionAction({ phase: 'end' });
		flag = !action.nextComposing;
	};

	//拼音输入时，文字完成上屏触发
	//Triggered when the text is completed during pinyin input
	const compositionstartFun = () => {
		const action = resolveInputCompositionAction({ phase: 'start' });
		flag = !action.nextComposing;
	};

	//清除时触发
	//Triggered when cleared
	const clearFun = (e?: Event) => {
		// 阻止事件冒泡，避免在 select 模式下触发焦点
		// Prevent event bubbling to avoid triggering focus in select mode
		e?.preventDefault();
		e?.stopPropagation();
		const action = resolveInputClearAction();
		value = action.nextValue;
		onclear?.();
		onchange?.(action.nextValue);
	};

	// 键盘事件
	// Keyboard event
	const keydownFunc = (e: KeyboardEvent) => {
		// 派发事件，并传出按键的 key
		// Dispatch events and pass out the key of the key
		onkeydown?.(e.key);
	};

	const focusInput = () => {
		// 公共 action 只返回是否允许聚焦，DOM focus 留在组件层。
		// Shared action only returns whether focus is allowed; DOM focus stays in the component layer.
		const action = resolveInputFocusAction({ disabled });
		if (!action.shouldFocus) return;
		if (type === 'textarea') {
			textareaDom?.focus();
		} else {
			inputDom?.focus();
		}
	};

	const handleCustomContentKeydown = (e: KeyboardEvent) => {
		// 公共 action 只判断激活键，事件对象和 DOM 聚焦留在组件层。
		// Shared action only identifies activation keys; event objects and DOM focus stay in the component layer.
		const action = resolveInputCustomContentKeyboardAction({ key: e.key, disabled });
		if (action.shouldFocus) focusInput();
	};
</script>

<div class={inputViewState.outerClass}>
	<label>
		<div class={inputViewState.titleRowClass}>
			{#if titlePosition === 'out'}
				{#if titleChild}
					{@render titleChild?.()}
				{:else if title === ''}{:else}
					<div class={inputViewState.titleClass}>
						{#if required}
							<span class={inputViewState.requiredClass}>*</span>
						{/if}
						{title}
					</div>
				{/if}
			{/if}
			<div class={inputViewState.edgeContentClass}>
				{#if data1Child}
					{@render data1Child?.()}
				{:else if data1 === ''}{:else}
					{data1}
				{/if}
				{#if data2Child}
					{@render data2Child?.()}
				{:else if data2 === ''}{:else}
					{data2}
				{/if}
			</div>
		</div>
		<div
			class={inputViewState.wrapperClass}
		>
			{#if label1Child}
				{@render label1Child?.()}
			{:else if label1 === null}{:else}
				<button onclick={() => onclickLabel1 && onclickLabel1()}>
					<Icon {...label1} />
				</button>
			{/if}
			{#if label2Child}
				{@render label2Child?.()}
			{:else if label2 === null}{:else}
				<button onclick={() => onclickLabel2 && onclickLabel2()}>
					{label2}
				</button>
			{/if}
			{#if label3Child}
				{@render label3Child?.()}
			{:else if label3 === null}{:else}
				<button onclick={() => onclickLabel3 && onclickLabel3()}>
					<Icon {...label3} />
				</button>
			{/if}
			<div class={inputViewState.contentColumnClass}>
				{#if titlePosition === 'in'}
					<div class={inputViewState.inlineTitleClass}>
						{#if required}
							<span class={inputViewState.inlineRequiredClass}>*</span>
						{/if}
						{title}
					</div>
				{/if}
				<div class={inputViewState.controlRowClass}>
					<div class={inputViewState.controlSlotClass}>
						{#if inputChild}
							<div class={inputViewState.customWrapperClass}>
								{#if type === 'textarea'}
									<textarea
										bind:value
										use:typeAction
										{rows}
										inputmode={inputViewState.mode as 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'email' | 'search' | 'url'}
										placeholder={inputViewState.placeholderText}
										class={inputViewState.hiddenControlClass}
										onfocus={onFocus}
										onblur={() => onBlur()}
										autocomplete={inputViewState.autocompleteValue}
										{disabled}
										readonly
										tabindex="-1"
										bind:this={textareaDom}
										onkeydown={keydownFunc}
									></textarea>
								{:else}
									<input
										bind:value
										use:typeAction
										inputmode={inputViewState.mode as 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'email' | 'search' | 'url'}
										placeholder={inputViewState.placeholderText}
										class={inputViewState.hiddenControlClass}
										onfocus={onFocus}
										onblur={() => onBlur()}
										autocomplete={inputViewState.autocompleteValue}
										{disabled}
										readonly
										tabindex="-1"
										bind:this={inputDom}
									/>
								{/if}
								<div
									class={inputViewState.customContentClass}
									style={inputViewState.customContentStyleString}
									role="textbox"
									tabindex={inputViewState.focusableTabIndex}
									onfocus={focusInput}
									onclick={focusInput}
									onkeydown={handleCustomContentKeydown}
								>
									{@render inputChild?.()}
								</div>
							</div>
						{:else if type === 'textarea'}
							<textarea
								bind:value
								use:typeAction
								{rows}
								inputmode={inputViewState.mode as 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'email' | 'search' | 'url'}
								placeholder={inputViewState.placeholderText}
								class={inputViewState.controlClass}
								onfocus={onFocus}
								onblur={() => onBlur()}
								oninput={(e) => valueChangeFun(e.currentTarget)}
								oncompositionend={compositionendFun}
								oncompositionstart={compositionstartFun}
								autocomplete={inputViewState.autocompleteValue}
								{disabled}
								readonly={inputViewState.nativeReadonly}
								bind:this={textareaDom}
								onkeydown={keydownFunc}
							></textarea>
						{:else}
							<input
								bind:value
								use:typeAction
								inputmode={inputViewState.mode as 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'email' | 'search' | 'url'}
								placeholder={inputViewState.placeholderText}
								class={inputViewState.controlClass}
								onfocus={onFocus}
								onblur={() => onBlur()}
								oninput={(e) => valueChangeFun(e.currentTarget)}
								oncompositionend={compositionendFun}
								oncompositionstart={compositionstartFun}
								autocomplete={inputViewState.autocompleteValue}
								{disabled}
								readonly={inputViewState.nativeReadonly}
								onkeydown={keydownFunc}
							/>
						{/if}
					</div>
					{#if inputViewState.displayState.showClearButton}
						<button onclick={(e) => clearFun(e)} aria-label="clear">
							<!-- 公共输入图标 SVG 数据在 common 中维护。 / Shared input SVG data lives in common. -->
							<SvgIcon svg={formClearSvg} width="16" height="16" class={inputViewState.clearIconClass} />
						</button>
					{/if}
				</div>
			</div>
			{#if label4Child}
				{@render label4Child?.()}
			{:else if label4 === null}{:else}
				<button onclick={() => onclickLabel4 && onclickLabel4()}>
					<Icon {...label4} />
				</button>
			{/if}
			{#if label5Child}
				{@render label5Child?.()}
			{:else if label5 === null}{:else}
				<button onclick={() => onclickLabel5 && onclickLabel5()}>
					{label5}
				</button>
			{/if}
			{#if inputViewState.displayState.showSelectIcon}
				<SvgIcon svg={selectArrowRightSvg} width="24" height="24" class={inputViewState.selectIconClass} />
			{/if}
			{#if label6Child}
				{@render label6Child?.()}
			{:else if label6 === null}{:else}
				<button onclick={() => onclickLabel6 && onclickLabel6()}>
					<Icon {...label6} />
				</button>
			{/if}
			{#if inputViewState.displayState.showLineTransition}
				<div
					class={inputViewState.lineClass}
					style={inputViewState.lineStyleString}
				></div>
			{/if}
		</div>
		<div class={inputViewState.tipRowClass}>
			{#if tipChild}
				{@render tipChild?.()}
			{:else if tip === null}{:else}
				<div class={inputViewState.tipTextClass}>
					{tip}
				</div>
			{/if}
			{#if data3Child}
				{@render data3Child?.()}
			{:else if data3 === null}{:else}
				<div class={inputViewState.dataTextClass}>
					{data3}
				</div>
			{/if}
		</div>
	</label>
</div>
