<!-- Tooltip Demo -->
<script lang="ts">
	import { Tooltip, Button, Icon, Slider } from 'stdf';
	import type { TooltipProps } from 'stdf/types';

	// Radius configuration
	const radiusOptions: TooltipProps['radius'][] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	let radiusIndex = $state(2);
	let currentRadius: TooltipProps['radius'] = $derived(radiusOptions[radiusIndex]);

	// State configuration
	const stateOptions: TooltipProps['state'][] = ['black', 'theme', 'success', 'warning', 'error', 'info'];
	const stateLabels = ['Black', 'Theme', 'Success', 'Warning', 'Error', 'Info'];
	let stateIndex = $state(0);
	let currentState: TooltipProps['state'] = $derived(stateOptions[stateIndex]);

	// Manual control
	let manualVisible = $state(false);

	// Delay
	let delayValue = $state(0);
</script>

<div class="pb-4 pt-1">
	<div class="mx-4 mt-8 text-lg font-bold">Basic Usage</div>
	<div class="mx-4 mt-2 text-sm opacity-60">Click trigger element to show/hide tooltip</div>
	<div class="flex justify-around p-4">
		<Tooltip content="This is a tooltip message">
			<Button size="sm">Click to Show</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">State Colors</div>
	<div class="px-4 py-2">
		<Slider
			value={stateIndex}
			minRange={0}
			maxRange={5}
			step={1}
			showSteps
			stepLabels={stateLabels}
			onchange={(v) => (stateIndex = v)}
		/>
	</div>
	<div class="flex justify-center p-4">
		<Tooltip content="Different state tooltip" state={currentState}>
			<Button size="sm" state={currentState === 'black' ? 'theme' : currentState}>{stateLabels[stateIndex]}</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">All States Preview</div>
	<div class="flex flex-wrap justify-around gap-4 p-4">
		<Tooltip content="Black theme" state="black">
			<Button size="sm">Black</Button>
		</Tooltip>
		<Tooltip content="Theme color" state="theme">
			<Button size="sm" state="theme">Theme</Button>
		</Tooltip>
		<Tooltip content="Success tooltip" state="success">
			<Button size="sm" state="success">Success</Button>
		</Tooltip>
		<Tooltip content="Warning tooltip" state="warning">
			<Button size="sm" state="warning">Warning</Button>
		</Tooltip>
		<Tooltip content="Error tooltip" state="error">
			<Button size="sm" state="error">Error</Button>
		</Tooltip>
		<Tooltip content="Info tooltip" state="info">
			<Button size="sm" state="info">Info</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Border Radius</div>
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
	<div class="flex justify-center p-4">
		<Tooltip content="Adjust border radius" radius={currentRadius}>
			<Button size="sm">{radiusLabels[radiusIndex]}</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Hide Arrow</div>
	<div class="flex justify-around p-4">
		<Tooltip content="No arrow tooltip" arrow={false}>
			<Button size="sm">No Arrow</Button>
		</Tooltip>
		<Tooltip content="With arrow tooltip">
			<Button size="sm">With Arrow</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Show Delay</div>
	<div class="mx-4 mt-2 text-sm opacity-60">Set show delay: {delayValue}ms</div>
	<div class="px-4 py-2">
		<Slider value={delayValue} minRange={0} maxRange={1000} step={100} onchange={(v) => (delayValue = v)} />
	</div>
	<div class="flex justify-center p-4">
		<Tooltip content="Delayed tooltip" delay={delayValue}>
			<Button size="sm">Delay {delayValue}ms</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Manual Control</div>
	<div class="flex justify-around p-4">
		<Tooltip content="Manually controlled" bind:visible={manualVisible}>
			<Button size="sm">Controlled</Button>
		</Tooltip>
		<Button size="sm" fill="line" onclick={() => (manualVisible = !manualVisible)}>
			{manualVisible ? 'Hide' : 'Show'}
		</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Disabled State</div>
	<div class="flex justify-around p-4">
		<Tooltip content="Won't show" disabled>
			<Button size="sm" disabled>Disabled</Button>
		</Tooltip>
		<Tooltip content="Will show normally">
			<Button size="sm">Normal</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Custom Content</div>
	<div class="flex justify-center p-4">
		<Tooltip maxWidth={300}>
			{#snippet contentSnippet()}
				<div class="flex items-center gap-2">
					<Icon name="ri-information-line" size={16} />
					<span>Custom complex content supported</span>
				</div>
			{/snippet}
			<Button size="sm">Custom Content</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">With Icons</div>
	<div class="flex justify-around p-4">
		<Tooltip content="Settings">
			<Icon name="ri-settings-3-line" size={24} />
		</Tooltip>
		<Tooltip content="Help Center" state="info">
			<Icon name="ri-question-line" size={24} />
		</Tooltip>
		<Tooltip content="Notifications" state="theme">
			<Icon name="ri-notification-3-line" size={24} />
		</Tooltip>
		<Tooltip content="Danger Action" state="error">
			<Icon name="ri-delete-bin-line" size={24} />
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Position Preview</div>
	<div class="mx-4 mt-2 text-sm opacity-60">Preview all four directions</div>
	<div class="flex justify-around p-8">
		<Tooltip content="Top" position="top">
			<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">T</div>
		</Tooltip>
		<Tooltip content="Bottom" position="bottom">
			<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">B</div>
		</Tooltip>
		<Tooltip content="Left" position="left">
			<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">L</div>
		</Tooltip>
		<Tooltip content="Right" position="right">
			<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">R</div>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Long Text Content</div>
	<div class="flex justify-center p-4">
		<Tooltip content="This is a very long tooltip text content to demonstrate the auto-wrap effect when dealing with long text. The default max width is 200px, which can be adjusted via the maxWidth property." maxWidth={250}>
			<Button size="sm">Long Text</Button>
		</Tooltip>
	</div>
</div>
