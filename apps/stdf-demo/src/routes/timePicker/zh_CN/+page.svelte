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
			当前选定了：
			<span class="mr-2 text-primary dark:text-dark">{defaultTimeStr}</span>
		{:else}
			<div>请选定时间</div>
		{/if}
	</div>
	<Cell title="基础用法" subTitle="默认选定当前时间，可选前后十年" onclick={() => (visible1 = true)} />
	<TimePicker bind:visible={visible1} onconfirm={(time) => (defaultTimeStr = time)} />

	<Cell title="只用年月日" onclick={() => (visible2 = true)} />
	<TimePicker bind:visible={visible2} type="YYYYMMDD" />

	<Cell title="只用时分秒" onclick={() => (visible3 = true)} />
	<TimePicker bind:visible={visible3} type="hhmmss" />

	<Cell title="只用年月日时" onclick={() => (visible4 = true)} />
	<TimePicker bind:visible={visible4} type="YYYYMMDDhh" />

	<Cell title="不显示提示" onclick={() => (visible5 = true)} />
	<TimePicker bind:visible={visible5} showTips={false} />

	<Cell title="不同列不同可见行" onclick={() => (visible6 = true)} />
	<TimePicker
		bind:visible={visible6}
		yearProps={{ showRow: 3 }}
		hourProps={{ showRow: 7 }}
		minuteProps={{ showRow: 7 }}
		secondProps={{ showRow: 7 }}
	/>

	<Cell title="不同列不同宽度" onclick={() => (visible8 = true)} />
	<TimePicker bind:visible={visible8} yearProps={{ flex: 3 }} dayProps={{ flex: 2 }} />

	<Cell title="年数据右对齐，日数据左对齐" onclick={() => (visible22 = true)} />
	<TimePicker bind:visible={visible22} type="YYYYMMDD" yearProps={{ align: 'right' }} dayProps={{ align: 'left' }} />

	<Cell title="限定年份区间" onclick={() => (visible9 = true)} />
	<TimePicker bind:visible={visible9} yearRange={[2022, 2025]} />

	<Cell title="限定月份区间" onclick={() => (visible10 = true)} />
	<TimePicker bind:visible={visible10} monthRange={[2, 5]} />

	<Cell title="限定时分秒区间" onclick={() => (visible11 = true)} />
	<TimePicker bind:visible={visible11} hourRange={[2, 5]} minuteRange={[25, 45]} secondRange={[5, 10]} />

	<Cell title="分钟步长为 5" onclick={() => (visible12 = true)} />
	<TimePicker bind:visible={visible12} minuteStep={5} />

	<Cell title="秒步长为 10" onclick={() => (visible13 = true)} />
	<TimePicker bind:visible={visible13} secondStep={10} />

	<div class="px-4">
		{#if customFormatStr !== ''}
			当前选定了：
			<span class="mr-2 text-primary dark:text-dark">{customFormatStr}</span>
		{:else}
			<div>请选定时间</div>
		{/if}
	</div>
	<Cell title="自定义返回时间格式" subTitle="输出格式为 X 年 X 月 X 日 X 时 X 分 X 秒" onclick={() => (visible15 = true)} />
	<TimePicker
		bind:visible={visible15}
		outFormat="YYYY 年 MM 月 DD 日 hh 时 mm 分 ss 秒"
		onconfirm={(timeStr) => (customFormatStr = timeStr)}
	/>

	<div class="px-4">
		{#if monthFirstStr !== ''}
			当前选定了：
			<span class="mr-2 text-primary dark:text-dark">{monthFirstStr}</span>
		{:else}
			<div>请选定时间</div>
		{/if}
	</div>
	<Cell title="返回时间月份在前" onclick={() => (visible16 = true)} />
	<TimePicker bind:visible={visible16} type="YYYYMMDD" outFormat="MM/DD/YYYY" onconfirm={(timeStr) => (monthFirstStr = timeStr)} />

	<div class="px-4 text-xs">
		当前选定了：<br />
		<span class="mr-2 break-words text-primary dark:text-dark">{timeObjStr}</span>
	</div>
	<Cell title="返回时间对象" onclick={() => (visible17 = true)} />
	<TimePicker bind:visible={visible17} onconfirm={(_, obj) => (timeObj = obj)} />

	<Cell title="顶部来点圆角" onclick={() => (visible14 = true)} />
	<TimePicker bind:visible={visible14} popup={{ radius: 'xl' }} />

	<Cell title="自定义标题" onclick={() => (visible18 = true)} />
	<TimePicker bind:visible={visible18} title="请选择时间" />

	<Cell title="指定初始选定年份" onclick={() => (visible19 = true)} />
	<TimePicker bind:visible={visible19} initYear="2020" />

	<Cell title="指定初始选定月份" onclick={() => (visible20 = true)} />
	<TimePicker bind:visible={visible20} initMonth="05" />

	<Cell title="指定初始选定时分秒" onclick={() => (visible21 = true)} />
	<TimePicker bind:visible={visible21} initHour="05" initMinute="05" initSecond="05" />

	<div class="px-4 py-2">不使用弹出层</div>
	<TimePicker popup={null} type="YYYYMMDD" height={30} />
</div>
