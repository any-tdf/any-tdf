<script setup lang="ts">
import { computed, h } from 'vue';
import * as VTDFComponents from 'vtdf/components';
import { demoSamples } from './demoSamples';

const props = defineProps<{
	nav: string;
	lang: 'zh_CN' | 'en_US';
}>();

const nativePages = import.meta.glob('./pages/*/*.vue', { eager: true });
const samples = computed(() => demoSamples[props.nav] || []);
const nativePage = computed(() => {
	const key = `./pages/${props.nav}/${props.lang}.vue`;
	const module = nativePages[key] as { default?: unknown } | undefined;
	return module?.default;
});

const renderSample = (sample: (typeof samples.value)[number]) => {
	const component = (VTDFComponents as Record<string, unknown>)[sample.component];
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
