<!--Loading Demo-->
<script lang="ts">
	import { Loading, Tabs, TabContent, Button } from 'stdf';

	//传入个数，返回随机生成的颜色数组
	const randomColorArr = (num: number) => {
		//随机生成 16 进制颜色
		const randomColor = () => '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
		let arr = [];
		for (let i = 0; i < num; i++) {
			arr.push(randomColor());
		}
		return arr;
	};

	const arr1 = Array.from({ length: 54 });
	const arr2 = Array.from({ length: 6 });
	const arr4 = Array.from({ length: 4 });
	const labels = [{ text: '单色' }, { text: '双色' }, { text: '四色' }, { text: '其他' }];

	const speedBtns = [0.5, 1, 2];
	let speed = $state(1);
</script>

<div class="py-4">
	<Tabs tab={{ labels }}>
		<TabContent>
			<div class="py-4">
				<div class="flex text-center text-sm font-bold">
					{#each ['默认色', '主题色', '自选色', '反差色', '反主色'] as item}
						<div class="flex-1 border border-black/5 py-2 dark:border-white/5">{item}</div>
					{/each}
				</div>
				<div class="grid grid-cols-5">
					<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
					{#each arr1 as _, i}
						<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
							<div class="h-8 w-8">
								<Loading type={'1_' + i} bind:speed />
							</div>
							<div class="mt-8 text-center text-xs">{'1_' + i}</div>
						</div>
						<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
							<div class="h-8 w-8">
								<Loading type={'1_' + i} theme bind:speed />
							</div>
							<div class="mt-8 text-center text-xs">{'1_' + i}</div>
						</div>
						<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
							<div class="h-8 w-8">
								<Loading type={'1_' + i} theme customColor={randomColorArr(1)} bind:speed />
							</div>
							<div class="mt-8 text-center text-xs">{'1_' + i}</div>
						</div>
						<div
							class="bg-bg-base-dark dark:bg-bg-base flex w-full flex-col items-center border border-white/5 py-6 text-white dark:border-black/5 dark:text-black"
						>
							<div class="h-8 w-8">
								<Loading type={'1_' + i} inverse bind:speed />
							</div>
							<div class="mt-8 text-center text-xs">{'1_' + i}</div>
						</div>
						<div
							class="bg-bg-base-dark dark:bg-bg-base flex w-full flex-col items-center border border-white/5 py-6 text-white dark:border-black/5 dark:text-black"
						>
							<div class="h-8 w-8">
								<Loading type={'1_' + i} theme inverse bind:speed />
							</div>
							<div class="mt-8 text-center text-xs">{'1_' + i}</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="p-4 text-xs">持续更新...</div>
		</TabContent>
		<TabContent>
			<div class="py-4">
				<div class="flex text-center text-sm font-bold">
					{#each ['默认色', '自选色', '反差色'] as item}
						<div class="flex-1 border border-black/5 py-2 dark:border-white/5">{item}</div>
					{/each}
				</div>
				<div class="grid grid-cols-3">
					<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
					{#each arr2 as _, i}
						<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
							<div class="h-8 w-8">
								<Loading type={'2_' + i} bind:speed />
							</div>
							<div class="mt-8 text-center text-xs">{'2_' + i}</div>
						</div>
						<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
							<div class="h-8 w-8">
								<Loading type={'2_' + i} customColor={randomColorArr(2)} bind:speed />
							</div>
							<div class="mt-8 text-center text-xs">{'2_' + i}</div>
						</div>
						<div
							class="bg-bg-base-dark dark:bg-bg-base flex w-full flex-col items-center border border-white/5 py-6 text-white dark:border-black/5 dark:text-black"
						>
							<div class="h-8 w-8">
								<Loading type={'2_' + i} inverse bind:speed />
							</div>
							<div class="mt-8 text-center text-xs">{'2_' + i}</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="p-4 text-xs">持续更新...</div>
		</TabContent>
		<TabContent>
			<div class="py-4">
				<div class="flex text-center text-sm font-bold">
					{#each ['默认色', '自选色', '默认色', '自选色'] as item}
						<div class="flex-1 border border-black/5 py-2 dark:border-white/5">{item}</div>
					{/each}
				</div>
				<div class="grid grid-cols-4">
					<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
					{#each arr4 as _, i}
						<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
							<div class="h-8 w-8">
								<Loading type={'4_' + i} bind:speed />
							</div>
							<div class="mt-8 text-center text-xs">{'4_' + i}</div>
						</div>
						<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
							<div class="h-8 w-8">
								<Loading type={'4_' + i} customColor={randomColorArr(4)} bind:speed />
							</div>
							<div class="mt-8 text-center text-xs">{'4_' + i}</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="p-4 text-xs">持续更新...</div>
		</TabContent>
		<TabContent>
			<div class="py-4"></div>
			<div class="p-4 text-xs">持续更新...</div>
		</TabContent>
	</Tabs>
</div>
<!-- 固定在底部的按钮组，控制速度 -->
<div class="sticky bottom-0 left-0 z-10 flex w-full justify-between gap-3 bg-white/60 px-2 backdrop-blur-sm dark:bg-black/60">
	{#each speedBtns as item}
		<div class="flex-1">
			<Button fill={speed === item ? 'base' : 'lineState'} size="full" injClass="text-xs px-2" onclick={() => (speed = item)}>
				{item} 倍速
			</Button>
		</div>
	{/each}
</div>
