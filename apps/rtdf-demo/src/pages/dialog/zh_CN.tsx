import { useState, useEffect } from 'react';
import { Dialog, Cell, Toast, Loading } from 'rtdf/components';

function DialogZh() {
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

	const [toastVisible, setToastVisible] = useState(false);
	const [toastVisible2, setToastVisible2] = useState(false);
	const [toastVisible3, setToastVisible3] = useState(false);
	const [toastVisible4, setToastVisible4] = useState(false);

	const [loading, setLoading] = useState(false);

	// 自动关闭
	useEffect(() => {
		if (visible8) {
			const timer = setTimeout(() => {
				setVisible8(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [visible8]);

	const somethingFnc = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setVisible18(false);
			setToastVisible4(true);
		}, 3000);
	};

	return (
		<div className="py-4">
			<Cell title="基础用法" onClick={() => setVisible1(true)} />
			<Dialog visible={visible1} title="李逍遥" content="你确认前往仙灵岛吗？" onClose={() => setVisible1(false)} />

			<Cell title="内容使用 contentChild" onClick={() => setVisible2(true)} />
			<Dialog
				visible={visible2}
				contentChild={
					<div className="px-4 py-2 text-sm text-justify">
						生活不是等待暴风雨过去，而是学会在雨中跳舞。
						<div className="text-right mt-1 italic">—— 维维安·格林</div>
					</div>
				}
				onClose={() => setVisible2(false)}
			/>

			<Cell title="不显示标题" onClick={() => setVisible3(true)} />
			<Dialog visible={visible3} title="" onClose={() => setVisible3(false)} />

			<Cell title="点击遮罩关闭" onClick={() => setVisible5(true)} />
			<Dialog visible={visible5} popup={{ maskClosable: true }} onClose={() => setVisible5(false)} />

			<Cell title="自定义图标" onClick={() => setVisible6(true)} />
			<Dialog
				visible={visible6}
				content="请佩戴口罩！"
				showIcon
				icon={{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'text-info' }}
				secondaryText="没携带"
				primaryText="好的"
				onClose={() => setVisible6(false)}
			/>

			<Cell title="内容使用 contentChild 且滚动" onClick={() => setVisible4(true)} />
			<Dialog
				visible={visible4}
				contentChild={
					<div className="max-h-56 overflow-auto px-4 py-2">
						<div className="text-sm text-justify py-2 border-b border-black/5 dark:border-white/5">
							生活不是等待暴风雨过去，而是学会在雨中跳舞。
							<div className="text-right mt-1 italic">—— 维维安·格林</div>
						</div>
						<div className="text-sm text-justify py-2 border-b border-black/5 dark:border-white/5">
							不要为已消逝之年华叹息，须正视欲匆匆溜走的时光。
							<div className="text-right mt-1">—— 布莱希特</div>
						</div>
						<div className="text-sm text-justify py-2 border-b border-black/5 dark:border-white/5">
							我们不能改变风向，但可以调整风帆。
							<div className="text-right mt-1 italic">—— 亚里士多德</div>
						</div>
						<div className="text-sm text-justify py-2 border-b border-black/5 dark:border-white/5">
							人生就像骑自行车，想保持平衡就得往前走。
							<div className="text-right mt-1 italic">—— 爱因斯坦</div>
						</div>
						<div className="text-sm text-justify py-2 border-b border-black/5 dark:border-white/5">
							成功不是终点，失败也不是终结，唯有继续前行的勇气才最重要。
							<div className="text-right mt-1 italic">—— 丘吉尔</div>
						</div>
						<div className="text-sm text-justify py-2">
							最困难的时候，也就是离成功不远的时候。
							<div className="text-right mt-1 italic">—— 拿破仑</div>
						</div>
					</div>
				}
				onClose={() => setVisible4(false)}
			/>

			<Cell title="另一种动画效果" onClick={() => setVisible11(true)} />
			<Dialog visible={visible11} content="回弹过渡" popup={{ easeType: 'backOut' }} onClose={() => setVisible11(false)} />

			<Cell title="标题居左" onClick={() => setVisible7(true)} />
			<Dialog visible={visible7} title="标题居左" titleAlign="left" onClose={() => setVisible7(false)} />

			<Cell title="自动关闭" onClick={() => setVisible8(true)} />
			<Dialog visible={visible8} content="别动！3 秒后我立即消失！" onClose={() => setVisible8(false)} />

			<Cell title="主按钮占比多一点" onClick={() => setVisible9(true)} />
			<Dialog visible={visible9} btnRatio={[3, 2]} onClose={() => setVisible9(false)} />

			<Cell title="主次按钮位置反转" onClick={() => setVisible10(true)} />
			<Dialog visible={visible10} btnReverse onClose={() => setVisible10(false)} />

			<Cell title="按钮间距大一点" onClick={() => setVisible19(true)} />
			<Dialog visible={visible19} btnGap="16" onClose={() => setVisible19(false)} />

			<Cell title="按钮为纯文字" onClick={() => setVisible12(true)} />
			<Dialog visible={visible12} btnStyle="text" onClose={() => setVisible12(false)} />

			<Cell title="按钮为纯文字有分割线" onClick={() => setVisible13(true)} />
			<Dialog visible={visible13} btnStyle="textLine" onClose={() => setVisible13(false)} />

			<Cell title="全圆角按钮" onClick={() => setVisible15(true)} />
			<Dialog
				visible={visible15}
				primaryButton={{ radius: 'full' }}
				secondaryButton={{ radius: 'full' }}
				onClose={() => setVisible15(false)}
			/>

			<Cell title="监听次要事件" onClick={() => setVisible14(true)} />
			<Dialog visible={visible14} onSecondary={() => setToastVisible(true)} onClose={() => setVisible14(false)} />
			<Toast visible={toastVisible} message="点击了取消！" onClose={() => setToastVisible(false)} />

			<Cell title="监听关闭事件" onClick={() => setVisible16(true)} />
			<Dialog
				visible={visible16}
				onClose={() => {
					setVisible16(false);
					setToastVisible2(true);
				}}
			/>
			<Toast visible={toastVisible2} message="关闭了 Dialog！" onClose={() => setToastVisible2(false)} />

			<Cell title="监听主要事件" onClick={() => setVisible17(true)} />
			<Dialog visible={visible17} onPrimary={() => setToastVisible3(true)} onClose={() => setVisible17(false)} />
			<Toast visible={toastVisible3} message="点击了确认！" onClose={() => setToastVisible3(false)} />

			<Cell title="异步执行主要事件" onClick={() => setVisible18(true)} />
			<Dialog
				visible={visible18}
				onPrimary={somethingFnc}
				title="小鬼"
				content="你一定要进入锁妖塔吗？"
				primaryChild={<span>{loading ? <Loading inverse width="12" height="6" type="1_17" /> : '进入'}</span>}
				onClose={() => setVisible18(false)}
			/>
			<Toast visible={toastVisible4} message="已进入锁妖塔！" onClose={() => setToastVisible4(false)} />
		</div>
	);
}

export default DialogZh;
