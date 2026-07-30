<!-- Grids Demo -->
<script lang="ts">
	import { Grids, Grid, Placeholder, Switch, Icon, Button } from 'stdf';

	const devices = ['iOS', 'Android', 'Windows', 'macOS', 'Ubuntu'];
	let curentIndex: number = $state(0);
	let currentDevice: string = $derived(devices[curentIndex]);
	const changeDeviceFun = () => {
		if (curentIndex === devices.length - 1) {
			curentIndex = 0;
		} else {
			curentIndex++;
		}
	};
	let color = $state(false);
	let colorCss = $derived(color ? ' bg-linear-to-tr from-blue/70 to-purple/70' : ' bg-gray-100 dark:bg-gray-700');
	const changeColorFun = (active: boolean) => {
		color = active;
	};
	//获取当前时间
	const date = new Date();
	//获取当前月份转为汉字
	const monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
	const monthIndex = date.getMonth();
	let month = $derived(monthArr[monthIndex]);
	const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	let time = $derived(`${hour}:${minute}`);
	//获取中文周几
	const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
	let weekDay = $derived(week[date.getDay()]);
</script>

<div class="mt-8 px-4 font-bold">使用占位符示例 3﹡4</div>
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

<div class="mt-8 px-4 font-bold">使用占位符示例 4﹡6</div>
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

<div class="mt-8 px-4 font-bold">增加外边距与单元格间距</div>
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

<div class="mt-8 px-4 font-bold">场景示例 6﹡5</div>
<div class="pb-8 pt-2">
	<div class="mx-2 rounded-xl p-2 shadow-sm transition duration-300{colorCss}">
		<Grids cols="5" mx="0" my="0">
			<Grid row="3">
				<div
					class="flex h-full flex-col justify-between rounded-lg bg-white p-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
				>
					<div>{weekDay}</div>
					<div class="text-4xl">{day}</div>
					<div class="text-gray-600">{month}</div>
				</div>
			</Grid>
			<Grid row="2">
				<div
					class="flex h-full flex-col justify-center rounded-lg bg-white p-1 text-center text-xl font-bold shadow-sm dark:bg-black dark:shadow-white/10"
				>
					{time}
				</div>
			</Grid>
			<Grid row="2">
				<div
					class="flex h-full flex-col justify-around rounded-lg bg-white p-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
				>
					<div class="flex justify-center">
						<Switch radius="full" onchange={changeColorFun}>
							{#snippet falseChild()}
								<div><Icon name="ri-paint-brush-line" size={12} /></div>
							{/snippet}
							{#snippet trueChild()}
								<div><Icon name="ri-paint-brush-fill" size={12} state="theme" /></div>
							{/snippet}
						</Switch>
					</div>
					<div>彩色</div>
				</div>
			</Grid>

			<Grid row="2" col="2">
				<div
					class="flex h-full flex-col justify-center rounded-lg bg-white text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
				>
					<Button fill="lineState" radius="full" onclick={changeDeviceFun}>切换设备</Button>
				</div>
			</Grid>
			<Grid row="2" col="2">
				<div
					class="flex h-full justify-around rounded-lg bg-white p-1 py-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
				>
					<div class="flex flex-col justify-center">
						{#if currentDevice === 'iOS'}
							<Icon name="ri-apple-fill" size={30} />
						{:else if currentDevice === 'Android'}
							<Icon name="ri-android-fill" size={30} />
						{:else if currentDevice === 'Windows'}
							<Icon name="ri-windows-fill" size={30} />
						{:else if currentDevice === 'macOS'}
							<Icon name="ri-command-fill" size={30} />
						{:else}
							<Icon name="ri-ubuntu-fill" size={30} />
						{/if}
					</div>
					<div class="flex flex-col justify-around">
						<div class="text-sm">
							{#if currentDevice === 'iOS'}
								A15 Bionic
							{:else if currentDevice === 'Android'}
								骁龙 8 Gen1
							{:else if currentDevice === 'Windows'}
								AMD YES
							{:else if currentDevice === 'macOS'}
								M1 Ultra
							{:else}
								Intel
							{/if}
						</div>
						<div>
							{#if currentDevice === 'iOS'}
								iPhone
							{:else if currentDevice === 'Android'}
								Android
							{:else if currentDevice === 'Windows'}
								Windows
							{:else if currentDevice === 'macOS'}
								MacBook Pro
							{:else}
								Ubuntu
							{/if}
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
							{#snippet falseChild()}
								<div><Icon name="ri-bluetooth-line" size={12} y={-1} /></div>
							{/snippet}
							{#snippet trueChild()}
								<div><Icon name="ri-bluetooth-connect-line" size={12} state="theme" y={-1} /></div>
							{/snippet}
						</Switch>
					</div>
					<div>蓝 牙</div>
				</div>
			</Grid>
			<Grid row="4">
				<div
					class="flex h-full flex-col items-center justify-around rounded-lg bg-white text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
				>
					<div class="w-1/2 overflow-hidden">
						<img class="block dark:hidden" src="/assets/stdf_512px.png" alt="" />
						<img class="hidden dark:block" src="/assets/stdf_dark_512px.png" alt="" />
					</div>
					<div>STDF</div>
				</div>
			</Grid>
			<Grid row="3">
				<div
					class="flex h-full flex-col justify-around rounded-lg bg-white text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
				>
					<div>92%</div>
					<div class="animate-pulse">
						<Icon name="ri-battery-2-charge-line" size={30} injClass="text-purple" />
					</div>
					<div>充电中</div>
				</div>
			</Grid>
			<Grid row="2">
				<div
					class="flex h-full flex-col justify-center rounded-lg bg-white text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
				>
					{#if currentDevice === 'iOS'}
						<Icon name="ri-smartphone-line" size={30} />
					{:else if currentDevice === 'Android'}
						<Icon name="ri-tablet-line" size={30} />
					{:else if currentDevice === 'Windows'}
						<Icon name="ri-computer-line" size={30} />
					{:else if currentDevice === 'macOS'}
						<Icon name="ri-macbook-fill" size={30} />
					{:else}
						<Icon name="ri-ubuntu-line" size={30} />
					{/if}
				</div>
			</Grid>
			<Grid row="2">
				<div
					class="flex h-full flex-col items-center justify-around rounded-lg bg-white py-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10"
				>
					<div>
						<Icon name="ri-sun-line" size={20} />
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
							{#snippet falseChild()}
								<div><Icon name="ri-wifi-off-line" size={12} /></div>
							{/snippet}
							{#snippet trueChild()}
								<div><Icon name="ri-wifi-line" size={12} state="theme" /></div>
							{/snippet}
						</Switch>
					</div>
					<div>Wi-Fi</div>
				</div>
			</Grid>
		</Grids>
	</div>
</div>
