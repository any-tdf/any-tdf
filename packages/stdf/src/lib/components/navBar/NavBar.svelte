<script lang="ts">
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import type { NavBarProps } from '../../types/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import { resolveNavBarDerived, resolveNavBarStateOptions } from '@any-tdf/common/derived/navBar';
	import { arrowLeftSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const navBarLang: LangProps['navBar'] = currentLang.navBar;

	let {
		title,
		titleAlign = 'left',
		left = 'back',
		rights = [],
		line = true,
		injClass = '',
		love = false,
		onclickLeft,
		onclickRight,
		titleChild,
		leftChild,
		rightChild
	}: NavBarProps = $props();

	// 公共派生层只处理 NavBar 状态推导，点击与 slot 留在组件内。
	// The shared derived layer only handles NavBar state derivation; clicks and slots stay in the component.
	const navBarState = $derived(
		resolveNavBarDerived(
			resolveNavBarStateOptions({
				props: { title, titleAlign, left, line, love, injClass },
				defaults: navBarLang,
				hasCustomChild: Boolean(leftChild)
			})
		)
	);

</script>

<div class={navBarState.containerClass}>
	{#if navBarState.leftState.kind === 'child'}
		{@render leftChild?.()}
	{:else if navBarState.leftState.kind === 'back'}
		<button class={navBarState.leftButtonClass} onclick={() => onclickLeft && onclickLeft()} aria-label={navBarState.leftState.ariaLabel}>
			<!-- 公共返回箭头 SVG 数据在 common 中维护。 / Shared back arrow SVG data lives in common. -->
			<SvgIcon svg={arrowLeftSvg} width={navBarState.iconSize} height={navBarState.iconSize} class={navBarState.backSvgClass} />
		</button>
	{:else if navBarState.leftState.kind === 'spacer'}
		<div class={navBarState.spacerClass}></div>
	{:else if navBarState.leftState.kind === 'icon'}
		<button class={navBarState.leftButtonClass} onclick={() => onclickLeft && onclickLeft()}>
			<Icon {...navBarState.leftState.iconProps} />
		</button>
	{/if}
	<div class={navBarState.titleWrapClass}>
		{#if titleChild}
			{@render titleChild()}
		{:else}
			<div class={navBarState.titleAlignClass}>{navBarState.titleText}</div>
		{/if}
	</div>
	<div class={navBarState.rightWrapClass}>
		{#if rightChild}
			{@render rightChild()}
		{:else if rights.length > 0}
			{#each rights as icon, i (icon.name)}
				<button class={navBarState.rightButtonClass} onclick={() => onclickRight && onclickRight(i)}>
					<Icon {...icon} size={navBarState.iconSize} />
				</button>
			{/each}
		{:else}{/if}
	</div>
</div>
