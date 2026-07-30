<!-- TimePickerDemo Demo -->
<script lang="ts">
	import { Cell, TimePicker } from 'stdf';

	let visible1 = $state(false);
	let visible2 = $state(false);
	let visible3 = $state(false);
	let visible4 = $state(false);
	let visible5 = $state(false);
	let visible6 = $state(false);
	let visible8 = $state(false);
	let visible9 = $state(false);
	let visible10 = $state(false);
	let visible11 = $state(false);
	let visible12 = $state(false);
	let visible13 = $state(false);
	let visible14 = $state(false);
	let visible15 = $state(false);
	let visible16 = $state(false);
	let visible17 = $state(false);
	let visible18 = $state(false);
	let visible19 = $state(false);
	let visible20 = $state(false);
	let visible21 = $state(false);
	let visible22 = $state(false);

	let defaultTimeStr = $state('');
	let customFormatStr = $state('');
	let monthFirstStr = $state('');
	let timeObj = $state({});
	let timeObjStr = $derived(JSON.stringify(timeObj));
</script>

<div class="py-4">
	<div class="px-4">
		{#if defaultTimeStr !== ''}
			Currently selected:
			<span class="mr-2 text-primary dark:text-dark">{defaultTimeStr}</span>
		{:else}
			<div>Please select a time</div>
		{/if}
	</div>
	<Cell title="Basic Usage" subTitle="Default to current time, can select 10 years before and after" onclick={() => (visible1 = true)} />
	<TimePicker bind:visible={visible1} onconfirm={(time) => (defaultTimeStr = time)} />

	<Cell title="Year Month Day only" onclick={() => (visible2 = true)} />
	<TimePicker bind:visible={visible2} type="YYYYMMDD" />

	<Cell title="Hour Minute Second only" onclick={() => (visible3 = true)} />
	<TimePicker bind:visible={visible3} type="hhmmss" />

	<Cell title="Year Month Day Hour only" onclick={() => (visible4 = true)} />
	<TimePicker bind:visible={visible4} type="YYYYMMDDhh" />

	<Cell title="Hide Tips" onclick={() => (visible5 = true)} />
	<TimePicker bind:visible={visible5} showTips={false} />

	<Cell title="Different visible rows for each column" onclick={() => (visible6 = true)} />
	<TimePicker
		bind:visible={visible6}
		yearProps={{ showRow: 3 }}
		hourProps={{ showRow: 7 }}
		minuteProps={{ showRow: 7 }}
		secondProps={{ showRow: 7 }}
	/>

	<Cell title="Different widths for each column" onclick={() => (visible8 = true)} />
	<TimePicker bind:visible={visible8} yearProps={{ flex: 3 }} dayProps={{ flex: 2 }} />

	<Cell title="Year data right-aligned, day data left-aligned" onclick={() => (visible22 = true)} />
	<TimePicker bind:visible={visible22} type="YYYYMMDD" yearProps={{ align: 'right' }} dayProps={{ align: 'left' }} />

	<Cell title="Limit year range" onclick={() => (visible9 = true)} />
	<TimePicker bind:visible={visible9} yearRange={[2022, 2025]} />

	<Cell title="Limit month range" onclick={() => (visible10 = true)} />
	<TimePicker bind:visible={visible10} monthRange={[2, 5]} />

	<Cell title="Limit hour, minute, second range" onclick={() => (visible11 = true)} />
	<TimePicker bind:visible={visible11} hourRange={[2, 5]} minuteRange={[25, 45]} secondRange={[5, 10]} />

	<Cell title="Minute step of 5" onclick={() => (visible12 = true)} />
	<TimePicker bind:visible={visible12} minuteStep={5} />

	<Cell title="Second step of 10" onclick={() => (visible13 = true)} />
	<TimePicker bind:visible={visible13} secondStep={10} />

	<div class="px-4">
		{#if customFormatStr !== ''}
			Currently selected:
			<span class="mr-2 text-primary dark:text-dark">{customFormatStr}</span>
		{:else}
			<div>Please select a time</div>
		{/if}
	</div>
	<Cell
		title="Custom return time format"
		subTitle="Output format: X year X month X day X hour X minute X second"
		onclick={() => (visible15 = true)}
	/>
	<TimePicker
		bind:visible={visible15}
		outFormat="YYYY year MM month DD day hh hour mm minute ss second"
		onconfirm={(timeStr) => (customFormatStr = timeStr)}
	/>

	<div class="px-4">
		{#if monthFirstStr !== ''}
			Currently selected:
			<span class="mr-2 text-primary dark:text-dark">{monthFirstStr}</span>
		{:else}
			<div>Please select a time</div>
		{/if}
	</div>
	<Cell title="Return time with month first" onclick={() => (visible16 = true)} />
	<TimePicker bind:visible={visible16} type="YYYYMMDD" outFormat="MM/DD/YYYY" onconfirm={(timeStr) => (monthFirstStr = timeStr)} />

	<div class="px-4 text-xs">
		Currently selected:<br />
		<span class="mr-2 break-words text-primary dark:text-dark">{timeObjStr}</span>
	</div>
	<Cell title="Return time object" onclick={() => (visible17 = true)} />
	<TimePicker bind:visible={visible17} onconfirm={(_, obj) => (timeObj = obj)} />

	<Cell title="Rounded corners at the top" onclick={() => (visible14 = true)} />
	<TimePicker bind:visible={visible14} popup={{ radius: 'xl' }} />

	<Cell title="Custom title" onclick={() => (visible18 = true)} />
	<TimePicker bind:visible={visible18} title="Please select a time" />

	<Cell title="Specify initial selected year" onclick={() => (visible19 = true)} />
	<TimePicker bind:visible={visible19} initYear="2020" />

	<Cell title="Specify initial selected month" onclick={() => (visible20 = true)} />
	<TimePicker bind:visible={visible20} initMonth="05" />

	<Cell title="Specify initial selected hour, minute, second" onclick={() => (visible21 = true)} />
	<TimePicker bind:visible={visible21} initHour="05" initMinute="05" initSecond="05" />

	<div class="px-4 py-2">Without Popup</div>
	<TimePicker popup={null} type="YYYYMMDD" height={30} />
</div>
