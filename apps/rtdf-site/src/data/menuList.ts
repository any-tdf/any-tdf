import { guideMenuList as sharedGuideMenuList } from '@any-tdf/site-common/data';

export { menuList } from '@any-tdf/site-common/data';
export type { MenuList, MenuListChild } from '@any-tdf/site-common/data';
export type { GuideMenuChild, GuideMenuGroup } from '@any-tdf/site-common/data';

export const guideMenuList = sharedGuideMenuList.map((group) => ({
	...group,
	childs: group.childs.filter((child) => child.nav !== 'upgrade')
}));
