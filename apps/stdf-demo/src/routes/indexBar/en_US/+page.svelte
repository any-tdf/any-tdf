<!-- IndexBar Demo -->
<script lang="ts">
	import { IndexBar, ButtonGroup, Toast, Icon } from 'stdf';
	import type { IndexBarItemProps } from 'stdf/types';

	const addressList: IndexBarItemProps[] = [
		{ index: 'A', title: 'A', child: ['Macau', 'Anning', 'Anqing', 'Anshan'] },
		{ index: 'B', title: 'B', child: ['Beijing', 'Baoding', 'Baotou', 'Baoji'] },
		{ index: 'C', title: 'C', child: ['Chengde', 'Cangzhou', 'Chifeng'] },
		{ index: 'D', title: 'D', child: ['Datong', 'Dalian', 'Dali'] },
		{ index: 'E', title: 'E', child: ['Enshi', 'Ordos', 'Emeishan'] },
		{ index: 'F', title: 'F', child: ['Fushun', 'Foshan', 'Fuquan'] },
		{ index: 'G', title: 'G', child: ['Gejiu', 'Guilin', 'Ganzhou'] },
		{ index: 'H', title: 'H', child: ['Handan', 'Hohhot', 'Hulunbuir'] },
		{ index: 'J', title: 'J', child: ['Jilin', 'Jiuquan', 'Jinjiang'] },
		{ index: 'K', title: 'K', child: ['Kunming', 'Kunshan', 'Kaifeng'] },
		{ index: 'L', title: 'L', child: ['Lhasa', 'Lanzhou', 'Luzhou'] },
		{ index: 'M', title: 'M', child: ['Mianyang', 'Maans', 'Mudanjiang'] },
		{ index: 'N', title: 'N', child: ['Nanchang', 'Nanjing', 'Ningbo'] },
		{ index: 'P', title: 'P', child: ['Putian', 'Panzhihua', 'Pingdingshan'] },
		{ index: 'Q', title: 'Q', child: ['Qujing', 'Qingdao', 'Qiqihar'] },
		{ index: 'R', title: 'R', child: ['Ruili', 'Ruian', 'Ruijin'] },
		{ index: 'S', title: 'S', child: ['Sanya', 'Shanghai', 'Shenzhen'] },
		{ index: 'T', title: 'T', child: ['Taizhou', 'Taiyuan', 'Tianjin'] },
		{ index: 'W', title: 'W', child: ['Wuhan', 'Wuxi', 'Wuhu'] },
		{ index: 'X', title: 'X', child: ['Xi an', 'Xiamen', 'Xuanwei'] },
		{ index: 'Y', title: 'Y', child: ['Yiwu', 'Yinchuan', 'Yuxi'] },
		{ index: 'Z', title: 'Z', child: ['Zhaotong', 'Zunyi', 'Zhangjiajie'] }
	];

	const emojiList: IndexBarItemProps[] = [
		{ index: '😀', title: 'Smileys & Emotion', child: ['😂', '🥰', '🥱', '🧐'] },
		{ index: '👋', title: 'People & Body', child: ['👌', '🤝', '👨‍💻', '💪'] },
		{ index: '🐵', title: 'Animals & Nature', child: ['🦄', '🌱', '🦁', '🐶'] },
		{ index: '🍎', title: 'Food & Drink', child: ['🍑', '🍞', '🍽️', '🍩'] },
		{ index: '🌍', title: 'Travel & Places', child: ['🏔️', '🚆', '✈️', '🛵'] },
		{ index: '🏆', title: 'Activities', child: ['⚽', '🎨', '🏀', '🧨'] },
		{ index: '📱', title: 'Objects', child: ['🎩', '💻', '🎒', '📖'] },
		{ index: '⚠️', title: 'Symbols', child: ['🚫', '⚛️', '🛄', '🔱'] },
		{ index: '🏁', title: 'Flags', child: ['🇨🇳', '🇺🇸', '🇧🇻', '🇦🇹'] }
	];

	// Complex data structure: Contacts
	type ContactItem = {
		name: string;
		phone: string;
	};
	const contactList: IndexBarItemProps<ContactItem>[] = [
		{
			index: 'A',
			title: 'A',
			child: [
				{ name: 'Alice', phone: '138****1234' },
				{ name: 'Andy', phone: '139****5678' },
				{ name: 'Amy', phone: '137****9012' }
			]
		},
		{
			index: 'B',
			title: 'B',
			child: [
				{ name: 'Bob', phone: '136****3456' },
				{ name: 'Ben', phone: '135****7890' }
			]
		},
		{
			index: 'C',
			title: 'C',
			child: [
				{ name: 'Charlie', phone: '134****1234' },
				{ name: 'Chris', phone: '133****5678' },
				{ name: 'Cathy', phone: '132****9012' }
			]
		},
		{
			index: 'D',
			title: 'D',
			child: [
				{ name: 'David', phone: '131****3456' },
				{ name: 'Diana', phone: '130****7890' }
			]
		},
		{
			index: 'J',
			title: 'J',
			child: [
				{ name: 'Jack', phone: '158****1234' },
				{ name: 'John', phone: '159****5678' },
				{ name: 'Jane', phone: '157****9012' }
			]
		},
		{
			index: 'M',
			title: 'M',
			child: [
				{ name: 'Mike', phone: '186****3456' },
				{ name: 'Mary', phone: '187****7890' },
				{ name: 'Mark', phone: '188****1234' }
			]
		},
		{
			index: 'T',
			title: 'T',
			child: [
				{ name: 'Tom', phone: '198****5678' },
				{ name: 'Tony', phone: '199****9012' },
				{ name: 'Tina', phone: '197****3456' }
			]
		}
	];

	// Color list for dynamic selection in Snippet
	const colors = [
		'bg-red-500',
		'bg-orange-500',
		'bg-amber-500',
		'bg-yellow-500',
		'bg-lime-500',
		'bg-green-500',
		'bg-emerald-500',
		'bg-teal-500',
		'bg-cyan-500',
		'bg-sky-500',
		'bg-blue-500',
		'bg-indigo-500',
		'bg-violet-500',
		'bg-purple-500',
		'bg-fuchsia-500',
		'bg-pink-500',
		'bg-rose-500'
	];

	const navHeight = 48;
	const bottomHeight = 50;
	const height = window.innerHeight - navHeight - bottomHeight;
	let radius: 'sm' | 'full' | 'none' = $state('sm');
	let dataFlag = $state(2);
	let scrollAlign = $state(true);
	let injClassList: string[] = $state([]);
	let snippetStyle = $state(0); // Contact Snippet style: 0-Avatar Card, 1-Simple List, 2-Colorful Tag
	const changeRadiusFun = () => {
		radius = radius === 'sm' ? 'full' : radius === 'full' ? 'none' : 'sm';
	};
	const changeListFun = () => {
		dataFlag = dataFlag === 0 ? 1 : dataFlag === 1 ? 2 : 0;
		snippetStyle = 0; // Reset style when switching data
	};
	const changeScrollAlignFun = () => {
		scrollAlign = !scrollAlign;
	};
	const changeStyleFun = () => {
		if (dataFlag === 2) {
			// Contact mode: switch Snippet style
			snippetStyle = (snippetStyle + 1) % 3;
		} else {
			// Other modes: switch inject class
			injClassList = !injClassList.length ? ['!text-3xl text-center', 'text-xs text-center !py-1'] : [];
		}
	};
	let visible = $state(false);
	let toastMessage = $state('');
