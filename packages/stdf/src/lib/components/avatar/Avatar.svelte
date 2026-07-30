<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { AvatarProps } from '$lib/types/index.js';
	import { resolveAvatarDerived, resolveAvatarStateOptions } from '@any-tdf/common/derived/avatar';
	import { avatarUserSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';

	let {
		image = '',
		alt = '',
		icon = {},
		altSize = 'md',
		radius = '',
		size = 'base',
		imgSize = 'l',
		line = 'none',
		injClass = '',
		onclick
	}: AvatarProps = $props();

	// 公共派生层处理 Avatar 的 class、尺寸值和内容分支，点击与具体渲染留在组件内。
	// Shared derived layer handles Avatar classes, size values and content branches; clicks and concrete rendering stay in the component.
	const avatarState = $derived(
		resolveAvatarDerived(
			resolveAvatarStateOptions({
				props: { image, alt, altSize, radius, size, imgSize, line, injClass },
				hasIcon: Boolean(icon.name)
			})
		)
	);
</script>

<button
	class={avatarState.rootClass}
	onclick={() => onclick && onclick()}
>
	{#if avatarState.contentState.kind === 'icon' || avatarState.contentState.kind === 'defaultIcon'}
		<div class={avatarState.iconWrapClass}>
			{#if avatarState.contentState.kind === 'icon'}
				<Icon {...icon} />
			{:else}
				<!-- 公共默认头像 SVG 数据在 common 中维护。 / Shared default avatar SVG data lives in common. -->
				<SvgIcon
					svg={avatarUserSvg}
					width={avatarState.iconSize}
					height={avatarState.iconSize}
					class={avatarState.defaultIconClass}
				/>
			{/if}
		</div>
	{:else if avatarState.contentState.kind === 'alt'}
		<div
			class={avatarState.centeredAltClass}
		>
			{alt}
		</div>
	{:else}
		<div class={avatarState.imageWrapClass}>
			<img
				src={image}
				class={avatarState.centeredImageClass}
				alt=""
			/>
		</div>
	{/if}
</button>
