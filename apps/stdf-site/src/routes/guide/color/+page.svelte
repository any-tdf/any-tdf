<script lang="ts">
	import Color from './Color.svelte';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
</script>

<svelte:head>
	<title>STDF - {isZh ? '色彩' : 'Color'}</title>
	<meta name="description" content={isZh ? 'STDF 移动 web 组件库 - 色彩' : 'STDF mobile web component library - Color'} />
</svelte:head>

<Color />
