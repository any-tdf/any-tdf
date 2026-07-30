import { useState } from 'react';
import { Picker, Cell } from 'rtdf/components';
import type { PickerMultipleItem } from 'rtdf/types';
import {
	someProvinceList,
	weekList,
	amOrPmList,
	timeList,
	cityList,
	linkageData,
	linkagDiffLabelKeyData,
	linkagCustomChildrenKeyData
} from './data';

function PickerZh() {
	const datas = [{ data: someProvinceList }];
	const col3Datas = [{ data: weekList }, { data: amOrPmList }, { data: timeList }];

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
	const [visible23, setVisible23] = useState(false);
	const [visible24, setVisible24] = useState(false);
	const [visible25, setVisible25] = useState(false);

	const [currentDetail, setCurrentDetail] = useState('请选择');
	const [allItems, setAllItems] = useState<{ [key: string]: string }[]>([]);
	const [allIndexs, setAllIndexs] = useState<number[]>([]);

	const [multipleSelected1, setMultipleSelected1] = useState<PickerMultipleItem[]>([]);
	const [multipleSelected2, setMultipleSelected2] = useState<PickerMultipleItem[]>([]);
	const [multipleSelected3, setMultipleSelected3] = useState<PickerMultipleItem[]>([]);

	return (
		<div className="py-4">
			<Cell title="基础用法" onClick={() => setVisible1(true)} />
			<Picker visible={visible1} datas={datas} onClose={() => setVisible1(false)} />

			<Cell title="自定义标题" onClick={() => setVisible2(true)} />
			<Picker visible={visible2} title="请选择省份" datas={datas} onClose={() => setVisible2(false)} />

			<Cell title="可见 7 行" onClick={() => setVisible3(true)} />
			<Picker visible={visible3} datas={[{ data: someProvinceList, showRow: 7 }]} onClose={() => setVisible3(false)} />

			<Cell title="关闭自动滚动至上次选定项" onClick={() => setVisible4(true)} />
			<Picker visible={visible4} datas={datas} autoScrollToLast={false} onClose={() => setVisible4(false)} />

			<Cell title="初始选定始终为第 4 项" subTitle="需要关闭自动选定上次选中项" onClick={() => setVisible5(true)} />
			<Picker
				visible={visible5}
				datas={[{ data: someProvinceList, initIndex: 3 }]}
				autoScrollToLast={false}
				onClose={() => setVisible5(false)}
			/>

			<Cell title="自动滚动时取消动画" onClick={() => setVisible6(true)} />
			<Picker visible={visible6} datas={[{ data: someProvinceList, useAnimation: false }]} onClose={() => setVisible6(false)} />

			<Cell title="自定义 label 的 key 值" onClick={() => setVisible7(true)} />
			<Picker visible={visible7} datas={[{ data: cityList, labelKey: 'cityName' }]} title="请选择城市" onClose={() => setVisible7(false)} />

			<Cell title="右侧展示选定项" detail={currentDetail} onClick={() => setVisible8(true)} />
			<Picker
				visible={visible8}
				datas={datas}
				onConfirm={(items) => setCurrentDetail(items[0]?.label || '')}
				onClose={() => setVisible8(false)}
			/>

			<Cell title="单列左对齐" onClick={() => setVisible20(true)} />
			<Picker visible={visible20} datas={[{ data: someProvinceList, align: 'left' }]} onClose={() => setVisible20(false)} />

			<Cell title="多列选择器" onClick={() => setVisible9(true)} />
			<Picker visible={visible9} datas={col3Datas} onClose={() => setVisible9(false)} />

			<Cell title="不同列可见行数" onClick={() => setVisible10(true)} />
			<Picker
				visible={visible10}
				datas={[{ data: weekList }, { data: amOrPmList, showRow: 3 }, { data: timeList, showRow: 7 }]}
				onClose={() => setVisible10(false)}
			/>

			<Cell title="不同列 flex 比例" onClick={() => setVisible11(true)} />
			<Picker
				visible={visible11}
				datas={[
					{ data: weekList, flex: 3 },
					{ data: amOrPmList, flex: 1 },
					{ data: timeList, flex: 2 }
				]}
				onClose={() => setVisible11(false)}
			/>

			<Cell title="多列不同对齐方式" onClick={() => setVisible21(true)} />
			<Picker
				visible={visible21}
				datas={[
					{ data: weekList, align: 'left' },
					{ data: amOrPmList, align: 'center' },
					{ data: timeList, align: 'right' }
				]}
				onClose={() => setVisible21(false)}
			/>

			<Cell title="多级联动" onClick={() => setVisible12(true)} />
			<Picker visible={visible12} datas={linkageData} isLinkage onClose={() => setVisible12(false)} />

			<Cell title="多级联动不同可见行数" onClick={() => setVisible13(true)} />
			<Picker visible={visible13} datas={linkageData} linkageShowRows={[3, 5, 7]} isLinkage onClose={() => setVisible13(false)} />

			<Cell title="多级联动不同 flex 比例" onClick={() => setVisible14(true)} />
			<Picker visible={visible14} datas={linkageData} linkageFlexs={[1, 2, 3]} isLinkage onClose={() => setVisible14(false)} />

			<Cell title="多级联动自定义每级 label 的 key 值" onClick={() => setVisible15(true)} />
			<Picker
				visible={visible15}
				datas={linkagDiffLabelKeyData}
				linkageLabelKeys={['province', 'city', 'region']}
				isLinkage
				onClose={() => setVisible15(false)}
			/>

			<Cell title="多级联动自定义上下级 children 的 key 值" onClick={() => setVisible16(true)} />
			<Picker
				visible={visible16}
				datas={linkagCustomChildrenKeyData}
				linkageChildrenKey="child"
				isLinkage
				onClose={() => setVisible16(false)}
			/>

			<Cell title="联动不同对齐方式" onClick={() => setVisible22(true)} />
			<Picker
				visible={visible22}
				datas={linkageData}
				linkageAligns={['right', 'center', 'left']}
				isLinkage
				onClose={() => setVisible22(false)}
			/>

			<Cell title="多级联动设置每列初始选定项" onClick={() => setVisible17(true)} />
			<Picker visible={visible17} datas={linkageData} linkageInitIndexs={[0, 1, 8]} isLinkage onClose={() => setVisible17(false)} />

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
			<Cell title="获取选定数据" onClick={() => setVisible18(true)} />
			<Picker
				visible={visible18}
				datas={col3Datas}
				onConfirm={(items, indexs) => {
					setAllItems(items);
					setAllIndexs(indexs);
				}}
				onClose={() => setVisible18(false)}
			/>

			<Cell title="顶部来点圆角" onClick={() => setVisible19(true)} />
			<Picker visible={visible19} datas={datas} popup={{ radius: 'xl' }} onClose={() => setVisible19(false)} />

			<Cell
				title="单列多选"
				subTitle={multipleSelected1.length > 0 ? `已选 ${multipleSelected1.length} 项` : ''}
				onClick={() => setVisible23(true)}
			/>
			<Picker
				visible={visible23}
				datas={datas}
				multiple
				multipleSelected={multipleSelected1}
				onMultipleChange={setMultipleSelected1}
				onClose={() => setVisible23(false)}
			/>

			<Cell
				title="多列多选"
				subTitle={multipleSelected2.length > 0 ? `已选 ${multipleSelected2.length} 项` : ''}
				onClick={() => setVisible24(true)}
			/>
			<Picker
				visible={visible24}
				datas={col3Datas}
				multiple
				multipleSelected={multipleSelected2}
				onMultipleChange={setMultipleSelected2}
				onClose={() => setVisible24(false)}
			/>

			<Cell
				title="联动多选"
				subTitle={multipleSelected3.length > 0 ? `已选 ${multipleSelected3.length} 项` : ''}
				onClick={() => setVisible25(true)}
			/>
			<Picker
				visible={visible25}
				datas={linkageData}
				isLinkage
				multiple
				multipleSelected={multipleSelected3}
				onMultipleChange={setMultipleSelected3}
				onClose={() => setVisible25(false)}
			/>

			<div className="px-4 py-2">不使用弹出层</div>
			<Picker popup={null} datas={datas} height={30} />
		</div>
	);
}

export default PickerZh;
