<!-- NavBar Demo -->
<script lang="ts">
	import { NavBar, Icon, Toast } from 'stdf';

	const icons1 = [{ name: 'ri-paint-brush-line', theme: true }, { name: 'ri-share-line' }];
	const icons2 = [{ name: 'ri-command-line' }, { name: 'ri-drag-move-line' }];
	const icons3 = [{ name: 'ri-indent-decrease' }, { name: 'ri-service-line' }];
	const icons4 = [{ name: 'ri-hand-heart-line', theme: true }, { name: 'ri-parent-line' }];

	let visible1 = $state(false);
	let visible2 = $state(false);
	let rightIndex = $state(0);
	let visible3 = $state(false);
</script>

<div class="flex flex-col space-y-8 py-8">
	<NavBar title="基础用法" />
	<NavBar title="右侧使用 Icon" rights={icons1} />
	<NavBar title="标题居中" titleAlign="center" rights={[{ name: 'ri-command-line' }]} />
	<NavBar title="点击左侧" onclickLeft={() => (visible1 = true)} />
	<Toast bind:visible={visible1} message="点击了左侧！" />
	<NavBar
		title="点击右侧"
		rights={icons2}
		onclickRight={(index) => {
			visible2 = true;
			rightIndex = index;
		}}
	/>
	<Toast bind:visible={visible2} message={`点击的右侧图标索引值是 ${rightIndex}。`} />
	<NavBar title="无左侧与底分割线，文字过长长长长长长长" left={null} line={false} rights={icons3} />
	<NavBar title="自定义背景颜色 by injClass" injClass="stdf-demo-nav-bg" />
	<NavBar>
		{#snippet titleChild()}
			<div class="stdf-demo-text-red-green">自定义文字颜色 by Snippet</div>
		{/snippet}
	</NavBar>
	<NavBar>
		{#snippet titleChild()}
			<div class="flex h-12 flex-col justify-around text-xs">
				<div class="text-sm">titleChild Snippet 渲染标题区域</div>
				<div>rightChild Snippet 渲染右侧且可点击</div>
			</div>
		{/snippet}
		{#snippet rightChild()}
			<div>
				<button class="text-primary dark:text-dark h-12 w-12 cursor-pointer text-center" onclick={() => (visible3 = true)}>Hello</button>
			</div>
		{/snippet}
	</NavBar>
	<Toast bind:visible={visible3} message="点击了右侧 Snippet 内容！" />
	<NavBar title="关爱版导航栏" love rights={icons4} />
	<NavBar injClass="!bg-transparent" line={false}>
		{#snippet leftChild()}
			<div class="m-2 h-8 w-8 rounded-full bg-white text-center leading-8 dark:bg-black/50">
				<Icon name="ri-home-7-line" size={18} y={-2} />
			</div>
		{/snippet}
		{#snippet titleChild()}
			<div class="my-2 h-8 rounded-full bg-white px-3 text-sm leading-8 dark:bg-black/50">injClass 与 Snippet 结合自定义样式</div>
		{/snippet}
		{#snippet rightChild()}
			<div class="m-2 h-8 w-8 rounded-full bg-white text-center leading-8 dark:bg-black/50">
				<Icon name="ri-customer-service-2-line" size={18} y={-2} />
			</div>
		{/snippet}
	</NavBar>
</div>
