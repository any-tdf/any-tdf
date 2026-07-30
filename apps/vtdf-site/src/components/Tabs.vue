<script setup lang="ts">
import { computed, ref } from 'vue';
import { Tabs } from 'vtdf/components';
import { appState } from '../store/appStore';
import { encodeData, rendererLine } from 'beautify-qrcode';

const props = withDefaults(
	defineProps<{
		currentTab?: number;
	}>(),
	{
		currentTab: 0
	}
);

const emit = defineEmits<{
	change: [index: number];
}>();

const isZh = computed(() => appState.lang === 'zh_CN');
const tabList = [
	{ zh: '示例', en: 'Demo' },
	{ zh: 'API', en: 'API' },
	{ zh: '指南', en: 'Guide' },
	{ zh: 'FAQ', en: 'FAQ' },
	{ zh: '版本', en: 'Version' }
];
const tabLabels = computed(() => tabList.map((item) => ({ text: isZh.value ? item.zh : item.en })));

const nav = computed(() => new URLSearchParams(appState.search).get('nav') ?? 'button');
const navClassName = computed(() => nav.value.slice(0, 1).toUpperCase() + nav.value.slice(1));
const demoBaseUrl = computed(() => (import.meta.env.DEV ? `${location.protocol}//${location.hostname}:8886/` : 'https://demo.vtdf.dev/'));
const demoUrl = computed(() => `${demoBaseUrl.value}${nav.value}/${isZh.value ? 'zh_CN' : 'en_US'}`);
const sourceUrl = computed(
	() => `https://github.com/any-tdf/any-tdf/blob/main/packages/vtdf/src/lib/components/${nav.value}/${navClassName.value}.vue`
);
const stackblitzUrl = computed(
	() =>
		`https://stackblitz.com/github/any-tdf/any-tdf?file=apps%2Fvtdf-demo%2Fsrc%2Fpages%2F${nav.value}%2F${isZh.value ? 'zh_CN' : 'en_US'}.vue&startScript=dev%3Avtdf`
);
const previewQrOpen = ref(false);
const previewQrSvg = ref('');

const openPreviewQr = () => {
	const qrcode = encodeData({ text: demoUrl.value, isSpace: false });
	const color = appState.currentThemeMode === 'dark' ? 'var(--color-dark)' : 'var(--color-primary)';
	previewQrSvg.value = rendererLine(qrcode, {
		posType: 2,
		otherColor: color,
		posColor: color
	});
	previewQrOpen.value = true;
};

const selectTab = (index: number) => {
	emit('change', index);
};
</script>

<template>
	<div class="tab-shell">
		<div class="tab-control" role="group" :aria-label="isZh ? '组件文档类型' : 'Component documentation type'">
			<Tabs
				:active="props.currentTab"
				:transition="false"
				:tab="{
					labels: tabLabels,
					mx: '0',
					radius: 'sm',
					injClass: 'component-doc-tabs',
					tabInjClass: 'component-doc-tab',
					activeTabInjClass: 'component-doc-tab-active'
				}"
				@change="selectTab"
			/>
		</div>
		<div class="tab-tools">
			<a :href="demoUrl" target="_blank" rel="noreferrer">Demo ↗</a>
			<a :href="sourceUrl" target="_blank" rel="noreferrer">Source ↗</a>
			<a :href="stackblitzUrl" target="_blank" rel="noreferrer">StackBlitz ↗</a>
			<div
				class="tab-preview-action"
				@mouseenter="openPreviewQr"
				@mouseleave="previewQrOpen = false"
				@focusin="openPreviewQr"
				@focusout="previewQrOpen = false"
			>
				<a :href="demoUrl" target="_blank" rel="noreferrer">{{ isZh ? '移动端预览' : 'Mobile preview' }} ↗</a>
				<div v-if="previewQrOpen" class="tab-preview-qr">
					<div class="tab-preview-qr-code" v-html="previewQrSvg"></div>
					<div>{{ isZh ? '扫码打开移动端预览' : 'Scan to open mobile preview' }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
