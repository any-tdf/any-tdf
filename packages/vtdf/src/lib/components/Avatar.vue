<script setup lang="ts">
import { computed } from 'vue';
import type { AvatarProps } from '../types';
import { resolveAvatarDerived, resolveAvatarStateOptions } from '@any-tdf/common/derived/avatar';
import { avatarUserSvg } from '@any-tdf/common/svg/common';
import Icon from './Icon.vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<AvatarProps & {}>(), {
	image: '',
	alt: '',
	icon: () => ({}),
	altSize: 'md',
	radius: '',
	size: 'base',
	imgSize: 'l',
	line: 'none',
	injClass: ''
});

const handleClick = () => {};

// 公共派生层处理 Avatar 的 class、尺寸值和内容分支，点击与具体渲染留在组件内。
// Shared derived layer handles Avatar classes, size values and content branches; clicks and concrete rendering stay in the component.
const avatarState = computed(() =>
	resolveAvatarDerived(
		resolveAvatarStateOptions({
			props: {
				image: props.image,
				alt: props.alt,
				altSize: props.altSize,
				radius: props.radius,
				size: props.size,
				imgSize: props.imgSize,
				line: props.line,
				injClass: props.injClass
			},
			hasIcon: Boolean(props.icon?.name)
		})
	)
);
</script>

<template>
	<button type="button" :class="avatarState.rootClass" @click="handleClick">
		<div
			v-if="avatarState.contentState.kind === 'icon' || avatarState.contentState.kind === 'defaultIcon'"
			:class="avatarState.iconWrapClass"
		>
			<Icon v-if="avatarState.contentState.kind === 'icon'" v-bind="icon" />
			<!-- 公共默认头像 SVG 数据在 common 中维护。 / Shared default avatar SVG data lives in common. -->
			<SvgIcon
				v-else
				:svg="avatarUserSvg"
				:width="avatarState.iconSize"
				:height="avatarState.iconSize"
				:class-name="avatarState.defaultIconClass"
			/>
		</div>
		<div v-else-if="avatarState.contentState.kind === 'alt'" :class="avatarState.centeredAltClass">
			{{ alt }}
		</div>
		<div v-else :class="avatarState.imageWrapClass">
			<img :src="image" :class="avatarState.centeredImageClass" alt="" />
		</div>
	</button>
</template>
