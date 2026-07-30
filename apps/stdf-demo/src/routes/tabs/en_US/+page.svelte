<!-- Tabs Demo -->
<script lang="ts">
	import { Tabs, Tab, TabContent, Divider, Slider } from 'stdf';
	import type { TabLabelProps } from 'stdf/types';
	import { fly } from 'svelte/transition';

	const labels: TabLabelProps[] = [{ text: 'aircraft' }, { text: 'steamer' }, { text: 'train' }, { text: 'car' }];

	// Radius options
	const radiusOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
	let radiusIndex = $state(3); // default md
	const labels1: TabLabelProps[] = [
		{ icon: { name: 'ri-plane-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-ship-2-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-train-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-car-line', theme: true, size: 20 } }
	];
	const labels2: TabLabelProps[] = [
		{ text: 'aircraft', icon: { name: 'ri-plane-line', theme: true, size: 16, y: -1 } },
		{ text: 'steamer', icon: { name: 'ri-ship-2-line', theme: true, size: 16, y: -1 } },
		{ text: 'train', icon: { name: 'ri-train-line', theme: true, size: 16, y: -1 } },
		{ text: 'car', icon: { name: 'ri-car-line', theme: true, size: 16, y: -1 } }
	];
	const overflowLabels: TabLabelProps[] = [
		{ text: 'aircraft' },
		{ text: 'steamer' },
		{ text: 'train' },
		{ text: 'car' },
		{ text: 'motorcycle' },
		{ text: 'bicycle' },
		{ text: 'hot air balloon' },
		{ text: 'rocket' },
		{ text: 'tractor' },
		{ text: 'subway' },
		{ text: 'bus' },
		{ text: 'skateboard' },
		{ text: 'flying saucer' }
	];
	let width = $state(0);
	let changeActive = $state(0);
	let active = $state(2);
	const clicktabFun = (a: number) => {
		active = a;
	};
	const tabsChangeFun = (a: number) => {
		changeActive = a;
	};
</script>

