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
const isChangelog = computed(() => props.currentNav === 'changelog');
let loadDocSeq = 0;

//提取字符中以‘[!tag’开头且以‘]’结尾的所有字符串，组成数组，并返回数组
const getTags = (str: string) => str.match(/\[!tag[^\]]+\]/g);
//提取字符中以‘[!issue‘开头且以‘]’结尾的所有字符串，组成数组，并返回数组
const getIssues = (str: string) => str.match(/\[!issue[^\]]+\]/g);
//提取字符中以‘[!contribute‘开头且以‘]’结尾的所有字符串，组成数组，并返回数组
const getContributes = (str: string) => str.match(/\[!contribute[^\]]+\]/g);
const spanTextFun = (type: 'A' | 'B' | 'O', index: '1' | '2' | '3') => {
	const typeMap = { A: '💪', O: '👌' };
	const indexMap = { '1': '👊', '2': '✊', '3': '👎' };
	if (type === 'O' || type === 'A') {
		return typeMap[type];
	} else {
		return indexMap[index];
	}
};
//替换 Markdown 中的标签（更新日志）
const replaceTags = (string: string) => {
	//替换 tag
	const tagList = getTags(string);
	if (tagList) {
		tagList.forEach((item) => {
			const arr: string[] = item.split('|');
			const span = `<span class="mr-1">${spanTextFun(arr[1] as 'A' | 'B' | 'O', arr[2] as '1' | '2' | '3')}</span>`;
			string = string.replace(item, span);
		});
	}
	//替换 issue
	const issueList = getIssues(string);
	if (issueList) {
		issueList.forEach((item) => {
			const arr = item.split('|');
			const span = `<span><a href="https://github.com/${
				arr[1]
			}" target="_blank"><img class="w-4 h-4 ml-1 p-0 m-0 rounded-full overflow-hidden inline" src="https://avatars.githubusercontent.com/${
				arr[1]
			}" title="${isZh.value ? '感谢' : 'Thanks '} ${arr[1]} ${isZh.value ? '提出 Issue' : 'raise an Issue'}" alt=""></a></span>`;
			string = string.replace(item, span);
		});
	}
	//替换 contribute
	const contributeList = getContributes(string);
	if (contributeList) {
		contributeList.forEach((item) => {
			const arr = item.split('|');
			const span = `<span><a href="https://github.com/${
				arr[1]
			}" target="_blank"><img class="w-4 h-4 ml-1 p-0 m-0 rounded-full overflow-hidden inline" src="https://avatars.githubusercontent.com/${
				arr[1]
			}" title="${isZh.value ? '感谢' : 'Thanks '} ${arr[1]} ${isZh.value ? '贡献代码' : 'contribute code'}" alt=""></a></span>`;
			string = string.replace(item, span);
		});
	}
	return string;
};

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
		v-else-if="isChangelog"
		class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto max-w-full pb-8 text-xs"
	>
		<p class="mb-4 text-xs text-black/40 dark:text-white/30">
			{{
				isZh
					? '注：此处仅展示站点更新说明或总体概述，具体组件更新内容请查看组件内部更新日志。描述后面的头像表示此项的提出者或贡献者，感谢他们。发布时间格式均为 GMT+8。'
					: 'Note: Only the site update instructions or general overview are displayed here. For the specific component update content, please refer to the update log inside the component. The avatars after the description represent the submitter or contributor, thank them for their contribution. The release time format is GMT+8.'
			}}
		</p>
		<div v-html="replaceTags(html)"></div>
	</article>
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
