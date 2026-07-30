<script lang="ts">
	import { setContext, untrack, type Snippet } from 'svelte';
	import { defaultBuiltInIconLibrary, type BuiltInIconLibrary } from '@any-tdf/common/svg';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import { feedbackState } from '../feedback/state.svelte.js';
	import { builtInIconLibraryContextKey } from '../utils/builtInSvg.js';

	type ConfigProviderProps = {
		locale?: LangProps;
		builtInIconLibrary?: BuiltInIconLibrary;
		children?: Snippet;
	};

	let { locale = zh_CN, builtInIconLibrary = defaultBuiltInIconLibrary, children }: ConfigProviderProps = $props();

	setContext('STDF_lang', untrack(() => locale));
	setContext(builtInIconLibraryContextKey, () => builtInIconLibrary);

	$effect(() => {
		feedbackState.lang = locale;
	});
</script>

{@render children?.()}
