export { menuList, guideMenuList } from '@any-tdf/site-common/data';
export type { MenuList, MenuListChild, GuideMenuChild, GuideMenuGroup } from '@any-tdf/site-common/data';

// 侧边栏菜单的最小结构约束，同时兼容组件菜单（menuList）与指南菜单（guideMenuList）
export type SiteMenuChild = { title: string; title_en: string; nav: string };
export type SiteMenuGroup = { class: string; class_en: string; childs: SiteMenuChild[] };
