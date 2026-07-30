<script lang="ts">
	import { mdTextToHljs } from '../../../utils/index';

	// @ts-ignore
	import utils from '../../../../../../content/stdf/guide/utils.md';
	// @ts-ignore
	import utils_en from '../../../../../../content/stdf/guide/utils_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = mdTextToHljs((isZh ? utils : utils_en).replace(/<a href="/g, '<a target="_blank" href="'));
</script>

<article class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto max-w-full pb-12">
	{@html text}
</article>
