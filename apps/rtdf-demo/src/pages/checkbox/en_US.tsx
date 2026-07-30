import { useState } from 'react';
import { Button, Checkbox, CheckboxItem, Divider, Icon } from 'rtdf/components';
import type { CheckboxItemProps } from 'rtdf/types';

const CheckboxEn = () => {
	const dota: CheckboxItemProps[] = [
		{ label: 'Jugg', name: 'Juggernaut' },
		{ label: 'SB', name: 'Spirit Breaker' },
		{ label: 'KOTL', name: 'Keeper of the Light' },
		{ label: 'Mag', name: 'Magnus' }
	];
	const [checkeds, setCheckeds] = useState<string[]>([]);
	const clickItemFn = (name: string) => {
		setCheckeds(checkeds.includes(name) ? checkeds.filter((value) => value !== name) : [name, ...checkeds]);
	};
	const [checkedsCustom, setCheckedsCustom] = useState<string[]>([]);
	const clickCustomFn = (name: string) => {
		setCheckedsCustom(checkedsCustom.includes(name) ? checkedsCustom.filter((value) => value !== name) : [name, ...checkedsCustom]);
	};

	const dotaInlines: CheckboxItemProps[] = [
		{ label: 'Lina', name: 'Lina' },
		{ label: 'SB', name: 'Spirit Breaker' },
		{ label: 'Morph', name: 'Morphling' },
		{ label: 'Sniper', name: 'Sniper' },
		{ label: 'Sven', name: 'Sven' },
		{ label: 'Invoker', name: 'Invoker' },
		{ label: 'Tide', name: 'Tidehunter' },
		{ label: 'Bat', name: 'Batrider' },
		{ label: 'Mag', name: 'Magnus' }
	];
	const [checkInlines, setCheckInlines] = useState<string[]>(['Spirit Breaker', 'Morphling']);
	const dotaInlineFun = (name: string) => {
		setCheckInlines(checkInlines.includes(name) ? checkInlines.filter((value) => value !== name) : [name, ...checkInlines]);
	};

	const dotaImgs: (CheckboxItemProps & { imgName: string })[] = [
		{ label: 'Lina', name: 'Lina', imgName: '火女' },
		{ label: 'SB', name: 'Spirit Breaker', imgName: '小牛' },
		{ label: 'Morph', name: 'Morphling', imgName: '水人' },
		{ label: 'Sniper', name: 'Sniper', imgName: '火枪' },
		{ label: 'Sven', name: 'Sven', imgName: '斯温' }
	];
	const [imgCheckeds, setImgCheckeds] = useState<string[]>(['Lina']);
	const dotaImgsFun = (name: string) => {
		setImgCheckeds(imgCheckeds.includes(name) ? imgCheckeds.filter((value) => value !== name) : [name, ...imgCheckeds]);
	};

	const dotaLong: CheckboxItemProps[] = [
		{ name: 'Jugg', label: 'Juggernaut is a melee agility hero who can quickly engage in combat.' },
		{ name: 'SB', label: 'Barathrum, Spirit Breaker is a powerful ganking strength melee hero.' },
		{ name: 'KOTL', label: 'Ezalor, Keeper of the Light, is a famous support intelligence hero.' },
		{ name: 'Mag', label: 'Magnus? Why not ban Magnus? Why not ban Magnus?' }
	];

	const dotaVoices: (CheckboxItemProps & { voices: string[] })[] = [
		{ name: 'Invoker', label: 'Invoker', voices: ['"From the first point was begat a line."'] },
		{ name: 'Storm', label: 'Storm', voices: ['"Hey, wake up! Get some coffee, our tower is under attack."'] },
		{
			name: 'Batrider',
			label: 'Batrider',
			voices: [
				'"Oh Lina, wanna be my queen?"',
				'"Oh Windrunner, no need to run from me."',
				'"Crystal Maiden, you\'re like a tall glass of water."'
			]
		},
		{ name: 'Tidehunter', label: 'Tidehunter', voices: ['"I could eat a sea cucumber."'] }
	];
	const [voiceCheckeds, setVoiceCheckeds] = useState<string[]>([]);
	const dotaVoicesFun = (name: string) => {
		setVoiceCheckeds(voiceCheckeds.includes(name) ? voiceCheckeds.filter((value) => value !== name) : [name, ...voiceCheckeds]);
	};

	const dotaAll: CheckboxItemProps[] = [
		{ name: 'Lina', label: 'Lina' },
		{ name: 'SB', label: 'Spirit Breaker' },
		{ name: 'Morph', label: 'Morphling' },
		{ name: 'Sniper', label: 'Sniper' },
		{ name: 'Sven', label: 'Sven' },
		{ name: 'Invoker', label: 'Invoker' },
		{ name: 'Tide', label: 'Tidehunter' },
		{ name: 'Bat', label: 'Batrider' },
		{ name: 'Mag', label: 'Magnus' }
	];
	const [checkDotas, setCheckDotas] = useState<string[]>(['Sniper', 'Sven']);
	const noCheckDotas = dotaAll.filter((item) => !checkDotas.some((name) => name === item.name)).map((item) => item.name);
	const checkAllFun = () => {
		setCheckDotas(dotaAll.map((item) => item.name));
	};
	const checkNoneFun = () => {
		setCheckDotas([]);
	};
	const checkReverseFun = () => {
		setCheckDotas(dotaAll.filter((item) => !checkDotas.some((name) => name === item.name)).map((item) => item.name));
	};

	const animates = ['Lina', 'SB', 'Morph', 'Sniper', 'Sven', 'Invoker', 'Tide', 'Bat', 'Mag'];
	const [animateNos, setAnimateNos] = useState<string[]>(['Lina', 'SB', 'Morph', 'Sniper', 'Sven', 'Invoker']);
	const animateYess = animates.filter((item) => !animateNos.some((name) => name === item));
	const animateHeight = animates.length * 30 + 50;
	const checkAnimateNoFun = (name: string) => {
		setAnimateNos(animateNos.filter((item) => item !== name));
	};
	const checkAnimaYesFun = (name: string) => {
		setAnimateNos([name, ...animateNos]);
	};

	return (
		<div className="px-4 pb-8">
			<div className="mb-4 mt-8 text-2xl font-bold">Horizontal Layout</div>
			<div className="mb-4 mt-6 text-lg font-bold">Basic Usage</div>
			<Checkbox layout="h" data={dota} />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">Text Position</div>
			<Checkbox layout="h" data={dota} textPosition="l" />
			<Divider />
			<Checkbox layout="h" data={dota} textPosition="b" />
			<Divider />
			<Checkbox layout="h" data={dota} textPosition="t" />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">Custom Icons</div>
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

			<div className="mb-4 mt-8 text-lg font-bold">checkboxChild as Button Component</div>
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

			<div className="mb-4 mt-8 text-lg font-bold">checkboxChild as Custom Element</div>
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

			<div className="mb-4 mt-8 text-lg font-bold">Image Options</div>
			<Checkbox
				layout="h"
				data={dotaImgs}
				checkboxChild={({ item }) => {
					const imgName = (item as CheckboxItemProps & { imgName: string }).imgName;
					return (
						<div className="flex flex-col items-center">
							<div
								className={`mb-1 h-12 w-12 cursor-pointer overflow-hidden rounded-sm ${imgCheckeds.includes(item.name) ? 'ring-primary dark:ring-dark ring-2' : ''}`}
								onClick={() => dotaImgsFun(item.name)}
							>
								<img className="h-full w-full object-cover" src={`/assets/images/dota_${imgName}.png`} alt="" />
							</div>
							<div>
								<Icon
									name={imgCheckeds.includes(item.name) ? 'ri-arrow-up-s-fill' : 'ri-arrow-up-s-line'}
									theme={imgCheckeds.includes(item.name)}
									opacity={imgCheckeds.includes(item.name) ? 1 : 0.2}
								/>
							</div>
						</div>
					);
				}}
			/>
			<div className="text-sm">
				{imgCheckeds.length > 0 ? 'Selected ' : 'No heroes selected'}
				<span className="text-error">{imgCheckeds.join(' + ')}</span>
			</div>
			<Divider />

			<div className="mb-4 text-2xl font-bold">Inline Layout</div>
			<div className="mb-4 mt-8 text-lg font-bold">checkboxChild Inline Layout</div>
			<Checkbox
				layout="inline"
				data={dotaInlines}
				checkboxChild={({ item }) => (
					<div
						className={`m-1 cursor-pointer rounded-sm border px-2 py-0.5 text-sm ${
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
			<div className="mt-2 text-xs">Selected: {checkInlines.join('-')}</div>
			<Divider />

			<div className="mb-4 text-2xl font-bold">Vertical Layout</div>
			<div className="mb-4 mt-8 text-lg font-bold">Basic Usage</div>
			<Checkbox data={dota} />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">Long Text Options</div>
			<Checkbox data={dotaLong} />
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">Left Aligned Text</div>
			<Checkbox data={dota} textPosition="l" />

			<div className="mb-4 mt-8 text-lg font-bold">Complex Options && Custom Selection Effect</div>
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
							{(item as CheckboxItemProps & { voices: string[] }).voices.map((voice, index) => (
								<div key={index} className="text-xs">
									{voice}
								</div>
							))}
							<div className="mt-1 h-px bg-black/10 dark:bg-white/10"></div>
						</div>
					</div>
				)}
			/>

			<div className="mb-4 mt-8 text-lg font-bold">Batch Operations</div>
			<Checkbox data={dotaAll} checkeds={checkDotas} onChange={setCheckDotas} />
			<div className="mt-2 text-xs">Selected: {checkDotas.map((name) => dotaAll.find((item) => item.name === name)?.label).join('-')}</div>
			<div className="mt-2 text-xs">
				Unselected: {noCheckDotas.map((name) => dotaAll.find((item) => item.name === name)?.label).join('-')}
			</div>
			<div className="mt-2 flex">
				<div className="flex-1">
					<Button fill="lineState" heightIn="1" onClick={checkAllFun}>
						All
					</Button>
				</div>
				<div className="flex-1">
					<Button fill="lineState" heightIn="1" onClick={checkNoneFun}>
						None
					</Button>
				</div>
				<div className="flex-1">
					<Button fill="lineState" heightIn="1" onClick={checkReverseFun}>
						Reverse
					</Button>
				</div>
			</div>
			<Divider />

			<div className="mb-4 mt-8 text-lg font-bold">With Animation</div>
			<div className="flex justify-center" style={{ height: animateHeight }}>
				<div className="flex-1">
					<div className="pb-2">Unselected</div>
					{animateNos.map((item) => (
						<div key={item} className="transition-all duration-300">
							<CheckboxItem name={item} checked={!animateNos.includes(item)} onClick={checkAnimateNoFun}>
								{item}
							</CheckboxItem>
						</div>
					))}
				</div>
				<div className="flex-1">
					<div className="pb-2">Selected</div>
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
};

export default CheckboxEn;
