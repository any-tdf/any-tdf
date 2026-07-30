<!-- TabBar Demo -->
<script lang="ts">
	import { TabBar } from 'stdf';
	import type { TabBarLabelProps } from 'stdf/types';

	const labels: TabBarLabelProps[] = [
		{ text: '首页', icon: { name: 'ri-home-3-line', size: 20 }, activeIcon: { name: 'ri-home-3-fill', size: 20 } },
		{ text: '发现', icon: { name: 'ri-compass-3-line', size: 20 }, activeIcon: { name: 'ri-compass-3-fill', size: 20 } },
		{ text: '消息', icon: { name: 'ri-discuss-line', size: 20 }, activeIcon: { name: 'ri-discuss-fill', size: 20 } },
		{ text: '我的', icon: { name: 'ri-account-circle-line', size: 20 }, activeIcon: { name: 'ri-account-circle-fill', size: 20 } }
	];
	const labels1: TabBarLabelProps[] = [{ text: '首页' }, { text: '发现' }, { text: '消息' }, { text: '我的' }];
	const labels2: TabBarLabelProps[] = [
		{ icon: { name: 'ri-home-3-line', size: 26 }, activeIcon: { name: 'ri-home-3-fill', size: 26 } },
		{ icon: { name: 'ri-compass-3-line', size: 26 }, activeIcon: { name: 'ri-compass-3-fill', size: 26 } },
		{ icon: { name: 'ri-discuss-line', size: 26 }, activeIcon: { name: 'ri-discuss-fill', size: 26 } },
		{ icon: { name: 'ri-account-circle-line', size: 26 }, activeIcon: { name: 'ri-account-circle-fill', size: 26 } }
	];
	const labels3: TabBarLabelProps[] = [
		{ text: '首页', icon: { name: 'ri-home-3-line', size: 20 } },
		{ text: '发现', icon: { name: 'ri-compass-3-line', size: 20 } },
		{ text: '消息', icon: { name: 'ri-discuss-line', size: 20 } },
		{ text: '我的', icon: { name: 'ri-account-circle-line', size: 20 } }
	];
	const labels4: TabBarLabelProps[] = [
		{ text: '首页', icon: { name: 'ri-home-3-line', size: 20 }, activeIcon: { name: 'ri-home-3-fill', size: 20 } },
		{ text: '消息', icon: { name: 'ri-discuss-line', size: 20 }, activeIcon: { name: 'ri-discuss-fill', size: 20 } },
		{ text: '我的', icon: { name: 'ri-account-circle-line', size: 20 }, activeIcon: { name: 'ri-account-circle-fill', size: 20 } }
	];
	let active = $state(0);
</script>

<div class="mb-20 py-8">
	<div class="my-4 space-y-8">
		<div>
			<div class="mb-2 px-4 font-bold">基础用法</div>
			<TabBar {labels} />
		</div>
		<div>
			<div class="mb-2 px-4 font-bold">仅文字</div>
			<TabBar labels={labels1} />
		</div>
		<div>
			<div class="mb-2 px-4 font-bold">仅图标</div>
			<TabBar labels={labels2} />
		</div>
		<div>
			<div class="mb-2 px-4 font-bold">带线条</div>
			<TabBar {labels} line lineW={8} />
			<div class="mt-2"></div>
			<TabBar {labels} line />
			<div class="mt-2"></div>
			<TabBar {labels} line lineW={2} />
			<div class="mt-2"></div>
			<TabBar {labels} line lineW={1} />
		</div>
		<div>
			<div class="mb-2 px-4 font-bold">图标仅换颜色</div>
			<TabBar labels={labels3} />
		</div>
		<div>
			<div class="mb-2 px-4 font-bold">自定义最外层</div>
			<TabBar {labels} injClass="mx-2 rounded-full shadow-md dark:shadow-white/10" />
		</div>
		<div>
			<div class="mb-2 px-4 font-bold">自定义 Tab</div>
			<TabBar {labels} tabInjClass="stdf-demo-text-purple-yellow" activeTabInjClass="!text-primary dark:!text-dark" />
		</div>
		<div>
			<div class="mb-2 px-4 font-bold">仅自定义选定 Tab</div>
			<TabBar {labels} activeTabInjClass="stdf-demo-text-purple-yellow" />
		</div>
		<div>
			<div class="mb-2 px-4 font-bold">自定义线条</div>
			<TabBar {labels} line activeInjClass="stdf-demo-bg-purple-yellow" />
		</div>
		<div>
			<div class="mb-2 px-4 font-bold">关爱版</div>
			<TabBar {labels} love />
		</div>
		<div>
			<div class="mb-2 px-4 font-bold">监听 onchange 事件</div>
			<div class="m-4">当前 TabBar 激活的 active：{active}</div>
			<TabBar {labels} onchange={(a) => (active = a)} />
		</div>
	</div>
</div>
<div class="fixed bottom-0 w-full">
	<TabBar labels={labels4} injClass="bg-white/50 dark:bg-black/50 backdrop-blur-sm" />
</div>
