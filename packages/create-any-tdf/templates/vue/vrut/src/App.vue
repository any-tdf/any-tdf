<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Button, ButtonGroup, Calendar, Cell, ConfigProvider, Icon, Progress, Tab } from 'vtdf/components';
import { en_US, zh_CN } from 'vtdf/lang';
/* VTDF_THEME_IMPORT */
import { builtInIconLibraryLabelMap, builtInIconLibraryList, type BuiltInIconLibrary } from 'vtdf/svg';

const builtInIconLibraryStorageKey = 'built_in_icon_library';
const initialBuiltInIconLibrary = '__VTDF_BUILT_IN_ICON_LIBRARY__' as BuiltInIconLibrary;

const isBuiltInIconLibrary = (library: string | null): library is BuiltInIconLibrary =>
	typeof library === 'string' && (builtInIconLibraryList as readonly string[]).includes(library);

const getStoredBuiltInIconLibrary = (): BuiltInIconLibrary => {
	const storedLibrary = localStorage.getItem(builtInIconLibraryStorageKey);
	return isBuiltInIconLibrary(storedLibrary) ? storedLibrary : initialBuiltInIconLibrary;
};

const mode = ref<'dark' | 'primary'>(sessionStorage.getItem('mode') === 'dark' ? 'dark' : 'primary');
const lang = ref<'zh_CN' | 'en_US'>(localStorage.getItem('lang') === 'en_US' ? 'en_US' : 'zh_CN');
const builtInIconLibrary = ref<BuiltInIconLibrary>(getStoredBuiltInIconLibrary());
const percent = ref(20);
const visible = ref(false);
const isZh = computed(() => lang.value === 'zh_CN');
const locale = computed(() => (isZh.value ? zh_CN : en_US));
onMounted(() => {
	document.body.addEventListener('touchstart', () => {});
});

/* VTDF_THEME_STATE */

const builtInIconLibraryItems = computed(() => builtInIconLibraryList.map((item) => ({ text: builtInIconLibraryLabelMap[item] })));

const changeBuiltInIconLibraryFunc = (nextIndex: number) => {
	const nextLibrary = builtInIconLibraryList[nextIndex] || initialBuiltInIconLibrary;
	builtInIconLibrary.value = nextLibrary;
	localStorage.setItem(builtInIconLibraryStorageKey, nextLibrary);
};

const toggleModeFun = () => {
	mode.value = mode.value === 'dark' ? 'primary' : 'dark';
	sessionStorage.setItem('mode', mode.value);
};

const toggleLangFun = () => {
	lang.value = lang.value === 'zh_CN' ? 'en_US' : 'zh_CN';
	localStorage.setItem('lang', lang.value);
};

const reduceFunc = () => {
	percent.value = Math.max(percent.value - 10, 0);
};

const increaseFunc = () => {
	percent.value = Math.min(percent.value + 10, 100);
};
</script>

<template>
	<ConfigProvider :locale="locale" :theme="activeTheme" :mode="mode" :built-in-icon-library="builtInIconLibrary">
		<main class="mx-auto min-h-screen max-w-md bg-bg-base text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
			<div class="flex items-center justify-center gap-3 pt-10 text-center">
				<a class="flex w-10 flex-col items-center" href="https://vite.dev" target="_blank" rel="noreferrer">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">V</div>
				</a>
				<a class="flex w-10 flex-col items-center" href="https://vuejs.org" target="_blank" rel="noreferrer">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-success text-sm font-bold text-white">Vue</div>
				</a>
				<a class="flex w-10 flex-col items-center" href="https://unocss.dev" target="_blank" rel="noreferrer">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">U</div>
				</a>
				<a class="flex w-10 flex-col items-center" href="https://vtdf.dev" target="_blank" rel="noreferrer">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-text-on-primary dark:bg-dark dark:text-text-on-dark"
					>
						VT
					</div>
				</a>
			</div>

			<div class="my-6 text-center text-xs">
				<template v-if="isZh">
					<p>这是 Vite、Vue、UnoCSS、TypeScript 与 VTDF 构建的模板。</p>
					<p class="mt-2">点击上方 LOGO 了解更多。</p>
				</template>
				<template v-else>
					<p>This is a template using Vite, Vue, UnoCSS, TypeScript, and VTDF.</p>
					<p class="mt-2">Click the logo above to learn more.</p>
				</template>
			</div>

			<div class="my-6">
				<Cell
					:title="isZh ? '暗模式' : 'Dark mode'"
					:right="{ type: 'switch', switch: { active: mode === 'dark' } }"
					@click="toggleModeFun"
				/>
			</div>

			<div class="my-6 px-4">
				<div class="mb-3 text-center text-sm font-bold">{{ isZh ? '当前进度' : 'Current progress' }}: {{ percent }}%</div>
				<Progress :percent="percent" />
			</div>

			<div class="mb-8">
				<ButtonGroup fill="lineState" height-in="0" size="full">
					<button class="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black" @click="reduceFunc">-10</button>
					<button class="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black" @click="increaseFunc">+10</button>
					<button class="flex-1 py-2 active:opacity-80" @click="percent = 20">{{ isZh ? '重置' : 'Reset' }}</button>
				</ButtonGroup>
			</div>

			<div class="my-6">
				<Button fill="lineState" @click="visible = true">{{ isZh ? '日历' : 'Calendar' }}</Button>
			</div>
			<Calendar v-model:visible="visible" />

			<!-- VTDF_ICON_EXAMPLES -->

			<div class="my-6">
				<Button @click="toggleLangFun">{{ isZh ? '切换语言' : 'Toggle language' }}</Button>
			</div>

			<!-- VTDF_THEME_CONTROL -->

			<div class="my-6 px-4">
				<div class="mb-3 text-center text-sm font-bold">
					{{ isZh ? '内置图标库' : 'Built-in icons' }}: {{ builtInIconLibraryLabelMap[builtInIconLibrary] }}
				</div>
				<ButtonGroup :items="builtInIconLibraryItems" fill="lineState" height-in="0" size="full" @click="changeBuiltInIconLibraryFunc" />
			</div>
		</main>
	</ConfigProvider>
</template>
