<script setup lang="ts">
import { ref } from 'vue';
import { Icon, Rate } from 'vtdf/components';

const value = ref(2.5);
</script>

<template>
	<div class="mx-4 mt-8 text-lg font-bold">Basic Usage</div>
	<div class="p-4">
		<Rate />
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Set Initial Score</div>
	<div class="p-4">
		<Rate :value="1" />
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Allow Zero Score</div>
	<div class="p-4">
		<Rate zero />
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Custom Total Score</div>
	<div class="p-4">
		<Rate :total="12" />
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Set Unselected Opacity</div>
	<div class="p-4">
		<Rate opacity="0.8" />
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Allow Half Selection</div>
	<div class="p-4">
		<Rate half />
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Vertical Half Selection</div>
	<div class="p-4">
		<Rate half vertical />
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Half Selection with Zero Score</div>
	<div class="p-4">
		<Rate half zero />
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Increase Spacing</div>
	<div class="p-4">
		<Rate space="8" />
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Disabled</div>
	<div class="p-4">
		<Rate disabled />
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Read Only</div>
	<div class="p-4">
		<Rate readonly />
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Different Sizes</div>
	<div class="p-4">
		<Rate :width="20" :height="20" />
	</div>
	<div class="p-4">
		<Rate :width="28" :height="28" />
	</div>
	<div class="p-4">
		<Rate :width="36" :height="36" />
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Custom Icons</div>
	<div class="p-4">
		<Rate opacity="0.6">
			<Icon name="ri-star-fill" inj-class="vtdf-demo-text-star" />
		</Rate>
	</div>
	<div class="p-4">
		<Rate>
			<Icon name="ri-heart-3-fill" inj-class="vtdf-demo-text-red" />
		</Rate>
	</div>
	<div class="p-4">
		<Rate half>
			<Icon name="ri-heart-3-fill" inj-class="vtdf-demo-text-red" />
		</Rate>
	</div>
	<div class="p-4">
		<Rate half opacity="0.5" :width="30" :height="36">
			<div class="text-3xl">👍</div>
		</Rate>
	</div>
	<div class="p-4">
		<Rate half opacity="0.5" :width="30" :height="36" vertical>
			<div class="text-3xl">🍺</div>
		</Rate>
	</div>
	<div class="p-4">
		<Rate half opacity="0.5" :width="30" :height="36">
			<div class="text-3xl text-primary dark:text-dark">M</div>
		</Rate>
	</div>
	<div class="mx-4 mt-8 text-lg font-bold">Event Listening</div>
	<div class="p-4">
		<Rate half :value="value" @click="(nextValue) => (value = nextValue)" />
		<p class="mt-2">Rating: {{ value }} stars</p>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Click Animation for All Active Icons</div>
	<div class="p-4">
		<Rate animation="active" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Disable Click Animation</div>
	<div class="p-4">
		<Rate :animation="null" />
	</div>
</template>
