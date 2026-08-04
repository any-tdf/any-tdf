<script lang="ts">
	import { NavBar } from 'stdf';

	const lang = localStorage.getItem('lang') === 'en_US' ? 'en_US' : 'zh_CN';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="sticky top-0 z-10">
	<NavBar title={lang === 'zh_CN' ? '关于' : 'ABOUT'} onclickLeft={() => window.history.back()} />
</div>

<div class="space-y-10 px-2 py-20 text-center">
	<div class="text-primary dark:text-dark text-3xl">{lang === 'zh_CN' ? '这是一个关于页面' : 'This is a about page'}</div>
	<div class="text-sm">
		{lang === 'zh_CN' ? '仅用于演示 SvelteKit 的路由功能' : "Only for demonstration of SvelteKit's routing functionality"}
	</div>
</div>
