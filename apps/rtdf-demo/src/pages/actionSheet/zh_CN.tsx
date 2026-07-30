import { useState } from 'react';
import { Cell, ActionSheet, Toast } from 'rtdf/components';
import type { ActionProps } from 'rtdf/types';

function ActionSheetZh() {
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

	const actions: ActionProps[] = [{ content: '选项一' }, { content: '选项二' }, { content: '选项三' }];

	const actions1: ActionProps[] = [
		{ content: '常规选项' },
		{ content: '主题选项', style: 'theme' },
		{ content: '成功选项', style: 'success' },
		{ content: '警告选项', style: 'warning' },
		{ content: '错误选项', style: 'error' },
		{ content: '信息选项', style: 'info' },
		{ content: '禁用选项', style: 'warning', disabled: true }
	];

	const actions2: ActionProps[] = [
		{ content: '选项一' },
		{ content: '选项二', desc: '这里是描述信息' },
		{ content: '选项三', style: 'error', desc: '这里是描述信息' }
	];

	const actions3: ActionProps[] = [
		{ content: '火女', showImg: true, imgSrc: '/assets/images/dota_火女.png', imgRadius: 'sm' },
		{ content: '小牛', showImg: true, imgSrc: '/assets/images/dota_小牛.png', imgRadius: 'sm' },
		{ content: '水人', showImg: true, imgSrc: '/assets/images/dota_水人.png', imgRadius: 'sm' }
	];

	const actions4: ActionProps[] = [
		{ content: 'Apple', showImg: true, imgSrc: '/assets/logos/apple.png', imgRadius: 'none' },
		{ content: 'Google', showImg: true, imgSrc: '/assets/logos/google.png', imgRadius: 'none' },
		{ content: 'Microsoft', showImg: true, imgSrc: '/assets/logos/microsoft.png', imgRadius: 'none' },
		{ content: 'Adobe', showImg: true, imgSrc: '/assets/logos/adobe.png', imgRadius: 'none' },
		{ content: 'Figma', showImg: true, imgSrc: '/assets/logos/figma.png', imgRadius: 'none' }
	];

	const [toastVisible1, setToastVisible1] = useState(false);
	const [toastVisible2, setToastVisible2] = useState(false);
	const [toastVisible3, setToastVisible3] = useState(false);
	const [index, setIndex] = useState(0);
	const [item, setItem] = useState<ActionProps>({ content: '' });

	const clickActionFunc = (i: number, action: ActionProps) => {
		setIndex(i);
		setItem(action);
		setToastVisible3(true);
	};

	return (
		<div className="py-4">
			<Cell title="基础用法" onClick={() => setVisible1(true)} />
			<ActionSheet visible={visible1} actions={actions} onClose={() => setVisible1(false)} />

			<Cell title="有取消操作且点击遮罩不可关闭" onClick={() => setVisible2(true)} />
			<ActionSheet visible={visible2} actions={actions} showCancel popup={{ maskClosable: false }} onClose={() => setVisible2(false)} />

			<Cell title="不同样式" onClick={() => setVisible3(true)} />
			<ActionSheet visible={visible3} actions={actions1} onClose={() => setVisible3(false)} />

			<Cell title="带标题和描述信息" onClick={() => setVisible4(true)} />
			<ActionSheet visible={visible4} actions={actions2} title="这里是标题，可以简要说明以下操作。" onClose={() => setVisible4(false)} />

			<Cell title="顶部来点圆角" onClick={() => setVisible5(true)} />
			<ActionSheet visible={visible5} actions={actions} popup={{ radius: 'xl' }} onClose={() => setVisible5(false)} />

			<Cell title="两侧有间距" onClick={() => setVisible6(true)} />
			<ActionSheet visible={visible6} actions={actions} popup={{ radius: 'xl', px: '2' }} onClose={() => setVisible6(false)} />

			<Cell title="监听关闭事件" onClick={() => setVisible7(true)} />
			<ActionSheet
				visible={visible7}
				actions={actions}
				onClose={() => {
					setVisible7(false);
					setToastVisible1(true);
				}}
			/>
			<Toast visible={toastVisible1} message="关闭了操作面板！" onClose={() => setToastVisible1(false)} />

			<Cell title="监听取消事件" onClick={() => setVisible8(true)} />
			<ActionSheet
				visible={visible8}
				actions={actions}
				showCancel
				onCancel={() => setToastVisible2(true)}
				onClose={() => setVisible8(false)}
			/>
			<Toast visible={toastVisible2} message="点击了取消！" onClose={() => setToastVisible2(false)} />

			<Cell title="监听选项点击事件" onClick={() => setVisible9(true)} />
			<ActionSheet visible={visible9} actions={actions} onClickAction={clickActionFunc} onClose={() => setVisible9(false)} />
			<Toast visible={toastVisible3} message={`点击了第 ${index + 1} 项，${item.content}！`} onClose={() => setToastVisible3(false)} />

			<Cell title="点击选项不关闭" onClick={() => setVisible10(true)} />
			<ActionSheet visible={visible10} actions={actions} actionClosable={false} onClose={() => setVisible10(false)} />

			<Cell title="选项带图片" onClick={() => setVisible11(true)} />
			<ActionSheet visible={visible11} actions={actions3} onClose={() => setVisible11(false)} />

			<Cell title="选项左对齐" onClick={() => setVisible12(true)} />
			<ActionSheet visible={visible12} actions={actions4} align="left" onClose={() => setVisible12(false)} />
		</div>
	);
}

export default ActionSheetZh;
