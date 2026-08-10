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
	<NavBar title="Basic usage" />
	<NavBar title="Use Icon on the right side" rights={icons1} />
	<NavBar title="Title centered" titleAlign="center" rights={[{ name: 'ri-command-line' }]} />
	<NavBar title="Click on the left" onclickLeft={() => (visible1 = true)} />
	<Toast bind:visible={visible1} message="Clicked on the left!" />
	<NavBar
		title="Click on the right"
		rights={icons2}
		onclickRight={(index) => {
			visible2 = true;
			rightIndex = index;
		}}
	/>
	<Toast bind:visible={visible2} message={`The index of the clicked right icon is ${rightIndex}.`} />
	<NavBar title="No left and bottom dividers, long text" left={null} line={false} rights={icons3} />
	<NavBar title="Custom background color by injClass" injClass="stdf-demo-nav-bg" />
	<NavBar>
		{#snippet titleChild()}
			<div class="stdf-demo-text-red-green">Custom text color by Snippet</div>
		{/snippet}
	</NavBar>
	<NavBar>
		{#snippet titleChild()}
			<div class="flex h-12 flex-col justify-around text-xs">
				<div class="text-sm">title Snippet renders</div>
				<div>right Snippet renders</div>
			</div>
		{/snippet}
		{#snippet rightChild()}
			<div>
				<button class="text-primary dark:text-dark h-12 w-12 cursor-pointer text-center" onclick={() => (visible3 = true)}>Hello</button>
			</div>
		{/snippet}
	</NavBar>
	<Toast bind:visible={visible3} message="Clicked on the right Snippet content!" />
	<NavBar title="Love version" love rights={icons4} />
	<NavBar injClass="!bg-transparent" line={false}>
		{#snippet leftChild()}
			<div class="m-2 h-8 w-8 rounded-full bg-white text-center leading-8 dark:bg-black/50">
				<Icon name="ri-home-7-line" size={18} y={-2} />
			</div>
		{/snippet}
		{#snippet titleChild()}
			<div class="my-2 h-8 rounded-full bg-white px-3 text-sm leading-8 dark:bg-black/50">injClass + Snippet</div>
		{/snippet}
		{#snippet rightChild()}
			<div class="m-2 h-8 w-8 rounded-full bg-white text-center leading-8 dark:bg-black/50">
				<Icon name="ri-customer-service-2-line" size={18} y={-2} />
			</div>
		{/snippet}
	</NavBar>
</div>
