<script setup lang="ts">
import { ref } from 'vue';
import { Cell, Dialog, Icon, Switch } from 'vtdf/components';

const checkAsync = ref(false);
const cellCheck = ref(false);
const loading = ref(false);
const loadingCheck = ref(false);
const cellLoading = ref(false);
const cellLoadingCheck = ref(false);
const visible = ref(false);
const confirmSwitchActive = ref(false);

const switchClickFun = () => {
	setTimeout(() => {
		checkAsync.value = !checkAsync.value;
	}, 2000);
};

const cellAsyncFun = () => {
	setTimeout(() => {
		cellCheck.value = !cellCheck.value;
	}, 2000);
};

const loadingFun = () => {
	loading.value = true;
	setTimeout(() => {
		loadingCheck.value = !loadingCheck.value;
		loading.value = false;
	}, 3000);
};

const cellLoadingFun = () => {
	cellLoading.value = true;
	setTimeout(() => {
		cellLoadingCheck.value = !cellLoadingCheck.value;
		cellLoading.value = false;
	}, 3000);
};
</script>

<template>
	<div class="pb-8">
		<div class="flex flex-col space-y-8 px-4 py-8">
			<div>
				<div class="mb-4 font-bold">Different Radius</div>
				<div class="flex justify-between">
					<Switch />
					<Switch radius="none" />
					<Switch radius="full" />
				</div>
			</div>
			<div>
				<div class="mb-4 font-bold">Different Colors</div>
				<div class="flex justify-between">
					<Switch active inj-class="bg-success dark:bg-success" />
					<Switch active inj-class="bg-error dark:bg-error" />
					<Switch active inj-class="bg-warning dark:bg-warning" />
					<Switch active inj-class="vtdf-demo-switch-bg" />
				</div>
			</div>
			<div>
				<div class="mb-4 font-bold">With Text / State / Icon</div>
				<div class="flex justify-between">
					<Switch :inside="['OF', 'ON']" />
					<Switch :inside="['😭', '😄']" />
					<Switch inside="state" />
					<Switch>
						<template #false>
							<div>
								<Icon name="ri-moon-line" :size="16" :y="-1" />
							</div>
						</template>
						<template #true>
							<div>
								<Icon name="ri-sun-line" :size="16" :y="-1" />
							</div>
						</template>
					</Switch>
				</div>
			</div>
			<div>
				<div class="mb-4 font-bold">Disabled</div>
				<div class="flex justify-between">
					<Switch disabled />
					<Switch disabled active />
				</div>
			</div>
			<div>
				<div class="mb-4 font-bold">Async Control</div>
				<div class="flex justify-between">
					<div class="flex flex-col items-center space-y-2">
						<Switch async :active="checkAsync" @click="switchClickFun" />
						<div class="text-sm">Wait 2 seconds</div>
					</div>
					<div class="flex flex-col items-center space-y-2">
						<Switch async :active="loadingCheck" :loading="{ theme: true }" @click="loadingFun" :inside="loading ? 'loading' : null" />
						<div class="text-sm">Wait 3 seconds</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mb-4 px-4 font-bold">Used in Cell</div>
		<Cell title="Switch" detail="Click row to toggle" :right="{ type: 'switch' }" />
		<Cell title="Switch with Text" :right="{ type: 'switch', switch: { inside: ['😭', '😄'] } }" switch-active />
		<Cell title="Full Radius Switch" :right="{ type: 'switch', switch: { radius: 'full' } }" />
		<Cell
			title="Async Control"
			detail="Toggles after 2s"
			:right="{ type: 'switch', switch: { async: true } }"
			:switch-active="cellCheck"
			@click="cellAsyncFun"
		/>
		<Cell
			title="Async Loading"
			detail="Toggles after 3s"
			:right="{ type: 'switch', switch: { async: true, inside: cellLoading ? 'loading' : null } }"
			:switch-active="cellLoadingCheck"
			@click="cellLoadingFun"
		/>
		<Cell title="Disabled Switch" :right="{ type: 'switch', switch: { disabled: true } }" switch-active />

		<Cell
			title="Double Confirmation"
			:right="{ type: 'switch', switch: { async: true } }"
			v-model:switch-active="confirmSwitchActive"
			@click="() => (visible = true)"
		/>
		<Dialog
			v-model:visible="visible"
			:content="`Are you sure you want to ${confirmSwitchActive ? 'turn off' : 'turn on'}?`"
			@primary="
				() => {
					visible = false;
					confirmSwitchActive = !confirmSwitchActive;
				}
			"
		/>
	</div>
</template>
