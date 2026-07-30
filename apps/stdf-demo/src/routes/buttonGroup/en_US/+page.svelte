<!-- ButtonGroup Demo -->
<script lang="ts">
	import { ButtonGroup, Icon, Toast, Slider } from 'stdf';
	import type { ButtonGroupItemProps, ButtonGroupProps } from 'stdf/types';

	let visible = $state(false);

	// Radius configuration
	const radiusOptions: ButtonGroupProps['radius'][] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	let radiusIndex = $state(2); // Default sm
	let currentRadius: ButtonGroupProps['radius'] = $derived(radiusOptions[radiusIndex]);

	// Basic button group data
	const basicItems: ButtonGroupItemProps[] = [
		{ text: 'App', icon: { name: 'ri-apps-2-line', size: 18 } },
		{ text: 'Collect', icon: { name: 'ri-star-line', size: 18 } },
		{ text: 'Share', icon: { name: 'ri-share-forward-line', size: 18 }, onclick: () => (visible = true) }
	];

	// Text only
	const textOnlyItems: ButtonGroupItemProps[] = [
		{ text: 'Cancel' },
		{ text: 'Confirm', onclick: () => (visible = true) }
	];

	// Icon only
	const iconOnlyItems: ButtonGroupItemProps[] = [
		{ icon: { name: 'ri-thumb-up-line', size: 20 } },
		{ icon: { name: 'ri-thumb-down-line', size: 20 } },
		{ icon: { name: 'ri-heart-line', size: 20 } }
	];

	// With disabled
	const disabledItems: ButtonGroupItemProps[] = [
		{ text: 'Enabled' },
		{ text: 'Disabled', disabled: true },
		{ text: 'Enabled' }
	];

	// Left text+icon, right icon only
	const textIconAndIconItems: ButtonGroupItemProps[] = [
		{ text: 'Search', icon: { name: 'ri-search-line', size: 18 } },
		{ icon: { name: 'ri-filter-line', size: 20 } }
	];

	// Left icon only, right text+icon
	const iconAndTextIconItems: ButtonGroupItemProps[] = [
		{ icon: { name: 'ri-arrow-left-line', size: 20 } },
		{ text: 'Next', icon: { name: 'ri-arrow-right-line', size: 18 }, iconPosition: 'right' }
	];

	// Icon positions on left/right of text
	const iconPositionItems: ButtonGroupItemProps[] = [
		{ text: 'Previous', icon: { name: 'ri-arrow-left-s-line', size: 18 } },
		{ text: 'Next', icon: { name: 'ri-arrow-right-s-line', size: 18 }, iconPosition: 'right' }
	];

	// Complex combination
	const complexItems: ButtonGroupItemProps[] = [
		{ icon: { name: 'ri-skip-back-line', size: 18 } },
		{ text: 'Play', icon: { name: 'ri-play-line', size: 18 } },
		{ icon: { name: 'ri-skip-forward-line', size: 18 } }
	];
</script>

