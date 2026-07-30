import { useState } from 'react';
import { Button, Icon, Toast, Loading, Slider } from 'rtdf/components';
import type { ButtonProps } from 'rtdf/types';

function ButtonEn() {
	const [visible, setVisible] = useState(false);

	const radiusOptions: ButtonProps['radius'][] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const [radiusIndex, setRadiusIndex] = useState(2);
	const currentRadius = radiusOptions[radiusIndex];

	return (
		<>
			<div className="flex flex-col space-y-8 py-8">
				<div>
					<div className="p-4 font-bold">fill + state</div>
					<Button>Base Theme</Button>
					<Button state="success">Base Success</Button>
					<Button state="warning">Base Warning</Button>
					<Button state="error">Base Error</Button>
					<Button state="info">Base Info</Button>
					<Button fill="line">Line Colorless</Button>
					<Button fill="lineLight">LineLight</Button>
					<Button fill="lineState">Line Theme</Button>
					<Button fill="lineState" state="success">
						Line Success
					</Button>
					<Button fill="lineState" state="warning">
						Line Warning
					</Button>
					<Button fill="lineState" state="error">
						Line Error
					</Button>
					<Button fill="lineState" state="info">
						Line Info
					</Button>
					<Button fill="text">Text Colorless</Button>
					<Button fill="textState">Text Theme</Button>
					<Button fill="textState" state="success">
						Text Success
					</Button>
					<Button fill="textState" state="warning">
						Text Warning
					</Button>
					<Button fill="textState" state="error">
						Text Error
					</Button>
					<Button fill="textState" state="info">
						Text Info
					</Button>
					<Button fill="colorLight">Light Gray</Button>
					<Button fill="colorLight" state="theme">
						Light Theme
					</Button>
					<Button fill="colorLight" state="success">
						Light Success
					</Button>
					<Button fill="colorLight" state="warning">
						Light Warning
					</Button>
					<Button fill="colorLight" state="error">
						Light Error
					</Button>
					<Button fill="colorLight" state="info">
						Light Info
					</Button>
				</div>
				<div>
					<div className="p-4 font-bold">Different rounded style</div>
					<div className="px-4 pb-4">
						<Slider
							value={radiusIndex}
							minRange={0}
							maxRange={7}
							step={1}
							showSteps
							stepLabels={radiusLabels}
							onChange={(value: number) => setRadiusIndex(value)}
						/>
					</div>
					<Button radius={currentRadius}>Default</Button>
					<Button radius={currentRadius} fill="lineState">
						State Line
					</Button>
					<Button radius={currentRadius} fill="colorLight">
						Light Fill
					</Button>
				</div>
				<div>
					<div className="p-4 font-bold">Different border style</div>
					<Button fill="lineState">Solid line</Button>
					<Button fill="lineState" border="dashed">
						Dashed line
					</Button>
					<Button fill="lineState" border="dotted">
						Dotted line
					</Button>
				</div>
				<div>
					<div className="p-4 font-bold">Different size</div>
					<Button size="full" radius="none">
						There is no rounded corner
					</Button>
					<Button>Default</Button>
					<Button size="md">Medium</Button>
					<Button size="sm">Small</Button>
					<Button size="auto">AUTO</Button>
					<Button size="auto">
						<div className="px-1">
							<Icon name="ri-plane-fill" size={20} />
						</div>
					</Button>
				</div>
				<div>
					<div className="p-4 font-bold">Different heights</div>
					<Button heightOut="0">The external height is 0</Button>
					<Button heightIn="0">Internal height is 0</Button>
				</div>
				<div>
					<div className="p-4 font-bold">Fixed size</div>
					<div className="flex items-center justify-around">
						<Button customSize customWidth={40} customHeight={40} radius="full">
							W
						</Button>
						<Button customSize customWidth={40} customHeight={40} radius="xl">
							&
						</Button>
						<Button customSize customWidth={40} customHeight={40}>
							H
						</Button>
						<Button customSize customWidth={40} customHeight={40} radius="none">
							equal
						</Button>
						<Button fill="lineState" customSize customWidth={40} customHeight={40}>
							<Icon name="ri-plane-fill" size={20} />
						</Button>
						<Button radius="full" fill="lineState" customSize customWidth={40} customHeight={40}>
							<Icon name="ri-plane-fill" size={20} />
						</Button>
						<Button radius="full" border="dashed" fill="lineState" customSize customWidth={40} customHeight={40}>
							<Icon name="ri-plane-fill" size={20} />
						</Button>
						<Button radius="full" customSize customWidth={24} customHeight={24} heightIn="0">
							<Icon name="ri-plane-fill" size={12} />
						</Button>
					</div>
				</div>
				<div>
					<div className="p-4 font-bold">Disable</div>
					<Button disabled>Disable</Button>
					<Button fill="lineState" disabled>
						Disable
					</Button>
				</div>
				<div>
					<div className="p-4 font-bold">With icon</div>
					<Button icon={{ name: 'ri-share-forward-2-fill', size: 18 }}>Throw the two way foil</Button>
					<Button fill="lineState" icon={{ name: 'ri-mic-off-fill', size: 16 }}>
						Start the surface wall plan
					</Button>
					<Button icon={{ name: 'ri-share-forward-2-fill', size: 18 }} iconPosition="right">
						Throw the two way foil
					</Button>
					<Button fill="lineState" icon={{ name: 'ri-mic-off-fill', size: 16 }} iconPosition="right">
						Start the surface wall plan
					</Button>
				</div>
				<div>
					<div className="p-4 font-bold">With loading (disabled by default)</div>
					<Button loading={{ inverse: true, height: '6', width: '6' }}>Loading</Button>
					<Button loading={{ inverse: true, width: '16', height: '6', type: '1_28' }}>Loading</Button>
					<Button loading={{ inverse: true, height: '6', width: '6' }} disabledLoading={false}>
						Loading
					</Button>
				</div>
				<div>
					<div className="p-4 font-bold">With icon (via children)</div>
					<Button>
						<Icon name="ri-share-forward-2-fill" size={18} />
						Throw the two way foil
					</Button>
					<Button fill="lineState">
						<Icon name="ri-mic-off-fill" size={16} />
						Start the surface wall plan
					</Button>
				</div>
				<div>
					<div className="p-4 font-bold">Load (via children)</div>
					<Button>
						<Loading inverse height="6" width="6" />
					</Button>
					<Button>
						<Loading inverse width="16" height="6" type="1_17" />
					</Button>
				</div>
				<div>
					<div className="p-4 font-bold">Love version</div>
					<Button love>Care version button</Button>
					<Button love fill="lineState">
						<Icon name="ri-hand-heart-line" size={22} />
						Care version button
					</Button>
				</div>
				<div>
					<div className="p-4 font-bold">Customize</div>
					<Button injClass="bg-error dark:bg-success">Solid color filling</Button>
					<Button injClass="bg-linear-to-r from-primary to-info dark:from-dark dark:to-info !text-white dark:!text-black">
						Gradient filling
					</Button>
					<Button fill="line" injClass="border-error dark:border-success !text-error dark:!text-success">
						Linear
					</Button>
					<Button injClass="shadow-md shadow-black/30 dark:shadow-white/30">Shadow</Button>
					<Button radius="full" injClass="shadow-lg shadow-primary/40 dark:shadow-dark/40">
						Shadow
					</Button>
				</div>
			</div>
			<Toast visible={visible} message="Clicked button!" onClose={() => setVisible(false)} />
		</>
	);
}

export default ButtonEn;
