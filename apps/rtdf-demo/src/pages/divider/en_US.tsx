import { Divider } from 'rtdf/components';

function DividerEn() {
	return (
		<div className="flex flex-col space-y-8 py-8">
			<div>
				<div className="p-4 font-bold">Different lengths</div>
				<Divider />
				<Divider px="4" />
				<Divider px="8" />
				<Divider px="16" />
				<Divider px="36" />
			</div>
			<div>
				<div className="p-4 font-bold">Text</div>
				<Divider text="The Guzheng Project" />
				<Divider px="4" text="Red Cliff Base" />
			</div>
			<div>
				<div className="p-4 font-bold">Different heights</div>
				<div className="px-4 text-sm">Start</div>
				<Divider py="0" />
				<div className="px-4 text-sm">Height is 0</div>
				<Divider />
				<div className="px-4 text-sm">Height is 4</div>
				<Divider py="8" />
				<div className="px-4 text-sm">Height is 8</div>
			</div>

			<div>
				<div className="p-4 font-bold">Text position</div>
				<Divider text="Left" align="left" />
				<Divider text="Center" />
				<Divider text="Right" align="right" />
			</div>
			<div>
				<div className="p-4 font-bold">Line style</div>
				<Divider text="Solid" />
				<Divider line="dashed" text="Dashed" />
				<Divider line="dotted" text="Dotted" />
			</div>
			<div>
				<div className="p-4 font-bold">Custom color</div>
				<Divider injClass="!border-primary dark:!border-warning" />
				<Divider text="Custom line" injClass="!border-error dark:!border-info" />
				<Divider text="Custom text" injClass="!text-error" />
				<Divider text="Custom line and text" injClass="!border-error !text-primary dark:!text-info" />
				<Divider line="dashed" text="Custom dashed line" injClass="!border-warning" />
			</div>
			<div className="px-4">
				<div className="py-4 font-bold">Vertical divider</div>
				<div className="text-sm">
					Three days in the sky
					<Divider layout="v" />
					Three days in a row
					<Divider layout="v" />
					Human computer
				</div>
			</div>
			<div>
				<div className="p-4 font-bold">Different weights</div>
				<Divider />
				<Divider weight="2" />
				<Divider weight="4" />
				<div className="px-4 text-sm">
					Guardian
					<Divider layout="v" />
					Three days in the sky
					<Divider layout="v" weight="2" />
					Three days in a row
					<Divider layout="v" weight="4" />
					Human computer
				</div>
			</div>
			<div className="px-4">
				<div className="py-4 font-bold">Custom vertical divider</div>
				<div className="text-sm">
					Increase spacing
					<Divider layout="v" mx="4" />
					Custom
					<Divider layout="v" mx="4" injClass="!border-error dark:!border-info" />
					Color
					<Divider line="dashed" layout="v" mx="4" injClass="!border-error dark:!border-info" />
					Line style
				</div>
			</div>
		</div>
	);
}

export default DividerEn;
