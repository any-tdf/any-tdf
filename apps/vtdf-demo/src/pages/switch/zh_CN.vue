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
				<div class="mb-4 font-bold">不同圆角</div>
				<div class="flex justify-between">
					<Switch />
					<Switch radius="none" />
					<Switch radius="full" />
				</div>
			</div>
			<div>
				<div class="mb-4 font-bold">不同颜色</div>
				<div class="flex justify-between">
					<Switch active inj-class="bg-success dark:bg-success" />
					<Switch active inj-class="bg-error dark:bg-error" />
					<Switch active inj-class="bg-warning dark:bg-warning" />
					<Switch active inj-class="vtdf-demo-switch-bg" />
				</div>
			</div>
			<div>
				<div class="mb-4 font-bold">带文字 / 状态 / 图标</div>
				<div class="flex justify-between">
					<Switch :inside="['关', '开']" />
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
				<div class="mb-4 font-bold">禁用</div>
				<div class="flex justify-between">
					<Switch disabled />
					<Switch disabled active />
				</div>
			</div>
			<div>
				<div class="mb-4 font-bold">异步控制</div>
				<div class="flex justify-between">
					<div class="flex flex-col items-center space-y-2">
						<Switch async :active="checkAsync" @click="switchClickFun" />
						<div class="text-sm">点击 2 秒后触发</div>
					</div>
					<div class="flex flex-col items-center space-y-2">
						<Switch async :active="loadingCheck" :loading="{ theme: true }" @click="loadingFun" :inside="loading ? 'loading' : null" />
						<div class="text-sm">点击 3 秒后触发</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mb-4 px-4 font-bold">Cell 中使用</div>
		<Cell title="开关" detail="点击整行皆可触发开关" :right="{ type: 'switch' }" />
		<Cell title="开关带文字" :right="{ type: 'switch', switch: { inside: ['😭', '😄'] } }" switch-active />
		<Cell title="开关全圆角" :right="{ type: 'switch', switch: { radius: 'full' } }" />
		<Cell
			title="异步控制"
			detail="点击 2 秒后触发开关"
			:right="{ type: 'switch', switch: { async: true } }"
			:switch-active="cellCheck"
			@click="cellAsyncFun"
		/>
		<Cell
			title="异步加载"
			detail="点击 3 秒后触发开关"
			:right="{ type: 'switch', switch: { async: true, inside: cellLoading ? 'loading' : null } }"
			:switch-active="cellLoadingCheck"
			@click="cellLoadingFun"
		/>
		<Cell title="禁用开关" :right="{ type: 'switch', switch: { disabled: true } }" switch-active />

		<Cell
			title="二次确认"
			:right="{ type: 'switch', switch: { async: true } }"
			v-model:switch-active="confirmSwitchActive"
			@click="() => (visible = true)"
		/>
		<Dialog
			v-model:visible="visible"
			:content="`确定${confirmSwitchActive ? '关闭' : '开启'}吗？`"
			@primary="
				() => {
					visible = false;
					confirmSwitchActive = !confirmSwitchActive;
				}
			"
		/>
	</div>
</template>
