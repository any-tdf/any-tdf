<script lang="ts">
	import { mdTextToHljs, groupIconMdPlugin } from '../../../utils/index';

	// @ts-ignore
	import iconPluginText from '../../../../../../content/stdf/guide/iconPlugin.md';
	// @ts-ignore
	import iconPluginText_en from '../../../../../../content/stdf/guide/iconPlugin_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = mdTextToHljs(
		(isZh ? groupIconMdPlugin(iconPluginText) : groupIconMdPlugin(iconPluginText_en)).replace(/<a href="/g, '<a target="_blank" href="')
	);
</script>

<svelte:head>
	<title>STDF - {isZh ? '图标插件' : 'Icon plugin'}</title>
	<meta name="description" content={isZh ? 'STDF 移动 web 组件库 - 图标插件' : 'STDF mobile web component library - Icon plugin'} />
</svelte:head>

<article class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto max-w-full pb-8">
	{@html text}
</article>
