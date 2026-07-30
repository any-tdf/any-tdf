<!-- Calendar Demo -->
<script lang="ts">
	import { Cell, Calendar } from 'stdf';
	import type { InfoDateProps } from 'stdf/types';

	let visible1 = $state(false);
	let visible2 = $state(false);
	let visible3 = $state(false);
	let visible4 = $state(false);
	let visible5 = $state(false);
	let visible6 = $state(false);
	let visible7 = $state(false);
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
	let visible23 = $state(false);
	let visible24 = $state(false);
	let visible25 = $state(false);

	// The 6 days after the current date randomly takes out the INFODATES array, the Date format is yyyymmdd, and the month and day make up for 2 digits
	const now = new Date();
	const infoDates: InfoDateProps[] = $state([]);
	for (let i = 0; i < 6; i++) {
		const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
		infoDates.push({
			text: `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`,
			info: ''
		});
	}
	// Loop infoDates, in turn, each item is converted to an object, date is the date, and info is respectively departure, check-in, shopping, photography, check-out, and return
	infoDates.forEach((date, index) => {
		infoDates[index] = {
			text: date.text,
			info: ['Set off', 'Stay', 'Shopping', 'Photo', 'Leave', 'Return'][index]
		};
	});

	// For a total of 14 days before the current date and 7 days after 7 days, the formation of the array DisableDates. The DATE format is yyyymmdd, and the month and day are added.
	const disabledDates: string[] = [];
	const before7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	for (let i = 0; i < 14; i++) {
		const date = new Date(before7.getTime() + i * 24 * 60 * 60 * 1000);
		disabledDates.push(
			`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`
		);
	}
	// Pass the number N and return to the month of the N -month month in the current month. The format is yyyymm, and the month is added 2 digits.
	const getInitMonth = (n: number) => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const newMonth = month - n;
		if (newMonth > 0) {
			return `${year}${newMonth.toString().padStart(2, '0')}`;
		} else {
			return `${year - 1}${(12 + newMonth).toString().padStart(2, '0')}`;
		}
	};
	const initMonth = getInitMonth(3);

	const quickSelectsDay = [-5, -2, 3, 7];

	let selectedDates: string[] = $state([]);
	const getSelectedDatesFunc = (dates: string[]) => {
		selectedDates = dates;
	};

	let selectedFormatDates: string[] = $state([]);
	const getSelectedFormatDatesFunc = (dates: string[]) => {
		selectedFormatDates = dates;
	};

	let noPopupDates: string[] = $state([]);
	const getNoPopupDatesFunc = (dates: string[]) => {
		noPopupDates = dates;
	};
</script>

