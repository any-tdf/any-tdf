<script lang="ts">
	import { mdTextToHljs } from '../../../utils/index';

	// @ts-ignore
	import text from '../../../../../../content/stdf/guide/vscode.md';
	// @ts-ignore
	import text_en from '../../../../../../content/stdf/guide/vscode_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const hljsText = mdTextToHljs((isZh ? text : text_en).replace(/<a href="/g, '<a target="_blank" href="'));
</script>

<svelte:head>
	<title>STDF - {isZh ? 'IDE 插件' : 'IDE plugin'}</title>
	<meta name="description" content={isZh ? 'STDF 移动 web 组件库 - IDE 插件' : 'STDF mobile web component library - IDE plugin'} />
</svelte:head>

<article class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto max-w-full pb-8">
	{@html hljsText}
</article>
