<script setup lang="ts">
import { Grid, Grids, Placeholder } from 'vtdf/components';
</script>

<template>
	<div class="m-4 text-lg font-bold">Basic usage</div>
	<Placeholder>Basic usage</Placeholder>

	<div class="m-4 text-lg font-bold">Set height</div>
	<Placeholder height="32">High for 32</Placeholder>

	<div class="m-4 text-lg font-bold">Different fillet</div>
	<div class="flex flex-col space-y-4">
		<Placeholder radius="none">unfillet</Placeholder>
		<Placeholder radius="xl">XL Rounded corner</Placeholder>
		<Placeholder radius="4xl">Full fillet</Placeholder>
	</div>

	<div class="m-4 text-lg font-bold">shaded</div>
	<Placeholder shadow="md">shadow</Placeholder>

	<div class="m-4 text-lg font-bold">customize injClass</div>
	<Placeholder height="24" inj-class="vtdf-demo-gradient-primary !text-white">Gradient background</Placeholder>

	<div class="m-4 text-lg font-bold">Combined with Grids</div>
	<Grids>
		<Grid row="3" col="2"><Placeholder>3﹡2</Placeholder></Grid>
		<Grid col="3"><Placeholder>1﹡3</Placeholder></Grid>
		<Grid row="3"><Placeholder>3﹡1</Placeholder></Grid>
		<Grid row="2" col="2"><Placeholder>2﹡2</Placeholder></Grid>
		<Grid><Placeholder>1﹡1</Placeholder></Grid>
		<Grid><Placeholder>1﹡1</Placeholder></Grid>
	</Grids>
	<div class="pb-4" />
</template>
