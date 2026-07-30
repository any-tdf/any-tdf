import { useRef, useState } from 'react';
import { Button, Switch, Avatar, Badge, Progress, Rate, Slider, Radio, Checkbox, Loading, Stepper, Tab } from 'rtdf/components';
import { useAppContext } from '../../store/appStore';

const ModeCompare = () => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';

	const [sliderPos, setSliderPos] = useState(50);
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const startDrag = (e: React.PointerEvent) => {
		setIsDragging(true);
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	};

	const onDrag = (e: React.PointerEvent) => {
		if (!isDragging || !containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const percent = Math.min(Math.max((x / rect.width) * 100, 5), 95);
		setSliderPos(percent);
	};

	const endDrag = () => {
		setIsDragging(false);
	};

	// 演示数据
	const [switchActive, setSwitchActive] = useState(true);
	const [sliderValue, setSliderValue] = useState(65);
	const [stepperValue, setStepperValue] = useState(3);

	// 卡片内容（亮暗两层结构一致）
	const renderCards = (mode: 'light' | 'dark') => {
		const cardClass =
			mode === 'light'
				? 'rounded-xl border border-gray-200/80 bg-white/90 p-3 shadow-lg backdrop-blur-sm'
				: 'rounded-xl border border-white/10 bg-white/5 p-3 shadow-lg backdrop-blur-sm';
		const headerCardClass =
			mode === 'light'
				? 'rounded-xl border border-gray-200/80 bg-white/90 p-4 shadow-lg backdrop-blur-sm'
				: 'rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm';
		const titleClass = mode === 'light' ? 'text-base font-semibold text-gray-900' : 'text-base font-semibold text-white';
		const mutedClass = mode === 'light' ? 'text-xs text-gray-500' : 'text-xs text-gray-400';
		return (
			<div
				className={`flex w-full ${mode === 'light' ? 'max-w-75' : 'max-w-90'} flex-col gap-3`}
				data-mode={mode === 'dark' ? 'dark' : undefined}
			>
				{/* 头部卡片 */}
				<div className={headerCardClass}>
					<div className="flex items-center gap-3">
						<Avatar size="md" image="/assets/images/home/avatar_1.jpg" />
						<div className="flex-1">
							<div className={titleClass}>{mode === 'light' ? 'Light Mode' : 'Dark Mode'}</div>
							<div className={mutedClass}>
								{mode === 'light'
									? isZh
										? '清新明亮的视觉体验'
										: 'Clean & bright visual'
									: isZh
										? '沉浸舒适的暗夜体验'
										: 'Immersive dark experience'}
							</div>
						</div>
						<Badge text="New" injClass={mode === 'light' ? 'bg-primary' : 'bg-dark'}>
							<div
								className={`size-8 rounded-lg ${
									mode === 'light' ? 'bg-linear-to-br from-blue-500 to-purple-500' : 'bg-linear-to-br from-cyan-400 to-emerald-400'
								}`}
							></div>
						</Badge>
					</div>
				</div>

				{/* Tab 组件 */}
				<div className={cardClass}>
					<Tab
						labels={[{ text: isZh ? '推荐' : 'For You' }, { text: isZh ? '关注' : 'Follow' }, { text: isZh ? '热门' : 'Hot' }]}
						radius="full"
					/>
				</div>

				{/* 开关和滑块行 */}
				<div className="grid grid-cols-2 gap-3">
					<div className={cardClass}>
						<div className={`mb-2 ${mutedClass}`}>{isZh ? '通知' : 'Notify'}</div>
						<Switch active={switchActive} onChange={setSwitchActive} />
					</div>
					<div className={cardClass}>
						<div className={`mb-2 ${mutedClass}`}>{isZh ? '音量' : 'Volume'}</div>
						<Slider value={sliderValue} onChange={setSliderValue} showTip="never" />
					</div>
				</div>

				{/* 进度和评分 */}
				<div className="grid grid-cols-2 gap-3">
					<div className={cardClass}>
						<div className="mb-2 flex items-center justify-between">
							<span className={mutedClass}>{isZh ? '进度' : 'Progress'}</span>
							<span className={`text-xs font-medium ${mode === 'light' ? 'text-gray-700' : 'text-white'}`}>75%</span>
						</div>
						<Progress percent={75} />
					</div>
					<div className={cardClass}>
						<div className={`mb-2 ${mutedClass}`}>{isZh ? '评分' : 'Rate'}</div>
						<Rate value={4} height={16} />
					</div>
				</div>

				{/* Stepper 和 Loading */}
				<div className="grid grid-cols-2 gap-3">
					<div className={cardClass}>
						<div className={`mb-2 ${mutedClass}`}>{isZh ? '数量' : 'Qty'}</div>
						<Stepper value={stepperValue} onChange={setStepperValue} min={1} max={10} />
					</div>
					<div className={`flex items-center justify-center ${cardClass}`}>
						<Loading type="1_12" theme />
					</div>
				</div>

				{/* Radio 和 Checkbox */}
				<div className="grid grid-cols-2 gap-3">
					<div className={cardClass}>
						<Radio
							data={[
								{ name: '0', label: isZh ? '选项一' : 'Option 1' },
								{ name: '1', label: isZh ? '选项二' : 'Option 2' }
							]}
							value="0"
							layout="h"
						/>
					</div>
					<div className={cardClass}>
						<Checkbox
							data={[
								{ name: '0', label: isZh ? '已读' : 'Read' },
								{ name: '1', label: isZh ? '同意' : 'Agree' }
							]}
							checkeds={['0']}
							layout="h"
						/>
					</div>
				</div>

				{/* 按钮组 */}
				<div className="flex gap-2">
					<Button fill="base" size="md">
						{isZh ? '确认' : 'Confirm'}
					</Button>
					<Button fill="line" size="md">
						{isZh ? '取消' : 'Cancel'}
					</Button>
					<Button fill="colorLight" size="md">
						{isZh ? '详情' : 'Detail'}
					</Button>
				</div>
			</div>
		);
	};

	return (
		<section className="relative overflow-hidden py-8">
			<div className="relative z-10 mx-auto">
				<div className="mb-12 text-center">
					{/* 标签 */}
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary dark:border-dark/20 dark:bg-dark/5 dark:text-dark">
						<svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z" />
						</svg>
						<span>{isZh ? '亮暗模式' : 'Light & Dark Mode'}</span>
					</div>

					<h2 className="mb-4 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-white dark:via-gray-300 dark:to-white">
						{isZh ? '昼夜无界，优雅切换' : 'Seamless Light & Dark'}
					</h2>
					<p className="mx-auto max-w-2xl text-base opacity-70">
						{isZh
							? '优雅的亮暗模式切换，为用户带来舒适的视觉体验。'
							: 'Elegant light/dark mode switching for comfortable visual experience.'}
					</p>
				</div>

				{/* 主展示区 */}
				<div
					ref={containerRef}
					role="presentation"
					className="group relative mx-auto h-145 max-w-130 overflow-hidden rounded-2xl border border-gray-200/30 shadow-xl shadow-black/5 md:h-155 dark:border-white/10 dark:shadow-white/5"
					onPointerMove={onDrag}
					onPointerUp={endDrag}
					onPointerLeave={endDrag}
				>
					{/* 内容容器 */}
					<div className="relative h-full w-full overflow-hidden">
						{/* 亮色层 */}
						<div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-slate-100">
							<div className="flex h-full items-center justify-center p-4 md:p-6">{renderCards('light')}</div>
						</div>

						{/* 暗色层 */}
						<div
							className="absolute inset-0 bg-linear-to-br from-slate-900 via-gray-900 to-slate-950"
							style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
						>
							<div className="flex h-full items-center justify-center p-4 md:p-6">{renderCards('dark')}</div>
						</div>

						{/* 分割线手柄 */}
						<div
							className="absolute top-0 z-20 h-full w-1 -translate-x-1/2 cursor-ew-resize bg-white shadow-lg"
							style={{ left: `${sliderPos}%` }}
							onPointerDown={startDrag}
						>
							{/* 手柄圆圈 */}
							<div className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-linear-to-br from-primary to-primary-700 shadow-xl transition-transform duration-300 active:scale-110 dark:from-dark dark:to-dark-700">
								<svg className="size-5 text-white" viewBox="0 0 24 24" fill="currentColor">
									<path d="M8 5L3 12L8 19V5ZM16 5V19L21 12L16 5Z" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* 底部提示 */}
				<div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
					<svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
						<path d="M18 8H20V12H18V8ZM14 4H16V16H14V4ZM10 8H12V12H10V8ZM6 4H8V16H6V4ZM2 8H4V12H2V8Z" opacity="0.5" />
						<path d="M14 4H16V16H14V4ZM6 4H8V16H6V4Z" />
					</svg>
					{isZh ? '拖动分割线对比亮暗模式效果' : 'Drag the divider to compare light and dark modes'}
				</div>
			</div>
		</section>
	);
};

export default ModeCompare;
