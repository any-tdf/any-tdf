<script setup lang="ts">
import { Confetti } from '@any-tdf/vue-confetti';
</script>

<template>
	<Teleport to="body">
		<div class="fullscreen-confetti">
			<Confetti :x="[-5, 5]" :y="[0, 0.1]" :delay="[500, 2000]" infinite :duration="5000" :amount="200" fall-distance="100vh" />
		</div>
	</Teleport>
</template>
