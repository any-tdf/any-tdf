import { useMemo, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Cell, FullKeyboard, Slider, Toast } from 'rtdf/components';
import type { SmallAreaRadius } from 'rtdf/types';
import { Confetti } from '@any-tdf/react-confetti';

const radiusValues: SmallAreaRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];

const createKeyboardHandler = (setValue: Dispatch<SetStateAction<string>>) => (key: string) => {
	if (key === 'delete') {
		setValue((prev) => prev.slice(0, -1));
		return;
	}
	if (key === 'done') return;
	setValue((prev) => prev + key);
};

function FullKeyboardZh() {
	const [radiusIndex, setRadiusIndex] = useState(2);
	const currentRadius = radiusValues[radiusIndex];

	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);
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
	const [visible20, setVisible20] = useState(false);

	const [value1, setValue1] = useState('');
	const [value9, setValue9] = useState('');

	const [visibleToast, setVisibleToast] = useState(false);
	const [lastKey, setLastKey] = useState('');

	const helloRef = useRef<HTMLDivElement | null>(null);
	const [top, setTop] = useState(0);

	const handleValue1 = useMemo(() => createKeyboardHandler(setValue1), []);
	const handleValue9 = useMemo(() => createKeyboardHandler(setValue9), []);

	const clickFunc = (key: string) => {
		setLastKey(key);
		setVisibleToast(true);
	};

	const openFunc = (height: number) => {
		const bottom = window.innerHeight - (helloRef.current?.getBoundingClientRect().bottom || 0);
		setTop(bottom < height ? -(height - bottom) - 50 : 0);
	};

	return (
		<>
			<Cell title="基础用法" subTitle="默认 full 模式" onClick={() => setVisible1(true)} />
			<FullKeyboard visible={visible1} onClose={() => setVisible1(false)} />

			<Cell title="纯字母模式" subTitle="mode='letter'" onClick={() => setVisible12(true)} />
			<FullKeyboard visible={visible12} mode="letter" onClose={() => setVisible12(false)} />

			<Cell title="字母加数字模式" subTitle="mode='letterNumber'" onClick={() => setVisible13(true)} />
			<FullKeyboard visible={visible13} mode="letterNumber" onClose={() => setVisible13(false)} />

			<Cell title="完整模式" subTitle="mode='full'" onClick={() => setVisible14(true)} />
			<FullKeyboard visible={visible14} mode="full" onClose={() => setVisible14(false)} />

			<Cell title="块式样式" subTitle="type='block'" onClick={() => setVisible19(true)} />
			<FullKeyboard visible={visible19} type="block" onClose={() => setVisible19(false)} />

			<Cell title="块式样式 + 字母数字模式" subTitle="type='block' + mode='letterNumber'" onClick={() => setVisible20(true)} />
			<FullKeyboard visible={visible20} type="block" mode="letterNumber" onClose={() => setVisible20(false)} />

			<div className="px-4">输入了: {value1}</div>
			<Cell title="获取内容" onClick={() => setVisible2(true)} />
			<FullKeyboard visible={visible2} value={value1} onClick={handleValue1} onClose={() => setVisible2(false)} />

			<Cell title="不显示完成" onClick={() => setVisible3(true)} />
			<FullKeyboard visible={visible3} done={false} onClose={() => setVisible3(false)} />

			<Cell title="自定义完成文字" onClick={() => setVisible6(true)} />
			<FullKeyboard visible={visible6} doneText="发送" onClose={() => setVisible6(false)} />

			<Cell title="输入预览" onClick={() => setVisible7(true)} />
			<FullKeyboard visible={visible7} preview onClose={() => setVisible7(false)} />

			<Cell title="输入预览掩码显示" onClick={() => setVisible8(true)} />
			<FullKeyboard visible={visible8} preview previewMask onClose={() => setVisible8(false)} />

			<div
				ref={helloRef}
				className="relative mx-16 h-10 rounded-full bg-primary text-center text-xl leading-10 text-white shadow-lg shadow-primary/30 transition-all dark:bg-dark dark:text-black dark:shadow-dark/30"
				style={{ top }}
			>
				{value9}
				{value9.toLowerCase() === 'hello' ? (
					<span className="absolute left-1/2">
						<Confetti rounded amount={100} />
					</span>
				) : null}
			</div>
			<Cell title="请输入 hello" onClick={() => setVisible9(true)} />
			<FullKeyboard
				visible={visible9}
				value={value9}
				doneDisabled={value9.toLowerCase() !== 'hello'}
				onOpen={openFunc}
				onClick={handleValue9}
				onClose={() => {
					setVisible9(false);
					setTop(0);
				}}
			/>

			<Cell title="增大按键圆角" onClick={() => setVisible10(true)} />
			<FullKeyboard visible={visible10} radius="2xl" onClose={() => setVisible10(false)} />

			<Cell title="自定义按键字体" subTitle="需要 CSS 加载字体并在 @theme 中配置" onClick={() => setVisible15(true)} />
			<FullKeyboard visible={visible15} keyClass="font-Trueno" onClose={() => setVisible15(false)} />

			<Cell title="自定义过渡动画" subTitle="弹性动画" onClick={() => setVisible16(true)} />
			<FullKeyboard visible={visible16} popup={{ duration: 1000, easeType: 'bounceOut' }} onClose={() => setVisible16(false)} />

			<Cell title="完成按键注入 Class" onClick={() => setVisible17(true)} />
			<FullKeyboard visible={visible17} doneClass="rtdf-demo-gradient-action" onClose={() => setVisible17(false)} />

			<Cell title="面板与按键注入 Class" onClick={() => setVisible18(true)} />
			<FullKeyboard
				visible={visible18}
				panelClass="rtdf-demo-gradient-primary"
				keyClass="!bg-transparent border border-white/40 !text-white"
				onClose={() => setVisible18(false)}
			/>

			<Cell title="监听点击事件" onClick={() => setVisible11(true)} />
			<FullKeyboard
				visible={visible11}
				onClick={(key) => {
					clickFunc(key);
				}}
				onClose={() => setVisible11(false)}
			/>
			<Toast visible={visibleToast} duration={500} message={`点击了 ${lastKey}`} onClose={() => setVisibleToast(false)} />

			<div className="px-4 py-2">不使用弹出层</div>
			<div className="px-4 pb-2">
				<Slider
					value={radiusIndex}
					maxRange={7}
					step={1}
					showSteps
					stepsStyle="break"
					stepLabels={radiusValues}
					onChange={setRadiusIndex}
				/>
			</div>
			<FullKeyboard popup={null} radius={currentRadius} />
		</>
	);
}

export default FullKeyboardZh;
