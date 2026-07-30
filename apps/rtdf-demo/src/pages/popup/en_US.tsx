import { useState } from 'react';
import { Button, Cell, Icon, Popup, Slider, Tab } from 'rtdf/components';
import type { EasingProps, TabLabelProps } from 'rtdf/types';
import Aphorism from '../components/aphorism';

function PopupEn() {
	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);
	const [visible4, setVisible4] = useState(false);
	const [visible5, setVisible5] = useState(false);
	const [visible6, setVisible6] = useState(false);
	const [visible7, setVisible7] = useState(false);
	const [visible8, setVisible8] = useState(false);
	const [visible9, setVisible9] = useState(false);
	const [visible10, setVisible10] = useState(false);
	const [visible11, setVisible11] = useState(false);
	const [visible12, setVisible12] = useState(false);
	const [visible13, setVisible13] = useState(false);
	const [visible14, setVisible14] = useState(false);
	const [visible15, setVisible15] = useState(false);
	const [visible17, setVisible17] = useState(false);
	const [visible18, setVisible18] = useState(false);
	const [visible19, setVisible19] = useState(false);
	const [visible20, setVisible20] = useState(false);

	const easeTypes: EasingProps[] = ['cubicOut', 'backOut', 'bounceOut', 'elasticOut'];
	const easeLabels: TabLabelProps[] = easeTypes.map((item) => ({ text: item.replace('Out', '') }));
	const [easeTypeIndex, setEaseTypeIndex] = useState(0);
	const easeType = easeTypes[easeTypeIndex];

	const durationModes = ['enter', 'exit'] as const;
	const durationLabels: TabLabelProps[] = [{ text: 'Enter' }, { text: 'Exit' }];
	const [durationModeIndex, setDurationModeIndex] = useState(0);
	const durationMode = durationModes[durationModeIndex];

	const [inDuration, setInDuration] = useState(450);
	const [outDuration, setOutDuration] = useState(240);
	const durationValue = durationMode === 'enter' ? inDuration : outDuration;

	const handleDurationChange = (value: number) => {
		if (durationMode === 'enter') {
			setInDuration(value);
			return;
		}
		setOutDuration(value);
	};

	return (
		<div className="py-4">
			<Cell title="Basic usage" onClick={() => setVisible1(true)} />
			<Popup visible={visible1} onClose={() => setVisible1(false)} />

			<Cell title="Top position" onClick={() => setVisible2(true)} />
			<Popup visible={visible2} position="top" onClose={() => setVisible2(false)} />

			<Cell title="Left position" onClick={() => setVisible3(true)} />
			<Popup visible={visible3} position="left" onClose={() => setVisible3(false)} />

			<Cell title="Right side position" onClick={() => setVisible4(true)} />
			<Popup visible={visible4} position="right" onClose={() => setVisible4(false)} />

			<Cell title="Intermediate position" onClick={() => setVisible5(true)} />
			<Popup visible={visible5} position="center" onClose={() => setVisible5(false)} />

			<Cell title="Rounded corners at the top" onClick={() => setVisible6(true)} />
			<Popup visible={visible6} radius="2xl" onClose={() => setVisible6(false)} />

			<Cell title="Have rounded corners and spacing" onClick={() => setVisible7(true)} />
			<Popup visible={visible7} radiusPosition="all" radius="3xl" px="4" py="4" onClose={() => setVisible7(false)} />

			<Cell title="The center is spaced and rounded" onClick={() => setVisible10(true)} />
			<Popup visible={visible10} position="center" radiusPosition="all" radius="xl" px="8" onClose={() => setVisible10(false)} />

			<div className="px-2 py-4">
				<div className="mb-2 text-sm text-black/50 dark:text-white/50">Easing (easeType: {easeType})</div>
				<Tab labels={easeLabels} active={easeTypeIndex} onClickTab={setEaseTypeIndex} />
			</div>

			<div className="px-2 py-4">
				<div className="mb-2 text-sm text-black/50 dark:text-white/50">
					Duration ({durationMode === 'enter' ? 'Enter' : 'Exit'}: {durationValue} ms)
				</div>
				<Tab labels={durationLabels} active={durationModeIndex} onClickTab={setDurationModeIndex} />
				<div className="mt-3">
					<Slider value={durationValue} minRange={0} maxRange={1000} step={50} onChange={handleDurationChange} />
				</div>
			</div>

			<Cell title="Custom easing and duration" onClick={() => setVisible11(true)} />
			<Popup
				visible={visible11}
				easeType={easeType}
				easeOutType={easeType}
				duration={inDuration}
				outDuration={outDuration}
				onClose={() => setVisible11(false)}
			/>

			<Cell title="Different size" onClick={() => setVisible8(true)} />
			<Popup visible={visible8} size={80} onClose={() => setVisible8(false)} />

			<Cell title="The left side has different sizes" onClick={() => setVisible9(true)} />
			<Popup visible={visible9} size={80} position="left" onClose={() => setVisible9(false)} />

			<Cell title="The mask is completely transparent and fuzzy" onClick={() => setVisible12(true)} />
			<Popup
				visible={visible12}
				position="center"
				radiusPosition="all"
				radius="xl"
				px="8"
				mask={{ opacity: '0', backdropBlur: 'sm' }}
				onClose={() => setVisible12(false)}
			/>

			<Cell title="Clicking the mask does not close" onClick={() => setVisible13(true)} />
			<Popup visible={visible13} maskClosable={false} onClose={() => setVisible13(false)}>
				<div className="flex h-full flex-col justify-center">
					<Button onClick={() => setVisible13(false)}>Shut down</Button>
				</div>
			</Popup>

			<Cell title="Size automatic" detail="Depends on internal elements" onClick={() => setVisible14(true)} />
			<Popup
				visible={visible14}
				size={0}
				radiusPosition="all"
				radius="3xl"
				px="4"
				py="4"
				transitionDistance={353}
				onClose={() => setVisible14(false)}
			>
				<div className="w-full text-center">
					<div className="py-6 text-xl font-bold">AirPods Pro connected</div>
					<div className="m-auto w-1/2">
						<img className="w-full object-cover" src="/assets/images/airpods-pro2.png" alt="" />
					</div>
					<div className="text-primary dark:text-dark flex justify-around py-6">
						<div>set</div>
						<div>music</div>
					</div>
				</div>
			</Popup>

			<Cell title="The left position is automatically sized" onClick={() => setVisible20(true)} />
			<Popup
				visible={visible20}
				size={0}
				position="left"
				py="48"
				radiusPosition="right"
				radius="2xl"
				transitionDistance={80}
				onClose={() => setVisible20(false)}
			>
				<div className="text-primary dark:text-dark flex h-full flex-col justify-around">
					<button type="button" className="p-6" onClick={() => setVisible20(false)}>
						Home
					</button>
					<button type="button" className="p-6" onClick={() => setVisible20(false)}>
						Setting
					</button>
					<button type="button" className="p-6" onClick={() => setVisible20(false)}>
						About
					</button>
				</div>
			</Popup>

			<Cell title="Size automatic background transparent" onClick={() => setVisible17(true)} />
			<Popup
				visible={visible17}
				position="top"
				size={0}
				px="4"
				py="8"
				transparent
				transitionDistance={136}
				onClose={() => setVisible17(false)}
			>
				<div className="flex w-full justify-between rounded-full bg-black p-3 text-white">
					<div className="flex">
						<div className="h-12 w-12 overflow-hidden rounded-full">
							<img className="w-full object-cover" src="/assets/images/avatar_1.jpg" alt="" />
						</div>
						<div className="flex flex-col justify-end pl-4">
							<div className="text-xs text-white/40">Mobile phone</div>
							<div>Hu Ge</div>
						</div>
					</div>
					<div className="flex space-x-3">
						<div
							className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-error"
							style={{ transform: 'rotate(135deg)' }}
						>
							<Icon name="ri-phone-fill" />
						</div>
						<div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-success">
							<Icon name="ri-phone-fill" />
						</div>
					</div>
				</div>
			</Popup>

			<Cell title="The center position has a transparent background" onClick={() => setVisible18(true)} />
			<Popup visible={visible18} size={0} position="center" transparent onClose={() => setVisible18(false)}>
				<div className="flex flex-col justify-center">
					<div className="m-auto w-1/2">
						<img className="w-full object-cover" src="/assets/images/airpods-pro2.png" alt="" />
					</div>
				</div>
			</Popup>

			<Cell title="Reverse color mask" onClick={() => setVisible15(true)} />
			<Popup visible={visible15} mask={{ inverse: true }} onClose={() => setVisible15(false)} />

			<Cell title="Overflow roll" onClick={() => setVisible19(true)} />
			<Popup visible={visible19} size={30} position="center" onClose={() => setVisible19(false)}>
				<Aphorism num={4} />
			</Popup>
		</div>
	);
}

export default PopupEn;
