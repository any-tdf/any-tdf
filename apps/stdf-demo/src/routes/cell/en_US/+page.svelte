<!-- Cell Demo -->
<script lang="ts">
	import { Cell, CellGroup, Toast } from 'stdf';

	let visible = $state(false);
</script>

<div class="flex flex-col space-y-8 py-8">
	<div>
		<Cell title="Basic Usage" />
		<Cell title="With Detail" detail="Zeroing" />
		<Cell title="Detail with Snippet">
			{#snippet detailChild()}
				<span class="text-primary dark:text-dark text-xs">I'm Snippet</span>
			{/snippet}
		</Cell>
		<Cell title="No Arrow" right={null} />
		<Cell title="Display Only" right={null} clickAll={false} />
		<Cell title="Click Event" detail="Click Me" onclick={() => (visible = true)} />
		<Toast bind:visible message="You clicked me!" />
		<Cell title="Detail without Arrow" detail="Zeroing" right={null} />
		<Cell title="Switch (Click Row)" right={{ type: 'switch' }} />
		<Cell title="Switch with Detail" detail="Description" right={{ type: 'switch' }} />
		<Cell title="Switch with Text" right={{ type: 'switch', switch: { inside: ['😭', '😄'] } }} />
		<Cell title="Rounded Switch" right={{ type: 'switch', switch: { radius: 'full' } }} />
		<Cell title="Switch Only" clickAll={false} right={{ type: 'switch' }} />
		<Cell title="Left Icon" left={{ name: 'ri-bank-line', size: 20, state: 'theme' }} />
		<Cell title="Right Icon" right={{ type: 'icon', icon: { name: 'ri-battery-charge-line', size: 20, state: 'theme' } }} />
		<Cell title="Left Image">
			{#snippet leftChild()}
				<div class="mr-1 shrink-0">
					<img class="h-6 w-6" src="/assets/images/icon_颁奖.png" alt="" />
				</div>
			{/snippet}
		</Cell>
		<Cell title="Both Side Images">
			{#snippet leftChild()}
				<div class="mr-1 shrink-0">
					<img class="h-6 w-6" src="/assets/images/icon_评价.png" alt="" />
				</div>
			{/snippet}
			{#snippet rightChild()}
				<div class="mr-1 shrink-0">
					<img class="h-6 w-6" src="/assets/images/icon_美食.png" alt="" />
				</div>
			{/snippet}
		</Cell>
		<Cell title="Larger Image">
			{#snippet leftChild()}
				<div class="mr-1 shrink-0">
					<img class="h-10 w-10" src="/assets/images/icon_会员.png" alt="" />
				</div>
			{/snippet}
		</Cell>
		<Cell title="With Subtitle" subTitle="I'm subtitle" />
		<Cell title="Subtitle and Detail" subTitle="I'm subtitle" detail="Zeroing" />
		<Cell title="Secondary Info" detail="Zeroing" info="Reboot" />
		<Cell title="Both Secondary" subTitle="I'm subtitle" detail="Zeroing" info="Reboot" />
		<Cell title="Both Secondary" subTitle="I'm subtitle" detail="With Arrow" info="Reboot" />
		<Cell
			title="Both Secondary"
			subTitle="With Left Icon"
			detail="With Arrow"
			info="Reboot"
			left={{ name: 'ri-shopping-basket-line', theme: true }}
		/>
		<Cell title="All Features" subTitle="Left Custom Image" detail="Right Arrow" info="No Border">
			{#snippet leftChild()}
				<div class="mr-1 shrink-0">
					<img class="h-10 w-10" src="/assets/images/icon_火车票.png" alt="" />
				</div>
			{/snippet}
		</Cell>
		<Cell
			title="Long title that wraps automatically when it exceeds the width of the container."
			subTitle="Long subtitle that also wraps automatically when it exceeds the width."
		/>
		<Cell
			title="Large image with long title that wraps automatically. Try other combinations yourself."
			subTitle="Short subtitle"
			line={false}
		>
			{#snippet leftChild()}
				<div class="mr-1 shrink-0">
					<img class="h-20 w-20" src="/assets/images/icon_外卖.png" alt="" />
				</div>
			{/snippet}
		</Cell>
	</div>

	<CellGroup>
		<Cell title="Group Usage" mx="0" my="0" shadow="none" line radius="none" />
		<Cell title="Group Usage" mx="0" my="0" shadow="none" radius="none" />
	</CellGroup>
	<CellGroup mx="0" radius="none">
		<Cell title="Group Usage" detail="No Margin" mx="0" my="0" shadow="none" line radius="none" />
		<Cell title="Group Usage" detail="No Radius" mx="0" my="0" shadow="none" radius="none" />
	</CellGroup>
	<CellGroup shadow="xl" radius="2xl">
		<Cell title="Group Usage" detail="Large Shadow" mx="0" my="0" shadow="none" line radius="none" />
		<Cell title="Group Usage" detail="Large Radius" mx="0" my="0" shadow="none" radius="none" />
	</CellGroup>

	<div>
		<Cell title="No Margin" mx="0" radius="none" />
		<Cell title="No Radius" radius="none" />
		<Cell title="Base Radius" radius="sm" />
		<Cell title="Medium Radius" radius="md" />
		<Cell title="Large Radius" radius="lg" />
		<Cell title="XL Radius" radius="xl" />
		<Cell title="2XL Radius" radius="2xl" />
		<Cell title="Full Radius" radius="4xl" />
		<Cell title="Large Shadow" shadow="lg" />
	</div>
	<div>
		<Cell title="Custom Text Color" injClass="text-primary dark:text-dark" />
		<Cell title="Custom Background" injClass="!bg-blue/20 active:!bg-purple/10" line={false} />
	</div>
	<div>
		<Cell love title="Care Version" />
		<Cell love title="Care Version" detail="Care" />
		<Cell love title="Care Version" left={{ name: 'ri-hand-heart-line', theme: true }} />
	</div>
</div>
