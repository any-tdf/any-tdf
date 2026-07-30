import { icons, type LucideIcon } from 'lucide-react';
import { fallbackComponentIcon } from '@any-tdf/site-common/data';

/**
 * 把 site-common 提供的 Lucide 图标名字符串解析为 lucide-react 组件。
 * Resolve a Lucide icon name string from site-common to a lucide-react component.
 */
export const getLucideIcon = (name: string | undefined | null): LucideIcon => {
	if (name && name in icons) {
		return icons[name as keyof typeof icons];
	}
	return icons[fallbackComponentIcon as keyof typeof icons] ?? icons.Box;
};
