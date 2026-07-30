<script lang="ts">
	import Avatar from '../avatar/Avatar.svelte';
	import type { AvatarGroupProps } from '../../types/index.js';
	import { resolveAvatarGroupDerived, resolveAvatarGroupStateOptions } from '@any-tdf/common/derived/avatarGroup';
	import { avatarGroupUserSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';

	type AvatarGroupItem = AvatarGroupProps['data'][number];

	let {
		data = [],
		radius = '',
		size = 'base',
		compact = 4,
		lineWidth = '3',
		reverse = false,
		max = 10,
		top = 'totle',
		injClass = '',
		onclick
	}: AvatarGroupProps = $props();

	// 公共派生层处理 AvatarGroup 的 class、列表截断和布局计算，点击与 slot 留在组件内。
	// Shared derived layer handles AvatarGroup classes, list slicing and layout math; clicks and slots stay in the component.
	const groupState = $derived(
		resolveAvatarGroupDerived<AvatarGroupItem>(
			resolveAvatarGroupStateOptions({
				props: { data, max, compact, reverse, top, size, radius, lineWidth, injClass },
				total: data.length
			})
		)
	);
	const topSnippet = $derived(typeof top === 'function' ? top : undefined);
</script>

<div class={groupState.rootClass}>
	<button class={groupState.buttonClass} onclick={() => onclick && onclick()}>
		{#if reverse}
			<div
				class={groupState.itemClass}
				style={groupState.topStyleString}
			>
			{#if groupState.topState.kind === 'total'}
				<div
					class={groupState.totalClass}
				>
					{groupState.topState.totalText}
				</div>
			{:else if groupState.topState.kind === 'add'}
				<div
					class={groupState.addClass}
				>
					<div class={groupState.addIconWrapClass}>
						<!-- 公共默认头像组 SVG 数据在 common 中维护。 / Shared default avatar group SVG data lives in common. -->
						<SvgIcon svg={avatarGroupUserSvg} width="24" height="24" class={groupState.addIconClass} />
					</div>
				</div>
			{:else if groupState.topState.kind === 'none'}{:else if topSnippet}
				{@render topSnippet()}
			{/if}
		</div>
	{/if}
		{#each groupState.items as itemState (itemState.item.image)}
			<div
				class={groupState.itemClass}
				style={itemState.styleString}
			>
				<Avatar {radius} {size} {...itemState.item} />
			</div>
		{/each}
		{#if !reverse}
			<div
				class={groupState.itemClass}
				style={groupState.topStyleString}
			>
			{#if groupState.topState.kind === 'total'}
				<div
					class={groupState.totalClass}
				>
					{groupState.topState.totalText}
				</div>
			{:else if groupState.topState.kind === 'add'}
				<div
					class={groupState.addClass}
				>
					<div class={groupState.addIconWrapClass}>
						<SvgIcon svg={avatarGroupUserSvg} width="24" height="24" class={groupState.addIconClass} />
					</div>
				</div>
			{:else if groupState.topState.kind === 'none'}{:else if topSnippet}
				{@render topSnippet()}
			{/if}
		</div>
	{/if}
	</button>
</div>
