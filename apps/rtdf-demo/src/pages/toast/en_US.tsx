import { useEffect, useState } from 'react';
import { Button, Cell, Loading, Slider, Tab, Toast } from 'rtdf/components';
import type { EasingProps, TabLabelProps } from 'rtdf/types';

function ToastEn() {
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
	const [visible20, setVisible20] = useState(false);
	const [visible21, setVisible21] = useState(false);
	const [visible22, setVisible22] = useState(false);
	const [visible23, setVisible23] = useState(false);
	const [visible25, setVisible25] = useState(false);

	const [time, setTime] = useState(4);
	const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null);
	const transitionTypes = ['scale', 'fly', 'fade', 'blur'] as const;
	const transitionLabels: TabLabelProps[] = transitionTypes.map((item) => ({ text: item }));
	const easeTypes: EasingProps[] = ['cubicOut', 'bounceOut', 'elasticOut', 'backOut'];
	const easeLabels: TabLabelProps[] = easeTypes.map((item) => ({ text: item.replace('Out', '') }));
	const [transitionTypeIndex, setTransitionTypeIndex] = useState(0);
	const [easeTypeIndex, setEaseTypeIndex] = useState(0);
	const [inDuration, setInDuration] = useState(300);
	const [outDuration, setOutDuration] = useState(300);
	const [flyY, setFlyY] = useState(-100);
	const [scaleStart, setScaleStart] = useState(0);
	const [blurAmount, setBlurAmount] = useState(5);
	const transitionType = transitionTypes[transitionTypeIndex];
	const easeType = easeTypes[easeTypeIndex];

	const getTransitionParams = () => {
		const base = { duration: inDuration };
		if (transitionType === 'fly') {
			return { ...base, y: flyY };
		}
		if (transitionType === 'scale') {
			return { ...base, start: scaleStart };
		}
		if (transitionType === 'blur') {
			return { ...base, amount: blurAmount };
		}
		return base;
	};

	const useChildrenFun = () => {
		setVisible25(true);
		setTime(4);
		const t = setInterval(() => {
			setTime((prev) => {
				if (prev <= 1) {
					clearInterval(t);
					setVisible25(false);
					return 4;
				}
				return prev - 1;
			});
		}, 1000);
		setTimer(t);
	};

	useEffect(() => {
		return () => {
			if (timer) clearInterval(timer);
		};
	}, [timer]);

	return (
		<div className="py-4">
			<Cell title="Basic usage" onClick={() => setVisible1(true)} />
			<Toast visible={visible1} message="Light hint" onClose={() => setVisible1(false)} />

			<Cell title="Long text prompt" onClick={() => setVisible2(true)} />
			<Toast
				visible={visible2}
				message="When the content is too long, it wraps to multiple lines. It is usually not recommended to show too much content here."
				onClose={() => setVisible2(false)}
			/>

			<Cell title="Do not block clicks" onClick={() => setVisible3(true)} />
			<Toast visible={visible3} clickable message="The content below the mask can still be clicked" onClose={() => setVisible3(false)} />

			<Cell title="Fixed display time" onClick={() => setVisible4(true)} />
			<Toast visible={visible4} duration={6000} message="Closes automatically after 6 seconds" onClose={() => setVisible4(false)} />

			<Cell title="Non-automatic closing" onClick={() => setVisible5(true)} />
			<Toast
				visible={visible5}
				duration={0}
				clickable
				message="This toast will not close automatically. Tap the button to close it."
				onClose={() => setVisible5(false)}
			/>

			<Cell title="Success message" onClick={() => setVisible6(true)} />
			<Toast visible={visible6} type="success" message="Success toast" onClose={() => setVisible6(false)} />

			<Cell title="Failure prompt" onClick={() => setVisible7(true)} />
			<Toast visible={visible7} type="error" message="Error toast" onClose={() => setVisible7(false)} />

			<Cell title="Warning prompt" onClick={() => setVisible8(true)} />
			<Toast visible={visible8} type="warning" message="Warning toast" onClose={() => setVisible8(false)} />

			<Cell title="Information prompt" onClick={() => setVisible9(true)} />
			<Toast visible={visible9} type="info" message="Info toast" onClose={() => setVisible9(false)} />

			<Cell title="Load prompt" onClick={() => setVisible10(true)} />
			<Toast visible={visible10} type="loading" message="Loading..." onClose={() => setVisible10(false)} />

			<Cell title="Theme color loading prompt" onClick={() => setVisible11(true)} />
			<Toast visible={visible11} type="loading" loading={{ theme: true }} message="Loading..." onClose={() => setVisible11(false)} />

			<Cell title="Loading prompt for # 1_3" onClick={() => setVisible12(true)} />
			<Toast visible={visible12} type="loading" loading={{ type: '1_3' }} message="Loading..." onClose={() => setVisible12(false)} />

			<Cell title="Custom type" onClick={() => setVisible13(true)} />
			<Toast visible={visible13} type="icon" icon={{ name: 'ri-thumb-up-fill' }} message="Nice work!" onClose={() => setVisible13(false)} />

			<Cell title="The mask is opaque" onClick={() => setVisible14(true)} />
			<Toast visible={visible14} mask={{ opacity: '0.3' }} message="Mask opacity is 0.3" onClose={() => setVisible14(false)} />

			<Cell title="Reverse color mask" onClick={() => setVisible15(true)} />
			<Toast visible={visible15} mask={{ inverse: true, opacity: '0.5' }} message="Inverse mask" onClose={() => setVisible15(false)} />

			<Cell title="Mask blur" onClick={() => setVisible16(true)} />
			<Toast
				visible={visible16}
				mask={{ opacity: '0', backdropBlur: 'sm' }}
				message="The content below the mask is blurred"
				onClose={() => setVisible16(false)}
			/>

			<div className="px-2 py-4">
				<div className="text-sm text-black/50 dark:text-white/50 mb-2">Animation Type (transitionType: {transitionType})</div>
				<Tab labels={transitionLabels} active={transitionTypeIndex} onClickTab={(value) => setTransitionTypeIndex(value)} />
			</div>

			<div className="px-2 py-4">
				<div className="text-sm text-black/50 dark:text-white/50 mb-2">Easing Function (easeType: {easeType})</div>
				<Tab labels={easeLabels} active={easeTypeIndex} onClickTab={(value) => setEaseTypeIndex(value)} />
			</div>

			<div className="px-2 py-4">
				<div className="text-sm text-black/50 dark:text-white/50 mb-2">Enter Animation Duration: {inDuration}ms</div>
				<Slider value={inDuration} minRange={0} maxRange={1000} step={50} onChange={(value) => setInDuration(value)} />
			</div>

			<div className="px-2 py-4">
				<div className="text-sm text-black/50 dark:text-white/50 mb-2">Exit Animation Duration: {outDuration}ms</div>
				<Slider value={outDuration} minRange={0} maxRange={1000} step={50} onChange={(value) => setOutDuration(value)} />
			</div>

			{transitionType === 'fly' ? (
				<div className="px-2 py-4">
					<div className="text-sm text-black/50 dark:text-white/50 mb-2">fly Y offset: {flyY} px</div>
					<Slider value={flyY} minRange={-200} maxRange={200} step={10} onChange={(value) => setFlyY(value)} />
				</div>
			) : null}

			{transitionType === 'scale' ? (
				<div className="px-2 py-4">
					<div className="text-sm text-black/50 dark:text-white/50 mb-2">scale start parameter: {scaleStart}</div>
					<Slider value={scaleStart} minRange={0} maxRange={1} step={0.1} onChange={(value) => setScaleStart(value)} />
				</div>
			) : null}

			{transitionType === 'blur' ? (
				<div className="px-2 py-4">
					<div className="text-sm text-black/50 dark:text-white/50 mb-2">blur amount: {blurAmount} px</div>
					<Slider value={blurAmount} minRange={0} maxRange={20} step={1} onChange={(value) => setBlurAmount(value)} />
				</div>
			) : null}

			<Cell title="Custom Animation Effect" onClick={() => setVisible17(true)} />
			<Toast
				visible={visible17}
				transitionType={transitionType}
				transitionParams={getTransitionParams()}
				outDuration={outDuration}
				easeType={easeType}
				easeOutType={easeType}
				message="Adjust the controls above to preview different animation effects"
				onClose={() => setVisible17(false)}
			/>

			<Cell title="Top" onClick={() => setVisible20(true)} />
			<Toast visible={visible20} position="top" message="Toast is positioned at the top" onClose={() => setVisible20(false)} />

			<Cell title="Bottom" onClick={() => setVisible21(true)} />
			<Toast visible={visible21} position="bottom" message="Toast is positioned at the bottom" onClose={() => setVisible21(false)} />

			<Cell title="Top increase distance" onClick={() => setVisible22(true)} />
			<Toast
				visible={visible22}
				position="top"
				py="40"
				message="Toast is positioned at the top with extra spacing"
				onClose={() => setVisible22(false)}
			/>

			<Cell title="Use Snippet" onClick={useChildrenFun} />
			<Toast visible={visible25} duration={0} onClose={() => setVisible25(false)}>
				<div className="flex flex-col space-y-4">
					<div>Custom toast content</div>
					<Loading inverse />
					<div>Closes in {time}s</div>
				</div>
			</Toast>

			<Cell title="Different styles of rounded corners" onClick={() => setVisible23(true)} />
			<Toast visible={visible23} radius="2xl" message="Larger rounded corners" onClose={() => setVisible23(false)} />

			<div className="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
				<div className="flex-1">
					<Button fill="lineState" onClick={() => setVisible5(false)}>
						Manual shutdown
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ToastEn;
