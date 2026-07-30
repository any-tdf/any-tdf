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

function SignatureZh() {
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
			showToast('签名为空，请先签名');
			return;
		}
		const newItem: ImageListItemProps = {
			id: Date.now(),
			url: result.dataUrl,
			status: 'success'
		};
		setSignatureImages((prev) => (prev.length >= 6 ? [...prev.slice(1), newItem] : [...prev, newItem]));
		showToast('签名已保存');
	};

	const handleRotationExport = () => {
		const result = rotationSignatureRef.current?.getSignature(rotation);
		if (!result) return;
		if (result.isEmpty) {
			showToast('签名为空，请先签名');
			return;
		}
		const newItem: ImageListItemProps = {
			id: Date.now(),
			url: result.dataUrl,
			status: 'success',
			message: `旋转 ${rotation}°`
		};
		setRotationImages((prev) => (prev.length >= 6 ? [...prev.slice(1), newItem] : [...prev, newItem]));
		showToast(`签名已导出（旋转 ${rotation}°）`);
	};

	const handleExternalClear = () => {
		signatureRef.current?.clear();
	};

	const handleExternalConfirm = () => {
		const result = signatureRef.current?.getSignature();
		if (!result) return;
		showToast(result.isEmpty ? '签名为空' : '签名已获取');
	};

	const handleClear = () => {
		showToast('签名已清空');
	};

	const handleDrawStart = () => {
		console.log('开始绘制');
	};

	const handleDrawEnd = () => {
		console.log('结束绘制');
	};

	return (
		<div>
			<div className="mx-4 mb-2 mt-10 text-lg font-bold">基础用法</div>
			<p className="mx-4 mb-2 text-xs opacity-60">点击确认后签名图片将保存到下方列表（最多 6 张）</p>
			<div className="mx-4">
				<Signature onConfirm={handleConfirm1} onClear={handleClear} onDrawStart={handleDrawStart} onDrawEnd={handleDrawEnd} />
				{signatureImages.length > 0 ? (
					<div className="mt-3">
						<p className="mb-2 text-sm opacity-60">已保存的签名：</p>
						<ImageList value={signatureImages} readonly columns={3} aspectRatio={[3, 1]} />
					</div>
				) : null}
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">自定义比例</div>
			<p className="mx-4 mb-2 text-xs opacity-60">宽高比 2:1</p>
			<div className="mx-4">
				<Signature aspectRatio={[2, 1]} onConfirm={() => undefined} onClear={handleClear} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">自定义颜色</div>
			<p className="mx-4 mb-2 text-xs opacity-60">蓝色画笔，浅蓝背景</p>
			<div className="mx-4">
				<Signature lineColor="#2563eb" bgColor="#dbeafe" onConfirm={() => undefined} onClear={handleClear} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">自定义画笔粗细</div>
			<p className="mx-4 mb-2 text-xs opacity-60">画笔粗细 6px</p>
			<div className="mx-4">
				<Signature lineWidth={6} onConfirm={() => undefined} onClear={handleClear} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">旋转导出</div>
			<p className="mx-4 mb-2 text-xs opacity-60">导出时可指定旋转角度，适用于横屏签名后需要旋转图片的场景</p>
			<div className="mx-4 mb-3">
				<Tab labels={rotationLabels} active={rotationValue} onClickTab={setRotationValue} />
			</div>
			<div className="mx-4">
				<Signature ref={rotationSignatureRef} showButtons={false} />
				<div className="mt-3 flex justify-end gap-3">
					<Button fill="line" size="auto" injClass="px-4" onClick={() => rotationSignatureRef.current?.clear()}>
						清空
					</Button>
					<Button fill="base" size="auto" injClass="px-4" onClick={handleRotationExport}>
						导出（{rotation}°）
					</Button>
				</div>
				{rotationImages.length > 0 ? (
					<div className="mt-3">
						<p className="mb-2 text-sm opacity-60">已导出的签名：</p>
						<ImageList value={rotationImages} readonly columns={3} aspectRatio={[3, 1]} />
					</div>
				) : null}
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">自定义圆角</div>
			<p className="mx-4 mb-2 text-xs opacity-60">圆角 2xl</p>
			<div className="mx-4">
				<Signature radius="2xl" onConfirm={() => undefined} onClear={handleClear} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">不显示按钮</div>
			<p className="mx-4 mb-2 text-xs opacity-60">通过外部调用组件方法</p>
			<div className="mx-4">
				<Signature ref={signatureRef} showButtons={false} />
				<div className="mt-3 flex gap-3">
					<Button fill="line" size="auto" injClass="px-4" onClick={handleExternalClear}>
						外部清空
					</Button>
					<Button fill="base" size="auto" injClass="px-4" onClick={handleExternalConfirm}>
						外部获取
					</Button>
				</div>
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">导出不同格式</div>
			<div className="mx-4 mb-3">
				<Tab labels={imageTypeLabels} active={imageTypeIndex} onClickTab={setImageTypeIndex} />
			</div>
			<div className="mx-4">
				<Signature imageType={imageType} imageQuality={0.8} onClear={handleClear} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">自定义按钮文字</div>
			<div className="mx-4">
				<Signature clearText="重新签名" confirmText="提交签名" onClear={handleClear} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">自定义按钮样式</div>
			<div className="mx-4">
				<Signature
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

export default SignatureZh;
