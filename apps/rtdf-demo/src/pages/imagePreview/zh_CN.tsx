import { useState } from 'react';
import { ImagePreview, Button, Icon } from 'rtdf/components';
import type { ImagePreviewItemProps } from 'rtdf/types';

const images = ['/assets/images/wall_1.jpg', '/assets/images/wall_2.jpg', '/assets/images/wall_3.jpg', '/assets/images/wall_4.jpg'];

const imagesWithDesc: ImagePreviewItemProps[] = [
	{ url: '/assets/images/wall_1.jpg', alt: '风景图片 1' },
	{ url: '/assets/images/wall_2.jpg', alt: '风景图片 2' },
	{ url: '/assets/images/wall_3.jpg', alt: '风景图片 3' },
	{ url: '/assets/images/wall_4.jpg', alt: '风景图片 4' }
];

function ImagePreviewZh() {
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
			<div className="mx-4 mb-2 mt-10 text-lg font-bold">基础用法</div>
			<div className="mx-4">
				<Button onClick={() => setVisible1(true)}>预览图片</Button>
			</div>
			<ImagePreview visible={visible1} images={images} onClose={() => setVisible1(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">指定初始索引</div>
			<div className="mx-4">
				<Button onClick={() => setVisible2(true)}>从第 3 张开始</Button>
			</div>
			<ImagePreview
				visible={visible2}
				images={images}
				current={current2}
				onClose={() => setVisible2(false)}
				onChange={(index: number) => setCurrent2(index)}
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">数字指示器</div>
			<div className="mx-4">
				<Button onClick={() => setVisible3(true)}>显示 1 / 4</Button>
			</div>
			<ImagePreview visible={visible3} images={images} indicatorType="number" onClose={() => setVisible3(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">圆点指示器</div>
			<div className="mx-4">
				<Button onClick={() => setVisible4(true)}>圆点样式</Button>
			</div>
			<ImagePreview visible={visible4} images={images} indicatorType="dot" onClose={() => setVisible4(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">关闭指示器</div>
			<div className="mx-4">
				<Button onClick={() => setVisible5(true)}>不显示指示器</Button>
			</div>
			<ImagePreview visible={visible5} images={images} showIndex={false} onClose={() => setVisible5(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">关闭按钮位置</div>
			<div className="mx-4">
				<Button onClick={() => setVisible6(true)}>左上角关闭按钮</Button>
			</div>
			<ImagePreview visible={visible6} images={images} closePosition="tl" onClose={() => setVisible6(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">启用点击蒙层关闭</div>
			<p className="mx-4 mb-2 text-xs opacity-60">默认禁用，启用后点击空白区域可关闭</p>
			<div className="mx-4">
				<Button onClick={() => setVisible8(true)}>启用点击关闭</Button>
			</div>
			<ImagePreview visible={visible8} images={images} maskClosable onClose={() => setVisible8(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">禁用循环切换</div>
			<div className="mx-4">
				<Button onClick={() => setVisible10(true)}>滑动到边界时停止</Button>
			</div>
			<ImagePreview visible={visible10} images={images} loop={false} onClose={() => setVisible10(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">隐藏导航图标</div>
			<div className="mx-4">
				<Button onClick={() => setVisible11(true)}>不显示左右切换图标</Button>
			</div>
			<ImagePreview visible={visible11} images={images} showNavigation={false} onClose={() => setVisible11(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">导航图标位置</div>
			<div className="mx-4">
				<Button onClick={() => setVisible12(true)}>导航图标在底部</Button>
			</div>
			<ImagePreview visible={visible12} images={images} navigationPosition="bottom" onClose={() => setVisible12(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">图片描述</div>
			<div className="mx-4">
				<Button onClick={() => setVisible13(true)}>显示图片描述</Button>
			</div>
			<ImagePreview
				visible={visible13}
				images={imagesWithDesc}
				onClose={() => setVisible13(false)}
				children={(item, index) => (
					<div className="text-center text-white">
						<p className="text-lg">{item.alt}</p>
						<p className="text-sm opacity-60">第 {index + 1} 张</p>
					</div>
				)}
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">自定义缩放范围</div>
			<p className="mx-4 mb-2 text-xs opacity-60">最小缩放 0.3，最大缩放 5</p>
			<div className="mx-4">
				<Button onClick={() => setVisible14(true)}>自定义缩放</Button>
			</div>
			<ImagePreview visible={visible14} images={images} minScale={0.3} maxScale={5} onClose={() => setVisible14(false)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">监听事件</div>
			<p className="mx-4 mb-2 text-xs opacity-60">
				当前索引： {currentIndex}，缩放比例： {scaleValue.toFixed(2)}
			</p>
			<div className="mx-4">
				<Button onClick={() => setVisible15(true)}>监听切换和缩放</Button>
			</div>
			<ImagePreview
				visible={visible15}
				images={images}
				onClose={() => setVisible15(false)}
				onChange={(index: number) => setCurrentIndex(index)}
				onScale={(scale: number) => setScaleValue(scale)}
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">自定义索引显示</div>
			<div className="mx-4">
				<Button onClick={() => setVisible16(true)}>自定义索引样式</Button>
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

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">图片旋转</div>
			<p className="mx-4 mb-2 text-xs opacity-60">点击旋转按钮可逆时针旋转图片，当前角度： {rotationAngle}°</p>
			<div className="mx-4">
				<Button onClick={() => setVisible17(true)}>支持旋转</Button>
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

export default ImagePreviewZh;
