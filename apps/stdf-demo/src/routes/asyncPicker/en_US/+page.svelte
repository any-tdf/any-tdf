<!-- AsyncPicker Demo -->
<script lang="ts">
	import { AsyncPicker, Cell } from 'stdf';
	// For the sake of clarity, the reference data is placed in the data_en.js file, which can be viewed at the bottom of this page.
	import { linkageData, linkageDiffLabeData } from './data_en.js';

	let visible1 = $state(false);
	let visible2 = $state(false);
	let visible3 = $state(false);
	let visible4 = $state(false);
	let visible5 = $state(false);
	let visible6 = $state(false);
	let visible7 = $state(false);
	let visible8 = $state(false);
	let visible9 = $state(false);

	let data = $state(linkageData);
	let currentLevel = $state(0);
	let lastLevel = $state(false);
	let firstLevel = $state(true);
	let level1Data = $state(linkageData[0].children);
	let titleBind = $state('Please select state');

	// Simulate data obtained after 2 seconds
	const nextFunc = (index: number) => {
		if (currentLevel === 0) {
			const nextData = linkageData[index].children;
			level1Data = nextData;
			setTimeout(() => {
				data = nextData as { label: string; children: { label: string; children: { label: string }[] }[] }[];
				currentLevel = 1;
				titleBind = 'Please select county';
				firstLevel = false;
			}, 2000);
		} else if (currentLevel === 1) {
			const nextData = level1Data[index].children;
			setTimeout(() => {
				data = nextData as { label: string; children: { label: string; children: { label: string }[] }[] }[];
				currentLevel = 2;
				titleBind = 'Please select district';
				lastLevel = true;
			}, 2000);
		} else {
			console.log('Last level');
		}
	};
	const prevFunc = () => {
		if (currentLevel === 1) {
			const prevData = linkageData;
			setTimeout(() => {
				data = prevData;
				currentLevel = 0;
				titleBind = 'Please select state';
				firstLevel = true;
			}, 2000);
		} else if (currentLevel === 2) {
			const prevData = level1Data;
			setTimeout(() => {
				data = prevData as { label: string; children: { label: string; children: { label: string }[] }[] }[];
				currentLevel = 1;
				titleBind = 'Please select county';
				lastLevel = false;
			}, 2000);
		} else {
			console.log('First level');
		}
	};

	let allIndexs: number[] = $state([]);
	let allItems: { label: string }[] = $state([]);
	const getAllDataFunc = (items: { label: string }[], indexs: number[]) => {
		allItems = items;
		allIndexs = indexs;
	};

	// 每一级对应的 labelKey 不同时的处理逻辑
	let diffLabelKeyData = $state(linkageDiffLabeData);
	let labelKey = $state('province');
	let diffLabelKeyCurrentLevel = $state(0);
	let diffLabelKeyLastLevel = $state(false);
	let diffLabelKeyFirstLevel = $state(true);
	let diffLabelKeyLevel1Data = $state(linkageDiffLabeData[0].children);
	const diffLabelKeyNextFunc = (index: number) => {
		if (diffLabelKeyCurrentLevel === 0) {
			const nextData = linkageDiffLabeData[index].children;
			diffLabelKeyLevel1Data = nextData;
			setTimeout(() => {
				diffLabelKeyData = nextData as unknown as { province: string; children: { city: string; children: { region: string }[] }[] }[];
				labelKey = 'city';
				diffLabelKeyCurrentLevel = 1;
				diffLabelKeyFirstLevel = false;
			}, 2000);
		} else if (diffLabelKeyCurrentLevel === 1) {
			const nextData = diffLabelKeyLevel1Data[index].children;
			setTimeout(() => {
				diffLabelKeyData = nextData as unknown as { province: string; children: { city: string; children: { region: string }[] }[] }[];
				diffLabelKeyCurrentLevel = 2;
				labelKey = 'region';
				diffLabelKeyLastLevel = true;
			}, 2000);
		} else {
			console.log('Last level');
		}
	};
	const diffLabelKeyPrevFunc = () => {
		if (diffLabelKeyCurrentLevel === 1) {
			const prevData = linkageDiffLabeData;
			setTimeout(() => {
				diffLabelKeyData = prevData;
				diffLabelKeyCurrentLevel = 0;
				diffLabelKeyFirstLevel = true;
				labelKey = 'province';
			}, 2000);
		} else if (diffLabelKeyCurrentLevel === 2) {
			const prevData = diffLabelKeyLevel1Data;
			setTimeout(() => {
				diffLabelKeyData = prevData as unknown as { province: string; children: { city: string; children: { region: string }[] }[] }[];
				diffLabelKeyCurrentLevel = 1;
				labelKey = 'city';
				diffLabelKeyLastLevel = false;
			}, 2000);
		} else {
			console.log('First level');
		}
	};

	// Without popup state
	let inlineData = $state(linkageData);
	let inlineCurrentLevel = $state(0);
	let inlineLastLevel = $state(false);
	let inlineFirstLevel = $state(true);
	let inlineLevel1Data = $state(linkageData[0].children);
	const inlineNextFunc = (index: number) => {
		if (inlineCurrentLevel === 0) {
			const nextData = linkageData[index].children;
			inlineLevel1Data = nextData;
			inlineData = [];
			setTimeout(() => {
				inlineData = nextData as { label: string; children: { label: string; children: { label: string }[] }[] }[];
				inlineCurrentLevel = 1;
				inlineFirstLevel = false;
			}, 1000);
		} else if (inlineCurrentLevel === 1) {
			const nextData = inlineLevel1Data[index].children;
			inlineData = [];
			setTimeout(() => {
				inlineData = nextData as { label: string; children: { label: string; children: { label: string }[] }[] }[];
				inlineCurrentLevel = 2;
				inlineLastLevel = true;
			}, 1000);
		}
	};
	const inlinePrevFunc = () => {
		if (inlineCurrentLevel === 1) {
			inlineData = [];
			setTimeout(() => {
				inlineData = linkageData;
				inlineCurrentLevel = 0;
				inlineFirstLevel = true;
			}, 1000);
		} else if (inlineCurrentLevel === 2) {
			inlineData = [];
			setTimeout(() => {
				inlineData = inlineLevel1Data as { label: string; children: { label: string; children: { label: string }[] }[] }[];
				inlineCurrentLevel = 1;
				inlineLastLevel = false;
			}, 1000);
		}
	};
