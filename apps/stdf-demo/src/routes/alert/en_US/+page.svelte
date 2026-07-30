<!-- Alert Demo -->
<script lang="ts">
	import { Alert, Cell, Button, Slider, Card, Switch, Tab } from 'stdf';
	import type { LargeAreaRadius, TabLabelProps, SvelteEasingProps } from 'stdf/types';

	let visible1 = $state(false);
	let visible2 = $state(false);
	let visible3 = $state(false);
	let visible4 = $state(false);
	let visible5 = $state(false);
	let visible6 = $state(false);
	let visible7 = $state(false);
	let visible8 = $state(false);
	let visible9 = $state(false);
	let visible10 = $state(false);
	let visible11 = $state(false);
	let visible12 = $state(false);
	let visible13 = $state(false);
	let visible14 = $state(false);
	let visible15 = $state(false);
	let visible16 = $state(false);
	let visible17 = $state(false);
	let visible18 = $state(false);
	let visible19 = $state(false);

	// Inverse color control
	let inverse = $state(true);

	// Radius control
	const radiusList: LargeAreaRadius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
	let radiusIndex = $state(2);
	let radius = $derived(radiusList[radiusIndex]);

	// Transition type control
	const transitionTypes = ['fly', 'scale', 'fade', 'blur'] as const;
	const transitionLabels: TabLabelProps[] = transitionTypes.map((t) => ({ text: t }));
	let transitionTypeIndex = $state(0);
	let transitionType = $derived(transitionTypes[transitionTypeIndex]);

	// Easing function control
	const easeTypes: SvelteEasingProps[] = ['cubicOut', 'bounceOut', 'elasticOut', 'backOut'];
	const easeLabels: TabLabelProps[] = easeTypes.map((t) => ({ text: t.replace('Out', '') }));
	let easeTypeIndex = $state(0);
	let easeType = $derived(easeTypes[easeTypeIndex]);

	// Animation duration control
	let inDuration = $state(300);
	let outDuration = $state(300);

	// fly animation params
	let flyY = $state(-100);

	// scale animation params
	let scaleStart = $state(0);

	// blur animation params
	let blurAmount = $state(5);

	// Generate transitionParams based on animation type
	const getTransitionParams = () => {
		const base = { duration: inDuration };
		if (transitionType === 'fly') {
			return { ...base, y: flyY };
		} else if (transitionType === 'scale') {
			return { ...base, start: scaleStart };
		} else if (transitionType === 'blur') {
			return { ...base, amount: blurAmount };
		}
		return base;
	};
</script>

