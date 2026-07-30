<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button, Icon, Loading, Slider, Toast } from 'vtdf/components';

type ButtonRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

const visible = ref(false);
const radiusOptions: ButtonRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
const radiusLabels = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
const radiusIndex = ref(2);
const currentRadius = computed(() => radiusOptions[radiusIndex.value]);
</script>

<template>
	<div class="flex flex-col space-y-8 py-8">
		<div>
			<div class="p-4 font-bold">fill + state</div>
			<Button>Base Theme</Button>
			<Button state="success">Base Success</Button>
			<Button state="warning">Base Warning</Button>
			<Button state="error">Base Error</Button>
			<Button state="info">Base Info</Button>
			<Button fill="line">Line Colorless</Button>
			<Button fill="lineLight">LineLight</Button>
			<Button fill="lineState">Line Theme</Button>
			<Button fill="lineState" state="success">Line Success</Button>
			<Button fill="lineState" state="warning">Line Warning</Button>
			<Button fill="lineState" state="error">Line Error</Button>
			<Button fill="lineState" state="info">Line Info</Button>
			<Button fill="text">Text Colorless</Button>
			<Button fill="textState">Text Theme</Button>
			<Button fill="textState" state="success">Text Success</Button>
			<Button fill="textState" state="warning">Text Warning</Button>
			<Button fill="textState" state="error">Text Error</Button>
			<Button fill="textState" state="info">Text Info</Button>
			<Button fill="colorLight">Light Gray</Button>
			<Button fill="colorLight" state="theme">Light Theme</Button>
			<Button fill="colorLight" state="success">Light Success</Button>
			<Button fill="colorLight" state="warning">Light Warning</Button>
			<Button fill="colorLight" state="error">Light Error</Button>
			<Button fill="colorLight" state="info">Light Info</Button>
		</div>
		<div>
			<div class="p-4 font-bold">Different rounded style</div>
			<div class="px-4 pb-4">
				<Slider
					:value="radiusIndex"
					:min-range="0"
					:max-range="7"
					:step="1"
					show-steps
					:step-labels="radiusLabels"
					@change="(value: number) => (radiusIndex = value)"
				/>
			</div>
			<Button :radius="currentRadius">Default</Button>
			<Button :radius="currentRadius" fill="lineState">State Line</Button>
			<Button :radius="currentRadius" fill="colorLight">Light Fill</Button>
		</div>
		<div>
			<div class="p-4 font-bold">Different border style</div>
			<Button fill="lineState">Solid line</Button>
			<Button fill="lineState" border="dashed">Dashed line</Button>
			<Button fill="lineState" border="dotted">Dotted line</Button>
		</div>
		<div>
			<div class="p-4 font-bold">Different size</div>
			<Button size="full" radius="none">There is no rounded corner</Button>
			<Button>Default</Button>
			<Button size="md">Medium</Button>
			<Button size="sm">Small</Button>
			<Button size="auto">AUTO</Button>
			<Button size="auto">
				<div class="px-1">
					<Icon name="ri-plane-fill" :size="20" />
				</div>
			</Button>
		</div>
		<div>
			<div class="p-4 font-bold">Different heights</div>
			<Button height-out="0">The external height is 0</Button>
			<Button height-in="0">Internal height is 0</Button>
		</div>
		<div>
			<div class="p-4 font-bold">Fixed size</div>
			<div class="flex items-center justify-around">
				<Button custom-size :custom-width="40" :custom-height="40" radius="full">W</Button>
				<Button custom-size :custom-width="40" :custom-height="40" radius="xl">&amp;</Button>
				<Button custom-size :custom-width="40" :custom-height="40">H</Button>
				<Button custom-size :custom-width="40" :custom-height="40" radius="none">equal</Button>
				<Button fill="lineState" custom-size :custom-width="40" :custom-height="40">
					<Icon name="ri-plane-fill" :size="20" />
				</Button>
				<Button radius="full" fill="lineState" custom-size :custom-width="40" :custom-height="40">
					<Icon name="ri-plane-fill" :size="20" />
				</Button>
				<Button radius="full" border="dashed" fill="lineState" custom-size :custom-width="40" :custom-height="40">
					<Icon name="ri-plane-fill" :size="20" />
				</Button>
				<Button radius="full" custom-size :custom-width="24" :custom-height="24" height-in="0">
					<Icon name="ri-plane-fill" :size="12" />
				</Button>
			</div>
		</div>
		<div>
			<div class="p-4 font-bold">Disable</div>
			<Button disabled>Disable</Button>
			<Button fill="lineState" disabled>Disable</Button>
		</div>
		<div>
			<div class="p-4 font-bold">With icon</div>
			<Button :icon="{ name: 'ri-share-forward-2-fill', size: 18 }">Throw the two way foil</Button>
			<Button fill="lineState" :icon="{ name: 'ri-mic-off-fill', size: 16 }">Start the surface wall plan</Button>
			<Button :icon="{ name: 'ri-share-forward-2-fill', size: 18 }" icon-position="right">Throw the two way foil</Button>
			<Button fill="lineState" :icon="{ name: 'ri-mic-off-fill', size: 16 }" icon-position="right">Start the surface wall plan</Button>
		</div>
		<div>
			<div class="p-4 font-bold">With loading (disabled by default)</div>
			<Button :loading="{ inverse: true, height: '6', width: '6' }">Loading</Button>
			<Button :loading="{ inverse: true, width: '16', height: '6', type: '1_28' }">Loading</Button>
			<Button :loading="{ inverse: true, height: '6', width: '6' }" :disabled-loading="false">Loading</Button>
		</div>
		<div>
			<div class="p-4 font-bold">With icon (passed through slot)</div>
			<Button>
				<Icon name="ri-share-forward-2-fill" :size="18" />
				Throw the two way foil
			</Button>
			<Button fill="lineState">
				<Icon name="ri-mic-off-fill" :size="16" />
				Start the surface wall plan
			</Button>
		</div>
		<div>
			<div class="p-4 font-bold">Loading (passed through slot)</div>
			<Button>
				<Loading inverse height="6" width="6" />
			</Button>
			<Button>
				<Loading inverse width="16" height="6" type="1_17" />
			</Button>
		</div>
		<div>
			<div class="p-4 font-bold">Love version</div>
			<Button love>Care version button</Button>
			<Button love fill="lineState">
				<Icon name="ri-hand-heart-line" :size="22" />
				Care version button
			</Button>
		</div>
		<div>
			<div class="p-4 font-bold">Customize</div>
			<Button inj-class="vtdf-demo-button-fill">Solid color filling</Button>
			<Button inj-class="vtdf-demo-gradient-primary !text-white">Gradient filling</Button>
			<Button fill="line" inj-class="vtdf-demo-button-line">Linear</Button>
			<Button inj-class="shadow-md shadow-black/30 dark:shadow-white/30">Shadow</Button>
			<Button radius="full" inj-class="shadow-lg shadow-primary/40 dark:shadow-dark/40">Shadow</Button>
		</div>
	</div>
	<Toast :visible="visible" message="Clicked button!" />
</template>
