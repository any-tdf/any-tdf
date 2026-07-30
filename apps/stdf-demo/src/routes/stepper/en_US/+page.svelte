<!-- Stepper Demo -->
<script lang="ts">
	import { Stepper, Toast, Slider } from 'stdf';
	import type { StepperProps } from 'stdf/types';

	// Radius configuration
	const radiusOptions: StepperProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	let radiusIndex = $state(1); // Default sm
	let currentRadius: StepperProps['radius'] = $derived(radiusOptions[radiusIndex]);

	let asyncValue1 = $state(1);
	let loading1 = $state(false);
	let asyncValue2 = $state(1);
	let loading2 = $state(false);
	let asyncValue3 = $state(1);
	let loading3 = $state(false);
	const handleChange1 = (type: 'increase' | 'decrease') => {
		loading1 = true;
		setTimeout(() => {
			asyncValue1 += type === 'increase' ? 1 : -1;
			loading1 = false;
		}, 2000);
	};
	const handleChange2 = (type: 'increase' | 'decrease') => {
		loading2 = true;
		setTimeout(() => {
			asyncValue2 += type === 'increase' ? 1 : -1;
			loading2 = false;
		}, 3000);
	};
	const handleChange3 = (type: 'increase' | 'decrease') => {
		loading3 = true;
		setTimeout(() => {
			asyncValue3 += type === 'increase' ? 1 : -1;
			loading3 = false;
		}, 4000);
	};
</script>

<div class="mx-4 mt-8 text-lg font-bold">Basic Usage</div>
<div class="px-4 py-4">
	<Stepper />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Set Maximum/Minimum/Initial Value</div>
<div class="px-4 py-4">
	<Stepper min={2} max={10} value={5} />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Set Step</div>
<div class="px-4 py-4">
	<Stepper step={5} />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Highlight Number Area</div>
<div class="px-4 py-4">
	<Stepper numberHighlight />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Highlight Number Area</div>
<div class="flex gap-2 px-4 py-4">
	<Stepper theme={false} />
	<Stepper theme={false} numberHighlight />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Different Radius</div>
<div class="px-6 py-2">
	<Slider
		value={radiusIndex}
		minRange={0}
		maxRange={6}
		step={1}
		showSteps
		stepLabels={radiusLabels}
		onchange={(v) => (radiusIndex = v)}
	/>
</div>
<div class="flex flex-wrap gap-2 px-4 py-4">
	<div><Stepper radius={currentRadius} /></div>
	<div><Stepper radius={currentRadius} numberHighlight /></div>
	<div><Stepper radius={currentRadius} theme={false} /></div>
</div>

<div class="mx-4 mt-8 text-lg font-bold">Vertical</div>
<div class="flex justify-around px-2 py-4">
	<Stepper vertical />
	<Stepper vertical numberHighlight />
	<Stepper vertical theme={false} />
	<Stepper vertical radius="none" />
	<Stepper radius="xl" vertical />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Fixed Width</div>
<div class="space-x-8 px-2 py-4">
	<Stepper width={160} />
	<Stepper width={80} vertical />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Format Display Numbers</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm">Keep one decimal place</div>
	<Stepper decimal={1} step={0.1} max={1} min={0.1} value={0.5} />
</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm">Keep four decimal places</div>
	<Stepper decimal={4} step={0.0001} max={1} min={0.0001} value={0.5} />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Asynchronous Display Numbers</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm">Toast shows asynchronous status</div>
	<Stepper async={loading1} value={asyncValue1} onincrease={() => handleChange1('increase')} ondecrease={() => handleChange1('decrease')} />
</div>
<Toast bind:visible={loading1} type="loading" message="Saving..." />
<div class="mb-2 px-4 text-sm">Internal display asynchronous status</div>
<div class="flex gap-2 px-4 py-4">
	<Stepper
		async={loading2}
		value={asyncValue2}
		asyncLoading
		onincrease={() => handleChange2('increase')}
		ondecrease={() => handleChange2('decrease')}
	/>
	<Stepper
		async={loading3}
		value={asyncValue3}
		asyncLoading
		loading={{ type: '1_51' }}
		onincrease={() => handleChange3('increase')}
		ondecrease={() => handleChange3('decrease')}
	/>
</div>

<div class="mx-4 mt-8 text-lg font-bold">No external padding</div>
<div class="px-4 py-2">
	<Stepper padding={false} />
</div>
<div class="px-4 py-2">
	<Stepper padding={false} numberHighlight />
</div>
<div class="px-4 py-2">
	<Stepper padding={false} theme={false} />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Inject Class in Different Positions</div>
<div class="px-4 py-2">
	<Stepper theme={false} injClassOut="stdf-demo-gradient-primary" />
</div>
<div class="px-4 py-2">
	<Stepper injClassNum="text-primary dark:text-dark" />
</div>
<div class="px-4 py-2">
	<Stepper injClassBtn="rounded-full" />
</div>
