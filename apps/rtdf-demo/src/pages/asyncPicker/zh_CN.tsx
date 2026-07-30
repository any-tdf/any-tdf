import { useState } from 'react';
import { AsyncPicker, Cell } from 'rtdf/components';
import { linkageData, linkageDiffLabelData } from './data';

type LinkageDataItem = { label: string; children: { label: string; children: { label: string }[] }[] };

function AsyncPickerZh() {
	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);
	const [visible4, setVisible4] = useState(false);
	const [visible5, setVisible5] = useState(false);
	const [visible6, setVisible6] = useState(false);
	const [visible7, setVisible7] = useState(false);
	const [visible8, setVisible8] = useState(false);
	const [visible9, setVisible9] = useState(false);

	const [data, setData] = useState<LinkageDataItem[]>(linkageData);
	const [currentLevel, setCurrentLevel] = useState(0);
	const [lastLevel, setLastLevel] = useState(false);
	const [firstLevel, setFirstLevel] = useState(true);
	const [level1Data, setLevel1Data] = useState(linkageData[0].children);
	const [titleBind, setTitleBind] = useState('请选择省级');

	const [allIndexs, setAllIndexs] = useState<number[]>([]);
	const [allItems, setAllItems] = useState<{ label: string }[]>([]);

	// 模拟 2 秒后获取到数据
	const nextFunc = (index: number) => {
		if (currentLevel === 0) {
			const nextData = linkageData[index].children;
			setLevel1Data(nextData);
			setTimeout(() => {
				setData(nextData as LinkageDataItem[]);
				setCurrentLevel(1);
				setTitleBind('请选择市级');
				setFirstLevel(false);
			}, 2000);
		} else if (currentLevel === 1) {
			const nextData = level1Data[index].children;
			setTimeout(() => {
				setData(nextData as unknown as LinkageDataItem[]);
				setCurrentLevel(2);
				setTitleBind('请选择区级');
				setLastLevel(true);
			}, 2000);
		}
	};

	const prevFunc = () => {
		if (currentLevel === 1) {
			setTimeout(() => {
				setData(linkageData);
				setCurrentLevel(0);
				setTitleBind('请选择省级');
				setFirstLevel(true);
			}, 2000);
		} else if (currentLevel === 2) {
			setTimeout(() => {
				setData(level1Data as LinkageDataItem[]);
				setCurrentLevel(1);
				setTitleBind('请选择市级');
				setLastLevel(false);
			}, 2000);
		}
	};

	const getAllDataFunc = (items: Record<string, unknown>[], indexs: number[]) => {
		setAllItems(items as { label: string }[]);
		setAllIndexs(indexs);
	};

	const resetState = () => {
		setData(linkageData);
		setLastLevel(false);
		setFirstLevel(true);
		setCurrentLevel(0);
		setLevel1Data(linkageData[0].children);
	};

	const closePicker = (setter: (visible: boolean) => void) => {
		setter(false);
	};

	// 不同 labelKey 的状态
	const [diffLabelKeyData, setDiffLabelKeyData] = useState(linkageDiffLabelData);
	const [labelKey, setLabelKey] = useState('province');
	const [diffLabelKeyCurrentLevel, setDiffLabelKeyCurrentLevel] = useState(0);
	const [diffLabelKeyLastLevel, setDiffLabelKeyLastLevel] = useState(false);
	const [diffLabelKeyFirstLevel, setDiffLabelKeyFirstLevel] = useState(true);
	const [diffLabelKeyLevel1Data, setDiffLabelKeyLevel1Data] = useState(linkageDiffLabelData[0].children);

	const diffLabelKeyNextFunc = (index: number) => {
		if (diffLabelKeyCurrentLevel === 0) {
			const nextData = linkageDiffLabelData[index].children;
			setDiffLabelKeyLevel1Data(nextData);
			setTimeout(() => {
				setDiffLabelKeyData(nextData as unknown as typeof linkageDiffLabelData);
				setLabelKey('city');
				setDiffLabelKeyCurrentLevel(1);
				setDiffLabelKeyFirstLevel(false);
			}, 2000);
		} else if (diffLabelKeyCurrentLevel === 1) {
			const nextData = diffLabelKeyLevel1Data[index].children;
			setTimeout(() => {
				setDiffLabelKeyData(nextData as unknown as typeof linkageDiffLabelData);
				setDiffLabelKeyCurrentLevel(2);
				setLabelKey('region');
				setDiffLabelKeyLastLevel(true);
			}, 2000);
		}
	};

	const diffLabelKeyPrevFunc = () => {
		if (diffLabelKeyCurrentLevel === 1) {
			setTimeout(() => {
				setDiffLabelKeyData(linkageDiffLabelData);
				setDiffLabelKeyCurrentLevel(0);
				setDiffLabelKeyFirstLevel(true);
				setLabelKey('province');
			}, 2000);
		} else if (diffLabelKeyCurrentLevel === 2) {
			setTimeout(() => {
				setDiffLabelKeyData(diffLabelKeyLevel1Data as unknown as typeof linkageDiffLabelData);
				setDiffLabelKeyCurrentLevel(1);
				setLabelKey('city');
				setDiffLabelKeyLastLevel(false);
			}, 2000);
		}
	};

	const resetDiffLabelKeyState = () => {
		setDiffLabelKeyData(linkageDiffLabelData);
		setLabelKey('province');
		setDiffLabelKeyCurrentLevel(0);
		setDiffLabelKeyLastLevel(false);
		setDiffLabelKeyFirstLevel(true);
		setDiffLabelKeyLevel1Data(linkageDiffLabelData[0].children);
	};

	// 不使用弹出层的状态
	const [inlineData, setInlineData] = useState<LinkageDataItem[]>(linkageData);
	const [inlineCurrentLevel, setInlineCurrentLevel] = useState(0);
	const [inlineLastLevel, setInlineLastLevel] = useState(false);
	const [inlineFirstLevel, setInlineFirstLevel] = useState(true);
	const [inlineLevel1Data, setInlineLevel1Data] = useState(linkageData[0].children);

	const inlineNextFunc = (index: number) => {
		if (inlineCurrentLevel === 0) {
			const nextData = linkageData[index].children;
			setInlineLevel1Data(nextData);
			setInlineData([]);
			setTimeout(() => {
				setInlineData(nextData as LinkageDataItem[]);
				setInlineCurrentLevel(1);
				setInlineFirstLevel(false);
			}, 1000);
		} else if (inlineCurrentLevel === 1) {
			const nextData = inlineLevel1Data[index].children;
			setInlineData([]);
			setTimeout(() => {
				setInlineData(nextData as unknown as LinkageDataItem[]);
				setInlineCurrentLevel(2);
				setInlineLastLevel(true);
			}, 1000);
		}
	};

	const inlinePrevFunc = () => {
		if (inlineCurrentLevel === 1) {
			setInlineData([]);
			setTimeout(() => {
				setInlineData(linkageData);
				setInlineCurrentLevel(0);
				setInlineFirstLevel(true);
			}, 1000);
		} else if (inlineCurrentLevel === 2) {
			setInlineData([]);
			setTimeout(() => {
				setInlineData(inlineLevel1Data as unknown as LinkageDataItem[]);
				setInlineCurrentLevel(1);
				setInlineLastLevel(false);
			}, 1000);
		}
	};

	return (
		<div className="py-4">
			<div className="px-4">
				{allItems.length > 0 ? (
					<>
						当前选定了：
						{allItems.map((item, index) => (
							<span key={index} className="mr-2 text-primary dark:text-dark">
								{item.label}
							</span>
						))}
					</>
				) : (
					<div>请选定数据</div>
				)}
			</div>
			<div className="px-4">
				{allIndexs.length > 0 ? (
					<>
						当前选定值位于所在列的索引值分别为：
						{allIndexs.map((index, i) => (
							<span key={i} className="mr-2 text-primary dark:text-dark">
								{index}
							</span>
						))}
					</>
				) : (
					<div>请选定数据</div>
				)}
			</div>

			<Cell
				title="基础用法"
				onClick={() => {
					resetState();
					setVisible1(true);
				}}
			/>
			<AsyncPicker
				visible={visible1}
				data={data as Record<string, unknown>[]}
				lastLevel={lastLevel}
				firstLevel={firstLevel}
				onNext={nextFunc}
				onPrev={prevFunc}
				onConfirm={getAllDataFunc}
				onCancel={() => closePicker(setVisible1)}
				onClose={() => closePicker(setVisible1)}
			/>

			<Cell
				title="可见 7 行数为"
				onClick={() => {
					resetState();
					setVisible2(true);
				}}
			/>
			<AsyncPicker
				visible={visible2}
				data={data as Record<string, unknown>[]}
				lastLevel={lastLevel}
				firstLevel={firstLevel}
				onNext={nextFunc}
				onPrev={prevFunc}
				showRow={7}
				onCancel={() => closePicker(setVisible2)}
				onClose={() => closePicker(setVisible2)}
			/>

			<Cell
				title="左对齐"
				onClick={() => {
					resetState();
					setVisible3(true);
				}}
			/>
			<AsyncPicker
				visible={visible3}
				data={data as Record<string, unknown>[]}
				lastLevel={lastLevel}
				firstLevel={firstLevel}
				align="left"
				onNext={nextFunc}
				onPrev={prevFunc}
				onCancel={() => closePicker(setVisible3)}
				onClose={() => closePicker(setVisible3)}
			/>

			<Cell
				title="自定义上下一步文字"
				onClick={() => {
					resetState();
					setVisible5(true);
				}}
			/>
			<AsyncPicker
				visible={visible5}
				data={data as Record<string, unknown>[]}
				lastLevel={lastLevel}
				firstLevel={firstLevel}
				onNext={nextFunc}
				onPrev={prevFunc}
				nextText="继续"
				prevText="返回"
				onCancel={() => closePicker(setVisible5)}
				onClose={() => closePicker(setVisible5)}
			/>

			<Cell
				title="不同级别使用不同的 labelKey"
				onClick={() => {
					resetDiffLabelKeyState();
					setVisible4(true);
				}}
			/>
			<AsyncPicker
				visible={visible4}
				data={diffLabelKeyData as Record<string, unknown>[]}
				lastLevel={diffLabelKeyLastLevel}
				firstLevel={diffLabelKeyFirstLevel}
				labelKey={labelKey}
				onNext={diffLabelKeyNextFunc}
				onPrev={diffLabelKeyPrevFunc}
				onCancel={() => closePicker(setVisible4)}
				onClose={() => closePicker(setVisible4)}
			/>

			<Cell
				title="换一个 Loading 效果"
				onClick={() => {
					resetState();
					setVisible6(true);
				}}
			/>
			<AsyncPicker
				visible={visible6}
				data={data as Record<string, unknown>[]}
				lastLevel={lastLevel}
				firstLevel={firstLevel}
				onNext={nextFunc}
				onPrev={prevFunc}
				loading={{ type: '1_15', width: '12', height: '12' }}
				onCancel={() => closePicker(setVisible6)}
				onClose={() => closePicker(setVisible6)}
			/>

			<Cell
				title="顶部来点圆角"
				onClick={() => {
					resetState();
					setVisible8(true);
				}}
			/>
			<AsyncPicker
				visible={visible8}
				data={data as Record<string, unknown>[]}
				lastLevel={lastLevel}
				firstLevel={firstLevel}
				onNext={nextFunc}
				onPrev={prevFunc}
				popup={{ radius: 'xl' }}
				onCancel={() => closePicker(setVisible8)}
				onClose={() => closePicker(setVisible8)}
			/>

			<Cell
				title="显示已选选项"
				onClick={() => {
					resetState();
					setVisible7(true);
				}}
			/>
			<AsyncPicker
				visible={visible7}
				data={data as Record<string, unknown>[]}
				lastLevel={lastLevel}
				firstLevel={firstLevel}
				onNext={nextFunc}
				onPrev={prevFunc}
				showSelected
				onCancel={() => closePicker(setVisible7)}
				onClose={() => closePicker(setVisible7)}
			/>

			<Cell
				title="动态改变标题"
				onClick={() => {
					resetState();
					setTitleBind('请选择省级');
					setVisible9(true);
				}}
			/>
			<AsyncPicker
				visible={visible9}
				data={data as Record<string, unknown>[]}
				lastLevel={lastLevel}
				firstLevel={firstLevel}
				title={titleBind}
				onNext={nextFunc}
				onPrev={prevFunc}
				onCancel={() => closePicker(setVisible9)}
				onClose={() => closePicker(setVisible9)}
			/>

			<div className="px-4 py-2">不使用弹出层</div>
			<AsyncPicker
				popup={null}
				data={inlineData as Record<string, unknown>[]}
				lastLevel={inlineLastLevel}
				firstLevel={inlineFirstLevel}
				onNext={inlineNextFunc}
				onPrev={inlinePrevFunc}
				height={30}
			/>
		</div>
	);
}

export default AsyncPickerZh;
