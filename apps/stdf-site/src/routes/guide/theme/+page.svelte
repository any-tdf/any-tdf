<script lang="ts">
	import { mdTextToHljs } from '../../../utils/index';

	// @ts-ignore
	import theme from '../../../../../../content/stdf/guide/theme.md';
	// @ts-ignore
	import theme_en from '../../../../../../content/stdf/guide/theme_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = mdTextToHljs((isZh ? theme : theme_en).replace(/<a href="/g, '<a target="_blank" href="'));
</script>

<svelte:head>
	<title>STDF - {isZh ? '主题配置' : 'Theme'}</title>
	<meta name="description" content={isZh ? 'STDF 移动 web 组件库 - 主题配置' : 'STDF mobile web component library - Theme'} />
</svelte:head>

<article class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto max-w-full pb-12">
	{@html text}
</article>
