import type { MenuList, MenuListChild } from '../data/menuList';
import {
	componentCategoryIconMap,
	componentIconMap,
	fallbackComponentIcon,
	guideCategoryIconMap,
	guideItemIconMap
} from '@any-tdf/site-common/data';
import { getLucideIcon } from '../lib/icons';
import { useAppContext } from '../store/appStore';

type MenuChild = Pick<MenuListChild, 'title' | 'title_en' | 'nav'> & Partial<MenuListChild> & { doc?: string };
type MenuGroup<T extends MenuChild> = Pick<MenuList, 'class' | 'class_en'> & {
	childs: T[];
};

type MenuProps<T extends MenuChild> = {
	menuList: MenuGroup<T>[];
	currentNav: string;
	showNum?: boolean;
	/** 是否显示图标 */
	showIcons?: boolean;
	/** 图标集合：组件导航还是指南导航 */
	iconSet?: 'components' | 'guide';
	onMenuClick: (menu: T) => void;
};

const Menu = <T extends MenuChild>({
	menuList,
	currentNav,
	showNum = true,
	showIcons = false,
	iconSet = 'components',
	onMenuClick
}: MenuProps<T>) => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';

	const getCategoryIcon = (name: string) =>
		getLucideIcon(
			iconSet === 'guide'
				? guideCategoryIconMap[name as keyof typeof guideCategoryIconMap] || fallbackComponentIcon
				: componentCategoryIconMap[name as keyof typeof componentCategoryIconMap] || fallbackComponentIcon
		);
	const getItemIcon = (nav: string) =>
		getLucideIcon(
			iconSet === 'guide'
				? guideItemIconMap[nav as keyof typeof guideItemIconMap] || fallbackComponentIcon
				: componentIconMap[nav as keyof typeof componentIconMap] || fallbackComponentIcon
		);

	const selectMenu = (menu: T) => {
		onMenuClick(menu);
	};

	return (
		<nav className={showIcons ? 'has-icons' : ''} aria-label={isZh ? '侧边导航' : 'Sidebar navigation'}>
			<div className="site-sidebar-meta">
				{isZh ? '文档更新' : 'Document updated'}
				<br />
				{isZh ? import.meta.env.VITE_BUILD_TIME_ZH : import.meta.env.VITE_BUILD_TIME_EN}
			</div>
			{menuList.map((menu) => {
				const CategoryIcon = getCategoryIcon(menu.class);
				return (
					<section className="site-sidebar-group" key={menu.class}>
						<h2 className="site-sidebar-title flex items-center gap-2">
							{showIcons ? <CategoryIcon className="shrink-0" size={16} strokeWidth={1.75} absoluteStrokeWidth /> : null}
							<span>
								{isZh ? menu.class : menu.class_en}
								{showNum ? ` · ${menu.childs.length}` : ''}
							</span>
						</h2>
						{menu.childs.map((child) => {
							const ChildIcon = getItemIcon(child.nav);
							return (
								<button
									key={child.nav}
									onClick={() => selectMenu(child)}
									className={`site-sidebar-link gap-2${currentNav === child.nav ? ' is-active' : ''}`}
									aria-current={currentNav === child.nav ? 'page' : undefined}
									type="button"
								>
									{showIcons ? <ChildIcon className="shrink-0" size={16} strokeWidth={1.75} absoluteStrokeWidth /> : null}
									<span>{isZh ? child.title : child.title_en}</span>
								</button>
							);
						})}
					</section>
				);
			})}
		</nav>
	);
};

export default Menu;
