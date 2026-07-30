import { useMemo, useState } from 'react';
import { ButtonGroup, Icon, IndexBar, Toast } from 'rtdf/components';
import type { IndexBarItemProps } from 'rtdf/types';

type ContactItem = {
	name: string;
	phone: string;
};

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

function IndexBarEn() {
	const height = useMemo(() => window.innerHeight - navHeight - bottomHeight, []);
	const [radius, setRadius] = useState<'sm' | 'full' | 'none'>('sm');
	const [dataFlag, setDataFlag] = useState(2);
	const [scrollAlign, setScrollAlign] = useState(true);
	const [injClassList, setInjClassList] = useState<string[]>([]);
	const [renderStyle, setRenderStyle] = useState(0);
	const [visible, setVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

	const changeRadiusFun = () => {
		setRadius((prev) => (prev === 'sm' ? 'full' : prev === 'full' ? 'none' : 'sm'));
	};

	const changeListFun = () => {
		setDataFlag((prev) => (prev === 0 ? 1 : prev === 1 ? 2 : 0));
		setRenderStyle(0);
	};

	const changeScrollAlignFun = () => {
		setScrollAlign((prev) => !prev);
	};

	const changeStyleFun = () => {
		if (dataFlag === 2) {
			setRenderStyle((prev) => (prev + 1) % 3);
			return;
		}
		setInjClassList((prev) => (prev.length ? [] : ['!text-3xl text-center', 'text-xs text-center !py-1']));
	};

	const showToast = (message: string) => {
		setToastMessage(message);
		setVisible(true);
	};

	return (
		<>
			{dataFlag === 0 ? (
				<IndexBar
					key="address"
					data={addressList}
					radius={radius}
					height={height}
					scrollAlign={scrollAlign}
					titleInjClass={injClassList[0]}
					textInjClass={injClassList[1]}
					top={navHeight}
					onClickChild={(index, group, childIndex, child) => {
						showToast(`Clicked group ${index + 1} (${group.title}) item ${childIndex + 1} (${child})`);
					}}
				/>
			) : dataFlag === 1 ? (
				<IndexBar
					key="emoji"
					data={emojiList}
					radius={radius}
					height={height}
					scrollAlign={scrollAlign}
					titleInjClass={injClassList[0]}
					textInjClass={injClassList[1]}
					top={navHeight}
					onClickChild={(index, group, childIndex, child) => {
						showToast(`Clicked group ${index + 1} (${group.title}) item ${childIndex + 1} (${child})`);
					}}
				/>
			) : (
				<IndexBar
					key="contact"
					data={contactList}
					radius={radius}
					height={height}
					scrollAlign={scrollAlign}
					top={navHeight}
					onClickChild={(_, __, ___, child) => {
						showToast(`Clicked ${child.name}, Phone: ${child.phone}`);
					}}
				>
					{(item, childIndex, _, groupIndex) => {
						if (renderStyle === 0) {
							return (
								<div className="flex items-center gap-3 py-1">
									<div
										className={`${colors[(groupIndex * 3 + childIndex) % colors.length]} flex h-10 w-10 items-center justify-center rounded-full text-lg font-medium text-white`}
									>
										{item.name[0]}
									</div>
									<div className="flex-1">
										<div className="font-medium">{item.name}</div>
										<div className="text-xs text-black/50 dark:text-white/50">{item.phone}</div>
									</div>
									<Icon name="ri-phone-line" />
								</div>
							);
						}
						if (renderStyle === 1) {
							return (
								<div className="flex items-center justify-between py-2">
									<span className="font-medium">{item.name}</span>
									<span className="text-sm text-black/60 dark:text-white/60">{item.phone}</span>
								</div>
							);
						}
						return (
							<div className="flex items-center gap-2 py-1">
								<span className={`${colors[(groupIndex * 3 + childIndex) % colors.length]} rounded-md px-2 py-1 text-sm text-white`}>
									{item.name}
								</span>
								<span className="text-xs text-black/50 dark:text-white/50">{item.phone}</span>
							</div>
						);
					}}
				</IndexBar>
			)}
			<Toast visible={visible} message={toastMessage} onClose={() => setVisible(false)} />

			<div className="sticky bottom-0 z-10 bg-white/90 dark:bg-black/90">
				<ButtonGroup
					fill="lineState"
					items={[
						{ text: dataFlag === 0 ? 'City' : dataFlag === 1 ? 'Emoji' : 'Contact', onClick: changeListFun },
						{ text: scrollAlign ? 'Align Off' : 'Align On', onClick: changeScrollAlignFun },
						{ text: 'Radius', onClick: changeRadiusFun },
						{ text: dataFlag === 2 ? (renderStyle === 0 ? 'Card' : renderStyle === 1 ? 'List' : 'Tag') : 'Style', onClick: changeStyleFun }
					]}
				/>
			</div>
		</>
	);
}

export default IndexBarEn;
