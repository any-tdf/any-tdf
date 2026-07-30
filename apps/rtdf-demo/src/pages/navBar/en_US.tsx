import { useState } from 'react';
import { NavBar, Icon, Toast } from 'rtdf/components';

function NavBarEn() {
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
			<NavBar title="Basic usage" />
			<NavBar title="Use Icon on the right side" rights={icons1} />
			<NavBar title="Title centered" titleAlign="center" rights={[{ name: 'ri-command-line' }]} />
			<NavBar title="Click on the left" onClickLeft={() => setVisible1(true)} />
			<Toast visible={visible1} message="Clicked on the left!" onClose={() => setVisible1(false)} />
			<NavBar
				title="Click on the right"
				rights={icons2}
				onClickRight={(index) => {
					setVisible2(true);
					setRightIndex(index);
				}}
			/>
			<Toast visible={visible2} message={`The index of the clicked right icon is ${rightIndex}.`} onClose={() => setVisible2(false)} />
			<NavBar title="No left and bottom dividers, long text" left={null} line={false} rights={icons3} />
			<NavBar title="Custom background color by injClass" injClass="rtdf-demo-nav-bg" />
			<NavBar titleChild={<div className="rtdf-demo-text-red-green">Custom text color by Snippet</div>} />
			<NavBar
				titleChild={
					<div className="flex h-12 flex-col justify-around text-xs">
						<div className="text-sm">title Snippet renders</div>
						<div>right Snippet renders</div>
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
			<Toast visible={visible3} message="Clicked on the right Snippet content!" onClose={() => setVisible3(false)} />
			<NavBar title="Love version" love rights={icons4} />
			<NavBar
				injClass="!bg-transparent"
				line={false}
				leftChild={
					<div className="m-2 h-8 w-8 rounded-full bg-white text-center leading-8 dark:bg-black/50">
						<Icon name="ri-home-7-line" size={18} y={-2} />
					</div>
				}
				titleChild={
					<div className="my-2 h-8 rounded-full bg-white px-3 text-sm leading-8 dark:bg-black/50">
						custom styles by injClass and Snippet
					</div>
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

export default NavBarEn;
