import { useState } from 'react';
import { Button, Cell, ColorPicker } from 'rtdf/components';
import type { OklchColor } from 'rtdf/types';

function ColorPickerEn() {
	const [visible1, setVisible1] = useState(false);
	const [colors1, setColors1] = useState<string[]>([]);

	const [value2, setValue2] = useState<OklchColor>({ l: 0.6, c: 0.2, h: 30 });
	const [colors2, setColors2] = useState<string[]>([]);

	const [visible3, setVisible3] = useState(false);
	const [colors3, setColors3] = useState<string[]>([]);

	const [visible4, setVisible4] = useState(false);
	const [colors4, setColors4] = useState<string[]>([]);

	const [visible5, setVisible5] = useState(false);
	const [colors5, setColors5] = useState<string[]>([]);

	const [visible6, setVisible6] = useState(false);
	const [colors6, setColors6] = useState<string[]>([]);

	const [visible7, setVisible7] = useState(false);
	const [visible8, setVisible8] = useState(false);
	const [visible9, setVisible9] = useState(false);
	const [visible9b, setVisible9b] = useState(false);

	const [visible10, setVisible10] = useState(false);
	const [value10, setValue10] = useState<OklchColor>({ l: 0.7, c: 0.2, h: 150 });
	const [colors10, setColors10] = useState<string[]>([]);

	const [visible11, setVisible11] = useState(false);
	const [value11] = useState<[number, number, number]>([255, 100, 50]);
	const [colors11, setColors11] = useState<string[]>([]);

	const [visible12, setVisible12] = useState(false);
	const [value12] = useState('#8B5CF6');
	const [colors12, setColors12] = useState<string[]>([]);

	return (
		<>
			<div className="mx-4 mt-8 text-lg font-bold">Default ( Popup Mode )</div>
			<div className="px-4 py-4">
				<Button onClick={() => setVisible1(true)}>Open ColorPicker</Button>
				<ColorPicker visible={visible1} popup={{ onClose: () => setVisible1(false) }} onClose={(c) => setColors1(c)} />
				{colors1.length > 0 ? <div className="mt-2 text-sm">Colors: {colors1.join(' | ')}</div> : null}
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Direct Display Mode</div>
			<div className="px-4 py-4">
				<ColorPicker
					popup={null}
					value={value2}
					onChange={(c) => {
						setColors2(c);
						const [l, cVal, h] = (c[0] || '').replace('oklch(', '').replace(')', '').split(' ').map(Number);
						if (Number.isFinite(l) && Number.isFinite(cVal) && Number.isFinite(h)) {
							setValue2({ l, c: cVal, h });
						}
					}}
				/>
				{colors2.length > 0 ? <div className="mt-2 text-sm">Current: {colors2.join(' | ')}</div> : null}
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Multiple Triggers</div>
			<div className="space-y-2 px-4 py-4">
				<Button onClick={() => setVisible3(true)}>Button Trigger</Button>
				<Cell title="Cell Trigger" right="arrow" onClick={() => setVisible3(true)} />
				<div
					className="h-10 w-10 cursor-pointer rounded-md border border-black/10 dark:border-white/20"
					style={{ backgroundColor: colors3[2] || '#7B68EE' }}
					onClick={() => setVisible3(true)}
					role="button"
					tabIndex={0}
					onKeyDown={(event) => event.key === 'Enter' && setVisible3(true)}
				/>
				<ColorPicker visible={visible3} popup={{ onClose: () => setVisible3(false) }} onClose={(c) => setColors3(c)} />
				{colors3.length > 0 ? <div className="mt-2 text-sm">Colors: {colors3.join(' | ')}</div> : null}
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Single Mode ( No Tab )</div>
			<div className="px-4 py-4">
				<Button onClick={() => setVisible4(true)}>OKLCH Only</Button>
				<ColorPicker visible={visible4} modes={['oklch']} popup={{ onClose: () => setVisible4(false) }} onClose={(c) => setColors4(c)} />
				{colors4.length > 0 ? <div className="mt-2 text-sm">Color: {colors4[0]}</div> : null}
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Dual Mode</div>
			<div className="px-4 py-4">
				<Button onClick={() => setVisible5(true)}>HEX + RGB Mode</Button>
				<ColorPicker
					visible={visible5}
					modes={['hex', 'rgb']}
					popup={{ onClose: () => setVisible5(false) }}
					onClose={(c) => setColors5(c)}
				/>
				{colors5.length > 0 ? <div className="mt-2 text-sm">Colors: {colors5.join(' | ')}</div> : null}
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Custom Tab Style</div>
			<div className="px-4 py-4">
				<Button onClick={() => setVisible6(true)}>Line Type Tab</Button>
				<ColorPicker
					visible={visible6}
					tab={{ lineType: true }}
					popup={{ onClose: () => setVisible6(false) }}
					onClose={(c) => setColors6(c)}
				/>
				{colors6.length > 0 ? <div className="mt-2 text-sm">Colors: {colors6.join(' | ')}</div> : null}
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Hide Preview</div>
			<div className="px-4 py-4">
				<Button onClick={() => setVisible7(true)}>Hide Preview</Button>
				<ColorPicker visible={visible7} showPreview={false} popup={{ onClose: () => setVisible7(false) }} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Hide Inputs</div>
			<div className="px-4 py-4">
				<Button onClick={() => setVisible8(true)}>Hide Inputs</Button>
				<ColorPicker visible={visible8} showInputs={false} popup={{ onClose: () => setVisible8(false) }} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Hide Copy</div>
			<div className="px-4 py-4">
				<Button onClick={() => setVisible9(true)}>Hide Copy</Button>
				<ColorPicker visible={visible9} showCopy={false} popup={{ onClose: () => setVisible9(false) }} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Hide Color Panel</div>
			<div className="px-4 py-4">
				<div className="mb-2 text-sm text-black/60 dark:text-white/60">showPanel = false, use sliders only</div>
				<Button onClick={() => setVisible9b(true)}>Hide Panel</Button>
				<ColorPicker visible={visible9b} showPanel={false} popup={{ onClose: () => setVisible9b(false) }} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Initial Value - OKLCH Format</div>
			<div className="px-4 py-4">
				<div className="mb-2 text-sm text-black/60 dark:text-white/60">value = {'{ l: 0.7, c: 0.2, h: 150 }'}</div>
				<Button onClick={() => setVisible10(true)}>Open</Button>
				<ColorPicker
					visible={visible10}
					value={value10}
					popup={{ onClose: () => setVisible10(false) }}
					onClose={(c) => setColors10(c)}
					onChange={(c) => {
						setColors10(c);
						if (c[0]?.startsWith('oklch')) {
							const [l, cVal, h] = c[0].replace('oklch(', '').replace(')', '').split(' ').map(Number);
							if (Number.isFinite(l) && Number.isFinite(cVal) && Number.isFinite(h)) {
								setValue10({ l, c: cVal, h });
							}
						}
					}}
				/>
				{colors10.length > 0 ? <div className="mt-2 text-sm">Colors: {colors10.join(' | ')}</div> : null}
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Initial Value - RGB Format</div>
			<div className="px-4 py-4">
				<div className="mb-2 text-sm text-black/60 dark:text-white/60">value = [255, 100, 50], modes = ['rgb']</div>
				<Button onClick={() => setVisible11(true)}>Open</Button>
				<ColorPicker
					visible={visible11}
					value={value11}
					modes={['rgb']}
					popup={{ onClose: () => setVisible11(false) }}
					onClose={(c) => setColors11(c)}
				/>
				{colors11.length > 0 ? <div className="mt-2 text-sm">Colors: {colors11.join(' | ')}</div> : null}
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Initial Value - HEX Format</div>
			<div className="px-4 py-4">
				<div className="mb-2 text-sm text-black/60 dark:text-white/60">value = '#8B5CF6', modes = ['hex']</div>
				<Button onClick={() => setVisible12(true)}>Open</Button>
				<ColorPicker
					visible={visible12}
					value={value12}
					modes={['hex']}
					popup={{ onClose: () => setVisible12(false) }}
					onClose={(c) => setColors12(c)}
				/>
				{colors12.length > 0 ? <div className="mt-2 text-sm">Colors: {colors12.join(' | ')}</div> : null}
			</div>

			<div className="h-20" />
		</>
	);
}

export default ColorPickerEn;
