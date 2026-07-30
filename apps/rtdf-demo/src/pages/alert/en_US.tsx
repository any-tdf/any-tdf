import { useMemo, useState } from 'react';
import { Alert, Button, Cell, Slider, Switch, Tab } from 'rtdf/components';
import type { LargeAreaRadius } from 'rtdf/types';

const transitionTypes = ['fly', 'scale', 'fade', 'blur'] as const;
const transitionLabels = transitionTypes.map((item) => ({ text: item }));
const easeTypes = ['cubicOut', 'bounceOut', 'elasticOut', 'backOut'] as const;
const easeLabels = easeTypes.map((item) => ({ text: item.replace('Out', '') }));
const radiusValues: LargeAreaRadius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];

function AlertEn() {
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
	const [visible16, setVisible16] = useState(false);
	const [visible17, setVisible17] = useState(false);
	const [visible18, setVisible18] = useState(false);
	const [visible19, setVisible19] = useState(false);

	const [inverse, setInverse] = useState(true);
	const [radiusIndex, setRadiusIndex] = useState(2);
	const [transitionTypeIndex, setTransitionTypeIndex] = useState(0);
	const [easeTypeIndex, setEaseTypeIndex] = useState(0);
	const [inDuration, setInDuration] = useState(300);
	const [outDuration, setOutDuration] = useState(300);
	const [flyY, setFlyY] = useState(-100);
	const [scaleStart, setScaleStart] = useState(0);
	const [blurAmount, setBlurAmount] = useState(5);

	const radius = radiusValues[radiusIndex];
	const transitionType = transitionTypes[transitionTypeIndex];
	const easeType = easeTypes[easeTypeIndex];

	const transitionParams = useMemo(() => {
		const base = { duration: inDuration };
		if (transitionType === 'fly') return { ...base, y: flyY };
		if (transitionType === 'scale') return { ...base, start: scaleStart };
		if (transitionType === 'blur') return { ...base, amount: blurAmount };
		return base;
	}, [blurAmount, flyY, inDuration, scaleStart, transitionType]);

	return (
		<div className="py-4">
			<Cell title="Basic Usage" onClick={() => setVisible1(true)} />
			<Alert visible={visible1} message="This is an alert message" onClose={() => setVisible1(false)} />

			<Cell title="With Title" onClick={() => setVisible2(true)} />
			<Alert visible={visible2} title="Alert Title" message="This is an alert message with a title" onClose={() => setVisible2(false)} />

			<Cell title="Success Alert" onClick={() => setVisible3(true)} />
			<Alert
				visible={visible3}
				type="success"
				title="Success"
				message="Operation completed successfully!"
				onClose={() => setVisible3(false)}
			/>

			<Cell title="Error Alert" onClick={() => setVisible4(true)} />
			<Alert
				visible={visible4}
				type="error"
				title="Error"
				message="Operation failed, please try again!"
				onClose={() => setVisible4(false)}
			/>

			<Cell title="Warning Alert" onClick={() => setVisible5(true)} />
			<Alert
				visible={visible5}
				type="warning"
				title="Warning"
				message="Please note, this action cannot be undone!"
				onClose={() => setVisible5(false)}
			/>

			<Cell title="Info Alert" onClick={() => setVisible6(true)} />
			<Alert
				visible={visible6}
				type="info"
				title="Info"
				message="This is a regular information alert."
				onClose={() => setVisible6(false)}
			/>

			<Cell title="Bottom Position" onClick={() => setVisible7(true)} />
			<Alert visible={visible7} position="bottom" type="success" message="Alert slides in from bottom" onClose={() => setVisible7(false)} />

			<Cell title="Increased Distance" onClick={() => setVisible8(true)} />
			<Alert visible={visible8} py="60" type="info" message="Further from the top" onClose={() => setVisible8(false)} />

			<Cell title="Hide Close Button" onClick={() => setVisible9(true)} />
			<Alert
				visible={visible9}
				closable={false}
				type="warning"
				message="This alert has no close button"
				onClose={() => setVisible9(false)}
			/>

			<Cell title="Hide Type Icon" onClick={() => setVisible10(true)} />
			<Alert visible={visible10} type="success" showIcon={false} message="Success without icon" onClose={() => setVisible10(false)} />

			<Cell title="Custom Icon" onClick={() => setVisible11(true)} />
			<Alert
				visible={visible11}
				icon={{ name: 'ri-rocket-2-line', state: 'success' }}
				message="Using custom icon"
				onClose={() => setVisible11(false)}
			/>

			<Cell title="Fixed 6s Duration" onClick={() => setVisible12(true)} />
			<Alert visible={visible12} duration={6000} type="info" message="Auto close after 6 seconds" onClose={() => setVisible12(false)} />

			<Cell title="No Auto Close" onClick={() => setVisible13(true)} />
			<Alert
				visible={visible13}
				duration={0}
				type="warning"
				title="Notice"
				message="This alert won't close automatically, please close manually"
				onClose={() => setVisible13(false)}
			/>

			<Cell title="Custom Card Style" onClick={() => setVisible14(true)} />
			<Alert
				visible={visible14}
				card={{ shadow: '2xl', radius: '2xl', border: 'solid' }}
				type="success"
				title="Custom Card"
				message="Larger shadow and radius"
				onClose={() => setVisible14(false)}
			/>

			<Cell title="Using children" onClick={() => setVisible15(true)} />
			<Alert visible={visible15} duration={0} onClose={() => setVisible15(false)}>
				<div className="flex flex-col gap-2">
					<div className="font-medium">Custom Content</div>
					<div className="text-sm text-black/70 dark:text-white/70">This is fully customized alert content, can contain any elements.</div>
					<div className="mt-2 flex gap-2">
						<Button size="sm" onClick={() => setVisible15(false)}>
							Cancel
						</Button>
						<Button size="sm" fill="base" onClick={() => setVisible15(false)}>
							Confirm
						</Button>
					</div>
				</div>
			</Alert>

			<div className="px-2 py-4">
				<div className="mb-2 text-sm text-black/50 dark:text-white/50">Animation Type ( transitionType: {transitionType} )</div>
				<Tab labels={transitionLabels} active={transitionTypeIndex} onClickTab={(value) => setTransitionTypeIndex(value)} />
			</div>

			<div className="px-2 py-4">
				<div className="mb-2 text-sm text-black/50 dark:text-white/50">Easing Function ( easeType: {easeType} )</div>
				<Tab labels={easeLabels} active={easeTypeIndex} onClickTab={(value) => setEaseTypeIndex(value)} />
			</div>

			<div className="px-2 py-4">
				<div className="mb-2 text-sm text-black/50 dark:text-white/50">Enter Animation Duration: {inDuration} ms</div>
				<Slider value={inDuration} minRange={0} maxRange={1000} step={50} onChange={(value: number) => setInDuration(value)} />
			</div>

			<div className="px-2 py-4">
				<div className="mb-2 text-sm text-black/50 dark:text-white/50">Exit Animation Duration: {outDuration} ms</div>
				<Slider value={outDuration} minRange={0} maxRange={1000} step={50} onChange={(value: number) => setOutDuration(value)} />
			</div>

			{transitionType === 'fly' ? (
				<div className="px-2 py-4">
					<div className="mb-2 text-sm text-black/50 dark:text-white/50">fly Y offset: {flyY} px</div>
					<Slider value={flyY} minRange={-200} maxRange={200} step={10} onChange={(value: number) => setFlyY(value)} />
				</div>
			) : null}
			{transitionType === 'scale' ? (
				<div className="px-2 py-4">
					<div className="mb-2 text-sm text-black/50 dark:text-white/50">scale start parameter: {scaleStart}</div>
					<Slider value={scaleStart} minRange={0} maxRange={1} step={0.1} onChange={(value: number) => setScaleStart(value)} />
				</div>
			) : null}
			{transitionType === 'blur' ? (
				<div className="px-2 py-4">
					<div className="mb-2 text-sm text-black/50 dark:text-white/50">blur amount: {blurAmount} px</div>
					<Slider value={blurAmount} minRange={0} maxRange={20} step={1} onChange={(value: number) => setBlurAmount(value)} />
				</div>
			) : null}

			<Cell title="Custom Animation Effect" onClick={() => setVisible16(true)} />
			<Alert
				visible={visible16}
				transitionType={transitionType}
				transitionParams={transitionParams}
				outDuration={outDuration}
				easeType={easeType}
				easeOutType={easeType}
				type="success"
				message="Adjust the controls above to see different animation effects"
				onClose={() => setVisible16(false)}
			/>

			<div className="px-2 py-4">
				<div className="mb-2 text-sm text-black/50 dark:text-white/50">Adjust Radius ( Card radius: {radius} )</div>
				<Slider value={radiusIndex} minRange={0} maxRange={7} step={1} showSteps onChange={(value: number) => setRadiusIndex(value)} />
			</div>

			<Cell title="Different Radius Styles" onClick={() => setVisible17(true)} />
			<Alert
				visible={visible17}
				card={{ radius }}
				type="info"
				message="Adjust the slider above to see different radius"
				onClose={() => setVisible17(false)}
			/>

			<div className="px-2 py-4">
				<div className="flex items-center justify-between">
					<div className="text-sm text-black/50 dark:text-white/50">Inverse Color ( inverse: {String(inverse)} )</div>
					<Switch active={inverse} onClick={() => setInverse((prev) => !prev)} />
				</div>
			</div>

			<Cell title="Inverse Color Effect" onClick={() => setVisible18(true)} />
			<Alert
				visible={visible18}
				inverse={inverse}
				type="success"
				title="Notice"
				message="Inverse is enabled by default for better visibility"
				onClose={() => setVisible18(false)}
			/>

			<Cell title="Non-inverse Effect" onClick={() => setVisible19(true)} />
			<Alert
				visible={visible19}
				inverse={false}
				type="info"
				title="Notice"
				message="Inverse disabled, using normal background color"
				onClose={() => setVisible19(false)}
			/>

			<div className="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
				<div className="flex-1">
					<Button fill="lineState" onClick={() => setVisible13(false)}>
						Close Manually
					</Button>
				</div>
			</div>
		</div>
	);
}

export default AlertEn;
