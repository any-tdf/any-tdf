<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { CellProps } from '../types';
import {
	resolveCellClickAction,
	resolveCellDerived,
	resolveCellKeyboardAction,
	resolveCellStateOptions
} from '@any-tdf/common/derived/cell';
import { arrowRightSvg } from '@any-tdf/common/svg/common';
import Icon from './Icon.vue';
import SvgIcon from './SvgIcon.vue';
import Switch from './Switch.vue';

const props = withDefaults(defineProps<CellProps & {}>(), {
	title: '',
	detail: '',
	right: 'arrow',
	left: null,
	subTitle: '',
	info: '',
	line: false,
	bg: 'surface',
	my: '4',
	mx: '2',
	radius: '',
	switchActive: false,
	shadow: 'xs',
	injClass: '',
	love: false,
	clickAll: true
});

const emit = defineEmits<{
	click: [];
	'update:switchActive': [active: boolean];
}>();

const innerSwitchActive = ref(props.switchActive);

watch(
	() => props.switchActive,
	(nextActive) => {
		innerSwitchActive.value = nextActive;
	}
);

// 公共派生层处理 Cell class、图标尺寸和右侧内容分支，事件与 slot 留在组件层。
// Shared derived layer handles Cell classes, icon size and right-content branches; events and slots stay in the component layer.
const cellState = computed(() =>
	resolveCellDerived(
		resolveCellStateOptions({
			props: {
				my: props.my,
				mx: props.mx,
				radius: props.radius,
				shadow: props.shadow,
				injClass: props.injClass,
				bg: props.bg,
				clickAll: props.clickAll,
				love: props.love,
				line: props.line,
				subTitle: props.subTitle,
				info: props.info,
				right: props.right
			},
			includeCursor: true
		})
	)
);

const setClickFun = () => {
	// 公共动作函数只返回点击和 switch 状态决策，状态写入与事件派发留在组件层。
	// Shared action function only returns click and switch state decisions; state writes and event emission stay in the component.
	const action = resolveCellClickAction({
		clickAll: props.clickAll,
		active: innerSwitchActive.value,
		right: props.right
	});
	if (!action.shouldClick) return;
	if (action.shouldToggleSwitch) {
		innerSwitchActive.value = action.nextSwitchActive;
		emit('update:switchActive', innerSwitchActive.value);
	}
	emit('click');
};

const handleKeyDown = (event: KeyboardEvent) => {
	// 公共键盘动作函数只处理按键分支，事件对象处理留在组件层。
	// Shared keyboard action function only resolves key branches; event object handling stays in the component.
	const action = resolveCellKeyboardAction({ key: event.key, clickAll: props.clickAll });
	if (action.shouldPreventDefault) {
		event.preventDefault();
	}
	if (action.shouldClick) {
		setClickFun();
	}
};
</script>

<template>
	<div :class="cellState.outerClass">
		<div :class="cellState.contentClass">
			<div role="button" :tabindex="cellState.tabIndex" :class="cellState.rowClass" @click="setClickFun" @keydown="handleKeyDown">
				<div :class="cellState.leftContentClass">
					<slot v-if="$slots.left" name="left" />
					<div v-else-if="left" :class="cellState.leftIconWrapClass">
						<Icon v-bind="left" />
					</div>
					<div :class="cellState.titleClass">
						<div :class="cellState.titleTextClass">{{ title }}</div>
						<div :class="cellState.subTitleClass">{{ subTitle }}</div>
					</div>
				</div>
				<div :class="cellState.rightContentClass">
					<div :class="cellState.detailClass">
						<slot v-if="$slots.detail" name="detail" />
						<div v-else-if="detail" :class="cellState.detailTextClass">{{ detail }}</div>
						<div :class="cellState.infoClass">{{ info }}</div>
					</div>
					<slot v-if="$slots.right" name="right" />
					<div v-else-if="cellState.rightState.kind === 'arrow'" :class="cellState.rightArrowAccessoryClass">
						<!-- 公共箭头 SVG 数据在 common 中维护。 / Shared arrow SVG data lives in common. -->
						<SvgIcon
							:svg="arrowRightSvg"
							:width="cellState.rightState.arrowSize"
							:height="cellState.rightState.arrowSize"
							:class-name="cellState.rightArrowIconClass"
						/>
					</div>
					<div v-else-if="cellState.rightState.kind === 'switch'" :class="cellState.rightAccessoryClass" @click.stop>
						<Switch v-model:active="innerSwitchActive" v-bind="cellState.rightState.switchProps" />
					</div>
					<div v-else-if="cellState.rightState.kind === 'icon'" :class="cellState.rightAccessoryClass">
						<Icon v-bind="cellState.rightState.iconProps" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
