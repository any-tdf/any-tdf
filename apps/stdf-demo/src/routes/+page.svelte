<script lang="ts">
	import { CellGroup, Cell } from 'stdf';
	import { menuList, type MenuListChild } from '@any-tdf/site-common/data';

	const menuListArr: MenuListChild[] = menuList.reduce((acc, cur) => {
		if (cur.childs) {
			acc.push(...cur.childs);
		}
		return acc;
	}, [] as MenuListChild[]);
	const isZh = sessionStorage.getItem('lang') === 'zh_CN';
	const changeLangFunc = () => {
		sessionStorage.setItem('lang', isZh ? 'en_US' : 'zh_CN');
		window.location.reload();
	};
</script>

<div class="mb-2 mt-8 flex h-14 flex-col items-center justify-center">
	<svg viewBox="0 0 90 80">
		<path
			class="fill-primary dark:fill-dark"
			d="M0 0H20H40H50C64.8056 0 77.7325 8.04398 84.6487 20H50H40V22.6757V30H50C55.5229 30 60 34.4771 60 40C60 45.5229 55.5229 50 50 50H40V57.3243V78.7398V80H20V66.4583V20H15.3513H0V0ZM50 80C72.0914 80 90 62.0914 90 40C90 36.547 89.5625 33.1962 88.7398 30H67.3244C69.0261 32.9417 70 36.3571 70 40C70 51.0457 61.0457 60 50 60V80Z"
		/>
		<path class="fill-dark dark:fill-primary" d="M20 30V0L0 50H20V80L40 30H20Z" />
	</svg>
</div>
<a href="https://stdf.dev" target="_blank" rel="noreferrer">
	<div class="text-center text-lg underline">stdf.dev</div>
</a>
<div class="flex flex-col py-4">
	<div>
		{#each menuList as menu (menu.class)}
			<div class="mb-2 mt-8 px-4 text-sm text-gray-500">{isZh ? menu.class : menu.class_en}</div>
			<CellGroup>
				{#each menu.childs as child, i (child.nav)}
					<a href={child.nav + (isZh ? '/zh_CN' : '/en_US')}>
						<Cell
							title={isZh ? child.title : child.title_en}
							mx="0"
							my="0"
							shadow="none"
							radius="none"
							line={i !== menu.childs.length - 1}
						/>
					</a>
				{/each}
			</CellGroup>
		{/each}
	</div>
	<div class="p-4">{isZh ? '当前组件总数：' : 'Current number of components: '}{menuListArr.length}</div>
	<div class="text-primary dark:text-dark flex justify-around p-4 text-xs underline">
		<button on:click={changeLangFunc} class="text-primary dark:text-dark">{isZh ? 'English' : '简体中文'}</button>
	</div>
</div>