<div class="py-4">
	<Cell title="Basic Usage" onclick={() => (visible1 = true)} />
	<Alert bind:visible={visible1} message="This is an alert message" />

	<Cell title="With Title" onclick={() => (visible2 = true)} />
	<Alert bind:visible={visible2} title="Alert Title" message="This is an alert message with a title" />

	<Cell title="Success Alert" onclick={() => (visible3 = true)} />
	<Alert bind:visible={visible3} type="success" title="Success" message="Operation completed successfully!" />

	<Cell title="Error Alert" onclick={() => (visible4 = true)} />
	<Alert bind:visible={visible4} type="error" title="Error" message="Operation failed, please try again!" />

	<Cell title="Warning Alert" onclick={() => (visible5 = true)} />
	<Alert bind:visible={visible5} type="warning" title="Warning" message="Please note, this action cannot be undone!" />

	<Cell title="Info Alert" onclick={() => (visible6 = true)} />
	<Alert bind:visible={visible6} type="info" title="Info" message="This is a regular information alert." />

	<Cell title="Bottom Position" onclick={() => (visible7 = true)} />
	<Alert bind:visible={visible7} position="bottom" type="success" message="Alert slides in from bottom" />

	<Cell title="Increased Distance" onclick={() => (visible8 = true)} />
	<Alert bind:visible={visible8} py="60" type="info" message="Further from the top" />

	<Cell title="Hide Close Button" onclick={() => (visible9 = true)} />
	<Alert bind:visible={visible9} closable={false} type="warning" message="This alert has no close button" />

	<Cell title="Hide Type Icon" onclick={() => (visible10 = true)} />
	<Alert bind:visible={visible10} type="success" showIcon={false} message="Success without icon" />

	<Cell title="Custom Icon" onclick={() => (visible11 = true)} />
	<Alert bind:visible={visible11} icon={{ name: 'ri-rocket-2-line', state: 'success' }} message="Using custom icon" />

	<Cell title="Fixed 6s Duration" onclick={() => (visible12 = true)} />
	<Alert bind:visible={visible12} duration={6000} type="info" message="Auto close after 6 seconds" />

	<Cell title="No Auto Close" onclick={() => (visible13 = true)} />
	<Alert bind:visible={visible13} duration={0} type="warning" title="Notice" message="This alert won't close automatically, please close manually" />

	<Cell title="Custom Card Style" onclick={() => (visible14 = true)} />
	<Alert bind:visible={visible14} card={{ shadow: '2xl', radius: '2xl', border: 'solid' }} type="success" title="Custom Card" message="Larger shadow and radius" />

	<Cell title="Using Snippet" onclick={() => (visible15 = true)} />
	<Alert bind:visible={visible15} duration={0}>
		<div class="flex flex-col gap-2">
			<div class="font-medium">Custom Content</div>
			<div class="text-sm text-black/70 dark:text-white/70">This is fully customized alert content, can contain any elements.</div>
			<div class="flex gap-2 mt-2">
				<Button size="sm" onclick={() => (visible15 = false)}>Cancel</Button>
				<Button size="sm" fill="base" onclick={() => (visible15 = false)}>Confirm</Button>
			</div>
		</div>
	</Alert>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">Animation Type (transitionType: {transitionType})</div>
		<Tab labels={transitionLabels} active={transitionTypeIndex} onclickTab={(v) => (transitionTypeIndex = v)} />
	</div>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">Easing Function (easeType: {easeType})</div>
		<Tab labels={easeLabels} active={easeTypeIndex} onclickTab={(v) => (easeTypeIndex = v)} />
	</div>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">Enter Animation Duration: {inDuration}ms</div>
		<Slider value={inDuration} minRange={0} maxRange={1000} step={50} onchange={(v) => (inDuration = v)} />
	</div>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">Exit Animation Duration: {outDuration}ms</div>
		<Slider value={outDuration} minRange={0} maxRange={1000} step={50} onchange={(v) => (outDuration = v)} />
	</div>

	{#if transitionType === 'fly'}
		<div class="px-2 py-4">
			<div class="text-sm text-black/50 dark:text-white/50 mb-2">fly Y Offset: {flyY}px</div>
			<Slider value={flyY} minRange={-200} maxRange={200} step={10} onchange={(v) => (flyY = v)} />
		</div>
	{:else if transitionType === 'scale'}
		<div class="px-2 py-4">
			<div class="text-sm text-black/50 dark:text-white/50 mb-2">scale Initial Scale: {scaleStart}</div>
			<Slider value={scaleStart} minRange={0} maxRange={1} step={0.1} onchange={(v) => (scaleStart = v)} />
		</div>
	{:else if transitionType === 'blur'}
		<div class="px-2 py-4">
			<div class="text-sm text-black/50 dark:text-white/50 mb-2">blur Amount: {blurAmount}px</div>
			<Slider value={blurAmount} minRange={0} maxRange={20} step={1} onchange={(v) => (blurAmount = v)} />
		</div>
	{/if}

	<Cell title="Custom Animation Effect" onclick={() => (visible16 = true)} />
	<Alert
		bind:visible={visible16}
		{transitionType}
		transitionParams={getTransitionParams()}
		{outDuration}
		{easeType}
		easeOutType={easeType}
		type="success"
		message="Adjust the controls above to see different animation effects"
	/>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">Adjust Radius (Card radius: {radius})</div>
		<Slider value={radiusIndex} minRange={0} maxRange={7} step={1} showSteps onchange={(v) => (radiusIndex = v)} />
	</div>

	<Cell title="Different Radius Styles" onclick={() => (visible17 = true)} />
	<Alert bind:visible={visible17} card={{ radius }} type="info" message="Adjust the slider above to see different radius" />

	<div class="px-2 py-4">
		<div class="flex items-center justify-between">
			<div class="text-sm text-black/50 dark:text-white/50">Inverse Color (inverse: {inverse})</div>
			<Switch bind:active={inverse} />
		</div>
	</div>

	<Cell title="Inverse Color Effect" onclick={() => (visible18 = true)} />
	<Alert bind:visible={visible18} {inverse} type="success" title="Notice" message="Inverse is enabled by default for better visibility" />

	<Cell title="Non-inverse Effect" onclick={() => (visible19 = true)} />
	<Alert bind:visible={visible19} inverse={false} type="info" title="Notice" message="Inverse disabled, using normal background color" />
</div>

<div class="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
	<div class="flex-1">
		<Button fill="lineState" onclick={() => (visible13 = false)}>Close Manually</Button>
	</div>
</div>