</script>

{#if dataFlag === 0}
	<IndexBar
		data={addressList}
		{radius}
		{height}
		{scrollAlign}
		titleInjClass={injClassList[0]}
		textInjClass={injClassList[1]}
		top={navHeight}
		onclickChild={(index, group, childIndex, child) => {
			toastMessage = `Clicked group ${index + 1} (${group.title}) item ${childIndex + 1} (${child})`;
			visible = true;
		}}
	/>
{:else if dataFlag === 1}
	<IndexBar
		data={emojiList}
		{radius}
		{height}
		{scrollAlign}
		titleInjClass={injClassList[0]}
		textInjClass={injClassList[1]}
		top={navHeight}
		onclickChild={(index, group, childIndex, child) => {
			toastMessage = `Clicked group ${index + 1} (${group.title}) item ${childIndex + 1} (${child})`;
			visible = true;
		}}
	/>
{:else}
	<IndexBar
		data={contactList}
		{radius}
		{height}
		{scrollAlign}
		top={navHeight}
		onclickChild={(index, group, childIndex, child) => {
			toastMessage = `Clicked ${child.name}, Phone: ${child.phone}`;
			visible = true;
		}}
	>
		{#snippet children(item, childIndex, group, groupIndex)}
			{#if snippetStyle === 0}
				<!-- Avatar Card Style -->
				<div class="flex items-center gap-3 py-1">
					<div class="{colors[(groupIndex * 3 + childIndex) % colors.length]} flex h-10 w-10 items-center justify-center rounded-full text-lg font-medium text-white">
						{item.name[0]}
					</div>
					<div class="flex-1">
						<div class="font-medium">{item.name}</div>
						<div class="text-xs text-black/50 dark:text-white/50">{item.phone}</div>
					</div>
					<Icon name="ri-phone-line" />
				</div>
			{:else if snippetStyle === 1}
				<!-- Simple List Style -->
				<div class="flex items-center justify-between py-2">
					<span class="font-medium">{item.name}</span>
					<span class="text-sm text-black/60 dark:text-white/60">{item.phone}</span>
				</div>
			{:else}
				<!-- Colorful Tag Style -->
				<div class="flex items-center gap-2 py-1">
					<span class="{colors[(groupIndex * 3 + childIndex) % colors.length]} rounded-md px-2 py-1 text-sm text-white">{item.name}</span>
					<span class="text-xs text-black/50 dark:text-white/50">{item.phone}</span>
				</div>
			{/if}
		{/snippet}
	</IndexBar>
{/if}
<Toast bind:visible message={toastMessage} />

<div class="sticky bottom-0 z-10 bg-white/90 dark:bg-black/90">
	<ButtonGroup
		fill="lineState"
		items={[
			{ text: dataFlag === 0 ? 'City' : dataFlag === 1 ? 'Emoji' : 'Contact', onclick: changeListFun },
			{ text: scrollAlign ? 'Align Off' : 'Align On', onclick: changeScrollAlignFun },
			{ text: 'Radius', onclick: changeRadiusFun },
			{ text: dataFlag === 2 ? (snippetStyle === 0 ? 'Card' : snippetStyle === 1 ? 'List' : 'Tag') : 'Style', onclick: changeStyleFun }
		]}
	/>
</div>
