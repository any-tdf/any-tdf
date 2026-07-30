<!--Progress Demo-->
<script lang="ts">
	import { Progress, ButtonGroup } from 'stdf';

	let percent = $state(20);
	const changePercentFun = (type: string) => {
		if (type === '+10') {
			percent = percent >= 100 ? 100 : percent + 10;
		} else {
			percent = percent <= 0 ? 0 : percent - 10;
		}
	};
</script>

<div class="px-4 pb-8">
	<div class="m-4 mt-8 text-lg font-bold">Basic usage</div>
	<Progress />

	<div class="m-4 mt-8 text-lg font-bold">Different heights</div>
	<div class="flex flex-col space-y-4">
		<Progress height="1" />
		<Progress height="2" />
		<Progress height="3" />
		<Progress height="4" />
	</div>

	<div class="m-4 mt-8 text-lg font-bold">Percentage different position</div>
	<div class="flex flex-col space-y-4">
		<Progress />
		<Progress percentPosition="inner" />
		<Progress percentPosition="block" />
		<Progress percentPosition={null} />
	</div>

	<div class="m-4 mt-8 text-lg font-bold">Different styles of rounded corners</div>
	<div class="flex flex-col space-y-4">
		<Progress radius="none" />
		<Progress radius="md" />
		<Progress radius="none" percentPosition="block" />
		<Progress radius="md" percentPosition="block" />
		<Progress percentPosition="block" />
	</div>

	<div class="m-4 mt-8 text-lg font-bold">Inactive</div>
	<div class="flex flex-col space-y-4">
		<Progress inactive />
		<Progress inactive percentPosition="block" />
	</div>

	<div class="m-4 mt-8 text-lg font-bold">Transition effect</div>
	<div class="mb-4 flex flex-col space-y-4 px-2">
		<Progress {percent} />
		<Progress {percent} percentPosition="inner" />
		<Progress {percent} percentPosition="block" />
		<Progress {percent} duration="500" />
		<Progress {percent} duration="1000" />
	</div>
	<ButtonGroup heightIn="0" size="full">
		<button class="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black" onclick={() => changePercentFun('-10')}>
			-10
		</button>
		<button class="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black" onclick={() => changePercentFun('+10')}>
			+10
		</button>
		<button class="flex-1 py-2 active:opacity-80" onclick={() => (percent = 20)}>Reset</button>
	</ButtonGroup>

	<div class="m-4 mt-8 text-lg font-bold">Custom color</div>
	<div class="flex flex-col space-y-4">
		<Progress injClass="bg-success dark:bg-error" />
		<Progress injClass="stdf-demo-gradient-primary" />
		<Progress percentPosition="block" injClass="stdf-demo-progress-fill" />
		<Progress trackInjClass="!bg-primary/20 dark:!bg-dark/20" />
	</div>

	<div class="m-4 mt-8 text-lg font-bold">Custom text</div>
	<div class="flex flex-col space-y-4">
		<Progress>
			<div class="whitespace-nowrap text-xs">completed 2/3</div>
		</Progress>
		<Progress percentPosition="block">
			<div class="whitespace-nowrap text-xs">completed 2/3</div>
		</Progress>
	</div>
</div>
