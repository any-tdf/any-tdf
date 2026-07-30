<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Transition as MotionTransition } from '@any-tdf/vue-motion';
import { easingFunctions } from '@any-tdf/vue-motion/easing';
import { resolveAccordionDerived, resolveAccordionStateOptions, resolveAccordionToggleAction } from '@any-tdf/common/derived/accordion';
import { accordionArrowRightSvg, accordionPlusSvg } from '@any-tdf/common/svg/common';
import type { AccordionItemProps, AccordionProps } from '../types';
import Icon from './Icon.vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<AccordionProps & {}>(), {
	items: () => [],
	activeIndex: undefined,
	multiple: false,
	radius: 'md',
	border: 'solid',
	divider: true,
	expandIcon: 'arrow',
	iconPosition: 'right',
	transitionDuration: 300,
	injClass: '',
	titleClass: '',
	contentClass: ''
});

const emit = defineEmits<{
	'update:activeIndex': [activeIndex: number | number[] | undefined];
	change: [activeIndex: number | number[] | undefined];
}>();

defineSlots<{
	default?: (props: { item: AccordionItemProps; index: number }) => unknown;
}>();

const innerActive = ref<number | number[] | undefined>(props.activeIndex);

// 输入组件状态，返回框架无关的展开视图、class 和动画参数派生结果。
// Receive component state and return framework-agnostic expanded views, classes and motion params.
const accordionState = computed(() =>
	resolveAccordionDerived(
		resolveAccordionStateOptions({
			activeIndex: innerActive.value,
			easing: easingFunctions.cubicOut,
			props
		})
	)
);

const updateActive = (nextActive: number | number[] | undefined) => {
	innerActive.value = nextActive;
	emit('update:activeIndex', nextActive);
	emit('change', nextActive);
};

const toggle = (index: number) => {
	const item = props.items[index];
	const action = resolveAccordionToggleAction({
		activeIndex: innerActive.value,
		index,
		multiple: props.multiple,
		disabled: item?.disabled
	});
	if (!action.shouldToggle) return;
	updateActive(action.nextActive);
};

watch(
	() => props.activeIndex,
	(nextActive) => {
		innerActive.value = nextActive;
	}
);
</script>

<template>
	<div :class="accordionState.rootClass">
		<div
			v-for="itemViewState in accordionState.itemViewStates"
			:key="`${itemViewState.item.title}-${itemViewState.index}`"
			:class="itemViewState.dividerClass"
		>
			<button type="button" :class="itemViewState.buttonClass" :disabled="itemViewState.item.disabled" @click="toggle(itemViewState.index)">
				<div :class="itemViewState.titleClass">
					<Icon v-if="itemViewState.item.icon" v-bind="itemViewState.item.icon" />
					<span :class="accordionState.titleTextClass">{{ itemViewState.item.title }}</span>
				</div>
				<span v-if="itemViewState.iconState.shouldRender" :class="itemViewState.iconState.wrapClass">
					<!-- 公共 SVG 数据在 common，框架渲染留在组件内。 -->
					<!-- Shared SVG data lives in common, while framework rendering stays here. -->
					<SvgIcon
						v-if="itemViewState.iconState.kind === 'arrow'"
						:svg="accordionArrowRightSvg"
						:class-name="itemViewState.iconState.iconClass"
					/>
					<SvgIcon
						v-else-if="itemViewState.iconState.kind === 'plus'"
						:svg="accordionPlusSvg"
						:class-name="itemViewState.iconState.iconClass"
					/>
				</span>
			</button>

			<MotionTransition
				:visible="itemViewState.expanded"
				transition="slide"
				:in-params="accordionState.slideParams"
				:out-params="accordionState.slideParams"
				:class="accordionState.panelClass"
			>
				<div :class="accordionState.contentClass">
					<slot :item="itemViewState.item" :index="itemViewState.index">
						{{ itemViewState.item.content }}
					</slot>
				</div>
			</MotionTransition>
		</div>
	</div>
</template>
