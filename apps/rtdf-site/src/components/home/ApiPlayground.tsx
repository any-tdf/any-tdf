import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'rtdf/components';
import type { ButtonProps } from 'rtdf/types';
import { useAppContext } from '../../store/appStore';

const ApiPlayground = () => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';

	// Button 所有 API 配置
	const [fill, setFill] = useState<NonNullable<ButtonProps['fill']>>('base');
	const [buttonState, setButtonState] = useState<NonNullable<ButtonProps['state']>>('theme');
	const [radius, setRadius] = useState<NonNullable<ButtonProps['radius']>>('md');
	const [size, setSize] = useState<NonNullable<ButtonProps['size']>>('big');
	const [border, setBorder] = useState<NonNullable<ButtonProps['border']>>('solid');
	const [love, setLove] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [showIcon, setShowIcon] = useState(false);
	const [iconPosition, setIconPosition] = useState<NonNullable<ButtonProps['iconPosition']>>('left');
	const [showLoading, setShowLoading] = useState(false);
	const statefulFills: NonNullable<ButtonProps['fill']>[] = ['base', 'lineState', 'textState', 'colorLight'];
	const borderedFills: NonNullable<ButtonProps['fill']>[] = ['line', 'lineLight', 'lineState'];
	const supportsState = statefulFills.includes(fill);
	const supportsBorder = borderedFills.includes(fill);

	// 配置选项
	const fillOptions = [
		{ value: 'base', label: isZh ? '实心' : 'Base' },
		{ value: 'line', label: isZh ? '线框' : 'Line' },
		{ value: 'lineLight', label: isZh ? '浅线框' : 'LineLight' },
		{ value: 'lineState', label: isZh ? '状态线框' : 'LineState' },
		{ value: 'text', label: isZh ? '文字' : 'Text' },
		{ value: 'textState', label: isZh ? '状态文字' : 'TextState' },
		{ value: 'colorLight', label: isZh ? '浅色底' : 'ColorLight' }
	];

	const stateOptions = [
		{ value: 'theme', label: isZh ? '主题色' : 'Theme' },
		{ value: 'success', label: isZh ? '成功' : 'Success' },
		{ value: 'warning', label: isZh ? '警告' : 'Warning' },
		{ value: 'error', label: isZh ? '错误' : 'Error' },
		{ value: 'info', label: isZh ? '信息' : 'Info' }
	];

	const radiusOptions = [
		{ value: 'none', label: 'none' },
		{ value: 'xs', label: 'xs' },
		{ value: 'sm', label: 'sm' },
		{ value: 'md', label: 'md' },
		{ value: 'lg', label: 'lg' },
		{ value: 'xl', label: 'xl' },
		{ value: '2xl', label: '2xl' },
		{ value: 'full', label: 'full' }
	];

	const sizeOptions = [
		{ value: 'auto', label: 'auto' },
		{ value: 'sm', label: 'sm' },
		{ value: 'md', label: 'md' },
		{ value: 'big', label: 'big' },
		{ value: 'full', label: 'full' }
	];

	const borderOptions = [
		{ value: 'solid', label: isZh ? '实线' : 'Solid' },
		{ value: 'dashed', label: isZh ? '虚线' : 'Dashed' },
		{ value: 'dotted', label: isZh ? '点线' : 'Dotted' }
	];

	const selectFill = (nextFill: NonNullable<ButtonProps['fill']>) => {
		setFill(nextFill);
		if (!statefulFills.includes(nextFill)) setButtonState('theme');
		if (!borderedFills.includes(nextFill)) setBorder('solid');
	};

	// 生成代码预览（带语法高亮）
	const codePreview = (() => {
		const tagColor = 'text-primary dark:text-dark';
		const propNameColor = 'text-gray-700 dark:text-gray-300';
		const propValueColor = 'text-primary dark:text-dark';
		const braceColor = 'text-gray-500 dark:text-gray-400';
		const textColor = 'text-gray-700 dark:text-gray-300';

		const buttonText = isZh ? '按钮' : 'Button';

		// 格式化 props，返回带高亮的 HTML
		const formatProp = (name: string, value: string, isObject = false) => {
			if (isObject) {
				return `<span class="${propNameColor}">${name}</span>=<span class="${braceColor}">${value}</span>`;
			}
			return `<span class="${propNameColor}">${name}</span>=<span class="${propValueColor}">"${value}"</span>`;
		};

		const formatBoolProp = (name: string) => {
			return `<span class="${propNameColor}">${name}</span>`;
		};

		const props: string[] = [];
		if (fill !== 'base') props.push(formatProp('fill', fill));
		if (buttonState !== 'theme' && supportsState) props.push(formatProp('state', buttonState));
		if (radius !== 'md') props.push(formatProp('radius', radius));
		if (size !== 'big') props.push(formatProp('size', size));
		if (border !== 'solid') props.push(formatProp('border', border));
		if (love) props.push(formatBoolProp('love'));
		if (disabled) props.push(formatBoolProp('disabled'));
		if (showIcon) props.push(formatProp('icon', "{{ name: 'ri-heart-line', size: 18 }}", true));
		if (showIcon && iconPosition !== 'left') props.push(formatProp('iconPosition', iconPosition));
		if (showLoading) props.push(formatProp('loading', `{{ type: '1_28', height: '6', width: '6', inverse: ${fill === 'base'} }}`, true));

		if (props.length === 0) {
			return `<span class="${tagColor}">&lt;Button&gt;</span><span class="${textColor}">${buttonText}</span><span class="${tagColor}">&lt;/Button&gt;</span>`;
		}
		const propsStr = props.map((p) => `  ${p}`).join('\n');
		return `<span class="${tagColor}">&lt;Button</span>\n${propsStr}\n<span class="${tagColor}">&gt;</span>\n  <span class="${textColor}">${buttonText}</span>\n<span class="${tagColor}">&lt;/Button&gt;</span>`;
	})();

	const optionButtonClass = (active: boolean) =>
		`rounded-md px-2.5 py-1 text-xs transition-colors ${
			active
				? 'bg-primary text-white dark:bg-dark dark:text-black'
				: 'bg-gray-100 text-gray-600 active:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:active:bg-gray-700'
		}`;

	return (
		<section className="relative overflow-hidden p-4 md:p-8">
			<div className="relative z-10 mx-auto max-w-6xl">
				<div className="mb-12 text-center">
					{/* 标签 */}
					<div className="mb-6 inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary dark:border-dark/20 dark:bg-dark/5 dark:text-dark">
						<svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
							<path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z" />
						</svg>
						<span>{isZh ? '灵活 API' : 'Flexible API'}</span>
					</div>

					<h2 className="mb-4 text-3xl font-bold text-(--site-text) md:text-4xl">
						{isZh ? '千变万化，随心定制' : 'Infinite Possibilities'}
					</h2>
					<p className="mx-auto max-w-2xl text-base opacity-70">{isZh ? '一个组件，无限可能' : 'One component, infinite possibilities'}</p>
				</div>

				<div>
					<div className="grid gap-6 lg:grid-cols-2">
						{/* 左侧：配置面板 */}
						<div className="api-config-panel border border-gray-200/50 bg-transparent px-3 py-5 dark:border-white/10">
							<div className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">{isZh ? '属性配置' : 'Props Configuration'}</div>

							{/* fill 样式 */}
							<div className="mb-4">
								<div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
									fill <span className="text-primary dark:text-dark">({isZh ? '填充样式' : 'fill style'})</span>
								</div>
								<div className="flex flex-wrap gap-1.5">
									{fillOptions.map((option) => (
										<button
											key={option.value}
											className={optionButtonClass(fill === option.value)}
											onClick={() => selectFill(option.value as NonNullable<ButtonProps['fill']>)}
											type="button"
										>
											{option.label}
										</button>
									))}
								</div>
							</div>

							{/* state 状态 */}
							<div className="mb-4">
								<div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
									state <span className="text-primary dark:text-dark">({isZh ? '状态颜色' : 'state color'})</span>
									{!supportsState ? (
										<span className="ml-1 opacity-60">{isZh ? '当前 fill 不响应' : 'Not available for this fill'}</span>
									) : null}
								</div>
								<div className="flex flex-wrap gap-1.5">
									{stateOptions.map((option) => (
										<button
											key={option.value}
											disabled={!supportsState}
											className={`rounded-md px-2.5 py-1 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
												buttonState === option.value && supportsState
													? 'bg-primary text-white dark:bg-dark dark:text-black'
													: 'bg-gray-100 text-gray-600 active:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:active:bg-gray-700'
											}`}
											onClick={() => setButtonState(option.value as typeof buttonState)}
											type="button"
										>
											{option.label}
										</button>
									))}
								</div>
							</div>

							{/* radius 圆角 */}
							<div className="mb-4">
								<div className="mb-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
									<span>
										radius <span className="text-primary dark:text-dark">({isZh ? '圆角' : 'border radius'})</span>
									</span>
									<span className="relative">
										<button type="button" className="peer cursor-help" onClick={(e) => e.currentTarget.focus()}>
											<svg className="size-3.5 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="currentColor">
												<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" />
											</svg>
										</button>
										<span className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-lg peer-hover:block peer-focus:block dark:bg-gray-700">
											{isZh ? '默认继承主题圆角，支持自定义覆盖' : 'Inherits theme radius by default, supports custom override'}
											<span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></span>
										</span>
									</span>
								</div>
								<div className="flex flex-wrap gap-1.5">
									{radiusOptions.map((option) => (
										<button
											key={option.value}
											className={optionButtonClass(radius === option.value)}
											onClick={() => setRadius(option.value as typeof radius)}
											type="button"
										>
											{option.label}
										</button>
									))}
								</div>
							</div>

							{/* size 尺寸 */}
							<div className="mb-4">
								<div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
									size <span className="text-primary dark:text-dark">({isZh ? '尺寸' : 'size'})</span>
								</div>
								<div className="flex flex-wrap gap-1.5">
									{sizeOptions.map((option) => (
										<button
											key={option.value}
											className={optionButtonClass(size === option.value)}
											onClick={() => setSize(option.value as typeof size)}
											type="button"
										>
											{option.label}
										</button>
									))}
								</div>
							</div>

							{/* border 边框样式 */}
							{supportsBorder ? (
								<div className="mb-4">
									<div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
										border <span className="text-primary dark:text-dark">({isZh ? '边框样式' : 'border style'})</span>
									</div>
									<div className="flex flex-wrap gap-1.5">
										{borderOptions.map((option) => (
											<button
												key={option.value}
												className={optionButtonClass(border === option.value)}
												onClick={() => setBorder(option.value as typeof border)}
												type="button"
											>
												{option.label}
											</button>
										))}
									</div>
								</div>
							) : null}

							{/* 其他 */}
							<div className="mb-4">
								<div className="mb-2 text-xs text-gray-500 dark:text-gray-400">{isZh ? '其他' : 'Others'}</div>
								<div className="flex flex-wrap gap-1.5">
									<button className={optionButtonClass(love)} onClick={() => setLove(!love)} type="button">
										love
									</button>
									<button className={optionButtonClass(disabled)} onClick={() => setDisabled(!disabled)} type="button">
										disabled
									</button>
									<button className={optionButtonClass(showIcon)} onClick={() => setShowIcon(!showIcon)} type="button">
										icon
									</button>
									<button className={optionButtonClass(showLoading)} onClick={() => setShowLoading(!showLoading)} type="button">
										loading
									</button>
									{showIcon ? (
										<button
											className={optionButtonClass(iconPosition === 'left')}
											onClick={() => setIconPosition(iconPosition === 'left' ? 'right' : 'left')}
											type="button"
										>
											iconPosition: {iconPosition}
										</button>
									) : null}
								</div>
							</div>

							{/* 更多属性 */}
							<div>
								<div className="mb-2 break-all text-left text-xs text-gray-500 dark:text-gray-400">
									{isZh ? '更多属性：' : 'More Props: '}
									<span className="text-gray-400 dark:text-gray-500">
										heightOut, heightIn, customSize, customWidth, customHeight, disabledLoading, injClass, type, onClick...
									</span>
									<Link to="/components" className="ml-2 whitespace-nowrap text-primary hover:underline dark:text-dark">
										{isZh ? '查看更多示例' : 'View more examples'}
									</Link>
								</div>
							</div>
						</div>

						{/* 右侧：预览和代码 */}
						<div className="flex flex-col gap-4">
							{/* 实时预览 */}
							<div
								className="flex flex-1 items-center justify-center border border-gray-200/50 bg-base dark:border-white/10"
								data-site-component-preview
							>
								<div className="api-button-preview w-full max-w-75">
									<Button
										fill={fill}
										state={buttonState}
										radius={radius}
										size={size}
										border={border}
										love={love}
										disabled={disabled}
										icon={showIcon ? { name: 'ri-heart-line', size: 18 } : null}
										iconPosition={iconPosition}
										loading={showLoading ? { type: '1_28', height: '6', width: '6', inverse: fill === 'base' } : null}
									>
										{isZh ? '按钮' : 'Button'}
									</Button>
								</div>
							</div>

							{/* 代码预览 */}
							<div className="border border-gray-200/50 bg-gray-100 p-4 dark:border-white/10 dark:bg-gray-900">
								{/* 窗口控制按钮 */}
								<div className="mb-3 border-b border-(--site-divider) pb-2 font-mono text-xs text-gray-500">SOURCE / Button.tsx</div>
								<pre className="whitespace-pre-wrap text-sm">
									<code dangerouslySetInnerHTML={{ __html: codePreview }} />
								</pre>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ApiPlayground;
