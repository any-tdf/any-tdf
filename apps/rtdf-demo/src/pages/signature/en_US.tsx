import { useMemo, useRef, useState } from 'react';
import { Button, ImageList, Signature, Tab, Toast } from 'rtdf/components';
import type { ImageListItemProps, SignatureResult, SignatureRotation } from 'rtdf/types';

type SignatureRef = {
	clear: () => void;
	getSignature: (rotation?: SignatureRotation) => SignatureResult | null;
	isEmpty: () => boolean;
};

const rotationMap: SignatureRotation[] = [0, 90, 180, 270];
const rotationLabels = [{ text: '0°' }, { text: '90°' }, { text: '180°' }, { text: '270°' }];
const imageTypes = ['png', 'jpeg', 'webp'] as const;
const imageTypeLabels = [{ text: 'PNG' }, { text: 'JPEG' }, { text: 'WebP' }];

function SignatureEn() {
	const [signatureImages, setSignatureImages] = useState<ImageListItemProps[]>([]);
	const [rotationImages, setRotationImages] = useState<ImageListItemProps[]>([]);

	const [rotationValue, setRotationValue] = useState(0);
	const rotation = rotationMap[rotationValue];

	const [imageTypeIndex, setImageTypeIndex] = useState(0);
	const imageType = useMemo(() => imageTypes[imageTypeIndex], [imageTypeIndex]);

	const signatureRef = useRef<SignatureRef | null>(null);
	const rotationSignatureRef = useRef<SignatureRef | null>(null);

	const [toastVisible, setToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const showToast = (message: string) => {
		setToastMessage(message);
		setToastVisible(true);
	};

	const handleConfirm1 = (result: SignatureResult) => {
		if (result.isEmpty) {
			showToast('Signature is empty, please sign first');
			return;
		}
		const newItem: ImageListItemProps = {
			id: Date.now(),
			url: result.dataUrl,
			status: 'success'
		};
		setSignatureImages((prev) => (prev.length >= 6 ? [...prev.slice(1), newItem] : [...prev, newItem]));
		showToast('Signature saved');
	};

	const handleRotationExport = () => {
		const result = rotationSignatureRef.current?.getSignature(rotation);
		if (!result) return;
		if (result.isEmpty) {
			showToast('Signature is empty, please sign first');
			return;
		}
		const newItem: ImageListItemProps = {
			id: Date.now(),
			url: result.dataUrl,
			status: 'success',
			message: `Rotated ${rotation}°`
		};
		setRotationImages((prev) => (prev.length >= 6 ? [...prev.slice(1), newItem] : [...prev, newItem]));
		showToast(`Signature exported (rotated ${rotation}°)`);
	};

	const handleExternalClear = () => {
		signatureRef.current?.clear();
	};

	const handleExternalConfirm = () => {
		const result = signatureRef.current?.getSignature();
		if (!result) return;
		showToast(result.isEmpty ? 'Signature is empty' : 'Signature captured');
	};

	const handleClear = () => {
		showToast('Signature cleared');
	};

	const handleDrawStart = () => {
		console.log('Draw started');
	};

	const handleDrawEnd = () => {
		console.log('Draw ended');
	};

	return (
		<div>
			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Basic Usage</div>
			<p className="mx-4 mb-2 text-xs opacity-60">After clicking confirm, signatures will be saved to the list below (max 6)</p>
			<div className="mx-4">
				<Signature
					clearText="Clear"
					confirmText="Confirm"
					onConfirm={handleConfirm1}
					onClear={handleClear}
					onDrawStart={handleDrawStart}
					onDrawEnd={handleDrawEnd}
				/>
				{signatureImages.length > 0 ? (
					<div className="mt-3">
						<p className="mb-2 text-sm opacity-60">Saved signatures:</p>
						<ImageList value={signatureImages} readonly columns={3} aspectRatio={[3, 1]} />
					</div>
				) : null}
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Aspect Ratio</div>
			<p className="mx-4 mb-2 text-xs opacity-60">Aspect ratio 2:1</p>
			<div className="mx-4">
				<Signature aspectRatio={[2, 1]} clearText="Clear" confirmText="Confirm" onClear={handleClear} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Colors</div>
			<p className="mx-4 mb-2 text-xs opacity-60">Blue pen, light blue background</p>
			<div className="mx-4">
				<Signature lineColor="#2563eb" bgColor="#dbeafe" clearText="Clear" confirmText="Confirm" onClear={handleClear} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Line Width</div>
			<p className="mx-4 mb-2 text-xs opacity-60">Line width 6px</p>
			<div className="mx-4">
				<Signature lineWidth={6} clearText="Clear" confirmText="Confirm" onClear={handleClear} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Rotation Export</div>
			<p className="mx-4 mb-2 text-xs opacity-60">
				Specify rotation angle when exporting, useful for rotating images after landscape signing
			</p>
			<div className="mx-4 mb-3">
				<Tab labels={rotationLabels} active={rotationValue} onClickTab={setRotationValue} />
			</div>
			<div className="mx-4">
				<Signature ref={rotationSignatureRef} showButtons={false} />
				<div className="mt-3 flex justify-end gap-3">
					<Button fill="line" size="auto" injClass="px-4" onClick={() => rotationSignatureRef.current?.clear()}>
						Clear
					</Button>
					<Button fill="base" size="auto" injClass="px-4" onClick={handleRotationExport}>
						Export ({rotation}°)
					</Button>
				</div>
				{rotationImages.length > 0 ? (
					<div className="mt-3">
						<p className="mb-2 text-sm opacity-60">Exported signatures:</p>
						<ImageList value={rotationImages} readonly columns={3} aspectRatio={[3, 1]} />
					</div>
				) : null}
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Border Radius</div>
			<p className="mx-4 mb-2 text-xs opacity-60">Border radius 2xl</p>
			<div className="mx-4">
				<Signature radius="2xl" clearText="Clear" confirmText="Confirm" onClear={handleClear} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Hide Buttons</div>
			<p className="mx-4 mb-2 text-xs opacity-60">Call component methods externally</p>
			<div className="mx-4">
				<Signature ref={signatureRef} showButtons={false} />
				<div className="mt-3 flex gap-3">
					<Button fill="line" size="auto" injClass="px-4" onClick={handleExternalClear}>
						External Clear
					</Button>
					<Button fill="base" size="auto" injClass="px-4" onClick={handleExternalConfirm}>
						External Get
					</Button>
				</div>
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Export Different Formats</div>
			<div className="mx-4 mb-3">
				<Tab labels={imageTypeLabels} active={imageTypeIndex} onClickTab={setImageTypeIndex} />
			</div>
			<div className="mx-4">
				<Signature imageType={imageType} imageQuality={0.8} clearText="Clear" confirmText="Confirm" onClear={handleClear} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Button Text</div>
			<div className="mx-4">
				<Signature clearText="Re-sign" confirmText="Submit Signature" onClear={handleClear} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Button Style</div>
			<div className="mx-4">
				<Signature
					clearText="Clear"
					confirmText="Confirm"
					clearButton={{ state: 'error', fill: 'line' }}
					confirmButton={{ state: 'success', fill: 'base' }}
					onClear={handleClear}
				/>
			</div>

			<div className="h-20"></div>

			<Toast visible={toastVisible} message={toastMessage} duration={1500} onClose={() => setToastVisible(false)} />
		</div>
	);
}

export default SignatureEn;
