<!-- Badge Demo -->
<script lang="ts">
	import { Badge, Avatar, Button, Icon, Input, Cell, Slider } from 'stdf';
	import type { BadgeProps } from 'stdf/types';

	let isShow = $state(true);

	// Radius configuration
	const radiusOptions: BadgeProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'leaf'];
	const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'leaf'];
	let radiusIndex = $state(6); // Default full
	let currentRadius: BadgeProps['radius'] = $derived(radiusOptions[radiusIndex]);
</script>

<div class="pb-4 pt-1">
	<div class="mx-4 mt-8 text-lg font-bold">Basic usage</div>
	<div class="flex justify-around p-4">
		<Badge><Avatar /></Badge>
		<Badge text="24"><Avatar /></Badge>
		<Badge text="99+"><Avatar /></Badge>
		<Badge text="New"><Avatar /></Badge>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Different rounded corners</div>
	<div class="px-4 py-2">
		<Slider
			value={radiusIndex}
			minRange={0}
			maxRange={7}
			step={1}
			showSteps
			stepLabels={radiusLabels}
			onchange={(v) => (radiusIndex = v)}
		/>
	</div>
	<div class="flex justify-around p-4">
		<Badge radius={currentRadius}><Avatar /></Badge>
		<Badge text="24" radius={currentRadius}><Avatar /></Badge>
		<Badge text="99+" radius={currentRadius}><Avatar /></Badge>
		<Badge text="Hot" radius={currentRadius}><Avatar /></Badge>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Located on the left</div>
	<div class="flex justify-around p-4">
		<Badge isLeft><Avatar /></Badge>
		<Badge isLeft text="24"><Avatar /></Badge>
		<Badge isLeft text="24" radius="leaf"><Avatar /></Badge>
		<Badge isLeft text="sharp"><Avatar /></Badge>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Match other components</div>
	<div class="flex justify-around p-4">
		<Badge text="Cool" radius="leaf" offsetX={-6}><Icon name="ri-spy-fill" /></Badge>
		<Badge text="Great" radius="leaf" offsetX={-10}><Icon name="ri-medal-fill" /></Badge>
		<Badge text="Happy" radius="leaf" offsetX={-12}><Icon name="ri-cake-2-fill" /></Badge>
	</div>
	<Badge text="Hot" offsetX={18} offsetY={8}><Button>Match Button</Button></Badge>
	<Badge text="Required" offsetX={30} offsetY={26}><Input title="Match Input" /></Badge>
	<Cell title="Match Cell">
		{#snippet detailChild()}
			<Badge isInner />
		{/snippet}
	</Cell>
	<Cell title="Match Cell" line={false}>
		{#snippet detailChild()}
			<Badge text="99+" isInner />
		{/snippet}
	</Cell>
	<Cell title="Match no radius corner Cell" radius="none">
		{#snippet detailChild()}
			<Badge text="new version" radius="lg" isInner />
		{/snippet}
	</Cell>
	<Cell title="Match full radius Cell" radius="4xl">
		{#snippet detailChild()}
			<Badge isInner />
		{/snippet}
	</Cell>

	<div class="mx-4 mt-8 text-lg font-bold">Badge animation</div>
	<div class="flex justify-around p-4">
		<Badge {isShow}><Avatar /></Badge>
		<Badge text="24" {isShow}><Avatar /></Badge>
		<Badge text="24" radius="lg" {isShow}><Avatar /></Badge>
		<Badge text="Hot" radius="leaf" {isShow}><Avatar /></Badge>
	</div>
	<Cell title={!isShow ? 'Hidden' : 'Show'}>
		{#snippet detailChild()}
			<Badge isInner {isShow} />
		{/snippet}
	</Cell>
	<Button onclick={() => (isShow = !isShow)}>Click {isShow ? 'Hidden' : 'Show'} Badge</Button>

	<div class="mx-4 mt-8 text-lg font-bold">Custom background color and border</div>
	<div class="flex justify-around p-4">
		<Badge text="Theme" injClass="!bg-primary dark:!bg-dark text-white dark:text-black"><Avatar /></Badge>
		<Badge text="New" injClass="stdf-demo-gradient-primary"><Avatar /></Badge>
		<Badge radius="lg" injClass="stdf-demo-ring-neutral"><Avatar image="/assets/images/avatar_1.jpg" /></Badge>
		<Badge offsetX={9} offsetY={9} injClass="stdf-demo-ring-neutral">
			<Avatar radius="full" image="/assets/images/avatar_1.jpg" />
		</Badge>
	</div>
</div>
