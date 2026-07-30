<!-- NoticeBar Demo -->
<script lang="ts">
	import { NoticeBar, Toast } from 'stdf';

	let textList = ['1. This is the first announcement!', '2. This is the second notice!'];
	let textLongList = [
		'1. This message long, long, long, long, long, long, long, long, long, long, long, long, long!',
		'2. This is the second notice!'
	];

	let visible = $state(false);
</script>

<div class="m-4 mt-8 text-lg font-bold">Basic usage</div>
<NoticeBar {textList}></NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">The announcements are short and do not scroll</div>
<NoticeBar textList={['1. Short notice!', '2. Short notice!']}></NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">Set notification spacing</div>
<NoticeBar space={200} {textList}></NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">Set rolling speed</div>
<NoticeBar speed={100} {textList}></NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">Right arrow (listen for click events)</div>
<NoticeBar rightIcon="arrow" {textList} onclickRight={() => (visible = true)}></NoticeBar>
<Toast bind:visible message="Click the right arrow!"></Toast>

<div class="m-4 mt-8 text-lg font-bold">No content on the right</div>
<NoticeBar rightIcon={null} {textList}></NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">Nothing on the left</div>
<NoticeBar leftIcon={null} {textList}></NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">Custom left</div>
<NoticeBar leftIcon={{ name: 'ri-notification-2-line', size: 16, y: -1 }} {textList}></NoticeBar>
<div class="my-4"></div>
<NoticeBar leftIcon={{ name: 'ri-wireless-charging-line', size: 16, y: -1 }} {textList}></NoticeBar>
<div class="my-4"></div>
<NoticeBar {textList}>
	{#snippet leftChild()}🥳{/snippet}
</NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">Custom right</div>
<NoticeBar {textList}>
	{#snippet rightChild()}🥳{/snippet}
</NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">Vertical rolling</div>
<NoticeBar vertical {textList}></NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">Scroll transition to 1 second</div>
<NoticeBar vertical duration={1000} {textList}></NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">The scrolling interval is 8 seconds</div>
<NoticeBar vertical interval={8} {textList}></NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">Excessively long text</div>
<NoticeBar vertical textList={textLongList}></NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">Single bar does not roll</div>
<NoticeBar vertical textList={[textLongList[0]]}></NoticeBar>

<div class="m-4 mt-8 text-lg font-bold">Custom style</div>
<NoticeBar injClass="!text-error !bg-error/10" {textList}></NoticeBar>
<div class="my-4"></div>
<NoticeBar leftIcon={{ name: 'ri-check-line', size: 16, y: -1 }} injClass="!text-success !bg-success/10" {textList}></NoticeBar>
<div class="my-4"></div>
<NoticeBar injClass="!text-blue !bg-purple/10" {textList}></NoticeBar>
<div class="pb-8"></div>
