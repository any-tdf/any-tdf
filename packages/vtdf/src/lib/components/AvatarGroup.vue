<script setup lang="ts">
import { computed } from 'vue';
import type { AvatarGroupProps } from '../types';
import { resolveAvatarGroupDerived, resolveAvatarGroupStateOptions } from '@any-tdf/common/derived/avatarGroup';
import { avatarGroupUserSvg } from '@any-tdf/common/svg/common';
import Avatar from './Avatar.vue';
import SvgIcon from './SvgIcon.vue';

type AvatarGroupVueProps = Omit<AvatarGroupProps, 'top'> & {
	top?: 'totle' | 'add' | null;
};

const props = withDefaults(defineProps<AvatarGroupVueProps>(), {
	data: () => [],
	radius: '',
	size: 'base',
	compact: 4,
	lineWidth: '3',
	reverse: false,
	max: 10,
	top: 'totle',
	injClass: ''
});

// 公共派生层处理 AvatarGroup 的 class、列表截断和布局计算，点击与 slot 留在组件内。
// Shared derived layer handles AvatarGroup classes, list slicing and layout math; clicks and slots stay in the component.
const groupState = computed(() =>
	resolveAvatarGroupDerived(
		resolveAvatarGroupStateOptions({
			props: {
				data: props.data,
				max: props.max,
				compact: props.compact,
				reverse: props.reverse,
				top: props.top,
				size: props.size,
				radius: props.radius,
				lineWidth: props.lineWidth,
				injClass: props.injClass
			},
			total: props.data.length
		})
	)
);

const handleClick = () => {};
</script>

<template>
	<div :class="groupState.rootClass">
		<button type="button" :class="groupState.buttonClass" @click="handleClick">
			<div v-if="reverse" :class="groupState.itemClass" :style="groupState.topStyle">
				<slot v-if="$slots.top" name="top" />
				<div v-else-if="groupState.topState.kind === 'total'" :class="groupState.totalClass">
					{{ groupState.topState.totalText }}
				</div>
				<div v-else-if="groupState.topState.kind === 'add'" :class="groupState.addClass">
					<div :class="groupState.addIconWrapClass">
						<!-- 公共默认头像组 SVG 数据在 common 中维护。 / Shared default avatar group SVG data lives in common. -->
						<SvgIcon :svg="avatarGroupUserSvg" width="24" height="24" :class-name="groupState.addIconClass" />
					</div>
				</div>
			</div>

			<div
				v-for="itemState in groupState.items"
				:key="itemState.item.image || itemState.item.alt || itemState.index"
				:class="groupState.itemClass"
				:style="itemState.style"
			>
				<Avatar :radius="radius" :size="size" v-bind="itemState.item" />
			</div>

			<div v-if="!reverse" :class="groupState.itemClass" :style="groupState.topStyle">
				<slot v-if="$slots.top" name="top" />
				<div v-else-if="groupState.topState.kind === 'total'" :class="groupState.totalClass">
					{{ groupState.topState.totalText }}
				</div>
				<div v-else-if="groupState.topState.kind === 'add'" :class="groupState.addClass">
					<div :class="groupState.addIconWrapClass">
						<SvgIcon :svg="avatarGroupUserSvg" width="24" height="24" :class-name="groupState.addIconClass" />
					</div>
				</div>
			</div>
		</button>
	</div>
</template>
