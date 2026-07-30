<script lang="ts">
	import { mdTextToHljs, groupIconMdPlugin } from '../../../utils/index';
	import BuiltInIconGallery from './BuiltInIconGallery.svelte';

	// @ts-ignore
	import text from '../../../../../../content/stdf/guide/icon.md';
	// @ts-ignore
	import text_en from '../../../../../../content/stdf/guide/icon_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const hljsText = groupIconMdPlugin(mdTextToHljs((isZh ? text : text_en).replace(/<a href="/g, '<a target="_blank" href="')));
	const builtInIconGalleryMarker = '<!-- built-in-icon-gallery -->';
	const htmlParts = hljsText.split(builtInIconGalleryMarker);
	const showBuiltInIconGallery = htmlParts.length > 1;
</script>

<article class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto max-w-full pb-8">
	{#if showBuiltInIconGallery}
		{@html htmlParts[0]}
		<BuiltInIconGallery />
		{@html htmlParts.slice(1).join(builtInIconGalleryMarker)}
	{:else}
		{@html hljsText}
	{/if}
</article>
