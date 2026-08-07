<script setup lang="ts">
import { computed, defineAsyncComponent, h, type Component } from 'vue';
// 具名引入 demoSamples 实际用到的组件，保持 tree-shaking 有效
import {
	Accordion,
	ActionPopover,
	ActionSheet,
	Alert,
	AsyncPicker,
	Avatar,
	AvatarGroup,
	Badge,
	BottomSheet,
	Button,
	ButtonGroup,
	Calendar,
	Card,
	Cell,
	CharRoll,
	Checkbox,
	CodeInput,
	ColorPicker,
	CountDown,
	Dialog,
	Divider,
	Feedback,
	Form,
	FullKeyboard,
	Grids,
	Icon,
	ImageList,
	ImagePreview,
	IndexBar,
	Input,
	List,
	Loading,
	Mask,
	Modal,
	NavBar,
	NoticeBar,
	NumKeyboard,
	Pagination,
	Picker,
	Placeholder,
	Popup,
	Progress,
	ProgressLoop,
	Radio,
	Rate,
	Signature,
	Skeleton,
	Slider,
	Stepper,
	Steps,
	Swiper,
	Switch,
	TabBar,
	Tabs,
	Tag,
	TimePicker,
	Toast,
	Tooltip
} from 'vtdf/components';
import { demoSamples } from './demoSamples';

const props = defineProps<{
	nav: string;
	lang: 'zh_CN' | 'en_US';
}>();

// 按需加载 demo 页：去掉 eager，仅动态 import 当前路由对应的页面组件
const nativePages = import.meta.glob('./pages/*/*.vue');
const asyncPageCache = new Map<string, Component>();
const nativePage = computed(() => {
	const key = `./pages/${props.nav}/${props.lang}.vue`;
	const loader = nativePages[key];
	if (!loader) return null;
	let page = asyncPageCache.get(key);
	if (!page) {
		page = defineAsyncComponent(loader as () => Promise<{ default: Component }>);
		asyncPageCache.set(key, page);
	}
	return page;
});

// 组件名到组件的静态映射，避免命名空间动态索引阻断 tree-shaking
const sampleComponents: Record<string, Component> = {
	Accordion,
	ActionPopover,
	ActionSheet,
	Alert,
	AsyncPicker,
	Avatar,
	AvatarGroup,
	Badge,
	BottomSheet,
	Button,
	ButtonGroup,
	Calendar,
	Card,
	Cell,
	CharRoll,
	Checkbox,
	CodeInput,
	ColorPicker,
	CountDown,
	Dialog,
	Divider,
	Feedback,
	Form,
	FullKeyboard,
	Grids,
	Icon,
	ImageList,
	ImagePreview,
	IndexBar,
	Input,
	List,
	Loading,
	Mask,
	Modal,
	NavBar,
	NoticeBar,
	NumKeyboard,
	Pagination,
	Picker,
	Placeholder,
	Popup,
	Progress,
	ProgressLoop,
	Radio,
	Rate,
	Signature,
	Skeleton,
	Slider,
	Stepper,
	Steps,
	Swiper,
	Switch,
	TabBar,
	Tabs,
	Tag,
	TimePicker,
	Toast,
	Tooltip
};
const samples = computed(() => demoSamples[props.nav] || []);

const renderSample = (sample: (typeof samples.value)[number]) => {
	const component = sampleComponents[sample.component];
	if (!component) {
		return h('div', { class: 'rounded-box bg-error/10 p-4 text-error' }, `Missing component: ${sample.component}`);
	}
	return h(component as never, sample.props || {}, sample.slot ? () => sample.slot : undefined);
};
</script>

<template>
	<component :is="nativePage" v-if="nativePage" />
	<section v-else class="py-4">
		<div class="mx-4 mt-4 text-lg font-bold">{{ nav }} {{ lang === 'zh_CN' ? '示例' : 'Demo' }}</div>
		<div class="mx-4 mb-4 mt-1 text-xs opacity-70">
			{{ lang === 'zh_CN' ? '该页面用于验证 VTDF 组件和路由已接入。' : 'This page verifies that the VTDF component and route are wired.' }}
		</div>
		<div>
			<div v-for="(sample, index) in samples" :key="index" class="mx-4 mb-4">
				<component :is="{ render: () => renderSample(sample) }" />
			</div>
		</div>
	</section>
</template>
