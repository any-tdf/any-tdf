import { useState } from 'react';
import { Cell, CellGroup, Toast } from 'rtdf/components';

function CellEn() {
	const [visible, setVisible] = useState(false);

	return (
		<div className="flex flex-col space-y-8 py-8">
			<div>
				<Cell title="Basic Usage" />
				<Cell title="With Detail" detail="Zeroing" />
				<Cell title="Detail with Snippet" detailChild={<span className="text-primary dark:text-dark text-xs">I'm Snippet</span>} />
				<Cell title="No Arrow" right={null} />
				<Cell title="Display Only" right={null} clickAll={false} />
				<Cell title="Click Event" detail="Click Me" onClick={() => setVisible(true)} />
				<Toast visible={visible} message="You clicked me!" onClose={() => setVisible(false)} />
				<Cell title="Detail without Arrow" detail="Zeroing" right={null} />
				<Cell title="Switch (Click Row)" right={{ type: 'switch' }} />
				<Cell title="Switch with Detail" detail="Description" right={{ type: 'switch' }} />
				<Cell title="Switch with Text" right={{ type: 'switch', switch: { inside: ['😭', '😄'] } }} />
				<Cell title="Rounded Switch" right={{ type: 'switch', switch: { radius: 'full' } }} />
				<Cell title="Switch Only" clickAll={false} right={{ type: 'switch' }} />
				<Cell title="Left Icon" left={{ name: 'ri-bank-line', size: 20, theme: true }} />
				<Cell title="Right Icon" right={{ type: 'icon', icon: { name: 'ri-battery-charge-line', size: 20, theme: true } }} />
				<Cell
					title="Left Image"
					leftChild={
						<div className="mr-1 shrink-0">
							<img className="h-6 w-6" src="/assets/images/icon_颁奖.png" alt="" />
						</div>
					}
				/>
				<Cell
					title="Both Side Images"
					leftChild={
						<div className="mr-1 shrink-0">
							<img className="h-6 w-6" src="/assets/images/icon_评价.png" alt="" />
						</div>
					}
					rightChild={
						<div className="mr-1 shrink-0">
							<img className="h-6 w-6" src="/assets/images/icon_美食.png" alt="" />
						</div>
					}
				/>
				<Cell
					title="Larger Image"
					leftChild={
						<div className="mr-1 shrink-0">
							<img className="h-10 w-10" src="/assets/images/icon_会员.png" alt="" />
						</div>
					}
				/>
				<Cell title="With Subtitle" subTitle="I'm subtitle" />
				<Cell title="Subtitle and Detail" subTitle="I'm subtitle" detail="Zeroing" />
				<Cell title="Secondary Info" detail="Zeroing" info="Reboot" />
				<Cell title="Both Secondary" subTitle="I'm subtitle" detail="Zeroing" info="Reboot" />
				<Cell title="Both Secondary" subTitle="I'm subtitle" detail="With Arrow" info="Reboot" />
				<Cell
					title="Both Secondary"
					subTitle="With Left Icon"
					detail="With Arrow"
					info="Reboot"
					left={{ name: 'ri-shopping-basket-line', theme: true }}
				/>
				<Cell
					title="All Features"
					subTitle="Left Custom Image"
					detail="Right Arrow"
					info="No Border"
					leftChild={
						<div className="mr-1 shrink-0">
							<img className="h-10 w-10" src="/assets/images/icon_火车票.png" alt="" />
						</div>
					}
				/>
				<Cell
					title="Long title that wraps automatically when it exceeds the width of the container."
					subTitle="Long subtitle that also wraps automatically when it exceeds the width."
				/>
				<Cell
					title="Large image with long title that wraps automatically. Try other combinations yourself."
					subTitle="Short subtitle"
					line={false}
					leftChild={
						<div className="mr-1 shrink-0">
							<img className="h-20 w-20" src="/assets/images/icon_外卖.png" alt="" />
						</div>
					}
				/>
			</div>

			<CellGroup>
				<Cell title="Group Usage" mx="0" my="0" shadow="none" line radius="none" />
				<Cell title="Group Usage" mx="0" my="0" shadow="none" radius="none" />
			</CellGroup>
			<CellGroup mx="0" radius="none">
				<Cell title="Group Usage" detail="No Margin" mx="0" my="0" shadow="none" line radius="none" />
				<Cell title="Group Usage" detail="No Radius" mx="0" my="0" shadow="none" radius="none" />
			</CellGroup>
			<CellGroup shadow="xl" radius="2xl">
				<Cell title="Group Usage" detail="Large Shadow" mx="0" my="0" shadow="none" line radius="none" />
				<Cell title="Group Usage" detail="Large Radius" mx="0" my="0" shadow="none" radius="none" />
			</CellGroup>

			<div>
				<Cell title="No Margin" mx="0" radius="none" />
				<Cell title="No Radius" radius="none" />
				<Cell title="Base Radius" radius="sm" />
				<Cell title="Medium Radius" radius="md" />
				<Cell title="Large Radius" radius="lg" />
				<Cell title="XL Radius" radius="xl" />
				<Cell title="2XL Radius" radius="2xl" />
				<Cell title="Full Radius" radius="4xl" />
				<Cell title="Large Shadow" shadow="lg" />
			</div>
			<div>
				<Cell title="Custom Text Color" injClass="text-primary dark:text-dark" />
				<Cell title="Custom Background" injClass="!bg-blue/20 active:!bg-purple/10" line={false} />
			</div>
			<div>
				<Cell love title="Care Version" />
				<Cell love title="Care Version" detail="Care" />
				<Cell love title="Care Version" left={{ name: 'ri-hand-heart-line', theme: true }} />
			</div>
		</div>
	);
}

export default CellEn;
