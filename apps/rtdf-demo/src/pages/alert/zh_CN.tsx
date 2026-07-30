import { useMemo, useState } from 'react';
import { Alert, Button, Cell, Slider, Switch, Tab } from 'rtdf/components';
import type { LargeAreaRadius } from 'rtdf/types';

const transitionTypes = ['fly', 'scale', 'fade', 'blur'] as const;
const transitionLabels = transitionTypes.map((item) => ({ text: item }));
const easeTypes = ['cubicOut', 'bounceOut', 'elasticOut', 'backOut'] as const;
const easeLabels = easeTypes.map((item) => ({ text: item.replace('Out', '') }));
const radiusValues: LargeAreaRadius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];

function AlertZh() {
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
			<Cell title="基础用法" onClick={() => setVisible1(true)} />
			<Alert visible={visible1} message="这是一条提示信息" onClose={() => setVisible1(false)} />

			<Cell title="带标题" onClick={() => setVisible2(true)} />
			<Alert visible={visible2} title="提示标题" message="这是一条带有标题的提示信息" onClose={() => setVisible2(false)} />

			<Cell title="成功提示" onClick={() => setVisible3(true)} />
			<Alert visible={visible3} type="success" title="成功" message="操作已成功完成！" onClose={() => setVisible3(false)} />

			<Cell title="失败提示" onClick={() => setVisible4(true)} />
			<Alert visible={visible4} type="error" title="错误" message="操作失败，请重试！" onClose={() => setVisible4(false)} />

			<Cell title="警告提示" onClick={() => setVisible5(true)} />
			<Alert visible={visible5} type="warning" title="警告" message="请注意，此操作不可撤销！" onClose={() => setVisible5(false)} />

			<Cell title="信息提示" onClick={() => setVisible6(true)} />
			<Alert visible={visible6} type="info" title="提示" message="这是一条普通的信息提示。" onClose={() => setVisible6(false)} />

			<Cell title="底部位置" onClick={() => setVisible7(true)} />
			<Alert visible={visible7} position="bottom" type="success" message="从底部滑入的提示" onClose={() => setVisible7(false)} />

			<Cell title="增加距离" onClick={() => setVisible8(true)} />
			<Alert visible={visible8} py="60" type="info" message="距离顶部更远一些" onClose={() => setVisible8(false)} />

			<Cell title="不显示关闭按钮" onClick={() => setVisible9(true)} />
			<Alert visible={visible9} closable={false} type="warning" message="此提示没有关闭按钮" onClose={() => setVisible9(false)} />

			<Cell title="不显示类型图标" onClick={() => setVisible10(true)} />
			<Alert visible={visible10} type="success" showIcon={false} message="成功但不显示图标" onClose={() => setVisible10(false)} />

			<Cell title="自定义图标" onClick={() => setVisible11(true)} />
			<Alert
				visible={visible11}
				icon={{ name: 'ri-rocket-2-line', state: 'success' }}
				message="使用自定义图标"
				onClose={() => setVisible11(false)}
			/>

			<Cell title="固定显示 6 秒" onClick={() => setVisible12(true)} />
			<Alert visible={visible12} duration={6000} type="info" message="6 秒后自动关闭" onClose={() => setVisible12(false)} />

			<Cell title="不自动关闭" onClick={() => setVisible13(true)} />
			<Alert
				visible={visible13}
				duration={0}
				type="warning"
				title="注意"
				message="此提示不会自动关闭，请手动关闭"
				onClose={() => setVisible13(false)}
			/>

			<Cell title="自定义 Card 样式" onClick={() => setVisible14(true)} />
			<Alert
				visible={visible14}
				card={{ shadow: '2xl', radius: '2xl', border: 'solid' }}
				type="success"
				title="自定义卡片"
				message="更大的阴影和圆角"
				onClose={() => setVisible14(false)}
			/>

			<Cell title="使用 children" onClick={() => setVisible15(true)} />
			<Alert visible={visible15} duration={0} onClose={() => setVisible15(false)}>
				<div className="flex flex-col gap-2">
					<div className="font-medium">自定义内容</div>
					<div className="text-sm text-black/70 dark:text-white/70">这是完全自定义的提示内容，可以包含任意元素。</div>
					<div className="mt-2 flex gap-2">
						<Button size="sm" onClick={() => setVisible15(false)}>
							取消
						</Button>
						<Button size="sm" fill="base" onClick={() => setVisible15(false)}>
							确定
						</Button>
					</div>
				</div>
			</Alert>

			<div className="px-2 py-4">
				<div className="mb-2 text-sm text-black/50 dark:text-white/50">动画类型（ transitionType: {transitionType} ）</div>
				<Tab labels={transitionLabels} active={transitionTypeIndex} onClickTab={(value) => setTransitionTypeIndex(value)} />
			</div>

			<div className="px-2 py-4">
				<div className="mb-2 text-sm text-black/50 dark:text-white/50">缓动函数（ easeType: {easeType} ）</div>
				<Tab labels={easeLabels} active={easeTypeIndex} onClickTab={(value) => setEaseTypeIndex(value)} />
			</div>

			<div className="px-2 py-4">
				<div className="mb-2 text-sm text-black/50 dark:text-white/50">进入动画时长： {inDuration} ms</div>
				<Slider value={inDuration} minRange={0} maxRange={1000} step={50} onChange={(value: number) => setInDuration(value)} />
			</div>

			<div className="px-2 py-4">
				<div className="mb-2 text-sm text-black/50 dark:text-white/50">退出动画时长： {outDuration} ms</div>
				<Slider value={outDuration} minRange={0} maxRange={1000} step={50} onChange={(value: number) => setOutDuration(value)} />
			</div>

			{transitionType === 'fly' ? (
				<div className="px-2 py-4">
					<div className="mb-2 text-sm text-black/50 dark:text-white/50">fly 动画 Y 偏移： {flyY} px</div>
					<Slider value={flyY} minRange={-200} maxRange={200} step={10} onChange={(value: number) => setFlyY(value)} />
				</div>
			) : null}
			{transitionType === 'scale' ? (
				<div className="px-2 py-4">
					<div className="mb-2 text-sm text-black/50 dark:text-white/50">scale 动画 start 参数： {scaleStart}</div>
					<Slider value={scaleStart} minRange={0} maxRange={1} step={0.1} onChange={(value: number) => setScaleStart(value)} />
				</div>
			) : null}
			{transitionType === 'blur' ? (
				<div className="px-2 py-4">
					<div className="mb-2 text-sm text-black/50 dark:text-white/50">blur 动画模糊程度： {blurAmount} px</div>
					<Slider value={blurAmount} minRange={0} maxRange={20} step={1} onChange={(value: number) => setBlurAmount(value)} />
				</div>
			) : null}

			<Cell title="自定义动画效果" onClick={() => setVisible16(true)} />
			<Alert
				visible={visible16}
				transitionType={transitionType}
				transitionParams={transitionParams}
				outDuration={outDuration}
				easeType={easeType}
				easeOutType={easeType}
				type="success"
				message="调整上方控件查看不同动画效果"
				onClose={() => setVisible16(false)}
			/>

			<div className="px-2 py-4">
				<div className="mb-2 text-sm text-black/50 dark:text-white/50">调整圆角（ Card radius: {radius} ）</div>
				<Slider value={radiusIndex} minRange={0} maxRange={7} step={1} showSteps onChange={(value: number) => setRadiusIndex(value)} />
			</div>

			<Cell title="不同圆角风格" onClick={() => setVisible17(true)} />
			<Alert visible={visible17} card={{ radius }} type="info" message="调整上方滑块查看不同圆角" onClose={() => setVisible17(false)} />

			<div className="px-2 py-4">
				<div className="flex items-center justify-between">
					<div className="text-sm text-black/50 dark:text-white/50">反转色（ inverse: {String(inverse)} ）</div>
					<Switch active={inverse} onClick={() => setInverse((prev) => !prev)} />
				</div>
			</div>

			<Cell title="反转色效果" onClick={() => setVisible18(true)} />
			<Alert
				visible={visible18}
				inverse={inverse}
				type="success"
				title="提示"
				message="默认开启反转色，让弹窗更醒目"
				onClose={() => setVisible18(false)}
			/>

			<Cell title="不反转色效果" onClick={() => setVisible19(true)} />
			<Alert
				visible={visible19}
				inverse={false}
				type="info"
				title="提示"
				message="关闭反转色，使用正常背景色"
				onClose={() => setVisible19(false)}
			/>

			<div className="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
				<div className="flex-1">
					<Button fill="lineState" onClick={() => setVisible13(false)}>
						手动关闭
					</Button>
				</div>
			</div>
		</div>
	);
}

export default AlertZh;
