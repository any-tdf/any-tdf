<script lang="ts">
	import { mdTextToHljs, groupIconMdPlugin } from '../../../utils/index';

	// @ts-ignore
	import mdPluginText from '../../../../../../content/stdf/guide/mdPlugin.md';
	// @ts-ignore
	import mdPluginText_en from '../../../../../../content/stdf/guide/mdPlugin_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = mdTextToHljs(
		(isZh ? groupIconMdPlugin(mdPluginText) : groupIconMdPlugin(mdPluginText_en)).replace(/<a href="/g, '<a target="_blank" href="')
	);
</script>

<article class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto max-w-full pb-8">
	{@html text}
</article>
