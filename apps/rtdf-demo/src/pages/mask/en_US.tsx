import { useState } from 'react';
import { Button, Cell, Mask, Toast, Popup } from 'rtdf/components';

function MaskEn() {
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
	const [isClick, setIsClick] = useState(false);
	return (
		<div className="py-4">
			<Cell title="Basic usage" onClick={() => setVisible1(true)} />
			<Mask visible={visible1} onClickMask={() => setVisible1(false)} />

			<Cell title="Transparency is 0.1" onClick={() => setVisible2(true)} />
			<Mask visible={visible2} opacity="0.1" onClickMask={() => setVisible2(false)} />

			<Cell title="Transparency is 0.8" onClick={() => setVisible3(true)} />
			<Mask visible={visible3} opacity="0.8" onClickMask={() => setVisible3(false)} />

			<Cell title="Click through" detail="Please close manually" onClick={() => setVisible4(true)} />
			<Mask visible={visible4} clickable />
			<div className="flex">
				<div className="flex-1">
					<Button onClick={() => setIsClick(!isClick)}>{isClick ? 'Click on me' : 'Click through'}</Button>
				</div>
				<div className="flex-1">
					<Button onClick={() => setVisible4(false)}>Manual shutdown</Button>
				</div>
			</div>

			<Cell title="Reverse color mask" onClick={() => setVisible5(true)} />
			<Mask visible={visible5} inverse onClickMask={() => setVisible5(false)} />

			<Cell title="Blur mask" onClick={() => setVisible6(true)} />
			<Mask visible={visible6} backdropBlur="xs" opacity="0" onClickMask={() => setVisible6(false)} />

			<Cell title="Increase ambiguity" onClick={() => setVisible7(true)} />
			<Mask visible={visible7} backdropBlur="xl" opacity="0" onClickMask={() => setVisible7(false)} />

			<Cell title="Increased the animation time" onClick={() => setVisible8(true)} />
			<Mask visible={visible8} duration={1000} onClickMask={() => setVisible8(false)} />

			<Cell title="Increased the duration of vanishing animation" onClick={() => setVisible9(true)} />
			<Mask visible={visible9} outDuration={1000} onClickMask={() => setVisible9(false)} />

			<Cell title="Toast Use in" onClick={() => setVisible10(true)} />
			<Toast visible={visible10} message="Transparency is 0" onClose={() => setVisible10(false)} />

			<Cell title="Popup Use in" onClick={() => setVisible11(true)} />
			<Popup visible={visible11} onClose={() => setVisible11(false)} />
		</div>
	);
}

export default MaskEn;
