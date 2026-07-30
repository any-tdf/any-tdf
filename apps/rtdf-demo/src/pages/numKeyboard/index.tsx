import { useMemo, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Cell, NumKeyboard, Toast, Slider } from 'rtdf/components';
import type { SmallAreaRadius } from 'rtdf/types';
import { Confetti } from '@any-tdf/react-confetti';

const radiusValues: Exclude<SmallAreaRadius, ''>[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'];

const createKeyboardHandler = (setValue: Dispatch<SetStateAction<string>>) => (key: string) => {
	if (key === 'delete') {
		setValue((prev) => prev.slice(0, -1));
		return;
	}
	if (key === 'close' || key === 'done') return;
	setValue((prev) => prev + key);
};

function NumKeyboardZh() {
	const [radiusIndex, setRadiusIndex] = useState(2);
	const currentRadius = radiusValues[radiusIndex];

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
	const [visible20, setVisible20] = useState(false);
	const [visible21, setVisible21] = useState(false);
	const [visible22, setVisible22] = useState(false);

	const [visibleToast, setVisibleToast] = useState(false);
	const [lastKey, setLastKey] = useState('');

	const [value21, setValue21] = useState('');
	const [valueClear, setValueClear] = useState('');
	const [value, setValue] = useState('');
	const [top, setTop] = useState(0);

	const loveRef = useRef<HTMLDivElement | null>(null);

	const handleValue21 = useMemo(() => createKeyboardHandler(setValue21), []);
	const handleValueClear = useMemo(() => createKeyboardHandler(setValueClear), []);
	const handleValue = useMemo(() => createKeyboardHandler(setValue), []);

	const clickFunc = (key: string) => {
		setLastKey(key);
		setVisibleToast(true);
	};

	const openFunc = (height: number) => {
		const bottom = window.innerHeight - (loveRef.current?.getBoundingClientRect().bottom || 0);
		setTop(bottom < height ? -(height - bottom) - 50 : 0);
	};

	return (
		<div className="py-4">
			<Cell title="基础用法" onClick={() => setVisible1(true)} />
			<NumKeyboard visible={visible1} onClose={() => setVisible1(false)} />

			<div className="px-4">输入了： {value21}</div>
			<Cell title="获取内容" onClick={() => setVisible21(true)} />
			<NumKeyboard visible={visible21} value={value21} onClick={handleValue21} onClose={() => setVisible21(false)} />

			<div className="px-4">输入了： {valueClear}</div>
			<Cell title="打开时清空内容" onClick={() => setVisible20(true)} />
			<NumKeyboard
				visible={visible20}
				value={valueClear}
				clear
				onOpen={() => setValueClear('')}
				onClick={handleValueClear}
				onClose={() => setVisible20(false)}
			/>

			<Cell title="不显示完成" onClick={() => setVisible2(true)} />
			<NumKeyboard visible={visible2} done={false} onClose={() => setVisible2(false)} />

			<Cell title="显示关闭" onClick={() => setVisible3(true)} />
			<NumKeyboard visible={visible3} close onClose={() => setVisible3(false)} />

			<Cell title="显示关闭不显示完成" subTitle="必须隐藏小数点" onClick={() => setVisible9(true)} />
			<NumKeyboard visible={visible9} close dot={false} done={false} onClose={() => setVisible9(false)} />

			<Cell title="数字上下反向" onClick={() => setVisible4(true)} />
			<NumKeyboard visible={visible4} reverse onClose={() => setVisible4(false)} />

			<Cell title="增高按键高度" onClick={() => setVisible5(true)} />
			<NumKeyboard visible={visible5} height="16" onClose={() => setVisible5(false)} />

			<Cell title="增大间距" onClick={() => setVisible6(true)} />
			<NumKeyboard visible={visible6} space="4" p="4" onClose={() => setVisible6(false)} />

			<Cell title="不显示小数点" onClick={() => setVisible7(true)} />
			<NumKeyboard visible={visible7} close dot={false} onClose={() => setVisible7(false)} />

			<Cell title="不必要的全部不显示" onClick={() => setVisible8(true)} />
			<NumKeyboard visible={visible8} done={false} dot={false} onClose={() => setVisible8(false)} />

			<Cell title="块式" onClick={() => setVisible10(true)} />
			<NumKeyboard visible={visible10} type="block" height="14" p="0" onClose={() => setVisible10(false)} />

			<Cell title="自定义完成文字" onClick={() => setVisible18(true)} />
			<NumKeyboard visible={visible18} doneText="转账" onClose={() => setVisible18(false)} />

			<Cell title="监听点击事件" onClick={() => setVisible11(true)} />
			<NumKeyboard
				visible={visible11}
				onClick={(key) => {
					clickFunc(key);
				}}
				onClose={() => setVisible11(false)}
			/>
			<Toast visible={visibleToast} duration={500} message={`点击了 ${lastKey}`} onClose={() => setVisibleToast(false)} />

			<div
				ref={loveRef}
				className="bg-primary dark:bg-dark shadow-primary/30 dark:shadow-dark/30 relative mx-16 h-10 rounded-full text-center text-xl leading-10 text-white shadow-lg transition-all dark:text-black"
				style={{ top }}
			>
				{value}
				{value === '5201314' ? (
					<span className="absolute left-1/2">
						<Confetti rounded amount={100} />
					</span>
				) : null}
			</div>
			<Cell title="请输入 5201314" onClick={() => setVisible12(true)} />
			<NumKeyboard
				visible={visible12}
				value={value}
				doneDisabled={value !== '5201314'}
				onOpen={openFunc}
				onClick={handleValue}
				onClose={() => {
					setVisible12(false);
					setTop(0);
				}}
			/>

			<Cell title="增大按键圆角" onClick={() => setVisible13(true)} />
			<NumKeyboard visible={visible13} radius="2xl" onClose={() => setVisible13(false)} />

			<Cell title="完成按键注入 Class" onClick={() => setVisible14(true)} />
			<NumKeyboard
				visible={visible14}
				doneClass="!bg-linear-to-r from-primary to-info dark:from-dark dark:to-info"
				onClose={() => setVisible14(false)}
			/>

			<Cell title="面板与按键注入 Class" onClick={() => setVisible15(true)} />
			<NumKeyboard
				visible={visible15}
				panelClass="bg-linear-to-r from-primary to-info dark:from-dark dark:to-info"
				keyClass="!bg-transparent border border-white/40 !text-white"
				onClose={() => setVisible15(false)}
			/>

			<Cell title="自定义过渡动画" subTitle="通过 popup" onClick={() => setVisible16(true)} />
			<NumKeyboard visible={visible16} popup={{ duration: 1000, easeType: 'bounceOut' }} onClose={() => setVisible16(false)} />

			<Cell title="激活时背景不透明" subTitle="通过 popup 内的 mask" onClick={() => setVisible17(true)} />
			<NumKeyboard visible={visible17} popup={{ mask: { opacity: '0.4' } }} onClose={() => setVisible17(false)} />

			<Cell title="自定义按键字体" subTitle="需要 CSS 加载字体并在 @theme 中配置" onClick={() => setVisible19(true)} />
			<NumKeyboard visible={visible19} keyClass="font-Trueno" onClose={() => setVisible19(false)} />

			<Cell title="输入预览" subTitle="在键盘顶部显示输入内容" onClick={() => setVisible22(true)} />
			<NumKeyboard visible={visible22} preview onClose={() => setVisible22(false)} />

			<div className="px-4 py-2">不使用弹出层</div>
			<div className="px-4 pb-2">
				<Slider
					value={radiusIndex}
					maxRange={9}
					step={1}
					showSteps
					stepsStyle="break"
					stepLabels={radiusValues}
					onChange={setRadiusIndex}
				/>
			</div>
			<NumKeyboard popup={null} radius={currentRadius} />
		</div>
	);
}

export default NumKeyboardZh;
