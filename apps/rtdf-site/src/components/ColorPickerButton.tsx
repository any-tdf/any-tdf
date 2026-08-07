import { useRef, useState } from 'react';
import ColorPicker from './ColorPicker';
import { oklchObjToHex } from '@any-tdf/common/utils';

type OklchColor = { l: number; c: number; h: number };

type ColorPickerButtonProps = {
	value?: OklchColor;
	label?: string;
	size?: 'sm' | 'md' | 'lg';
	onchange?: (color: OklchColor, hex: string, rgb: [number, number, number]) => void;
	onopen?: () => void;
	contrastTarget?: OklchColor;
	showContrast?: boolean;
	variant?: 'default' | 'text' | 'textOnBg';
	bgColor?: OklchColor;
};

const sizeClass = {
	sm: 'h-6 w-6',
	md: 'h-8 w-8',
	lg: 'h-10 w-10'
};

const ColorPickerButton = ({
	value = { l: 0.7, c: 0.15, h: 250 },
	label = '',
	size = 'sm',
	onchange,
	onopen,
	contrastTarget,
	showContrast = false,
	variant = 'default',
	bgColor
}: ColorPickerButtonProps) => {
	// 计算背景色 hex 值（用于 textOnBg 模式）
	const bgHex = bgColor ? oklchObjToHex(bgColor) : '#ffffff';

	const [showPicker, setShowPicker] = useState(false);
	const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
	const pickerElementRef = useRef<HTMLDivElement | null>(null);
	const buttonRectRef = useRef<DOMRect | null>(null);

	// 计算 hex 值用于按钮背景色
	const currentHex = oklchObjToHex(value);

	// 计算选择器位置
	const calculatePickerPosition = (rect: DOMRect, pickerHeight: number) => {
		const pickerWidth = 320;
		const margin = 8;
		const bottomMargin = 20; // 距离底部最小距离
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		let top = rect.top;
		let left = rect.right + margin;

		// 水平位置调整
		if (left + pickerWidth > viewportWidth - margin) {
			left = rect.left - pickerWidth - margin;
		}

		if (left < margin) {
			left = Math.min(rect.right + margin, viewportWidth - pickerWidth - margin);
			if (left < margin) {
				left = margin;
			}
		}

		// 垂直位置调整，确保距离底部至少 bottomMargin
		const maxTop = viewportHeight - pickerHeight - bottomMargin;
		if (top > maxTop) {
			top = maxTop;
		}
		if (top < margin) {
			top = margin;
		}

		return { top, left };
	};

	// 切换选择器
	const togglePicker = async (event: React.MouseEvent) => {
		const button = event.currentTarget as HTMLElement;
		buttonRectRef.current = button.getBoundingClientRect();
		const nextShowPicker = !showPicker;
		setShowPicker(nextShowPicker);
		if (nextShowPicker) {
			// 先用估算高度定位
			setPickerPosition(calculatePickerPosition(buttonRectRef.current, 500));
			onopen?.();
			// 渲染后用实际高度重新定位
			requestAnimationFrame(() => {
				if (pickerElementRef.current && buttonRectRef.current) {
					const actualHeight = pickerElementRef.current.offsetHeight;
					setPickerPosition(calculatePickerPosition(buttonRectRef.current, actualHeight));
				}
			});
		}
	};

	// 关闭选择器
	const closePicker = () => {
		setShowPicker(false);
	};

	// 处理键盘事件
	const handleKeydown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			closePicker();
		}
	};

	return (
		<div className="group relative">
			{variant === 'text' ? (
				// 全局文字色模式：边框 + A 字母
				<button
					className={`${sizeClass[size]} flex cursor-pointer items-center justify-center rounded-sm border-2 border-black/20 bg-white font-bold dark:border-white/20 dark:bg-gray-900`}
					onClick={(e) => void togglePicker(e)}
					aria-label={`Pick ${label} color`}
					type="button"
				>
					<span style={{ color: currentHex }}>A</span>
				</button>
			) : variant === 'textOnBg' ? (
				// 主题色上文字模式：主题色背景 + A 字母
				<button
					className={`${sizeClass[size]} flex cursor-pointer items-center justify-center rounded-sm border border-black/20 font-bold dark:border-white/20`}
					style={{ backgroundColor: bgHex }}
					onClick={(e) => void togglePicker(e)}
					aria-label={`Pick ${label} color`}
					type="button"
				>
					<span style={{ color: currentHex }}>A</span>
				</button>
			) : (
				// 默认模式：纯色块
				<button
					className={`${sizeClass[size]} cursor-pointer rounded-sm border border-black/20 dark:border-white/20`}
					style={{ backgroundColor: currentHex }}
					onClick={(e) => void togglePicker(e)}
					aria-label={`Pick ${label} color`}
					type="button"
				></button>
			)}
			{label ? (
				<div className="z-9999 pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-gray-700">
					{label}
					<div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800 dark:border-r-gray-700"></div>
				</div>
			) : null}
			{showPicker ? (
				<>
					<div
						className="z-9998 fixed inset-0"
						onClick={closePicker}
						onKeyDown={handleKeydown}
						role="button"
						tabIndex={0}
						aria-label="Close picker"
					></div>
					<div
						ref={pickerElementRef}
						className="z-9999 fixed origin-top-left rounded-lg border border-black/10 bg-white p-4 shadow-lg dark:border-white/20 dark:bg-gray-900"
						style={{ top: `${pickerPosition.top}px`, left: `${pickerPosition.left}px` }}
					>
						<ColorPicker value={value} onchange={onchange} contrastTarget={contrastTarget} showContrast={showContrast} />
					</div>
				</>
			) : null}
		</div>
	);
};

export default ColorPickerButton;
