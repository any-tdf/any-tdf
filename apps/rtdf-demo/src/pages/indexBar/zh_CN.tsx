import { useMemo, useState } from 'react';
import { ButtonGroup, Icon, IndexBar, Toast } from 'rtdf/components';
import type { IndexBarItemProps } from 'rtdf/types';

type ContactItem = {
	name: string;
	phone: string;
};

const addressList: IndexBarItemProps[] = [
	{ index: 'A', title: 'A', child: ['澳门', '安宁', '安庆', '鞍山'] },
	{ index: 'B', title: 'B', child: ['北京', '保定', '包头', '宝鸡'] },
	{ index: 'C', title: 'C', child: ['承德', '沧州', '赤峰'] },
	{ index: 'D', title: 'D', child: ['大同', '大连', '大理'] },
	{ index: 'E', title: 'E', child: ['恩施', '鄂尔多斯', '峨眉山'] },
	{ index: 'F', title: 'F', child: ['抚顺', '佛山', '福泉'] },
	{ index: 'G', title: 'G', child: ['个旧', '桂林', '赣州'] },
	{ index: 'H', title: 'H', child: ['邯郸', '呼和浩特', '呼伦贝尔'] },
	{ index: 'J', title: 'J', child: ['吉林', '酒泉', '晋江'] },
	{ index: 'K', title: 'K', child: ['昆明', '昆山', '开封'] },
	{ index: 'L', title: 'L', child: ['拉萨', '兰州', '泸州'] },
	{ index: 'M', title: 'M', child: ['绵阳', '马鞍山', '牡丹江'] },
	{ index: 'N', title: 'N', child: ['南昌', '南京', '宁波'] },
	{ index: 'P', title: 'P', child: ['莆田', '攀枝花', '平顶山'] },
	{ index: 'Q', title: 'Q', child: ['曲靖', '青岛', '齐齐哈尔'] },
	{ index: 'R', title: 'R', child: ['瑞丽', '瑞安', '瑞金'] },
	{ index: 'S', title: 'S', child: ['三亚', '上海', '深圳'] },
	{ index: 'T', title: 'T', child: ['台州', '太原', '天津'] },
	{ index: 'W', title: 'W', child: ['武汉', '无锡', '芜湖'] },
	{ index: 'X', title: 'X', child: ['西安', '厦门', '宣威'] },
	{ index: 'Y', title: 'Y', child: ['义乌', '银川', '玉溪'] },
	{ index: 'Z', title: 'Z', child: ['昭通', '遵义', '张家界'] }
];

const emojiList: IndexBarItemProps[] = [
	{ index: '😀', title: '表情与情感', child: ['😂', '🥰', '🥱', '🧐'] },
	{ index: '👋', title: '人物与身体', child: ['👌', '🤝', '👨‍💻', '💪'] },
	{ index: '🐵', title: '动物与自然', child: ['🦄', '🌱', '🦁', '🐶'] },
	{ index: '🍎', title: '食物与饮料', child: ['🍑', '🍞', '🍽️', '🍩'] },
	{ index: '🌍', title: '旅行与地理', child: ['🏔️', '🚆', '✈️', '🛵'] },
	{ index: '🏆', title: '活动', child: ['⚽', '🎨', '🏀', '🧨'] },
	{ index: '📱', title: '物品', child: ['🎩', '💻', '🎒', '📖'] },
	{ index: '⚠️', title: '符号标志', child: ['🚫', '⚛️', '🛄', '🔱'] },
	{ index: '🏁', title: '旗帜', child: ['🇨🇳', '🇺🇸', '🇧🇻', '🇦🇹'] }
];

const contactList: IndexBarItemProps<ContactItem>[] = [
	{
		index: 'A',
		title: 'A',
		child: [
			{ name: '阿里', phone: '138****1234' },
			{ name: '安迪', phone: '139****5678' },
			{ name: '艾米', phone: '137****9012' }
		]
	},
	{
		index: 'B',
		title: 'B',
		child: [
			{ name: '贝贝', phone: '136****3456' },
			{ name: '博文', phone: '135****7890' }
		]
	},
	{
		index: 'C',
		title: 'C',
		child: [
			{ name: '陈晨', phone: '134****1234' },
			{ name: '程程', phone: '133****5678' },
			{ name: '聪聪', phone: '132****9012' }
		]
	},
	{
		index: 'D',
		title: 'D',
		child: [
			{ name: '丹丹', phone: '131****3456' },
			{ name: '东东', phone: '130****7890' }
		]
	},
	{
		index: 'L',
		title: 'L',
		child: [
			{ name: '李明', phone: '158****1234' },
			{ name: '刘洋', phone: '159****5678' },
			{ name: '林涛', phone: '157****9012' }
		]
	},
	{
		index: 'W',
		title: 'W',
		child: [
			{ name: '王芳', phone: '186****3456' },
			{ name: '吴刚', phone: '187****7890' },
			{ name: '魏明', phone: '188****1234' }
		]
	},
	{
		index: 'Z',
		title: 'Z',
		child: [
			{ name: '张伟', phone: '198****5678' },
			{ name: '赵敏', phone: '199****9012' },
			{ name: '周杰', phone: '197****3456' }
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

function IndexBarZh() {
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
						showToast(`点击了第 ${index + 1} 组（${group.title}）中的第 ${childIndex + 1} 项（${child}）`);
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
						showToast(`点击了第 ${index + 1} 组（${group.title}）中的第 ${childIndex + 1} 项（${child}）`);
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
						showToast(`点击了 ${child.name}，电话： ${child.phone}`);
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
						{ text: dataFlag === 0 ? '城市' : dataFlag === 1 ? '表情' : '联系人', onClick: changeListFun },
						{ text: scrollAlign ? '对齐关闭' : '对齐开启', onClick: changeScrollAlignFun },
						{ text: '圆角', onClick: changeRadiusFun },
						{ text: dataFlag === 2 ? (renderStyle === 0 ? '卡片' : renderStyle === 1 ? '列表' : '标签') : '样式', onClick: changeStyleFun }
					]}
				/>
			</div>
		</>
	);
}

export default IndexBarZh;
