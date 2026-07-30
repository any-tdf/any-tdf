<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { NavBarProps } from '../types';
import { resolveNavBarDerived, resolveNavBarStateOptions } from '@any-tdf/common/derived/navBar';
import { arrowLeftSvg } from '@any-tdf/common/svg/common';
import { zh_CN } from '../lang';
import { useConfig } from './adapter/config';
import Icon from './Icon.vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<NavBarProps & {}>(), {
	title: undefined,
	titleAlign: 'left',
	left: 'back',
	rights: () => [],
	line: true,
	injClass: '',
	love: false
});

const emit = defineEmits<{
	clickLeft: [];
	clickRight: [index: number];
}>();

const config = useConfig();
const slots = useSlots();
const navBarLang = computed(() => config.locale?.navBar || zh_CN.navBar);
// 公共派生层只处理 NavBar 状态推导，点击与 slot 留在组件内。
// The shared derived layer only handles NavBar state derivation; clicks and slots stay in the component.
const navBarState = computed(() =>
	resolveNavBarDerived(
		resolveNavBarStateOptions({
			props: {
				title: props.title,
				titleAlign: props.titleAlign,
				left: props.left,
				line: props.line,
				love: props.love,
				injClass: props.injClass
			},
			defaults: navBarLang.value,
			hasCustomChild: Boolean(slots.leftChild)
		})
	)
);

const handleClickLeft = () => {
	emit('clickLeft');
};

const handleClickRight = (index: number) => {
	emit('clickRight', index);
};
</script>

<template>
	<div :class="navBarState.containerClass">
		<slot v-if="navBarState.leftState.kind === 'child'" name="leftChild" />
		<button
			v-else-if="navBarState.leftState.kind === 'back'"
			type="button"
			:class="navBarState.leftButtonClass"
			:aria-label="navBarState.leftState.ariaLabel"
			@click="handleClickLeft"
		>
			<!-- 公共返回箭头 SVG 数据在 common 中维护。 / Shared back arrow SVG data lives in common. -->
			<SvgIcon :svg="arrowLeftSvg" :width="navBarState.iconSize" :height="navBarState.iconSize" :class-name="navBarState.backSvgClass" />
		</button>
		<div v-else-if="navBarState.leftState.kind === 'spacer'" :class="navBarState.spacerClass" />
		<button v-else-if="navBarState.leftState.kind === 'icon'" type="button" :class="navBarState.leftButtonClass" @click="handleClickLeft">
			<Icon v-bind="navBarState.leftState.iconProps as Record<string, unknown>" />
		</button>

		<div :class="navBarState.titleWrapClass">
			<slot v-if="$slots.titleChild" name="titleChild" />
			<div v-else :class="navBarState.titleAlignClass">{{ navBarState.titleText }}</div>
		</div>

		<div :class="navBarState.rightWrapClass">
			<slot v-if="$slots.rightChild" name="rightChild" />
			<template v-else>
				<button
					v-for="(icon, index) in rights"
					:key="icon.name || `right-icon-${index}`"
					type="button"
					:class="navBarState.rightButtonClass"
					@click="handleClickRight(index)"
				>
					<Icon v-bind="icon" :size="navBarState.iconSize" />
				</button>
			</template>
		</div>
	</div>
</template>
