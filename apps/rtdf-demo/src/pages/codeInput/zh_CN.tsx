import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { CodeInput, FullKeyboard, NumKeyboard, Slider, Toast } from 'rtdf/components';
import type { SmallAreaRadius } from 'rtdf/types';

const radiusValues: SmallAreaRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];

const createKeyboardHandler = (setValue: Dispatch<SetStateAction<string>>) => (key: string) => {
	if (key === 'delete') {
		setValue((prev) => prev.slice(0, -1));
		return;
	}
	if (key === 'close' || key === 'done') return;
	setValue((prev) => prev + key);
};

function CodeInputZh() {
	const [radiusIndex, setRadiusIndex] = useState(7);
	const currentRadius = radiusValues[radiusIndex];

	const [value1, setValue1] = useState('');
	const [showNumKeyboard1, setShowNumKeyboard1] = useState(false);
	const [finishValue1, setFinishValue1] = useState('');

	const [value2, setValue2] = useState('');
	const [showNumKeyboard2, setShowNumKeyboard2] = useState(false);

	const [value3, setValue3] = useState('');
	const [showNumKeyboard3, setShowNumKeyboard3] = useState(false);

	const [value3b, setValue3b] = useState('');
	const [showNumKeyboard3b, setShowNumKeyboard3b] = useState(false);

	const [value4, setValue4] = useState('');
	const [showFullKeyboard4, setShowFullKeyboard4] = useState(false);

	const [value5, setValue5] = useState('');
	const [showNumKeyboard5, setShowNumKeyboard5] = useState(false);

	const [value6, setValue6] = useState('');
	const [showNumKeyboard6, setShowNumKeyboard6] = useState(false);
	const [errorInfo6, setErrorInfo6] = useState('');

	const [value7, setValue7] = useState('');
	const [focused7, setFocused7] = useState(false);

	const [value7b, setValue7b] = useState('');
	const [focused7b, setFocused7b] = useState(false);

	const [value7c, setValue7c] = useState('');
	const [focused7c, setFocused7c] = useState(false);

	const [value8, setValue8] = useState('');
	const [showNumKeyboard8, setShowNumKeyboard8] = useState(false);

	const [value9, setValue9] = useState('');
	const [showFullKeyboard9, setShowFullKeyboard9] = useState(false);

	const [value10, setValue10] = useState('');
	const [showFullKeyboard10, setShowFullKeyboard10] = useState(false);

	const [value11, setValue11] = useState('');
	const [showNumKeyboard11, setShowNumKeyboard11] = useState(false);

	const [value12, setValue12] = useState('');
	const [showNumKeyboard12, setShowNumKeyboard12] = useState(false);

	const [value13, setValue13] = useState('');
	const [showNumKeyboard13, setShowNumKeyboard13] = useState(false);

	const [value14, setValue14] = useState('');
	const [showNumKeyboard14, setShowNumKeyboard14] = useState(false);

	const [value15, setValue15] = useState('');
	const [showNumKeyboard15, setShowNumKeyboard15] = useState(false);

	const [value16, setValue16] = useState('');
	const [showNumKeyboard16, setShowNumKeyboard16] = useState(false);

	const [value17, setValue17] = useState('');
	const [showNumKeyboard17, setShowNumKeyboard17] = useState(false);

	const [value17b, setValue17b] = useState('');
	const [showNumKeyboard17b, setShowNumKeyboard17b] = useState(false);

	const [value18, setValue18] = useState('');
	const [showNumKeyboard18, setShowNumKeyboard18] = useState(false);
	const [showToast18, setShowToast18] = useState(false);

	const handleFinish1 = (val: string) => {
		setFinishValue1(val);
	};

	const handleFinish6 = (val: string) => {
		if (val !== '123456') {
			setErrorInfo6('验证码错误，请重新输入');
		} else {
			setErrorInfo6('');
		}
	};

	const handleNumKeyboard1 = useMemo(() => createKeyboardHandler(setValue1), []);
	const handleNumKeyboard2 = useMemo(() => createKeyboardHandler(setValue2), []);
	const handleNumKeyboard3 = useMemo(() => createKeyboardHandler(setValue3), []);
	const handleNumKeyboard3b = useMemo(() => createKeyboardHandler(setValue3b), []);
	const handleFullKeyboard4 = useMemo(() => createKeyboardHandler(setValue4), []);
	const handleNumKeyboard5 = useMemo(() => createKeyboardHandler(setValue5), []);
	const handleNumKeyboard6 = useMemo(() => createKeyboardHandler(setValue6), []);
	const handleNumKeyboard8 = useMemo(() => createKeyboardHandler(setValue8), []);
	const handleFullKeyboard9 = useMemo(() => createKeyboardHandler(setValue9), []);
	const handleFullKeyboard10 = useMemo(() => createKeyboardHandler(setValue10), []);
	const handleNumKeyboard11 = useMemo(() => createKeyboardHandler(setValue11), []);
	const handleNumKeyboard12 = useMemo(() => createKeyboardHandler(setValue12), []);
	const handleNumKeyboard13 = useMemo(() => createKeyboardHandler(setValue13), []);
	const handleNumKeyboard14 = useMemo(() => createKeyboardHandler(setValue14), []);
	const handleNumKeyboard15 = useMemo(() => createKeyboardHandler(setValue15), []);
	const handleNumKeyboard16 = useMemo(() => createKeyboardHandler(setValue16), []);
	const handleNumKeyboard17 = useMemo(() => createKeyboardHandler(setValue17), []);
	const handleNumKeyboard17b = useMemo(() => createKeyboardHandler(setValue17b), []);
	const handleNumKeyboard18 = useMemo(() => createKeyboardHandler(setValue18), []);

	return (
		<div className="space-y-6 p-4">
			<p className="text-sm text-gray-500">基础用法</p>
			<div className="flex justify-center">
				<CodeInput
					value={value1}
					focused={showNumKeyboard1}
					keyboardVisible={showNumKeyboard1}
					onFocus={() => setShowNumKeyboard1(true)}
					onFinish={handleFinish1}
				/>
			</div>
			{finishValue1 ? <p className="text-center text-xs text-primary dark:text-dark">输入完成：{finishValue1}</p> : null}
			<NumKeyboard
				value={value1}
				visible={showNumKeyboard1}
				onClick={handleNumKeyboard1}
				onClose={() => setShowNumKeyboard1(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">自定义长度</p>
			<div className="flex justify-center">
				<CodeInput
					value={value2}
					focused={showNumKeyboard2}
					keyboardVisible={showNumKeyboard2}
					length={4}
					onFocus={() => setShowNumKeyboard2(true)}
				/>
			</div>
			<NumKeyboard
				value={value2}
				visible={showNumKeyboard2}
				onClick={handleNumKeyboard2}
				onClose={() => setShowNumKeyboard2(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">掩码显示</p>
			<div className="flex justify-center">
				<CodeInput
					value={value3}
					focused={showNumKeyboard3}
					keyboardVisible={showNumKeyboard3}
					mask
					onFocus={() => setShowNumKeyboard3(true)}
				/>
			</div>
			<NumKeyboard
				value={value3}
				visible={showNumKeyboard3}
				onClick={handleNumKeyboard3}
				onClose={() => setShowNumKeyboard3(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">自定义掩码</p>
			<div className="flex justify-center">
				<CodeInput
					value={value3b}
					focused={showNumKeyboard3b}
					keyboardVisible={showNumKeyboard3b}
					mask="*"
					onFocus={() => setShowNumKeyboard3b(true)}
				/>
			</div>
			<NumKeyboard
				value={value3b}
				visible={showNumKeyboard3b}
				onClick={handleNumKeyboard3b}
				onClose={() => setShowNumKeyboard3b(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">字母输入</p>
			<div className="flex justify-center">
				<CodeInput
					value={value4}
					focused={showFullKeyboard4}
					keyboardVisible={showFullKeyboard4}
					type="text"
					mask={false}
					onFocus={() => setShowFullKeyboard4(true)}
				/>
			</div>
			<FullKeyboard value={value4} visible={showFullKeyboard4} onClick={handleFullKeyboard4} onClose={() => setShowFullKeyboard4(false)} />

			<p className="text-sm text-gray-500">无间距</p>
			<div className="flex justify-center">
				<CodeInput
					value={value5}
					focused={showNumKeyboard5}
					keyboardVisible={showNumKeyboard5}
					gutter="0"
					onFocus={() => setShowNumKeyboard5(true)}
				/>
			</div>
			<NumKeyboard
				value={value5}
				visible={showNumKeyboard5}
				onClick={handleNumKeyboard5}
				onClose={() => setShowNumKeyboard5(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">提示信息</p>
			<div className="flex justify-center">
				<CodeInput
					value={value6}
					focused={showNumKeyboard6}
					keyboardVisible={showNumKeyboard6}
					info="请输入 6 位验证码"
					errorInfo={errorInfo6}
					onFocus={() => setShowNumKeyboard6(true)}
					onFinish={handleFinish6}
				/>
			</div>
			<NumKeyboard
				value={value6}
				visible={showNumKeyboard6}
				onClick={handleNumKeyboard6}
				onClose={() => setShowNumKeyboard6(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">原生键盘（ numeric ）</p>
			<div className="flex justify-center">
				<CodeInput value={value7} focused={focused7} native mask={false} onChange={setValue7} onFocusedChange={setFocused7} />
			</div>

			<p className="text-sm text-gray-500">原生键盘（ tel ）</p>
			<div className="flex justify-center">
				<CodeInput
					value={value7b}
					focused={focused7b}
					native
					inputMode="tel"
					mask={false}
					onChange={setValue7b}
					onFocusedChange={setFocused7b}
				/>
			</div>

			<p className="text-sm text-gray-500">原生键盘（ decimal ）</p>
			<div className="flex justify-center">
				<CodeInput
					value={value7c}
					focused={focused7c}
					native
					inputMode="decimal"
					mask={false}
					onChange={setValue7c}
					onFocusedChange={setFocused7c}
				/>
			</div>

			<p className="text-sm text-gray-500">数字键盘预览</p>
			<div className="flex justify-center">
				<CodeInput
					value={value8}
					focused={showNumKeyboard8}
					keyboardVisible={showNumKeyboard8}
					mask={false}
					onFocus={() => setShowNumKeyboard8(true)}
				/>
			</div>
			<NumKeyboard
				value={value8}
				visible={showNumKeyboard8}
				onClick={handleNumKeyboard8}
				onClose={() => setShowNumKeyboard8(false)}
				done
				dot={false}
				preview
			/>

			<p className="text-sm text-gray-500">全键盘预览</p>
			<div className="flex justify-center">
				<CodeInput
					value={value9}
					focused={showFullKeyboard9}
					keyboardVisible={showFullKeyboard9}
					type="text"
					mask={false}
					onFocus={() => setShowFullKeyboard9(true)}
				/>
			</div>
			<FullKeyboard
				value={value9}
				visible={showFullKeyboard9}
				preview
				onClick={handleFullKeyboard9}
				onClose={() => setShowFullKeyboard9(false)}
			/>

			<p className="text-sm text-gray-500">自定义字体</p>
			<div className="flex justify-center">
				<CodeInput
					value={value10}
					focused={showFullKeyboard10}
					keyboardVisible={showFullKeyboard10}
					type="text"
					mask={false}
					onFocus={() => setShowFullKeyboard10(true)}
				/>
			</div>
			<FullKeyboard
				value={value10}
				visible={showFullKeyboard10}
				keyClass="font-Trueno"
				onClick={handleFullKeyboard10}
				onClose={() => setShowFullKeyboard10(false)}
			/>

			<p className="text-sm text-gray-500">线模式</p>
			<div className="flex justify-center">
				<CodeInput
					value={value11}
					focused={showNumKeyboard11}
					keyboardVisible={showNumKeyboard11}
					cellStyle="line"
					mask={false}
					onFocus={() => setShowNumKeyboard11(true)}
				/>
			</div>
			<NumKeyboard
				value={value11}
				visible={showNumKeyboard11}
				onClick={handleNumKeyboard11}
				onClose={() => setShowNumKeyboard11(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">下划线光标</p>
			<div className="flex justify-center">
				<CodeInput
					value={value12}
					focused={showNumKeyboard12}
					keyboardVisible={showNumKeyboard12}
					cursorStyle="underline"
					mask={false}
					onFocus={() => setShowNumKeyboard12(true)}
				/>
			</div>
			<NumKeyboard
				value={value12}
				visible={showNumKeyboard12}
				onClick={handleNumKeyboard12}
				onClose={() => setShowNumKeyboard12(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">呼吸动画</p>
			<div className="flex justify-center">
				<CodeInput
					value={value13}
					focused={showNumKeyboard13}
					keyboardVisible={showNumKeyboard13}
					cursorAnimation="pulse"
					mask={false}
					onFocus={() => setShowNumKeyboard13(true)}
				/>
			</div>
			<NumKeyboard
				value={value13}
				visible={showNumKeyboard13}
				onClick={handleNumKeyboard13}
				onClose={() => setShowNumKeyboard13(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">自定义圆角</p>
			<div className="flex justify-center">
				<CodeInput
					value={value14}
					focused={showNumKeyboard14}
					keyboardVisible={showNumKeyboard14}
					radius={currentRadius}
					mask={false}
					onFocus={() => setShowNumKeyboard14(true)}
				/>
			</div>
			<div className="px-4">
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
			<NumKeyboard
				value={value14}
				visible={showNumKeyboard14}
				onClick={handleNumKeyboard14}
				onClose={() => setShowNumKeyboard14(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">主题背景</p>
			<div className="flex justify-center">
				<CodeInput
					value={value15}
					focused={showNumKeyboard15}
					keyboardVisible={showNumKeyboard15}
					cellBg="theme"
					mask={false}
					onFocus={() => setShowNumKeyboard15(true)}
				/>
			</div>
			<NumKeyboard
				value={value15}
				visible={showNumKeyboard15}
				onClick={handleNumKeyboard15}
				onClose={() => setShowNumKeyboard15(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">虚线边框</p>
			<div className="flex justify-center">
				<CodeInput
					value={value16}
					focused={showNumKeyboard16}
					keyboardVisible={showNumKeyboard16}
					cellBorder="dashed"
					mask={false}
					onFocus={() => setShowNumKeyboard16(true)}
				/>
			</div>
			<NumKeyboard
				value={value16}
				visible={showNumKeyboard16}
				onClick={handleNumKeyboard16}
				onClose={() => setShowNumKeyboard16(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">无边框 + surface 背景</p>
			<div className="flex justify-center">
				<CodeInput
					value={value17}
					focused={showNumKeyboard17}
					keyboardVisible={showNumKeyboard17}
					cellBg="surface"
					cellBorder="none"
					onFocus={() => setShowNumKeyboard17(true)}
				/>
			</div>
			<NumKeyboard
				value={value17}
				visible={showNumKeyboard17}
				onClick={handleNumKeyboard17}
				onClose={() => setShowNumKeyboard17(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">加大加粗</p>
			<div className="flex justify-center">
				<CodeInput
					value={value17b}
					focused={showNumKeyboard17b}
					keyboardVisible={showNumKeyboard17b}
					bold
					onFocus={() => setShowNumKeyboard17b(true)}
				/>
			</div>
			<NumKeyboard
				value={value17b}
				visible={showNumKeyboard17b}
				onClick={handleNumKeyboard17b}
				onClose={() => setShowNumKeyboard17b(false)}
				done
				dot={false}
			/>

			<p className="text-sm text-gray-500">自动关闭</p>
			<div className="flex justify-center">
				<CodeInput
					value={value18}
					focused={showNumKeyboard18}
					keyboardVisible={showNumKeyboard18}
					autoClose
					onFocus={() => setShowNumKeyboard18(true)}
					onClose={() => {
						setShowNumKeyboard18(false);
						setShowToast18(true);
					}}
				/>
			</div>
			<NumKeyboard
				value={value18}
				visible={showNumKeyboard18}
				onClick={handleNumKeyboard18}
				onClose={() => setShowNumKeyboard18(false)}
				dot={false}
			/>
			<Toast visible={showToast18} message="输入完成，键盘已关闭" onClose={() => setShowToast18(false)} />

			<div className="h-96" />
		</div>
	);
}

export default CodeInputZh;
