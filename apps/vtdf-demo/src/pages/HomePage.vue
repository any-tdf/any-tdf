<script setup lang="ts">
import { computed } from 'vue';
import { menuList, type MenuListChild } from '@any-tdf/site-common/data';
import { Cell, CellGroup } from 'vtdf/components';

const menuListArr = computed(() =>
	menuList.reduce((acc: MenuListChild[], cur) => {
		if (cur.childs) acc.push(...cur.childs);
		return acc;
	}, [])
);

const isZh = computed(() => sessionStorage.getItem('lang') === 'zh_CN');

const changeLang = () => {
	sessionStorage.setItem('lang', isZh.value ? 'en_US' : 'zh_CN');
	window.location.reload();
};
</script>

<template>
	<div>
		<div class="mb-2 mt-8 flex h-14 flex-col items-center justify-center">
			<img class="size-14 object-contain dark:hidden" src="/vtdf.svg" alt="VTDF" />
			<img class="hidden size-14 object-contain dark:block" src="/vtdf_dark.svg" alt="VTDF" />
		</div>
		<a href="https://vtdf.dev" target="_blank" rel="noreferrer">
			<div class="text-center text-lg underline">vtdf.dev</div>
		</a>
		<div class="flex flex-col py-4">
			<div>
				<div v-for="menu in menuList" :key="menu.class">
					<div class="mb-2 mt-8 px-4 text-sm text-gray-500">{{ isZh ? menu.class : menu.class_en }}</div>
					<CellGroup>
						<a v-for="(child, index) in menu.childs" :key="child.nav" :href="child.nav + (isZh ? '/zh_CN' : '/en_US')">
							<Cell
								:title="isZh ? child.title : child.title_en"
								mx="0"
								my="0"
								shadow="none"
								radius="none"
								:line="index !== menu.childs.length - 1"
							/>
						</a>
					</CellGroup>
				</div>
			</div>
			<div class="p-4">{{ isZh ? '当前组件总数：' : 'Current number of components: ' }}{{ menuListArr.length }}</div>
			<div class="text-primary dark:text-dark flex justify-around p-4 text-xs underline">
				<button type="button" class="text-primary dark:text-dark" @click="changeLang">{{ isZh ? 'English' : '简体中文' }}</button>
			</div>
		</div>
	</div>
</template>
