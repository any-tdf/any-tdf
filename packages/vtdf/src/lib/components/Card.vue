<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import type { CardProps } from '../types';
import { resolveCardDerived, resolveCardStateOptions } from '@any-tdf/common/derived/card';

const props = withDefaults(defineProps<CardProps & {}>(), {
	bg: 'surface',
	radius: '',
	shadow: 'sm',
	border: 'none',
	borderWidth: '1',
	mx: '2',
	my: '2',
	p: '4',
	overflow: true,
	headerLine: true,
	footerLine: true,
	injClass: '',
	headerClass: '',
	bodyClass: '',
	footerClass: ''
});

const emit = defineEmits<{
	click: [];
}>();

const instance = getCurrentInstance();

// 公共派生层处理 Card class 和内容分支，slot 与事件留在组件层。
// Shared derived layer handles Card classes and content branches; slots and events stay in the component layer.
const cardState = computed(() =>
	resolveCardDerived(
		resolveCardStateOptions({
			props: {
				overflow: props.overflow,
				bg: props.bg,
				radius: props.radius,
				shadow: props.shadow,
				mx: props.mx,
				my: props.my,
				border: props.border,
				borderWidth: props.borderWidth,
				injClass: props.injClass,
				p: props.p,
				px: props.px,
				py: props.py,
				headerClass: props.headerClass,
				bodyClass: props.bodyClass,
				footerClass: props.footerClass,
				footerLine: props.footerLine,
				headerLine: props.headerLine
			},
			handler: instance?.vnode.props?.onClick,
			hasBody: Boolean(instance?.slots.default),
			hasFooter: Boolean(instance?.slots.footer),
			hasHeader: Boolean(instance?.slots.header)
		})
	)
);

const handleClick = () => {
	emit('click');
};
</script>

<template>
	<button v-if="cardState.contentState.isInteractive" type="button" :class="cardState.interactiveClass" @click="handleClick">
		<div v-if="cardState.contentState.showHeader" :class="cardState.headerSlotClass">
			<slot name="header" />
		</div>
		<div v-if="cardState.contentState.showHeaderDivider" :class="cardState.dividerClass" />
		<div v-if="cardState.contentState.showBody" :class="cardState.bodySlotClass">
			<slot />
		</div>
		<div v-if="cardState.contentState.showFooterDivider" :class="cardState.dividerClass" />
		<div v-if="cardState.contentState.showFooter" :class="cardState.footerSlotClass">
			<slot name="footer" />
		</div>
	</button>
	<div v-else :class="cardState.containerClass">
		<div v-if="cardState.contentState.showHeader" :class="cardState.headerSlotClass">
			<slot name="header" />
		</div>
		<div v-if="cardState.contentState.showHeaderDivider" :class="cardState.dividerClass" />
		<div v-if="cardState.contentState.showBody" :class="cardState.bodySlotClass">
			<slot />
		</div>
		<div v-if="cardState.contentState.showFooterDivider" :class="cardState.dividerClass" />
		<div v-if="cardState.contentState.showFooter" :class="cardState.footerSlotClass">
			<slot name="footer" />
		</div>
	</div>
</template>
