import { useState } from 'react';
import { Cell, BottomSheet, Toast, Button } from 'rtdf/components';
import Aphorism from '../components/aphorism';

function BottomSheetZh() {
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

	const [toastBackVisible, setToastBackVisible] = useState(false);
	const [toastCloseVisible, setToastCloseVisible] = useState(false);

	const stayHeightList = [40, 60, 80];
	const [currentHeight, setCurrentHeight] = useState(60);
	const heightChangeFunc = (height: number) => setCurrentHeight(height);

	return (
		<div className="py-4">
			<Cell title="基础用法" onClick={() => setVisible1(true)} />
			<BottomSheet visible={visible1} title="此区域支持滑动" onClose={() => setVisible1(false)}>
				<div className="flex h-full flex-col justify-center text-center">
					<div>这里是内容区域</div>
				</div>
			</BottomSheet>

			<Cell title="内容区域滚动" onClick={() => setVisible8(true)} />
			<BottomSheet visible={visible8} onClose={() => setVisible8(false)}>
				<Aphorism num={12} />
			</BottomSheet>

			<Cell title="有返回按钮" onClick={() => setVisible2(true)} />
			<BottomSheet
				visible={visible2}
				showBackIcon
				title="点击返回与关闭可触发事件"
				onBack={() => setToastBackVisible(true)}
				onClose={() => {
					setToastCloseVisible(true);
					setVisible2(false);
				}}
			>
				<Aphorism num={12} />
			</BottomSheet>
			<Toast visible={toastBackVisible} message="触发了 BottomSheet 返回事件！" onClose={() => setToastBackVisible(false)} />
			<Toast visible={toastCloseVisible} message="触发了 BottomSheet 关闭事件！" onClose={() => setToastCloseVisible(false)} />

			<Cell title="初始高度为 90" onClick={() => setVisible3(true)} />
			<BottomSheet visible={visible3} stayHeightIndex={2} onClose={() => setVisible3(false)}>
				<Aphorism num={12} />
			</BottomSheet>

			<Cell title="固定高度为 40/60/80" onClick={() => setVisible4(true)} />
			<BottomSheet
				visible={visible4}
				stayHeightList={stayHeightList}
				onHeightChange={heightChangeFunc}
				title={`当前固定高度为${currentHeight}`}
				onClose={() => setVisible4(false)}
			>
				<Aphorism num={12} />
			</BottomSheet>

			<Cell title="点击遮罩可关闭" onClick={() => setVisible5(true)} />
			<BottomSheet visible={visible5} maskClosable onClose={() => setVisible5(false)}>
				<Aphorism num={2} />
			</BottomSheet>

			<Cell title="出现过渡时间为 1 秒" onClick={() => setVisible6(true)} />
			<BottomSheet visible={visible6} duration={1000} onClose={() => setVisible6(false)}>
				<Aphorism num={12} />
			</BottomSheet>

			<Cell title="遮罩完全透明且模糊" onClick={() => setVisible7(true)} />
			<BottomSheet visible={visible7} mask={{ opacity: '0', backdropBlur: 'sm' }} onClose={() => setVisible7(false)}>
				<Aphorism num={2} />
			</BottomSheet>

			<Cell title="头部不显示任何内容" onClick={() => setVisible9(true)} />
			<BottomSheet visible={visible9} showDivider={false} closeContent="" title="" onClose={() => setVisible9(false)}>
				<div className="flex h-full flex-col justify-around px-4 py-8 text-center">
					<div>头部区域</div>
					<div>标题</div>
					<div>返回与关闭图标</div>
					<div>分割线</div>
					<div>都不显示</div>
					<div>位置依旧保留作为滑动触控区域</div>
					<div className="mb-8">
						<Button onClick={() => setVisible9(false)}>关闭</Button>
					</div>
				</div>
			</BottomSheet>

			<Cell title="隐藏关闭图标且标题居中" onClick={() => setVisible10(true)} />
			<BottomSheet
				visible={visible10}
				closeContent=""
				titleAlign="center"
				maskClosable
				title="点击遮罩关闭"
				onClose={() => setVisible10(false)}
			>
				<Aphorism num={2} />
			</BottomSheet>

			<Cell title="另一种关闭图标" onClick={() => setVisible13(true)} />
			<BottomSheet visible={visible13} closeContent="closeIcon" onClose={() => setVisible13(false)}>
				<Aphorism num={2} />
			</BottomSheet>

			<Cell title="关闭区域自定义文字" onClick={() => setVisible14(true)} />
			<BottomSheet visible={visible14} closeContent="完成" onClose={() => setVisible14(false)}>
				<Aphorism num={2} />
			</BottomSheet>

			<Cell title="图标不同圆角风格" onClick={() => setVisible12(true)} />
			<BottomSheet visible={visible12} radius="md" showBackIcon onClose={() => setVisible12(false)}>
				<Aphorism num={2} />
			</BottomSheet>

			<Cell title="可下滑到底部关闭" onClick={() => setVisible11(true)} />
			<BottomSheet visible={visible11} closeHeight={10} closeContent="" onClose={() => setVisible11(false)}>
				<div className="p-4">将 closeHeight 设置为 10，如果滑动结束时位置距离页面底部小于页面高度的 10% 则自动关闭。</div>
			</BottomSheet>
		</div>
	);
}

export default BottomSheetZh;
