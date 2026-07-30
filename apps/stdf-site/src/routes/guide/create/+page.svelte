<script lang="ts">
	import { mdTextToHljs, groupIconMdPlugin } from '../../../utils/index';

	// @ts-ignore
	import createText from '../../../../../../content/stdf/guide/create.md';
	// @ts-ignore
	import createText_en from '../../../../../../content/stdf/guide/create_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = groupIconMdPlugin(
		(isZh ? mdTextToHljs(createText) : mdTextToHljs(createText_en)).replace(/<a href="/g, '<a target="_blank" href="')
	);
</script>

<article class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto max-w-full pb-8">
	{@html text}
</article>
