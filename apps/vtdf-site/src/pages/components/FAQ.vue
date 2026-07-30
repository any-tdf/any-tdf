<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { mdTextToHljs } from '../../utils/index';
import { appState } from '../../store/appStore';

const props = withDefaults(
	defineProps<{
		guide?: string;
	}>(),
	{
		guide: 'button'
	}
);

const faqModules = import.meta.glob('../../../../../content/vtdf/components/*/FAQ*.md', { import: 'default' });

const isZh = computed(() => appState.lang === 'zh_CN');
const loading = ref(true);
const guideText = ref<string | null>(null);

const editUrl = computed(
	() => `https://github.com/any-tdf/any-tdf/edit/main/content/vtdf/components/${props.guide}/FAQ${isZh.value ? '' : '_en'}.md`
);

const load = async () => {
	loading.value = true;
	const filePath = Object.keys(faqModules).find((key) => key.endsWith(`/components/${props.guide}/FAQ${isZh.value ? '' : '_en'}.md`));
	if (!filePath) {
		guideText.value = null;
		loading.value = false;
		return;
	}
	const mdStr = (await faqModules[filePath]()) as string;
	guideText.value = mdTextToHljs(mdStr.replace(/<a href="/g, '<a target="_blank" href="'));
	loading.value = false;
};

watch(() => [props.guide, appState.lang], load, { immediate: true });
</script>

<template>
	<p class="mb-4 text-xs text-black/40 dark:text-white/30">
		{{
			isZh
				? '注：请将开发中遇到的问题或想法提到 GitHub Issue，后续会筛选出有代表性的问题整理在此处。'
				: 'Note: Please raise any issues or ideas encountered in development to GitHub Issue, and then select representative issues to organize here.'
		}}
	</p>
	<article
		class="prose dark:prose-invert prose-table:break-all prose-td:whitespace-nowrap md:prose-td:whitespace-normal max-w-none overflow-x-auto pb-12"
	>
		<template v-if="loading">{{ isZh ? '请等待...' : 'Please wait...' }}</template>
		<div v-else v-html="guideText"></div>
	</article>
	<div class="flex gap-2 pb-8 text-xs">
		<a :href="editUrl" target="_blank" class="text-primary dark:text-dark flex">
			<span class="mr-1 h-4 w-4">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" style="fill: currentColor">
					<path
						d="M12.8995 6.85431L17.1421 11.0969L7.24264 20.9964H3V16.7538L12.8995 6.85431ZM14.3137 5.44009L16.435 3.31877C16.8256 2.92825 17.4587 2.92825 17.8492 3.31877L20.6777 6.1472C21.0682 6.53772 21.0682 7.17089 20.6777 7.56141L18.5563 9.68273L14.3137 5.44009Z"
					/>
				</svg>
			</span>
			{{ isZh ? '在 GitHub 上编辑' : 'Edit on GitHub' }}
		</a>
	</div>
</template>
