<script lang="ts">
	import { mdTextToHljs, groupIconMdPlugin } from '../../../utils/index';

	// @ts-ignore
	import text from '../../../../../../content/stdf/guide/contribution.md';
	// @ts-ignore
	import text_en from '../../../../../../content/stdf/guide/contribution_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const hljsText = groupIconMdPlugin(mdTextToHljs(isZh ? text : text_en).replace(/<a href="/g, '<a target="_blank" href="'));
</script>

<svelte:head>
	<title>STDF - {isZh ? '贡献指南' : 'Contribution Guide'}</title>
	<meta name="description" content={isZh ? 'STDF 移动 web 组件库 - 贡献指南' : 'STDF mobile web component library - Contribution Guide'} />
</svelte:head>

<article class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto max-w-full pb-8">
	{@html hljsText}
</article>
