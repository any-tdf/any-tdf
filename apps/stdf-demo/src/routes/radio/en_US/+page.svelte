<!-- Radio Demo -->
<script lang="ts">
	import { Radio, Divider, Button, Icon } from 'stdf';
	import type { RadioItemProps } from 'stdf/types';

	const dota: RadioItemProps[] = [
		{ label: 'Jugg', name: 'Juggernaut' },
		{ label: 'SB', name: 'Spirit Breaker' },
		{ label: 'KOTL', name: 'Keeper of the Light' },
		{ label: 'Mag', name: 'Magnus' }
	];
	let value = $state(dota[0].name);
	let checkedsCustom = $state('');

	const dotaInlines: RadioItemProps[] = [
		{ label: 'Lina', name: 'Lina' },
		{ label: 'SB', name: 'Spirit Breaker' },
		{ label: 'Morph', name: 'Morphling' },
		{ label: 'Sniper', name: 'Sniper' },
		{ label: 'Sven', name: 'Sven' },
		{ label: 'Invoker', name: 'Invoker' },
		{ label: 'Tide', name: 'Tidehunter' },
		{ label: 'Bat', name: 'Batrider' },
		{ label: 'Mag', name: 'Magnus' }
	];
	let checkInline = $state('Morphling');

	const dotaImgs: (RadioItemProps & { imgName: string })[] = [
		{ label: 'Lina', name: 'Lina', imgName: '火女' },
		{ label: 'SB', name: 'Spirit Breaker', imgName: '小牛' },
		{ label: 'Morph', name: 'Morphling', imgName: '水人' },
		{ label: 'Sniper', name: 'Sniper', imgName: '火枪' },
		{ label: 'Sven', name: 'Sven', imgName: '斯温' }
	];
	let imgChecked = $state('Lina');

	const dotaLong: RadioItemProps[] = [
		{ name: 'Jugg', label: 'Juggernaut is a melee agility hero who can quickly engage in combat.' },
		{ name: 'SB', label: 'Barathrum, Spirit Breaker is a powerful ganking strength melee hero.' },
		{ name: 'KOTL', label: 'Ezalor, Keeper of the Light, is a famous support intelligence hero.' },
		{ name: 'Mag', label: 'Magnus? Why not ban Magnus? Why not ban Magnus?' }
	];

	const dotaVoices: (RadioItemProps & { voices: string[] })[] = [
		{ name: 'Invoker', label: 'Invoker', voices: ['"From the first point was begat a line."'] },
		{ name: 'Storm', label: 'Storm', voices: ['"Hey, wake up! Get some coffee, our tower is under attack."'] },
		{
			name: 'Batrider',
			label: 'Batrider',
			voices: [
				'"Oh Lina, wanna be my queen?"',
				'"Oh Windrunner, no need to run from me."',
				'"Crystal Maiden, you\'re like a tall glass of water."'
			]
		},
		{ name: 'Tidehunter', label: 'Tidehunter', voices: ['"I could eat a sea cucumber."'] }
	];
	let voiceChecked = $state('');
</script>

