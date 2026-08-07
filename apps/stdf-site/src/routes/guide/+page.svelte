<script lang="ts">
	import { mdTextToHljs, groupIconMdPlugin } from '../../utils/index';

	// @ts-ignore
	import quickStartText from '../../../../../content/stdf/guide/quickStart.md';
	// @ts-ignore
	import quickStartText_en from '../../../../../content/stdf/guide/quickStart_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = groupIconMdPlugin(
		mdTextToHljs(isZh ? quickStartText : quickStartText_en).replace(/<a href="/g, '<a target="_blank" href="')
	);
</script>

<svelte:head>
	<title>STDF - {isZh ? '快速上手' : 'Quick start'}</title>
	<meta name="description" content={isZh ? 'STDF 移动 web 组件库 - 快速上手' : 'STDF mobile web component library - Quick start'} />
</svelte:head>

<article class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto max-w-full pb-12">
	{@html text}
</article>
