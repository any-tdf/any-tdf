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
				<Switch active injClass="bg-success dark:bg-success" />
				<Switch active injClass="bg-error dark:bg-error" />
				<Switch active injClass="bg-warning dark:bg-warning" />
				<Switch active injClass="stdf-demo-switch-bg" />
			</div>
		</div>
		<div>
			<div class="mb-4 font-bold">With Text / State / Icon</div>
			<div class="flex justify-between">
				<Switch inside={['OF', 'ON']} />
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
					<Switch async active={checkAsync} onclick={switchClickFun} />
					<div class="text-sm">Wait 2 seconds</div>
				</div>
				<div class="flex flex-col items-center space-y-2">
					<Switch async active={loadingCheck} loading={{ theme: true }} onclick={loadingFun} inside={loading ? 'loading' : null} />
					<div class="text-sm">Wait 3 seconds</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mb-4 px-4 font-bold">Used in Cell</div>
	<Cell title="Switch" detail="Click anywhere in the row to trigger the switch" right={{ type: 'switch' }} />
	<Cell title="Switch with Text" right={{ type: 'switch', switch: { inside: ['😭', '😄'] } }} switchActive />
	<Cell title="Full Radius Switch" right={{ type: 'switch', switch: { radius: 'full' } }} />
	<Cell
		title="Async Control"
		detail="Switch triggered 2 seconds after click"
		right={{ type: 'switch', switch: { async: true } }}
		switchActive={cellCheck}
		onclick={cellAsyncFun}
	/>
	<Cell
		title="Async Loading"
		detail="Switch triggered 3 seconds after click"
		right={{ type: 'switch', switch: { async: true, inside: cellLoading ? 'loading' : null } }}
		switchActive={cellLoadingCheck}
		onclick={cellLoadingFun}
	/>
	<Cell title="Disabled Switch" right={{ type: 'switch', switch: { disabled: true } }} switchActive />

	<Cell
		title="Double Confirmation"
		right={{ type: 'switch', switch: { async: true } }}
		bind:switchActive={confirmswitchActive}
		onclick={() => (visible = true)}
	/>
	<Dialog
		bind:visible
		content={`Are you sure you want to ${confirmswitchActive ? 'turn off' : 'turn on'}?`}
		onprimary={() => {
			visible = false;
			confirmswitchActive = !confirmswitchActive;
		}}
	/>
</div>
