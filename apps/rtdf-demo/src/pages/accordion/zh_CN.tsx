import { useState } from 'react';
import { Accordion, Slider } from 'rtdf/components';
import type { AccordionItemProps, AccordionProps } from 'rtdf/types';

const basicItems: AccordionItemProps[] = [
	{ title: '什么是 STDF？', content: 'STDF 是一个基于 Svelte 和 Tailwind CSS 的移动端 UI 组件库，提供丰富的组件和主题定制能力。' },
	{ title: '如何安装？', content: '你可以通过 bun create any-tdf@alpha my-app -f react 快速创建项目，或者手动安装 rtdf 包到现有项目中。' },
	{ title: '支持哪些框架？', content: 'STDF 基于 Svelte 5 开发，可以在 SvelteKit、Vite + Svelte 等项目中使用。' }
];

const iconItems: AccordionItemProps[] = [
	{ title: '基础组件', content: '包含 Button、Icon、Mask、Popup 等基础组件。', icon: { name: 'ri-apps-2-line', size: 18 } },
	{ title: '表单组件', content: '包含 Input、Picker、Calendar、Switch 等表单组件。', icon: { name: 'ri-edit-line', size: 18 } },
	{ title: '反馈组件', content: '包含 Toast、Modal、Dialog、Loading 等反馈组件。', icon: { name: 'ri-discuss-line', size: 18 } }
];

const disabledItems: AccordionItemProps[] = [
	{ title: '可用项 1', content: '这是一个可用的手风琴项。' },
	{ title: '禁用项', content: '这个内容不会显示。', disabled: true },
	{ title: '可用项 2', content: '这是另一个可用的手风琴项。' }
];

const radiusOptions: AccordionProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];

const AccordionZh = () => {
	const [radiusIndex, setRadiusIndex] = useState(2);
	const [activeIndex1, setActiveIndex1] = useState<number | undefined>(0);
	const [activeIndex2, setActiveIndex2] = useState<number[]>([0, 1]);
	const currentRadius = radiusOptions[radiusIndex];

	return (
		<div className="flex flex-col gap-8 px-2 py-4">
			<div>
				<div className="mb-4 font-bold">基础用法</div>
				<Accordion items={basicItems} activeIndex={activeIndex1} onChange={(next) => setActiveIndex1(next as number | undefined)} />
			</div>

			<div>
				<div className="mb-4 font-bold">多项展开</div>
				<Accordion items={basicItems} multiple activeIndex={activeIndex2} onChange={(next) => setActiveIndex2(next as number[])} />
			</div>

			<div>
				<div className="mb-4 font-bold">默认展开第二项</div>
				<Accordion items={basicItems} activeIndex={1} />
			</div>

			<div>
				<div className="mb-4 font-bold">禁用某项</div>
				<Accordion items={disabledItems} />
			</div>

			<div>
				<div className="mb-4 font-bold">不同圆角</div>
				<div className="mb-4">
					<Slider
						value={radiusIndex}
						minRange={0}
						maxRange={7}
						step={1}
						showSteps
						stepLabels={radiusLabels}
						onChange={(value) => setRadiusIndex(value)}
					/>
				</div>
				<Accordion items={basicItems} radius={currentRadius} />
			</div>

			<div>
				<div className="mb-4 font-bold">不同边框</div>
				<div className="flex flex-col gap-4">
					<Accordion items={basicItems.slice(0, 2)} border="solid" />
					<Accordion items={basicItems.slice(0, 2)} border="dashed" />
					<Accordion items={basicItems.slice(0, 2)} border="dotted" />
					<Accordion items={basicItems.slice(0, 2)} border="none" />
				</div>
			</div>

			<div>
				<div className="mb-4 font-bold">隐藏分割线</div>
				<Accordion items={basicItems} divider={false} />
			</div>

			<div>
				<div className="mb-4 font-bold">不同展开图标</div>
				<div className="flex flex-col gap-4">
					<Accordion items={basicItems.slice(0, 2)} expandIcon="arrow" />
					<Accordion items={basicItems.slice(0, 2)} expandIcon="plus" />
					<Accordion items={basicItems.slice(0, 2)} expandIcon={null} />
				</div>
			</div>

			<div>
				<div className="mb-4 font-bold">图标位置</div>
				<div className="flex flex-col gap-4">
					<Accordion items={basicItems.slice(0, 2)} iconPosition="right" />
					<Accordion items={basicItems.slice(0, 2)} iconPosition="left" />
				</div>
			</div>

			<div>
				<div className="mb-4 font-bold">带标题图标</div>
				<Accordion items={iconItems} />
			</div>

			<div>
				<div className="mb-4 font-bold">自定义内容</div>
				<Accordion items={basicItems}>
					{(item, index) => (
						<div className="rounded-md bg-black/5 p-3 dark:bg-white/5">
							<div className="mb-2 text-xs text-black/50 dark:text-white/50">问题 {index + 1}</div>
							<div>{item.content}</div>
						</div>
					)}
				</Accordion>
			</div>
		</div>
	);
};

export default AccordionZh;
