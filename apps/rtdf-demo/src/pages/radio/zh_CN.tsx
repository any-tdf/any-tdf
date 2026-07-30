import { useState } from 'react';
import { Radio, Divider, Button, Icon } from 'rtdf/components';
import type { RadioItemProps } from 'rtdf/types';

function RadioZh() {
	const dota: RadioItemProps[] = [
		{ label: '主宰', name: '奶棒人' },
		{ label: '白牛', name: '令狐冲' },
		{ label: '光法', name: '光之守卫' },
		{ label: '猛犸', name: '马格纳斯' }
	];
	const [value, setValue] = useState(dota[0].name);
	const [checkedsCustom, setCheckedsCustom] = useState('');

	const dotaInlines: RadioItemProps[] = [
		{ label: '火女', name: '火女' },
		{ label: '小牛', name: '小牛' },
		{ label: '水人', name: '水人' },
		{ label: '火枪', name: '火枪' },
		{ label: '斯温', name: '斯温' },
		{ label: '祈求者', name: '祈求者' },
		{ label: '潮汐', name: '潮汐' },
		{ label: '蝙蝠', name: '蝙蝠' },
		{ label: '猛犸', name: '猛犸' }
	];
	const [checkInline, setCheckInline] = useState('小牛');

	const dotaImgs: RadioItemProps[] = [
		{ label: '火女', name: '火女' },
		{ label: '小牛', name: '小牛' },
		{ label: '水人', name: '水人' },
		{ label: '火枪', name: '火枪' },
		{ label: '斯温', name: '斯温' }
	];
	const [imgChecked, setImgChecked] = useState('火女');

	const dotaLong: RadioItemProps[] = [
		{ name: '主宰', label: '主宰是一个近战敏捷英雄，他能够迅速切入战斗。' },
		{ name: '白牛', label: '巴拉森，裂魂人是一个强大的 Gank 型的力量型近战英雄。' },
		{ name: '光法', label: '伊扎洛，光之守卫，他是一个著名的辅助性智力英雄。' },
		{ name: '猛犸', label: '猛犸？为什么不 BAN 猛犸？为什么不 BAN 猛犸？' }
	];

	const dotaVoices: (RadioItemProps & { voices: string[] })[] = [
		{ name: '祈求者', label: '祈求者', voices: ['"来自于伟大的奥秘。"'] },
		{ name: '风暴之灵', label: '风暴之灵', voices: ['"喂~快醒醒，快喝点咖啡，我方上塔正遭受攻击。"'] },
		{
			name: '蝙蝠骑士',
			label: '蝙蝠骑士',
			voices: ['“哦，莉娜，当我的压寨夫人怎么样？”', '“哦，风行者，见着我你不用跑。”', '“水晶室女，你就像一个装满冰水的高脚杯。”']
		},
		{ name: '潮汐猎人', label: '潮汐猎人', voices: ['“我还能吃下一根海藻。”'] }
	];
	const [voiceChecked, setVoiceChecked] = useState('');

	return (
		<div className="px-4">
			<div className="mb-4 mt-8 text-2xl font-bold">横向排列</div>
			<div className="mb-4 mt-6 text-lg font-bold">简单用法</div>
			<Radio layout="h" data={dota} />
			<Divider />

			<div className="mb-4 mt-6 text-lg font-bold">获取选中值</div>
			<Radio layout="h" data={dota} value={value} onChange={setValue} />
			<div className="mt-4 text-sm">已选：{value}</div>
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">文字在不同位置</div>
			<Radio layout="h" data={dota} textPosition="l" />
			<Divider />
			<Radio layout="h" data={dota} textPosition="b" />
			<Divider />
			<Radio layout="h" data={dota} textPosition="t" />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">自定义图标</div>
			<Radio layout="h" data={dota} icon={{ name: 'ri-checkbox-blank-circle-line' }} iconChecked={{ name: 'ri-radio-button-fill' }} />
			<Divider />
			<Radio layout="h" data={dota} icon={{ name: 'ri-checkbox-circle-line' }} iconChecked={{ name: 'ri-checkbox-circle-fill' }} />
			<Divider />
			<Radio layout="h" data={dota} icon={{ name: 'ri-checkbox-multiple-line' }} iconChecked={{ name: 'ri-checkbox-multiple-fill' }} />
			<Divider />
			<Radio layout="h" data={dota} icon={{ name: 'ri-check-line' }} iconChecked={{ name: 'ri-check-fill' }} />
			<Divider />
			<Radio layout="h" data={dota} icon={{ name: 'ri-check-double-line' }} iconChecked={{ name: 'ri-check-double-line' }} />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">radioChild 为 Button 组件</div>
			<Radio
				layout="h"
				data={dota}
				radioChild={({ item }) => (
					<Button fill={value === item.name ? 'base' : 'lineLight'} injClass="px-2 !py-1" onClick={() => setValue(item.name)}>
						{item.label}
					</Button>
				)}
			/>
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">radioChild 为自定义元素</div>
			<Radio
				layout="h"
				data={dota}
				radioChild={({ item }) => (
					<button
						className={`rounded-sm border px-5 py-0.5 text-sm ${
							checkedsCustom === item.name
								? 'bg-primary/10 text-primary dark:bg-dark/10 dark:text-dark'
								: 'border-gray-200 bg-gray-100 dark:border-gray-500 dark:bg-gray-600'
						}`}
						onClick={() => setCheckedsCustom(item.name)}
					>
						{item.label}
					</button>
				)}
			/>
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">图片选项</div>
			<Radio
				layout="h"
				data={dotaImgs}
				radioChild={({ item }) => (
					<div className="flex flex-col items-center">
						<div
							className={`mb-1 h-12 w-12 overflow-hidden rounded-sm cursor-pointer ${imgChecked === item.name ? 'ring-primary dark:ring-dark ring-2' : ''}`}
							onClick={() => setImgChecked(item.name)}
						>
							<img className="h-full w-full object-cover" src={`/assets/images/dota_${item.name}.png`} alt="" />
						</div>
						<div>
							<Icon
								name={imgChecked === item.name ? 'ri-arrow-up-s-fill' : 'ri-arrow-up-s-line'}
								theme={imgChecked === item.name}
								opacity={imgChecked === item.name ? 1 : 0.2}
							/>
						</div>
					</div>
				)}
			/>
			<div className="text-sm">
				已选 <span className="text-error">{imgChecked}</span>
			</div>
			<Divider />

			<div className="mb-4 text-2xl font-bold">行内元素排列</div>
			<div className="mb-4 mt-8 text-lg font-bold">radioChild 行内元素排列</div>
			<Radio
				layout="inline"
				data={dotaInlines}
				radioChild={({ item }) => (
					<div
						className={`m-1 rounded-sm border px-2 py-0.5 text-sm cursor-pointer ${
							checkInline === item.name
								? 'bg-primary/10 text-primary dark:bg-dark/10 dark:text-dark'
								: 'border-gray-200 bg-gray-100 dark:border-gray-500 dark:bg-gray-600'
						}`}
						onClick={() => setCheckInline(item.name)}
					>
						{item.label}
					</div>
				)}
			/>
			<div className="mt-2 text-xs">已选：{checkInline}</div>
			<Divider />

			<div className="mb-4 text-2xl font-bold">纵向排列</div>
			<div className="mb-4 mt-8 text-lg font-bold">基础用法</div>
			<Radio data={dota} />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">长文字选项</div>
			<Radio data={dotaLong} />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">文字靠左</div>
			<Radio data={dota} textPosition="l" />

			<div className="mb-4 mt-8 text-lg font-bold">复杂选项 && 自定义选中效果</div>
			<Radio
				data={dotaVoices}
				radioChild={({ item }) => (
					<div className="flex cursor-pointer items-center" onClick={() => setVoiceChecked(item.name)}>
						<div>
							<Icon
								name={voiceChecked === item.name ? 'ri-radio-button-line' : 'ri-checkbox-blank-circle-line'}
								theme={voiceChecked === item.name}
								opacity={voiceChecked === item.name ? 1 : 0.2}
							/>
						</div>
						<div className={`ml-2 grow ${voiceChecked === item.name ? 'text-primary dark:text-dark' : ''}`}>
							{item.label}
							{(item as unknown as { voices: string[] }).voices.map((voice: string, index: number) => (
								<div key={index} className="text-xs">
									{voice}
								</div>
							))}
							<div className="mt-1 h-px bg-black/10 dark:bg-white/10"></div>
						</div>
					</div>
				)}
			/>
		</div>
	);
}

export default RadioZh;
