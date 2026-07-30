import { joinClasses } from './helpers.js';

// 输入 TabContent 显示状态，返回框架无关的内容容器 class。
// Consume TabContent visibility state and return framework-agnostic content container classes.
export const resolveTabContentClass = (show = true) => joinClasses([show ? '' : 'hidden', 'flex-1']);
