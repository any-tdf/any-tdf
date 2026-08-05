<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { groupIconMdPlugin, mdTextToHljs } from '../../utils';
import { appState } from '../../store/appStore';
import ColorPage from './ColorPage.vue';
import LogoPage from './LogoPage.vue';
import ShortkeyPage from './ShortkeyPage.vue';
import BuiltInIconGallery from './BuiltInIconGallery.vue';

const props = defineProps<{
	currentNav: string;
}>();

// 指南 md 文件（doc 文件名与 nav 不同的条目在此映射）
const guideDocs = import.meta.glob('../../../../../content/vtdf/guide/*.md', { import: 'default' });

const navDocMap: Record<string, string> = {
	'quick-start': 'quickStart',
	'icon-plugin': 'iconPlugin',
	create: 'create',
	md: 'mdPlugin'
};

// groupIconMdPlugin 在 mdTextToHljs 之后调用
const groupAfterPages = new Set(['quick-start', 'contribution', 'icon', 'create']);
// groupIconMdPlugin 在 mdTextToHljs 之前调用
const groupBeforePages = new Set(['icon-plugin', 'md']);

const isZh = computed(() => appState.lang === 'zh_CN');
const isCustomPage = computed(() => ['color', 'logo', 'shortkey'].includes(props.currentNav));
const html = ref('');
const loading = ref(true);
const builtInIconGalleryMarker = '<!-- built-in-icon-gallery -->';
const htmlParts = computed(() => html.value.split(builtInIconGalleryMarker));
const showBuiltInIconGallery = computed(() => props.currentNav === 'icon' && htmlParts.value.length > 1);
let loadDocSeq = 0;

const renderMd = (mdStr: string) => {
	const withTargetBlank = (input: string) => input.replace(/<a href="/g, '<a target="_blank" href="');
	if (groupBeforePages.has(props.currentNav)) {
		return mdTextToHljs(withTargetBlank(groupIconMdPlugin(mdStr)));
	}
	if (groupAfterPages.has(props.currentNav)) {
		return groupIconMdPlugin(withTargetBlank(mdTextToHljs(mdStr)));
	}
	return mdTextToHljs(withTargetBlank(mdStr));
};

const loadDoc = async () => {
	const seq = (loadDocSeq += 1);
	loading.value = true;
	if (isCustomPage.value) {
		html.value = '';
		loading.value = false;
		return;
	}
	const docKey = navDocMap[props.currentNav] || props.currentNav;
	const fileName = `${docKey}${isZh.value ? '' : '_en'}.md`;
	const filePath = Object.keys(guideDocs).find((key) => key.endsWith(`/guide/${fileName}`));
	if (!filePath) {
		html.value = '';
		loading.value = false;
		return;
	}
	const mdStr = (await guideDocs[filePath]()) as string;
	if (seq !== loadDocSeq) return;
	html.value = renderMd(mdStr);
	loading.value = false;
};

watch(() => [props.currentNav, appState.lang], loadDoc, { immediate: true });
</script>

<template>
	<ColorPage v-if="currentNav === 'color'" />
	<LogoPage v-else-if="currentNav === 'logo'" />
	<ShortkeyPage v-else-if="currentNav === 'shortkey'" />
	<div v-else-if="loading" class="mx-auto max-w-full pb-12 text-sm text-(--site-text-muted)">
		{{ isZh ? '请等待...' : 'Please wait...' }}
	</div>
	<article
		v-else
		class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark prose-table:break-all prose-td:whitespace-nowrap md:prose-td:whitespace-normal mx-auto max-w-full overflow-x-auto"
		:class="['quick-start', 'theme', 'utils'].includes(currentNav) ? 'pb-12' : 'pb-8'"
	>
		<template v-if="showBuiltInIconGallery">
			<div v-html="htmlParts[0]"></div>
			<BuiltInIconGallery />
			<div v-html="htmlParts.slice(1).join(builtInIconGalleryMarker)"></div>
		</template>
		<div v-else v-html="html"></div>
	</article>
</template>
