import { useState } from 'react';
import { Checkbox, CheckboxItem, Divider, Button, Icon } from 'rtdf/components';
import type { CheckboxItemProps } from 'rtdf/types';

function CheckboxZh() {
	const dota: CheckboxItemProps[] = [
		{ label: '主宰', name: '奶棒人' },
		{ label: '白牛', name: '令狐冲' },
		{ label: '光法', name: '光之守卫' },
		{ label: '猛犸', name: '马格纳斯' }
	];
	const [checkeds, setCheckeds] = useState<string[]>([]);
	const clickItemFn = (name: string) => {
		setCheckeds(checkeds.includes(name) ? checkeds.filter((v) => v !== name) : [name, ...checkeds]);
	};
	const [checkedsCustom, setCheckedsCustom] = useState<string[]>([]);
	const clickCustomFn = (name: string) => {
		setCheckedsCustom(checkedsCustom.includes(name) ? checkedsCustom.filter((v) => v !== name) : [name, ...checkedsCustom]);
	};

	const dotaInlines: CheckboxItemProps[] = [
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
	const [checkInlines, setCheckInlines] = useState<string[]>(['小牛', '水人']);
	const dotaInlineFun = (name: string) => {
		setCheckInlines(checkInlines.includes(name) ? checkInlines.filter((v) => v !== name) : [name, ...checkInlines]);
	};

	const dotaImgs: CheckboxItemProps[] = [
		{ label: '火女', name: '火女' },
		{ label: '小牛', name: '小牛' },
		{ label: '水人', name: '水人' },
		{ label: '火枪', name: '火枪' },
		{ label: '斯温', name: '斯温' }
	];
	const [imgCheckeds, setImgCheckeds] = useState<string[]>(['火女']);
	const dotaImgsFun = (name: string) => {
		setImgCheckeds(imgCheckeds.includes(name) ? imgCheckeds.filter((v) => v !== name) : [name, ...imgCheckeds]);
	};

	const dotaLong: CheckboxItemProps[] = [
		{ name: '主宰', label: '主宰是一个近战敏捷英雄，他能够迅速切入战斗。' },
		{ name: '白牛', label: '巴拉森，裂魂人是一个强大的 Gank 型的力量型近战英雄。' },
		{ name: '光法', label: '伊扎洛，光之守卫，他是一个著名的辅助性智力英雄。' },
		{ name: '猛犸', label: '猛犸？为什么不 BAN 猛犸？为什么不 BAN 猛犸？' }
	];

	const dotaVoices: (CheckboxItemProps & { voices: string[] })[] = [
		{ name: '祈求者', label: '祈求者', voices: ['“来自于伟大的奥秘。”'] },
		{ name: '风暴之灵', label: '风暴之灵', voices: ['“喂~快醒醒，快喝点咖啡，我方上塔正遭受攻击。”'] },
		{
			name: '蝙蝠骑士',
			label: '蝙蝠骑士',
			voices: ['“哦，莉娜，当我的压寨夫人怎么样？”', '“哦，风行者，见着我你不用跑。”', '“水晶室女，你就像一个装满冰水的高脚杯。”']
		},
		{ name: '潮汐猎人', label: '潮汐猎人', voices: ['“我还能吃下一根海藻。”'] }
	];
	const [voiceCheckeds, setVoiceCheckeds] = useState<string[]>([]);
	const dotaVoicesFun = (name: string) => {
		setVoiceCheckeds(voiceCheckeds.includes(name) ? voiceCheckeds.filter((v) => v !== name) : [name, ...voiceCheckeds]);
	};

	const dotaAll: CheckboxItemProps[] = [
		{ name: '火女', label: '火女' },
		{ name: '小牛', label: '小牛' },
		{ name: '水人', label: '水人' },
		{ name: '火枪', label: '火枪' },
		{ name: '斯温', label: '斯温' },
		{ name: '祈求者', label: '祈求者' },
		{ name: '潮汐', label: '潮汐' },
		{ name: '蝙蝠', label: '蝙蝠' },
		{ name: '猛犸', label: '猛犸' }
	];
	const [checkDotas, setCheckDotas] = useState<string[]>(['火枪', '斯温']);
	const noCheckDotas = dotaAll.filter((a) => !checkDotas.some((b) => b === a.name)).map((a) => a.name);
	// 全选
	const checkAllFun = () => {
		setCheckDotas(dotaAll.map((a) => a.name));
	};
	// 全不选
	const checkNoneFun = () => {
		setCheckDotas([]);
	};
	// 反选
	const checkReverseFun = () => {
		setCheckDotas(dotaAll.filter((a) => !checkDotas.some((b) => b === a.name)).map((a) => a.name));
	};

	const animates = ['火女', '小牛', '水人', '火枪', '斯温', '祈求者', '潮汐', '蝙蝠', '猛犸'];
	const [animateNos, setAnimateNos] = useState<string[]>(['火女', '小牛', '水人', '火枪', '斯温', '祈求者']);
	const animateYess = animates.filter((a) => !animateNos.some((b) => b === a));
	const animateHeight = animates.length * 30 + 50;
	const checkAnimateNoFun = (name: string) => {
		setAnimateNos(animateNos.filter((a) => a !== name));
	};
	const checkAnimaYesFun = (name: string) => {
		setAnimateNos([name, ...animateNos]);
	};

	return (
		<div className="px-4 pb-8">
			<div className="mb-4 mt-8 text-2xl font-bold">横向排列</div>
			<div className="mb-4 mt-6 text-lg font-bold">简单用法</div>
			<Checkbox layout="h" data={dota} />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">文字在不同位置</div>
			<Checkbox layout="h" data={dota} textPosition="l" />
			<Divider />
			<Checkbox layout="h" data={dota} textPosition="b" />
			<Divider />
			<Checkbox layout="h" data={dota} textPosition="t" />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">自定义图标</div>
			<Checkbox layout="h" data={dota} icon={{ name: 'ri-checkbox-blank-circle-line' }} iconChecked={{ name: 'ri-radio-button-fill' }} />
			<Divider />
			<Checkbox layout="h" data={dota} icon={{ name: 'ri-checkbox-circle-line' }} iconChecked={{ name: 'ri-checkbox-circle-fill' }} />
			<Divider />
			<Checkbox layout="h" data={dota} icon={{ name: 'ri-checkbox-multiple-line' }} iconChecked={{ name: 'ri-checkbox-multiple-fill' }} />
			<Divider />
			<Checkbox layout="h" data={dota} icon={{ name: 'ri-check-line' }} iconChecked={{ name: 'ri-check-fill' }} />
			<Divider />
			<Checkbox layout="h" data={dota} icon={{ name: 'ri-check-double-line' }} iconChecked={{ name: 'ri-check-double-line' }} />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">checkboxChild 为 Button 组件</div>
			<Checkbox
				layout="h"
				data={dota}
				checkboxChild={({ item }) => (
					<Button fill={checkeds.includes(item.name) ? 'base' : 'lineLight'} injClass="px-2 !py-1" onClick={() => clickItemFn(item.name)}>
						{item.label}
					</Button>
				)}
			/>
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">checkboxChild 为自定义元素</div>
			<Checkbox
				layout="h"
				data={dota}
				checkboxChild={({ item }) => (
					<button
						className={`rounded-sm border px-5 py-0.5 text-sm ${
							checkedsCustom.includes(item.name)
								? 'bg-primary/10 text-primary dark:bg-dark/10 dark:text-dark'
								: 'border-gray-200 bg-gray-100 dark:border-gray-500 dark:bg-gray-600'
						}`}
						onClick={() => clickCustomFn(item.name)}
					>
						{item.label}
					</button>
				)}
			/>
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">图片选项</div>
			<Checkbox
				layout="h"
				data={dotaImgs}
				checkboxChild={({ item }) => (
					<div className="flex flex-col items-center">
						<div
							className={`mb-1 h-12 w-12 overflow-hidden rounded-sm cursor-pointer ${imgCheckeds.includes(item.name) ? 'ring-primary dark:ring-dark ring-2' : ''}`}
							onClick={() => dotaImgsFun(item.name)}
						>
							<img className="h-full w-full object-cover" src={`/assets/images/dota_${item.name}.png`} alt="" />
						</div>
						<div>
							<Icon
								name={imgCheckeds.includes(item.name) ? 'ri-arrow-up-s-fill' : 'ri-arrow-up-s-line'}
								theme={imgCheckeds.includes(item.name)}
								opacity={imgCheckeds.includes(item.name) ? 1 : 0.2}
							/>
						</div>
					</div>
				)}
			/>
			<div className="text-sm">
				{imgCheckeds.length > 0 ? '已选 ' : '未选择任何英雄'}
				<span className="text-error">{imgCheckeds.join(' + ')}</span>
			</div>
			<Divider />

			<div className="mb-4 text-2xl font-bold">行内元素排列</div>
			<div className="mb-4 mt-8 text-lg font-bold">checkboxChild 行内元素排列</div>
			<Checkbox
				layout="inline"
				data={dotaInlines}
				checkboxChild={({ item }) => (
					<div
						className={`m-1 rounded-sm border px-2 py-0.5 text-sm cursor-pointer ${
							checkInlines.includes(item.name)
								? 'bg-primary/10 text-primary dark:bg-dark/10 dark:text-dark'
								: 'border-gray-200 bg-gray-100 dark:border-gray-500 dark:bg-gray-600'
						}`}
						onClick={() => dotaInlineFun(item.name)}
					>
						{item.label}
					</div>
				)}
			/>
			<div className="mt-2 text-xs">已选：{checkInlines.join('-')}</div>
			<Divider />

			<div className="mb-4 text-2xl font-bold">纵向排列</div>
			<div className="mb-4 mt-8 text-lg font-bold">基础用法</div>
			<Checkbox data={dota} />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">长文字选项</div>
			<Checkbox data={dotaLong} />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">文字靠左</div>
			<Checkbox data={dota} textPosition="l" />

			<div className="mb-4 mt-8 text-lg font-bold">复杂选项 && 自定义选中效果</div>
			<Checkbox
				data={dotaVoices}
				checkboxChild={({ item }) => (
					<div className="flex cursor-pointer items-center" onClick={() => dotaVoicesFun(item.name)}>
						<div>
							<Icon
								name={voiceCheckeds.includes(item.name) ? 'ri-checkbox-fill' : 'ri-checkbox-line'}
								theme={voiceCheckeds.includes(item.name)}
								opacity={voiceCheckeds.includes(item.name) ? 1 : 0.2}
							/>
						</div>
						<div className={`ml-2 grow ${voiceCheckeds.includes(item.name) ? 'text-primary dark:text-dark' : ''}`}>
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

			<div className="mb-4 mt-8 text-lg font-bold">批量操作</div>
			<Checkbox data={dotaAll} checkeds={checkDotas} onChange={setCheckDotas} />
			<div className="mt-2 text-xs">已选：{checkDotas.map((a) => dotaAll.find((b) => b.name === a)?.label).join('-')}</div>
			<div className="mt-2 text-xs">未选：{noCheckDotas.map((a) => dotaAll.find((b) => b.name === a)?.label).join('-')}</div>
			<div className="mt-2 flex">
				<div className="flex-1">
					<Button fill="lineState" heightIn="1" onClick={checkAllFun}>
						全选
					</Button>
				</div>
				<div className="flex-1">
					<Button fill="lineState" heightIn="1" onClick={checkNoneFun}>
						全不选
					</Button>
				</div>
				<div className="flex-1">
					<Button fill="lineState" heightIn="1" onClick={checkReverseFun}>
						反选
					</Button>
				</div>
			</div>
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">带动画</div>
			<div className="flex justify-center" style={{ height: animateHeight }}>
				<div className="flex-1">
					<div className="pb-2">未选</div>
					{animateNos.map((item) => (
						<div key={item} className="transition-all duration-300">
							<CheckboxItem name={item} checked={!animateNos.includes(item)} onClick={checkAnimateNoFun}>
								{item}
							</CheckboxItem>
						</div>
					))}
				</div>
				<div className="flex-1">
					<div className="pb-2">已选</div>
					{animateYess.map((item) => (
						<div key={item} className="transition-all duration-300">
							<CheckboxItem name={item} checked={animateYess.includes(item)} onClick={checkAnimaYesFun}>
								{item}
							</CheckboxItem>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default CheckboxZh;
