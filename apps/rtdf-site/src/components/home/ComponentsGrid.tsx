import { useState } from 'react';
import { ArrowRight, Boxes } from 'lucide-react';
import { componentCategoryIconMap, componentIconMap, fallbackComponentIcon } from '@any-tdf/site-common/data';
import { menuList } from '../../data/menuList';
import { getLucideIcon } from '../../lib/icons';
import { useAppContext } from '../../store/appStore';

const ComponentsGrid = () => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';

	const [activeCategory, setActiveCategory] = useState<string>(menuList[0]?.class || '');
	const totalComponents = menuList.reduce((acc, cur) => acc + cur.childs.length, 0);
	const filteredComponents = menuList.find((item) => item.class === activeCategory || item.class_en === activeCategory)?.childs || [];

	return (
		<section className="relative overflow-hidden p-6 md:p-8">
			<div className="relative z-10 mx-auto max-w-6xl">
				<div className="mb-12 text-center">
					<div className="border-primary/20 bg-primary/5 text-primary dark:border-dark/20 dark:bg-dark/5 dark:text-dark mb-6 inline-flex items-center gap-2 border px-4 py-1.5 text-sm">
						<Boxes size={16} strokeWidth={1.75} absoluteStrokeWidth />
						<span>{isZh ? '组件总览' : 'Components Overview'}</span>
					</div>

					<h2 className="mb-4 text-3xl font-bold text-(--site-text) md:text-4xl">
						{isZh ? '丰富组件，开箱即用' : 'Rich Components, Ready to Use'}
					</h2>
					<p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400">
						{isZh
							? `${totalComponents} 精心设计的组件，覆盖表单、导航、反馈、展示等各种场景，满足移动端开发的全部需求。`
							: `${totalComponents} carefully designed components covering forms, navigation, feedback, display and more scenarios.`}
					</p>
				</div>

				<div className="component-category-tabs mb-8 flex flex-wrap justify-center">
					{menuList.map((category) => {
						const CategoryIcon = getLucideIcon(
							componentCategoryIconMap[category.class as keyof typeof componentCategoryIconMap] || fallbackComponentIcon
						);
						return (
							<button
								key={category.class}
								className={`component-category-tab flex items-center gap-2 border border-(--site-divider) px-4 py-2 text-sm font-medium transition-colors ${
									activeCategory === category.class || activeCategory === category.class_en
										? 'bg-primary text-text-on-primary dark:bg-dark dark:text-text-on-dark'
										: 'bg-transparent text-gray-600 hover:border-primary/20 hover:bg-primary/5 hover:text-primary dark:text-gray-400 dark:hover:border-dark/20 dark:hover:bg-dark/10 dark:hover:text-dark'
								}`}
								onClick={() => setActiveCategory(category.class)}
								type="button"
							>
								<CategoryIcon size={16} strokeWidth={1.75} absoluteStrokeWidth />
								{isZh ? category.class : category.class_en}
								<span className="text-xs opacity-70">{category.childs.length}</span>
							</button>
						);
					})}
				</div>

				<div className="component-items-grid">
					{filteredComponents.map((component) => {
						const ComponentIcon = getLucideIcon(componentIconMap[component.nav as keyof typeof componentIconMap] || fallbackComponentIcon);
						return (
							<a
								href={`/components?nav=${component.nav}&tab=0`}
								className="component-item-card group relative overflow-hidden border border-(--site-divider) bg-transparent p-4 transition-colors hover:bg-primary/5 dark:hover:bg-dark/5"
								key={component.nav}
							>
								<div className="relative z-10">
									<div className="bg-primary/10 group-hover:bg-primary dark:bg-dark/10 dark:group-hover:bg-dark mb-3 flex size-10 items-center justify-center transition-colors">
										<ComponentIcon
											className="text-primary group-hover:text-text-on-primary dark:text-dark dark:group-hover:text-text-on-dark transition-colors"
											size={20}
											strokeWidth={1.75}
											absoluteStrokeWidth
										/>
									</div>

									<div className="group-hover:text-primary dark:group-hover:text-dark mb-1 text-sm font-semibold text-gray-800 transition-colors dark:text-white">
										{isZh ? component.title_zh : component.title_en}
									</div>
									<div className="text-xs text-gray-500 transition-colors group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
										{component.title_en}
									</div>
								</div>

								<div className="absolute bottom-2 right-2 translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
									<ArrowRight className="text-primary dark:text-dark" size={16} strokeWidth={1.75} absoluteStrokeWidth />
								</div>
							</a>
						);
					})}
				</div>

				<div className="mt-10 text-center">
					<a
						href="/components"
						className="inline-flex items-center gap-2 border border-(--site-divider) bg-transparent px-6 py-3 text-sm font-medium text-(--site-text) transition-colors hover:border-(--site-text-muted) hover:bg-black/5 focus-visible:border-(--site-text-muted) focus-visible:outline-none dark:hover:bg-white/5"
					>
						{isZh ? '查看全部组件文档' : 'View All Component Docs'}
						<ArrowRight size={16} strokeWidth={1.75} absoluteStrokeWidth />
					</a>
				</div>
			</div>
		</section>
	);
};

export default ComponentsGrid;