<div class="py-4">
	<Cell title="Basic usage" onclick={() => (visible1 = true)} />
	<Calendar bind:visible={visible1} />

	<Cell title="Choice" onclick={() => (visible7 = true)} />
	<Calendar bind:visible={visible7} mode="multiple" />

	<Cell title="Range selection" onclick={() => (visible8 = true)} />
	<Calendar bind:visible={visible8} mode="range" />

	<Cell title="Starting from Sunday" onclick={() => (visible2 = true)} />
	<Calendar bind:visible={visible2} startSunday />

	<Cell title="Weekend text marking red" onclick={() => (visible3 = true)} />
	<Calendar bind:visible={visible3} weekendRed />

	<Cell title="No card style but add watermark" onclick={() => (visible4 = true)} />
	<Calendar bind:visible={visible4} monthCard={false} monthMark />

	<Cell title="Higher" onclick={() => (visible5 = true)} />
	<Calendar bind:visible={visible5} height={60} />

	<Cell title="Customize the date of display information" onclick={() => (visible6 = true)} />
	<Calendar bind:visible={visible6} {infoDates} />

	<Cell title="Do not round the corner" onclick={() => (visible9 = true)} />
	<Calendar bind:visible={visible9} mode="range" radius="none" />

	<Cell title="Increase the corner" onclick={() => (visible10 = true)} />
	<Calendar bind:visible={visible10} mode="range" radius="2xl" />

	<Cell title="Turn off the animation when rolling" onclick={() => (visible18 = true)} />
	<Calendar bind:visible={visible18} useAnimation={false} />

	<Cell title="Configure confirmation button style" onclick={() => (visible11 = true)} />
	<Calendar bind:visible={visible11} button={{ radius: 'full' }} />

	<Cell title="Top rounded corner" onclick={() => (visible19 = true)} />
	<Calendar bind:visible={visible19} popup={{ radius: 'xl' }} />

	<Cell title="Definition start and end month" onclick={() => (visible12 = true)} />
	<Calendar bind:visible={visible12} startMonth="202101" endMonth="202106" />

	<Cell title="Customize the unsalented date" onclick={() => (visible13 = true)} />
	<Calendar bind:visible={visible13} {disabledDates} mode="range" />

	<Cell title="No showed days have been displayed" onclick={() => (visible14 = true)} />
	<Calendar bind:visible={visible14} mode="range" showSelectedDay={false} />

	<Cell title="Customized initial display month" subTitle="Third month before the current month" onclick={() => (visible15 = true)} />
	<Calendar bind:visible={visible15} {initMonth} />

	<Cell title="Show some fast selection items" onclick={() => (visible16 = true)} />
	<Calendar bind:visible={visible16} mode="range" quickSelects={['week', 'month', 'quarter', -3, -7, -30, 3, 7, 30]} />

	<Cell title="Quickly choose to include that day" onclick={() => (visible23 = true)} />
	<Calendar bind:visible={visible23} mode="range" quickSelects={quickSelectsDay} includeToday />

	<Cell title="Select this week from Sunday" onclick={() => (visible17 = true)} />
	<Calendar bind:visible={visible17} mode="range" startSunday quickSelects={['week']} />

	<div class="px-4">
		{#if selectedDates.length}
			The following is the following total {selectedDates.length} day:
		{:else}
			<div>Please select the date</div>
		{/if}
	</div>
	<div class="grid grid-cols-4 gap-2 p-2 text-primary dark:text-dark">
		{#each selectedDates as item}
			<div class="text-center">{item}</div>
		{/each}
	</div>
	<Cell title="Get the selection date of returning" onclick={() => (visible20 = true)} />
	<Calendar bind:visible={visible20} mode="range" onconfirm={getSelectedDatesFunc} />

	<div class="px-4">
		{#if selectedFormatDates.length}
			The following is the following total {selectedFormatDates.length} day:
		{:else}
			<div>Please select the date</div>
		{/if}
	</div>
	<div class="grid grid-cols-3 gap-2 p-2 text-sm text-primary dark:text-dark">
		{#each selectedFormatDates as item}
			<div class="text-center">{item}</div>
		{/each}
	</div>
	<Cell title="Customized date format" onclick={() => (visible21 = true)} />
	<Calendar bind:visible={visible21} mode="range" outFormat="M/D/Y" onconfirm={getSelectedFormatDatesFunc} />

	<Cell title="Turn off today's highlight display" onclick={() => (visible22 = true)} />
	<Calendar bind:visible={visible22} highlightToday={false} />

	<Cell title="Do not clear the selected date when closing" onclick={() => (visible24 = true)} />
	<Calendar bind:visible={visible24} mode="range" clear={false} />

	<Cell title="Custom month card style" onclick={() => (visible25 = true)} />
	<Calendar bind:visible={visible25} card={{ bg: 'theme' }} />

	<div class="px-4 py-2">Without popup</div>
	{#if noPopupDates.length}
		<div class="px-4">
			The following is the following total {noPopupDates.length} day:
		</div>
		<div class="grid grid-cols-4 gap-2 p-2 text-primary dark:text-dark">
			{#each noPopupDates as item}
				<div class="text-center">{item}</div>
			{/each}
		</div>
	{/if}
	<Calendar popup={null} mode="range" onconfirm={getNoPopupDatesFunc} />
</div>
