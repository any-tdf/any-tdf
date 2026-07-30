<script lang="ts">
	let { colorList = [] } = $props();
</script>

{#each colorList as color, index (index)}
	<div
		class="flex w-full flex-1 justify-between self-center px-4 transition hover:scale-105 hover:rounded-sm md:py-0 {index > 5
			? 'text-white'
			: 'text-black'}"
		style="background-color: {color.color};"
	>
		<div class="flex flex-col justify-center text-sm">{color.key}</div>
		<div class="mt-2 flex flex-col justify-center py-1 text-right">
			<div>{color.color || ''}</div>
		</div>
	</div>
{/each}
