/**
 * 给 HTML 元素设置 data-mode 属性，实现 Mode 切换
 * Set data-mode attribute to the HTML element to implement Mode switching
 * @param {boolean} [isDark] 是否为 dark 模式
 * @returns {void}
 * @example
 */
export default (isDark = true) => {
	const mode = isDark ? 'dark' : 'primary';
	document.documentElement.setAttribute('data-mode', mode);
};
