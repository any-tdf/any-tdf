import { useState, useEffect } from 'react';
import { Toast, Cell, Button, Loading, Tab, Slider } from 'rtdf/components';
import type { EasingProps, TabLabelProps } from 'rtdf/types';

function ToastZh() {
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
			<Cell title="基础用法" onClick={() => setVisible1(true)} />
			<Toast visible={visible1} message="轻提示" onClose={() => setVisible1(false)} />

			<Cell title="长文本提示" onClick={() => setVisible2(true)} />
			<Toast visible={visible2} message="当字符数过长时换行，一般不建议在这里显示太多的内容！" onClose={() => setVisible2(false)} />

			<Cell title="不阻止点击" onClick={() => setVisible3(true)} />
			<Toast visible={visible3} clickable message="遮罩下层内容还可以点击" onClose={() => setVisible3(false)} />

			<Cell title="固定显示时间" onClick={() => setVisible4(true)} />
			<Toast visible={visible4} duration={6000} message="6 秒后自动关闭" onClose={() => setVisible4(false)} />

			<Cell title="不自动关闭" onClick={() => setVisible5(true)} />
			<Toast visible={visible5} duration={0} clickable message="此提示不会自动关闭，请点击按钮关闭" onClose={() => setVisible5(false)} />

			<Cell title="成功提示" onClick={() => setVisible6(true)} />
			<Toast visible={visible6} type="success" message="成功提示" onClose={() => setVisible6(false)} />

			<Cell title="失败提示" onClick={() => setVisible7(true)} />
			<Toast visible={visible7} type="error" message="失败提示" onClose={() => setVisible7(false)} />

			<Cell title="警告提示" onClick={() => setVisible8(true)} />
			<Toast visible={visible8} type="warning" message="警告提示" onClose={() => setVisible8(false)} />

			<Cell title="信息提示" onClick={() => setVisible9(true)} />
			<Toast visible={visible9} type="info" message="信息提示" onClose={() => setVisible9(false)} />

			<Cell title="加载提示" onClick={() => setVisible10(true)} />
			<Toast visible={visible10} type="loading" message="加载中..." onClose={() => setVisible10(false)} />

			<Cell title="主题色加载提示" onClick={() => setVisible11(true)} />
			<Toast visible={visible11} type="loading" loading={{ theme: true }} message="加载中..." onClose={() => setVisible11(false)} />

			<Cell title="1_3 号加载提示" onClick={() => setVisible12(true)} />
			<Toast visible={visible12} type="loading" loading={{ type: '1_3' }} message="加载中..." onClose={() => setVisible12(false)} />

			<Cell title="自定义类型" onClick={() => setVisible13(true)} />
			<Toast visible={visible13} type="icon" icon={{ name: 'ri-thumb-up-fill' }} message="你真棒！" onClose={() => setVisible13(false)} />

			<Cell title="遮罩不透明" onClick={() => setVisible14(true)} />
			<Toast visible={visible14} mask={{ opacity: '0.3' }} message="遮罩透明度为 0.3" onClose={() => setVisible14(false)} />

			<Cell title="反色遮罩" onClick={() => setVisible15(true)} />
			<Toast visible={visible15} mask={{ inverse: true, opacity: '0.5' }} message="反色遮罩" onClose={() => setVisible15(false)} />

			<Cell title="遮罩模糊" onClick={() => setVisible16(true)} />
			<Toast
				visible={visible16}
				mask={{ opacity: '0', backdropBlur: 'sm' }}
				message="遮罩下层内容模糊"
				onClose={() => setVisible16(false)}
			/>

			<div className="px-2 py-4">
				<div className="text-sm text-black/50 dark:text-white/50 mb-2">动画类型（ transitionType: {transitionType} ）</div>
				<Tab labels={transitionLabels} active={transitionTypeIndex} onClickTab={(value) => setTransitionTypeIndex(value)} />
			</div>

			<div className="px-2 py-4">
				<div className="text-sm text-black/50 dark:text-white/50 mb-2">缓动函数（ easeType: {easeType} ）</div>
				<Tab labels={easeLabels} active={easeTypeIndex} onClickTab={(value) => setEaseTypeIndex(value)} />
			</div>

			<div className="px-2 py-4">
				<div className="text-sm text-black/50 dark:text-white/50 mb-2">进入动画时长： {inDuration} ms</div>
				<Slider value={inDuration} minRange={0} maxRange={1000} step={50} onChange={(value) => setInDuration(value)} />
			</div>

			<div className="px-2 py-4">
				<div className="text-sm text-black/50 dark:text-white/50 mb-2">退出动画时长： {outDuration} ms</div>
				<Slider value={outDuration} minRange={0} maxRange={1000} step={50} onChange={(value) => setOutDuration(value)} />
			</div>

			{transitionType === 'fly' ? (
				<div className="px-2 py-4">
					<div className="text-sm text-black/50 dark:text-white/50 mb-2">fly 动画 Y 偏移： {flyY} px</div>
					<Slider value={flyY} minRange={-200} maxRange={200} step={10} onChange={(value) => setFlyY(value)} />
				</div>
			) : null}

			{transitionType === 'scale' ? (
				<div className="px-2 py-4">
					<div className="text-sm text-black/50 dark:text-white/50 mb-2">scale 动画 start 参数： {scaleStart}</div>
					<Slider value={scaleStart} minRange={0} maxRange={1} step={0.1} onChange={(value) => setScaleStart(value)} />
				</div>
			) : null}

			{transitionType === 'blur' ? (
				<div className="px-2 py-4">
					<div className="text-sm text-black/50 dark:text-white/50 mb-2">blur 动画模糊程度： {blurAmount} px</div>
					<Slider value={blurAmount} minRange={0} maxRange={20} step={1} onChange={(value) => setBlurAmount(value)} />
				</div>
			) : null}

			<Cell title="自定义动画效果" onClick={() => setVisible17(true)} />
			<Toast
				visible={visible17}
				transitionType={transitionType}
				transitionParams={getTransitionParams()}
				outDuration={outDuration}
				easeType={easeType}
				easeOutType={easeType}
				message="调整上方控件查看不同动画效果"
				onClose={() => setVisible17(false)}
			/>

			<Cell title="顶部" onClick={() => setVisible20(true)} />
			<Toast visible={visible20} position="top" message="提示位于顶部" onClose={() => setVisible20(false)} />

			<Cell title="底部" onClick={() => setVisible21(true)} />
			<Toast visible={visible21} position="bottom" message="提示位于底部" onClose={() => setVisible21(false)} />

			<Cell title="顶部增加距离" onClick={() => setVisible22(true)} />
			<Toast visible={visible22} position="top" py="40" message="提示位于顶部且增加了距离" onClose={() => setVisible22(false)} />

			<Cell title="使用 children" onClick={useChildrenFun} />
			<Toast visible={visible25} duration={0} onClose={() => setVisible25(false)}>
				<div className="flex flex-col space-y-4">
					<div>自定义提示内容</div>
					<Loading inverse />
					<div>{time} 秒后关闭</div>
				</div>
			</Toast>

			<Cell title="不同圆角风格" onClick={() => setVisible23(true)} />
			<Toast visible={visible23} radius="2xl" message="加大了圆角" onClose={() => setVisible23(false)} />

			<div className="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
				<div className="flex-1">
					<Button fill="lineState" onClick={() => setVisible5(false)}>
						手动关闭
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ToastZh;
