<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button, Grid, Grids, Icon, Placeholder, Switch } from 'vtdf/components';

const devices = ['iOS', 'Android', 'Windows', 'macOS', 'Ubuntu'];
const currentIndex = ref(0);
const currentDevice = computed(() => devices[currentIndex.value]);
const color = ref(false);
const colorCss = computed(() => (color.value ? 'bg-linear-to-tr from-blue/70 to-purple/70' : 'bg-gray-100 dark:bg-gray-700'));
const date = new Date();
const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const month = monthArr[date.getMonth()];
const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
const time = `${hour}:${minute}`;
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekDay = week[date.getDay()];

const changeDeviceFun = () => {
	currentIndex.value = currentIndex.value === devices.length - 1 ? 0 : currentIndex.value + 1;
};

const changeColorFun = (active: boolean) => {
	color.value = active;
};
</script>

<template>
	<div class="mt-8 px-4 font-bold">Using Placeholder Example 3﹡4</div>
	<Grids cols="4">
		<Grid row="3">
			<Placeholder>3﹡1</Placeholder>
		</Grid>
		<Grid col="3">
			<Placeholder>1﹡3</Placeholder>
		</Grid>
		<Grid row="2">
			<Placeholder>2﹡1</Placeholder>
		</Grid>
		<Grid col="2">
			<Placeholder>1﹡2</Placeholder>
		</Grid>
		<Grid>
			<Placeholder>1﹡1</Placeholder>
		</Grid>
		<Grid>
			<Placeholder>1﹡1</Placeholder>
		</Grid>
	</Grids>

	<div class="mt-8 px-4 font-bold">Using Placeholder Example 4﹡6</div>
	<Grids>
		<Grid row="3" col="2">
			<Placeholder>3﹡2</Placeholder>
		</Grid>
		<Grid col="3">
			<Placeholder>1﹡3</Placeholder>
		</Grid>
		<Grid row="4">
			<Placeholder>4﹡1</Placeholder>
		</Grid>
		<Grid row="2">
			<Placeholder>2﹡1</Placeholder>
		</Grid>
		<Grid>
			<Placeholder>1﹡1</Placeholder>
		</Grid>
		<Grid>
			<Placeholder>1﹡1</Placeholder>
		</Grid>
		<Grid>
			<Placeholder>1﹡1</Placeholder>
		</Grid>
		<Grid>
			<Placeholder>1﹡1</Placeholder>
		</Grid>
		<Grid>
			<Placeholder>1﹡1</Placeholder>
		</Grid>
		<Grid col="4">
			<Placeholder>1﹡4</Placeholder>
		</Grid>
	</Grids>

	<div class="mt-8 px-4 font-bold">Increase Margin and Cell Gap</div>
	<Grids cols="4" gap="4" mx="8" my="8">
		<Grid row="3">
			<Placeholder>3﹡1</Placeholder>
		</Grid>
		<Grid col="3">
			<Placeholder>1﹡3</Placeholder>
		</Grid>
		<Grid row="2">
			<Placeholder>2﹡1</Placeholder>
		</Grid>
		<Grid col="2">
			<Placeholder>1﹡2</Placeholder>
		</Grid>
		<Grid>
			<Placeholder>1﹡1</Placeholder>
		</Grid>
		<Grid>
			<Placeholder>1﹡1</Placeholder>
		</Grid>
	</Grids>

	<div class="mt-8 px-4 font-bold">Scene Example 6﹡5</div>
	<div class="pb-8 pt-2">
		<div :class="['mx-2 rounded-xl p-2 shadow-sm transition duration-300', colorCss]">
			<Grids cols="5" mx="0" my="0">
				<Grid row="3">
					<div
						class="flex h-full flex-col justify-between rounded-lg bg-white p-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
					>
						<div>{{ weekDay }}</div>
						<div class="text-4xl">{{ day }}</div>
						<div class="text-gray-600">{{ month }}</div>
					</div>
				</Grid>
				<Grid row="2">
					<div
						class="flex h-full flex-col justify-center rounded-lg bg-white p-1 text-center text-xl font-bold shadow-sm dark:bg-black dark:shadow-white/10"
					>
						{{ time }}
					</div>
				</Grid>
				<Grid row="2">
					<div
						class="flex h-full flex-col justify-around rounded-lg bg-white p-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
					>
						<div class="flex justify-center">
							<Switch radius="full" @change="changeColorFun">
								<template #false>
									<div><Icon name="ri-paint-brush-line" :size="12" /></div>
								</template>
								<template #true>
									<div><Icon name="ri-paint-brush-fill" :size="12" state="theme" /></div>
								</template>
							</Switch>
						</div>
						<div>Colorful</div>
					</div>
				</Grid>

				<Grid row="2" col="2">
					<div
						class="flex h-full flex-col justify-center rounded-lg bg-white text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
					>
						<Button fill="lineState" radius="full" @click="changeDeviceFun">Device</Button>
					</div>
				</Grid>
				<Grid row="2" col="2">
					<div
						class="flex h-full justify-around rounded-lg bg-white p-1 py-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
					>
						<div class="flex flex-col justify-center">
							<Icon v-if="currentDevice === 'iOS'" name="ri-apple-fill" :size="30" />
							<Icon v-else-if="currentDevice === 'Android'" name="ri-android-fill" :size="30" />
							<Icon v-else-if="currentDevice === 'Windows'" name="ri-windows-fill" :size="30" />
							<Icon v-else-if="currentDevice === 'macOS'" name="ri-command-fill" :size="30" />
							<Icon v-else name="ri-ubuntu-fill" :size="30" />
						</div>
						<div class="flex flex-col justify-around">
							<div class="text-sm">
								<template v-if="currentDevice === 'iOS'">A15 Bionic</template>
								<template v-else-if="currentDevice === 'Android'">Snapdragon</template>
								<template v-else-if="currentDevice === 'Windows'">AMD YES</template>
								<template v-else-if="currentDevice === 'macOS'">M1 Ultra</template>
								<template v-else>Intel</template>
							</div>
							<div>
								<template v-if="currentDevice === 'iOS'">iPhone</template>
								<template v-else-if="currentDevice === 'Android'">Android</template>
								<template v-else-if="currentDevice === 'Windows'">Windows</template>
								<template v-else-if="currentDevice === 'macOS'">MacBook Pro</template>
								<template v-else>Ubuntu</template>
							</div>
						</div>
					</div>
				</Grid>
				<Grid row="2">
					<div
						class="flex h-full flex-col justify-around rounded-lg bg-white p-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
					>
						<div class="flex justify-center">
							<Switch radius="full">
								<template #false>
									<div><Icon name="ri-bluetooth-line" :size="12" :y="-1" /></div>
								</template>
								<template #true>
									<div><Icon name="ri-bluetooth-connect-line" :size="12" state="theme" :y="-1" /></div>
								</template>
							</Switch>
						</div>
						<div>Bluetooth</div>
					</div>
				</Grid>
				<Grid row="4">
					<div
						class="flex h-full flex-col items-center justify-around rounded-lg bg-white text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
					>
						<div class="w-1/2 overflow-hidden">
							<img class="block dark:hidden" src="/assets/vtdf_512px.png" alt="" />
							<img class="hidden dark:block" src="/assets/vtdf_dark_512px.png" alt="" />
						</div>
						<div>VTDF</div>
					</div>
				</Grid>
				<Grid row="3">
					<div
						class="flex h-full flex-col justify-around rounded-lg bg-white text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
					>
						<div>92%</div>
						<div class="animate-pulse">
							<Icon name="ri-battery-2-charge-line" :size="30" inj-class="text-purple" />
						</div>
						<div>charging</div>
					</div>
				</Grid>
				<Grid row="2">
					<div
						class="flex h-full flex-col justify-center rounded-lg bg-white text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
					>
						<Icon v-if="currentDevice === 'iOS'" name="ri-smartphone-line" :size="30" />
						<Icon v-else-if="currentDevice === 'Android'" name="ri-tablet-line" :size="30" />
						<Icon v-else-if="currentDevice === 'Windows'" name="ri-computer-line" :size="30" />
						<Icon v-else-if="currentDevice === 'macOS'" name="ri-macbook-fill" :size="30" />
						<Icon v-else name="ri-ubuntu-line" :size="30" />
					</div>
				</Grid>
				<Grid row="2">
					<div
						class="flex h-full flex-col items-center justify-around rounded-lg bg-white py-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
					>
						<div>
							<Icon name="ri-sun-line" :size="20" />
						</div>
						<div>
							<div>68%</div>
						</div>
					</div>
				</Grid>
				<Grid row="2">
					<div
						class="flex h-full flex-col justify-around rounded-lg bg-white p-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
					>
						<div class="flex justify-center">
							<Switch radius="full">
								<template #false>
									<div><Icon name="ri-wifi-off-line" :size="12" /></div>
								</template>
								<template #true>
									<div><Icon name="ri-wifi-line" :size="12" state="theme" /></div>
								</template>
							</Switch>
						</div>
						<div>Wi-Fi</div>
					</div>
				</Grid>
			</Grids>
		</div>
	</div>
</template>