</script>

<div class="py-4">
	<div class="px-4">
		{#if allItems.length}
			Currently selected:
			{#each allItems as item}
				<span class="mr-2 text-primary dark:text-dark">{item.label}</span>
			{/each}
		{:else}
			<div>Please select data</div>
		{/if}
	</div>
	<div class="px-4">
		{#if allIndexs.length}
			The index values of current selections in their respective columns are:
			{#each allIndexs as index}
				<span class="mr-2 text-primary dark:text-dark">{index}</span>
			{/each}
		{:else}
			<div>Please select data</div>
		{/if}
	</div>
	<Cell
		title="Basic Usage"
		onclick={() => {
			visible1 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker
		bind:visible={visible1}
		bind:data
		bind:lastLevel
		bind:firstLevel
		onnext={nextFunc}
		onprev={prevFunc}
		onconfirm={getAllDataFunc as (items: Record<string, unknown>[], indexs: number[]) => void}
	/>

	<Cell
		title="Show 7 Rows"
		onclick={() => {
			visible2 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker bind:visible={visible2} bind:data bind:lastLevel bind:firstLevel onnext={nextFunc} onprev={prevFunc} showRow={7} />

	<Cell
		title="Left Align"
		onclick={() => {
			visible3 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker bind:visible={visible3} bind:data bind:lastLevel bind:firstLevel align="left" onnext={nextFunc} onprev={prevFunc} />

	<Cell
		title="Custom Next/Previous Text"
		onclick={() => {
			visible5 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker
		bind:visible={visible5}
		bind:data
		bind:lastLevel
		bind:firstLevel
		onnext={nextFunc}
		onprev={prevFunc}
		nextText="Continue"
		prevText="Back"
	/>

	<Cell
		title="Different labelKey for Each Level"
		onclick={() => {
			visible4 = true;
			diffLabelKeyData = linkageDiffLabeData;
			labelKey = 'province';
			diffLabelKeyCurrentLevel = 0;
			diffLabelKeyLastLevel = false;
			diffLabelKeyFirstLevel = true;
			diffLabelKeyLevel1Data = linkageDiffLabeData[0].children;
		}}
	/>
	<AsyncPicker
		bind:visible={visible4}
		bind:data={diffLabelKeyData}
		bind:lastLevel={diffLabelKeyLastLevel}
		bind:firstLevel={diffLabelKeyFirstLevel}
		bind:labelKey
		onnext={diffLabelKeyNextFunc}
		onprev={diffLabelKeyPrevFunc}
	/>

	<Cell
		title="Different Loading Effect"
		onclick={() => {
			visible6 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker
		bind:visible={visible6}
		bind:data
		bind:lastLevel
		bind:firstLevel
		onnext={nextFunc}
		onprev={prevFunc}
		loading={{ type: '1_15', width: '12', height: '12' }}
	/>

	<Cell
		title="Rounded Top Corners"
		onclick={() => {
			visible8 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker
		bind:visible={visible8}
		bind:data
		bind:lastLevel
		bind:firstLevel
		onnext={nextFunc}
		onprev={prevFunc}
		popup={{ radius: 'xl' }}
	/>

	<Cell
		title="Show Selected Options"
		onclick={() => {
			visible7 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker bind:visible={visible7} bind:data bind:lastLevel bind:firstLevel onnext={nextFunc} onprev={prevFunc} showSelected />

	<Cell
		title="Dynamic Title"
		onclick={() => {
			visible9 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			titleBind = 'Please select state';
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker
		bind:visible={visible9}
		bind:data
		bind:lastLevel
		bind:firstLevel
		bind:title={titleBind}
		onnext={nextFunc}
		onprev={prevFunc}
	/>

	<div class="px-4 py-2">Without Popup</div>
	<AsyncPicker
		popup={null}
		bind:data={inlineData}
		bind:lastLevel={inlineLastLevel}
		bind:firstLevel={inlineFirstLevel}
		onnext={inlineNextFunc}
		onprev={inlinePrevFunc}
		height={30}
	/>
</div>
<!--
const linkageData = [
	{
		label: 'California',
		children: [
			{
				label: 'Los Angeles',
				children: [
					{ label: 'Downtown' },
					{ label: 'Hollywood' },
					{ label: 'Venice' },
					{ label: 'Santa Monica' },
					{ label: 'Beverly Hills' }
				]
			},
			{
				label: 'San Francisco',
				children: [
					{ label: 'Downtown' },
					{ label: 'Mission District' },
					{ label: 'North Beach' },
					{ label: 'Chinatown' },
					{ label: 'Haight-Ashbury' }
				]
			},
			{
				label: 'San Diego',
				children: [
					{ label: 'Downtown' },
					{ label: 'La Jolla' },
					{ label: 'Pacific Beach' },
					{ label: 'Mission Beach' },
					{ label: 'Coronado' }
				]
			}
		]
	},
	{
		label: 'New York',
		children: [
			{
				label: 'New York City',
				children: [{ label: 'Manhattan' }, { label: 'Brooklyn' }, { label: 'Queens' }, { label: 'The Bronx' }, { label: 'Staten Island' }]
			},
			{
				label: 'Buffalo',
				children: [
					{ label: 'Downtown' },
					{ label: 'North Buffalo' },
					{ label: 'South Buffalo' },
					{ label: 'East Side' },
					{ label: 'West Side' }
				]
			}
		]
	},
	{
		label: 'Texas',
		children: [
			{
				label: 'Houston',
				children: [{ label: 'Downtown' }, { label: 'Midtown' }, { label: 'The Heights' }, { label: 'River Oaks' }, { label: 'Memorial' }]
			},
			{
				label: 'Dallas',
				children: [{ label: 'Downtown' }, { label: 'Uptown' }, { label: 'Deep Ellum' }, { label: 'Oak Lawn' }, { label: 'Highland Park' }]
			},
			{
				label: 'Austin',
				children: [
					{ label: 'Downtown' },
					{ label: 'South Congress' },
					{ label: 'East Austin' },
					{ label: 'West Lake Hills' },
					{ label: 'North Loop' }
				]
			}
		]
	},
	{
		label: 'Florida',
		children: [
			{
				label: 'Miami',
				children: [
					{ label: 'Downtown' },
					{ label: 'South Beach' },
					{ label: 'Brickell' },
					{ label: 'Coconut Grove' },
					{ label: 'Little Havana' }
				]
			},
			{
				label: 'Orlando',
				children: [
					{ label: 'Downtown' },
					{ label: 'Winter Park' },
					{ label: 'Lake Nona' },
					{ label: 'College Park' },
					{ label: 'Baldwin Park' }
				]
			}
		]
	},
	{
		label: 'Illinois',
		children: [
			{
				label: 'Chicago',
				children: [
					{ label: 'The Loop' },
					{ label: 'River North' },
					{ label: 'Lincoln Park' },
					{ label: 'Wicker Park' },
					{ label: 'Gold Coast' }
				]
			},
			{
				label: 'Springfield',
				children: [{ label: 'Downtown' }, { label: 'West Side' }, { label: 'East Side' }, { label: 'North End' }, { label: 'South Side' }]
			}
		]
	}
];

const linkageDiffLabeData = [
	{
		province: 'California',
		children: [
			{
				city: 'Los Angeles',
				children: [
					{ region: 'Downtown' },
					{ region: 'Hollywood' },
					{ region: 'Venice' },
					{ region: 'Santa Monica' },
					{ region: 'Beverly Hills' },
					{ region: 'Pasadena' },
					{ region: 'Long Beach' }
				]
			},
			{
				city: 'San Francisco',
				children: [
					{ region: 'Downtown' },
					{ region: 'Mission District' },
					{ region: 'North Beach' },
					{ region: 'Chinatown' },
					{ region: 'Haight-Ashbury' },
					{ region: 'Castro' },
					{ region: 'Pacific Heights' }
				]
			},
			{
				city: 'San Diego',
				children: [
					{ region: 'Downtown' },
					{ region: 'La Jolla' },
					{ region: 'Pacific Beach' },
					{ region: 'Mission Beach' },
					{ region: 'Coronado' },
					{ region: 'North Park' },
					{ region: 'Hillcrest' }
				]
			}
		]
	},
	{
		province: 'New York',
		children: [
			{
				city: 'New York City',
				children: [
					{ region: 'Manhattan' },
					{ region: 'Brooklyn' },
					{ region: 'Queens' },
					{ region: 'The Bronx' },
					{ region: 'Staten Island' },
					{ region: 'Upper East Side' },
					{ region: 'Upper West Side' },
					{ region: 'Greenwich Village' }
				]
			},
			{
				city: 'Buffalo',
				children: [
					{ region: 'Downtown' },
					{ region: 'North Buffalo' },
					{ region: 'South Buffalo' },
					{ region: 'East Side' },
					{ region: 'West Side' },
					{ region: 'Elmwood Village' }
				]
			}
		]
	}
];

export { linkageData, linkageDiffLabeData };
-->
