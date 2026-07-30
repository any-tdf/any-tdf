<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { TabBarProps } from '../types';
import Icon from './Icon.vue';
import {
	resolveTabBarClickAction,
	resolveTabBarDerived,
	resolveTabBarMeasuredClientWidth,
	resolveTabBarStateOptions
} from '@any-tdf/common/derived/tabBar';

const props = withDefaults(defineProps<TabBarProps & {}>(), {
	labels: () => [],
	active: 0,
	line: false,
	lineW: 4,
	love: false,
	injClass: '',
	tabInjClass: '',
	activeTabInjClass: '',
	activeInjClass: ''
});

const emit = defineEmits<{
	'update:active': [active: number];
	change: [active: number];
}>();

const containerRef = ref<HTMLDivElement | null>(null);
const tabW = ref(0);
const internalActive = ref(props.active);

// 公共派生层只处理 TabBar 状态推导，事件和宽度测量留在组件内。
// The shared derived layer only handles TabBar state derivation; events and width measurement stay in the component.
const tabBarState = computed(() =>
	resolveTabBarDerived(
		resolveTabBarStateOptions({
			props: {
				labels: props.labels,
				line: props.line,
				lineW: props.lineW,
				love: props.love,
				injClass: props.injClass,
				tabInjClass: props.tabInjClass,
				activeTabInjClass: props.activeTabInjClass,
				activeInjClass: props.activeInjClass
			},
			active: internalActive.value,
			tabWidth: tabW.value
		})
	)
);

const updateWidth = () => {
	tabW.value = resolveTabBarMeasuredClientWidth(containerRef.value);
};

const clickTab = (index: number) => {
	// 公共动作函数只返回 active 更新结果，组件层负责状态写入和事件触发。
	// Shared action function only returns the active update result; the component writes state and fires events.
	const action = resolveTabBarClickAction({ index });
	internalActive.value = action.nextActive;
	emit('update:active', action.nextActive);
	if (action.shouldEmit) emit('change', action.nextActive);
};

watch(
	() => props.active,
	(nextActive) => {
		internalActive.value = nextActive;
	}
);

onMounted(() => {
	updateWidth();
	window.addEventListener('resize', updateWidth);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateWidth);
});
</script>

<template>
	<div ref="containerRef" :class="tabBarState.rootClass" :style="tabBarState.rootStyleValue">
		<div v-if="tabBarState.showIndicator" :class="tabBarState.indicatorClass" :style="tabBarState.indicatorStyleValue" />
		<div :class="tabBarState.listClass">
			<button
				v-for="itemState in tabBarState.items"
				:key="itemState.index"
				type="button"
				:class="itemState.buttonClass"
				@click="clickTab(itemState.index)"
			>
				<div v-if="itemState.hasIcon" :class="itemState.iconWrapClass">
					<Icon v-bind="itemState.iconProps" />
				</div>
				<div v-if="itemState.hasText" :class="itemState.textClass">
					{{ itemState.label.text }}
				</div>
			</button>
		</div>
	</div>
</template>