<div class="flex flex-col space-y-8 py-8">
	<div>
		<div class="p-4 font-bold">fill + state</div>
		<ButtonGroup items={basicItems} />
		<ButtonGroup items={basicItems} state="success" />
		<ButtonGroup items={basicItems} state="warning" />
		<ButtonGroup items={basicItems} state="error" />
		<ButtonGroup items={basicItems} state="info" />
		<ButtonGroup items={basicItems} fill="line" />
		<ButtonGroup items={basicItems} fill="lineLight" />
		<ButtonGroup items={basicItems} fill="lineState" />
		<ButtonGroup items={basicItems} fill="lineState" state="success" />
		<ButtonGroup items={basicItems} fill="lineState" state="warning" />
		<ButtonGroup items={basicItems} fill="lineState" state="error" />
		<ButtonGroup items={basicItems} fill="lineState" state="info" />
		<ButtonGroup items={basicItems} fill="text" />
		<ButtonGroup items={basicItems} fill="textState" />
		<ButtonGroup items={basicItems} fill="textState" state="success" />
		<ButtonGroup items={basicItems} fill="textState" state="warning" />
		<ButtonGroup items={basicItems} fill="textState" state="error" />
		<ButtonGroup items={basicItems} fill="textState" state="info" />
		<ButtonGroup items={basicItems} fill="colorLight" />
		<ButtonGroup items={basicItems} fill="colorLight" state="theme" />
		<ButtonGroup items={basicItems} fill="colorLight" state="success" />
		<ButtonGroup items={basicItems} fill="colorLight" state="warning" />
		<ButtonGroup items={basicItems} fill="colorLight" state="error" />
		<ButtonGroup items={basicItems} fill="colorLight" state="info" />
	</div>
	<div>
		<div class="p-4 font-bold">Two-button combinations</div>
		<ButtonGroup items={textOnlyItems} />
		<ButtonGroup items={textIconAndIconItems} fill="lineState" />
		<ButtonGroup items={iconAndTextIconItems} fill="colorLight" />
		<ButtonGroup items={iconPositionItems} fill="lineState" />
	</div>
	<div>
		<div class="p-4 font-bold">Icon position</div>
		<ButtonGroup items={iconPositionItems} />
		<ButtonGroup items={iconPositionItems} fill="lineState" />
		<ButtonGroup items={iconPositionItems} fill="colorLight" />
	</div>
	<div>
		<div class="p-4 font-bold">Complex combination</div>
		<div class="flex flex-col items-center gap-2">
			<ButtonGroup items={complexItems} size="md" />
			<ButtonGroup items={complexItems} fill="lineState" size="md" />
			<ButtonGroup items={complexItems} fill="colorLight" size="md" />
		</div>
	</div>
	<div>
		<div class="p-4 font-bold">Different fill modes</div>
		<ButtonGroup items={basicItems} fill="base" />
		<ButtonGroup items={basicItems} fill="lineState" />
		<ButtonGroup items={basicItems} fill="colorLight" />
		<ButtonGroup items={basicItems} fill="line" />
		<ButtonGroup items={basicItems} fill="text" />
	</div>
	<div>
		<div class="p-4 font-bold">fill + state combination</div>
		<ButtonGroup items={basicItems} fill="base" state="success" />
		<ButtonGroup items={basicItems} fill="lineState" state="error" />
		<ButtonGroup items={basicItems} fill="colorLight" state="warning" />
		<ButtonGroup items={basicItems} fill="textState" state="info" />
	</div>
	<div>
		<div class="p-4 font-bold">Different radius styles</div>
		<div class="px-4 pb-4">
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
		<ButtonGroup items={textOnlyItems} radius={currentRadius} />
		<ButtonGroup items={textOnlyItems} radius={currentRadius} fill="lineState" />
		<ButtonGroup items={textOnlyItems} radius={currentRadius} fill="colorLight" />
	</div>
	<div>
		<div class="p-4 font-bold">Different sizes</div>
		<ButtonGroup items={basicItems} size="full" />
		<ButtonGroup items={basicItems} size="big" />
		<ButtonGroup items={basicItems} size="md" />
		<ButtonGroup items={basicItems} size="auto" />
	</div>
	<div>
		<div class="p-4 font-bold">Different heights</div>
		<ButtonGroup items={textOnlyItems} heightIn="0" />
		<ButtonGroup items={textOnlyItems} heightIn="1" />
		<ButtonGroup items={textOnlyItems} heightIn="2" />
		<ButtonGroup items={textOnlyItems} heightIn="3" />
		<ButtonGroup items={textOnlyItems} heightIn="4" />
		<ButtonGroup items={textOnlyItems} fill="lineState" heightOut="0" />
		<ButtonGroup items={textOnlyItems} fill="lineState" heightOut="4" />
	</div>
	<div>
		<div class="p-4 font-bold">Divider height</div>
		<ButtonGroup items={basicItems} fill="lineState" dividerHeight="full" />
		<ButtonGroup items={basicItems} fill="lineState" dividerHeight="mid" />
		<ButtonGroup items={basicItems} fill="lineState" dividerHeight="short" />
	</div>
	<div>
		<div class="p-4 font-bold">Border style</div>
		<ButtonGroup items={basicItems} fill="lineState" border="solid" />
		<ButtonGroup items={basicItems} fill="lineState" border="dashed" />
		<ButtonGroup items={basicItems} fill="lineState" border="dotted" />
	</div>
	<div>
		<div class="p-4 font-bold">Text only</div>
		<ButtonGroup items={textOnlyItems} />
		<ButtonGroup items={textOnlyItems} fill="lineState" />
	</div>
	<div>
		<div class="p-4 font-bold">Icon only</div>
		<ButtonGroup items={iconOnlyItems} size="sm" />
		<ButtonGroup items={iconOnlyItems} fill="lineState" size="sm" />
	</div>
	<div>
		<div class="p-4 font-bold">Disable some buttons</div>
		<ButtonGroup items={disabledItems} />
		<ButtonGroup items={disabledItems} fill="lineState" />
	</div>
	<div>
		<div class="p-4 font-bold">Children custom mode</div>
		<ButtonGroup fill="lineState" heightIn="0">
			<button class="border-primary dark:border-dark flex-1 border-r py-2 active:opacity-80">
				<Icon name="ri-apps-2-line" size={18} />
				App
			</button>
			<button class="border-primary dark:border-dark flex-1 border-r py-2 active:opacity-80">
				<Icon name="ri-star-line" size={18} />
				Collect
			</button>
			<button class="flex-1 py-2 active:opacity-80" onclick={() => (visible = true)}>
				<Icon name="ri-share-forward-line" size={18} />
				Share
			</button>
		</ButtonGroup>
	</div>
</div>
<Toast bind:visible message="Button clicked!" />
