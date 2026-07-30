import { useState } from 'react';
import { Icon, NavBar, Toast } from 'rtdf/components';

function NavBarZh() {
	const icons1 = [{ name: 'ri-paint-brush-line', theme: true }, { name: 'ri-share-line' }];
	const icons2 = [{ name: 'ri-command-line' }, { name: 'ri-drag-move-line' }];
	const icons3 = [{ name: 'ri-indent-decrease' }, { name: 'ri-service-line' }];
	const icons4 = [{ name: 'ri-hand-heart-line', theme: true }, { name: 'ri-parent-line' }];

	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [rightIndex, setRightIndex] = useState(0);
	const [visible3, setVisible3] = useState(false);

	return (
		<div className="flex flex-col space-y-8 py-8">
			<NavBar title="基础用法" />
			<NavBar title="右侧使用 Icon" rights={icons1} />
			<NavBar title="标题居中" titleAlign="center" rights={[{ name: 'ri-command-line' }]} />
			<NavBar title="点击左侧" onClickLeft={() => setVisible1(true)} />
			<Toast visible={visible1} message="点击了左侧！" onClose={() => setVisible1(false)} />
			<NavBar
				title="点击右侧"
				rights={icons2}
				onClickRight={(index) => {
					setVisible2(true);
					setRightIndex(index);
				}}
			/>
			<Toast visible={visible2} message={`点击的右侧图标索引值是 ${rightIndex}。`} onClose={() => setVisible2(false)} />
			<NavBar title="无左侧与底分割线，文字过长长长长长长长" left={null} line={false} rights={icons3} />
			<NavBar title="自定义背景颜色 by injClass" injClass="rtdf-demo-nav-bg" />
			<NavBar titleChild={<div className="rtdf-demo-text-red-green">自定义文字颜色 by Snippet</div>} />
			<NavBar
				titleChild={
					<div className="flex h-12 flex-col justify-around text-xs">
						<div className="text-sm">titleChild Snippet 渲染标题区域</div>
						<div>rightChild Snippet 渲染右侧且可点击</div>
					</div>
				}
				rightChild={
					<div>
						<button className="text-primary dark:text-dark h-12 w-12 cursor-pointer text-center" onClick={() => setVisible3(true)}>
							Hello
						</button>
					</div>
				}
			/>
			<Toast visible={visible3} message="点击了右侧 Snippet 内容！" onClose={() => setVisible3(false)} />
			<NavBar title="关爱版导航栏" love rights={icons4} />
			<NavBar
				injClass="!bg-transparent"
				line={false}
				leftChild={
					<div className="m-2 h-8 w-8 rounded-full bg-white text-center leading-8 dark:bg-black/50">
						<Icon name="ri-home-7-line" size={18} y={-2} />
					</div>
				}
				titleChild={
					<div className="my-2 h-8 rounded-full bg-white px-3 text-sm leading-8 dark:bg-black/50">injClass 与 Snippet 结合自定义样式</div>
				}
				rightChild={
					<div className="m-2 h-8 w-8 rounded-full bg-white text-center leading-8 dark:bg-black/50">
						<Icon name="ri-customer-service-2-line" size={18} y={-2} />
					</div>
				}
			/>
		</div>
	);
}

export default NavBarZh;
