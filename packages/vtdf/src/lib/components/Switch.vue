<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue';
import type { SwitchProps } from '../types';
import {
	resolveSwitchActiveSyncAction,
	resolveSwitchClickAction,
	resolveSwitchDerived,
	resolveSwitchStateOptions,
	resolveSwitchStretchFlow
} from '@any-tdf/common/derived/switch';
import Loading from './Loading.vue';

const props = withDefaults(defineProps<SwitchProps & {}>(), {
	active: false,
	radius: '',
	inside: null,
	injClass: '',
	disabled: false,
	async: false,
	loading: () => ({})
});

const emit = defineEmits<{
	'update:active': [active: boolean];
	change: [active: boolean];
	click: [];
}>();

const slots = useSlots();
const active = ref(props.active);
const isLong = ref(false);

// 公共派生层只处理 Switch 的 class 字符串、滑块样式和下一状态，事件与 slot 留在组件内。
// Shared derived layer only handles Switch class strings, thumb styles and next state; events and slots stay in the component.
const switchState = computed(() =>
	resolveSwitchDerived(
		resolveSwitchStateOptions({
			props: {
				disabled: props.disabled,
				radius: props.radius,
				injClass: props.injClass,
				inside: props.inside
			},
			active: active.value,
			isLong: isLong.value,
			hasTrueChild: Boolean(slots.true),
			hasFalseChild: Boolean(slots.false)
		})
	)
);

watch(
	() => props.active,
	(nextActive) => {
		// 公共 action 只返回是否同步内部 active，状态写入留在组件层。
		// Shared action only returns whether to sync internal active; state writes stay in the component layer.
		const action = resolveSwitchActiveSyncAction({ active: nextActive, disabled: props.disabled });
		if (action.shouldSync) active.value = action.nextActive;
	}
);

watch(active, () => {
	// 公共 action 只返回拉伸反馈决策，计时器生命周期留在组件层。
	// Shared action only returns stretch feedback decisions; timer lifecycle stays in the component layer.
	const flow = resolveSwitchStretchFlow({ disabled: props.disabled });
	if (!flow.shouldStretch) return;
	isLong.value = flow.nextIsLong;
	setTimeout(() => {
		isLong.value = flow.resetNextIsLong;
	}, flow.resetDelay);
});

const setChangeFun = () => {
	// 公共动作函数只返回更新和事件触发决策，组件层负责状态写入。
	// Shared action function only returns update and event decisions; the component writes state.
	const action = resolveSwitchClickAction({
		active: active.value,
		disabled: props.disabled,
		async: props.async
	});
	if (action.shouldChange) {
		active.value = action.nextActive;
		emit('update:active', action.nextActive);
		emit('change', action.nextActive);
	}
	if (action.shouldClick) emit('click');
};
</script>

<template>
	<button type="button" :disabled="disabled" :class="switchState.rootClass" @click="setChangeFun">
		<div :class="switchState.thumbClass" :style="switchState.thumbStyle">
			<template v-if="switchState.insideState.kind === 'state'">
				<div v-if="switchState.insideState.active" :class="switchState.stateTrueMarkClass" />
				<div v-else :class="switchState.stateFalseMarkClass" />
			</template>
			<div v-else-if="switchState.insideState.kind === 'loading'" :class="switchState.loadingClass">
				<Loading width="full" height="full" v-bind="loading" />
			</div>
			<template v-else-if="switchState.insideState.kind === 'children'">
				<span :class="switchState.insideState.trueClass"><slot name="true" /></span>
				<span :class="switchState.insideState.falseClass"><slot name="false" /></span>
			</template>
			<template v-else-if="switchState.insideState.kind === 'array'">
				<span>{{ switchState.insideState.value }}</span>
			</template>
		</div>
	</button>
</template>
