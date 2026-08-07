<!-- Icon Demo, Please make sure you have been introduced symbol.svg file. -->
<script lang="ts">
	import { Icon } from 'stdf';
	import type { IconProps } from 'stdf/types';

	const icons = ['ri-spy-fill', 'ri-chrome-fill', 'ri-riding-line', 'ri-switch-fill'];
	const msIcons: IconProps[] = [
		{ name: 'material-symbols--agriculture' },
		{ name: 'material-symbols--brightness-5', state: 'theme' },
		{ name: 'material-symbols--cardiology-outline', opacity: 0.5 },
		{ name: 'material-symbols--e911-avatar-rounded', size: 36 }
	];
	const solarIcons: IconProps[] = [
		{ name: 'solar--cat-broken' },
		{ name: 'solar--chair-2-line-duotone', state: 'theme' },
		{ name: 'solar--bonfire-line-duotone', opacity: 0.5 },
		{ name: 'solar--cup-hot-broken', size: 36 }
	];
	const states = ['theme', 'success', 'warning', 'error', 'info'] as const;
	const fcIcons: IconProps[] = [
		{ name: 'fluent-color--building-store-24' },
		{ name: 'fluent-color--slide-text-sparkle-16' },
		{ name: 'fluent-color--chart-multiple-24', opacity: 0.5 },
		{ name: 'fluent-color--bot-sparkle-24', size: 36 }
	];
</script>

<div class="flex flex-col space-y-12 px-4 py-8">
	<div>
		<div class="mb-2 text-xl font-bold">Basic usage</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon (icon)}
				<div class="flex-1 py-2 text-center">
					<Icon name={icon} />
					<div class="mt-2 text-xs">{icon}</div>
				</div>
			{/each}
		</div>
	</div>
	<div>
		<div class="mb-2 text-xl font-bold">Different states</div>
		<div class="flex flex-wrap justify-between">
			{#each states as state (state)}
				<div class="flex-1 py-2 text-center">
					<Icon name={icons[0]} {state} />
					<div class="mt-2 text-xs">{state}</div>
				</div>
			{/each}
		</div>
	</div>
	<div>
		<div class="mb-2 text-xl font-bold">Different size</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon, i (icon)}
				<div class="flex-1 py-2 text-center">
					<Icon name={icon} size={18 + i * 6} />
					<div class="mt-2 text-xs">{18 + i * 6}</div>
				</div>
			{/each}
		</div>
	</div>
	<div>
		<div class="mb-2 text-xl font-bold">Different transparency</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon, i (icon)}
				<div class="flex-1 py-2 text-center">
					<Icon name={icon} opacity={Number((0.2 + i * 0.2).toFixed(1))} />
					<div class="mt-2 text-xs">{(0.2 + i * 0.2).toFixed(1)}</div>
				</div>
			{/each}
		</div>
	</div>
	<div>
		<div class="mb-2 text-xl font-bold">Use iconify</div>
		<div>material-symbols</div>
		<div class="flex flex-wrap items-center justify-around py-2">
			{#each msIcons as icon (icon)}
				<Icon type="iconify" {...icon} />
			{/each}
		</div>
		<div>solar</div>
		<div class="flex flex-wrap items-center justify-around py-2">
			{#each solarIcons as icon (icon)}
				<Icon type="iconify" {...icon} />
			{/each}
		</div>
	</div>
	<div>
		<div class="mb-2 text-xl font-bold">Use iconify-color</div>
		<div class="flex flex-wrap items-center justify-around py-2">
			{#each fcIcons as icon (icon)}
				<Icon type="iconify-color" {...icon} />
			{/each}
		</div>
	</div>
	<div>
		<div class="mb-2 text-xl font-bold">
			Custom color<span class="ml-2 text-xs font-normal">By injClass</span>
		</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon (icon)}
				<div class="flex-1 py-2 text-center">
					<Icon name={icon} injClass="stdf-demo-text-red-green" />
				</div>
			{/each}
		</div>
	</div>
	<div>
		<div class="mb-2 text-xl font-bold">
			Custom color<span class="ml-2 text-xs font-normal">by Snippet</span>
		</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon (icon)}
				<div class="flex-1 py-2 text-center">
					<Icon><i class="stdf-demo-text-blue-red"> <Icon name={icon} /></i></Icon>
				</div>
			{/each}
		</div>
	</div>
	<div>
		<div class="mb-2 text-xl font-bold">Snippet</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon, index (icon)}
				<div class="flex-1 py-2 text-center">
					<Icon>
						<svg
							height="24"
							width="24"
							aria-hidden="true"
							viewBox="0 0 16 16"
							data-view-component="true"
							style="display: inline;"
							class={index % 2 ? 'fill-primary dark:fill-dark' : 'fill-black dark:fill-white'}
						>
							<path
								fill-rule="evenodd"
								d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
							/>
						</svg>
					</Icon>
				</div>
			{/each}
		</div>
	</div>
	<div>
		<div class="mb-2 text-xl font-bold">Offset</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon, i (icon)}
				<div class="flex-1 py-2 text-center">
					<Icon name={icon} y={-4 + i * 2} />
					y:{-4 + i * 2}
				</div>
			{/each}
		</div>
	</div>
</div>
