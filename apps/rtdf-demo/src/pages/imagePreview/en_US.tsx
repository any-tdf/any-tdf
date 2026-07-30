import { useState } from 'react';
import { ImagePreview, Button, Icon } from 'rtdf/components';
import type { ImagePreviewItemProps } from 'rtdf/types';

const images = ['/assets/images/wall_1.jpg', '/assets/images/wall_2.jpg', '/assets/images/wall_3.jpg', '/assets/images/wall_4.jpg'];

const imagesWithDesc: ImagePreviewItemProps[] = [
	{ url: '/assets/images/wall_1.jpg', alt: 'Landscape 1' },
	{ url: '/assets/images/wall_2.jpg', alt: 'Landscape 2' },
	{ url: '/assets/images/wall_3.jpg', alt: 'Landscape 3' },
	{ url: '/assets/images/wall_4.jpg', alt: 'Landscape 4' }
];

function ImagePreviewEn() {
	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);
	const [visible4, setVisible4] = useState(false);
	const [visible5, setVisible5] = useState(false);
	const [visible6, setVisible6] = useState(false);
	const [visible8, setVisible8] = useState(false);
	const [visible10, setVisible10] = useState(false);
	const [visible11, setVisible11] = useState(false);
	const [visible12, setVisible12] = useState(false);
	const [visible13, setVisible13] = useState(false);
	const [visible14, setVisible14] = useState(false);
	const [visible15, setVisible15] = useState(false);
	const [visible16, setVisible16] = useState(false);
	const [visible17, setVisible17] = useState(false);

	const [current2, setCurrent2] = useState(2);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [scaleValue, setScaleValue] = useState(1);
	const [rotationAngle, setRotationAngle] = useState<0 | 90 | 180 | 270>(0);

	return (
		<div>
			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Basic Usage</div>
			<div className="mx-4">
				<Button onClick={() => setVisible1(true)}>Preview Images</Button>
			</div>
			<ImagePreview visible={visible1} images={images} onClose={() => setVisible1(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Initial Index</div>
			<div className="mx-4">
				<Button onClick={() => setVisible2(true)}>Start from 3rd image</Button>
			</div>
			<ImagePreview
				visible={visible2}
				images={images}
				current={current2}
				onClose={() => setVisible2(false)}
				onChange={(index: number) => setCurrent2(index)}
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Number Indicator</div>
			<div className="mx-4">
				<Button onClick={() => setVisible3(true)}>Show 1 / 4</Button>
			</div>
			<ImagePreview visible={visible3} images={images} indicatorType="number" onClose={() => setVisible3(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Dot Indicator</div>
			<div className="mx-4">
				<Button onClick={() => setVisible4(true)}>Dot style</Button>
			</div>
			<ImagePreview visible={visible4} images={images} indicatorType="dot" onClose={() => setVisible4(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Hide Indicator</div>
			<div className="mx-4">
				<Button onClick={() => setVisible5(true)}>No indicator</Button>
			</div>
			<ImagePreview visible={visible5} images={images} showIndex={false} onClose={() => setVisible5(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Close Button Position</div>
			<div className="mx-4">
				<Button onClick={() => setVisible6(true)}>Top left close button</Button>
			</div>
			<ImagePreview visible={visible6} images={images} closePosition="tl" onClose={() => setVisible6(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Enable Mask Close</div>
			<p className="mx-4 mb-2 text-xs opacity-60">Disabled by default, can close by clicking blank area when enabled</p>
			<div className="mx-4">
				<Button onClick={() => setVisible8(true)}>Enable tap close</Button>
			</div>
			<ImagePreview visible={visible8} images={images} maskClosable onClose={() => setVisible8(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Disable Loop</div>
			<div className="mx-4">
				<Button onClick={() => setVisible10(true)}>Stop at boundary</Button>
			</div>
			<ImagePreview visible={visible10} images={images} loop={false} onClose={() => setVisible10(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Hide Navigation</div>
			<div className="mx-4">
				<Button onClick={() => setVisible11(true)}>Hide prev/next icons</Button>
			</div>
			<ImagePreview visible={visible11} images={images} showNavigation={false} onClose={() => setVisible11(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Navigation Position</div>
			<div className="mx-4">
				<Button onClick={() => setVisible12(true)}>Navigation at bottom</Button>
			</div>
			<ImagePreview visible={visible12} images={images} navigationPosition="bottom" onClose={() => setVisible12(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Image Description</div>
			<div className="mx-4">
				<Button onClick={() => setVisible13(true)}>Show description</Button>
			</div>
			<ImagePreview
				visible={visible13}
				images={imagesWithDesc}
				onClose={() => setVisible13(false)}
				children={(item, index) => (
					<div className="text-center text-white">
						<p className="text-lg">{item.alt}</p>
						<p className="text-sm opacity-60">Image {index + 1}</p>
					</div>
				)}
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Scale Range</div>
			<p className="mx-4 mb-2 text-xs opacity-60">Min scale 0.3, max scale 5</p>
			<div className="mx-4">
				<Button onClick={() => setVisible14(true)}>Custom scale</Button>
			</div>
			<ImagePreview visible={visible14} images={images} minScale={0.3} maxScale={5} onClose={() => setVisible14(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Listen Events</div>
			<p className="mx-4 mb-2 text-xs opacity-60">
				Current index: {currentIndex}, Scale: {scaleValue.toFixed(2)}
			</p>
			<div className="mx-4">
				<Button onClick={() => setVisible15(true)}>Listen change and scale</Button>
			</div>
			<ImagePreview
				visible={visible15}
				images={images}
				onClose={() => setVisible15(false)}
				onChange={(index: number) => setCurrentIndex(index)}
				onScale={(scale: number) => setScaleValue(scale)}
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Index Display</div>
			<div className="mx-4">
				<Button onClick={() => setVisible16(true)}>Custom index style</Button>
			</div>
			<ImagePreview
				visible={visible16}
				images={images}
				onClose={() => setVisible16(false)}
				indexChild={(current: number, total: number) => (
					<div className="flex items-center gap-2 rounded-full bg-primary/80 px-4 py-2 text-white dark:bg-dark/80">
						<Icon name="ri-image-line" size={16} />
						<span>
							{current} of {total}
						</span>
					</div>
				)}
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Image Rotation</div>
			<p className="mx-4 mb-2 text-xs opacity-60">
				Click rotation button to rotate image counterclockwise. Current angle: {rotationAngle}°
			</p>
			<div className="mx-4">
				<Button onClick={() => setVisible17(true)}>Support Rotation</Button>
			</div>
			<ImagePreview
				visible={visible17}
				images={images}
				showRotation
				onClose={() => setVisible17(false)}
				onRotate={(angle) => setRotationAngle(angle)}
			/>

			<div className="h-20" />
		</div>
	);
}

export default ImagePreviewEn;