<div class="py-8">
	<div class="px-4 text-xl font-bold">use Tabs</div>
	<div class="my-4 space-y-4">
		<div class="px-4 font-bold">Basic usage</div>
		<Tabs tab={{ labels }}>
			<TabContent>I am a plane</TabContent>
			<TabContent>I am a ship</TabContent>
			<TabContent>I am a train</TabContent>
			<TabContent>I am a car</TabContent>
		</Tabs>
		<Divider />

		<div class="px-4 font-bold">Accelerate the transition</div>
		<Tabs duration="fast" tab={{ labels }}>
			<TabContent>I am a plane</TabContent>
			<TabContent>I am a ship</TabContent>
			<TabContent>I am a train</TabContent>
			<TabContent>I am a car</TabContent>
		</Tabs>
		<Divider />

		<div class="px-4 font-bold">Transition mitigation</div>
		<Tabs duration="slower" tab={{ labels }}>
			<TabContent>I am a plane</TabContent>
			<TabContent>I am a ship</TabContent>
			<TabContent>I am a train</TabContent>
			<TabContent>I am a car</TabContent>
		</Tabs>
		<Divider />

		<div class="px-4 font-bold">Use linear style</div>
		<Tabs tab={{ labels, lineType: true }}>
			<TabContent>I am a plane</TabContent>
			<TabContent>I am a ship</TabContent>
			<TabContent>I am a train</TabContent>
			<TabContent>I am a car</TabContent>
		</Tabs>
		<Divider />

		<div class="px-4 font-bold">The TAB is located at the bottom</div>
		<Tabs tab={{ labels }} position="b">
			<TabContent>I am a plane</TabContent>
			<TabContent>I am a ship</TabContent>
			<TabContent>I am a train</TabContent>
			<TabContent>I am a car</TabContent>
		</Tabs>
		<Divider />

		<div class="px-4 font-bold">The TAB is located on the left</div>
		<Tabs tab={{ labels }} position="l">
			{#snippet children({ active })}
				<TabContent show={active === 0}>I am a plane</TabContent>
				<TabContent show={active === 1}>I am a ship</TabContent>
				<TabContent show={active === 2}>I am a train</TabContent>
				<TabContent show={active === 3}>I am a car</TabContent>
			{/snippet}
		</Tabs>
		<Divider />

		<div class="px-4 font-bold">The TAB is located on the right</div>
		<Tabs tab={{ labels }} position="r">
			{#snippet children({ active })}
				<TabContent show={active === 0}>I am a plane</TabContent>
				<TabContent show={active === 1}>I am a ship</TabContent>
				<TabContent show={active === 2}>I am a train</TabContent>
				<TabContent show={active === 3}>I am a car</TabContent>
			{/snippet}
		</Tabs>
		<Divider />

		<div class="px-4 font-bold" bind:clientWidth={width}>Custom transition</div>
		<Tabs tab={{ labels }} transition={false}>
			{#snippet children({ active })}
				<div class="relative py-8">
					{#each labels as item, i (item.text)}
						{#if active === i}
							<div class="absolute" in:fly={{ y: -80, x: (width / 4) * i, duration: 1000 }}>I am {item.text}</div>
						{/if}
					{/each}
				</div>
			{/snippet}
		</Tabs>
		<Divider />

		<div class="px-4 font-bold">monitor change event</div>
		<Tabs tab={{ labels }} onchange={tabsChangeFun}>
			<TabContent>I am a plane</TabContent>
			<TabContent>I am a ship</TabContent>
			<TabContent>I am a train</TabContent>
			<TabContent>I am a car</TabContent>
		</Tabs>
		<div class="mt-4">At present Tabs activated active: {changeActive}</div>
		<Divider />

		<div class="px-4 font-bold">Overflow mode</div>
		<Tabs tab={{ labels: overflowLabels, overflow: true }}>
			{#each overflowLabels as item (item.text)}
				<TabContent>I am {item.text}</TabContent>
			{/each}
		</Tabs>
		<Tabs tab={{ labels: overflowLabels, overflow: true, lineType: true }}>
			{#each overflowLabels as item (item.text)}
				<TabContent>I am {item.text}</TabContent>
			{/each}
		</Tabs>
		<Divider />

		<div class="px-4 font-bold">Overflow mode closes automatic scrolling</div>
		<Tabs tab={{ labels: overflowLabels, overflow: true, autoScroll: false }}>
			{#each overflowLabels as item (item.text)}
				<TabContent>I am {item.text}</TabContent>
			{/each}
		</Tabs>
		<Divider />

		<div class="px-4 font-bold">Overflow mode shows 2 items</div>
		<Tabs tab={{ labels: overflowLabels, overflow: true, showNum: 2 }}>
			{#each overflowLabels as item (item.text)}
				<TabContent>I am {item.text}</TabContent>
			{/each}
		</Tabs>
	</div>
	<Divider />

	<div class="mt-8 px-4 text-xl font-bold">different Tab style</div>
	<div class="mt-4 flex flex-col space-y-2">
		<div class="px-4 font-bold">Different fillet</div>
		<div class="px-4 text-xs text-gray-500">Current radius: {radiusOptions[radiusIndex]}</div>
		<div class="px-4">
			<Slider
				bind:value={radiusIndex}
				minRange={0}
				maxRange={7}
				step={1}
				showSteps
				stepLabels={[...radiusOptions]}
			/>
		</div>
		<Tab {labels} radius={radiusOptions[radiusIndex]} />
		<Tab {labels} radius={radiusOptions[radiusIndex]} lineType />

		<div class="px-4 font-bold">Match text with ICONS</div>
		<Tab {labels} />
		<Tab labels={labels1} />
		<Tab labels={labels2} />

		<div class="px-4 font-bold">Care edition</div>
		<Tab {labels} love />

		<div class="px-4 font-bold">Linear style</div>
		<Tab {labels} lineType />
		<Tab labels={labels2} lineType />

		<div class="px-4 font-bold">customize Tab Outer style</div>
		<Tab {labels} injClass="stdf-demo-gradient-soft-y" />

		<div class="px-4 font-bold">customize Tab style</div>
		<Tab {labels} tabInjClass="underline text-primary decoration-primary dark:text-dark dark:decoration-dark" />

		<div class="px-4 font-bold">Custom selection Tab style</div>
		<Tab {labels} activeTabInjClass="text-primary dark:text-dark !text-base transition-all" />

		<div class="px-4 font-bold">Customize the indicator style</div>
		<Tab {labels} activeInjClass="stdf-demo-gradient-primary-y" activeTabInjClass="text-white" />
		<Tab {labels} lineType activeInjClass="stdf-demo-gradient-primary" />

		<div class="px-4 font-bold">Different mx</div>
		<div class="mt-4 flex flex-col space-y-2">
			<Tab {labels} mx="12" />
			<Tab {labels} lineType mx="12" />
			<Tab {labels} mx="0" />
			<Tab {labels} lineType mx="0" />
		</div>
	</div>
	<Divider />

	<div class="my-8 px-4 text-xl font-bold">Use alone Tab</div>
	<div class="my-4">
		<Tab {labels} {active} onclickTab={clicktabFun} />
		<div class="mt-4">At present Tab clickable active:{active}</div>
	</div>
	<Divider />
</div>
