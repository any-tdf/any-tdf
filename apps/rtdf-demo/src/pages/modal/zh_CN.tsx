import { useState, useEffect } from 'react';
import { Modal, Cell, Toast } from 'rtdf/components';
import Aphorism from '../components/aphorism';

function ModalZh() {
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
	const [toastVisible, setToastVisible] = useState(false);

	useEffect(() => {
		if (visible15) {
			const timer = setTimeout(() => {
				setVisible15(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [visible15]);

	return (
		<div className="py-4">
			<Cell title="基础用法" onClick={() => setVisible1(true)} />
			<Modal visible={visible1} title="您明白吗？" content="留下来的人才是最痛苦的" btnText="我明白了" onClose={() => setVisible1(false)} />

			<Cell title="内容使用 Snippet" onClick={() => setVisible2(true)} />
			<Modal visible={visible2} onClose={() => setVisible2(false)} contentChild={<Aphorism num={1} compact />} />

			<Cell title="不显示标题" onClick={() => setVisible3(true)} />
			<Modal visible={visible3} title="" onClose={() => setVisible3(false)} />

			<Cell title="不显示按钮" onClick={() => setVisible4(true)} />
			<Modal visible={visible4} showBtn={false} onClose={() => setVisible4(false)} contentChild={<Aphorism num={1} compact />} />

			<Cell title="点击遮罩关闭" onClick={() => setVisible5(true)} />
			<Modal visible={visible5} popup={{ maskClosable: true }} onClose={() => setVisible5(false)} />

			<Cell title="自定义图标" onClick={() => setVisible6(true)} />
			<Modal
				visible={visible6}
				content="请佩戴口罩！"
				showIcon
				icon={{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'rtdf-demo-text-teal' }}
				onClose={() => setVisible6(false)}
			/>

			<Cell title="错误状态按钮" onClick={() => setVisible8(true)} />
			<Modal visible={visible8} btnText="我错了" button={{ state: 'error' }} onClose={() => setVisible8(false)} />

			<Cell title="全圆角按钮" onClick={() => setVisible9(true)} />
			<Modal visible={visible9} button={{ radius: 'full' }} onClose={() => setVisible9(false)} />

			<Cell title="主题色纯文本按钮" onClick={() => setVisible12(true)} />
			<Modal visible={visible12} button={{ fill: 'textState' }} onClose={() => setVisible12(false)} />

			<Cell title="内容使用 Snippet 且滚动" onClick={() => setVisible10(true)} />
			<Modal
				visible={visible10}
				onClose={() => setVisible10(false)}
				contentChild={
					<div className="h-56 overflow-auto">
						<Aphorism num={6} compact />
					</div>
				}
			/>

			<Cell title="显示窄一点" onClick={() => setVisible7(true)} />
			<Modal visible={visible7} popup={{ px: '20' }} onClose={() => setVisible7(false)} />

			<Cell title="另一种动画效果" onClick={() => setVisible11(true)} />
			<Modal visible={visible11} content="回弹过渡" popup={{ easeType: 'backOut' }} onClose={() => setVisible11(false)} />

			<Cell title="监听关闭事件" onClick={() => setVisible13(true)} />
			<Modal
				visible={visible13}
				onClose={() => {
					setVisible13(false);
					setToastVisible(true);
				}}
			/>
			<Toast visible={toastVisible} message="关闭了 Modal！" onClose={() => setToastVisible(false)} />

			<Cell title="标题居左" onClick={() => setVisible14(true)} />
			<Modal visible={visible14} title="标题居左" titleAlign="left" onClose={() => setVisible14(false)} />

			<Cell title="自动关闭" onClick={() => setVisible15(true)} />
			<Modal visible={visible15} content="别动！3 秒后我立即消失！" onClose={() => setVisible15(false)} />
		</div>
	);
}

export default ModalZh;
