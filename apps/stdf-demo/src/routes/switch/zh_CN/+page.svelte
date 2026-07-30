<!-- Switch Demo -->
<script lang="ts">
	import { Switch, Icon, Cell, Dialog } from 'stdf';

	let checkAsync = $state(false);
	const switchClickFun = () => {
		setTimeout(() => {
			checkAsync = !checkAsync;
		}, 2000);
	};
	let cellCheck = $state(false);
	const cellAsyncFun = () => {
		setTimeout(() => {
			cellCheck = !cellCheck;
		}, 2000);
	};
	let loading = $state(false);
	let loadingCheck = $state(false);
	const loadingFun = () => {
		loading = true;
		setTimeout(() => {
			loadingCheck = !loadingCheck;
			loading = false;
		}, 3000);
	};
	let cellLoading = $state(false);
	let cellLoadingCheck = $state(false);
	const cellLoadingFun = () => {
		cellLoading = true;
		setTimeout(() => {
			cellLoadingCheck = !cellLoadingCheck;
			cellLoading = false;
		}, 3000);
	};
	let visible = $state(false);
	let confirmswitchActive = $state(false);
</script>

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
				<Switch active injClass="bg-success dark:bg-success" />
				<Switch active injClass="bg-error dark:bg-error" />
				<Switch active injClass="bg-warning dark:bg-warning" />
				<Switch active injClass="stdf-demo-switch-bg" />
			</div>
		</div>
		<div>
			<div class="mb-4 font-bold">带文字 / 状态 / 图标</div>
			<div class="flex justify-between">
				<Switch inside={['关', '开']} />
				<Switch inside={['😭', '😄']} />
				<Switch inside="state" />
				<Switch>
					{#snippet falseChild()}
						<div>
							<Icon name="ri-moon-line" size={16} y={-1} />
						</div>
					{/snippet}
					{#snippet trueChild()}
						<div>
							<Icon name="ri-sun-line" size={16} y={-1} />
						</div>
					{/snippet}
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
					<Switch async active={checkAsync} onclick={switchClickFun} />
					<div class="text-sm">点击 2 秒后触发</div>
				</div>
				<div class="flex flex-col items-center space-y-2">
					<Switch async active={loadingCheck} loading={{ theme: true }} onclick={loadingFun} inside={loading ? 'loading' : null} />
					<div class="text-sm">点击 3 秒后触发</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mb-4 px-4 font-bold">Cell 中使用</div>
	<Cell title="开关" detail="点击整行皆可触发开关" right={{ type: 'switch' }} />
	<Cell title="开关带文字" right={{ type: 'switch', switch: { inside: ['😭', '😄'] } }} switchActive />
	<Cell title="开关全圆角" right={{ type: 'switch', switch: { radius: 'full' } }} />
	<Cell
		title="异步控制"
		detail="点击 2 秒后触发开关"
		right={{ type: 'switch', switch: { async: true } }}
		switchActive={cellCheck}
		onclick={cellAsyncFun}
	/>
	<Cell
		title="异步加载"
		detail="点击 3 秒后触发开关"
		right={{ type: 'switch', switch: { async: true, inside: cellLoading ? 'loading' : null } }}
		switchActive={cellLoadingCheck}
		onclick={cellLoadingFun}
	/>
	<Cell title="禁用开关" right={{ type: 'switch', switch: { disabled: true } }} switchActive />

	<Cell
		title="二次确认"
		right={{ type: 'switch', switch: { async: true } }}
		bind:switchActive={confirmswitchActive}
		onclick={() => (visible = true)}
	/>
	<Dialog
		bind:visible
		content={`确定${confirmswitchActive ? '关闭' : '开启'}吗？`}
		onprimary={() => {
			visible = false;
			confirmswitchActive = !confirmswitchActive;
		}}
	/>
</div>
