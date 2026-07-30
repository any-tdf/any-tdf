<!-- Tag Demo -->
<script lang="ts">
	import { Tag, Cell } from 'stdf';

	let tags = $state(['Tag 1', 'Tag 2', 'Tag 3']);

	const handleClose = (index: number) => {
		tags = tags.filter((_, i) => i !== index);
	};
</script>

<div class="pb-4 pt-1">
	<div class="mx-4 mt-8 text-lg font-bold">Basic Usage</div>
	<div class="flex flex-wrap gap-2 p-4">
		<Tag text="Tag" />
		<Tag text="Tag" state="success" />
		<Tag text="Tag" state="warning" />
		<Tag text="Tag" state="error" />
		<Tag text="Tag" state="info" />
		<Tag text="Tag" state="neutral" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Fill Styles</div>
	<div class="flex flex-wrap gap-2 p-4">
		<Tag text="Base" fill="base" />
		<Tag text="Line" fill="line" />
		<Tag text="Light" fill="light" />
	</div>
	<div class="flex flex-wrap gap-2 px-4">
		<Tag text="Base" fill="base" state="success" />
		<Tag text="Line" fill="line" state="success" />
		<Tag text="Light" fill="light" state="success" />
		<Tag text="Light" fill="light" state="neutral" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Different Sizes</div>
	<div class="flex flex-wrap items-center gap-2 p-4">
		<Tag text="XS" size="xs" />
		<Tag text="SM" size="sm" />
		<Tag text="MD" size="md" />
		<Tag text="LG" size="lg" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Different Radius</div>
	<div class="flex flex-wrap gap-2 p-4">
		<Tag text="None" radius="none" />
		<Tag text="SM" radius="sm" />
		<Tag text="MD" radius="md" />
		<Tag text="LG" radius="lg" />
		<Tag text="Full" radius="full" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Mark Style</div>
	<div class="flex flex-wrap gap-2 p-4">
		<Tag text="Mark" mark />
		<Tag text="Mark" mark state="success" />
		<Tag text="Mark" mark state="warning" />
		<Tag text="Mark" mark state="error" />
		<Tag text="Mark" mark state="info" />
		<Tag text="Mark" mark state="neutral" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Closable Tags</div>
	<div class="flex flex-wrap gap-2 p-4">
		{#each tags as tag, index}
			<Tag text={tag} closable onclose={() => handleClose(index)} />
		{/each}
		{#if tags.length === 0}
			<span class="text-sm text-gray-400">All tags closed</span>
		{/if}
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Disabled State</div>
	<div class="flex flex-wrap gap-2 p-4">
		<Tag text="Disabled" disabled />
		<Tag text="Disabled" disabled fill="line" />
		<Tag text="Disabled" disabled closable />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">With Cell</div>
	<Cell title="Product Name">
		{#snippet detailChild()}
			<Tag text="Hot" size="sm" />
		{/snippet}
	</Cell>
	<Cell title="Order Status" line={false}>
		{#snippet detailChild()}
			<Tag text="Completed" size="sm" state="success" fill="light" />
		{/snippet}
	</Cell>

	<div class="mx-4 mt-8 text-lg font-bold">Custom Content</div>
	<div class="flex flex-wrap gap-2 p-4">
		<Tag>
			<span class="flex items-center gap-1">
				<svg class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
					/>
				</svg>
				Favorite
			</span>
		</Tag>
		<Tag fill="light" state="error">
			<span class="flex items-center gap-1">
				<svg class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
				</svg>
				Featured
			</span>
		</Tag>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Custom Styles</div>
	<div class="flex flex-wrap gap-2 p-4">
		<Tag text="Gradient" injClass="!bg-linear-to-r !from-purple-500 !to-pink-500" />
		<Tag text="Shadow" injClass="shadow-md" />
		<Tag text="Bold" injClass="font-bold" />
	</div>
</div>
