<script lang="ts">
	const isZh = localStorage.getItem('lang') === 'zh_CN';
</script>

<svelte:head>
	<title>STDF - {isZh ? '快捷键' : 'Shortcut key'}</title>
	<meta name="description" content={isZh ? 'STDF 移动 web 组件库 - 快捷键' : 'STDF mobile web component library - Shortcut key'} />
</svelte:head>

<article class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto hidden max-w-full pb-8 md:block">
	{#if isZh}
		<h2>全站</h2>
		<ul>
			<li>唤起或关闭组件快速搜索框：<b>⌘ + K（Ctrl + K）</b>。</li>
			<li>快速搜索显示时：上下方向键切换选项，回车键选择，ESC 键聚焦输入框或关闭。</li>
		</ul>
		<h2>组件页面</h2>
		<ul>
			<li>上下方向键切换组件，左右方向键切换选项卡。</li>
		</ul>
	{:else}
		<h2>The whole website</h2>
		<ul>
			<li>Call up or close the component quick search box: <b>⌘ + K（Ctrl + K）</b>.</li>
			<li>
				When the quick search is displayed: use the up and down arrow keys to switch options, the enter key to select, and the ESC key to
				focus the input box or close it.
			</li>
		</ul>
		<h2>Componenst page</h2>
		<ul>
			<li>Use the up and down arrow keys to switch components, and the left and right arrow keys to switch tabs.</li>
		</ul>
	{/if}
</article>

<article class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark block max-w-5xl pb-12 md:hidden">
	{#if isZh}
		<p>快捷键仅用于桌面端。</p>
	{:else}
		<p>Keyboard shortcuts are only available on the desktop site.</p>
	{/if}
</article>