<div class="px-4">
	<div class="mb-4 mt-8 text-2xl font-bold">Horizontal Layout</div>
	<div class="mb-4 mt-6 text-lg font-bold">Basic Usage</div>
	<Radio layout="h" data={dota} />
	<Divider />

	<div class="mb-4 mt-6 text-lg font-bold">Get Selected Value</div>
	<Radio layout="h" data={dota} bind:value />
	<div class="mt-4 text-sm">Selected: {value}</div>
	<Divider />

	<div class="mb-4 mt-8 text-lg font-bold">Text Position</div>
	<Radio layout="h" data={dota} textPosition="l" />
	<Divider />
	<Radio layout="h" data={dota} textPosition="b" />
	<Divider />
	<Radio layout="h" data={dota} textPosition="t" />
	<Divider />

	<div class="mb-4 mt-8 text-lg font-bold">Custom Icon</div>
	<Radio layout="h" data={dota} icon={{ name: 'ri-checkbox-blank-circle-line' }} iconChecked={{ name: 'ri-radio-button-fill' }} />
	<Divider />
	<Radio layout="h" data={dota} icon={{ name: 'ri-checkbox-circle-line' }} iconChecked={{ name: 'ri-checkbox-circle-fill' }} />
	<Divider />
	<Radio layout="h" data={dota} icon={{ name: 'ri-checkbox-multiple-line' }} iconChecked={{ name: 'ri-checkbox-multiple-fill' }} />
	<Divider />
	<Radio layout="h" data={dota} icon={{ name: 'ri-check-line' }} iconChecked={{ name: 'ri-check-fill' }} />
	<Divider />
	<Radio layout="h" data={dota} icon={{ name: 'ri-check-double-line' }} iconChecked={{ name: 'ri-check-double-line' }} />
	<Divider />

	<div class="mb-4 mt-8 text-lg font-bold">Snippet as Button Component</div>
	<Radio layout="h" data={dota}>
		{#snippet radioChild({ item })}
			<Button fill={value === item.name ? 'base' : 'lineLight'} injClass="px-2 !py-1" onclick={() => (value = item.name)}>
				{item.label}
			</Button>
		{/snippet}
	</Radio>
	<Divider />

	<div class="mb-4 mt-8 text-lg font-bold">Snippet as Custom Element</div>
	<Radio layout="h" data={dota}>
		{#snippet radioChild({ item })}
			<button
				class="rounded-sm border px-5 py-0.5 text-sm {checkedsCustom === item.name
					? 'bg-primary/10 text-primary dark:bg-dark/10 dark:text-dark'
					: 'border-gray-200 bg-gray-100 dark:border-gray-500 dark:bg-gray-600'}"
				onclick={() => (checkedsCustom = item.name)}
			>
				{item.label}
			</button>
		{/snippet}
	</Radio>
	<Divider />

	<div class="mb-4 mt-8 text-lg font-bold">Image Options</div>
	<Radio layout="h" data={dotaImgs}>
		{#snippet radioChild({ item })}
			<div class="flex flex-col items-center">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="mb-1 h-12 w-12 overflow-hidden rounded-sm {imgChecked === item.name ? 'ring-primary dark:ring-dark ring-2' : ''}"
					onclick={() => (imgChecked = item.name)}
				>
					<img class="h-full w-full object-cover" src={`/assets/images/dota_${item.imgName}.png`} alt="" />
				</div>
				<div>
					<Icon
						name={imgChecked === item.name ? 'ri-arrow-up-s-fill' : 'ri-arrow-up-s-line'}
						theme={imgChecked === item.name}
						opacity={imgChecked === item.name ? 1 : 0.2}
					/>
				</div>
			</div>
		{/snippet}
	</Radio>
	<div class="text-sm">
		Selected <span class="stdf-demo-text-red">{imgChecked}</span>
	</div>
	<Divider />
</div>

<div class="px-4">
	<div class="mb-4 text-2xl font-bold">Inline Layout</div>
	<div class="mb-4 mt-8 text-lg font-bold">Snippet Inline Layout</div>
	<Radio layout="inline" data={dotaInlines}>
		{#snippet radioChild({ item })}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="m-1 rounded-sm border px-2 py-0.5 text-sm {checkInline === item.name
					? 'bg-primary/10 text-primary dark:bg-dark/10 dark:text-dark'
					: 'border-gray-200 bg-gray-100 dark:border-gray-500 dark:bg-gray-600'}"
				onclick={() => (checkInline = item.name)}
			>
				{item.label}
			</div>
		{/snippet}
	</Radio>
	<div class="mt-2 text-xs">Selected: {checkInline}</div>
</div>
<Divider />

<div class="px-4 pb-8">
	<div class="mb-4 text-2xl font-bold">Vertical Layout</div>
	<div class="mb-4 mt-8 text-lg font-bold">Basic Usage</div>
	<Radio data={dota} />
	<Divider />

	<div class="mb-4 mt-8 text-lg font-bold">Long Text Options</div>
	<Radio data={dotaLong} />
	<Divider />

	<div class="mb-4 mt-8 text-lg font-bold">Text Position</div>
	<Radio data={dota} textPosition="l" />

	<div class="mb-4 mt-8 text-lg font-bold">Complex Options && Custom Selected Effect</div>
	<Radio data={dotaVoices}>
		{#snippet radioChild({ item })}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="flex cursor-pointer items-center" onclick={() => (voiceChecked = item.name)}>
				<div>
					<Icon
						name={voiceChecked === item.name ? 'ri-radio-button-line' : 'ri-checkbox-blank-circle-line'}
						theme={voiceChecked === item.name}
						opacity={voiceChecked === item.name ? 1 : 0.2}
					/>
				</div>
				<div class="ml-2 grow {voiceChecked === item.name ? 'text-primary dark:text-dark' : ''}">
					{item.label}
					{#each item.voices as string[] as voice (voice)}
						<div class="text-xs">{voice}</div>
					{/each}
					<div class="mt-1 h-px bg-black/10 dark:bg-white/10"></div>
				</div>
			</div>
		{/snippet}
	</Radio>
</div>
